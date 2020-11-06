<template>
  <el-dialog title="学生信息添加" :visible.sync="addDialogVisible"  width="70%">
    <el-form :model="form" :rules="rules"  ref="form" label-width="10px" class="demo-ruleForm">

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
                  :headers="headers"
                  class="avatar-uploader"
                  action="http://localhost:8081/#/upload"
                  :show-file-list="false"
                  :on-error="handleAvatarChange"
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
            <el-form-item label="班期" :label-width="formLabelWidth" prop="class_no">
              <el-select v-model="form.class_no" placeholder="请选择班期">
                <el-option label="区域一" value="47"></el-option>
                <el-option label="区域二" value="48"></el-option>
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="身份证号" :label-width="formLabelWidth" prop="id_number">
              <el-input v-model="form.id_number" autocomplete="off"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="graduate_school">
              <el-input v-model="form.graduate_school" autocomplete="off"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
              <el-input v-model="form.major" autocomplete="off"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="籍贯" :label-width="formLabelWidth" prop="native_place">
              <el-input v-model="form.native_place" autocomplete="off" placeholder="请输入xx省xx市xx县/区"></el-input>
            </el-form-item>
          </td>
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
</template>

<script>
    export default {
        name: "StudentAdd",
      data(){
          return{
            addDialogVisible:true,
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
              img_path:''
            },
          }
      }
    }
</script>

<style scoped>

</style>
