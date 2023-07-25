import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    { provide: APP_GUARD, useClass: AuthGuard }, // third way of adding guard
    {
      provide: APP_INTERCEPTOR, // third way of adding interceptor
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      '*',
      // { path: '/path', method: RequestMethod.GET }
    );
  }
}
