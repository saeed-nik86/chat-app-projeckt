<template>
  <div class="h-100 w-100">
    <div v-if="!addFriends" class="w-100 h-100 p-2">
      <div class="d-flex w-100" style="  justify-content: space-around; height: 6%;">
        <i
          class="bi bi-arrow-right text-light i-hover-color mt-4"
          @click="Users"
          style="font-size: 25px;"
        ></i>
        <span class="text-light d-md-none d-lg-block mt-4">دوستان</span>
        <input
          class="mt-3 input-search text-light"
          type="search"
          placeholder="جست و جو"
          aria-label="Search"
          style=" max-width: 14vh !important;"
          v-model="search"
        />
        <i
          class="bi bi-search mt-4 text-light i-hover-color"
          style="font-size: 25px;"
          @click="searching"
        ></i>
      </div>
      <hr class="text-light" />
      <div class="w-100" style="height: 94%; overflow: auto;">
        <div v-if="!friends.length" class="text-center text-light mt-5">شما هیچ دوستی ندارید</div>
        <div
          class="d-flex my-4 hover-custom p-2"
          v-else
          v-for="friend in friends"
          :key="friend.messageGroupIdFk"
          style="justify-content: space-between;"
        >
          <div class="rounded-circle d-flex">
            <img
              :src="friend.personsProfilePicture"
              class="rounded-circle border"
              style="width: 60px; height: 60px"
              alt
            />
            <p class="text-light ms-3">
              {{friend.personsFirstName}} {{friend.personsLastName}}
              <br />
              <span class="text-secondary" style="font-size: 15px;">
                <span v-if="friend.onLineStatus">انلاین</span>
                <span v-if="!friend.onLineStatus">افلاین</span>
              </span>
            </p>
          </div>
          <div class="mt-3">
            <i
              class="bi bi-trash3 me-3 i-hover-color-danger text-light"
              @click="deleteFriend(friend.username)"
              style="font-size: 25px;"
            ></i>
            <i
              class="bi bi-chat-dots text-light i-hover-color"
              style="font-size: 25px"
              @click="goChat(friend)"
            ></i>
          </div>
        </div>
        <div class="text-center">
          <button class="button" @click="stateFriend">
            <span class="text-light me-2 button-content">اضافه کردن دوست</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#e8eaed"
              class="button-content"
            >
              <path
                d="M735-426.5v-121.67H613.33v-23.16H735V-693h23.17v121.67h121.66v23.16H758.17v121.67H735Zm-374.82-85.33q-44.23 0-74.71-30.46Q255-572.75 255-617.32q0-44.56 30.46-74.71 30.46-30.14 74.69-30.14t74.71 30.13q30.47 30.13 30.47 74.69 0 44.57-30.46 75.04-30.46 30.48-74.69 30.48ZM93.67-234.17v-47.66q0-21.98 13.32-41.06 13.33-19.07 37.02-30.06 57.73-26 110.71-38.86t105.31-12.86q52.33 0 105.52 12.84 53.18 12.83 111 38.72 23.53 11.45 36.83 30.35 13.29 18.91 13.29 41.09v47.5h-533Zm23.16-23.16H603.5v-24.22q0-15.04-10.17-28.5-10.16-13.45-28.16-23.62-51.8-24.33-101.88-36.08t-103.1-11.75q-53.37 0-103.7 11.75Q206.17-358 156-333.67 136.5-323.5 126.67-310q-9.84 13.5-9.84 28.17v24.5ZM360.17-535q34.33 0 58.16-23.83 23.84-23.84 23.84-58.17t-23.84-58.17Q394.5-699 360.17-699q-34.34 0-58.17 23.83-23.83 23.84-23.83 58.17T302-558.83Q325.83-535 360.17-535Zm0-82Zm0 359.67Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <transition name="fade-slide">
      <div v-if="addFriends">
        <AddFriends @back="stateFriend" @changeState="newFirend" />
      </div>
    </transition>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { GetFriends, aAddFriend, DeleteFriend } from "@/api/chat";
import AddFriends from "./Changeprofile/AddFriends.vue";

export default {
  name: "Friends",
  components: {
    AddFriends
  },
  data() {
    return {
      friends: [],
      addFriends: false,
      search: ""
    };
  },
  methods: {
    Users() {
      this.$emit("UsersState");
    },
    goChat(user) {
      this.$emit("goChat", user);
    },
    stateFriend() {
      this.addFriends = !this.addFriends;
    },
    newFirend(id) {
      aAddFriend(id).then(res => {
        if (!res.isSuccess) {
          Notification({
            title: "انجام نشد",
            message: "کار بر مورد نظر وجود ندارد",
            type: "warning",
            position: "top-left",
            duration: 4000,
            dangerouslyUseHTMLString: false
          });
        } else {
          this.addFriends = false;
          this.loadInfo();
          Notification({
            title: "انجام شد",
            message: "کاربر به لیست دوستان شما اضافه شد",
            type: "Success",
            position: "top-left",
            duration: 4000,
            dangerouslyUseHTMLString: false
          });
        }
      });
    },
    deleteFriend(id) {
      DeleteFriend(id).then(res => {
        if (res.isSuccess) {
          Notification({
            title: "انجام شد",
            message: "کابر از لیست دوستان شما حذف شد",
            type: "warning",
            position: "top-left",
            duration: 4000,
            dangerouslyUseHTMLString: false
          });
        }
      });
      this.loadInfo();
    },
    searching() {
      this.friends = this.friends.filter(item => {
        return (
          item.personsFirstName.includes(this.search) ||
          item.personsLastName.includes(this.search)
        );
      });
    },
    loadInfo() {
      GetFriends().then(res => (this.friends = res.data));
    }
  },
  mounted() {
    this.loadInfo();
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

/* btn-hover */
.i-hover-color-danger:hover {
  color: #ff0000 !important; /* رنگ حاشیه هنگام هور */
  transition: all 0.2s linear;
  cursor: pointer;
}

/* input search */
.input-search {
  border: none;
  background: transparent;
  border-bottom: 1px solid rgb(255, 255, 255);
  border-radius: 0 !important;
  outline: none;
}
.input-search:focus {
  border-bottom: 3px solid #007bff;
}
</style>