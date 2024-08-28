<template>
  <div class="rounded m-3 me-4 h-100 p-2" style="background: #273c75">
    <div class="d-flex" style="justify-content: space-between">
      <i
        class="bi bi-arrow-right i-hover-color text-light"
        @click="chngeState"
        style="font-size: 25px"
      ></i>
      <i class="bi bi-check2 text-light i-hover-color" @click="handlebio" style="font-size: 25px"></i>
    </div>
    <div>
      <p class="p-2 text-secondary mt-4 text-center" style="font-size: 1em">
        شما می توانید چند خط درباره خودتان اضافه کنید. هر کس که پروفایل شما را مشاهده کند
        این متن را خواهد دید.
      </p>
    </div>
    <div class="d-flex mt-4" style="align-items: center; flex-direction: column">
      <input
        type="text"
        class="input-bio text-light text-center"
        v-model="bio"
        placeholder="بیوگرافی"
      />
      <button class="button mt-3" @click="handlebio"><span class="button-content"> ذخیره</span></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Biography",
  data() {
    return {
      bio: ""
    };
  },
  methods: {
    chngeState() {
      this.$emit("back");
    },
    handlebio() {
      if (!this.bio) {
        Notification({
          title: "انجام نشد",
          message: "لطفا یک بیوگرافی برای خودتان انخاب کنید",
          type: "warning",
          position: "top-left",
          duration: 4000,
          dangerouslyUseHTMLString: false
        });
      } else {
        this.$emit("setbio", this.bio);
      }
    }
  }
};
</script>

<style scoped>
</style>
