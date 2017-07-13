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
				<ul class="form">
					<li>
						<span>姓名</span>
						<p>{{form.name}}</p>
					</li>
					<li>
						<span>性别</span>
						<p>{{form.sex}}</p>
					</li>
					<li>
						<span>证件类型</span>
						<p>{{form.IDtype}}</p>
					</li>
					<li>
						<span>手机号</span>
						<p>{{form.tel}}</p>
					</li>
					<li>
						<span>认购车辆数</span>
						<p>{{form.car}}</p>
					</li>
					<li>
						<span>邮箱</span>
						<p>{{form.email}}</p>
					</li>
					<li>
						<span>通讯地址</span>
						<p>{{form.address}}</p>
					</li>
					
					<el-button class='addpartner_button' type="primary" @click="onSubmit">关&nbsp;&nbsp;&nbsp;闭</el-button>

				</ul>
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
      padding: 70px 80px 20px 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
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
			margin-left: -30%;
			margin-top: -24%;
			padding: 60px 80px 80px 84px;
			margin-right: 20px;
			border: 1px solid #ccc;
			background: #fff;
			border-radius: 2px;
		}
	}

	.form {
		list-style: none;
	}
	
	.form li {
		width: 100%;
		height: 40px;
		line-height: 40px;
	}

	.form li span {
		float: left;
		width: 120px;
		text-align: right;
		color: #4c5b6e;
	}

	.form li p {
		color: #aaa;
		float: left;
		margin-left: 50px;
	}

	.addpartner_button:nth-of-type(1) {
		border: 1px solid #f87e2b;
		margin-left: 40px;
		margin-top: 40px;
		color: #f87e2b;
		background: #fff;
		text-align: center;
		cursor: pointer;
	}

	.addpartner_button:nth-of-type(1):hover {
		background: rgba(248,126,43,0.9);
		color: #fff;
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
    height: 60px;
    font-size: 24px;
    overflow-x: hidden;
    line-height: 60px;
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
import request from 'superagent'
export default {
  data () {
    return {
      form: {
        name: '',
        sex: '',
        IDtype: '',
        IDcard: '',
        tel: '',
        car: '',
        email: '',
        address: ''
      }
    }
  },
	mounted () {
		console.log(this.$route)
		request
			.post('http://192.168.3.52:7099/franchisee/partner/getPartnerDetail')
			.send({
				'franchiseeId': '123456',
				'userId': 'admin',
				'id': this.$route.params.id
			})
			.end((err, res) => {
				if (err) {
					console.log('err:' + err)
				} else {
					console.log(res)
					console.log(JSON.parse(res.text))
					var arr = JSON.parse(res.text)
					this.form.name = arr.name
					this.form.sex = arr.sex
					this.form.IDcard = arr.IDcard
					this.form.tel = arr.phoneNo
					this.form.cars = arr.bikeNum
					this.form.email = arr.email
					this.form.address = arr.address
				}
			})
	},
  methods: {
    onSubmit () {
      this.$router.push('/index/partnerManager')
    }
  }
}
</script>
