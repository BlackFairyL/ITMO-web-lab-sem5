import { Get, Controller, Render, UseInterceptors, Post, UseGuards } from "@nestjs/common";
import { TimerInterceptor } from './timer.interceptor';
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

@UseInterceptors(TimerInterceptor)
@Controller()
export class AppController {
  @Get()
  @Render('index')
  getRootPage() {
    return { page: './template/index' };
  }
  @Get('about_me')
  @Render('about_me')
  getAbout_me() {
    return { page: 'about_me' };
  }
  @Get('contact')
  @Render('contact')
  getContact() {
    return { page: 'contact' };
  }

  @Get('feedback')
  @Render('feedback')
  getFeedback() {
    return { page: 'feedback' };
  }

  @Get('registration')
  @Render('registration')
  getLogin() {
    return { page: 'registration' };
  }

  @Get('test')
  @UseGuards(AuthGuard)
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return "magic";
  }
}
