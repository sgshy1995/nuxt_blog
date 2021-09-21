<template>
  <div class="index">
    <section class="recent">
      <div class="recent-title">最近文章</div>
      <a-table :columns="columns" :data-source="data" :locale="{emptyText: '暂无文章'}" size="small" :borderd="false">

      </a-table>
    </section>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Context} from '@nuxt/types';
import Tutorial from '@/components/Tutorial.vue';
import {UAParser} from 'ua-parser-js';

@Component({
  components: {
    Tutorial
  },
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {

    if (process.server){
      const {$axios, error, req} = ctx;

      // 获取 user-agent
      const ua = req.headers['user-agent'];
      const info = new UAParser(ua).getResult();
      Object.keys(info).map(key => {
        const infoInner: any = (info as any)[key];
        Object.keys(infoInner).map(keyIn => {
          if (!infoInner[keyIn]) infoInner[keyIn] = null;
        });
      });

      /*await ctx.store.dispatch('user/setUserInfo',{
        username: 'sgs',
        avatar: '123',
        nickname: 'haha',
        id: 1
      })*/

      // ssr userinfo
      let user: User = {
        username: ''
      };
      /*const response = await $axios.$post('/api/userinfo');
      if (response && response.status) {
        user = response.data;
      }*/
      return {
        query: ctx.query,
        user,
        info
      };
    }
  },
  layout: 'GlobalLayout',
  mounted(){

  }
})
export default class App extends Vue {
  query: { [key: string]: any } = {};
  user: User = {username: ''};
  info: Info = {};

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
      dataIndex: 'title',
      key: 'title',
      width: 200,
      scopedSlots: { customRender: 'title' },
    },
    {
      title: '发表日期',
      width: 120,
      dataIndex: 'created_at',
      key: 'created_at',
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
    .recent-title{
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 16px;
      color: #233167;
      padding-bottom: 24px;
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
