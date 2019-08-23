<template>
  <div class="home">
     <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div class="logo" />
        <!-- <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu> -->
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <!-- :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']" -->
            <a-sub-menu key="sub1">
              <span slot="title"><a-icon type="user" />NBA</span>
              <a-menu-item key="1">球队</a-menu-item>
              <a-menu-item key="2">球员</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title"><a-icon type="laptop" />历史</span>
              <a-menu-item key="5">ALL STAR</a-menu-item>
              <a-menu-item key="6">名人堂</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <span slot="title"><a-icon type="laptop" />装备</span>
              <a-menu-item key="7">球鞋</a-menu-item>
              <a-menu-item key="8">球服</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <!-- <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item> -->
          </a-breadcrumb>
          <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
            Content
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>

  import {
    Layout,
    Menu,
    Breadcrumb,
    Icon
  } from "ant-design-vue";

  const { Header: ALayoutHeader, Sider: ALayoutSider, Content: ALayoutContent } = Layout
  const { Item: ABreadcrumbItem } = Breadcrumb
  const { Item: AMenuItem, SubMenu: ASubMenu } = Menu

  export default {
    name: 'home',
    data() {
      return {
        collapsed: false,
      }
    },

    components: {
      ALayout: Layout,
      ALayoutHeader,
      ALayoutSider,
      ALayoutContent,
      AMenu: Menu,
      ASubMenu,
      AMenuItem,
      ABreadcrumb: Breadcrumb,
      ABreadcrumbItem,
      AIcon: Icon
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    height: 100%;

    #components-layout-demo-top-side-2 {
      height: 100%;

      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255,255,255,.2);
        margin: 16px 28px 16px 0;
        float: left;
      }
    }
  }
</style>