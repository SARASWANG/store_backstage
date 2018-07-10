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
          <!--  退出功能 -->
          <a href="#" class="logout" @click.prevent="handlelogout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <!-- 侧边栏 导航菜单 -->
      <el-aside class="aside myaside" width="200px">
        <el-menu
        :router="true"
        :unique-opened="true"
        default-active="2"
        class="el-menu-vertical-demo">
          <!-- 1 用户管理-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="users">
              <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
          </el-submenu>
          <!-- 2 权限管理-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
          </el-submenu>
          <!-- 3 商品管理-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
          </el-submenu>
          <!-- 4 订单管理-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
          </el-submenu>
          <!-- 5 数据统计-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
                数据报表
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--  右侧展示区域 -->
      <el-main class="main">
        <!-- main的 路由出口 -->
        <router-view></router-view>
      </el-main>
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
    }
  },
  methods: {
    // 退出按钮的处理程序
    handlelogout() {
      // 1 清除session,clear 清空本地所有的缓存
      sessionStorage.clear();
      // 2 提示框
      this.$message.success('退出成功');
      // 3 跳转到登录页面
      this.$router.push({ name: 'login' });
    }
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
/* 侧边栏样式*/
.aside {
  background-color: #fff;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
