import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadService } from './upload.service';
import { UploadResponseDto } from './dto/upload-response.dto';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('video', {
            limits: {
                fileSize: 100 * 1024 * 1024, // 100MB
            },
            fileFilter: (req, file, cb) => {
                const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException('Invalid file type. Only video files are allowed.'), false);
                }
            },
        })
    )
    async uploadVideo(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<UploadResponseDto> {
        return await this.uploadService.uploadVideo(file);
    }
}
