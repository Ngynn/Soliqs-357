import { HttpException, Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  // constructor(
  //   @InjectModel(Storage.name) private storageModel: Model<Storage>
  // ){}

  //   async uploadFiles( files:  Express.Multer.File[], folderName: string,): Promise<string[]>{
  //     try{
  //       const bucketName = 'gs://soliqs-web23s.appspot.com/';
  //       const publicUrls: string[] = [];

  //       await Promise.all(
  //         files.map(async (file)=>{
  //           const fileName = `images/${folderName}/${uuidv4()}-${file.originalname}`;
  //           const fileUpload = admin.storage().bucket(bucketName).file(fileName);
  //           const blobStream = fileUpload.createWriteStream({
  //             metadata:{
  //               contentType: file.mimetype,
  //             }, 
  //           });
  //           await new Promise((resolve,reject) => {
  //             blobStream.on('error', (error)=>{
  //               reject(error);
  //             });
  //             blobStream.on('finish', async () =>{
  //               const [imageURL] = await fileUpload.getSignedUrl({
  //                 action: 'read',
  //                 expires:'13-01-2101',
  //               });
  //               publicUrls.push(imageURL);
  //               resolve(imageURL);
  //             });
  //             blobStream.end(file.buffer);
  //           });
  //         }),
  //       )
  //       return publicUrls;                                                
  //     }catch(error){
  //       throw new HttpException(error.message, error.status);
  //     }
  //   }
  //   async saveFileUrlToDatabase(){}

  create(createStorageDto: CreateStorageDto) {
    return 'This action adds a new storage';
  }

  findAll() {
    return `This action returns all storage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storage`;
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return `This action updates a #${id} storage`;
  }

  remove(id: number) {
    return `This action removes a #${id} storage`;
  }
}
