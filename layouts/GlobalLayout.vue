<template>
  <div class="global-layout">
    <div class="layout-header">这是公共的头部</div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class GlobalLayout extends Vue {

}
</script>

<style lang="scss" scoped>
.global-layout .layout-header{
  height: 100px;
  line-height: 100px;
}
</style>
