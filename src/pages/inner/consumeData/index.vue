<template>
  <div class="consumeData">
    <div class="countInfo">
      <el-row class="countTitle">
        <span class="countDimension labelAlign">统计维度</span>
        <div class="timeSelectBtn">
          <router-link :to="{ query: { type: 'day' }}">
            <el-button class="active" @click="handleChangeType" type="primary">今日</el-button>
          </router-link>
          <router-link :to="{ query: { type: 'week' }}">
            <el-button @click="handleChangeType">本周</el-button>
          </router-link>
          <router-link :to="{ query: { type: 'month' }}">
            <el-button @click="handleChangeType">本月</el-button>
          </router-link>
        </div>
        <span class="timePeried labelAlign" >数据时间段</span>
        <el-date-picker :format="form.formatType" v-model='form.data1' :type="form.type" placeholder="选择日期"></el-date-picker>
        <span class="division">至</span>
        <el-date-picker :format="form.formatType" v-model='form.data2' :type="form.type" placeholder="选择日期"></el-date-picker>
        <el-button class="query" icon="search">查询</el-button>
      </el-row>
      <el-row class="countDetail">
        <router-view></router-view>
      </el-row>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
import { siblings } from '../../../../utils/index.js'
export default {
  data: function () {
    return {
      form: {
        data1: '',
        data2: '',
        type: 'date',
        formatType: 'yyyy-MM-dd'
      },
      active: false
    }
  },
  methods: {
    handleChangeType (e) {
      switch (e.target.innerText) {
        case '日': {
          this.form.type = 'date'
          this.form.formatType = 'yyyy-MM-dd'
          break
        }
        case '周': {
          this.form.type = 'week'
          this.form.formatType = 'yyyy 第 WW 周'
          break
        }
        case '月': {
          this.form.type = 'month'
          this.form.formatType = ''
          break
        }
      }
      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button active el-button--default')
    }
  }
}
</script>
<style scoped>
div.consumeData {
  margin-right: 20px;
}

div.countInfo {
  padding: 20px;
  background: #fff;
}

div.countTitle {
  background: #f1fff1;
  margin-bottom: 20px;
  padding: 20px;
  color: #444;
}
div.countDetail{background:#f1fff1}
span.labelAlign{float:left;margin-right: 10px;text-align: right;display:block;line-height: 35px;font-size: 14px;color:#555;}
span.division{font-size:14px;color:#555;}
span.timePeried {
  margin-left: 10px;
}

span.division {
  font-size: 14px;
  color:#555;
}

button.query {
  float: initial;
}

button.isClick {
  background: red;
}

div.timeSelectBtn {
  display: block;
  float:left;
}
div.timeSelectBtn button {
  margin-left: 8px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  background: rgba(66,66,66, 0.8);
  transition: all .2s linear 0s;
  box-sizing: border-box;
  height:35px;
}

div.timeSelectBtn button.active {
    background: rgb(66,66,66);
}

.timeSelect_button {
    font-size:12px;
    height: 35px;
}

</style>
