<template>
  <div class="home">
    <a-row>
      <a-col :span="6">
        历史上的今天
      </a-col>
      <a-col :span="12">
        <a-carousel autoplay>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
      </a-col>
      <a-col :span="6">col-6</a-col>
    </a-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import {
    Row,
    Col,
    Carousel
  } from 'ant-design-vue'

  export default {
    name: 'home',

    data() {
      return {
        
      }
    },

    computed: mapState({
      userToken: state => state.userToken,
    }),

    components: {
      ARow: Row,
      ACol: Col,
      ACarousel: Carousel
    },

    mounted() {
      // console.log(this.userToken);
    },

    methods: {
      
    },
  }

</script>

<style lang="scss" scoped>
  .home {
  }
</style>

<style lang="scss">

</style>
