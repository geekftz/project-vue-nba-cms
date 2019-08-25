<template>
  <div class="top-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="reverseCollapsed"
    />

    <a-breadcrumb class="dis-ib" style="margin: 16px 0">
      <a-breadcrumb-item>
        <span class="to-home cur-pt" @click="backHome">Home</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">{{ item }}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
  import {
    Icon,
    Breadcrumb
  } from "ant-design-vue";

  const { Item: ABreadcrumbItem } = Breadcrumb

  export default {
    name: 'top-header',

    data() {
      return {
      }
    },

    props: {
      collapsed: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      breadcrumbList () {
        const { matched } = this.$route

        if (matched[0].name === '/') {
          return []
        }

        return matched.map( item => item.name )
      }
    },

    components: {
      AIcon: Icon,
      ABreadcrumb: Breadcrumb,
      ABreadcrumbItem
    },

    methods: {
      backHome () {
        console.log(123);
        this.$router.push({
          path: '/'
        })
      },

      reverseCollapsed () {
        this.$emit('reverseCollapsed')
      }
    },
  }

</script>

<style lang="scss" scoped>
  .top-header {
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
    }

    .trigger:hover {
      color: #1890ff;
    }

    .to-home {
      &:hover {
        color: purple;
      }
    }
  }
</style>
