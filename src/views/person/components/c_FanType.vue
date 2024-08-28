<template>
  <!-- <fieldset
    class="border mt-3"
    style="
                          width: 90%;
                          margin-inline: auto;
                         
                          direction: rtl;
                        ">
    <legend
      class="scheduler-border">
      نحوه ی آشنایی
    </legend> -->
    <div
      class="row p-2">
      <div
        class="col-12 col-lg-3">
        <div
          class="form-floating">
          <el-select
            id="personsFanTypeIdFk"
            placeholder="انتخاب کنید"
            clearable
            class="filter-item"
            v-model="fantype.personsFanTypeIdFk"
            filterable
            remote
            reserve-keyword>
            <el-option
              v-for="item in allfantype"
              :key="item.fanTypeIdPk"
              :label="item.fanTypeTitle"
              :value="item.fanTypeIdPk">

            </el-option>
          </el-select>
          <label
            class="form-label"
            for="personsFanTypeIdFk">نحوه ی آشنایی
            </label>
        </div>
      </div>
      <div
        class="col-12 col-lg-9">
        <div
          class="form-floating">

          <el-input
          :rows="2"
            id="personsFanDescription"
            v-model="fantype.personsFanDescription">
          </el-input>
          <label
            class="form-label"
            for="personsFanDescription">
            توضیحات
            
          </label>

        </div>
      </div>

      <div
        class="col-12 col-lg-12 my-3">
        <el-button
          type="success"
          v-show="btnreg"
          @click="addpersonsfantype()">
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
                class="row m-0 fix_hight" >
                <div
                  class="col-12 col-lg-12 my-2">
                  <div
                    class="row">
                    <div
                      class="col-12 col-lg-3">
                      <div
                        class="form-floating el-content">
                        <span> نحوی آشنای|</span>
                        <span
                          class="el-text"
                          v-if="item.personsFanTypetitle !== null">
                          {{
                            item.personsFanTypetitle
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
                        <span> توضیحات
                          |</span><span
                          class="el-text"
                          v-if="item.personsFanDescription !== null">
                          {{
                            item.personsFanDescription
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
                        @click="delitFanType(item.personsFanTypeIdPk)">
                        حذف
                      </el-button>
                    </div>
                  </div>
                </div>
                
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline> -->
        <el-table
          :data="tableData"
          border
          height="300"
          style="width: 100%">
          <el-table-column
            prop="personsFanTypetitle"
            label="نحوه ی آشنای">
          </el-table-column>
          <el-table-column
            prop="personsFanDescription"
            label="توضیحات">
          </el-table-column>
          <el-table-column
            label="عملیات">
            <template
              slot-scope="{ row }">
              
                <el-button
                  
                  type="danger"
                  @click="delitFanType(row.personsFanTypeIdPk)">
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
import { AddPersonsFanType, GetPersonsFanType, DeletePersonsFanType, GetFanType } from "@/api/person"
import {
  validdrop,
  validtextallcheck,
  alert,
} from "../../validation/validation";
export default {
  name: 'personfantype',
  props: {
    list_info: { required: true },

  },
  data() {
    return {
      value2: true,
      v_disabled: false,
     
      fantype: {
        personsFanTypeIdFk: "",
        personsFanDescription: "",
        personsFanTypePersonsIdFk: ""
      },

      tableData: [],
      allfantype: [],
      btnreg: true,
      msg: []
    }
  },
  created() {
    this.getfantype()
  },
  watch: {
    list_info(val) {
      this.fantype.personsFanTypePersonsIdFk = val
      this.getpersonsfantype()
      if (val.personsStatus) {
        this.v_disabled = true
      }
      else if (!val.personsStatus) {
        this.v_disabled = false
      }
  
    }
  },
  methods: {

    getfantype() {
      GetFanType().then((response) => {
        this.allfantype = response.data
      })
    },
    getpersonsfantype() {
      GetPersonsFanType(this.list_info).then((response) => {
        this.tableData = response.data
      })
    },
    addpersonsfantype() {
      this.msg = [];
      var validcheck = validdrop(
        this.fantype.personsFanTypeIdFk,
        "نحوی آشنایی"
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .querySelector("#personsFanTypeIdFk")
          .classList.add("stwarning");
      } else
        document
          .querySelector("#personsFanTypeIdFk")
          .classList.remove("stwarning");
      validcheck = validtextallcheck(
                          this.fantype.personsFanDescription,
                          "توضیحات",
                          8,
                          500
      );
      if (validcheck.length != 0) {
                          this.msg.push(validcheck);
                          document
                                              .querySelector("#personsFanDescription")
                                              .classList.add("stwarning");
      } else
                          document
                                              .querySelector("#personsFanDescription")
                                              .classList.remove("stwarning");
      // if (this.contac.contactValue.length == 0) {
      //   this.msg.push("شماره تماس را وارد کنید.");
      // }
      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        this.fantype.personsFanTypePersonsIdFk = this.list_info
        AddPersonsFanType(this.fantype).then((response) => {
          this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
            position: "top-left",
            duration: 4000,
          });
          this.fantype = {
            personsFanTypeIdFk: "",
            personsFanDescription: "",
          },
            this.getpersonsfantype();
        })
      }
    },
    delitFanType(id) {
      
      swal({
        title: "آیا از حذف نحوی آشنایی مورد نظر خود مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
        buttons: ["خیر", "بله"],
      }).then(async (value) => {
        if (value == true) {
          await DeletePersonsFanType(id).then((response) => {
            this.$notify({
              title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
              message: response.message,
              type: response.statusCode == "Success" ? "success" : "error",
              duration: 2000,
            });
          });
        
          this.getpersonsfantype()

        }
       
      });
    },


  }
}

</script>
                  
<style></style>