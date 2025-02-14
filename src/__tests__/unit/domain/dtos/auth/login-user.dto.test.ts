import { LoginUserDto } from '../../../../../domain';

describe('LoginUserDto - Unit Tests', () => {
  it('should create a valid LoginUserDto when correct data is provided', () => {
    // Arrange
    const data = {
      email: 'test@example.com',
      password: '123456',
    };

    // Act
    const [error, loginUserDto] = LoginUserDto.create(data);

    // Assert
    expect(error).toBeUndefined();
    expect(loginUserDto).toBeInstanceOf(LoginUserDto);
    expect(loginUserDto?.email).toBe(data.email);
    expect(loginUserDto?.password).toBe(data.password);
  });

  it('should return an error if email is missing', () => {
    // Arrange
    const data = {
      password: '123456',
    };

    // Act
    const [error] = LoginUserDto.create(data);

    // Assert
    expect(error).toBe('email is required');
  });

  it('should return an error if email is invalid', () => {
    // Arrange
    const data = {
      email: 'invalid-email',
      password: '123456',
    };

    // Act
    const [error] = LoginUserDto.create(data);

    // Assert
    expect(error).toBe('email is invalid');
  });

  it('should return an error if password is missing', () => {
    // Arrange
    const data = {
      email: 'test@example.com',
    };

    // Act
    const [error] = LoginUserDto.create(data);

    // Assert
    expect(error).toBe('password is required');
  });

  it('should return an error if password is too short', () => {
    // Arrange
    const data = {
      email: 'test@example.com',
      password: '123',
    };

    // Act
    const [error] = LoginUserDto.create(data);

    // Assert
    expect(error).toBe('password too short');
  });
});
