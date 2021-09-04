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
  asyncData(ctx: Context): Promise<{ [key: string]: any } | never> | { [key: string]: any } {
    console.log('ctx', ctx.query);
    const user = {
      username: 'sgs'
    };
    return {
      query: ctx.query,
      user
    };
  }
})
export default class App extends Vue {
  query: { [key: string]: any } = {};
  user: User = {username: ''};
}
</script>
