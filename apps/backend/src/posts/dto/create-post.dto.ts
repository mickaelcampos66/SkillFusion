import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        description: 'The title of the post',
        example: 'This is a sample post title.',
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: 'The content of the post',
        example: 'This is a sample post content.',
    })
    @IsString()
    @IsNotEmpty()
    content: string

    @ApiProperty({
        description: 'The author of the post',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number

    @IsDate()
    @ApiProperty({
        description: 'The date when the post was created',
        example: '2023-01-01T00:00:00Z',
    })
    created_at: Date
}
