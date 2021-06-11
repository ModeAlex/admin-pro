import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu extends Document {

    @Prop() // 菜单名称
    name: string;

    @Prop() // 菜单路由
    url: string;

    @Prop()
    level: number; // 菜单等级

    @Prop() // 子集
    children: Array<Menu>;

    @Prop() // 菜单icon
    icon: string;

    @Prop() // 父级关联ID
    parentId: string;

}

export const MenuSchema = SchemaFactory.createForClass(Menu);