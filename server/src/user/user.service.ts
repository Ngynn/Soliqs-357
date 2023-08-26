/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpCode, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModule } from './user.module';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, ){}
  async create(createUserDto: CreateUserDto){
    try{
      let isExits = await this.userModel.findOne({uid: createUserDto.uid})
      if(isExits){
        return new HttpException(HttpCode,HttpStatus.BAD_REQUEST);
      }else{
        return await new this.userModel(createUserDto).save();
      }
    }
    catch(error){
      return error
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    try{
     return await this.userModel.findOne({uid: id})
    }
    catch(error){
     return error

    }
 }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { uid: id },
        { ...updateUserDto },
        { new: true },
      );
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

 async remove(id: string) {
    try{
      let isExits = await this.userModel.findOne({id: id})
      if(isExits){
        return new HttpException(HttpCode,HttpStatus.BAD_REQUEST);
      }else{
        return await this.userModel.findByIdAndDelete(id);
      }
    }catch(error){
      return error
    }
  }
}
