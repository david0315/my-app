<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="this.$store.state.userInfo.collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">智慧植物工厂云平台</div>
    <el-dropdown class="id" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{$store.state.userInfo.name}}
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changeName">修改名称</el-dropdown-item>
        <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- Form Start -->
    <el-dialog title="修改名称" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="70px">
        <el-form-item label="新的名称">
          <el-input v-model="form.newName" autocomplete="off" placeholder="请输入新的名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeName()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form End -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        newName: ''
      }
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.$store.commit('collapseChage')
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      // 修改名称
      if (command == 'changeName') {
        this.dialogFormVisible = true
      }
      // 退出登录
      else if (command == 'loginOut') {
        localStorage.removeItem('user_token');
        // 刷新页面
        this.$router.go(0);
      }
    },
    // 提交修改名称表单
    changeName() {
      if (this.form.newName === '') {
        alert('名称不能为空');
      } else {
        this.axios({
          url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.changename',
          params: {
            token: localStorage.getItem('user_token'),
            name: this.form.newName
          }
        }).then(res => {
          console.log(res);
          if (res.data.appcode == '1') {
            this.dialogFormVisible = false;
            // 刷新页面
            this.$router.go(0);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 更改用户名称
    changeUserName(name) {
      this.$store.commit('changeUserName', name);
    }
  }
}
</script>

<style scoped>
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
  }
  .logo {
    float: left;
    line-height: 70px;
  }
  .id {
    float: right;
    margin-right: 20px;
    line-height: 70px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
</style>