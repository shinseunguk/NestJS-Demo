import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './domain/cats.entity';
import { User } from './domain/user.entity';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './orm.config';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    CatsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats')
  }
}
