<template>
   <div class="d-flex container">
      <footer-sidebar />
      <div class="flex-1">
         <nuxt-child />
      </div>
   </div>
</template>

<script>
export default {
   scrollToTop: true,
};
</script>