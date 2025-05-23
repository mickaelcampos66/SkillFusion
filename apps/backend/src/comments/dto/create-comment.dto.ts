import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a great post!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'ID of the user creating the comment',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'ID of the post being commented on',
    example: 42,
  })
  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
