<template>
  <div
    class="app-container">
    <div class="row justify-content-center mt-3">
      
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import backgeran from "./components/backgeran";
import img_info from "./components/img_info";
import info from "./components/info";
import { gitcontrol } from "@/api/programwork";
import { GetPesronInfoByCurrentUserName } from "@/api/user";

export default {
  name: "Profile",
  components: {
    backgeran, img_info, info
  },
  data() {
    return {

      PageId: 303,
      control: [],
      list_info: "",
      // list_info:{
      //   personsIdPk: "",
      //   personsNationalId: "",
      //   userName: "",
      //   personsFirstName: "",
      //   personsLastName: "",
      //   personsFatherName: "",
      //   personsContactOwner: "",
      //   personsBirthdayDate: "",
      //   personsGenderIdFk: "",
      //   personsStatus: true,
      //   personsProfilePicture: "",
      //   personsOrganChartIdFk: "",
      //   personsOrganChartName: "",
      //   companyName: "",
      //   companyId: "",
      //   managmentName: "",
      //   managmentId: "",
      //   assistanceId: "",
      //   assistanceName: "",
      //   personsPersonnelId: "",
      //   categoryIdFk: "",
      //   categoryTitle: "",
      //   personsJobStartDateFk: "",
      //   personsJobEndDateFk: "",
      //   personsJobPlaceFk: "",
      //   personsJobPlaceName: "",
      //   personsCardNumber: "",
      //   personsStatusChart: true,
      //   personsFirstNameEn: "",
      //   personsLastNameEn: "",
      //   personCupIdFk: "",
      //   personCupTitle: "",
      //   personPointValue: ""
      // },


    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.createget();
    this.lod_defaultsetting();

  },
  methods: {
    restprofilperson(val) {
      if (val) { this.lod_defaultsetting() }

    },

    //تنظیمات پیش فرض
    lod_defaultsetting() {

      GetPesronInfoByCurrentUserName().then((response) => {
        this.list_info = response.data
      });


    },

    ///////دسترسی کنترلرها/////
    createget() {
      gitcontrol(this.PageId).then((response) => {
        this.control = response.data;
      });
    },

    access(dd) {
      if (this.control.length != 0) {
        return this.control.names.includes(dd);
      }
    },
  },
};
</script>
<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}

#vpd-txtBirthdayDate {
  text-align: end;
}

.form-txt-floating>.form-control {
  line-height: 1.88;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: dark_gray;
  cursor: pointer;
  user-select: none;
}

.hight {
  height: auto;
  min-height: 462px;
}

.left {
  min-height: 462px;
  /* position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; */
  padding-top: 30px;
  /* height: 350px; */
}

/* .left > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1f2d3d;
} */

.left .card-btn {
  gap: 10px;
}

.left .card-btn button {
  width: 100px;
  background: transparent;
  border: 1px solid #1f2d3d;
  border-radius: 100vw;
  padding: 7px;
  font-weight: 700;
  color: #1f2d3d;
  cursor: pointer;
  transition: all 0.2s linear;
}

.left .card-btn button:hover {
  color: #fff;
  background: #1f2d3d;
}

.left .img-border {
  position: absolute;
  top: 24px;
  width: 10vh;
  height: 10vh;
  border-right: 1px solid transparent;
  border-left: 1px solid #1f2d3d;
  border-top: 1px solid #1f2d3d;
  border-bottom: 1px solid #1f2d3d;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 1.5s ease-in-out;
}

.left .img-border:hover {
  transform: rotate(-360deg);
}

.left .img-border .img-border {
  position: absolute;
  top: 2px;
  width: 9.5vh;
  height: 9.5vh;
  border-left: 1px solid transparent;
  border-right: 1px solid #1f2d3d;
  transition: transform 1.5s ease-in-out;
}

.left .img-border .img-border:hover {
  transform: rotate(720deg);
}

.left img {
  width: 70px;
  border-radius: 50%;
}

.right {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.right>div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: #1f2d3d;
  background: #f5e8df;
  cursor: pointer;
  transition: background 0.3s linear;
}

/* .right > div:hover {
  background: #d9bdaa;
} */
.right>div p {
  font-size: 12px;
}

.div_cart {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  /* background: var(--tag-menu-color) !important; */
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid var(--tag-menu-color);
}

.icon_color {
  width: 8vh;
  height: 7.5vh;
}

.size_h {
  text-align: center;
}

.btn_color_v {
  border-right: unset !important;
}

@media (max-width: 1000px) {
  .card .left {
    height: auto;
    align-items: unset;
  }

  .div_cart {
    width: 100%;
    height: 15vh;
  }

  .icon_color {
    position: absolute;
    right: 23vh;
    width: 41px;
    height: 41px;
    top: 5vh;
  }

  .btn_color_v {
    display: block;
    width: 46%;
  }
}

.profil_svg {
  width: 10vh;
  height: 10vh;
  margin-right: auto;
  margin-left: auto;
}

/* fvhd \hddk */
.custom-shape-divider-bottom-1666769874 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1666769874 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 245px;
}

.custom-shape-divider-bottom-1666769874 .shape-fill {
  fill: var(--tag-menu-color);
  opacity: 0.9;
}

.dir_pas {
  direction: ltr !important;
}

.color_labal {
  vertical-align: middle;
  width: 48% !important;
  right: 34px !important;
  border: 1px solid #dcd0d0;
  border-radius: 12px 0px;
  padding: 12px;
  top: -74px !important;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

/* @media (min-width: 1201px) {
  .color_labal {
    right:-8px !important;
  }
}
@media (min-width: 992px) {
  .color_labal {
    width: 61% !important;
   
  }
} */
.all_img_info{
  height: 649px;
}
@media screen and (max-width: 769px) {
  .all_img_info{
  height: auto;
}
}
</style>

