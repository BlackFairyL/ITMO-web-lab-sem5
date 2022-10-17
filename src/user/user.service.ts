import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserInfoDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id: +userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (user.id) {
      return user;
    }
    return null;
  }

  async createUser(DataUserDto: UserInfoDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: DataUserDto.email,
        name: DataUserDto.name,
      },
    });
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
