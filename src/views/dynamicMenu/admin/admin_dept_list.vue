<template>
  <div style="height: 460px">
    <!--添加dept的表单-->
    <el-dialog title="添加部门信息" :visible.sync="addDeptForm.dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="部门名称:">
          <el-input v-model="addDeptForm.dept_name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDeptForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDept">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改dept信息的表单-->
    <el-dialog title="修改部门信息" :visible.sync="updateDeptForm.dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="部门号:">
          <el-input readonly v-model="updateDeptForm.dept.deptNo"></el-input>
        </el-form-item>
        <el-form-item label="部门名称:">
          <el-input v-model="updateDeptForm.dept.deptName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDeptForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDeptById">确 定</el-button>
      </div>
    </el-dialog>


    <div style="margin-bottom:1% ">
      <!--主页面和查询功能-->
      <el-input v-model="dept_list.dept_name" placeholder="请输入要查询的部门名称" style="width: 17%"></el-input>
      <el-button @click="getAllDeptByPage">查询</el-button>
      <el-button @click="addDeptForm.dialogFormVisible = true">新增</el-button>
    </div>
    <el-table
      :data="dept_list.tableData"
      border
      style="width: 500px;margin-left:25%">
      <el-table-column
        fixed
        prop="deptNo"
        label="部门号" align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门名称" align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作" align="center" width="120"
      >
        <template slot-scope="scope">
          <el-button @click="getDeptById(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteDept(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change=""
      @current-change="getAllDeptByPage"
      :current-page.sync="dept_list.current_page"
      :page-size="dept_list.page_size"
      layout="total, prev, pager, next, jumper"
      :total="dept_list.total">
    </el-pagination>
  </div>
</template>

<script>
    import axios from 'axios';
    import http from '@/http/http.js'

    export default {
        name: "admin_dept_list",
        //数据
        data() {
            return {
                //主页面的数据
                dept_list: {
                    tableData: [],
                    total: 0,
                    page_size: 5,
                    current_page: 1,
                    dept_name: ""
                },
                //新增manager的数据
                addDeptForm: {
                    dialogFormVisible: false, //控制该表单是否显示
                    dept_name: '',
                },
                //修改manager的数据
                updateDeptForm: {
                    dialogFormVisible: false,
                    dept: []
                },

            }
        },
        //方法
        methods: {
            getAllDept: function () {

                /* axios.get("getAllDept", {
                   params: {
                     deptName: this.dept_list.dept_name
                   }
                 })*/

                var deptName = this.dept_list.dept_name;
                http.admin_dept_list.getAllDept(deptName).then(res => {
                    this.dept_list.total = res.data.length;
                })
            },
            getAllDeptByPage: function () {
                this.getAllDept();
                /* axios.get("getAllDeptByPage", {
                   params: {
                     pageSize: this.dept_list.page_size,
                     currentPage: this.dept_list.current_page,
                     deptName: this.dept_list.dept_name
                   }
                 })*/
                var pageSize = this.dept_list.page_size,
                    currentPage = this.dept_list.current_page,
                    deptName = this.dept_list.dept_name;
                http.admin_dept_list.getAllDeptByPage(pageSize, currentPage, deptName).then(res => {
                    this.dept_list.tableData = res.data;
                })
            },
            addDept: function () {
                this.addDeptForm.dialogFormVisible = false;
                /*axios.get("addDept", {
                    params: {
                        deptName: this.addDeptForm.dept_name
                    }
                })*/
                var deptName = this.addDeptForm.dept_name;
                http.admin_dept_list.addDept(deptName).then(res => {
                    this.getAllDeptByPage();
                    this.$message({
                        message: res.data,
                        type: 'success'
                    });
                })
            },
            deleteDept: function (dept) {
                this.$confirm('确定删除该部门信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*axios.get("deleteDept", {
                        params: {
                            deptNo: dept.deptNo
                        }
                    })*/
                    var deptNo = dept.deptNo;
                    http.admin_dept_list.deleteDept(deptNo).then(res => {
                        this.getAllDeptByPage();
                        this.$message({
                            message: res.data,
                            type: 'success'
                        });
                    })
                });
            },
            getDeptById: function (dept) {
                this.updateDeptForm.dialogFormVisible = true;
                /*axios.get("getDeptById", {
                    params: {
                        deptNo: dept.deptNo
                    }
                })*/
                var deptNo = dept.deptNo;
                http.admin_dept_list.getDeptById(deptNo).then(res => {
                    this.updateDeptForm.dept = res.data;
                })
            },
            updateDeptById: function () {
                this.$confirm('确定修改该部门经理信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateDeptForm.dialogFormVisible = false;
                    /*axios.get("updateDeptById", {
                        params: {
                            deptNo: this.updateDeptForm.dept.deptNo,
                            deptName: this.updateDeptForm.dept.deptName
                        }
                    })*/
                    var deptNo = this.updateDeptForm.dept.deptNo,
                        deptName = this.updateDeptForm.dept.deptName;
                    http.admin_dept_list.updateDeptById(deptNo, deptName).then(res => {
                        this.getAllDeptByPage();
                        this.$message({
                            message: res.data,
                            type: 'success'
                        });
                    })
                });
            },

        },
        //生命周期钩子
        mounted() {  //编译后去获取数据
            this.getAllDeptByPage();
        }
    }
</script>

<style scoped>

</style>
