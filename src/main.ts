import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezPipe } from './pipes/freeze.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this approach is outside of DI container
  // app.useGlobalGuards(new AuthGuard()); // oneway to add gurard outside DI
  // app.useGlobalInterceptors(new LoggingInterceptor()); // one way of adding interceptor outside DI
  // app.useGlobalPipes(new FreezPipe()); // one way of adding pipe outside DI
  // app.useGlobalFilters(new HttpExceptionFilter()); // one way to adding exception filter outside DI
  await app.listen(3000);
}
bootstrap();
