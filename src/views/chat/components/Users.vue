<template>
  <section class="h-100 w-100 bg-user p-3">
    <div style="height: 6vh; background: transparent;">
      <div class="d-flex" style="justify-content: space-between;">
        <h4 class="text-center text-light mt-3">چت انلاین</h4>
        <div class="mt-3">
          <span @click="stateGroup">
            <span class="text-light me-2 i-hover-color">گروه ها</span>
            <i class="bi bi-people me-3 text-light i-hover-color" style="font-size: 25px"></i>
          </span>
          <i
            class="bi bi-gear me-2 text-light i-hover-color"
            @click="changeList"
            style="font-size: 25px"
          ></i>
        </div>
      </div>
    </div>
    <hr class="text-light"/>
    <div
      class="position-relative"
      style="height: 94vh; overflow: auto; background: transparent;"
    >
      <div class="text-center mt-5 text-light" v-if="!users.length">شما هیچ گفت و گو یی ندارید</div>
      <div
        class="d-flex my-4 hover-custom p-2"
        v-else
        v-for="(user, index) in users"
        :key="index"
        @click="goChat(user)"
        style="justify-content: space-between;"
      >
        <div class="d-flex">
          <img
            :src="user.personsProfilePicture"
            class="rounded-circle border"
            style="width: 60px; height: 60px"
            alt
          />
          <p class="h5 ms-3 mt-3 text-light">
            {{user.personsFirstName}} {{user.personsLastName}}
            <br />
            <span class="text-secondary" style="font-size: 15px;">
              <span v-if="user.onLineStatus">انلاین</span>
              <span v-if="!user.onLineStatus">افلاین</span>
            </span>
          </p>
        </div>
        <div
          class="bg-danger rounded-circle mt-3"
          style="width: 15px; height: 15px"
          v-if="!user.onLineStatus"
        ></div>
        <div
          class="bg-success rounded-circle mt-3"
          style="width: 15px; height: 15px"
          v-else-if="user.onLineStatus"
        ></div>
      </div>
      <div class="position-absolute bottom-0 end-0 mb-5">
        <i
          class="bi bi-person text-light i-hover-color"
          style="font-size: 4vh;"
          @click="Friends"
        ></i>
      </div>
    </div>
  </section>
</template>

<script>
import { GetChatUsers } from "@/api/chat";

export default {
  name: "Users",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    changeList() {
      this.$emit("state");
    },
    Friends() {
      this.$emit("AddUserState");
    },
    goChat(user) {
      this.$emit("goChat", user);
    },
    stateGroup() {
      this.$emit("goGroup");
    },
    loadInfo() {
      GetChatUsers().then(res => this.users = res.data.filter(item => !item.messageGroupIdFk));
    }
  },
  mounted() {
    this.loadInfo();
  }
};
</script>

<style>
</style>