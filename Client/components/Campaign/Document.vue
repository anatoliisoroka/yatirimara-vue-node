<template>
   <div class="w-max-1000 mt-5 px-2">
      <!-- types -->
      <div class="d-flex flex-wrap">
         <b-button
            v-for="item in types"
            :key="item.id"
            class="mr-4 hover"
            :variant="form.type == item.id ? 'primary' : 'text'"
            @click="hChangeType(item.id)"
            >{{ item.label }}</b-button
         >
      </div>
      <!-- File List -->
      <div class="mt-10">
         <b-row v-if="docs[form.type].length">
            <b-col
               v-for="(doc, ii) in docs[form.type]"
               :key="ii"
               cols="12"
               sm="6"
               md="4"
               lg="3"
               class="mb-5 d-flex justify-content-between k-file-item"
            >
               <k-file-text :value="doc.url" icon-width="50" />
               <button class="close px-1" @click="hDelete(doc._id)">×</button>
            </b-col>
         </b-row>
         <NoData v-else />
      </div>
      <!-- Create New -->
      <b-row class="mt-10">
         <b-col cols="12" sm="6">
            <!-- name -->
            <b-form-group class="mb-3">
               <slot name="label">
                  <k-label
                     label="File Name*"
                     :msg="getMessage('name')"
                     :state="validate('name')"
                  />
               </slot>
               <b-form-input
                  v-model="form.name"
                  trim
                  placeholder="About the Idea"
                  rows="3"
               ></b-form-input>
            </b-form-group>
         </b-col>

         <b-col cols="12" sm="6">
            <!-- file -->
            <b-form-group class="mb-3">
               <slot name="label">
                  <k-label
                     label="Select File*"
                     :msg="getMessage('file')"
                     :state="validate('file')"
                  />
               </slot>
               <div>
                  <div
                     v-if="form.file"
                     class="d-flex justify-content-between align-items-center"
                  >
                     <k-file-text :value="form.file.name" />
                     <button class="close" @click="form.file = null">×</button>
                  </div>
                  <b-form-file
                     v-else
                     v-model="form.file"
                     placeholder="Choose a file or drop it here..."
                     drop-placeholder="Drop file here..."
                  ></b-form-file>
               </div>
            </b-form-group>
         </b-col>
      </b-row>
      <b-overlay
         :show="loading"
         rounded
         opacity="0.6"
         spinner-small
         spinner-variant="danger"
         class="mx-auto"
         style="width: 250px"
      >
         <b-button
            variant="primary"
            class="shadow w-100"
            size="lg"
            @click="hSubmit"
            >Save</b-button
         >
      </b-overlay>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import { DOCUMENT_CREATE, DOCUMENT_DELETE } from "@/api/docs";
export default {
   data() {
      return {
         types: [
            { id: "production", label: "Product Production" },
            { id: "market", label: "Market / Competition / Target Audience*" },
            { id: "analystics", label: "Analytics and Business Plan*" },
            { id: "financial", label: "Financial Statements*" },
         ],
         form: {
            type: "production",
            name: "",
            file: null,
            campaign_id: this.$route.params.id,
         },
         loading: false,
      };
   },
   validations: {
      form: {
         name: { required },
         file: { required },
      },
   },
   computed: {
      ...mapState("campaign", ["docs"]),
   },
   methods: {
      getList() {
         this.$store.dispatch("campaign/getDocument", {
            campaign_id: this.$route.params.id,
            type: this.form.type,
         });
      },
      async hSubmit() {
         if (this.anyError()) return false;

         this.loading = true;
         console.log(this.form, "form");
         const res = await this.$apollo
            .mutate({
               mutation: DOCUMENT_CREATE,
               variables: this.form,
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            })
            .finally(() => {
               this.loading = false;
            });
         if (res?.data?.document_create) {
            this.successMsg("Successfully Created!");
            this.getList();
            this.form.name = "";
            this.form.file = null;
            this.$v.$reset();
            this.$router.replace({
               name: "campaigns-id",
               params: { id: this.$route.params.id },
               query: { tab: "award-legal" },
            });
         }
      },
      async hDelete(_id) {
         const res = await this.$apollo
            .mutate({
               mutation: DOCUMENT_DELETE,
               variables: { _id },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            });
         if (res?.data?.document_delete) {
            this.successMsg("Successfully Created!");
            this.getList();
         }
      },
      hChangeType(id) {
         if (id != this.form.type) {
            this.form.type = id;
            if (!this.docs[id].length) this.getList();
         }
      },
   },
   mounted() {
      this.getList();
   },
};
</script>
<style lang="scss" scoped>
.k-file-item {
   button {
      display: none;
   }
   &:hover button {
      display: block;
   }
}
</style>
