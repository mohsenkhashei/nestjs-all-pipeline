import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this approach is outside of DI container
  // app.useGlobalGuards(new AuthGuard()); // oneway to add gurard
  // app.useGlobalInterceptors(new LoggingInterceptor()); // one way of adding interceptor without DI
  await app.listen(3000);
}
bootstrap();
