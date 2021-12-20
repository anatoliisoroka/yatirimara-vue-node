<template>
   <div v-if="event">
      <h5>{{ event.idea_title }}</h5>
      <h6 class="text-secondary mb-5 mt-2">{{ event.idea_title_sub }}</h6>
      <div>
         <div v-if="event.bg" class="float-right" style="max-width: 400px">
            <b-img
               v-if="['jpg', 'png', 'jpeg'].includes(fileExt(event.bg))"
               :src="event.bg"
               style="width: 100%"
            ></b-img>
            <video
               v-else
               autoplay="autoplay"
               loop
               muted
               controls
               style="width: 100%"
            >
               <source :src="event.bg" />
            </video>
         </div>
         <p class="white-space-pre-line">
            {{ event.idea_about }}
         </p>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   computed: {
      ...mapState("campaign", ["event", "loading"]),
   },
};
</script>