import request from '@/utils/request'
export function GetProgramPublic() {
                    return request({
                        url: 'api/Program/GetProgramPublic',
                        method: 'get'
                    })
                }
                