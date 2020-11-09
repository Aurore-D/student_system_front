import http from '@/http/httpRequest.js'


export function getAllStuWithTeacher(student_name, teacher_id, curPage, pageSize) {
  return http(
    {
      url: '/getAllStuWithTeacher',
      method: 'get',
      params: {

        'student_name': student_name,
        'teacher_id': teacher_id,
        'curPage': curPage,
        'pageSize': pageSize

      }
    }
  )
}


export function getScoreByStudentId(studentId) {
  return http(
    {
      url: '/getScoreByStudentId',
      method: 'get',
      params: {
        'studentId': studentId
      }
    }
  )
}

export function updateStuScoreWithTeacher(data) {
  return http(
    {
      url: '/updateStuScoreWithTeacher',
      method: 'post',
      data: data,
      params:{}

    }
  )
}

export function getEvaluationByStudentId(studentId) {
  return http(
    {
      url: '/getEvaluationByStudentId',
      method: 'get',
      params: {
        studentId: studentId
      }
    }
  )
}

/*  axios.get("evaluatingStudentWithTeacher", {
                    params: {
                        teacherName: "刘备",
                        studentId: this.evaluateForm.studentId,
                        overallScore: this.evaluateForm.overallScore,
                        evaluationFormSchool: this.evaluateForm.evaluationFormSchool
                    }
                })*/

export function evaluatingStudentWithTeacher(teacherName, studentId, overallScore, evaluationFormSchool) {
  return http(
    {
      url: '/evaluatingStudentWithTeacher',
      method: 'get',
      params: {
        teacherName: teacherName,
        studentId: studentId,
        overallScore: overallScore,
        evaluationFormSchool: evaluationFormSchool
      }
    }
  )
}

export function getStudentWithUserById(studentId) {
  return http(
    {
      url: '/getStudentWithUserById',
      method: 'get',
      params: {
        studentId: studentId,
      }
    }
  )
}
