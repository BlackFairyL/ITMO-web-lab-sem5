import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { FeedbackController } from './post/feedback.controller';
import { FeedbackService } from './post/feedback.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [AppModule],
  controllers: [AppController, UserController, FeedbackController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    FeedbackService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
