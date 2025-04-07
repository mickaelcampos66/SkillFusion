import { Controller, Post, Body, Inject } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    console.log('Registering user with data:', dto);
    return this.authService.register(dto);
  }
}
