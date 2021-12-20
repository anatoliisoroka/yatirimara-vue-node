<template>
   <div>
      <div class="w-max-1000">
         <ProfileHeader />
      </div>
      <div class="mt-5">
         <!-- Create Button -->
         <div class="">
            <nuxt-link
               to="/campaigns/create"
               class="btn btn-primary d-flex align-items-center ml-auto"
               style="max-width: 200px"
            >
               <div
                  class="rounded-full bg-white p-1"
                  style="width: 24px; height: 24px"
               >
                  <svg-icon
                     name="plus"
                     width="16"
                     color="var(--purple)"
                  ></svg-icon>
               </div>
               <span class="pl-2">Create Campaign</span>
            </nuxt-link>
         </div>

         <div v-if="mine.total == 0 && !loading">
            You have not created any campaigns yet..
         </div>
         <div class="d-flex flex-wrap k-campaign-box mt-4">
            <div
               class="
                  k-campaign-card
                  bg-white
                  rounded
                  mb-5
                  d-flex
                  flex-column
               "
               v-for="item in mine.items"
               :key="item._id"
            >
               <div
                  class="k-campaign-bg rounded"
                  :style="`background-color: gray`"
               >
                  <div v-if="item.bg">
                     <b-img
                        v-if="
                           ['jpg', 'png', 'jpeg', 'webp'].includes(
                              fileExt(item.bg)
                           )
                        "
                        :src="item.bg"
                     ></b-img>
                     <video v-else autoplay="autoplay" loop muted>
                        <source :src="item.bg" />
                     </video>
                  </div>
                  <div
                     class="
                        d-flex
                        justify-content-between
                        align-items-center
                        p-3
                        title
                     "
                  >
                     <p class="p-2 mr-3">
                        <svg-icon name="calendar" width="15"></svg-icon> Created
                        {{ $moment(item.createdAt).format("DD.MM.YYYY HH:mm") }}
                     </p>
                     <div v-html="getStatus(item)['html']"></div>
                  </div>
               </div>
               <div class="d-flex flex-column justify-content-between flex-1">
                  <div class="p-3">
                     <!-- pregress bar -->
                     <KProgress
                        :value="Math.round((item.progress || 0) * 1000) / 10"
                        show-value
                     />
                     <div class="d-flex justify-content-between">
                        <p class="text-secondary" v-if="item.event_end">
                           <KTimeLeft :value="item.event_end" />
                           kaldı
                        </p>
                        <p v-else class="text-secondary">Not started yet</p>
                        <p>
                           Hedef
                           <span class="font-weight-bold">{{
                              gsv(item, ["fund", "amount"], 0) | formatN
                           }}</span>
                           ₺
                        </p>
                     </div>
                     <div class="mt-3">
                        <b-img
                           class="float-left mr-2 shadow"
                           :src="item.logo"
                           width="75"
                           height="75"
                           rounded
                        ></b-img>
                        <div class="flex-1">
                           <h5>{{ item.name }}</h5>
                           <div class="text-secondary mt-2">
                              {{ item.description }}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="text-center mt-5 mb-3">
                     <b-button
                        variant="outline-primary"
                        class="px-6 py-3"
                        @click="$router.push('/campaigns/' + item._id)"
                     >
                        Review
                     </b-button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import MixinStatus from "@/mixins/status";
export default {
   mixins: [MixinStatus],
   data() {
      return {
         loading: false,
         status: ["New", "Requested", "Pending", "In-funding", "Closed"],
      };
   },
   computed: {
      ...mapState("campaign", ["mine"]),
   },
   created() {
      this.$store.dispatch("campaign/getMyCampaigns");
   },
};
</script>
<style lang="scss" scoped>
.k-campaign-box {
   margin-right: -10px;
   margin-left: -10px;
   overflow: hidden;
   .k-campaign-bg {
      height: 190px;
      background-size: cover;
      background-position: center;
      overflow: hidden;
      position: relative;
      .title {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
      }
      img,
      video {
         width: 100%;
      }
      p {
         background: #fdfefeaf;
         height: max-content;
         padding: 5px;
         border-radius: 5px;
      }
   }
   .k-campaign-card {
      width: 360px;
      margin-right: 10px;
      margin-left: 10px;
   }
}
</style>
