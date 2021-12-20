<template>
<div>
   <div v-if="showValue" class="d-flex justify-content-between mb-3">
      <div>% {{value}} Fonlandı</div>
      <div>% 100 Hedef</div>
   </div>
   <b-progress :value="value" :max="100" class="mb-3" :height="height" variant="warning"></b-progress>  
</div>
</template>

<script>
export default {
   props:{
      value: {
         type: Number,
         default: 0
      },
      variant:{
         type: String,
         default: "yellow"
      },
      showValue:{
         type: Boolean,
         default: false
      },
      height:{
         type: String,
         default: "4px"
      }
   }
}
</script>