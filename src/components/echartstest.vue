<template>
     <el-table id="echarts" style="width: 600px;height:400px;"></el-table>
</template>
<script>
export default {
    data(){
          
        return{
          date:['周一','周二','周三','周四','周五','周六','周日','周七','周八'],
          value:[10, 12, 21, 54, 260, 830, 710]

        }
    },
   methods:{
       initEcharts: function() {
           let Myecharts = this.$echarts.init(document.getElementById('echarts'));
          let  option = {
    title: {
        text: '某楼盘销售情况',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['意向','预购','成交']
    },
    toolbox: {
        show: true,
        feature: {
            magicType: {show: true, type: ['stack', 'tiled']},
            saveAsImage: {show: true}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.date
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '成交',
        type: 'line',
        smooth: true,
         itemStyle: {
          normal: {
            color: "#2ec7c9",
            lineStyle: {
                color:  function(params) {
                        // build a color map as your need.
                        var colorList = ['#C1232B','#B5C334'];
                        
                        return colorList[params.dataIndex]
                    }
            }
        }
    },

        data: this.value
    },
   ]
};
Myecharts.setOption(option);
           
       }



}
    
}
</script>
