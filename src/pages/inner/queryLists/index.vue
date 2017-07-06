<template>
  <div class="queryLists">
    <h3>
      <el-button @click="handeClick">查看统计图</el-button>
    </h3>
    <div>
      <table>
        <thead>
          <tr>
            <th>消费时间</th>
            <th>消费单数</th>
            <th>消费盈利</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key='list.id' v-for="list in lists">
            <td>{{list.time}}</td>
            <td>{{list.totalBill}}</td>
            <td>￥{{list.money}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>

div.queryLists h3 {
  text-align: right;
  margin-bottom: 20px;
}

div.queryLists {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}

div.queryLists h3 {
  text-align: right;
  margin-bottom: 20px;
}

div.queryLists h3 button {
  margin-right: 0px;
  width: 137px;
}

div.queryLists table {
  width: 100%;
  border-collapse: collapse;
}

div.queryLists table tr th {
  text-align: left;
  border: 1px solid #cccfd2;
  padding: 10px;
  background: #eef1f6;
  color: #444;
  font-weight: bold;
}

div.queryLists table tr td {
  text-align: left;
  border: 1px solid #cccfd2;
  padding: 10px;
}
</style>
<script>
import request from 'superagent'
import moment from 'moment'
export default {
  data () {
    return {
      lists: []
    }
  },
  methods: {
    handeClick () {
      this.$router.push('/index/consumeData/queryCharts')
    },
    dataUpdate () {
      var flag = true
      if (this.$route.query.type === undefined) {
        return
      } else if (flag === true) {
        request
          .post('http://192.168.3.52:7099/franchisee/report/consume/' + this.$route.query.type)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            // console.log('this is entry')
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              console.log(JSON.parse(res.text).list)
              var arr = JSON.parse(res.text).list
              var newArr = []
              for (var i = 0; i < arr.length; i++) {
                var obj = {}
                obj.time = moment(arr[i].time).format('YYYY-MM-DD')
                obj.totalBill = arr[i].totalBill
                obj.money = arr[i].money
                newArr.push(obj)
              }
              // console.log(newArr)
              this.$store.dispatch('consumeData_action', {newArr})
              this.lists = this.$store.state.consumeData
              flag = false
            }
          })
      } else {
        return
      }
    }
  },
  mounted () {
    request
      .post('http://192.168.3.52:7099/franchisee/report/consume/day')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((error, res) => {
        // console.log('this is entry')
        if (error) {
          console.log('error:', error)
        } else {
          console.log(JSON.parse(res.text).list)
          var arr = JSON.parse(res.text).list
          var newArr = []
          for (var i = 0; i < arr.length; i++) {
            var obj = {}
            obj.time = moment(arr[i].time).format('YYYY-MM-DD')
            obj.totalBill = arr[i].totalBill
            obj.money = arr[i].money
            newArr.push(obj)
          }
          // console.log(newArr)
          // this.lists = newArr
          this.$store.dispatch('consumeData_action', {newArr})
          this.lists = this.$store.state.consumeData
        }
      })
  },
  created () {
    this.dataUpdate()
  },
  watch: {
    '$route': 'dataUpdate'
  }
}
</script>
