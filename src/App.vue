<template>
  <div id="app">
    <el-container>
        <el-header>
          <nav-bar />
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Dravtar All Right Reserved.</el-footer>
  </el-container>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  },
  created () {}
}
</script>

<style>
@import url('https://at.alicdn.com/t/font_636092_c6xsy0el5bmg3nmi.css');
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.el-main {
  text-align: center;
  align-items: center;
}
</style>
