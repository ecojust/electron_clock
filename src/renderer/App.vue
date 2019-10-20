<template>
  <div id="app" :style="style">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'elelg',
    data(){
      return {
        style:{}
      }
    },
    created(){
      this.resize();
    },
    methods:{
      resize(){
        var scale = 0.8;
        this.style = {
          // width:(1080 * scale) + 'px',
          height:(768 * scale - 14) + 'px'
        }
      }
    }
  }
</script>

<style>
*{
  padding:0;
  margin:0
}
  /* CSS */
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:540px;
  width:100%;
  background-color:black;
}
</style>
