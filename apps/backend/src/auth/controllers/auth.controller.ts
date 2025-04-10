import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('signup')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
