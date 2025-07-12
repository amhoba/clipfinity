import { Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';
import { UploadResponseDto } from './dto/upload-response.dto';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class UploadService {
    constructor(private readonly minioService: MinioService) { }

    async uploadVideo(file: Express.Multer.File): Promise<UploadResponseDto> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type.');
        }

        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new BadRequestException('File size too large.');
        }

        const objectName = await this.minioService.uploadFile(file);
        const signedUrl = await this.minioService.getSignedUrl(objectName);

        return {
            id: objectName,
            url: signedUrl, // direct signed URL
            description: `Uploaded video: ${file.originalname}`,
            filename: objectName,
            size: file.size,
            mimetype: file.mimetype,
            uploadedAt: new Date(),
        };
    }
}
