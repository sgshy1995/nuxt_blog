<template>
  <Tutorial :user="user" :info="info"/>
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

    // ssr userinfo
    let user: User = {
      username: ''
    };
    const response = await $axios.$post('/api/userinfo');
    if (response && response.status) {
      user = response.data;
    }
    return {
      query: ctx.query,
      user,
      info
    };
  },
  layout: 'GlobalLayout'
})
export default class App extends Vue {
  query: { [key: string]: any } = {};
  user: User = {username: ''};
  info: Info = {};
}
</script>
