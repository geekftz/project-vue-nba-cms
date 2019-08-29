<template>
  <div class="login">
    <a-form id="components-form-demo-normal-login" :form="loginForm" class="login-form" @submit="login">
      <a-form-item>
        <input type="password" style="display: none;" />
        <a-input ref="loginFormUsername" v-decorator="[
            'username',
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
        <input type="password" style="position:absolute; z-index:-999; left: 0; opacity: 0.01"/>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: false,
            }
          ]">
          <span class="df-clr">
            记住我
          </span>
        </a-checkbox>
        <a class="login-form-forgot" href>忘记密码</a>
        <a-button type="primary" html-type="submit" class="login-form-button">登陆</a-button>
        <span class="df-clr">
          或
        </span>
        <span class="cur-pt df-clr" @click="openRegisterModal">
          注册！
        </span>
      </a-form-item>
    </a-form>


    <!-- register modal -->
    <form-modal :title="'注册'" :visible="visible" :confirmLoading="confirmLoading" @handleOk="register"
      @handleCancel="handleCancel">
      <a-alert message="此系统暂时为Mock数据，只能注册一次且重复注册会覆盖。" banner />

      <a-form class="register-form" :form="registerForm" @submit="register">
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            Name&nbsp;
            <a-tooltip title="This is your account name">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input v-decorator="[
              'nickname',
              {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
              }
            ]" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Password">
          <a-input v-decorator="[
              'password',
              {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: validateToNextPassword,
                }],
              }
            ]" type="password" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Confirm Password">
          <a-input v-decorator="[
              'confirm',
              {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]" type="password" @blur="handleConfirmBlur" />
        </a-form-item>
      </a-form>

    </form-modal>
  </div>
</template>

<script>
  import {
    Button,
    Form,
    Input,
    Icon,
    Checkbox,
    Alert,
    Tooltip
  } from "ant-design-vue";

  const {
    Item: AFormItem
  } = Form;

  import FormModal from '@/components/formmodal/index.vue'

  import { requestLogin } from '@/api/global.js'

  import { mapMutations } from 'vuex'

  const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];

  export default {
    name: "login",
    data() {
      return {
        visible: false,
        confirmLoading: false,

        confirmDirty: false,
        residences,
        autoCompleteResult: [],
        formItemLayout: {
          labelCol: {
            xs: {
              span: 24
            },
            sm: {
              span: 8
            },
          },
          wrapperCol: {
            xs: {
              span: 24
            },
            sm: {
              span: 16
            },
          },
        },
      };
    },

    components: {
      AButton: Button,
      AForm: Form,
      AInput: Input,
      AIcon: Icon,
      ACheckbox: Checkbox,
      AFormItem,
      AAlert: Alert,

      FormModal,
      ATooltip: Tooltip
    },

    beforeCreate() {
      this.loginForm = this.$form.createForm(this);
      this.registerForm = this.$form.createForm(this);
    },

    mounted() {
      if (localStorage.getItem("userSetting")) {
        let { username, password, remember } = JSON.parse(localStorage.getItem("userSetting")); 

        this.loginForm.setFieldsValue({
          username,
          password,
          remember
        });
      }

      this.$refs.loginFormUsername.focus()
    },

    methods: {
      ...mapMutations([
        'SAVE_USERTOKEN', // 将 `this.SAVE_USERTOKEN(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        'CHANGE_SPINNING'
      ]),

      openRegisterModal() {
        this.visible = true
      },

      handleCancel() {
        this.visible = false
      },

      login(e) {
        e.preventDefault();
        this.loginForm.validateFields((err, values) => {
          if (!err) {
            let data = (({
              username,
              password
            }) => ({
              username,
              password
            }))(values)

            // 是否记住
            if (values.remember) {
              localStorage.setItem("userSetting",JSON.stringify(values));
            } else {
              localStorage.removeItem("userSetting");
            }

            this.CHANGE_SPINNING(true)

            requestLogin(data).then(res => {
              this.CHANGE_SPINNING(false)

              // console.log('%c⧭', 'color: #00bf00', res)
              if (res.retCode === 0) {
                localStorage.setItem('userToken', res.userToken)
                this.SAVE_USERTOKEN(res.userToken)

                this.$router.push('/')
              }
            })
          }
        });
      },

      register() {
        this.registerForm.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },

      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },

      compareToFirstPassword(rule, value, callback) {
        const registerForm = this.registerForm;

        if (value && value !== registerForm.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      },

      validateToNextPassword(rule, value, callback) {
        const registerForm = this.registerForm;

        if (value && this.confirmDirty) {
          registerForm.validateFields(['confirm'], {
            force: true
          });
        }
        callback();
      },
    }
  };

</script>

<style lang="scss" scoped>
  .login {
    position: relative;
    // background-image: url("~@/assets/images/login-background.jpg");
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

<style lang="scss">
  .ant-modal {
    .register-form {
      margin-top: 10px;
    }
  }

</style>
