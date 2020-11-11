import http from '@/http/httpRequest.js'




/* axios.get("getAllDept", {
         params: {
           deptName: this.dept_list.dept_name
         }
       })*/
export function getAllDept(deptName) {
    return http(
      {
        url: '/getAllDept',
        method: 'get',
        params:{
          deptName: deptName
        }
    }
    )
}

/* axios.get("getAllDeptByPage", {
          params: {
            pageSize: this.dept_list.page_size,
            currentPage: this.dept_list.current_page,
            deptName: this.dept_list.dept_name
          }
        })*/
export function getAllDeptByPage(pageSize,currentPage,deptName) {
  return http(
    {
      url: '/getAllDeptByPage',
      method: 'get',
      params:{
        pageSize:pageSize,
        currentPage:currentPage,
        deptName: deptName
      }
    }
  )
}

/*axios.get("addDept", {
                   params: {
                       deptName: this.addDeptForm.dept_name
                   }
               })*/
export function addDept(deptName) {
  return http(
    {
      url: '/addDept',
      method: 'get',
      params:{
        deptName:deptName
      }
    }
  )
}

/*axios.get("deleteDept", {
                        params: {
                            deptNo: dept.deptNo
                        }
                    })*/
export function deleteDept(deptNo) {
  return http(
    {
      url: '/deleteDept',
      method: 'get',
      params:{
        deptNo:deptNo
      }
    }
  )
}

/*axios.get("getDeptById", {
                    params: {
                        deptNo: dept.deptNo
                    }
                })*/
export function getDeptById(deptNo) {
  return http(
    {
      url: '/getDeptById',
      method: 'get',
      params:{
        deptNo:deptNo
      }
    }
  )
}

/*axios.get("updateDeptById", {
                        params: {
                            deptNo: this.updateDeptForm.dept.deptNo,
                            deptName: this.updateDeptForm.dept.deptName
                        }
                    })*/
export function updateDeptById(deptNo,deptName) {
  return http(
    {
      url: '/updateDeptById',
      method: 'get',
      params:{
        deptNo:deptNo,
        deptName:deptName
      }
    }
  )
}

export function batchdelete(depts) {
  return http(
    {
      url: '/batchdeleteDept',
      method: 'post',
      params: {},
      data: depts
    }
  )
}


