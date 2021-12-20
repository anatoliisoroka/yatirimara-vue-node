<template>
   <div class="d-flex flex-wrap">
      <div v-for="(item, ii) in content.solution_partners" :key="ii" class="p-2">
         <b-avatar :src="item.pic" size="6rem" class="hover"></b-avatar>  
      </div>
      <div v-for="(item, ii) in content.solution_partners" :key="ii+'3'" class="p-2">
         <b-avatar :src="item.pic" size="6rem" class="hover"></b-avatar>  
      </div>
      <div v-for="(item, ii) in content.solution_partners" :key="ii+'2'" class="p-2">
         <b-avatar :src="item.pic" size="6rem" class="hover"></b-avatar>  
      </div>
      <div v-for="(item, ii) in content.solution_partners" :key="ii+'1'" class="p-2">
         <b-avatar :src="item.pic" size="6rem" class="hover"></b-avatar>  
      </div>
      <div v-for="(item, ii) in content.solution_partners" :key="ii+'t'" class="p-2">
         <b-avatar :src="item.pic" size="6rem" class="hover"></b-avatar>  
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import SocialShare from "@/components/SocialShare.vue";
export default {
   components: { SocialShare },
   computed: {
      ...mapState("footer", ["content"]),
   },
};
</script>