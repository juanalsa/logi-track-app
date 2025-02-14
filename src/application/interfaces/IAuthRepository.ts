import { LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';

export interface IAuthRepository {
  login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
