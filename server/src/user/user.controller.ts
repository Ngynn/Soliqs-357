import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';

@Controller('v1/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @Post()
  // async create(@Headers() headers: any) {
  //   try {
  //     let authHeader = headers.authorization;
  //     authHeader = authHeader.repalce('Bearer ', '');
  //     let data = await this.authService.verifyToken(authHeader);
  //     let user: User = {
  //       uid: data.uid,
  //       email: data.email,
  //       name: data.name,
  //       picture: data.picture,
  //     };
  //     const createdUser = await this.userService.create(user);
  //     return createdUser;
  //   } catch (error) {
  //     throw new HttpException('Invalid', HttpStatus.FORBIDDEN);
  //   }
  // }

  @Post()
  async create(@Headers() headers: any) {
    try {
      let authHeader = headers.authorization;
      authHeader = authHeader.replace('Bearer ', '');
      let data = await this.authService.verifyToken(authHeader);
      let user: User = {
        uid: data.uid,
        email: data.email,
        name: data.name,
        picture: data.picture,
      };
      const createdUser = await this.userService.create(user);
      return createdUser;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
