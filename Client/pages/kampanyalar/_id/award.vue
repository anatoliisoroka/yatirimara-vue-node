<template>
   <div>
      <div v-for="type in types" :key="type.id" class="mb-10">
         <h5 class="mb-2 text-primary">
            {{ type.label }}
         </h5>
         <b-table
            class="border-bottom bg-light"
            :items="docs[type.id]"
            :fields="fields"
            show-empty
         >
            <template #cell(_id)="{ item }">
               <k-file-text :value="item.url" icon-width="40" />
            </template>
         </b-table>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         types: [
            {
               id: "trademark",
               label: "Patent, Trademark Registration and Document Information",
            },
            { id: "awards", label: "Awards and Achievements" },
            { id: "permissions", label: "Permissions and Approvals" },
         ],
         type_id: "trademark",
         fields: [
            { key: "_id", label: "Document" },
            { key: "name", label: "Name" },
            {
               key: "createdAt",
               label: "Date",
               formatter: (v) => {
                  return this.$moment(v).format("DD.MM.YYYY");
               },
            },
         ],
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