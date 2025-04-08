import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { validate } from 'class-validator';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject() private authService: AuthService,
    ) { }

    @Post('signup')
    register(@Body() dto: RegisterDto) {
        validate(dto).then(errors => {
            if (errors.length > 0) {
                throw new BadRequestException('Validation failed');
            }
        });
        return this.authService.register(dto);
    }
}
