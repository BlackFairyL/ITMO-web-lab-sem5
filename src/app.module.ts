import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from "./app.controller";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [AppModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
