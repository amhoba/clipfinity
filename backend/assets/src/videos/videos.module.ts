import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video, Like, View } from '../database/entities';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MinioService } from '../minio/minio.service';

@Module({
    imports: [TypeOrmModule.forFeature([Video, Like, View])],
    controllers: [VideosController],
    providers: [VideosService, MinioService],
    exports: [VideosService],
})
export class VideosModule { }