<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">智慧植物工厂云平台</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="account">
          <el-input v-model="param.account" placeholder="输入用户名">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()">
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm() {
      if (this.param.account === '' || this.param.password === '') {
        alert('账号或密码不能为空');
      } else {
        this.axios({
          url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.loginUser1',
          params: {
            account: this.param.account,
            password: this.param.password
          }
        }).then(res => {
          // console.log(res);
          if (res.data.appcode === '1') {
            localStorage.setItem("user_token", res.data.data.token);
            this.$router.push("/");
          } else if (res.data.appcode === '-1') {
            alert(res.data.appmsg);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>