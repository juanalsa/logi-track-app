import { IAuthRepository, LoginUser } from '../../../../../application';
import { CustomError, LoginUserDto, UserEntity } from '../../../../../domain';

describe('LoginUser Use Case', () => {
  let loginUser: LoginUser;
  let authRepositoryMock: jest.Mocked<IAuthRepository>;
  let signTokenMock: jest.Mock;

  beforeEach(() => {
    authRepositoryMock = {
      login: jest.fn(),
      register: jest.fn(),
    } as unknown as jest.Mocked<IAuthRepository>;

    signTokenMock = jest.fn().mockResolvedValue('mocked_token');
    loginUser = new LoginUser(authRepositoryMock, signTokenMock);
  });

  it('should return user and token with correct login and passwords', async () => {
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

    const expectedResult = {
      token: 'mocked_token',
      user: {
        id: mockUser.id,
        email: loginUserDto.email,
        role: mockUser.role,
        status: mockUser.status,
      },
    };

    authRepositoryMock.login.mockResolvedValue(mockUser);
    signTokenMock.mockResolvedValue('mocked_token');

    // Act
    const result = await loginUser.execute(loginUserDto);

    // Assert
    expect(authRepositoryMock.login).toHaveBeenCalledWith(loginUserDto);
    expect(signTokenMock).toHaveBeenCalledWith({ id: mockUser.id });
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if user is not found', async () => {
    // Arrange
    const loginUserDto: LoginUserDto = {
      email: 'usernotfound@example.com',
      password: '123456',
    };

    authRepositoryMock.login.mockRejectedValue(
      CustomError.notFound('User not found'),
    );

    // Act & Assert
    await expect(loginUser.execute(loginUserDto)).rejects.toThrow(
      CustomError.notFound('User not found'),
    );
  });

  it('should throw an error if token is not generated', async () => {
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

    authRepositoryMock.login.mockResolvedValue(mockUser);
    signTokenMock.mockResolvedValue(null);

    // Act & Assert
    await expect(loginUser.execute(loginUserDto)).rejects.toThrow(
      CustomError.internalServer('Error generating token'),
    );
  });
});
