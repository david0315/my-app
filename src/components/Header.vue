<template>
  <div class="header">
    <div class="logo">智慧植物工厂云平台</div>
    <div class="id">{{$store.state.activeId}}</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
    margin-left: 20px;
    line-height: 70px;
  }
  .id {
    float: right;
    margin-right: 20px;
    line-height: 70px;
    font-size: 20px;
  }
</style>