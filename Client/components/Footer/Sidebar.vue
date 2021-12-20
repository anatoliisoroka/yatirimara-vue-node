<template>
   <div>
      <div class="help-sidebar">
         <div
            class="text-white py-2 pr-5 help-sidebar--item"
            :class="{ active: item.id == curId }"
            v-for="(item, ii) in $store.getters['footer/' + value]"
            :key="ii"
         >
            <div class="pr-3">
               <svg-icon
                  name="arrow-down"
                  original
                  width="14"
                  class="rotate-n90"
               ></svg-icon>
            </div>
            <nuxt-link
               :to="`/help/${routeName || value}/${item.id}`"
               class=""
               >{{ $t(item.name) }}</nuxt-link
            >
         </div>
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
         <div class="p-5 mt-5">
            <div
               class="text-white help-sidebar--item mb-4"
               :class="{ active: item.id == curId }"
               v-for="(item, ii) in $store.getters['footer/' + value]"
               :key="ii"
            >
               <div class="pr-3">
                  <svg-icon
                     name="arrow-down"
                     original
                     width="14"
                     class="rotate-n90"
                  ></svg-icon>
               </div>
               <nuxt-link :to="`/help/${routeName || value}/${item.id}`">{{
                  $t(item.name)
               }}</nuxt-link>
            </div>
         </div>
      </b-sidebar>
   </div>
</template>

<script>
export default {
   props: {
      value: {
         type: String,
         default: "coporate",
      },
      routeName: {
         type: String,
         default: "",
      },
   },
   data() {
      return {
         curId: this.$route.params.id,
         openedMenuFooter: false,
      };
   },
   watch: {
      "$route.params.id": {
         handler(newVal) {
            this.curId = newVal;
         },
      },
   },
   methods: {
      resetSideBar() {
         if (window.innerWidth > 1080) this.openedMenuFooter = false;
      },
   },
   created() {
      window.addEventListener("resize", this.resetSideBar);
   },
   beforeDestroy() {
      window.removeEventListener("resize", this.resetSideBar);
   },
};
</script>