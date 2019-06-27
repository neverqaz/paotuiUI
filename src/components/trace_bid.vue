<template>
  <div style="background-color: rgb(209, 205, 212);">
    <div class="top">
    </div>
    <div class="main">
      <div class="main_left" id="left"></div>
      <div class="main_right" id="right">hello</div>
    </div>
    
    <div class="main1">
        <div class="rent"></div>
      <div class="main_left1">
        <div class="time">2018-12-34</div>
        <div class="time">2018-12-34</div>
      </div>
      <div class="main_right1">
        <div class="box1">
          <p>hello1</p>
        </div>
        <div style="clear:both"></div>
        <div class="box">
          <p>hello</p>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      datax:[
        ["never", "never2"],
        ["2018-1-10", "2018-1-11", "2018-1-12", "2018-1-13"],
        [1, 4, 2, 4],
        [1, 4, 5, 8]
      ]
    }
  },
  mounted:function(){
      this.get_echarts()

  },
  methods: {
    get_echarts: function() {
     let  self = this;
      let echart_left = self.$echarts.init(document.getElementById("left"));
      let echart_right = self.$echarts.init(document.getElementById("right"));

      let optionLeft = {
            title: {
                left:'center',
                top: '10px',
                textStyle:{
          　　　　 fontSize:14
                },
                text: '曝光和请求'
            },
            tooltip: {
                trigger: 'axis',
                formatter:function(params)
                    {
                        let str = '';//声明一个变量用来存储数据
                        str += '<div>'+ params[0].name +'</div>';   
                        for(let i=0; i<params.length; i++) { 
                            str += '<span style="display: inline-block; background-color:'+params[i].color+'; ' +
                              'height: 3px; width: 15px; margin-right: 2px; margin-bottom: 3px"></span><span>'+
                              params[i].seriesName +'</span>: <span>'+ (params[i].data+'次') +'</span><br>';
                        }
                        return str;
                    }
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 55,
                bottom: 20,
                itemWidth: 12,
                itemHeight: 3,
                data:[{name:'曝光',icon:'rect'},{name:'请求',icon:'rect'} ]
            },
            grid: {
                left: '3%',
                right: '100px',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: self.datax[1]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'曝光',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    itemStyle: {
                      normal: {
                        lineStyle: {
                          width:1
                        }
                      }
                    },
                    data:self.datax[3]
                },
                {
                    name:'请求',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                          lineStyle: {
                            width:1
                          }
                        }
                      },
                    data:self.datax[2]
                }
            ]
          };
          echart_left.setOption(optionLeft)
          echart_right.setOption(optionLeft)
           window.onresize=function(){
            echart_left.resize()
            echart_right.resize()}
    }
  }
};
</script>

<style>
.top{
     width: 100%;
    height: 100px;
    background-color: aqua;
    margin-left:auto;
    margin-right: auto;
    /* float: left; */
    margin-top: -31px;
    margin-bottom: 20px;
    position: relative;
}
.main {
  width: 96%;
  background-color: rgb(242, 247, 247);
  height: 400px;
  margin-left: auto;
  margin-right: auto;
}
.main1 {
  width: 96%;
  background-color: rgb(242, 247, 247);
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

}
.main_left {
  width: 50%;
  /* background-color: blue; */
  height: 100%;
  float: left;
}
.main_right {
  width: 50%;
  /* background-color: brown; */
  height: 100%;
  float: right;
}
.main_left1 {
  width: 10%;
  background-color: chartreuse;
  height: 100%;
  float: left;
}
.main_right1 {
  width: 90%;
  background-color: rgb(209, 205, 212);
  height: 100%;
  float: right;
}
.time {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
}
.box {
  width: 100px;
  height: 40px;
  background-color: greenyellow;
  float: left;
  margin: 10px;
  border-radius: 10px;
}
.box1 {
  width: 100px;
  height: 40px;
  background-color: greenyellow;
  float: left;
  margin: 10px;
  border-radius: 10px;
}
.box1 p {
  margin: 10px;
}
.box p {
  margin: 10px;
}
.box ::after {
  content: "";
  display: block;
  width: 100px;
  height: 100px;
  margin-left: 40px;
  border-left: 1px solid rebeccapurple;
  background-color: bisque;
  margin-top: 9px;
}
.line {
  width: 60px;
  height: 100px;
  border-right: 1px solid rgb(192, 147, 238);
  /* background-color: brown; */
  margin-top: 100px;

}
.rent{
    width: 100%;
    height: 20px;
    background-color: rgb(209, 205, 212);
    clear: both;
}
</style>
