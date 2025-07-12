import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Client;
  private readonly bucketName = 'videos';

  constructor() {
    this.minioClient = new Client({
      endPoint: 'minio', // Docker Compose service name
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
      secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
    });
  }

  async onModuleInit() {
    // Ensure bucket exists or create it using Promises
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, '');
      console.log(`✅ Bucket "${this.bucketName}" created.`);
    } else {
      console.log(`✅ Bucket "${this.bucketName}" already exists.`);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const objectName = `${Date.now()}-${file.originalname}`;
    const stream = Readable.from(file.buffer);

    await this.minioClient.putObject(this.bucketName, objectName, stream, file.size, {
      'Content-Type': file.mimetype,
    });

    return objectName;
  }

  async getSignedUrl(objectName: string, expirySeconds = 3600): Promise<string> {
    return this.minioClient.presignedGetObject(
      this.bucketName,
      objectName,
      expirySeconds
    );
  }
}
