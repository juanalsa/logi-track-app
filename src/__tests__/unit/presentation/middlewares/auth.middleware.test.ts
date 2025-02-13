import { JwtAdapter } from '../../../../config';
import { prisma } from '../../../../infrastructure';
import { AuthMiddleware } from '../../../../presentation';

jest.mock('../../../../config', () => ({
  JwtAdapter: {
    validateToken: jest.fn(),
  },
}));

jest.mock('../../../../infrastructure/datasource/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe('AuthMiddleware - Unit Tests', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { header: jest.fn(), body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should allow access if token is valid and user is active', async () => {
    // Arrange
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hashed_password123',
      role: 'user',
      is_active: true,
      contact_id: 1,
      created_at: new Date(),
    };

    req.header.mockReturnValue('Bearer valid_token');
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue({ id: '1' });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Assert
    expect(req.body.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token is provided', async () => {
    // Arrange
    req.header.mockReturnValue(null);

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
  });

  it('should return 401 if token does not start with "Bearer "', async () => {
    // Arrange
    req.header.mockReturnValue('InvalidTokenFormat');

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });

  it('should return 401 if token is invalid', async () => {
    // Arrange
    req.header.mockReturnValue('Bearer invalid_token');
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(null);

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });

  it('should return 500 if user is not found', async () => {
    // Arrange
    req.header.mockReturnValue('Bearer valid_token');
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue({ id: '1' });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid token: User not found',
    });
  });

  it('should return 401 if user is not active', async () => {
    // Arrange
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hashed_password123',
      role: 'user',
      is_active: false,
      contact_id: 1,
      created_at: new Date(),
    };

    req.header.mockReturnValue('Bearer valid_token');
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue({ id: '1' });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Asserts
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'User is not active' });
  });

  it('should return 500 if an unexpected error occurs', async () => {
    // Arrange
    req.header.mockReturnValue('Bearer valid_token');
    (JwtAdapter.validateToken as jest.Mock).mockRejectedValue(
      new Error('Unexpected Error'),
    );

    // Act
    await AuthMiddleware.validateJwt(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
