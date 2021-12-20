<template>
   <div v-if="thread">
      <!-- thread -->
      <div class="d-flex">
         <div class="mr-2">
            <b-avatar :src="thread.user.pic" size="50"></b-avatar>
         </div>
         <div>
            <h5>{{ thread.title }}</h5>
            <p class="text-secondary mb-2">
               {{ $moment(thread.createdAt).format("DD.MM.YYYY HH:mm") }}
            </p>
            <p class="text-secondary">{{ thread.content }}</p>
         </div>
      </div>
      <hr />
      <!-- Reply -->
      <div class="ml-5 mb-5">
         <div
            v-for="item in thread.answers"
            :key="item._id"
            class="d-flex py-2 mb-4"
            :class="{
               'flex-row-reverse':
                  item.user._id == gsv($store.state.auth, ['user', '_id']),
            }"
         >
            <div class="d-flex">
               <b-avatar :src="item.user.pic" size="45"></b-avatar>
               <div class="pl-2">
                  <p>{{ item.user.name_first }} {{ item.user.name_last }}</p>
                  <p class="text-secondary">
                     {{ $moment(item.createdAt).format("DD.MM.YYYY HH:mm") }}
                  </p>
               </div>
            </div>
            <p
               class="text-primary flex-1 ml-2 border p-2 rounded"
               :class="`${
                  item.user._id == gsv($store.state.auth, ['user', '_id'])
                     ? 'mr-2'
                     : 'ml-2'
               }`"
            >
               {{ item.content }}
            </p>
         </div>
      </div>
      <!-- create answer-->
      <div class="d-flex flex-wrap">
         <div class="flex-1" style="min-width: 300px">
            <b-form-textarea
               v-model="content"
               rows="4"
               placeholder="message"
               :state="!content_error"
               @change="
                  content ? (content_error = false) : (content_error = true)
               "
            >
            </b-form-textarea>
         </div>
         <div class="mx-auto pl-5" style="max-width: 300px">
            <b-overlay
               :show="loading1"
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
                  <span class="menu-text">Send Message</span>
               </b-button>
            </b-overlay>
         </div>
      </div>
   </div>
</template>

<script>
import { THREAD, DISCUSS_ANSWER_CREATE } from "@/api/discuss";
export default {
   data() {
      return {
         thread: null,
         loading: false,
         loading1: false,
         content: "",
         content_error: false,
      };
   },
   methods: {
      async getInfo() {
         this.loading = true;
         const res = await this.$apollo
            .query({
               query: THREAD,
               variables: {
                  _id: this.$route.params.thread,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               console.log(error);
            });
         if (res?.data?.thread) {
            this.thread = res.data.thread;
         }
         this.loading = false;
      },
      async hSubmit() {
         if (!this.content) {
            this.content_error = true;
            return false;
         } else {
            this.content_error = false;
         }
         this.loading1 = true;
         const res = await this.$apollo
            .mutate({
               mutation: DISCUSS_ANSWER_CREATE,
               variables: {
                  thread_id: this.$route.params.thread,
                  content: this.content,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               console.log(error);
            });
         this.loading1 = false;
         if (res?.data?.discuss_answer_create) {
            this.successMsg("Successfully Created!");
            this.content = "";
            this.getInfo();
         }
      },
   },
   created() {
      this.getInfo();
   },
};
</script>