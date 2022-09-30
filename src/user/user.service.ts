import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserCreateDto, UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    DataUserDto: UserDto
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: DataUserDto
    });
    return user;
  }

  async createUser(DataUserDto: UserCreateDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: DataUserDto.email,
        name: DataUserDto.name,
      },
    });
  }

  async deleteUser(DataUserDto: Prisma.UserWhereUniqueInput): Promise<UserCreateDto> {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: DataUserDto.id,
      },
      select: {
        email: true,
        name: true,
      },
    });
    return deleteUser;
  }
}