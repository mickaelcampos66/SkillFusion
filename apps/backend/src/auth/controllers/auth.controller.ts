import { validate } from 'class-validator';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject() private authService: AuthService,
    ) { }

    @Post('signup')
    register(@Body() dto: RegisterDto) {
        this.validData(dto);
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        this.validData(dto);
        return this.authService.login(dto);
    }

    private validData(dto: RegisterDto | LoginDto): boolean {
        validate(dto).then(errors => {
            if (errors.length > 0) {
                throw new Error('Validation failed');
            }
        });
        return true;
    }
}
