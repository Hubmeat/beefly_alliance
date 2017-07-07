<template>
	<div>
		<div id="addaccount_form" v-loading="loading" element-loading-text="拼命加载中">
						<h1 id="addaccount_title">绑定邮箱
              <span>
                <a href="/index/memberCenter">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="邮箱" prop="maiAccount">
								<el-input v-model="ruleForm.maiAccount" placeholder='请输入邮箱'></el-input>
							</el-form-item>
							<el-form-item label="账户密码" prop="account_password">
								<el-input type='password' v-model="ruleForm.account_password" placeholder='为保障账号安全，您需要填写当前登录账号和密码'></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="handleBindEmail">立即绑定</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/memberCenter'})">取消</el-button>
							</el-form-item>
					</el-form>
			</div>
	</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #addaccount_form {
      /*  适配好的样式 */
      height: 50%;
      /*overflow-y: scroll; 
      overflow-x: hidden;*/
      width: 50%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-28%;
      margin-top:-25%;  
      padding: 70px 80px 0 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
    }
  }

  @media screen and (max-width:1367px) {
    #addaccount_form {
      height: 50%;
      width: 50%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top: 62%;
      left: 50%;
      /*overflow-y: scroll;*/
      margin-left: -34%;
      margin-top: -24%;
      padding: 80px 150px 60px 144px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
    }
  }

  .loading_class {
    background: rgba(68,68,68,0.4);
  }

	.addaccount_button:nth-of-type(1) {
		background: #f87e2b;
		border: none;
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
    width: 98%;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    overflow-x: hidden;
    line-height: 40px;
    color: #444;
    border-bottom: 1px solid #eee;
	}

  #addaccount_title span {
		float: right;
		margin-right: 14px;
		cursor: pointer;
	}
</style>
      
<script>
import {isEmail} from '../../../../utils/index.js'
import request from 'superagent'
export default {
  data () {
    var validateMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        var res = isEmail(value)
        if (res === true) {
          return callback()
        } else {
          callback(new Error('邮箱格式不正确！！！'))
        }
      }, 1000)
    }
    return {
      ruleForm: {
        maiAccount: '',
        account_password: ''
      },
      loading: false,
      rules: {
        maiAccount: [
          {required: true, trigger: 'blur', validator: validateMail}
        ],
        account_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最短为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleBindEmail () {
      var that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认绑定吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          }).then(function () {
            that.$alert('我们已经向您的邮箱发送验证码', '申请绑定', {
              confirmButtonText: '确定',
              callback: function (action) {
                that.loading = true
                request.post('http://192.168.3.52:7099/franchisee/userCenter/bindingEmail2')
                .send({franchiseeId: '123456', userId: 'admin', email: that.ruleForm.maiAccount, password: that.ruleForm.account_password})
                .end((err, res) => {
                  if (err) {
                    console.log(err)
                    that.loading = false
                    that.$router.push('/index/memberCenter')
                    that.$message({
                      message: 'sorry，服务器请求超时，请稍候再试',
                      type: 'error'
                    })
                  } else {
                    var status = JSON.parse(res.text).code
                    if (status === 0) {
                      that.loading = false
                      that.$router.push('/index/memberCenter')
                      that.$message({
                        message: '恭喜你，绑定成功',
                        type: 'success'
                      })
                    } else {
                      that.loading = false
                      that.$message({
                        message: 'sorry，绑定失败',
                        type: 'error'
                      })
                    }
                  }
                })
              }
            })
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>
