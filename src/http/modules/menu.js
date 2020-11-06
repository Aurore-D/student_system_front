import http from '@/http/httpRequest.js'
import store from '@/store/index'

export function getMenus() {


  return http({
    url: '/Aside/getMenus',
    method: 'get',
    params: {
      "userId": JSON.parse(localStorage.getItem('store')).user.userId
     //
      //store.state.user.userId
    }
  })
}
