<template>
  <div class="login-wrapper">
    <div class="title">
      <a-icon class="title-icon" type="dribbble-square" />
      <span>欢迎注册博客系统</span>
    </div>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="用户名">
        <a-input v-model="form.username" placeholder="请输入用户名" />
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-model-item>
      <a-form-model-item label="确认密码">
        <a-input-password v-model="form.passwordConfirm" placeholder="请输入确认密码" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Login extends Vue{
  form: FormInterface = {
    name: '',
    password: '',
    passwordConfirm: ''
  }
  labelCol: SpaceColInterface = { span: 6 }
  wrapperCol: SpaceColInterface = { span: 18 }

  onSubmit(){

  }
}
</script>

<style scoped lang="scss">
.login-wrapper{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title{
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 24px;
    color: #333;
    padding-bottom: 24px;

    .title-icon{
      font-size: 24px;
    }
  }
}
/deep/ .ant-form{
  width: 400px;
  border: 2px solid #333;
  padding: 24px 24px 0 24px;
  border-radius: 10px;
}
</style>
