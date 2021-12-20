<template>
   <div class="k-dropdown" :class="{ active }">
      <div class="flex items-center">
         <template v-if="title">
            <h3 class="mr-2.5 font-semibold">{{ title }}</h3>
            <div class="k-btn-dropdown flex justify-center">
               <svg-icon name="arrow-down" original width="14"></svg-icon>
            </div>
         </template>
         <slot name="button-content"></slot>
      </div>
      <!-- content -->
      <div class="k-dropdown-content rounded">
         <p
            class="py-1"
            v-for="(item, ii) in options"
            :key="ii"
            @click="$emit('click-item', item.value)"
         >
            {{ item.text }}
         </p>
         <NoData v-if="!options.length" />
      </div>
   </div>
</template>

<script>
export default {
   props: {
      title: {
         type: [Number, String],
      },
      options: {
         type: Array,
         default: () => [],
      },
   },
   data() {
      return {
         active: false,
      };
   },
   methods: {
      showDropdown(e) {
         if (e.target.closest(".k-dropdown")) {
            this.active = true;
         } else this.active = false;
      },
   },
   mounted() {
      window.addEventListener("click", this.showDropdown);
   },
   beforeDestroy() {
      window.removeEventListener("click", this.showDropdown);
   },
};
</script>
<style lang="scss" scoped>
.k-dropdown {
   position: relative;
   .k-dropdown-content {
      position: absolute;
      bottom: 0;
      top: 38px;
      background: white;
      height: max-content;
      max-height: 500px;
      overflow-y: auto;
      display: none;
      padding: 8px;
      width: 100%;
      p {
         cursor: pointer;
      }
   }
   &.active {
      .k-dropdown-content {
         display: block;
      }
   }
}
</style>