import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageSchema } from './entities/storage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Storage', schema: StorageSchema }]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
