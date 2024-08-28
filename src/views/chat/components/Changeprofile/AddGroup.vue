<template>
  <div class="rounded m-3 h-100" style="background: #273c75;">
    <div class="d-flex p-2" style="justify-content: space-between;  height: 6vh;">
      <i
        class="bi bi-arrow-right mt-3 text-light i-hover-color"
        @click="chngeState"
        style="font-size: 25px;"
      ></i>
      <i class="bi bi-check2 mt-3 text-light i-hover-color" @click="save" style="font-size: 25px;"></i>
    </div>
    <hr />
    <div class="d-flex m-4" style="flex-direction: column; height: 8vh;">
      <span style="color: #007bff;">نام گروه</span>
      <input
        type="text"
        class="input-bio text-light mt-4 pb-2"
        v-model="nameGroup"
        placeholder="نام گروه خود بنویسید"
        style="align-self: center;"
      />
    </div>
    <hr />
    <div class="d-flex m-4" style="flex-direction: column; height: 13vh;">
      <span style="color: #007bff;">عنوان گروه</span>
      <textarea
        cols="30"
        rows="2"
        class="input-bio text-light mt-4"
        v-model="titleGroup"
        placeholder="عنوان گروه خود را بنویسید"
        style="align-self: center;"
      ></textarea>
    </div>
    <hr />
    <div class="text-center m-4" style="height: 13vh;">
      <div class="d-flex">
        <div class="text-start w-25" style="color: #007bff;">
          <span>عکس گروه</span>
        </div>
        <div class="w-50 text-center" v-show="groupPic">
          <img :src="groupPic" class="rounded-pill" style="width: 50px; height: 50px;" alt />
        </div>
      </div>
      <button class="button mt-2" @click="openFile">
        <span class="button-content mb-2">انتخاب</span>
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
    <div class="p-2" style="height: 23vh; overflow: auto;">
      <div style="color: #007bff;">دوستان خود را اضافه کنید</div>
      <div v-if="!friends.length" class="text-light text-center mt-3">شما هیچ دوستی ندارد</div>
      <div
        class="d-flex my-4 btn-hover-dark hover-custom p-2"
        v-for="friend in friends"
        :key="friend.messageGroupIdFk"
        v-else
        style="justify-content: space-between; "
      >
        <div class="rounded-circle d-flex">
          <img
            :src="friend.personsProfilePicture"
            class="rounded-circle border"
            style="width: 60px; height: 60px"
            alt
          />
          <p class="text-light ms-3 mt-3">
            {{friend.personsFirstName}} {{friend.personsLastName}}
            <br />
          </p>
        </div>
        <div class="mt-3">
          <label class="custom-checkbox">
            <input name="dummy" type="checkbox" @change="toggleItem(friend.username)" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
    <hr />
    <div class="text-center" @click="save">
      <button class="button mb-2">
        <span class="button-content">ایجاد گروه</span>
      </button>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { GetFriends, AddGroup } from "@/api/chat";
export default {
  name: "AddGroup",
  data() {
    return {
      friends: [],
      nameGroup: "",
      titleGroup: "",
      selectedItems: [],
      formData: null,
      groupPic: ""
    };
  },
  methods: {
    chngeState() {
      this.$emit("back");
    },
    openFile() {
      this.$refs.fileInput.click();
    },
    toggleItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index === -1) {
        // Item is not in the list, so add it
        this.selectedItems.push(item);
      } else {
        // Item is already in the list, so remove it
        this.selectedItems.splice(index, 1);
      }
    },
    uploadFile() {
      // ساخت FormData برای ارسال فایل
      this.formData = new FormData();
      this.formData.append("GroupTitle", this.nameGroup);
      this.formData.append("GroupDesc", this.titleGroup);
      this.formData.append("GroupPicUrl", this.$refs.fileInput.files[0]);
      this.selectedItems.forEach((item, index) => {
        this.formData.append(`UserMember[${index}]`, item);
      });
    },

    save() {
      if (!this.nameGroup) {
        Notification({
          title: "انجام نشد",
          message: "لطفا یک اسم برای گروه خود انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else if (!this.titleGroup) {
        Notification({
          title: "انجام نشد",
          message: "لطفا یک عنوان برای گروه خود انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else if (!this.selectedItems.length) {
        Notification({
          title: "انجام نشد",
          message: "لطفا حداقل یک عضو برای گروه خود انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else if (!this.$refs.fileInput.files[0]) {
        Notification({
          title: "انجام نشد",
          message: "یک عکس برای گروه خود انتخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else {
        this.uploadFile();
        AddGroup(this.formData).then(res => {
          if (res.isSuccess) {
            Notification({
              title: "انجام شد",
              message: "گروه شما ایجاد شد ",
              type: "Success",
              position: "top-left",
              duration: 4000,
              dangerouslyUseHTMLString: false
            });
            this.$emit("back");
          } else {
            Notification({
              title: "انجام نشد",
              message: res.message,
              type: "warning",
              position: "top-left",
              duration: 4000,
              dangerouslyUseHTMLString: false
            });
          }
        });
      }
    },
    loadInfo() {
      GetFriends().then(res => (this.friends = res.data));
      console.log(this.friends);
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
    this.loadInfo();
  }
};
</script>

<style scoped>
</style>