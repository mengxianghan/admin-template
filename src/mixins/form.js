export default {
    data() {
        return {
            modal: {
                type: '',
                title: '',
                visible: false,
                confirmLoading: false
            },
            record: {},
            formItemLayout: {
                labelCol: {
                    span: 5
                },
                wrapperCol: {
                    span: 16
                }
            },
            formButtonLayout: {
                wrapperCol: {
                    span: 16,
                    offset: 5
                }
            }
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this)
    },
    methods: {
        /**
         * 设置弹窗属性
         * @param title
         */
        setModal(options) {
            this.modal = {
                ...this.modal,
                ...options
            }
        },
        /**
         * 显示弹窗
         * @param args
         */
        showModal(options = {}) {
            this.setModal({
                ...this.modal,
                visible: true,
                ...options
            })
        },
        /**
         * 隐藏弹窗
         */
        hideModal() {
            this.setModal({
                ...this.modal,
                type: '',
                title: '',
                visible: false,
                confirmLoading: false
            })
        },
        /**
         * 显示 loading
         */
        showLoading() {
            this.$set(this.modal, 'confirmLoading', true)
        },
        /**
         * 隐藏 loading
         */
        hideLoading() {
            this.$set(this.modal, 'confirmLoading', false)
        },
        /**
         * 重置
         */
        reset() {
            this.form.resetFields()
            this.record = {}
            this.setModal({
                confirmLoading: false
            })
        },
        /**
         * 筛选输入项
         * @param input
         * @param option
         * @returns {boolean}
         */
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            )
        }
    }
}
