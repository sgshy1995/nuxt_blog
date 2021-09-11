<template>
  <div class="app">
    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-row :gutter="32">
            <a-col span="18">
              <div class="article-search">
                <a-input size="large" placeholder="请输入文章标题搜索">
                  <a-icon slot="suffix" type="search" style="color: #1081e8" />
                </a-input>
              </div>
            </a-col>
            <a-col span="6" :gutter="32" class="user-board" type="flex" justify="space-between" align="center" >
              <a-row class="info-out">
                <a-col span="6" class="user-message">
                  <a-badge count="44" :numberStyle="{background: '#f82485', borderRadius: '50%', width: '24px', height: '24px', padding: '0', textAlign: 'center', lineHeight: '24px', fontSize: '12px'}">
                    <span class="tips">
                      <a-icon theme="filled" type="bulb" style="font-size: 18px;color: #1081e8" />
                    </span>
                  </a-badge>
                  <a-badge count="9987" :numberStyle="{background: '#1081e8', borderRadius: '50%', width: '24px', height: '24px', padding: '0', textAlign: 'center', lineHeight: '24px', fontSize: '12px'}">
                    <span class="message">
                      <a-icon theme="filled" type="message" style="font-size: 18px;color: #1081e8" />
                    </span>
                  </a-badge>
                </a-col>
                <a-col span="2" class="divider">
                  <a-divider type="vertical" />
                </a-col>
                <a-col span="16" class="user-info">
                  <a-tooltip v-if="userInfo">
                    <div slot="title">
                      <div style="margin-bottom: 24px">您的浏览器是 <div class="info-tips">{{ (info.browser && info.browser.name) || '未知' }}</div>版本为 <div class="info-tips">{{ (info.browser && info.browser.version) || '未知' }}</div></div>
                      <div style="margin-bottom: 24px">您的操作系统是 <div class="info-tips">{{ (info.os && info.os.name) || '未知' }}</div>版本为 <div class="info-tips">{{ (info.os && info.os.version) || '未知' }}</div></div>
                      <div>您的设备型号是 <div class="info-tips">{{ (info.device && info.device.type) || '未知' }}</div></div>
                    </div>
                    <div class="ready-login">
                      <span class="user-name">欢迎您， <span>{{ '南屋流星' }}</span></span>
                      <a-avatar class="user-avatar" :src="avatar" :size="38" />
                    </div>
                  </a-tooltip>
                  <div class="not-login" v-else>
                    <a-button ghost size="small" type="link">
                      <span style="color: #1081e8">登录</span>
                    </a-button>
                    <a-button ghost size="small" type="link">
                      <span style="color: #1081e8">注册</span>
                    </a-button>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content>
          <nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>

  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {UserState} from '~/store/user';

@Component
export default class GlobalLayout extends Vue {
  avatar:string = require('@/assets/avatar.jpeg')
  info: Info = this.$store.state.useragent.info
  userInfo:UserState = this.$store.state.user.userInfo || null
}
</script>

<style lang="scss" scoped>
.info-tips{
  color: #1081e8;
}

.app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .ant-layout{
    height: 100%;
    width: 100%;

    .ant-layout-content{
      background: #f8f8f8;
    }

    .ant-layout-sider{
      background: #fff;
    }

    .ant-layout-header{
      background: #f8f8f8;
      padding: 32px;
      height: auto;
      line-height: unset;

      .article-search{
        width: 100%;
        /deep/.ant-input{
          font-size: 14px;
          border-radius: 10px;
          border: none;
        }
        .ant-input-suffix i{
          font-size: 16px;
        }
      }

      .info-out{
        height: 40px;
      }

      .user-message{
        display: flex;
        justify-content: space-between;
        align-items: center;
        > span{
          width: 38px;
          height: 38px;
          display: inline-flex;
          background: #fff;
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }

      .divider{
        height: 40px;
        .ant-divider{
          height: 40px;
        }
      }

      .user-info{

        .ready-login{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .user-name{
            flex-shrink: 0;
            display: inline-block;
            margin-right: 32px;
            font-size: 12px;
            color: #233167;
            > span{
              font-family: PingFangSC-Medium, sans-serif;
              font-size: 16px;
            }
          }
          .user-avatar{
            flex-shrink: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
