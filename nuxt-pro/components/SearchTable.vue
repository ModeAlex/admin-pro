<template>
    <div class="">
        <Form :model="formData" :inline="true" :label-width="100">
            <Row :gutter="12" justify="end">
                <Col
                    v-for="item in list" :key="item.key"
                    :span="24"
                    :md="12"
                    :lg="8"
                >
                    <FormItem :label="item.title + '：'" style="width: 100%">
                        <Input v-model="formData[item.key]" />
                    </FormItem>
                </Col>
                <Col
                    :span="24"
                    :md="12"
                    :lg="8"
                >
                    <FormItem style="width: 100%;text-align: right">
                        <Button type="primary" @click="find(formData)">查询</Button>
                        <Button @click="reset">重置</Button>
                        <Button v-if="showCollapsed" type="text" @click="collapsed">{{ isCollapsed ? '收起':'展开' }} <Icon type="ios-arrow-down" class="ease-in-out" :style="[
                            {transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'}
                        ]" /></Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            list: [],
            collapsedList: [],
            formData: {},
            isCollapsed: false,
            showCollapsed: false,
        }
    },
    mounted() {
        let formData = {};
        let list = this.columns.filter(item => {
            if (item.search) formData[item.key] = '';
            return item.search;
        })
        this.formData = formData;
        if (list.length > 2) {
            this.list = list.slice(0, 2)
            this.collapsedList = list.slice(2)
            this.showCollapsed = true;
        } else {
            this.list = list;
            this.showCollapsed = false;
        }
    },
    methods: {
        reset() {
            for (let key in this.formData) {
                this.formData[key] = ''
            }
            this.find();
        },
        collapsed() {
            if (this.isCollapsed) {
                this.list = this.list.splice(0, 2);
            } else {
                this.list = this.list.concat(this.collapsedList);
            }
            this.isCollapsed = !this.isCollapsed;
        },
        find(data = {}) {
            let params = JSON.parse(JSON.stringify(data))
            for (let key in params) params[key] ? '' : delete params[key];
            params.current = 1;
            this.$emit('task', params);
        }
    }
}
</script>

<style scoped>

</style>