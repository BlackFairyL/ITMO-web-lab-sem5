import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from "./auth/auth.middleware";

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: "https://b96b5021440011eda82991b2c12c63fc-eu-west-1.aws.supertokens.io:3570",
      apiKey: "oMRibJjbMhk1J8YBvRGewqa7HKdLQ5",
      appInfo: {
        appName: "web-lab",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/api/auth",
        websiteBasePath: "/",
      },
    }), AppModule, AuthModule, AuthModule
  ],
  controllers: [AppController, UserController, FeedbackController],
  providers: [ AppService,
    UserService,
    PrismaService,
    FeedbackService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware);
  }
}
