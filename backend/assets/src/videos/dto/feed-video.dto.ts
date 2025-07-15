import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class FeedVideoDto {
    @IsString()
    id: string;

    @IsString()
    src: string;

    @IsString()
    description: string;

    @IsNumber()
    likes: number;

    @IsNumber()
    views: number;

    @IsBoolean()
    liked: boolean;

    @IsBoolean()
    @IsOptional()
    isSpecialItem?: boolean;
}