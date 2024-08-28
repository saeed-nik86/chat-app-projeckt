<template>
  <div class="app-container">
    <!-- <div class="row">
      <div class="col-12">
        <button type="button" class="btn m-1" @click="modalhelp">
          <i class="el-icon-question help" />
        </button>
      </div>
    </div> -->
    <el-tabs type="border-card" class="demo-tabs mt-3">
      <el-tab-pane label="دسترسی نقوش">
    <div class="row justify-content-center">
      <div class="col-12 col-md-4 mt-3">
        <div class="form-floating">
          <el-select
            placeholder="انتخاب کنید"
            v-model="itemaccess.masterRoleListIdFk"
             id="dropmasterRoleListIdFk"
             filterable 
             @change="bindrolelist"
          >
            <el-option
              v-for="item in dropmasterlistaccess"
              :key="item.masterRolesListIdPk"
              :label="item.masterRolesListPname"
              :value="item.masterRolesListIdPk"
            >
            </el-option>
          </el-select>
          <label for="txtTitle">لیست نقش</label>
        </div>
      </div>
    </div>
    <div class="row" v-show="div_filter">
    <div class="col-12 col-lg-3">
            <div class="form-floating">
              <el-input
               v-model="yesff"
                class="edit-input"
                size="small"
                @input="filteraccess()"
              />
              <label class="form-label" for="txtStartDate">جستجو کنید</label>
            </div>
          </div>
          </div>
    <div class="row justify-content-center py-4">
     
      <div class="col-10">
  <el-collapse>
        <ul
          v-for="(itemaccess) in listaccess"
          :key="itemaccess.id"
           class="tree"
           dir="rtl"
        >
                 
     <el-collapse-item>
        
       <template slot="title">
  <span > {{ itemaccess.label }}</span>   
    </template>
          <!-- <span > {{ itemaccess.label }}</span> -->
          <li >
            
               <input
               type="checkbox"
               :id="'yes'+itemaccess.id"
               :value="itemaccess.id"
                v-model="itemaccess.selectedPagesId"
                class="ried"
            />
              
            <span > {{ itemaccess.label }}</span>
      

            <ul
              v-for="(itemaccess) in itemaccess.children"
              :key="itemaccess.id" 
            >
         
              <li>
               
                <input
                  type="checkbox"
                   :id="'no'+itemaccess.id"
                   :value="itemaccess.id"
                  v-model="itemaccess.selectedControllersId"
                  class="riedaa"
                />
                
               <span></span> {{ itemaccess.label }}
               
              </li>
             
            </ul>
          </li>
           </el-collapse-item>
        </ul>
            </el-collapse>
      </div>
    </div>

    <el-row class="panel-group text-center mt-5">
      <el-button type="success" class="w-25"   size="small" @click="regaccess()" v-if= "access('AddAccessRoleToPage') "
        >ثبت دسترسی</el-button
      >
    </el-row>
     </el-tab-pane>
    <el-tab-pane label="نقش">
         <div class="row">
      <div class="col-8 col-md-2">
       <button type="button" class="btn btn-success m-1" @click="modalcreategroup()"><i class="el-icon-plus" /> نقش جدید</button>
      </div>
      <div class="col-12 table-responsive text-nowrap">
         <!-- <el-scrollbar
              height="800px"
              class="scroll-container nohaid"
              wrap-class="scrollbar-wrapper"
            > -->
    <table  class="el-table el-table--border table table-striped table-hover"
            border
            fit
            highlight-current-row
            :per-page="perPage"
            :current-page="currentPage"
            id="tablee"
            >
        <thead>
          <tr>
               <th class="th_width">ردیف</th>

            <th>
           نام فارسی نقش
            </th>
              <th>
           نام انگلیسی نقش
            </th>
           <th>
              نقش مادر
            </th>
            <th>
            سازمان
            </th>
            <th>
              مدیریت
            </th>
                   <th>
             معاونت
            </th>
             <th>
              نام کاربری
            </th>
          
             <!-- <th>
              برنامه کاری
            </th> -->
         
            <th>
              توضیحات
            </th>
             <th>
             عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="pp">
              <td>{{index}}</td>
             <td>         
             <template>
                <el-input v-model="createtempaccessrolelist.rolesListPname"
                id="textrolesListPname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
            <td>         
             <template>
                <el-input v-model="createtempaccessrolelist.rolesListEname"
                id="textrolesListEname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
                <td>         
             <template>
            <el-select v-model="createtempaccessrolelist.rolesListMasterRolesListIdFk" id="textrolesListMasterRolesListIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropmasterlistpp"
         :key="item.masterRolesListIdPk"
         :label="item.masterRolesListPname"
          :value="item.masterRolesListIdPk">
        </el-option>
                                  </el-select>
              </template>
            </td>
            <td>         
             <template>
                       <el-select v-model="createtempaccessrolelist.rolesListOrgansIdFk" id="textrolesListOrgansIdFk" @change="changeclick" filterable  clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in droporgans"
         :key="item.organsIdPk"
         :label="item.organsName"
          :value="item.organsIdPk">
        </el-option>
       </el-select>
              </template>
            </td>
                     <td>         
             <template>
         <el-select v-model="createtempaccessrolelist.rolesListManagmentIdFk" id="textrolesListManagmentIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropmangmang"
         :key="item.managmentIdPk"
         :label="item.managmentName"
          :value="item.managmentIdPk">
        </el-option>
       </el-select>
              </template>
            </td>
                   <td>         
             <template>
                           <el-select v-model="createtempaccessrolelist.rolesListAssistanceIdFk" id="textrolesListAssistanceIdFk" filterable  clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropassis"
         :key="item.assistanceIdPk"
         :label="item.assistanceName"
          :value="item.assistanceIdPk">
        </el-option>
       </el-select>
              </template>
            </td>

                      <td>         
             <template>
           <el-select
              ref="headerSearchSelect"
              v-model="createtempaccessrolelist.rolesListUsernameFk"
              id="textrolesListUsernameFk"
              :remote-method="onSearch"
               remote
              clearable
              filterable
              placeholder="جستجو کنید"
              class="filter-item"
            >
              <el-option
                v-for="item in options"
                :key="item.usersUsernamePk"
                :value="item.usersUsernamePk"
                :label="item.userPersonalInfo"
              />
            </el-select>
              </template>
            </td>

          
            <!-- <td>         
             <template>
                              <el-select v-model="createtempaccessrolelist.rolesListSubProgramsIdFk" id="textrolesListSubProgramsIdFk" filterable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropprog"
         :key="item.workProgramIdPk"
         :label="item.workProgramTitle"
          :value="item.workProgramIdPk">
        </el-option>
       </el-select>
              </template>
            </td> -->
     
          <td>         
             <template>
                <el-input v-model="createtempaccessrolelist.rolesListDescription"
                id="textrolesListDescription"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
            <td>
                  <el-tooltip
                  class="item"
                  effect="dark"
                  content="ثبت"
                  placement="top-start"
                >
                <el-button type="success"
                         size="small" @click="createaccess()" v-if= "access('AddAccessRolesList') ">ثبت</el-button>
                  </el-tooltip>
                     <el-tooltip
                  class="item"
                  effect="dark"
                  content="انصراف"
                  placement="top-start"
                >
                         <el-button  icon="el-icon-close"
                         type="warning"
                         size="small" @click="enserafgroupaccesss()"></el-button>
                     </el-tooltip>
            </td>
          </tr>
          <tr  v-for="(item,index) in listaccessrolelist"
            :key="item.rolesListIdPk">
            <td>
                  {{ index + 1 }}
                </td>
            <td>  
             <template v-if="editaccessrole == item.rolesListIdPk">
                <el-input v-model="item.rolesListPname"
                id="textinputrolesListPname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.rolesListPname !== null">{{ item.rolesListPname }}</span>
              <span v-else>____</span>
            </td>
            <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                <el-input v-model="item.rolesListEname"
                id="textinputrolesListEname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
               <span v-else-if="item.rolesListEname !== null">{{ item.rolesListEname }}</span>
              <span v-else>____</span>
            </td>
            <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                                  <el-select v-model="createtempaccessrolelist.rolesListMasterRolesListIdFk" id="textinputrolesListMasterRolesListIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropmasterlist"
         :key="item.masterRolesListIdPk"
         :label="item.masterRolesListPname"
          :value="item.masterRolesListIdPk">
        </el-option>
         </el-select>
              </template>
             <span v-else-if="item.rolesListMasterRolesListName !== null">{{ item.rolesListMasterRolesListName }}</span>
             <span v-else>____</span>
            </td>
            <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                       <el-select v-model="createtempaccessrolelist.rolesListOrgansIdFk" id="textinputrolesListOrgansIdFk" @change="changeclick" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in droporgans"
         :key="item.organsIdPk"
         :label="item.organsName"
          :value="item.organsIdPk">
        </el-option>
       </el-select>
              </template>
               <span v-else-if="item.rolesListOrgansName !== null">{{ item.rolesListOrgansName }}</span>
              <span v-else>____</span>
            </td>
                     <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                       <el-select v-model="createtempaccessrolelist.rolesListManagmentIdFk" id="textinputrolesListManagmentIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropmangmang"
         :key="item.managmentIdPk"
         :label="item.managmentName"
          :value="item.managmentIdPk">
        </el-option>
       </el-select>
              </template>
                <span v-else-if="item.rolesListManagmentName !== null">{{ item.rolesListManagmentName }}</span>
              <span v-else>____</span>
            </td>
              <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                           <el-select v-model="createtempaccessrolelist.rolesListAssistanceIdFk" id="textinputrolesListAssistanceIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropassis"
         :key="item.assistanceIdPk"
         :label="item.assistanceName"
          :value="item.assistanceIdPk">
        </el-option>
       </el-select>
              </template>
                    <span v-else-if="item.rolesListAssistanceName !== null">{{ item.rolesListAssistanceName }}</span>
              <span v-else>____</span>
            </td>

                      <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
           <el-select
              ref="headerSearchSelect"
              v-model="createtempaccessrolelist.rolesListUsernameFk"
              id="textinputrolesListUsernameFk"
              :remote-method="onSearch"
              remote
              filterable
              clearable
              placeholder="جستجو کنید"
              class="filter-item"

            >
              <el-option
                v-for="item in options"
                :key="item.usersUsernamePk"
                :value="item.usersUsernamePk"
                :label="item.userPersonalInfo"
              />
            </el-select>
              </template>
                <span v-else-if="item.usersUsernamePk !== null">{{ item.userPersonalInfo }}</span>
              <span v-else>____</span>
            </td>

          
            <!-- <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                              <el-select v-model="createtempaccessrolelist.rolesListSubProgramsIdFk" id="textinputrolesListSubProgramsIdFk" filterable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropprog"
         :key="item.workProgramIdPk"
         :label="item.workProgramTitle"
          :value="item.workProgramIdPk">
        </el-option>
       </el-select>
              </template>
                   <span v-else-if="workProgramTitle !== null">{{ item.workProgramTitle }}</span>
              <span v-else>____</span>
            </td> -->
            <td>         
             <template v-if="editaccessrole == item.rolesListIdPk">
                <el-input v-model="createtempaccessrolelist.rolesListDescription"
                  
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
                 <span v-else-if="item.rolesListDescription !== null">{{ item.rolesListDescription }}</span>
              <span v-else>____</span>
            </td>
            
             <td width="200px">
            
                       <el-tooltip
                  class="item"
                  effect="dark"
                  content="ویرایش"
                  placement="top-start"
                >
              <el-button v-if= "!(editaccessrole == item.rolesListIdPk) && access('EditAccessRolesList')"
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="edite(item)">
              </el-button>
                       </el-tooltip>
                                 <el-tooltip
                  class="item"
                  effect="dark"
                  content="ویرایش"
                  placement="top-start"
                >
              <el-button v-if= "editaccessrole == item.rolesListIdPk && access('EditAccessRolesList')"
                         type="success"
                         size="small"
                         icon="el-icon-check"
                         @click="updateaccessrolelist(item, index + 2)">
              </el-button>
                                 </el-tooltip>
                                     <el-tooltip
                  class="item"
                  effect="dark"
                  content="حذف"
                  placement="top-start"
                >
              <el-button type="danger"
                         size="small"
                         @click="deletaccessrolelist(item)" v-if= "!(editaccessrole == item.rolesListIdPk) && access('DeleteAccessRolesList')" > <i class="el-icon-delete"></i></el-button>
                </el-tooltip>
                                           <el-tooltip
                  class="item"
                  effect="dark"
                  content="انصراف"
                  placement="top-start"
                >
              <el-button class="cancel-btn"
                         size="small"
                         icon="el-icon-close"
                         type="warning"
                         @click="cancelEdit(item)"
                         v-if="editaccessrole == item.rolesListIdPk">
              </el-button>
              </el-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- </el-scrollbar> -->
      </div>
   </div>
      </el-tab-pane>

       <el-tab-pane label=" نقش های مادر">
          <div class="row">
      <div class="col-8 col-md-2">
       <button type="button" class="btn btn-success m-1" @click="modalcreatemasterlist()"> <i class="el-icon-plus" />نقش مادر جدید</button>
      </div>
      <div class="col-12 table-responsive text-nowrap">
           <!-- <el-scrollbar
          height="800px"
          class="scroll-container nohaid"
          wrap-class="scrollbar-wrapper"
        > -->
        <table    class="el-table el-table--border table table-striped table-hover"
            border
            fit
            highlight-current-row
            :per-page="perPage"
            :current-page="currentPage"
            id="tableee"
            >
        <thead>
          <tr>
              <th class="th_width">ردیف</th>
            <th>
           نام نقش انگلیسی
            </th>
             <th>
           نام نقش فارسی
            </th>
           
             <th>
             عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="ss">
             <td>{{index}}</td>  
             <td>     
                  
             <template>
                <el-input v-model="createtempmasterrolelise.masterRolesListEname"
                id="textmasterRolesListEname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
               <td>         
             <template>
                <el-input v-model="createtempmasterrolelise.masterRolesListPname"
                id="textmasterRolesListPname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
           
        
            <td>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="ثبت"
                    placement="top-start"
                  >
                <el-button type="success"
                         size="small" @click="createmaster() " v-if= "access('AddMasterRoleList') ">ثبت</el-button>
                </el-tooltip>
                 <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >
                         <el-button  icon="el-icon-close"
                         type="warning"
                         size="small" @click="enserafgroupmasterrolelist()"></el-button>
                 </el-tooltip>
            </td>
          </tr>
          <tr  v-for="(item,index) in listmasterrole"
            :key="item.masterRolesListIdPk">
              <td>
                  {{ index + 1 }}
                </td>
            <td>  
             <template v-if="editmasterrol == item.masterRolesListIdPk">
                <el-input v-model="item.masterRolesListEname"
                id="textinputmasterRolesListEname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.masterRolesListEname !== null">{{ item.masterRolesListEname }}</span>
              <span v-else>____</span>
            </td>
                 <td>  
             <template v-if="editmasterrol == item.masterRolesListIdPk">
                <el-input v-model="item.masterRolesListPname"
                id="textinputmasterRolesListPname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.masterRolesListPname !== null">{{ item.masterRolesListPname }}</span>
              <span v-else>____</span>
            </td>
             
             <td>
             
                   <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "!(editmasterrol == item.masterRolesListIdPk) && access('EditMasterRoleList')"
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="editerole(item)">
              </el-button>
                   </el-tooltip>
                     <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "editmasterrol == item.masterRolesListIdPk && access('EditMasterRoleList')"
                         type="success"
                         size="small"
                         icon="el-icon-check"
                         @click="updatemaster(item , index + 2)">
              </el-button>
                     </el-tooltip>
                         <el-tooltip
                    class="item"
                    effect="dark"
                    content="حذف"
                    placement="top-start"
                  >
              <el-button type="danger"
                         size="small"
                         @click="deletrole(item)" v-if= "!(editmasterrol == item.masterRolesListIdPk) && access('DeleteMasterRoleList')" > <i class="el-icon-delete"></i></el-button>
                 </el-tooltip>
                         <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >
              <el-button class="cancel-btn"
                         size="small"
                         icon="el-icon-close"
                         type="warning"
                         @click="cancelEditrole(item)"
                         v-if="editmasterrol == item.masterRolesListIdPk">
              </el-button>
                         </el-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
           <!-- </el-scrollbar> -->
      </div>
   </div>
      </el-tab-pane>
       <el-tab-pane label="نقش های ویژه">
   <div class="row m-0  p-2">

       
        <div class="col-12 ">
<div class="col-8 col-md-2">
            <button type="button" @click="addspecialRoles()" class="btn btn-success m-1"><i class="el-icon-plus"/> نقش ویژه جدید</button>
</div>
     
            <table  class="el-table el-table--border table table-striped table-hover"
            border
            fit
            highlight-current-row
            :per-page="perPage"
            :current-page="currentPage"
            id="tablerole"
            >
             <thead>
          <tr>
   <th class="th_width">
  ردیف
  </th>
            <th>
           نقش ویژه
            </th>
             <th>
           نوع نقش ویژه
            </th>
            <th>
             عملیات
            </th>
          </tr>
        </thead>
          <tbody>
            <tr v-show="ss">
             <td>
             {{ index }} 
            </td>
              <td >         
             <template>
               <el-select
              placeholder="انتخاب کنید"
              clearable
              class="filter-item"
              v-model="spp.specialRolesIdFk"
             clearable
               filterable

            >
              <el-option
                 v-for="ite in dropmasterspecial"
            :key="ite.rolesListIdPk"
           :label="ite.rolesListPname"
           :value="ite.rolesListIdPk"
              />
            </el-select>
              </template>
            </td>
              
                    <td >         
             <template>
               <el-select
              placeholder="انتخاب کنید"
              clearable
              class="filter-item"
              v-model="spp.specialRolesTypeIdFk"
              clearable
               filterable
            >
              <el-option
                 v-for="ite in dropspecialrol"
            :key="ite.specialRolesTypeIdPk"
           :label="ite.specialRolesTypeTitle"
           :value="ite.specialRolesTypeIdPk"
              />
            </el-select>
              </template>
            </td>
         
               <td style="width: 131px;">
                <el-button type="success"
                         size="small" @click="createspecialRoles()"  v-if= "access('AddSpecialRole') ">ثبت</el-button>
                         <el-button  icon="el-icon-close"
                         type="warning"
                         size="small" @click="enserafspecialRoles()"></el-button>
                 </td>
          </tr>
            <tr  v-for="(sprol,index) in special"
            :key="sprol.specialRolesIdPk">
        <td>
             {{ index + 1 }} 
            </td>
            
              <td>
               
                 <template v-if="editsp == sprol.specialRolesIdPk">
                <el-select id="textinputspecialRolesIdFk" v-model="sprol.specialRolesName"  filterable clearable placeholder="انتخاب کنید">
          <el-option
            v-for="item in dropmasterspecial"
            :key="item.rolesListIdPk"
           :label="item.rolesListPname"
           :value="item.rolesListIdPk"
          ></el-option>
        </el-select>
              </template>
                   <span v-else-if="sprol.specialRolesName !== null">{{ sprol.specialRolesName }}</span>
              <span v-else>____</span>
               
              </td>

              <td>
               
                      <template v-if="editsp == sprol.specialRolesIdPk">
                <el-select
         id="textinputspecialRolesTypeIdFk" v-model="sprol.specialRolesTypeIdFk" filterable clearable placeholder="انتخاب کنید"
        >
          <el-option
            v-for="it in dropspecialrol"
            :key="it.specialRolesTypeIdPk"
            :label="it.specialRolesTypeTitle"
            :value="it.specialRolesTypeIdPk"
          ></el-option>
        </el-select>
              </template>
                  <span v-else-if="sprol.specialRolesTypeName !== null">{{ sprol.specialRolesTypeName }}</span>
              <span v-else>____</span>
              </td>
           <td style="width:150px">
            
                  <el-button type="danger"  size="small"  @click="handleDeletesp(sprol)" v-if= "!(editsp == sprol.specialRolesIdPk) && access('DeleteAccessSpecialRole')"  > <i class="el-icon-delete"></i></el-button>
              </td>

                  </tr> 
               </tbody>
            </table>



        </div>

       
      </div>
         </el-tab-pane>
          <el-tab-pane label="کنترل">
         <div class="row">
      <div class="col-8 col-md-2">
       <button type="button" class="btn btn-success m-1" @click="modalcreatecontroll()">   <i class="el-icon-plus" />کنترل جدید</button>
      </div>
      <div class="col-12 table-responsive text-nowrap">
          <!-- <el-scrollbar
          height="800px"
          class="scroll-container nohaid"
          wrap-class="scrollbar-wrapper"
        > -->
    <table  class="el-table el-table--border table table-striped table-hover"
            border
            fit
            highlight-current-row
            :per-page="perPage"
            :current-page="currentPage"
            id="tablecontrol"
            >
        <thead>
          <tr>
                <th style="width: 8%;">
              <span @click="s_j()"
                ><i
                  class="el-collapse-item__arrow el-icon-arrow-right"
                  id="search"
                ></i
              ></span>
              ردیف
            </th>
            <th>
            نام صفحه
            </th>
               <th>
            نام کنترل
            </th>
             <th>
            نام فارسی کنترل
            </th>
             
             <th>
             عملیات
            </th>
          </tr>
           <tr id="rr" v-show="searsch">
            <th></th>
          
            <th></th>
              <th>
              <el-input
                v-model="yes"
                size="mini"
                placeholder="برای جست و جو تایپ کنید"
                class="text-start"
              />
            </th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-show="aa">
              <td>{{index}}</td>
              <td>
                  <template>
            <el-select v-model="createtempcontroll.controllersPageIdFk" id="textcontrollersPageIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
       v-for="item in dropdatacontroll"
       :key="item.pagesIdPk"
       :label="item.pagesPname"
        :value="item.pagesIdPk">
        </el-option>
       </el-select>
                  </template>
                  </td>
             <td>         
             <template>
                <el-input v-model="createtempcontroll.controllersName"
                id="textcontrollersName"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
             <td>         
             <template>
                <el-input v-model="createtempcontroll.controllersTitle"
                id="textcontrollersTitle"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
            <td>
                 <el-tooltip
                    class="item"
                    effect="dark"
                    content="ثبت"
                    placement="top-start"
                  >
                <el-button type="success"
                         size="small" @click="createcontroll() " v-if= "access('AddController') ">ثبت</el-button>
                 </el-tooltip>
                    <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                   >
                         <el-button  icon="el-icon-close"
                         type="warning"
                         size="small" @click="enserafgroupcontroll()"></el-button>
                    </el-tooltip>
            </td>
          </tr>
          <tr 
             v-for="(item, index) in listcontroll.filter(
              (data) =>
                !yes ||
                data.controllersName.toLowerCase().includes(yes.toLowerCase())
            )"
            :key="item.controllersIdPk">
                <td>
                  {{ index + 1 }}
                </td>
           <td>  
             <template v-if="editcontrollers == item.controllersIdPk">
             <el-select v-model="item.controllersPageIdFk" id="textinputcontrollersPageIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropdatacontroll"
         :key="item.pagesIdPk"
         :label="item.pagesPname"
         :value="item.pagesIdPk">
        </el-option>
       </el-select>
              </template>
              <span v-else-if="item.controllersPageIdFk !== null">{{ item.controllersPagetitle }}</span>
              <span v-else>____</span>
            </td>
              <!-- <td>  
             <template v-if="editcontrollers == item.controllersIdPk">
            <el-select v-model="item.controllersPageIdFk" id="textinputcontrollersPageIdFk"  filterable clearable placeholder="انتخاب کنید">
         <el-option
       v-for="item in dropdatacontroll"
       :key="item.pagesIdPk"
       :label="item.pagesPname"
        :value="item.pagesIdPk">
        </el-option>
       </el-select>
              </template>
              <span v-else-if="item.controllersPagetitle !== null">{{ item.controllersPagetitle }}</span>
              <span v-else>____</span>
            </td> -->
            <td>  
             <template v-if="editcontrollers == item.controllersIdPk">
                <el-input v-model="item.controllersName"
                id="textinputcontrollersName"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.controllersName !== null">{{ item.controllersName }}</span>
              <span v-else>____</span>
            </td>
             <td>  
             <template v-if="editcontrollers == item.controllersIdPk">
                <el-input v-model="item.controllersTitle"
                id="textinputcontrollersTitle"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.controllersTitle !== null">{{ item.controllersTitle }}</span>
              <span v-else>____</span>
            </td>
             <td>
           
                    <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "!(editcontrollers == item.controllersIdPk) && access('EditController')"
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="editecontroll(item)">
              </el-button>
                    </el-tooltip>
                         <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "editcontrollers == item.controllersIdPk && access('EditController')"
                         type="success"
                         size="small"
                         icon="el-icon-check"
                         @click="updatecontroll(item, index + 3)">
              </el-button>
                         </el-tooltip>
                               <el-tooltip
                    class="item"
                    effect="dark"
                    content="حذف"
                    placement="top-start"
                  >
              <el-button type="danger"
                         size="small"
                         @click="confirmdeletcontroll(item)" v-if= "!(editcontrollers == item.controllersIdPk) && access('DeleteController')" > <i class="el-icon-delete"></i></el-button>
                 </el-tooltip>
                              <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >  
              <el-button class="cancel-btn"
                         size="small"
                         icon="el-icon-close"
                         type="warning"
                         @click="cancelEditpp(item)"
                         v-if="editcontrollers == item.controllersIdPk">
              </el-button>
                              </el-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
          <!-- </el-scrollbar> -->
      </div>
   </div>
      </el-tab-pane>
        <el-tab-pane label="صفحه">
           <div class="row">
      <div class="col-8 col-md-2">
       <button type="button" class="btn btn-success m-1" @click="modalcreatepeage()"><i class="el-icon-plus" />صفحه جدید</button>
      </div>
      <div class="col-12 table-responsive text-nowrap">
           <!-- <el-scrollbar
          height="800px"
          class="scroll-container nohaid"
          wrap-class="scrollbar-wrapper"
        > -->
    <table   class="el-table el-table--border table table-striped table-hover"
            border
            fit
            highlight-current-row
            :per-page="perPage"
            :current-page="currentPage"
            id="tablepeage"
            >
        <thead>
          <tr>
          <th class="th_width">
                <span @click="headerr()"
                  ><i
                    class="el-collapse-item__arrow el-icon-arrow-right"
                    id="textt"
                  ></i
                ></span>
                ردیف
              </th>
            <th>
          نام صفحه فارسی
            </th>
              <th>
           نام صفحه انگلیسی
            </th>
                <th>
           لیست منو
            </th>
                <th>
           ایکن صفحه
            </th>
                 <th>
           ادرس صفحه
            </th>
                  <!-- <th>
          pageHidden
            </th> -->
            <th>
            مسیر صفحه
            </th>
            <th>
                pageCache
            </th>
            <th>
                بازگشت به صفحه قبل
                </th>
             <th>
             عملیات
            </th>
          </tr>
                 <tr id="kk" v-show="searchparson">
              <th></th>
              <th>
                <el-input
                  v-model="yes"
                  size="mini"
                  placeholder="برای جست و جو تایپ کنید"
                  class="text-start"
                />
              </th>
              <th></th>
              <th></th>
              <th></th>
               <th></th>
              <th></th>
              <th></th>
               <th></th>
              <th></th>
          
            </tr>
        </thead>
        <tbody>
          <tr v-show="ff">
              <td>
             {{ index}}
                </td>
             <td>         
             <template>
                <el-input v-model="createtemppeag.pagesPname"
                   id="textpagesPname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
             <td>         
             <template>
                <el-input v-model="createtemppeag.pagesEname"
                id="textpagesEname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
                <td>         
             <template>
                       <el-select v-model="createtemppeag.pagesSectionMenuIdFk" id="textpagesSectionMenuIdFkff" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropdata"
         :key="item.sectionMenuIdPk"
         :label="item.sectionMenuTitle"
         :value="item.sectionMenuIdPk">
        </el-option>
       </el-select>
              </template>
            </td>
              <td>         
             <template>
                <el-input v-model="createtemppeag.pageIcon"
                id="textpageIcon"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
                <td>         
             <template>
                <el-input v-model="createtemppeag.pagePath"
                id="textpagePath"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
             <!-- <td>         
             <template>
                <el-input v-model="createtemppeag.pageHidden"
                id="textpageHidden"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td> -->
             <td>         
             <template>
                <el-input v-model="createtemppeag.pageComponent"
                id="textpageComponent"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
              <td>         
             <template>
                <!-- <el-input v-model="createtemppeag.pageCache"
                id="textpageCache"
                          class="edit-input"
                          size="small"
                          autofocus /> -->
           <el-checkbox v-model="createtemppeag.pageCache"></el-checkbox>
              </template>
            </td>
               <td>         
             <template>
                <el-input v-model="createtemppeag.pageRedirect"
                   id="textpageRedirect"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
            <td>
               <el-tooltip
                    class="item"
                    effect="dark"
                    content="ثبت"
                    placement="top-start"
                  >
                <el-button type="success"
                         size="small" @click="createpeag()" v-if= "access('AddPage') ">ثبت</el-button>
               </el-tooltip>
               <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >
                         <el-button  icon="el-icon-close"
                         type="warning"
                         size="small" @click="enserafgrouppeag()"></el-button>
               </el-tooltip>
            </td>
          </tr>
          <tr 
            v-for="(item, index) in listpeag.filter(
                (data) =>
                  !yes ||
                  data.pagesPname
                    .toLowerCase()
                    .includes(yes.toLowerCase())
              )"
            
            :key="item.pagesIdPk">
             <td>
                  {{ index + 1 }}
                </td>
             <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pagesPname"
                id="textinputpagesPname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.pagesPname !== null">{{ item.pagesPname }}</span>
              <span v-else>____</span>
            </td>
            <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pagesEname"
                id="textinputpagesEname"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.pagesEname !== null">{{ item.pagesEname }}</span>
              <span v-else>____</span>
            </td>
             
              <td>  
             <template v-if="editpeag == item.pagesIdPk">
             <el-select v-model="item.pagesSectionMenuIdFk" id="textinputpagesSectionMenuIdFkf" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropdata"
         :key="item.sectionMenuIdPk"
         :label="item.sectionMenuTitle"
         :value="item.sectionMenuIdPk">
        </el-option>
       </el-select>
              </template>
              <span v-else-if="item.pagesSectionMenuTitle !== null">{{ item.pagesSectionMenuTitle }}</span>
              <span v-else>____</span>
            </td>
              <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pageIcon"
                id="textinputpageIcon"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.pageIcon !== null">{{ item.pageIcon }}</span>
              <span v-else>____</span>
            </td>
              <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pagePath"
                id="textinputpagePath"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.pagePath !== null">{{ item.pagePath }}</span>
              <span v-else>____</span>
            </td>
              <!-- <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pageHidden"
                id="textinputpageHidden"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="pageHidden !== null">{{ item.pageHidden }}</span>
              <span v-else>____</span>
            </td> -->
              <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pageComponent"
                id="textinputpageComponent"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.pageComponent !== null">{{ item.pageComponent }}</span>
              <span v-else>____</span>
            </td>
                  <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <!-- <el-input v-model="item.pageCache"
                   id="textinputpageCache"
                          class="edit-input"
                          size="small"
                          autofocus /> -->
               <el-checkbox v-model="item.pageCache"></el-checkbox>
              </template>
              <br/>
                 <span
                v-if="
                  item.pageCache == false ||
                  item.pageCache == undefined
                "
                class="link-type"
                >غیرفعال</span
              >
              <span
                v-else-if="item.pageCache == true"
                class="link-type"
                >فعال</span
              >
              <span v-else-if="pageCache !== null">{{ item.pageCache }}</span>
              <span v-else>____</span>
            </td>
                <td>  
             <template v-if="editpeag == item.pagesIdPk">
                <el-input v-model="item.pageRedirect"
                id="textinputpageRedirect"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              
              <span v-else-if="item.pageRedirect !== null">{{ item.pageRedirect }}</span>
              <span v-else>____</span>
            </td>
             <td>
               
                   <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "!(editpeag == item.pagesIdPk) && access('EditPage')"
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="editpeage(item)">
              </el-button>
                   </el-tooltip>
             <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "editpeag == item.pagesIdPk  && access('EditPage')"
                         type="success"
                         size="small"
                         icon="el-icon-check"
                         @click="updatepeag(item,index + 2)">
              </el-button>
             </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="حذف"
                    placement="top-start"
                  >
              <el-button type="danger"
                         size="small"
                         @click="confirmdeletpeag(item)" v-if= "!(editpeag == item.pagesIdPk) && access('DeletePage')" > <i class="el-icon-delete"></i></el-button>
                  </el-tooltip>
              <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >
              <el-button class="cancel-btn"
                         size="small"
                         icon="el-icon-close"
                         type="warning"
                         @click="canceleditpeag(item)"
                         v-if="editpeag == item.pagesIdPk">
              </el-button>
              </el-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
           <!-- </el-scrollbar> -->
      </div>
   </div>
      </el-tab-pane>
      <el-tab-pane label="منو">
       <div class="row">
      <div class="col-8 col-md-2">
       <button type="button" class="btn btn-success m-1" @click="modalcreatemenu()"><i class="el-icon-plus"/>منو جدید</button>
      </div>
      <div class="col-12 table-responsive text-nowrap">
           <!-- <el-scrollbar
              height="800px"
              class="scroll-container nohaid"
              wrap-class="scrollbar-wrapper"
            > -->
    <table    class="el-table el-table--border table table-striped table-hover"
            border
            fit
            highlight-current-row
            :per-page="perPage"
            :current-page="currentPage"
            id="tablemenu"
            >
        <thead>
          <tr>
                 <th class="th_width">
                <span @click="headertwo()"
                  ><i
                    class="el-collapse-item__arrow el-icon-arrow-right"
                    id="textttwo"
                  ></i
                ></span>
                ردیف
              </th>
            <th>
            نام منو
            </th>
                <th>
            ایکن منو
            </th>
                     <th>
            لیست منو
            </th>
                  <th>
            ادرس منو
            </th>
                   <th>
            کامپونت منو
            </th>
             <th>
             عملیات
            </th>
          </tr>
                <tr id="ff" v-show="searchheader">
              <th></th>
              <th>
                <el-input
                  v-model="yes"
                  size="mini"
                  placeholder="برای جست و جو تایپ کنید"
                  class="text-start"
                />
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-show="mm">
             <td>{{index}}</td>
             <td>         
             <template>
                <el-input v-model="createtempmenu.sectionMenuTitle"
                id="textsectionMenuTitle"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
             <td>         
             <template>
                <el-input v-model="createtempmenu.sectionMenuIcon"
                id="textsectionMenuIcon"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
            <td>
                  <el-select v-model="createtempmenu.sectionMenuParentIdFk" id="textsectionMenuParentIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropdata"
         :key="item.sectionMenuIdPk"
         :label="item.sectionMenuTitle"
         :value="item.sectionMenuIdPk">
        </el-option>
       </el-select>
       </td>
               <td>         
             <template>
                <el-input v-model="createtempmenu.sectionMenuPath"
                id="textsectionMenuPath"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
             <td>         
             <template>
                <el-input v-model="createtempmenu.sectionMenuComponent"
                   id="textsectionMenuComponent"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
            </td>
            <td>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="ثبت"
                    placement="top-start"
                  >
                <el-button type="success"
                         size="small" @click="createmenu()" v-if= "access('AddSectionMenu') ">ثبت</el-button>
                </el-tooltip>
                 <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >
                         <el-button  icon="el-icon-close"
                         type="warning"
                         size="small" @click="enserafgroup()"></el-button>
                 </el-tooltip>
            </td>
          </tr>
          <tr  
             v-for="(item, index) in list.filter(
                (data) =>
                  !yes ||
                  data.sectionMenuTitle
                    .toLowerCase()
                    .includes(yes.toLowerCase())
              )"

            :key="item.sectionMenuIdPk">
             <td>
                  {{ index + 1 }}
                </td>
            <td>  
             <template v-if="edit == item.sectionMenuIdPk">
                <el-input v-model="item.sectionMenuTitle"
                id="textinputsectionMenuTitle"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.sectionMenuTitle !== null">{{ item.sectionMenuTitle }}</span>
              <span v-else>____</span>
            </td>

               <td>  
               <template v-if="edit == item.sectionMenuIdPk">
                <el-input v-model="item.sectionMenuIcon"
                id="textinputsectionMenuIcon"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.sectionMenuIcon !== null">{{ item.sectionMenuIcon }}</span>
              <span v-else>____</span>
            </td>
                <td>
              <template v-if="edit == item.sectionMenuIdPk">
            <el-select v-model="item.sectionMenuParentIdFk" id="textinputsectionMenuParentIdFk" filterable clearable placeholder="انتخاب کنید">
         <el-option
          v-for="item in dropdata"
         :key="item.sectionMenuIdPk"
         :label="item.sectionMenuTitle"
         :value="item.sectionMenuIdPk">
        </el-option>
       </el-select>
              </template>
               <span v-else-if="item.sectionMenuTitle !== null">{{ item.sectionMenuTitle }}</span>
              <span v-else>____</span>
            </td>
          <td>  
             <template v-if="edit == item.sectionMenuIdPk">
                <el-input v-model="item.sectionMenuPath"
                id="textinputsectionMenuPath"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.sectionMenuPath !== null">{{ item.sectionMenuPath }}</span>
              <span v-else>____</span>
            </td>

        
              <td>  
             <template v-if="edit == item.sectionMenuIdPk">
                <el-input v-model="item.sectionMenuComponent"
                id="textinputsectionMenuComponent"
                          class="edit-input"
                          size="small"
                          autofocus />
              </template>
              <span v-else-if="item.sectionMenuComponent !== null">{{ item.sectionMenuComponent }}</span>
              <span v-else>____</span>
            </td>
             <td>
              
                      <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "!(edit == item.sectionMenuIdPk) && access('EditSectionMenu')"
                         type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="editee(item)">
              </el-button>
                      </el-tooltip>
                            <el-tooltip
                    class="item"
                    effect="dark"
                    content="ویرایش"
                    placement="top-start"
                  >
              <el-button v-if= "edit == item.sectionMenuIdPk && access('EditSectionMenu')"
                          type="success"
                         size="small"
                         icon="el-icon-check"
                         @click="updatemenu(item,index + 2)">
              </el-button>
                            </el-tooltip>
                                <el-tooltip
                    class="item"
                    effect="dark"
                    content="حذف"
                    placement="top-start"
                  >
              <el-button type="danger"
                         size="small"
                         @click="confirmdeletmenu(item)" v-if= "!(edit == item.sectionMenuIdPk) && access('DeleteSectionMenu')" > <i class="el-icon-delete"></i></el-button>
                  </el-tooltip>
                      <el-tooltip
                    class="item"
                    effect="dark"
                    content="انصراف"
                    placement="top-start"
                  >
              <el-button class="cancel-btn"
                         size="small"
                         icon="el-icon-close"
                         type="warning"
                         @click="cancelEditt(item)"
                         v-if="edit == item.sectionMenuIdPk">
              </el-button>
              </el-tooltip>
            </td>
          </tr>
        </tbody>
      </table>
           <!-- </el-scrollbar> -->
      </div>
   </div>
      </el-tab-pane>
    
      
         
     
         
    </el-tabs>
  
 <el-dialog  v-el-drag-dialog :title="dialogStatushelp"  :visible.sync="dialogFormVisiblehelp" >
        <div class="row">
        
  <div>
    <el-divider content-position="right">ثبت </el-divider>
    <span> ابتدا روی دکمه ثبت   جدید کلیک کرده آیتم های مورد نظر نمایان میشود اطلاعات مورد نظر را وارد کنید و سپس روی دکمه ثبت کلیک کنید در صورت انصراف روی دکمه زرد رنگ کلیک کنید.</span>
    
  
    <el-divider content-position="right">ویرایش </el-divider>
    <span>در صورت ویرایش روی دکمه آبی رنگ در جدول کلیک کرده اطلاعات مورد نظر نمایش داده میشوند پس از تغییرات مورد نظرروی دکمه سبز رنک کلیک کنید و در صورت انصراف روی دکمه زرد رنگ کلیک کنید.</span>
       <el-divider content-position="right">حذف </el-divider>
      <span> در صورت حذف روی دکمه قرمز رنگ در جدول کلیک کنید</span>
    
  </div>

          </div>
      </el-dialog>
  </div>
</template>
<script>
// var toggler = document.getElementsByClassName("caret");
// var i;

// for (i = 0; i < toggler.length; i++) {
//   toggler[i].addEventListener("click", function() {
//     this.parentElement.querySelector(".nested").classList.toggle("active");
//     this.classList.toggle("caret-down");
//   });
// }
//   const carets = document.getElementsByClassName("caret");
//   for (i = 0; i < carets.length; i++) {
//   carets[i].addEventListener("click", function() {
//     li = this.parentElement();
//     li.querySelector('.nested').classList.add('active')
//     this.classList.toggle("caret-down");
//   });
// }
// const todos=document.querySelectorAll(".todo");
// const togglers=document.querySelectorAll(".toggler");
// todos.forEach((todo)=>{
//   todo.addEventListener("Click",()=>{
//     todo.classList.toggle("active");
//   });
// });
// togglers.forEach((toggle)=>{
//   toggler.addEventListener("Click",()=>{
//     toggler.classList.toggle("active");
//    toggler.nextElementSibling.classList.toggle("active");
//   });
// });

import {
  validtextpersiancheck,
  validdrop,
  validtextcheck,
  validnumcheck,
  validdatecheck,
  validtextallcheck,
  validenglishallcheck,
  validtimecheck,
  validmobailecheck,
  validen_nocharactercheck,
  validenPasswordcheck,
  alert,
} from "../validation/validation";
import { addmenu,deletmenu,editmenu,gridmenu,dropmenu,datatree,addaccess} from "@/api/menu";
import { addpeage, deletpeag, editpeag, gridpeage } from "@/api/peage";
import { addcontroll, deletcontroll, editcontroll, gridcontroll,dropcontroll } from "@/api/controllers";
import { addnasterrolelist, deletmasterrolelist, editmasterrolelist, gridmasterrole } from "@/api/rolemasterlist";
import { dropmang, droporg, dropprogram,dropassis,dropmaster, gridaccessrolelist,deleterolelist, editaccessrolelist,droprole,dropm,dropGetAllRoles,addrolelist,apidroprolspecial,apiaddspecialRoles,GetAllAccessSpecial,apideletespecialRoles} from "@/api/accessrolelist";
import {
  fetchNational,
} from "@/api/person";
import {
  AjaxUsersSearch,
} from "@/api/article";
  import { gitcontrol } from "@/api/programwork";
import elDragDialog from "@/directive/el-drag-dialog";
export default {
  name:"access",
  name: "DragDialogDemo",
  directives: { elDragDialog },
  data() {
    
    return {
     
      pee:"",
      pe:"",
       PageId: 2,
       control:[],
      loading:false,
      index:0,
      currentPage:0,
      perPage:0,
    dropmangmang:"",
    dropdatacontroll:"",
      drop:"",
      spp:{
        specialRolesIdFk:"",
        specialRolesTypeIdFk:"",
      },
     editsp:"",
      //منو
      tree:null,
     listaccess: [],

      checkStrictly: false,
     
      dropmasterlistpp: [],
     
      itemaccess: {
        masterRoleListIdFk: "",
        selectedPagesId: [],
        selectedControllersId: [],
        
      },

//  sprol:{
// specialRolesIdFk:"",
// specialRolesTypeIdFk:"";
//       },
  itemrole: {
        masterRoleListIdFk: "",
        selectedPagesId: [],
       selectedControllersId: [],
        
      },
      child: false,
      msg: [],
      special:[],
      name:"",
      last:"",
      code:"",
      edit: "",
      temp:{
        sectionMenuTitle:"",
        
        sectionMenuParentIdFk:"",
        sectionMenuIcon:"",
        sectionMenuPath:"",
        sectionMenuComponent:"",
      },
       createtempmenu:{
        sectionMenuTitle:"",
        sectionMenuParentIdFk:"",
        sectionMenuIcon:"",
        sectionMenuPath:"",
        sectionMenuComponent:"",
      },
      mm:false,
     list:[],

     //صفحه
     dropdata:[],
      editpeag: "",
      temppeag:{
        pagesEname:"",
        pagesPname:"",
        pagesSectionMenuIdFk:"",
        pageIcon:"",
        pagePath:"",
        //pageHidden:"",
        pageComponent:"",
        pageCache:"",
        pageRedirect:"",
      },
       createtemppeag:{
        sectionMenuTitle:"",
        pagesEname:"",
        pagesPname:"",
        pagesSectionMenuIdFk:"",
        pageIcon:"",
        pagePath:"",
        pageHidden:"",
        pageComponent:"",
        pageCache:"",
        pageRedirect:"",
      },
      ff:false,
     listpeag:[],
     //کنترلها
      editcontrollers: "",
        dialogFormVisiblehelp:false,
        dialogStatushelp:"",
      tempcontroll:{
      controllersPagetitle:"",
      controllersPageIdFk:"",
       controllersName:"",
       controllersTitle:"",
    
      },
       createtempcontroll:{
    controllersPageIdFk:"",
      controllersPagetitle:"",
       controllersName:"",
       controllersTitle:"",
      },
      aa:false,
     listcontroll:[],
     //لیست نقش ها
      editmasterrol: "",
      tempmasterrole:{
        masterRolesListEname:"",
        masterRolesListPname:"",
        masterRolesListReqStatus:true,
        masterRolesListProgramsIdFk:1
      },
       createtempmasterrolelise:{
        masterRolesListEname:"",
        masterRolesListPname:"",
        masterRolesListReqStatus:true,
        masterRolesListProgramsIdFk:1
      },
      ss:false,
     listmasterrole:[],
     //دسترسی نقش
     editaccessrole: "",
      tempaccess:{
        rolesListPname:"",
        rolesListEname:"",
            rolesListOrgansIdFk:"",
                rolesListManagmentIdFk:"",
                    rolesListUsernameFk:"",
                       rolesListDescription:"",
                           rolesListSubProgramsIdFk:"",
                               rolesListAssistanceIdFk:"",
                                rolesListMasterRolesListIdFk:"",
                                // personsNationalIdPk:"",
                                // masterRolesListPname:"",
                                // assistanceName:"",
                                // workProgramTitle:"",
                                // managmentName:"",
                                // organsName:"",
      },
       createtempaccessrolelist:{
          rolesListPname:"",
        rolesListEname:"",
            rolesListOrgansIdFk:"",
                rolesListManagmentIdFk:"",
                    rolesListUsernameFk:"",
                       rolesListDescription:"",
                           rolesListSubProgramsIdFk:"",
                               rolesListAssistanceIdFk:"",
                                rolesListMasterRolesListIdFk:"",
                                //  personsNationalIdPk:"",
                                //   masterRolesListPname:"",
                                //      assistanceName:"",
                                //      workProgramTitle:"",
                                //      managmentName:"",
                                //      organsName:"",
      },
      div_filter:false,
        yesff: "",
     droprolelist:[],
     pp:false,
     listaccessrolelist:[],
     dropmasterlistaccess:[],
     dropprog:[],
     droporgans:[],
     options:[],
     dropassis:[],
     dropmasterlist:[],
     dropdata:[], 
     dropspecialrol:[],
     dropmasterspecial:[],
     sp:{
     specialRolesName: "",
     specialRolesTypeIdFk: "",
     },
         data:[{
        id:"",
        label:"",
        children:[{
            id:"",
            label:"",
        }]
    }],
    }
  },
  created() {
     this.createget();
     //this.getList();
  // this.threeview();
    this.getListmenu();
    this.droplistmune();
    this.droplistm();
      this.getlistpeag();
      //کنترل
      
       this.getListcontroll();
       this.droplist();
     //نقش های خاص
    this.getSpecialrole();
   this.droplistspecial();
     
    //نقش
     this.getListmasterrole();
     //دسترسی نقش
    this.getlistaccessrole();
    this.droplistorg();
    //this.droplistmang();
   // this.droplistprogram();
    this.droplistassis();
    this.droplistmasterrole();
    this.droplis();
    this.droplispp();
    this.droplisspecial();
    this.gettree(); 


  },
  methods: {
      
    filteraccess(){

      //  if(this.yesff != ''){
      this.listaccess = this.listaccess.filter((data) => data.label.toLowerCase().includes(this.yesff.toLowerCase()));
    //    this.bindrolelist();
    //   }
    //  else{
    //   this.gettree(); 
   
    //  }
   
      
    },
//     treee(h){
//  if(h==this.tree){
//    this.tree=null;
//  }
//  else{
//    this.tree=h;
//  }
//     },
  modalhelp(){
      this.dialogFormVisiblehelp=true
    this.dialogStatushelp="راهنمای دسترسی";
    },
     createget() {
        gitcontrol(this.PageId).then((response) => {
           this.control= response.data; 
    }); 
   
    },

    access(dd){
        if(this.control.length!=0)
    return this.control.names.includes(dd);
    },

//     carets:function(){
// for (var i = 0; i < carets.length; i++) {
//   carets[i].addEventListener("click", function() {
//     li = this.parentElement();
//     li.querySelector('.nested').classList.add('active')
//     this.classList.toggle("caret-down");
//   });
// }
//     },
    // threeview(){

    // },
    //منو
       droplistmune() {
       dropmenu().then((response) => {
        this.dropdata = response.data;
      });
    },
      droplistm() {
      dropmenu().then((response) => {
        this.dropdatamenu = response.data;
      });
    },
    modalcreatemenu(){
            this.createtempmenu.sectionMenuTitle = "";
              this.createtempmenu.sectionMenuParentIdFk = "";
                this.createtempmenu.sectionMenuIcon = "";
                  this.createtempmenu.sectionMenuPath = "";
                    this.createtempmenu.sectionMenuComponent = "";
      this.mm = true;
    },

     async getListmenu() {
        this.listLoading = true;
      const { data } = await gridmenu();
        const items = data.items;

        this.list = data.map((v) => {
          // v.sectionMenuTitle = v.sectionMenuTitle;
          v.fsectionMenuParentIdFk = v.sectionMenuParentIdFk;
          v.fsectionMenuIcon = v.sectionMenuIcon;
          v.fsectionMenuPath = v.sectionMenuPath;
          v.fsectionMenuComponent = v.sectionMenuComponent;
          return v;
        });
        this.listLoading = false;
      },
       createmenu() {
          this.msg = [];
       var validcheck = validtextallcheck(
        this.createtempmenu.sectionMenuTitle,
        "نام منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textsectionMenuTitle")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textsectionMenuTitle")
          .classList.remove("stwarning");

        var validcheck = validen_nocharactercheck(
        this.createtempmenu.sectionMenuIcon,
        "ایکن منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textsectionMenuIcon")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textsectionMenuIcon")
          .classList.remove("stwarning");

          
        var validcheck = validdrop(
        this.createtempmenu.sectionMenuParentIdFk,
        "لیست منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textsectionMenuParentIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textsectionMenuParentIdFk")
          .classList.remove("stwarning");
   
        var validcheck = validenglishallcheck(
        this.createtempmenu.sectionMenuPath,
        "ادرس منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textsectionMenuPath")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textsectionMenuPath")
          .classList.remove("stwarning");

       var validcheck = validen_nocharactercheck(
        this.createtempmenu.sectionMenuComponent,
        "کامپونت منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textsectionMenuComponent")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textsectionMenuComponent")
          .classList.remove("stwarning");
      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
          addmenu(this.createtempmenu).then((response) => {
         this.getListmenu();
         this.mm = false;
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
               type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
              if(response.statusCode=='Success'){
              setTimeout(() => {
                     var td = document.getElementById("tablemenu").rows[2];
            td.classList.add("colortr");
              }, 400);
             setTimeout(() => {
               var td = document.getElementById("tablemenu").rows[2];
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
            }
         });
      }
      },
       cancelEditt(item) {
      // item.sectionMenuTitle = item.sectionMenuTitle;
         item.sectionMenuParentIdFk = item.fsectionMenuParentIdFk;
          item.sectionMenuIcon = item.fsectionMenuIcon;
           item.sectionMenuPath = item.fsectionMenuPath;
           item.sectionMenuComponent = item.fsectionMenuComponent;
       this.edit = null;
      },
        updatemenu(item,index) {
        
        // item.sectionMenuTitle = item.sectionMenuTitle;
         item.sectionMenuParentIdFk = item.sectionMenuParentIdFk;
          item.sectionMenuIcon = item.sectionMenuIcon;
         item.sectionMenuPath = item.sectionMenuPath;
        item.sectionMenuComponent = item.sectionMenuComponent;
        this.temp = item;
      
        this.msg = [];
       var validcheck = validtextallcheck(
        this.temp.sectionMenuTitle,
        "نام منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputsectionMenuTitle")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputsectionMenuTitle")
          .classList.remove("stwarning");

        var validcheck = validen_nocharactercheck(
        this.temp.sectionMenuIcon,
        "ایکن منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputsectionMenuIcon")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputsectionMenuIcon")
          .classList.remove("stwarning");

          
        var validcheck = validdrop(
        this.temp.sectionMenuParentIdFk,
        "لیست منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputsectionMenuParentIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputsectionMenuParentIdFk")
          .classList.remove("stwarning");
   
        var validcheck = validenglishallcheck(
        this.temp.sectionMenuPath,
        "ادرس منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputsectionMenuPath")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputsectionMenuPath")
          .classList.remove("stwarning");

       var validcheck = validen_nocharactercheck(
        this.temp.sectionMenuComponent,
        "کامپونت منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputsectionMenuComponent")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputsectionMenuComponent")
          .classList.remove("stwarning");
      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        this.edit = null;
        editmenu(this.temp).then((response) => {
          this.getListmenu();
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
              if(response.statusCode=='Success'){
           var td = document.getElementById("tablemenu").rows[index];
            td.classList.add("colortr");
             setTimeout(() => {
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
          }
        });
      }
      },
      //   confirmdeletmenu(item) {
      //   deletmenu(item.sectionMenuIdPk).then(() => {
      //     this.getListmenu();
      //     this.$notify({
      //       title: "انجام شد",
      //       message: "گروه مورد نظر با موفقیت حذف گردید",
      //       type: "success",
      //     position: 'top-left',
            duration: 4000,
      //     });
      //   });
      // },
      confirmdeletmenu(item) {
         swal({
        title: "آیا از حذف منو مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
         buttons: ["خیر","بله"],
      })
      
        .then(async(value) => {
          if(value == true){
      await deletmenu(item.sectionMenuIdPk).then((response) => {
          this.getListmenu();
          this.$notify({
             title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
        });
          }
        })
      },
      editee(item){
        this.edit = item.sectionMenuIdPk;
      },
      enserafgroup(){
         this.mm = false;
      },

      //صفحه
        modalcreatepeage(){
            this.createtemppeag.pagesEname = "";
              this.createtemppeag.pagesPname = "";
                this.createtemppeag.pagesSectionMenuIdFk = "";
                  this.createtemppeag.pageIcon = "";
                    this.createtemppeag.pagePath = "";
                      this.createtemppeag.pageHidden = "";
                        this.createtemppeag.pageComponent = "";
                         this.createtemppeag.pageCache = "";
                         this.createtemppeag.pageRedirect = "";
      this.ff = true;
    },

     async getlistpeag() {
        this.listpeagLoading = true;
      const { data } = await gridpeage();
        const items = data.items;

        this.listpeag = data.map((v) => {
         v.fsectionMenuTitle = v.sectionMenuTitle;
        v.fpagesEname = v.pagesEname;
        v.fpagesPname = v.pagesPname;
        v.fpagesSectionMenuIdFk = v.pagesSectionMenuIdFk;
        v.fpageIcon = v.pageIcon;
        v.fpagePath = v.pagePath;
        v.fpageHidden = v.pageHidden;
        v.fpageComponent = v.pageComponent;
        v.fpageCache = v.pageCache;
        v.fpageRedirect = v.pageRedirect;
          return v;
        });
        this.listpeagLoading = false;
      },
       createpeag() {
         this.msg = [];
       var validcheck = validtextallcheck(
        this.createtemppeag.pagesPname,
        "نام صفحه فارسی ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpagesPname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpagesPname")
          .classList.remove("stwarning");

        var validcheck = validenglishallcheck(
        this.createtemppeag.pagesEname,
        " نام صفحه انگلیسی ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpagesEname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpagesEname")
          .classList.remove("stwarning");

          
        var validcheck = validdrop(
        this.createtemppeag.pagesSectionMenuIdFk,
        "لیست منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpagesSectionMenuIdFkff")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpagesSectionMenuIdFkff")
          .classList.remove("stwarning");
   
        var validcheck = validenPasswordcheck(
        this.createtemppeag.pageIcon,
        "ایکن صفحه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpageIcon")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpageIcon")
          .classList.remove("stwarning");

       var validcheck = validenPasswordcheck(
        this.createtemppeag.pagePath,
        "ادرس صفحه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpagePath")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpagePath")
          .classList.remove("stwarning");

      //     var validcheck = validenglishallcheck(
      //   this.createtemppeag.pageHidden,
      //   "pageHidden ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textpageHidden")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textpageHidden")
      //     .classList.remove("stwarning");

        var validcheck = validenPasswordcheck(
        this.createtemppeag.pageComponent,
        "مسیر صفحه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpageComponent")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpageComponent")
          .classList.remove("stwarning");

      //       var validcheck = validenglishallcheck(
      //   this.createtemppeag.pageCache,
      //   "pageCache  ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textpageCache")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textpageCache")
      //     .classList.remove("stwarning");

        var validcheck = validenPasswordcheck(
        this.createtemppeag.pageRedirect,
        "بازگشت به صفحه قبل ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textpageRedirect")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textpageRedirect")
          .classList.remove("stwarning");

      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
         addpeage(this.createtemppeag).then((response) => {
         this.getlistpeag();
         this.ff = false;
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
               type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
             if(response.statusCode=='Success'){
              setTimeout(() => {
                     var td = document.getElementById("tablepeage").rows[2];
            td.classList.add("colortr");
              }, 400);
             setTimeout(() => {
               var td = document.getElementById("tablepeage").rows[2];
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
            }
         });
      }
      },
       canceleditpeag(item) {
         
        item.sectionMenuTitle = item.fsectionMenuTitle;
        item.pagesEname = item.fpagesEname;
        item.pagesPname = item.fpagesPname;
        item.pagesSectionMenuIdFk = item.fpagesSectionMenuIdFk;
        item.pageIcon = item.fpageIcon;
        item.pagePath = item.fpagePath;
        item.pageHidden = item.fpageHidden;
        item.pageComponent = item.fpageComponent;
        item.pageCache = item.fpageCache;
        item.pageRedirect = item.fpageRedirect;
       this.editpeag = null;
      },
        updatepeag(item , index) {
       
      
         this.temppeag = item;
      
        this.msg = [];
       var validcheck = validtextallcheck(
        this.temppeag.pagesPname,
        "نام صفحه فارسی ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpagesPname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpagesPname")
          .classList.remove("stwarning");

        var validcheck = validenPasswordcheck(
        this.temppeag.pagesEname,
        " نام صفحه انگلیسی ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpagesEname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpagesEname")
          .classList.remove("stwarning");

          
        var validcheck = validdrop(
        this.temppeag.pagesSectionMenuIdFk,
        "لیست منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpagesSectionMenuIdFkf")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpagesSectionMenuIdFkf")
          .classList.remove("stwarning");
   
        var validcheck = validenPasswordcheck(
        this.temppeag.pageIcon,
        "ایکن صفحه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpageIcon")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpageIcon")
          .classList.remove("stwarning");

       var validcheck = validenPasswordcheck(
        this.temppeag.pagePath,
        "ادرس صفحه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpagePath")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpagePath")
          .classList.remove("stwarning");

      //     var validcheck = validenglishallcheck(
      //   this.temppeag.pageHidden,
      //   "pageHidden ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textinputpageHidden")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textinputpageHidden")
      //     .classList.remove("stwarning");

        var validcheck = validenPasswordcheck(
        this.temppeag.pageComponent,
        "مسیر صفحه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpageComponent")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpageComponent")
          .classList.remove("stwarning");

      //       var validcheck = validenglishallcheck(
      //   this.temppeag.pageCache,
      //   "pageCache  ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textinputpageCache")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textinputpageCache")
      //     .classList.remove("stwarning");

        var validcheck = validenPasswordcheck(
        this.temppeag.pageRedirect,
        "بازگشت به صفحه قبل ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputpageRedirect")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputpageRedirect")
          .classList.remove("stwarning");

      if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
         this.editpeag = null;
        editpeag(this.temppeag).then((response) => {
          this.getlistpeag();
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
           if(response.statusCode=='Success'){
      var td = document.getElementById("tablepeage").rows[index];
            td.classList.add("colortr");
             setTimeout(() => {
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
          }
        });
        }
      },
          confirmdeletpeag(item) {
         swal({
        title: "آیا از حذف صفحه مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
         buttons: ["خیر","بله"],
      })
      
        .then(async(value) => {
          if(value == true){
      await deletpeag(item.pagesIdPk).then((response) => {
          this.getlistpeag();
          this.$notify({
             title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
        });
          }
        })
      },
      //   confirmdeletpeag(item) {
      //   deletpeag(item.pagesIdPk).then(() => {
      //     this.getlistpeag();
      //     this.$notify({
      //       title: "انجام شد",
      //       message: "گروه مورد نظر با موفقیت حذف گردید",
      //       type: "success",
      //     position: 'top-left',
            duration: 4000,
      //     });
      //   });
      // },
      editpeage(item){
        this.editpeag = item.pagesIdPk;
          item.sectionMenuTitle = item.sectionMenuTitle;
      },
      enserafgrouppeag(){
         this.ff = false;
      },
     



droplist() {
        dropcontroll().then((response) => {
        this.dropdatacontroll = response.data;
      
      });
    },

    modalcreatecontroll(){
      
          this.createtempcontroll.controllersPagetitle = "";
          //this.createtempcontroll.controllersPageIdName = "";
            this.createtempcontroll.controllersPageIdFk = "";
            this.createtempcontroll.controllersName = "";
            this.createtempcontroll.controllersTitle = "";
      this.aa = true;
    },

     async getListcontroll() {
        this.listLoading = true;
      const { data } = await gridcontroll();
        const items = data.items;

        this.listcontroll = data.map((v) => {
        v.fcontrollersName = v.controllersName;
        v.fcontrollersTitle=v.controllersTitle;
        v.fcontrollersPagetitle=v.controllersPagetitle;
        v.fcontrollersPageIdFk=v.controllersPageIdFk;
          
          return v;
        });
        this.listLoading = false;
      },

       createcontroll() {
         this.msg = [];
         var validcheck = validdrop(
        this.createtempcontroll.controllersPageIdFk,
        "لیست منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textcontrollersPageIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textcontrollersPageIdFk")
          .classList.remove("stwarning");

        var validcheck = validenglishallcheck(
        this.createtempcontroll.controllersName,
        " نام  دکمه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textcontrollersName")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textcontrollersName")
          .classList.remove("stwarning");

          
        var validcheck = validtextallcheck(
        this.createtempcontroll.controllersTitle,
        "نام  فارسی دکمه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textcontrollersTitle")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textcontrollersTitle")
          .classList.remove("stwarning");

     if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        addcontroll(this.createtempcontroll).then((response) => {
         this.getListcontroll();
         this.aa = false;
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
               type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
            if(response.statusCode=='Success'){
              setTimeout(() => {
                     var td = document.getElementById("tablecontrol").rows[2];
            td.classList.add("colortr");
              }, 300);
             setTimeout(() => {
               var td = document.getElementById("tablecontrol").rows[2];
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
            }
         });
      }
      },
       cancelEditpp(item) {
         
         item.pagesPname = item.fpagesPname;
         //item.controllersPageIdName = item.controllersPageIdName;
         item.controllersPageIdFk = item.fcontrollersPageIdFk;
        item.controllersPagetitle=item.fcontrollersPagetitle;
        item.controllersName = item.fcontrollersName;
        item.controllersTitle = item.fcontrollersTitle;
       this.editcontrollers = null;
      },
        updatecontroll(item , index) {
        
         item.pagesPname = item.pagesPname;
        item.controllersPageIdName = item.controllersPageIdName;
        item.controllersPageIdFk = item.fcontrollersPageIdFk;
        item.controllersPagetitle=item.controllersPagetitle;
        item.controllersName = item.controllersName;
        item.controllersTitle = item.controllersTitle;
        this.tempcontroll = item;
      
         this.msg = [];
         var validcheck = validdrop(
        this.tempcontroll.controllersPageIdFk,
        "لیست منو ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputcontrollersPageIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputcontrollersPageIdFk")
          .classList.remove("stwarning");

        var validcheck = validenglishallcheck(
        this.tempcontroll.controllersName,
        " نام  دکمه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputcontrollersName")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputcontrollersName")
          .classList.remove("stwarning");

          
        var validcheck = validtextallcheck(
        this.tempcontroll.controllersTitle,
        "نام  فارسی دکمه ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputcontrollersTitle")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputcontrollersTitle")
          .classList.remove("stwarning");

     if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        this.editcontrollers = null;
        editcontroll(this.tempcontroll).then((response) => {
          
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
          //this.getListcontroll();
               if(response.statusCode=='Success'){
     var td = document.getElementById("tablee").rows[index];
            td.classList.add("colortr");
             setTimeout(() => {
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 3000); 
          }
        });
      }
      },
          confirmdeletcontroll(item) {
             swal({
        title: "آیا از حذف کنترل مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
         buttons: ["خیر","بله"],
      })
      
     .then(async (value) =>{ 
         if(value == true){
      await deletcontroll(item.controllersIdPk).then((response) => {
       
         this.getListcontroll();
        this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
          position: 'top-left',
            duration: 4000,
          });
   
       })
     }
        })
    },
      //   confirmdeletcontroll(item) {
      //   deletcontroll(item.controllersIdPk).then(() => {
      //     this.getListcontroll();
      //     this.$notify({
      //       title: "انجام شد",
      //       message: "گروه مورد نظر با موفقیت حذف گردید",
      //       type: "success",
      //     position: 'top-left',
            duration: 4000,
      //     });
      //   });
      // },
      editecontroll(item){
        this.editcontrollers = item.controllersIdPk;
      //  item.controllersPagetitle = item.controllersPagetitle;
        //item.controllersTitle = item.controllersTitle;
      // this.item.controllersPagetitle=this.item.controllersPageIdFk
      item.controllersPageIdFk = item.controllersPagetitle;
      },
      enserafgroupcontroll(){
         this.aa = false;
         this.createtempcontroll.controllersName="";
         this.createtempcontroll.controllersTitle="";
         this.createtempcontroll.controllersPageIdFk="";
      },
      //لیست نقش ها
       modalcreatemasterlist(){
            this.createtempmasterrolelise.masterRolesListEname = "";
              this.createtempmasterrolelise.masterRolesListPname = "";
                // this.createtempmasterrolelise.masterRolesListReqStatus = "";
                //  this.createtempmasterrolelise.masterRolesListProgramsIdFk = "";
      this.ss = true;
    },
//     creategroup(){
//  this.ss = false;
//     },

     async getListmasterrole() {
        this.listLoading = true;
      const { data } = await gridmasterrole();
        const items = data.items;

        this.listmasterrole = data.map((v) => {
          v.fmasterRolesListEname = v.masterRolesListEname;
          v.fmasterRolesListPname=v.masterRolesListPname
          return v;
        });
        this.listLoading = false;
      },
       createmaster() {
         this.msg = [];
          var validcheck = validenglishallcheck(
          this.createtempmasterrolelise.masterRolesListEname,
        " نام  انگلیسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textmasterRolesListEname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textmasterRolesListEname")
          .classList.remove("stwarning");

          
        var validcheck = validtextallcheck(
        this.createtempmasterrolelise.masterRolesListPname,
        "نام  فارسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textmasterRolesListPname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textmasterRolesListPname")
          .classList.remove("stwarning");

     if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
         
          addnasterrolelist(this.createtempmasterrolelise).then((response) => {
         this.getListmasterrole();
         this.droplisspecial();
         this.ss = false;
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
               type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
            if(response.statusCode=='Success'){
              setTimeout(() => {
                     var td = document.getElementById("tableee").rows[2];
            td.classList.add("colortr");
              }, 400);
             setTimeout(() => {
               var td = document.getElementById("tableee").rows[2];
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
            }
         });
         }
      },
       cancelEditrole(item) {
          item.masterRolesListEname = item.fmasterRolesListEname;
        item.masterRolesListPname = item.fmasterRolesListPname;
       this.editmasterrol = null;
      },
        updatemaster(item,index) {
       
          this.msg = [];
          var validcheck = validenglishallcheck(
      item.masterRolesListEname,
        " نام  انگلیسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputmasterRolesListEname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputmasterRolesListEname")
          .classList.remove("stwarning");

          
        var validcheck = validtextallcheck(
       item.masterRolesListPname,
        "نام  فارسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputmasterRolesListPname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputmasterRolesListPname")
          .classList.remove("stwarning");

     if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
          this.editmasterrol = null;
         item.fmasterRolesListEname = item.masterRolesListEname;
        item.fmasterRolesListPname = item.masterRolesListPname;
        item.fmasterRolesListIdPk = item.masterRolesListIdPk;
        this.tempmasterrole.masterRolesListPname = item.fmasterRolesListPname;
          this.tempmasterrole.masterRolesListEname = item.fmasterRolesListEname;
           this.tempmasterrole.masterRolesListIdPk = item.fmasterRolesListIdPk;
        //  this.tempmasterrole = item;
        editmasterrolelist(this.tempmasterrole).then((response) => {
          this.getListmasterrole();
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
               if(response.statusCode=='Success'){
        var td = document.getElementById("tableee").rows[index];
            td.classList.add("colortr");
             setTimeout(() => {
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
          }
        });
        }
      },
       deletrole(item) {
             swal({
        title: "آیا از حذف نقش مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
         buttons: ["خیر","بله"],
      })
      
     .then(async (value) =>{ 
         if(value == true){
      await deletmasterrolelist(item.masterRolesListIdPk).then((response) => {
       
         this.getListmasterrole();
        this.$notify({
            title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
            message: response.message,
            type: response.statusCode == "Success" ? "success" : "error",
          position: 'top-left',
            duration: 4000,
          });
   
       })
     }
        })
    },
      
      //   deletrole(item) {
      //   deletmasterrolelist(item.masterRolesListIdPk).then(() => {
      //     this.getListmasterrole();
      //     this.$notify({
      //       title: "انجام شد",
      //       message: "گروه مورد نظر با موفقیت حذف گردید",
      //       type: "success",
      //     position: 'top-left',
            duration: 4000,
      //     });
      //   });
      // },
      editerole(item){
        this.editmasterrol = item.masterRolesListIdPk;
      },
      enserafgroupmasterrolelist(){
         this.ss = false;
      },
      //دسترسی نقش
   
       onSearch(search, loading) {
      if (search.length > 1) {
        AjaxUsersSearch(search).then((response) => {
          this.options = response.data;
        });
      }
    },
    changeclick(item){
    
      this.droplistassis(item);
        this.droplistmang(item);
    },
      droplistprogram() {
        dropprogram().then((response) => {
        this.dropprog = response.data;
       
      });
    },
       droplistorg() {
        droporg().then((response) => {
        this.droporgans = response.data;
       
      // this.createtempaccessrolelist.rolesListOrgansIdFk=this.item.organsIdPk
      });
    },

       droplistmang(item) {
      dropmang(item).then((response) => {
        this.dropmangmang = response.data;
      });
    },
      droplistassis(item) {
      dropassis(item).then((response) => {
        this.dropassis = response.data;
        
      });
    },
 
    modalcreategroup(){
      this.createtempaccessrolelist.rolesListPname = "";
       this.createtempaccessrolelist.rolesListEname = "";
        this.createtempaccessrolelist.rolesListOrgansIdFk = "";
         this.createtempaccessrolelist.rolesListManagmentIdFk = "";
          this.createtempaccessrolelist.rolesListUsernameFk = "";
           this.createtempaccessrolelist.rolesListDescription = "";
            this.createtempaccessrolelist.rolesListSubProgramsIdFk = "";
             this.createtempaccessrolelist.rolesListAssistanceIdFk = "";
              this.createtempaccessrolelist.rolesListMasterRolesListIdFk = "";
      this.pp = true;
    },

      async getlistaccessrole() {
        this.listLoading = true;
        const { data } = await gridaccessrolelist();
        const items = data.items;

        this.listaccessrolelist = data.map((v) => {
        v.frolesListPname = v.rolesListPname;
        v.frolesListEname = v.rolesListEname;
        v.frolesListMasterRolesListName = v.rolesListMasterRolesListName;
        v.frolesListOrgansIdFk = v.rolesListOrgansIdFk;
        v.frolesListManagmentIdFk = v.rolesListManagmentIdFk;
        v.frolesListUsernameFk = v.rolesListUsernameFk;
        v.frolesListDescription = v.rolesListDescription;
        v.frolesListSubProgramsIdFk = v.rolesListSubProgramsIdFk;
        v.frolesListAssistanceIdFk = v.rolesListAssistanceIdFk;
        v.frolesListMasterRolesListIdFk = v.rolesListMasterRolesListIdFk;
          
          return v;
        });
        this.listLoading = false;
      },


       createaccess() {
         this.msg = [];
           var validcheck = validtextallcheck(
        this.createtempaccessrolelist.rolesListPname,
        "نام  فارسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textrolesListPname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textrolesListPname")
          .classList.remove("stwarning");
           var validcheck = validenglishallcheck(
        this.createtempaccessrolelist.rolesListEname,
        " نام  انگلیسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textrolesListEname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textrolesListEname")
          .classList.remove("stwarning");

             var validcheck = validdrop(
        this.createtempaccessrolelist.rolesListMasterRolesListIdFk,
        " نقش مادر ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textrolesListMasterRolesListIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textrolesListMasterRolesListIdFk")
          .classList.remove("stwarning");

      //    var validcheck = validdrop(
      //   this.createtempaccessrolelist.rolesListOrgansIdFk,
      //   " سازمان ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textrolesListOrgansIdFk")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textrolesListOrgansIdFk")
      //     .classList.remove("stwarning");

    //    var validcheck = validdrop(
    //     this.createtempaccessrolelist.rolesListManagmentIdFk,
    //     " مدیریت ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textrolesListManagmentIdFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textrolesListManagmentIdFk")
    //       .classList.remove("stwarning");

    //          var validcheck = validdrop(
    //     this.createtempaccessrolelist.rolesListAssistanceIdFk,
    //     " معاونت ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textrolesListAssistanceIdFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textrolesListAssistanceIdFk")
    //       .classList.remove("stwarning");
      
    //  var validcheck = validdrop(
    //     this.createtempaccessrolelist.rolesListUsernameFk,
    //     " پرسنل ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textrolesListUsernameFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textrolesListUsernameFk")
    //       .classList.remove("stwarning");

      //      var validcheck = validdrop(
      //   this.createtempaccessrolelist.rolesListSubProgramsIdFk,
      //   " برنامه کاری ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textrolesListSubProgramsIdFk")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textrolesListSubProgramsIdFk")
      //     .classList.remove("stwarning");
        
     if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
        addrolelist(this.createtempaccessrolelist).then((response) => {
         this.getlistaccessrole();
         this.pp = false;
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
               type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
             if(response.statusCode=='Success'){
              setTimeout(() => {
                     var td = document.getElementById("tablee").rows[2];
            td.classList.add("colortr");
              }, 450);
             setTimeout(() => {
               var td = document.getElementById("tablee").rows[2];
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
            }
         });
         }
      },
       cancelEdit(item) {
        item.rolesListPname = item.frolesListPname;
        item.rolesListEname = item.frolesListEname;
        item.rolesListMasterRolesListName = item.frolesListMasterRolesListName;
        item.rolesListOrgansIdFk = item.frolesListOrgansIdFk;
        item.rolesListManagmentIdFk = item.frolesListManagmentIdFk;
        item.rolesListUsernameFk = item.frolesListUsernameFk;
        item.rolesListDescription = item.frolesListDescription;
        item.rolesListSubProgramsIdFk = item.frolesListSubProgramsIdFk;
        item.rolesListAssistanceIdFk = item.frolesListAssistanceIdFk;
        item.rolesListMasterRolesListIdFk = item.frolesListMasterRolesListIdFk;
       this.editaccessrole = null;
      },
        updateaccessrolelist(createtempaccessrolelist,index) {
       
        createtempaccessrolelist.rolesListPname = createtempaccessrolelist.rolesListPname;
        createtempaccessrolelist.rolesListEname = createtempaccessrolelist.rolesListEname;
        createtempaccessrolelist.rolesListOrgansIdFk = createtempaccessrolelist.rolesListOrgansIdFk;
        createtempaccessrolelist.rolesListManagmentIdFk = createtempaccessrolelist.rolesListManagmentIdFk;
        createtempaccessrolelist.rolesListUsernameFk = createtempaccessrolelist.rolesListUsernameFk;
        createtempaccessrolelist.rolesListDescription = createtempaccessrolelist.rolesListDescription;
        createtempaccessrolelist.rolesListSubProgramsIdFk = createtempaccessrolelist.rolesListSubProgramsIdFk;
        createtempaccessrolelist.rolesListAssistanceIdFk = createtempaccessrolelist.rolesListAssistanceIdFk;
        createtempaccessrolelist.rolesListMasterRolesListIdFk = createtempaccessrolelist.rolesListMasterRolesListIdFk;
        this.tempaccess = createtempaccessrolelist;
      
         this.msg = [];
           var validcheck = validtextallcheck(
        this.tempaccess.rolesListPname,
        "نام  فارسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputrolesListPname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputrolesListPname")
          .classList.remove("stwarning");


           var validcheck = validenglishallcheck(
        this.tempaccess.rolesListEname,
        " نام  انگلیسی نقش ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputrolesListEname")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputrolesListEname")
          .classList.remove("stwarning");

             var validcheck = validdrop(
        this.tempaccess.rolesListMasterRolesListIdFk,
        " نقش مادر ",
        1,
        40
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("textinputrolesListMasterRolesListIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("textinputrolesListMasterRolesListIdFk")
          .classList.remove("stwarning");

    //      var validcheck = validdrop(
    //     this.tempaccess.rolesListOrgansIdFk,
    //     " سازمان ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textinputrolesListOrgansIdFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textinputrolesListOrgansIdFk")
    //       .classList.remove("stwarning");

    //    var validcheck = validdrop(
    //     this.tempaccess.rolesListManagmentIdFk,
    //     " مدیریت ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textinputrolesListManagmentIdFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textinputrolesListManagmentIdFk")
    //       .classList.remove("stwarning");

    //          var validcheck = validdrop(
    //     this.tempaccess.rolesListAssistanceIdFk,
    //     " معاونت ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textinputrolesListAssistanceIdFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textinputrolesListAssistanceIdFk")
    //       .classList.remove("stwarning");
      
    //  var validcheck = validdrop(
    //     this.tempaccess.rolesListUsernameFk,
    //     " پرسنل ",
    //     1,
    //     40
    //   );
    //   if (validcheck.length != 0) {
    //     this.msg.push(validcheck);
    //     document
    //       .getElementById("textinputrolesListUsernameFk")
    //       .classList.add("stwarning");
    //   } else
    //     document
    //       .getElementById("textinputrolesListUsernameFk")
    //       .classList.remove("stwarning");

      //      var validcheck = validdrop(
      //   this.tempaccess.rolesListSubProgramsIdFk,
      //   " برنامه کاری ",
      //   1,
      //   40
      // );
      // if (validcheck.length != 0) {
      //   this.msg.push(validcheck);
      //   document
      //     .getElementById("textinputrolesListSubProgramsIdFk")
      //     .classList.add("stwarning");
      // } else
      //   document
      //     .getElementById("textinputrolesListSubProgramsIdFk")
      //     .classList.remove("stwarning");
        
     if (this.msg.length != 0) {
        alert(this.msg);
      } else if (this.msg.length == 0) {
         this.editaccessrole = null;
        editaccessrolelist(this.tempaccess).then((response) => {
          this.getlistaccessrole();
          this.$notify({
            title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
             if(response.statusCode=='Success'){
      var td = document.getElementById("tablee").rows[index];
            td.classList.add("colortr");
             setTimeout(() => {
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
          }
        });
        }
      },
           deletaccessrolelist(item) {
         swal({
        title: "آیا از حذف نقش مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
         buttons: ["خیر","بله"],
      })
      
        .then(async(value) => {
          if(value == true){
      await deleterolelist(item.rolesListIdPk).then((response) => {
          this.getlistaccessrole();
          this.$notify({
             title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
        });
          }
        })
      },
     
      edite(item){
        this.editaccessrole = item.rolesListIdPk;
    
      },
      enserafgroupaccesss(){
         this.pp = false;
      },
    gettree() {
      datatree().then((response) => {
        this.listaccess = response.data;
      });
    },
   
    droplistmasterrole() {
      dropmaster().then((response) => {
        this.dropmasterlistaccess = response.data;
      });
    },
 droplis() {
      dropm().then((response) => {
        this.dropmasterlist = response.data;
      });
    },
     droplispp() {
      dropm().then((response) => {
        this.dropmasterlistpp = response.data;
      });
    },
    regaccess() {
      //  markedCheckbox[i].checked = false;
      //  this.it.selectedPagesId = "";
    // this.item.selectedControllersId="";
    //  this.item.selectedPagesId ="";
    //  document.getElementById("yes" + event.target.value).checked = false;
    //     this.selectedPagesId.splice(),
    //   document.getElementById("no" + event.target.value).checked = false;
    //     this.selectedControllersId.splice(),
          
      this.msg = [];
      
      var validcheck = validdrop(
        this.itemaccess.masterRoleListIdFk,
        "نقش",
        1,
        20
      );
      if (validcheck.length != 0) {
        this.msg.push(validcheck);
        document
          .getElementById("dropmasterRoleListIdFk")
          .classList.add("stwarning");
      } else
        document
          .getElementById("dropmasterRoleListIdFk")
          .classList.remove("stwarning");

    if (this.msg.length != 0) {
        alert(this.msg);
       
      } else if (this.msg.length == 0) {

      var markedCheckbox = Array.from(document.getElementsByClassName("ried"));
      
             

      for (var i = 0; i < markedCheckbox.length; i++) {
        if (markedCheckbox[i].checked) {
      this.itemaccess.selectedPagesId.push(markedCheckbox[i].value);
        
        }
    
      }
  
         var markedCheckbox = Array.from(document.getElementsByClassName("riedaa"));
      for (var i = 0; i < markedCheckbox.length; i++) {
        if (markedCheckbox[i].checked) {
      this.itemaccess.selectedControllersId.push(markedCheckbox[i].value);
        
        }
      }
     // this.item.selectedControllersId = this.itemd.selectedControllersId;
      //const getchek = this.$refs.tree.getCheckedKeys()
      // this.ff=this.generateTree(deepClone(this.data), checkedKeys)
      //  const { data } = await addaccess(this.all)
      //   this.all.key = data.key
      //this.rolesList.push(this.role)
      addaccess(this.itemaccess).then((response) => {
   
        this.$notify({
          title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
          message: response.message,
          type: response.statusCode == "Success" ? "success" : "error",
        position: 'top-left',
            duration: 4000,
        });
        this.itemaccess.selectedPagesId.splice(0,this.itemaccess.selectedPagesId.length);
         this.itemaccess.selectedControllersId.splice(0,this.itemaccess.selectedControllersId.length);
      });
      }
    },

    bindrolelist() {
      this.selectedPagesId = "";
      this.selectedControllersId = "";
      var markedCheckbox = Array.from(document.getElementsByClassName("ried"));
      for (var i = 0; i < markedCheckbox.length; i++) {
        markedCheckbox[i].checked = false;
      }
        var markedCheckboox = Array.from(document.getElementsByClassName("riedaa"));
        for (var i = 0; i < markedCheckboox.length; i++) {
        markedCheckboox[i].checked = false;
         }
       droprole(this.itemaccess.masterRoleListIdFk).then((response) => {
        this.itemrole = response.data;

        this.selectedPagesId = this.itemrole.selectedPagesId;
        this.selectedControllersId = this.itemrole.selectedControllersId;
        // delete_checkbox();
      


            // const myElement = document.getElementById("itemaccess.id");
            //    myElement.checked = true;
        //    for (var i = 0; i < Pages.length; i++) {
        //    Pages[i].checked = true;
        //  }
        //    const myElement = document.getElementById("id");
        //    for (var i = 0; i < Pages.length; i++) {
        //    Pages[i].checked = true;
        //  }
      //     for(var i = 0 ; i < mark ; i++ ){
      //      document.getElementById( id ).checked= true;
      //      },

      //  var markk = this.selectedControllersId;
     
      //  for(var i = 0 ; i < markk ; i++ ){
      //    document.getElementById( id ).checked= true;
      //   }
        //  const element= this.itemrole.selectedPagesId;
          this.selectedPagesId.forEach((element) => {
          document.getElementById('yes'+element).checked = true;
        });
        this.selectedControllersId.forEach((element) => {
          document.getElementById('no'+element).checked = true;
        });
        //this.div_filter=true;
      });
    },
  addspecialRoles(){
    this.sp.specialRolesIdFk = "";
    this.sp.specialRolesTypeIdFk = "";
     this.sp.specialRolesName = "";
    this.ss = true;
    },

     async getSpecialrole() {
        this.listLoading = true;
        const { data } = await GetAllAccessSpecial();
        const items = data.items;

          this.special = data.map((v) => {

          v.orgspecialRolesName = v.specialRolesName;
        
          return v;
        });
        this.listLoading = false;
      },


   droplistspecial() {
     apidroprolspecial().then((response) => {
        this.dropspecialrol = response.data;
      });
    },

     droplisspecial() {
      dropGetAllRoles().then((response) => {
        this.dropmasterspecial = response.data;
      });
    },
    createspecialRoles(){
       apiaddspecialRoles(this.spp).then((response) => {
         this.getSpecialrole();
         this.ss = false;
        this.$notify({
          title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
          message: response.message,
          type: response.statusCode == "Success" ? "success" : "error",
        position: 'top-left',
            duration: 4000,
        });
          if(response.statusCode=='Success'){
              setTimeout(() => {
                     var td = document.getElementById("tablerole").rows[2];
            td.classList.add("colortr");
              }, 400);
             setTimeout(() => {
               var td = document.getElementById("tablerole").rows[2];
           td.classList.remove("colortr")
           td.classList.add("colortd")
         }, 4000); 
            }
      });
    },
      // cancelEditsp(sprol) {
      //    sprol.specialRolesIdFk = sprol.specialRolesIdFk;
      //     this.editsp = null;
      // },

         handleDeletesp(sprol) {
         swal({
        title: "آیا از حذف نقش ویژه مطمئن هستید؟",
        //  text: msg.join("\n"),
        icon: "warning",
         buttons: ["خیر","بله"],
      })
      
        .then(async(value) => {
          if(value == true){
      await apideletespecialRoles(sprol.specialRolesIdPk).then((response) => {
          this.getSpecialrole();
          this.$notify({
             title: response.statusCode=='Success'?"انجام شد":"انجام نشد",
            message: response.message,
            type: response.statusCode == 'Success'?"success":"error",
          position: 'top-left',
            duration: 4000,
          });
        });
          }
        })
      },
enserafspecialRoles(){
this.ss=false;
},
// updatespecialroles(){
//  apiupdatespecialRoles(this.addrolspecial).then((response) => {
//         this.$notify({
//           title: response.statusCode == "Success" ? "انجام شد" : "انجام نشد",
//           message: response.message,
//           type: response.statusCode == "Success" ? "success" : "error",
//         position: 'top-left',
            duration: 4000,
//         });
//       });
// },
}
}

</script>
<style scoped>
ul.tree, ul.tree ul {
    list-style: none;
     margin: 0;
     padding: 0;
   } 
   ul.tree ul {
     margin-right: 10px;
   }
   ul.tree li {
     margin: 0;
     padding: 0 7px;
     line-height: 20px;
     color: #369;
     font-weight: bold;
     border-right:1px dotted rgb(100,100,100);

   }
   ul.tree li:last-child {
       border-right:none;
   }
   ul.tree li:before {
      position:relative;
      top:-0.3em;
      height:1em;
      width:12px;
      color:white;
      border-bottom:1px dotted rgb(100,100,100);
      content:"";
      display:inline-block;
      right:-7px;
   }
   ul.tree li:last-child:before {
      border-right:1px dotted rgb(100,100,100);   
   }
  
</style>
<style>
.el-collapse-item__header {

    direction: rtl;
}
</style>

