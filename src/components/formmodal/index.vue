<template>
  <div class="form-modal">
    <a-modal
      :title="title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
import {
    Modal
} from "ant-design-vue";

export default {
    name: 'form-modal',

    data() {
        return {
        
        }
    },

    props: {
        title: {
            type: String,
            default: ''
        },

        visible: {
            type: Boolean,
            default: false
        },

        confirmLoading: {
            type: Boolean,
            default: false
        }
    },

    components: {
        AModal: Modal
    },

    methods: {
        handleOk () {
            this.$emit('handleOk')
        },

        handleCancel () {
            this.$emit('handleCancel')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>