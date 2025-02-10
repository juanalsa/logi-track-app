import { Request, Response } from 'express';

export class AuthController {
  constructor() {}

  loginUser = (req: Request, res: Response) => {
    res.json('Login User Controller');
  };

  registerUser = (req: Request, res: Response) => {
    res.json('Register User Controller');
  };
}
