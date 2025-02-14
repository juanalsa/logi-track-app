import express from 'express';
import request from 'supertest';
import { IAuthRepository } from '../../../application';
import { CustomError, UserEntity } from '../../../domain';
import { AuthController } from '../../../presentation';

// Mock auth repository
const authRepositoryMock: jest.Mocked<IAuthRepository> = {
  login: jest.fn(),
  register: jest.fn(),
} as unknown as jest.Mocked<IAuthRepository>;

// Configure express app with controller
const app = express();
app.use(express.json());

const authController = new AuthController(authRepositoryMock);

// Define routes for testing
app.post('/auth/login', authController.loginUser);
app.post('/auth/register', authController.registerUser);

describe('AuthController - Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 when login is successful', async () => {
    // Arrange
    const loginUserReq = {
      email: 'test@example.com',
      password: '123456',
    };
    const mockedUser = new UserEntity(
      '1',
      loginUserReq.email,
      '123456',
      'user',
      true,
      '1',
    );

    authRepositoryMock.login.mockResolvedValue(mockedUser);

    // Act
    const response = await request(app).post('/auth/login').send(loginUserReq);

    // Assert
    expect(response.status).toBe(200);
    expect(authRepositoryMock.login).toHaveBeenCalledWith(loginUserReq);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        id: mockedUser.id,
        email: mockedUser.email,
        role: mockedUser.role,
        status: mockedUser.status,
      },
    });
  });

  it('should return 400 when login fails', async () => {
    // Arrange
    const loginUserReq = {
      email: '',
      password: '',
    };

    // Act
    const response = await request(app).post('/auth/login').send(loginUserReq);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'email is required',
    });
  });

  it('should return 404 when login fails because email is not found', async () => {
    // Arrange
    const loginUserReq = {
      email: 'usernotfound@example.com',
      password: '123456',
    };

    authRepositoryMock.login.mockRejectedValue(
      CustomError.notFound('User not found'),
    );

    // Act
    const response = await request(app).post('/auth/login').send(loginUserReq);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'User not found',
    });
  });

  it('should return 500 when login has unexpected errors', async () => {
    // Arrange
    const loginUserReq = {
      email: 'test@example.com',
      password: '123456',
    };

    authRepositoryMock.login.mockRejectedValue(CustomError.internalServer());

    // Act
    const response = await request(app).post('/auth/login').send(loginUserReq);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Internal Server Error',
    });
  });

  it('should return 200 when register is successful', async () => {
    // Arrange
    const registerUserReq = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    const mockedUser = new UserEntity(
      '1',
      registerUserReq.email,
      registerUserReq.password,
      'user',
      true,
      '1',
    );

    const expectedResponse = {
      user: {
        id: mockedUser.id,
        email: mockedUser.email,
        role: mockedUser.role,
        status: mockedUser.status,
      },
    };

    authRepositoryMock.register.mockResolvedValue(mockedUser);

    // Act
    const response = await request(app)
      .post('/auth/register')
      .send(registerUserReq);

    // Assert
    expect(response.status).toBe(200);
    expect(authRepositoryMock.register).toHaveBeenCalledWith(registerUserReq);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return 400 when register fails', async () => {
    // Arrange
    const registerUserReq = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: '',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const response = await request(app)
      .post('/auth/register')
      .send(registerUserReq);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'email is required',
    });
  });

  it('should return 500 when register has unexpected errors', async () => {
    // Arrange
    const registerUserReq = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    authRepositoryMock.register.mockRejectedValue(CustomError.internalServer());

    // Act
    const response = await request(app)
      .post('/auth/register')
      .send(registerUserReq);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Internal Server Error',
    });
  });
});
