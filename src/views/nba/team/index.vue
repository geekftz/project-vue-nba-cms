<template>
  <div class="team">
    team

    <div v-for="(item,index) in treeArr" :key="index">
        <!-- 递归调用自身, 后台判断是否不存在改值 -->
        <todo-list :item="item.arr"></todo-list>
    </div>

    <button @click="test">test broadcast</button>

    <!-- {{ message | capitalize }} -->

  </div>
</template>

<script>
  import TodoList from './children/TodoList'

  export default {
    name: 'team',

    data() {
      return {
        treeArr: [
          {
            arr: [1, 2, 3],
            flag: true
          }
        ],

        // message: 'haha'
      }
    },

    // filters: {
    //   capitalize: function (value) {
    //     if (!value) return ''
    //     value = value.toString()
    //     return value.charAt(0).toUpperCase() + value.slice(1)
    //   }
    // },

    components: {
      TodoList
    },

    mounted() {
      // this.broadcast('todo-list', 'fuck', '')
    },

    methods: {

      test() {
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>