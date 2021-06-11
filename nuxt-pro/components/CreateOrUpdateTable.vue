<template>
    <Modal
        v-model="visible"
        :title="title"
        width="800"
        cancel-text="取消"
        ok-text="确定"
        @on-ok="ok"
    >
        <Form :model="formData" :label-width="100">
            <FormItem v-for="item in list" :key="item.key" :label="item.title">
                <Input v-model="formData[item.key]" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            visible: false,
            formData: {},
            list: [],
            status: ''
        }
    },
    methods: {
        init({title, columns, status, row}) {
            this.status = status
            this.title = title;
            this.visible = true;
            let formData = {};
            let list = columns.filter(item => {
                if (status === 'create') {
                    if (item.key !== '_id') formData[item.key] = item.defaultValue || '';
                    return item.create;
                } else if (status === 'update') {
                    formData[item.key] = row[item.key];
                    return item.update;
                }
            })
            console.log(formData)
            this.formData = formData;
            this.list = list
        },
        ok() {
            this.$emit('task', { status: this.status, formData: this.formData })
        }
    }
}
</script>