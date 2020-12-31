<template>
    <drawer :visible="modal.visible"
            :title="modal.title"
            :confirm-loading="modal.confirmLoading"
            @ok="onOk"
            @cancel="onCancel"
            width="80%">
        <a-form :form="form"
                v-bind="formItemLayout">
            <a-form-item label="标题">
                <a-input v-decorator="['title']"></a-input>
            </a-form-item>
            <a-form-item label="内容">
                <tinymce-editor
                    v-decorator="['content']"></tinymce-editor>
            </a-form-item>
        </a-form>
    </drawer>
</template>

<script>
import form from '@/mixins/form'
import {pick, keys} from 'lodash'

export default {
    mixins: [form],
    props: {
        redirectTypeList: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {}
    },
    methods: {
        /**
         * 新建
         */
        handleCreate() {
            this.showModal({
                type: 'insert',
                title: '新建'
            })
        },
        /**
         * 编辑
         * @param {Object} record
         */
        handleEdit(record) {
            this.showModal({
                type: 'edit',
                title: '编辑'
            })
            this.record = record
            this.$nextTick(() => {
                const values = pick(record, keys(this.form.getFieldsValue()))
                this.form.setFieldsValue(values)
            })
        },
        /**
         * 删除
         * @param {Ojbect} record
         */
        async handleDelete(record) {
            try {
                const {code} = await this.$zs.api.message.delete({
                    id: record.id
                })
                if (code === '200') {
                    this.$parent.updatePagination()
                    this.$emit('success')
                }
            } catch (e) {

            }
        },
        /**
         * 确定
         */
        onOk() {
            try {
                const {record, modal} = this
                // 验证表单
                this.form.validateFieldsAndScroll(async (error, values) => {
                    if (!error) {
                        this.showLoading()
                        const params = {
                            id: record?.id ?? '',
                            ...values
                        }
                        const result = this.$xy.api.save(params)
                        this.hideLoading()
                        if (result.code === '200') {
                            this.reset()
                            this.hideModal()
                            this.$emit('success')
                        }
                    }
                })
            } catch (e) {

            }
        },
        /**
         * 取消
         */
        onCancel() {
            this.reset()
            this.hideModal()
            this.$emit('cancel')
        }
    }
}
</script>

<style scoped>

</style>
