<template>
  <div style="height: 460px">
    <el-table
      ref="multipleTable"
      :data="tableData"
      height="400"
      border
      tooltip-effect="dark"
      style="width: 600px;margin-left:20%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55" >
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户编号"
        width="150" sortable align="right">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="150" sortable align="center">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;margin-left:40%">
      <el-button @click="repassword">重置密码</el-button>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import http from '@/http/http.js'

    export default {
        name: "admin_userlogin_list",
        //数据
        data() {
            return {
                tableData: [],
                multipleSelection: []
            }
        },
        //方法
        methods: {
            getAllUsers: function () {
                /*axios.get("getAllUserlogin")*/
                http.admin_userlogin_list.getAllUserlogin().then(res => {
                    this.tableData = res.data;
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            repassword: function () {

                this.$confirm('确定重置选中用户密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*axios({
                        method: 'post',
                        url: 'repassword',
                        data: this.multipleSelection
                    })*/
                    var data = this.multipleSelection;
                    http.admin_userlogin_list.repassword(data).then(res => {
                        this.getAllUsers();
                        this.$message({
                            message: res.data,
                            type: 'success'
                        });
                    })
                });
            },

        },
        //钩子
        mounted() {  //编译后去获取数据
            this.getAllUsers();
        }
    }
</script>

<style scoped>

</style>
