import {
    IsString,
    MinLength,
    MaxLength,
    IsInt,
    Min
} from 'class-validator';

export class CreateMenuDto {
    @MinLength(1, {
        message: '菜单名称不能为空',
    })
    @MaxLength(8, {
        message: '菜单名称不能超过8个字符',
    })
    @IsString()
    name: string;

    @MinLength(1, {
        message: '菜单路由不能为空',
    })
    @MaxLength(100, {
        message: '菜单名称不能超过100个字符',
    })
    @IsString()
    url: string;

    @Min(1, {
        message: '菜单等级最少为1'
    })
    @IsInt()
    level: number;

    children: Array<any>;

    @MinLength(1, {
        message: '菜单图标不能为空',
    })
    icon: string;

    parentId: string;

}