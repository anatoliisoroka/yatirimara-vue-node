<template>
   <div class="d-flex container">
      <footer-sidebar value="publicEn" routeName="public-enlightenment" />
      <!-- content -->
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