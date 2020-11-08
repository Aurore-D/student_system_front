<template>
  <div>
    <div>
      <el-col>
        <el-input v-model="student_name" placeholder="请输入学生姓名的关键字" style="width:20%;margin: 0 0 1% -72%"></el-input>
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
        <el-table-column
          prop="graduate_school"
          label="学校" align="center"
        >
        </el-table-column>
        <el-table-column
          prop="native_place"
          label="籍贯" align="center"
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
              <span v-if="scope.row.overall_score == null">未打分</span>
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
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="Scoring(scope.row)">打分</el-button>
            <el-button type="text" size="small" @click="evaluate(scope.row)">评价</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--弹窗打分,动态渲染表单-->
      <el-dialog title="学生打分"
                 :visible.sync="editFormVisible"
                 :close-on-click-modal="false"
                 center
                 class="edit-form">
        <el-form :model="editForm" ref="editForm" align="center" class="demo-ruleForm">
          <el-form-item v-for="(item,index) in editForm.CourseScore" :key="index" :prop="'CourseScore.'+index+'.score'"
                        :rules="[ { required: true, message: '成绩不能为空',trigger: 'blur'},
                          { type: 'number', message: '成绩必须为数字值'},
                          { pattern: /^(?:[1-9]?\d|100)$/,message: '成绩范围在0-100'}]">
            <span>{{tableColumnList[index].course_name}}</span>
            <el-input v-model="item.studentId" readonly="" v-show="false"></el-input>
            <el-input v-model="item.courseId" readonly="" v-show="false"></el-input>
            <el-input v-model.number="item.score" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate('editForm')">提交</el-button>
        </div>
      </el-dialog>

      <!--弹窗评价-->
      <el-dialog title="学生评价"
                 :visible.sync="EvaluateVisible"
                 :close-on-click-modal="false"
                 center
      >
        <el-form :model="evaluateForm" :rules="rulesForEvaluate" ref="evaluateForm" align="center"
                 class="demo-ruleForm">
          <el-form-item label="学生编号">
            <el-input v-model="evaluateForm.studentId" readonly=""></el-input>
          </el-form-item>
          <el-form-item label="整体评价分数" prop="overallScore">
            <el-input v-model.number="evaluateForm.overallScore" placeholder="请输入0-5的评价分数"></el-input>
          </el-form-item>
          <el-form-item>
            <el-form-item label="评价（包括主要优点及缺陷）" prop="evaluationFormSchool">
              <el-input type="textarea" v-model="evaluateForm.evaluationFormSchool"
                        placeholder="请输入50字以内的评价信息"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdateEvaluate('evaluateForm')">提交</el-button>
        </div>
      </el-dialog>

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
    import http from '@/http/http.js'
    import axios from 'axios';

    export default {
        name: "student_info_t",
        data() {
            return {
                tableData: [],
                tableColumnList: [],//动态表头
                student_name: "",
                pageSize: 5,//每页的数据条数
                curPage: 1,//默认开始页码
                total: 0,
                editForm: {CourseScore: []},
                evaluateForm: {},
                //默认dialog弹窗不打开（true打开，false为不打开）
                editFormVisible: false,
                EvaluateVisible: false,
                //表单验证
                rulesForEvaluate: {
                    overallScore: [
                        {required: true, message: '分数不能为空', trigger: 'blur'},
                        {type: 'number', message: '分数必须为数字值'},
                        {pattern: /^([0-5]|5)$/, message: '分数范围在0-5'}
                    ],
                    evaluationFormSchool: [
                        {required: true, message: '请输入评价', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ]
                },
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
            getAllStu: function (page, size) {
                page = page ? page : this.curPage;//避免出现null
                size = size ? size : this.pageSize;

                /* axios.get("getAllStuWithTeacher", {
                     params: {
                         student_name: this.student_name,
                         teacher_id: 110001,
                         curPage: page,
                         pageSize: size
                     }
                 })*/
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
            /*弹窗打分按钮操作*/
            Scoring: function (student) {
                this.editFormVisible = true;//dialog对话窗口打开

                /*axios.get("getScoreByStudentId", {
                    params: {
                        studentId: student.student_id
                    }
                })*/

                var studentId = student.student_id;
                http.teacher.getScoreByStudentId(studentId).then(res => {
                    this.editForm.CourseScore = res.data.scoreWithStudent;
                })
            },
            /*弹窗取消按钮操作*/
            handleCancel: function () {
                this.editFormVisible = false;
                this.EvaluateVisible = false;
            },
            /*更新成绩*/
            handleUpdate: function (editForm) {
                /*axios({
                    method: 'post',
                    url: 'updateStuScoreWithTeacher',
                    data: this.editForm
                })*/
                var data = this.editForm.CourseScore;
              this.$refs[editForm].validate((valid) => {
                  if (valid) {
                http.teacher.updateStuScoreWithTeacher(data).then(res => {
                    if ("success" == res.data) {
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        });
                        this.getAllStu();
                      this.editFormVisible = false;
                    } else {
                        this.$message.error('提交失败！');
                    }
                })
                  } else {
                    return false;
                  }
              });
            },
            /*主页面评价按钮操作*/
            evaluate: function (student) {
                this.EvaluateVisible = true;

                /* axios.get("getEvaluationByStudentId", {
                     params: {
                         studentId: student.student_id
                     }
                 })*/
                var studentId = student.student_id;
                http.teacher.getEvaluationByStudentId(studentId).then(res => {
                    this.evaluateForm = res.data
                })
            },
            /*评价提交按钮操作*/
            handleUpdateEvaluate: function (evaluateForm) {
                /*  axios.get("evaluatingStudentWithTeacher", {
                      params: {
                          teacherName: "刘备",
                          studentId: this.evaluateForm.studentId,
                          overallScore: this.evaluateForm.overallScore,
                          evaluationFormSchool: this.evaluateForm.evaluationFormSchool
                      }
                  })*/
                var teacherName = this.$store.state.user.userName,
                    studentId = this.evaluateForm.studentId,
                    overallScore = this.evaluateForm.overallScore,
                    evaluationFormSchool = this.evaluateForm.evaluationFormSchool;
              this.$refs[evaluateForm].validate((valid) => {
                if (valid) {
                  http.teacher.evaluatingStudentWithTeacher(teacherName, studentId, overallScore, evaluationFormSchool).then(res => {
                    if ("success" == res.data) {
                      this.$message({
                        message: '提交成功！',
                        type: 'success'
                      });
                      this.getAllStu();
                      this.EvaluateVisible = false;
                    } else {
                      this.$message.error('提交失败！');
                    }
                  })
                } else {
                  return false;
                }
              });
              }
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

</style>
