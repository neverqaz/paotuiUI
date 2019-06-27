<template>
    <div>
        <button @click="increatement">{{counter1}}</button>
        <input type="text" v-model="x">
        <h1>制作成dict：</h1>
    </div>
</template>
<script>
export default {
    data(){
        
        return{
            x:'',
            counter1:0,
            

        }
    },
    methods:{
        increatement :function(){
            this.counter1+=1;
            this.$emit('increatement');
        },
        makeDict: function(str){
            let dicttemp = {};
            
            

        }
    }
}
</script>
