<template>
   <div id="container"></div>
</template>
<script>
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  import request from 'superagent'
  import moment from 'moment'
  // import Vue from 'vue'
  export default {
    data () {
      return {
        x_data: [],
        orderNumber: [],
        consumeMoney: []
      }
    },
    mounted: function () {
      console.log(this.$store.state)
      console.log(this.$store.state.consumeData.length)
      if (this.$store.state.consumeData.length === 0) {
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

              this.$store.dispatch('consumeData_action', {newArr})
              console.log(this)
              this.getChartDate()
              this.createChartsShap()
            }
          })
      } else {
        this.getChartDate()
        this.createChartsShap()
        return
      }
    },
    methods: {
      createChartsShap () {
         // 创建图表
        Highcharts.chart('container', {
          /** Highcharts 配置 */
          lang: {
            printChart: '打印图表',
            contextButtonTitle: '图表导出菜单',
            decimalPoint: '.',
            downloadJPEG: '下载JPEG图片',
            downloadPDF: '下载PDF文件',
            downloadPNG: '下载PNG文件',
            downloadSVG: '下载SVG文件'
          },
          chart: {
            type: 'column',
            backgroundColor: 'rgba(255,255,255,0)'                        // 指定图表的类型，默认是折线图（line）
          },
          title: {
            text: ''                 // 指定图表标题
          },
          xAxis: {
            categories: this.x_data,
            crosshair: true
          },
          yAxis: {
            title: {
              text: ''
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
          },
          series: [
            {
              name: ' ',
              color: '#996600',
              data: this.orderNumber,
              tooltip: {
                valueSuffix: '单',
                useHTML: true,
                headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
                pointFormatter: function () {
                  return '<span style="color:{' + this.series.color + '}"></span>单数: <b>' + this.y + '</b>'
                }
              }
            },
            {
              name: ' ',
              color: '#00cdcd',
              data: this.consumeMoney,
              tooltip: {
                valuePrefix: '￥',
                useHTML: true,
                headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
                pointFormatter: function () {
                  return '<span style="color:{' + this.series.color + '}"></span>金额: <b>￥' + this.y + '</b>'
                }
              }
            }
          ]

        })
      },
      getChartDate () {
        console.log(this.$store.state.consumeData)
        var res = this.$store.state.consumeData.map((item) => {
          return item.time
        })

        var order = this.$store.state.consumeData.map((item) => {
          return item.totalBill
        })

        var allMoney = this.$store.state.consumeData.map((item) => {
          return item.money
        })
        console.log(res)
        this.x_data = res
        this.orderNumber = order
        this.consumeMoney = allMoney
      },
      getChartByRoute (arr) {
        console.log('-----------')
        console.log(arr)
        var res = arr.map((item) => {
          console.log(item)
          return item.time
        })

        var order = arr.map((item) => {
          return item.totalBill
        })

        var allMoney = arr.map((item) => {
          return item.money
        })
        console.log(res)
        console.log(order)
        this.$set(res, this.x_data)
        this.x_data = res
        this.orderNumber = order
        this.consumeMoney = allMoney
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

                this.getChartByRoute(newArr)
                this.createChartsShap()
                flag = false
              }
            })
        } else {
          return
        }
      },
      time () {
        if (this.$store.state.timeline.length === 0) {
          console.log('beforeUpdate is noy entrey')
          return
        } else { 
          var type
          if (this.$route.query.type === 'day') {
            type = 0
          } else if (this.$route.query.type === 'week') {
            type = 1
          } else {
            type = 2
          }
          console.log(type)
            request
              .post('http://192.168.3.52:7099/franchisee/report/consume/userDefine')
              .send({
                'franchiseeId': '123456',
                'userId': 'admin',
                'start': this.$store.state.timeline.newObj.time1,
                'end': this.$store.state.timeline.newObj.time2,
                'type': type
              })
              .end((error, res) => {
                if (error) {
                  console.log('error:', error)
                } else {
                  var arr = JSON.parse(res.text).list
                  var newArr = []
                  for (var i = 0; i < arr.length; i++) {
                    var obj = {}
                    obj.time = moment(arr[i].time).format('YYYY-MM-DD')
                    obj.totalBill = arr[i].totalBill
                    obj.money = arr[i].money
                    newArr.push(obj)
                  }
                  this.getChartByRoute(newArr)
                  this.createChartsShap()
                }
              })

        }
      }
    },
    beforeUpdate () {
      this.dataUpdate()
    },
    beforeMount () {
      this.time()
    },
    watch: {
      '$route': 'dataUpdate',
      '$store.state.timeline': 'time'
    }
  }
</script>
<style>
  div#container g.highcharts-legend-item{display:none;}
</style>
