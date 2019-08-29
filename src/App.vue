<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <a-spin v-if="spinning" class="spin-content" size="large" :spinning="spinning"></a-spin>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    Spin
  } from "ant-design-vue";

  import { mapState } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },

  computed: mapState({
    spinning: state => state.spinning,
  }),

  components: {
    ASpin: Spin
  }
}
</script>

<style>
  .spin-content{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    outline: 0;
    -webkit-overflow-scrolling: touch;
    filter: alpha(opacity=60);  
    background-color: rgba(0, 0, 0, 0.3); 
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
