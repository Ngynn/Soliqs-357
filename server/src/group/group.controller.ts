/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,  Delete, HttpException, HttpStatus, Query, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
// import { Group } from './entities/group.entity';

@Controller('v1/group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
   async create(@Body() createGroupDto: CreateGroupDto) {
    const requiredFields = ['name', 'owner'];
    const missingFields = requiredFields.filter(
      (field) => !createGroupDto[field],
    );
    if (missingFields.length > 0) {
      throw new HttpException(
        `Missing required fields: ${missingFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newGroup = await this.groupService.create(createGroupDto);
      return newGroup;
    } catch (error) {
      throw error;
    }
  }
  
  @Get()
  async findAll() {
    try {
      const groups = await this.groupService.findAll();
      return groups;
    } catch (error) {
      throw error;
    }
  }

  @Get('detail')
  async findOne(@Query('id') id: string) {
    try {
      const group = await this.groupService.findOne(id);
      return group;
    } catch (error) {
      throw error;
    }

  }

  @Put('detail')
  async update(@Query('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    try {
      const updatedGroup = await this.groupService.update(id, updateGroupDto);
      return updatedGroup;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async remove(@Query('id') id: string) {
    try {
      const deletedGroup = await this.groupService.remove(id);
      return deletedGroup;
    } catch (error) {
      throw error;
    }
  }

  @Get('name')
  async findByName(@Query('name') name: string) {
    try {
      const group = await this.groupService.findByName(name);
      return group;
    } catch (error) {
      throw error;
    }
  }

  
}
