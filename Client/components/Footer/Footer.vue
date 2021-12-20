<template>
   <footer class="mt-auto bg-primary k-footer">
      <div class="k-footer-top"></div>
      <div class="container mx-auto py-14 text-white d-flex flex-column flex-md-row">
         <!-- social -->
         <div style="max-width: 320px" class="pr-0 pr-md-5">
            <Logo footer />
            <p class="mt-10 mb-7 w-100 md:w-75">
               Lorem ipsum dolor sit amet, consectetur Aliquam risus non elit et. morbi tellus. Viverra cursus tellus +90 312 312 12 12
            </p>
            <div class="grid grid-cols-6 mt-10 mb-8">
               <div class="bg-warning rounded-full ku-btn-social d-flex justify-content-center items-end">
                  <svg-icon name="facebook" original width="20"></svg-icon>
               </div>
               <div class="bg-warning rounded-full ku-btn-social d-flex justify-content-center">
                  <svg-icon name="whatsapp" original width="25"></svg-icon>
               </div>
               <div class="bg-warning rounded-full ku-btn-social d-flex justify-content-center">
                  <svg-icon name="p" original width="20"></svg-icon>
               </div>
               <div class="bg-warning rounded-full ku-btn-social d-flex justify-content-center">
                  <svg-icon name="youtube" original width="23"></svg-icon>
               </div>
               <div class="bg-warning rounded-full ku-btn-social d-flex justify-content-center">
                  <svg-icon name="instagram" original width="28"></svg-icon>
               </div>
               <div class="bg-warning rounded-full ku-btn-social d-flex justify-content-center">
                  <svg-icon name="linkedin" original width="20"></svg-icon>
               </div>
            </div>
         </div>

         <!-- Links -->
         <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-1 gap-4">
            <div class="ku-link-group mt-5 mt-md-0">
               <h6 class="text-warning mb-4">{{ $t("Coporate") }}</h6>
               <div>
                  <nuxt-link
                     :class="curId == item.id ? 'text-warning' : 'text-white'"
                     :to="'/help/coporate/' + item.id"
                     v-for="(item, ii) in coporate"
                     :key="ii"
                     >{{ $t(item.name) }}</nuxt-link
                  >
               </div>
            </div>

            <div class="ku-link-group mt-5 mt-md-0">
               <h6 class="text-warning mb-4">{{ $t("OurPolicy") }}</h6>
               <div>
                  <nuxt-link
                     :class="curId == item.id ? 'text-warning' : 'text-white'"
                     :to="'/help/policy/' + item.id"
                     v-for="(item, ii) in policy"
                     :key="ii"
                     >{{ $t(item.name) }}</nuxt-link
                  >
               </div>
            </div>

            <div class="ku-link-group mt-5 mt-md-0">
               <h6 class="text-warning mb-4">{{ $t("PublicEnlightenment") }}</h6>
               <div>
                  <nuxt-link
                     :class="curId == item.id ? 'text-warning' : 'text-white'"
                     :to="'/help/public-enlightenment/' + item.id"
                     v-for="(item, ii) in publicEn"
                     :key="ii"
                     >{{ $t(item.name) }}</nuxt-link
                  >
               </div>

               <h6 class="text-warning mb-4 mt-9 mt-md-8">{{ $t("OurDocuments") }}</h6>
               <div>
                  <nuxt-link
                     :class="curId == item.id ? 'text-warning' : 'text-white'"
                     :to="'/help/docs/' + item.id"
                     v-for="(item, ii) in docs"
                     :key="ii"
                     >{{ item.name }}</nuxt-link
                  >
               </div>
            </div>

            <div class="ku-link-group mt-5 mt-md-0">
               <h6 class="text-warning mb-4">{{ $t("Ourmemberships") }}</h6>
               <div>
                  <nuxt-link
                     :class="curId == item.id ? 'text-warning' : 'text-white'"
                     :to="'/help/membership/' + item.id"
                     v-for="(item, ii) in membership"
                     :key="ii"
                     >{{ $t(item.name) }}</nuxt-link
                  >
               </div>
            </div>
         </div>
      </div>
   </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
   data() {
      return {
         curId: this.$route.params.id,
      };
   },
   computed: {
      ...mapGetters("footer", ["coporate", "policy", "publicEn", "membership", "docs"]),
   },
   watch:{
     "$route.params.id":{
       handler(newVal){
         this.curId = newVal
       }
     }
   }
};
</script>