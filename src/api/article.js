import request from '@/utils/request'

//دارپ ارگان
export function droporg() {
    return request({
        url: 'api/Organs/GetAllOrgans',
        method: 'get'

    })
}
//ثبت ارگان
export function addorgans(data) {
    return request({
        url: 'api/Organs/AddOrgans',
        method: 'post',
        data
    })
}
//گرید ارگان
export function gridorgans() {
    return request({
        url: "api/Organs/GetAllOrgans",
        method: 'get'

    })
}
//حذف ارگان
export function deleteorgans(OrganId) {
    return request({
        url: 'api/Organs/DeleteOrgan',
        method: 'post',
        params: { OrganId }
    })
}
//ویرایش ارگان
export function editorgans(data) {
    return request({
        url: 'api/Organs/EditOrgan',
        method: 'post',
        data
    })
}
//ثبت معاونت
export function addassistance(data) {
    return request({
        url: 'api/Organs/AddAssistance',
        method: 'post',
        data
    })
}

export function gridorgansAssistants(Id) {
    return request({
        url: 'api/Organs/GetOrganAssistanceByOrganId',
        method: 'get',
        params: { Id }
    })
}

export function deleteAssistan(Id) {
    return request({
        url: 'api/Organs/DeleteAssistance',
        method: 'post',
        params: { Id }
    })
}

export function editAssistance(data) {
    return request({
        url: 'api/Organs/EditAssistance',
        method: 'post',
        data
    })
}
//ثبت مدیریت
export function addmanagment(data) {
    return request({
        url: 'api/Organs/AddManagment',
        method: 'post',
        data
    })
}
//بایند دراپ معاونت در مدیریت
export function dropmang(Id) {
    return request({
        url: 'api/Organs/GetOrganAssistanceByOrganId',
        method: 'get',
        params: { Id }
    })
}
//بایند گرید مدیریت
export function gridorgansmanagment(Id) {
    return request({
        url: 'api/Organs/GetManagmentInfoOfOrgan',
        method: 'get',
        params: { Id }
    })
}
//حذف مدیریت
export function deletemanagment(Id) {
    return request({
        url: 'api/Organs/DeleteManagment',
        method: 'post',
        params: { Id }
    })
}
//ویرایش مدیریت
export function editmanagment(data) {
    return request({
        url: 'api/Organs/EditManagment',
        method: 'post',
        data
    })
}

export function gridworkProgram() {
    return request({
        url: "api/ShiftDependency/GetAllShiftWorkProgram",
        method: 'get'

    })
}

export function addworkProgram(data) {
    return request({
        url: 'api/ShiftDependency/AddShiftWorkProgram',
        method: 'post',
        data
    })
}

export function deleteworkprogram(Id) {
    return request({
        url: 'api/ShiftDependency/DeleteShiftWorkProgram',
        method: 'post',
        params: { Id }
    })
}

export function apieditWorkProgram(data) {
    return request({
        url: 'api/ShiftDependency/EditShiftWorkProgram',
        method: 'post',
        data
    })
}

export function addshiftTitle() {
    return request({
        url: "api/ShiftDependency/GetAllShiftTitle",
        method: 'get'

    })
}

export function addworkProgramItem(data) {
    return request({
        url: 'api/ShiftDependency/AddShiftWorkProgramItem',
        method: 'post',
        data
    })
}


///گرید گروه
export function gridgroup(Id) {
    return request({
        url: "api/ShiftDependency/GetShiftWorkProgramGroupOfProgram",
        method: 'get',
        params: { Id }


    })
}

///ثبت گروه
export function addProgramGroup(data) {
    return request({
        url: 'api/ShiftDependency/AddShiftWorkProgramGroup',
        method: 'post',
        data
    })
}

///ویرایش گروه
export function editProgramGroup(data) {
    return request({
        url: 'api/ShiftDependency/EditShiftWorkProgramGroup',
        method: 'post',
        data
    })
}

export function deleteworkprogramgroup(Id) {
    return request({
        url: 'api/ShiftDependency/DeleteShiftWorkProgramGroup',
        method: 'post',
        params: { Id }
    })
}

export function addProgramitem(data) {
    return request({
        url: 'api/ShiftDependency/AddShiftWorkProgramItem',
        method: 'post',
        data
    })
}

export function gridbinditem(Id) {
    return request({
        url: "api/ShiftDependency/GetAllShiftWorkProgramItemOfProgram",
        method: 'get',
        params: { Id }


    })
}

export function deleteitem(Id) {
    return request({
        url: 'api/ShiftDependency/DeleteShiftWorkProgramItem',
        method: 'post',
        params: { Id }
    })
}


export function gridgroupp() {
    return request({
        url: 'api/PersonsGroup/GetAllGroup',
        method: 'get'
    })
}

export function addgroup(data) {
    return request({
        url: 'api/PersonsGroup/AddGroup',
        method: 'post',
        data
    })
}

export function editgroup(data) {
    return request({
        url: 'api/PersonsGroup/EditGroup',
        method: 'post',
        data
    })
}

export function deletegroup(groupId) {
    return request({
        url: 'api/PersonsGroup/DeleteGroup',
        method: 'post',
        params: {groupId}
    })
}

export function getgroup() {
    return request({
      url: 'api/PersonsGroup/GetAllGroup' ,
      method: 'get'
    
    })
  }

  export function fetchNational(q) {
    return request({
      url: 'api/AjaxSearch/AjaxFullPersonsSearch' ,
      method: 'get',
      params: {q}
    })
  }
//دسترسی منو
  export function accesss(data) {
    return request({
    url: 'api/SystemAccess/GetAccess' ,
    method: 'get',
    data
   
  })
}

//دراپ یوزر ایجکسی
export function AjaxUsersSearch(q) {
    return request({
        url: 'api/AjaxSearch/AjaxUsersSearch',
        method: 'get',
        params: {q}
    })
  }
  