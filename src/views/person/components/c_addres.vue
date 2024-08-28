<template>
  <!-- <fieldset
    class="border mt-3"
    style="
        width:90%;
        margin-inline: auto;
        direction: rtl;
      ">
    <legend
      class="scheduler-border">
      آدرس
    </legend> -->
    <div
      class="row justify-content-center p-2">
      <div
        class="col-12 col-lg-3">
        <div
          class="form-floating">

          <el-select
            id="addressCityIdFk"
            placeholder="انتخاب کنید"
            clearable
            class="filter-item"
            v-model="addres.addressCityIdFk"
            filterable
            remote
            reserve-keyword>
            <el-option
              v-for="item in allCity"
              :key="item.cityIdPk"
              :label="item.cityTitle"
              :value="item.cityIdPk">
              {{
                item.cityTitle
              }}
            </el-option>
          </el-select>
          <label
            class="form-label"
            for="txtStartDate">شهر</label>
        </div>
      </div>
      <div
        class="col-12 col-lg-3">
        <div
          class="form-floating">

          <el-input
          placeholder="1234567890"
            id="addressZipPost"
            v-model="addres.addressZipPost">
          </el-input>
          <label
            class="form-label"
            for="txtgalleryTitle">
            کد
            پستی
          </label>

        </div>
      </div>
      <div
        class="col-12 col-lg-6 ">
        <div
          class="form-floating">

          <el-input
            id="addressLocation"
            v-model="addres.addressLocation">
          </el-input>
          <label
            class="form-label"
            for="txtgalleryTitle">
            آدرس
          </label>

        </div>
      </div>
      <div
        class="col-12 col-lg-12 my-3">
        <el-button
          type="success"
          v-show="btnreg"
          @click="addpersonsaddress()">
          ثبت
        </el-button>


      </div>
      <div
        class="col-12 col-lg-12">
        <!-- <el-timeline>
          <el-timeline-item
            v-for="(item, index) in tableData"
            :key="index"
            type="primary"
            hollow="true">
            <el-card >
              <div
                class="row m-0 fix_hight" :class="item.addressToken ? 'success_tokenaddres':''">
                <div
                  class="col-12 col-lg-12 my-2">
                  <div
                    class="row">
                    <div
                      class="col-12 col-lg-3">
                      <div
                        class="form-floating el-content">
                        <span>شهر|</span>
                        <span
                          class="el-text"
                          v-if="item.addressCityName !== null">
                          {{
                            item.addressCityName
                          }}</span>
                        <span
                          class="el-text"
                          v-else>
                          ____</span>
                      </div>
                    </div>
                    <div
                      class="col-12 col-lg-3">
                      <div
                        class="form-floating el-content">
                        <span>کد
                          پستی|</span><span
                          class="el-text"
                          v-if="item.addressZipPost !== null">
                          {{
                            item.addressZipPost
                          }}</span>
                        <span
                          class="el-text"
                          v-else>
                          ____</span>
                      </div>
                    </div>
                    <div
                      class="col-12 col-lg-6">
                      <div
                        class="form-floating el-content">
                        <span>
                          آدرس
                          |</span><span
                          class="el-text"
                          v-if="item.addressLocation !== null">
                          {{
                            item.addressLocation
                          }}</span>
                        <span
                          class="el-text"
                          v-else>
                          ____</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 col-lg-12">
                  <div
                    class="row">
                    <div
                      class="col-12 col-lg-6 mt-3">
                      <el-switch
                      :disabled="item.addressToken ? true:false"
                        @change="edittokenpersonsaddress(item)"
                        style="display: block;direction: ltr;"
                        v-model="item.addressToken"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="فعال"
                        inactive-text="غیر فعال">
                      </el-switch>
                    </div>
                    <div
                      class="col-12 col-lg-6 mt-3">
                      <el-button
                        :loading="loadingdel"
                        type="danger"
                        @click="delitaddress(item.addressIdPk)">
                        حذف
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline> -->
<!-- <div class="row"> 
  <div>

</div>
</div> -->

        <el-table
          v-loading="load_PT"
          :data="tableData"
          border
          :row-class-name="tableRowClassName"
          height="300"
           style="width: 100%">
          <el-table-column
            prop="addressZipPost"
            label="کد پستی">
          </el-table-column>
          <el-table-column
            prop="addressCityName"
            label="شهر">
          </el-table-column>
          <el-table-column
            prop="addressLocation"
            label="آدرس">
          </el-table-column>
          <el-table-column
            label="فعال/غیرفعال"
            width="200px">
            <template
              slot-scope="{ row }">
              <el-switch
                @change="edittokenpersonsaddress(row)"
                style="display: block;direction: ltr;"
                v-model="row.addressToken"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="فعال"
                inactive-text="غیر فعال">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="عملیات"
            width="100px">
            <template
              slot-scope="{ row }">
            
                <el-button
                 
                  type="danger"
                  @click="delitaddress(row.addressIdPk)">
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
import { GetCity } from "@/api/point"
import { AddPersonsAddress, GetPersonsAddress, DeletePersonsAddress, EditTokenPersonsAddress } from "@/api/person"
import {
  validdrop,
  validtextcheck,
  validnumcheck,
  alert,
} from "../../validation/validation";
export default {
  name: 'personaddres',
  props: {
    list_info: { required: true },

  },
  data() {
    return {
      value2: true,
      v_disabled: false,
      addres: {
        addressPersonIdFk: "",
        addressZipPost: "",
        addressCityIdFk: "",
        addressLocation: "",
      },
      tableData: [],
      allCity: [],
      btnreg: true,
      msg: [],
      load_PT: false,

    }
  },
  created() {
    this.getCity()
  },
  watch: {
    list_info(val) {
      this.addres.addressPersonIdFk = val
      this.getpersonsaddress()
      if (val.personsStatus) {
        this.v_disabled = true
      }
      else if (!val.personsStatus) {
        this.v_disabled = false
      }
    }
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.addressToken) {
        return 'success-row';

      } else if (!row.addressToken) {
        return 'danger-row';
      }
      return '';
    },
    getCity() {
      GetCity().then((response) => {
        this.allCity = response.data
      })
    },
    getpersonsaddress() {
      this.load_PT = true
      GetPersonsAddress(this.list_info).then((response) => {
        this.tableData = response.data

        this.load_PT = false
        // this.addres = Object.assign({}, response.data[0]);
        // if ( this.addres.legend != 0) {
        //                     this.btnreg = false
        // }
        // else if ( this.addres.legend == 0){
        //                     this.btnreg = true
        // }
      });
      if (this.tableData) {
        this.load_PT = false
      }
      else this.load_PT = false

    },
    addpersonsaddress() {
      this.msg = [];
      var validcheck = validdrop(
        this.addres.addressCityIdFk,
        "شهر"
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .querySelector("#addressCityIdFk")
          .classList.add("stwarning");
      } else
        document
          .querySelector("#addressCityIdFk")
          .classList.remove("stwarning");
      validcheck = validnumcheck(
        this.addres.addressZipPost,
        "کد پستی",
        8,
        10
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .querySelector("#addressZipPost")
          .classList.add("stwarning");
      } else
        document
          .querySelector("#addressZipPost")
          .classList.remove("stwarning");
      validcheck = validtextcheck(
        this.addres.addressLocation,
        "آدرس",
        5,
        500
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .querySelector("#addressLocation")
          .classList.add("stwarning");
      } else
        document
          .querySelector("#addressLocation")
          .classList.remove("stwarning");

      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        this.addres.addressPersonIdFk = this.list_info
        AddPersonsAddress(this.addres).then((response) => {
          this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
            position: "top-left",
            duration: 4000,
          });
          this.addres = {
            addressZipPost: "",
            addressCityIdFk: "",
            addressLocation: "",
          },
            this.getpersonsaddress();
        })
      }
    },
    delitaddress(id) {
      swal({
        title: "آیا از حذف آدرس مورد نظر خود مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then(async (value) => {
        if (value == true) {
          await DeletePersonsAddress(id).then((response) => {
            this.$notify({
              title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              duration: 2000,
            });
          });
          this.getpersonsaddress();
        }
        
      });
    },

    edittokenpersonsaddress(val) {

      EditTokenPersonsAddress(val.addressPersonIdFk, val.addressIdPk).then((response) => {
        this.$notify({
          title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
          message: response.message,
          type: response.statusCode == "Success" ? "success" : "error",
          position: "top-left",
          duration: 4000,
        });
      });
      setTimeout(() => {
        this.getpersonsaddress();
      }, 100);

    },
  }
}

</script>
<style scoped>

.fix_hight{
  background: #ffd0d0;
}
</style>
<style>
tr.el-table__row.danger-row{
  background: #ffd0d0;
}
tr.el-table__row.success-row{
    background: #7bffc252;
}
.el-text {
  font-weight: 800;
  font-size: 14px;
}
.fix_hight{
  min-height: auto;
  padding-block: 10px;
}
.success_tokenaddres {
  background-color: #d5f3e2 !important;
}
@media screen and (max-width: 769px) {
  .el-timeline-item__wrapper{
    padding-left: unset !important;
  }
  .el-timeline{
    padding-left: unset !important;
    padding-right: unset !important;
  }
 
}

</style>