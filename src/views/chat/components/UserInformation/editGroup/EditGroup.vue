<template>
  <div class="rounded h-100 m-3" style="background: #273c75;">
    <div class="d-flex p-3" style="justify-content: space-between; height: 6vh;">
      <i
        class="bi bi-arrow-right mt-2 text-light i-hover-color"
        style="font-size: 25px;"
        @click="changeState"
      ></i>
      <i class="bi bi-check2 mt-2 text-light i-hover-color" @click="save" style="font-size: 25px;"></i>
    </div>
    <hr />
    <div class="d-flex p-2" style="flex-direction: column; height: 10vh;">
      <span style="color: #007bff;">نام گروه</span>
      <input
        type="text "
        class="input-bio text-light text-center"
        v-model="groupName"
        style="align-self: center;"
        placeholder="نام گروه خود بنویسید"
      />
    </div>
    <hr />
    <div class="d-flex p-3" style="flex-direction: column; height: 15vh;">
      <span style="color: #007bff;">عنوان گروه</span>
      <textarea
        class="input-bio text-light text-center"
        v-model="groupTitle"
        placeholder="عنوان گروه خود را بنویسید"
        style="overflow: auto;"
      ></textarea>
    </div>
    <hr />
    <div class="text-center p-3">
      <div class="d-flex">
        <div class="text-start w-25" style="color: #007bff;">
          <span>عکس گروه</span>
        </div>
        <div class="w-50 text-center" v-show="groupPic">
          <img :src="groupPic" class="rounded-pill" style="width: 50px; height: 50px;" alt />
        </div>
      </div>
      <button class="button mt-2" @click="openFile">
        <span class="text-light button-content">انتخاب</span>
        <div class="file-upload mt-1 ms-2 button-content">
          <input
            type="file"
            id="fileInput"
            ref="fileInput"
            style="display: none"
            @change="onFileChange"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e8eaed"
            id="uploadButton"
            class="ms-2"
          >
            <path
              d="M440-439.83ZM148.61-173.67q-22.75 0-38.85-16.09-16.09-16.1-16.09-38.94v-421.77q0-22.99 16.09-39.01 16.1-16.02 39.07-16.02h120l73.67-80.83h204.33v23.16h-193.5l-74.16 80.84H148.83q-14 0-23 9.58t-9 22.42v421.5q0 14 9 23t23 9h582.34q14 0 23-9t9-23v-318h23.16v318q0 22.97-16.02 39.07-16.02 16.09-38.92 16.09H148.61ZM763.17-682v-81.17H682v-23.16h81.17v-81.17h23.16v81.17h81.17v23.16h-81.17V-682h-23.16ZM440.08-302.17q57.92 0 97.75-39.55 39.84-39.54 39.84-98.11 0-57.17-39.82-97-39.81-39.84-97.83-39.84-58.02 0-97.44 39.84-39.41 39.83-39.41 97.16 0 58.38 39.49 97.94 39.5 39.56 97.42 39.56Zm-.14-23.16q-48.48 0-81.04-32.87-32.57-32.87-32.57-81.26 0-48.39 32.6-81.22 32.59-32.82 81.12-32.82 48.85 0 81.65 32.82 32.8 32.83 32.8 81.22t-32.87 81.26q-32.87 32.87-81.69 32.87Z"
            />
          </svg>
        </div>
      </button>
    </div>
    <hr />
    <div class="text-center" @click="save">
      <button @click="save" class="button mb-2">
        <span class="button-content">تغیر اطلاعات</span>
      </button>
    </div>
  </div>
</template>

<script>
import { EditGroup } from "@/api/chat";
import { Notification } from "element-ui";
export default {
  name: "EditGroup",
  props: ["groupInfo"],
  data() {
    return {
      groupName: "",
      groupTitle: "",
      formData: null,
      groupPic: ""
    };
  },
  methods: {
    changeState() {
      this.$emit("back");
    },
    openFile() {
      this.$refs.fileInput.click();
    },
    uploadFile() {
      this.formData = new FormData();
      this.formData.append("GroupTitle", this.groupName);
      this.formData.append("GroupDesc", this.groupTitle);
      this.formData.append("GroupPicUrl", this.$refs.fileInput.files[0]);
      this.formData.append("GroupIdPk", this.groupInfo.groupIdPk);
    },

    save() {
      if (!this.groupName) {
        Notification({
          title: "انجام نشد",
          message: "لطفا یک نام برای گروه خود انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
        console.log();
      } else if (!this.groupTitle) {
        Notification({
          title: "انجام نشد",
          message: "لطفا یک عنوان برای گروه خود انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else {
        this.uploadFile();
        EditGroup(this.formData);
        this.$emit("back");
      }
    },
    onFileChange() {
      const file = event.target.files[0]; // دریافت فایل انتخاب شده
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.groupPic = e.target.result; // تنظیم URL تصویر برای نمایش
        };
        reader.readAsDataURL(file); // خواندن فایل به عنوان URL داده
      }
    }
  },
  mounted() {
    this.groupName = this.groupInfo.groupTitle;
    this.groupTitle = this.groupInfo.groupDesc;
  }
};
</script>

<style>
</style>