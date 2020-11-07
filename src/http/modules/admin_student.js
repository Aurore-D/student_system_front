import http from '@/http/httpRequest.js'


/*axios.get('getStudentByPage', {
                    params: {
                        curPage: this.curPage,
                        pageSize: this.pageSize,
                        student_name: this.student_name,
                        class_no: this.class_no
                    }
                })*/
export function getStudentByPage(curPage, pageSize, student_name, class_no) {
  return http(
    {
      url: '/getStudentByPage',
      method: 'get',
      params: {

        curPage: curPage,
        pageSize: pageSize,
        student_name:student_name,
        class_no:class_no

      }
    }
  )
}

/*axios.get('getStudentByName', {
                    params: {
                        student_name: this.student_name,
                        class_no: this.class_no
                    }
                })*/
export function getStudentByName(student_name,class_no) {
  return http(
    {
      url: '/getStudentByName',
      method: 'get',
      params: {

        student_name:student_name,
        class_no:class_no

      }
    }
  )
}

/*axios.get("getAllClass_no")*/
export function getAllClass_no() {
  return http(
    {
      url: '/getAllClass_no',
      method: 'get',
      params: {

      }
    }
  )
}
/*axios.get("getAllDept_name")*/
export function getAllDept_name() {
  return http(
    {
      url: '/getAllDept_name',
      method: 'get',
      params: {

      }
    }
  )
}

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
export function addStudents(student_name, folk,sex,marital_status, id_number,
                            graduate_school,birthday,major,class_no, phone,
                            native_place,img_path,remark) {
  return http(
    {
      url: '/addStudents',
      method: 'get',
      params: {
        student_name:student_name,
        folk:folk,
        sex:sex,
        marital_status:marital_status,
        id_number:id_number,
        graduate_school:graduate_school,
        birthday:birthday,
        major:major,
        class_no:class_no,
        phone:phone,
        native_place:native_place,
        img_path:img_path,
        remark:remark
      }
    }
  )
}

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
export function editStudent(student_id,student_name,folk,sex,marital_status,
                            id_number,graduate_school,birthday,major,class_no,
                            native_place, img_path,phone,dept_name, remark) {
  return http(
    {
      url: '/editStudent',
      method: 'get',
      params: {
        student_id:student_id,
        student_name:student_name,
        folk:folk,
        sex:sex,
        marital_status:marital_status,
        id_number:id_number,
        graduate_school:graduate_school,
        birthday:birthday,
        major:major,
        class_no:class_no,
        native_place:native_place,
        img_path:img_path,
        phone:phone,
        dept_name:dept_name,
        remark:remark
      }
    }
  )
}

/*axios.get('delStudent', {
                    params: {
                        student_id: this.delStudent_id
                    }
                })*/
export function delStudent(student_id) {
  return http(
    {
      url: '/delStudent',
      method: 'get',
      params: {
        student_id:student_id
      }
    }
  )
}




