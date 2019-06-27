<template>
    <div class='form'>
        <div v-html="html(i)"></div>
         <h1>filter完成的学号：{{getXueHaos}}</h1> 
        <label>请输入一句话：</label>
        <!-- <div v-bind:style = "{ fontSize: fontSize + 'px' }" ><label class='topic' >{{message}}</label></div> -->
        <div  v-bind:class= "{ vislable : isvislable }" ><label class='topic' >{{reveresMessage}}</label></div>
        <div class="clear"></div>
        <div id="inner" >
        <input class='text' type="text" v-model="message" />
        <input type='button' value="提交" @click="commit"/></div>
        <input type="text" value="name.first_name" v-model="name.first_name"/>
        <input type="text" value="name.last_name" v-model="name.last_name"/>
        <label>{{full_name}}</label>
        <label>修改last_name中为全名：{{fullname}}</label>
        <h1 v-if="changetype=='songyouli'">yes</h1>
        <h1 v-else>No</h1>
        <input type="button" value="yes or no" @click="changeType"/>
        <div>
        <el-table
    :data="tableData2"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="日期"
      width="180" >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  <table>
      <th v-for="title in list.titles">{{title}}</th>
      <tr v-for="i,name in getListLength,list.names">
          <td v-for="j in 3">test1</td>
      </tr>
  </table>
    </div>
    <br>
    <Test2 :list="list" :fontsize="fontSize" ></Test2>
        <h1>父组件监听子组件：{{total}}</h1>
    <event-test3 @increatement='totalCount'/>
    <event-test3 @increatement='totalCount'/>
    <br>
    <h1>添加一件事：</h1>
    <input type="text" v-model="newmatter" @keyup.enter="addMetter"/>
    <!-- is是动态加载 Item-->
    <li is="Item" v-for = "(matter,index) in matters" :matter = "matter" @remove = "matters.splice(index,1)"></li>
   
    </div>
</template>
<script>
import EventTest3 from './eventTest3_2'
import Test2 from './test2_for'
import Item from './item'
export default {
   
    data(){
        
        return{
            i:'never/宋有利',
            newmatter:'',//新添加事情，
            matters:['chifan','shuijao'],//所有事情，
            total:0,
        fontSize :30,
         message:"",
         isvislable:true,
         changetype:'songyouli',
         name:{
              first_name:'',
               last_name:'',
         },
         fullname:[],
         //列表渲染
         listlength:0,
         list:{
             'titles':{'name':'姓名','xuhao':'学号','sex':'性别'},
             'names':['songyouli',
                     'zhangsan','qumeili',
                     'liangjia','haolibing','wangzheng','zufujian'],
             'xuehaos':[1,2,3,4,5,6,7],
             'sexs':['男','女','女','女','男','男','男']
         },
         tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
         
       
        
        }
       
    },
    components:{
    Test2,
    EventTest3,
    Item,
    },
    //生命周期函数
     beforeCreate:function(){
         console.log('beforeCreate');
     },
      created:function(){
          
          console.log('created');
      },
      beforeMount:function(){
          console.log('beforeMount');
      },
    beforeUpdate:function(){
     
      console.log('beforeUpdate');
    },
    updated : function(){
        console.log('updated');
         
    },
    mounted: function(){
        
        console.log('mounted');
    },
    beforeDestroy:function(){
        console.log('beforeDestroy');
    },
    destroyed:function(){
        console.log('destroyed');
    },
    //自带计算函数
    computed:{
        //第一种方式:反着输出
        reveresMessage:function(){
            console.log('computed');
        return this.message.split('').reverse().join('')

        },

       //根据姓和名拼全名
       full_name:{
           //计算提供get和set方法
           get: function(){
               let self = this;
               return self.name.first_name+' '+self.name.last_name},
           set: function(name) {//？什么时候调用
           let self = this;
               console.log(name[0]);
               var fullnam = name.split(' '); 
            //   self.last_name=fullnam[0]+fullnam[fullnam.length-1];
              self.fullname=['zhadhdhgd','wangawu'];
             
                          
           }

       },
       html:function(i){
          let a =  i.split("/")
           return "<i>"+a[0]('/')+"</i><br/><i>"+a[1]+"</i>"
       },
       //计算list长度：
       getListLength: function(){
           let self=this;
           self.listlength=self.list.names.length;
           return  self.listlength;
          
       },
       //过滤list中的xuehao中单数：
       getXueHaos:function(){
        
         return this.list.xuehaos.filter(function (numbers){

             return numbers %2 ===0
         })

       },

       

    },
     filters:{
         capitalize:function(value){
            
         },
     },
     methods:{
         commit: function(value){
           let self = this;
           let msg=self.message;
           self.isvislabled();
           
        //    window.alert(msg);
           
           

         },
         isvislabled:function(){
             const self=this;
             self.isvislable=false;
             
             return self.isvislable;
         },
         changeType: function(){
             return this.changetype = this.changetype === "songyouli" ? "xxxx" : "songyouli"
            

         },
        /*对列表的操作
        push()//添加
        pop()//删除
       shift()
      unshift()//删除
      splice()
      sort()
       reverse()
        */
         //添加一件事
         addMetter:function(){
             this.matters.push(this.newmatter);
             this.newmatter='';

         },
         //监听Test2子组件的被点击的次数
         totalCount:function(){
             this.total+=1;
         },
         //table
         tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
     }

}
</script>

<style scoped>
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
    input[type='text']{
        padding: 5px;
        margin: 10px;
        border: 1px solid rgb(155, 224, 186);
         margin-left: 30px;
        }
    label{
        /* position: relative;
        top: -10px; */
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        height: 100%;
        float: left;
        font-style: italic;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        padding: 5px;
        text-align: right;
        margin-left: 10px;
        
        color: rgb(172, 248, 238);}
    input[type='button']{
        padding: 5px;
        background-color: skyblue;
        border-radius: 5px;
        border: solid rgb(159, 213, 250);
    }
    .clear{
        clear: left;
        

    }
    .form{
        margin-left: auto;
        margin-right: auto;
        width: 600px;
        height: 100%;
        padding: 10px;
        /* border: 1px solid rgb(186, 243, 216); */
        text-align: center;
        
    }
    .topic{
        color: chartreuse;
    }
    .vislable{
        visibility: hidden;
    }
    
</style>
