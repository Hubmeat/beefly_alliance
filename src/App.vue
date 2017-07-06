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

<style>
*{margin:0;padding:0;}
</style>
