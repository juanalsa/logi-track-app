import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthRepositoryImpl, MySQLDatasourceImpl } from '../../infrastructure';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new MySQLDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    // router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    return router;
  }
}
