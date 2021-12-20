<template>
   <div>
      <footer-policy-quality v-if="curId=='our_quality_policy'"/>
      <footer-policy-evaluation v-else-if="curId=='our_evaluation_policy'"/>
      <footer-policy-security v-else-if="curId=='our_information_security_policy'"/>
      <footer-policy-fighting-back v-else-if="curId=='fighting_black_money'"/>
      <footer-policy-fighting-back v-else-if="curId=='our_fight_against_bribery_and_corruption'"/>
      <footer-policy-conflict v-else-if="curId=='our_conflict_of_interest_policy'"/>
      <footer-aboutus v-else/>      
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

<style>
</style>