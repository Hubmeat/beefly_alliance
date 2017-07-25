<template>
  <div class="carManager" style="margin-right: 20px;">
    <div v-title>车辆管理</div>
    <div class="carManager_content">
      <div class="queryCarInfo">
        <el-form :model="form">
          <el-row>
            <el-col>
              <el-form-item class="filtercar">
                <span class="labelAlign">关键字</span>
                <input v-model="terminalNumber" v-on:input='inputChange' class="carMan_bar" placeholder="车辆号\终端编号\车辆名称">
              </el-form-item>
              <el-form-item class="filtercar">
                <span class="labelAlign">状态</span>
              <el-checkbox-group v-model="checkList" style="width: 400px;">
                  <el-checkbox label="4">待出租</el-checkbox>
                  <el-checkbox label="5">已预订</el-checkbox>
                  <el-checkbox label="6">已出租</el-checkbox>
                  <el-checkbox label="7">维护中</el-checkbox>
              </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <span class="labelAlign">上线日期</span>
                <el-date-picker v-model='form.data1' type="date" placeholder="选择日期"></el-date-picker>
               <span class="division">至</span>
                <el-date-picker v-model='form.data2' type="date" placeholder="选择日期"></el-date-picker>
                <el-button class="my_btn" @click="searchByTimeline">查询</el-button>
                <!--<button @click='searchByTimeline'>查询</button>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="showCarInfo">

      <el-table
        :data="tableData"
        style="width: 100% font-size:13px; color: #6c6c6c;"
        v-loading="loading2"
        element-loading-text="拼命加载中">
        <el-table-column
          min-width="80"
          label="车辆号"
          prop='bikeCode'>
          <template scope="scope">
              <!-- <a>{{scope.row.bikeCode}}</a> -->
              <router-link style="color:rgb(118, 103, 233); text-decoration: none;" target='_blank' v-bind:to="{path:'/carUseDetail', query: {code:scope.row.bikeCode}}">{{scope.row.bikeCode}}</router-link>  
             <!-- <a @click="$router.push({path:'/carUseDetail', query: {code:scope.row.bikeCode}})">{{scope.row.bikeCode}}</a>  -->
          </template>
        </el-table-column>
        <el-table-column
          prop="boxCode"
          label="终端编号"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="onlineTime"
          label="上线日期"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="state"
          label="车辆状态"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="bikePosition"
          label="车辆位置">
        </el-table-column>
      </el-table>

    </div>
     <el-pagination
      v-show="pageShow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
    <div id="carManager_page">
      <div class="M-box"></div>
    </div>
  </div>
</template>
<script>
import request from 'superagent'
import moment from 'moment'
import $ from 'jquery'
// import Vue from 'vue'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import { host } from '../../../config/index.js'
export default {
  data: function () {
    return {
      form: {
        radio: '',
        data1: '',
        data2: ''
      },

      pageShow: false,
      currentPage3:1,
      tableData: [],
      timer: null,
      checkList: [],
      pagetotal: '',
      terminalNumber: '',
      noDate: false,
      loading2: false
    }
  },
  mounted: function () {
    this.mountedWay()
  },
  beforeMount () {
    if (this.tableData.length === 0) {
      this.noDate = true
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    searchByTimeline () {
      if (this.terminalNumber === '' && this.form.data1 === '' && this.form.data2 === '' && this.checkList === '') {
        this.$message({
          message: '请输入查询条件',
          type: 'warning'
        })
      } else {
        this.loading2 = true
        var startTime, endTime
        if (this.form.data1 === '' || this.form.data2 === '') {
          startTime = null
          endTime = null
        } else {
          startTime = moment(this.form.data1).format('YYYY-MM-DD')
          endTime = moment(this.form.data2).format('YYYY-MM-DD')
        }

      // 根据用户选择不同状态进行数据的筛选
        var radio = this.checkList
        // if () {

        // }
        request
          .post(host + '/franchisee/bikeManager/queryBikes')
          .send({
            'start': startTime?startTime:null,
            'end': endTime?endTime:null,
            'state': radio?radio:null,
            'name': this.terminalNumber?this.terminalNumber:null
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(JSON.parse(res.text).list)
              var data = (JSON.parse(res.text)).list
              var newData = this.tableDataDel(data)
              this.pagetotal = (JSON.parse(res.text)).totalPage
              // loading 关闭
              this.loading2 = false
              this.tableData = newData
              this.currentPage3 = 1
            }
          })
      }
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.bikeCode = arr[i].bikeCode
        obj.boxCode = arr[i].boxCode
        obj.generationsName = arr[i].generationsName
        obj.model = arr[i].model
        if (arr[i].onlineTime == '') {
          obj.onlineTime = ''
        } else {
          obj.onlineTime = moment(arr[i].onlineTime).format('YYYY-MM-DD HH:MM:SS')
        }
        obj.state = arr[i].state
        obj.orderNum = arr[i].orderNum
        /*
          上面的字段一部分需求去掉了，下面的需求为新增字段
        */
        obj.bikePosition = arr[i].place

        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
    },
    inputChange () {
      if (this.form.data1 === '' && this.form.data2 === '' && this.terminalNumber === '') {
        this.mountedWay()
      } else {
        return
      }
    },
    mountedWay () {
      this.loading2 = true
      request
        .post(host + '/franchisee/bikeManager/getBikes')
        .send({
          'franchiseeId': '123456',
          'userId': 'admin'
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            var data = JSON.parse(res.text).list
            var newData = this.tableDataDel(data)
            this.pagetotal = (JSON.parse(res.text)).totalPage
            this.tableData = newData

            // loading 关闭
            this.loading2 = false
            if (this.pagetotal > 1) {
              this.pageShow =  true
            } else {
              return
            }
          }
        })     
    }
  },
  watch: {
    'checkList': 'searchByTimeline',
     currentPage3: {
      handler: function (val,oldVal){
        if (this.terminalNumber === '' && this.form.data1 === '' && this.form.data2 === '' && this.checkList === '') {
          this.$message({
            message: '请输入查询条件',
            type: 'warning'
          })
       } else {
         var startTime = null
         var endTime = null
          if (this.form.data1 === '' || this.form.data2 === '') {
            startTime = null
            endTime = null
          } else {
            startTime = moment(this.form.data1).format('YYYY-MM-DD')
            endTime = moment(this.form.data2).format('YYYY-MM-DD')
          }
        }  
        if(this.checkList.length>0){
          request
            .post(host + '/franchisee/bikeManager/queryBikes?page=' + val)
            .send({
              'start': startTime?startTime:null,
              'end': endTime?endTime:null,
              'state': this.checkList?this.checkList:null,
              'name': this.terminalNumber?this.terminalNumber:null
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
              } else {
                console.log(JSON.parse(res.text).list)
                var data = (JSON.parse(res.text)).list
                var newData = this.tableDataDel(data)
                this.pagetotal = (JSON.parse(res.text)).totalPage
                // loading 关闭
                this.loading2 = false
                this.tableData = newData
                if (this.pagetotal > 1) {
                  this.pageShow = true
                } else {
                  return
                }
              }
            })
        }else{
          request
            .post(host + '/franchisee/bikeManager/getBikes?page=' + val)
            .send({
              'franchiseeId': '123456',
              'userId': 'admin'
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
              } else {
                console.log(JSON.parse(res.text))
                var pagedata = (JSON.parse(res.text)).list
                var newData = this.tableDataDel(pagedata)
                this.tableData = newData
              }
            })
        }
      },
      deep: true
    }
  }
}
</script>
<style>
.carManager_content {
  background: #fff;
  padding: 20px 30px 5px 30px;
  margin-bottom: 20px;
  border: 1px solid #e7ecf1;
}

/*div.carManager div.queryCarInfo {
  background: #f3f0f0;
  padding: 10px 10px 0 10px;
}*/

div.carManager div.queryCarInfo div.el-form-item {
  margin-bottom: 10px;
}
div.carManager div.queryCarInfo div.el-form-item  span.labelAlign{
  float:left;
  width: 68px;
  display: block;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  color:#555;
}
span.division{
font-size: 14px;
    color: #555;
    width: 32px;
    display: inline-block;
    text-align: center;
  }
div.filtercar{display: inline-block;}

div.line {
  margin-left: 0px;
}

div.el-input {
  width: 200px;
}

div.showCarInfo {
  padding: 20px 30px 10px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
}

div#carManager_page {
    padding: 4px 10px 0 22px;
    /* padding-bottom: 100px; */
    background: #fff;
    border: 1px solid #e7ecf1;
    border-top: none;
    min-height: 304px;
}

.carMan_bar {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    width: 427px;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.my_btn {
    width: 80px;
    float: right;
    height: 36px;
    line-height: 11px;
    color: #fff;
    /*margin-top: 10px;*/
    outline: none;
    border: none;
    border-radius: 4px; 
    cursor: pointer;
    background: rgba(52,52,67, 0.8);
}

.my_btn:hover {
    background: rgba(52,52,67, 0.9);
    color: #fff !important;
}

 .el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.el-date-table td.current:not(.disabled), .el-date-table td.end-date, .el-date-table td.start-date {
  background: black !important;
  color: #fff !important;
}

.el-input__inner:hover {
  border: 1px solid #bbb;
} 

.el-button:focus, .el-button:hover {
  color: #fff;
}

.datashow {
  /* width: 100%; */
  height: 60px;
  line-height: 60px;
  border: 1px solid #dfe6ec;
  border-top: none;
}

.datashow p {
  text-align: center;
  color: #5e7382;
}

.el-checkbox__inner {
  border-color: #ddd !important;
}

.el-checkbox__inner:hover {
  border-color: #ddd !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #444;
  border-color: #888;
  color: #fff;
}
div.carManager .el-form-item__content .el-input input.el-input__inner{width:194px;}
</style>
