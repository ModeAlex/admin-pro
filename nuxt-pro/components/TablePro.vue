<template>
   <div>
        <search-table :columns="columns" />
        <config-table>
            <template slot="left">
                <Button type="primary" ghost icon="md-add">添加菜单</Button>
            </template>
        </config-table>
        <Table border :columns="columns" :data="tableList"></Table>
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
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        tableList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
}
</script>