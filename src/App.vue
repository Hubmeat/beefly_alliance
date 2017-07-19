<template>
  <div id="app">
      <my-home></my-home>
  </div>
</template>

<script>
import myHome from './pages/container/index.vue'
export default {
  name: 'app',
  components: {
    myHome
  }
}
</script>

<!--全局，公用样式写在此处-->
<style rel="stylesheet/less" lang="less">
  *{margin:0;padding:0}
  @import "./assets/rest_elementUI_less/pagenation.less";
</style>

