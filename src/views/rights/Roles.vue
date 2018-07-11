<template>
 <!-- 卡片 -->
 <el-card class="box-card">
   <!-- 面包屑----引入全局组件 -->
   <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
  <!-- 添加按钮 -->
  <el-row class="rolesaddbtn">
    <el-col :span="24">
      <el-button>添加按钮</el-button>
    </el-col>
  </el-row>
  <!-- 表格 -->
  <el-table :data="roleslist" style="width: 100%" border stripe >
    <!-- index 索引自增长 -->
    <el-table-column
      type="index"
      width="80">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
    </el-table-column>
  </el-table>
 </el-card>
</template>

<script>
export default {
  data() {
    return {
      roleslist: []
    };
  }
};
</script>

<style>
.rolesaddbtn {
  margin: 20px 0;
}
</style>
