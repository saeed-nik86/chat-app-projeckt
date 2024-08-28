<template>
  <div class="app-container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="form-floating">
          <el-select
            ref="headerSearchSelect"
            v-model="personidpk"
            :remote-method="onSearch"
            remote
            clearable
            filterable
            placeholder="جستجو کنید"
            class="filter-item"
            @change="bindGridPerson"
          >
            <el-option
              v-for="item in options"
              :key="item.personsNationalIdPk"
              :value="item.personsNationalIdPk"
              :label="item.personInfo"
            />
          </el-select>
          <label class="form-label" for="txtsearch">پرسنل</label>
        </div>
      </div>
    </div>

    <div class="row justify-content-center" v-if="this.options">
      <div class="col-12 col-lg-10">
        <div class="card-body">
          <el-tabs
            v-model="activeName"
            type="border-card"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-if="selperson"
              label="اطلاعات پرسنلی"
              name="panePerson"
            >
              <div class="row">
                <el-form
                  ref="dataForm"
                  :model="temp"
                  :inline="true"
                  class="demo-ruleForm"
                >
                  <div class="row mb-2 p-2">
                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtNationalId"
                          v-model="temp.personsNationalId"
                          :disabled="true"
                          type="text"
                          class="form-control text-l"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="10"
                        />

                        <label class="form-label" for="txtNationalId"
                          >کد ملی</label
                        >
                      </div>
                    </div>

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtFirstName"
                          v-model="temp.personsFirstName"
                          type="text"
                          class="form-control"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="25"
                        />
                        <label class="form-label" for="txtFirstName">نام</label>
                      </div>
                    </div>

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtLastName"
                          v-model="temp.personsLastName"
                          type="text"
                          class="form-control"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="30"
                        />
                        <label class="form-label" for="txtLastName"
                          >نام خانوادگی</label
                        >
                      </div>
                    </div>

                    <!-- <div class="col-12 col-lg-4">
                        <div class="form-floating">
                          <input
                            id="txtFatherName"
                            v-model="temp.personsFatherName"
                            type="text"
                            class="form-control"
                            AutoCompleteType="Disabled"
                            autocomplete="off"
                            maxlength="30"
                          />
                          <label class="form-label" for="txtFatherName"
                            >نام پدر</label
                          >
                        </div>
                      </div> -->

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <date-picker
                          id="txtBirthdayDate"
                          v-model="temp.personsBirthdayDate"
                          simple
                          class="text-l"
                        />
                        <label class="form-label" for="txtBirthdayDate"
                          >تاریخ تولد</label
                        >
                      </div>
                    </div>

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtmobilenum"
                          v-model="temp.personsContactOwner"
                          type="text"
                          class="form-control text-l text-mobile"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="10"
                          style="padding: 5px 5px 3px 39px !important"
                        />
                        <label class="form-label" for="txtmobilenum"
                          >شماره تماس</label
                        >
                        <div class="mhmmobile">
                          <span>0 </span>
                        </div>
                      </div>
                    </div>

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <el-select
                          id="dropGender"
                          v-model="temp.personsGenderIdFk"
                          placeholder="انتخاب کنید"
                          clearable
                          class="filter-item"
                          filterable
                          remote
                          reserve-keyword
                          :loading="loading"
                        >
                          <el-option
                            v-for="item in calendarTypeOptions"
                            :key="item.key"
                            :label="item.display_name"
                            :value="item.key"
                          />
                        </el-select>
                        <label for="dropGender">جنسیت</label>
                      </div>
                    </div>
                  </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <div class="row">
                    <div
                      v-if="dialogStatus === 'ویرایش'"
                      class="col-12 col-lg-2"
                    >
                      <el-button
                        type="button"
                        :loading="load"
                        class="btn btn-primary"
                        @click="updateDataPerson()"
                      >
                        <i class="el-icon-edit" />
                        ویرایش
                      </el-button>
                    </div>
                    <div class="col-12 col-lg-2">
                      <el-switch
                        @change="disablePerson(temp.personsNationalId)"
                        style="display: block; direction: ltr"
                        v-model="temp.personsStatus"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="فعال"
                        inactive-text="غیر فعال"
                      >
                      </el-switch>
                    </div>
                    <div class="col-12 col-lg-2">
                      <el-button
                        type="info"
                        class="btn btn-primary"
                        @click="Fan_card()"
                      >
                        <font-awesome-icon :icon="['fas', 'address-card']" />
                        کارت هواداری
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="selperson" label="اطلاعات آدرس" name="tabaddres">
              <personaddres :list_info="idpersonidpk" ref="tabpersonaddres">
              </personaddres>
            </el-tab-pane>
            <el-tab-pane
              v-if="selperson"
              label="اطلاعات تماس"
              name="tabcontact"
            >
              <personcontact :list_info="idpersonidpk" ref="tabpersoncontact">
              </personcontact>
            </el-tab-pane>
            <el-tab-pane
              v-if="selperson"
              label="اطلاعات نوع هواداری"
              name="tabfantype"
            >
              <personfantype :list_info="idpersonidpk" ref="tabpersonfantype">
              </personfantype>
            </el-tab-pane>
            <el-tab-pane v-if="selperson" label="حساب کاربری" name="paneUser">
              <div class="row">
                <el-form
                  ref="dataFormUser"
                  :model="tempuser"
                  :inline="true"
                  class="demo-ruleForm"
                >
                  <div class="row mb-2 p-2 justify-content-center">
                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtUsername"
                          v-model="tempuser.usersUsernamePk"
                          :disabled="showUser"
                          type="text"
                          class="form-control text-l"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="25"
                        />

                        <label class="form-label" for="txtUsername"
                          >نام کاربری</label
                        >
                      </div>
                    </div>

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtusersPassword"
                          v-model="tempuser.usersPassword"
                          :type="passwordFieldType"
                          class="form-control text-l d-ltr"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="30"
                        />
                        <span class="show-pwd" @click="showPwd">
                          <font-awesome-icon
                            v-show="aa"
                            icon="fa-solid fa-eye"
                          />
                          <font-awesome-icon
                            v-show="mm"
                            icon="fa-solid fa-eye-slash"
                          />
                        </span>
                        <label
                          v-if="showUser"
                          class="form-label"
                          for="txtusersPassword"
                          >کلمه عبور</label
                        >
                        <label v-else class="form-label" for="txtusersPassword"
                          >کلمه عبور جدید</label
                        >
                      </div>
                    </div>

                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <input
                          id="txtrepeatusersPassword"
                          v-model="repeatPass"
                          type="password"
                          class="form-control text-l d-ltr"
                          AutoCompleteType="Disabled"
                          autocomplete="off"
                          maxlength="30"
                        />

                        <label
                          v-if="showUser"
                          class="form-label"
                          for="txtrepeatusersPassword"
                          >تکرار کلمه عبور</label
                        >
                        <label
                          v-else
                          class="form-label"
                          for="txtrepeatusersPassword"
                          >تکرار کلمه عبور جدید</label
                        >
                      </div>
                    </div>
                  </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <div class="row">
                    <div
                      v-if="dialogStatusUser === 'ویرایش'"
                      class="col-12 col-lg-3"
                    >
                      <el-button
                        :loading="load"
                        type="button"
                        class="btn btn-primary"
                        @click="updateDataUser()"
                      >
                        <i class="el-icon-edit" />
                        تغییر کلمه عبور
                      </el-button>
                    </div>

                    <div
                      v-if="dialogStatusUser === 'ثبت'"
                      class="col-12 col-lg-2"
                    >
                      <el-button
                        :loading="load"
                        type="button"
                        class="btn btn-success m-1"
                        @click="createDataUser()"
                      >
                        <i class="el-icon-plus pl-5" />
                        ثبت
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="selperson" label="تخصیص نقش" name="paneRole">
              <div class="row">
                <el-form
                  ref="dataFormUser"
                  :model="tempRole"
                  :inline="true"
                  class="demo-ruleForm"
                >
                  <div class="row mb-2 p-2">
                    <div class="col-12 col-lg-4">
                      <div class="form-floating" prop="workProgramTitle">
                        <el-select
                          id="dropMasterRoles"
                          v-model="masterId"
                          placeholder="انتخاب کنید"
                          clearable
                          class="filter-item"
                          filterable
                          remote
                          reserve-keyword
                          :loading="loading"
                        >
                          <el-option
                            v-for="item in dropMasterRole"
                            :key="item.masterRolesListIdPk"
                            :label="item.masterRolesListPname"
                            :value="item.masterRolesListIdPk"
                          >
                            <a
                              class="d-block"
                              href="#"
                              @click="bindDropRole(item.masterRolesListIdPk)"
                            >
                              {{ item.masterRolesListPname }}
                            </a>
                          </el-option>
                        </el-select>
                        <label class="form-label" for="dropMasterRoles"
                          >نقش مادر</label
                        >
                      </div>
                    </div>
                    <div class="col-12 col-lg-4">
                      <div class="form-floating">
                        <el-select
                          id="dropRoles"
                          v-model="tempRole.userRoleListIdFk"
                          filterable
                          remote
                          reserve-keyword
                          clearable
                          :loading="loading"
                          style="size: 5"
                        >
                          <el-option
                            v-for="itemm in dropRole"
                            :key="itemm.rolesListIdPk"
                            :label="itemm.rolesListPname"
                            :value="itemm.rolesListIdPk"
                          />
                        </el-select>
                        <label class="form-label" for="dropRoles">نقش</label>
                      </div>
                    </div>

                    <div class="col-12 col-lg-2 mt-3">
                      <el-button
                        type="button"
                        :loading="load"
                        class="btn btn-success mt-3"
                        @click="createDataRole()"
                      >
                        <i class="el-icon-plus pl-5" />
                        ثبت
                      </el-button>
                    </div>

                    <div class="col-12 mt-3">
                      <el-table
                        v-show="listRole.length"
                        v-loading="listLoading"
                        :data="listRole"
                        border
                        fit
                        highlight-current-row
                        stripe
                      >
                        <el-table-column label="ردیف" width="70px">
                          <template slot-scope="scope">
                            {{ scope.$index + 1 }}
                          </template>
                        </el-table-column>

                        <el-table-column label="نام فارسی نقش">
                          <template slot-scope="{ row }">
                            <span>{{ row.roleName }}</span>
                          </template>
                        </el-table-column>

                        <el-table-column label="نام لاتین نقش">
                          <template slot-scope="{ row }">
                            <span>{{ row.roleEName }}</span>
                          </template>
                        </el-table-column>

                        <el-table-column label="عملیات" width="120px">
                          <template slot-scope="{ row }">
                            <el-tooltip
                              class="item"
                              effect="dark"
                              content="حذف"
                              placement="top-start"
                            >
                              <el-button
                                :loading="load"
                                type="danger"
                                size="small"
                                @click="deleteDataRole(row)"
                              >
                                <i class="el-icon-delete" />
                              </el-button>
                            </el-tooltip>
                          </template>
                        </el-table-column>
                      </el-table>
                      <p v-show="!listRole.length" style="text-align: center">
                        موردی یافت نشد
                      </p>
                    </div>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <el-dialog
      v-el-drag-dialog
      :visible.sync="cart_fam_modal"
      :close-on-click-modal="false"
      custom-class="modal_uplod"
      width="50%"
    >
      <div class="row justify-content-center m-lg-5">
        <div
          class="col-12 col-lg-11 text-center justify-content-center d-inline-flex"
          id="preint_bak_cart"  >
          <div class="bak_cart" >
            <div class="row h-100">
              <div><p class="tite_cart">کارت هواداری باشگاه فرهنگی ورزشی گل گهر</p></div>
              <div class="col-8 user_styl">
                <p>
                  مشخصات:{{ temp.personsFirstName }}
                  {{ temp.personsLastName }}
                </p>
                <!-- <p>
                  <font-awesome-icon
                    :icon="['fas', 'user']"
                    style="padding-left: 8px"
                  />نام و نام خانوادگی:{{ temp.personsFirstName }}
                  {{ temp.personsLastName }}
                </p> -->
                <p>کد ملی :{{ temp.personsNationalId }}</p>
                <p>تاریخ تولد :{{ temp.personsBirthdayDate }}</p>
                <p>تاریخ عضویت :{{ temp.regDate }}</p>
              </div>
              <div class="col-4 col-img_cart">
                <div class="row" style="width: 100%; height: 100%">
                  <div class="col-12" style="width: 100%; padding: 0px">
                     <cup
                      class="img_cup heder_cup"
                      :personCupIdFk="temp.personCupIdFk"
                      :personsProfilePicture="temp.personsProfilePicture"
                    >
                    </cup> 
                    <div class="img_cover" :style="styles(temp.personCupIdFk)">
                      <img
                        v-if="
                          temp.personsProfilePicture == null ||
                          temp.personsProfilePicture == ''
                        "
                        src="../../assets/image/manager.png"
                        class="img_cover_img"
                      />
                      <img
                        v-else
                        :src="
                          temp.personsProfilePicture == null ||
                          temp.personsProfilePicture == ''
                            ? ''
                            : '/' +
                              temp.personsProfilePicture.replaceAll('\\', '/')
                        "
                        class="img_cover_img"
                      />
                    </div>
                  </div>
                  <div class="col-12 p-0">
                    <p
                      class="p-0 mt-5 print_margin"
                      style="width: 100%; text-align: center; margin: 0px"
                    >
                      {{ temp.personCupTitle }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <el-button
            :loading="loadingprinte"
            type="info"
            class="btn btn-primary"
            @click="Fan_card_print()"
          >
            <font-awesome-icon :icon="['fas', 'address-card']" />
            چاپ کارت
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchNational,
  fetchInfoNational,
  createUser,
  updatePerson,
  updateUser,
  updateStatusPerson,
} from "@/api/person";

import {
  fetchMasterRole,
  fetchRole,
  fetchAllRole,
  fetchRolesUser,
  createRoleUser,
  deleteRoleUser,
} from "@/api/role";

import {
  validtextpersiancheck,
  validdrop,
  validnumcheck,
  validdatecheck,
  validmobailecheck,
  validen_nocharactercheck,
  validenPasswordcheck,
  alert,
} from "../validation/validation";

import { gitcontrol } from "@/api/programwork";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
const calendarTypeOptions = [
  { key: 1, display_name: "مرد" },
  { key: 2, display_name: "زن" },
];

export default {
  name: "Person",
  directives: { elDragDialog },
  components: {
    datePicker: VuePersianDatetimePicker,
    personaddres,
    personcontact,
    personfantype,
    cup,
  },

  data() {
    return {
      PageId: 305,
      control: [],
      loading: false,
      listLoading: false,
      load: false,
      selperson: false,
      showUser: false,
      panePerson: true,
      activeName: "panePerson",
      passwordFieldType: "password",
      dialogStatus: "",
      dialogStatusUser: "",
      options: "",
      calendarTypeOptions,
      personidpk: "",
      usernameidpk: "",
      repeatPass: "",
      mm: true,
      aa: false,
      dropMasterRole: [],
      masterId: "",
      dropRole: [],
      listRole: [],
      temp: {
        personsNationalId: 0,
        personsFirstName: "",
        personsLastName: "",
        personsFatherName: "",
        personsContactOwner: "",
        personsBirthdayDate: "",
        personsGenderIdFk: 0,
        personsOrganChartIdFk: 0,
        personsPersonnelId: 0,
        personsJobStartDateFk: "",
        personsJobEndDateFk: "",
        personsJobPlaceFk: 0,
        personsCardNumber: 0,
        personsIdPk: 0,
        personsStatus: "",
        personCupIdFk: "",
        personCupTitle: "",
        personPointValue: "",
        personsProfilePicture: "",
        regDate: "",
      },
      tempuser: {
        usersUsernamePk: "",
        usersPassword: "",
        usersUserNationalIdFk: 0,
      },
      tempRole: {
        userRoleUsernameFk: "",
        userRoleListIdFk: "",
      },
      idpersonidpk: "",
      DisablePerson: "",
      cart_fam_modal: false,
      all: "",
      loadingprinte: false,
      person_shema:false,
    };
  },
  created() {
    this.createget();
  },
  watch: {
    personidpk(val) {
      this.idpersonidpk = val;
    },
  },

  methods: {
    Fan_card_print() {
      this.loadingprinte = true;
    
        var sTable = document.getElementById("preint_bak_cart").innerHTML;
        var style = "<style>";
        style =
          style +
          "el-card {width: 8cm!important;height=10cm!important;font: 40px system-ui;}";
        style =
          style +
          ".ttt img{text-align:center!important}  .row {padding:1px;margin:1rem;}";
        style =
          style +
          "p {direction: rtl !important;font-family: system-ui !important;}";
        style = style + "img {width: 61% !important;margin-top: 1rem;}";
        style = style +` 
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .p-0 {
    padding: 0 !important;
  }
  .mt-5 {
    margin-top: 3rem !important;
  }
  .row {
    display: inline-flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    flex-direction: column;

    margin: 0px;
  }

  .col-12 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 100%;
  }
  .col-8 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-4 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .bak_cart {
    background-color: #fff;
    width: 8.9cm;
    height: 5.7cm;
    border-radius: 15px;
    border: 2px solid #2057a7;
    padding: 10px;
  }
  .user_styl {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 8px;
    padding-left: 0px;
  }
  .tite_cart {
    color: #2057a7;
    font-weight: 900;
    font-size: 16px;
  }
  .img_cover {
    width: 57px;
    position: relative;
    height: 57px;
    bottom: -19px;
    right: 16px;
  }
  .img_cup {
    width: 90px;
    position: absolute;
  }
  .img_cover_img {
    border-radius: 50%;
    object-fit: cover;
    width: 100% !important;
    height: 100%;
    margin-top:0px;
  }
  .col-img_cart {
    display: inline-flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .img_cover_img_sh {
    width: 100% !important;
    margin-top:0px;
    display: block;
  }


  .w-100 {
    width: 100% !important;
  }
  .h-100 {
    height: 100% !important;
  }
  .print_margin{
    margin-top: 89px !important;
  }
  body {font-family: myfont;
  direction:rtl
} 
`;
        style = style + "</style>";
        var win = window.open("", "", "height=8cm,width=8cm");

        win.document.write(style);
        win.document.write(sTable);

        win.document.write("</html>");
        win.document.close();
        setTimeout(() => {
        win.print();
        this.loadingprinte = false;
      }, 1000);
    },
    Fan_card() {
      this.temp.personCupIdFk = "";
      this.temp.personCupIdFk = this.all["personCupIdFk"];
      this.cart_fam_modal = true;
    },
    disablePerson(val) {
      this.msg = [];

      if (val == "" || val == undefined) {
        this.msg.push("پرسنل مورد نظر را انتخاب کنید");
      }
      if (this.msg.length != 0) {
        alert(this.msg);
      } else {
        updateStatusPerson(val).then((response) => {
          this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
            position: "top-left",
            duration: 4000,
          });
          this.personidpk = "";
        });
      }
    },
    resetStyle() {
      var elements = document.querySelectorAll(
        ".form-control , .el-input__inner"
      );
      elements.forEach((element) => {
        element.classList.remove("stwarning");
      });
    },
    //دراپ پرسنل
    onSearch(search, loading) {
      if (search.length > 1) {
        fetchNational(search).then((response) => {
          this.options = response.data;
         
        });
      }
    },

    //تابع بایند تب ها
    handleClick(tab, event) {
      if (tab.name == "panePerson") {
        if (this.selperson == true) {
          this.bindGridPerson();
        }
      } else if (tab.name == "paneUser") {
        if (this.selperson == true) {
          this.handleUser();
        }
      } else if (tab.name == "paneRole") {
        if (this.selperson == true) {
          this.handleroles();
        }
      } else if (tab.name == "tabaddres") {
        if (this.selperson == true) {
          this.idpersonidpk = this.personidpk;
          this.$refs.tabpersonaddres.getpersonsaddress();
        }
      } else if (tab.name == "tabcontact") {
        if (this.selperson == true) {
          this.idpersonidpk = this.personidpk;
          this.$refs.tabpersoncontact.getpersonscontacs();
        }
      } else if (tab.name == "tabfantype") {
        if (this.selperson == true) {
          this.idpersonidpk = this.personidpk;
          this.$refs.tabpersonfantype.getpersonsfantype();
        }
      }
    },

    /////تب پرسنل
    //بایند اطلاعات پرسنل
    bindGridPerson() {
      this.idpersonidpk = this.personidpk;
      this.resetStyle();
      fetchInfoNational(this.personidpk).then((response) => {
        this.all = response.data;
        console.log(this.all);
        this.temp.personsNationalId = response.data.personsNationalId;
        this.temp.personsFirstName = response.data.personsFirstName;
        this.temp.personsLastName = response.data.personsLastName;
        // this.temp.personsFatherName = response.data.personsFatherName;
        this.temp.personsBirthdayDate = response.data.personsBirthdayDate;
        this.temp.personsContactOwner = response.data.personsContactOwner;
        this.temp.personsGenderIdFk = response.data.personsGenderIdFk;
        this.temp.personsIdPk = this.personidpk;
        this.usernameidpk = response.data.userName;
        this.temp.personsStatus = response.data.personsStatus;

        this.temp.personCupIdFk = "";
        this.temp.personCupIdFk = response.data.personCupIdFk;
        this.temp.personCupTitle = response.data.personCupTitle;
        this.temp.personPointValue = response.data.personPointValue;
        this.temp.personsProfilePicture = "";
        this.temp.personsProfilePicture = response.data.personsProfilePicture;
        this.temp.regDate = response.data.regDate;
        this.selperson = true;
        this.dialogStatus = "ویرایش";
        this.activeName = "panePerson";
      });
    },

    //ویرایش پرسنل
    updateDataPerson() {
      this.msg = [];

      var validcheck = validnumcheck(
        this.temp.personsNationalId,
        "کد ملی",
        8,
        10
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document.getElementById("txtNationalId").classList.add("stwarning");
      } else {
        document.getElementById("txtNationalId").classList.remove("stwarning");
      }

      validcheck = validtextpersiancheck(
        this.temp.personsFirstName,
        "نام",
        1,
        25
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document.getElementById("txtFirstName").classList.add("stwarning");
      } else {
        document.getElementById("txtFirstName").classList.remove("stwarning");
      }

      validcheck = validtextpersiancheck(
        this.temp.personsLastName,
        "نام خانوادگی",
        1,
        30
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document.getElementById("txtLastName").classList.add("stwarning");
      } else {
        document.getElementById("txtLastName").classList.remove("stwarning");
      }

      // validcheck = validtextpersiancheck(
      //   this.temp.personsFatherName,
      //   "نام پدر",
      //   1,
      //   30
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document.getElementById("txtFatherName").classList.add("stwarning");
      // } else {
      //   document.getElementById("txtFatherName").classList.remove("stwarning");
      // }

      validcheck = validdatecheck(
        this.temp.personsBirthdayDate,
        "تاریخ تولد",
        10,
        10
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .querySelector("#txtBirthdayDate .vpd-input-group input")
          .classList.add("stwarning");
      } else {
        document
          .querySelector("#txtBirthdayDate .vpd-input-group input")
          .classList.remove("stwarning");
      }

      validcheck = validmobailecheck(
        this.temp.personsContactOwner,
        "شماره تماس",
        10,
        10
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document.getElementById("txtmobilenum").classList.add("stwarning");
      } else {
        document.getElementById("txtmobilenum").classList.remove("stwarning");
      }

      validcheck = validdrop(this.temp.personsGenderIdFk, "جنسیت");
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document.getElementById("dropGender").classList.add("stwarning");
      } else {
        document.getElementById("dropGender").classList.remove("stwarning");
      }

      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        this.load = true;
        updatePerson(this.temp).then((response) => {
          this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
            position: "top-left",
            duration: 4000,
          });
          this.load = false;
          this.bindGridPerson();
        });
      }
    },

    //////////تب حساب کاربری
    resetTempUser() {
      (this.tempuser.usersUserNationalIdFk = ""),
        (this.tempuser.usersUsernamePk = ""),
        (this.tempuser.usersPassword = "");
      this.repeatPass = "";
    },

    //بایند تابع تب حساب کاربری
    handleUser() {
      this.resetStyle();
      this.resetTempUser();
      this.msg = [];
      if (this.selPerson == false) {
        this.msg.push("پرسنل مورد نظر را انتخاب کنید");
      } else {
        this.tempuser.usersUserNationalIdFk = this.personidpk;
        if (this.usernameidpk == null) {
          this.showUser = false;
          this.dialogStatusUser = "ثبت";
        } else {
          this.tempuser.usersUsernamePk = this.usernameidpk;
          this.showUser = true;
          this.dialogStatusUser = "ویرایش";
        }
        this.activeName = "paneUser";
      }
    },

    // پسورد
    showPwd() {
      if (this.passwordFieldType === "password") {
        document.getElementById("txtusersPassword").type = "text";
        this.mm = false;
        this.aa = true;
        this.passwordFieldType = " ";
      } else {
        document.getElementById("txtusersPassword").type = "password";
        this.mm = true;
        this.aa = false;
        this.passwordFieldType = "password";
      }
    },
    //ویرایش پسورد
    updateDataUser() {
      this.msg = [];
      if (this.repeatPass != this.tempuser.usersPassword) {
        this.msg.push("کلمه عبور با تکرار کلمه عبور تفاوت دارد");
      }
      if (this.msg.length != 0) {
        alert(this.msg);
      } else {
        this.msg = [];
        var validcheck = validenPasswordcheck(
          this.tempuser.usersPassword,
          "کلمه عبور",
          8,
          30
        );
        if (validcheck.length != 0) {
          this.msg.push(validcheck);
          document
            .getElementById("txtusersPassword")
            .classList.add("stwarning");
        } else {
          document
            .getElementById("txtusersPassword")
            .classList.remove("stwarning");
        }

        validcheck = validenPasswordcheck(
          this.repeatPass,
          "تکرار کلمه عبور",
          8,
          30
        );
        if (validcheck.length != 0) {
          this.msg.push(validcheck);
          document
            .getElementById("txtrepeatusersPassword")
            .classList.add("stwarning");
        } else {
          document
            .getElementById("txtrepeatusersPassword")
            .classList.remove("stwarning");
        }
        this.load = true;
        if (this.msg.length != 0) {
          alert(this.msg);
          this.load = false;
        } else if (this.msg.length == 0) {
          const tempData = {
            usersUsernamePk: "",
            usersNewPassword: "",
          };
          tempData.usersUsernamePk = this.tempuser.usersUsernamePk;
          tempData.usersNewPassword = this.tempuser.usersPassword;

          updateUser(tempData).then((response) => {
            this.load = false;
            this.$notify({
              title:
                response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              position: "top-left",
              duration: 4000,
            });
            this.bindGridPerson();
            this.handleUser();
          });
        }
      }
    },

    //ثبت کاربر
    createDataUser() {
      this.msg = [];

      if (this.repeatPass != this.tempuser.usersPassword) {
        this.msg.push("کلمه عبور با تکرار کلمه عبور تفاوت دارد");
      }
      if (this.msg.length != 0) {
        alert(this.msg);
      } else {
        var validcheck = validen_nocharactercheck(
          this.tempuser.usersUsernamePk,
          "نام کاربری",
          5,
          40
        );
        if (validcheck.length != 0) {
          this.msg.push(validcheck);
          document.getElementById("txtUsername").classList.add("stwarning");
        } else {
          document.getElementById("txtUsername").classList.remove("stwarning");
        }

        validcheck = validenPasswordcheck(
          this.tempuser.usersPassword,
          "کلمه عبور",
          8,
          30
        );
        if (validcheck.length != 0) {
          this.msg.push(validcheck);
          document
            .getElementById("txtusersPassword")
            .classList.add("stwarning");
        } else {
          document
            .getElementById("txtusersPassword")
            .classList.remove("stwarning");
        }

        validcheck = validenPasswordcheck(
          this.repeatPass,
          "تکرار کلمه عبور",
          8,
          30
        );
        if (validcheck.length != 0) {
          this.msg.push(validcheck);
          document
            .getElementById("txtrepeatusersPassword")
            .classList.add("stwarning");
        } else {
          document
            .getElementById("txtrepeatusersPassword")
            .classList.remove("stwarning");
        }
        this.load = true;
        if (this.msg.length != 0) {
          alert(this.msg);
          this.load = false;
        } else if (this.msg.length == 0) {
          //const tempData = Object.assign({}, this.tempuser);
          createUser(this.tempuser).then((response) => {
            this.load = false;
            this.$notify({
              title:
                response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              position: "top-left",
              duration: 4000,
            });
            this.bindGridPerson();
            this.handleUser();
          });
        }
      }
    },

    ////////////تب نقش

    handleroles() {
      this.resetStyle();
      this.msg = [];
      if (this.selPerson == false) {
        this.listRole = [];
        this.msg.push("پرسنل مورد نظر را انتخاب کنید");
      }
      if (this.msg.length != 0) {
        this.activeName = "paneUser";
        alert(this.msg);
      } else {
        if (this.usernameidpk == null) {
          this.listRole = [];
          this.msg.push("ابتدا برای پرسنل مورد نظر حساب کاربری ایجاد کنید");
        }
        if (this.msg.length != 0) {
          this.activeName = "paneUser";
          alert(this.msg);
        } else {
          this.bindDropMasterRole();
          this.bindDropAllRole();
          this.bindGridRoles();
          this.activeName = "paneRole";
          this.$nextTick(() => {
            this.$refs["dataForm"].clearValidate();
          });
        }
      }
    },

    bindDropMasterRole() {
      fetchMasterRole().then((response) => {
        this.dropMasterRole = response.data;
      });
    },
    bindDropRole(value) {
      fetchRole(value).then((response) => {
        this.dropRole = response.data;
        this.tempRole.userRoleListIdFk = this.dropRole[0].rolesListIdPk;
      });
    },
    bindDropAllRole() {
      fetchAllRole().then((response) => {
        this.dropRole = response.data;
      });
    },

    bindGridRoles() {
      this.listLoading = true;
      this.listRole = [];
      fetchRolesUser(this.usernameidpk).then((response) => {
        this.listRole = response.data;
        this.listLoading = false;
      });
    },

    deleteDataRole(itemm) {
      swal({
        title: "آیا از حذف نقش مورد نظر اطمینان دارید؟",
        //  text: msg.join("\n"),
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then(async (value) => {
        this.load = true;
        if (value == true) {
          await deleteRoleUser(itemm.userRoleIdPk).then((response) => {
            this.load = false;
            this.bindGridRoles();
            this.$notify({
              title:
                response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              position: "top-left",
              duration: 4000,
            });
          });
        } else {
          this.load = false;
        }
      });
    },

    createDataRole() {
      this.msg = [];

      if (this.usernameidpk != null) {
        var validcheck = validdrop(this.tempRole.userRoleListIdFk, "نقش");
        if (validcheck.length != 0) {
          this.msg.push(validcheck);
          document.getElementById("dropRoles").classList.add("stwarning");
        } else {
          document.getElementById("dropRoles").classList.remove("stwarning");
        }
        this.load = true;
        if (this.msg.length != 0) {
          alert(this.msg);
          this.load = false;
        } else if (this.msg.length == 0) {
          this.resetStyle();

          this.tempRole.userRoleUsernameFk = this.usernameidpk;

          createRoleUser(this.tempRole).then((response) => {
            this.load = false;
            this.bindGridRoles();
            this.$notify({
              title:
                response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              position: "top-left",
              duration: 4000,
            });
          });
        }
      } else {
        this.msg.push("ابتدا برای پرسنل مورد نظر حساب کاربری ایجاد کنید");
        this.activeName = "paneUser";
      }
      if (this.msg.length != 0) {
        alert(this.msg);
      }
    },
    ///////////////////////
    //دسترسی
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

<style>
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: darkgray;
  cursor: pointer;
  user-select: none;
}
.text-l {
  text-align: left !important;
}
.card {
  margin-top: 20px !important;
  background: unset;
  color: #3a506b;
}
.card-body {
  height: 100% !important;
}
.demo-tabs {
  height: 100% !important;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #fff !important;
  background-color: #9fb5c6;
  border-radius: 8px 11px 11px 7px;
  margin-right: 4px;
}
.bak_cart {
  background-color: #fff;
  width: 8.9cm;
  height: 5.7cm;
  border-radius: 15px;
  border: 2px solid #2057a7;
  padding: 10px;
}
.user_styl {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 8px;
  padding-left: 0px;
}
.tite_cart {
  color: #2057a7;
  font-weight: 900;
  font-size: 16px;
}
</style>
<style scoped>
.img_cover {
  width: 57px;
  position: relative;
  height: 57px;
  bottom: -19px;
  right: 16px;
}
.img_cup {
  width: 90px;
  position: absolute;
}
.img_cover_img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.col-img_cart {
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}


</style>
<style lang="scss">
@media print {
  .col-12 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 100%;
  }
  .col-8 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-4 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .p-0 {
    padding: 0 !important;
  }
  .mt-5 {
    margin-top: 3rem !important;
  }
  .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y) * -1);
    margin-left: calc(var(--bs-gutter-x) * -0.5);
    margin-right: calc(var(--bs-gutter-x) * -0.5);
  }
  .row > * {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }

  .bak_cart {
    background-color: #fff;
    width: 8.9cm;
    height: 5.7cm;
    border-radius: 15px;
    border: 2px solid #2057a7;
    padding: 10px;
  }
  .user_styl {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 8px;
    padding-left: 0px;
  }
  .tite_cart {
    color: #2057a7;
    font-weight: 900;
    font-size: 20px;
  }
  .img_cover {
    width: 57px;
    position: relative;
    height: 57px;
    bottom: -19px;
    right: 16px;
  }
  .img_cup {
    width: 90px;
    position: absolute;
  }
  .img_cover_img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .col-img_cart {
    display: inline-flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .img_cover_img_sh {
    width: 100%;
  }


  .w-100 {
    width: 100% !important;
  }
  .h-100 {
    height: 100% !important;
  }

 
  body {
  direction:rtl
}

  /* @media screen and (max-width: 600px) {
  .col-12{
    width:100%;
  }
  .qrcode-img img {border-radius: 7px; width:100%;}
 } */
}
</style>

