<template>
  <div id="add_order">
    <!-- <el-col>
    <el-button
      type="primary"
      @click="load_formdata"
      icon="el-icon-circle-plus"
      round
      style="border-radius: 50px;padding:5px 14px;"
    >添加订单</el-button></el-col> -->
    
    <el-dialog :visible.sync="ourterFormVisible" width="60%" @close="resetForm">
      <template slot="title">
        <i class="el-icon-circle-plus" style="color:#67C23A;"></i>
        <span style="font-size:18px;font-weight:blod;">{{is_update?'修改订单':'添加订单'}}</span>
      </template>
      <el-form :model="add_form"  ref="Form" >
  <el-row :gutter="20">
  <el-col :span="24"><el-form-item label="订单标题" label-width="250px">  
            <el-col :span="14"><el-input v-model="add_form.name" autocomplete="off" placeholder="订单标题"></el-input></el-col>
        </el-form-item></el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="24">
    <el-form-item label="订单类别" label-width="250px">
          <el-col :span="10">
            <el-select v-model="add_form.order_type" placeholder="订单类别">
              <el-option label="送东西类" value="3"></el-option>
              <el-option label="带饭类" value="1"></el-option>
              <el-option label="快递类" value="2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
  </el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="24">
         <el-form-item label="购买费" v-if="add_form.order_type=='1'" label-width="250px" style="text-align: unset;">
          <el-col :span="14">
            <el-input v-model="add_form.purchase" autocomplete="off" placeholder="购买费"></el-input>
          </el-col>
        </el-form-item>
  </el-col>
</el-row>
 <el-row :gutter="20">
  <el-col :span="24">
  <el-form-item label="订单紧急程度" label-width="250px" style="text-align: unset;">
          <el-col :span="10">
            <el-select v-model="add_form.order_emergency" placeholder="订单紧急程度">
              <el-option label="一般" value="3"></el-option>
              <el-option label="非常着急" value="1"></el-option>
              <el-option label="着急" value="2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
  </el-col>
</el-row>
  <el-row :gutter="20">
  <el-col :span="24"><el-form-item label="备注" label-width="250px" style="text-align: unset;">
          <el-col :span="18">
            <el-input type="textarea" v-model="add_form.order_decs" placeholder="备注"></el-input>
          </el-col>
        </el-form-item>
        </el-col>
</el-row>
  <el-row :gutter="20">
  <el-col :span="24">
     <el-form-item label="添加下单地址" label-width="250px" style="text-align: unset;">
          <el-col :span="14" >
              <el-select v-model="add_form.currentaddress" placeholder="添加下单地址" style="width: 300px;">
                <el-option
                  v-for="(item,index) in addresslist"
                  :key="index"
                  :label="item.value"
                  :value="[item.id, index]"
                ></el-option>
              </el-select>   
          </el-col>    
        </el-form-item>
        </el-col>
</el-row>
  <el-row :gutter="20">
  <el-col :span="24">
            <el-button type="primary" @click="is_update1=false;centerDialogVisible=true;" round>添加地址</el-button>
        </el-col>
</el-row>
<el-row :gutter="20" style="margin-top:20px;">
  <el-col :span="24">
         <el-button type="primary" @click="submitform" round >确定</el-button>
        <el-button type="info"  @click="go_cansal" round>取消</el-button>
        </el-col>
</el-row>    
      </el-form>
    </el-dialog>
    <addaddress :is_update='is_update1' :centerDialogVisible='centerDialogVisible' @get_return_address="get_return_address"/>  
  </div>
</template>

<script>
import addaddress from "../user_manage/add_address";

export default {
  props:['update_data','is_update','dialogFormVisible'],
  data() {
    return {
      centerDialogVisible:false,
      is_update2:false,
      // is_update:false,
      // dialogFormVisible: false,
      addresslist: [{
        value:"",
        id:0
      }],
      percentage_var: 10,
      add_form: {
        name: "",
        order_type: null,
        order_emergency: null,
        order_decs: "",
        purchase: "",
        currentaddress: [],
      }
      
    };
  },computed: {
    ourterFormVisible:{
      get: function() {
                return this.dialogFormVisible
            },
      set: function(value) {
                this.$emit('dialogFormVisible', value)
            }
    },
     update_data1:{
      get: function() {
                return this.update_data
            },
      set: function(value) {
                this.$emit('update_data', value)
            }
    },
       is_update1:{
      get: function() {
                return this.is_update
            },
      set: function(value) {
                this.$emit('is_update', value)
            }
    }
},
    components: {
    addaddress
  },
  created(){

  },
  mounted() {
    this.is_update2 = this.is_update
    this.update_data1 = this.update_data
    this.load_formdata()
  },
  watch: {
    // whenever question changes, this function will run
    is_update: function (newValue, oldValue) {
      let that =this;
      console.log(newValue,"****o**",oldValue)
       if(newValue){
console.log(this.addresslist)
                  let data1 ={}
                  console.log(that.update_data1)
        that.add_form['name']=that.update_data1['name']
        that.add_form['order_decs'] = that.update_data1['order_decs']
        that.add_form['order_type']=String(that.update_data1['order_type'])
      that.add_form['order_emergency'] = String(that.update_data1['order_emergency'])
     that.add_form['currentaddress'] =[that.update_data1['currentaddress'],0]
     that.add_form['purchase'] = that.update_data1['purchase']==""?"":String(that.update_data1['purchase'])
         
       }
       return newValue
    }

  },
  methods: {
    go_cansal:function(){
      this.$emit('get_order_return','')
    },
    get_return_address:function(val){
      console.log(val)
      let id = val.id?false:true
      if(id){
        this.centerDialogVisible = false
      }
      else{
        //select框置为添加的地址
         this.addresslist.push({
           value:val.address,
           id:val.id
         })
         let index = this.addresslist.length -1
         console.log(this.add_form.currentaddress)
            this.add_form.currentaddress=[val.id,index]
             this.centerDialogVisible = false
      }
    this.centerDialogVisible = false
    },
    load_formdata: function() {
      let that = this; 
    
      console.log(this.$cookie.get("user"));
      that.axios.get("/address", { user: this.$cookie.get("user") }).then(res => {
          console.log(res);
          if (res.status == 200) {
            let data = [];
            res.data.forEach((value, index) => {
              data.push({
                id: value["id"],
                value: value["address"]
              });
            });
            console.log(data);
            that.addresslist = data;
    
          }   
     
        });   
    },
    resetForm() {
      this.$refs["Form"].resetFields();
      this.add_form={
           name: "",
        order_type: null,
        order_emergency: null,
        order_decs: "",
        purchase: "",
        currentaddress: [],
      }
         this.$emit('get_order_return','')
          setTimeout(()=>{
        location.reload();
    }, 1000)
        

      },
    submitform:function(){
      let that = this;
      let data =JSON.parse(JSON.stringify(that.add_form))//使用深拷贝 
      data['order_type']=parseInt(data['order_type'])
      data['order_emergency'] = parseInt(data['order_emergency'])
      data['currentaddress'] =parseInt(data['currentaddress'][0])
      data['purchase'] = data['purchase']==""?0:parseInt(data['purchase'])
       console.log(this.add_form)
       if(that.is_update){
         
         that.axios.patch('/sendorders/'+that.update_data1.id+'/',data).then(res=>{
           console.log(res)
           this.$emit('get_order_return',res.data)
        //  location.reload()
           this.$message({
            type: 'success',
            message: '修改成功'
          })

        
         })
       }
       else{
      that.axios.post('/sendorders/',data,{
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        }).then(res=>{
          if(res.status == 201){
            
          this.$emit('get_order_return',res.data)
             this.$message({
            type: 'success',
            message: '创建成功'
          })
        //  location.reload()

          // this.dialogFormVisible =false
        console.log(res)}
      })
       }
    },
  }
};
</script>

<style scoped>
.as {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.el-form-item__label{
  /* display: -webkit-inline-box;
  text-align: -webkit-center; */
  
}
</style>
