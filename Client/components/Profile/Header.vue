<template>
   <div>
      <b-row class="align-items-center">
         <b-col cols="12" sm="6" md="4">
            <!-- Pic -->
            <div class="text-center mb-5">
               <!-- <img :src="user.pic" alt="" class="k-user-pic" /> -->
               <KFileImage
                  v-model="pic"
                  size="250"
                  class="d-flex justify-content-center"
                  rouded
                  @input="hChangePic"
               >
                  Logo
               </KFileImage>
            </div>
            <!-- Qualified Investor? -->
            <div class="d-flex flex-column align-items-center text-nowrap">
               <p class="text-center font-lg mb-1 text-primary">
                  {{ roleName }}
               </p>
               <b-form-checkbox
                  v-if="user.role.includes(1)"
                  :checked="$store.state.auth.user.qualified_investor"
                  name="check-button"
                  size="lg"
                  :disabled="!$store.state.auth.user.admin"
                  switch
                  @change="hQualifiedInvestor"
               >
                  <p
                     class="font-lg"
                     :class="{
                        'text-primary':
                           $store.state.auth.user.qualified_investor,
                        'text-secondary':
                           !$store.state.auth.user.qualified_investor,
                     }"
                  >
                     Nitelikli Yatırımcı mı?
                  </p>
               </b-form-checkbox>
            </div>
         </b-col>
         <b-col cols="12" sm="6" md="8">
            <div>
               <b-row>
                  <b-col cols="12" md="6">
                     <!-- Email -->
                     <div>
                        <b-form-group>
                           <slot name="label">
                              <k-label
                                 label="E-Mail"
                                 :msg="getMessage('email')"
                                 :state="validate('email')"
                              />
                           </slot>
                           <b-form-input
                              :value="user.email"
                              trim
                              placeholder="E-Mail"
                              disabled
                           ></b-form-input>
                        </b-form-group>
                     </div>
                  </b-col>
                  <b-col cols="12" md="6" class="mt-4 mt-sm-5 mt-md-0">
                     <!-- phone -->
                     <div>
                        <k-label
                           label="Phone number"
                           :msg="error.phone"
                           :state="!error.phone"
                        />
                        <b-input-group>
                           <template #prepend>
                              <b-dropdown
                                 :text="form.phone_code"
                                 class="h-500 text-dark bg-white"
                                 variant="outline-secondary"
                                 right
                                 disabled
                              >
                                 <b-dropdown-item
                                    v-for="(item, index) in countries"
                                    :active="item.phoneCode == form.phone_code"
                                    :key="index"
                                    @click="form.phone_code = item.phoneCode"
                                 >
                                    ({{ item.phoneCode }})
                                    {{ item.countryNameEn }}
                                 </b-dropdown-item>
                              </b-dropdown>
                           </template>

                           <b-form-input
                              v-model="form.phone"
                              trim
                              placeholder="Phone number"
                              @keypress="vallidatePhoneNumber"
                              @input="validatePhone"
                              disabled
                           ></b-form-input>
                        </b-input-group>
                     </div>
                  </b-col>
               </b-row>
            </div>
         </b-col>
      </b-row>
   </div>
</template>

<script>
import { mapState } from "vuex";
import countries from "@/utils/country.json";
import { required, email } from "vuelidate/lib/validators";
import { UPDATE_PIC } from "@/api/user";
export default {
   data() {
      return {
         countries,
         error: {
            phone: false,
         },
         form: {
            email: this.$store.state.auth.user.email,
            phone: this.$store.state.auth.user.phone,
            phone_code: this.$store.state.auth.user.phone_code || "+90",
         },
         pic: this.$store.state.auth.user.pic,
      };
   },
   computed: {
      ...mapState("auth", ["user"]),
      roleName: function () {
         if (this.user.role.includes(1) && this.user.role.includes(1)) {
            return "Investor & Enterprenur";
         } else if (this.user.role.includes(1)) {
            return "Investor";
         } else {
            return "Enterprenur";
         }
      },
   },
   validations: {
      form: {
         email: {
            required,
            email,
         },
      },
   },
   methods: {
      vallidatePhoneNumber(e) {
         if (!this.form.phone) return true;
         const charCode = e.which ? e.which : e.keyCod;
         const phoneNumber = this.form.phone.replace(/\s/g, "");
         if (phoneNumber.length >= 10) {
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
         // console.log(phoneNumber);
         if (!phoneNumber) this.error.phone = false;
         if (phoneNumber.length < 10) {
            this.error.phone = this.$t("valid.min.string", [10]);
         } else this.error.phone = false;
      },
      validateEP() {
         return true;
      },
      async hChangePic(pic) {
         const res = await this.$apollo
            .mutate({
               mutation: UPDATE_PIC,
               variables: { pic },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            })
            .finally(() => {});
         if (res?.data?.update_pic) {
            this.$store.dispatch("auth/setUser", res.data.update_pic);
            this.successMsg("Successfully changed");
         }
      },
      hQualifiedInvestor() {
         this.$store.dispatch("auth/qualify").then(() => {
            this.successMsg();
         });
      },
   },
};
</script>
