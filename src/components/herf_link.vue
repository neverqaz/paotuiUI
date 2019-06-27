<template>
   <div><el-button type="primary" @click="dialogTableVisible = true" icon="el-icon-star-on" round>登录</el-button>

<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
  </el-table>
</el-dialog>


<el-button type="primary" @click="dialogFormVisible = true"  icon="el-icon-circle-plus" round>注册</el-button>

<el-dialog title="注册" :visible.sync="dialogFormVisible" width="40%">
     <el-progress :text-inside="true" :stroke-width="18" :percentage="90"></el-progress>
  <el-form :model="register">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="register.name" autocomplete="off" placeholder="用户名"></el-input>
    </el-form-item>
     <el-form-item label="性别" :label-width="formLabelWidth">
      <el-select v-model="register.gender" placeholder="请选择性别">
        <el-option label="female" value="男"></el-option>
        <el-option label="male" value="女"></el-option>
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
    
    <el-button  type="info" @click="dialogFormVisible = false" round>取 消</el-button>
    <el-button type="info" @click="dialogFormVisible = false" round>确 定</el-button>
    
  </el-form>
  

</el-dialog>


 <div>
      <el-table
        :data="gridData"
        style="width: 100%;padding:30px 30px 0 30px;">

        <el-table-column
          label="Topic名称"
          min-width="8"
          align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="updateTopic(scope.row.id)">{{scope.row.topic_name}}</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="cluster"
          label="所属kafka集群"
          min-width="12"
          align="center">
        </el-table-column>

        <el-table-column
          prop="partition"
          label="Partition"
          min-width="4"
          align="center">
        </el-table-column>

        <el-table-column
          prop="create_user"
          label="申请人"
          min-width="7"
          align="center">
        </el-table-column>

        <el-table-column
          label="状态"
          min-width="5"
          align="center">
          <template slot-scope="scope">
            <div :class="color[scope.row.status]" style="font-size: 1em; padding: 8px;"
            >{{status[scope.row.status]}}</div>
          </template>
        </el-table-column>

        <el-table-column
          label="生产Broker List"
          min-width="12"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.brokers">
              <div v-for="broker in scope.row.brokers.split(',')">{{broker}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          min-width="12"
          align="center">
          <template slot-scope="scope">
            <div style="margin-bottom: 4px">
              <el-button type="success" style="padding: 5px 16px;font-size: 13px"
              @click="kafka_generate(scope.row.topic_name,scope.row.cluster==='ad_kafka'||scope.row.cluster==='dc_kafka'
              ?'kafka-0.10.0.1-ad':scope.row.cluster)">生产监控</el-button>
            </div>
            <div style="margin-bottom: 4px">
              <el-button type="success" style="padding: 5px 16px;font-size: 13px"
              @click="kafka_consume(scope.row.topic_name,scope.row.cluster==='ad_kafka'||scope.row.cluster==='dc_kafka'
              ?'kafka-0.10.0.1-ad':scope.row.cluster)">消费监控</el-button>
            </div>
            <div>
                <el-button type="success" style="padding: 5px 16px;font-size: 13px" @click="redirect"
                           :disabled="is_disabled(scope.row.cluster)">申请消费</el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
</div>
 
</template>

<script>
export default {
       data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    
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
    }
 
}
</script>

<style >
.el-button {
    margin: 0;
    padding: 0;
}

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
.el-form{
    margin-left: 50px;
    
   
}
.el-dialog{
    
}
</style>
