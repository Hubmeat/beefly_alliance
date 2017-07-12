<template>
   <div id="container"></div>
</template>
<script>
  import moment from 'moment'
  import request from 'superagent'
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  export default {
    data () {
      return {
        orderlist: '',
        moneyList: ''
      }
    },
    mounted: function () {
      request
        .post('http://192.168.3.52:7099/franchisee/home/getOderHourRange')
        .send({
          'franchiseeId': '123456',
          'userId': 'admin'
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            console.log(res)
            var data = JSON.parse(res.text)
            console.log(data)
            // this.$store.dispatch('setAllData', {})
          }
        })
        this.initHighCharDate()
    },
    methods: {
      initHighCharDate () {
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
              type: 'line'                           // 指定图表的类型，默认是折线图（line）
            },
            title: {
              text: ' '                 // 指定图表标题
            },
            xAxis: {
              categories: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
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
                color: '#74f7af',
                data: this.moneyList,
                tooltip: {
                  valueSuffix: '单',
                  useHTML: true,
                  headerFormat: '<span style="font-size: 12px">时间： {point.key}</span><br/>',
                  pointFormatter: function () {
                    return '<span style="color:{' + this.series.color + '}"></span>金额: <b>' + this.y + '</b>'
                  }
                }
              },
              {
                name: ' ',
                color: '#ff4949',
                data: this.orderlist,
                tooltip: {
                  valuePrefix: '￥',
                  useHTML: true,
                  headerFormat: '<span style="font-size: 12px">时间： {point.key}</span><br/>',
                  pointFormatter: function () {
                    return '<span style="color:{' + this.series.color + '}"></span>单数: <b>￥' + this.y + '</b>'
                  }
                }
              }
            ]

          })
      },
      getChartByRoute (arr) {
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
      // time () {
      //   if (this.$store.state.timeline.length === 0) {
      //     console.log('beforeUpdate is noy entrey')
      //     return
      //   } else { 
      //     var type
      //     if (this.$route.query.type === 'day') {
      //       type = 0
      //     } else if (this.$route.query.type === 'week') {
      //       type = 1
      //     } else {
      //       type = 2
      //     }
      //     console.log(type)
      //       request
      //         .post('http://192.168.3.52:7099/franchisee/report/consume/userDefine')
      //         .send({
      //           'franchiseeId': '123456',
      //           'userId': 'admin',
      //           'start': this.$store.state.timeline.newObj.time1,
      //           'end': this.$store.state.timeline.newObj.time2,
      //           'type': type
      //         })
      //         .end((error, res) => {
      //           if (error) {
      //             console.log('error:', error)
      //           } else {
      //             var arr = JSON.parse(res.text).list
      //             var newArr = []
      //             for (var i = 0; i < arr.length; i++) {
      //               var obj = {}
      //               obj.time = moment(arr[i].time).format('YYYY-MM-DD')
      //               obj.totalBill = arr[i].totalBill
      //               obj.money = arr[i].money
      //               newArr.push(obj)
      //             }
      //             this.getChartByRoute(newArr)
      //             this.createChartsShap()
      //           }
      //         })

      //   }
      // }
    },
    beforeUpdate () {
      this.dataUpdate()
    },
    // beforeMount () {
    //   this.time()
    // },
    watch: {
      '$route': 'dataUpdate',
      '$store.state.timeline': 'time'
    }
  }
</script>
<style>
  div#container g.highcharts-legend-item{display:none;}
</style>
