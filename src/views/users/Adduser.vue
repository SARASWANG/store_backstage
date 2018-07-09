<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.dbpassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input type="email" v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdduser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        dbpassword: '',
        email: '',
        mobile: ''
      },
      dialogTableVisible: true,
      dialogFormVisible: true,
      formLabelWidth: '120px',
      fullscreen: true,
      center: true
    };
  },
  methods: {
    // 点击添加按钮处理程序
    async handleAdduser() {
      // 1 获取token值
      const token = sessionStorage.getItem('token');
      // 2 在请求头中设置touken，一起发送过去
      this.$http.defaults.headers.common['Authorization'] = token;
      // 3 发送ajax请求
      var addres = await this.$http.post('users', {
        password: this.form.password,
        username: this.form.username
      });
      // 4 获取响应的数据
      const {meta: {msg, status}} = addres.data;
      if (status === 201) {
        // 跳转到列表页
        this.$message.success(msg);
        this.$router.push({name: 'users'});
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
</style>
