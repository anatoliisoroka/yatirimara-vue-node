<template>
   <div class="d-flex align-items-center">
      <div class="">
         <div class="d-flex justify-center align-items-baseline">
            <span class="text-nowrap"
               >Total <span class="text-primary">{{ total }}</span>
            </span>
            <b-form-select
               v-model="currentLimit"
               class="ml-3 mr-3"
               style="max-width: 150px"
            >
               <b-form-select-option
                  :value="ii"
                  v-for="ii in [10, 25, 50, 100]"
                  :key="ii"
                  >{{ ii }} / page</b-form-select-option
               >
            </b-form-select>
         </div>
      </div>
      <b-pagination
         class="mb-0 k-custom"
         :total-rows="total"
         :per-page="currentLimit"
         v-model="currentPage"
      ></b-pagination>
   </div>
</template>

<script>
export default {
   name: "KPaginate",
   props: {
      total: {
         type: Number,
         default: 0,
      },
      page: {
         type: Number,
         default: 1,
      },
      limit: {
         type: Number,
         default: 10,
      },
   },
   computed: {
      currentPage: {
         get() {
            return this.page;
         },
         set(val) {
            this.$emit("update:page", val);
            this.$emit("pagination");
         },
      },
      currentLimit: {
         get() {
            return this.limit;
         },
         set(val) {
            this.$emit("update:limit", val);
            if (this.currentPage == 1) this.$emit("pagination");
         },
      },
   },
};
</script>
