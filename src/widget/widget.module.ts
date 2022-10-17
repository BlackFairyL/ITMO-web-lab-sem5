import { Module } from '@nestjs/common';
import { WidgetController } from './widget.controller';
import { WidgetGateway } from "./widget,gateway";

@Module({
  providers:[WidgetGateway],
  controllers: [WidgetController]
})
export class WidgetModule {}
