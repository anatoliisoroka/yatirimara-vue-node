<template>
   <div>
      <b-row>
         <b-col
            cols="12"
            lg="6"
            v-for="thread in threads"
            :key="thread._id"
            class="mb-4"
         >
            <nuxt-link
               class="
                  d-block
                  text-decoration-none
                  border
                  rounded
                  p-3
                  h-100
                  thread-item
               "
               :to="`/kampanyalar/${$route.params.id}/discuss/${thread._id}`"
            >
               <p class="text-primary font-weight-bold">{{ thread.title }}</p>
               <p class="text-secondary mb-2">
                  {{ $moment(thread.createdAt).format("DD.MM") }} /
                  {{ thread.answer_count }} Reply
               </p>
               <p class="text-line-2 text-dark">
                  {{ thread.content }}
               </p>
            </nuxt-link>
         </b-col>
         <b-col cols="12" lg="6" class="align-self-center mb-4">
            <b-button
               size="lg"
               variant="primary"
               class="d-flex align-items-center ml-auto"
               style="max-width: 300px"
               @click="dlg = true"
            >
               <div
                  class="
                     rounded-full
                     bg-white
                     d-flex
                     align-items-center
                     justify-content-center
                  "
                  style="min-width: 20px; min-height: 20px"
               >
                  <svg-icon
                     name="plus"
                     width="14"
                     color="var(--purple)"
                  ></svg-icon>
               </div>
               <span class="pl-2">Start a New Discussion</span>
            </b-button>
         </b-col>
      </b-row>
      <b-modal
         v-model="dlg"
         centered
         hide-footer
         title-class="text-center"
         title="New Discussion"
         no-close-on-backdrop
         size="lg"
      >
         <!-- name -->
         <b-form-group class="mb-2">
            <slot name="label">
               <k-label
                  label=" "
                  :msg="getMessage('title')"
                  :state="validate('title')"
               />
            </slot>
            <b-form-input
               v-model="$v.form.title.$model"
               placeholder="Title"
            ></b-form-input>
         </b-form-group>
         <!-- name -->
         <b-form-group class="mb-10">
            <slot name="label">
               <k-label
                  label=" "
                  :msg="getMessage('content')"
                  :state="validate('content')"
               />
            </slot>
            <b-form-textarea
               v-model="$v.form.content.$model"
               trim
               placeholder="Content"
               rows="5"
            ></b-form-textarea>
         </b-form-group>

         <!-- btn -->
         <div class="mx-auto" style="max-width: 300px">
            <b-overlay
               :show="loading"
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
               >
                  <span class="menu-text">Create new discuss</span>
               </b-button>
            </b-overlay>
         </div>
      </b-modal>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import { DISCUSS_THREAD_CREATE } from "@/api/discuss";
export default {
   data() {
      return {
         dlg: false,
         loading: false,
         form: {
            title: "",
            content: "",
         },
      };
   },
   validations: {
      form: {
         title: { required },
         content: { required },
      },
   },
   computed: {
      ...mapState("campaign", ["event"]),
      ...mapState("discuss", ["threads", "_id"]),
   },
   methods: {
      async hSubmit() {
         if (this.anyError()) return false;

         const res = await this.$apollo
            .mutate({
               mutation: DISCUSS_THREAD_CREATE,
               variables: {
                  campaign_id: this.$route.params.id,
                  ...this.form,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               console.log(error);
            });
         if (res?.data?.discuss_thread_create) {
            this.successMsg("Successfully Created!");
            this.dlg = false;
            this.form = {
               title: "",
               content: "",
            };
            this.$v.$reset();
            this.$store.dispatch("discuss/getThreads", this.$route.params.id);
            this.dlg = false;
         }
      },
   },
   created() {
      if (!this.threads || this._id != this.$route.params.id) {
         this.$store.dispatch("discuss/getThreads", this.$route.params.id);
      }
   },
};
</script>
<style lang="scss" scoped>
.thread-item {
   cursor: pointer;
   box-shadow: 0px 2px 7px #e2e2e2;
   &:hover {
      background: wheat;
   }
}
</style>