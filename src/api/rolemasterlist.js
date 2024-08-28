import request from '@/utils/request'


export function addnasterrolelist(data) {
    return request({
      url: 'api/SystemAccess/AddMasterRoleList',
      method: 'post',
      data
    })
  }

  export function deletmasterrolelist(id) {
    return request({
      url: 'api/SystemAccess/DeleteMasterRoleList',
      method: 'post',
      params: { id }
    })
  }

  export function editmasterrolelist(data) {
    return request({
        url: 'api/SystemAccess/EditMasterRoleList',
        method: 'post',
        data
    })

    
}

export function gridmasterrole() {
    return request({
        url: "api/SystemAccess/GetAllMasterRoleList",
        method: 'get'

    })
}
