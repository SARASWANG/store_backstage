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
        <!-- 点击分配权限，把本行的角色对象传递给处理函数 -->
        <el-button plain size="mini" type="success" icon="el-icon-check" @click="handleshowrightdialog(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分配权限的对话框 -->
  <el-dialog
  title="分配权限"
  v-loading="loadingTree"
  @open="handleOpenDialog"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
    <!-- tree 属性
      data：提供数据
      props：配置数据中显示的属性
      node-key - 给每一个节点一个表示 ，一般绑定id
      当要使用default-expanded-keys和default-checked-keys必须先设置node-key
      default-checked-keys 设置默认选中的节点 -->
    <el-tree
    ref="tree"
    :data="treedata"
    :props="defaultProps"
    show-checkbox
    default-expand-all
    node-key="id"
    :default-checked-keys="checkedList"
    @node-click="handleNodeClick">
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSetRights">确 定</el-button>
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
      loadingTree: true,
      // 对话框
      dialogVisible: false,
      // loading: true,
      // tree配置，要显示的数据
      treedata: [],
      // 配置要展示 数据中的哪个属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 获取要选择的节点-----------难点
      checkedList: [],
      // 记录当前修改的角色id-----------难点
      currentRoleId: -1
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
    // 打开对话框的时候执行,加载所有的权限
    async handleOpenDialog() {
      this.loadingTree = true;
      const { data: resdata } = await this.$http.get(`rights/tree`);
      this.loadingTree = false;
      // 获取后端返回的数据
      const { data } = resdata;
      console.log(data);
      this.treedata = data;
    },
    // 点击按钮显示分配权限的对话框
    async handleshowrightdialog(role) {
      this.dialogVisible = true;
      // 记录角色id，分配权限的时候使用-----------难点
      this.currentRoleId = role.id;
      // 获取当前角色拥有的权限id
      // 声明数组存放权限id(只存放第三级的就行)
      const rightArr = [];
      // 遍历一级权限
      role.children.forEach((item1) => {
        // 遍历二级权限
        item1.children.forEach((item2) => {
          // 遍历三级权限
          item2.children.forEach((item3) => {
            rightArr.push(item3.id);
          });
        });
      });
      this.checkedList = rightArr;
    },
    // 点击dialog的确认按钮，分配权限
    // 思路
    // 点击对话框确认按钮时，获取tree的所有节点，发送请求，实现角色授权
    // 难点： 收集tree的节点，在上一步骤中记录角色id，这一步发送请求时使用。
    async handleSetRights() {
      // 获取到被选中的节点的id-----------难点
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      // 获取到半选的节点的id-----------难点
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      // 把获取到的所有节点展开，放入一个数组中-----------难点
      const newArray = [...checkedKeys, ...halfCheckedKeys];
      // 发送请求，分配权限
      const { data: resData } = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: newArray.join(',')
      });
      const { meta: { status, msg } } = resData;
      if (status === 200) {
        // 分配成功
        // 关闭对话框
        this.dialogVisible = false;
        // 提示成功
        this.$message.success(msg);
        // 重新加载数据
        this.loadRolesList();
      } else {
        this.$message.error(msg);
      }
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
