<template>
  <div class="index">
    <section class="recent">
      <div class="recent-title">社区博客</div>
      <a-row class="blog-list" :gutter="24">
        <a-col :xs="24" :sm="12" :xl="6" :xxl="4" v-for="(u,index) in postsInList" :key="index">
          <div class="blog-item">
            <div style="white-space: nowrap">
              <div class="num">{{ index+1 }}</div>
              <div class="title"><nuxt-link :to="`/posts/${u.id}`">{{u.title}}</nuxt-link></div>
            </div>

            <div class="time">发表时间：{{ moment(u.createdAt,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') }}</div>
            <div class="author">作者：{{ u.author }}</div>
          </div>
        </a-col>
      </a-row>
<!--      <a-table rowKey="id" :columns="columns" :pagination="false" :data-source="postsInList" :locale="{emptyText: '暂无文章'}" :borderd="false">
        <span slot="no" slot-scope="text,record,index">
          {{ index+1 }}
        </span>
        <span slot="title1" slot-scope="text,record,index">
          <nuxt-link :to="`/posts/${record.id}`">{{record.title}}</nuxt-link>
        </span>
        <span slot="createdAt" slot-scope="text,record,index">
          {{ moment(text,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') }}
        </span>
      </a-table>-->
    </section>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Context} from '@nuxt/types';
import Tutorial from '@/components/Tutorial.vue';
import moment from 'moment';
import {Post} from '~/src/entity/Post';

@Component({
  components: {
    Tutorial
  },
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {
    const {$axios, error, req} = ctx;

    let postsInList:Post[] = []

    await $axios.get('/api/all_posts').then(response=>{
      postsInList = response.data.data
    })

    return {
      postsInList
    };
  },
  layout: 'GlobalLayout'
})
export default class App extends Vue {
  query: { [key: string]: any } = {};
  user: User = {username: ''};
  info: Info = {};
  moment: Function = moment

  columns:ColumnsInterface = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 80,
      scopedSlots: { customRender: 'no' },
    },
    {
      title: '文章标题',
      dataIndex: 'title1',
      key: 'title1',
      width: 200,
      scopedSlots: { customRender: 'title1' },
    },
    {
      title: '发表日期',
      width: 120,
      dataIndex: 'createdAt',
      key: 'createdAt',
      scopedSlots: { customRender: 'createdAt' },
    },
    {
      title: '标签',
      width: 120,
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: '评论数',
      key: 'comment',
      width: 80,
      dataIndex: 'comment',
      scopedSlots: { customRender: 'comment' },
    },
    {
      title: '喜欢',
      key: 'like',
      dataIndex: 'like',
      width: 80,
      scopedSlots: { customRender: 'like' },
    },
    {
      title: '分享',
      key: 'share',
      dataIndex: 'share',
      width: 80,
      scopedSlots: { customRender: 'share' },
    },
    {
      title: '浏览',
      key: 'view',
      dataIndex: 'view',
      width: 80,
      scopedSlots: { customRender: 'view' },
    },
  ]
  data: any[] = []

  mounted(){
    this.$axios.get('/api/all_posts').then(response=>{
      console.log('response',response)
    })
  }
}
</script>

<style scoped lang="scss">
.index{
  padding: 0 32px;
  .recent{
    width: 100%;
    padding: 24px;
    border-radius: 10px;
    background: #fff;
    box-sizing: border-box;
    height: calc(100vh - 132px);
    overflow: auto;
    @media (max-width: 1199px) {
      height: calc(100vh - 202px);
    }
    .ant-table-wrapper{
      width: 100%;
      overflow-x: auto;
    }
    .recent-title{
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 16px;
      color: #233167;
      padding-bottom: 24px;
    }
    .blog-item{
      border: 2px solid #aca9a9;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 24px;
      .num{
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        margin-bottom: 10px;
        background: #1081e8;
      }
      .title{
        display: inline-block;
        margin-left: 12px;
      }
      .time,.author{
        font-size: 12px;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    /deep/.ant-table{
      .ant-table-thead tr th{
        color: #9a9898;
        font-size: 14px;
      }
      .ant-table-placeholder{
        height: 192px;
        line-height: 160px;
      }
    }
  }
}
</style>
