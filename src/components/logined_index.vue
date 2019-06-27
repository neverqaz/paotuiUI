<template>
    <el-container id="_index">
  <el-header style="line-height:10px;display:block;height:100%">
    <el-row type="flex" justify="center" style="margin-top:0px;">
      <el-col :span="18" >
       <div :style ="note"></div>
        </el-col></el-row>
     <el-row type="flex" justify="center">
      <el-col :span="13" >
        <!-- <img src="../assets/logo2.png"> -->
      <el-menu :router="true" :default-active="active_index" class="el-menu-demo" mode="horizontal"  @select="menu_nav" style="border-bottom: solid 1px #FFF;">
        <!-- <el-menu-item><img src="../assets/logo1.png"></el-menu-item>   -->
  <el-menu-item index="/ordermanage" style="font-size: 15px;"><i class="el-icon-location"></i>首页</el-menu-item>
  <el-menu-item index="/user/address" style="font-size: 15px;"><i class="el-icon-location"></i>订单地址</el-menu-item>
  <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank" style="font-size: 15px;"><i class="el-icon-location"></i>个人中心</a></el-menu-item> -->
  <el-menu-item index="/user/manager"><i class="el-icon-location"></i>个人中心</el-menu-item>
   <el-menu-item>   
       <el-submenu index="2-4" style="float: right;
    border-color: rgb(63, 225, 232);
    width: 52px;
    height: 49px;
    background: rgb(246, 249, 36);
    border-radius: 44px;
    margin-left: 128px;">
          <template  slot="title"><div style="margin-left:-7px;">{{username}}</div></template>
          <el-menu-item @click="logout">退出</el-menu-item>
        </el-submenu></el-menu-item>
</el-menu>


        </el-col></el-row>
        <div style="width:100%;height:1px; background-color: #e6e6e6;
    color: #e6e6e6;"></div>
</el-header>

  <el-container style="margin-top:20px;">
      
    <el-container style="margin-right:20px;">
      <el-main><el-row type="flex" justify="center" style="margin-top:0px;">
      <el-col :span="24" ><router-view :key="$route.fullPath"></router-view></el-col></el-row></el-main>
      <el-footer></el-footer>
    </el-container>
      
  </el-container>
    </el-container>
</template>

<script>
  export default {
       
    data() {
      return {
        active_index:'/ordermanage',
          username: this.$cookie.get('user'),
             note: {
            backgroundImage: "url(" + require("../assets/logo2.png") + ")",
            backgroundRepeat: "no-repeat",
           "padding-top":"90px",
            //backgroundSize: "60px auto",
            // marginTop: "5px",
          },
        activeIndex: '1',
        form:{
                username:"",
                password:""
            },
        dialogTableVisible: false,
        dialogFormVisible: false,
        register: {
          name: '',
          gender:'',
          email:'',
        compus_card:'',
        mobile:'',
        password:'',
        ali_user_url: "https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2016091700530193&scope=auth_user&redirect_uri=http://neverqaz.cn/ali_login/"
    },
         
        
        formLabelWidth: '120px'
      };
    },
    mounted(){
      this.$router.push('/ordermanage')
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
     menu_nav: function(index, path){
         //window.alert(index+path)
        this.active_index = path[0]  // index
      },
      logout:function() {
          this.loading = false
          this.$message({message: "已退出登录", type: 'error'});
         
          this.$cookie.delete('token');
          this.$cookie.delete('user')
          this.$router.push('/index')
        
          
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    /* background-image: url("../assets/logo2.png"); */
    /* color: #333; */
    text-align: center;
    line-height: 60px;
    /* padding-left:236px; */
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    /* color: #333; */
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    /* text-align: center; */
    line-height: 10x;

  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
.el-menu--horizontal>.el-menu-item{
    color: #f7e404;

}
.el-menu--horizontal>.el-submenu .el-submenu__title{
    color: #f7e404;
}
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  a{
          text-decoration:none;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
html{
    padding: 0;margin: 0;
}
/* .el-button {
    margin: 0;
    padding: 0;
} */

.el-input {
    /* 输入框大小 */
    width: 300px;
    left: -40px;
    
   
    
}
.el-form-item__label{
    position: relative;
    left: 30px;
}
.el-input.el-input--suffix{
    width: 200px;
}
.el-input__inner {
width: 200px;
}
/* form {
    margin-left: auto;
    margin-right: auto;
} */

.el-form-item__content{
  padding: 0;
  margin: 0;
  
}
/* .el-form{
    margin-left: 50px;
    
   
} */
.line{
  width: 100%;
  height: 20px;

}
</style>
