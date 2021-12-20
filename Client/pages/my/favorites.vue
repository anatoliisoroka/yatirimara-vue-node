<template>
   <div>
      <div class="w-max-1000">
         <ProfileHeader />
      </div>
      <b-overlay :show="loading" no-wrap> </b-overlay>
      <NoData v-if="!loading && !follows.length" />
      <div class="d-flex flex-wrap k-campaign-box mt-5">
         <div
            class="k-campaign-card bg-white rounded mb-5 d-flex flex-column"
            v-for="item in follows"
            :key="item._id"
            @click="$router.push(`/kampanyalar/${item._id}`)"
         >
            <div
               class="k-campaign-bg rounded-lg"
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
            </div>
            <div class="d-flex flex-column justify-content-between flex-1 p-3">
               <div>
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
               <div class="mt-4">
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
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   computed: {
      ...mapState("campaign", ["follows", "loading"]),
   },
   mounted() {
      this.$store.dispatch("campaign/getFollows");
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
      img,
      video {
         width: 100%;
      }
   }
   .k-campaign-card {
      width: 360px;
      margin-right: 10px;
      margin-left: 10px;
      cursor: pointer;
   }
}
</style>