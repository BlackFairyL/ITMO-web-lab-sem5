import {
  Get,
  Post,
  Delete,
  Query,
  Controller,
  HttpStatus,
  Body,
  Param,
  ValidationPipe,
  UseFilters,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfoDto, UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../http-exception.filter';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Get()
  async getProfile(@Query() userDto: UserDto): Promise<User> {
    userDto.id = +userDto.id;
    return await this.UserService.getUser(userDto);
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Post(':username/create')
  async follow(
    @Body() userInfoDto: UserInfoDto,
  ): Promise<User> {
    return await this.UserService.createUser(userInfoDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Delete(':username/delete')
  async unFollow(@Query() userDto: UserDto): Promise<UserInfoDto> {
    userDto.id = +userDto.id;
    return await this.UserService.deleteUser(userDto);
  }
}
