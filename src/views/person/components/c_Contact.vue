<template>
  <!-- <fieldset
    class="border mt-3"
    style="
      width: 90%;
      margin-inline: auto;

      direction: rtl;
    "
  >
    <legend class="scheduler-border">اطلاعات تماس</legend> -->
    <div class="row p-2">
      <div class="col-12 col-lg-3">
        <div class="form-floating">
          <el-select
            id="contactsTitleIdFk"
            placeholder="انتخاب کنید"
            clearable
            class="filter-item"
            v-model="contac.contactsTitleIdFk"
            filterable
            remote
            reserve-keyword
            @change="changecontacts"
          >
            <el-option
              v-for="item in allcontact"
              :key="item.contactsTitleIdPk"
              :label="item.contactsTitleName"
              :value="item.contactsTitleIdPk"
            >
            </el-option>
          </el-select>
          <label class="form-label" for="txtStartDate">نوع تماس</label>
        </div>
      </div>
      <div class="col-12 col-lg-3">
        <div class="form-floating">
          <el-input
            :placeholder="power"
            id="contactValue"
            v-model="contac.contactValue"
          >
          </el-input>
          <label class="form-label" for="txtgalleryTitle">  {{ galleryTitle }} </label>
        </div>
      </div>

      <div class="col-12 col-lg-12 my-3">
        <el-button type="success" v-show="btnreg" @click="addpersonscontact()">
          ثبت
        </el-button>
      </div>
      <div class="col-12 col-lg-12">
        <!-- <el-timeline>
          <el-timeline-item
            v-for="(item, index) in tableData"
            :key="index"
            type="primary"
            hollow="true">
            <el-card >
              <div
                class="row m-0 fix_hight" >
                <div
                  class="col-12 col-lg-12 my-2">
                  <div
                    class="row">
                    <div
                      class="col-12 col-lg-3">
                      <div
                        class="form-floating el-content">
                        <span>نوع تماس|</span>
                        <span
                          class="el-text"
                          v-if="item.contactsTitle !== null">
                          {{
                            item.contactsTitle
                          }}</span>
                        <span
                          class="el-text"
                          v-else>
                          ____</span>
                      </div>
                    </div>
                    <div
                      class="col-12 col-lg-4">
                      <div
                        class="form-floating el-content">
                        <span>شماره تماس
                          |</span><span
                          class="el-text"
                          v-if="item.contactValue !== null">
                          {{
                            item.contactValue
                          }}</span>
                        <span
                          class="el-text"
                          v-else>
                          ____</span>
                      </div>
                    </div>
                    <div
                      class="col-12 col-lg-4 ">
                      <el-button
                        :loading="loadingdel"
                        type="danger"
                        @click="delitcontact(item.delitcontact)">
                        حذف
                      </el-button>
                    </div>
                  </div>
                </div>
                
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline> -->

        <el-table :data="tableData" border height="300" style="width: 100%">
          <el-table-column prop="contactsTitle" label="نوع تماس">
          </el-table-column>
          <el-table-column prop="contactValue" label="اطلاعات تماس">
          </el-table-column>
          <el-table-column label="عملیات">
            <template slot-scope="{ row }">
              
                <el-button
                  type="danger"
                  @click="delitcontact(row.contactsIdPk)"
                >
                  حذف
                </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  <!-- </fieldset> -->
</template>
                  
<script>
import {
  AddPersonsContact,
  GetPersonsContact,
  DeletePersonsContact,
  GetContactsTitle,
} from "@/api/person";
import { validdrop, validnumcheck, alert } from "../../validation/validation";
export default {
  name: "personcontact",
  props: {
    list_info: { required: true },
  },
  data() {
    return {
      value2: true,
      v_disabled: false,

      contac: {
        contactsTitleIdFk: "",
        contactsPersonIdFk: "",
        contactValue: "",
      },
      tableData: [],
      allcontact: [],
      btnreg: true,
      msg: [],
      power:"42286364",
      galleryTitle:"شماره تماس"
    };
  },
  created() {
    this.getcontactstitle();
  },
  watch: {
    list_info(val) {
      this.contac.contactsPersonIdFk = val;
      this.getpersonscontacs();
      if (val.personsStatus) {
        this.v_disabled = true;
      } else if (!val.personsStatus) {
        this.v_disabled = false;
      }
    },
  },
  methods: {
    changecontacts(val){
    if(val==1){
      this.power="91********"
      this.galleryTitle="شماره موبایل"
    }
    if(val==2){
      this.power="test@gmail.com"
      this.galleryTitle="ایمیل"
    }
    if(val==3){
      this.power="42286364"
      this.galleryTitle="شماره تلفن "
    }
     
    if(val=="" || val==null){
      this.power=""
      this.galleryTitle="شماره تماس"
    }
     
    },
    getcontactstitle() {
      GetContactsTitle().then((response) => {
        this.allcontact = response.data;
      });
    },
    getpersonscontacs() {
      GetPersonsContact(this.list_info).then((response) => {
        this.tableData = response.data;
      });
    },
    addpersonscontact() {
      this.msg = [];
      var validcheck = validdrop(this.contac.contactsTitleIdFk, "نوع تماس");
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document.querySelector("#contactsTitleIdFk").classList.add("stwarning");
      } else
        document
          .querySelector("#contactsTitleIdFk")
          .classList.remove("stwarning");
      // validcheck = validnumcheck(
      //                     this.contac.contactValue,
      //                     "شماره تماس",
      //                     8,
      //                     10
      // );
      // if (validcheck.length != 0) {
      //                     this.msg.push(validcheck);
      //                     document
      //                                         .querySelector("#contactValue")
      //                                         .classList.add("stwarning");
      // } else
      //                     document
      //                                         .querySelector("#contactValue")
      //                                         .classList.remove("stwarning");
      if (this.contac.contactValue.length == 0) {
        this.msg.push("شماره تماس را وارد کنید.");
        document.querySelector("#contactValue").classList.add("stwarning");
      } else {
        document.querySelector("#contactValue").classList.remove("stwarning");
      }
      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        this.contac.contactsPersonIdFk = this.list_info;
        AddPersonsContact(this.contac).then((response) => {
          this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
            position: "top-left",
            duration: 4000,
          });
          (this.contac = {
            contactsTitleIdFk: "",
            contactValue: "",
          }),
            this.getpersonscontacs();
        });
      }
    },
    delitcontact(id) {
      swal({
        title: "آیا از حذف اطلاعات تماس مورد نظر خود مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then(async (value) => {
        if (value == true) {
          await DeletePersonsContact(id).then((response) => {
            this.$notify({
              title:
                response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              duration: 2000,
            });
          });

          this.getpersonscontacs();
        }
      });
    },
  },
};
</script>
                  
<style>
#contactValue{
  direction: ltr;
}
#contactValue::-webkit-input-placeholder {
   direction: ltr;
   float: left;
}

#contactValue:-ms-input-placeholder {
  direction: ltr;
   float: left;
}

#contactValue::-ms-input-placeholder {
  direction: ltr;
   float: left;
}</style>