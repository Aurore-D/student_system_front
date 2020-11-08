<template xmlns:v-model="">
  <div>
    <el-row >

      <el-col :span="22" >
        <div class="grid-content bg-purple">
          <el-input v-model="student_name" placeholder="请输入学生姓名" style="width:185px"></el-input>
          <el-input v-model="class_no" placeholder="请输入学生班期" style="width:183px"></el-input>
          <el-button type="primary" @click="doFilter">查询</el-button>
        </div>
      </el-col>

      <el-col :span="2">
        <div class="grid-content bg-purple">

          <el-button type="primary" @click="handleAdd">添加</el-button>

          <!--学生信息添加-->
          <el-dialog title="学生信息添加" :visible.sync="addDialogVisible" width="70%">
            <el-form :model="form" :rules="rules" ref="form" label-width="10px" class="demo-ruleForm">

              <table>
                <tr>
                  <td>
                    <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="student_name">
                      <el-input v-model="form.student_name" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="民族" :label-width="formLabelWidth" prop="folk">
                      <el-input v-model="form.folk" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                  <td rowspan="4">
                    <template>
                      <div style="margin-left: 20px; margin-top: -78px">
                        <el-upload
                          class="avatar-uploader"
                          action="http://localhost:8081/upload"
                          :show-file-list="false"
                          :on-change="handleAvatarChange"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="form.img_path" :src="form.img_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__tip" slot="tip">上传头像只能是jpg文件，且不超过2MB!</div>
                        </el-upload>
                      </div>
                    </template>


                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                      <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="婚否" :label-width="formLabelWidth" prop="marital_status">
                      <el-radio-group v-model="form.marital_status">
                        <el-radio label="已婚"></el-radio>
                        <el-radio label="未婚"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="id_number">
                      <el-input v-model="form.id_number"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                      <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="graduate_school">
                      <el-input v-model="form.graduate_school"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
                      <el-input v-model="form.major" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
                      <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="籍贯" :label-width="formLabelWidth" prop="native_place">
                      <el-input v-model="form.native_place" autocomplete="off" placeholder="请输入xx省xx市xx县/区"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="班期:" :label-width="formLabelWidth" prop="class_no">
                      <el-select v-model="form.class_no" placeholder="请选择班期">
                        <el-option v-for="i in (form.class.length)" :key="i" v-model:label="form.class[i-1]"
                                   v-model:value="form.class[i-1]"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="3">
                    <el-form-item label="备注" :label-width="formLabelWidth">
                      <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="addStudent('form')">确 定</el-button>
                      <el-button @click="addDialogVisible = false">取 消</el-button>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </el-form>
          </el-dialog>

          <el-dialog title="学生信息修改" :visible.sync="editDialogVisible" width="70%">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="10px" class="demo-ruleForm">

              <table>
                <tr>
                  <td>
                    <el-form-item label="学生学号" :label-width="formLabelWidth" prop="student_name">
                      <el-input v-model="editForm.student_id" readonly></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="student_name">
                      <el-input v-model="editForm.student_name" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                  <td rowspan="4">
                    <div style="margin-left: 20px; margin-top: -78px">
                      <div style="margin-top: 53%">
                        <img v-if="editForm.img_path" :src="getImgPathForEdit()" class="avatar">
                        <h5 style="margin-right:20%">原头像</h5>
                      </div>
                      <div style="margin-right: 22% ">
                        <el-upload
                          class="avatar-uploader"
                          action="http://localhost:8081/upload"
                          :show-file-list="false"
                          :on-change="handleeditAvatarChange"
                          :before-upload="beforeeditAvatarUpload"
                        >
                          <img v-if="editForm.imgPath" :src="editForm.imgPath" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__tip" slot="tip">
                            <h4>修改后头像</h4>
                            上传头像只能是jpg文件，且不超过2MB!
                          </div>

                        </el-upload>
                      </div>
                    </div>
                    <el-form-item>
                      <el-input v-model="editForm.img_path" v-show="false" autocomplete="off"></el-input>
                    </el-form-item>

                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                      <el-radio-group v-model="editForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="婚否" :label-width="formLabelWidth" prop="marital_status">
                      <el-radio-group v-model="editForm.marital_status">
                        <el-radio label="已婚"></el-radio>
                        <el-radio label="未婚"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="民族" :label-width="formLabelWidth" prop="folk">
                      <el-input v-model="editForm.folk" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="id_number">
                      <el-input v-model="editForm.id_number" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="graduate_school">
                      <el-input v-model="editForm.graduate_school" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
                      <el-input v-model="editForm.major" autocomplete="off"></el-input>
                    </el-form-item>

                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
                      <el-date-picker
                        v-model="editForm.birthday"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="籍贯" :label-width="formLabelWidth" prop="native_place">
                      <el-input v-model="editForm.native_place" autocomplete="off"
                                placeholder="请输入xx省xx市xx县/区"></el-input>
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td>
                    <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
                      <el-input v-model="editForm.phone" autocomplete="off"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item label="班期:" :label-width="formLabelWidth" prop="class_no">
                      <el-select v-model="editForm.class_no" placeholder="请选择班期">
                        <el-option v-for="i in (editForm.class.length)" :key="i" v-model:label="editForm.class[i-1]"
                                   v-model:value="editForm.class[i-1]"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-form-item label="部门信息:" :label-width="formLabelWidth" prop="dept_name">
                      <el-select v-model="editForm.dept_name" placeholder="请选择部门">
                        <el-option v-for="i in (editForm.dept.length)" :key="i" v-model:label="editForm.dept[i-1]"
                                   v-model:value="editForm.dept[i-1]"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                  <td>

                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <el-form-item label="备注" :label-width="formLabelWidth">
                      <el-input type="textarea" v-model="editForm.remark"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="editStudent('editForm')">确 定</el-button>
                      <el-button @click="editDialogVisible = false">取 消</el-button>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </el-form>


          </el-dialog>

          <el-dialog title="学生信息查看" :visible.sync="showDialogVisible" width="70%">
            <div id="showdiv">
              <table id="table">
                <tr>
                  <td>姓名</td>
                  <td>{{tablestudent_name}}</td>
                  <td>学号</td>
                  <td>{{tablestudent_id}}</td>
                  <td>性别</td>
                  <td>{{tablesex}}</td>
                  <td rowspan="4" colspan="1">
                    <div style="margin-top: -23%">
                      <img v-if="tableimg_path" :src="getImgPathForShow()" class="avatar">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>出生日期</td>
                  <td>{{tablebirthday}}</td>
                  <td>籍贯</td>
                  <td>{{tablenative_place}}</td>
                  <td>民族</td>
                  <td>{{tablefolk}}</td>
                </tr>

                <tr>
                  <td>毕业院校</td>
                  <td>{{tablegraduate_school}}</td>
                  <td>专业</td>
                  <td>{{tablemajor}}</td>
                  <td>婚否</td>
                  <td>{{tablemarital_status}}</td>
                </tr>

                <tr>
                  <td>身份证号</td>
                  <td colspan="2">{{tableid_number}}</td>
                  <td>手机号码</td>
                  <td colspan="2">{{tablephone}}</td>
                </tr>

                <tr>
                  <td>备注</td>
                  <td colspan="8">{{tableremark}}</td>
                </tr>
                <tr>
                  <td>班期</td>
                  <td colspan="8">{{tableclass_no}}</td>
                </tr>
                <tr>
                  <td>部门</td>
                  <td colspan="8">{{tabledept_name}}</td>
                </tr>
              </table>
            </div>
          </el-dialog>

          <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt" align="center">
              <i class="el-icon-info" style="color: red"></i>
              是否确定删除当前行？
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="delVisible = false">取 消</el-button>
              <el-button type="primary" @click="delStudent()">确 定</el-button>
            </span>
          </el-dialog>

        </div>
      </el-col>

    </el-row>

    <br>

    <el-row>
      <el-col :span="24" :offset="0">

        <div class="grid-content bg-purple">

          <el-table
            :data="studentData"
            border
            style="width: 100%"
          >

            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="student_id"
              label="学号"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="student_name"
              label="姓名"
              sortable
              width="150">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="graduate_school"
              label="毕业院校"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="class_no"
              label="班期"
              sortable
              width="100">
            </el-table-column>
            <el-table-column
              prop="dept_name"
              label="部门"
              sortable
            >
            </el-table-column>
            <el-table-column label="操作" width="190" fixed="right" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleShow(scope.$index, scope.row)"><i class="el-icon-view"></i>
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-pagination
        @current-change=" getStudentListByPage"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :pager-count="7"
        :total="totalStudentData.length"
        background
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>

  </div>
</template>


<script>
    import http from '@/http/http.js'
    import {getToken} from '@/http/auth.js'

    export default {
        name: "student_info_a",
        data() {
            return {

                student_name: "",
                class_no: "",
                pageSize: 5,
                curPage: 1,
                //分页员工数据
                studentData: [],
                //全部员工数据
                totalStudentData: [],
                //对话框显示隐藏，默认隐藏
                editDialogVisible: false,
                addDialogVisible: false,
                showDialogVisible: false,
                delVisible: false,

                //查看时的表格字段名
                tablestudent_name: "",
                tablestudent_id: "",
                tablesex: "",
                tablebirthday: "",
                tablefolk: "",
                tablenative_place: "",
                tableid_number: "",
                tablemarital_status: "",
                tablegraduate_school: "",
                tablephone: "",
                tablemajor: "",
                tableremark: "",
                tableclass_no: "",
                tabledept_name: "",
                tableimg_path: "",

                form: {
                    student_name: '',
                    folk: '',
                    sex: '',
                    marital_status: '',
                    id_number: '',
                    graduate_school: '',
                    birthday: '',
                    major: '',
                    class_no: '',
                    native_place: '',
                    remark: '',
                    phone: '',
                    img_path: '',
                    class: []
                }
                ,
                editForm: {
                    student_id: '',
                    student_name: '',
                    folk: '',
                    sex: '',
                    marital_status: '',
                    id_number: '',
                    graduate_school: '',
                    birthday: '',
                    major: '',
                    class_no: '',
                    dept_name: '',
                    dept_no: '',
                    phone: '',
                    native_place: '',
                    remark: '',
                    img_path: '',
                    imgPath:'',
                    class: [],
                    dept: []
                }
                ,
                rules: {
                    student_name: [
                        {required: true, message: '请输入学生姓名', trigger: 'blur'}
                    ],
                    folk:
                        [
                            {required: true, message: '请输入民族', trigger: 'blur'}
                        ],
                    sex:
                        [
                            {required: true, message: '请选择性别', trigger: 'blur'}
                        ],
                    marital_status:
                        [
                            {required: true, message: '请选择是否结婚', trigger: 'blur'}
                        ],
                    graduate_school:
                        [
                            {required: true, message: '请输入毕业学校', trigger: 'blur'}
                        ],
                    birthday:
                        [
                            {required: true, message: '请选择出生日期', trigger: 'blur'}
                        ],
                    major:
                        [
                            {required: true, message: '请输入专业', trigger: 'blur'}
                        ],
                    class_no:
                        [
                            {required: true, message: '请选择班期', trigger: 'blur'}
                        ],
                    dept_name:
                        [
                            {required: true, message: '请选择部门信息', trigger: 'blur'}
                        ],
                    native_place:
                        [
                            {required: true, message: '请输入籍贯', trigger: 'blur'}
                        ],
                    id_number:
                        [
                            {required: true, message: '请输入身份证号', trigger: 'blur'},
                            {
                                pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                                message: '证件号码格式有误！',
                                trigger: 'blur'
                            }
                        ],
                    phone:
                        [
                            {required: true, message: '请输入手机号', trigger: 'blur'},
                            {
                                pattern: /^1[34578]\d{9}$/,
                                message: '手机号码格式有误！',
                                trigger: 'blur'
                            }
                        ]

                }
                ,
                formLabelWidth: '120px'
            }
                ;

        },
        methods: {
            getImgPathForShow(){
                return require('@/assets/' + this.tableimg_path) ;
            },
            getImgPathForEdit(){
                return require('@/assets/' + this.editForm.img_path) ;
            },
            //  获取分页员工列表
            getStudentListByPage() {
                /*axios.get('getStudentByPage', {
                    params: {
                        curPage: this.curPage,
                        pageSize: this.pageSize,
                        student_name: this.student_name,
                        class_no: this.class_no
                    }
                })*/
                var curPage = this.curPage,
                    pageSize = this.pageSize,
                    student_name = this.student_name,
                    class_no = this.class_no;
                http.admin_student.getStudentByPage(curPage, pageSize, student_name, class_no).then(res => {
                    this.studentData = res.data
                });
            },
            getStudentList() {
                /*axios.get('getStudentByName', {
                    params: {
                        student_name: this.student_name,
                        class_no: this.class_no
                    }
                })*/
                var student_name = this.student_name,
                    class_no = this.class_no;
                http.admin_student.getStudentByName(student_name, class_no).then(res => {
                    this.totalStudentData = res.data
                });
            },
            //班级下拉框的获取
            getAllClass_no: function () {
                /*axios.get("getAllClass_no")*/
                http.admin_student.getAllClass_no().then(res => {
                    this.form.class = res.data;
                    this.editForm.class = res.data;
                })
            },

            //部门名下拉框的获取
            getAllDept_name: function () {
                /*axios.get("getAllDept_name")*/
                http.admin_student.getAllDept_name().then(res => {
                    this.editForm.dept = res.data;
                })
            },

            doFilter() {
                /*axios.get('getStudentByPage', {
                    params: {
                        curPage: this.curPage,
                        pageSize: this.pageSize,
                        student_name: this.student_name,
                        class_no: this.class_no
                    }
                })*/
                var curPage = this.curPage,
                    pageSize = this.pageSize,
                    student_name = this.student_name,
                    class_no = this.class_no;
                http.admin_student.getStudentByPage(curPage, pageSize, student_name, class_no).then(res => {
                    this.studentData = res.data
                });

                /*axios.get('getStudentByName', {
                    params: {
                        student_name: this.student_name,
                        class_no: this.class_no
                    }
                })*/
                http.admin_student.getStudentByName(student_name, class_no).then(res => {
                    this.totalStudentData = res.data
                });

            },

            handleAdd() {
                this.addDialogVisible = true

            },
            handleAvatarChange(file) {
                this.form.img_path = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                //在头像上传之前需要做的判断，如判断文件格式
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            addStudent(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*axios.get('addStudents', {
                            params: {
                                student_name: this.form.student_name,
                                folk: this.form.folk,
                                sex: this.form.sex,
                                marital_status: this.form.marital_status,
                                id_number: this.form.id_number,
                                graduate_school: this.form.graduate_school,
                                birthday: this.form.birthday,
                                major: this.form.major,
                                class_no: this.form.class_no,
                                phone: this.form.phone,
                                native_place: this.form.native_place,
                                img_path: this.form.img_path,
                                remark: this.form.remark
                            }
                        })*/
                        var student_name= this.form.student_name,
                            folk= this.form.folk,
                            sex= this.form.sex,
                            marital_status= this.form.marital_status,
                            id_number= this.form.id_number,
                            graduate_school= this.form.graduate_school,
                            birthday= this.form.birthday,
                            major= this.form.major,
                            class_no= this.form.class_no,
                            phone= this.form.phone,
                            native_place= this.form.native_place,
                            img_path= this.form.img_path,
                            remark= this.form.remark;
                        http.admin_student.addStudents(student_name, folk,sex,marital_status, id_number,
                            graduate_school,birthday,major,class_no, phone,
                            native_place,img_path,remark).then(res => {
                            if (res.data == true) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getStudentListByPage();
                                this.getStudentList();
                            } else {
                                this.$message({
                                    message: '添加失败',
                                    type: 'error'
                                });
                            }
                        });
                        this.addDialogVisible = false;
                        this.form.imgPath = "";
                        this.form.phone = "";
                        this.form.student_name = "";
                        this.form.folk = "";
                        this.form.sex = "";
                        this.form.marital_status = "";
                        this.form.id_number = "";
                        this.form.graduate_school = "";
                        this.form.birthday = "";
                        this.form.major = "";
                        this.form.class_no = "";
                        this.form.native_place = "";
                        this.form.img_path = "";
                        this.form.remark = "";
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            handleShow(index, row) {
                this.showDialogVisible = true;
                this.tablestudent_name = row.student_name;
                this.tablestudent_id = row.student_id;
                this.tablesex = row.sex;
                this.tablebirthday = row.birthday;
                this.tablefolk = row.folk;
                this.tablenative_place = row.native_place;
                this.tableid_number = row.id_number;
                this.tablemarital_status = row.marital_status;
                this.tablegraduate_school = row.graduate_school;
                this.tablephone = row.phone;
                this.tablemajor = row.major;
                this.tableremark = row.remark;
                this.tableclass_no = row.class_no;
                this.tabledept_name = row.dept_name;
                this.tableimg_path = row.img_path;

            },

            handleEdit(index, row) {
                this.editDialogVisible = true;
                this.editForm.student_name = row.student_name;
                this.editForm.student_id = row.student_id;
                this.editForm.sex = row.sex;
                this.editForm.birthday = row.birthday;
                this.editForm.folk = row.folk;
                this.editForm.native_place = row.native_place;
                this.editForm.id_number = row.id_number;
                this.editForm.marital_status = row.marital_status;
                this.editForm.graduate_school = row.graduate_school;
                this.editForm.major = row.major;
                this.editForm.remark = row.remark;
                this.editForm.phone = row.phone;
                this.editForm.class_no = row.class_no;
                this.editForm.dept_name = row.dept_name;
                this.editForm.img_path = row.img_path;
                /*this.editForm.imgPath = "";*/
            },

            handleeditAvatarChange(file) {
                this.editForm.imgPath = URL.createObjectURL(file.raw);
            },

            beforeeditAvatarUpload(file) {
                //在头像上传之前需要做的判断，如判断文件格式
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            editStudent(editFormName) {

                this.$refs[editFormName].validate((valid) => {
                    if (valid) {
                        /*axios.get('editStudent', {
                            params: {
                                student_id: this.editForm.student_id,
                                student_name: this.editForm.student_name,
                                folk: this.editForm.folk,
                                sex: this.editForm.sex,
                                marital_status: this.editForm.marital_status,
                                id_number: this.editForm.id_number,
                                graduate_school: this.editForm.graduate_school,
                                birthday: this.editForm.birthday,
                                major: this.editForm.major,
                                class_no: this.editForm.class_no,
                                native_place: this.editForm.native_place,
                                img_path: this.editForm.img_path,
                                phone: this.editForm.phone,
                                dept_name: this.editForm.dept_name,
                                remark: this.editForm.remark
                            }
                        })*/
                        var  student_id= this.editForm.student_id,
                            student_name= this.editForm.student_name,
                            folk= this.editForm.folk,
                            sex= this.editForm.sex,
                            marital_status= this.editForm.marital_status,
                            id_number=this.editForm.id_number,
                            graduate_school= this.editForm.graduate_school,
                            birthday= this.editForm.birthday,
                            major= this.editForm.major,
                            class_no= this.editForm.class_no,
                            native_place= this.editForm.native_place,
                            img_path= this.editForm.imgPath,
                            phone=this.editForm.phone,
                            dept_name= this.editForm.dept_name,
                            remark= this.editForm.remark;
                        http.admin_student.editStudent(student_id,student_name,folk,sex,marital_status,
                            id_number,graduate_school,birthday,major,class_no,
                            native_place, img_path,phone,dept_name, remark).then(res => {
                            if (res.data == true) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getStudentListByPage();
                                this.getStudentList();
                            } else {
                                this.$message({
                                    message: '修改失败',
                                    type: 'error'
                                });
                            }

                        });
                        this.editDialogVisible = false;
                        this.editForm.imgPath = "";

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.delVisible = true;
                this.delStudent_id = row.student_id;
            },
            delStudent() {
                /*axios.get('delStudent', {
                    params: {
                        student_id: this.delStudent_id
                    }
                })*/
                var student_id= this.delStudent_id;
                http.admin_student.delStudent(student_id).then(res => {
                    if (res.data == true) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getStudentListByPage();
                        this.getStudentList();
                    } else {
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                });
                this.delVisible = false;
            }
        },

        mounted() {
            this.getStudentListByPage();
            this.getStudentList();
            this.getAllClass_no();
            this.getAllDept_name();
        }
    }
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 160px;
    height: 190px;
    display: block;
  }

  #table {
    border: solid #add9c0;
    border-width: 1px;
    width: 100%;
    height: 400px;

  }

  #table tr td {
    width: 100px;
  }

  #showdiv {
    /*background-image:url("../assets/images/bg2.jpg");*/
    background-size: 100% 100%;
    margin-top: -20px;
  }
  .el-table__fixed {
    height: 100% !important;
  }

</style>
