import request from '@/utils/request'
export function addpeage(data) {
    return request({
      url: 'api/SystemAccess/AddPage',
      method: 'post',
      data
    })
  }

  export function deletpeag(id) {
    return request({
      url: 'api/SystemAccess/DeletePage',
      method: 'post',
      params: { id }
    })
  }

  export function editpeag(data) {
    return request({
        url: 'api/SystemAccess/EditPage',
        method: 'post',
        data
    })
}

export function gridpeage() {
    return request({
        url: "api/SystemAccess/GetAllPages",
        method: 'get'

    })
}
