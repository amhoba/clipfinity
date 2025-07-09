import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from '../database/entities/view.entity';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';

@Module({
    imports: [TypeOrmModule.forFeature([View])],
    controllers: [ViewsController],
    providers: [ViewsService],
    exports: [ViewsService],
})
export class ViewsModule { }
