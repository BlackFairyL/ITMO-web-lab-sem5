import { Get, Controller, Render, UseInterceptors, Post } from "@nestjs/common";
import { TimerInterceptor } from './timer.interceptor';

@UseInterceptors(TimerInterceptor)
@Controller()
export class AppController  {
  @Get()
  @Render('index')
  getRootPage() {
    return { page: "./template/index" }
  }
  @Get("about_me")
  @Render('about_me')
  getContact() {

    return {page : "about_me"}
  }
}
