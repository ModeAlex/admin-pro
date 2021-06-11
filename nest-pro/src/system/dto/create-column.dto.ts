import {
    IsString,
    MinLength,
    MaxLength,
    IsInt,
    Min
} from 'class-validator';

export class CreateColumnDto {
    @MinLength(1, {
        message: '项目名称不能为空',
    })
    @MaxLength(8, {
        message: '项目名称不能超过8个字符',
    })
    @IsString()
    name: string;

    project: string;
    
    author: string;
    authorId: string;

    createTime: Date;
    
}