<template>
    <div class="container">
        <search-table/>
        <config-table/>
        <Table
            
        >

        </Table>
    </div>
</template>

<script>
import SearchTable from '@/components/SearchTable';
import ConfigTable from '@/components/ConfigTable';

export default {
    components: {
        SearchTable,
        ConfigTable
    },
    data() {
        return {
            
        }
    }
}
</script>