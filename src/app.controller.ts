import { Get, Controller, Render, UseInterceptors, UseGuards } from "@nestjs/common";
import { TimerInterceptor } from './timer.interceptor';
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
  signed_in = true;
  @Get()
  @Render('index')
  getRootPage() {
    return {
      message: 'fuck',
      signed_in: this.signed_in };
  }
  @Get('about_me')
  @Render('about_me')
  getAbout_me() {
    return { signed_in: this.signed_in  };
  }
  @Get('contact')
  @Render('contact')
  getContact() {
    return { signed_in: this.signed_in  };
  }

  @Get('feedback')
  @Render('feedback')
  getFeedback() {
    return { signed_in: this.signed_in  };
  }

  @Get('registration')
  @Render('registration')
  getLogin() {
    return { signed_in: this.signed_in  };
  }

  @Get('test')
  @UseGuards(AuthGuard)
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return "magic";
  }
}
