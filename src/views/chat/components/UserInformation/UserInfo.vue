<template>
  <div class="w-100 h-100 p-3">
    <div class="w-100 h-25 position-relative rounded">
      <i
        class="bi bi-arrow-right position-absolute z-3 start-0 top-0 ms-2 mt-2 i-hover-color text-light"
        @click="back"
        style="font-size: 25px"
      ></i>
      <img src class="w-100 h-100 rounded" alt />
      <span class="position-absolute z-3 bottom-0 start-0 text-light mb-2 ms-2">
        {{showInfo.personsFirstName}} {{showInfo.personsLastName}}
        <br />
        <span>
          <span v-if="showInfo.onLineStatus" class="text-success">انلاین</span>
          <span v-else class="text-danger">افلاین</span>
        </span>
      </span>
    </div>
    <div class="w-100 rounded mt-4" style="background: #273c75;">
      <div>
        <div class="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#e8eaed"
          >
            <path
              d="M480.01-511.83q-44.23 0-74.7-30.46-30.48-30.46-30.48-75.03 0-44.56 30.46-74.71 30.46-30.14 74.7-30.14 44.23 0 74.7 30.13 30.48 30.13 30.48 74.69 0 44.57-30.46 75.04-30.46 30.48-74.7 30.48ZM213.5-234.17v-47.66q0-22.78 13.66-41.62 13.66-18.84 36.68-29.73 56.4-25.1 110.17-38.29 53.78-13.2 105.98-13.2 52.21 0 106.11 13t109.93 38.82q23.33 10.59 36.9 29.46t13.57 41.72v47.5h-533Zm23.17-23.16h486.66v-24.29q0-15.07-10.33-28.47-10.33-13.41-28-23.58-50.46-24.33-101.55-36.08-51.08-11.75-103.43-11.75-52.7 0-103.86 11.75t-100.33 36.08q-18.5 10.17-28.83 23.72-10.33 13.55-10.33 28.28v24.34ZM480-535q34.33 0 58.17-23.83Q562-582.67 562-617t-23.83-58.17Q514.33-699 480-699t-58.17 23.83Q398-651.33 398-617t23.83 58.17Q445.67-535 480-535Zm0-82Zm0 359.67Z"
            />
          </svg>
          <span class="ms-2" style="color: #1e90ff;">نام کاربری</span>
          <div class="text-center text-light">{{showInfo.username}}</div>
        </div>
        <hr />
        <div>
          <div class="p-2">
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
            <span class="ms-2" style="color: #1e90ff; ">بیوگرافی</span>
            <div class="text-center text-light">{{showInfo.personsDescription}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["showInfo"],
  methods: {
    back() {
      this.$emit("stateUserInfo");
    }
  }
};
</script>

<style>
</style>
