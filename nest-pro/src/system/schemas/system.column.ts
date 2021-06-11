import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ColumnDocument = Column & Document;

@Schema()
export class Column extends Document {

    @Prop() // 项目名称
    name: string;

    @Prop() // 运行项目
    project: string;

    @Prop()
    author: string; // 作者

    @Prop() // 创建时间
    createTime: Date;
    
}

export const ColumnSchema = SchemaFactory.createForClass(Column);