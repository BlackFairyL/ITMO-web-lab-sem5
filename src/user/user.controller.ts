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
  @Get()
  async getProfile(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('email') email: string,
  ): Promise<User> {
    const UserDto = {
      id: +userId,
      email: email,
    };
    return await this.UserService.getUser(UserDto);
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post(':username/create')
  async follow(
    @Body(new ParseArrayPipe({ items: UserInfoDto })) userInfoDto: UserInfoDto,
  ): Promise<User> {
    return await this.UserService.createUser(userInfoDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':username/delete')
  async unFollow(@Query() userDto: UserDto): Promise<UserInfoDto> {
    userDto.id = +userDto.id;
    return await this.UserService.deleteUser(userDto);
  }
}
