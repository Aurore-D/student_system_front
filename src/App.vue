<template>
  <div id="app">

   <!--如何让vue中router当前页面跳转并刷新、及页面跳转防闪屏-->

    <!--<router-view v-if="routerState"></router-view>-->
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
       /* //向子组件注入依赖
        provide() {
            return {
                reload: this.reload
            }
        },
        //声明变量
        data() {
            return {
                routerState: true
            }
        },
        methods: {
            //利用$nextTick特性，router跳转完成后展示页面
            reload() {
                this.routerState = false;
                this.$nextTick(() => {
                    this.routerState = true;
                })
            }
        }*/
    }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  /* 解决子组件中 height: 100% 不生效问题 */
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>

