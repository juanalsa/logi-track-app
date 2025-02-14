import { IAuthDatasource } from '../../application';
import { BcryptAdapter } from '../../config';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { UserMapper } from '../mappers/user.mapper';
import { prisma } from './database';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class MySQLDatasourceImpl implements IAuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      // 1. Verificar si el correo existe
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw CustomError.notFound('User not found');

      // 2. Verificar si la contraseña es correcta
      if (!this.comparePassword(password, user.password))
        throw CustomError.notFound('User not found');

      // 3. Retornar el usuario
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, phone, address, email, password, cityId } = registerUserDto;

    try {
      const emailExists = await prisma.user.findUnique({ where: { email } });

      if (emailExists) throw CustomError.badRequest('User already exists');

      // Guardar info contacto
      const contact = await prisma.contact.create({
        data: {
          name,
          phone,
          address,
          email,
          city_id: Number(cityId),
        },
      });

      if (!contact) throw CustomError.internalServer('Error creating contact');

      // Guardar info usuario
      const user = await prisma.user.create({
        data: {
          email,
          password: this.hashPassword(password),
          role: 'user',
          contact_id: contact.id,
        },
      });

      // Mapear user a UserEntity
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
