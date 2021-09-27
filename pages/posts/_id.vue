<template>
  <div class="post-detail">
    <div class="post-detail-in">
      <div class="title">
        {{ postInfo && postInfo.title }}
        <div class="title-info">
          <span>作者：{{ postInfo.author }}</span>
          <span>创作日期：{{ moment(postInfo.createdAt,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') }}</span>
          <span>最后编辑：{{ moment(postInfo.updatedAt,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') }}</span>
        </div>
      </div>
      <div class="content markdown-body" v-if="postInfo">
        <vue-markdown :source="postInfo.content"></vue-markdown>
        <div class="content-comments">
          <div class="content-comments-title">
            <a-icon type="bulb" theme="filled" />
            <span>评论</span>
          </div>
          <div class="content-comments-content" v-if="discussionList.length">
            <div class="comments-item" v-for="(u,index) in discussionList" :key="index">
              <a-avatar :src="u.user.avatar || avatar" :size="28"></a-avatar>
              <span class="item-name">{{ u.user.nickname }}</span>
              <span class="item-time">于 <span style="padding: 0">{{ moment(u.createdAt,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') }}</span> 评论了：</span>
              <div class="item-content">{{ u.content }}</div>
            </div>
          </div>
          <div class="content-comments-no-content" v-else>
            暂无评论，快来评论吧
          </div>
          <div class="content-comments-form">
            <a-form-model ref="FormModel" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="" prop="content">
                <a-textarea v-model="form.content" :rows="6" placeholder="请输入评论">

                </a-textarea>
              </a-form-model-item>
              <a-form-model-item style="margin-bottom: 0">
                <div class="button-wrapper">
                  <a-button type="primary" @click="onSubmit" :loading="loading">
                    保存
                  </a-button>
                </div>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Ref} from 'vue-property-decorator';
import {Context} from '@nuxt/types';
import marked from 'marked';
import VueMarkdown from 'vue-markdown'
import moment from 'moment';
import {FormModel} from 'ant-design-vue';

@Component({
  layout: 'GlobalLayout',
  components: {
    VueMarkdown
  },
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {


    const id = ctx.params.id

    const {$axios, error, req} = ctx;

    let postInfo:{id:number,title:string,content:string} = {id:0, title:'', content:''}
    let discussionList:{content: string, user:{nickname: string, avatar: string, createdAt: string}}[] = []

    await $axios.get(`/api/posts/${id}`).then(response=>{
      console.log('response--post',response.data.data)
      postInfo = response.data.data || null
    })

    await $axios.get(`/api/discuss/${postInfo.id}`).then(response=>{
      console.log('response--discuss-list',response.data.data)
      discussionList = response.data.data.discussionList || []
    })

    const renderMd = new marked.Renderer();
    marked.setOptions({
      renderer: renderMd,
      gfm: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      // 这个配置实际放到 highlight.js,然后在 main.js 引入
      //highlight: function(code) {
      //  return require("highlight.js").highlightAuto(code).value;
      //}
    })
    const postHtml = marked(postInfo.content,{sanitize: true})

    return {
      postInfo,
      postHtml,
      discussionList
    };
  }
})
export default class PostDetail extends Vue{
  @Ref('FormModel') FormModel!: FormModel;

  marked: Function = marked
  moment: Function = moment
  avatar:string = require('@/assets/avatar.jpeg')
  labelCol: SpaceColInterface = {span: 24};
  wrapperCol: SpaceColInterface = {span: 24};
  loading = false
  form: FormInterface = {
    content: ''
  }
  rules: FormRule = {
    content: [{required: true, message: '请输入评论内容', trigger: 'blur'}]
  }
  postInfo:{id:number,title:string,content:string} = {id:0, title:'', content:''}

  onSubmit(){
    this.FormModel.validate(valid => {
      if (valid) {
        this.loading = true
        this.$axios.post('/api/discuss',{
          id: this.postInfo.id,
          content: this.form.content
        }).then(response=>{
          this.$message.success(response.data.message || '保存成功')
          this.$router.go(0)
        }).catch(error=>{
          this.$message.error(error.response.data.message || '保存失败')
        }).finally(()=>{
          this.loading = false
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">
.post-detail{
  padding: 0 32px;
  .post-detail-in{
    padding: 24px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    height: calc(100vh - 132px);
    @media (max-width: 1199px) {
      height: calc(100vh - 202px);
    }
    .title{
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 20px;
      color: #333;
      padding-bottom: 24px;
      .title-info{
        font-size: 12px;
        font-weight: normal;
        font-family: PingFangSC-Regular, sans-serif;
        span{
          padding-right: 2em;
        }
      }
    }
    .content{
      width: 100%;
      height: calc(100% - 74px);
      overflow-y: auto;
      .content-comments{
        margin-top: 48px;
        width: 100%;
        border-radius: 10px;
        border: 2px solid rgba(35, 49, 103, 0.29);
        padding: 24px;
        .content-comments-title{
          padding-bottom: 12px;
          color: #28bfbf;
        }
        .content-comments-no-content{
          padding: 12px 0 24px 0;
          color: #9a9898;
          font-size: 14px;
        }
        .content-comments-content{
          padding-bottom: 24px;
          .comments-item{
            padding: 12px 0 12px 0;
            &:not(:last-child){
              border-bottom: 1px solid #9a9898;
            }
            .item-name{
              padding-left: 12px;
            }
            .item-time{
              font-size: 12px;
              color: #9a9898;
              padding-left: 12px;
            }
            .item-content{
              color: #4e5969;
              font-size: 14px;
              padding-top: 12px;
            }
          }
        }
        .content-comments-form{

        }
      }
    }
  }
}
</style>
