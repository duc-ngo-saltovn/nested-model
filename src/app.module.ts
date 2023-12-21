import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/modules/users.module';
import { User } from '@/entity/user.entity';
import { Comment } from '@/entity/comment.entity';
import { CommentModule } from '@/modules/Comment.module';
import { Music } from '@/entity/music.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: '127.0.0.1',
  //     port: 33061,
  //     username: 'admin',
  //     password: '123123',
  //     database: 'nestjs',
  //     autoLoadEntities: true,
  //     synchronize: true,
  //     entities: [User, Comment, Music],
  //   }),
  //   UsersModule,
  //   CommentModule,
  // ],
  // imports: [
  //   MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
  //   CommentModule,
  // ],
  controllers: [],
  providers: [],
})
export class AppModule { }
