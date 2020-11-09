<template>
  <div style="height: 460px">
    <!--添加teacher的表单-->
    <el-dialog title="添加教师信息" :visible.sync="addTeacherForm.dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="教师姓名:">
          <el-input v-model="addTeacherForm.teacher_name" placeholder="请输入教师姓名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTeacherForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeacher">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改teacher信息的表单-->
    <el-dialog title="修改教师信息" :visible.sync="updateTeacherForm.dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="教师工号:">
          <el-input readonly v-model="updateTeacherForm.teacher.teacherId"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名:">
          <el-input v-model="updateTeacherForm.teacher.teacherName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateTeacherForm.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTeacherById">确 定</el-button>
      </div>
    </el-dialog>

    <div style="margin-bottom:1% ">
      <!--主页面和查询功能-->
      <el-input v-model="teacher_list.teacher_name" placeholder="请输入要查询的教师姓名" style="width: 17%"></el-input>
      <el-button @click="getAllTeacherByPage">查询</el-button>
      <el-button @click="addTeacherForm.dialogFormVisible = true">新增</el-button>
    </div>
    <el-table
      :data="teacher_list.tableData"
      border
      style="width: 500px;margin-left:25%">
      <el-table-column
        fixed
        prop="teacherId"
        label="教师工号" align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="teacherName"
        label="教师姓名" align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作" align="center"
        width="120">
        <template slot-scope="scope">
          <el-button @click="getTeacherById(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteTeacher(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change=""
      @current-change="getAllTeacherByPage"
      :current-page.sync="teacher_list.current_page"
      :page-size="teacher_list.page_size"
      layout="total, prev, pager, next, jumper"
      :total="teacher_list.total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios';
  import http from '@/http/http.js'

  export default {
    name: "admin_teacher_list",
    //数据
    data() {
      return {
        //主页面的数据
        teacher_list: {
          tableData: [],
          total: 0,
          page_size: 5,
          current_page: 1,
          teacher_name: ""
        },
        //新增manager的数据
        addTeacherForm: {
          dialogFormVisible: false, //控制该表单是否显示
          teacher_name: '',
        },
        //修改manager的数据
        updateTeacherForm: {
          dialogFormVisible: false,
          teacher: []
        },

      }
    },
    //方法
    methods: {
      getAllTeacher: function () {
        /*axios.get("getAllTeacher", {
          params: {
            teacherName: this.teacher_list.teacher_name
          }
        })*/
        var teacherName = this.teacher_list.teacher_name;
        http.admin_teacher_list.getAllTeacher(teacherName).then(res => {
          this.teacher_list.total = res.data.length;
        })
      },
      getAllTeacherByPage: function () {
        this.getAllTeacher();
        /*axios.get("getAllTeacherByPage", {
          params: {
            pageSize: this.teacher_list.page_size,
            currentPage: this.teacher_list.current_page,
            teacherName: this.teacher_list.teacher_name
          }
        })*/
        var pageSize = this.teacher_list.page_size,
          currentPage = this.teacher_list.current_page,
          teacherName = this.teacher_list.teacher_name;
        http.admin_teacher_list.getAllTeacherByPage(pageSize, currentPage, teacherName).then(res => {
          this.teacher_list.tableData = res.data;
        })
      },
      addTeacher: function () {
        this.addTeacherForm.dialogFormVisible = false;
        /*axios.get("addTeacher", {
          params: {
            teacherName: this.addTeacherForm.teacher_name
          }
        })*/
        var teacherName = this.addTeacherForm.teacher_name;
        http.admin_teacher_list.addTeacher(teacherName).then(res => {
          this.getAllTeacherByPage();
          this.$message({
            message: res.data,
            type: 'success'
          });
        })
      },
      deleteTeacher: function (teacher) {
        this.$confirm('确认删除该教师信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          /*axios.get("deleteTeacher", {
            params: {
              teacherId: teacher.teacherId
            }
          })*/
          var teacherId = teacher.teacherId;
          http.admin_teacher_list.deleteTeacher(teacherId).then(res => {
            this.getAllTeacherByPage();
            if (res.data == "success") {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: res.data,
                type: 'error'
              });
            }
          })
        });
      },

      getTeacherById: function (teacher) {
        this.updateTeacherForm.dialogFormVisible = true;
        /*axios.get("getTeacherById", {
          params: {
            teacherId: teacher.teacherId
          }
        })*/
        var teacherId = teacher.teacherId;
        http.admin_teacher_list.getTeacherById(teacherId).then(res => {
          this.updateTeacherForm.teacher = res.data;
        })
      },
      updateTeacherById: function () {
        this.$confirm('确定修改该教师信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateTeacherForm.dialogFormVisible = false;
          /*axios.get("updateTeacherById", {
            params: {
              teacherId: this.updateTeacherForm.teacher.teacherId,
              teacherName: this.updateTeacherForm.teacher.teacherName
            }
          })*/
          var teacherId = this.updateTeacherForm.teacher.teacherId,
            teacherName = this.updateTeacherForm.teacher.teacherName;
          http.admin_teacher_list.updateTeacherById(teacherId, teacherName).then(res => {
            this.getAllTeacherByPage();
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
      this.getAllTeacherByPage();
    }
  }
</script>

<style scoped>

</style>
