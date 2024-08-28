import request from '@/utils/request'


//دارپ ارگان
export function droporg() {
    return request({
        url: 'api/Organs/GetAllOrgans',
        method: 'get'

    })
}


export function dropprogram() {
    return request({
        url: 'api/ShiftDependency/GetAllShiftWorkProgram',
        method: 'get'
      
    })
}

export function dropassis(Id) {
    return request({
        url: 'api/Organs/GetOrganAssistanceByOrganId',
        method: 'get',
        params: { Id }
    })
}

export function dropmaster() {
    return request({
        url: 'api/SystemAccess/GetAllMasterRoleList',
        method: 'get'

    })
}
export function dropm() {
    return request({
        url: 'api/SystemAccess/GetAllMasterRoleList',
        method: 'get'

    })
}
export function dropGetAllRoles() {
    return request({
        url: 'api/SystemAccess/GetAllAccessRolesList',
        method: 'get'

    })
}
export function addaccess() {
    return request({
        url: 'api/SystemAccess/AddAccessRolesList',
        method: 'post'

    })
}

export function gridaccessrolelist() {
    return request({
        url: 'api/SystemAccess/GetAllAccessRolesList',
        method: 'get'
        
    })
}


export function deleterolelist(Id) {
    return request({
        url: 'api/SystemAccess/DeleteAccessRolesList',
        method: 'post',
        params: { Id }
    })
}

export function editaccessrolelist(data) {
    return request({
        url: 'api/SystemAccess/EditAccessRolesList',
        method: 'post',
        data
    })
}

export function droprole(MasterRoleId) {
    return request({
        url: 'api/SystemAccess/GetAcessRoleToPage',
        method: 'get',
        params: { MasterRoleId }
    })
}

export function apidroprolspecial() {
    return request({
        url: 'api/SystemAccess/GetSpecialRoleType',
        method: 'get'

    })
}

export function apiaddspecialRoles(data) {
    return request({
        url: 'api/SystemAccess/AddSpecialRole',
        method: 'post',
        data
    })
}

export function addrolelist(data) {
    return request({
        url: 'api/SystemAccess/AddAccessRolesList',
        method: 'post',
        data
    })
}

export function GetAllAccessSpecial() {
    return request({
        url: 'api/SystemAccess/GetAllAccessSpecialRole',
        method: 'get'

    })
}

export function apideletespecialRoles(Id) {
    return request({
        url: 'api/SystemAccess/DeleteAccessSpecialRole',
        method: 'post',
        params:{ Id }
    })
}
