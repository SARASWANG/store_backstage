<template>
  <el-container class="container">
    <!-- 头部 栅格系统 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img src="" alt="">
        </el-col>
        <el-col :span="19">
          <h2 class="middle">电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside class="aside" width="200px">
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 在加载页面之前，先验证session是否存在
  beforeCreate() {
    const token = sessionStorage.getItem('token');
    // 若session不存在，弹出警告框，并跳转到登录页面
    if (!token) {
      this.$message.warning('请先登录');
      this.$router.push({ name: 'login' });
      return;
    };
  }
};
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .middle,
.header .logout {
  text-align: center;
  line-height: 60px;
  color: #fff;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
