import { Get, Post, Delete, Query, Controller, HttpStatus } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { User } from '@prisma/client';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  async follow(@Query('email') email: string, @Query('username') username: string): Promise<User> {
    const UserDto = {
      email: email,
      name: username,
    }
    return await this.UserService.createUser(UserDto);
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @Delete(':username/delete')
  async unFollow(@Query('userId') userId: number, @Query('email') email: string): Promise<User> {
    const userWhereUniqueInput = {
      id: +userId,
      email: email
    };
    return await this.UserService.deleteUser(userWhereUniqueInput);
  }
}