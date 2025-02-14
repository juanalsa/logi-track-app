import request from 'supertest';
import express from 'express';
import { AuthRoutes } from '../../../presentation';

// Mock AuthController
const authControllerMock = {
  loginUser: jest.fn(),
  registerUser: jest.fn(),
};

// Configure Express
const app = express();
app.use(express.json());

// Replace the routes controller with the mock
jest.mock('../../../presentation/controllers/auth.controller', () => ({
  AuthController: jest.fn().mockImplementation(() => authControllerMock),
}));

app.use('/auth', AuthRoutes.routes);

describe('AuthRoutes - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call loginUser when POST /auth/login is called', async () => {
    // Arrange
    const loginUserReq = {
      email: 'test@example.com',
      password: '123456',
    };

    const expectedResponse = {
      token: 'mocked_token',
      user: {
        id: '1',
        email: 'test@example.com',
        role: 'user',
        status: true,
      },
    };

    authControllerMock.loginUser.mockImplementation((req, res) =>
      res.status(200).json(expectedResponse),
    );

    // Act
    const response = await request(app).post('/auth/login').send(loginUserReq);

    // Assert
    expect(response.status).toBe(200);
    expect(authControllerMock.loginUser).toHaveBeenCalled();
    expect(response.body).toEqual(expectedResponse);
  });

  it('should call registerUser controller when POST /auth/register is called', async () => {
    // Arrange
    const registerUserReq = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    const expectedResponse = {
      user: {
        id: '1',
        email: 'test33@hotmail.com',
        role: 'user',
        status: true,
      },
    };

    authControllerMock.registerUser.mockImplementation((req, res) =>
      res.status(201).json(expectedResponse),
    );

    // Act
    const response = await request(app)
      .post('/auth/register')
      .send(registerUserReq);

    // Assert
    expect(response.status).toBe(201);
    expect(authControllerMock.registerUser).toHaveBeenCalled();
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return 404 for unknown routes', async () => {
    // Act
    const response = await request(app).get('/auth/unknown-route');

    // Assert
    expect(response.status).toBe(404);
  });
});
