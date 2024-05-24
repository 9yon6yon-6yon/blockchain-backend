import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/user.model';
import { AddressModule } from 'src/address/address.module';
import { Address } from 'src/models/address.model';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Address]),AddressModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }