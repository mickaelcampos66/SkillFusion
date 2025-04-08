import { IsEmail, IsString, IsNotEmpty, IsOptional, IsPhoneNumber, Length, Matches } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
    password: string;

    @IsPhoneNumber('FR')
    @IsOptional()
    phone_number: string;
 
    @IsString() 
    @IsOptional()
    address: string;
}