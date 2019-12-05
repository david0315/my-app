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
            <el-tag
            type="success">
              开启
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
            size="medium"
            type="primary">
              打开
            </el-button>
            <el-button
            size="medium"
            type="danger">
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
        state: true
      },{
        target: '天窗1',
        state: false
      },{
        target: '天窗2',
        state: false
      },{
        target: '内网',
        state: false
      },{
        target: '风机1',
        state: false
      },{
        target: '风机2',
        state: false
      },{
        target: '风机3',
        state: false
      },{
        target: '风机4',
        state: false
      },{
        target: '水墙泵',
        state: false
      },{
        target: '循环风机',
        state: false
      },{
        target: '微喷泵',
        state: false
      },{
        target: '侧窗',
        state: false
      },{
        target: '总控',
        state: false
      },{
        target: '总电源',
        state: false
      }]
    }
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