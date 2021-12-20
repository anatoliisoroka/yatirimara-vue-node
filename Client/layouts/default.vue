<template>
   <div class="min-vh-100 d-flex flex-column">
      <div
         class="d-flex justify-content-between align-items-center px-6 py-3 mb-3"
         style="box-shadow: 0px 2px 10px rgb(0 0 0 / 10%), 0px 10px 40px rgb(0 0 0 / 6%);"
      >
         <Logo />
         <Header />
      </div>
      <nuxt />
   </div>
</template>

<script>
export default {
   name: "app",
};
</script>

<style>
</style>