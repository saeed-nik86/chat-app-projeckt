<template>
  <div class="w-100 h-100 p-3">
    <div style="background: #273c75;" class="rounded p-2">
      <div class="d-flex" style="justify-content: space-between; height: 6vh;">
        <i
          class="bi bi-arrow-right mt-3 text-light i-hover-color"
          @click="back"
          style="font-size: 25px;"
        ></i>
        <i
          class="bi bi-check2 mt-3 text-light i-hover-color"
          style="font-size: 25px;"
          @click="addUser"
        ></i>
      </div>
      <hr />
      <div style=" overflow: auto; height: 75vh;">
        <div class="text-center text-light" v-if="!friends.length">شما هیچ دوستی ندارید</div>
        <div
          class="d-flex my-4 hover-custom p-2"
          v-for="(friend, index) in friends"
          :key="index"
          v-else
          style="justify-content: space-between;"
        >
          <div class="d-flex">
            <img
              :src="friend.personsProfilePicture"
              class="rounded-circle border"
              style="width: 60px; height: 60px"
              alt
            />
            <p
              class="h5 ms-3 mt-3 text-light"
            >{{friend.personsFirstName}} {{friend.personsLastName}}</p>
          </div>
          <label class="custom-checkbox mt-3 me-2">
            <input name="dummy" type="checkbox" @change="toggleItem(friend.username)" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button @click="addUser" class="button"> <span class="button-content">اضافه کردن</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { GetFriends, AddGroupMember } from "@/api/chat/";

export default {
  name: "AddMember",
  props: ["groupInfo"],
  data() {
    return {
      friends: [],
      selectedItems: []
    };
  },
  methods: {
    back() {
      this.$emit("back");
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
      console.log(this.selectedItems);
    },
    addUser() {
      if (!this.selectedItems.length) {
        Notification({
          title: "انجام نشد",
          message: "شما هیچ کسی را انتخاب نکردید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else {
        AddGroupMember(this.groupInfo.groupIdPk, this.selectedItems);
        this.$emit("back");
      }
    }
  },
  created() {
    GetFriends().then(res => {
      this.friends = res.data.filter(item => {
        return !this.groupInfo.userMember.some(
          element => item.username === element.groupMemberUserIdFk
        );
      });
    });
  }
};
</script>


<style>
/* From Uiverse.io by KhaledMatalkah */
.checkboxcustom- {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  color: #007bff; /* تغییر رنگ متن به آبی */
  transition: color 0.3s;
}
.custom-checkbox input[type="checkbox"] {
  display: none;
}
.custom-checkbox .checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #007bff; /* تغییر رنگ حاشیه به آبی */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: background-color 0.3s, border-color 0.3s, transform 0.3s;
  transform-style: preserve-3d;
}
.custom-checkbox .checkmark::before {
  content: "\2713";
  font-size: 16px;
  color: transparent;
  transition: color 0.3s, transform 0.3s;
}
.custom-checkbox input[type="checkbox"]:checked + .checkmark {
  background-color: #007bff; /* تغییر رنگ پس‌زمینه به آبی */
  border-color: #007bff; /* تغییر رنگ حاشیه به آبی */
  transform: scale(1.1) rotateZ(360deg) rotateY(360deg);
}
.custom-checkbox input[type="checkbox"]:checked + .checkmark::before {
  color: #fff;
}
.custom-checkbox:hover {
  color: #0056b3; /* تغییر رنگ متن به آبی تیره‌تر هنگام هاور */
}
.custom-checkbox:hover .checkmark {
  border-color: #0056b3; /* تغییر رنگ حاشیه به آبی تیره‌تر هنگام هاور */
  background-color: #e0f0ff; /* تغییر رنگ پس‌زمینه به آبی روشن هنگام هاور */
  transform: scale(1.05);
}
.custom-checkbox input[type="checkbox"]:focus + .checkmark {
  box-shadow: 0 0 3px 2px rgba(0, 123, 255, 0.2); /* تغییر رنگ سایه به آبی */
  outline: none;
}
.custom-checkbox .checkmark,
.custom-checkbox input[type="checkbox"]:checked + .checkmark {
  transition: background-color 1.3s, border-color 1.3s, color 1.3s,
    transform 0.3s;
}
</style>