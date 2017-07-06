<template>
<div style="margin-right:20px;">
	<div id="partner_header">
		<label>
			<span>关键字：</span>
        <input type="text" class="partner_my_input">
		</label>
		<label>
			<span>联系方式：</span>
        <input type="text" class="partner_my_input">
		</label>
		<label>
			<span>认购车辆数：</span>
			<el-select v-model="value">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		  </el-select>
			<el-input placeholder="数量"></el-input>
		</label>

		<el-button icon="search" class="timeSelect_button">查询</el-button>
	</div>

	<div id="partner_table">
    <div id="partner_add">
      <button @click="$router.push({path:'/index/partnerManager/addpartner'})">添加合伙人</button>
    </div>
		<el-table
      :data="tableData"
      style="width: 100% font-size:13px;">
      <el-table-column
        prop="name"
        label="姓名"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="IDcard"
        label="证件号码"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号码"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="cars"
        label="认购车辆数"
        min-width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        prop="del">
	      <template scope="scope">
	      	<a href="/index/partnerManager/checkpartner" style="color:#444; margin-right:10px;" title="查看"><i class="el-icon-document"></i></a>
	      	<a href="javascript:;" style="color:#444; margin-right:10px;" title="编辑"><i class="el-icon-edit"></i></a>
	      	<a href="javascript:;" style="color:#444; margin-right:10px;" title="删除"><i class="el-icon-close"></i></a>
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

<style>
  #partnerManager_router {
    width: 100%;
    height: 100%;
    background: rgba(68,68,68,0.6);
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }

	#partner_header {
    width: 100%;
    height: 70px;
    background: #fff;
    border: 1px solid #e7ecf1;
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
    width: 24%;
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
    width: 26%;
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


	#partner_header button {
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
	}


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
    background: rgba(66,66,66, 0.8);
    transition: all .2s linear 0s;
  }

  #partner_add button:hover {
    background: rgb(66,66,66);
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
</style>

<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data () {
    return {
      tableData: [{
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }, {
        name: '胡经华',
        sex: '女',
        IDcard: '681501000555030',
        tel: '13056426666',
        email: 'hujinghua@163.com',
        cars: 300,
        del: ''
      }],
      currentPage: 3,
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
      value: ''
    }
  },
  mounted () {
    $('.M-box').pagination({
      pageCount: 50,
      jump: true,
      coping: true,
      homePage: '首页',
      endPage: '尾页',
      prevContent: '«',
      nextContent: '»'
    })
  }
}
</script>
