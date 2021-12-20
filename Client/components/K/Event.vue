<template>
   <div>
      <div style="margin-top: 30px; width: calc(100% - 20px)">
         <swiper
            :slides-per-view="1"
            :space-between="10"
            :options="swiperOption1"
            class="k-custom"
         >
            <swiper-slide
               v-for="(item, ii) in $store.state.banner[data_key]['items']"
               :key="ii + 'slider'"
               style="width: 300px"
            >
               <KCard :value="item" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
         </swiper>
      </div>
      <div class="text-center mt-10 mb-5 mx-auto" style="max-width: 400px">
         <b-button
            variant="warning"
            size="lg"
            class="shadow w-100"
            @click="$router.push(`/kampanyalar/`)"
            >Tüm Kampanyalar</b-button
         >
      </div>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
   props: {
      // Banner key
      data_key: {
         type: String,
         default: "active",
      },
   },
   components: {
      Swiper,
      SwiperSlide,
   },
   data() {
      return {
         swiperOption1: {
            // effect: "coverflow",
            grabCursor: true,
            centeredSlides: false,
            slidesPerView: "auto",
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
            breakpoints: {
               360: {
                  slidesPerView: 1,
                  spaceBetween: 20,
               },
               640: {
                  slidesPerView: 1,
                  spaceBetween: 30,
               },
               768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
               },
               1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
               },
            },
            autoplay: {
               delay: 4000,
            },
         },
      };
   },
};
</script>