<template>
  <div>
    <div class="incomming module">
      <el-row>
        <el-col :span='12' class="mounthIncoming">
          <div class="income_title">
            <span class="income_time mounthtime ">本月营收</span>
            <span class="income_detail">明细>></span>
          </div>
          <div class="income_count daycount">
            $18800000.00
          </div>
          <div class="income_diff">
            <span>较上月：+12300.00</span>
          </div>
        </el-col>
        <el-col :span='12' class="dayIncoming">
          <div class="income_title">
            <span class="income_time daytime ">今日营收</span>
            <span class="income_detail">明细>></span>
          </div>
          <div class="income_count daycount">
            $900000.00
          </div>
          <div class="income_diff">
            <span>较昨日：+300.00</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statuAndData module">
      <el-row>
        <el-col :span='12' class="datas">
          <div class="datas_title">
            <span class="data_display ">数据分布
              <small>时间段内车辆接单数,每10分钟自动刷新</small>
            </span>
            <span class="arrow">>></span>
          </div>
          <div class="Histogram">
            <myCanvas></myCanvas>
          </div>
        </el-col>
        <el-col :span='12' class="status">
          <div class="status_title">
            <span>当前动态</span>
            <span class="arrow">>></span>
          </div>
          <div class="list">
            <div>
              <ul>
                <li v-for="statu of status">
                  <el-row>
                    <el-col :span="6">+{{statu.money}}</el-col>
                    <el-col :span="6">车辆：{{statu.carNum}}</el-col>
                    <el-col :span="12">{{statu.time}}</el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  
    <div style="padding:20px; background:#fff;">
      <div class="settlementInfo module">
        <el-row>
          <el-col :span="8">
            <span>当前已为您赚到￥18800000.00</span>
          </el-col>
          <el-col :span="8">
            <span>已结算￥60000.00</span>
          </el-col>
          <el-col :span="8">
            <span>带结算￥300000.00</span>
            <el-button class="withdrawal">提现</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  
    <div class="hotmap module">
      <div class="mapHeader">
        <div class="mapTitle">
          <el-row>
            <el-col :span="10">
              <span>运营热力图
                <small>每十分钟自动刷新</small>
              </span>
            </el-col>
            <el-col :span="14">
              <el-col :span="6">车辆总数2000辆</el-col>
              <el-col :span="6">使用中1900辆</el-col>
              <el-col :span="6">维修中99辆</el-col>
              <el-col :span="6">已报废1辆</el-col>
            </el-col>
          </el-row>
        </div>
        <div class="mapWrap">
          <Gamp></Gamp>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
div.module {
  /*margin-bottom:20px;*/
  padding: 20px;
  background: #fff;
}

div.el-col-12 {
  padding: 10px;
  width: 49%
}

div.el-col-12:nth-child(1) {
  float: right;
}

div.el-col-12 .income_title {
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
}

div.el-col-12 .income_title .income_time {
  font-size: 16px;
}

div.el-col-12 .income_title .income_detail {
  font-size: 14px;
  float: right;
}

div.el-col-12 .income_count {
  margin-bottom: 5px;
  font-size: 30px;
}

div.el-col-12 .income_diff {
  text-align: right;
}

div.el-col-12 .income_diff span {
  margin-right: 20px;
}

div.mounthIncoming {
  background: #ff4949;
  color: #fff;
}

div.dayIncoming {
  background: rgb(167, 234, 94);
  color: #fff;
}

span.income_time {
  font-weight: bold;
}

span.income_detail {
  cursor: pointer;
}

div.status {
  background: #ffc0cb;
  padding: 0;
}

div.status_title,
div.datas_title {
  background: #4ca28f;
  line-height: 40px;
  font-weight: normal;
  color: #fff
}

div.status_title span,
div.datas_title span {
  margin-left: 10px;
}

div.datas_title span.data_display small {
  margin-left: 5px;
  color: #a7ea5e;
}

div.status_title span.arrow,
div.datas_title span.arrow {
  margin: 0 10px 0 0;
  float: right;
  cursor: pointer
}

div.status div.list ul li {
  list-style-type: none;
  background: #a7ea5e;
  color: #fff;
  line-height: 30px;
  height: 30px;
  padding: 5px 0;
  border-bottom: 1px dashed #fff;
}

div.status div.list ul li:nth-last-child(1) {
  border-bottom: none
}

div.status div.list ul li div.el-col-12 {
  padding: 0 10px 0 0;
  text-align: right;
}

div.status div.list ul li div.el-col-6:nth-child(1) {
  padding-left: 10px;
}

div.datas {
  padding: 0
}

div.Histogram {
  height: 244px;
  width: 100%;
  background: #ff4949;
}

div.settlementInfo {
  background: #ff4949;
  line-height: 40px;
  height: 40px;
  padding: 5px 10px;
  color: #fff;
}

div.settlementInfo button.withdrawal {
  float: right;
  margin-right: 20px;
}

div.mapWrap {
  width: 100%;
  height: 500px;
}

div.mapTitle {
  line-height: 40px;
  height: 40px;
  background: #1d90e6;
  padding: 5px 10px;
  margin-bottom: 5px;
  color: #fff;
}
</style>
<script>
import myCanvas from '../../../components/highChartRectIndex.vue'
import Gamp from '../../../components/map.vue'
export default {
  data: function () {
    return {
      status: [
        {
          money: 99,
          countNum: 1011,
          time: '2017-01-01 10:01:01'

        },
        {
          money: 199,
          countNum: 1111,
          time: '2017-02-02 10:01:01'

        },
        {
          money: 299,
          countNum: 1211,
          time: '2017-03-03 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        }
      ]
    }
  },
  components: {
    myCanvas,
    Gamp
  }
}
</script>
