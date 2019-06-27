
<template>
    <el-container id="_index">
  <el-header style="line-height:10px;display:block;height:100%">
    <el-row type="flex" justify="center" style="margin-top:0px;">
      <el-col :span="24" >
       <div :style ="note"></div>
        </el-col></el-row>
     <el-row type="flex" justify="center">
      <el-col :span="13" >
        <!-- <img src="../assets/logo2.png"> -->
      <el-menu :router="true" :default-active="active_index" class="el-menu-demo" mode="horizontal"  @select="menu_nav" style="border-bottom: solid 1px #FFF;">
        <!-- <el-menu-item><img src="../assets/logo1.png"></el-menu-item>   -->
  <el-menu-item index="/ordermanage" style="font-size: 15px;"><i class="el-icon-location"></i>首页</el-menu-item>
  <el-menu-item index="/user/address" style="font-size: 15px;"><i class="el-icon-location"></i>地址管理</el-menu-item>
  <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank" style="font-size: 15px;"><i class="el-icon-location"></i>个人中心</a></el-menu-item> -->
  <el-menu-item index="/user/manager"><i class="el-icon-location"></i>个人中心</el-menu-item>
<el-menu-item index="/user/manager" style="margin-left:100px;">
 <el-button
            type="primary"
            @click="dialogTableVisible = true"
            icon="el-icon-star-on"
            round
            style="    border-radius: 50px;
    padding: 5px 14px;margin-left: -100px;"
          >登录</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
            icon="el-icon-circle-plus"
            round
            style="    border-radius: 50px;
    padding: 5px 14px"
          >注册</el-button>
</el-menu-item></el-menu>
        </el-col></el-row>
        
</el-header>
<div style="width:100%;height:1px; background-color: #e6e6e6;
    color: #e6e6e6;"></div>
  <el-container style="margin-top:20px;" >
   
      <el-row type="flex" justify="center" style="margin-top:0px;" >
      <el-col :span="22" :style ="note1">
    <el-image
      style="width: 100%; height: 100%;-webkit-filter: blur(10px);z-index:50;"
      :src="url">
      </el-image>

    <el-container>
     
       <el-main><router-view :key="$route.fullPath"></router-view></el-main>
    </el-container> 
      </el-col></el-row>
  </el-container>
  <!-- 登录框 -->
      <el-dialog title="欢迎登录" :visible.sync="dialogTableVisible">
        <el-form ref="form" :model="form">
          <el-form-item label="输入电话号码">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="输入密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 注册框 -->
      <el-dialog title="注册" :visible.sync="dialogFormVisible" width="40%">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="90"></el-progress>
        <el-form :model="register">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="register.name" autocomplete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="register.gender" placeholder="请选择性别">
              <el-option label="女" value="female"></el-option>
              <el-option label="男" value="male"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="register.email" autocomplete="off" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="校园卡号" :label-width="formLabelWidth">
            <el-input v-model="register.compus_card" autocomplete="off" placeholder="校园卡号"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="register.mobile" autocomplete="off" placeholder="联系方式"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="register.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>

          <el-button type="info" @click="dialogFormVisible = false" round>取 消</el-button>
          <el-button type="info" @click="register_form" round>确 定</el-button>
        </el-form>
      </el-dialog>
    </el-container>
    
</template>

<script>
export default {
  data() {
    return {
      url:require("../assets/index.jpeg"),
      note: {
        backgroundImage: "url(" + require("../assets/logo2.png") + ")",
        backgroundRepeat: "no-repeat",
        "padding-top":"90px",
        //backgroundSize: "60px auto",
        // marginTop: "5px",
      },
        note1: {
        backgroundImage: "url(" + require("../assets/index.jpeg") + ")",
        backgroundRepeat: "no-repeat",
        width: '100%', height: '100%;',
        '-webkit-filter': 'blur(10px)',
        // "padding-top":"90px",
        //backgroundSize: "60px auto",
        // marginTop: "5px",
      },
      activeIndex: "1",
      activeIndex2: "1",
      form: {
        username: "",
        password: ""
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      // ["name", "gender", "email", "compus_card", "password", "mobile", "birthday"]
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

      formLabelWidth: "120px"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.axios
        .post("/login/", this.form, {
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        })
        .then(res => {
          //window.alert(res.status)
          if (res.status === 200) {
            let expires = "3600s";
            this.$cookie.set("token", res.data.token, { expires });
            this.$cookie.set("user", res.data.user.name, { expires });
            this.$message({ message: "登录成功：", type: "success" });
            this.$router.push("/logined_index");
          } else {
            this.$message({
              message: "登录异常！响应码：" + res.status,
              type: "info"
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message({
            message: "登录失败！请检查您的用户名密码",
            type: "error"
          });
          this.$cookie.delete("token");
          this.$cookie.delete("user");
        });
    },
    register_form() {
      this.axios
        .post("/users/", this.register, {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 10000
        })
        .then(res => {
          if (res.status === 201) {
            this.form.username = this.register.mobile;
            this.form.password = this.register.password;
            this.login();
          } else {
            this.$message({ message: res.data, type: "error" });
          }
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    menu_nav: function(index, path) {
      //window.alert(index+path)
      this.active_index = path[0]; // index
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  /* background-color: #B3C0D1; */
  /* background-image: url("../assets/logo2.png"); */
  color: #333;
  text-align: center;
  line-height: 60px;
  padding-left: 236px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-menu--horizontal > .el-menu-item {
  color: #f7e404;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  color: #f7e404;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
a {
  text-decoration: none;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
html {
  padding: 0;
  margin: 0;
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
.el-form-item__label {
  position: relative;
  left: 30px;
}
.el-input.el-input--suffix {
  width: 200px;
}
.el-input__inner {
  width: 200px;
}
/* form {
    margin-left: auto;
    margin-right: auto;
} */

.el-form-item__content {
  padding: 0;
  margin: 0;
}
.el-form {
  margin-left: 50px;
}


</style>
