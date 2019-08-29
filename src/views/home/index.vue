<template>
  <div class="home">
    <!-- <div class="ta-ct fs-24">
      Welcome to my NBA world!
    </div>

    <div class="section fs-16">
      Let me introduce this as a background management system, and why should I do this?
    </div>

    <div class="section fs-16">
      1. First of all, I am an avid basketball powder. Basketball is like my life, so I don’t know what other
      motivations will make me do this.
    </div>

    <div class="section fs-16">
      2. Secondly, I want to improve my technical level. With such a clear direction, I can expand to all aspects of
      basketball. In the process, I hope I can make it what I want.
    </div>

    <div class="section fs-16">
      3. Finally, I will introduce the history of the NBA teams, the player's information from several modules, the
      All-Star and Hall of Fame players in NBA history, as well as basketball shoes and basketball uniforms, etc.
    </div>

    <div class="section fs-16">
      I hope everyone can like my project. If you are interested, you can join me and let me continue to learn and work
      hard to achieve the great goal of the whole stack engineer.
    </div> -->

    <a-row>
      <a-col :span="6">col-6</a-col>
      <a-col :span="12">col-12</a-col>
      <a-col :span="6">col-6</a-col>
    </a-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import {
    Row,
    Col
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
      ACol: Col
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
    .section {
      line-height: 30px;
    }
  }
</style>
