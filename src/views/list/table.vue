<template>
    <a-card :bordered="false">
        <!--查询-->
        <list-search>
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :span="6">
                        <a-form-item label="标题">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="状态">
                            <a-select></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="标题">
                            <a-input></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item>
                            <a-button type="primary">查询</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </list-search>

        <operator-group>
            <a-button icon="plus" type="primary" @click="$refs.editForm.handleCreate()">新建</a-button>
            <a-button type="danger">删除</a-button>
        </operator-group>

        <!--列表-->
        <a-table :columns="columns"
                 :data-source="list"
                 size="middle">
            <template slot="action" slot-scope="text, record">
                <a>编辑</a>
                <a-divider type="vertical"/>
                <a-popconfirm title="确认删除？">
                    <a>删除</a>
                </a-popconfirm>
                <a-divider type="vertical"/>
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">
                        <span>更多</span>
                        <a-icon type="down"/>
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item key="0">
                            <a href="http://www.alipay.com/">1st menu item</a>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a href="http://www.taobao.com/">2nd menu item</a>
                        </a-menu-item>
                        <a-menu-divider/>
                        <a-menu-item key="3">
                            3rd menu item
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </template>
        </a-table>

        <edit-form ref="editForm" @complete="onComplete"></edit-form>
    </a-card>
</template>

<script>
import EditForm from './components/EditForm'
import pagination from '@/mixins/pagination'

const columns = [
    {dataIndex: 'name', key: 'name', slots: {title: 'customTitle'}, scopedSlots: {customRender: 'name'}},
    {title: 'Age', dataIndex: 'age', key: 'age'},
    {title: 'Address', dataIndex: 'address', key: 'address'},
    {title: 'Tags', key: 'tags', dataIndex: 'tags', scopedSlots: {customRender: 'tags'}},
    {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}},
]
export default {
    name: 'listTable',
    components: {EditForm},
    mixins: [pagination],
    data() {
        return {
            columns,
            list: [
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ],
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        onComplete() {

        },
        onTableChange({current, pageSize}) {
            this.pagination = {
                ...this.pagination,
                current,
                pageSize,
            }
        },
    },
}
</script>

<style scoped>

</style>
