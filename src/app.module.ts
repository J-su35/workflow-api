import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoginLoggerMiddleware } from './middlewares/login-logger.middleware';

// old
// @Module({
//   imports: [
//     ItemsModule,
//     ConfigModule.forRoot({ isGlobal: true }),
//     DbModule,
//     UsersModule,
//     AuthModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// new
@Module({
  imports: [ItemsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UsersModule,
    AuthModule
  ]
})
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginLoggerMiddleware)
    .forRoutes({ path: '*login*', method: RequestMethod.POST})
  }
}
