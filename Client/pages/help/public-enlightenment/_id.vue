<template>
   <div>
      <footer-policy-quality v-if="curId=='our_quality_policy'"/>       
      <div v-else class="">
         comming soon
      </div>  
   </div>
</template>

<script>
export default {
   data() {
      return {
         curId: this.$route.params.id,
      };
   },
};
</script>