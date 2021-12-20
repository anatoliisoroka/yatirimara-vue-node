<template>
   <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(item, ii) in content.our_team" :key="ii" class="text-secondary mb-8">
         <div class="d-flex flex-column align-items-center">
            <b-avatar :src="item.pic" size="12rem"></b-avatar>
            <h5 class="my-2">{{ item.nameLast }} {{ item.nameFirst }}</h5>
            <p>{{ item.position }}</p>
            <SocialShare :value="item.id" />
         </div>
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