<template>
    <div class="container">
        <search-table :columns="columns" @task="getTableList" />
        <config-table
            @density="setTableDensity"
        >
            <template slot="left">
                <Button type="primary" ghost icon="md-add" @click="openCreateOrUpdateTable({title: '新增菜单', status: 'create'})">添加菜单</Button>
            </template>
        </config-table>
        <Table border :columns="columns" :data="tableList"
            :size="tableConfig.size"
            row-key="_id"
        >
            <template slot-scope="{row}" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="openCreateOrUpdateTable({
                    title: `编辑菜单：${row.name}`,
                    status: 'update',
                    row
                })">编辑</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>
        </Table>
        <create-or-update-table
            ref="CreateOrUpdateTable"
            @task="createOrUpdate"
        />
    </div>
</template>

<script>
import SearchTable from '@/components/SearchTable'
import ConfigTable from '@/components/ConfigTable'
import CreateOrUpdateTable from '@/components/CreateOrUpdateTable'
export default {
    components: {
        SearchTable,
        ConfigTable,
        CreateOrUpdateTable
    },
    data() {
        return {
            columns: [
                {
                    title: 'ID',
                    key: '_id',
                    align: 'center',
                },
                {
                    title: '菜单名称',
                    search: true,
                    key: 'name',
                    align: 'center',
                    create: true,
                    update: true
                },
                {
                    title: '指向路由',
                    search: true,
                    key: 'url',
                    align: 'center',
                    create: true,
                    update: true
                },
                {
                    title: '菜单等级',
                    key: 'level',
                    align: 'center',
                    defaultValue: 1
                },
                {
                    title: '图标',
                    key: 'icon',
                    align: 'center',
                    create: true,
                    update: true
                },
                {
                    title: '关联上级',
                    key: 'parentId',
                    align: 'center',
                    create: true,
                    update: true
                },
                {
                    title: '操作',
                    align: 'center',
                    fixed: 'right',
                    slot: 'action',
                }
            ],
            tableList: [],
            current: 1,
            pageSize: 10,
            tableConfig: {
                size: 'default'
            }
        }
    },
    mounted() {
        this.getTableList()
    },
    methods: {
        async getTableList(params = {}) {
            console.log(params)
            const res = await this.$axios('/system/menuList', {
                method: 'post',
                data: Object.assign({
                    current: this.current,
                    pageSize: this.pageSize
                }, params)
            });
            if (res.code === 0) {
                this.tableList = res.data;
                console.log(this.tableList)
            }
        },
        openCreateOrUpdateTable({title, status, row}) {
            this.$refs.CreateOrUpdateTable.init({
                title,
                columns: this.columns,
                status,
                row
            })
        },
        createOrUpdate({status, formData}) {
            const url = status === 'create' ? '/system/menuAdd' : '/system/menuUpdate'
            this.$axios(url, {
                method: 'post',
                data: formData
            }).then(res => {
                if (res.code === 0) {
                    this.getTableList();
                    this.$Message.success('操作成功')
                } else {
                    return this.$Message.error(res.msg || 'server error')
                }
            })
        },
        remove(row) {
            this.$Modal.confirm({
                title: '删除',
                content: '<p>删除不可恢复，确定要删除吗？</p>',
                onOk: async () => {
                    await this.$axios('/system/menuDel?id=' + row._id, {
                        method: 'post'
                    }).then(res => {
                        console.log('res', res)
                        if (res.code === 0) {
                            this.getTableList();
                            return this.$Message.success('操作成功')
                        }
                        return this.$Message.error(res.msg);
                    })
                },
            });
        },
        setTableDensity(size) {
            console.log(size);
            this.tableConfig.size = size
        }
    }
}
</script>