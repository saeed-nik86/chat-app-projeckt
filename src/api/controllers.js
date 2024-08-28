import request from '@/utils/request'

export function addcontroll(data) {
    return request({
      url: 'api/SystemAccess/AddController',
      method: 'post',
      data
    })
  }

  export function deletcontroll(id) {
    return request({
      url: 'api/SystemAccess/DeleteController',
      method: 'post',
      params: { id }
    })
  }


  export function editcontroll(data) {
    return request({
        url: 'api/SystemAccess/EditController',
        method: 'post',
        data
    })

    
}

export function gridcontroll() {
    return request({
        url: "api/SystemAccess/GetAllControllers",
        method: 'get'

    })
}

export function dropcontroll() {
    return request({
        url: 'api/SystemAccess/GetPageName',
        method: 'get'

    })
}