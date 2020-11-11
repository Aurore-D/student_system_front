<template xmlns:v-model="">
  <div style="height: 460px">
    <!--添加class的表单-->
    <el-dialog title="添加班期信息" :visible.sync="addClassForm.dialogFormVisible" width="30%">
      <el-form :model="addClassForm" label-width="80px" :rules="rules" ref="addClassForm" class="demo-ruleForm">
        <el-form-item label-width="100px" label="教师工号:" prop="teacher_id">
          <el-select v-model="addClassForm.teacher_id" placeholder="请选择教师">
            <el-option v-for="i in (addClassForm.teacher.length)" :key="i" v-model:label="addClassForm.teacher[i-1]"
                       v-model:value="addClassForm.teacher[i-1]"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass('addClassForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改class信息的表单-->
    <el-dialog title="修改班期信息" :visible.sync="updateClassForm.dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="班期号:">
          <el-input v-model="updateClassForm.class_no" style="width: 80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="班级教师:">
          <el-select v-model="updateClassForm.teacher_id" style="width: 80%">
            <el-option v-for="i in (updateClassForm.teacher.length)" :key="i"
                       v-model:label="updateClassForm.teacher[i-1]"
                       v-model:value="updateClassForm.teacher[i-1]"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateClassForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClassByNo">确 定</el-button>
      </div>
    </el-dialog>

    <!--主页面-->
    <div style="margin-left: 18%;margin-bottom:1% ">
      <el-button type="primary" @click="addClassForm.dialogFormVisible = true">新增</el-button>
      <el-button type="danger" @click="batchdelete">删除</el-button>
    </div>
    <el-table
      :data="class_list.tableData"
      border
      style="width: 450px;margin-left:25%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="class_no" align="center"
        label="班期号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="teacher_name" align="center"
        label="教师姓名"
      >
      </el-table-column>
      <el-table-column
        label="操作" align="center" width="130">
        <template slot-scope="scope">
          <el-button @click="getClassById(scope.row)" type="primary" icon="el-icon-edit" size="small"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteClass(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change=""
      @current-change="getAllClassByPage"
      :current-page.sync="class_list.current_page"
      :page-size="class_list.page_size"
      layout="total, prev, pager, next, jumper"
      :total="class_list.total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';
  import http from '@/http/http.js'

  export default {
    name: "admin_class_list",
    //数据
    data() {
      return {
        //主页面的数据
        class_list: {
          tableData: [],
          total: 0,
          page_size: 5,
          current_page: 1,
          multipleSelection: []
        },
        //新增class的数据
        addClassForm: {
          dialogFormVisible: false, //控制该表单是否显示
          class_no: '',
          teacher_id: '',
          teacher: [],
        },
        //修改class的数据
        updateClassForm: {
          dialogFormVisible: false,
          class_no: 0,
          teacher_id: '',
          teacher: []
        },
        rules: {
          'teacher_id': [
            {required: true, message: '请选择教师', trigger: 'blur'}
          ]
        }
      }
    },
    //方法
    methods: {
      getAllClass: function () {

        /*axios.get("getAllClass")*/
        http.admin_class_list.getAllClass().then(res => {
          this.class_list.total = res.data.length;
        })
      },
      getAllClassByPage: function () {
        this.getAllClass();

        /*axios.get("getAllClassByPage", {
          params: {
            pageSize: this.class_list.page_size,
            currentPage: this.class_list.current_page
          }
        })*/
        var pageSize = this.class_list.page_size,
          currentPage = this.class_list.current_page;
        http.admin_class_list.getAllClassByPage(pageSize, currentPage).then(res => {
          this.class_list.tableData = res.data;
        })
      },
      getAllTeacher_name: function () {

        /*axios.get("getAllTeacher_name")*/

        http.admin_class_list.getAllTeacher_name().then(res => {
          this.addClassForm.teacher = res.data;
          this.updateClassForm.teacher = res.data;
        })
      },
      addClass: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addClassForm.dialogFormVisible = false;
            /*axios.get("addClass", {
                params: {
                  teacherId: this.addClassForm.teacher_id
                }
              })*/
            var teacherId = this.addClassForm.teacher_id;
            http.admin_class_list.addClass(teacherId).then(res => {
              this.getAllClassByPage();
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
      deleteClass: function (_class) {
        this.$confirm('确定删除该班级信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          /*axios.get("deleteClass", {
            params: {
              classNo: _class.class_no
            }
          })*/
          var classNo = _class.class_no;
          http.admin_class_list.deleteClass(classNo).then(res => {
            this.getAllClassByPage();
            this.$message({
              message: res.data,
              type: 'success'
            });
          })
        });
      },
      getClassById: function (_class) {
        this.updateClassForm.dialogFormVisible = true;
        /* axios.get("getClassByNo", {
           params: {
             classNo: _class.class_no
           }
         })*/
        var classNo = _class.class_no;
        http.admin_class_list.getClassById(classNo).then(res => {
          this.updateClassForm.class_no = res.data.classNo;
          this.updateClassForm.teacher_id = res.data.teacherId;
        })
      },
      updateClassByNo: function () {
        this.$confirm('确定修改该班级信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateClassForm.dialogFormVisible = false;

          /* axios.get("updateClassByNo", {
             params: {
               classNo: this.updateClassForm.class_no,
               teacherId: this.updateClassForm.teacher_id
             }
           })*/
          var classNo = this.updateClassForm.class_no,
            teacherId = this.updateClassForm.teacher_id;
          http.admin_class_list.updateClassById(classNo, teacherId).then(res => {
            this.getAllClassByPage();
            this.$message({
              message: res.data,
              type: 'success'
            });
          })
        });
      },
      handleSelectionChange(val) {
        this.class_list.multipleSelection = val;
      },
      batchdelete: function () {
        if (this.class_list.multipleSelection.length > 0) {
          this.$confirm('确定删除选中班期信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            /*axios({
              method: 'post',
              url: 'repassword',
              data: this.multipleSelection
          })*/
            var data = this.class_list.multipleSelection;
            http.admin_class_list.batchdelete(data).then(res => {
              this.getAllClassByPage();
              this.$message({
                message: res.data,
                type: 'success'
              });
            })
          });
        }else {
          this.$message({
            message: "请至少选择一条数据",
            type: 'warning'
          })
        }
      },

    },
    //生命周期钩子
    mounted() {  //编译后去获取数据
      this.getAllClassByPage();
      this.getAllTeacher_name();
    }
  }
</script>

<style>
  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
    overflow: scroll !important;
  }

  .el-table__fixed {
    height: 100% !important;
  }


</style>
