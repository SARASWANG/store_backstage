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
        <!-- scope.row中可以获取本行的角色信息 -->
          <!-- 一级权限 循环一行-->
          <el-row v-for="item1 in scope.row.children" :key="item1.id" class="row1">
            <el-col :span="4">
              <el-tag type="success" closable @close="handleClose">{{item1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 循环一行-->
              <el-row v-for="item2 in item1.children" :key="item2.id" class="row2">
                <el-col :span="4">
                  <el-tag type="error" closable @click="handleClose">{{ item2.authName }}</el-tag>
                </el-col>
                <!-- 三级权限 循环每一个tag标签-->
                <el-col :span="20">
                  <el-tag
                  type="warning"
                  closable
                  @click="handleClose"
                  v-for="item3 in item2.children"
                  :key="item3.id"
                  class="tag">
                  {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
      // 角色信息列表
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
      // 1、发送请求的时候开始显示加载遮罩
      this.loading = true;
      // 2、res是response，获取的是响应对象，---> { data: {...}, status }
      const { data: resData } = await this.$http.get('roles');
      console.log(resData);
      // 3、当发送完请求后，结束加载效果
      this.loading = false;
      // res.data 中的数据才是后端返回的数据 { data: {...} ,meta: {msg,status} }
      const { data, meta: { msg, status } } = resData;
      if (status === 200) {
        // 获取数据成功，
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
.row1 {
  margin-bottom: 15px;
}
.row2 {
  margin: 1px;
}
.tag {
  margin: 0 5px 5px;
}
</style>
