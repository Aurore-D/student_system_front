import http from '@/http/httpRequest.js'


/*axios.get("getAllClass")*/

export function getAllClass() {
    return http(
      {
        url: '/getAllClass',
        method: 'get',
        params:{}
    }
    )
}

/*axios.get("getAllClassByPage", {
          params: {
            pageSize: this.class_list.page_size,
            currentPage: this.class_list.current_page
          }
        })*/

export function getAllClassByPage(pageSize,currentPage) {
  return http(
    {
      url: '/getAllClassByPage',
      method: 'get',
      params:{
        pageSize: pageSize,
        currentPage: currentPage
      }
    }
  )
}

/*axios.get("getAllTeacher_name")*/
export function getAllTeacher_name() {
  return http(
    {
      url: '/getAllTeacher_name',
      method: 'get',
      params:{}
    }
  )
}

/*axios.get("addClass", {
         params: {
           teacherId: this.addClassForm.teacher_id
         }
       })*/

export function addClass(teacherId) {
  return http(
    {
      url: '/addClass',
      method: 'get',
      params:{
        teacherId: teacherId
      }
    }
  )
}
/*axios.get("deleteClass", {
            params: {
              classNo: _class.class_no
            }
          })*/
export function deleteClass(classNo) {
  return http(
    {
      url: '/deleteClass',
      method: 'get',
      params:{
        classNo: classNo
      }
    }
  )
}
/* axios.get("getClassByNo", {
          params: {
            classNo: _class.class_no
          }
        })*/
export function getClassById(classNo) {
  return http(
    {
      url: '/getClassById',
      method: 'get',
      params:{
        classNo: classNo
      }
    }
  )
}
/* axios.get("updateClassByNo", {
            params: {
              classNo: this.updateClassForm.class_no,
              teacherId: this.updateClassForm.teacher_id
            }
          })*/
export function updateClassByNo(classNo,teacherId) {
  return http(
    {
      url: '/updateClassByNo',
      method: 'get',
      params:{
        classNo: classNo,
        teacherId:teacherId
      }
    }
  )
}

