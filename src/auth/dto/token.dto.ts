import { MinLength } from 'class-validator';

export class TokenFMC {
  @MinLength(10, { message: 'Token no pasado correctamente' })
  tokenFMC: string;
}
