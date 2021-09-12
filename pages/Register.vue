<template>
  <div class="login-wrapper">
    <div class="title">
      <a-icon class="title-icon" type="dribbble-square"/>
      <span>欢迎注册博客系统</span>
    </div>
    <a-form-model ref="FormModel" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="用户名" prop="username">
        <a-input v-model="form.username" placeholder="请输入用户名"/>
      </a-form-model-item>
      <a-form-model-item label="昵称" prop="nickname">
        <a-input v-model="form.nickname" placeholder="请输入昵称"/>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password v-model="form.password" placeholder="请输入密码"/>
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="passwordConfirm">
        <a-input-password v-model="form.passwordConfirm" placeholder="请输入确认密码"/>
      </a-form-model-item>
      <a-form-model-item class="code-wrapper" label="验证码" prop="code">
        <a-input class="input-code" v-model="form.code" placeholder="请输入验证码"/>
        <a-tooltip>
          <template slot="title">
            点击更换验证码
          </template>
          <div class="code-canvas" id="canvas" @click="getTextCode">
            {{ loginCode }}
          </div>
        </a-tooltip>
      </a-form-model-item>
      <a-form-model-item>
        <div class="button-wrapper">
          <a-button type="primary" @click="onSubmit">
            注册
          </a-button>
          <NuxtLink to="/login">
            <a-button style="margin-left: 20px">
              返回登录
            </a-button>
          </NuxtLink>
          <NuxtLink to="/">
            <a-button style="margin-left: 20px">
              返回首页
            </a-button>
          </NuxtLink>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import {FormModel} from 'ant-design-vue';
import {Vue, Component, Ref} from 'vue-property-decorator';
import {frontCreateCipher} from '~/lib/frontSecurity';

@Component
export default class Register extends Vue {
  form: FormInterface = {
    name: '',
    nickname: '',
    password: '',
    passwordConfirm: ''
  };
  rules: FormRule = {
    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
    passwordConfirm: [{required: true, validator: this.handleConfirmPassword, trigger: 'blur'}],
    code: [{required: true, validator: this.handleCheckCode, trigger: 'blur'}]
  };
  labelCol: SpaceColInterface = {span: 6};
  wrapperCol: SpaceColInterface = {span: 18};
  loginCode: string = '';

  @Ref('FormModel') FormModel!: FormModel;

  mounted() {
    this.getTextCode();
  }

  onSubmit() {
    this.FormModel.validate(valid => {
      if (valid) {
        // 获取公钥，公钥的环境变量要暴露给浏览器
        let publicKey = process.env.NEXT_PUBLIC_FRONT_KEY;
        // 加密
        const {secret: secretP, secretTag: secretPTag} = frontCreateCipher(this.form.password, publicKey);
        const {secret: secretPC, secretTag: secretPCTag} = frontCreateCipher(this.form.passwordConfirm, publicKey);

        this.$axios.post('/api/register',{
          username: this.form.username,
          nickname: this.form.nickname,
          password: secretP,
          passwordConfirm: secretPC,
          passwordTag: secretPTag,
          passwordConfirmTag: secretPCTag
        }).then(response=>{
          this.$notification.success({ message: '注册成功', description: `欢迎您，${this.form.username}`, duration: 4 })
          this.$router.push({path: '/'})
          this.getTextCode()
        }).catch(error=>{
          if (error.response){
            this.$notification.error({ message: '系统提示', description: error.response.data.message, duration: 2 })
          }else{
            this.$notification.error({ message: '系统提示', description: '系统内部错误，请联系管理员', duration: 2 })
          }
          this.getTextCode()
        })
      }
    });
  }

  handleConfirmPassword(rule, value, callback) {
    if (!value) {
      callback('请输入确认密码');
    } else if (value !== this.form.password) {
      callback('两次密码不一致');
    } else {
      callback()
    }
  }

  handleCheckCode(rule, value, callback) {
    if (!value) {
      callback('请输入验证码');
    } else if (value.toLowerCase() !== this.loginCode.toLowerCase()) {
      callback('请输入正确的验证码');
    } else {
      callback()
    }
  }

  public getTextCode() {
    /**
     * 生成随机或者指定位数的英文数字组合
     * @param {boolean} randomFlag  是否是随机生成位数
     * @param {number} min      生成随机位数的最小数
     * @param {number} max      生成随机位数的最大数
     * @return {string}        返回生成的英文数字组合
     */
    function randomWord(randomFlag: boolean, min: number, max?: number) {
      let str = '',
        range = min,	// 默认赋值为第二个参数，如果是随机产生位数会通过下面的if改变。
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max! - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        let index = Math.round(Math.random() * (arr.length - 1));
        str += arr[index];
      }
      return str;
    }

    this.loginCode = randomWord(false, 4);
  }

}
</script>

<style scoped lang="scss">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 24px;
    color: #333;
    padding-bottom: 24px;

    .title-icon {
      font-size: 24px;
    }
  }
}

/deep/ .ant-form {
  width: 400px;
  border: 2px solid #333;
  padding: 24px 24px 0 24px;
  border-radius: 10px;
}

.input-code {
  width: calc(100% - 84px);
  flex-shrink: 0;
}

/deep/ .code-wrapper .ant-form-item-children {
  align-items: center;
  display: inline-flex;
  width: 100%;
}

.code-canvas {
  cursor: pointer;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  font-family: 'MV Boli Normal', 'MV Boli', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  text-align: center;
  width: calc(64px);
  margin-left: 20px;
  background: rgba(51, 51, 51, 0.2);
  border-radius: 4px;
  flex-shrink: 0;
}

.button-wrapper {
  width: 352px;
  text-align: center;
}
</style>
