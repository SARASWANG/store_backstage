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
              <!-- 关闭tag时间，把角色对象和对应的权限id传递给函数 -->
              <el-tag type="success" closable @close="handleClose(scope.row,item1.id)">{{item1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 循环一行-->
              <el-row v-for="item2 in item1.children" :key="item2.id" class="row2">
                <el-col :span="4">
                  <el-tag type="error" closable @close="handleClose(scope.row,item2.id)">{{ item2.authName }}</el-tag>
                </el-col>
                <!-- 三级权限 循环每一个tag标签-->
                <el-col :span="20">
                  <el-tag
                  type="warning"
                  closable
                  v-for="item3 in item2.children"
                  :key="item3.id"
                  class="tag"
                  @close="handleClose(scope.row,item3.id)"
                  >
                  {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 没有权限 -->
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">没有权限</el-col>
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
        <el-button plain size="mini" type="success" icon="el-icon-check" @click="handleshowdialogVisible"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分配权限的对话框 -->
  <el-dialog
  title="分配权限"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
    <!-- tree
      data：提供数据
      props：配置数据中显示的属性 -->
    <el-tree
    :data="treedata"
    :props="defaultProps"
    show-checkbox
    default-expand-all
    @node-click="handleNodeClick">
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
 </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 角色信息列表
      roleslist: [],
      loading: true,
      // 对话框
      dialogVisible: false,
      // tree配置，要显示的数据
      treedata: [],
      // 配置要展示 数据中的哪个属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
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
    // 关闭标签按钮的处理程序(删除权限)
    // role:角色对象，rightId：权限id
    async handleClose(role, rightId) {
      const { data: resData } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      const { data, meta: { msg, status } } = resData;
      if (status === 200) {
        this.$message.success(msg);
        // 后端返回的数据是当前的角色拥有的权限，需要的是从新绑定角色的children
        // 因为数据是双向绑定，所有可以实现局部刷新
        role.children = data;
      } else {
        this.$message.erroe(msg);
      }
    },
    // 点击tree节点操作
    handleNodeClick() {

    },
    // 点击分配权限按钮，加载所有的权限
    async handleshowdialogVisible() {
      this.dialogVisible = true;
      const { data: resdata } = await this.$http.get(`rights/tree`);
      // 获取后端返回的数据
      const { data } = resdata;
      console.log(data);
      this.treedata = data;
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
