import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { CreateStorageDto } from './dto/create-storage.dto';
import { Storage } from './entities/storage.entity';

import * as admin from 'firebase-admin';

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(Storage.name) private storageModel: Model<Storage>,
  ) {}

  async uploadFiles(
    files: Express.Multer.File[],
    folderName: string,
  ): Promise<string[]> {
    try {
      const bucketName = 'soliqs-web23s.appspot.com';
      const publicUrls: string[] = [];

      await Promise.all(
        files.map(async (file) => {
          const fileName = `images/${folderName}/${uuidv4()}-${
            file.originalname
          }`;
          const fileUpload = admin.storage().bucket(bucketName).file(fileName);

          const blobStream = fileUpload.createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });

          await new Promise((resolve, reject) => {
            blobStream.on('error', (error) => {
              reject(error);
            });

            blobStream.on('finish', async () => {
              const [imageURL] = await fileUpload.getSignedUrl({
                action: 'read',
                expires: '12-01-2101',
              });
              publicUrls.push(imageURL);
              resolve(imageURL);
            });

            blobStream.end(file.buffer);
          });
        }),
      );
      return publicUrls;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async saveFileUrlToDatabase(
    createStorageDto: CreateStorageDto,
  ): Promise<Storage> {
    try {
      const fileUrl = new this.storageModel(createStorageDto);
      return await fileUrl.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getFilesByFolderName(folderName: string): Promise<Storage> {
    try {
      return await this.storageModel.findOne({ folderName }).exec();
    } catch (error) {
      throw error;
    }
  }
}
