<template>
   <div class="k-title text-nowrap overflow-hidden">
      <h2>{{title}}</h2>
      <p class="text-purple">{{title}}</p>
   </div>
</template>

<script>
export default {
   props: {
      title: {
         type: [Number, String],
         required: true,
      },
   },
};
</script>

<style lang="scss" scoped>
.k-title{
   position: relative;
   letter-spacing: -0.05em;
   font-style: normal;
   text-align: center;
   h2 {
      font-weight: 900;
      font-size: 50px;
      line-height: 85px;
      background: linear-gradient(180deg, rgba(68, 60, 99, 0.14) 35%, rgba(88, 63, 181, 0.0098) 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
   }
   p{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      font-weight: 900;
      font-size: 35px;
      line-height: 49px;
   }
}
</style>>

