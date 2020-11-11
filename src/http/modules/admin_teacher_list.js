import http from '@/http/httpRequest.js'


/*axios.get("getAllTeacher", {
          params: {
            teacherName: this.teacher_list.teacher_name
          }
        })*/
export function getAllTeacher(teacherName) {
    return http(
      {
        url: '/getAllTeacher',
        method: 'get',
        params:{
          teacherName:teacherName
        }
    }
    )
}

/*axios.get("getAllTeacherByPage", {
          params: {
            pageSize: this.teacher_list.page_size,
            currentPage: this.teacher_list.current_page,
            teacherName: this.teacher_list.teacher_name
          }
        })*/
export function getAllTeacherByPage(pageSize,currentPage,teacherName) {
  return http(
    {
      url: '/getAllTeacherByPage',
      method: 'get',
      params:{
        pageSize:pageSize,
        currentPage:currentPage,
        teacherName:teacherName
      }
    }
  )
}

/*axios.get("addTeacher", {
          params: {
            teacherName: this.addTeacherForm.teacher_name
          }
        })*/
export function addTeacher(teacherName) {
  return http(
    {
      url: '/addTeacher',
      method: 'get',
      params:{
        teacherName:teacherName
      }
    }
  )
}

/*axios.get("deleteTeacher", {
            params: {
              teacherId: teacher.teacherId
            }
          })*/
export function deleteTeacher(teacherId) {
  return http(
    {
      url: '/deleteTeacher',
      method: 'get',
      params:{
        teacherId:teacherId
      }
    }
  )
}

/*axios.get("getTeacherById", {
         params: {
           teacherId: teacher.teacherId
         }
       })*/
export function getTeacherById(teacherId) {
  return http(
    {
      url: '/getTeacherById',
      method: 'get',
      params:{
        teacherId:teacherId
      }
    }
  )
}

/*axios.get("updateTeacherById", {
                     params: {
                       teacherId: this.updateTeacherForm.teacher.teacherId,
                       teacherName: this.updateTeacherForm.teacher.teacherName
                     }
                   })*/
export function updateTeacherById(teacherId,teacherName) {
  return http(
    {
      url: '/updateTeacherById',
      method: 'get',
      params:{
        teacherId:teacherId,
        teacherName:teacherName
      }
    }
  )
}

export function batchdelete(teachers) {
  return http(
    {
      url: '/batchdeleteTeacher',
      method: 'post',
      params: {},
      data: teachers
    }
  )
}


