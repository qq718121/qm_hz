<template>
  <div id="app">
    <router-view v-loading.fullscreen.lock="this.$store.state.loading"></router-view>
    <oban></oban>
  </div>
</template>

<script>
  import './common/css/common.css'
  import oban from './components/moban/moban'

  export default {
    name: 'app',
    data(){
      return {

      }
    },
    mounted(){
      this.$store.commit('set_school_class', '');
    },
    components: {
      oban
    },
    created(){

    },
    methods: {}
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
