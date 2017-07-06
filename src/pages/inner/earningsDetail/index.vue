<template>
	<div style="margin-right:20px;">
		<div id="earD_header">
			<button class="active">所有明细</button>
			<button>本月明细</button>
			<button>今日明细</button>
			<button>制定时间段明细</button>
		</div>

		<div id="earD_excel">
			<div id="earD_all">
				<h1>
          <el-tooltip class="item" effect="dark" content="所有车辆骑行收益" placement="bottom-end"> 
					  <p>合计：<span>30000元</span></p>
          </el-tooltip>
					<p @click='export_excel'>导出明细到Excel</p>
				</h1>
			</div>
		</div>

		<div id="earD_body">
			<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="monetary"
        label="金额"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="carNumber"
        label="车牌号"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="time"
        label="消费时间"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="journey"
        label="里程"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="number"
        label="车辆终端号"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="orderDate"
        label="订单日期">
      </el-table-column>
    </el-table>
		</div>

		<div id="earD_page">
			<div class="M-box">
			</div>
		</div>
	</div>
</template>

<style>
  html,body,h1,h2,h3,h4,h5,h6,td,tr,th,table,thead,tbody,dl,dt,dd,p,span,ul,li,ol {
  	margin: 0;
  	padding: 0;
  }

  body {
  	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .loading_class {
    background: rgba(68,68,68,0.4);
  }

	#earD_header {
    width: 100%;
    height: 56px;
    margin-bottom: -20px;
    /* padding: 10px 0; */
    line-height: 56px;
    background: #fff;
    border: 1px solid #e7ecf1;
    border-bottom: none;
	}

	#earD_header button {
		width: 100px;
    height: 30px;
		font-size: 12px;
    margin-right: 10px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
		outline: none;
    color: #878787;
    border: 1px solid #cecece;
    transition: all .2s linear 0s;
	}

	#earD_header button:nth-of-type(1) {
		margin-left: 30px;
	}

	/*#earD_header button:hover {
    background: rgb(66,66,66);
    border: 1px solid rgb(66,66,66);
		color: #fff;
	}*/

	#earD_header button.active {
    font-size: 12px;
    color: #fff;
    background: rgba(66,66,66, 0.8);
    border: 1px solid rgb(66,66,66);
	}

	#earD_excel {
    padding:0 30px 10px 30px;
		background:#fff;
    border: 1px solid #e7ecf1;
    border-top: none;
	}

	#earD_all {
		width: 100%;
		height: 40px;
		background: #fcfcd3;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	#earD_all h1 {
		width: 100%;
		line-height: 40px;
		height: 40px;
	}

	#earD_all h1 p:nth-of-type(1) {
		float: left;
		margin-left: 10px;
		font-size: 12px;
		color: #868671;
    cursor: pointer;
	}

	#earD_all h1 p:nth-of-type(2) {
		float: right;
		font-size: 12px;
		margin-right: 10px;
		color: #ff9900;
	}

	#earD_all h1 p:nth-of-type(2):hover {
		text-decoration: underline;
    cursor: pointer;
	}

	#earD_body {
    padding: 20px 20px 10px 20px;
    background: #fff;
    margin-top: 20px;
    padding-left: 28px;
    padding-right: 28px;
    border: 1px solid #e7ecf1;
    border-bottom: none;
	}

	#earD_page {
    padding: 4px 10px 0 18px;
		padding-bottom: 100px;
		background: #fff;
		border: 1px solid #e7ecf1;
		border-top: none;
		min-height: 233px;
	}

</style>

<script>
import $ from 'jquery'
import request from 'superagent'
require('../../../assets/lib/js/jquery.pagination.js')
// require('../../../assets/lib/js/exportExcel.js')
require('../../../assets/lib/js/Blob.js')
import '../../../assets/css/pagination.css'
export default {
  data () {
    return {
      tableData: [],
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

    request
      .post('192.168.3.52:7099/franchisee/revenue/getAllRevenue')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
        } else {
          console.log(res)
          console.log(JSON.parse(res.text))
        }
      })

    // 点击切换查看类型
    $('#earD_header button').click('button', function () {
      $('button.active').removeClass('active')
      $(this).addClass('active')
    })
  },
  methods: {
    export_excel () {
      this.$confirm('确认导出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        console.log('this is entry')
        require.ensure([], () => {
          this.$loading({customClass: 'loading_class'})
          var that = this
          setTimeout(() => {
            that.$loading({customClass: 'loading_class'}).close()
            const { export_json_to_excel } = require('../../../assets/lib/js/Export2Excel.js')
            const tHeader = ['金额', '车牌号', '消费时间', '里程', '车辆终端号', '订单日期']
            const filterVal = ['monetary', 'carNumber', 'time', 'journey', 'number', 'orderDate']
            const list = this.tableData
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '列表excel')
            that.$message({
              type: 'success',
              message: '导出成功'
            })
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
