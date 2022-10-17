import { Get, Controller, Render, UseInterceptors, UseGuards, Res } from "@nestjs/common";
import { TimerInterceptor } from './timer.interceptor';
import { SessionContainer } from "supertokens-node/recipe/session";
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';
import { Response } from 'express';


@Controller()
@UseInterceptors(TimerInterceptor)
export class AppController {
  signed_in = false;
  @Get()
  getRootPage(@Res() res: Response) {
    return res.render('index', {
      signed_in: this.signed_in
    });
  };
  @Get('about_me')
  getAbout_me(@Res() res: Response) {
    return res.render('about_me', {
      signed_in: this.signed_in
    });
  };
  @Get('contact')
  getContact(@Res() res: Response) {
    return res.render('contact', {
      signed_in: this.signed_in
    });
  };

  @Get('feedback')
  getFeedback(@Res() res: Response) {
    return res.render('feedback', {
      signed_in: this.signed_in
    });
  };

  @Get('registration')
  getLogin(@Res() res: Response) {
    return res.render('registration', {
      signed_in: this.signed_in
    });
  };

  @Get('test')
  @UseGuards(AuthGuard)
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    return "magic";
  };
}
