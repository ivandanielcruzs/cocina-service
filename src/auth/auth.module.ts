import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RepositoriesModule } from '../infra/database/adapters/mongo/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { EncryptsModule } from '../infra/encrypt/encrypt.module';

@Module({
  imports: [RepositoriesModule, JwtModule, EncryptsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
