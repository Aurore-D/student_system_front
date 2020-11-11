<template xmlns:v-model="">
  <div style="height: 460px">
    <!--添加manager的表单-->
    <el-dialog title="添加部门经理信息" :visible.sync="addManagerForm.dialogFormVisible" width="30%">
      <el-form :model="addManagerForm" label-width="80px" :rules="rules" ref="addManagerForm" class="demo-ruleForm">
        <el-form-item label-width="100px" label="姓名:" prop="manager_name">
          <el-input v-model="addManagerForm.manager_name" placeholder="请输入部门经理姓名" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="所属部门:" prop="dept_name">
          <el-select v-model="addManagerForm.dept_name" placeholder="请选择所属部门" style="width: 80%">
            <el-option v-for="i in (addManagerForm.dept.length)" :key="i" v-model:label="addManagerForm.dept[i-1]"
                       v-model:value="addManagerForm.dept[i-1]"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addManagerForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManager('addManagerForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改manager信息的表单-->
    <el-dialog title="修改部门经理信息" :visible.sync="updateManagerForm.dialogFormVisible" width="30%">
      <el-form :model="updateManagerForm" label-width="80px" :rules="rules" ref="updateManagerForm"
               class="demo-ruleForm">
        <el-form-item label-width="100px" label="工号:">
          <el-input readonly v-model="updateManagerForm.manager_id" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="姓名:" prop="manager_name">
          <el-input v-model="updateManagerForm.manager_name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="所属部门:">
          <el-select v-model="updateManagerForm.dept_name" style="width: 80%">
            <el-option v-for="i in (updateManagerForm.dept.length)" :key="i" v-model:label="updateManagerForm.dept[i-1]"
                       v-model:value="updateManagerForm.dept[i-1]"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateManagerForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateManagerById('updateManagerForm')">确 定</el-button>
      </div>
    </el-dialog>

    <div style="margin-bottom:1% ">
      <!--主页面和查询功能-->
      <el-input v-model="manager_list.manager_name" placeholder="请输入要查询的部门经理姓名" style="width: 20%"></el-input>
      <el-button type="primary" @click="getAllManagerByPage">查询</el-button>
      <el-button type="primary" @click="addManagerForm.dialogFormVisible = true">新增</el-button>
      <el-button type="danger" @click="batchdelete">删除</el-button>
    </div>

    <el-table
      :data="manager_list.tableData"
      border
      style="width: 550px;margin-left:25%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="manager_id"
        label="部门经理工号" align="center"
        width="120">
      </el-table-column>

      <el-table-column
        prop="manager_name"
        label="部门经理姓名" align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dept_name"
        label="所属部门" align="center"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="130"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="getManagerById(scope.row)" size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteManager(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change=""
      @current-change="getAllManagerByPage"
      :current-page.sync="manager_list.current_page"
      :page-size="manager_list.page_size"
      layout="total, prev, pager, next, jumper"
      :total="manager_list.total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';
  import http from '@/http/http.js'

  export default {
    name: "admin_manager_list",
    //数据
    data() {
      return {
        //主页面和搜索功能的数据
        manager_list: {
          tableData: [],
          total: 0,
          page_size: 5,
          current_page: 1,
          manager_name: "",
          multipleSelection: []
        },
        //新增manager的数据
        addManagerForm: {
          dialogFormVisible: false, //控制该表单是否显示
          manager_name: '',
          dept_name: '',
          dept: [],
        },
        //修改manager的数据
        updateManagerForm: {
          dialogFormVisible: false,
          manager_id: 0,
          manager_name: '',
          dept_name: '',
          dept: []
        },
        rules: {
          'manager_name': [
            {required: true, message: '经理姓名不可为空', trigger: 'blur'}
          ],
          'dept_name': [
            {required: true, message: '部门名称不可为空', trigger: 'blur'}
          ],
        }

      }
    },
    //方法
    methods: {
      getAllManager: function () {
        /* axios.get("getAllManager", {
           params: {
             managerName: this.manager_list.manager_name
           }
         })*/
        var managerName = this.manager_list.manager_name;
        http.admin_manager_list.getAllManager(managerName).then(res => {
          this.manager_list.total = res.data.length;
        })
      },
      getAllManagerByPage: function () {
        this.getAllManager();
        /*axios.get("getAllManagerByPage", {
          params: {
            pageSize: this.manager_list.page_size,
            currentPage: this.manager_list.current_page,
            managerName: this.manager_list.manager_name
          }
        })*/
        var pageSize = this.manager_list.page_size,
          currentPage = this.manager_list.current_page,
          managerName = this.manager_list.manager_name;
        http.admin_manager_list.getAllManagerByPage(pageSize, currentPage, managerName).then(res => {
          this.manager_list.tableData = res.data;
        })
      },
      getAllDept_name: function () {
        /*axios.get("getAllDept_name")*/
        http.admin_manager_list.getAllDept_name().then(res => {
          this.addManagerForm.dept = res.data;
          this.updateManagerForm.dept = res.data;
        })
      },
      addManager: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addManagerForm.dialogFormVisible = false;
            /*axios.get("addManager", {
        params: {
          managerName: this.addManagerForm.manager_name,
          deptName: this.addManagerForm.dept_name
        }
      })*/
            var managerName = this.addManagerForm.manager_name,
              deptName = this.addManagerForm.dept_name;
            http.admin_manager_list.addManager(managerName, deptName).then(res => {
              this.getAllManagerByPage();
              this.$message({
                message: res.data,
                type: 'success'
              });
            })
          } else {
            return false;
          }
        })
      },
      deleteManager: function (manager) {
        this.$confirm('确定删除该部门经理信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*axios.get("deleteManager", {
              params: {
                  managerId: manager.manager_id
              }
          })*/
          var managerId = manager.manager_id;
          http.admin_manager_list.deleteManager(managerId).then(res => {
            this.getAllManagerByPage();
            this.$message({
              message: res.data,
              type: 'success'
            });
          })
        });
      },
      getManagerById: function (manager) {
        this.updateManagerForm.dialogFormVisible = true;
        /*axios.get("getManagerById", {
            params: {
                managerId: manager.manager_id
            }
        })*/
        var managerId = manager.manager_id;
        http.admin_manager_list.getManagerById(managerId).then(res => {
          this.updateManagerForm.manager_id = res.data.managerId;
          this.updateManagerForm.manager_name = res.data.managerName;
          this.updateManagerForm.dept_name = res.data.deptName;
        })
      },
      updateManagerById: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确定修改该部门经理信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.updateManagerForm.dialogFormVisible = false;
              /*axios.get("updateManagerById", {
            params: {
                managerId: this.updateManagerForm.manager_id,
                managerName: this.updateManagerForm.manager_name,
                deptName: this.updateManagerForm.dept_name
            }
        })*/
              var managerId = this.updateManagerForm.manager_id,
                managerName = this.updateManagerForm.manager_name,
                deptName = this.updateManagerForm.dept_name;
              http.admin_manager_list.updateManagerById(managerId, managerName, deptName).then(res => {
                this.getAllManagerByPage();
                this.$message({
                  message: res.data,
                  type: 'success'
                });
              })
            })
          } else {
            return false;
          }
        });
      },
      handleSelectionChange(val) {
        this.manager_list.multipleSelection = val;
      },
      batchdelete: function () {
        if (this.manager_list.multipleSelection.length > 0) {
          this.$confirm('确定删除选中部门经理信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            /*axios({
                method: 'post',
                url: 'repassword',
                data: this.multipleSelection
            })*/
            var data = this.manager_list.multipleSelection;
            http.admin_manager_list.batchdelete(data).then(res => {
              this.getAllManagerByPage();
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
      }

    },
    //生命周期钩子
    mounted() {  //编译后去获取数据
      this.getAllManagerByPage();
      this.getAllDept_name();
    }
  }
</script>

<style scoped>

</style>
