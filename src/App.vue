<template>
	<div id="app">
		<div class="old-customers-list">
			<el-button type="primary" @click="setPassword">打开弹窗</el-button>
			<el-dialog
				:visible.sync="apDialogVisible"
				title="批量添加管家密码"
				width="80%"
			>
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
	</div>
</template>
<script>
import Data from "./js/data.json";
export default {
	data() {
		return {
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
			selectedData: []
		}
	},
	watch: {
		"apObj.page_index": {
			handler(newVal, oldVal) {
				this.ap_list = Data.slice((newVal - 1)*10, (newVal - 1)*10 + 10);
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
			this.$nextTick(() => {
				this.$refs.multipleTable.clearSelection();
			});
		},
		handleCurrentChange(val){
			this.searchObj.page_index = val
		}
	},
}
</script>
