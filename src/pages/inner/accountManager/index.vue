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
  
			<el-button id="accountSearchBtn" class="timeSelect_button">查询</el-button>
    </div>
  
    <!-- account -->
    <div class="account">
      <h1>
        <button type="button" @click="addAccount">添加新账号</button>
        <!--新增数据开始-->
        <!--新增数据结束-->
      </h1>
  
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%; font-size:13px;" v-loading="loading" element-loading-text="正在删除中">
        <el-table-column prop="userId" label="用户名" min-width="140"></el-table-column>
        <el-table-column prop="phoneNo" label="手机号" min-width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="170"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="role" label="类别" min-width="120">
          <template scope="scope">
            <span v-if="scope.row.role===0">管理员</span>
            <span v-else-if="scope.row.role===1">加盟商</span>
            <span v-else>合伙人</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="120" style="font-size:12px;">
          <template scope="scope">
            <el-switch
                v-on:change="changeState(scope)"
                v-model="scope.row.state" 
                on-text="开启" 
                off-text="关闭" 
                on-color="#13ce66"
                off-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="del" label="操作">
          <template scope="scope">
            <a href="javascript:;"></a>
            <i class="el-icon-edit" @click="openEdit(scope)" title="修改" style="margin-right:10px;"></i>
            </a>
            <i class="el-icon-close" title="删除" @click="openDelete(scope)"></i>
            <!--dialog 弹窗开始-->
             <el-dialog title="账号信息" :visible.sync="dialogVisible" :modal="true"
              :modal-append-to-body="false">
              <el-form :model="editAccount">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.userId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.phoneNo"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                  <el-select v-model="editAccount.role" placeholder="请选择类别">
                    <el-option
                      label="管理员"
                      value="管理员">
                    </el-option>
                    <el-option
                      label="合伙人"
                      value="合伙人">
                    </el-option>
                    <el-option
                      label="加盟商"
                      value="加盟商">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio-group v-model="editAccount.state">
                    <el-radio v-bind:label="true">开启</el-radio>
                    <el-radio v-bind:label="false">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditAccount">确 定</el-button>
              </div>
            </el-dialog>
            <!--dialog 弹窗结束-->
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
      loading: false,
      formLabelWidth: '60px',
      editAccount: {
        userId: '',
        phoneNo: '',
        email: '',
        name: '',
        role: '',
        state: '',
        value: '',
        index:''
      }
    }
  },
  methods: {
    addAccount () {
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    },
    openEdit (scope) {
      if (scope.row.role === 0) {
        this.editAccount.role = '管理员'
      } else if (scope.row.role === 1) {
        this.editAccount.role = '加盟商'
      } else {
        this.editAccount.role = '合伙人'
      }
      this.dialogVisible = true
      this.editAccount.userId = scope.row.userId
      this.editAccount.email = scope.row.email
      this.editAccount.phoneNo = scope.row.phoneNo
      this.editAccount.name = scope.row.name
      this.editAccount.state = scope.row.state
      this.editAccount.index= scope.$index
    },
    handleEditAccount () {
      this.dialogVisible = false
      var newAccountInfo = {}
      if (this.editAccount.role === '管理员') {
        newAccountInfo.role = 0
      } else if (this.editAccount.role === '加盟商') {
        newAccountInfo.role = 1
      } else {
        newAccountInfo.role = 2
      }
      newAccountInfo.userId = this.editAccount.userId
      newAccountInfo.email = this.editAccount.email
      newAccountInfo.phoneNo = this.editAccount.phoneNo
      newAccountInfo.name = this.editAccount.name
      newAccountInfo.state = this.editAccount.state
      var index = this.editAccount.index
      this.tableData.splice(index,1,newAccountInfo)
    },
    openDelete (scope) {
      var that = this
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          that.loading = true
          request.post('http://192.168.3.52:7099/franchisee/account/delAccount')
            .send({
              curAcc: {
                id: 0,
                emailBinding: 0,
                franchiseeId: '123456',
                loginAuth: 0,
                phoneNoBinding: 0,
                role: 0,
                state: 0,
                userId: '123'
              },
              newAcc: {
                id: scope.row.id,
                emailBinding: 0,
                franchiseeId: '123456',
                loginAuth: 0,
                phoneNoBinding: 0,
                role: scope.row.role,
                state: scope.row.state?0:1,
                userId: scope.row.userId
              }
            })
            .end((err, res) => {
              if (err) {
                console.log(err)
              } else {
                var code = JSON.parse(res.text).code
                if (code === 1) {
                  that.loading = false
                  that.$message({
                    type: 'error',
                    message: '对不起，您没有权限!'
                  })
                }else if(code === 0) {
                  that.loading = false
                  that.$message({
                    type: 'success',
                    message: '恭喜您，删除成功!'
                  })
                  that.tableData.splice(scope.$index,1)
                }
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })      
        })
    },
    changeState (scope) {
     var index= scope.$index
     var obj = Object.assign({},scope.row,{state: !scope.row.state})
     this.tableData.splice(index,1,obj)
     if( this.tableData[index].state ) {
       // 状态为true 发送请求 修改数据库状态
       console.error('状态为true 发送请求 修改数据库状态')
     }else {
       // 状态为false 发送请求 修改数据库状态
       console.error('false 发送请求 修改数据库状态')
     }
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
          var state = null
          if (item.state === 0) {
            state = true
          } else {
            state = false
          }
          obj = Object.assign({}, item, {state: state})
          return obj
        })
        console.log(arr)
        that.tableData = arr
        that.$store.state.accountMangerData = arr
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
                that.currentPage = that.totalPage
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
              var arr = JSON.parse(res.text).list
              that.$store.state.accountMangerData = []
              arr = arr.map((item) => {
                var obj = {}
                obj = Object.assign({}, item, {state: !item.state})
                that.$store.state.accountMangerData.push(obj)
                return obj
              })
              that.tableData = that.$store.state.accountMangerData
              console.log(that.$store.state.accountMangerData)
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

.one {
  background: #f87e2b;
  border: none;
  width: 120px;
  height: 50px;
}

.two {
  background: #f87e2b;
  border: none;
  width: 120px;
  height: 50px;  
}

.one:hover {
  background: rgba(248,126,43,0.9);
  width: 120px;
  height: 50px;
}


.two:hover {
  border: 1px solid rgb(248,126,43);
  color: rgb(248,126,43);
  width: 120px;
  height: 50px;
}
button#accountSearchBtn{width: 80px;
    /* float: right; */
    height: 36px;
    line-height: 11px;
    margin-right: 30px;
    color: #fff;
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);}
    button#accountSearchBtn:hover{color:#fff;}

</style>
