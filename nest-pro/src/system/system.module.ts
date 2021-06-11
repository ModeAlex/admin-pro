import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/system.menu'

@Module({
  imports: [MongooseModule.forFeature([ { name: Menu.name, schema: MenuSchema } ])],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule {}
