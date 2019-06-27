<template>
  <div>
    <template v-if="[5,15,25,35].indexOf(status)>=0">
      <el-row type="flex" justify="center" style="margin-top:80px;">
        <el-col :span="4">
          <div class="demo3"></div>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <el-row type="flex" justify="center" style="margin-top:80px;">
        <el-col :span="1">
          <div class="demo2"></div>
        </el-col>
      </el-row>
    </template>
    <el-row type="flex" justify="center" style="margin-top:30px;">
      <el-col :span="status_type[status][3]">
        <h2>{{status_type[status][1]}}</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:10px;">
      <el-col :span="status_type[status][2]">
        <span>{{status_type[status][0]}}</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:50px;">
      <el-col :span="18">
        <span style="font-size:14px;font-weight: bold;">项目名称: QUEE</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:8px;">
      <el-col :span="4">
        <span style="font-size:12px;">项目ID：33545325</span>
      </el-col>
      <el-col :span="6">
        <span style="font-size:12px;">负责人：fengxu</span>
      </el-col>
      <el-col :span="8">
        <span style="font-size:12px;">生效时间：2018-10-9 12:23:45</span>
      </el-col>
    </el-row>
    <el-steps
      :active="status_type[status][5]"
      align-center
      :process-status="status_type[status][4]"
      finish-status="success"
    >
      <el-step title="工单关闭" description v-if="status==5"></el-step>
      <el-step title="创建项目" description v-else></el-step>
      <el-step title="部门审核" description="海峰"></el-step>
      <el-step title="微博技术评审" description></el-step>
      <el-step title="IT管委会评审" description></el-step>
      <el-step title="采购中" description icon="el-icon-loading" v-if="status==40"></el-step>
      <el-step title="采购中" description v-else></el-step>
      <el-step title="等待上架" description icon="el-icon-loading" v-if="status==50"></el-step>
      <el-step title="等待上架" description v-else></el-step>
      <el-step title="完成" description></el-step>
    </el-steps>
    <el-row type="flex" justify="center" style="margin-top:30px;">
      <el-col :span="6">
        <el-button type="primary" size="small">返回列表</el-button>
        <el-button size="small">查看项目</el-button>
      </el-col>
    </el-row>
    <div class="h1">
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: 30,
      status_type: {
        10: ["提交成功，请等待评审通知", "创建项目", 6, 4, "", 1],
        5: ["工单关闭，请重新申请", "工单关闭", 5, 4, "error", 0],
        20: ["部门初审通过，等待微博技术评审", "部门审核", 7, 4, "", 2],
        15: ["部门初审驳回", "部门审核", 4, 4, "error", 1],
        30: ["微博技术评审通过，等待IT管委会评审", "微博技术评审", 8, 5, "", 3],
        25: ["微博技术评审失败", "微博技术评审", 5, 5, "error", 2],
        40: ["IT管委会评审通过，等待采购", "IT管委会评审", 6, 5, "", 4],
        35: ["IT管委会评审失败", "IT管委会评审", 5, 5, "error", 3],
        50: ["采购完成，等待上架", "采购完成", 5, 4, "", 5],
        60: ["完成", "完成", 3, 3, "", 7]
      }
    };
  }
};
</script>

<style>
.demo2 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: green;
  display: block;
  position: relative;
}
.demo2::after {
  content: "";
  height: 50%;
  width: 8%;
  border-radius: 30%;
  display: block;
  background: white;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: rotate(45deg);
}
.demo2::before {
  content: "";
  height: 27%;
  width: 8%;
  border-radius: 30%;
  display: block;
  background: white;
  transform: rotate(-45deg);
  position: absolute;
  top: 45%;
  left: 25%;
}

.demo3 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: red;
  display: block;
  position: relative;
}
.demo3::after {
  content: "";
  height: 65%;
  width: 8%;
  border-radius: 30%;
  display: block;
  background: white;
  position: absolute;
  top: 15%;
  left: 45%;
  transform: rotate(45deg);
}
.demo3::before {
  content: "";
  height: 65%;
  width: 8%;
  border-radius: 30%;
  display: block;
  background: white;
  position: absolute;
  top: 15%;
  left: 45%;
  transform: rotate(-45deg);
}
.h1{
    width: 10vw;
    height: 10vh;
}
</style>
