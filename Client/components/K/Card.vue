<template>
   <div class="k-card" :style="`background-color: ${color}`">
      <div class="k-campaign-bg rounded" :style="`background-color: gray`">
         <div v-if="value.bg">
            <b-img
               v-if="['jpg', 'png', 'jpeg', 'webp'].includes(fileExt(value.bg))"
               :src="value.bg"
            ></b-img>
            <video v-else autoplay="autoplay" loop muted>
               <source :src="value.bg" />
            </video>
         </div>
      </div>
      <div class="p-5 p-md-7">
         <!-- pregress bar -->
         <KProgress
            :value="Math.round((value.progress || 0) * 1000) / 10"
            show-value
         />

         <div class="mt-6">
            <div>
               <h4 class="text-line-1">{{ value.name }}</h4>
            </div>
            <p
               style="font-size: 20px; line-hight: 1.2"
               class="mt-1 mb-3 text-line-1"
            >
               {{ value.name_enterprise }}
            </p>
            <p class="text-line-3" style="height: 62px">
               {{ value.description }}
            </p>
         </div>
         <div class="text-center mt-9">
            <b-button
               variant="primary"
               style="max-width: 252px"
               size="lg"
               class="shadow px-10"
               @click="$router.push(`/kampanyalar/${value._id}`)"
               >Yatırım Yap</b-button
            >
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      value: {
         type: Object,
         required: true,
      },
      color: {
         type: String,
         default: "transparent",
      },
   },
};
</script>


<style lang="scss" scoped>
.k-card {
   max-width: 483px;
   border: 1px solid #c8c8c8;
   box-sizing: border-box;
   border-radius: 25px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   overflow: hidden;
}
</style>