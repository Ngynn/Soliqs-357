/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserController } from './user/user.controller';
import { ProfileController } from './profile/profile.controller';
import { StorageModule } from './storage/storage.module';
import { StorageController } from './storage/storage.controller';
import { NotificationModule } from './notification/notification.module';
import { TagModule } from './tag/tag.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';
import { CommentModule } from './comment/comment.module';
import { GroupController } from './group/group.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Soliqs357:13112002@cluster0.p4wsplu.mongodb.net/',
    ),
    AuthModule,
    UserModule,
    ProfileModule,
    StorageModule,
    NotificationModule,
    TagModule,
    MessageModule,
    ChatModule,
    GroupModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'v1/user', method: RequestMethod.POST },
        { path: 'v1/profile', method: RequestMethod.POST },
      )
      .forRoutes(
        UserController,
        ProfileController,
        // PostController,
        StorageController,
        GroupController,
      );
  }
}
