import { BcryptAdapter } from '../../../../config';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../../../domain';
import { MySQLDatasourceImpl, prisma } from '../../../../infrastructure';

jest.mock('../../../../infrastructure/datasource/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    contact: {
      create: jest.fn(),
    },
  },
}));

jest.mock('../../../../config', () => ({
  BcryptAdapter: {
    hash: jest.fn((password) => `hashed_${password}`),
    compare: jest.fn(
      (password, hashed) => password === hashed.replace('hashed_', ''),
    ),
  },
}));

describe('MySQLDatasourceImpl - Unit Tests', () => {
  let datasource: MySQLDatasourceImpl;

  beforeEach(() => {
    datasource = new MySQLDatasourceImpl();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return a user when credentials are correct', async () => {
      // Arrange
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        email: loginUserDto.email,
        password: 'hashed_password123',
        role: 'user',
        is_active: true,
        contact_id: 1,
        created_at: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (BcryptAdapter.compare as jest.Mock).mockReturnValue(true);

      // Act
      const result = await datasource.login(loginUserDto);

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginUserDto.email },
      });
      expect(result).toBeDefined();
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw an error if user does not exist', async () => {
      // Arrange
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(datasource.login(loginUserDto)).rejects.toThrow(
        CustomError.notFound('User not found'),
      );
    });

    it('should throw an error if password is incorrect', async () => {
      // Arrange
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        email: loginUserDto.email,
        password: 'hashed_password123',
        role: 'user',
        is_active: true,
        contact_id: 1,
        created_at: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (BcryptAdapter.compare as jest.Mock).mockReturnValue(false);

      // Act & Assert
      await expect(datasource.login(loginUserDto)).rejects.toThrow(
        CustomError.notFound('User not found'),
      );
    });

    it('should throw an internal server error if an unexpected error occurs', async () => {
      // Arrange
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error('DB error'),
      );

      // Act & Assert
      await expect(datasource.login(loginUserDto)).rejects.toThrow(
        CustomError.internalServer(),
      );
    });
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      // Arrange
      const registerUserDto: RegisterUserDto = {
        name: 'Test User',
        phone: '123456789',
        address: 'Cll 70 # 1A - 50',
        email: 'test@example.com',
        password: 'password123',
        cityId: '3',
      };

      const mockContact = {
        id: 1,
        name: registerUserDto.name,
        email: registerUserDto.email,
        phone: registerUserDto.phone,
        address: registerUserDto.address,
        city_id: 3,
        created_at: new Date(),
      };

      const mockUser = {
        id: '1',
        email: registerUserDto.email,
        password: 'hashed_password123',
        role: 'user',
        is_active: true,
        contact_id: 1,
        created_at: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.contact.create as jest.Mock).mockResolvedValue(mockContact);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      // Act
      const result = await datasource.register(registerUserDto);

      // Assert
      expect(result).toBeDefined();
      expect(result.email).toBe(registerUserDto.email);
      expect(prisma.contact.create).toHaveBeenCalled();
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should throw an error if email already exists', async () => {
      // Arrange
      const registerUserDto: RegisterUserDto = {
        name: 'Test User',
        phone: '123456789',
        address: 'Cll 70 # 1A - 50',
        email: 'test@example.com',
        password: 'password123',
        cityId: '3',
      };

      const mockUser = {
        id: '1',
        email: registerUserDto.email,
        password: 'hashed_password123',
        role: 'user',
        is_active: true,
        contact_id: 1,
        created_at: new Date(),
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      // Act & Assert
      await expect(datasource.register(registerUserDto)).rejects.toThrow(
        CustomError.badRequest('User already exists'),
      );
    });

    it('should throw an error if contact creation fails', async () => {
      // Arrange
      const registerUserDto: RegisterUserDto = {
        name: 'Test User',
        phone: '123456789',
        address: 'Cll 70 # 1A - 50',
        email: 'test@example.com',
        password: 'password123',
        cityId: '3',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.contact.create as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      expect(datasource.register(registerUserDto)).rejects.toThrow(
        CustomError.internalServer('Error creating contact'),
      );
    });

    it('should throw an internal server error if an unexpected error occurs', () => {
      // Arrange
      const registerUserDto: RegisterUserDto = {
        name: 'Test User',
        phone: '123456789',
        address: 'Cll 70 # 1A - 50',
        email: 'test@example.com',
        password: 'password123',
        cityId: '3',
      };

      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error('DB error'),
      );

      // Act & Assert
      expect(datasource.register(registerUserDto)).rejects.toThrow(
        CustomError.internalServer(),
      );
    });
  });
});
