<template>
    <div>
        <el-button type="primary" @click="addManagerPwd">添加管家密码</el-button>
        <el-dialog
            title="添加管家密码"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
        >
            <el-row class="bottom-margin">请选择使用人（下发对象）</el-row>
            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @row-click = "showRow"
                style="width: 100%"
                border>
                <el-table-column label="选择" width="70" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radio" :label="scope.$index">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
                <el-table-column prop="role" label="角色" header-align="center" align="center"></el-table-column>
                <el-table-column prop="tel" label="手机号" header-align="center" align="center"></el-table-column>
            </el-table>
            <el-row class="top-margin">
                <el-pagination
                    style="float:right;"
                    @current-change="handleCurrentChange"
                    :current-page.sync="manager.page_index"
                    :page-size="manager.page_size"
                    layout="total, prev, pager, next"
                    :total="manager.total">
                </el-pagination>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSet">确认下发</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            tableTotalData: [
                {name: '张三', id: 1, role: '多店店长', tel: '13510657805'}, 
                {name: '李四', id: 2, role: '多店店长', tel: '13510657806'}, 
                {name: '王五', id: 3, role: '店长', tel: '13510657807'}, 
                {name: '赵六', id: 4, role: '店助', tel: '13510657808'}, 
                {name: '孙七', id: 5, role: '店助', tel: '13510657809'},
                {name: '张三三', id: 6, role: '店长', tel: '13510657812'}, 
                {name: '李四四', id: 7, role: '店助', tel: '13510657813'}, 
                {name: '王五五', id: 8, role: '多店店长', tel: '13510657814'}, 
                {name: '赵六六', id: 9, role: '多店店长', tel: '13510657815'}, 
                {name: '孙七七', id: 10, role: '店助', tel: '13510657816'}, 
                {name: '张三三三', id: 11, role: '多店店长', tel: '13510657816'}, 
                {name: '李四四四', id: 12, role: '店长', tel: '13510657809'}, 
                {name: '王五五五', id: 13, role: '店助', tel: '13510657454'}
            ],
            radio: '',
            send_radio: '',
            manager: {
                page_index: 1,
                page_size: 5,
                total: 13,
            },
        }
    },
    watch: {
        'manager.page_index': {
            handler(newVal) {
                this.tableData = this.tableTotalData.slice((newVal - 1)*5, (newVal - 1)*5 + 5);
                this.radio = '';
            }
        }
    },
    methods: {
        addManagerPwd() {
            this.radio = '';
            this.send_radio = '';
            this.manager.page_index = 1;
            this.tableData = this.tableTotalData.slice(0, 5);
            this.dialogVisible = true;
        },
        confirmSet() {
            this.dialogVisible = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        showRow(row){
            event.preventDefault();
            this.radio = this.tableData.indexOf(row);
            this.send_radio = row.id;
        },
        handleCurrentChange(val) {
            this.manager.page_index = val
        },
    }
}
</script>
<style lang="less" scoped>
    .bottom-margin {
        margin-bottom: 20px;
    }
    .top-margin {
        margin-top: 20px;
    }
</style>


