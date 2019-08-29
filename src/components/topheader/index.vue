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

    <a-dropdown class="fl-r">
      <a class="ant-dropdown-link" href="#">
        <a-avatar style="backgroundColor:purple">{{ userName }}</a-avatar>&nbsp;<a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <span @click="viewMyInfo">
            My Info
          </span>
        </a-menu-item>
        <a-menu-item>
          <span @click="viewAboutIt">
            About It
          </span>
        </a-menu-item>
        <a-menu-item>
          <span @click="logout">
            Log Out
          </span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <simple-modal :title="'关于'" :bodyStyle="bodyStyle" :visible="aboutItVisible" @closeSimpleModal="closeSimpleModal">
      <p class="ta-ct fs-16">
        Welcome to my NBA world!
      </p>

      <p>
        Let me introduce this as a background management system, and why should I do this?
      </p>
      <a-divider />

      <p>
        1. First of all, I am an avid basketball powder. Basketball is like my life, so I don’t know what other
        motivations will make me do this.
      </p>
      <a-divider />

      <p>
        2. Secondly, I want to improve my technical level. With such a clear direction, I can expand to all aspects of
        basketball. In the process, I hope I can make it what I want.
      </p>
      <a-divider />

      <p>
        3. Finally, I will introduce the history of the NBA teams, the player's information from several modules, the
        All-Star and Hall of Fame players in NBA history, as well as basketball shoes and basketball uniforms, etc.
      </p>
      <a-divider />

      <p>
        I hope everyone can like my project. If you are interested, you can join me and let me continue to learn and work
        hard to achieve the great goal of the whole stack engineer.
      </p>

    </simple-modal>
  </div>
</template>

<script>
  import {
    Icon,
    Breadcrumb,
    Menu,
    Dropdown,
    Avatar,
    Divider
  } from "ant-design-vue";

  const { Item: ABreadcrumbItem } = Breadcrumb

  const { Item: AMenuItem } = Menu

  import SimpleModal from '@/components/simplemodal/index.vue'

  export default {
    name: 'top-header',

    data() {
      return {
        userName: JSON.parse(localStorage.getItem('userSetting')).username,

        aboutItVisible: true,

        bodyStyle: {
          height: '400px',
          // overflow: 'hidden',
          overflow: 'auto',
          'overflow-y': 'scroll',
        }
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
      ABreadcrumbItem,
      AMenu: Menu,
      AMenuItem,
      ADropdown: Dropdown,
      AAvatar: Avatar,
      ADivider: Divider,

      SimpleModal
    },

    methods: {
      backHome () {
        this.$router.push({
          path: '/'
        })
      },

      reverseCollapsed () {
        this.$emit('reverseCollapsed')
      },

      viewMyInfo () {

      },

      viewAboutIt () {
        this.aboutItVisible = true
      },

      closeSimpleModal () {
        this.aboutItVisible = false
      },

      logout () {
        localStorage.removeItem('userToken')
        this.$message.success('退出登陆')
        this.$router.push('/login')
      }
    },
  }

</script>

<style lang="scss" scoped>
  .top-header {
    padding-right: 25px;

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
