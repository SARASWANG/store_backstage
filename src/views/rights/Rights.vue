<template>
<!-- 卡片-->
<el-card class="box-card">
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 表格 -->
  <el-table
      class="rightsTable"
      stripe
      border
      :data="rightslist"
      style="width: 100%">
      <!-- index 索引自增长 -->
      <el-table-column
      type="index"
        width="80">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <!-- 根据scope.row中的数据判断level的值，来显示对应的层级 -->
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      // 存储表格数据
      rightslist: []
    };
  },
  created() {
    this.loadRightsList();
  },
  methods: {
    // 查询角色列表
    async loadRightsList() {
      // 发送请求之前，获取token
      // const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      // this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get(`rights/list`);
      // console.log(res);
      this.rightslist = res.data.data;
    }
  }
};
</script>

<style>
.rightsTable {
  margin-top: 20px;
}
</style>
