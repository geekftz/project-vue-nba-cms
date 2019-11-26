<template>
    <div class="todo-list">
        <div v-for="(item, index) in item" :key="index">
            {{
                item
            }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'todo-list',

        data() {
            return {
                
            }
        },

        props: {
            item: {
                type:Array,
                default: () => []
            }
        },

        mounted() {
            
        },
    }
</script>

<style lang="scss" scoped>

</style>