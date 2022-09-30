import { Get, Post, Delete, Query, Controller, HttpStatus, Body } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserCreateDto, UserDto } from "./dto/user.dto";
import { User } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam
} from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @ApiOperation({ summary: "Get user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Get()
  async getProfile(@Query('userId') userId: number, @Query('email') email: string): Promise<User> {
    const UserDto = {
      id: +userId,
      email: email
    };
    return await this.UserService.getUser(UserDto);
  }
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Post(':username/create')
  async follow(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return await this.UserService.createUser(userCreateDto);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })

  @Delete(':username/delete')
  async unFollow(@Body() userDto: UserDto): Promise<UserCreateDto> {
    return await this.UserService.deleteUser(userDto);
  }
}