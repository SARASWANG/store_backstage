<template>
  <!-- 最外层卡片样式-->
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <el-row>
      <el-col :span="24">
        <el-input clearable placeholder="请输入内容" v-model="formData" class="input-with-select searchlist">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      formData: ''
    };
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.el-input.searchlist {
    width: 380px;
    margin: 20px 0;
  }
</style>
