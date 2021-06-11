import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from './schemas/system.menu';

@Injectable()
export class SystemService {
    constructor(@InjectModel('Menu') private MenuModel: Model<MenuDocument>) {}

    // 查询菜单结构
    async findMenuAll(): Promise<Menu[]> {
        return await this.MenuModel.find().exec()
    }

    // 查询菜单列表
    async findMenu(body): Promise<any> {
        let params = JSON.parse(JSON.stringify(body));
        delete params.current;
        delete params.pageSize;
        const total = await this.MenuModel.find().count();
        const skip = (body.current - 1) * body.pageSize;
        const data = await this.MenuModel.find(params).limit(body.pageSize).skip(skip).exec()
        return {
            total,
            data,
        }
    }

    // 新增菜单
    async addMenu(post): Promise<any> {
        return await this.MenuModel.create(post)
    }

    // 删除菜单
    async delMenu(id): Promise<any> {
        return await this.MenuModel.findById(id).remove();
    }



}
