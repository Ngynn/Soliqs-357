/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { UserService } from 'src/user/user.service';

@Controller('v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService, private readonly userService: UserService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
      try{
        const isExits = await this.profileService.findOne(createProfileDto.id)
        if(isExits){
          throw new HttpException('Profile already exists', HttpStatus.BAD_REQUEST);
        }
        const newProfile = await this.profileService.create(createProfileDto);
        if(!newProfile){
          try{
            await this.userService.remove(createProfileDto.id)
          } catch(error){
                throw new Error(error);
          }
        }
        else{
          this.userService.update(createProfileDto.id,{
            profile: newProfile.id
          });
        }
        return newProfile;
      }
      catch(error){
        throw error;   
      }
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
