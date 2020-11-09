import http from '@/http/httpRequest.js'


/*axios.get("getAllStuWithManager", {
                    params: {
                        studentName: this.student_name,
                        managerId: 1001,
                        periodNo: 1,//转正
                        curPage: page,
                        pageSize: size
                    }
                })*/
export function getAllStuWithManager(studentName, managerId, periodNo, curPage, pageSize) {
  return http(
    {
      url: '/getAllStuWithManager',
      method: 'get',
      params: {

        studentName: studentName,
        managerId: managerId,
        periodNo: periodNo,//转正
        curPage: curPage,
        pageSize: pageSize

      }
    }
  )
}

/*axios.get("getScoreByStudentIdWithManager", {
                    params: {
                        studentId: student.student_id,
                        studentId: 1  //转正时期分数
                    }
                })*/
export function getScoreByStudentIdWithManager(studentId, periodNo) {
  return http(
    {
      url: '/getScoreByStudentIdWithManager',
      method: 'get',
      params: {
        studentId: studentId,
        periodNo: periodNo//转正
      }
    }
  )
}

/*axios({
                           method: 'post',
                           url: 'updateStuScoreWithManager',
                           data: this.editForm
                       })*/
export function updateStuScoreWithManager(data) {
  return http(
    {
      url: '/updateStuScoreWithManager',
      method: 'post',
      data: data,
      params: {}
    }
  )
}

/*axios.get("getEvaluationWithManagerByStudentId", {
                  params: {
                      studentId: student.student_id,
                      periodNo: 1//转正
                  }
              })*/
export function getEvaluationWithManagerByStudentId(studentId,periodNo) {
  return http(
    {
      url: '/getEvaluationWithManagerByStudentId',
      method: 'get',
      params: {
        studentId:studentId,
        periodNo:periodNo
      }
    }
  )
}

/*axios.get("evaluatingStudentWithManager", {
                            params: {
                                managerName: "刘表",
                                studentId: this.evaluateForm.studentId,
                                periodNo: 1,//转正
                                overallScore: this.evaluateForm.overallScore,
                                evaluationFormDept: this.evaluateForm.evaluationFormDept
                            }
                        })*/
export function evaluatingStudentWithManager(managerName, studentId, periodNo, overallScore, evaluationFormDept) {
  return http(
    {
      url: '/evaluatingStudentWithManager',
      method: 'get',
      params: {
        managerName: managerName,
        studentId: studentId,
        periodNo: periodNo,//转正
        overallScore: overallScore,
        evaluationFormDept: evaluationFormDept
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


