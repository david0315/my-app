<template>
  <div class="remote-control">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i> 远程控制台</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
      :data="tableData"
      :header-cell-style="{background:'#f5f7fa'}"
      border>
        <el-table-column
          prop="target"
          label="目标"
          align="center">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state===0?'success':(scope.row.state===1?'danger':'')">
              {{scope.row.state===0?'开启':(scope.row.state===1?'关闭':'')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
            size="medium"
            type="primary"
            @click="open(scope)">
              开启
            </el-button>
            <el-button
            size="medium"
            type="danger"
            @click="close(scope)">
              关闭
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        target: '外网',
        state: null
      },{
        target: '天窗1',
        state: null
      },{
        target: '天窗2',
        state: null
      },{
        target: '内网',
        state: null
      },{
        target: '风机1',
        state: null
      },{
        target: '风机2',
        state: null
      },{
        target: '风机3',
        state: null
      },{
        target: '风机4',
        state: null
      },{
        target: '水墙泵',
        state: null
      },{
        target: '循环风机',
        state: null
      },{
        target: '微喷泵',
        state: null
      },{
        target: '侧窗',
        state: null
      },{
        target: '总控',
        state: null
      },{
        target: '总电源',
        state: null
      }]
    }
  },
  methods: {
    // 点击开启按钮
    open(scope) {
      // 按钮的十六进制码
      console.log(((scope.$index * 2 + 1)<16?'0':'') + (scope.$index * 2 + 1).toString(16));
      this.buttonClick(this.$store.state.activeId, ((scope.$index * 2 + 1)<16?'0':'') + (scope.$index * 2 + 1).toString(16));
      this.getButtonState(this.$store.state.activeId);
    },
    // 点击关闭按钮
    close(scope) {
      // 按钮的十六进制码
      console.log(((scope.$index * 2 + 2)<16?'0':'') + (scope.$index * 2 + 2).toString(16));
      this.buttonClick(this.$store.state.activeId, ((scope.$index * 2 + 2)<16?'0':'') + (scope.$index * 2 + 2).toString(16));
      this.getButtonState(this.$store.state.activeId);
    },
    // 获得按钮的状态
    getButtonState(token) {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.askButton',
        params: {
          token: localStorage.getItem('user_token')
        }
      }).then(res => {
        console.log(res);
        for (let i in this.tableData) {
          this.tableData[i].state = res.data.data[i];
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 按钮点击事件
    buttonClick(token, cmd) {
      this.axios({
        url: 'http://60.190.23.22:8889/fertilizer_distributor/api/do.jhtml?router=appApiService.Button',
        params: {
          token: localStorage.getItem('user_token'),
          cmd: 'e20204' + cmd
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  activated() {
    this.getButtonState();
  }
}
</script>

<style scoped>
  .el-row {
    border-bottom: 1px solid #ebeef5;
  }
  .el-col {
    text-align: center;
  }
  .el-tag {
    font-size: 14px;
  }
</style>