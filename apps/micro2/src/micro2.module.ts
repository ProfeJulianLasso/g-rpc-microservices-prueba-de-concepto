import { Module } from '@nestjs/common';
import { Micro2Controller } from './micro2.controller';

@Module({
  imports: [],
  controllers: [Micro2Controller],
  providers: [],
})
export class Micro2Module {}
