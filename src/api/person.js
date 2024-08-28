import request from '@/utils/request'


export function fetchNational(q) {
  return request({
    url: 'api/AjaxSearch/AjaxFullPersonsSearch' ,
    method: 'get',
    params: {q}
  })
}

export function fetchOrganChart() {
    return request({
      url: 'api/OrganChartControllers/GetAllOrganChart' ,
      method: 'get' 
    })
  }

  export function fetchJobPlaces() {
    return request({
      url: 'api/Person/GetJobPlace' ,
      method: 'get' 
    })
  }

  export function fetchInfoNational(personsIdPk) {
    return request({
      url: 'api/Person/GetPersonsInfoByNationalId' ,
      method: 'GET',
      params: {personsIdPk}
    })
  }
  
export function fetchUserNameByNationalId(NationalId) {
  return request({
    url: 'api/User/GetUserNameByNationalId' ,
    method: 'get',
    params: {NationalId}
  })
}

  export function createPerson(data) {
    return request({
      url: 'api/Person/AddPerson',
      method: 'post',
      data
    })
  }
  
  export function updatePerson(data) {
    return request({
      url: 'api/Person/EditPerson',
      method: 'post',
      data
    })
  }

  export function updateStatusPerson(nId) {
    return request({
      url: 'api/Person/DisablePerson',
      method: 'post',
      params: {nId}
    })
  }

  
  export function createUser(data) {
    return request({
      url: 'api/User/AddUser',
      method: 'post',
      data
    })
  }
  
  
  export function updateUser(data) {
    return request({
      url: 'api/User/UpdatePasswordAdmin',
      method: 'post',
      data
    })
  }
  
   

  // shift
  
export async function fetchShiftPersonOnMonth(data) {
  return await request({ 
    url: 'api/PersonToCalender/GetCurrentPersonTocalanderMonth',
    method: 'post',
    data
  })
}
 
export async function fetchShiftPerson() {
  return await request({
    // url: 'api/PersonToCalender/GetByDate',
    url: 'api/PersonToCalender/GetCurrentPersonTocalander',
    method: 'post' 
  })
}
  
export async function fetchShiftPersonBySearch(data) {
  return await request({
    // url: 'api/PersonToCalender/GetByDate',
    url: 'api/PersonToCalender/GetPersonTocalander',
    method: 'post',
    data
  })
}

export function updateShift(data) {
  return request({
    url: 'api/PersonToCalender/EditePersonToCalender',
    method: 'post',
    data
  })
}
   

export function fetchAllShift() {
  return request({
    url: 'api/ShiftDependency/GetAllShiftTitle',
    method: 'get'
  })
}

export function fetchAllShiftItem() {
  return request({
    url: 'api/ShiftDependency/GetAllShiftItem',
    method: 'get'
  })
}


export function fetchAllShiftPerson(NationalId,date) {
  return request({
    url: 'api/ShiftDependency/GetAllShiftWorkProgramItemByNationalId',
    method: 'get',
    NationalId, date
  })
}

export function getgridpersongroup(NationalId) {
  return request({
    url: 'api/PersonsGroup/GetPersonsGroup',
    method: 'get',
    params:{NationalId}
  })
}
//اپدیت پسور پروفایل
export function updateUserporofilel(data) {
  return request({
    url: 'api/User/UpdatePassword',
    method: 'post',
    data
  })
}
//ثبت آدرس
export function AddPersonsAddress(data) {
  return request({
    url: 'api/Person/AddPersonsAddress',
    method: 'post',
    data
  })
}
//دریافت ادرس
export function GetPersonsAddress(Id) {
  return request({
    url: 'api/Person/GetPersonsAddress',
    method: 'get',
    params:{Id}
  })
}
//حذف ادرس
export function DeletePersonsAddress(Id) {
  return request({
    url: 'api/Person/DeletePersonsAddress',
    method: 'post',
    params:{Id}
  })
}
//تغیر توکن ادرس
export function EditTokenPersonsAddress(personId,addressId) {
  return request({
    url: 'api/Person/EditTokenPersonsAddress',
    method: 'post',
    params:{personId,addressId}
  })
}
//ویرایش توضیحات هوادار
export function EditPersonsDescription(description) {
  return request({
    url: 'api/Person/EditPersonsDescription',
    method: 'post',
    params:{description}
  })
}
//ویراش عکس پروفایل 
export function AddProfilePicture(data) {
  return request({
    url: 'api/Person/AddProfilePicture',
    method: 'Post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
//دریافت نوع تماس
export function GetContactsTitle() {
  return request({
    url: 'api/Person/GetContactsTitle',
    method: 'get',
 
  })
}
export function AddPersonsContact(data) {
  return request({
    url: 'api/Person/AddPersonsContact',
    method: 'post',
    data
  })
}
export function GetPersonsContact(Id) {
  return request({
    url: 'api/Person/GetPersonsContact',
    method: 'get',
    params:{Id}
  })
}
export function DeletePersonsContact(Id) {
  return request({
    url: 'api/Person/DeletePersonsContact',
    method: 'post',
    params:{Id}
  })
}
//نوع تماس 
//نوع هواداری

export function AddPersonsFanType(data) {
  return request({
    url: 'api/Person/AddPersonsFanType',
    method: 'post',
    data
  })
}
export function GetPersonsFanType(Id) {
  return request({
    url: 'api/Person/GetPersonsFanType',
    method: 'get',
    params:{Id}
  })
}
export function DeletePersonsFanType(Id) {
  return request({
    url: 'api/Person/DeletePersonsFanType',
    method: 'post',
    params:{Id}
  })
}
export function GetFanType() {
  return request({
    url: 'api/Person/GetFanType',
    method: 'get',
 
  })
}
export function GetPesronInfoByUserName(username) {
  return request({
    url: 'api/User/GetPesronInfoByUserName',
    method: 'get',
    params:{username}
  })
}
export function TransferPointTransaction(data) {
  return request({
    url: 'api/Point/TransferPointTransaction',
    method: 'post',
    data
  })
}