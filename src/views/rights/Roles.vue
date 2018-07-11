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
  <el-table :data="roleslist" style="width: 100%" border stripe v-loading="loading">
    <!-- 展开列 -->
    <el-table-column type="expand">
      <template slot-scope="scope">
        <!-- 标签 closrable属性表示标签可以移除 -->
        <el-tag type="success" closable @close="handleClose">主管</el-tag>
      </template>
    </el-table-column>
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
      <!-- 操作按钮 -->
      <template slot-scope="scope">
        <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
        <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
        <el-button plain size="mini" type="success" icon="el-icon-check" ></el-button>
      </template>
    </el-table-column>
  </el-table>
 </el-card>
</template>

<script>
export default {
  data() {
    return {
      roleslist: [],
      loading: true
    };
  },
  created() {
    this.loadRolesList();
  },
  methods: {
    // 加载角色列表
    async loadRolesList() {
      // 发送请求的时候开始显示加载遮罩
      this.loading = true;
      // res是response，获取的是响应对象，---> { data: {...}, status }
      const { data: resData } = await this.$http.get('roles');
      // 当发送完请求后，结束加载效果
      this.loading = false;
      // res.data 中的数据才是后端返回的数据 { data: {...} ,meta: {msg,status} }
      const { data, meta: { msg, status } } = resData;
      if (status === 200) {
        // 获取数据成功
        this.roleslist = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 关闭标签按钮的处理程序
    handleClose(tag) {
      console.log('close');
    }
  }
};
</script>

<style>
.rolesaddbtn {
  margin: 20px 0;
}
</style>
