import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNumberString()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UserInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
