<template>
  <div class="login">
    <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input v-decorator="[
            'userName',
            { rules: [{ required: true, message: '请输入用户名' }] }
          ]" placeholder="用户名">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码！' }] }
          ]" type="password" placeholder="密码">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <input type="password"  style="position: absolute;z-index: -999">
      </a-form-item>
      <a-form-item>
        <a-checkbox v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            }
          ]">记住我</a-checkbox>
        <a class="login-form-forgot" href>忘记密码</a>
        <a-button type="primary" html-type="submit" class="login-form-button">登陆</a-button>或
        <a href>注册！</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {
    Button,
    Form,
    Input,
    Icon,
    Checkbox
  } from "ant-design-vue";

  const {
    Item: AFormItem
  } = Form;

  export default {
    name: "login",
    data() {
      return {
        formLayout: "horizontal",
        form: this.$form.createForm(this)
      };
    },

    components: {
      AButton: Button,
      AForm: Form,
      AInput: Input,
      AIcon: Icon,
      ACheckbox: Checkbox,
      AFormItem,
    },

    beforeCreate () {
      this.form = this.$form.createForm(this);
    },

    created() {},

    methods: {
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            
            let {
              userName,
              password,
              remember
            } = values

            // 是否记住
            if (remember) {
              
            }

            this.$router.push('/')
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    background-image: url("~@/assets/images/login-background.jpg");
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-size: cover;
    display: flex;

    #components-form-demo-normal-login {
      align-self: center;
      margin-left: 100px;
      width: 300px;

      .login-form {
        max-width: 300px;
      }
      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    }
  }
</style>