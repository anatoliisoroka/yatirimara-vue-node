<template>
   <div>
      <h2 class="text-center">GLOBAL CROSSFUNDING PLATFORM INC.</h2>
      <h2 class="text-center mb-5">QUALITY POLICY</h2>
      <!-- QUALITY CERTIFICATES -->
      <div class="text-secondary mb-8">
         <div v-for="nn in 10" :key="nn" class="d-flex py-2 mb-3">
            <div style="min-width: 20px; max-width:20px; height: 20px" class="rounded-full bg-warning mr-4"></div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, vestibulum phasellus sapien eleifend egestas.</p>
         </div>
      </div>
      <p class="mb-5">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, vestibulum phasellus sapien eleifend egestas. Lorem ipsum dolor sit amet,
         consectetur adipiscing elit. Nunc, vestibulum phasellus sapien eleifend egestas.
      </p>
   </div>
</template>

<script>
export default {
   data() {
      return {};
   },
};
</script>