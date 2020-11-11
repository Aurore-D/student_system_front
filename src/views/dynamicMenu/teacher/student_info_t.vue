<template>
  <div>
    <div>

      <el-col>
        <el-input v-model="student_name" placeholder="请输入员工姓名的关键字" style="width:20%;margin: 0 0 1% -72%"></el-input>
        <el-button type="primary" @click="getAllStu()">搜索</el-button>
      </el-col>

    </div>
    <!--主页面-->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="student_id"
          label="编号" align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="student_name"
          label="姓名" align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别" align="center"
          width="60"
        >
        </el-table-column>

        <!--内嵌的成绩表格-->
        <el-table-column label="培训期间测试成绩" align="center">
          <el-table-column :label="item.course_name" :property="item.course_name"
                           v-for="(item,index) in tableColumnList" :key="index" align="center">
          </el-table-column>
        </el-table-column>

        <!--内嵌的评价表格-->
        <el-table-column label="教师评价" align="center">
          <el-table-column
            prop="overall_score"
            label="整体评价分数" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.overall_score == null">未评分</span>
              <span v-else>{{scope.row.overall_score}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="evaluation_form_school"
            label="评价" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.evaluation_form_school == null">未评价</span>
              <span v-else>{{scope.row.evaluation_form_school}}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleShow(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="Scoring(scope.row)">评价</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--查看信息-->
      <Student_Info_View v-if="showDialogVisible"
                         :student_id="studentId" ref="student_Info_View"></Student_Info_View>
      <!--编辑评价-->
      <Student_Info_View_Edit v-if="editFormVisible" @getAllStu="getAllStu" :student_id="studentId" :period_no ="periodNo" ref="student_Info_View_Edit"></Student_Info_View_Edit>

    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="curPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        background
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import http from '@/http/http.js'
    import Student_Info_View from "../../home/Student_Info_View";
    import Student_Info_View_Edit from "../../home/Student_Info_View_Edit";

    export default {
        name: "student_info_t",
        components: {
            Student_Info_View,
            Student_Info_View_Edit
        },
        data() {
            return {

                periodNo:0,
                studentId: '',
                tableData: [],
                tableColumnList: [],//动态表头
                student_name: "",
                studentData: [],
                pageSize: 5,//每页的数据条数
                curPage: 1,//默认开始页码
                total: 0,
                editForm: {CourseScore: []},
                evaluateForm: {},
                //默认dialog弹窗不打开（true打开，false为不打开）
                editFormVisible: false,
                EvaluateVisible: false,
                showDialogVisible: false,
            }
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {//每页下拉显示数据
                this.pageSize = size;  //解决下拉换每页显示条数时出现的bug
                this.getAllStu(this.curPage, size);
            },
            handleCurrentChange: function (page) { //点击第几页
                this.curPage = page; //解决下拉换每页显示条数时出现的bug
                this.getAllStu(page, this.pageSize);
            },
            /*主页面信息获取*/
            /*主页面信息获取*/
            getAllStu: function (page, size) {
                page = page ? page : this.curPage;//避免出现null
                size = size ? size : this.pageSize;

                var student_name = this.student_name,
                    teacher_id = this.$store.state.user.userId,
                    curPage = page,
                    pageSize = size;
                http.teacher.getAllStuWithTeacher(student_name, teacher_id, curPage, pageSize).then(res => {
                    this.tableData = res.data.students;//学生的一些基础信息和成绩信息
                    this.total = res.data.total.length;//总条数
                    this.tableColumnList = res.data.tableNameList;//返回的动态表格表头

                })
            },
            /*主页面打分按钮操作*/
            Scoring: function (student) {
                this.editFormVisible = true;//dialog对话窗口打开
                this.studentId = student.student_id;
                this.$nextTick(() => {
                    this.$refs.student_Info_View_Edit.handleShow()
                });


            },

            //查看信息
            handleShow: function (student) {
                this.showDialogVisible = true;
                this.studentId = student.student_id;

                this.$nextTick(() => {
                    this.$refs.student_Info_View.handleShow()
                })
            },
        },
        //生命周期钩子
        mounted() {//编译后去获取数据
            this.getAllStu();
        }
    }

</script>

<style>
  .el-table th {
    padding: 5px 0;
  }

  .el-table td {
    padding: 8px 0;
  }

  .avatar {
    width: 120px;
    height: 170px;
    display: block;
  }

  .table tr th, .table tr td {
    border: 1px solid;
  }

  .table tr td {
    width: 80px;
    height: 40px;
  }

  .table {
    width: 100%;
    border: 2px solid;
    border-collapse: collapse
  }

  #showdiv {
    /*background-image:url("../assets/images/bg2.jpg");*/
    background-size: 100% 100%;
    margin-top: -20px;
  }
</style>
