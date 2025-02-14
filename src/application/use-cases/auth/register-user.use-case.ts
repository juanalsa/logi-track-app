import { RegisterUserDto } from '../../../domain';
import { IAuthRepository } from '../../interfaces/IAuthRepository';

interface RegisterUserResponse {
  user: {
    id: string;
    email: string;
    role: string;
    status: boolean;
  };
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<RegisterUserResponse>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponse> {
    const user = await this.authRepository.register(registerUserDto);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  }
}
