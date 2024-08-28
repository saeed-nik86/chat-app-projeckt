<template>
  <div class="p-3">
    <div style="background: #273c75;" class="rounded p-2">
      <div class="d-flex" style="justify-content: space-between; height: 6vh;">
        <i
          class="bi bi-arrow-right text-light i-hover-color"
          @click="back"
          style="font-size: 25px;"
        ></i>
        <i
          class="bi bi-check2 text-light i-hover-color"
          style="font-size: 25px;"
          @click="deletMember"
        ></i>
      </div>
      <hr />
      <div style="height: 75vh; overflow: auto;">
        <div class="text-center text-light mt-3" v-if="!members.length">شما هیچ عضوی ندارید</div>
        <div
          class="d-flex my-4 hover-custom p-2"
          v-for="(member, index) in members"
          :key="index"
          v-else
          style="justify-content: space-between;"
        >
          <div class="d-flex">
            <img
              :src="member.personsProfilePicture"
              class="rounded-circle border"
              style="width: 60px; height: 60px"
              alt
            />
            <p
              class="h5 ms-3 mt-3 text-light"
            >{{member.personsFirstName}} {{member.personsLastName}}</p>
          </div>
          <label class="custom-checkbox me-2 mt-3">
            <input name="dummy" type="checkbox" @change="toggleItem(member.groupMemberUserIdFk)" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button @click="deletMember" class=" button"> <span class="button-content">حذف کردن</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { DeleteGroupMember } from "@/api/chat";
export default {
  name: "DeleteMember",
  props: ["groupInfo", "manager"],
  data() {
    return {
      selectedItems: [],
      members: []
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
    deletMember() {
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
        DeleteGroupMember(this.groupInfo.groupIdPk, this.selectedItems);
        this.$emit("back");
      }
    }
  },
  mounted() {
    this.members = this.groupInfo.userMember;
    this.members = this.members.filter(item => {
      return item.groupMemberUserIdFk !== this.manager;
    });
  }
};
</script>

<style>
</style>