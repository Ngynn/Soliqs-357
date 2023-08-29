/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { StorageModule } from './storage/storage.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Soliqs357:13112002@cluster0.p4wsplu.mongodb.net/'),
    AuthModule,
    UserModule,
    ProfileModule,
    StorageModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
