<template>
  <div style="margin-right:20px;">
    <div id="am_search">
      <label>
        <span>角色查询 :</span>
        <input type="text" class="account_my_input">
      </label>
  
      <el-button icon="search">查询</el-button>
    </div>
  
    <!-- account -->
    <div class="account">
      <h1>
        <button type="button" @click="openEditRole">添加角色</button>
        <el-dialog
          title="添加角色"
          :visible.sync="dialogFormVisible"
          :modal-append-to-body="false"
          :modal="true"
        >
          <el-form v-model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.des"></el-input>
            </el-form-item>
            <el-form-item label="权限列表" :label-width="formLabelWidth">
              <el-tree
                :data="form.rolePowerList"
                show-checkbox
                ref="tree"
                node-key="id"
                :props="defaultProps">
              </el-tree>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddRole">确 定</el-button>
          </div>
        </el-dialog>
      </h1>
  
      <!-- 表单 -->
      <el-table :data="tableData" style="width: 100%; font-size:13px;">
        <el-table-column prop="roleName" label="角色名称" min-width="160"></el-table-column>
        <el-table-column prop="des" label="备注" min-width="160"></el-table-column>
        <el-table-column label="包含用户" min-width="170">
          <template scope="scope">
            <ul class="roleList">
              <el-tag
                v-for="name in scope.row.names"
                :key="name"
                type="gray"
              >
                {{name}}
              </el-tag>
              <!-- <li :key="name" v-for="name of scope.row.names">{{name}}</li> -->
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="del" label="操作">
          <template scope="scope">
            <i class="el-icon-edit" style="margin-right:10px;" title="修改"></i>
            <i class="el-icon-close" title="删除"></i>
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
import request from 'superagent'
export default {
  data () {
    return {
      input: '',
      dialogFormVisible: false,
      currentPage: 1,
      totalPage:1,
      tableData: [{
        roleName: '管理员',
        des: '这里是备注',
        names: []
      }],
      router_show: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        roleName: '',
        des: '',
        names: [],
        rolePowerList: [
              {
                id: 2,
                label: '首页'
              },
              {
                id: 3,
                label: '车辆管理'
              },
              {
                id: 4,
                label: '报表管理',
                children: [
                  {
                    id:41,
                    label: '消费数据'
                  },
                  {
                    id:42,
                    label: '24小时数据走势'
                  },
                  {
                    id:43,
                    label: '热力图'
                  },
                  {
                    id:44,
                    label: '异常数据'
                  }
                ]
              },
              {
                id: 5,
                label: '合伙人管理'
              },
              {
                id: 6,
                label: '营收管理',
                children: [
                  {
                    id: 61,
                    label: '收益明细'
                  },
                  {
                    id: 62,
                    label: '结算记录'
                  },
                ]
              },
              {
                id: 6,
                label: '账号管理'
              },
              {
                id: 7,
                label: '个人中心'
              },
              {
                id: 8,
                label: '角色管理'
              },
              {
                id: 9,
                label: '信息中心'
              },
              {
                id: 10,
                label: '日志管理',
                children: [
                  {
                    id: 101,
                    label: '登录日志'
                  },
                  {
                    id: 102,
                    label: '操作日志'
                  },
                ]
              }
            ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    openEditRole () {
      this.dialogFormVisible = true
      // this.$router.push('/index/roleManager/addrole')
      // this.router_show = true
    },
    handleAddRole () {
     this.dialogFormVisible = false
     var authList = this.getCheckedNodes()
     var that = this
     request
      .post('http://192.168.3.52:7099/franchisee/account/addRole')
      .send({
        des: that.form.des,
        roleName: that.form.roleName,
        auth: authList,
        roleType: that.form.roleName === '管理员'?'0':'1'
      })
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
      })

    },
    getCheckedNodes() {
        return this.$refs.tree.getCheckedNodes()
    },
  },
  mounted () {
    var that = this
    request
     .post('http://192.168.3.52:7099/franchisee/account/getRole')
     .end((err, res) => {
       if (err) {
         console.log(err)
       } else {
         var result = JSON.parse(res.text).list
         if (result.length>0 ) {
            $('.M-box').pagination({
              pageCount: that.totalPage,
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '尾页',
              prevContent: '«',
              nextContent: '»'
            })
         }
         that.tableData  = result
       }
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
  width: 320px;
  height: 30px;
  outline: none;
  border-radius: 4px;
  margin-top: 4px;
  border: 1px solid #ddd;
  display: inline-block;
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
  float: right;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 18px 34px;
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
ul.roleList li {list-style-type: none;float:left;}
span.el-tag{margin-left:10px;padding:0 10px;}
</style>

