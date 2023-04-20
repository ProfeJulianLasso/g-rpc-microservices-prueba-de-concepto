import { Module } from '@nestjs/common';
import { Micro1Controller } from './controllers/micro1.controller';

@Module({
  imports: [],
  controllers: [Micro1Controller],
  providers: [],
})
export class Micro1Module {}
