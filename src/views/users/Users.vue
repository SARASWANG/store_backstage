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
    <!-- 表格区域  stripe 斑马线样式-->
    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <!-- 用户状态 -->
      <el-table-column label="用户状态">
        <!-- 增加一个template标签 把开关按钮包裹起来 -->
        <template slot-scope="scope">
          <!-- scope.row 就是当前绑定的数据对象 -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      formData: '',
      list: []
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    // 用户列表加载函数
    async loadList() {
      // 1 获取token值
      const token = sessionStorage.getItem('token');
      // 2 在请求头中设置touken，一起发送过去
      this.$http.defaults.headers.common['Authorization'] = token;
      // 3 发送请求
      const res = await this.$http.get('users?pagenum=1&pagesize=10');
      console.log(res);
      // 4 获取响应数据
      const data = res.data;
      // 5 meta中的msg 和 status
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 6 获取数据，给list列表
        const { data: { users } } = data;
        this.list = users;
      } else {
        // 6 提示错误
        this.$message.error(msg);
      }
    }
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
