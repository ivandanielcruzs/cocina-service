import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/domain/user.domain';
import { IUserRepository } from '../infra/database/interfaces/repositories/user.repository';
import { EncryptService } from '../infra/encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LoginToken } from './interfaces/loginToken.interface';
import { IAuthService } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<LoginToken | null> {
    const user = await this.userRepository.findByUserName(username);
    if (!user) {
      throw new UnauthorizedException('User is not properly identify');
    }
    const comparedPassword = await this.encryptService.compare(
      password,
      user.password,
    );
    if (comparedPassword) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '2 days',
        }),
      };
    } else throw new UnauthorizedException('User is not properly identify');
  }

  async validateUser(payload: any): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.userRepository.findById(payload?.sub);
  }

  async setUserToken(id: string, token: string): Promise<void> {
    return this.userRepository.setUserToken(id, token);
  }
}
