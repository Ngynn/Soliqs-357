import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    let idToken = req.headers['authorization'];
    if (idToken == undefined) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    const bearer = idToken.split(' ');
    const token = bearer[1];
    try {
      let verifiedToken = await this.authService.verifyToken(token);
      if (verifiedToken == null) {
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
      }
      req.payload = verifiedToken;
      next();
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
