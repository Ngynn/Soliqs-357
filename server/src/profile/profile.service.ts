import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>){}
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

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
