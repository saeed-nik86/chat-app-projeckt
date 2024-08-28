<template>
  <div class="p-2">
    <!-- محتوا غیر از بیوگرافی -->
    <div v-if="!BiographyState">
      <div class="rounded mt-2" style="background: #273c75;">
        <i
          class="bi bi-arrow-right ms-2 text-light i-hover-color"
          @click="ConditionProfile"
          style="font-size: 25px;"
        ></i>
        <div class="d-flex">
          <img
            :src="userPic"
            class="mt-2 ms-2 border rounded-circle p-1"
            style="width: 40px; height: 40px"
            alt
          />
          <p class="mt-2 ms-2 text-light">
            {{personsLastName}} {{personsFatherName}}
            <br />
            <span class="text-secondary" style="font-size: 15px;">افلاین</span>
          </p>
        </div>
        <h1 class="tetx-warning" style="background-color: red;"></h1>
        <hr />
        <div data-bs-toggle="modal" style="cursor: pointer;" data-bs-target="#staticBackdrop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e8eaed"
          >
            <path
              d="M440-439.83ZM148.61-173.67q-22.75 0-38.85-16.09-16.09-16.1-16.09-38.94v-421.77q0-22.99 16.09-39.01 16.1-16.02 39.07-16.02h120l73.67-80.83h204.33v23.16h-193.5l-74.16 80.84H148.83q-14 0-23 9.58t-9 22.42v421.5q0 14 9 23t23 9h582.34q14 0 23-9t9-23v-318h23.16v318q0 22.97-16.02 39.07-16.02 16.09-38.92 16.09H148.61ZM763.17-682v-81.17H682v-23.16h81.17v-81.17h23.16v81.17h81.17v23.16h-81.17V-682h-23.16ZM440.08-302.17q57.92 0 97.75-39.55 39.84-39.54 39.84-98.11 0-57.17-39.82-97-39.81-39.84-97.83-39.84-58.02 0-97.44 39.84-39.41 39.83-39.41 97.16 0 58.38 39.49 97.94 39.5 39.56 97.42 39.56Zm-.14-23.16q-48.48 0-81.04-32.87-32.57-32.87-32.57-81.26 0-48.39 32.6-81.22 32.59-32.82 81.12-32.82 48.85 0 81.65 32.82 32.8 32.83 32.8 81.22t-32.87 81.26q-32.87 32.87-81.69 32.87Z"
            />
          </svg>
          <span class="ms-3" style="color: #1e90ff;">افزودن عکس</span>
        </div>
      </div>
      <div class="mt-4 mt-2 rounded" style="background: #273c75;">
        <p class="p-3" style="color: #1e90ff;">حساب کاربری</p>
        <div>
          <div class="px-3">
            <span style="color: #1e90ff;">شماره تلفن</span>
            <p class="text-light">{{personsContactOwner}}</p>
          </div>
          <hr />
          <div class="px-3">
            <span style="color: #1e90ff;">نام کاربری</span>
            <p class="text-light">{{userName}}</p>
          </div>
          <hr />
          <div class="px-3" @click="chngeState" style="cursor: pointer;">
            <span style="color: #1e90ff;">بیوگرافی</span>
            <p class="text-light pb-2">{{personsDescription}}</p>
          </div>
        </div>
      </div>
      <div class="rounded mt-3" style="background: #273c75;">
        <div class="d-flex">
          <i class="bi bi-key-fill mt-3 ms-2 text-light" style="font-size: 25px;"></i>
          <p class="mt-3 ms-3" style="color: #1e90ff;">تغیر رمز عبور</p>
        </div>
      </div>
    </div>

    <!-- محتوای بیوگرافی با انیمیشن -->
    <transition name="fade-slide">
      <div class="h-75" v-if="BiographyState">
        <ChangeBiography @back="chngeState" @setbio="handlebio" />
      </div>
    </transition>

    <!-- Modal برای انتخاب فایل -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <div class="d-flex w-100" style="justify-content: space-between;">
              <div>
                <button type="button" class="dismis" data-bs-dismiss="modal" aria-label="Close">
                  <i class="bi bi-x-lg text-light i-hover-color" style="font-size: 25px"></i>
                </button>
              </div>
              <div>
                <i
                  class="bi bi-check2 modal-title text-light i-hover-color"
                  data-bs-dismiss="modal"
                  style="font-size: 25px;"
                  @click="uploadFile"
                ></i>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flex" style="justify-content: center;">
              <img
                :src="userPic"
                class="border rounded-circle"
                style="width: 100px; height: 100px;"
                alt
              />
            </div>
            <div class="file-upload mt-3 d-flex" style="justify-content: center;">
              <input
                type="file"
                id="fileInput"
                ref="fileInput"
                style="display: none"
                @change="onFileChange"
              />
              <button
                class="text-light ms-2 btn-img i-hover-color"
                id="uploadButton"
                @click="openFile"
              >انتخاب عکس</button>
              <button
                @click="uploadFile"
                data-bs-dismiss="modal"
                class="btn-img ms-3 text-success"
              >ذخیره</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import ChangeBiography from "./Changeprofile/ChangeBiography.vue";
import { getpersonsinfocurrentuser } from "@/api/user";
import { AddProfilePicture, EditPersonsDescription } from "@/api/chat";

export default {
  name: "Profile",
  components: {
    ChangeBiography
  },
  data() {
    return {
      BiographyState: false,
      file: null, // برای ذخیره فایل انتخاب شده
      personsIdPk: null,
      userName: "",
      userPic: "",
      personsLastName: "",
      personsFatherName: "",
      personsContactOwner: "",
      personsDescription: ""
    };
  },
  methods: {
    ConditionProfile() {
      this.$emit("state");
    },
    chngeState() {
      this.BiographyState = !this.BiographyState;
    },
    openFile() {
      this.$refs.fileInput.click();
    },
    async uploadFile() {
      if (!this.$refs.fileInput.files[0]) {
        Notification({
          title: "انجام نشد",
          message: "لطفا یک عکس را انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else {
        // ساخت FormData برای ارسال فایل
        const formData = new FormData();
        formData.append("PersonsNationalIdPk", this.personsIdPk);
        formData.append("PersonsProfilePicture", this.$refs.fileInput.files[0]);

        try {
          const response = await AddProfilePicture(formData);
          alert(response.data);
        } catch (error) {
          console.error("خطا در ارسال فایل:", error);
        }
      }
    },
    async loadUserInfo() {
      try {
        const res = await getpersonsinfocurrentuser();
        this.personsIdPk = res.data.personsNationalId;
        this.userPic = res.data.personsProfilePicture;
        this.userName = res.data.userName;
        this.personsLastName = res.data.personsLastName;
        this.personsFatherName = res.data.personsFatherName;
        this.personsContactOwner = res.data.personsContactOwner;
        this.personsDescription = res.data.personsDescription;
        console.log("personsIdPk:", this.personsIdPk); // برای بررسی مقدار
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      }
    },
    handlebio(bio) {
      this.personsDescription = bio;
      try {
        EditPersonsDescription(bio);
        this.BiographyState = false; // برگرداندن به حالت اولیه
      } catch (error) {
        console.error("خطا در تغییر بیوگرافی:", error);
      }
    },
    onFileChange() {
      const file = event.target.files[0]; // دریافت فایل انتخاب شده
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.userPic = e.target.result; // تنظیم URL تصویر برای نمایش
        };
        reader.readAsDataURL(file); // خواندن فایل به عنوان URL داده
      }
    }
  },
  mounted() {
    this.loadUserInfo();
  }
};
</script>


<style scoped>
.btn-img {
  background: #052c65 !important;
  border-radius: 10px;
  border: 1px solid white !important;
  padding: 5px !important;
}

.dismis {
  background: transparent;
  border: none;
  outline: none;
}

/* انیمیشن ورودی و خروجی */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
