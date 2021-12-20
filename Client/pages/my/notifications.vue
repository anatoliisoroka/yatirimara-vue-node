<template>
   <div class="w-max-1000">
      <ProfileHeader />
      <div class="mt-5">
         <div>
            <h4 class="mb-5">E-Mail</h4>
            <div>
               <b-form-checkbox
                  v-model="form.email_week"
                  name="check-button"
                  size="lg"
                  switch
                  @change="handleChange"
                  class="mb-5"
               >
                  <p>I want to follow the weekly Fundraising newsletters via email</p>
               </b-form-checkbox>
               <b-form-checkbox
                  v-model="form.email_company"
                  name="check-button"
                  size="lg"
                  switch
                  @change="handleChange"
                  class="mb-5"
               >
                  <p>
                     I would like to be informed about the updates about the venture company I
                     invested in, via e-mail.
                  </p>
               </b-form-checkbox>
               <b-form-checkbox
                  v-model="form.email_project"
                  name="check-button"
                  size="lg"
                  switch
                  @change="handleChange"
                  class="mb-10"
               >
                  <p>
                     I want to be informed about the updates made in the projects I follow via
                     e-mail.
                  </p>
               </b-form-checkbox>
            </div>
            <h4 class="mb-5">SMS</h4>
            <div>
               <b-form-checkbox
                  v-model="form.sms"
                  name="check-button"
                  size="lg"
                  switch
                  @change="handleChange"
               >
                  <p>I want to follow the weekly Fundraising newsletters via SMS</p>
               </b-form-checkbox>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import profile from "@/mixins/profile";
export default {
   mixins: [profile],
   data() {
      return {
         monthlyTemp: true,
         form: {
            email_week: this.$store.state.auth.user.notification?.email_week || "",
            email_company: this.$store.state.auth.user.notification?.email_company || "",
            email_project: this.$store.state.auth.user.notification?.email_project || "",
            sms: this.$store.state.auth.user.notification?.sms || "",
         },
      };
   },
   methods: {
      handleChange() {
         this.hSubmit({ notification: this.form });
      },
   },
   mounted() {
      this.$store.dispatch("auth/me").then((res) => {
         this.form = {
            email_week: res.notification.email_week,
            email_company: res.notification.email_company,
            email_project: res.notification.email_project,
            sms: res.notification.sms,
         };
      });
   },
};
</script>