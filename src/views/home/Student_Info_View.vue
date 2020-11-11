<template>
  <!--查看信息-->
  <el-dialog title="个人信息页" :visible.sync="showDialogVisible" width="80%" :close-on-click-modal="false">
    <div id="showdiv">


      <table class="table">

        <tr>
          <td colspan="2">姓名</td>
          <td colspan="2">{{studentData.student_name}}</td>
          <td>学号</td>
          <td colspan="2">{{studentData.student_id}}</td>
          <td>性别</td>
          <td colspan="2">{{studentData.sex}}</td>
          <td rowspan="4"  width="130px" >
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
          <td>{{evaluateForm_school.classNo}}</td>
          <td>{{evaluateForm_school.teacherName}}</td>
          <td v-for="(item,index) in courseScore" :key="index">{{item.score}}</td>
          <td colspan="2">{{evaluateForm_school.overallScore}}</td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10">{{evaluateForm_school.evaluationFormSchool}}</td>
        </tr>
      </table>
      <!--***********************************************转正评价******************************************-->
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
          <td>{{evaluateForm_dept_1.job}}</td>
          <td>{{evaluateForm_dept_1.managerName}}</td>
          <td v-for="(item,index) in qualityScore_1" :key="index">{{item.score}}</td>
          <td colspan="2">{{evaluateForm_dept_1.overallScore}}</td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10">{{evaluateForm_dept_1.evaluationFormDept}}</td>
        </tr>
      </table>
      <!--***********************************************工作一年评价******************************************-->
      <table class="table">
        <tr>
          <td colspan="12">工作1年评价</td>
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
          <td>{{evaluateForm_dept_2.job}}</td>
          <td>{{evaluateForm_dept_2.managerName}}</td>
          <td v-for="(item,index) in qualityScore_2" :key="index">{{item.score}}</td>
          <td colspan="2">{{evaluateForm_dept_2.overallScore}}</td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10">{{evaluateForm_dept_2.evaluationFormDept}}</td>
        </tr>
      </table>
      <!--***********************************************工作二年评价******************************************-->
      <table class="table">
        <tr>
          <td colspan="12">工作2年评价</td>
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
          <td>{{evaluateForm_dept_3.job}}</td>
          <td>{{evaluateForm_dept_3.managerName}}</td>
          <td v-for="(item,index) in qualityScore_3" :key="index">{{item.score}}</td>
          <td colspan="2">{{evaluateForm_dept_3.overallScore}}</td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10">{{evaluateForm_dept_3.evaluationFormDept}}</td>
        </tr>
      </table>
      <!--***********************************************工作三年评价******************************************-->
      <table class="table">
        <tr>
          <td colspan="12">工作3年评价</td>
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
          <td>{{evaluateForm_dept_4.job}}</td>
          <td>{{evaluateForm_dept_4.managerName}}</td>
          <td v-for="(item,index) in qualityScore_4" :key="index">{{item.score}}</td>
          <td colspan="2">{{evaluateForm_dept_4.overallScore}}</td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10">{{evaluateForm_dept_4.evaluationFormDept}}</td>
        </tr>
      </table>



    </div>
  </el-dialog>
</template>

<script>
    import http from '@/http/http.js'
    export default {
        name: "Student_Info_View",
        props:['student_id'],
        data(){
            return{
                showDialogVisible: false,
                studentData:[],
                studentId:this.student_id,
                tableColumnList:[],
                table_quality:[],
                table_course:[],
                qualityScore_1:[],
                qualityScore_2:[],
                qualityScore_3:[],
                qualityScore_4:[],
                courseScore:[],
                evaluateForm_school:[],
                evaluateForm_dept_1:[],
                evaluateForm_dept_2:[],
                evaluateForm_dept_3:[],
                evaluateForm_dept_4:[],
                dept_1:[],
                dept_2:[],
                dept_3:[],
                dept_4:[],
            }
        },
        methods:{
            //查看信息
            handleShow() {
                this.showDialogVisible = true;
                var studentId = this.studentId;
                http.manager.getStudentWithUserById(studentId).then(res => {
                    this.studentData = res.data;
                });
                http.teacher.getScoreByStudentId(studentId).then(res => {
                    this.courseScore = res.data.scoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 1).then(res => {
                    this.qualityScore_1 = res.data.qualityScoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 2).then(res => {
                    this.qualityScore_2 = res.data.qualityScoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 3).then(res => {
                    this.qualityScore_3 = res.data.qualityScoreWithStudent;
                });
                http.manager.getScoreByStudentIdWithManager(studentId, 4).then(res => {
                    this.qualityScore_4 = res.data.qualityScoreWithStudent;
                });
                http.teacher.getEvaluationByStudentId(studentId).then(res => {
                    this.evaluateForm_school = res.data
                });
                http.manager.getEvaluationWithManagerByStudentId(studentId, 1).then(res => {
                    this.evaluateForm_dept_1 = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_1.deptNo).then(res =>{
                        this.dept_1=res.data;
                    })
                })

                http.manager.getEvaluationWithManagerByStudentId(studentId, 2).then(res => {
                    this.evaluateForm_dept_2 = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_2.deptNo).then(res =>{
                        this.dept_2=res.data;
                    })
                })
                http.manager.getEvaluationWithManagerByStudentId(studentId, 3).then(res => {
                    this.evaluateForm_dept_3 = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_3.deptNo).then(res =>{
                        this.dept_3=res.data;
                    })
                })
                http.manager.getEvaluationWithManagerByStudentId(studentId, 4).then(res => {
                    this.evaluateForm_dept_4 = res.data;
                    http.admin_dept_list.getDeptById(this.evaluateForm_dept_4.deptNo).then(res =>{
                        this.dept_4=res.data;
                    })
                })
            },
            getTableHeadOfScore(){
                http.manager.getTableHeadOfScore().then(res =>{
                    this.table_quality=res.data.table_quality;
                    this.table_course=res.data.table_course
                })
            },




        },
        watch:{
            student_id: function (newVal,oldVal) {
                this.studentId=newVal;
            },

        },
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
