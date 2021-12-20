<template>
   <div>
      <!-- types -->
      <div class="d-flex flex-wrap">
         <b-button
            v-for="item in types"
            :key="item.id"
            class="mr-4 hover"
            :variant="type_id == item.id ? 'primary' : 'text'"
            @click="type_id = item.id"
            >{{ item.label }}</b-button
         >
      </div>
      <!-- File List -->
      <div class="mt-10">
         <b-row v-if="docs[type_id].length">
            <b-col
               v-for="(doc, ii) in docs[type_id]"
               :key="ii"
               cols="12"
               sm="6"
               md="4"
               lg="3"
               class="mb-5 d-flex justify-content-between k-file-item"
            >
               <k-file-text :value="doc.url" icon-width="50" />
            </b-col>
         </b-row>
         <NoData v-else />
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         types: [
            { id: "production", label: "Product Production" },
            { id: "market", label: "Market / Competition / Target Audience*" },
            { id: "analystics", label: "Analytics and Business Plan*" },
            { id: "financial", label: "Financial Statements*" },
         ],
         type_id: "production",
      };
   },
   computed: {
      ...mapState("campaign", ["docs", "loading", "_id"]),
   },
   created() {
      if (!this.docs || this._id != this.$route.params.id) {
         this.$store.dispatch("campaign/getDocument", {
            campaign_id: this.$route.params.id,
         });
      }
   },
};
</script>