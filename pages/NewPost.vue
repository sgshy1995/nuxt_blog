<template>
  <div class="new-post">
    <div class="new-post-in">
      <div class="new-post-title">
        新建博客
      </div>
      <a-row class="new-post-form">
        <a-col :xs="24" :xl="12">
          <a-spin :spinning="loading">
            <a-form-model ref="FormModel" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="文章标题" prop="title">
                <a-input v-model="form.title" placeholder="请输入文章标题"/>
              </a-form-model-item>
              <a-form-model-item label="文章内容" prop="content" v-show="switchCheck">
                <div class="quill-editor"
                     :content="form.content"
                     @change="onEditorChange($event)"
                     @blur="onEditorBlur($event)"
                     @focus="onEditorFocus($event)"
                     @ready="onEditorReady($event)"
                     v-quill:myQuillEditor="editorOption">
                </div>
              </a-form-model-item>
              <a-form-model-item label="文章内容" prop="content1" v-show="!switchCheck">
                <a-textarea v-model="form.content1" :rows="12">

                </a-textarea>
              </a-form-model-item>
              <a-form-model-item label="切换输入格式">
                <a-switch v-model="switchCheck"></a-switch>
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
import {FormModel} from 'ant-design-vue';

@Component({
  layout: 'GlobalLayout'
})
export default class NewPost extends Vue {
  @Ref('FormModel') FormModel!: FormModel;

  switchCheck = false
  loading = false
  form: FormInterface = {
    title: '',
    content: '',
    content1: '',
  };

  get rules(){
    return this.switchCheck ? {
      title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
      content: [{required: true, message: '请输入文章内容', trigger: 'blur'}],
    } : {
      title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
      content1: [{required: true, message: '请输入文章内容', trigger: 'blur'}],
    }
  }

  labelCol: SpaceColInterface = {span: 2};
  wrapperCol: SpaceColInterface = {span: 22};
  content: '<p>I am Example</p>'
  editorOption = {
    // some quill options
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
        ['blockquote', 'code-block'],                      //引用，代码块
        [{ 'header': 1 }, { 'header': 2 }],               // 几级标题
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 有序列表，无序列表
        [{ 'script': 'sub'}, { 'script': 'super' }],      // 下角标，上角标
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
        [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// 标题
        [{ 'color': [] }, { 'background': [] }],          // 颜色选择
        [{ 'align': [false,'center','right','justify'] }], // 居中
        ['clean']                                         // 清除样式
      ]
    }
  }

  onSubmit(){
    this.FormModel.validate(valid => {
      if (valid) {
        this.loading = true
        this.$axios.post('/api/posts',{
          title: this.form.title,
          content: this.switchCheck ? this.form.content : this.form.content1
        }).then(response=>{
          this.$message.success(response.data.message || '保存成功')
          this.$router.push({path: '/posts'});
        }).catch(error=>{
          this.$message.error(error.response.data.message || '保存失败')
        }).finally(()=>{
          this.loading = false
        })
      }
    })
  }

  onEditorBlur(editor) {

  }
  onEditorFocus(editor) {

  }
  onEditorReady(editor) {

  }
  onEditorChange({ editor, html, text }) {
    this.form.content = html
  }

}
</script>

<style scoped lang="scss">
.new-post{
  padding: 0 32px;
  .new-post-in{
    padding: 24px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    height: calc(100vh - 132px);
    overflow: auto;
    @media (max-width: 1199px) {
      height: calc(100vh - 202px);
    }
    .new-post-title{
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 16px;
      color: #233167;
    }
    .new-post-form{
      padding: 24px 0 0 0;
    }
    .quill-editor {
      height: 200px;
      overflow-y: auto;
    }
  }
}
</style>
