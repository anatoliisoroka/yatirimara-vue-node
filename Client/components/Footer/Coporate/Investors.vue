<template>
   <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
      <div v-for="(item, ii) in content.investors" :key="ii" class="">
         <CardInvestor :value="item" />         
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import CardInvestor from "@/components/K/CardInvestor.vue";
export default {   
   components: { CardInvestor },
   computed: {
      ...mapState("footer", ["content"]),
   },  
};
</script>
