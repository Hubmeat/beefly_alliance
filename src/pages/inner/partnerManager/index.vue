<template>
  <div style="margin-right:20px;">
    <div id="partner_header">
      <div class="partner_content">
        <label>
          <span>关键字</span>
          <input type="text" class="partner_my_input">
        </label>
        <label>
          <span>联系方式</span>
          <input type="text" class="partner_my_input">
        </label>
        <label>
          <span>认购车辆数</span>
          <el-select v-model="value">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="数量"></el-input>
        </label>
        <el-button class="my_btn">查询</el-button>
      </div>
    </div>
  
    <div id="partner_table">
      <div id="partner_add">
        <button @click="$router.push({path:'/index/partnerManager/addpartner'})">添加合伙人</button>
      </div>
      <el-table :data="tableData" style="width: 100% font-size:13px; color: #6c6c6c;">
        <el-table-column prop="name" label="姓名" min-width="80">
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="60">
        </el-table-column>
        <el-table-column prop="IDcard" label="证件号码" min-width="120">
        </el-table-column>
        <el-table-column prop="tel" label="手机号码" min-width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="140">
        </el-table-column>
        <el-table-column prop="cars" label="认购车辆数" min-width="80">
        </el-table-column>
        <el-table-column label="操作" prop="del">
          <template scope="scope">
            <a style="color:#444; margin-right:10px; cursor: pointer;" @click="goDetail(scope.row.partnerId)" title="查看">
              <i class="el-icon-document"></i>
            </a>
            <a href="javascript:;" @click="openEdit(scope.row, scope.$index)" style="color:#444; margin-right:10px;" title="编辑">
              <i class="el-icon-edit"></i>
            </a>
            <a href="javascript:;" @click='delPartner(scope.row.partnerId, scope.$index)' style="color:#444; margin-right:10px;" title="删除">
              <i class="el-icon-close"></i>
            </a>
            <!--dialog 弹窗开始-->
            <el-dialog title="合伙人信息" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
              <el-form :model="editAccount">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.sex"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.IDcard" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="车辆数" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.cars" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button class="partner_button" @click="dialogVisible = false">取 消</el-button>
                <el-button class="partner_button" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="editConfim(scope.row, scope.$index)">确 定</el-button>
              </div>
            </el-dialog>
            <!--dialog 弹窗结束-->
          </template>
        </el-table-column>
      </el-table>
    </div>
  
    <div id="partner_page">
      <div class="M-box"></div>
    </div>
  
    <router-view id="partnerManager_router"></router-view>
  </div>
</template>

<style scoped>
#partnerManager_router {
  width: 100%;
  height: 100%;
  background: rgba(68, 68, 68, 0.6);
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}

#partner_header {
  /*width: 100%;*/
  height: 70px;
  background: #fff;
  border: 1px solid #e7ecf1;
  /*padding: 20px 30px 20px 30px;*/
}

#partner_header .partner_content {
  background: #fff;
  overflow: hidden;
}

#partner_header .partner_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border-radius: 4px;
  text-indent: 8px;
  border: 1px solid #ddd;
  display: inline-block;
}

#partner_header label:nth-of-type(1) {
  height: 70px;
  width: 19%;
  line-height: 70px;
  margin-left: 30px;
  font-size: 14px;
  float: left;
}

#partner_header label:nth-of-type(1)>span {
  margin-right: 3px;
}

#partner_header label:nth-of-type(2) {
  height: 70px;
  font-size: 14px;
  width: 20%;
  line-height: 70px;
  /*margin-left: 20px;*/
  float: left;
}

#partner_header label:nth-of-type(2)>span {
  margin-right: 3px;
}

#partner_header label:nth-of-type(3) {
  height: 70px;
  width: 26%;
  font-size: 14px;
  line-height: 70px;
  /*margin-left: 20px;*/
  float: left;
}

#partner_header label:nth-of-type(3) .el-select>.el-input input {
  width: 100px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

#partner_header label:nth-of-type(3) .el-input {
  width: 50px;
}

#partner_header label:nth-of-type(3) .el-input input {
  border-radius: 4px;
  border: 1px solid #ddd;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #bfcbd9;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bfcbd9;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bfcbd9;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #bfcbd9;
}


/*#partner_header button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  float: right;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 17px 33px;
  padding: 10px 15px;
  border-radius: 4px;
}

#partner_header button:hover {
  color: #20a0ff;
  border-color: #20a0ff;
}*/




/*  #partner_table  */

#partner_table {
  padding: 0 30px 10px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
  margin-top: 20px;
}

#partner_add {
  width: 90%;
  height: 68px;
  line-height: 68px;
}

#partner_add button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  background: rgba(66, 66, 66, 0.8);
  transition: all .2s linear 0s;
}

#partner_add button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

#partner_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 100px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

#partner_header .my_btn {
    width: 80px;
    float: right;
    height: 36px;
    line-height: 11px;
    margin-right: 30px;
    color: #fff;
    margin-top: 17px;
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);
}

#partner_header .my_btn:hover {
    background: rgba(52,52,67, 0.9);
    color: #fff;
}

.partner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
}

.partner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.partner_button:nth-of-type(2) {
  background: #fff;
  color: #444;
  border: 1px solid rgba(196,196,196,1);
}

.partner_button:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

.partner_button {
  width: 120px;
  height: 50px;
}
</style>

<script>
  import $ from 'jquery'
  import request from 'superagent'
  import moment from 'moment'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
export default {
  data() {
    return {
      tableData: [],
      options: [{
        value: '1',
        label: '100'
      }, {
        value: '2',
        label: '200'
      }, {
        value: '3',
        label: '300'
      }, {
        value: '4',
        label: '400'
      }, {
        value: '5',
        label: '500'
      }, {
        value: '6',
        label: '600'
      }, {
        value: '7',
        label: '700'
      }, {
        value: '8',
        label: '800'
      }, {
        value: '9',
        label: '900'
      }],
      value: '',
      pagetotal: '',
      dialogVisible: false,
      formLabelWidth: '70px',
      editAccount: {
        name: '',
        sex: '',
        IDcard: '',
        tel: '',
        email: '',
        cars: '',
        id: ''
      },
      fullscreenLoading: false
    }
  },
  mounted() {
    request
      .post('http://192.168.3.52:7099/franchisee/franchiseeManager/getPartners')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
        } else {
          // console.log(JSON.parse(res.text))
          var newArr = JSON.parse(res.text).list
          this.$store.dispatch('partner_action', { newArr })
          var pageNumber = JSON.parse(res.text).totalPage
          this.tableData = this.$store.state.partnerList
          this.pagetotal = pageNumber
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
  beforeUpdate() {
    var that = this
    $('.M-box').click('a', function (e) {
      // console.log(e)
      that.pageUpdate(e)
    })
  },
  methods: {
    pageUpdate(e) {
      var that = this
      console.log(this.pagetotal)
      clearTimeout(this.timer)
      if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
        if (e.target.innerHTML === '首页') {
          e.target.innerHTML = 1
        } else if (e.target.innerHTML === '尾页') {
          e.target.innerHTML = this.pagetotal
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
          .post('http://192.168.3.52:7099/franchisee/franchiseeManager/getPartners?page=' + e.target.innerHTML)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(JSON.parse(res.text))
              var newArr = JSON.parse(res.text).list
              that.$store.dispatch('partner_action', { newArr })
              var pageNumber = JSON.parse(res.text).totalPage
              that.tableData = that.$store.state.partnerList
              that.totalPage = pageNumber
            }
          })
      }, 200)
    },
    delPartner(id, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request
          .post('http://192.168.3.52:7099/franchisee/partner/delPartner')
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'id': id
          })
          .end((err, res) => {
            if (err) {
              console.log('err:' + err)
            } else {
              console.log(JSON.parse(res.text).code)
              console.log(JSON.parse(res.text).code === 0)
              if (JSON.parse(res.text).code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.$store.state.partnerList.splice(index, 1)
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败，请联系🐝出行'
                })
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
    goDetail(id) {
      console.log(id)
      this.$router.push('/index/partnerManager/checkpartner/' + id)
    },
    openEdit(row) {
      this.dialogVisible = true
      this.editAccount.name = row.name
      this.editAccount.sex = row.sex
      this.editAccount.IDcard = row.IDcard
      this.editAccount.tel = row.tel
      this.editAccount.email = row.email
      this.editAccount.cars = row.cars
    },
    editConfim(row, index) {
      var that = this
      this.fullscreenLoading = true
      setTimeout(() => {
        that.fullscreenLoading = false
        var newAccountInfo = {}
        newAccountInfo.name = that.editAccount.name
        newAccountInfo.sex = that.editAccount.sex
        newAccountInfo.IDcard = that.editAccount.IDcard
        newAccountInfo.tel = that.editAccount.tel
        newAccountInfo.email = that.editAccount.email
        newAccountInfo.cars = that.editAccount.cars
        var index = that.editAccount.index
        that.$store.state.partnerList.splice(index, 1, newAccountInfo)
        that.dialogVisible = false
      }, 500)
    }
  }
}
</script>
