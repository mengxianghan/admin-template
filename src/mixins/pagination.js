export default {
    data() {
        return {
            pagination: {
                showSizeChanger: true,
                current: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        /**
         * 更新分页
         */
        updatePagination() {
            const {total, current, pageSize} = this.pagination
            const totalPage = Math.ceil((total - 1) / pageSize)
            this.pagination = {
                ...this.pagination,
                current: current > totalPage ? totalPage : current
            }
        }
    }
}
