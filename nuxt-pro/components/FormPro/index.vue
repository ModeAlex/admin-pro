<template>
    <Form>
        <FormItem v-for="item in list" :key="item.key">
            <template v-if="item.formType === 'Input'">
                <Input v-model="item.defaultValue" />
            </template>
        </FormItem>
    </Form>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        init(columns) { // 根据数据表依次渲染表单组件
            this.list = columns.map(item => item);
        }
    }
}
</script>