<template>
<div>
    <h1>{{getList}}</h1>
    <el-table id="echarts" style="width: 600px;height:400px;" v-loading="loading"></el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            xdata:['1:30','1:35','1:40','1:45','1:50'],
            requestData:[30,80,60,20,50],
            fankuiData:[40,30,80,70,10],
            nums:[100,60,123,30,22],
            list1:[[1,2,3,4],[5,6,7],[8,9]],
            loading :false
        }
    },
    mounted:function(){
        this.Myecharts();
        
    },
    computed:{
     getList:function(){
         let list2=this.list1;
         let list=[];
         list2.forEach((items,index)=>{
             if(index%2==0){
                 items.forEach((item,index1)=>{
            list.push(item)

           })
             }
           
           


         })
         return list;

     }
    },
    methods:{
        Myecharts:function(){
          let Myecharts = this.$echarts.init(document.getElementById('echarts'));
          let option = {
              title:{
                  left:"center",
                  top:'10px',
                  textStyle:{
                      fontSize:14
                  },
                  text:'校园跑腿网流量监控',
              },
              tooltip:{
                    
                textStyle:{ fontSize:18, },
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'},
                formatter:function(params)
                    {
                        let str = '';//声明一个变量用来存储数据
                        str += '<div style="text-align:left;">'+ params[0].name +'</div>';   
                        for(let i=0; i<params.length; i++) { 
                            str += '<span style="display: inline-block; background-color:'+params[i].color+'; ' +
                              'height: 3px; width: 15px; margin-right: 2px; margin-bottom: 3px; float:left;margin-top: 10px; "></span><span style=" float:left;">'+
                              params[i].seriesName +'</span><span style=" float:left;">: '+ (params[i].data) +'</span><br>';
                        }
                        return str;
                    },
              },
              legend:{
                  type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 55,
                bottom: 20,
                itemWidth: 12,
                itemHeight: 3,
                  data:[{name:'请求',icon:'rect'},{name:'反馈',icon:'rect'},{name:'线上人数',icon:'rect'}]
              },
              grid:{
                   left: '3%',
                  right: '100px',
                  bottom: '3%',
                containLabel: true//label上的文字全显示x轴和y轴
              },
              xAxis:{
                  type:'category',
                  boundaryGap: false,
                  data:this.xdata,
              },
              yAxis:{type: 'value'},
              series:[
                  {
                      name:'请求',
                      type:'line',
                      smooth:true,//是否是平滑的线
                      //symbol:'none',//代表是否是空心圈存在
                      itemStyle:{
                           normal: {
                        lineStyle: {
                          width:1//线宽
                        }
                      }},
                      data:this.requestData},
                      {
                          name:'反馈',
                          type:'line',
                        smooth:true,
                          //symbol:'none',
                          itemStyle:{
                              normal:{
                                  lineStyle:{
                                      width:1
                                  }
                              }
                          },
                          data:this.fankuiData,}
                          ,{
                          name:'线上人数',
                          type:'line',
                        smooth:true,
                          //symbol:'none',
                          itemStyle:{
                              normal:{
                                  lineStyle:{
                                      width:1
                                  }
                              }
                          },
                          data:this.nums,}]
                          };
          Myecharts.setOption(option);
        },
    },
}
</script>
<style scoped>
  #echarts{
       width: 100%;
       height: 100%;
       margin-left: auto;
       margin-right: auto; 

  }
</style>
