import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { HeroModule } from './hero/hero.module';
import { Constants } from './assets/constants';

@Module({
  imports: [    
    GraphQLModule.forRoot({
      autoSchemaFile: Constants.SCHEMA_FILENAME,
      context: ({ req }) => ({ req }),
    }
    ),
    MongooseModule.forRoot(Constants.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    AuthModule,
    UserModule,
    HeroModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
