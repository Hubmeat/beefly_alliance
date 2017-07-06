<template>
  <div class="carUseDetail">
    <div class="detailTitle">
      <h3>车辆详情</h3>
    </div>
    <el-row>
      <el-col :span="16">
        <table>
          <tbody>
            <tr>
              <td><span class="prex">车辆号:</span>100001</td>
              <td> <span class="prex">终端编号:</span>100001</td>
            </tr>
            <tr>
              <td><span class="prex">车辆型号:</span>小蜜蜂1代</td>
              <td><span class="prex">车型:</span>车型1</td>
            </tr>
            <tr>
              <td><span class="prex">上线日期:</span>2015-01-01</td>
              <td><span class="prex">报废日期:</span>2020-01-01</td>
            </tr>
            <tr>
              <td><span class="prex">所属区域:</span>无为县</td>
              <td><span class="prex">车辆位置:</span>无为县****区****路****号</td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span="6" class="battery">
        <ul>
          <li><span class="online">在线</span></li>
          <li><span class="lend">带出租</span></li>
          <li><span class="capacity">电池电量: 50V</span></li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="record">
      <el-tabs v-model="activeName">
        <el-tab-pane class="incomeRecord recodeTable" label="收益记录" name="first">
          <table>
            <thead>
              <tr>
                <th>消费日期</th>
                <th>时间</th>
                <th>里程</th>
                <th>金额</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-bind:key="index" v-for="(item,index) of incomeTableData">
                <td>{{item.date}}</td>
                <td>{{item.time}}</td>
                <td>{{item.mileage}}</td>
                <td>{{item.money}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="换电记录" name="second" class="recodeTable">
          <table>
            <thead>
              <tr>
                <th>换电日期</th>
                <th>换电人员</th>
                <th>换电成功</th>
                <th>电池容量</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-bind:key="index" v-for="(item,index) of batteryTableData">
                <td>{{item.date}}</td>
                <td>{{item.person}}</td>
                <td>{{item.status}}</td>
                <td>{{item.capacity}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="维修记录" name="third" class="recodeTable">
          <table>
            <thead>
              <tr>
                <th>维修日期</th>
                <th>维修时间</th>
                <th>维修地点</th>
                <th>维修人员</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-bind:key="index" v-for="(item,index) of repairTableData">
                <td>{{item.date}}</td>
                <td>{{item.time}}</td>
                <td>{{item.place}}</td>
                <td>{{item.person}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <div id="carUseDetail_page">
      <div class="M-box"></div>
		</div>
  </div>  
</template>
<script>
  import $ from 'jquery'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
  export default {
    data: function () {
      return {
        router: this.$route.query.carNum,
        activeName: 'first',
        incomeTableData: [
          {
            date: '2017-01-03 20:10:10',
            time: '10分钟',
            mileage: '6公里',
            money: '6元'
          },
          {
            date: '2017-01-03 20:10:10',
            time: '12分钟',
            mileage: '8公里',
            money: '16元'
          }
        ],
        repairTableData: [
          {
            date: '2017-01-03 20:10:10',
            time: '2小时之前',
            place: '华润万象城',
            person: '台亮'
          },
          {
            date: '2017-01-03 20:10:10',
            time: '1小时前',
            place: '三里庵',
            person: '阿呆'
          }
        ],
        batteryTableData: [
          {
            date: '2017-01-03 20:10:10',
            person: '台亮',
            status: '换电成功',
            capacity: '50V'
          },
          {
            date: '2017-01-03 20:10:10',
            person: '台亮',
            status: '换电失败',
            capacity: '30V'
          }
        ]
      }
    },
    mounted: function () {
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
<style scoped>
  div.carUseDetail table{border-collapse:collapse;width:100%;}
  div.carUseDetail table tr td{border:1px solid #f3f3f5;padding:5px 10px;}
  div.carUseDetail table tr td span.prex{display:inline-block;width:80px;text-align:right;color:#bdb6b6;font-size:14px;margin-right: 8px;}
  div.carUseDetail div.detailTitle h3{line-height: 30px;background:#555;color:#fff;margin-bottom:20px;padding:10px;}
  div.carUseDetail div.battery{float:right;}
  div.carUseDetail div.battery ul li{list-style-type:none;margin-bottom:10px;}
  div.carUseDetail div.battery ul li span.online{text-align:center;display:block;width:100px;padding:5px 0px;background:green;color:#fff;font-size:14px;}
  div.carUseDetail div.battery ul li span.lend{text-align:center;display:block;width:100px;padding:5px 0px;background:orange;color:#fff;font-size:14px;}
  div.carUseDetail div.battery ul li span.capacity{text-align:center;display:block;width:100px;padding:5px 0px;background:#ff4949;color:#fff;font-size:14px;}
  div.carUseDetail div.record{margin-top: 50px;}
  div.carUseDetail div.recodeTable table{border-collapse:collapse;width:100%;}
  div.carUseDetail div.recodeTable table thead tr th{font-weight:normal;text-align: left;border-bottom:1px solid #afa7a7;padding: 5px 10px;}
  div.carUseDetail div.recodeTable table tbody tr td{border:none;border-bottom:1px dotted #afa7a7;padding:10px;color:#555;}
  div#carUseDetail_page{margin-top:50px;}
</style>
