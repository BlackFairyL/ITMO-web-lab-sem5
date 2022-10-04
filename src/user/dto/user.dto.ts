import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  @IsNumberString()
  id: number;

  @ApiProperty({
    description: 'User email',
    example: 'kek@kek.ru',
  })
  @IsEmail()
  email: string;
}

export class UserInfoDto {
  @ApiProperty({
    description: 'user name',
    example: 'Jojo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'kek@kek.ru',
  })
  @IsEmail()
  email: string;
}
