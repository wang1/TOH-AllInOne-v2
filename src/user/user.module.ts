import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { Constants } from 'src/assets/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Constants.USER_MODEL, schema: UserSchema}]),
    // forwordDef() AuthModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
