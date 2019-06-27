<template>

    <div id="conMid">
  <div id="trace-tree">
       <div id="leftright">
      <div id="left">
      <div id="top">
      <div v-for="item in majors">
        <div class="box1">{{item}}</div>
      </div>
    </div>
      <div id="bottom">
        <div id="line"></div>
        <div id="boxesLines">
          <div class="boxesLine" v-for="item in items2">
            <div v-for="(i, index) in item">
            <div  :class="{ box2: box2, box3: index, boxDisplay: i==0, lineLength: index==0 }">{{i}}</div>
            </div>
        </div>
      </div>

    </div>
    </div>
       </div></div></div>
</template>
<script>
export default {
    data(){
       
         return{
        box2:true,
        majors:["Sfst King", "Sfst Fisher"],
        items2:[["blackuser"],
        ["match", "Rubik"],
        ["shield", "shield_Redis"],
        ["vipuser"],
        ["restricted_delivery"],
        ["customer_whitelist_filter"],
        ["promotion_objective_filter", "DMP_Redis"],
        ["abtest"],
        ["smooth"],
        ["freq_filter", "Freq_Redis"],
        ["unlike_filter", "Unlike_Redis"],
        ["ecpm"],
        ["target"],
        ["rank"],
        ["new_title", "Title_Service"],
        ["creative_render", "nickname_Redis"],
        ["c2s_supplier"]]
        ,dict1:{},

         }

    },
}
</script>

<style  scoped>
.table{
    width: 100%;
    height: 90px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 50px;
  }
  #mid{
   cursor: pointer;
  }
  .table2{
    text-align: center;
    line-height: 90px;
    font-size: 18px;
    /*color: red;*/
  }
  #lineCut{
    height: 1px;
    width: 100%;

    background-color: #C0C0C0;
    margin-bottom: 20px;
  }
  #trace-tree{
    position: relative;
  }
  .descCell{
    height: 30px;
    line-height: 30px;
  }
  #left{
    position: relative;
    overflow-x: auto;
  }
  .box1{
    width: 80px;
    height: 30px;
    margin-top: 10px;
    line-height: 30px;
    border: 1px solid rgb(33, 41, 156);
    background-color: rgb(33, 41, 156);
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    color: #fff;
   
    position: relative;
  }
  .box1:after{
    content: "";
    display: block;
    width: 1px;
    height: 14px;
    background: #797979;
    margin-left: 39px;
    margin-top: -1px;
  }
  #bottom{
    position: relative;
  }
  #line{
    position: absolute;
    width: 1px;
    height: 0;
    float: left;
    background-color: #797979;
    margin-left: 40px;
    margin-top: 14px;
    z-index: 2;
  }
  .box2{
    width: 160px;
    height: 30px;
    margin-top: 10px;
    margin-left: 19px;
    line-height: 0px;
    border-radius: 8px;
    border: 1px solid #1493F7;
    background-color: #1493F7;
    text-align: center;
    float: left;
    font-size: 12px;
    color: #fff;
    position: relative;
    z-index: 1;
  }
  .box2:before{
    content: "";
    display: block;
    width: 99px;
    height: 25px;
    background-color: rgba(255,255,255, 0);
    margin-left: -100px;
    margin-top: -11px;
    border-bottom: 1px solid #797979;
    border-left: 1px solid #797979;
  }
  .lineLength:before{
    display: block;
    width: 60px;
    height: 25px;
    background-color: rgba(255,255,255, 0);
    margin-left: -60px;
    margin-top: -11px;
    border-bottom: 1px solid #797979;
    border-left: 1px solid #797979;
  }
  #boxesLines{
    margin-left: 40px;
   

  }
  .boxesLine{
    clear: both;
    margin-left: 40px;
  }
  .box3{
    border: 1px solid #52962A;
    background-color: #52962A;
  }
  .boxDisplay{
    visibility: hidden;
  }
  #left{
    float: left;
  }
  #right{
    float: left;
    padding-top: 4px;
    width: 100px;
    /*padding-right: 20px;*/
  }
  #layer{
    /*width: 1150px;*/
    margin-top: 45px;
    position: absolute;
    opacity: 1;
  }
  .bgitem{
    height: 40px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff
  }
  #conMid{
    width: 92%;
    height: 1250px;
    float: left;
    padding-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    overflow: scroll;
  }


</style>



