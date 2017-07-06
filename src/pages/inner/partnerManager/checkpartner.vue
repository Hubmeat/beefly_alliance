<template>
<div>
	<div id="addpartner_form">
				<h1 id="addpartner_title">查看合伙人
					<span>
						<a href="/index/partnerManager">
							<i class="el-icon-close"></i>
						</a>
					</span>
				</h1>
			<el-form :model="form" ref="rule" label-width="80px">
			  <el-form-item label="姓名">
			    <el-input v-model="form.name" readonly="readonly" ></el-input>
			  </el-form-item>
			  <el-form-item label="性别">
			    <el-radio-group v-model="form.sex" disabled="disabled">
			      <el-radio label="男"></el-radio>
			      <el-radio label="女"></el-radio>
			    </el-radio-group>
			  </el-form-item>
			  <el-form-item label="证件类别">
			    <el-select v-model="form.IDtype" disabled placeholder="请选择证件类型">
			      <el-option label="居民身份证" value="居民身份证"></el-option>
			      <el-option label="护照" value="护照"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="证件号码">
			    <el-input v-model="form.IDcard" readonly="readonly"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号">
			    <el-input v-model="form.tel" readonly="readonly"></el-input>
			  </el-form-item>
			  <el-form-item label="车辆数">
			    <el-input v-model="form.car" readonly="readonly"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱">
			    <el-input v-model="form.email" readonly="readonly"></el-input>
			  </el-form-item>	  
			  <el-form-item label="通讯地址">
			    <el-input v-model="form.address" readonly="readonly"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button class='addpartner_button' type="primary" @click="onSubmit">返回</el-button>
			  </el-form-item>
			</el-form>
	</div>
</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #addpartner_form {
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
      border-radius: 6px;
    }
  }

	@media screen and (max-width:1367px) {
		#addpartner_form {
			height: 54%;
			width: 50%;
			box-shadow: 0 5px 15px rgba(0,0,0,.5);
			position: fixed;
			display: block;
			top: 62%;
			left: 50%;
			margin-left: -34%;
			margin-top: -28%;
			padding: 70px 150px 190px 144px;
			margin-right: 20px;
			border: 1px solid #ccc;
			background: #fff;
			border-radius: 6px;
		}
	}

	.addpartner_button:nth-of-type(1) {
		background: #f87e2b;
		border: none;
	}

	.addpartner_button:nth-of-type(1):hover {
		background: rgba(248,126,43,0.9);
	}

	.addpartner_button {
		width: 120px;
		height: 50px;
	}

	#addpartner_title {
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 20px;
    width: 98%;
    height: 40px;
    font-size: 18px;
    overflow-x: hidden;
    line-height: 40px;
    color: #444;
    border-bottom: 1px solid #eee;
	}

	#addpartner_title span {
		float: right;
		margin-right: 14px;
		cursor: pointer;
	}
</style>
<script>
export default {
  data () {
    return {
      form: {
        name: '胡经华',
        sex: '女',
        IDtype: '居名身份证',
        IDcard: '34324342424334888',
        tel: '13227892222',
        car: '186',
        email: 'jinghua@163.com',
        address: '大山里'
      }
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('/index/partnerManager')
    }
  }
}
</script>
