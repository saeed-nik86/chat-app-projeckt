import request from '@/utils/request'

export function login(data) {
    return request({
        url: 'api/User/Login',
        method: 'post',
        data
    })
}


export function logout() {
    return request({
        url: 'api/User/LogOut',
        method: 'post',
        
    })
}
//مشخصات فردلایگن کرده
export function getpersonsinfocurrentuser() {
    return request({
      url: 'api/Person/GetPersonsInfoCurrentUser',
      method: 'get'
    })
  }
  export function GetPesronInfoByCurrentUserName() {
    return request({
      url: 'api/User/GetPesronInfoByCurrentUserName',
      method: 'get',
    })
  }
  export function getRefreshToken() {
    return request({
      url: 'api/User/RefreshToken',
      method: 'get'
    })
  } 
