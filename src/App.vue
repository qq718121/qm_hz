<template>
  <div id="app">
    <!--全局路由视口-->
    <router-view></router-view>
    <!--模态窗口组件-->
    <oban v-if="this.$store.state.is_oban"></oban>
  </div>
</template>

<script>
  import './common/css/common.css'//引入全局css
  import oban from './components/moban/moban'//引入模板组件

  export default {
    name: 'app',
    mounted(){
        //组件加载后设置模板默认弹出class为空
      this.$store.commit('set_school_class', '');
    },
    components: {
        //挂载模板组件
      oban
    }
  }

</script>

<style>
  #app {
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 0.252rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    margin: 0;
    padding: 0;
  }
</style>
