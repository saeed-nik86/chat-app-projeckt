<template>
  <div class="app-container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6 ">
        <div class="form-floating">
          <el-select
            ref="headerSearchSelect"
            v-model="dropPerson"
            :remote-method="onSearch"
            filterable
            remote
            placeholder="جستجو کنید"
            class="filter-item"
            @change="showCalendarPerson(dropPerson)"
          >
            <el-option
              v-for="item in options"
              :key="item.personsNationalIdPk"
              :value="item.personsNationalIdPk"
              :label="item.personInfo"
            />
          </el-select>
          <label class="form-label" for="txtStartDate">پرسنل</label>
        </div>
      </div>

      <div class="col-12" />

      <div class="col-12 col-lg-9 cal">
        <div id="shiftPersonCal" v-loading="isLoading">
          <Calendar
            :events-list="events"
            :display-period="period"
            @updateEvent="showShiftPerson($event, 'sh')"
            @updateShiftComp="showShiftPerson($event, 'cal')"
            @on-page-add="calendareOnMonth($event)"
            @on-page-subtract="calendareOnMonth($event)"
          />

          <el-dialog
            v-el-drag-dialog
            :title="dialogStatus"
            :visible.sync="dialogFormVisible"
            class="andaz"
          >
            <fieldset class="border">
              <legend class="scheduler-border">
                <span>شیفت : {{ tit }} ( </span>
                <span>تاریخ : {{ sdate }} ) </span>
              </legend>
              <el-form ref="dataForm" class="demo-ruleForm">
                <div class="row mb-2 p-2 justify-content-center">
                  <div class="col-12 ">
                    <div class="form-floating">
                      <el-select
                        id="dropShift"
                        v-model="tempshift.shiftIdFk"
                        placeholder="انتخاب کنید"
                        clearable
                        class="filter-item"
                        filterable
                        remote
                        reserve-keyword
                        :loading="loading"
                      >
                        <el-option
                          v-for="item in dropShift"
                          :key="item.shiftIdPk"
                          :label="item.shiftTitle"
                          :value="item.shiftIdPk"
                        />
                      </el-select>
                      <label for="dropShift">شیفت جایگزین</label>
                    </div>
                  </div>

                  <div class="col-12" />
                  <div class="col-12">
                    <div class="form-floating">
                      <textarea id="txtDesc" v-model="tempshift.description" :type="text" class="form-control text-l" AutoCompleteType="Disabled" autocomplete="off" maxlength="100" aria-multiline="2" />
                      <label class="form-label" for="txtDesc">توضیحات</label>
                    </div>
                  </div>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <div class="row justify-content-right px-2">
                  <div class="col-12 col-lg-4 mt-1">
                    <el-button
                      v-if="access('EditePersonToCalender')"
                      type="button"
                      :loading="load"
                      class="btn btn-primary m-1"
                      @click="updateShiftPerson()"
                    >
                      <i class="el-icon-edit" />
                      ویرایش
                    </el-button>
                  </div>
                </div>
              </div>
            </fieldset>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jalali from 'moment-jalaali'
import Calendar from '@/components/Calendar'

import {
  fetchNational,
  fetchShiftPerson,
  fetchShiftPersonBySearch,
  fetchShiftPersonBySearchOnMonth,
  updateShift,
  fetchAllShift,
  fetchAllShiftPerson,
  fetchAllShiftItem
} from '@/api/person'

import elDragDialog from '@/directive/el-drag-dialog'

import { validtextallcheck, validdrop, alert } from '../validation/validation'

import {
  gitcontrol
} from '@/api/programwork'

export default {
  name: 'ShiftPerson',
  auth: 'user',
  components: {
    Calendar
  },
  directives: { elDragDialog },
  data: () => ({
    msg: [],
    PageId: 152,
    control: [],
    isLoading: false,
    loading: false,
    load: false,
    period: 'months',
    events: [],
    dropPerson: '',
    options: [],

    tempper: {
      personsNationalId: ''
    },

    selectedShiftId: '',
    dialogFormVisible: false,
    dialogStatus: 'ویرایش شیفت',
    dropShift: [],
    sdate: '',
    tit: '',

    temp: [
      {
        id: '',
        startDateTime: Object,
        endDateTime: Object,
        title: '',
        color: ''
      }
    ],

    tempshift: {
      shiftPersonInCalendarIdPk: '',
      shiftIdFk: '',
      description: ''
    },

    tempDate: {
      PersonsNationalId: 0,
      dateCalendare: ''
    }
  }),

  created() {
    this.createget()
  },

  methods: {
    onSearch(search, loading) {
      if (search.length > 1) {
        fetchNational(search).then((response) => {
          this.options = response.data
        })
      }
    },

    showCalendarPerson(value) {
      this.isLoading = true
      this.tempper.personsNationalId = value
      fetchShiftPersonBySearch(this.tempper).then(async(response) => {
        this.temp = await JSON.parse(JSON.stringify(response.data))

        setTimeout(() => {
          this.handleDataCalendare()
          this.isLoading = false
        }, 1000)
      })
    },

    calendareOnMonth(value) {
      this.isLoading = true
      this.tempDate.PersonsNationalId = this.dropPerson
      this.tempDate.dateCalendare = value
      fetchShiftPersonBySearchOnMonth(this.tempDate).then(async(response) => {
        this.temp = await JSON.parse(JSON.stringify(response.data))

        setTimeout(() => {
          this.handleDataCalendare()
          this.isLoading = false
        }, 1500)
      })
    },

    handleDataCalendare() {
      const temppp = [
        {
          id: '',
          startDateTime: Object,
          endDateTime: Object,
          title: '',
          color: ''
        }
      ]

      this.events = this.temp.map((temppp) => {
        const properties = {
          id: '',
          startDateTime: Object,
          endDateTime: Object,
          title: '',
          color: ''
        }

        properties['id'] = temppp.id
        properties['startDateTime'] = this.$moment(
          temppp.startDateTime,
          'jYYYY/jMM/jDD '
        )

        properties['endDateTime'] = this.$moment(
          temppp.endDateTime,
          'jYYYY/jMM/jDD '
        )
        properties['title'] = temppp.title
        properties['color'] = temppp.color

        return properties
      })
    },

    showShiftPerson(selectedid, st) {
      this.msg = []
      if (this.dropPerson != '') {
        if (st == 'sh') { var obj = this.temp.find((x) => x.id === Number(selectedid)) } else { var obj = this.temp.find((x) => Number(x.startDateTime.replaceAll('/', '')) === Number(selectedid)) }

        if (obj != undefined) {
          setTimeout(() => {
            this.sdate = obj.startDateTime
            this.tit = obj.title
          }, 10)
          this.bindDropShift()

          setTimeout(() => {
            this.selectedShiftId = selectedid
            this.resetStyle()
            this.tempshift.description = ''
            this.tempshift.shiftIdFk = ''
            this.dialogFormVisible = true
          }, 10)
        }
      } else {
        this.msg.push('ابتدا پرسنل مورد نظر را انتخاب کرده سپس نسبت به ویرایش شیفت اقدام نمایید.')
        alert(this.msg)
      }
    },

    bindDropShift() {
      //   fetchAllShiftPerson(this.dropPerson, this.sdate).then((response) => {
      fetchAllShiftItem().then((response) => {
        this.dropShift = response.data
      })
    },

    resetStyle() {
      var elements = document.querySelectorAll(
        '.form-control , .el-input__inner'
      )
      elements.forEach((element) => {
        element.classList.remove('stwarning')
      })
    },

    updateShiftPerson() {
      this.msg = []

      var validcheck = validdrop(this.tempshift.shiftIdFk, 'شیفت')
      if (validcheck.length != 0) {
        this.msg.push(validcheck)
        document.getElementById('dropShift').classList.add('stwarning')
      } else document.getElementById('dropShift').classList.remove('stwarning')

      validcheck = validtextallcheck(
        this.tempshift.description,
        'توضیحات',
        1,
        100
      )
      if (validcheck.length != 0) {
        this.msg.push(validcheck)
        document.getElementById('txtDesc').classList.add('stwarning')
      } else document.getElementById('txtDesc').classList.remove('stwarning')

      this.load = true
      if (this.msg.length != 0) {
        alert(this.msg)
        this.load = false
      } else if (this.msg.length == 0) {
        this.resetStyle()

        const tempData = Object.assign({}, this.tempshift)
        tempData.shiftPersonInCalendarIdPk = this.selectedShiftId

        updateShift(tempData).then((response) => {
          this.dialogFormVisible = false
          this.load = false
          this.calendareOnMonth(String(this.sdate.replaceAll('/', '')).substring(0, 6))
          this.$notify({
            title: response.statusCode == 'Success' ? 'انجام شد' : 'انجام نشد',
            message: response.message,
            type: response.statusCode == 'Success' ? 'success' : 'error',
            position: 'top-left',
            duration: 4000
          })
        })
      }
    },

    // //////دسترسی کنترلرها/////
    createget() {
      gitcontrol(this.PageId).then((response) => {
        this.control = response.data
      })
    },

    access(dd) {
      if (this.control.length != 0) {
        return this.control.names.includes(dd)
      }
    }

  }
}
</script>
 <style scoped>
/* For Mobile */
@media screen and (max-width: 540px) {
  .cal {
    margin-top: 25px !important;
    overflow-x: scroll;
  }
}

 .cal {
    margin-top: 20px !important;
  }

</style>
