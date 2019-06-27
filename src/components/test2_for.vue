<template>
<div>
    <!-- @keyup.enter
enter
tab
delete (捕获 “删除” 和 “退格” 键)
esc
space
up
down
left
right -->

    <input type="text" @keyup.enter="test1" v-model="message"/>
     <label> {{ message }} </label><br>
     <!-- 复选框-->
     <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
<br>
     <!--单选框  -->
     <input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
<br>
    <!-- 选择列表 -->
   <select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
<br>
{{list}}
{{fontSize}}
    
  
<!-- <Event-test3 @increatement2="increatement"><Event-test3> -->
     </div>
</template>
<script>
import EventTest3 from './eventTest3_2'
export default {
props:['fontSize','list'],
   data(){
      
       return {
        counter:0,
        message:'',
        checkedNames:[],
        picked:'',
        selected: 'A',
      options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
       }},
       components:{
           EventTest3,
       },
       methods:{
          test1:function(){
             window.alert(this.message)
          },
        //   increatement:function(){
        //     this.counter+=1;
        //     //this.$emit('increatement');

        //   }
        

       }

   
    
}
</script>
