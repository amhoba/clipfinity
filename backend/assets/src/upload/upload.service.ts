import { Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
    private readonly uploadDir = './uploads/videos'; // Configure your upload directory

    constructor() {
        // Ensure upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async uploadVideo(file: Express.Multer.File): Promise<UploadResponseDto> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // Validate file type
        const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type. Only video files are allowed.');
        }

        // Validate file size (e.g., max 100MB)
        const maxSize = 100 * 1024 * 1024; // 100MB in bytes
        if (file.size > maxSize) {
            throw new BadRequestException('File size too large. Maximum size is 100MB.');
        }

        const fileId = uuidv4();
        const fileExtension = path.extname(file.originalname);
        const filename = `${fileId}${fileExtension}`;
        const filepath = path.join(this.uploadDir, filename);

        // Save file to disk
        fs.writeFileSync(filepath, file.buffer);

        // Return response matching your frontend expectations
        return {
            id: fileId,
            url: `/uploads/videos/${filename}`, // Adjust based on your static file serving
            description: `Uploaded video: ${file.originalname}`,
            filename: filename,
            size: file.size,
            mimetype: file.mimetype,
            uploadedAt: new Date(),
        };
    }
}