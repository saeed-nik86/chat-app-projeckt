import request from '@/utils/request'


export function fetchMasterRole() {
    return request({
      url: 'api/SystemAccess/GetAllMasterRoleList' ,
      method: 'get' 
    })
  }

export function fetchRole(Id) {
    return request({
      url: 'api/SystemAccess/GetAllAccessRolesListByMasterList' ,
      method: 'get',
      params: {Id}
    })
  }
   
export function fetchAllRole() {
    return request({
      url: 'api/SystemAccess/GetAllAccessRolesList' ,
      method: 'get'
    })
  }
  

export function fetchRolesUser(UserName) {
    return request({
      url: 'api/User/GetAllUserRole' ,
      method: 'get',
      params: {UserName}
    })
  }
  

export function createRoleUser(data) {
  return request({
    url: 'api/User/AddRoleToUser',
    method: 'post',
    data
  })
  }
  
export function deleteRoleUser(Id) {
  return request({
    url: 'api/User/DeleteRoleFromUser',
    method: 'post',
    params: {Id}
  })
  }
   //رول فرد لاگین کرده
   export function GetAllCurrentUserRole() {
    return request({
      url: 'api/User/GetAllCurrentUserRole',
      method: 'get'
    })
  }

  export function reportroleitem(nationalId) {
    return request({
      url: 'api/Person/GetPersonsInfoByNationalId',
      method: 'get',
      params: {nationalId}
    })
  }
  
