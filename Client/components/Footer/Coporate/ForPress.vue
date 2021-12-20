<template>
   <div>
      <div class="text-center">
         <img src="/upload/press.png" alt="" style="width: min(600px, 100%)" />
      </div>
      <h5 class="text-center mt-5 mb-10">PRESS RELEASES</h5>

      <div v-for="nn in 6" :key="nn" class="d-flex py-2 mb-3">
         <div style="min-width: 20px; max-width: 20px; height: 20px" class="rounded-full bg-warning mr-4"></div>
         <p><strong>28.05.2021</strong> - Kitle fonlamasına yatırımcıdan rekor talep!</p>
      </div>
      <div class="my-10 text-center">
         <b-button variant="link">Click to download our logos</b-button>
      </div>
   </div>
</template>

<script>
export default {};
</script>

<style>
</style>