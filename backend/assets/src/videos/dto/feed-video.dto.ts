import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class FeedVideoDto {
    @IsString()
    src: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    likes: number;

    @IsNumber()
    views: number;

    @IsBoolean()
    liked: boolean;
}