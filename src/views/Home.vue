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
        <!-- 一级菜单 -->
          <el-submenu
            v-for=" item in menus"
            :key="item.id"
            :index="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/' + item1.path">
              <i class="el-icon-menu"></i>
              {{ item.authName }}
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
  data() {
    return {
      menus: []
    };
  },
  created() {
    // 加载当前用户的权限列表
    this.loadData();
  },
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
    // 左侧菜单权限
    async loadData() {
      const { data: resData } = await this.$http.get('menus');

      const { data, meta: { status, msg } } = resData;
      if (status === 200) {
        this.menus = data;
      }
    },
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
