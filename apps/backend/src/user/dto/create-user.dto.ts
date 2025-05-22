import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "User's first name",
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @ApiProperty({
    description: "User's email address",
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description:
      "User's password (Must contain uppercase, lowercase letters and digits)",
    example: 'Password123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  password!: string;

  @ApiPropertyOptional({
    description: "User's phone number (optional)",
    example: '+33612345678',
  })
  @IsPhoneNumber('FR')
  @IsOptional()
  phone_number?: string;

  @ApiPropertyOptional({
    description: "User's address (optional)",
    example: '123 Rue de Paris, 75001 Paris, France',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Role ID for the user (must be a valid integer)',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  role_id!: number;
}
