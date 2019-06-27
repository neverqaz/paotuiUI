<template>
    <div>
      <div>
         <el-row type="flex" justify="center">
      <el-col :span="2">
        <el-button type="primary" @click="is_update=false,centerDialogVisible = true" round> 添加地址信息</el-button>
      </el-col></el-row>
      </div>
      <el-row type="flex" justify="center">
      <el-col :span="24">
      <div>
        <el-table
      :data="tableData"
      size="mini"
      style="width: 100%;">
      <el-table-column
      min-width="10"
        prop="user_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
      min-width="10"
        prop="user_mobile"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        min-width="10">
      </el-table-column>
      <el-table-column
      min-width="10"
      label="操作"
     >
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          删除
        </el-button>
        <el-button
          @click.native.prevent="showeditRow(scope.$index, tableData)"
          type="text"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
    </el-table>
      </div></el-col></el-row>
      <el-dialog
  :title="is_update?'修改地址':'添加地址'"
  :visible.sync="centerDialogVisible"
  width="50%"
  @close="resetForm()"
  >
         <el-form :model="add_address_form" ref="dialog_f">
          <el-form-item prop="user_name" label="用户名">
            <el-input v-model="add_address_form.user_name" autocomplete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="user_mobile" label="联系方式" >
            <el-input v-model="add_address_form.user_mobile" autocomplete="off" placeholder="联系方式"></el-input>
          </el-form-item>     
  <!-- 父组件接收子组件的值 -->
  <el-form-item>
  <baidumap @sendparentPoint="accpetsunmethord"></baidumap></el-form-item>

  <span slot="footer" class="dialog-footer"> </span>
    <el-button @click="resetForm(),centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="edit_address_info">确 定</el-button>
          </el-form>
</el-dialog>

 
      </div>
       

    
</template>

<script>
import baidumap from './baidumap'
export default {
data() {
      return {
        centerDialogVisible: false,
           tableData: [],
           add_address:{},//添加地址信息
           is_update:false,//是否为修改信息
           add_address_form:{
             "address_point": "",
             "address": "",
             "user_name": "",
             "user_mobile": "",
             "city": "",
           },

      };
    }
    ,  components:{
      baidumap,
    },
    mounted:function(){
      this.getuseraddress();
    },
    methods:{
      resetForm:function(){
      this.$refs["dialog_f"].resetFields();
      },
      accpetsunmethord:function(param){
        console.log("131312311312312312312")
        console.log(param)
        this.add_address = param.address_info
        
      },
      getuseraddress: function() {
        this.axios.get('/address/').then(res=>{
          this.tableData = res.data;

        })
        
      },
      edit_address_info:function(){
        // this.$message.info('hwllllll')
         this.add_address_form.address = this.add_address.address;
        this.add_address_form.address_point = this.add_address.point;
        this.add_address_form.city = this.add_address.city;
           this.axios.patch('/address/'+row[index].id, this.add_address_form,{     
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        }).then(res=>{
          console.log("**********")
          console.log(res)
          if (res.status===200){
          this.$message.info('修改成功')}
          this.getuseraddress();
          this.centerDialogVisible = false;
          this.is_update=false;
        })
      },
      add_address_info:function(){
        this.add_address_form.address = this.add_address.address;
        this.add_address_form.address_point = this.add_address.point;
        this.add_address_form.city = this.add_address.city;
        this.axios.post('/address/',this.add_address_form ,{
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        }).then(res=>{
          if (res.status===201){
          this.$message.info('创建成功')}
          this.getuseraddress();
          this.centerDialogVisible = false;
        })

      },
      deleteRow:function(index, rows) {
        console.log(index);
        console.log("*****************")
        console.log(rows);
        console.log(rows[index].id)
        this.axios.delete('/address/'+rows[index].id).then(res=>{
          if (res.status===204)
          this.$message.info('删除成功');
        })
        rows.splice(index, 1);
      },
      showeditRow:function(index, rows){
        console.log(index);
        console.log("*****************")
        console.log(rows);
        this.is_update=true
        
        this.add_address_form.user_name= rows[index].user_name
        this.add_address_form.user_mobile = rows[index].user_mobile
        this.add_address_form.address = this.add_address.address;
        this.add_address_form.address_point = this.add_address.point;
        this.add_address_form.city = this.add_address.city;
        this.centerDialogVisible=true;
        // this.axios.patch('/address/'+row[index].id, this.add_address_form,{     
        //   headers: { "Content-Type": "application/json" },
        //   timeout: 10000
        // }).then(res=>{
        //   if (res.status===200){
        //   this.$message.info('修改成功')}
        //   this.getuseraddress();
        //   this.centerDialogVisible = false;
        // })

      }
    },
    }
  

</script>

<style>

</style>

