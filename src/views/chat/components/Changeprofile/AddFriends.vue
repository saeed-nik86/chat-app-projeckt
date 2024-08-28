<template>
  <div class="rounded m-3 me-4 p-2 h-100" style="background: #273c75; ">
    <div class="d-flex" style="justify-content: space-between;">
      <i
        class="bi bi-arrow-right ms-3 text-light i-hover-color"
        @click="chngeState"
        style="font-size: 25px;"
      ></i>
      <i
        class="bi bi-check2 me-3 text-light i-hover-color"
        @click="changeState"
        style="font-size: 25px;"
      ></i>
    </div>
    <div>
      <p
        class="p-2 text-secondary mt-4 text-center"
        style="font-size: 1em;"
      >با وارد کردن شماره تلفن دوستان خود می توانید انها را پیدا کنید</p>
    </div>
    <div class="d-flex mt-4" style="align-items: center; flex-direction: column;">
      <input
        type="text"
        class="input-bio text-center text-light"
        v-model="userId"
        placeholder="شماره تلفن را وارد کنید"
      />
      <br />
      <button class="button" @click="changeState"> <span class="button-content"> اضافه کرئن </span></button>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
export default {
  name: "AddFriends",
  data() {
    return {
      userId: ""
    };
  },
  methods: {
    chngeState() {
      this.$emit("back");
    },
    changeState() {
      if (!this.userId) {
        Notification({
          title: "انجام نشد",
          message: "یک نام کاربری را بنویسید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else {
        this.$emit("changeState", this.userId)
      }
    }
  }
};
</script>

<style scoped>
</style>