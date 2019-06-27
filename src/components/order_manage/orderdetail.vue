<template>
  <div id="orderdetail">
    <el-row type="flex" justify="center" style="margin-top:0px;">
      <el-col :span="14" style="font-size:20px;font-weight:blod;">
        订单状态信息如下
        </el-col></el-row>
    <el-dialog
  title="位置信息"
  :visible.sync="dialogVisible"
  width="60%"
  style="line-height:10px;"
  >
<div id="maplocation">
    <iframe id="grafana-iframe" frameborder=0 style="width: 100%;height:400px;" ref="grafana_iframe" name="showHere" scrolling=auto referrerpolicy="strict-origin-when-cross-origin" :src="maplocation_url" ></iframe>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
</el-dialog>

    <el-row type="flex" justify="center" style="margin-top:20px;">
      <el-col :span="10">
        <el-timeline>
          <el-timeline-item
            timestamp="1.发布订单"
            placement="top"
            style="width:400px;height:400px;"
            color="green"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
              <div
                style="width:45px;height:45px;background:#E6A23C; line-height:40px; border-radius: 50%;"
              >
                <span class="el-icon-info" style="width:25%;height:5%;"></span>
                <span style="font-size:20%;">跑腿</span>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">订单名称：{{item.name}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">订单类型：{{order_type_chinese[item.order_type]}}</el-tag>
              </div>
              <div>
                <el-tag
                  type="info"
                  style="width:70%;"
                >订单紧急程度：{{order_emergency_chinese[item.order_emergency]}}</el-tag>
              </div>
              <div v-if="item.order_type==1">
                <el-tag type="info" style="width:70%;">
                  购买费：
                  <span style="color:red;">{{item.purchase}}元</span>
                </el-tag>
              </div>
              <div v-else>
                <el-tag type="info" style="width:70%;">
                  购买费：
                  <span>无</span>
                </el-tag>
              </div>

              <div>
                <el-tag type="info" style="width:70%;">备注：{{item.order_decs}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">下单人姓名：{{item.send_name}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">下单人电话：{{item.send_mobile}}</el-tag>
              </div>
              <div style="margin-bottom:20px;">
                <el-tag type="info" style="width:70%;">
                  <el-popover
                    placement="top"
                    title="下单人地址信息"
                    width="200"
                    trigger="hover"
                    :content="item.send_address"
                  >
                    <el-button type="text" slot="reference" size="mini">下单人地址</el-button>
                  </el-popover>
                </el-tag>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="2.接单人信息"
            placement="top"
            style="width:400px;height:400px;"
            color="green"
            v-if="item.is_accept"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
              <div
                style="width:45px;height:45px;background:#E6A23C; line-height:40px; border-radius: 50%;"
              >
                <span class="el-icon-info" style="width:25%;height:5%;"></span>
                <span style="font-size:20%;">跑腿</span>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">订单名称：{{item.name}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">订单类型：{{order_type_chinese[item.order_type]}}</el-tag>
              </div>
              <div>
                <el-tag
                  type="info"
                  style="width:70%;"
                >订单紧急程度：{{order_emergency_chinese[item.order_emergency]}}</el-tag>
              </div>
              <div v-if="item.order_type==1">
                <el-tag type="info" style="width:70%;">
                  购买费：
                  <span style="color:red;">{{item.purchase}}元</span>
                </el-tag>
              </div>
              <div v-else>
                <el-tag type="info" style="width:70%;">
                  购买费：
                  <span>无</span>
                </el-tag>
              </div>

              <div>
                <el-tag type="info" style="width:70%;">备注：{{item.order_decs}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">接单人姓名：{{item.accept_name}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">接单人电话：{{item.accept_mobile}}</el-tag>
              </div>
              <div style="margin-bottom:20px;">
                <el-tag type="info" style="width:70%;">
                  <el-popover
                    placement="top"
                    title="下单人地址信息"
                    width="200"
                    trigger="hover"
                    :content="item.accept_address"
                  >
                    <el-button type="text" slot="reference" size="mini">接单人地址</el-button>
                  </el-popover>
                </el-tag>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="3.请登录支付宝账号"
            placement="top"
            style="width:400px;"
            color="green"
            v-if="item.is_accept && [item.send_name,item.accept_name].indexOf(this.$cookie.get('user'))>=0 && ali_user_msg.length<=0"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  
                  @click="go_aliuser(item)"
                >登录支付宝信息</el-button>
              </div>
            </el-card>
          </el-timeline-item>
           <el-timeline-item
            timestamp="3.请核对支付宝账号信息"
            placement="top"
            style="width:400px;"
            color="green"
            v-else-if="item.is_accept && [item.send_name,item.accept_name].indexOf(this.$cookie.get('user'))>=0 && ali_user_msg.length>0"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'10px','line-height':'10px'}"
            >
              <div
                style="width:45px;height:45px;background:#E6A23C; line-height:40px; border-radius: 50%;"
              >
                <span class="el-icon-info" style="width:25%;height:5%;"></span>
                <span style="font-size:20%;">跑腿</span>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">支付宝id：{{ali_user_msg[0].userali_id}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">支付宝昵称：</el-tag>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="4.请您尽快支付费用"
            placement="top"
            style="width:400px;"
            color="green"
            v-if="item.is_accept && item.send_name==this.$cookie.get('user') && ali_user_msg.length>0 &&item.order_pay_status!='TRADE_SUCCESS'"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
            <div style="margin-top:20px;">
                <el-tag type="info" style="width:70%;">支付订单号：{{ali_pay_msg[0].out_trade_no}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">支付总金额：{{ali_pay_msg[0].amount}}元</el-tag>
              </div>
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="go_ali_alipay(ali_pay_msg[0].alipay_url)"
                >支付宝支付</el-button>   
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="cansal_ali_alipay(ali_pay_msg[0].order_id)"
                >取消订单</el-button>
              </div>
            </el-card>
          </el-timeline-item>
               <el-timeline-item
            timestamp="4.下单人付款完成"
            placement="top"
            style="width:400px;"
            color="green"
                  v-else-if="item.is_accept && [item.send_name,item.accept_name].indexOf(this.$cookie.get('user'))>=0&& ali_user_msg.length>0 &&item.order_pay_status=='TRADE_SUCCESS'"
         
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
            <div style="margin:20px;">
                <el-tag type="info" style="width:70%;">下单人付款完成</el-tag>
              </div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item
            timestamp="2.等待下单人支付"
            placement="top"
            style="width:400px;"
            color="green"
         v-else-if="!item.is_accept && [item.send_name].indexOf(this.$cookie.get('user'))<0"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
            <div style="margin:20px;">
                <el-tag type="info" style="width:70%;">等待支付下单人支付</el-tag>
              </div>
            </el-card>
          </el-timeline-item>
        <el-timeline-item
            timestamp="5.位置距离"
            placement="top"
            style="width:400px;"
            color="green"
           v-if="item.is_accept && [item.send_name,item.accept_name].indexOf(this.$cookie.get('user'))>=0&& ali_user_msg.length>0 &&item.order_pay_status=='TRADE_SUCCESS'"

          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="get_map_location(item.id)"
                >查看位置距离</el-button>
              </div>
            </el-card>
          </el-timeline-item>

           <el-timeline-item
            timestamp="6.请确认订单完成"
            placement="top"
            style="width:400px;"
            color="green"
           v-if="item.is_accept && [item.send_name].indexOf(this.$cookie.get('user'))>=0&& ali_user_msg.length>0 &&item.order_pay_status=='TRADE_SUCCESS' && item.order_status!=1"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="ack_order_complete(item.id)"
                >确认订单完成</el-button>
              </div>
            </el-card>
          </el-timeline-item>
            <el-timeline-item
            timestamp="6.订单已完成"
            placement="top"
            style="width:400px;"
            color="green"
           v-if="item.is_accept && [item.send_name].indexOf(this.$cookie.get('user'))>=0&& ali_user_msg.length>0 &&item.order_pay_status=='TRADE_SUCCESS'&&item.order_status==1"
          >
            <el-card
              :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            >
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="ack_order_complete(item.id)"
                  :disabled="true"
                 v-if="item.is_accept && [item.send_name].indexOf(this.$cookie.get('user'))>=0&& ali_user_msg.length>0 &&item.order_pay_status=='TRADE_SUCCESS'&&item.order_status==1"                  
                >订单已完成，已提交系统</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="ack_order_complete(item.id)"
                  :disabled="true"
                 v-else-if="item.is_accept && [item.accept_name].indexOf(this.$cookie.get('user'))>=0&& ali_user_msg.length>0 &&item.order_pay_status=='TRADE_SUCCESS'&&item.order_status==1"                  
                >订单已完成，您将会收到跑腿费</el-button>
              </div>
            </el-card>
          </el-timeline-item>
          </el-timeline>
      </el-col>
    </el-row>
    <div>
    <el-button
                  type="primary"
                  icon="el-icon-caret-left"
                  circle
                  @click="$router.push('/ordermanage');"
                >返回</el-button>
              </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      
      dialogVisible:false,
      maplocation_url:"",
      order_type_chinese: {
        1: "带饭类",
        2: "快递类",
        3: "送东西类"
      },
      order_emergency_chinese: {
        1: "非常着急",
        2: "着急",
        3: "一般"
      },
      is_accept_chinese: {
        0: "否",
        1: "是"
      },
      item: {},
      ali_user_url: "https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2016091700530193&scope=auth_user&redirect_uri=http://neverqaz.cn/ali_login/",
      ali_user_msg:[],
      ali_pay_url: "",
      order_id:'',
      ali_pay_msg:[{
        out_trade_no:"",
        amount:0,
        
      }],
    };
  },
  mounted() {
    console.log(this.$route.params.order)
    this.order_id = this.$route.params.order
    this.load_data();
  },
  methods: {
    load_data: function() {
      const that = this;
      that.axios
        .get("/sendorders/" + (that.$route.params.order) + "/")
        .then(res => {
          console.log(res.data)
          that.item = res.data;
          if(res.data.is_accept){
            that.axios.get('/ali_login/').then(res=>{
              //如果是空的说明要登录
              console.log(res.data)
              that.ali_user_msg = res.data
              if(that.ali_user_msg.length>0){
                that.axios.get("/send_user_alipay/?order_id="+this.$route.params.order).then(res1=>{
               console.log("*******")   
              console.log(res1.data)
              that.ali_pay_msg = res1.data
              
                  })
            
              }
              
        
            })
               
          
          }
          //支付完成之后显示地图定位
      //      that.axios.get('/accept_order/?order_id='+that.$route.params.order).then(res=>{
      //        console.log(res.data)
      //   that.maplocation_url = res.data[0].gps_navigation_url
      // })
        });
    },
    go_aliuser:function(){
      window.open(
        this.ali_user_url,
        "_blank"
      );
    },
    get_map_location:function(order_id){
      let that = this;
      that.axios.get('accept_order/?order_id='+order_id).then(res=>{
        that.dialogVisible = true;
        console.log(res.data)
        that.maplocation_url = res.data[0].gps_navigation_url
        
      })
    },
    go_ali_alipay:function(url){
        window.open(
        url,
        "_blank"
      );
    },
    cansal_ali_alipay:function(order_id){
      let that = this;
      //需要修改后台接口orderserilizer patch

    },
    ack_order_complete:function(order_id){
      let that = this;
      that.axios.get('/system/accept_user/settle/?order_id='+order_id).then(res=>{
        console.log("&*&*&*&*&*&******")
        console.log(res.data)
        that.load_data()
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
