<template>
   <div class="w-max-1000">
      <ProfileHeader />
      <!-- Tabs -->
      <div class="mt-10">
         <b-row>
            <b-col>
               <b-button
                  class="w-100 mb-2"
                  size="lg"
                  :variant="active == 0 ? 'primary' : 'warning'"
                  :class="{ 'btn-shadow': active == 0 }"
                  @click="setActive(0)"
                  >Update Password</b-button
               >
            </b-col>
            <b-col>
               <b-button
                  class="w-100 mb-2"
                  size="lg"
                  :variant="active == 1 ? 'primary' : 'warning'"
                  :class="{ 'btn-shadow': active == 1 }"
                  @click="setActive(1)"
                  >E-Government verification</b-button
               >
            </b-col>

            <b-col>
               <b-button
                  class="w-100 mb-2"
                  size="lg"
                  :variant="active == 2 ? 'primary' : 'warning'"
                  :class="{ 'btn-shadow': active == 2 }"
                  @click="setActive(2)"
                  >Account Logs</b-button
               >
            </b-col>
         </b-row>
      </div>
      <!-- Tab content -->
      <div class="mt-5 mt-sm-14">
         <!-- Password Update -->
         <div v-if="active == 0">
            <b-row>
               <b-col cols="12" sm="4" class="mb-5">
                  <b-form-group>
                     <slot name="label">
                        <k-label
                           label="Current Password"
                           :msg="getMessage('password')"
                           :state="validate('password')"
                        />
                     </slot>
                     <b-form-input
                        v-model="$v.form.password.$model"
                        trim
                        placeholder="Current Password"
                        type="password"
                     ></b-form-input>
                  </b-form-group>
               </b-col>
               <!-- new password -->
               <b-col cols="12" sm="4" class="mb-5">
                  <b-form-group>
                     <slot name="label">
                        <k-label
                           label="New Password"
                           :msg="getMessage('password_new')"
                           :state="validate('password_new')"
                        />
                     </slot>
                     <b-form-input
                        v-model="$v.form.password_new.$model"
                        trim
                        placeholder="New Password"
                        type="password"
                     ></b-form-input>
                  </b-form-group>
               </b-col>
               <b-col cols="12" sm="4" class="mb-5">
                  <b-form-group>
                     <slot name="label">
                        <k-label
                           label="Confirm Password"
                           :msg="getMessage('password_confirm')"
                           :state="validate('password_confirm')"
                        />
                     </slot>
                     <b-form-input
                        v-model="$v.form.password_confirm.$model"
                        trim
                        placeholder="Confirm Password"
                        type="password"
                     ></b-form-input>
                  </b-form-group>
               </b-col>
            </b-row>
            <div class="text-center mt-10">
               <b-button
                  class="my-2 btn-shadow"
                  size="lg"
                  variant="primary"
                  style="width: 250px"
                  @click="hChangePassword"
                  >Save</b-button
               >
            </div>
         </div>
         <!-- ID verification -->
         <div v-else-if="active == 1">
            <div class="d-flex align-items-center mb-5">
               <div class="k-checked-icon bg-success">
                  <svg-icon name="checked" color="white" width="16"></svg-icon>
               </div>
               <p class="pl-4">Your Account Has Been Verified by goverment</p>
            </div>
            <div class="d-flex align-items-center mb-5">
               <div class="k-checked-icon bg-danger">
                  <svg-icon name="checked" color="white" width="16"></svg-icon>
               </div>
               <p class="pl-4">Not verified</p>
            </div>
            <div class="d-flex align-items-center mb-5 hover">
               <div class="k-checked-icon bg-primary">
                  <svg-icon name="plus" color="white" width="16"></svg-icon>
               </div>
               <p class="pl-4">Perform e-Government verification</p>
            </div>
         </div>
         <!-- Access Logs -->
         <div v-else>
            <b-table
               hover
               bordered
               :items="items"
               :fields="fields"
               stacked="sm"
               class="bg-white rounded"
            >
               <template #cell(status)="{ item }">
                  <div class="d-flex align-items-center mb-5" v-if="item.status">
                     <div class="k-checked-icon bg-success" style="width: 16px; height: 16px">
                        <svg-icon name="checked" color="white" width="12"></svg-icon>
                     </div>
                     <p class="pl-2">Success</p>
                  </div>
                  <div class="d-flex align-items-center mb-5" v-else>
                     <div class="k-checked-icon bg-danger" style="width: 16px; height: 16px">
                        <svg-icon name="checked" color="white" width="12"></svg-icon>
                     </div>
                     <p class="pl-2">Failed</p>
                  </div>
               </template>
            </b-table>
         </div>
      </div>
   </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { auth } from "@/utils/firebase";
import { mapState } from "vuex";
export default {
   data() {
      return {
         active: 0,
         form: {
            password: "",
            password_new: "",
            password_confirm: "",
         },
         query: {
            limit: 10,
            page: 1,
         },
         fields: [
            {
               key: "createdAt",
               label: "Date",
               formatter: (v) => {
                  return this.$moment(v).format("DD-MM-YYYY HH:mm");
               },
            },
            {
               key: "ip",
               label: "IP Address",
            },
            {
               key: "browser",
               label: "Browser",
            },
            {
               key: "status",
               label: "Status",
            },
         ],
      };
   },
   computed: {
      ...mapState("logs", ["total", "items"]),
   },
   validations: {
      form: {
         password: { required },
         password_new: { required, minLength: minLength(4) },
         password_confirm: {
            required,
            minLength: minLength(4),
            sameAs: sameAs("password_new"),
         },
      },
   },
   methods: {
      async hChangePassword() {
         var isConfirmed = false;
         if (this.anyError()) return;
         else {
            await auth
               .signInWithEmailAndPassword(this.$store.state.auth.user.email, this.form.password)
               .then(() => {
                  isConfirmed = true;
               })
               .catch((error) => {
                  this.errorMsg(error.message);
               });
            if (isConfirmed) {
               auth.currentUser
                  .updatePassword(this.form.password_new)
                  .then(() => {
                     this.successMsg();
                  })
                  .catch((error) => {});
            }
         }
      },
      setActive(active) {
         this.active = active;
         if (active == 2 && !this.total) {
            this.$store.dispatch("logs/get_logs", this.query);
         }
      },
   },
};
</script>
