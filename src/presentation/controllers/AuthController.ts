import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { IAuthRepository, LoginUser, RegisterUser } from '../../application';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "pepito@hotmail.com"
 *         password:
 *           type: string
 *           example: "12345678"
 *
 *     RegisterUserDto:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - address
 *         - email
 *         - password
 *         - cityId
 *       properties:
 *         name:
 *           type: string
 *           example: "Pepito Pérez"
 *         phone:
 *           type: string
 *           example: "3105466789"
 *         address:
 *           type: string
 *           example: "Cll 70 # 1A - 50"
 *         email:
 *           type: string
 *           format: email
 *           example: "pepito@hotmail.com"
 *         password:
 *           type: string
 *           example: "12345678"
 *         cityId:
 *           type: string
 *           example: "3"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "1"
 *             email:
 *               type: string
 *               example: "pepito@hotmail.com"
 *             role:
 *               type: string
 *               example: "user"
 *             status:
 *               type: boolean
 *               example: true
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "1"
 *             email:
 *               type: string
 *               example: "pepito@hotmail.com"
 *             role:
 *               type: string
 *               example: "user"
 *             status:
 *               type: boolean
 *               example: true
 */
export class AuthController {
  constructor(private readonly authRepository: IAuthRepository) {}

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/LoginUserDto"
   *     responses:
   *       200:
   *         description: Inicio de sesión exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/LoginResponse"
   *       400:
   *         description: Datos inválidos o usuario no encontrado
   *       500:
   *         description: Error interno del servidor
   */
  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/RegisterUserDto"
   *     responses:
   *       200:
   *         description: Registro exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/RegisterResponse"
   *       400:
   *         description: Datos inválidos o usuario ya existe
   *       500:
   *         description: Error interno del servidor
   */
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
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
