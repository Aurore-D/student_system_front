<template>
  <!--查看信息-->
  <el-dialog title="员工信息查看" :visible.sync="editFormVisible" width="80%" :close-on-click-modal="false">
    <div id="showdiv">


      <table class="table">

        <tr>
          <td colspan="2">姓名</td>
          <td colspan="2">{{studentData.student_name}}</td>
          <td>学号</td>
          <td colspan="2">{{studentData.student_id}}</td>
          <td>性别</td>
          <td colspan="2">{{studentData.sex}}</td>
          <td rowspan="4" width="130px">
            <div style="margin-top: -2%;margin-left: 0%">
              <img v-if="studentData.img_path" :src="require('@/assets/' + this.studentData.img_path)" class="avatar">
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">出生日期</td>
          <td colspan="2">{{studentData.birthday}}</td>
          <td>籍贯</td>
          <td colspan="2">{{studentData.native_place}}</td>
          <td>民族</td>
          <td colspan="2">{{studentData.folk}}</td>
        </tr>

        <tr>
          <td colspan="2">毕业院校</td>
          <td colspan="2">{{studentData.graduate_school}}</td>
          <td>专业</td>
          <td colspan="2">{{studentData.major}}</td>
          <td>婚否</td>
          <td colspan="2">{{studentData.marital_status}}</td>
        </tr>

        <tr>
          <td colspan="2">身份证号</td>
          <td colspan="3">{{studentData.id_number}}</td>
          <td colspan="2">手机号码</td>
          <td colspan="3">{{studentData.phone}}</td>
        </tr>

        <tr>
          <td colspan="2">部门</td>
          <td colspan="10">{{studentData.dept_name}}</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="11">{{studentData.remark}}</td>
        </tr>
      </table>
      <!--***********************************************培训学校评价******************************************-->
      <div v-if="role==1">
        <el-form ref="evaluateForm_school" :model="evaluateForm_school" :rules="rulesForEvaluate">

          <table class="table">
            <tr>
              <td colspan="12">培训学校评价</td>
            </tr>
            <tr>
              <td rowspan="2" colspan="2">培训学校</td>
              <td rowspan="2" colspan="1">班期</td>
              <td rowspan="2" colspan="1">评价人</td>
              <td rowspan="1" colspan="6">培训期间测试成绩</td>
              <td rowspan="2" colspan="2">整体评价分数</td>
            </tr>
            <tr>
              <td v-for="(item,index) in table_course" :key="index">{{item.course_name}}</td>
            </tr>

            <tr>
              <td colspan="2">学习评价</td>
              <td>{{evaluateForm_school.evaluate.classNo}}</td>
              <td>{{evaluateForm_school.evaluate.teacherName}}</td>
              <td v-for="(item,index) in evaluateForm_school.courseScore" :key="index">
                <el-form-item
                  :prop="'courseScore.'+index+'.score'"
                  :rules="[ { required: true, message: '成绩不能为空',trigger: 'blur'},
                                { type: 'number', message: '成绩必须为数字值'},
                                { pattern: /^(?:[1-9]?\d|100)$/,message: '成绩范围在0-100'}]" style="height: 45%">

                  <el-input v-model.number="item.score"></el-input>
                </el-form-item>
              </td>
              <td colspan="2">
                <el-form-item prop="evaluate.overallScore" style="height: 45%">
                  <el-input v-model.number="evaluateForm_school.evaluate.overallScore" prop="overallScore"></el-input>
                </el-form-item>
              </td>
            </tr>

            <tr style="height: 100px">
              <td colspan="2">评价（包括主要优点及缺陷）</td>
              <td colspan="10">
                <el-form-item prop="evaluate.evaluationFormSchool" style="height: 40%">
                  <el-input type="textarea" v-model="evaluateForm_school.evaluate.evaluationFormSchool"
                            style="margin-top: -18px"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div style="margin-top: 10px" slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate_to_school()">提交</el-button>
        </div>
      </div>
      <!--***********************************************转正评价******************************************-->
      <div v-else-if="role==2&&periodNo===1">
        <el-form ref="evaluateForm_dept_1" :model="evaluateForm_dept_1" :rules="rulesForEvaluate">
          <table class="table">
            <tr>
              <td colspan="12">转正工作评价</td>
            </tr>
            <tr>
              <td rowspan="2" colspan="2">项目</td>
              <td rowspan="2" colspan="1">员工部门</td>
              <td rowspan="2" colspan="1">员工职务</td>
              <td rowspan="2" colspan="1">评价人</td>
              <td rowspan="1" colspan="5">评价分项</td>
              <td rowspan="2" colspan="2">整体评价分数</td>
            </tr>
            <tr>
              <td v-for="(item,index) in table_quality" :key="index">{{item.quality_name}}</td>
            </tr>
            <tr>
              <td colspan="2">工作评价</td>
              <td>{{dept_1.deptName}}</td>
              <td>
                <el-input v-model="evaluateForm_dept_1.evaluate.job" style="width: 130px"></el-input>
              </td>
              <td>

                <el-input v-if="evaluateForm_dept_1.evaluate.managerName" v-model="evaluateForm_dept_1.evaluate.managerName" readonly></el-input>
                <el-input v-else v-model="this.$store.state.user.userName" readonly></el-input>

              </td>
              <td v-for="(item,index) in evaluateForm_dept_1.qualityScore" :key="index">
                <el-form-item
                  :prop="'qualityScore.'+index+'.score'"
                  :rules="[ { required: true, message: '分数不能为空',trigger: 'blur'},
                                { type: 'number', message: '分数必须为数字值'},
                                { pattern: /^([0-5]|5)$/,message: '分数范围在0-5'}]" style="height: 45%">

                  <el-input v-model.number="item.score"></el-input>
                </el-form-item>
              </td>
              <td colspan="2">
                <el-form-item prop="evaluate.overallScore" style="height: 45%">
                  <el-input v-model.number="evaluateForm_dept_1.evaluate.overallScore" prop="overallScore"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr style="height: 110px">
              <td colspan="2">评价（包括主要优点及缺陷）</td>
              <td colspan="10">
                <el-form-item prop="evaluate.evaluationFormDept" style="height: 40%">
                  <el-input type="textarea" v-model="evaluateForm_dept_1.evaluate.evaluationFormDept"
                            style="margin-top: -18px"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div style="margin-top: 10px" slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate_to_dept_1()">提交</el-button>
        </div>
      </div>
      <!--***********************************************工作一年评价******************************************-->
      <div v-else-if="role==2&&periodNo===2">
        <el-form ref="evaluateForm_dept_2" :model="evaluateForm_dept_2" :rules="rulesForEvaluate">
          <table class="table">
            <tr>
              <td colspan="12">工作一年评价</td>
            </tr>
            <tr>
              <td rowspan="2" colspan="2">项目</td>
              <td rowspan="2" colspan="1">员工部门</td>
              <td rowspan="2" colspan="1">员工职务</td>
              <td rowspan="2" colspan="1">评价人</td>
              <td rowspan="1" colspan="5">评价分项</td>
              <td rowspan="2" colspan="2">整体评价分数</td>
            </tr>
            <tr>
              <td v-for="(item,index) in table_quality" :key="index">{{item.quality_name}}</td>
            </tr>
            <tr>
              <td colspan="2">工作评价</td>
              <td>{{dept_2.deptName}}</td>
              <td>
                <el-input v-model="evaluateForm_dept_2.evaluate.job" style="width: 130px"></el-input>
              </td>
              <td>
                <el-input v-if="evaluateForm_dept_2.evaluate.managerName" v-model="evaluateForm_dept_2.evaluate.managerName" readonly></el-input>
                <el-input v-else v-model="this.$store.state.user.userName" readonly></el-input>
              </td>
              <td v-for="(item,index) in evaluateForm_dept_2.qualityScore" :key="index">
                <el-form-item
                  :prop="'qualityScore.'+index+'.score'"
                  :rules="[ { required: true, message: '分数不能为空',trigger: 'blur'},
                                { type: 'number', message: '分数必须为数字值'},
                                { pattern: /^([0-5]|5)$/,message: '分数范围在0-5'}]" style="height: 45%">

                  <el-input v-model.number="item.score"></el-input>
                </el-form-item>
              </td>
              <td colspan="2">
                <el-form-item prop="evaluate.overallScore" style="height: 45%">
                  <el-input v-model.number="evaluateForm_dept_2.evaluate.overallScore" prop="overallScore"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr style="height: 110px">
              <td colspan="2">评价（包括主要优点及缺陷）</td>
              <td colspan="10">
                <el-form-item prop="evaluate.evaluationFormDept" style="height: 40%">
                  <el-input type="textarea" v-model="evaluateForm_dept_2.evaluate.evaluationFormDept"
                            style="margin-top: -18px"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div style="margin-top: 10px" slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate_to_dept_2()">提交</el-button>
        </div>
      </div>
      <!--***********************************************工作二年评价******************************************-->
      <div v-else-if="role==2&&periodNo===3">
        <el-form ref="evaluateForm_dept_3" :model="evaluateForm_dept_3" :rules="rulesForEvaluate">
          <table class="table">
            <tr>
              <td colspan="12">工作二年评价</td>
            </tr>
            <tr>
              <td rowspan="2" colspan="2">项目</td>
              <td rowspan="2" colspan="1">员工部门</td>
              <td rowspan="2" colspan="1">员工职务</td>
              <td rowspan="2" colspan="1">评价人</td>
              <td rowspan="1" colspan="5">评价分项</td>
              <td rowspan="2" colspan="2">整体评价分数</td>
            </tr>
            <tr>
              <td v-for="(item,index) in table_quality" :key="index">{{item.quality_name}}</td>
            </tr>
            <tr>
              <td colspan="2">工作评价</td>
              <td>{{dept_3.deptName}}</td>
              <td>
                <el-input v-model="evaluateForm_dept_3.evaluate.job" style="width: 130px"></el-input>
              </td>
              <td>
                <el-input v-if="evaluateForm_dept_3.evaluate.managerName" v-model="evaluateForm_dept_3.evaluate.managerName" readonly></el-input>
                <el-input v-else v-model="this.$store.state.user.userName" readonly></el-input>
              </td>
              <td v-for="(item,index) in evaluateForm_dept_3.qualityScore" :key="index">
                <el-form-item
                  :prop="'qualityScore.'+index+'.score'"
                  :rules="[ { required: true, message: '分数不能为空',trigger: 'blur'},
                                { type: 'number', message: '分数必须为数字值'},
                                { pattern: /^([0-5]|5)$/,message: '分数范围在0-5'}]" style="height: 45%">

                  <el-input v-model.number="item.score"></el-input>
                </el-form-item>
              </td>
              <td colspan="2">
                <el-form-item prop="evaluate.overallScore" style="height: 45%">
                  <el-input v-model.number="evaluateForm_dept_3.evaluate.overallScore" prop="overallScore"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr style="height: 110px">
              <td colspan="2">评价（包括主要优点及缺陷）</td>
              <td colspan="10">
                <el-form-item prop="evaluate.evaluationFormDept" style="height: 40%">
                  <el-input type="textarea" v-model="evaluateForm_dept_3.evaluate.evaluationFormDept"
                            style="margin-top: -18px"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div style="margin-top: 10px" slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate_to_dept_1()">提交</el-button>
        </div>
      </div>
      <!--***********************************************工作三年评价******************************************-->
      <div v-else-if="role==2&&periodNo===4">
        <el-form ref="evaluateForm_dept_4" :model="evaluateForm_dept_4" :rules="rulesForEvaluate">
          <table class="table">
            <tr>
              <td colspan="12">工作三年评价</td>
            </tr>
            <tr>
              <td rowspan="2" colspan="2">项目</td>
              <td rowspan="2" colspan="1">员工部门</td>
              <td rowspan="2" colspan="1">员工职务</td>
              <td rowspan="2" colspan="1">评价人</td>
              <td rowspan="1" colspan="5">评价分项</td>
              <td rowspan="2" colspan="2">整体评价分数</td>
            </tr>
            <tr>
              <td v-for="(item,index) in table_quality" :key="index">{{item.quality_name}}</td>
            </tr>
            <tr>
              <td colspan="2">工作评价</td>
              <td>{{dept_4.deptName}}</td>
              <td>
                <el-input v-model="evaluateForm_dept_4.evaluate.job" style="width: 130px"></el-input>
              </td>
              <td>
                <el-input v-if="evaluateForm_dept_4.evaluate.managerName" v-model="evaluateForm_dept_4.evaluate.managerName" readonly></el-input>
                <el-input v-else v-model="this.$store.state.user.userName" readonly></el-input>
              </td>
              <td v-for="(item,index) in evaluateForm_dept_4.qualityScore" :key="index">
                <el-form-item
                  :prop="'qualityScore.'+index+'.score'"
                  :rules="[ { required: true, message: '分数不能为空',trigger: 'blur'},
                                { type: 'number', message: '分数必须为数字值'},
                                { pattern: /^([0-5]|5)$/,message: '分数范围在0-5'}]" style="height: 45%">

                  <el-input v-model.number="item.score"></el-input>
                </el-form-item>
              </td>
              <td colspan="2">
                <el-form-item prop="evaluate.overallScore" style="height: 45%">
                  <el-input v-model.number="evaluateForm_dept_4.evaluate.overallScore" prop="overallScore"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr style="height: 110px">
              <td colspan="2">评价（包括主要优点及缺陷）</td>
              <td colspan="10">
                <el-form-item prop="evaluate.evaluationFormDept" style="height: 40%">
                  <el-input type="textarea" v-model="evaluateForm_dept_4.evaluate.evaluationFormDept"
                            style="margin-top: -18px"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div style="margin-top: 10px" slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate_to_dept_1()">提交</el-button>
        </div>
      </div>


    </div>
  </el-dialog>
</template>

<script>
    import http from '@/http/http.js'

    export default {
        name: "Student_Info_View_Edit",
        props: ['student_id', 'period_no'],
        data() {
            return {
                editFormVisible: false,
                periodNo: this.period_no,
                role: this.$store.state.user.role,
                showDialogVisible: false,
                studentData: [],
                studentId: this.student_id,
                tableColumnList: [],
                table_quality: [],
                table_course: [],

                evaluateForm_school: {
                    courseScore: [],
                    evaluate: []
                },
                evaluateForm_dept_1: {
                    qualityScore: [],
                    evaluate: []
                },
                evaluateForm_dept_2: {
                    qualityScore: [],
                    evaluate: []
                },
                evaluateForm_dept_3: {
                    qualityScore: [],
                    evaluate: []
                },
                evaluateForm_dept_4: {
                    qualityScore: [],
                    evaluate: []
                },
                dept_1: [],
                dept_2: [],
                dept_3: [],
                dept_4: [],
                rulesForEvaluate: {
                    "evaluate.overallScore": [
                        {required: true, message: '分数不能为空', trigger: 'blur'},
                        {type: 'number', message: '分数必须为数字值'},
                        {pattern: /^([0-5]|5)$/, message: '分数范围在0-5'}
                    ],
                    "evaluate.evaluationFormDept": [
                        {required: true, message: '请输入评价', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ],
                    "evaluate.evaluationFormSchool": [
                        {required: true, message: '请输入评价', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //查看信息
            handleShow() {
                this.editFormVisible = true;
                var studentId = this.studentId;
                http.manager.getStudentWithUserById(studentId).then(res => {
                    this.studentData = res.data;
                });

                http.teacher.getEvaluationByStudentId(studentId).then(res => {
                    this.evaluateForm_school.evaluate = res.data
                });
                http.teacher.getScoreByStudentId(studentId).then(res => {
                    this.evaluateForm_school.courseScore = res.data.scoreWithStudent;
                });

                http.manager.getEvaluationWithManagerByStudentId(studentId, 1).then(res => {
                    this.evaluateForm_dept_1.evaluate = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_1.evaluate.deptNo).then(res => {
                        this.dept_1 = res.data;
                    })
                })

                http.manager.getEvaluationWithManagerByStudentId(studentId, 2).then(res => {
                    this.evaluateForm_dept_2.evaluate = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_2.evaluate.deptNo).then(res => {
                        this.dept_2 = res.data;
                    })
                })
                http.manager.getEvaluationWithManagerByStudentId(studentId, 3).then(res => {
                    this.evaluateForm_dept_3.evaluate = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_3.evaluate.deptNo).then(res => {
                        this.dept_3 = res.data;
                    })
                })
                http.manager.getEvaluationWithManagerByStudentId(studentId, 4).then(res => {
                    this.evaluateForm_dept_4.evaluate = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_4.evaluate.deptNo).then(res => {
                        this.dept_4 = res.data;
                    })
                })

                http.manager.getScoreByStudentIdWithManager(studentId, 1).then(res => {
                    this.evaluateForm_dept_1.qualityScore = res.data.qualityScoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 2).then(res => {
                    this.evaluateForm_dept_2.qualityScore = res.data.qualityScoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 3).then(res => {
                    this.evaluateForm_dept_3.qualityScore = res.data.qualityScoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 4).then(res => {
                    this.evaluateForm_dept_4.qualityScore = res.data.qualityScoreWithStudent;
                });


            },
            getTableHeadOfScore() {
                http.manager.getTableHeadOfScore().then(res => {
                    this.table_quality = res.data.table_quality;
                    this.table_course = res.data.table_course
                })
            },
            handleCancel: function () {
                this.editFormVisible = false;

            },

            handleUpdate_to_dept_1() {
                this.$refs["evaluateForm_dept_1"].validate((valid) => {
                    if (valid) {

                        var managerName = this.$store.state.user.userName,
                            studentId = this.evaluateForm_dept_1.evaluate.studentId,
                            periodNo = this.periodNo,//转正
                            overallScore = this.evaluateForm_dept_1.evaluate.overallScore,
                            evaluationFormDept = this.evaluateForm_dept_1.evaluate.evaluationFormDept,
                            job = this.evaluateForm_dept_1.evaluate.job;
                        http.manager.evaluatingStudentWithManager(managerName, studentId, periodNo, overallScore, evaluationFormDept, job).then(res => {
                            if ("success" == res.data) {
                                var data = this.evaluateForm_dept_1.qualityScore;
                                http.manager.updateStuScoreWithManager(data).then(res => {
                                    if ("success" == res.data) {
                                        this.$message({
                                            message: '提交成功！',
                                            type: 'success'
                                        });
                                        this.editFormVisible = false;
                                        this.$emit("getAllStu")
                                    } else {
                                        this.$message.error('提交失败！');
                                    }
                                })
                            } else {
                                this.$message.error('提交失败！');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },

            handleUpdate_to_dept_2() {
                this.$refs["evaluateForm_dept_2"].validate((valid) => {
                    if (valid) {

                        var managerName =this.$store.state.user.userName,
                            studentId = this.evaluateForm_dept_2.evaluate.studentId,
                            periodNo = this.periodNo,//转正
                            overallScore = this.evaluateForm_dept_2.evaluate.overallScore,
                            evaluationFormDept = this.evaluateForm_dept_2.evaluate.evaluationFormDept,
                            job = this.evaluateForm_dept_2.evaluate.job;
                        http.manager.evaluatingStudentWithManager(managerName, studentId, periodNo, overallScore, evaluationFormDept, job).then(res => {
                            if ("success" == res.data) {
                                var data = this.evaluateForm_dept_2.qualityScore;
                                http.manager.updateStuScoreWithManager(data).then(res => {
                                    if ("success" == res.data) {
                                        this.$message({
                                            message: '提交成功！',
                                            type: 'success'
                                        });
                                        this.editFormVisible = false;
                                        this.$emit("getAllStu")
                                    } else {
                                        this.$message.error('提交失败！');
                                    }
                                })
                            } else {
                                this.$message.error('提交失败！');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },

            handleUpdate_to_dept_3() {
                this.$refs["evaluateForm_dept_3"].validate((valid) => {
                    if (valid) {

                        var managerName = this.$store.state.user.userName,
                            studentId = this.evaluateForm_dept_3.evaluate.studentId,
                            periodNo = this.periodNo,//转正
                            overallScore = this.evaluateForm_dept_3.evaluate.overallScore,
                            evaluationFormDept = this.evaluateForm_dept_3.evaluate.evaluationFormDept,
                            job = this.evaluateForm_dept_3.evaluate.job;
                        http.manager.evaluatingStudentWithManager(managerName, studentId, periodNo, overallScore, evaluationFormDept, job).then(res => {
                            if ("success" == res.data) {
                                var data = this.evaluateForm_dept_3.qualityScore;
                                http.manager.updateStuScoreWithManager(data).then(res => {
                                    if ("success" == res.data) {
                                        this.$message({
                                            message: '提交成功！',
                                            type: 'success'
                                        });
                                        this.editFormVisible = false;
                                        this.$emit("foldOrOpenAside")
                                    } else {
                                        this.$message.error('提交失败！');
                                    }
                                })
                            } else {
                                this.$message.error('提交失败！');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },

            handleUpdate_to_dept_4() {
                this.$refs["evaluateForm_dept_1"].validate((valid) => {
                    if (valid) {

                        var managerName = this.$store.state.user.userName,
                            studentId = this.evaluateForm_dept_4.evaluate.studentId,
                            periodNo = this.periodNo,//转正
                            overallScore = this.evaluateForm_dept_4.evaluate.overallScore,
                            evaluationFormDept = this.evaluateForm_dept_4.evaluate.evaluationFormDept,
                            job = this.evaluateForm_dept_4.evaluate.job;
                        http.manager.evaluatingStudentWithManager(managerName, studentId, periodNo, overallScore, evaluationFormDept, job).then(res => {
                            if ("success" == res.data) {
                                var data = this.evaluateForm_dept_4.qualityScore;
                                http.manager.updateStuScoreWithManager(data).then(res => {
                                    if ("success" == res.data) {
                                        this.$message({
                                            message: '提交成功！',
                                            type: 'success'
                                        });
                                        this.editFormVisible = false;
                                        this.$emit("getAllStu")
                                    } else {
                                        this.$message.error('提交失败！');
                                    }
                                })
                            } else {
                                this.$message.error('提交失败！');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },

            handleUpdate_to_school() {

                var teacherName = this.$store.state.user.userName,
                    studentId = this.evaluateForm_school.evaluate.studentId,
                    overallScore = this.evaluateForm_school.evaluate.overallScore,
                    evaluationFormSchool = this.evaluateForm_school.evaluate.evaluationFormSchool;
                this.$refs["evaluateForm_school"].validate((valid) => {
                    if (valid) {
                        http.teacher.evaluatingStudentWithTeacher(teacherName, studentId, overallScore, evaluationFormSchool).then(res => {
                            if ("success" == res.data) {
                                var data = this.evaluateForm_school.courseScore;
                                http.teacher.updateStuScoreWithTeacher(data).then(res => {
                                    if ("success" == res.data) {
                                        this.$message({
                                            message: '提交成功！',
                                            type: 'success'
                                        });
                                        this.editFormVisible = false;
                                        this.$emit("getAllStu")
                                    } else {
                                        this.$message.error('提交失败！');
                                    }
                                })

                            }
                        })
                    } else {
                        return false;
                    }
                });


            }
        },
        watch: {
            student_id: function (newVal, oldVal) {
                this.studentId = newVal;
            },
            period_no: function (newVal, oldVal) {
                this.periodNo = newVal;
            }

        }
        ,
        created() {
            this.getTableHeadOfScore();

        }
    }
</script>

<style>

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
