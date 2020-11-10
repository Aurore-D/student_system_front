<template>
  <!--查看信息-->
  <el-dialog title="员工信息查看" :visible.sync="showDialogVisible" width="80%" :close-on-click-modal="false">
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
              <img v-if="studentData.img_path" :src="getImgPathForShow()" class="avatar">
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
          <td v-for="(item,index) in tableColumnList" :key="index">{{item.quality_name}}</td>
        </tr>
        <tr>
          <td colspan="2">学生评价</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2"></td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10"></td>
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
          <td rowspan="1" colspan="5"></td>
          <td rowspan="2" colspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td v-for="(item,index) in tableColumnList" :key="index">{{item.quality_name}}</td>
        </tr>
        <tr>
          <td colspan="2">学生评价</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2"></td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10"></td>
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
          <td rowspan="1" colspan="5"></td>
          <td rowspan="2" colspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td v-for="(item,index) in tableColumnList" :key="index">{{item.quality_name}}</td>
        </tr>
        <tr>
          <td colspan="2">学生评价</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2"></td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10"></td>
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
          <td rowspan="1" colspan="5"></td>
          <td rowspan="2" colspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td v-for="(item,index) in tableColumnList" :key="index">{{item.quality_name}}</td>
        </tr>
        <tr>
          <td colspan="2">学生评价</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2"></td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10"></td>
        </tr>
      </table>
      <!--***********************************************工作三年评价******************************************-->
      <table class="table">
        <tr>
          <td colspan="12">工作2年评价</td>
        </tr>
        <tr>
          <td rowspan="2" colspan="2">项目</td>
          <td rowspan="2" colspan="1">员工部门</td>
          <td rowspan="2" colspan="1">员工职务</td>
          <td rowspan="2" colspan="1">评价人</td>
          <td rowspan="1" colspan="5"></td>
          <td rowspan="2" colspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td v-for="(item,index) in tableColumnList" :key="index">{{item.quality_name}}</td>
        </tr>
        <tr>
          <td colspan="2">学生评价</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2"></td>
        </tr>
        <tr style="height: 100px">
          <td  colspan="2">评价（包括主要优点及缺陷）</td>
          <td  colspan="10"></td>
        </tr>
      </table>



    </div>
  </el-dialog>
</template>

<script>
    import http from '@/http/http.js'
    export default {
        name: "Student_Info_View",
        props:['studentId'],
        data(){
            return{
                showDialogVisible: false,
                studentData:[]
            }
        },
        methods:{
            //查看信息
            handleShow: function () {
                this.showDialogVisible = true;
                var studentId = 10001001;
                http.manager.getStudentWithUserById(studentId).then(res => {
                    this.studentData = res.data;
                })
            },
            getImgPathForShow() {
                return require('@/assets/' + this.studentData.img_path);
            },

        }
    }
</script>

<style scoped>

</style>
