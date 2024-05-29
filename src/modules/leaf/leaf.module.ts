import { Module } from '@nestjs/common';
import { LeafController } from './leaf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaf } from './entity/leaf.entity';
import { LeafService } from './leaf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leaf])
  ],
  controllers: [LeafController],
  providers: [LeafService]
})
export class LeafModule { }
