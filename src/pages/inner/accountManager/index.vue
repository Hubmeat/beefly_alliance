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
      <el-table :data="tableData" style="width: 100%; font-size:13px;" @cell-click="changeState">
        <el-table-column prop="userId" label="用户名" min-width="140"></el-table-column>
        <el-table-column prop="phoneNo" label="手机号" min-width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="170"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="role" label="类别" min-width="120">
          <template scope="scope">
            <span v-if="scope.row.role==0">管理员</span>
            <span v-else>普通人</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="120" style="font-size:12px;">
          <template scope="scope">
            <el-switch v-if="scope.row.state==true" v-bind:model="scope.row.state" on-color="#13ce66" on-text="开启" off-text="冻结" off-color="#ff4949">
            </el-switch>
            <el-switch v-else on-text="冻结" v-bind:model="scope.row.state" on-color="#ff4949" off-color="#13ce66" off-text="开启" >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="del" label="操作">
          <template scope="scope">
            <a href="javascript:;"></a>
            <i class="el-icon-edit" @click="openEdit(scope.row)" title="修改" style="margin-right:10px;"></i>
            </a>
            <i class="el-icon-close" title="删除"></i>
             <el-dialog title="账号信息" :visible.sync="dialogVisible" :modal="true"
              :modal-append-to-body="false">
              <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="form.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="form.phoneNo"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                  <el-select v-model="form.role" placeholder="请选择类别">
                    <el-option label="管理员" value="0"></el-option>
                    <el-option label="普通人" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.state">
                    <el-radio label="冻结"></el-radio>
                    <el-radio label="开启"></el-radio>
                  </el-radio-group>
                </el-form-item>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </div>
            </el-dialog>
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
import {checkPositiveNumber} from '../../../../utils/index.js'
import request from 'superagent'
export default {
  data () {
    return {
      input: '',
      currentPage: 1,
      tableData: [],
      router_show: false,
      dialogVisible: false,
      totalPage: '',
      form: {
        userId: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '60px',
      editAccount: {
        userId: '',
        phoneNo: '',
        email: '',
        name: '',
        role: '',
        state: ''
      }
    }
  },
  methods: {
    change () {
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    },
    openEdit (item) {
      this.dialogVisible = true
      console.log(item)
    },
    changeState (row, column, cell) {
      var res = this.tableData.map((item) => {
        var obj = {}
        if (item.id === row.id) {
          obj = Object.assign({}, item, {state: !item.state})
        }
        return obj
      })
      console.log(row, res)
      // this.tableData = res
    }
  },
  mounted () {
    var that = this
    request.post('http://192.168.3.52:7099/franchisee/account/getAllAccount')
    .send({
      franchiseeId: '123456',
      userId: 'admin'
    })
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        that.totalPage = JSON.parse(res.text).totalPage || 20
        var arr = JSON.parse(res.text).list
        arr = arr.map((item) => {
          var obj = {}
          obj = Object.assign({}, item, {state: !item.state})
          return obj
        })
        that.tableData = arr
        if (that.totalPage != null) {
          $('.M-box').pagination({
            pageCount: that.totalPage,
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '尾页',
            prevContent: '«',
            nextContent: '»'
          })
          $('.M-box').click(function (e) {
            if (e.target.getAttribute('class') === 'active') {
              return false
            }
            if (e.target.tagName === 'A') {
              if (e.target.innerText === '首页') {
                that.currentPage = 1
              }
              if (e.target.innerText === '尾页') {
                that.currentPage = that.pageSize
              }
              if (e.target.innerText === '»') {
                that.currentPage++
              }
              if (e.target.innerText === '«') {
                that.currentPage--
              }
              if (checkPositiveNumber(e.target.innerText)) {
                that.currentPage = e.target.innerText
              }
              if (e.target.innerText === '跳转') {
                e.preventDefault()
                var jumpPageNum = $('.M-box .active').text()
                that.currentPage = jumpPageNum
              }
            }
          })
          $(document).keydown(function (e) {
            if (e.keyCode === 13) {
              that.currentPage = e.target.value
              console.log(that.currentPage)
            }
          })
        }
      }
    })
  },
  watch: {
    currentPage: {
      handler: function (val, oldVal) {
        var that = this
        request.post('http://192.168.3.52:7099/franchisee/account/getAllAccount?page=' + this.currentPage)
          .send({
            franchiseeId: '123456',
            userId: 'admin'
          })
          .end(function (err, res) {
            if (err) {
              console.log(err)
            } else {
              that.tableData = JSON.parse(res.text).list
            }
          })
      },
      deep: true
    }
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
.el-icon-close, .el-icon-edit{cursor:pointer}
.el-dialog .dialogModal{background:rgba(0,0,0,.5)}
</style>
