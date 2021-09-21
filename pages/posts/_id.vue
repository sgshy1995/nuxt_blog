<template>
  <div class="post-detail">
    <div class="post-detail-in">
      <div class="title">{{ postInfo && postInfo.title }}</div>
      <div class="content" v-if="postInfo">
        <vue-markdown :source="postInfo.content"></vue-markdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Context} from '@nuxt/types';
import marked from 'marked';
import VueMarkdown from 'vue-markdown'

@Component({
  layout: 'GlobalLayout',
  components: {
    VueMarkdown
  },
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {


    const id = ctx.params.id

    const {$axios, error, req} = ctx;

    let postInfo:{id:number,title:string,content:string} = {id:0, title:'', content:''}

    await $axios.get(`/api/posts/${id}`).then(response=>{
      postInfo = response.data.data || null
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
      postHtml
    };
  }
})
export default class PostDetail extends Vue{
  marked: Function = marked
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
    }
    .content{
      width: 100%;
      height: calc(100% - 30px);
      overflow-y: auto;
    }
  }
}
</style>
