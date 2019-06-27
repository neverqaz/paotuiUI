<template>
  <div>
    
    <el-row type="flex" justify="center" style="margin-top:20px;">
      <el-col :span="2">
      <el-button type="primary" icon="el-icon-circle-plus" circle  @click="is_update=false;dialogFormVisible=true;">添加订单</el-button>        
      </el-col>
      <el-col :span="5">
        <el-select v-model="search_type" placeholder="请选择搜索的类型" @change="change_search_type">
          <el-option label="订单类型" value="order_type"></el-option>
          <el-option label="订单紧急程度" value="order_emergency"></el-option>
          <el-option label="是否已接单" value="is_accept"></el-option>
          <el-option label="搜索" value="search"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" v-if="search_type=='search'">
        <el-input placeholder="请输入内容" v-model="search_order">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col
        :span="4"
        v-else-if="['order_type','order_emergency','is_accept'].indexOf(search_type)>=0"
      >
        <el-select v-model="search_order" placeholder="请选择要搜索的内容">
          <el-option
            v-for="item in search_list[search_type]"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button type="success" icon="el-icon-check" @click="submit" circle></el-button>
      </el-col>
    </el-row>
     <el-row type="flex" justify="center" style="margin-bottom:20px;margin-top:20px;">
      <el-col :span="24">
        <usermanager />
      </el-col></el-row>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row :gutter="30">
          <el-col :span="8" v-for="(item,index) in send_order_msgs" :key="index" style="margin-bottom:30px;">
            <el-card :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}">
  <div style="width:45px;height:45px;background:#E6A23C; line-height:40px; border-radius: 50%;">
      <span class="el-icon-info" style="width:25%;height:5%;"></span>
      <span style="font-size:20%;">跑腿</span>
      </div>
    <div><el-tag type="info" style="width:70%;">订单名称：{{item.name}}</el-tag></div>
    <div><el-tag type="info" style="width:70%;">订单类型：{{order_type_chinese[item.order_type]}}</el-tag></div>
    <div><el-tag type="info" style="width:70%;">订单紧急程度：{{order_emergency_chinese[item.order_emergency]}}</el-tag></div>
    <div v-if="item.order_type==1"><el-tag type="info" style="width:70%;">购买费：<span style="color:red;">{{item.purchase}}元</span></el-tag></div>
    <div v-else><el-tag type="info" style="width:70%;">购买费：<span>无</span></el-tag></div>

    <div><el-tag type="info" style="width:70%;">备注：{{item.order_decs}}</el-tag></div>
    <div><el-tag type="info" style="width:70%;">下单人姓名：{{item.send_name}}</el-tag></div>
    <div><el-tag type="info" style="width:70%;">下单人电话：{{item.send_mobile}}</el-tag></div>
    <!-- <div><el-tag type="info" style="width:70%;">时间：{{item.add_time}}</el-tag></div> -->
    <div style="margin-bottom:20px;"><el-tag type="info" style="width:70%;"> <el-popover
    placement="top"
    title="下单人地址信息"
    width="200"
    trigger="hover"
    :content="item.send_address">
    <el-button type="text" slot="reference" size="mini">下单人地址</el-button>
  </el-popover></el-tag></div>
    <div style="margin-bottom:10px;">
      <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="go_status(item.id)">状态</el-button>
         <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="go_update(item,index)" :disabled="item.is_accept?item.is_accept:item.send_name!=$cookie.get('user')">编辑</el-button>
         <el-button type="warning" icon="el-icon-star-off" circle size="mini" @click="accept_order(item)" :disabled="item.is_accept?item.is_accept:item.send_name==$cookie.get('user')">接单</el-button>
           <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="item.is_accept?item.is_accept:item.send_name!=$cookie.get('user')" @click="delete_order(item.id,index)">删除</el-button>
    </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <addaddress :is_update='is_update' :centerDialogVisible='centerDialogVisible' @get_return_address="get_return_address"/>
            <addorder :update_data='update_data' :is_update="is_update" :dialogFormVisible="dialogFormVisible" @get_order_return="get_order_return" />
     <div class="block">
    <el-pagination
    background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6, 12, 18, 24]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import addaddress from "../user_manage/add_address";
import usermanager from "../user_manage/user_manager";
import addorder from "./add_order";
export default {
  data() {
    return {
      dialogFormVisible:false,
      centerDialogVisible:false,
      is_update:false,
      order_id:0,
        pageSize: 6,
      total: 0,
      search_type: "search",
      currentDate: new Date(),
      search_order: "",
      currentPage: 1,
      update_data:{},
       order_type_chinese: {
            1:"带饭类",
            2:"快递类",
            3:"送东西类"},
      order_emergency_chinese:{
          1:"非常着急",
          2:"着急",
          3:"一般"},
      is_accept_chinese:{
          0:'否',
          1:'是'
      },
      add_adress_msg:{},
      search_list: {
        order_type: [
          {
            id: 1,
            label: "带饭类"
          },
          {
            id: 2,
            label: "快递类"
          },
          {
            id: 3,
            label: "送东西类"
          }
        ],
        order_emergency: [
          {
            id: 1,
            label: "非常着急"
          },
          {
            id: 2,
            label: "着急"
          },
          {
            id: 3,
            label: "一般"
          }
        ],
        is_accept: [
          {
            id: 0,
            label: "否"
          },
          {
            id: 1,
            label: "是"
          }
        ]
      },
      send_order_msgs:[],
      
    };
  },
  components: {
    addorder,
    addaddress,
    usermanager
  },
  mounted(){
    // setTimeout(()=>{
    //    this.load_data();
    // }, 1000)
    this.load_data();
      // setInterval(this.load_data, 15000);

  },
  methods:{
    go_update:function(item,index){
      this.is_update=true;
      this.dialogFormVisible=true;
      this.update_data=item;
      this.update_data['index']=index
    },
    delete_order:function(id,index){
   let that = this;
   that.axios.delete('sendorders/'+id+'/').then(res=>{
         this.send_order_msgs.splice(index,1)
          that.$message({
            type: 'success',
            message: '删除成功'
          });


   })
    },
    go_status:function(id){
this.$router.push("/orderdetail/" +id)
  },
    update_order:function(item){
    
    },

    get_order_return:function(val){
      this.send_order_msgs.splice(0,0,val);
      this.dialogFormVisible=false;
    },
    get_return_address:function(val){
      let that = this;
      console.log("&*&*&*&*&VAL()())()()()")
      console.log(val)
      that.centerDialogVisible = false;
      
      if(val.id!=null){
      //确认消息：
      that.axios.get('users/').then(res=>{
        console.log(res)
        that.$confirm(val.address, '请确认该地址', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let accept_form ={
            'useroac':res.data[0].id,
            "orderac": that.order_id,
            "addressac": val.id
          }
          console.log(accept_form)
          that.axios.post('/accept_order/',accept_form).then(res=>{
            console.log(res)
            if(res.status==201){
             this.$message({
            type: 'success',
            message: '接单成功'
          });}
          else{
              this.$message({
            type: 'error',
            message: '接单人数较多请稍后重试谢谢'
          });
          }

          })
          
         
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      })
      }
    },
      accept_order:function(order){
          console.log(order)
          this.order_id = order.id
          this.centerDialogVisible =true
          this.is_update=false
       
          
      },
      change_search_type:function(){
     this.search_order =""
      },
      submit:function(){
          this.currentPage=1;
          this.load_data();

      },
            handleSizeChange(val) {
                this.pageSize = val;
                this.load_data();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          console.log(val)
          this.currentPage =val
                this.load_data();
        console.log(`当前页: ${val}`);
      },
      load_data:function(){
          let that = this
          let request_data ={}
          if(that.search_type=="order_type"){
              request_data['order_type']=that.search_order
          }
          else if(that.search_type=="order_emergency"){
              request_data['order_emergency']=that.search_order
          }
           else if(that.search_type=="is_accept"){
              request_data['is_accept']=that.search_order
          }
          else if(that.search_type=="search" && that.search_order!=""){
              request_data['search']=that.search_order
          }
          else{
              
          }
          request_data['page']=that.currentPage
          request_data['page_size']= that.pageSize
          that.axios.get('/sendorders/',{params: request_data}).then(res=>{
              if(res.status ==200){
                  that.total = res.data.count;
              that.send_order_msgs= res.data.results
              console.log(res)}
          })
      }
 
  }
};
</script>

<style scoped>
.el-tag{
            border: 0px solid rgba(64,158,255,.2);
    display: inline-table;
    /* white-space: pre-wrap; */
    white-space: nowrap;
    overflow: inherit;
       
}
</style>
