<template>
  <div style="margin-right:20px;">
    <el-dialog title="提示" :modal=false :visible="dialogVisible" size="tiny">
      <span>提现金额必须是数字, 需从最后的月份开始提现</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  
    <div id="apply_account_header">
      <h1>申请结算</h1>
  
      <ul>
        <li>结算月份：
          <button v-bind:key="list"
                  v-for="(list, index) in monthLists" 
                  v-bind:class="[(index===0)?'active':'']"
                  :myCode=list.withdrawalCode>{{list.month}}</button>
        </li>
        <li>本次可结算金额： {{allMoney[currentIndex]}}元
          <span>*每月结算一次，结算金额=上个月所有车辆的盈利*80%+以前遗留的未结算金额。</span>
        </li>
        <li>
          <span>申请结算金额：</span>
          <input v-model.number="crash" type="number" ref="my_val" id="apply_money">
          <button>确定</button>
        </li>
      </ul>
    </div>
  
    <!-- apply_account_table -->
    <div class="apply_account_table">
  
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%; font-size:13px;">
        <el-table-column prop="order_time" label="订单时间" min-width="200"></el-table-column>
        <el-table-column prop="bike_number" label="车牌号" min-width="150"></el-table-column>
        <el-table-column prop="riding_time" label="骑行时间" min-width="150"></el-table-column>
        <el-table-column prop="riding_dis" label="骑行距离" min-width="180"></el-table-column>
        <el-table-column prop="riding_consume" label="消费金额"></el-table-column>
      </el-table>
    </div>
  
    <div id="apply_account_page">
      <div class="M-box">
      </div>
    </div>
  
  </div>
</template>
    
<script>
import $ from 'jquery'
// import Vue from 'vue'
import request from 'superagent'
import moment from 'moment'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data() {
    return {
      input: '',
      tableData: [],
      router_show: false,
      dialogVisible: false,
      apply_money_data: '2017-01',
      monthLists: [],
      totalPage: '',
      currentCode: '',
      allMoney: [],
      currentIndex: 0,
      crash: ''
    }
  },
  methods: {
    change() {
      console.log('this is entry')
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    tableDataDel(arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.order_time = moment(arr[i].chargeTime).format('YYYY-MM-DD')
        obj.bike_number = arr[i].bikeCode
        obj.riding_time = Math.floor((arr[i].time/1000)/60) + '分'
        obj.riding_dis = arr[i].mileage
        obj.riding_consume = arr[i].money
        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
    },
    getDataByTime () {
      request
        .post('http://192.168.3.52:7099/franchisee/withdrawal/getWithdrawalDetail')
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'withdrawalCode': this.currentCode
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            // console.log(JSON.parse(res.text).list)
            var arr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            var newArr = this.tableDataDel(arr)
            this.tableData = newArr
            this.totalPage = pageNumber
            $('.M-box').pagination({
              pageCount: pageNumber,
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '尾页',
              prevContent: '«',
              nextContent: '»'
            })
          }
        })
    },
    pageUpdate (e) {
      var that = this
      clearTimeout(this.timer)
      if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
        if (e.target.innerHTML === '首页') {
          e.target.innerHTML = 1
        } else if (e.target.innerHTML === '尾页') {
          e.target.innerHTML = this.totalPage
        } else if (e.target.innerHTML === '«') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) - 1
        } else if (e.target.innerHTML === '»') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) + 1
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }

      this.timer = setTimeout(function () {
        request
          .post('http://192.168.3.52:7099/franchisee/withdrawal/getWithdrawalDetail?page=' + e.target.innerHTML)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'withdrawalCode': that.currentCode
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var arr2 = that.tableDataDel(pagedata)
              that.tableData = arr2
            }
          })
      }, 200)
    }
  },
  mounted() {
    request
      .post('http://192.168.3.52:7099/franchisee/withdrawal/getNotWithdrawal')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
        } else {
          var allMonth = JSON.parse(res.text).list
          for (var i = 0; i < allMonth.length; i++) {
            var mon = {}
            mon.month = allMonth[i].month
            mon.withdrawalCode = allMonth[i].withdrawalCode
            this.monthLists.push(mon)
            this.allMoney.push(allMonth[i].money)
          }
          this.currentCode = JSON.parse(res.text).list[0].withdrawalCode
          // 根据渲染的未结算月份显示当前月份的详细数据
          this.getDataByTime()
        }
      })
  },
  updated () {
    var that = this
    $('#apply_account_header ul li:nth-of-type(1) button').click('button', function () {
      $('button.active').removeClass('active')
      that.currentIndex = $(this).index()
      // console.log($(this).attr('myCode'))
      // 点击不同月份调用数据
      that.currentCode = $(this).attr('myCode')
      that.getDataByTime()
      $(this).addClass('active')
      that.apply_money_data = $(this).text()
    })

    $('#apply_account_header ul li:nth-of-type(3) button').click(function () {
      if ($('#apply_money').val() < 1) {
        that.dialogVisible = true
      } else if ($('#apply_money').val() > that.allMoney[that.currentIndex]) {
        that.$message('体现金额超过当前可体现最大金额')
      } else {  
        const h = that.$createElement
        that.$msgbox({
          title: '提现申请确认',
          message: h('p', null, [
            h('p', { style: 'color: #f60; font-size: 16px; font-weight:bold; letter-spacing:1px; width:100%; padding: 2px 10px; text-align:center;' }, '结算月份 : ' + that.apply_money_data),
            h('p', { style: 'color: #f60; font-size: 16px; font-weight:bold; letter-spacing:1px; width:100%; padding: 2px 10px; text-align:center;' }, '结算金额 : ' + $('#apply_money').val() + '元')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              request
                .send
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '申请提交中...'
              setTimeout(() => {
                done()
                that.$refs.my_val.value = ''
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 600)
            } else {
              action === 'cancel'
              done()
            }
          }
        }).then(action => {
          if (action === 'confirm') {
            that.$message({
              type: 'info',
              message: '提现申请已提交, 预计1-2个工作日到账'
            })
          } else {
            that.$message({
              type: 'info',
              message: '提现申请已取消'
            })
          }
        })
      }
    })
  },
  beforeUpdate () {
    var that = this
    $('.M-box').click('a', function (e) {
      // console.log(e)
      that.pageUpdate(e)
    })
  }
}
</script>

<style scoped>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
td,
tr,
th,
table,
thead,
tbody,
dl,
dt,
dd,
p,
span,
ul,
li,
ol {
  margin: 0;
  padding: 0;
}

body {
  background: #f2f2f2;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#apply_account_header {
  width: 100%;
  height: 160px;
  background: #fff;
  border: 1px solid #e7ecf1;
  overflow: hidden;
  padding: 0px 0px 10px 0px;
}

#apply_account_header>h1 {
  height: 30px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  display: block;
  color: #444;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding: 2px 0px 2px 20px;
  line-height: 30px;
}

.account_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border: 1px solid #ddd;
  display: inline-block;
}

#apply_account_header ul {
  width: 100%;
  list-style: none;
  padding: 2px 20px 2px 20px;
}

#apply_account_header ul li {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
}

#apply_account_header ul li:nth-of-type(1) button {
  width: 100px;
  height: 30px;
  margin-left: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  background: #fff;
}

#apply_account_header ul li:nth-of-type(1) button.active {
  background: rgba(255, 153, 0, 1);
  border: 1px solid rgba(255, 153, 0, 1);
  color: #fff;
}

#apply_account_header ul li:nth-of-type(2) span {
  font-size: 12px;
  color: #ccc;
  margin-left: 14px;
}

#apply_account_header ul li:nth-of-type(3) {
  margin-top: -10px;
}

#apply_account_header ul li:nth-of-type(3) input {
  height: 38px;
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 120px;
  text-indent: 1em;
  outline: none;
}

#apply_account_header ul li:nth-of-type(3) button {
  width: 120px;
  height: 40px;
  margin: 10px 0 0 10px;
  border: 1px solid #f9f9f9;
  background: rgba(255, 153, 0, 0.8);
  color: #fff;
  border-radius: 6px;
  display: inline-block;
  outline: none;
}

#apply_account_header ul li:nth-of-type(3) button:hover {
  cursor: pointer;
  background: rgb(255, 153, 0);
}

.el-table__body,
.el-table__footer,
.el-table__header {
  border: 2px solid red;
}


/*#account_router_cover {
  width: 100%;
  height: 100%;
  background: rgba(128,128,128,0.6);
  position: fixed;
  left: 0;
  top: 0;
}*/

#account_router {
  width: 100%;
  height: 100%;
  background: rgba(68, 68, 68, 0.6);
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}


/*#account_router {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  height: 80%;
  margin-left: 10%;
  margin-top: 5%;
  width: 80%;
  z-index: 100;
  background: #f60;
  overflow: hidden;
}*/

div.apply_account_table {
  /* width: 100%; */
  padding: 30px 20px 10px 20px;
  background: #fff;
  margin-top: 20px;
  padding-left: 28px;
  padding-right: 28px;
  border: 1px solid #e7ecf1;
  border-bottom: none;
  /* padding-bottom: 100%; */
}

div.apply_account_table>h1 {
  width: 90%;
  height: 68px;
  line-height: 55px;
}

div.apply_account_table>h1 button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  background: rgba(66, 66, 66, 0.8);
  transition: all .2s linear 0s;
}

div.apply_account_table>h1 button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

#apply_account_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 39px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

.el-switch__label,
.el-switch__label * {
  font-size: 12px;
}
</style>
