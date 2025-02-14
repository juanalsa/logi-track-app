import { IAuthDatasource } from '../../../../application';
import { LoginUserDto, RegisterUserDto, UserEntity } from '../../../../domain';
import { AuthRepositoryImpl } from '../../../../infrastructure';

describe('AuthRepositoryImpl - Unit Tests', () => {
  let authRepository: AuthRepositoryImpl;
  let authDatasourceMock: jest.Mocked<IAuthDatasource>;

  beforeEach(() => {
    // Create IAuthDatasource mock
    authDatasourceMock = {
      login: jest.fn(),
      register: jest.fn(),
    };

    // Initialize AuthRepositoryImpl instance
    authRepository = new AuthRepositoryImpl(authDatasourceMock);
  });

  it('should call datasource login method when login is called', async () => {
    // Arrange
    const loginUserDto: LoginUserDto = {
      email: 'test@example.com',
      password: '123456',
    };

    const mockUser = new UserEntity(
      '1',
      loginUserDto.email,
      '123456',
      'user',
      true,
      '1',
    );

    authDatasourceMock.login.mockResolvedValue(mockUser);

    // Act
    const result = await authRepository.login(loginUserDto);

    // Assert
    expect(authDatasourceMock.login).toHaveBeenCalledWith(loginUserDto);
    expect(result).toEqual(mockUser);
  });

  it('should call datasource register method when register is called', async () => {
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

    authDatasourceMock.register.mockResolvedValue(mockUser);

    // Act
    const result = await authRepository.register(registerUserDto);

    // Assert
    expect(authDatasourceMock.register).toHaveBeenCalledWith(registerUserDto);
    expect(result).toEqual(mockUser);
  });
});
