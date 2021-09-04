<template>
  <Tutorial :user="user"/>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Context} from '@nuxt/types';

type User = {
  username: string;
}

@Component({
  async asyncData(ctx: Context): Promise<{ [key: string]: any; } | never> {
    console.log('ctx', ctx.query);
    const user = {
      username: 'sgs'
    };
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(user);
      }, 0);
    });
    const user_get = await promise;
    return {
      query: ctx.query,
      user: user_get
    };
  },
  layout: 'GlobalLayout',
  mounted(this: App) {
    console.log('mounted', this.user);
  }
})
export default class App extends Vue {
  query: { [key: string]: any } = {};
  user: User = {username: ''};
}
</script>
