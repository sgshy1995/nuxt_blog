<template>
  <div class="app">
    <a-layout v-show="readyLoad">
      <a-layout-sider>
        <a-menu :selectedKeys="selectedKeys">

          <a-menu-item key="index">
            <nuxt-link to="/">
              <a-icon type="appstore" /><span>首页</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="Posts">
            <nuxt-link to="/posts">
              <a-icon type="profile" /><span>博客</span>
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="Center">
            <nuxt-link to="/center">
              <a-icon type="user" /><span>个人信息</span>
            </nuxt-link>
          </a-menu-item>

        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <a-row :gutter="32">
            <a-col :md="24" :xl="14" :xxl="18">
              <div class="article-search">
                <a-input size="large" placeholder="请输入文章标题搜索">
                  <a-icon slot="suffix" type="search" style="color: #1081e8" />
                </a-input>
              </div>
            </a-col>
            <a-col :md="24" :xl="10" :xxl="6" :gutter="32" class="user-board" type="flex" justify="space-between" align="center" >
              <a-row class="info-out">
                <a-col span="7" class="user-message">
<!--                  <a-badge count="44" :numberStyle="{background: '#f82485', borderRadius: '50%', width: '24px', height: '24px', padding: '0', textAlign: 'center', lineHeight: '24px', fontSize: '12px'}">
                    <span class="tips">
                      <a-icon theme="filled" type="bulb" style="font-size: 18px;color: #1081e8" />
                    </span>
                  </a-badge>-->
                  <a-badge count="0" :numberStyle="{background: '#1081e8', borderRadius: '50%', width: '24px', height: '24px', padding: '0', textAlign: 'center', lineHeight: '24px', fontSize: '12px'}">
                    <span class="message">
                      <a-icon theme="filled" type="message" style="font-size: 18px;color: #1081e8" />
                    </span>
                  </a-badge>
                </a-col>
                <a-col span="2" class="divider">
                  <a-divider type="vertical" />
                </a-col>
                <a-col span="15" class="user-info">
                  <div v-if="userInfo && userInfo.id" class="ready-login">
                    <span class="user-name">欢迎您， <span>{{ userInfo.nickname }}</span></span>
                    <a-dropdown>
                      <a-avatar class="user-avatar" :src="userInfo.avatar || avatar" :size="38" />
                      <a-menu slot="overlay">
                        <a-menu-item @click="handleLogout">
                          <span>退出登录</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <div class="not-login" v-else>
                    <nuxt-link to="/login">
                      <a-button ghost size="small" type="link">
                        <span style="color: #1081e8">登录</span>
                      </a-button>
                    </nuxt-link>
                    <nuxt-link to="/register">
                      <a-button ghost size="small" type="link">
                        <span style="color: #1081e8">注册</span>
                      </a-button>
                    </nuxt-link>
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
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component({
  middleware: ['getUserInfo']
})
export default class GlobalLayout extends Vue {
  avatar:string = require('@/assets/avatar.jpeg')
  info: Info = this.$store.state.useragent.info
  baseUrl: string = process.env.BASE_URL;
  selectedKeys: string[] = []
  readyLoad: boolean = false

  get userInfo(){
    return this.$store.state.user.userInfo || null
  }

  mounted(){
    this.readyLoad = true
  }

  @Watch('$route',{deep:true,immediate:true})
  onRouteChange(){
    console.log('$route',this.$route)
    const key = this.$route.name
    this.selectedKeys = [key]
  }

  handleLogout(){
    this.$axios.post('/api/logout',{}).then(response=>{
      this.$notification.success({message: '退出登录', description: `请您重新登录`, duration: 4})
      this.$router.push({path:'/login'})
    }).catch(error=>{
      this.$notification.error({message: '退出登录失败', description: `请联系管理员`, duration: 4})
      console.log('error',error)
    })
  }
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

  /deep/ .ant-layout.ant-layout-has-sider{
    border: 2px solid #1081e8;
    flex-direction: row;
    display: flex;
  }

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
      padding: 32px 32px 0 32px;
      height: auto;
      line-height: unset;

      .article-search{
        width: 100%;
        margin-bottom: 32px;
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
        //justify-content: space-between;
        justify-content: center;
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
          margin-bottom: 32px;
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
        .not-login{
          margin-bottom: 32px;
        }
      }
    }
  }
}

/deep/ .ant-menu{
  padding: 24px;
  border: none;
  .ant-menu-item{
    border-radius: 10px;
    &.ant-menu-item-selected{
      background: #1081e8;
      color: #fff;
      > a{
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  /deep/ .ant-layout-sider{
    width: 50px !important;
    max-width: unset !important;
    min-width: unset !important;
    flex: 0 0 50px !important;
    .ant-menu{
      padding: 12px;
    }
    .ant-menu-item{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      i{
        margin-right: 0;
      }
    }
    .ant-menu-item span{
      display: none;
    }
  }
}
</style>
