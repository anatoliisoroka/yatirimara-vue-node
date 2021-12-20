<template>
</template>
<script>
export default {
   created() {
      this.$store.dispatch("auth/logout").then(() => {
         this.$router.replace("/");
      });
   },
};
</script>