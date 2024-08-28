import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
import { getRefreshToken } from '@/api/user'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 400000
  // headers:{
  //    'Cache-Control' :'max-age=1000'
  // }
  // baseURL: "http://192.168.1.101:8075",
})
// const service = axios.create({
//   //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url  //

// // baseURL: "https://localhost:44357/",
//     baseURL: "http://localhost:8090",
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 400000 // request timeout
// })
 //http://localhost:8090//
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    //  return Promise.reject(error)
    return error
  }
)

// response interceptor
service.interceptors.response.use(
  /**
         * If you want to get http information such as headers or status
         * Please return  response => response
         */

  /**
         * Determine the request status by custom code
         * Here is just an example
         *
         *
         */
  // برای ری دایرکت کردن و انداختن بیرون
  response => {
    if (response.statusCode === 6) {
      removeToken()
      router.go('/login')
    } else {
      // برای رفرش توکن  هر درخواستی بده میاد تایم ریکوست رو اپدیت میکنه
      var today = new Date()
      store.state.datetimerequest = today
      const diffTime = Math.abs(store.state.datetimelogin - store.state.datetimerequest)
      // console.log(store.state.datetimelogin);
      //  console.log(store.state.statuschecklogin);
      // console.log(diffTime);
      const diffDays = Math.ceil((diffTime / 1000 / 60) % 60)
      // console.log(diffDays);
      if (diffDays >= 5 && diffDays <= 20 && store.state.statuschecklogin !== false) {
        store.state.statuschecklogin = false
        // removeToken();
        getRefreshToken().then((response) => {
          if (response.isSuccess === true) {
            today = new Date()
            setToken(response.data.token)
            store.state.datetimerequest = today
            store.state.datetimelogin = today
            store.state.statuschecklogin = true
          }
          if (response.isSuccess === false) {
            // اگر لاگین به خطا خورد میندازش دیگه بیرون
            removeToken()
            router.go('/login')
          }
        }).catch(error => {
          // console.log(error);
          Notification({
            title: 'انجام نشد',
            message: error.response.data.message,
            type: 'error',
            duration: 4000,
            position: 'top-left',
            dangerouslyUseHTMLString: false
          })
        })
      } else if (diffDays > 20) {
        removeToken()
        // template: `
        // <loginmodal  />`
        router.go('/login')
      }
    }
    return response.data
  },

  error => {
    // this.loading = false
    // loading(false)
    // man ezaf kardam
    Notification({
      title: 'انجام نشد',
      message: error.response.data.message,
      type: 'error',
      duration: 4000,
      position: 'top-left',
      dangerouslyUseHTMLString: false
    })
    if (error.response.data.statusCode === 6) {
      removeToken()
      router.go('/login')
    }
  }

)

export default service
