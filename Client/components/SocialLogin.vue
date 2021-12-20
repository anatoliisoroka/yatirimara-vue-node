<template>
  <div>
    <b-button
      variant="primary"
      class="w-100 mb-5 hover"
      size="lg"
      style="background: #3272ac; border: #3272ac"
      :disabled="loading"
    >
      <div class="d-flex align-items-center justify-content-center">
        <svg-icon name="linkedin" color="#fff" width="20"></svg-icon>
        <span class="ml-3">Linkedin ile Giriş Yap</span>
      </div>
    </b-button>
    <b-button
      variant="primary"
      class="w-100 mb-5 hover"
      size="lg"
      style="background: #3b5998; border: #3b5998"
      @click="loginSocial('f')"
      :disabled="loading"
    >
      <div class="d-flex align-items-center justify-content-center">
        <svg-icon name="facebook" color="#fff" width="10"></svg-icon>
        <span class="ml-3">Facebook ile devam et</span>
      </div>
    </b-button>
    <b-button
      variant="primary"
      class="w-100 mb-5 hover"
      size="lg"
      style="background: #3e3e3e; border: #3e3e3e"
      @click="loginSocial('g')"
      :disabled="loading"
    >
      <div class="d-flex align-items-center justify-content-center">
        <svg-icon name="google" original width="15"></svg-icon>
        <span class="ml-3">Google ile devam et</span>
      </div>
    </b-button>
  </div>
</template>

<script>
import { auth, google, facebook } from "@/utils/firebase";
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async doLogin(idToken) {
      if (!idToken) return false;
      const success = await this.$store
        .dispatch("auth/login", { token: idToken })
        .finally(() => {});
      if (success) {
        const redirect = this.$route.query.redirect || "/";
        if (redirect == "/" && this.$route.name == "index") location.reload();
        else this.$router.replace(redirect);
      }
    },
    async loginSocial(name) {
       let provider = google
       switch (name) {
          case 'f':
             provider = facebook
             break;       
          default:
             break;
       }
      this.loading = true;
      await auth
        .signInWithPopup(provider)
        .then(result => {
          console.log(result, "result");
        })
        .catch(error => {
          console.log(error, "error");
          // Handle Errors here.
          this.errorMsg(error.message);
        });
      if (auth.currentUser){
         const idToken = await auth.currentUser.getIdToken();
         this.doLogin(idToken);
      }
      this.loading = false;
    },    
  }
};
</script>
