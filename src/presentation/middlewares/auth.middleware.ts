import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { prisma } from '../../infrastructure';

export class AuthMiddleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header('Authorization');

    if (!authorization)
      return res.status(401).json({ error: 'No token provided' });

    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'Invalid token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      const user = await prisma.user.findUnique({
        where: { id: Number(payload.id) },
      });

      if (!user)
        return res.status(500).json({ error: 'Invalid token: User not found' });

      // Si usuario no está activo devolver error
      if (!user.is_active)
        return res.status(401).json({ error: 'User is not active' });

      req.body.user = user;
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: 'Internal Server Error' });
    }
    next();
  };
}
