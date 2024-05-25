import { Module } from '@nestjs/common';
import { LeafController } from './leaf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaf } from './entity/leaf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Leaf])
  ],
  controllers: [LeafController]
})
export class LeafModule { }
