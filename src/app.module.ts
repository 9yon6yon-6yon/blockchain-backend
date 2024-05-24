import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConnection from './database/connection';
import { AddressModule } from './address/address.module';
@Module({
  imports: [ ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule, AddressModule],
      useFactory: DatabaseConnection,
      inject: [ConfigService],
    }),
    UserModule,
    AddressModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
