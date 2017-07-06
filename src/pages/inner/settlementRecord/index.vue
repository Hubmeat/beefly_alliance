<template>
<div style="margin-right:20px;">
	<div id="settleRed_content">
		<div id="settleRed_header">
			<h2>
				<p>本次待结算金额：</p><span>10000</span><span>元</span>
			</h2>
			<button @click="$router.push({path:'/index/applyaccount'})">申请结算</button>
			<span>*每月结算一次</span>
			<h3>
				<p>合计已结算金额：</p><span>30000</span><span>元</span>
			</h3>
		</div>	
	</div>

	<div id="settleRed_table">
		<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="settled_time"
        label="结算金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="结算金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="apply_time"
        label="计算时间"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="财务备注">
      </el-table-column>
    </el-table>
	</div>

	<div id="settleRed_page">
      <div class="M-box">
      </div>
	</div>
</div>
</template>

<style scoped>
	.my_table_class {
		color: #f60;cursor: pointer;
	}

	#settleRed_content {
		padding:20px 30px 20px 30px;
		background:#fff;
		margin-bottom: 20px; 
		border: 1px solid #e7ecf1;		
	}
	#settleRed_header {
		width: 100%;
		height: 60px;
		line-height: 60px;
		padding: 10px 0;
		background: #fcfcd3;
	}

	#settleRed_header h2,button,span {
		float: left;
	}

	#settleRed_header h2 {
		font-size: 10px;
		height: 60px;
	}

	#settleRed_header h2 p {
		float: left;
		margin-left: 10px;
		font-size: 16px;
		font-weight: 500;
	}

	#settleRed_header h2 span:nth-of-type(1) {
		color: red;
		font-size: 16px;
	}

	#settleRed_header h2 span:nth-of-type(2) {
		margin-left: 10px;
		font-size: 16px;
	}

	#settleRed_header button {
		width: 120px;
		height: 40px;
		margin:10px 0 0 10px;
		border: 1px solid #f9f9f9;
		background: rgba(255,153,0,0.8);
		color: #fff;
		border-radius: 6px;
		display: inline-block;
		outline: none;
	}

	#settleRed_header button:hover {
		background: rgba(255,153,0,1);
		cursor: pointer;
	}

	#settleRed_header button + span{
		color: #aaa;
		margin: 6px 0 0 5px;
		font-style: italic;
	}

	#settleRed_header h3 {
		font-size: 16px;
		height: 60px;
		float: right;
	}

	#settleRed_header h3 p {
		float: left;
		margin-left: 10px;
		font-weight: 500;
	}

	#settleRed_header h3 span:nth-of-type(1) {
		color: red;
	}

	#settleRed_header h3 span:nth-of-type(2) {
		margin-right: 10px;
	}

	#settleRed_table {
    padding: 20px 20px 10px 20px;
    background: #fff;
    margin-top: 20px;
    padding-left: 28px;
    padding-right: 28px;
    border: 1px solid #e7ecf1;
    border-bottom: none;
	}

	#settleRed_page {
		padding: 4px 10px 0 18px;
		padding-bottom: 100px;
		background: #fff;
		border: 1px solid #e7ecf1;
		border-top: none;
		min-height: 230px;
	}
</style>

<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data () {
    return {
      tableData: [{
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '审核中',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '已结算',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '已结算',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '已结算',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '审核中',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '已结算',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '审核中',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '审核中',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '审核中',
        remark: '这里是备注'
      }, {
        settled_time: '2017-01',
        amount: '100.00',
        apply_time: '2017-01-01 10:01:01',
        status: '审核中',
        remark: '这里是备注'
      }],
      currentPage: 3
    }
  },
  mounted () {
    $('.M-box').pagination({
      pageCount: 50,
      jump: true,
      coping: true,
      homePage: '首页',
      endPage: '尾页',
      prevContent: '«',
      nextContent: '»'
    })
  }
}
</script>
