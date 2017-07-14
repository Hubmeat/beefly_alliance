<template>
  <div class="messageCenter">
    <el-row>
      <el-col>
        <el-button class="selectAll" id="msgCenterBtn" type="primary" @click="selectAll">全部设为已读</el-button>
      </el-col>
      <el-col>
        <!-- <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>消息内容</th>
              <th>接收日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind:key="msg.title" v-for="msg of tableData">
              <td>
                <el-checkbox v-model="msg.isChecked"></el-checkbox>
                <span class="title">{{msg.title}}</span>
              </td>
              <td class="showAllMessage">
                <span class="detail" ref="tdShow">{{msg.content}}</span>
                <span class="open" @click="showMordWords(msg)" v-show="msg.tdshow">{{msg.changeText}}</span>
              </td>
              <td>
                {{msg.createTime}}
              </td>
              <td>
                <i class="icon iconfont icon-xinfeng"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="hasData" v-show="hasMsgData">
              暂无数据
        </div> -->
        <el-table
          :data="tableData"
          style="width:100%"
          v-loading="loadingdata"
          element-loading-text="拼命加载中"
        >
          <el-table-column
           label="标题"
           min-width="20%"
          >
            <template scope="scope">
              <span v-bind:class="{unRead:scope.row.unRead,read:scope.row.read}"></span>
              <span class="title">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
           label="消息内容"
           min-width="40%"
          >
            <template scope="scope">
                <span class="detail" style="color:#555;font-size:14px;" ref="tdShow">{{scope.row.content}}</span>
                <span class="open" @click="showMordWords(scope.row)" v-show="scope.row.tdshow">{{scope.row.changeText}}</span>
            </template>
          </el-table-column>
          <el-table-column
           label="接收日期"
           prop="createTime"
           min-width="30%"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="10%"
          >
            <template scope="scope">
              <i title="点击设置为已读" @click="setMsgStatus(scope)" class="icon iconfont icon-xinfeng"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="loginLog_page">
      <div class="M-box"></div>
    </div>
  </div>
</template>
<style scoped>
div.hasData{line-height: 60px;text-align: center;height: 60px;color:#9e9090;width: 100%;display:block;}
  div.messageCenter table{width:100%;border-collapse:collapse}
  div.messageCenter table tr th{text-align: left;border-bottom:2px solid #555;padding:15px 0 15px 10px;}
  div.messageCenter table tr td{padding:12px 10px;text-align: left;border-bottom: 1px dotted #555;color:#7b7272;font-size:14px;}
  div.messageCenter table tr td.showAllMessage{max-width:200px;overflow:hidden;font-size:14px;}
  div.messageCenter table tr td span.open{text-decoration: underline;color:#20a0ff;cursor:pointer;}
  div.messageCenter table tr td span.title{color:#7b7272;font-size:14px;}
  button.selectAll{margin-bottom:20px;}
  button#msgCenterBtn{ color: #fff;
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);}
  div.messageCenter{padding:20px;background:#fff;}
  span.unRead{width:18px;height:18px;border-radius:20px;background:#ecb042;display:inline-block;vertical-align: middle;margin-top: -2px;}
  span.read{background:transparent;opacity: 0}
  i.icon-xinfeng{cursor:pointer}
</style>
<script>
  import request from 'superagent'
  import $ from 'jquery'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
   import {checkPositiveNumber} from '../../../../utils/index.js'
  import moment from 'moment'
  export default {
    data: function () {
      return {
        loadingdata:true,
        hasMsgData: true,
        msg_totalPage: '',
        msg_currentPage: 1,
        tableData: []
      }
    },
    mounted: function () {
      var that = this
      request.post('http://192.168.3.52:7099/franchisee/msg/getAllMsg')
      .send({
        franchiseeId: '123456',
        userId: 'jjjj'
      })
      .end(function(err, res){
        if (err) {
          console.log(err)
        } else {
          var arr = JSON.parse(res.text).list
          that.tableData = arr.map((item) => {
           return Object.assign({},item,{createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')},{isChecked: item.isRead===0?false: true},{unRead:true,read:false})
          })
          that.checkWordsLength()
          that.msg_totalPage = JSON.parse(res.text).totalPage || 20
          var len = JSON.parse(res.text).list.length
          if (len>0) {
            that.loadingdata  = false
            that.hasMsgData = false
            $('.M-box').pagination({
              pageCount: that.msg_totalPage,
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '尾页',
              prevContent: '«',
              nextContent: '»'
            })
            $('.M-box').click(function (e) {
              if (e.target.getAttribute('class') === 'active') {
                return false
              }
              if (e.target.tagName === 'A') {
                if (e.target.innerText === '首页') {
                  that.msg_currentPage = 1
                }
                if (e.target.innerText === '尾页') {
                  that.msg_currentPage = that.msg_totalPage
                }
                if (e.target.innerText === '»') {
                  that.msg_currentPage++
                }
                if (e.target.innerText === '«') {
                  that.msg_currentPage--
                }
                if (checkPositiveNumber(e.target.innerText)) {
                  that.msg_currentPage = e.target.innerText
                }
                if (e.target.innerText === '跳转') {
                  e.preventDefault()
                  var jumpPageNum = $('.M-box .active')
                  that.msg_currentPage = jumpPageNum[0].innerText
                }
              }
            })
            $(document).keydown(function (e) {
              if (e.keyCode === 13) {
                that.msg_currentPage = e.target.value
                console.log(that.currentPage)
              }
            })
          }
        }
      })
    },
    watch: {
      msg_currentPage: {
        handler: function (val, oldVal) {
          var that = this
          request.post('http://192.168.3.52:7099/franchisee/msg/getAllMsg?page=' + that.msg_currentPage)
            .send({
              franchiseeId: '123456',
              userId: 'jjjj'
            })
            .end(function (err, res) {
              if (err) {
                console.log(err)
              } else {
                that.tableData = JSON.parse(res.text).list
                that.checkWordsLength()
              }
            })
        },
        deep: true
      }
    },
    methods: {
      showMordWords (msg) {
        var len = msg.prevHtml.length
        // 截取的字符串 content 暂存在temp中
        var temp = msg.content
        // 把msg的 content 还原
        msg.content = msg.prevHtml

        // 初始化数据 变成 temp截取的字符串
        msg.prevHtml = temp
        if (len > 31) {
          msg.changeText = '收起'
        } else {
          msg.changeText = '展开'
        }
      },
      checkWordsLength  () {
        this.tableData.map(function (item) {
          var len = item.content.length
          // 记录数据库中数据 
          item.prevHtml = item.content
          if (len > 30) {
            item.content = item.content.substr(0, 28) + '...'
            // 数据库中数据 超出 3行 则把数据 截取 赋值给content 此时 显示.... 展开按钮出来
            item.changeText = '展开'
            item.tdshow = true
          } else {
            item.tdshow = false
            item.changeText = '收起'
          }
        })
      },
      selectAll () {
       this.tableData = this.tableData.map(function(item){
         return Object.assign({},item, {isChecked:!item.isChecked},{unRead:true,read:true})
       })
      },
      setMsgStatus(scope){
        var index = scope.$index
        scope.row.read = true

      }
    }
  }
</script>

