<template>
   <div id="container"></div>
</template>
<script>
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  export default {
    mounted: function () {
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
            data: [122, 122, 922, 1422, 1822, 212, 252, 262, 232, 182, 132, 92, 72, 62, 92, 142, 182, 22, 222, 262, 233, 183, 139, 976],
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
            data: [100, 28, 517, 1103, 172, 221, 242, 243, 201, 142, 81, 22],
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
    }
  }
</script>
<style>
  div#container g.highcharts-legend-item{display:none;}
</style>
