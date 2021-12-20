<template>
   <div class="d-flex bg-white rounded p-2">
      <div class="pr-3">
         <b-avatar :src="value.pic" size="4rem"></b-avatar>
      </div>
      <div class="flex-1">
         <p>{{ value.nameLast }} {{ value.nameFirst }}</p>
         <div class="d-flex justify-content-between align-items-center">
            <p class="text-secondary">Investor</p>
            <SocialShare :value="value.id" size='sm'/>
         </div>
         <p class="font-weight-bold">
            <span class="text-secondary">{{ $t("Total Investment") }}:</span> <span class="font-16">{{ value.amount }}</span>
         </p>
      </div>
   </div>
</template>

<script>
import SocialShare from "@/components/SocialShare.vue";
export default {
   props: {
      value: {
         type: Object,
         required: true,
      },
   },
   components: { SocialShare },
};
</script>

<style>
</style>