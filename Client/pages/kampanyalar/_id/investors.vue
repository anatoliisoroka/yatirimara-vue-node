<template>
   <b-row class="flex-wrap" v-if="event">
      <b-col
         v-for="(item, ii) in event.investors"
         :key="ii"
         style="max-width: 330px; width: 330px; min-width: 330px"
         class="w-sm-100 m-2 m-sm-0"
      >
         <div class="rounded-lg bg-light mb-5 p-3">
            <div class="d-flex align-items-center">
               <b-avatar :src="item.user.pic" size="50"></b-avatar>
               <div class="ml-2 flex-1">
                  <h6 class="mb-1 text-nowrap">
                     {{ item.user.name_first }} {{ item.user.name_last }}
                  </h6>
                  <div
                     class="d-flex align-items-center justify-content-between"
                  >
                     <p class="text-secondary white-space-nowrap">
                        {{ $moment(item.paid_at).format("DD.MM.YYYY - HH:mm") }}
                     </p>
                     <h6>{{ item.paid | formatN }}₺</h6>
                  </div>
               </div>
            </div>
         </div>
      </b-col>
   </b-row>
</template>

<script>
import { mapState } from "vuex";
export default {
   computed: {
      ...mapState("campaign", ["event", "loading"]),
   },
};
</script>

<style>
</style>