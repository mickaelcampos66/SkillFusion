import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
      @Inject() private authService: AuthService,
    ) {}

  @Post('signup')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
