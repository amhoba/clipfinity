import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateVideoDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
