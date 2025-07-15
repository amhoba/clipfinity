import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
    @IsString()
    @IsNotEmpty()
    object_id: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
