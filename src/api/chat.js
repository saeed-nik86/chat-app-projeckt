import request from '@/utils/request'

export function GetPesronInfoByCurrentUserName() {
  return request({
    url: 'api/User/GetPesronInfoByCurrentUserName',
    method: 'get',

  })
}

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


export function EditPersonsDescription(description) {
  return request({
    url: 'api/Person/EditPersonsDescription',
    method: 'Post',
    params: { description }

  })
}

export function GetChatUsers() {
  return request({
    url: 'api/Chat/GetChatUsers',
    method: 'get',
  })
}

export function GetFriends() {
  return request({
    url: 'api/Chat/GetFriends',
    method: 'get',
  })
}

export function aAddFriend(username) {
  return request({
    url: 'api/Chat/AddFriend',
    method: 'Post',
    params: { username }
  })
}

export function DeleteFriend(username) {
  return request({
    url: 'api/Chat/DeleteFriend',
    method: 'Post',
    params: { username }
  })
}

export function AddGroup(data) {
  return request({
    url: 'api/Chat/AddGroup',
    method: 'Post',
    data
  })
}

export function GetGroupInfo(groupId) {
  return request({
    url: 'api/Chat/GetGroupInfo',
    method: 'get',
    params: { groupId }
  })
}


export function DeleteGroup(id) {
  return request({
    url: 'api/Chat/DeleteGroup',
    method: 'Post',
    params: { id }
  })
}

export function EditGroup(data) {
  return request({
    url: 'api/Chat/EditGroup',
    method: 'Post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function AddGroupMember(groupId, data) {
  return request({
    url: 'api/Chat/AddGroupMember',
    method: 'Post',
    data,
    params: { groupId }
  })
}

export function DeleteGroupMember(groupId, data) {
  return request({
    url: 'api/Chat/DeleteGroupMember',
    method: 'Post',
    data,
    params: { groupId }
  })
}


export function GetChatByUser(username) {
  return request({
    url: 'api/Chat/GetChatByUser',
    method: 'get',
    params: { username }
  })
}

export function GetChatGroup(groupId) {
  return request({
    url: 'api/Chat/GetChatGroup',
    method: 'get',
    params: { groupId }
  })
}
