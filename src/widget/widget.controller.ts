import { Controller, Get, Render, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class WidgetController {
  @Get('chat')
  Home(@Res() res: Response) {
    return res.render('chat');
  };
}
