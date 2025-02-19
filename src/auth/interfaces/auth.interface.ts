import { User } from 'src/domain/user.domain';
import { LoginToken } from './loginToken.interface';

export interface IAuthService {
  signIn(username: string, password: string): Promise<LoginToken | null>;
  validateUser(payload: any): Promise<User | null>;
}
