<template>
   <div class="container mt-10 d-flex">
      <!-- search bar -->
      <div class="k-sidebar">
         <div class="help-sidebar" :class="{}">
            <FilterEvent v-model="q" @change="hFilter" />
         </div>
         <b-button
            class="k-help-menu"
            variant="primary"
            @click="openedMenuFooter = true"
         >
            <svg-icon name="menu" original width="25"></svg-icon>
         </b-button>
         <!-- Mboild Menu -->
         <b-sidebar
            shadow
            v-model="openedMenuFooter"
            no-header
            left
            width="min(100vw, 400px)"
            backdrop
         >
            <div class="px-5 mt-5">
               <div class="d-flex mb-3">
                  <h3 class="text-center flex-1">Filter</h3>
                  <button class="close p-2" @click="openedMenuFooter = false">
                     ×
                  </button>
               </div>
               <FilterEvent v-model="q" />
            </div>
         </b-sidebar>
      </div>
      <!-- content -->
      <div class="flex-1">
         <h5 class="text-center p-2" v-if="loading">Loading...</h5>       
         <NoData v-else-if="!events.items.length" />
         <div v-else class="d-flex flex-wrap k-campaign-box">
            <div
               class="k-campaign-card bg-white rounded-lg mb-5"
               v-for="item in events.items"
               :key="item._id"
            >
               <div
                  class="k-campaign-bg rounded-lg"
                  :style="`background-color: gray`"
               >
                  <div v-if="item.bg">
                     <b-img
                        v-if="['jpg', 'png', 'jpeg'].includes(fileExt(item.bg))"
                        :src="item.bg"
                     ></b-img>
                     <video v-else autoplay="autoplay" loop muted>
                        <source :src="item.bg" />
                     </video>
                  </div>
                  <div
                     class="d-flex justify-content-end p-3 title"
                     v-html="getStatus(item)['html']"
                  ></div>
               </div>
               <div class="d-flex flex-column justify-content-between flex-1">
                  <div class="p-4 flex-1">
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
                     <div class="mt-3 d-flex">
                        <b-img
                           class="mr-2 shadow"
                           :src="item.logo"
                           width="75"
                           height="75"
                           rounded
                        ></b-img>
                        <div class="flex-1">
                           <h5 class="text-line-2">{{ item.name }}</h5>
                           <div class="text-secondary mt-2 text-line-3">
                              {{ item.description }}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="text-center mt-5 mb-3 px-4 d-flex">
                     <div class="w-50 pr-2">
                        <b-button
                           variant="outline-primary"
                           class="px-6 py-3 w-100 k-btn-card"
                           @click="$router.push('/kampanyalar/' + item._id)"
                        >
                           Review
                        </b-button>
                     </div>
                     <div class="w-50 pl-2">
                        <b-button
                           variant="primary"
                           class="px-6 py-3 w-100 k-btn-card shadow"
                           @click="$router.push('/kampanyalar/' + item._id)"
                           v-if="getStatus(item)['v'] == 'in'"
                        >
                           Invest
                        </b-button>
                     </div>
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
   name: "kampanyalar",
   layout: "home",
   mixins: [MixinStatus],
   data() {
      return {
         q: {
            keyword: "",
            status: "",
            sectors: [],
            category: 0,
         },
         page: 1,
         openedMenuFooter: false,
         // status: ["New", "Requested", "Pending", "In-funding", "Closed"],
         status: [
            "New",
            "Comming Soon",
            "Comming Soon",
            "In-funding",
            "Successful",
            "Failed",
            "Failed",
         ],
      };
   },
   computed: {
      ...mapState("campaign", ["events", "loading"]),
   },
   methods: {
      resetSideBar(e) {
         if (window.innerWidth > 1080) this.openedMenuFooter = false;
      },
      hFilter() {
         this.page = 1;
         this.getList();
      },
      getList() {
         let qq = { ...this.q, page: this.page };
         if (!qq.category) delete qq.category;
         this.$store.dispatch("campaign/getEvents", qq);
      },
   },
   created() {
      window.addEventListener("resize", this.resetSideBar);
      this.getList();
   },
   beforeDestroy() {
      window.removeEventListener("resize", this.resetSideBar);
   },
};
</script>

<style lang="scss" scoped>
.k-campaign-box {
   margin-right: -10px;
   margin-left: -10px;
   overflow: hidden;
   .k-campaign-bg {
      height: 160px;
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
   }
   .k-campaign-card {
      width: 100%;
      margin-right: 10px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
   }
   .k-btn-card {
      font-size: 18px;
      height: 52px;
      border-radius: 10px;
   }
}
@media only screen and (min-width: 650px) {
   .k-campaign-card {
      width: 300px !important;
   }
}
</style>