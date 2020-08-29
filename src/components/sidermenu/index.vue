<template>
  <div class="sider-menu">
    <a-menu theme="dark" @click="handleClick" mode="inline" :style="{ height: '100%', borderRight: 0 }"
      :openKeys.sync="openKeys">
      <a-sub-menu key="nba">
        <span slot="title">
          <a-icon type="user" />
          <span>NBA</span>
        </span>
        <a-menu-item key="team">Team</a-menu-item>
        <a-menu-item key="player">Player</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="history">
        <span slot="title">
          <a-icon type="laptop" />
          <span>History</span>
        </span>
        <a-menu-item key="allstar">ALL STAR</a-menu-item>
        <a-menu-item key="halloffame">Hall Of Fame</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="equipment">
        <span slot="title">
          <a-icon type="laptop" />
          <span>Equipment</span>
        </span>
        <a-menu-item key="shoes">Shoes</a-menu-item>
        <a-menu-item key="uniforms">Uniforms</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import {
    Menu,
    Icon
} from "ant-design-vue";

const {
    Item: AMenuItem,
    SubMenu: ASubMenu
} = Menu

export default {
    name: 'sider-menu',

    data() {
        return {
            openKeys: []
        }
    },

    components: {
        AMenu: Menu,
        ASubMenu,
        AMenuItem,
        AIcon: Icon,
    },

    watch: {
        /**
			 * params to, from
			 */
        $route(to) {
        // 执行ajax请求，但只希望在进入时请求，离开时不希望进行请求。
            console.log(to);
            if (to.path === '/home') {
                this.openKeys = []
            }
        }
    },

    methods: {
        handleClick(e) {
            const {
                keyPath
            } = e
            const path = '/' + keyPath.reverse().join('/')

            console.log(path);

            this.$router.push({
                path
            })
        }
    },
}

</script>

<style lang="scss" scoped>

</style>
