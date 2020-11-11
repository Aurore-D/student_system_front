import http from '@/http/httpRequest.js'


/* axios.get("getAllManager", {
         params: {
           managerName: this.manager_list.manager_name
         }
       })*/
export function getAllManager(managerName) {
  return http(
    {
      url: '/getAllManager',
      method: 'get',
      params: {
        managerName: managerName
      }
    }
  )
}

/*axios.get("getAllManagerByPage", {
          params: {
            pageSize: this.manager_list.page_size,
            currentPage: this.manager_list.current_page,
            managerName: this.manager_list.manager_name
          }
        })*/
export function getAllManagerByPage(pageSize, currentPage, managerName) {
  return http(
    {
      url: '/getAllManagerByPage',
      method: 'get',
      params: {
        pageSize: pageSize,
        currentPage: currentPage,
        managerName: managerName
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
      params: {}
    }
  )
}

/*axios.get("addManager", {
                  params: {
                    managerName: this.addManagerForm.manager_name,
                    deptName: this.addManagerForm.dept_name
                  }
                })*/
export function addManager(managerName, deptName) {
  return http(
    {
      url: '/addManager',
      method: 'get',
      params: {
        managerName: managerName,
        deptName: deptName
      }
    }
  )
}

/*axios.get("deleteManager", {
                       params: {
                           managerId: manager.manager_id
                       }
                   })*/
export function deleteManager(managerId) {
  return http(
    {
      url: '/deleteManager',
      method: 'get',
      params: {
        managerId: managerId
      }
    }
  )
}

/*axios.get("getManagerById", {
                    params: {
                        managerId: manager.manager_id
                    }
                })*/
export function getManagerById(managerId) {
  return http(
    {
      url: '/getManagerById',
      method: 'get',
      params: {
        managerId: managerId
      }
    }
  )
}

/*axios.get("updateManagerById", {
                        params: {
                            managerId: this.updateManagerForm.manager_id,
                            managerName: this.updateManagerForm.manager_name,
                            deptName: this.updateManagerForm.dept_name
                        }
                    })*/
export function updateManagerById(managerId, managerName, deptName) {
  return http(
    {
      url: '/updateManagerById',
      method: 'get',
      params: {
        managerId: managerId,
        managerName: managerName,
        deptName: deptName
      }
    }
  )
}

export function batchdelete(managers) {
  return http(
    {
      url: '/batchdeleteManager',
      method: 'post',
      params: {},
      data: managers
    }
  )
}


