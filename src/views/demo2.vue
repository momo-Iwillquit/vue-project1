<template>
    <div>
        <el-button type="primary" @click="invalidRemind">失效提醒设置</el-button>
        <el-dialog
            title="失效提醒设置"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="500px"
        >
            <div class="box text-center">
                <el-row class="t-row">
                    <el-col :span="4">序号</el-col>
                    <el-col :span="16">失效提醒时间</el-col>
                    <el-col :span="4">操作</el-col>
                </el-row>
                <el-row class="t-row" v-for="(item, index) in set_listData" :key="index">
                        <el-col :span="4">{{ index + 1 }}</el-col>
                        <el-col :span="16">
                            失效前 <el-input-number v-model="item.num" size="small" controls-position="right" :min="1"></el-input-number> 天
                        </el-col>
                        <el-col :span="4" v-if="index == 0"><i @click="addOne(index)" class="el-icon-circle-plus"></i></el-col> 
                        <el-col :span="4" v-if="index > 0" ><i @click="delOne(index)" class="el-icon-remove"></i></el-col> 
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSet">保存设置</el-button>
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
            set_listData: [
                {num: 1}, {num: 3}, {num: 5}
            ]
        }
    },
    methods: {
        invalidRemind() {
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        saveSet() {
            this.dialogVisible = false;
        },
        //增加一个失效提醒
        addOne() {
            this.set_listData.push( { num: 1 } );
        },
        //删除一个失效提醒
        delOne(index) {
            this.set_listData.splice(index, 1);
        },
    }
}
</script>
<style lang="less" scoped>
    .text-center {
        text-align: center;
    }
    .box {
        border: 1px solid #ddd;
        .t-row {
            border-bottom: 1px solid #ddd;
            .el-col-4, .el-col-16 {
                height: 50px;
                line-height: 50px;
            }
            .el-col-16 {
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
            }
            &:last-child {
                border-bottom: none;
            }
            .el-icon-circle-plus, .el-icon-remove {
                color: #409eff; 
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
</style>


