import { RegisterUserDto } from '../../../../../domain';

describe('RegisterUserDto - Unit Tests', () => {
  it('should create a valid RegisterUserDto when correct data is provided', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const [error, registerUserDto] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBeUndefined();
    expect(registerUserDto).toBeInstanceOf(RegisterUserDto);
    expect(registerUserDto?.name).toBe(data.name);
    expect(registerUserDto?.phone).toBe(data.phone);
    expect(registerUserDto?.address).toBe(data.address);
    expect(registerUserDto?.email).toBe(data.email);
    expect(registerUserDto?.password).toBe(data.password);
    expect(registerUserDto?.cityId).toBe(data.cityId);
  });

  it('should return an error if name is missing', () => {
    // Arrange
    const data = {
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('name is required');
  });

  it('should return an error if phone is missing', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('phone is required');
  });

  it('should return an error if address is missing', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      email: 'test33@hotmail.com',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('address is required');
  });

  it('should return an error if email is missing', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('email is required');
  });

  it('should return an error if email is invalid', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'invalid-email',
      password: '12345678',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('email is invalid');
  });

  it('should return an error if password is missing', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('password is required');
  });

  it('should return an error if password is too short', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '123',
      cityId: '3',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('password too short');
  });

  it('should return an error if cityId is missing', () => {
    // Arrange
    const data = {
      name: 'Pepito Pérez',
      phone: '3105466789',
      address: 'Cll 70 # 1A - 50',
      email: 'test33@hotmail.com',
      password: '12345678',
    };

    // Act
    const [error] = RegisterUserDto.create(data);

    // Assert
    expect(error).toBe('cityId is required');
  });
});
