import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as hbs from 'hbs';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next
      .handle()
      .pipe(map(() => hbs.registerHelper('time', function() {
        return ((Date.now() - startTime) + ' ms (server)')
      })));
  }
}
