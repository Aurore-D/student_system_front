import http from '@/http/httpRequest.js'


/*axios.get("getAllUserlogin")*/
export function getAllUserlogin() {
    return http(
      {
        url: '/getAllUserlogin',
        method: 'get',
        params:{}
    }
    )
}
/*axios({
                      method: 'post',
                      url: 'repassword',
                      data: this.multipleSelection
                  })*/
export function repassword(data) {
  return http(
    {
      url: '/repassword',
      method: 'post',
      params:{},
      data:data
    }
  )
}




