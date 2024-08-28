<template>
  <div class="app-container navbar-sidebar">
    <div class="el-row">
      <div class="navbar">
        <div class="el-col-4 el-col-lg-1 el-col-md-1">
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
          />
        </div>
        <div class="el-col-20 el-col-lg-9 el-col-md-9">
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <div class="el-col-24 el-col-lg-14 el-col-md-14">
          <div class="right-menu">
            <!-- <template v-if="device == 'mobile'"> -->
            <!-- <div class="div_d">
              <el-tooltip effect="dark" content="راهنما" placement="bottom"
                ><button type="button" class="btn m-1" @click="modalhelp">
                  <i class="el-icon-question help" />
                </button>
              </el-tooltip>
            </div> -->

            <div class="div_d">
              <el-tooltip effect="dark" content="خروج" placement="bottom">
                <button
                  class="btn btn_haver_c"
                  style="
                    color: #5a5e66;
                    margin-left: -0.4em !important;
                    min-width: 20px !important;
                  "
                  @click="logout()"
                >
                  <font-awesome-icon icon="fa-solid fa-power-off" /></button>right-menu-item
              </el-tooltip>
            </div>
            <div class="div_d" style="padding: 0 8px">
              <el-tooltip effect="dark" content="راهنما" placement="bottom">
                <router-link to="/seting/help">
                  <font-awesome-icon
                    icon="fa-solid fa-circle-question"
                    class="user-avatar help_n"
                  />
                </router-link>
              </el-tooltip>
            </div>
            <el-tooltip effect="dark" content="جستجو" placement="bottom">
              <search id="header-search" class="right-menu-item" />
            </el-tooltip>
            <error-log
              v-if="device !== 'mobile'"
              class="errLog-container right-menu-item hover-effect"
            />
            <el-tooltip effect="dark" content="تمام صفحه" placement="bottom">
              <screenfull
                v-if="device !== 'mobile'"
                id="screenfull"
                class="right-menu-item hover-effect"
              />
            </el-tooltip>
            <el-tooltip
              v-if="device !== 'mobile'"
              content="سایز متن"
              effect="dark"
              placement="bottom"
            >
              <size-select
                id="size-select"
                class="right-menu-item hover-effect"
              />
            </el-tooltip>
            <!-- </template> -->
            <el-dropdown
              class="avatar-container right-menu-item hover-effect dra dir_rit"
              trigger="click"
            >
              <div class="avatar-wrapper">
                <font-awesome-icon icon="fa-solid fa-user" class="" />
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown" style="top: 34px">
                <el-dropdown-item>{{ name }}</el-dropdown-item>
                <router-link to="/profile/index">
                  <el-dropdown-item>پروفایل</el-dropdown-item>
                </router-link>
                <router-link to="/">
                  <el-dropdown-item>داشبورد</el-dropdown-item>
                </router-link>
                <!-- <router-link to="/">
                  <el-dropdown-item>فعالیت ها</el-dropdown-item>
                </router-link> -->
                <!-- <el-dropdown-item divided @click.native="logout">
            <span style="display: block">خروج</span>
          </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters(['name', 'sidebar', 'avatar', 'device'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
    // باز کردن مودال راهنما
  }
}
</script>
<style scoped>

.help_n {
  margin-top: 17px !important;
}

.btn {
  font-size: unset !important;
  margin-top: 10px !important;
}
.div_d {
  display: inline-block;
  /* padding: 0 8px; */
  height: 100%;
  font-size: 18px !important;
  color: #5a5e66 !important;
  vertical-align: text-bottom;
  /* width: 77px; */
}
.right-menu {
  position: absolute;
  left: 0px;
}
.mobile .navbar {
  height: 100px;
}
.btn_haver_c:hover {
  color: #5a5e66 !important;
}
/* .dir_rit {
  direction: rtl !important;
} */
.el-popper[x-placement^="bottom"] {
  direction: rtl !important;
  top: 35px !important;
}
/* .el-popper {
  direction: rtl !important;
  top: 35px !important;
} */
.header-search .header-search-select[data-v-032bd1f0] .el-input__inner {
  border-radius: 4px !important;
}
</style>
<style lang="scss" scoped>
.navbar {
  //  height: auto;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: right;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: right;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: left;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 11px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 27px;
          height: 27px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    [class*="el-col-"] {
      float: right !important;
    }

  }
}
</style>
