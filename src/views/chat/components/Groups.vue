<template>
  <div>
    <div v-if="!stateGroup" class="p-2">
      <div class="p-2" style="height: 6vh; background: transparent">
        <div class="d-flex" style="justify-content: space-between">
          <i
            class="bi bi-arrow-right mt-3 text-light i-hover-color"
            @click="endGroup"
            style="font-size: 25px"
          ></i>
          <h4 class="text-md-start text-center text-light">گروه ها</h4>
        </div>
      </div>
      <hr class="text-light" />
      <div class="mt-4" style="height: 94vh; overflow: auto; background: transparent">
        <div class="text-light text-center mt-3" v-if="!groups.length">هیچ گروهی ندارید</div>
        <div
          class="d-flex my-4 hover-custom p-2"
          v-else
          @click="goChat(group)"
          v-for="(group, index) in groups"
          :key="index"
        >
          <img
            :src="group.personsProfilePicture"
            class="rounded-circle border"
            style="width: 60px; height: 60px"
            alt
          />
          <p class="h5 ms-3 mt-3 text-light">
            {{ group.messageGroupTitel }}
            <br />
            <span
              class="text-secondary"
              style="font-size: 14px; white-space: nowrap"
            >{{group.lastMessage}}</span>
          </p>
        </div>
        <div class="text-center">
          <button class="button" @click="startGroup">
            <span class="text-light me-2 button-content">یک گروه ایجاد کنید</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#e8eaed"
              class="button-content"
            >
              <path
                d="M504.17-514.5q18.65-20.84 25.74-47.19 7.09-26.35 7.09-55.64 0-29.3-7-55.32t-25.83-46.85q43.83-2.33 73.91 27.33 30.09 29.67 30.09 75.17t-30.09 74.81q-30.08 29.3-73.91 27.69Zm193.66 280.33v-46q0-30.61-11.02-56.89-11.03-26.28-39.81-42.44 62.06 11.07 96.2 35.72 34.13 24.66 34.13 63.77v45.84h-79.5Zm64.84-234.66v-83.84h-83.84v-23.16h83.84v-83.84h23.16v83.84h83.84v23.16h-83.84v83.84h-23.16Zm-406.75-43q-44.64 0-74.53-30.46t-29.89-75.03q0-44.56 29.87-74.71 29.86-30.14 74.96-30.14 44.22 0 74.86 30.13t30.64 74.69q0 44.57-30.64 75.04-30.64 30.48-75.27 30.48ZM90.83-234.17v-47.66q0-22.14 13.19-41.35 13.19-19.2 37.05-30.11 56.43-25.04 109.45-38.21 53.03-13.17 105.5-13.17 52.48 0 105.12 13.17 52.65 13.17 110.18 38.5 22.68 10.83 36.6 30.02 13.91 19.19 13.91 41.31v47.5h-531ZM356.67-535q34.33 0 58.16-23.83 23.84-23.84 23.84-58.17t-23.84-58.17Q391-699 356.33-699q-35.5 0-58.58 23.83-23.08 23.84-23.08 58.17t23.04 58.17Q320.76-535 356.67-535ZM114-257.33h484.67v-24.22q0-14.93-10-28.44-10-13.51-29.17-23.68Q509-358 458.98-369.75q-50.03-11.75-102.73-11.75-52.88 0-103.15 11.75t-100.77 36.08q-19.16 10.17-28.75 23.72Q114-296.4 114-281.67v24.34ZM356.67-617Zm0 359.67Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <transition name="fade-slide">
      <div v-if="stateGroup">
        <AddGroup @back="startGroup" />
      </div>
    </transition>
  </div>
</template>

<script>
import { GetChatUsers } from "@/api/chat";
import AddGroup from "./Changeprofile/AddGroup.vue";
export default {
  name: "Groups",
  components: {
    AddGroup
  },
  data() {
    return {
      stateGroup: false,
      groups: []
    };
  },
  methods: {
    // برای باز کردن کامپوننت addgroup
    startGroup() {
      this.stateGroup = !this.stateGroup;
      this.laodInfo();
    },
    // برای بستن همین کامپوننت
    endGroup() {
      this.$emit("backGroup");
    },
    // برای رفتن به کامپوننت chat
    goChat(group) {
      this.$emit("goChat", group);
    },
    laodInfo() {
      GetChatUsers().then(
        res => (this.groups = res.data.filter(item => item.messageGroupIdFk))
      );
    }
  },
  mounted() {
    this.laodInfo();
  }
};
</script>

<style>
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
