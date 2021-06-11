import {
    MinLength,
    Min,
    IsInt
} from 'class-validator';

export class PageListDto {

    @IsInt({ message: 'current不是int类型' })
    @Min(1, {
        message: '当前页数最少为1'
    })
    current: number;

    @IsInt({ message: 'current不是int类型' })
    @Min(1, {
        message: '每页条数最少为1'
    })
    pageSize: number;
}