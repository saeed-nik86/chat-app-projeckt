import request from '@/utils/request'


export function addmenu(data) {
    return request({
      url: 'api/SystemAccess/AddSectionMenu',
      method: 'post',
      data
    })
  }

  export function deletmenu(id) {
    return request({
      url: 'api/SystemAccess/DeleteSectionMenu',
      method: 'post',
      params: { id }
    })
  }

  export function editmenu(data) {
    return request({
        url: 'api/SystemAccess/EditSectionMenu',
        method: 'post',
        data
    })
}

export function gridmenu() {
    return request({
        url: "api/SystemAccess/GetAllSectionMenu",
        method: 'get'

    })
}

export function dropmenu() {
    return request({
        url: 'api/SystemAccess/GetAllSectionMenu',
        method: 'get'

    })
}
///tree
export function datatree(data) {
  return request({
      url: 'api/SystemAccess/GetControleToPage',
      method: 'get',
      data

  })
}


export function addaccess(data) {
  return request({
      url: 'api/SystemAccess/AddAccessRoleToPage',
      method: 'post',
      data
  })
}


export function fetchtree(data) {
  return request({
      url: 'api/OrganChartControllers/GetAllparentOrganChartTreeveiw',
      method: 'get',
      data

  })
}

export function addaccesstree(data) {
  return request({
      url: 'api/Reports/GetReportInMonthByOrganChart',
      method: 'post',
      data
  })
}