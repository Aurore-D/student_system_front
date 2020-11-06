import http from '@/http/httpRequest.js'

export function login_getToken(userId,password) {
    return http(
      {
        url: '/login',
        method: 'get',
        params:{
          'userId':userId,
          'password':password
        }
    }
    )
}
export function updatePassword(userId,newPassword) {
  return http(
    {
      url: '/updateUserPassword',
      method: 'post',
      params:{
        'userId':userId,
        'newPassword':newPassword
      }
    }
  )
}
