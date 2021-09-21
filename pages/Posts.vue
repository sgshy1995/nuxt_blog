<template>
  <div class="posts-page">
    <div class="posts-list">
      <div class="posts-list-title">
        博客列表
      </div>
      <div class="posts-exist" v-if="postsInList.length">
        <a-row class="posts-list-item" v-for="(u,index) in postsInList" :key="index">
          <a-col :xs="4" :sm="4" :xl="2" :xxl="1" class="num">
            <span>{{ index+1 }}</span>
          </a-col>
          <a-col :xs="20" :sm="20" :xl="12" :xxl="13" class="title"><nuxt-link :to="`/posts/${u.id}`">{{ u.title }}</nuxt-link></a-col>
          <a-col :xs="24" :sm="8" :xl="4" :xxl="4" class="time">{{ moment(u.createdAt,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss') }}</a-col>
          <a-col :xs="24" :sm="16" :xl="6" :xxl="4" class="action">
            <a-button icon="form" size="small">
              <nuxt-link :to="`/editpost/${u.id}`"><span style="padding-left: 8px">编辑</span></nuxt-link>
            </a-button>
            <a-button icon="eye" size="small">
              <nuxt-link :to="`/posts/${u.id}`"><span style="padding-left: 8px">查看</span></nuxt-link>
            </a-button>
          </a-col>
        </a-row>
        <div class="write-blog">
          <a-button icon="edit" type="primary">
            <nuxt-link to="/newpost"><span style="color:#fff;padding-left: 8px">写博客</span></nuxt-link>
          </a-button>
        </div>

      </div>
      <div class="posts-empty" v-else>
        <div class="empty-title">你还未写过博客，快去创建吧</div>
        <a-button icon="edit" type="primary">
          <nuxt-link to="/newpost"><span style="color:#fff;padding-left: 8px">写博客</span></nuxt-link>
        </a-button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Post} from '@/src/entity/Post';
import moment from 'moment'
import {Context} from '@nuxt/types';

@Component({
  layout: 'GlobalLayout',
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {


    const {$axios, error, req} = ctx;

    let postsInList:Post[] = []

    await $axios.get('/api/posts').then(response=>{
      postsInList = response.data.data
    })

    return {
      postsInList
    };
  }
})
export default class Posts extends Vue{
  postsList:Post[] = []
  moment: Function = moment

  mounted(){

  }
}
</script>

<style scoped lang="scss">
.posts-page{
  padding: 0 32px;
  .posts-list{
    padding: 24px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    height: calc(100vh - 132px);
    overflow: auto;
    @media (max-width: 1199px) {
      height: calc(100vh - 202px);
    }
    .posts-list-title{
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 16px;
      color: #233167;
    }
    .posts-list-item{
      padding: 12px 0;
      border-bottom: 1px solid #47494E;
      .num{
        span{
          background: #1081e8;
          color: #fff;
          display: inline-block;
          width: 18px;
          text-align: center;
          border-radius: 4px;
        }

      }
      .action{
        .ant-btn {
          color: #1081e8;
          border-color: #1081e8;
          span{
            color: #1081e8;
          }
        }
      }
    }
    .write-blog{
      width: 100%;
      text-align: center;
      margin-top: 24px;
    }
    .posts-empty{
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .empty-title{
        padding-bottom: 48px;
        font-family: PingFangSC-Medium, sans-serif;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
