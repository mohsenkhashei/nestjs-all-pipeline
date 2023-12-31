import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FreezPipe } from './pipes/freeze.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { AuthGuard } from './guards/auth.guard';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard) // second way of adding guard
  // @UseInterceptors(LoggingInterceptor) //second way of adding interceptor
  // @UseFilters(HttpExceptionFilter) third way of adding filters
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  // @UsePipes(FreezPipe) second way of adding pipe
  examplePost(
    @Body(
      new FreezPipe(), // another way of adding pipe
    )
    body: any,
  ) {
    body.test = 23;
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }
}
