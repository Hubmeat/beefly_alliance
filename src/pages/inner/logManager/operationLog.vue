<template>
  <div class="operationlog">
    <el-tabs type="border-card" v-model="active">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-date"></i>平台</span>
       <el-row class="querybar">
         <el-form :inline="true" v-bind:model="form_plat">
           <el-form-item label="关键字：">
             <el-input v-model="form_plat.keyword"></el-input>
           </el-form-item>
           <el-form-item class="operatortime" label="操作日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="form_plat.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="form_plat.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
           </el-form-item>
           <el-button type="primary">查询</el-button>
         </el-form>
       </el-row>
       <el-row class="table">
         <table>
            <thead>
              <tr>
                <th>用户名</th>
                <th>姓名</th>
                <th>操作类别</th>
                <th>操作日期</th>
              </tr>
            </thead>
            <tbody>
              <tr v-bind:key="item.username" v-for="item of form_plat.tableData">
                <td>{{item.username}}</td>
                <td>{{item.firstname}}</td>
                <td>{{item.operationtype}}</td>
                <td>{{item.operationdate}}</td>
              </tr>
            </tbody>
          </table>
       </el-row>
       <div class="operationlog_page">
        <div class="M-box"></div>
       </div>
      </el-tab-pane>
      <el-tab-pane label="加盟商" name="second">
        <el-row class="querybar">
         <el-form :inline="true" v-bind:model="form_join">
           <el-row class="selectPlace">
              <address class="joinArea">加盟区域：</address>
              <div class="citys">
                <span @click="handleClick">全部地区</span>
                <span @click="handleClick">芜湖</span>
                <span @click="handleClick">郑州</span>
                <span @click="handleClick">南京</span>
                <span @click="handleClick" class="active">上海</span>
              </div>
           </el-row>
           <el-form-item class="keywords">
             <span class="keywords">关键字:</span>
             <el-input v-model="form_join.keyword"></el-input>
           </el-form-item>
           <el-form-item class="operatortime" label="操作日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="form_join.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="form_join.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
           </el-form-item>
           <el-button type="primary">查询</el-button>
         </el-form>
       </el-row>
       <el-row class="table">
         <table>
            <thead>
              <tr>
                <th>用户名</th>
                <th>姓名</th>
                <th>操作内容</th>
                <th>操作日期</th>
              </tr>
            </thead>
            <tbody>
              <tr v-bind:key="item.username" v-for="item of form_join.tableData">
                <td>{{item.username}}</td>
                <td>{{item.firstname}}</td>
                <td>{{item.operationContent}}</td>
                <td>{{item.operationdate}}</td>
              </tr>
            </tbody>
          </table>
       </el-row>
      <div class="operationlog_page">
        <div class="M-box"></div>
       </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
  div.operationlog i.el-icon-date{margin-right:5px;}
  div.operatortime{text-align: center;}
  div.querybar{padding-top: 20px;background: #f3f0f0;padding-left: 20px;}
  div.operationlog table{border-collapse:collapse;width:100%;}
  div.operationlog table thead tr th{font-weight:normal;text-align: left;border-bottom:2px solid #585555;padding: 5px 10px;}
  div.operationlog table tbody tr td{font-size:14px;color:rgba(121,121,121,1);font-family: '微软雅黑';border:none;border-bottom:1px dotted #afa7a7;padding:14px 10px;color:#555;}
  div.operationlog div.table{margin-top: 20px;}
  div.operationlog_page{margin-top: 50px;}
  div.selectPlace{margin-bottom:20px;}
  div.selectPlace address{font-style:normal;display:inline;font-size:14px;}
  div.selectPlace div.citys{display:inline-block;}
  div.selectPlace span{cursor:pointer;font-size:14px;display:inline-block;padding:5px;border:1px solid transparent;}
  div.selectPlace span.active{border:1px solid orange;}
  div.el-form-item__content div.el-input{display:inline-block;width: 192px;}
  div.el-form-item__content span.keyworkds{width: 63px;display: inline-block;text-align: right;margin-right: 10px;}
</style>
<script>
  import $ from 'jquery'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
  import moment from 'moment'
  import {siblings} from '../../../../utils/index.js'
  export default {
    data: function () {
      return {
        active: 'second',
        form_plat: {
          keyword: '姓名/用户名',
          startTime: moment(),
          endTime: moment(),
          tableData: [
            {
              username: '孙悟饭',
              firstname: '台亮',
              operationtype: '登录',
              operationdate: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              username: '小花猫',
              firstname: '台亮小弟',
              operationtype: '退出',
              operationdate: moment().format('YYYY-MM-DD HH:mm:ss')
            }
          ]
        },
        form_join: {
          keyword: '姓名/用户名',
          startTime: moment(),
          endTime: moment(),
          tableData: [
            {
              username: '孙悟饭',
              firstname: '台亮',
              operationContent: '修改稿了本人密码，绑定了手机号13811111111',
              operationdate: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              username: '小花猫',
              firstname: '台亮小弟',
              operationContent: '修改了李四的密码，新增了管理员账号：abc',
              operationdate: moment().format('YYYY-MM-DD HH:mm:ss')
            }
          ]
        }
      }
    },
    methods: {
      handleClick (e) {
        var elems = siblings(e.target)
        for (var i = 0; i < elems.length; i++) {
          elems[i].setAttribute('class', '')
        }
        e.target.setAttribute('class', 'active')
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

