<template>
   <div class="w-max-1000">
      <ProfileHeader />

      <b-row class="align-items-center mt-5">
         <!-- Name -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Name"
                     :msg="getMessage('name_last')"
                     :state="validate('name_last')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.name_last.$model"
                  trim
                  placeholder="Name"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- Name First -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Surname"
                     :msg="getMessage('name_first')"
                     :state="validate('name_first')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.name_first.$model"
                  trim
                  placeholder="Surname"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- Identify Number -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Turkish Identify Number*"
                     :msg="getMessage('ID_number')"
                     :state="validate('ID_number')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.ID_number.$model"
                  trim
                  type="number"
                  placeholder="Turkish Identify Number"
                  @keypress.native="onlyNumber"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- Birth -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Date of birth*"
                     :msg="getMessage('birth') || error.birth"
                     :state="validate('birth') && !error.birth"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.birth.$model"
                  trim
                  @keypress.native="onlyNumberSlash"
                  @input="validDate"
                  placeholder="DD/MM/YYYY"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- Nationality -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Nationality*"
                     :msg="getMessage('nationality')"
                     :state="validate('nationality')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.nationality.$model"
                  trim
                  placeholder="T.C."
               ></b-form-input>
            </b-form-group>
         </b-col>

         <!-- academic -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label label="Academic Degree" />
               </slot>
               <b-form-input
                  v-model="form.academic"
                  trim
                  placeholder="Academic Degree"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- Country -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label label="Country" />
               </slot>
               <b-form-select
                  :options="countries"
                  v-model="form.country"
                  value-field="countryCode"
                  text-field="countryNameEn"
                  @change="hChangeCountry"
               >
               </b-form-select>
            </b-form-group>
         </b-col>
         <!-- city -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label label="City" :msg="error.city" :state="!error.city" />
               </slot>
               <b-form-select
                  :options="form.country == 'TR' ? cities : []"
                  v-model="form.city"
                  @change="
                     validateLocaion();
                     form.district = '';
                  "
               >
                  <template #first>
                     <b-form-select-option value="" disabled
                        >-- select city --</b-form-select-option
                     >
                  </template>
               </b-form-select>
            </b-form-group>
         </b-col>

         <!-- distirict -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label label="District" :msg="error.district" :state="!error.district" />
               </slot>
               <b-form-select
                  :options="form.city ? gsv(CitiesJson, [form.city, 'districts'], []) : []"
                  v-model="form.district"
                  @change="validateLocaion()"
               >
                  <template #first>
                     <b-form-select-option value="" disabled
                        >-- select district --</b-form-select-option
                     >
                  </template>
               </b-form-select>
            </b-form-group>
         </b-col>
         <!-- post_code -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Post code*"
                     :msg="getMessage('post_code')"
                     :state="validate('post_code')"
                  />
               </slot>
               <b-form-input
                  v-model.number="$v.form.post_code.$model"
                  placeholder="Post Code"
                  @keypress.native="onlyNumber"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- Address -->
         <b-col cols="12" sm="12" md="8" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Address*"
                     :msg="getMessage('address')"
                     :state="validate('address')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.address.$model"
                  trim
                  placeholder="Address"
               ></b-form-input>
            </b-form-group>
         </b-col>
      </b-row>
      <b-row class="align-items-center mt-5">
         <!-- education_status -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Education Status*"
                     :msg="getMessage('education_status')"
                     :state="validate('education_status')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.education_status.$model"
                  trim
                  placeholder="Bachelor's degree"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- what_is_your_job -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="What is your job"
                     :msg="getMessage('what_is_your_job')"
                     :state="validate('what_is_your_job')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.what_is_your_job.$model"
                  trim
                  placeholder="What is your job"
               ></b-form-input>
            </b-form-group>
         </b-col>
         <!-- what_is_your_job -->
         <b-col cols="12" sm="6" md="4" class="mb-4">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Sector in which it*"
                     :msg="getMessage('sector_in_which_it')"
                     :state="validate('sector_in_which_it')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.sector_in_which_it.$model"
                  trim
                  placeholder="Sector in which it"
               ></b-form-input>
            </b-form-group>
         </b-col>

         <!-- what_is_your_job -->
         <b-col cols="12">
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Experience*"
                     :msg="getMessage('experience')"
                     :state="validate('experience')"
                  />
               </slot>
               <b-form-textarea
                  v-model="$v.form.experience.$model"
                  rows="3"
                  trim
                  placeholder="Loem ipsum dolor sit amet, consecterur adl.."
               ></b-form-textarea>
            </b-form-group>
         </b-col>
      </b-row>
      <!-- Submit -->
      <div class="text-center mt-10">
         <b-button variant="primary" class="shadow" size="lg" style="width: 250px" @click="hSubmitS"
            >Save</b-button
         >
      </div>
   </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import CitiesJson, { cities } from "@/utils/cities_tr";
import countries from "@/utils/country.json";
import { ObjGet } from "@/utils";
import profile from "@/mixins/profile";
export default {
   mixins: [profile],
   data() {
      return {
         countries,
         CitiesJson,
         cities,
         form: {
            name_last: this.$store.state.auth.user.name_last,
            name_first: this.$store.state.auth.user.name_first,
            ID_number: this.$store.state.auth.user.ID_number || "",
            birth: this.$store.state.auth.user.birth || "",
            nationality: this.$store.state.auth.user.nationality || "",
            academic: this.$store.state.auth.user.academic || "",
            country: this.$store.state.auth.user.country || "TR",
            city: this.$store.state.auth.user.city || "",
            district: this.$store.state.auth.user.district || "",
            post_code: this.$store.state.auth.user.post_code || "",
            address: this.$store.state.auth.user.address || "",
            education_status: this.$store.state.auth.user.education_status || "",
            what_is_your_job: this.$store.state.auth.user.what_is_your_job || "",
            sector_in_which_it: this.$store.state.auth.user.sector_in_which_it || "",
            experience: this.$store.state.auth.user.experience || "",
         },
         error: {
            city: false,
            district: false,
            birth: false,
         },
      };
   },
   validations: {
      form: {
         name_last: {
            required,
         },
         name_first: {
            required,
         },
         ID_number: {
            required,
            minLength: minLength(11),
            maxLength: maxLength(11),
         },
         birth: {
            required,
         },
         nationality: {
            required,
         },
         post_code: {
            required,
            minLength: minLength(4),
         },
         address: {
            required,
         },
         education_status: {
            required,
         },
         what_is_your_job: {
            required,
         },
         sector_in_which_it: {
            required,
         },
         experience: {
            required,
         },
      },
   },
   methods: {
      validateLocaion() {
         if (this.form.country == "TR") {
            if (!this.form.city) {
               this.error.city = this.$t("valid.required", [""]);
            } else {
               this.error.city = false;
            }
            if (!this.form.district) {
               this.error.district = this.$t("valid.required", [""]);
            } else {
               this.error.district = false;
            }
            return !this.error.city && !this.error.district;
         } else {
            this.error.city = false;
            this.error.district = false;
            return true;
         }
      },
      onlyNumberSlash(e) {
         const charCode = e.which ? e.which : e.keyCod;
         if (charCode > 46 && charCode < 58) {
            return true;
         } else {
            e.preventDefault();
         }
      },
      validDate() {
         // "DD/MM/YYYY"
         const dateString = this.form.birth;
         console.log(dateString, "dateString");
         if (!dateString) return true;
         // First check for the pattern
         if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
            this.error.birth = this.$t("valid.fail", [""]);
            return false;
         }

         // Parse the date parts to integers
         var parts = dateString.split("/");
         var day = parseInt(parts[0], 10);
         var month = parseInt(parts[1], 10);
         var year = parseInt(parts[2], 10);

         // Check the ranges of month and year
         if (year < 1000 || year > 3000 || month == 0 || month > 12) {
            this.error.birth = this.$t("valid.fail", [""]);
            return false;
         }

         var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

         // Adjust for leap years
         if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

         // Check the range of the day
         if (day > 0 && day <= monthLength[month - 1]) {
            this.error.birth = false;
            return true;
         } else {
            this.error.birth = this.$t("valid.fail", [""]);
            return false;
         }
      },
      hChangeCountry() {
         this.form.district = "";
         this.form.city = "";
         if (this.form.country != "TR") {
            this.error.city = false;
            this.error.district = false;
         }
      },
      hSubmitS() {
         const validLocation = this.validateLocaion();
         this.validDate();
         if (this.anyError() || !validLocation || this.error.birth) return;
         console.log("LSkd falskd flaskd f");
         this.hSubmit(this.form);
      },
   },
   async mounted() {
      const res = await this.$store.dispatch("auth/me");
      if (res) {
         const newform = ObjGet(res, [
            "name_last",
            "name_first",
            "ID_number",
            "birth",
            "website",
            "academic",
            "country",
            "social_facebook",
            "city",
            "district",
            "post_code",
            "address",
            "education_status",
            "what_is_your_job",
            "sector_in_which_it",
            "experience",
            "nationality",
         ]);
         if (!newform.country) newform.country = "TR";
         this.form = newform;
      }
   },
};
</script>
