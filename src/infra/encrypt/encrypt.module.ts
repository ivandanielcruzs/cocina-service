import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { BcryptAdapter } from './adapter/bcrypt.adapter';

@Module({
  imports: [],
  providers: [
    EncryptService,
    {
      provide: 'ENCRYPT_SERVICE',
      useClass: BcryptAdapter,
    },
  ],
  exports: [EncryptService, 'ENCRYPT_SERVICE'],
})
export class EncryptsModule {}
