import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class FeedbackDto {
  @ApiProperty({
    description: 'Title feedback',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content feedback',
  })
  @IsNotEmpty()
  content?: string;

  @ApiProperty({
    description: 'Author email',
    example: 'kek@kek.ru',
  })
  @IsEmail()
  authorEmail: string;
}
