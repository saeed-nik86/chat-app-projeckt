<template>
  <div class="w-100 h-100">
    <div
      class="w-100 h-100 p-3"
      v-if="!ConditionAddMember && !ConditionEditGroup && !ConditionDeleteMmember"
    >
      <div class="w-100 h-25 position-relative rounded">
        <i
          class="bi bi-arrow-right position-absolute z-3 start-0 top-0 ms-2 mt-2 i-hover-color text-light"
          @click="back"
          style="font-size: 25px"
        ></i>
        <i
          class="bi bi-three-dots-vertical position-absolute z-3 end-0 top-0 me-2 mt-2 i-hover-color text-light"
          data-bs-toggle="dropdown"
          style="font-size: 25px;"
        ></i>
        <ul class="dropdown-menu">
          <li>
            <span
              class="dropdown-item text-danger"
              @click="DeleteGroupById"
              v-if="admin"
            >حذف کردن گروه</span>
          </li>
          <li>
            <span class="dropdown-item" @click="editGroupById" v-if="admin">ویرایش گروه</span>
          </li>
          <li>
            <span class="dropdown-item" @click="DeleteMemberById" v-if="admin">حذف اعضای گروه</span>
          </li>
          <li>
            <span class="dropdown-item text-danger" @click="letGroup" v-if="!admin">ترک گروه</span>
          </li>
        </ul>
        <img :src="groupInfo.groupPicUrl" class="w-100 h-100 rounded" alt />
        <span
          class="position-absolute z-3 bottom-0 start-0 text-light mb-2 ms-2"
        >{{groupInfo.groupTitle}}</span>
      </div>
      <div class="w-100 rounded mt-4 p-2" style="background: #273c75;">
        <div>
          <div class="p-1" style="height: 10vh;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#e8eaed"
            >
              <path
                d="M469.17-306.83h23.16v-213h-23.16v213ZM479.92-568q8.25 0 13.33-4.8 5.08-4.81 5.08-13.43 0-8.9-4.99-13.67t-13.22-4.77q-9.29 0-13.87 4.66-4.58 4.67-4.58 13.4 0 8.84 5 13.73 5 4.88 13.25 4.88Zm.54 434.33q-72.35 0-135.25-27.35-62.9-27.36-109.96-74.35-47.07-46.99-74.32-109.68-27.26-62.68-27.26-135 0-71.74 27.35-135.02 27.36-63.28 74.35-110.18 46.99-46.9 109.68-73.99 62.68-27.09 135-27.09 71.74 0 135.02 27.27 63.29 27.26 110.18 74.01 46.9 46.75 73.99 109.87 27.09 63.13 27.09 134.72 0 72.35-27.19 135.25-27.19 62.9-74.01 109.84-46.83 46.94-109.95 74.32-63.13 27.38-134.72 27.38Zm-.18-23.16q134.22 0 228.55-94.28 94.34-94.28 94.34-229.17 0-134.22-94.16-228.55-94.15-94.34-228.95-94.34-134.56 0-228.89 94.16-94.34 94.15-94.34 228.95 0 134.56 94.28 228.89 94.28 94.34 229.17 94.34ZM480-480Z"
              />
            </svg>
            <span class="ms-2" style="color: #1e90ff; ">اطلاعات گروه</span>
            <div class="text-center text-light">{{groupInfo.groupDesc}}</div>
          </div>
        </div>
        <hr />
        <div class="p-1" style="overflow: auto; height: 40vh;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e8eaed"
          >
            <path
              d="M125.17-234.17v-47.66q0-26.06 13.16-43.19 13.16-17.14 37.64-28.2 50.53-23.28 96.61-37.36 46.09-14.09 119.09-14.09t118.61 14.09q45.62 14.08 97.43 37.33 23.76 11.27 36.94 28.35 13.18 17.08 13.18 43.07v47.66H125.17Zm608.83 0v-45.5q0-35.5-13.04-63.46-13.03-27.97-33.13-47.37 25.84 7.5 50.81 16.73 24.97 9.23 48.22 19.62 20.97 11.65 34.89 30.98 13.92 19.32 13.92 43.42v45.58H734ZM391.67-511.83q-44.95 0-75.14-30.2-30.2-30.19-30.2-75.14 0-44.94 30.2-74.8 30.19-29.86 75.14-29.86 44.94 0 74.8 29.86t29.86 74.8q0 44.95-29.86 75.14-29.86 30.2-74.8 30.2Zm246.66-105.53q0 44.6-29.86 74.81-29.86 30.22-75.04 30.22-.26 0 1.16.15 1.42.16 1.58.31 18-21 26.92-47.76 8.91-26.76 8.91-57.43 0-30.32-10.17-56.02-10.16-25.7-25.66-49.59-.84.46-1.34.65-.5.19-1.5.19 45.28 0 75.14 30.04t29.86 74.43Zm-490 360.03h486.34v-24.29q0-16.07-8.34-27.81Q618-321.17 597-333.67q-46.73-24.66-92.8-36.25-46.08-11.58-112.15-11.58-66.23 0-112.64 11.58-46.41 11.59-92.74 36.25-21.84 12.5-30.09 24.4-8.25 11.9-8.25 27.44v24.5ZM391.27-535q34.73 0 58.31-23.52 23.59-23.52 23.59-58.25 0-34.73-23.52-58.31-23.53-23.59-58.25-23.59-34.73 0-58.32 23.52-23.58 23.53-23.58 58.25 0 34.73 23.52 58.32Q356.54-535 391.27-535Zm.06 277.67Zm0-359.5Z"
            />
          </svg>
          <span class="ms-2" style="color: #1e90ff;">اعضای گروه</span>
          <div
            class="d-flex my-4 btn-hover-dark"
            v-for="(user, index) in groupInfo.userMember"
            :key="index"
            style="justify-content: space-between;"
          >
            <div class="d-flex">
              <img
                :src="user.personsProfilePicture"
                class="rounded-circle border"
                style="width: 60px; height: 60px"
                alt
              />
              <p class="h5 ms-3 mt-3 text-light">{{user.personsFirstName}} {{user.personsLastName}}</p>
            </div>
            <div class="pt-3 text-secondary" style="font-size: 15px;">
              <span v-if="user.groupMemberHasAdmin">مدیر</span>
              <span v-else>عضو</span>
            </div>
          </div>
        </div>
        <hr />
        <div v-if="admin" class="text-center" style="  height: 8vh;">
          <button @click="stateAddMember" class="button">
            <span class="button-content">اضافه کردن عضو</span>
          </button>
        </div>
      </div>
    </div>
    <transition name="fade-slide">
      <div v-if="ConditionAddMember">
        <AddMember @back="stateAddMember" :groupInfo="groupInfo" />
      </div>
    </transition>
    <transition name="fade-slide">
      <div v-if="ConditionEditGroup">
        <EditGroup @back="editGroupById" :groupInfo="groupInfo" />
      </div>
    </transition>
    <transition name="fade-slide">
      <div v-if="ConditionDeleteMmember">
        <DeleteMember :groupInfo="groupInfo" :manager="manager" @back="DeleteMemberById" />
      </div>
    </transition>
  </div>
</template>

<script>
import { GetGroupInfo, DeleteGroup, DeleteGroupMember } from "@/api/chat";
import { getpersonsinfocurrentuser } from "@/api/user";
import { Notification } from "element-ui";
import AddMember from "./editGroup/AddMember.vue";
import EditGroup from "./editGroup/EditGroup.vue";
import DeleteMember from "./editGroup/DeleteMember.vue";

export default {
  name: "GroupInfo",
  props: ["showInfo"],
  components: {
    AddMember,
    EditGroup,
    DeleteMember
  },
  data() {
    return {
      groupInfo: [],
      admin: false,
      manager: "",
      forDelete: [],
      ConditionAddMember: false, //برای فعال کردن کامپوننت AddMember
      ConditionEditGroup: false, //برای فعال کردن کامپوننت editGroup
      ConditionDeleteMmember: false // برای فعال کردن کامپوننت DeleteMember
    };
  },
  methods: {
    back() {
      this.$emit("stateGroupInfo");
    },
    stateAddMember() {
      this.ConditionAddMember = !this.ConditionAddMember;
      this.loadGroupInfo();
    },
    DeleteGroupById() {
      DeleteGroup(this.groupInfo.groupIdPk).then(res => {
        if (res.isSuccess) {
          Notification({
            title: "انجام شد",
            message: "! گروه شما حذف شد!",
            type: "warning",
            position: "top-left",
            duration: 4000,
            dangerouslyUseHTMLString: false
          });
        }
      });
      this.loadGroupInfo();
    },
    editGroupById() {
      this.ConditionEditGroup = !this.ConditionEditGroup;
      this.loadGroupInfo();
    },
    DeleteMemberById() {
      this.ConditionDeleteMmember = !this.ConditionDeleteMmember;
      this.loadGroupInfo();
    },
    async loadGroupInfo() {
      try {
        const groupResponse = await GetGroupInfo(
          this.showInfo.messageGroupIdFk
        );
        this.groupInfo = groupResponse.data;

        const userResponse = await getpersonsinfocurrentuser();
        this.manager = userResponse.data.userName;
        this.forDelete.push(userResponse.data.userName);
        if (Array.isArray(this.groupInfo.userMember)) {
          this.groupInfo.userMember.forEach(element => {
            if (element.groupMemberHasAdmin) {
              if (element.groupMemberUserIdFk === this.manager) {
                this.admin = true;
              }
            }
          });
        }
      } catch (error) {
        console.error("Error loading group info:", error);
      }
    },
    letGroup() {
      DeleteGroupMember(this.showInfo.messageGroupIdFk, this.forDelete).then(
        res => {
          if (res.isSuccess) {
            Notification({
              title: "انجام شد",
              message: "شما گروه را ترک کردید",
              type: "warning",
              position: "top-left",
              duration: 4000,
              dangerouslyUseHTMLString: false
            });
          }
        }
      );
      this.loadGroupInfo();
    }
  },
  mounted() {
    this.loadGroupInfo();
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
