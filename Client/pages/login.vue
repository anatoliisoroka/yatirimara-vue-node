<template>
   <div class="container text-center">Login...</div>
</template>
<script>
export default {
   async created() {
      const token = this.$route.query.token;
      if (token) {
         await this.$store.dispatch("auth/loginAdmin", token);

         const redirect = this.$route.query.redirect || "/";
         this.$router.replace(redirect);
      } else this.$router.replace("/");
   },
};
</script>