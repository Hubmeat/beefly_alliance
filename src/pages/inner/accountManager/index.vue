<template>
  <div style="margin-right:20px;">
    <div id="am_search">
      <label>
        <span>关键字</span>
        <input type="text" placeholder="账号/用户名" v-on:blur="initQuery" v-model="accountOrUsername" class="account_my_input">
      </label>
      <label>
        <span>联系方式</span>
        <input type="text" placeholder="手机号/邮箱" v-on:blur="initQuery" v-model="telOrMail" class="account_my_input">
      </label>
  
			<el-button id="accountSearchBtn" @click="queryAccountInfo" class="timeSelect_button">查询</el-button>
    </div>
  
    <!-- account -->
    <div class="account">
      <h1>
        <button type="button" @click="addAccount">添加新账号</button>
        <!--新增数据开始-->
        <!--新增数据结束-->
      </h1>
  
      <!-- 表单 -->
      <el-table :data="tableData" :empty-text='emptyText' style="width: 100%; font-size:13px;" v-loading="loading" :element-loading-text="loadingText">
        <el-table-column prop="userId" label="用户名" min-width="140"></el-table-column>
        <el-table-column prop="phoneNo" label="手机号" min-width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="170"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="role" label="角色" min-width="120">
          <template scope="scope">
            <span v-if="scope.row.role===0">管理员</span>
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
              </el-form>
              <div slot="footer" class="dialog-footer editfooter">
                <el-button class="accountMangerBtn" type="primary" @click="handleEditAccount">确 定</el-button>
                <el-button class="accountMangerBtn" @click="dialogVisible = false">取 消</el-button>
              </div>
            </el-dialog>
            <!--dialog 弹窗结束-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
        v-show="pageShow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
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
import {getAllAccount} from '../../../api/getAllAccount.api'
import {modifyAccountState} from '../../../api/modifyAccountState.api'
import {delAccount} from '../../../api/delAccount.api'
import {updateAccount} from '../../../api/updateAccount.api'
import {host} from '../../../config/index'
import request from 'superagent'
export default {
  data () {
    return {
      isQuery: false,
      accountOrUsername:'',
      telOrMail:'',
      input: '',
      pageShow: false,
      emptyText: ' ',
      loadingText: '',
      currentPage: 1,
      totalItems: 1000,
      totalPage:1,
      tableData: [],
      initData: [],
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
    initQuery(){
      var that = this
      this.isQuery = false
      this.currentPage = 1
      if(this.accountOrUsername.trim().length===0&&this.telOrMail.trim().length===0){
          getAllAccount({franchiseeId: '123456',userId: 'admin'}, 1, function(error, res){
            if(error){
              console.log(error)
              setTimeout(function(){
                that.loading = false
                that.loadingText = '服务器链接超时'
              },5000)
              setTimeout(function(){
                that.emptyText = '暂无数据'
              },6000)
            } else {
                that.loading = true
                that.totalPage = JSON.parse(res.text).totalPage || 20
                var arr = JSON.parse(res.text).list
                if(that.totalPage>1) {
                   that.emptyText = ' '
                   that.pageShow = true
                } else {
                   that.emptyText = '暂无数据'
                   that.pageShow = false
                }
                that.totalItems = JSON.parse(res.text).totalItems
                that.$store.state.accountMangerData = that.handleData(arr)
                that.initData = that.$store.state.accountMangerData
                that.tableData =  that.$store.state.accountMangerData
                //that.setPage(arr,that.totalPage)
            }
          })
      }
    },
    handleSizeChange(val) {
     // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    addAccount () {
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    },
    openEdit (scope) {
      if (scope.row.role === 0) {
        this.editAccount.role = '管理员'
      } else{
        this.editAccount.role = '合伙人'
      }
      this.dialogVisible = true
      this.editAccount.id = scope.row.id
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
      var that = this
      if (this.editAccount.role === '管理员') {
        newAccountInfo.role = 0
      } else{
        newAccountInfo.role = 1
      }
      newAccountInfo.id = this.editAccount.id
      newAccountInfo.userId = this.editAccount.userId
      newAccountInfo.email = this.editAccount.email
      newAccountInfo.phoneNo = this.editAccount.phoneNo
      newAccountInfo.name = this.editAccount.name
      newAccountInfo.state = this.editAccount.state
      var index = this.editAccount.index
      updateAccount(
        {
          id: newAccountInfo.id,
          userId: newAccountInfo.userId,
          name: newAccountInfo.name,
          email: newAccountInfo.email,
          phoneNo: newAccountInfo.phoneNo
        },function(error,res){
          if(error){
            that.$message({
              type: 'error',
              message: 'sorry，修改信息失败！'
            })
          }else {
            var code = JSON.parse(res.text).code
            if(code === 0 ){
               that.$message({
                type: 'success',
                message: '恭喜您，修改成功！'
               })
               that.tableData.splice(index,1,newAccountInfo)
            }else {
              that.$message({
                type: 'error',
                message: 'sorry，修改信息失败！'
              })
            }
          }
        }
      )
    },
    openDelete (scope) {
      var that = this
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          that.loading = true
          delAccount(
            {
              curAcc: {
                id: 0,
                role: 0,
                state: 0,
                userId: '123'
              },
              newAcc: {
                id: scope.row.id,
                userId: scope.row.userId
              }
            },function(error,res){
                  if(error) {
                    console.log(error)
                    that.$message({
                      type: 'error',
                      message: '对不起，删除失败!'
                    })
                  }else {
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
                      if( that.tableData.length===0) {
                        that.pageShow = false
                        that.emptyText = '暂无数据'
                      }
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
      var that = this
      var initObj = Object.assign({},scope.row, {state: scope.row.state})
      var obj = Object.assign({},scope.row, {state: !scope.row.state})
      var obj2 = Object.assign({},scope.row, {state: !scope.row.state?0:1})
      modifyAccountState(
        {
         id: scope.row.id,
         state: !scope.row.state?0:1,
         userId: scope.row.userId
        },function(error, res){
            if(error) {
              console.log(error)
              that.$message({
                type:'error',
                message: '对不起，修改失败'
              })
              that.tableData.splice(scope.$index,1,initObj)
            }else {
              var code = JSON.parse(res.text).code
              if(code ===0 ){
                that.$message({
                  type:'success',
                  message: '恭喜你，修改成功'
                })
                that.tableData.splice(scope.$index,1,obj)
              }else {
                that.$message({
                  type:'error',
                  message: '对不起，修改失败'
                })
                that.tableData.splice(scope.$index,1,initObj)
              }
            }
          }
        )
    },
    handleData (arr) {
      var res = arr.map((item) => {
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
      return res
    },
    queryAccountInfo (){
      this.isQuery = true
       var obj = {
         name: this.accountOrUsername,
         phone: this.telOrMail
       }
       var that = this
       if(this.accountOrUsername.trim().length>0||this.telOrMail.trim().length>0){
          request.post(host + 'franchisee/account/queryAccount')
          .send(obj)
          .end(function(error,res){
            if(error){
              console.log(error)
            }else {
              var newArr = JSON.parse(res.text).list
              if(newArr.length===0){
                that.emptyText = '暂无数据'
                that.pageShow = false
              }else {
                that.emptyText = ''
                that.pageShow = true
                that.totalItems = JSON.parse(res.text).totalItems
              }
              that.tableData =  that.handleData(newArr)
            }
          })
       } else {
         this.tableData = this.initData
       }
    }
  },
  mounted () {
    var that = this
    this.currentPage = 1
    that.loading = true
     that.loadingText = '拼命加载中'
    getAllAccount({franchiseeId: '123456',userId: 'admin'}, 1, function(error, res){
      if(error){
        console.log(error)
        setTimeout(function(){
          that.loading = false
          that.loadingText = '服务器链接超时'
        },3000)
        setTimeout(function(){
          that.emptyText = '暂无数据'
        },3000)
        that.pageShow = false
      } else {
         
          that.totalPage = JSON.parse(res.text).totalPage || 20
          var arr = JSON.parse(res.text).list
          if(that.totalPage>1) {
            that.emptyText = ' '
            that.pageShow = true
          } else {
            that.emptyText = '暂无数据'
            that.pageShow = false
          }
          that.totalItems = JSON.parse(res.text).totalItems
          that.$store.state.accountMangerData = that.handleData(arr)
          that.initData = that.$store.state.accountMangerData
          that.tableData =  that.$store.state.accountMangerData
           that.loading = false
          //that.setPage(arr,that.totalPage)
      }
    })
  },
  watch: {
    currentPage: {
        handler: function (val, oldVal) {
          var that = this
          if(this.isQuery===false){
            getAllAccount({franchiseeId: '123456',userId: 'admin'}, val, function(error, res){
              if(error){
                console.log(error)
              } else {
                  var arr = JSON.parse(res.text).list
                  if(arr.length===0) {
                    that.emptyText = '暂无数据'
                    that.pageShow = false
                  } else {
                    that.emptyText = ' '
                    that.pageShow = true
                    that.totalItems = JSON.parse(res.text).totalItems
                  }
                  that.$store.state.accountMangerData = that.handleData(arr)
                  that.tableData = that.$store.state.accountMangerData
              }
            })
          }else {
             var obj = {
                name: this.accountOrUsername,
                phone: this.telOrMail
              }
             request.post(host + 'franchisee/account/queryAccount?page=' + val)
              .send(obj)
              .end(function(error,res){
                if(error){
                  console.log(error)
                }else {
                  var newArr = JSON.parse(res.text).list
                  if(newArr.length===0){
                    that.emptyText = '暂无数据'
                    that.pageShow = false
                  }else {
                    that.emptyText = ''
                    that.pageShow = true
                    that.totalItems = JSON.parse(res.text).totalItems
                  }
                  that.tableData =  that.handleData(newArr)
                }
              })
          }
        },
        deep: true
      }
    },
    
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
  margin-right: 10px;
  float: left;
}
#am_search label:nth-child(2){margin-left:0;}
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
    button#accountSearchBtn:hover{color:#fff;background:rgba(52,52,67,1);}
.accountMangerBtn {
    width: 120px;
    height: 50px;}
 .accountMangerBtn:nth-of-type(1):hover{background: rgba(248, 126, 43, 0.9);}
.accountMangerBtn:nth-of-type(1) {
    background: #f87e2b;
    border: none;
    color: #fff;}
.accountMangerBtn:nth-of-type(2){background: #fff;color: #444;border: 1px solid rgba(196,196,196,1)}   
.accountMangerBtn:nth-of-type(2):hover {border: 1px solid rgb(248, 126, 43);color: rgb(248, 126, 43);}     
div.addfooter,div.editfooter{text-align: left;
    padding-left: 60px;
    margin-top: -43px;}
    div.el-input{width:initial}
.el-pagination {
    white-space: nowrap;
    /* padding: 2px 5px; */
    color: #48576a;
    padding-left: 30px;
    background: #fff;
    /* margin-left: 1px; */
    border-left: 1px solid #e7ecf1;
}    
</style>
