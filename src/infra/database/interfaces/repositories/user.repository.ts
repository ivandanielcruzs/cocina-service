import { User } from 'src/domain/user.domain';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByUserName(username: string): Promise<User | null>;
  setUserToken(id: string, token: string): Promise<void>;
}
