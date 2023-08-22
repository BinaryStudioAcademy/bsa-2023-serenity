import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/libs/types/types.js';
import { type UserService } from '#packages/users/user.service.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return this.userService.create(userRequestDto);
  }

  public async verifyLoginCredentials({
    email, // password, --> should be used for password comparison
  }: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return await this.userService.findByEmail(email);
  }

  public async signIn(id: number): Promise<UserSignInResponseDto> {
    return await this.userService.findById(id);
  }
}

export { AuthService };
