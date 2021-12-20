<template>
   <div>
      <swiper
         :slides-per-view="1"
         :space-between="10"
         :options="swiperOption1"
         loop
         navigation
         class="k-custom"
      >
         <swiper-slide
            v-for="(item, ii) in banners"
            :key="ii + 'slider'"
            class="slider-item-box"
            :style="`background-image: url('${item.bg}') `"
         >
            <div
               class="container h-100 d-flex flex-column justify-content-center"
            >
               <h1
                  class="
                     text-primary text-6xl
                     font-bold
                     text-nowrap
                     w-75
                     md:font-60
                  "
               >
                  {{ item.title }}
               </h1>
               <p class="pt-4 pb-8 w-50">{{ item.description }}</p>
               <div class="text-left" style="width: 300px">
                  <b-button
                     variant="primary"
                     size="lg"
                     class="shadow w-100"
                     :to="`/kampanyalar/${item.campaign_id}`"
                     >Invest</b-button
                  >
               </div>
            </div>
         </swiper-slide>
      </swiper>

      <!-- Events -->
      <div class="container">
         <section class="mt-14">
            <k-title title="YATIRIM FIRSATLARI"></k-title>
            <KEvent v-if="active.items.length" />
         </section>

         <!-- comming soon -->
         <section class="mt-14">
            <k-title title="SOON"></k-title>
            <KEvent data_key="soon" v-if="soon.items.length" />
         </section>
      </div>
   </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapState } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
   layout: "home",
   name: "index",
   components: {
      Swiper,
      SwiperSlide,
   },
   data() {
      return {
         swiperOption1: {
            // effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            coverflowEffect: {
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: false,
            },
            pagination: {
               el: ".swiper-pagination",
            },
            autoplay: {
               delay: 4000,
            },
         },
      };
   },
   methods: {
      toggleLang(event) {
         if (event.ctrlKey && event.key === "l") {
            const nextLang = Cookies.get("lang") == "en" ? "tr" : "en";
            this.$i18n.locale = nextLang;
            Cookies.set("lang", nextLang);
         }
      },
   },
   computed: {
      ...mapState("banner", ["home", "active", "soon", "banners"]),
   },
   mounted() {
      if (process.client) {
         document.addEventListener("keydown", this.toggleLang);
      }
      this.$store.dispatch("banner/getBanner");
   },
   destroyed() {
      window.removeEventListener("keydown", this.toggleLang);
   },
};
</script>
<style lang="scss" scoped>
.slider-item-box {
   width: 100vw;
   height: 500px;
   background-color: white;
   background-repeat: no-repeat;
   background-position: center center;
   background-size: cover;
   position: relative;
   h1 {
      font-size: 40px;
   }
   .btn {
      line-height: 1.6;
   }
}
</style>
