<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      placeholder=" جستجو کنید"
      clearable
      class="header-search-select"
      filterable
      allow-create
      default-first-option
      remote
      @change="change"
    >
      <!-- <el-option
                v-for="item in list"
                :key="item.path"
                :value="item.component"
                :label="item.path"      :remote-method="onSearch"
              /> -->
      <div v-for="item in list">
        <el-option
          v-for="item in item.children"
          :key="item.path"
          :value="item"
          :label="item.name"
        />
      </div>
    </el-select>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'
import { datatree } from '@/api/menu'
import { accesss } from '@/api/article'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      list: [],
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined,
      azam: []
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  // created(){
  //  this.droplist();
  // },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    click() {
      this.show = !this.show
      if (this.show) {
        this.droplist()
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.list = []
      this.show = false
    },
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.list = []
      this.$nextTick(() => {
        this.show = false
      })
    },

    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          )
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },

    // onSearch() {
    //   // if (query !== '') {
    //   //   this.list = this.fuse.search(query)
    //   // } else {
    //   //   this.list = []
    //   // }
    //    for(item in list){
    //     for( item in item.children){

    //       this.item = this.item.children.filter((data) => data.name.toString().includes(this.search.toString()));

    //     }

    //    }

    // },

    droplist() {
      accesss('پرسنل').then((response) => {
        this.list = response.data
      })
    },

    onSearch(search, loading) {
      if (search.length > 1) {
        accesss(search).then((response) => {
          this.list = response.data

          // this.list.forEach((element, index) => {
          //   this.azam[index] = element.children;
          // });

          // this.list = await JSON.parse(JSON.stringify(response.data));
          //   this.children = this.list.filter(function (obj) {
          //   if (obj.name === name) {
          //     return  obj.data;
          //   }
          // });
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
