<template>
   <div class="d-flex justify-content-between k-label" :class="{active: label || msg}">
      <p v-if="label" class="font-12 wi-100" :style="`color: ${titleColor}`">{{ label }}</p>
      <b-form-invalid-feedback :state="state" class="text-right">{{ msg }}</b-form-invalid-feedback>
   </div>
</template>

<script>
export default {
   props: {
      msg: {},
      state: {},
      label: {},
   },
   computed: {
      titleColor: function () {
         return this.state == false ? "#ee5253" : "#000";
      },
   },
};
</script>
<style lang="scss" scoped>
.k-label {
   overflow: hidden;
   height: 0;
   transition: 0.2s;
   width: 100%;
   &.active {
      height: 20px;
   }
   .invalid-feedback {
      color: #ee5253;
      font-size: 12px !important;
      margin-top: 0 !important;
      width: max-content !important;
   }
}
</style>