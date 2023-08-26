/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { HttpCode, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>, ){}
  async create(createProfileDto: CreateProfileDto) {
    try{
      let isExits = await this.profileModel.findOne({id: createProfileDto.id})
      if(isExits){
        return new HttpException(HttpCode,HttpStatus.BAD_REQUEST);
      }else{
        return await new this.profileModel(createProfileDto).save();
      }
    }
    catch(error){
      return error
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: string) {
     try{
      return await this.profileModel.findOne({id: id})
     }
     catch(error){
      return error

     }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try{
      let isExits = await this.profileModel.findOne({id: id})
      if(isExits){
        return new HttpException(HttpCode,HttpStatus.BAD_REQUEST);
      }else{
        return await  this.profileModel.findByIdAndUpdate(id,{...updateProfileDto},{new : true});
      }
    } catch(error){
      return error
    }
  }

  async remove(id: string) {
    try{
      let isExits = await this.profileModel.findOne({id: id})
      if(isExits){
        return new HttpException(HttpCode,HttpStatus.BAD_REQUEST);
      }else{
        return await this.profileModel.findByIdAndDelete(id);
      }
    }catch(error){
      return error
    }
  
  }
}
