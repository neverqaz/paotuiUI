<template>
  <div style="margin-top:0px;padding:0px;">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col
        :span="16"
        style="border:1px solid #ebeef5;padding:30px;box-shadow: 10px 10px 5px #888888;"
      >
        <el-collapse accordion
        @change="select_id">
          <el-collapse-item>
            <template slot="title">
              <span style="float:left;">
                <i class="header-icon el-icon-info" style="color:#909399;"></i>
              </span>
              <span style="float:left;">用户管理</span>
            </template>
            <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="14">
            <el-card style="width:100%;">
              <el-form :model="register" label-width="35%">
                <el-form-item label="邮箱">
                  <el-col :span="15">
                    <el-input v-model="register.email" autocomplete="off" placeholder="邮箱"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="校园卡号">
                  <el-col :span="15">
                    <el-input v-model="register.compus_card" autocomplete="off" placeholder="校园卡号"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-col :span="15">
                    <el-input v-model="register.mobile" autocomplete="off" placeholder="联系方式"></el-input>
                  </el-col>
                </el-form-item>
                <el-button type="info" @click="update_form(register.id)" round>确 定</el-button>
                
              </el-form>
            </el-card></el-col>
            <el-col :span="6" style="margin-left:10px;" >
            <el-card :body-style="{ padding: '0px',height:'100%', width:'100%', margin:'0px','line-height':'10px'}"
            v-if="JSON.stringify(ali_user)!='{}'">
              <div
                style="width:45px;height:45px;background:#E6A23C; line-height:40px; border-radius: 50%;"
              >
                <span class="el-icon-info" style="width:25%;height:5%;"></span>
                <span style="font-size:20%;">跑腿</span>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">支付宝昵称{{ali_user.nick_name}}</el-tag>
              </div>
              <div>
                <el-tag type="info" style="width:70%;">支付宝id{{ali_user.userali_id}}</el-tag>
              </div> 
            </el-card>
            <el-button type="info" @click="register_form" round>支付宝登录</el-button></el-col></el-row>
            
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <span style="float:left;">
                <i class="header-icon el-icon-info" style="color:#909399;"></i>
              </span>
              <span style="float:left;">用户地址管理</span>
            </template>
            <useraddress />
          </el-collapse-item>       
          <el-collapse-item>
            <template slot="title">
              <span style="float:left;">
                <i class="header-icon el-icon-info" style="color:#909399;"></i>
              </span>
              <span style="float:left;">其它</span>
            </template>
            <div>功能暂未开放</div>
         
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <!-- <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="16">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import useraddress from './user_address'
export default {
  data() {
    return {
      register:{},
      ali_user:{},
      activeNames: ["1"],
      ali_user_url: "https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2016091700530193&scope=auth_user&redirect_uri=http://neverqaz.cn/ali_login/",
      register: {
        name: "",
        gender: "",
        email: "",
        compus_card: "",
        mobile: "",
        password: ""
        // birthday:'',
        // ali_user_url: "https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2016091700530193&scope=auth_user&redirect_uri=http://neverqaz.cn/ali_login/"
      },
    };
  },
 mounted(){
   this.load_data()
 },
    components:{
      useraddress,
    },
  methods: {
    update_form:function(id){
      let that = this;
      that.axios.patch('/users/'+id+'/',that.register).then(res=>{
        console.log('update**************')
        console.log(res.data)
           that.$message({
            type: 'success',
            message: '修改成功'
          });
      })
    },
    load_data:function(){
      let that =this;
      that.axios.get('/users/').then(res=>{
        console.log(res.data)
        that.register =res.data[0]
        
      })
    },
    handleChange(val) {
      console.log(val);
    },
    select_id:function(){
      this.load_data()
    },
    register_form() {
     window.open(this.ali_user_url,'_blank')

    }
  }
};
</script>

<style>
</style>
