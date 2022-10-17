import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserInfoDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async createUser(data: UserInfoDto): Promise<User> {
    console.log("KEK   " + data.id);
    const userbyId = await this.getUser(data.id);
    const userByEmail = await this.getUserByEmail(data.email);
    if (!userbyId && !userByEmail) {
    return this.prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
      },
    });
    }
  }

  async deleteUser(dataUserDto: UserDto): Promise<UserInfoDto> {
    const user = await this.getUser(dataUserDto.id);
    if (user) {
      const deleteUser = await this.prisma.user.delete({
        where: {
          id: dataUserDto.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return deleteUser;
    }

    return null;
  }
}
