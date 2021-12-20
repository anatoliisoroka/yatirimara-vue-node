<template>
   <div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
         <div v-for="item in items" :key="item">
            <img src="/upload/breaking.png" alt="" width="100%" />
         </div>
      </div>
      <div class="text-center my-10 px-5">
         <b-button variant="warning" size="lg" class="shadow" style="width: min(100%, 300px)" @click="items+=6">{{ $t("btn.more") }}</b-button>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         items: 6,
      };
   },
};
</script>

<style>
</style>