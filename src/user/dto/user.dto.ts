import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;

}


export class UserCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
