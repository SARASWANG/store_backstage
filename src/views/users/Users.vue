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
        <!-- 1、点击添加用户--就弹出层 -->
        <el-button type="success" plain @click="AdduserdialogTableVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域  stripe 斑马线样式-->
    <el-table :data="list" border stripe style="width: 100%" v-loading="loading">
      <el-table-column  type="index" label="#" width="80" align="center">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="80" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="140" align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" align="center">
      </el-table-column>
      <!-- 添加一行日期状态 -->
      <el-table-column prop="create_time" label="日期" align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD hh:mm:ss') }}
        </template>
      </el-table-column>
      <!-- 用户状态 -->
      <el-table-column label="用户状态" width="80" align="center">
        <!-- 增加一个template标签 把开关按钮包裹起来 -->
        <template slot-scope="scope">
          <!-- scope.row 就是当前绑定的数据对象 -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件  -->
    <!-- @size-change 每页多少条数据发生改变 触发的事件 -->
    <!-- @current-change 当前页码改变发生 -->
    <!-- current-page 当前页码 -->
    <!-- page-sizes 每页多少条数据的下拉框 -->
    <!-- page-size 每页显示多少条数据 -->

    <!-- total  总条数 -->
    <!-- layout 分页所支持的功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[4, 6, 2, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="AdduserdialogTableVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--  2、点击确认添加，发送请求， -->
        <el-button type="primary" @click="handleAdduser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      formData: '',
      list: [],
      loading: true,
      // 每页显示多少条
      pagesize: 4,
      // 当前页
      pagenum: 1,
      // 总条数
      total: 0,
      // 添加用户弹出框属性
      AdduserdialogTableVisible: false,
      formLabelWidth: '120px',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    // 用户列表加载函数
    async loadList() {
      // 在发送请求之前开始加载
      this.loading = true;
      // 1 获取token值
      const token = sessionStorage.getItem('token');
      // 2 在请求头中设置touken，一起发送过去
      this.$http.defaults.headers.common['Authorization'] = token;
      // 3 发送请求
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(res);
      // 请求结束拿到数据后，结束加载
      this.loading = false;

      // 4 获取响应数据
      const data = res.data;
      // 5 meta中的msg 和 status
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 6 获取数据，给list列表
        const { data: {users, total} } = data;
        this.list = users;
        // 获取后端返回的总页数
        this.total = total;
      } else {
        // 6 提示错误
        this.$message.error(msg);
      }
    },
    // 分页处理程序
    // 每页条数改变的时候
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 获取当前页，
      this.pagesize = val;
      // 根据当前页，加载用户列表
      this.loadList();
    },
    // 当前页数改变的时候
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 获取当前页，
      this.pagenum = val;
      // 根据当前页，加载用户列表
      this.loadList();
    },
    // 3、点击添加按钮处理程序
    async handleAdduser() {
      // 1、发送请求,把对应的表单数据传递过去
      var addres = await this.$http.post('users', this.form);
      // 2、获取响应的数据
      const {meta: {msg, status}} = addres.data;
      if (status === 201) {
        // 3、提示信息
        this.$message.success(msg);
        // 4、关闭弹出框
        this.AdduserdialogTableVisible = false;
        // 5、重新加载数据
        this.loadList();
        // 6、注意：清空列表-------遍历对象，把每一项都至为空
        for (let key in this.form) {
          this.form[key] = '';
        }
      } else {
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
