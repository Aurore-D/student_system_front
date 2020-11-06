<template>
  <el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" status-icon ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="账号">
        <el-input v-model.number="dataForm.userId" readonly></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="dataForm.password" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="dataForm.newPassword" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="dataForm.confirmPassword" placeholder="确认密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit('dataForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

    export default {
        data() {

            var validatePass_old = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value !== this.$store.state.user.password) {
                        callback(new Error('您的密码输入错误'));
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.dataForm.confirmPassword !== '') {
                        this.$refs.dataForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.dataForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                visible: false,
                dataForm: {
                    userId: this.$store.state.user.userId,
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                dataRule: {
                    password: [{
                        validator: validatePass_old,
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    confirmPassword: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }]
                }
            }
        },

        methods: {
            // 初始化
            init() {
                this.visible = true
                // 初始化清空表单内容
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                })
            },
            // 表单提交，回到登录界面
            dataFormSubmit(formName) {

                var userId = this.$data.dataForm.userId,
                    newPassword = this.$data.dataForm.newPassword;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.login.updatePassword(userId, newPassword).then(res => {
                            if ("success" == res.data) {
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                this.visible = false;
                                this.$router.push({
                                    name: "Login"
                                })
                            } else {
                                this.$message.error('修改失败');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })

            }
        }
    }
</script>
