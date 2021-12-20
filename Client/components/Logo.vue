<template>
   <div class="hover" @click="goHome">
      <svg-icon v-if="footer" name="logo-w" class="k--logo" original></svg-icon>
      <svg-icon v-else name="logo" original height="60"></svg-icon>
   </div>
</template>

<script>
export default {
   props: {
      footer: {
         type: Boolean,
         default: false,
      },
   },
   methods: {
      goHome() {
         if (this.$route.name != "index") this.$router.push("/");
      },
   },
};
</script>

<style>
.k--logo {
   width: 193px;
   height: 87px;
   min-width: 190px;
   min-height: 80px;
}
</style>