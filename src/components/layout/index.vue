<template>
  <div class="layout">
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div :class="['logo', collapsed ? 'close' : 'open']" />
      <sider-menu></sider-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <top-header :collapsed="collapsed" @reverseCollapsed="reverseCollapsed"></top-header>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>

<script>

  import {
    Layout,
  } from "ant-design-vue";

  const { Header: ALayoutHeader, Sider: ALayoutSider, Content: ALayoutContent } = Layout

  import SiderMenu from '@/components/sidermenu/index.vue'
  import TopHeader from '@/components/topheader/index.vue'

  export default {
    name: 'home',
    data() {
      return {
        collapsed: false,
      }
    },

    components: {
      ALayout: Layout,
      ALayoutSider,
      ALayoutContent,
      ALayoutHeader,

      TopHeader,
      SiderMenu
    },

    methods: {
      reverseCollapsed () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;

    #components-layout-demo-custom-trigger {
      height: 100%; 

      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .logo {
        margin: 16px auto;
        width: 120px;
        height: 40px;
        background: url('../../assets/images/nba-logo.jpeg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .open {
        width: 120px;
        height: 40px;
      }

      .close {
        width: 60px;
        height: 20px;
      }
    }
  }

</style>