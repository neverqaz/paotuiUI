<template>
 <div><h1>{{res1}}</h1>
    <h1>{{name}}</h1>
     <el-form ref="form" :model="form" label-width="100px" width="500">
         <el-form-item>
              <el-input type='hidden' name='csrfmiddlewaretoken' value='{{}}' />
         </el-form-item>
  <el-form-item label="输入电话号码">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
       <el-form-item label="输入密码">
           <el-input type="password" v-model="form.password">

           </el-input>

       </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
     </el-form>
   </div> 
</template>
<script>
export default {
    data(){
        return{
            form:{
                username:"",
                password:""
            },
          
        }
    },
    methods:{

        
         submitForm() {
            this.axios.post('/login/',this.form,{
                headers: {"Content-Type": "application/json"},
                timeout: 10000
            }).then((res)=>{
             //window.alert(res.status)
            if(res.status ===200){
            let expires = '3600s'
            this.$cookie.set('token', res.data.token, {expires});
            this.$cookie.set('user', res.data.user, {expires});
            this.$message({message: "登录成功：", type: 'success'})
            this.$router.push('/index')
            }
            else{
                this.$message({message: "登录异常！响应码：" + res.status, type: 'info'})
            }
             
             

            }).catch((error)=>{
          this.loading = false
          this.$message({message: "登录失败！请检查您的用户名密码", type: 'error'});
          this.$cookie.delete('token');
          this.$cookie.delete('user')
        });
        
        
      },
     resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
 </script>
