<template>
  <div class="container-fluid bg-dark" style="width: 100%; height: 100vh" dir="rtl">
    <div class="row h-100 w-100 g-0">
      <div class="col-md-3 d-none d-md-block h-100 shadow-lg">
        <section class="h-100 w-100 bg-linear">
          <div class="p-2" style="height: 20vh; background: transparent;">
            <div class="d-flex" style="justify-content: space-between;">
              <h2 class="text-md-start text-center">چت انلاین</h2>
              <i class="bi bi-three-dots mt-3 me-2"></i>
            </div>
            <form class="d-flex mt-5" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="جست و جو"
                aria-label="Search"
              />
              <button class="btn-search-custom" type="submit">
                <i class="bi bi-search"></i>
              </button>
            </form>
            <hr />
          </div>
          <div
            class="position-relative pt-5"
            style="height: 80vh; overflow: auto; background: transparent;"
          >
            <div class="d-flex p-2 bg-lineae-user mb-2" style="justify-content: space-between;">
              <div class="rounded-circle d-flex">
                <img
                  src="../../assets/image/manager.png"
                  class="rounded-circle"
                  style="width: 60px; height: 60px"
                  alt
                />
                <span class="h5 ms-3 mt-3">سعید نیک بخت</span>
              </div>
              <div class="bg-danger rounded-circle mt-3" style="width: 15px; height: 15px"></div>
            </div>
            <div class="position-absolute bottom-0 end-0 me-4">
              <i class="bi bi-plus-square" style="font-size: 40px"></i>
            </div>
          </div>
        </section>
      </div>
      <div class="col-12 col-md-9 h-100 position-relative">
        <section class="bg-chat">
          <nav class="navbar shadow-lg" style="backdrop-filter: blur(100px);">
            <span class="navbar-brand ms-4 d-flex">
              <img
                src="../../assets/image/manager.png"
                alt
                class="rounded-circle"
                style="width: 50px; height: 50px"
              />
              <span class="ms-3">سعید نیک بخت</span>
              <div class="bg-danger rounded-circle mt-2 ms-3" style="width: 15px; height: 15px"></div>
            </span>
            <div class="navbar-brand">
              <span class="me-4">
                <i class="bi bi-telephone" style="color: #43C6AC;"></i>
              </span>
              <span class="me-3">
                <i class="bi bi-arrow-left text-warning"></i>
              </span>
            </div>
          </nav>
          <section>
            <div style="height: 80vh; overflow: auto">
              <div class="w-100 p-3">
                <div class="w-50">
                  <img
                    src="../../assets/image/manager.png"
                    class="rounded-circle"
                    style="width: 30px; height: 30px"
                    alt
                  />
                  <div class="ms-5 bg-lineae-user text-light p-2 rounded">
                    <span>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ex nobis voluptate magnam qui quam architecto ea aliquam
                      fuga, nostrum odit inventore beatae quasi debitis
                      assumenda officia! Corrupti, recusandae pariatur.
                      Ex!
                    </span>
                  </div>
                </div>
              </div>
              <div class="w-100 p-3 d-flex" style="flex-direction: row-reverse">
                <div class="w-50 d-flex" style="flex-direction: row-reverse">
                  <img
                    src="../../assets/image/manager.png"
                    class="rounded-circle"
                    style="width: 30px; height: 30px"
                    alt
                  />
                  <div class="me-3 bg-light border p-2 rounded mt-4">
                    <span>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ex nobis voluptate magnam qui quam architecto ea aliquam
                      fuga, nostrum odit inventore beatae quasi debitis
                      assumenda officia! Corrupti, recusandae pariatur.
                      Ex!
                    </span>
                  </div>
                </div>
              </div>
              <div class="w-100 p-3">
                <div class="w-50">
                  <img
                    src="../../assets/image/manager.png"
                    class="rounded-circle"
                    style="width: 30px; height: 30px"
                    alt
                  />
                  <div class="ms-5 bg-lineae-user text-light p-2 rounded">
                    <span>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ex nobis voluptate magnam qui quam architecto ea aliquam
                      fuga, nostrum odit inventore beatae quasi debitis
                      assumenda officia! Corrupti, recusandae pariatur.
                      Ex!
                    </span>
                  </div>
                </div>
              </div>
              <div class="w-100 p-3 d-flex" style="flex-direction: row-reverse">
                <div class="w-50 d-flex" style="flex-direction: row-reverse">
                  <img
                    src="../../assets/image/manager.png"
                    class="rounded-circle"
                    style="width: 30px; height: 30px"
                    alt
                  />
                  <div class="me-3 bg-light border p-2 rounded mt-4">
                    <span>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ex nobis voluptate magnam qui quam architecto ea aliquam
                      fuga, nostrum odit inventore beatae quasi debitis
                      assumenda officia! Corrupti, recusandae pariatur.
                      Ex!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            class="d-flex bg-lightw w-100 mt-4 bg-dark position-absolute bottom-0"
            style="justify-content: center;"
          >
            <nav class="navbar w-100">
              <div class="navbar-brand d-flex w-100" style="justify-content: space-around;">
                <form action style="width: 100%;">
                  <div class="d-flex" style="justify-content: space-between; width: 75%;">
                    <button class="btn btn-outline-success ms-4">
                      <i class="bi bi-send"></i>
                    </button>
                    <input
                      type="text"
                      class="form-control ms-5 rounded-3 w-100 rounded-pill"
                      style="height: 5vh; max-width: 60vh;"
                      placeholder="پیام دهید"
                    />
                  </div>
                </form>
                <div style="width: 25%;">
                  <div class="file-upload">
                    <input type="file" id="fileInput" style="display: none" />
                    <i
                      class="bi bi-folder-plus text-light ms-2"
                      id="uploadButton"
                      style="font-size: 4vh;"
                    ></i>
                  </div>
                  <i class="bi bi-mic ms-2 text-light" style="font-size: 4vh;"></i>
                </div>
              </div>
            </nav>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
.file-upload {
  position: relative;
  display: inline-block;
}

#uploadButton {
  background: transparent;
  border: none;
  cursor: pointer;
}

.bg-linear {
  backdrop-filter: blur(10px);
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}

.bg-lineae-user {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #191654, #43c6ac);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #191654, #43c6ac);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.bg-chat {
  background-image: url("../../assets/image/bg-chat.jpg");
  background-size: cover;
  background-position: center;
}
 
.btn-search-custom{
    width: 10px !important;
      border: none!important;
      background-color: transparent!important;
    }

</style>