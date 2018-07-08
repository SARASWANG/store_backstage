<template>
  <div class="login-wrap">
    <el-form class="login-from" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 点击按钮，登录
    handleLogin() {
      this.$http
        .post('login', this.formData)
        .then((res) => {
          console.log(res);
          // 后端返回的数据格式{ data : { data : , meta : { msg : "",status : }}, status : 200,}
          const data = res.data;
          // 需要状态码 status  ，和提示信息，msg ，结构赋值
          const { meta: { msg, status } } = data;
          if (status === 200) {
            // 获取token
            const token = data.data.token;
            // 记录touken到sessionStorage中
            sessionStorage.setItem('token', token);
            // 跳转到home首页
            this.$router.push({name: 'home'});
            // 弹出提示框
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          };
        });
    }
  }
};
</script>

<style>
.login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap .login-from {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
}

.login-wrap .login-from .login-btn {
    width: 100%;
}
</style>
