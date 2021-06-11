import { Controller, Query, Post, Body } from '@nestjs/common';
import { SystemService } from './system.service'
import {
    PageListDto
} from '../dto/page-list.dto'
import { CreateMenuDto } from './dto/create-menu.dto'
import { CreateColumnDto } from './dto/create-column.dto';
import {
    validate
} from 'class-validator'

@Controller('system')
export class SystemController {
    constructor(private readonly appService: SystemService) {}


    // 获取菜单结构
    @Post('/menuAll')
    async getMenuAll() {
        const menuData = await this.appService.findMenuAll()
        console.log(menuData)
        return {
            code: 0,
            data: menuData
        }
    }

    // 获取菜单列表
    @Post('/menuList')
    async getMenuList(@Body() body: { current: number, pageSize: number }) {
        const post = new PageListDto();
        post.current = body.current;
        post.pageSize = body.pageSize;
        return validate(post).then(async err => {
            if (err.length === 0) {
                const res = await this.appService.findMenu(body);
                return Object.assign({ code: 0 }, res);
            } else {
                return err
            }
        })
    }

    // 新增菜单数据
    @Post('/menuAdd')
    async addMenu(@Body() body: any) {
        let post = new CreateMenuDto();
        post = Object.assign(post, body);
        return validate(post).then(async err => {
            if (err.length === 0) {
                const res = await this.appService.addMenu(post)
                return {
                    code: 0,
                    data: res
                }
            } else {
                return err
            }
        })
    }

    // 修改菜单数据
    @Post('/menuUpdate')
    updateMenu() {

    }

    // 删除菜单数据
    @Post('/menuDel')
    delMenu(@Query() query: { id: string }) {
        this.appService.delMenu(query.id)
        return {
            code: 0,
            data: null
        }
    }

    // 获取菜单数据

    // 获取表头管理列表
    @Post('/columnList')
    getColumnList(@Body() body: any) {
        const post = new PageListDto();
        post.current = body.current;
        post.pageSize = body.pageSize;
        return validate(post).then(async err => {
            if (err.length === 0) {
                const columndto = new CreateColumnDto();
                return validate(columndto)
            } else {
                return err
            }
        })

    }

}
