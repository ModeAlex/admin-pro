<template>
    <div class="container">
        <search-table
            :columns="columns"
        />
        <config-table />
        <Table :columns="columns">

        </Table>
    </div>
</template>

<script>
import SearchTable from '@/components/SearchTable'
import ConfigTable from '@/components/ConfigTable'

export default {
    components: {
        SearchTable,
        ConfigTable
    },
    data() {
        return {
            columns: [
                {
                    title: 'ID',
                    key: '_id'
                },
                {
                    title: '项目名称',
                    key: 'name',
                    search: true,
                },
                {
                    title: '运行项目',
                    key: 'project',
                    search: true,
                },
                {
                    title: '创建人',
                    key: 'author',
                    search: true,
                },
                {
                    title: '创建时间',
                    key: 'createTime'
                }
            ]
        }
    },

}
</script>