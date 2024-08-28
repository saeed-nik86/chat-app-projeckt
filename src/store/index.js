import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
Vue.mixin({
  data: function() {
    return {
      notdifinend: 'موردی یافت نشد .',
      yes: '',
      text: '',
      searchheader: false,
      searsch: false,
      searchparson: false,
      // متغیر برای رنگی سطر ها
      tabletd: '',
      page: [],
      pageing: [],
      pageend: 0,
      pagenumber: [],
      pageid: 0,
      pageitem: 1,
      pagenumberp: [],
      arraypage: [],
      fuulname: ''
    }
  },

  methods: {
    myGlobalMethod() {
    },
    resetStyle() {
      var elements = document.querySelectorAll(
        '.form-control , .el-input__inner'
      )
      elements.forEach((element) => {
        element.classList.remove('stwarning')
      })
    },
    // برای جست و جو
    s_j() {
      if (this.searsch === false) {
        document.getElementById('search').classList.add('arroend')
        document.getElementById('search').classList.remove('noarroend')
        document.getElementById('rr').classList.add('rr')
        this.searsch = true
      } else {
        this.searsch = false
        document.getElementById('search').classList.add('noarroend')
        document.getElementById('search').classList.remove('arroend')
        document.getElementById('rr').classList.add('rr')
      }
    },
    // برای جست و جو
    headerr() {
      if (this.searchparson === false) {
        document.getElementById('textt').classList.add('arroend')
        document.getElementById('textt').classList.remove('noarroend')
        document.getElementById('rr').classList.add('rr')
        this.searchparson = true
      } else {
        this.searchparson = false
        document.getElementById('textt').classList.add('noarroend')
        document.getElementById('textt').classList.remove('arroend')
        document.getElementById('rr').classList.add('rr')
      }
    },
    headertwo() {
      if (this.searchheader === false) {
        document.getElementById('textttwo').classList.add('arroend')
        document.getElementById('textttwo').classList.remove('noarroend')
        document.getElementById('rr').classList.add('rr')
        this.searchheader = true
      } else {
        this.searchheader = false
        document.getElementById('textttwo').classList.add('noarroend')
        document.getElementById('textttwo').classList.remove('arroend')
        document.getElementById('rr').classList.add('rr')
      }
    },
    // ثبت جدول اول در صفحه
    colorrowreg(statusCode, index) {
      if (statusCode === 'Success') {
        setTimeout(() => {
          this.tabletd = document.getElementById('tablee').rows[index]
          this.tabletd.classList.add('colortr')
        }, 300)
        setTimeout(() => {
          this.tabletd.classList.remove('colortr')
          this.tabletd.classList.add('colortd')
        }, 4000)
      }
    },
    // جدول دوم
    colorrowreg2(statusCode, index) {
      if (statusCode === 'Success') {
        setTimeout(() => {
          this.tabletd = document.getElementById('tableedit').rows[index]
          this.tabletd.classList.add('colortr')
        }, 300)
        setTimeout(() => {
          this.tabletd.classList.remove('colortr')
          this.tabletd.classList.add('colortd')
        }, 4000)
      }
    },
    colorrow(statusCode, index) {
      // ویرایش
      if (statusCode === 'Success') {
        var td = document.getElementById('tablee').rows[index]
        td.classList.add('colortr')
        setTimeout(() => {
          td.classList.remove('colortr')
          td.classList.add('colortd')
        }, 4000)
      }
    },
    colorroww(statusCode, index) {
      if (statusCode === 'Success') {
        var td = document.getElementById('tableedit').rows[index]
        td.classList.add('colortr')
        setTimeout(() => {
          td.classList.remove('colortr')
          td.classList.add('colortd')
        }, 4000)
      }
    },
    //  پیج بندی
    paging(value, page) {
      this.arraypage.splice(0, this.pageing.length)
      this.arraypage.splice(0, this.pagenumberp.length)
      this.pageing.splice(0, this.pageing.length)
      for (var i = 0; i < value; i++) {
        this.pageing.push(page[i])
      }
      const listid = this.pageing.indexOf(undefined)
      this.pageing.splice(listid, this.pageing.length)
      this.pageid = value
      this.pageitem = 1
      this.pagenumberp = this.pagennum(value, page)
      this.arraypage.push(this.pageing)
      this.arraypage.push(this.pagenumberp)
      return this.arraypage
    },
    pagennum(value, page) {
      const num = page.length / value
      this.pagenumber.splice(0, this.pagenumber.length)
      for (var i = 0; i < num; i++) {
        this.pagenumber.push(i + 1)
      }
      return this.pagenumber
    },
    pageitemm(item, show, page) {
      if (this.pageitem < item) {
        this.pageid = (item - 1) * show
        this.pageend = this.pageid + show
        this.pageing = page.slice(this.pageid, this.pageend)
        this.pageid = this.pageend
        this.pageitem = item
      }
      if (this.pageitem > item) {
        this.pageid = (item - 1) * show
        this.pageend = this.pageid + this.showitemm
        //  this.pageid = this.pageend - this.showitemm;
        this.pageing = page.slice(this.pageid, this.pageend)
        this.pageid = this.pageend
        this.pageitem = item
      }
      return this.pageing
    },

    scrolllazam() {
      const container = document.querySelector('#items-container')
      let startY
      let startX
      let scrollLeft
      let scrollTop
      let isDown
      container.addEventListener('mousedown', (e) => mouseIsDown(e))
      container.addEventListener('mouseup', (e) => mouseUp(e))
      container.addEventListener('mouseleave', (e) => mouseLeave(e))
      container.addEventListener('mousemove', (e) => mouseMove(e))
      function mouseIsDown(e) {
        isDown = true
        startY = e.pageY - container.offsetTop
        startX = e.pageX - container.offsetLeft
        scrollLeft = container.scrollLeft
        scrollTop = container.scrollTop
      }
      function mouseUp(e) {
        isDown = false
      }
      function mouseLeave(e) {
        isDown = false
      }
      function mouseMove(e) {
        if (isDown) {
          e.preventDefault()
          // Move vertcally
          const y = e.pageY - container.offsetTop
          const walkY = y - startY
          container.scrollTop = scrollTop - walkY
          // Move Horizontally
          const x = e.pageX - container.offsetLeft
          const walkX = x - startX
          container.scrollLeft = scrollLeft - walkX
        }
      }
    }
  }
})
const store = new Vuex.Store({
  modules,
  getters
})

export default store
