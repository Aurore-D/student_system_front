<template>
  <div class="header">
    <!-- 是否展开侧边栏 -->
    <div class="header-title" @click="foldOrOpen">
      <a class="el-icon-s-fold" v-if="foldAside" :title="title.foldAside"></a>
      <a class="el-icon-s-unfold" v-else :title="title.unFoldAside"></a>
    </div>
    <!-- 设置、文档、用户设置等 -->
    <div class="header-menu">
      <el-menu mode="horizontal" class="header-menu-submenu">

        <!-- 帮助文档 -->
        <el-submenu :title="title.help" index="2">
          <template slot="title">
            <i class="el-icon-info"></i>{{title.help}}
          </template>
          <el-menu-item index="2-1" @click="open_introduce">
            <i class="el-icon-position"></i>{{title.introduce}}
          </el-menu-item>
          <el-menu-item index="2-2" @click="open_about">
            <i class="el-icon-link"></i>{{title.about}}
          </el-menu-item>
        </el-submenu>
        <!-- 用户设置  -->
        <el-submenu :title="title.userSetUp" index="3">
          <template slot="title">
						<span class="header-span">
							<img src="~@/assets/logo01.jpg" :alt="userName"> {{ title.userName }}
						</span>
          </template>
          <el-menu-item index="3-1" @click="showPasswordBox">
            <i class="el-icon-edit"></i>{{title.updatePassword}}
          </el-menu-item>
          <el-menu-item index="3-2" @click="logout">
            <i class="el-icon-close"></i>{{title.logOut}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 密码修改框 -->
    <UpdatePassword v-if="updatePasswordVisible" ref="updatePassowrd"></UpdatePassword>

  </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import {
        removeToken
    } from '@/http/auth.js'
    import UpdatePassword from '@/views/home/UpdatePassword.vue'


    export default {
        name: 'Header',
        data() {
            return {
                // 是否展开侧边栏
                foldAside: true,
                // 默认用户名
                // userName: '',
                // 是否展开密码框
                updatePasswordVisible: false

            }
        },
        components: {
            // 引入密码框组件
            UpdatePassword,


        },
        computed: {
            //...mapState('user', {userName: 'userName'}),
            ...mapState('user', ['userName', 'userId', 'password', 'role']),

            title() {
                return {
                    foldAside: "折叠侧边栏",
                    unFoldAside: "展开侧边栏",
                    setUp: "设置",
                    help: "帮助",
                    introduce: "使用说明",
                    about: "关于作者",
                    userSetUp: "用户设置",
                    updatePassword: "修改密码",
                    logOut: "退出",
                    userName: this.userName
                }
            }
        },
        methods: {
            // 展开密码修改框
            showPasswordBox() {
                this.updatePasswordVisible = true
                // this.$nextTick 表示数据渲染后，执行密码框初始化
                this.$nextTick(() => {
                    this.$refs.updatePassowrd.init()
                })
            },
            // 展开、折叠侧边栏
            foldOrOpen() {
                this.foldAside = !this.foldAside
                // this.$emit 用于触发父组件的方法，并传递参数值
                this.$emit("foldOrOpenAside", this.foldAside)
            },
            open_introduce() {
                this.$alert(
                    '<div style="margin-left: 20px">' +
                    '如发现bug，还请速速联系作者 <a href="mailto:XXX@163.com"><i class="el-icon-message"></i></a>' +
                    '</div>',
                    '使用说明',
                    {
                        dangerouslyUseHTMLString: true
                    }
                );
            },
            open_about() {
                this.$alert(
                    '<div style="margin-left: 20px">' +
                    '蔡保标 刘凯 王玥 夏博阳<br>感谢以上人员的支持（排名不分前后）' +
                    '</div>',
                    '关于作者',
                    {
                        dangerouslyUseHTMLString: true
                    }
                );
            },
            // 退出登录，回到登录界面
            logout() {
                /**********************************************************笨办法*****好处：不用刷新页面*********************************************/
                //移除localStore中的值
                localStorage.removeItem('state')
                //移除cookie存的token
                removeToken()
                //全局路由导航守卫的是否添加动态路由置false
                this.$router.options.isAddDynamicMenuRoutes = false;
                //跳转登录页面
                this.$router.push("/Login")
            }
        }
    }
</script>

<style>
  .header {
    padding: 0 10px;
    display: flex;
    height: 50px;
    line-height: 50px;
    background: url('../../assets/bg01.jpg') 270px;

  }

  .header-title {
    height: 30px;
    width: 30px;
    float: left;
    font-size: 30px;
    cursor: pointer;

  }

  .header-menu {
    height: 50px;
    width: 100%;
    flex: 1;
    line-height: 50px;
    font-size: 30px;

  }

  .header-menu-submenu {
    float: right;
  }

  .header-submenu-a {
    text-decoration: none;
    color: rgba(64, 64, 64, 0.47);
    font-weight: lighter;
    font-size: 14px;
  }

  .header-submenu-a:hover {
    /*background-color: rgba(168,168,168,0.47);*/
    color: black;
  }

  .el-menu--horizontal > .el-menu-item,
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 50px !important;
    line-height: 50px !important;
  }

  .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    min-width: auto !important;
  }


  .header-span img {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 5px 10px 10px 10px;
  }

  .header-span {
    font-size: 20px;
  }


</style>
