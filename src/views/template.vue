<template>
  <!-- اسکرول -->
  <!-- اسکرول -->
  <el-scrollbar
    height="800px"
    class="scroll-container nohaid"
    wrap-class="scrollbar-wrapper"
  />
  <!-- اسکرول -->
  <div class="row">
    <!-- ساعت -->
    <date-picker v-model="time" type="time" />
    <!-- دکمه ثبت -->
    <div class="col-2">
      <button type="button" class="btn btn-success m-1" @click="modalcreategroup()"><i class="el-icon-plus" />گروه جدید</button>
    </div>
    <!-- دکمه راهنما -->
    <div class="col-10">
      <button type="button" class="btn m-1"><i class="el-icon-question help" /></button>
    </div>
    <!-- دکمه جستجو -->
    <div class="col-12 col-lg-2 text-center">
      <button type="button" class="btn btn-narengi" @click="search()"><i class="el-icon-search" />جستجو</button>
    </div>
    <!-- دکمه خذف در گردویو -->
    <el-button
      v-if="!(edit == item.groupsIdPk)"
      type="danger"
      size="small"
      @click="deletgroup(item)"
    > <i class="el-icon-delete" /></el-button>
    <!-- دکمه آبی برای نشان دادن دکمه ویرایش وکنسل -->
    <el-button
      v-if="!(edit == item.groupsIdPk)"
      type="primary"
      size="small"
      icon="el-icon-edit"
      @click="edite(item)"
    />
    <!-- دکمه ویرایش -->
    <el-button
      v-if="edit == item.groupsIdPk"
      type="success"
      size="small"
      icon="el-icon-check"
      @click="updategroup(item)"
    />
    <!-- دکمه کنسل -->
    <el-button
      v-if="edit == item.groupsIdPk"
      class="cancel-btn"
      size="small"
      icon="el-icon-close"
      type="warning"
      @click="cancelEdit(item)"
    />
    <!-- دکمه برای نشان دادن مدال -->
    <el-button
      size="small"
      icon="el-icon-s-order"
      class="el-button--benafsh"
      @click="modalcreatepersongroup(item)"
    />
    <el-button
      size="small"
      icon="el-icon-s-order"
      class="el-button--benafsh_light"
      @click="modalcreatepersongroupp(item)"
    />

    <!-- تاریخ و ساعت توجه کتابخانه اضافه گردد -->
    <date-picker v-model="date" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD" />

    <br>
    <br>
    <date-picker v-model="time" type="time" />
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

    <!-- دراپ انتخابی -->
    <el-table-column label="معاونت ها" prop="managmentAssistanceName">
      <template slot-scope="{ row }">
        <template v-if="row.editmang">
          <el-select
            v-model="row.managmentAssistanceName"

            filterable
            remote
            reserve-keyword

            :remote-method="remoteMethod"
            :loading="loading"

            style="size:5"
          >
            <el-option
              v-for="item in dropdata"
              :key="item.assistanceIdPk"
              :label="item.assistanceName"
              :value="item.assistanceIdPk"
            />
          </el-select>
          <el-button
            v-show="false"
            class="cancel-btn"
            size="small"
            icon="el-icon-refresh"
            type="warning"
            @click="cancelEditmang(row)"
          />
        </template>
        <span v-else>{{ row.managmentAssistanceName }}</span>
      </template>
    </el-table-column>
    <!-- هر جا دکمه توی صفحه دارین اینطوری بزارین  -->
    <div class="col-2">
      <button type="button" class="btn btn-success">گروه جدید</button>
    </div>

    <!-- سرچ ایجکسی -->
    <div class="col-12 col-lg-4">
      <div class="form-floating">
        <el-select
          ref="headerSearchSelect"
          v-model="grid.nationalIds"
          :remote-method="onSearch"
          filterable
          multiple
          remote
          placeholder="جستجو کنید"
          class="filter-item"
        >
          <el-option v-for="item in options" :key="item.personsNationalIdPk" :value="item.personsNationalIdPk" :label="item.personInfo" />
        </el-select>
        <label class="form-label" for="txtStartDate">کدملی</label>
      </div>
    </div>

    <!-- چک باکس تکی -->
    <div class="col-12 col-lg-4 text-center">
      <div class="form-floating">
        <input id="status" v-model="grid.notIn" type="checkbox" class="form-check-input">
        <label class="form-check-label active" for="holiday">به جز</label>
      </div></div>

    <!-- دراپ معمولی یا مولتی پل -->
    <div class="col-12 col-lg-4 ">
      <div class="form-floating">
        <el-select
          v-model="grid.companyIds"
          placeholder="انتخاب کنید"
          clearable
          class="filter-item"
          multiple
          :change="dropmanagmentfilter()"
        >
          <el-option
            v-for="item in droporgan"
            :key="item.organsIdPk"
            :label="item.organsName"
            :value="item.organsIdPk"
          />
        </el-select>
        <label for="txtTitle">شرکت</label>
      </div>
    </div>

    <!-- گریدویو همه دکمه ها توی گردویو el-botton باشند -->
    <div class="col-12 mt-3">
      <el-table
        v-for="item in list"
        :key="item"

        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="عملیات">
          <template slot-scope="{ row }">

            <el-button
              v-if="!row.edit"
              type="success"
              size="small"
              icon="el-icon-edit"
              @click="row.edit = !row.edit"
            />

            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-check"
              @click="updategroup(row)"
            />

            <el-button
              v-if="row.edit"
              class="cancel-btn"
              size="small"
              icon="el-icon-close"
              type="warning"
              @click="cancelEdit(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="نام گروه">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input
                v-model="row.groupsTitle"
                class="edit-input"
                size="small"
                autofocus
              />
            </template>
            <span v-else-if="row.groupsTitle !== null">{{ item.groupsTitle }}</span>
            <span v-else-if="row.groupsTitle != null">{{ row.groupsTitle }}</span>
            <span v-else>____</span>
          </template>
        </el-table-column>
        <el-table-column label="ردیف">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- تکس باکس -->
    <div class="col-12 col-lg-4">
      <div class="form-floating">
        <input
          id="txtStartDate"
          v-model="persongroup.personsGroupStartDate"
          type="text"
          class="form-control"
        >
        <label class="form-label" for="txtStartDate">تاریخ شروع</label>
      </div>
    </div>
  </div>

  <!-- اضافه کنید برای جابه جایی مدال -->
  <el-dialog v-el-drag-dialog :title="textMapp[dialogStatuss]" :visible.sync="dialogFormVisiblePersonGroupp" />
  <!-- در اسکریپت اضافه کنید -->
  import elDragDialog from '@/directive/el-drag-dialog';
  <!-- در اکسپورت دیفالت اضافه کنید -->
  name: 'DragDialogDemo',
  directives: { elDragDialog },
</template>

<script>

export default {
  components: {
    datePicker: VuePersianDatetimePicker
  },
  data() {
    return {

    }
  }
}
</script>
<style>

</style>
