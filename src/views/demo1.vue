<template>
    <div class="old-customers-list">
        <el-button type="primary" @click="setPassword">打开弹窗</el-button>
        <el-dialog
            :visible.sync="apDialogVisible"
            title="批量添加管家密码"
            width="80%"
        >
            <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <div>① 请选择需下发管家密码的门锁（已选择 {{ selectedData.length }} 个）</div>
            <el-table
                ref="multipleTable"
                :data="ap_list"
                :row-key="getRowKeys"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <el-table-column type="selection" :reserve-selection="true" prop="id"></el-table-column>
                <el-table-column prop="lock_name" label="锁名称"></el-table-column>
                <el-table-column prop="room_status" label="房间状态"></el-table-column>
                <el-table-column prop="room_contract_status" label="房间合同状态"></el-table-column>
                <el-table-column prop="password_status" label="管家密码状态"></el-table-column>
            </el-table>
            <el-row class="top-margin">
                <el-pagination
                    :current-page.sync="apObj.page_index"
                    :page-size="apObj.page_size"
                    :total="apObj.aptotal"
                    layout="total, prev, pager, next"
                    style="float:right;"
                >
                </el-pagination>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import Data from "../js/data.json";
export default {
	data() {
		return {
			value: '全部楼栋',
			options: [
				{
					value: '栋',
					label: '全部楼栋'
				},
				{
					value: '1栋',
					label: '1栋'
				}, 
				{
					value: '2栋',
					label: '2栋',
				}, 
				{
					value: '3栋',
					label: '3栋'
				}, 
				{
					value: '4栋',
					label: '4栋'
				}
			],
			apDialogVisible: false,
			ap_list: [],
			apObj: {
				page_index: 1,
				page_size: 10,
				aptotal: Data.length,
			},
			// 获取row的key值
			getRowKeys(row) {
				return row.id;
			},
			getArr: [],
			selectedData: []
		}
	},
	mounted() {
		this.getArr = Data;
	},
	watch: {
		"apObj.page_index": {
			handler(newVal) {
				this.ap_list = this.getArr.slice((newVal - 1)*10, (newVal - 1)*10 + 10);
			}
		},
		"value": {
			handler(newVal) {
				this.getArr = Data.filter(item => item.lock_name.indexOf(newVal) > -1);
				this.ap_list = this.getArr.slice(0, 10);
				this.apObj.aptotal = this.getArr.length;
			}
		}
	},
	methods: {
		handleSelectionChange(rows) {
			this.selectedData = [];
            if (rows) {
                rows.forEach(row => {
                    if (row) {
                        this.selectedData.push(row);
                    }
                });
            }
        },
		setPassword() {
			this.apDialogVisible = true;
			this.apObj.page_index = 1;
			this.ap_list = Data.slice(0, 10);
			this.value = '栋';
			this.$nextTick(() => {
				this.$refs.multipleTable.clearSelection();
				
				// 以下是默认选择第一个
				this.selectedData = Data.slice(0, 1);
				this.ap_list.forEach(row => {
					if(this.selectedData[0].id == row.id){
						this.$refs.multipleTable.toggleRowSelection(row,true);
						return false;
					}
				})
				
			});
		},
	},
}
</script>
