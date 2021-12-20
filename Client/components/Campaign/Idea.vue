<template>
   <div class="p-2 mt-5 w-max-1000" v-if="!error">
      <div class="d-flex flex-column flex-md-row">
         <div class="px-2">
            <KFile
               v-model="form.idea_file"
               :file1.sync="form.bg"
               size="150"
               class="d-flex justify-content-center"
               accept=".mp4, .webm, .jpg, .png, .jpeg"
            >
               Add Image or Video
            </KFile>
         </div>
         <div class="flex-1 px-2">
            <!-- idea_title -->
            <b-form-group class="mb-3">
               <slot name="label">
                  <k-label
                     label="Idea Title*"
                     :msg="getMessage('idea_title')"
                     :state="validate('idea_title')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.idea_title.$model"
                  trim
                  placeholder="Idea Title"
                  class="w-100"
               ></b-form-input>
            </b-form-group>
            <!-- idea_title_sub -->
            <b-form-group class="mb-3">
               <slot name="label">
                  <k-label
                     label="Express Your Opinion in One Sentence*"
                     :msg="getMessage('idea_title_sub')"
                     :state="validate('idea_title_sub')"
                  />
               </slot>
               <b-form-input
                  v-model="$v.form.idea_title_sub.$model"
                  trim
                  placeholder="Express Your Opinion in One Sentence"
                  rows="3"
               ></b-form-input>
            </b-form-group>
         </div>
      </div>
      <div class="px-2 mt-5">
         <!-- idea_about -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="About the Idea*"
                  :msg="getMessage('idea_about')"
                  :state="validate('idea_about')"
               />
            </slot>
            <b-form-textarea
               v-model="$v.form.idea_about.$model"
               trim
               placeholder="About the Idea"
               rows="3"
            ></b-form-textarea>
         </b-form-group>
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
import { required } from "vuelidate/lib/validators";
import { CREATE_CAMPAIGN, UPDATE_CAMPAIGN } from "@/api/campaign";
import { ObjGet } from "@/utils";
import { CAMPAIGN } from "@/api/campaign";
export default {
   name: "CampaignIdea",
   data() {
      return {
         loading: false,
         error: false,
         form: {
            idea_file: "",
            bg: "",
            idea_title: "",
            idea_title_sub: "",
            idea_about: "",
         },
      };
   },
   validations: {
      form: {
         idea_title: {
            required,
         },
         idea_title_sub: {
            required,
         },
         idea_about: {
            required,
         },
      },
   },
   methods: {
      onFileChange() {},
      async hSubmit() {
         if (this.anyError()) return false;
         let form = Object.assign({}, this.form);
         if (form.idea_file) delete form.bg;
         const res = await this.$apollo
            .mutate({
               mutation: UPDATE_CAMPAIGN,
               variables: {
                  _id: this.$route.params.id,
                  form,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            });
         if (res?.data?.update_campaign) {
            this.successMsg("Successfully Updated!");
            this.$router.replace({
               name: "campaigns-id",
               params: { id: this.$route.params.id },
               query: { tab: "team" },
            });
         }
      },
      openLink(item) {
         if (item?.url) {
            window.open(window.origin + item.url, "_blank");
         }
      },
      initalizeForm(data) {
         let newform = ObjGet(data, [
            "idea_title",
            "idea_title_sub",
            "idea_about",
            "bg",
         ]);
         newform.idea_file = null;
         this.form = newform;
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
            this.initalizeForm(res.data.campaign);
         } else {
            this.error = true;
         }
      }
   },
};
</script>