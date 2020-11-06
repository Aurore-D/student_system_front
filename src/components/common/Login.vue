<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-main">
        <h2 class="login-main-title" style="font-weight: lighter">员工成长跟踪系统</h2>
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
          <el-form-item prop="userId">
            <el-input prefix-icon="el-icon-user"  v-model.number="dataForm.userId"   placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="dataForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    import {
        setToken,
        getToken
    } from '@/http/auth.js'

    export default {
        data() {
            return {
                dataForm: {
                    userId: '',
                    password: ''
                },
                dataRule: {
                    userId: [{

                        required: true,
                        message: '账户不能为空且只能为数字',
                        trigger: 'blur'
                    },
                        {
                            type: 'number',
                            message: '账户只能为数字',
                            trigger: 'blur'
                        }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            ...mapActions('user', ['updateName','updateId','updatePwd','updateRole']),
            ...mapActions('common', {
                resetState: "resetState"
            }),

            // 提交表单
            dataFormSubmit() {
                //获取用户输入
                var userId = this.$data.dataForm.userId,
                    password = this.$data.dataForm.password;
                //rules的验证
                this.$refs.dataForm.validate((valid) => {
                    //如果表单验证通过执行if后的内容
                    if (valid) {

                        //封装的axios交互,getToken所在文件的路径；：src/http/modules/login.js
                        this.$http.login.login_getToken(userId, password).then(response => {
                                if (response.data.message == "success") {
                                    console.log(response);
                                    this.$message({
                                        message: "登陆成功",
                                        type: 'success'
                                    })
                                    // 保存 token
                                    setToken(response.data.token)
                                   /* this.$message({
                                        message: getToken(),
                                        type: 'success'
                                    })*/
                                    //vuex store
                                    this.updateName(response.data.userlogin.userName)
                                    this.updateId(response.data.userlogin.userId)
                                    this.updatePwd(response.data.userlogin.password)
                                    this.updateRole(response.data.userlogin.role)

                                    localStorage.setItem("store", JSON.stringify(this.$store.state))
                                    //跳转
                                    this.$router.push({
                                        name: 'Home'
                                    })
                                } else {
                                    this.$message({
                                        message: response.data.message,
                                        type: 'error'
                                    })
                                }
                            }
                        ).catch((error)=>{
                            this.$message(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })

            }
        },
        created() {
            // 进入画面前，移除主页面保存的 state 信息
            localStorage.removeItem("store")
            this.resetState()
        }
    }
</script>

<style>
  .login-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: rgba(38, 50, 56, .6);
    background: url(../../assets/bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .login-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    margin: auto;
    height: 300px;
    width: 400px;
    background-color: #112234;
    opacity: .8;
  }

  .login-main {
    color: beige;
    padding: 20px 20px 10px 20px;
  }

  .el-scrollbar__wrap {
    overflow-x: scroll !important;
  }

  .login-select {
    left: -120px;
    width: 120px;
  }
</style>
