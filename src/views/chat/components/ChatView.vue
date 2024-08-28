<template>
  <div class="w-100 h-100">
    <section class="bg-chat w-100" v-if="userChat">
      <div class="shadow-lg navbar filter" style="height: 10vh" @click="stateUserInfo">
        <span class="ms-4 d-flex">
          <img
            :src="userChat.personsProfilePicture"
            alt
            class="rounded-circle border"
            style="width: 50px; height: 50px"
          />
          <span class="ms-3 mt-3 text-light" v-if="userChat.username">
            {{userChat.personsFirstName}} {{userChat.personsLastName}}
            <br />
            <span class="text-secondary" style="font-size: 15px;">
              <span v-if="userChat.onLineStatus">انلاین</span>
              <span v-else>افلاین</span>
            </span>
          </span>
          <span class="ms-3 mt-3 text-light" v-else>{{userChat.messageGroupTitel}}</span>
        </span>
        <span>
          <span class="me-3 d-md-none" @click="backChat">
            <i class="bi bi-arrow-left text-warning"></i>
          </span>
        </span>
      </div>
      <section class="w-100">
        <div style="height: 79vh; overflow: auto; flex-direction: column;" class="w-100 d-flex">
          <div
            class="d-flex mt-4 w-100"
            style="justify-content: center; background: transparent;"
            v-if="!chats.length"
          >
            <p
              class="w-50 text-warning text-center h-100 pt-4 rounded filter-custom"
            >شما هیچ پیامی ندارید</p>
          </div>
          <div
            class="w-100 p-3"
            :class="{'rtl': chat.messageSelfStatus, 'ltr': !chat.messageSelfStatus}"
            v-for="chat in chats"
            :key="chat.messageIdPk"
            v-else
          >
            <div
              class="w-100"
              :class="{'rtl': chat.messageSelfStatus, 'ltr': !chat.messageSelfStatus}"
            >
              <img
                :src="chat.messageSenderProfilePicture"
                class="rounded-circle"
                style="width: 30px; height: 30px"
                alt
              />
              <div
                class="p-2 rounded-4 dynamic-width"
                :class="{'bg-blue-custom': chat.messageSelfStatus, 'bg-light-custom': !chat.messageSelfStatus}"
              >
              <div class="text-center p-2" v-show="chat.messageAttachUrl">
                <img :src="chat.messageAttachUrl" style="max-width: 100%; max-height: 400px" alt="">
              </div>
                <span>{{chat.message}}</span>
                <div
                  :class="{'hour-rtl': chat.messageSelfStatus, 'hour-ltr': !chat.messageSelfStatus}"
                  class="mt-2"
                  style="font-size: 14px"
                >{{time}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav class="navbar w-100 bg-user d-flex mb-" style="height: 11vh">
        <span
          class="navbar-brand w-100 d-flex"
          style="justify-content: space-between; align-items: center"
        >
          <div class="w-100 d-flex" style="justify-content: space-around;">
            <button class="ms-2" style="height: 5vh;">
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg
                    height="20"
                    width="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <span>ارسال</span>
            </button>
            <div class="input-container ms-2" style="position: relative; width: 75%;">
              <input
                type="text"
                class="input-message rounded-pill input-focus-color"
                style="height: 5vh; padding-left: 2.5rem;"
                placeholder="پیام دهید"
                v-model="message"
              />
              <img
                v-if="imageUrl"
                :src="imageUrl"
                @click="openFile"
                class="rounded-pill"
                alt
                style="  width: 35px; height: 35px; position: absolute;  left: 0.75rem; top: 50%; transform: translateY(-50%);"
              />
              <i
                v-if="!imageUrl"
                class="bi bi-folder-plus"
                id="uploadButton"
                @click="openFile"
                style="
      font-size: 25px;
      color: #1e90ff;
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    "
              ></i>
            </div>

            <input
              type="file"
              @change="onFileChange"
              id="fileInput"
              ref="fileInput"
              style="display: none"
            />
          </div>
        </span>
      </nav>
    </section>
    <div v-else class="w-100 h-100">
      <emty-chat />
    </div>
  </div>
</template>

<script>
// import ReconnectingWebSocket from "reconnecting-websocket";
import { getToken } from "@/utils/auth";
import {
  GetPesronInfoByCurrentUserName,
  GetChatByUser,
  GetChatGroup
} from "@/api/chat";
import EmtyChat from "./animation/EmtyChat.vue";
export default {
  name: "ChatView",
  props: ["userChat"],
  components: {
    EmtyChat
  },
  data() {
    return {
      socket: null,
      imageUrl: "",
      time: "", //برای نمایش زمان ارسال پیام
      message: "", //پیام هایی که ارسال می شود
      chats: [], //برای ذخیره پیام ها و نمایش انها
      saeed: false,
      amir: false,
      reconnectInterval: 3000 // زمان برای تلاش مجدد برقراری اتصال سوکت
    };
  },
  methods: {
    openFile() {
      this.$refs.fileInput.click();
    },
    backChat() {
      this.$emit("back");
    },
    stateUserInfo() {
      if (this.userChat.username) {
        this.$emit("stateUserInfo", this.userChat);
      } else if (this.userChat.messageGroupIdFk) {
        this.$emit("stateGroupInfo", this.userChat);
      }
    },
    loadInfoChat() {
      GetChatByUser(this.userChat.username).then(res => {
        this.chats = res.data;
        res.data.forEach(element => {
          this.time = element.messageSendDate.slice(11, 15);
        });
      });
    },
    loadInfoGroupChat() {
      GetChatGroup(this.userChat.messageGroupIdFk).then(res => {
        this.chats = res.data;
        res.data.forEach(element => {
          this.time = element.messageSendDate.slice(11, 15);
        });
      });
    },
    onFileChange() {
      const file = event.target.files[0]; // دریافت فایل انتخاب شده
      if (file) {
        const reader = new FileReader();

        reader.onload = e => {
          this.imageUrl = e.target.result; // تنظیم URL تصویر برای نمایش
        };

        reader.readAsDataURL(file); // خواندن فایل به عنوان URL داده
      }
    },
    // web socket
    // initSocket() {
    //   const token = getToken();
    //   console.log(token);
    //   // ایجاد اتصال WebSocket

    //   // const socket = io('ws://192.168.1.101:8069/api/Chat/SendMessage', {
    //   //     extraHeaders: {
    //   //         Authorization: `Bearer ${token}`
    //   //     }
    //   // });

    //   const socket = new WebSocket(
    //     "ws://192.168.1.101:8069/api/Chat/SendMessage",
    //     ["Authorization", "jwt"]
    //   );

    //   console.log("from here");
    //   console.log(socket);

    // socket.on('connect', () => {
    //     console.log('Connected to WebSocket server');
    // });

    // socket.on('message', (data) => {
    //     console.log('Received message:', data);
    // });

    // socket.on('disconnect', () => {
    //     console.log('Disconnected from WebSocket server');
    // });

    // تنظیمات رویدادها
    // socket.onopen = () => {
    //   console.log('WebSocket connection opened');

    // };

    // socket.onmessage = (event) => {
    //   console.log('Message from server:', event.data);
    // };

    // socket.onclose = () => {
    //   console.log('WebSocket connection closed');
    // };
    // },

    // sendMessage() {
    //   if (this.socket && this.socket.connected) {
    //     const data = {
    //       message: this.message,
    //       type: 1,
    //       username: this.userNameChat
    //     };
    //     this.socket.emit("message", data);
    //     this.messagesUser1.push(this.message);
    //     this.message = "";
    //   } else {
    //     console.error("WebSocket is not open.");
    //   }
    // },

    // reconnect() {
    //   this.initSocket();
    //   console.log(this.userChat)
    // }
  },
  watch: {
    userChat() {
      if (this.userChat.username) {
        this.loadInfoChat();
      } else if (this.userChat.messageGroupIdFk) {
        this.loadInfoGroupChat();
      }
    }
  },
  mounted() {
    // this.initSocket();
    console.log(getToken())
    if (this.userChat.username) {
      this.loadInfoChat();
    } 
    else if (this.userChat.messageGroupIdFk) {
      this.loadInfoGroupChat();
    }
  }
  // beforeDestroy() {
  //   if (this.socket) {
  //     this.socket.close();
  //   }
  // }
};
</script>

<style>
.ltr {
  display: flex;
  flex-direction: row-reverse;
}
.rtl {
  display: flex;
}
.bg-chat {
  background-image: url("../../../assets/image/bg-chat.jpg");
  background-size: cover;
  background-position: center;
}
.filter-custom {
  background: transparent;
  backdrop-filter: blur(10px) !important;
}
.bg-blue-custom {
  margin-right: 2em;
  margin-top: 1em;
  background: #1e90ff;
  border-top-right-radius: 0 !important;
  color: rgb(255, 255, 255);
}
.bg-light-custom {
  margin-left: 2em;
  margin-top: 1em;
  border-top-left-radius: 0 !important;
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}
.hour-rtl {
  text-align: end;
  color: rgb(215, 179, 179);
}
.hour-ltr {
  text-align: start;
  color: gray;
}
.btn-send {
  border: none;
  width: 8%;
  border-radius: 10px;
  height: 5vh;
}

.input-message {
  width: 100%;
  border: none;
  transition: all 0.2s linear;
}
.input-message:focus {
  border: 3px solid #66a6ff;
  outline: 0;
}
.filter {
  backdrop-filter: blur(50px) !important;
  background: transparent !important;
}
.dynamic-width {
  display: inline-block;
  max-width: 70%;
  word-wrap: break-word;
}
</style>

<style scoped>
/* From Uiverse.io by Saad3092003 */
button {
  font-family: inherit;
  max-width: 22%;
  font-size: 18px;
  background: linear-gradient(to bottom, #4dc7d9 0%, #66a6ff 100%);
  color: white;
  padding: 0.8em 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  padding: 0em;
  background: linear-gradient(to bottom, #5bd9ec 0%, #97c3ff 100%);
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

button span {
  display: block;
  margin-left: 0.4em;
  transition: all 0.3s;
}

button:hover span {
  scale: 0;
  font-size: 0%;
  opacity: 0;
  transition: all 0.5s;
}

button svg {
  width: 18px;
  height: 18px;
  fill: white;
  transition: all 0.3s;
}

button .svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

button:hover .svg-wrapper {
  background-color: rgba(43, 169, 228, 0.897);
  width: 45px;
  height: 45px;
}

button:hover svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  transform: rotate(45deg);
}
</style>
