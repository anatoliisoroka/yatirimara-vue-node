<template>
   <div class="p-2 mt-5" v-if="!error">
      <div class="px-2">
         <div class="k-card-box">
            <draggable
               v-model="members"
               draggable=".k-card-member"
               class="k-card-box"
               @change="handleOrder"
            >
               <div
                  class="k-card-member w-sm-100 p-2 text-center"
                  v-for="item in members"
                  :key="item.id"
               >
                  <div class="text-center">
                     <b-avatar :src="item.pic" size="10rem"></b-avatar>
                  </div>
                  <h6 class="mt-1">{{ item.name }} {{ item.name_last }}</h6>
                  <p class="my-1">
                     <span class="text-secondary">Position:</span>
                     {{ item.position }}
                  </p>
                  <div class="text-center" v-if="item.resume">
                     <a
                        :href="item.resume"
                        target="_blank"
                        class="d-inline-block rounded-full p-1"
                        style="
                           width: 36px;
                           height: 36px;
                           border: 2px solid var(--danger);
                        "
                     >
                        <svg-icon
                           name="resume"
                           color="var(--danger)"
                           width="25"
                        ></svg-icon>
                     </a>
                  </div>
                  <div class="k-edit-btn">
                     <b-button variant="primary" pill @click="hEdit(item)">
                        <svg-icon
                           name="edit"
                           width="20"
                           color="white"
                        ></svg-icon>
                        Edit
                     </b-button>
                     <b-button variant="danger" pill @click="hDel(item._id)">
                        <svg-icon
                           name="delete"
                           width="20"
                           color="white"
                        ></svg-icon>
                     </b-button>
                  </div>
               </div>
            </draggable>
            <div
               class="rounded-fill bg-white px-3 k-card-member k-card-add"
               @click="createDlg"
            >
               <div>
                  <p class="text-center">
                     <svg-icon name="plus" width="30"></svg-icon>
                  </p>
                  <p class="text-center mt-5">Add TeamMember</p>
               </div>
            </div>
         </div>
      </div>

      <b-modal
         v-model="dlg"
         ref="sms"
         centered
         hide-footer
         title-class="text-center"
         title="Add Team Member"
         no-close-on-backdrop
         size="lg"
      >
         <!-- User -->
         <div class="d-flex flex-column flex-md-row mb-5">
            <KFileImage
               v-model="form.file"
               size="200"
               rouded
               class="d-flex justify-content-center mb-3"
            >
               <p class="text-center">Team Member Photo</p>
               <k-label
                  label=" "
                  :msg="getMessage('file')"
                  :state="validate('file')"
               />
            </KFileImage>
            <b-row class="flex-1 ml-0 ml-md-4">
               <b-col sm="12" md="6">
                  <!-- name -->
                  <b-form-group class="mb-2">
                     <slot name="label">
                        <k-label
                           label="Name*"
                           :msg="getMessage('name')"
                           :state="validate('name')"
                        />
                     </slot>
                     <b-form-input
                        v-model="$v.form.name.$model"
                        trim
                        placeholder="Biography*"
                        rows="3"
                     ></b-form-input>
                  </b-form-group>
               </b-col>
               <b-col sm="12" md="6">
                  <!-- name -->
                  <b-form-group class="mb-2">
                     <slot name="label">
                        <k-label
                           label="Soyad*"
                           :msg="getMessage('name_last')"
                           :state="validate('name_last')"
                        />
                     </slot>
                     <b-form-input
                        v-model="$v.form.name_last.$model"
                        trim
                        placeholder="Soyad"
                        rows="3"
                     ></b-form-input>
                  </b-form-group>
               </b-col>
               <b-col sm="12">
                  <!-- name -->
                  <b-form-group class="mb-2">
                     <slot name="label">
                        <k-label
                           label="Position*"
                           :msg="getMessage('position')"
                           :state="validate('position')"
                        />
                     </slot>
                     <b-form-input
                        v-model="$v.form.position.$model"
                        trim
                        placeholder="Position"
                        rows="3"
                     ></b-form-input>
                  </b-form-group>
               </b-col>
               <b-col sm="12">
                  <!-- resume -->
                  <k-label label="Resume*" />
                  <div>
                     <div
                        v-if="form.resume_file || form.resume"
                        class="
                           d-flex
                           justify-content-between
                           align-items-center
                        "
                     >
                        <p v-if="form.resume_file">
                           {{ form.resume_file.name }}
                        </p>
                        <p v-else>{{ form.resume }}</p>
                        <button
                           class="close"
                           @click="
                              form.resume_file = null;
                              form.resume = '';
                           "
                        >
                           ×
                        </button>
                     </div>
                  </div>
                  <div v-if="!form.resume_file && !form.resume">
                     <b-form-file
                        v-model="form.resume_file"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                     ></b-form-file>
                  </div>
               </b-col>
            </b-row>
         </div>
         <!-- content -->
         <div class="w-max-1000">
            <div class="px-2 mt-5">
               <!-- Team Description -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Biography*"
                        :msg="getMessage('description')"
                        :state="validate('description')"
                     />
                  </slot>
                  <b-form-textarea
                     v-model="$v.form.description.$model"
                     trim
                     placeholder="Biography*"
                     rows="3"
                  ></b-form-textarea>
               </b-form-group>
               <!-- duty -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Duties and Responsibilities Assumed in the Company*"
                        :msg="getMessage('duty')"
                        :state="validate('duty')"
                     />
                  </slot>
                  <b-form-input
                     v-model="$v.form.duty.$model"
                     trim
                     placeholder="Duties and Responsibilities Assumed in the Company"
                     rows="3"
                  ></b-form-input>
               </b-form-group>
               <!-- Area experience -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Area of ​​Expertise and Professional Experience*"
                        :msg="getMessage('area_experience')"
                        :state="validate('area_experience')"
                     />
                  </slot>
                  <b-form-input
                     v-model="$v.form.area_experience.$model"
                     trim
                     placeholder="Area of ​​Expertise and Professional Experience"
                     rows="3"
                  ></b-form-input>
               </b-form-group>
               <!-- Source Relationship -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Source of Relationship with Entrepreneur*"
                        :msg="getMessage('source_relationship')"
                        :state="validate('source_relationship')"
                     />
                  </slot>
                  <b-form-input
                     v-model="$v.form.source_relationship.$model"
                     trim
                     placeholder="Source of Relationship with Entrepreneur"
                     rows="3"
                  ></b-form-input>
               </b-form-group>
            </div>
            <!-- Social -->
            <div
               class="
                  grid grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  align-items-center
                  mt-10
                  px-2
               "
               style="gap: 30px"
            >
               <!-- mail -->
               <div>
                  <b-input-group>
                     <b-input-group-prepend>
                        <div class="k-social-pre border">
                           <svg-icon
                              name="google"
                              original
                              width="16"
                           ></svg-icon>
                        </div>
                     </b-input-group-prepend>
                     <b-form-input
                        v-model="form.social_google"
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
                           <svg-icon
                              name="twitter"
                              original
                              width="18"
                           ></svg-icon>
                        </div>
                     </b-input-group-prepend>
                     <b-form-input
                        v-model="form.social_twitter"
                        trim
                        placeholder="/User name"
                     ></b-form-input>
                  </b-input-group>
               </div>
               <!-- Facebook -->
               <div>
                  <b-input-group>
                     <b-input-group-prepend>
                        <div class="k-social-pre border">
                           <svg-icon
                              name="facebook"
                              original
                              width="10"
                           ></svg-icon>
                        </div>
                     </b-input-group-prepend>
                     <b-form-input
                        v-model="form.social_facebook"
                        trim
                        placeholder="User name"
                     ></b-form-input>
                  </b-input-group>
               </div>
               <!-- Instagram -->
               <div>
                  <b-input-group>
                     <b-input-group-prepend>
                        <div class="k-social-pre border">
                           <svg-icon
                              name="instagram"
                              original
                              width="20"
                           ></svg-icon>
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
                           <svg-icon
                              name="linkedin"
                              color="#007AB5"
                              width="20"
                           ></svg-icon>
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
                           <svg-icon
                              name="youtube"
                              color="#FD3832"
                              width="20"
                           ></svg-icon>
                        </div>
                     </b-input-group-prepend>
                     <b-form-input
                        v-model="form.social_youtube"
                        trim
                        placeholder="User name"
                     ></b-form-input>
                  </b-input-group>
               </div>
            </div>
         </div>
         <!-- btn -->
         <b-row class="mt-5">
            <b-col cols="12" sm="6">
               <b-button
                  class="w-100 my-2"
                  size="lg"
                  variant="outline-primary"
                  @click="dlg = false"
               >
                  Cancel
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
                     class="w-100 shadow"
                     variant="primary"
                     size="lg"
                     @click="hSubmit"
                  >
                     <span class="menu-text">Confirm</span>
                  </b-button>
               </b-overlay>
            </b-col>
         </b-row>
      </b-modal>
   </div>   
   <NoData v-else-if="!loading" />
</template>

<script>
import { required } from "vuelidate/lib/validators";
import draggable from "vuedraggable";
import {
   UPSERT_TEAM_MEMBER,
   CAMPAIGN,
   TEAM_MEMBER_DELETE,
   TEAM_MEMBER_ORDERS,
} from "@/api/campaign";
export default {
   name: "CampaignTeam",
   components: { draggable },
   data() {
      return {
         loading: false,
         error: false,
         fileList: [],
         form: {
            name: "",
            name_last: "",
            position: "",
            resume: "",
            description: "",
            duty: "",
            area_experience: "",
            source_relationship: "",
            social_facebook: "",
            social_linkedin: "",
            social_twitter: "",
            social_google: "",
            social_instagram: "",
            social_youtube: "",
            file: null,
            resume_file: null,
         },
         members: [],
         busyAction: false,
         dlg: false,
      };
   },
   validations: {
      form: {
         name: { required },
         name_last: { required },
         position: { required },
         description: { required },
         duty: { required },
         area_experience: { required },
         source_relationship: { required },
         file: { required },
      },
   },
   methods: {
      createDlg() {
         this.form = {
            name: "",
            name_last: "",
            position: "",
            resume: "",
            description: "",
            duty: "",
            area_experience: "",
            source_relationship: "",
            social_facebook: "",
            social_linkedin: "",
            social_twitter: "",
            social_google: "",
            social_instagram: "",
            social_youtube: "",
            file: null,
            resume_file: null,
         };
         this.$v.$reset();
         this.dlg = true;
      },
      hEdit(item) {
         this.form = {
            ...item,
            file: item.pic,
            resume_file: null,
            resume: item.resume,
         };
         delete this.form.pic;
         this.dlg = true;
      },
      async hDel(_id) {
         const res = await this.$apollo
            .mutate({
               mutation: TEAM_MEMBER_DELETE,
               variables: {
                  _id,
                  campaign_id: this.$route.params.id,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            });
         if (res?.data?.errors) {
            this.errorMsg();
         } else if (res?.data?.team_member_delete) {
            this.successMsg("Successfully Deleted!");
            if (res.data.team_member_delete.data?.team)
               this.members = res.data.team_member_delete.data.team;
         }
      },
      async hSubmit() {
         if (this.anyError()) return false;
         let form = { ...this.form };
         if (/\/files\//.test(form.file)) {
            delete form.file;
         }
         if (/\/files\//.test(form.resume_file)) {
            delete form.resume_file;
         }
         const res = await this.$apollo.mutate({
            mutation: UPSERT_TEAM_MEMBER,
            variables: {
               _id: this.$route.params.id,
               form,
            },
            fetchPolicy: "no-cache",
         });
         if (res?.data?.upsert_team_member) {
            if (this.form._id) this.successMsg("Successfully Updated!");
            else this.successMsg("Successfully Added!");
            this.members = res.data.upsert_team_member.team || [];
            this.dlg = false;
         }
      },
      handleOrder() {
         const order_ids = this.members.map((el) => el._id);
         // console.log(order_ids);
         this.$apollo.mutate({
            mutation: TEAM_MEMBER_ORDERS,
            variables: {
               campaign_id: this.$route.params.id,
               order_ids,
            },
            fetchPolicy: "no-cache",
         });
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
            this.members = res.data.campaign.team;
         } else {
            this.error = true;
         }
      }
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
.k-card-box {
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
   .k-card-member {
      width: 180px;
      height: 260px;
      border-radius: 10px;
      background: white;
      margin-bottom: 10px;
      margin-right: 10px;
      margin-left: 10px;
      position: relative;
      cursor: move;
      .k-edit-btn {
         position: absolute;
         top: 10px;
         right: 10px;
         display: none;
      }
      &:hover .k-edit-btn {
         display: block;
      }
   }
}
.k-card-add {
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
}
</style>