<template>
	<div>
		<div id="addaccount_form">
						<h1 id="addaccount_title">添加账号
              <span>
                <a href="/index/accountManager">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="用户名" prop="userId">
								<el-input v-model="ruleForm.userId" placeholder='不超过100个字符'></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="ruleForm.password" placeholder='请输入密码'></el-input>
                <span class="tips">6-20位字符，可包括字母数字，区分大小写</span>
							</el-form-item>
							<el-form-item label="所属角色" prop="role">
								<el-select v-model="ruleForm.role" placeholder="选择角色类型">
									<el-option label="管理员" value="管理员"></el-option>
									<!-- <el-option label="加盟商" value="加盟商"></el-option> -->
									<el-option label="合伙人" value="合伙人"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="姓名" prop="name">
								<el-input v-model="ruleForm.name" placeholder='不超过50个字符'></el-input>
							</el-form-item>
							<el-form-item label="手机号" prop="phoneNo">
								<el-input v-model="ruleForm.phoneNo" placeholder='请输入手机号'></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="ruleForm.email" placeholder='请输入邮箱'></el-input>
							</el-form-item>
							<el-form-item label="备注">
								<el-input type="textarea" style="width:340px" v-model="ruleForm.textarea" placeholder="不超过200个字符"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/accountManager'})">取消</el-button>
							</el-form-item>
						</el-form>
			</div>
	</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #addaccount_form {
      /*  适配好的样式 */
      min-height: 30%;
      /*overflow-y: scroll; 
      overflow-x: hidden;*/
      width: 50%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-28%;
      margin-top:-27%;  
      padding: 70px 80px 0 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
    }
  }

@media screen and (max-width:1367px) {
  #addaccount_form {
    min-height: 30%;
    width: 62%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    position: fixed;
    display: block;
    top: 54%;
    left: 53%;
    margin-left: -38%;
    margin-top: -24%;
    padding: 90px 80px 0px 50px;
    margin-right: 20px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 2px;
  }
}

	.addaccount_button:nth-of-type(1) {
		background: #f87e2b;
    border: none;
    margin-left: 93px;
	}

	.addaccount_button:nth-of-type(1):hover {
		background: rgba(248,126,43,0.9);
	}


	.addaccount_button:nth-of-type(2):hover {
		border: 1px solid rgb(248,126,43);
		color: rgb(248,126,43);
	}

	.addaccount_button {
		width: 120px;
		height: 50px;
	}

	#addaccount_title {
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 20px;
    width: 100%;
    height: 60px;
    font-size: 24px;
    font-weight: 500;
    overflow: hidden;
    line-height: 60px;
    color: #444;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
	}

	#addaccount_title>h1 {
    font-weight: 400;
  }

  #addaccount_title span {
		float: right;
		margin-right: 14px;
    cursor: pointer;
    font-size:18px;
	}
  div#addaccount_form .el-form-item__content .el-input input.el-input__inner{width:initial;}
  span.tips{color:#dedede;}
  
</style>
      
<script>
import request from 'superagent'
import {checkUserName, checkMobile, isEmail} from '../../../../utils/index.js'
import {host} from '../../../config/index'
export default {
  data () {
    var validateUserId = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }else if (!checkUserName(value)) {
        callback('用户名格式：必须英文字母开头 不可以为汉字')
      }else {
        callback()
      }
    }
    var validatePhoneNo = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if(!checkMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    var validateEmail = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if(!isEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    var validateRole = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请选择角色类别'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        id: '',
        emailBinding: '',
        franchiseeId: '',
        loginAuth: '',
        phoneNoBinding: '',
        role: '',
        state: true,
        userId: '',
        password: '',
        phoneNo: '',
        email: '' ,
        textarea: ''
      },
      rules: {
        userId: [{ validator: validateUserId, trigger: 'blur', required: true}],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6, message: '密码应不少于6位', trigger: 'blur' }
        ],
        role:[{ validator: validateRole, trigger: 'change', required: true}],
        name: [
          {message: '请输入姓名', trigger: 'blur' },
        ]
        // phoneNo: [{ validator: validatePhoneNo, trigger: 'blur' }],
        // email: [{ validator: validateEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          }
        ).then(() => {
          if (this.ruleForm.role === '管理员') {
            this.ruleForm.role = 0
          } else{
            this.ruleForm.role = 1
          } 
          request.post(host + 'franchisee/account/addAccount')
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
                emailBinding: 0,
                franchiseeId: '123456',
                loginAuth: 0,
                phoneNoBinding: 0,
                role: this.ruleForm.role,
                state: 0,
                name: this.ruleForm.name,
                userId: this.ruleForm.userId,
                email: this.ruleForm.email,
                phoneNo: this.ruleForm.phoneNo
              }
            })
          .end( (err, res)=>{
            if (err) {
              console.log(err)
            } else {
              var code = JSON.parse(res.text).code
              if (code === 1) {
                 this.$router.push('/index/accountManager')
                 this.$message({
                    type: 'error',
                    message: '对不起，您没有权限'
                 })
              } else {
                  this.$router.push('/index/accountManager')
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  })
                 this.$store.commit({
                   type: 'addAcount',
                   obj: this.ruleForm
                 })
                 console.log(this.$store.state.accountMangerData)
              }
            }
          })
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
