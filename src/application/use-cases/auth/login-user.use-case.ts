import { JwtAdapter } from '../../../config';
import { CustomError, LoginUserDto } from '../../../domain';
import { IAuthRepository } from '../../interfaces/IAuthRepository';
import type { StringValue } from 'ms';

interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    status: boolean;
  };
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<LoginUserResponse>;
}

type SignToken = (
  payload: object,
  duration?: StringValue,
) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  }
}
