import { IAuthRepository, RegisterUser } from '../../../../../application';
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
} from '../../../../../domain';

describe('RegisterUser Use Case', () => {
  let registerUser: RegisterUser;
  let authRepositoryMock: jest.Mocked<IAuthRepository>;

  beforeEach(() => {
    authRepositoryMock = {
      login: jest.fn(),
      register: jest.fn(),
    } as unknown as jest.Mocked<IAuthRepository>;

    registerUser = new RegisterUser(authRepositoryMock);
  });

  it('should register a new user', async () => {
    // Arrange
    const registerUserDto: RegisterUserDto = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    const mockUser = new UserEntity(
      '1',
      registerUserDto.email,
      registerUserDto.password,
      'user',
      true,
      '1',
    );

    const expectedResult = {
      user: {
        id: mockUser.id,
        email: registerUserDto.email,
        role: mockUser.role,
        status: mockUser.status,
      },
    };

    authRepositoryMock.register.mockResolvedValue(mockUser);

    // Act
    const result = await registerUser.execute(registerUserDto);

    // Assert
    expect(authRepositoryMock.register).toHaveBeenCalledWith(registerUserDto);
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if user already exists', async () => {
    // Arrange
    const registerUserDto: RegisterUserDto = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    authRepositoryMock.register.mockRejectedValue(
      CustomError.badRequest('User already exists'),
    );

    // Act & Assert
    await expect(registerUser.execute(registerUserDto)).rejects.toThrow(
      CustomError.badRequest('User already exists'),
    );
  });

  it('should throw an error if contact is not created', async () => {
    // Arrange
    const registerUserDto: RegisterUserDto = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    authRepositoryMock.register.mockRejectedValue(
      CustomError.badRequest('Error creating contact'),
    );

    // Act & Assert
    await expect(registerUser.execute(registerUserDto)).rejects.toThrow(
      CustomError.badRequest('Error creating contact'),
    );
  });
});
