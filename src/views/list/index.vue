<template>
    <a-card :bordered="false">
        <!--查询-->
        <list-search>
            <a-form-model layout="inline"
                          :model="searchForm">
                <a-row :gutter="48">
                    <a-col :span="8">
                        <a-form-item label="标题">
                            <a-input v-model="searchForm.title"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="状态">
                            <a-select v-model="searchForm.status"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item>
                            <a-button type="primary"
                                      icon="search"
                                      @click="handleSearch">搜索
                            </a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </list-search>

        <operator-group>
            <a-button icon="plus" type="primary" @click="$refs.editForm.handleCreate()">新建</a-button>
            <a-button type="danger">删除</a-button>
        </operator-group>

        <!--列表-->
        <a-table :columns="columns"
                 :data-source="list"
                 :pagination="pagination"
                 row-key="id"
                 size="middle"
                 @change="onTableChange">
            <template #action="text, record, index">
                <space-plus>
                    <a>编辑</a>
                    <a>删除</a>
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link">
                            <span>更多</span>
                            <a-icon type="down"/>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item key="0">
                                1st menu item
                            </a-menu-item>
                            <a-menu-item key="1">
                                2nd menu item
                            </a-menu-item>
                            <a-menu-divider/>
                            <a-menu-item key="3">
                                3rd menu item
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </space-plus>
            </template>
        </a-table>

        <edit-form ref="editForm" @success="onSuccess"></edit-form>
    </a-card>
</template>

<script>
import EditForm from './components/EditForm'
import pagination from '@/mixins/pagination'

const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Age', dataIndex: 'age', key: 'age'},
    {title: 'Address', dataIndex: 'address', key: 'address'},
    {title: 'Tags', key: 'tags', dataIndex: 'tags', scopedSlots: {customRender: 'tags'}},
    {title: 'Action', key: 'action', scopedSlots: {customRender: 'action'}}
]
export default {
    name: 'list',
    components: {EditForm},
    mixins: [pagination],
    data() {
        return {
            searchForm: {},
            columns,
            list: [
                {
                    id: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                    tags: ['nice', 'developer']
                },
                {
                    id: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                    tags: ['loser']
                },
                {
                    id: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher']
                }
            ]
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        /**
         * 搜索
         */
        handleSearch() {
        },
        /**
         * 成功
         */
        onSuccess() {

        },
        /**
         * 分页
         * @param current
         * @param pageSize
         */
        onTableChange({current, pageSize}) {
            this.pagination = {
                ...this.pagination,
                current,
                pageSize
            }
        }
    }
}
</script>

<style scoped>

</style>
