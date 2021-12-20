<template>
   <div v-if="event" class="d-flex flex-column flex-md-row">
      <div class="mr-0 mr-md-5">
         <div style="width: 300px" class="mx-auto" v-if="event.team">
            <swiper
               :slides-per-view="1"
               :space-between="10"
               :options="swiperOption1"
               class="k-warning"
               @slideChange="changedSlide"
               ref="banner"
            >
               <swiper-slide
                  v-for="(member, ii) in event.team"
                  :key="ii + 'slider'"
                  style="width: 300px"
               >
                  <div class="text-center">
                     <b-avatar
                        :src="member.pic"
                        size="250"
                        class="border border-warning p-2 bg-white"
                     ></b-avatar>
                     <h5 class="my-2">
                        {{ member.name }} {{ member.name_last }}
                     </h5>
                     <p>({{ member.position }})</p>
                     <div class="text-center" v-if="member.resume">
                        <a
                           :href="member.resume"
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
                  </div>
               </swiper-slide>
               <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
         </div>
         <div
            v-if="event.team.length"
            class="d-flex justify-content-center mt-10"
         >
            <a
               v-if="event.team[ii].social_twitter"
               :href="event.team[ii].social_twitter"
               class="p-2 mx-2"
               target="_blank"
            >
               <svg-icon name="twitter" original width="20"></svg-icon>
            </a>
            <a
               v-if="event.team[ii].social_facebook"
               :href="event.team[ii].social_facebook"
               class="p-2"
               target="_blank"
            >
               <svg-icon name="facebook" original width="12"></svg-icon>
            </a>
            <a
               v-if="event.team[ii].social_instagram"
               :href="event.team[ii].social_instagram"
               class="p-2"
               target="_blank"
            >
               <svg-icon name="instagram" original width="20"></svg-icon>
            </a>
            <a
               v-if="event.team[ii].social_linkedin"
               :href="event.team[ii].social_linkedin"
               class="p-2"
               target="_blank"
            >
               <svg-icon name="linkedin" color="#007AB5" width="20"></svg-icon>
            </a>
         </div>
      </div>
      <div class="flex-1">
         <template v-if="event.team.length">
            <div v-for="(item, index) in content" :key="index">
               <h6>{{ item.label }}</h6>
               <p class="mb-5">{{ gsv(event.team[ii], [item.kk]) }}</p>
            </div>
         </template>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
   components: {
      Swiper,
      SwiperSlide,
   },
   computed: {
      ...mapState("campaign", ["event", "loading"]),
   },
   data() {
      return {
         swiperOption1: {
            centeredSlides: true,
            pagination: {
               el: ".swiper-pagination",
            },
            autoplay: {
               delay: 4000,
            },
         },
         ii: 0,
         content: [
            { kk: "description", label: "Biography" },
            {
               kk: "area_experience",
               label: "Area of ​​Expertise and Professional Experience",
            },
            {
               kk: "source_relationship",
               label: "Source of Relationship with Entrepreneur",
            },
            {
               kk: "duty",
               label: "Duties and Responsibilities Assumed in the Company",
            },
         ],
      };
   },
   methods: {
      changedSlide() {
         this.ii = this.$refs.banner.$swiper.activeIndex;
      },
   },
};
</script>