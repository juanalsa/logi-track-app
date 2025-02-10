import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { IAuthRepository } from '../../application';

export class AuthController {
  constructor(private readonly authRepository: IAuthRepository) {}

  loginUser = (req: Request, res: Response) => {
    res.json('Login User Controller');
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.authRepository
      .register(registerUserDto!)
      .then((user) => res.json({ user }))
      .catch((error) => this.handleError(error, res));
  };

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
