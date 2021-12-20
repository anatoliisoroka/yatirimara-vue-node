<template>
   <div class="w-max-1000">
      <ProfileHeader />

      <div
         class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 align-items-center mt-5"
         style="gap: 30px"
      >
         <!-- Name -->
         <div>
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
         </div>
         <!-- Name First -->
         <div>
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
         </div>
         <!-- Sex -->
         <div>
            <b-form-group>
               <slot name="label">
                  <k-label label="Gender" />
               </slot>
               <b-form-select
                  v-model="form.sex"
                  :options="[
                     { text: 'Male', value: 'male' },
                     { text: 'Female', value: 'female' },
                  ]"
               >
               </b-form-select>
            </b-form-group>
         </div>
         <!-- academic_title -->
         <div>
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
         </div>
         <!-- www -->
         <div>
            <b-form-group>
               <slot name="label">
                  <k-label
                     label="Website"
                     :msg="getMessage('website')"
                     :state="validate('website')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.website.$model"
                  trim
                  placeholder="Website"
               ></b-form-input>
            </b-form-group>
         </div>
      </div>
      <!-- Social -->
      <div
         class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 align-items-center mt-10"
         style="gap: 30px"
      >
         <!-- mail -->
         <div>
            <b-input-group>
               <b-input-group-prepend>
                  <div class="k-social-pre border">
                     <svg-icon name="google" original width="16"></svg-icon>
                  </div>
               </b-input-group-prepend>
               <b-form-input
                  v-model="form.social_mail"
                  trim
                  placeholder="/User name"
               ></b-form-input>
            </b-input-group>
         </div>
         <!-- twitter -->
         <div>
            <b-input-group>
               <b-input-group-prepend>
                  <div class="k-social-pre border">
                     <svg-icon name="twitter" original width="18"></svg-icon>
                  </div>
               </b-input-group-prepend>
               <b-form-input
                  v-model="form.social_twitter"
                  trim
                  placeholder="User name"
               ></b-form-input>
            </b-input-group>
         </div>
         <!-- Facebook -->
         <div>
            <b-input-group>
               <b-input-group-prepend>
                  <div class="k-social-pre border">
                     <svg-icon name="facebook" original width="10"></svg-icon>
                  </div>
               </b-input-group-prepend>
               <b-form-input
                  v-model="form.social_facebook"
                  trim
                  placeholder="/User name"
               ></b-form-input>
            </b-input-group>
         </div>
         <!-- Instagram -->
         <div>
            <b-input-group>
               <b-input-group-prepend>
                  <div class="k-social-pre border">
                     <svg-icon name="instagram" original width="20"></svg-icon>
                  </div>
               </b-input-group-prepend>
               <b-form-input
                  v-model="form.social_instagram"
                  trim
                  placeholder="User name"
               ></b-form-input>
            </b-input-group>
         </div>
         <!-- LinkedIn -->
         <div>
            <b-input-group>
               <b-input-group-prepend>
                  <div class="k-social-pre border">
                     <svg-icon name="linkedin" color="#007AB5" width="20"></svg-icon>
                  </div>
               </b-input-group-prepend>
               <b-form-input
                  v-model="form.social_linkedin"
                  trim
                  placeholder="User name"
               ></b-form-input>
            </b-input-group>
         </div>
         <!-- Youtube -->
         <div>
            <b-input-group>
               <b-input-group-prepend>
                  <div class="k-social-pre border">
                     <svg-icon name="youtube" color="#FD3832" width="20"></svg-icon>
                  </div>
               </b-input-group-prepend>
               <b-form-input
                  v-model="form.social_youtube"
                  trim
                  placeholder="/User name"
               ></b-form-input>
            </b-input-group>
         </div>
      </div>

      <!-- Submit -->
      <div class="text-center mt-10">
         <b-button variant="primary" class="shadow" size="lg" style="width: 250px" @click="hSubmitS"
            >Save</b-button
         >
      </div>
   </div>
</template>

<script>
// import { mapState } from "vuex";
import { required, url } from "vuelidate/lib/validators";
import { ObjGet } from "@/utils";
import profile from "@/mixins/profile";
export default {
   name: "MyProfile",
   computed: {},
   mixins: [profile],
   data() {
      return {
         form: {
            name_last: this.$store.state.auth.user.name_last,
            name_first: this.$store.state.auth.user.name_first,
            sex: this.$store.state.auth.user.sex,
            website: this.$store.state.auth.user.website,
            academic: this.$store.state.auth.user.academic,
            social_mail: this.$store.state.auth.user.social_mail,
            social_twitter: this.$store.state.auth.user.social_twitter,
            social_facebook: this.$store.state.auth.user.social_facebook,
            social_instagram: this.$store.state.auth.user.social_instagram,
            social_linkedin: this.$store.state.auth.user.social_linkedin,
            social_youtube: this.$store.state.auth.user.social_youtube,
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
         website: {
            url,
         },
      },
   },
   methods: {
      hSubmitS() {
         if (this.anyError()) return false;
         this.hSubmit(this.form);
      },
   },
   async mounted() {
      const res = await this.$store.dispatch("auth/me");
      if (res)
         this.form = ObjGet(res, [
            "name_last",
            "name_first",
            "sex",
            "academic",
            "website",
            "social_mail",
            "social_twitter",
            "social_facebook",
            "social_linkedin",
            "social_instagram",
            "social_youtube",
         ]);
   },
};
</script>
<style lang="scss" scoped>
.k-social-pre {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   background: white;
   border-top-left-radius: 6px;
   border-bottom-left-radius: 6px;
}
</style>
