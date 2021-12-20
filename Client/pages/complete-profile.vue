<template>
   <div class="container">
      <div class="mx-auto w-100" style="max-width: 600px">
         <!-- individual -->
         <div class="d-flex justify-content-between mb-4">
            <b-form-radio v-model="form.individual" :value="true"
               >Individual</b-form-radio
            >
            <b-form-radio v-model="form.individual" :value="false"
               >Corporate</b-form-radio
            >
         </div>
         <!-- country -->
         <b-form-group class="mb-4">
            <slot name="label">
               <k-label label="Country" />
            </slot>
            <b-form-select
               :options="countries"
               v-model="form.country"
               value-field="countryCode"
               text-field="countryNameEn"
            >
            </b-form-select>
         </b-form-group>
         <!-- email -->
         <b-form-group class="mb-4">
            <slot name="label">
               <k-label label="E-Mail" />
            </slot>
            <b-form-input
               :value="$store.state.auth.user.email"
               trim
               placeholder="E-Mail"
               disabled
            ></b-form-input>
         </b-form-group>
         <!--  -->
         <b-row class="mb-4">
            <b-col cols="12" sm="6">
               <!-- Name -->
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
            <b-col cols="12" sm="6">
               <!-- Surname -->
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
         </b-row>
         <!-- phone -->
         <div>
            <k-label
               label="Mobile Phone"
               :msg="error.phone"
               :state="!error.phone"
            />
            <b-input-group>
               <template #prepend>
                  <b-dropdown
                     :text="form.phone_code"
                     class="h-500 text-dark bg-white"
                     variant="outline-secondary"
                  >
                     <b-dropdown-item
                        v-for="(item, index) in countries"
                        :active="item.phoneCode == form.phone_code"
                        :key="index"
                        @click="form.phone_code = item.phoneCode"
                     >
                        ({{ item.phoneCode }}) {{ item.countryNameEn }}
                     </b-dropdown-item>
                  </b-dropdown>
               </template>

               <b-form-input
                  v-model="form.phone"
                  trim
                  placeholder="Phone number"
                  @keypress="vallidatePhoneNumber"
                  @input="validatePhone"
               ></b-form-input>
            </b-input-group>
         </div>
         <!-- Section Choose -->
         <div class="text-center mt-6">
            <h5>Choose Your Interest</h5>
            <p class="text-secondary">You can choose both</p>
         </div>
         <k-label
            label="Role"
            :msg="getMessage('role')"
            :state="validate('role')"
         />
         <div class="d-flex justify-content-between k-label-rounded">
            <b-form-checkbox v-model="form.role" :value="1">
               Investing</b-form-checkbox
            >
            <b-form-checkbox v-model="form.role" :value="2">
               Entrepreneurship</b-form-checkbox
            >
         </div>
         <!-- Accept -->
         <b-form-checkbox v-model="accept" class="mt-10">
            I read and accept User Agreement and KVKK Clarification Text
         </b-form-checkbox>

         <!-- Send SMS -->
         <div class="text-center mt-10">
            <b-button
               variant="primary"
               :disabled="!accept"
               class="shadow w-75"
               size="lg"
               id="get-sign-in-code"
               @click="sentShowCodeModal"
               >Submit Confirmation Code</b-button
            >
         </div>
      </div>
      <!-- modal -->
      <b-modal
         ref="sms"
         centered
         hide-footer
         title-class="text-center"
         title="Confirm Your Phone Number"
         no-close-on-backdrop
      >
         <div class="text-center my-2">
            Time Remaining
            <k-timer :endTime="counterTime" @ended="counterTime = 0" />
         </div>
         <div class="pt-4 pb-8">
            <KInputCode v-model="code" ref="code" />
         </div>
         <!-- content -->
         <b-row>
            <b-col cols="12" sm="6">
               <b-button
                  class="w-100 my-2"
                  size="lg"
                  variant="outline-primary"
                  :disabled="!!counterTime"
                  @click="sendSMS"
               >
                  Send Again
               </b-button>
            </b-col>
            <b-col cols="12" sm="6">
               <b-overlay
                  :show="busyAction"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="danger"
                  class="mr-3 my-2 w-100"
               >
                  <b-button
                     class="w-100"
                     variant="primary"
                     size="lg"
                     @click="hSubmit"
                     :disabled="code.length < 6"
                  >
                     <span class="menu-text">Confirm</span>
                  </b-button>
               </b-overlay>
            </b-col>
         </b-row>
      </b-modal>
   </div>
</template>

<script>
import countries from "@/utils/country.json";
import { required } from "vuelidate/lib/validators";
import firebase from "@/utils/firebase";
import { SENDSMS, COMPLETE_PROFILE } from "@/api/auth";
const counterTime = 180;
export default {
   layout: "home",
   middleware: ["isAuth", "hasRoleNo"],
   data() {
      return {
         countries,
         form: {
            name_last: "",
            name_first: "",
            phone_code: "+90",
            phone: "",
            country: "TR",
            individual: true,
            role: 0,
         },
         error: {
            phone: false,
         },
         accept: false,
         token: null,
         counterTime: 10,
         busyAction: false,
         code: "",
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
         role: {
            required,
         },
      },
   },
   methods: {
      vallidatePhoneNumber(e) {
         if (!this.form.phone) return true;
         const charCode = e.which ? e.which : e.keyCod;
         const phoneNumber = this.form.phone.replace(/\s/g, "");
         if (phoneNumber.length > 10) {
            e.preventDefault();
         } else if (
            [32, 43].includes(charCode) ||
            (charCode > 47 && charCode < 58)
         ) {
            this.error.phone;
            return true;
         } else {
            e.preventDefault();
         }
      },
      validatePhone() {
         const phoneNumber = this.form.phone.replace(/\s/g, "");
         if (!phoneNumber) {
            this.error.phone = this.$t("valid.required", [""]);
            return false;
         }
         if (phoneNumber.length < 10) {
            this.error.phone = this.$t("valid.min.string", [10]);
         } else this.error.phone = false;
      },
      validRole() {
         console.log(this.role, "role");
      },
      async hSubmit() {
         const res = await this.$apollo
            .mutate({
               mutation: COMPLETE_PROFILE,
               variables: {
                  ...this.form,
                  code: this.code,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               return { error };
            });
         if (res.error) {
            this.$refs.code.onClear();
         } else {
            await this.$store.dispatch("auth/me");
            const redirect = this.$route.query.redirect || "/my/profile";
            this.$router.replace(redirect);
         }
         console.log(res, "res");
      },

      async sendSMS() {
         this.validatePhone();
         if (this.anyError() || this.error.phone) return;
         const res = await this.$apollo
            .mutate({
               mutation: SENDSMS,
               variables: {
                  phone_code: this.form.phone_code,
                  phone: this.form.phone,
                  token: this.token,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            });
         if (res.data?.sendSMS?.code == 200) {
            this.$refs["sms"].show();
            this.counterTime = counterTime;
         }
      },
      sentShowCodeModal() {
         if (this.token) this.sendSMS();
      },
   },
   async mounted() {
      const res = await this.$store.dispatch("auth/me");
      if (res) {
         this.form = {
            name_last: res.name_last,
            name_first: res.name_first,
            phone_code: res.phone_code || "+90",
            phone: res.phone || "",
            country: res.country || "TR",
            role: res.role,
            individual: true,
         };
      }
      // SMS Button Listener
      const that = this;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
         "get-sign-in-code",
         {
            size: "invisible",
            callback: (response) => {
               // reCAPTCHA solved, allow signInWithPhoneNumber.
               console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
               that.token = response;
               that.sendSMS();
            },
         }
      );

      window.recaptchaVerifier.render().then((widgetId) => {
         window.recaptchaWidgetId = widgetId;
      });
   },
};
</script>
