<template>
  <div class="container-fluid bg-user g-0" style="width: 100%; height: 100vh">
    <div class="row h-100 w-100 g-0">
      <div class="col-12 col-md-4 col-lg-3 h-100">
        <!-- اجرای کامپوننت user  مخصوص حالت صفحه بزرگ -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <users
            v-if="!ConditionProfile && !ConditionUser && !ConditionGroup && !ConditionUserInfo && !ConditionGruopInfo"
            @state="stateProfile"
            @AddUserState="stateUser"
            @goChat="handleChat"
            @goGroup="activateGroup"
            class="d-none d-md-block"
          />
        </transition>
        <!-- اجرای کامپوننت user  مخصوص حالت صفحه کوچگ -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <users
            v-if=" 
              !ConditionProfile && !ConditionUser && !ConditionChat && !ConditionGroup
            "
            @state="stateProfile"
            @AddUserState="stateUser"
            @goChat="handleChat"
            @goGroup="activateGroup"
            class="d-md-none"
          />
        </transition>
        <!-- اجرای کامپوننت Friends در حالد موبایل -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <Friends
            v-if="ConditionUser && !ConditionChat"
            @UsersState="stateUser"
            @goChat="handleChat"
            class="d-md-none"
          />
        </transition>
        <!-- اجرای مامپوننت Friends  در حالت کامپیوتر -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <Friends
            v-if="ConditionUser && !ConditionUserInfo && !ConditionGruopInfo"
            @UsersState="stateUser"
            @goChat="handleChat"
            class="d-none d-md-block"
          />
        </transition>
        <!-- اجرای کامپوننت chat حالت موبایل -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <ChatView
            v-if="ConditionChat && !ConditionUserInfo && !ConditionGruopInfo"
            :userChat="user"
            @back="handleChat"
            @stateUserInfo="goUserInfo"
            @stateGroupInfo="goGroupInfo"
            class="d-md-none"
          />
        </transition>
        <!-- کامپوننت groups در حالت کامپیوتر -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <groups
            v-if="ConditionGroup && !ConditionGruopInfo"
            @backGroup="activateGroup"
            @goChat="handleChat"
            class="d-none d-md-block"
          />
        </transition>
        <!-- کامپوننت groups در حال حالت موبایل -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <groups
            v-if="ConditionGroup && !ConditionChat"
            @backGroup="activateGroup"
            @goChat="handleChat"
            class="d-md-none"
          />
        </transition>
        <!-- کامپوننت profile -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <profile v-if="ConditionProfile" @state="stateProfile" />
        </transition>
        <!-- کامپوننت UserInfo -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <UserInfo v-if="ConditionUserInfo" @stateUserInfo="goUserInfo" :showInfo="userInfo" />
        </transition>
        <!-- کامپوننت GroupInfo -->
        <transition name="scale-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <group-info
            v-if="ConditionGruopInfo"
            :showInfo="groupInfo"
            @stateGroupInfo="goGroupInfo"
          />
        </transition>
      </div>
      <div class="d-none d-md-block col-md-8 col-lg-9 h-100 position-relative">
        <!-- اجرای کامپوننت chat  در حالت کامپیوتر -->
        <ChatView :userChat="user" @stateUserInfo="goUserInfo" @stateGroupInfo="goGroupInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import Users from "./components/Users.vue";
import ChatView from "./components/ChatView.vue";
import Profile from "./components/Profile.vue";
import Friends from "./components/Friends.vue";
import Groups from "./components/Groups.vue";
import GroupInfo from "./components/UserInformation/GroupInfo.vue";
import UserInfo from "./components/UserInformation/UserInfo.vue";

export default {
  name: "MainChat",
  components: {
    Users,
    ChatView,
    Profile,
    Friends,
    Groups,
    UserInfo,
    GroupInfo
  },
  data() {
    return {
      ConditionProfile: false, // برای فعال کردن کامپوننت profile
      ConditionUserInfo: false, //باری اجرای کامپوننت UserInfo
      ConditionUser: false, // برای فعال کردن کامپوننت Friends
      ConditionChat: false, //برای فعال کردن چت
      ConditionGroup: false, // برای غعال کردن کامپوننت گروه
      ConditionGruopInfo: false, //برای فعال کردن کامپوننت GroupInfo
      user: "", // ارسال نام کاربری به کامپوننت chat
      userInfo: "",
      groupInfo: ""
    };
  },
  methods: {
    stateProfile() {
      this.ConditionProfile = !this.ConditionProfile;
    },
    stateUser() {
      this.ConditionUser = !this.ConditionUser;
    },
    handleChat(id) {
      this.user = id;
      this.ConditionChat = !this.ConditionChat;
    },
    activateGroup(data = false) {
      this.ConditionGroup = !this.ConditionGroup;
      this.dataGroups = data;
    },
    goUserInfo(id) {
      this.userInfo = id;
      this.ConditionUserInfo = !this.ConditionUserInfo;
    },
    goGroupInfo(id) {
      this.groupInfo = id;
      this.ConditionGruopInfo = !this.ConditionGruopInfo;
    }
  }
};
</script>

<style>
/* بکگراند اصلی */
.bg-user {
  background: radial-gradient(
    143.33% 102.71% at 24.03% 11.55%,
    #00469a 0%,
    #00377e 27.19%,
    #000f37 85.65%,
    #000524 100%
  ) !important;
}

/* icon hover */
.i-hover-color:hover {
  color: #007bff !important; /* رنگ حاشیه هنگام هور */
  transition: all 0.2s linear;
  cursor: pointer;
}

/* برای انتخاب فایل */
.file-upload {
  position: relative;
  display: inline-block;
}
#uploadButton {
  background: transparent;
  border: none;
  cursor: pointer;
}

/* input-bio */
.input-bio {
  border: none;
  background: transparent;
  border-bottom: 1px solid rgb(0, 0, 0);
  border-radius: 0 !important;
  outline: none;
}
.input-bio:focus {
  border-bottom: 3px solid #007bff;
}


/* انیمیشن تغیر صفحه */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */
 {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to
/* .slide-leave-active in <2.1.8 */
 {
  transform: translateX(100%);
}
/* انیمیشن جدید برای مقیاس و محو شدن */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.scale-fade-enter,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
#app .hideSidebar .main-container {
  margin-left: unset;
  margin-right: 0 !important;
}

/* From Uiverse.io by Madflows */
.button {
  position: relative;
  overflow: hidden;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #3d3a4e;
  background-size: 400%;
  color: #fff;
  border: none;
  cursor: pointer;
}
.button:hover::before {
  transform: scaleX(1);
}
.button-content {
  position: relative;
  z-index: 1;
}
.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background: linear-gradient(
    82.3deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  );
  transition: all 0.475s;
}

/*hover user */
.hover-custom:hover {
  background: rgba(0, 0, 0, 0.123);
  border-radius: 10px;
}

/* scrollbar custom */
::-webkit-scrollbar {
  width: 6px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
} 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #007bff; 
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>

<style scoped>
.overflowww {
  overflow: hidden !important;
}
</style>
