<template>
  <div>
    <!-- <el-button type="primary" @click="is_update=false,centerDialogVisible = true" round>添加地址</el-button> -->
    <el-dialog
      :title="is_update?'修改地址':'添加地址'"
      :visible.sync="innerFormVisible"
      width="50%"
      @close="resetForm()"
      style="line-height:0px;"
    >
    <!-- <div style="width:100%;height:1px;background:black;margin-bottom:10px;"></div> -->
      <el-form :model="add_address_form" ref="dialog_f">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item prop="user_name" label="用户名" label-width="40%">
              <el-col>
                <el-input v-model="add_address_form.user_name" autocomplete="off" placeholder="用户名"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="user_mobile" label="联系方式" label-width="40%">
              <el-col>
                <el-input
                  v-model="add_address_form.user_mobile"
                  autocomplete="off"
                  placeholder="联系方式"
                ></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 父组件接收子组件的值 -->
        <el-form-item>
          <baidumap @sendparentPoint="accpetsunmethord"></baidumap>
        </el-form-item>
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="add_address_info">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import baidumap from "./baidumap";
export default {
  props:['centerDialogVisible','is_update'],
  data() {
    return {
      // centerDialogVisible: false,
      add_address: {}, //添加地址信息
      // is_update: false, //是否为修改信息
      add_address_form: {
        address_point: "",
        address: "",
        user_name: "",
        user_mobile: "",
        city: ""
      }
    };
  },
  components: {
    baidumap
  },
  computed:{
     innerFormVisible:{
      get: function() {
                return this.centerDialogVisible
            },
      set: function(value) {
                this.$emit('centerDialogVisible', value)
            }
    }
},
  methods: {
    resetForm: function() {
      this.$refs["dialog_f"].resetFields();
      this.$emit('get_return_address',{id:null})
    },
    accpetsunmethord: function(param) {
      console.log("131312311312312312312");
      console.log(param);
      this.add_address = param.address_info;
    },
    add_address_info: function() {
      this.add_address_form.address = this.add_address.address;
      this.add_address_form.address_point = this.add_address.point;
      this.add_address_form.city = this.add_address.city;
      this.axios
        .post("/address/", this.add_address_form, {
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        })
        .then(res => {
          if (res.status === 201) {
            console.log(res.data);
            res.data['centerDialogVisible'] =false
            this.$emit('get_return_address',res.data)
            this.$message.info("创建成功");
          }
          // var centerDialogVisible = false;
        });
    }
  }
};
</script>

<style>
</style>
