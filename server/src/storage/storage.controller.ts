import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  // @Post('upload/:storage')
  // @UserInterceptors(FilesInterceptor('files'))
  // async uploadFiles(
  //   @UploadedFiles(
  //     new ParseFilePipe({
  //       validators:[
  //         new MaxFileSizeValidator({ maxSize: 1024*1024*5}),
  //         new FileTypeValidator({ fileType: '.(jpg|jpeg|png)',}),
  //       ],
  //     }),
  //   )
  //   files: Express.Multer.File[],
  //   @Param('folderName') folderName: string,): Promise<{urls: string}>{
  //     try {
  //       const urls = await this.storageService.uploadFiles(files, folderName);
  //       await this.storageService.saveFileUrlToDatabase({folderName,urls});
  //       return {urls};
  //     }catch(error){
  //       throw error
  //     }
  //   }

  @Get()
  findAll() {
    return this.storageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageDto: UpdateStorageDto) {
    return this.storageService.update(+id, updateStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }
}
