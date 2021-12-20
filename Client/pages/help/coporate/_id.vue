<template>
   <div>
      <footer-coporate-aboutus v-if="curId=='aboutus'"/>
      <footer-coporate-oganization-chat v-else-if="curId=='oganization_chat'"/>
      <footer-coporate-board-directors v-else-if="curId=='board_of_directors'"/>
      <footer-coporate-investment v-else-if="curId=='investment_committee'"/>
      <footer-coporate-our-team v-else-if="curId=='our_team'"/>
      <footer-coporate-investors v-else-if="curId=='registered_investors'"/>
      <footer-coporate-partner v-else-if="curId=='partnership_structures'"/>
      <footer-coporate-solution v-else-if="curId=='solution_partners'"/>
      <footer-coporate-social-responsibility v-else-if="curId=='social_responsibility'"/>
      <footer-coporate-press v-else-if="curId=='we_in_the_press'"/>
      <footer-coporate-for-press v-else-if="curId=='for_press'"/>
      <footer-coporate-contact v-else-if="curId=='contact'"/>
      <footer-coporate-aboutus v-else/>      
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