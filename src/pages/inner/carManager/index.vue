<template>
  <div class="carManager" style="margin-right: 20px;">
    <div class="carManager_content">
      <div class="queryCarInfo">
        <el-form :model="form">
          <el-row>
            <el-col>
              <el-form-item class="filtercar">
                <span class="labelAlign">关键字</span>
                <el-input v-model="terminalNumber" placeholder="车辆号\终端编号\车辆名称"></el-input>
              </el-form-item>
              <el-form-item class="filtercar">
                <span class="labelAlign">状态</span>
                <el-radio class="radio" v-model="form.radio" label="使用中">使用中</el-radio>
                <el-radio class="radio" v-model="form.radio" label="维修中">维修中</el-radio>
                <el-radio class="radio" v-model="form.radio" label="已报废">已报废</el-radio>
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
                <el-button @click='searchByTimeline' icon="search">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="showCarInfo">
      <table>
        <thead>
          <tr>
            <th>车辆号</th>
            <th>终端编号</th>
            <th>车辆名称</th>
            <th>车型</th>
            <th>上线日期</th>
            <th>状态</th>
            <th>骑行次数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="item.finnalNum" v-for="item of tableData">
            <td>
              <router-link v-bind:to="{path:'/index/carUseDetail', query: {carNum:item.carNum}}">{{item.code}}</router-link>
            </td>
            <td>{{item.boxCode}}</td>
            <td>{{item.generationsName}}</td>
            <td>{{item.generationsCode}}</td>
            <td>{{item.onlineDate}}</td>
            <td>{{item.carStatus}}</td>
            <td>{{item.carRideTimes}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <div id="carManager_page">
      <div class="M-box"></div>
    </div>
  </div>
</template>
<script>
import request from 'superagent'
import $ from 'jquery'
// import Vue from 'vue'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data: function () {
    return {
      form: {
        radio: '使用中',
        data1: '',
        data2: ''
      },
      tableData: [],
      timer: null,
      pagetotal: '',
      terminalNumber: ''
    }
  },
  mounted: function () {
    request
      .post('http://192.168.3.52:7099/franchisee/bikeManager/getBikes')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((error, res) => {
        // console.log('this is entry')
        if (error) {
          console.log('error:', error)
        } else {
          console.log(res)
          console.log((JSON.parse(res.text)).totalPage)
          const data = (JSON.parse(res.text)).list
          console.log(data)
          this.pagetotal = (JSON.parse(res.text)).totalPage
          $('.M-box').pagination({
            pageCount: this.pagetotal,
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '尾页',
            prevContent: '«',
            nextContent: '»'
          })
          this.tableData = data
        }
      })
  },
  beforeUpdate: function () {
    var that = this
    $('.M-box').click('a', function (e) {
      clearTimeout(this.timer)
      if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
        if (e.target.innerHTML === '首页') {
          e.target.innerHTML = 1
        } else if (e.target.innerHTML === '尾页') {
          e.target.innerHTML = that.pagetotal
        } else if (e.target.innerHTML === '«') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) - 1
        } else if (e.target.innerHTML === '»') {
          console.log($('.M-box span.active')[0].innerHTML)
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) + 1
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }
      this.timer = setTimeout(function () {
        request
          .post('http://192.168.3.52:7099/franchisee/bikeManager/getBikes?page=' + e.target.innerHTML)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(res)
              console.log(JSON.parse(res.text))
              const pagedata = (JSON.parse(res.text)).list
              // console.log(pagedata)
              // console.log(this.tableData)
              that.tableData = pagedata
            }
          })
      }, 200)
    })
  },
  methods: {
    searchByTimeline: function () {
      if (this.form.data1 === '' || this.form.data2 === '') {
        this.$message('请选择想要查询的时间段！')
      } else if (this.terminalNumber === '' && this.form.data1 === '' && this.form.data2 === '') {
        this.$message('请输入想要查询的车辆编号！')
      } else {
        console.log(this.form.data1)
        console.log(this.form.data2)
        // request
        //   .post('http://192.168.3.52:7099/franchisee/bikeManager/getBikes?page=')
        //   .send({
        //     'franchiseeId': '123456',
        //     'userId': 'admin'
        //   })
        //   .end((error, res) => {
        //     if (error) {
        //       console.log('error:', error)
        //     } else {
        //       console.log(res)
        //     }
        //   })
      }
    }
  }
}
</script>
<style scoped>
.carManager_content {
  background: #fff;
  padding: 20px 30px 20px 30px;
  margin-bottom: 20px;
  border: 1px solid #e7ecf1;
}

div.carManager div.queryCarInfo {
  background: #f1fff1;
  padding: 10px 10px 0 10px;
}
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
span.division{font-size:14px;color:#555;}
div.filtercar{display: inline-block;}
div.line {
  margin-left: 0px;
}

div.el-input {
  width: initial
}

div.showCarInfo {
  padding: 20px 30px 10px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
}

div.showCarInfo table {
  border-collapse: collapse;
  width: 100%
}

div.showCarInfo table tr th {
  text-align: center;
  border: 1px solid #dfe6ec;
  padding: 5px 0;
  background: #eef1f6;
  color: #444;
}

div.showCarInfo table tr td {
  text-align: center;
  border: 1px solid #dfe6ec;
  padding: 10px 0;
  color: #555;
  font-size: 14px;
}

div.showCarInfo table tr td a {
  text-decoration: none;
  color: #555
}

div#carManager_page {
    padding: 4px 10px 0 22px;
    /* padding-bottom: 100px; */
    background: #fff;
    border: 1px solid #e7ecf1;
    border-top: none;
    min-height: 304px;
}
</style>
