import { Injectable, Inject } from '@nestjs/common';
import { IEncryptAdapter } from './interfaces/encryptAdapter.interface';

@Injectable()
export class EncryptService {
  constructor(
    @Inject('ENCRYPT_SERVICE') private readonly encryptor: IEncryptAdapter,
  ) {}

  async hash(data: string): Promise<string> {
    return this.encryptor.hash(data);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return this.encryptor.compare(data, encrypted);
  }
}
