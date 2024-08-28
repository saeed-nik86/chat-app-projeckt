
import request from '@/utils/request'

    export function gitcontrol(PageId) {
        return request({
            url: 'api/SystemAccess/GetAccessControllersNamesCurrentUser',
            method: 'get',
            params: { PageId }
        })
    }
