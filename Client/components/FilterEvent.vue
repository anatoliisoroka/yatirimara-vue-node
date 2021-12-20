<template>
   <div class="">
      <!-- Search -->
      <div class="mb-5">
         <h5 class="text-primary mb-2">Arama Yap</h5>
         <b-form-input
            :value="value.keyword"
            placeholder="Arama Yap"
            @input="hKeyword"
            @keyup.enter.native="hKeyEnter"
         ></b-form-input>
      </div>
      <!-- Status -->
      <div class="mb-5">
         <h5 class="text-primary mb-3">Kampanya Durumu</h5>
         <div class="k-custom">
            <!-- active -->
            <b-form-checkbox
               :value="3"
               :checked="value.status"
               unchecked-value=""
               @change="hStatus"
               size="lg"
               class="pb-2"
            >
               Aktif Kampanyalar</b-form-checkbox
            >
            <!-- comming soon -->
            <b-form-checkbox
               :value="2"
               :checked="value.status"
               unchecked-value=""
               @change="hStatus"
               class="pb-2"
               size="lg"
               >Yakında Başlayacaklar</b-form-checkbox
            >
            <!-- Successful funding -->
            <b-form-checkbox
               :value="4"
               :checked="value.status"
               unchecked-value=""
               @change="hStatus"
               size="lg"
               class="pb-2"
            >
               Başarılı Fonlamalar</b-form-checkbox
            >
            <!-- Failed 
               During the deadline period, the funding failed to 100% funds
            -->
            <b-form-checkbox
               :value="7"
               :checked="value.status"
               unchecked-value=""
               @change="hStatus"
               size="lg"
               class="pb-2"
               >Başarısız Fonlamalar</b-form-checkbox
            >
         </div>
      </div>
      <div class="mb-5">
         <h5 class="mb-2 text-primary">Sektör</h5>
         <div>
            <b-form-input
               v-model="keyword_sector"
               placeholder="Arama Yap"
               class="mb-2"
            ></b-form-input>
            <div class="k-custom">
               <b-form-checkbox-group
                  :options="sectors_selected"
                  name="flavour-2a"
                  stacked
                  size="lg"
                  class="mb-2"
                  @change="hChangeSectorRemove"
                  :checked="value.sectors"
               ></b-form-checkbox-group>
               <hr
                  v-if="sectors_selected.length && sectors_unselected.length"
               />
               <div
                  style="max-height: 300px; overflow-y: auto"
                  class="k-scroll"
               >
                  <b-form-checkbox-group
                     :options="sectors_unselected"
                     name="flavour-2a"
                     stacked
                     size="lg"
                     class="mb-2"
                     :checked="[]"
                     @change="hChangeSector"
                  ></b-form-checkbox-group>
               </div>
            </div>
         </div>
      </div>

      <!-- Category -->
      <div class="mb-5">
         <h5 class="mb-3 text-primary">Kategori</h5>
         <div class="k-custom">
            <!-- active -->
            <b-form-checkbox
               :value="1"
               :checked="value.category"
               unchecked-value=""
               @change="hStatusCategory"
               size="lg"
               class="pb-2"
            >
               Teknoloji</b-form-checkbox
            >
            <!-- comming soon -->
            <b-form-checkbox
               :value="2"
               :checked="value.category"
               unchecked-value=""
               @change="hStatusCategory"
               class="pb-2"
               size="lg"
               >Üretim</b-form-checkbox
            >
         </div>
      </div>
   </div>
</template>

<script>
import { sectors } from "@/utils/constant";
export default {
   props: ["value"],
   name: "FilterEvent",
   data() {
      return {
         keyword_sector: "",
      };
   },
   computed: {
      sectors_unselected: function () {
         return sectors.filter((el) => {
            if (this.keyword_sector)
               return (
                  !this.value.sectors.includes(el.value) &&
                  new RegExp(`.*${this.keyword_sector}.*`, "i").test(el.text)
               );
            else return !this.value.sectors.includes(el.value);
         });
      },
      sectors_selected: function () {
         return sectors.filter((el) => this.value.sectors.includes(el.value));
      },
   },
   methods: {
      hStatus(ee) {
         let new_state = { ...this.value };
         new_state.status = ee;
         this.$emit("input", new_state);
         this.$emit("change", new_state);
      },
      hStatusCategory(ee) {
         let new_state = { ...this.value };
         new_state.category = ee;
         this.$emit("input", new_state);
         this.$emit("change", new_state);
      },
      hChangeSector(e) {
         let new_state = { ...this.value };
         new_state.sectors.push(e[0]);
         this.$emit("input", new_state);
         this.$emit("change", new_state);
      },
      hChangeSectorRemove(e) {
         let new_state = { ...this.value };
         new_state.sectors = e;
         this.$emit("input", new_state);
         this.$emit("change", new_state);
      },
      hKeyword(e) {
         let new_state = { ...this.value };
         new_state.keyword = e;
         this.$emit("input", new_state);
      },
      hKeyEnter() {
         this.$emit("change", this.value);
      },
   },
};
</script>