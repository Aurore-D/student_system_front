<template>
  <div style="height: 460px">
    <div style="margin-bottom:10px ; margin-left:41%">
      <el-button type="danger" @click="repassword">密码重置</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 600px;margin-left:20%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户编号"
        width="150" sortable align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="150" sortable align="center">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change=""
      @current-change="getAllUsersByPage"
      :current-page.sync="current_page"
      :page-size="page_size"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
        total: 0,
        page_size: 5,
        current_page: 1,
        multipleSelection: []
      }
    },
    //方法
    methods: {
      getAllUsers: function () {
        /*axios.get("getAllUserlogin")*/
        http.admin_userlogin_list.getAllUserlogin().then(res => {
          this.total = res.data.length;
        })
      },
      getAllUsersByPage: function () {
        this.getAllUsers();
        var pageSize = this.page_size,
          currentPage = this.current_page;
        http.admin_userlogin_list.getAllUserloginByPage(pageSize, currentPage).then(res => {
          this.tableData = res.data;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      repassword: function () {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定重置选中用户密码为\'123456\' ?', '提示', {
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
              this.getAllUsersByPage();
              this.$message({
                message: res.data,
                type: 'success'
              });
            })
          });
        } else {
          this.$message({
            message: "请至少选择一条数据",
            type: 'warning'
          })
        }
      },

    },
    //钩子
    mounted() {  //编译后去获取数据
      this.getAllUsersByPage();
    }
  }
</script>

<style scoped>

</style>
