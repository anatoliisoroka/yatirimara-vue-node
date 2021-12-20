<template>
   <div class="p-2 mt-5 w-max-1000" v-if="!error">
      <div class="d-flex flex-column flex-md-row">
         <div class="px-2">
            <KFileImage
               v-model="form.logo"
               size="150"
               class="d-flex justify-content-center"
               key="avatar"
            >
               Campaign logo
            </KFileImage>
            <k-label
               label=""
               :msg="getMessage('logo')"
               :state="validate('logo')"
            />
         </div>
         <div class="flex-1 px-2">
            <b-form-group class="mb-3 mb-md-5">
               <slot name="label">
                  <k-label
                     label="Name of enterprise*"
                     :msg="getMessage('name_enterprise')"
                     :state="validate('name_enterprise')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.name_enterprise.$model"
                  trim
                  placeholder="Name of enterprise"
               ></b-form-input>
            </b-form-group>

            <b-form-group class="mb-5">
               <slot name="label">
                  <k-label
                     label="Name of the Campaign*"
                     :msg="getMessage('name')"
                     :state="validate('name')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.name.$model"
                  trim
                  placeholder="Name of the Campaign"
               ></b-form-input>
            </b-form-group>
         </div>
      </div>
      <div class="px-2">
         <!-- description -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="Describe Your Campaign in One Sentence*"
                  :msg="getMessage('description')"
                  :state="validate('description')"
               />
            </slot>
            <b-form-input
               v-model="$v.form.description.$model"
               trim
               placeholder="Describe Your Campaign in One Sentence"
               class="w-100"
            ></b-form-input>
         </b-form-group>
         <!-- description1 -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="About the project*"
                  :msg="getMessage('description1')"
                  :state="validate('description1')"
               />
            </slot>
            <b-form-textarea
               v-model="$v.form.description1.$model"
               trim
               placeholder="About the project"
               rows="3"
            ></b-form-textarea>
         </b-form-group>
         <!-- description2 -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="Scope Purpose and Subject (summary)*"
                  :msg="getMessage('description2')"
                  :state="validate('description2')"
               />
            </slot>
            <b-form-textarea
               v-model="$v.form.description2.$model"
               trim
               placeholder="Scope Purpose and Subject"
               rows="3"
            ></b-form-textarea>
         </b-form-group>

         <!-- Stage of the Enterprise -->
         <b-row>
            <b-col cols="12" md="4">
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Stage of the Enterprise*"
                        :msg="getMessage('stage')"
                        :state="validate('stage')"
                     />
                  </slot>
                  <b-form-input
                     v-model="$v.form.stage.$model"
                     trim
                     placeholder="Stage of the Enterprise"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col>
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Locations of the Enterprise*"
                        :msg="getMessage('locations')"
                        :state="validate('locations')"
                     />
                  </slot>
                  <b-form-input
                     v-model="$v.form.locations.$model"
                     trim
                     placeholder="Locations of the Enterprise"
                  ></b-form-input>
               </b-form-group>
            </b-col>
         </b-row>
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label label="Main Categories of Enterprise*" />
            </slot>
            <b-form-select
               :options="[
                  { value: 0, text: 'All' },
                  { value: 1, text: 'Teknoloji' },
                  { value: 2, text: 'Üretim' },
               ]"
               v-model="form.category"
            >
            </b-form-select>
         </b-form-group>
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="Business Models of the Enterprise*"
                  :msg="getMessage('business_models')"
                  :state="validate('business_models')"
               />
            </slot>
            <b-form-input
               v-model="$v.form.business_models.$model"
               trim
               placeholder="Business Models of the Enterprise"
            ></b-form-input>
         </b-form-group>
         <b-row>
            <b-col cols="12" md="4">
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Sectors of Enterprise*"
                        :msg="getMessage('sectors')"
                        :state="validate('sectors')"
                     />
                  </slot>
                  <KDropdown
                     :options="sectors_un"
                     @click-item="handleDropClick"
                  >
                     <template #button-content>
                        <b-form-input
                           v-model="keyword_sector"
                           trim
                           placeholder="Sectors of Enterprise"
                        ></b-form-input>
                     </template>
                  </KDropdown>
               </b-form-group>
            </b-col>
            <b-col>
               <div class="d-flex flex-wrap mt-5">
                  <div
                     class="
                        px-3
                        py-1
                        rounded-full
                        d-flex
                        align-items-center
                        bg-light
                        mr-3
                        mb-3
                     "
                     v-for="(item, ii) in sectors_selected"
                     :key="ii"
                  >
                     <span class="pr-2">{{ item.text }}</span>
                     <button class="close" @click="hRemoveSector(item.value)">
                        ×
                     </button>
                  </div>
               </div>
            </b-col>
         </b-row>
      </div>
      <!-- Submit -->
      <div class="text-center mt-10">
         <b-button
            variant="primary"
            class="shadow"
            size="lg"
            style="width: 250px"
            @click="hSubmit"
            >Save and Proceed</b-button
         >
      </div>
   </div>   
   <NoData v-else-if="!loading" />
</template>

<script>
import { required, url } from "vuelidate/lib/validators";
import { CREATE_CAMPAIGN, UPDATE_CAMPAIGN } from "@/api/campaign";
import { ObjGet } from "@/utils";
import { CAMPAIGN } from "@/api/campaign";
import { sectors } from "@/utils/constant";
export default {
   name: "CampaignProfile",
   data() {
      return {
         loading: false,
         error: false,
         form: {
            logo: "",
            name: "1",
            name_enterprise: "1",
            description: "1",
            description1: "1",
            description2: "1",
            stage: "1",
            locations: "1",
            category: 0,
            business_models: "1",
            sectors: [],
         },
         sectors,
         keyword_sector: "",
      };
   },
   computed: {
      sectors_un: function () {
         return sectors.filter((el) => !this.form.sectors.includes(el.value));
      },
      sectors_selected: function () {
         return sectors.filter((el) => this.form.sectors.includes(el.value));
      },
   },
   validations: {
      form: {
         logo: {
            required,
         },
         name: {
            required,
         },
         name_enterprise: {
            required,
         },
         description: {
            required,
         },
         description1: {
            required,
         },
         description2: {
            required,
         },
         stage: {
            required,
         },
         locations: {
            required,
         },
         business_models: {
            required,
         },
         sectors: {
            required,
         },
      },
   },
   methods: {
      onFileChange() {},
      handleDropClick(value) {
         this.form.sectors.push(value);
      },
      async hSubmit() {
         if (this.anyError()) return false;
         if (this.$route.params.id == "create") {
            const res = await this.$apollo.mutate({
               mutation: CREATE_CAMPAIGN,
               variables: {
                  form: this.form,
               },
               fetchPolicy: "no-cache",
            });
            if (res?.data?.create_campaign?.code == 200) {
               this.successMsg("Successfully Created!");
               this.$router.replace({
                  name: "campaigns-id",
                  params: { id: res.data.create_campaign.data },
                  query: { tab: "idea" },
               });
            }
         } else {
            let form = Object.assign({}, this.form);
            if (/\/files\//.test(this.form.logo)) {
               delete form.logo;
            }
            const res = await this.$apollo.mutate({
               mutation: UPDATE_CAMPAIGN,
               variables: {
                  _id: this.$route.params.id,
                  form,
               },
               fetchPolicy: "no-cache",
            });
            this.successMsg("Successfully Updated!");
            this.$router.replace({
               name: "campaigns-id",
               params: { id: this.$route.params.id },
               query: { tab: "idea" },
            });
         }
      },
      hRemoveSector(value) {
         const sectorIndex = this.form.sectors.findIndex((el) => el == value);
         if (sectorIndex > -1) this.form.sectors.splice(sectorIndex, 1);
      },
   },
   async mounted() {
      if (this.$route.params.id != "create") {
         this.loading = true;
         const res = await this.$apollo
            .query({
               query: CAMPAIGN,
               variables: { _id: this.$route.params.id },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               return { error };
            });
         this.loading = false;
         if (!res.error) {
            console.log(res.data.campaign);
            const newform = ObjGet(res.data.campaign, [
               "logo",
               "name",
               "name_enterprise",
               "description",
               "description1",
               "description2",
               "stage",
               "locations",
               "category",
               "business_models",
               "sectors",
            ]);
            this.form = newform;
         } else {
            this.error = true;
         }
      }
   },
};
</script>
<style lang="scss" scoped>
</style>
