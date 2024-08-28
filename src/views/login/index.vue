<template>
  <div class="login-container">

    <div class="row" style="    justify-content: center;">

      <div class="col-8 col-lg-7 back1 ">
        <div class="row">
          <div class="col-12 col-lg-6 my-3 back" style="padding: 5px 23px 0px 23px;">
            <div class="back_img" />
          </div>
          <div class="col-12 col-lg-6 my-3">
            <div class="row">
              <div class="col-12 col-lg-12" style="text-align: right;">
                <img src="../../assets/image/logos5.jpg" style="width: 30%;margin: -8px 0px;">
              </div>
              <div class="col-12 col-lg-12 text-end">
                <p class="mtn-1">خوش آمدید</p>
                <p class="mtn-2 pb-3">ورود به سامانه تردد آرسام</p>
                <hr class="hr-1">
              </div>

              <div class="col-12 col-lg-12 mt-4">

                <el-form ref="loginForm" :model="loginForm"  :rules="loginRules" class="login-form" autocomplete="on">
                  <p class="mtn-3">نام کاربری</p>
                  <el-form-item prop="username" class="user-name">
                    <!-- <span class="svg-container svg-color"> -->
                    <!-- <svg-icon icon-class="user" /> -->
                    <!-- </span>  -->
                    <el-input
                      ref="username"
                      v-model="loginForm.username"
                      placeholder=""
                      name="username"
                      type="text"
                      tabindex="1"
                      autocomplete="on"
                      class="no_border"
                    />
                  </el-form-item>

                  <p class="mtn-4">کلمه عبور</p>
                  <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="password" class="pass-word">

                      <!-- <span class="svg-container svg-color"> -->
                      <!-- <svg-icon icon-class="password" />
                     </span> -->
                      <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        class="no_border"
                        style="width: 100%;"
                        :type="passwordType"
                        placeholder=""
                        name="password"
                        tabindex="2"
                        
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                      />
                      <span class="show-pwd svg-color" @click="showPwd">
                        <!-- <font-awesome-icon
              :icon="
                passwordType === 'password'
                  ? 'fa-solid fa-eye-slash'
                  : ' fa-solid fa-eye'
              "
            /> -->
                        <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />  -->
                      </span>
                    </el-form-item>
                  </el-tooltip>

                  <el-button
                    :loading="loading"
                    type="primary"
                    class="btn-login"
                    @click.native.prevent="handleLogin"
                  >ورود</el-button>
                </el-form>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div
      class="row"
      style="position: fixed;
              top: -14px;
              justify-content: end;
              right: 27px;"
    />

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
    <div
      class="row m-0"
      style="position: fixed;
              width: 100%;
              bottom: 0;
              background-color: white;
              border: 1px #74634d solid;
              border-radius: 7px;"
    >
      <div
        class="col-12"
        style="position: fixed;
              width: 100%;
              bottom: 0px;
              background-color: rgb(6 6 6 / 51%);"
      >
        <div class="mx-4" style="text-align:center;">
          <p class="py-3">

            <el-link
              href="http://viewsoft.ir/"
              class="d-block"
              style="color: #fff;direction:rtl"
              target="_blank"
              :underline="false"
            >تمام حقوق مادی و معنوی محفوظ است
              طراحی و برنامه نویسی :شرکت نما نرم افزار آفتاب
              viewsoft.ir
            </el-link>

          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { loading } from '../validation/validation'
import SocialSign from './components/SocialSignin'
import {
  alert
} from '../validation/validation'
export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {},
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.msg = []

      if (this.loginForm.username == '' || this.loginForm.username == undefined || this.loginForm.username == null) {
        this.msg.push('نام کاربری را وارد کنید')
      }
      if (this.loginForm.password == 0) {
        this.msg.push('کلمه عبور را وارد کنید')
      }
      if (this.msg.length != 0) {
        alert(this.msg)
      } else if (this.msg.length == 0) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            loading(true)
            this.loading = true
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({
                  path: '/'
                })
                loading(false)
                this.loading = false
              
              })
              .catch(() => {
                loading(false)
                this.loading = false
              })
          } else {
            loading(false)
            this.loading = false
            return false
          }
        })
      }
    },
   
 
  }
}
</script>

<style lang="scss">


$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    height: 42px;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 98%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #ffffff inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {

  min-height: 100%;
  width: 100%;
  background-color: #414e59;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  justify-content: center;

  // .login-form {
  //   position: relative;
  //   width: 520px;
  //   max-width: 100%;
  //   padding: 160px 35px 0;
  //   margin: 0 auto;
  //   overflow: hidden;
  // }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {

      margin-left: 100px;
      margin-top: -60px;
      font-size: 32px;
      color: #c72228;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      font-style: normal;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

}

.svg-color {
  color: #000000 !important;
}

.logo {
  background: url("../../assets/image/logo.png");
}

// .back1 {

//   background-color: #fff;
//   border-radius: 12px;
//   height: 600px;
//   margin: 50px;
// }

.ax-back {
  justify-content: right;
  background-color: #AF8349;
  height: 500px;
  margin: 50px;
  border-radius: 8px;
}

.mtn-1 {
  margin-top: 0%;
  margin-left: 33%;
  font-size: 25px;
  font-weight: bold;
  font-style: normal;
  color: #000000;
}

.mtn-2 {
  font-size: 25px !important;
  margin-left: 20%;
  margin-top: -5px;
  font-weight: bold;
  font-style: normal;
  color: #5c749a;
}

.p-11 {
  height: 3px;
  width: 100px;
  background-color: #AF8349;
}

// @media screen and (max-width: 768px)
// {
//   .login-container {

//   }
// }

@media screen and (max-width: 400px) {
  .login-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .user-name[data-v-37dfd6fc] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 230px;
    height: 43px;
    background-color: white;
    border: 1px #b3a89b solid;
    border-radius: 7px;
    margin-top: 0px !important;
  }

  .btn-login {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block;
    margin-top: 20px !important;
    background-color: #5c749a;
    border-radius: 7px;
    width: 230px;
    height: 45px;
    border: 0px;
  }

  .pass-word {
    background-color: white !important;
    border: 1px #b3a89b solid;
    display: block;
    margin-left: auto;
    border-radius: 7px;
    margin-right: auto;
    width: 230px;
    height: 45px;
    margin-top: -5px;
  }

  .mg1 {
    margin-top: 2%;
  }

  .mtn-1 {
    margin-top: -10px;
    margin-left: 32%;
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    color: #000000;
  }

  .mtn-3 {
    direction: rtl;
    font-size: 15px;
    margin-right: 10%;
    margin-top: -10px;
  }

  .mtn-4 {
    direction: rtl;
    margin-top: -10px;
    font-size: 15px;
    margin-right: 10%;
  }

  .mtn-2 {
    font-size: 19px !important;
    margin-left: 13%;
    margin-top: -5px;
    font-weight: bold;
    font-style: normal;
    color: #5c749a;
  }

  .back {
    display: none;

  }

  .back1 {
    background-color: #fff;
    border-radius: 12px;
    //height: 400px !important;
    margin: 70px;
    margin-top: 14% !important;
  }

  .hr-1 {
    height: 2%;
    width: 230px;
    margin: auto;
    color: #5c749a;
    margin-top: -10px;

  }

  .back1 {
    //height: 68vh !important;
    margin-top: 4rem !important;
  }
}

@media screen and (max-width: 780px) {
  .login-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .mg1 {
    margin-top: 2%;
  }

  .back {
    display: none;
  }

  .btn-login {
    margin-left: auto !important;
    margin-right: auto !important;
    display: block;
    margin-top: 30px !important;
    background-color: #5c749a;
    border-radius: 7px;
    width: 270px;
    height: 45px;
    border: 0px;
  }

  .mtn-1 {
    margin-top: -5px;
    margin-left: 37%;
    font-size: 25px;
    font-weight: bold;
    font-style: normal;
    color: #000000;
  }

  .mt-auto {
    margin-top: auto !important;
  }

  .hr-1 {
    height: 2%;
    width: 270px;
    margin: auto;
    color: #5c749a;
  }

  .mtn-2 {
    font-size: 25px !important;
    margin-left: 25%;
    margin-top: -5px;
    font-weight: bold;
    font-style: normal;
    color: #5c749a;
  }

  .mtn-3 {
    direction: rtl;
    font-size: 17px;
    margin-right: 25%;
    margin-top: -5px;
  }

  .mtn-4 {
    direction: rtl;
    margin-top: -10px;
    font-size: 17px;
    margin-right: 25%;
  }

  .back {
    display: none;
  }

  .back1 {
    //height: 81vh !important;
    margin-top: 2rem !important;
  }
}

.back1 {
  background-color: #fff;
  border-radius: 12px;
  //height: 440px !important;
  margin: 70px;
  margin-top: 8% !important;
}

.mt-3 {
  margin-top: 0rem !important;
}

.hr-1 {
  width: 270px;
  height: 2%;
  margin: auto;
  color: #5c749a;
  margin-top: -10px;
}

.mtn-3 {
  direction: rtl;
  font-size: 17px;
  margin-right: 21%;
  margin-top: -5px;
}

.mtn-4 {
  direction: rtl;
  margin-top: -10px;
  font-size: 17px;
  margin-right: 19%;
}

.user-name {
  display: block;
  margin-left: auto;
  border-radius: 7px;
  margin-right: auto;
  width: 270px;
  height: 45px;
  border: 1px rgb(123 112 98) solid;

  background-color: white;
  border: 1px #b3a89b solid;
  border-radius: 7px;
}

.pass-word {
  background-color: white !important;
  border: 1px #b3a89b solid;
  display: block;
  margin-left: auto;
  border-radius: 7px;
  margin-right: auto;
  width: 270px;
  height: 45px;
  margin-top: -5px;
}

.btn-login {
  margin-left: auto !important;
  margin-right: auto !important;
  display: block;
  margin-top: 20px !important;
  background-color: #5c749a;
  border-radius: 7px;
  width: 270px;
  height: 45px;
  border: 0px;
}

.login-container .el-input input:-webkit-autofill {
  // -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;
  box-shadow: 0 0 0px 1000px #ffffff inset !important;
  -webkit-text-fill-color: #000 !important;
  border-radius: 10px;
}

.back_img {
  height: 100%;
  background-image: url(../../assets/image/slider5.jpg);
  background-size: cover;
  width: 100%;
  border-radius: 6px;
  background-position: center;
}
</style>
