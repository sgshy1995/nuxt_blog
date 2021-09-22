<template>
  <div class="user-center">
    <div class="user-center-in">
      <div class="user-center-title">
        个人中心
      </div>
      <a-row class="center-info">
        <a-col :xs="12" :xl="6">
          <a-spin :spinning="loading">
            <a-form-model ref="FormModel" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="头像" class="avatar-item">
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                >
                  <img v-if="form.avatar" :src="form.avatar" alt="avatar" />
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">
                      Upload
                    </div>
                  </div>
                </a-upload>
                <span style="color: #c8c9cd">（点击更换头像）</span>
              </a-form-model-item>
              <a-form-model-item label="昵称" prop="nickname">
                <a-input v-model="form.nickname" placeholder="请输入昵称"/>
              </a-form-model-item>
              <a-form-model-item>
                <div class="button-wrapper">
                  <a-button type="primary" @click="onSubmit" :loading="loading">
                    保存
                  </a-button>
                  <NuxtLink to="/posts">
                    <a-button style="margin-left: 20px">
                      取消
                    </a-button>
                  </NuxtLink>
                </div>
              </a-form-model-item>
            </a-form-model>
          </a-spin>

        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Ref} from 'vue-property-decorator';
import {Context} from '@nuxt/types';
import {FormModel} from 'ant-design-vue';

@Component({
  layout: 'GlobalLayout',
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {

    const {$axios, error, req} = ctx;

    let userInfo = {}

    await $axios.get('/api/userinfo').then(response=>{
      userInfo = response.data.data
    })

    return {
      userInfo
    };
  }
})
export default class Center extends Vue{
  @Ref('FormModel') FormModel!: FormModel;

  rules: FormRule = {
    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}]
  }
  loading = false
  form: FormInterface = {
    nickname: '',
    avatar: ''
  };
  labelCol: SpaceColInterface = {span: 3};
  wrapperCol: SpaceColInterface = {span: 21};
  imageUrl:string = ''
  userInfo: any = {}

  mounted(){
    this.form.nickname = this.userInfo.nickname
    this.form.avatar = this.userInfo.avatar
  }

  onSubmit(){
    this.FormModel.validate(valid => {
      if (valid) {
        this.loading = true
        this.$axios.post('/api/userinfo',{
          nickname: this.form.nickname,
          avatar: this.form.avatar
        }).then(response=>{
          this.$message.success(response.data.message || '保存成功')
          this.$store.commit("user/commitUserInfo",response.data.data)
        }).catch(error=>{
          this.$message.error(error.response.data.message || '保存失败')
        }).finally(()=>{
          this.loading = false
        })
      }
    })
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info) {
    console.log('info',info)
    this.loading = true
    let formData = new FormData()
    formData.append('file',info.file)
    this.$axios.post('/api/upload',formData).then(response=>{
      console.log('response',response)
      if (response.data.status){
        this.imageUrl = response.data.data.filePath
        this.form.avatar = response.data.data.filePath
        this.$message.success('上传成功请保存')
      }else{
        this.$message.error('上传失败')
      }
    }).catch(error=>{
      this.$message.error('上传失败')
    }).finally(()=>{
      this.loading = false
    })
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.$message.error('只允许上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error('Image must smaller than 2MB!');
    }
    return false;
  }
}
</script>

<style scoped lang="scss">
.user-center{
  padding: 0 32px;
  .user-center-in{
    padding: 24px;
    border-radius: 10px;
    background: #fff;
    height: calc(100vh - 132px);
    overflow: auto;
    @media (max-width: 1199px) {
      height: calc(100vh - 202px);
    }
    .user-center-title{
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 16px;
      color: #233167;
    }
    .center-info{
      margin-top: 24px;
      /deep/.avatar-item {
        .ant-form-item-label{
          height: 80px;
          line-height: 80px;
        }
        .ant-upload{
          img{
            width: 84px;
            height: 84px;
          }
        }
      }

    }
  }
}
</style>
