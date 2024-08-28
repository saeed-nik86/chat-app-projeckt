<template>
     
        <div class="profile-user-info">
          <table
            class="table_md table table-responsive-sm"
            style="margin-top: 30px; height: 6rem;"
          >
            <tr class="h-50 info-tr">
              <td class="info-td">نام/نام خانوادگی</td>
              <td class="info-td-data">
                {{ info.personsFirstName }}
                {{ info.personsLastName }}
              </td>
              <th rowspan="2" class="info-td-data">عکس پرسنلی</th>
              <td class="info-td">کد پرسنلی</td>
              <td class="info-td-data">
                {{ info.personsNationalIdPk }}
              </td>
            </tr>

            <tr class="h-50">
              <td class="info-td">نام پدر</td>
              <td class="info-td-data">
                {{ info.personsFatherName }}
              </td>

              <td class="info-td">نام کاربری</td>
              <td class="info-td-data">
                {{ info.userName }}
              </td>
            </tr>
          </table>
        </div>
   
</template>

<script>
 
export default  {
   props: {
    info:Object
  },
  data() {
    return {
 
    };
  },
} 
</script>
<style scoped>

.info-td {
  background-color: #ebebeb !important;
  border-bottom: 2px solid #9b9ba6 !important;
  width: 10rem!important;
}

.info-td-data {
  border-bottom: 2px solid #dfe6ec !important;
  border-left: 2px solid #dfe6ec !important;
  background-color: #ebebeb54 !important;
}

.info-tr {
  border-top: 1px solid #dfe6ec !important;
}
</style>
