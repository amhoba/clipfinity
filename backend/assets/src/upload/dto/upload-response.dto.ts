export class UploadResponseDto {
    id: string;
    url: string;
    description?: string;
    filename: string;
    size: number;
    mimetype: string;
    uploadedAt: Date;
}