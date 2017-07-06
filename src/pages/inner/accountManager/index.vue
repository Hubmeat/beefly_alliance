<template>
  <div style="margin-right:20px;">
    <div id="am_search">
      <label>
        <span>关键字 :</span>
        <input type="text" class="account_my_input">
      </label>
      <label>
        <span>联系方式 :</span>
        <input type="text" class="account_my_input">
      </label>
  
			<el-button icon="search" class="timeSelect_button">查询</el-button>
    </div>
  
    <!-- account -->
    <div class="account">
      <h1>
        <button type="button" @click="change">添加新账号</button>
      </h1>
  
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%; font-size:13px;">
        <el-table-column prop="user" label="用户名" min-width="140"></el-table-column>
        <el-table-column prop="tel" label="手机号" min-width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="170"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="type" label="类别" min-width="120"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="120" style="font-size:12px;">
          <template scope="scoped">
            <el-switch v-model='tableData[0].status' on-color="#13ce66" on-text="开启" off-text="冻结" off-color="#ff4949" myIndex='tableData.index' >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="del" label="操作">
          <template scope="scope">
            <a href="javascript:;"></a>
            <i class="el-icon-edit" style="margin-right:10px;"></i>
            </a>
            <i class="el-icon-close"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  
    <div id="account_page">
      <div class="M-box">
      </div>
    </div>

      <!--<div v-show='router_show' >-->
        <router-view id="account_router"></router-view>
      <!--</div>-->
  </div>
</template>

<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data () {
    return {
      input: '',
      currentPage: 3,
      tableData: [{
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true,
        index: 0
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: false,
        index: 1
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true,
        index: 2
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: false
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: false
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true
      }, {
        user: '老司机',
        tel: '15642657777',
        email: 'wangqqiuaw@163.com',
        name: '胡经华',
        type: '管理员',
        status: true
      }],
      router_show: false
    }
  },
  methods: {
    change () {
      console.log('this is entry')
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
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
  background: rgba(68,68,68,0.6);
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

div.account {
  /* width: 100%; */
  padding: 0 30px 10px 30px;
  background: #fff;
  margin-top: 20px;
  border: 1px solid #e7ecf1;
  border-bottom: none;
  /* padding-bottom: 100%; */
}

div.account>h1 {
  width: 90%;
  height: 68px;
  line-height: 55px;
}

div.account>h1 button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  background: rgba(66,66,66, 0.8);
  transition: all .2s linear 0s;
}

div.account>h1 button:hover {
  background: rgb(66,66,66);
  cursor: pointer;
}

#am_search {
  width: 100%;
  height: 70px;
  background: #fff;
  border: 1px solid #e7ecf1;
}

.account_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: inline-block;
  text-indent: 8px;
}

::-webkit-input-placeholder { /* WebKit browsers */ 
color: #bfcbd9; 
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #bfcbd9; 
} 
::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #bfcbd9; 
} 
:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #bfcbd9; 
} 

#am_search label {
  /* width: 190px; */
  height: 70px;
  line-height: 70px;
  margin-right: 10px;
  margin-left: 30px;
  float: left;
}

#am_search label span {
  line-height: 70px;
  font-weight: 400;
  font-size: 14px;
  display: block;
  margin-right: 20px;
  float: left;
}

#am_search button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 17px 30px;
  float: right;
  padding: 10px 15px;
  border-radius: 4px;
}

#am_search button:hover {
  color: #20a0ff;
  border-color: #20a0ff;
}

.el-table__body,
.el-table__footer,
.el-table__header {
  border: 2px solid red;
}

#account_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 100px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

.el-switch__label, .el-switch__label *{font-size:12px;}
</style>
