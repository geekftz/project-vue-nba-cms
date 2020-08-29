<template>
  <div>
    <a-modal
      class="simple-modal"
      :title="title"
      :bodyStyle="bodyStyle"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
  
import {
    Modal
} from 'ant-design-vue'

export default {
    name: 'simple-modal',

    props: {
        title: {
            type: String,
            default: ''
        },

        visible: {
            type: Boolean,
            default: false
        },

        bodyStyle: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },

    components: {
        AModal: Modal
    },

    methods: {
        handleOk () {
            this.$emit('closeSimpleModal')
        },

        handleCancel () {
            this.$emit('closeSimpleModal')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
  .simple-modal {
    .section {
      line-height: 30px;
    }
  }
</style>