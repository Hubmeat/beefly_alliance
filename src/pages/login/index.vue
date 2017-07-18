<template>
  <div id="login">
    <div v-title>蜜蜂出行城市合伙人管理平台-登录</div> 
    <div class="content">
      <header>
        <h3>蜜蜂出行城市合伙人管理平台</h3>
      </header>
      <div class="loginForm">
        <el-form  label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" autofocus="autofocus" tabindex="1"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="formLabelAlign.password" @keyup.enter.native="handleEnter" type="password" placeholder="请输入密码" tabindex="2"></el-input>
          </el-form-item>
          <div class="button-group"  style="padding-left:81px; margin-top: -5px;">
            <el-button class="login" type="primary" name="username"  @click="handleSubmit">登录</el-button>
            <!-- <el-button class="forget_psd" type="danger" name="password">忘记密码</el-button> -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import request from 'superagent'
  export default {
    data () {
      return {
        formLabelAlign: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '用户名为英文数字下划线', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 17 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        if (this.formLabelAlign.username === '' && this.formLabelAlign.password) {
          this.$message({
            message: '请输入用户名和密码',
            type: 'warning'
          })
        } else {
            request
              .post('http://192.168.3.52:7099/franchisee/franchiseeLogin')
              .send({ 
                'name': this.formLabelAlign.username,
                'password': this.formLabelAlign.password })
              .end((error, res) => {
                if (error) {
                  console.log('error:', error)
                } else {
                  console.log(res)
                  console.log(JSON.parse(res.text).code)
                  if (JSON.parse(res.text).code === 0) {
                    this.$message({
                      message: '登录成功！',
                      type: 'success'
                    })
                    this.$router.push('/index')
                  } else {
                    this.$message.error('密码错误');
                  }
                }
              })
        }
      },
      handleEnter () {
        this.handleSubmit()
      }
    }
  }
</script>
<style scope>
  div#login{width:100%;height:100%;background:#f7cd36;position:absolute;left:0;top:0;bottom:0;right:0;overflow:hidden;}
  div#login div.content {width:100%;height:100%;}
  div#login div.content header {width:100%;height:40px;line-height: 40px;margin-bottom:20px;margin-top:10%;}
  div#login div.content header h3{width:400px;margin:0 auto;color:#fffaea;text-align: center;font-size:30px;}
  div#login div.content div.loginForm{width:400px;margin:0 auto;color:#fff;}
  div#login div.content div.loginForm form.el-form{height:100%;background:#292626;padding:40px;border-radius:5px;box-shadow:2px -1px 6px 2px rgba(0,0,0,.6)}
  div#login div.content div.loginForm form.el-form input{ border:1px solid #fbfdff}
  .el-button--primary{color: #fff;
    background-color: #292626;
    border-color: #ffffff;}
  .el-button--primary:hover{background:#f7cd36;border:1px solid #f7cd36;color:#222}  
  button.forget_psd{float:right;}
</style>

