import {
  Get,
  Post,
  Delete,
  Query,
  Controller,
  HttpStatus,
  Body,
  UseFilters, Param, ParseIntPipe, UseGuards
} from "@nestjs/common";
import { UserService } from './user.service';
import { UserInfoDto, UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { ApiBasicAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from '../http-exception.filter';
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/recipe/session";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Get()
  async getProfile( @Query('id') id: string): Promise<User> {
    return await this.UserService.getUser(id);
  }

  @ApiOperation({ summary: 'Get by email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Get('byEmail')
  async getUserByEmail( @Query('email') email: string): Promise<User> {
    return await this.UserService.getUserByEmail(email);
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Post('/create')
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  async follow(@Session() session: SessionContainer,
    @Body() userInfoDto: UserInfoDto,
  ): Promise<User> {
    console.log(userInfoDto.id, userInfoDto.email, userInfoDto.name);
    return await this.UserService.createUser(userInfoDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseFilters(HttpExceptionFilter)
  @Delete('/delete')
  async unFollow(@Query() userDto: UserDto): Promise<UserInfoDto> {
    return await this.UserService.deleteUser(userDto);
  }
}
