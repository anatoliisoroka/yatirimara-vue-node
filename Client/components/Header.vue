<template>
   <div :class="loggedIn ? positionClass + ' loggedIn' : positionClass">
      <div class="justify-content-end align-items-center k-header-btns">
         <!-- Dropdown1 -->
         <b-dropdown
            class="dropdown-toggle--after-no"
            size="lg"
            variant="link"
            menu-class="rounded-lg overflow-hidden"
         >
            <template #button-content>
               <div class="d-flex align-items-center">
                  <span class="text-black font-lg">Yatırımcı</span>
                  <div
                     class="
                        d-flex
                        justify-content-center
                        ml-5
                        bg-white
                        rounded-full
                        p-3
                     "
                  >
                     <svg-icon name="arrow-down" original width="14"></svg-icon>
                  </div>
               </div>
            </template>
            <b-dropdown-item
               class=""
               v-for="(item, ii) in dropdownList1"
               :key="ii"
               :to="item.link"
            >
               <div
                  class="
                     d-flex
                     justify-content-between
                     py-2
                     text-decoration-none
                  "
               >
                  <span class="pr-3">{{ $t(item.name) }}</span>
                  <svg-icon name="arrow-right" original width="8"></svg-icon>
               </div>
            </b-dropdown-item>
         </b-dropdown>
         <!-- Dropdown2 -->
         <b-dropdown
            class="dropdown-toggle--after-no"
            size="lg"
            right
            variant="link"
            menu-class="rounded-lg overflow-hidden"
         >
            <template #button-content>
               <div class="d-flex align-items-center">
                  <span class="text-black font-lg">Girişimci</span>
                  <div
                     class="
                        d-flex
                        justify-content-center
                        ml-5
                        bg-white
                        rounded-full
                        p-3
                     "
                  >
                     <svg-icon name="arrow-down" original width="14"></svg-icon>
                  </div>
               </div>
            </template>
            <b-dropdown-item
               v-for="(item, ii) in dropdownList2"
               :key="ii"
               :disabled="item.disabled || false"
               :to="item.link"
            >
               <div
                  class="
                     d-flex
                     justify-content-between
                     py-2
                     text-decoration-none
                  "
               >
                  <span class="pr-3">{{ $t(item.name) }}</span>
                  <svg-icon name="arrow-right" original width="8"></svg-icon>
               </div>
            </b-dropdown-item>
         </b-dropdown>
         <!-- Auth Buttons for lg screen-->
         <template v-if="!loggedIn">
            <b-button
               variant="outline-primary"
               size="lg"
               class="ml-5 k-btn-auth"
               @click="showLogin"
               >{{ $t("btn.login") }}</b-button
            >
            <b-button
               variant="primary"
               size="lg"
               class="ml-6 k-btn-auth"
               @click="showRegister"
               >{{ $t("btn.register") }}</b-button
            >
         </template>
         <!-- User Avatar -->
         <b-dropdown
            v-else
            class="dropdown-toggle--after-no"
            size="lg"
            variant="link"
            right
            menu-class="rounded-lg overflow-hidden"
         >
            <template #button-content>
               <div class="d-flex align-items-center">
                  <b-avatar
                     :src="user.pic"
                     width="50px"
                     variant="primary"
                  ></b-avatar>
               </div>
            </template>
            <b-dropdown-item to="/my/profile">
               <div class="py-2 text-decoration-none">Profile</div>
            </b-dropdown-item>
            <b-dropdown-item to="/my/notifications">
               <div class="py-2 text-decoration-none">Notifications</div>
            </b-dropdown-item>
            <b-dropdown-item to="/logout">
               <div class="py-2">
                  <span>Logout</span>
               </div>
            </b-dropdown-item>
         </b-dropdown>
      </div>
      <div class="k-header-hamburger" style="width: 22px">
         <KBtnHamburger kind="1" v-model="openedMenu" />
      </div>

      <!-- Mboild Menu -->
      <b-sidebar
         key="menu"
         shadow
         v-model="openedMenu"
         no-header
         left
         width="min(100vw, 400px)"
      >
         <div class="p-3">
            <div class="d-flex justify-content-end">
               <span></span>
               <div>
                  <KBtnHamburger kind="1" v-model="openedMenu" />
               </div>
            </div>
            <!-- Navigation  -->
            <div>
               <h4 class="mb-4">Yatırımcı</h4>
               <div class="ml-3">
                  <div
                     v-for="(item, ii) in dropdownList1"
                     :key="ii"
                     class="mb-4"
                  >
                     <nuxt-link :to="item.link" class="py-2">
                        {{ $t(item.name) }}
                     </nuxt-link>
                  </div>
               </div>
            </div>
            <div>
               <h4 class="mb-4">Girişimci</h4>
               <div class="ml-3">
                  <div
                     v-for="(item, ii) in dropdownList2"
                     :key="ii"
                     class="mb-4"
                  >
                     <nuxt-link
                        :to="item.link"
                        class="py-2"
                        v-if="!item.disabled"
                     >
                        {{ $t(item.name) }}
                     </nuxt-link>
                     <p class="text-secondary" v-else>{{ $t(item.name) }}</p>
                  </div>
               </div>
            </div>
         </div>
         <!-- auth btns -->
         <div
            class="
               grid grid-cols-2
               gap-20
               position-absolute
               w-100
               px-3
               py-4
               bg-dark-2a
            "
            style="bottom: 7px"
            v-if="!loggedIn"
         >
            <b-button
               variant="outline-primary"
               class="mr-2 w-100"
               @click="showLogin"
               size="lg"
               >{{ $t("btn.login") }}</b-button
            >
            <b-button
               variant="primary"
               class="w-100"
               @click="showRegister"
               size="lg"
               >{{ $t("btn.register") }}</b-button
            >
         </div>
         <div v-else class="p-4">
            <h4 class="my-4">
               <nuxt-link to="/my/profile">Profile</nuxt-link>
            </h4>
            <h4 class="my-4">
               <nuxt-link to="/my/notifications">Notifications</nuxt-link>
            </h4>
            <h4 class="mt-6 mb-4 hover" @click="handleLogout">Logout</h4>
         </div>
      </b-sidebar>

      <!--  =================================
      LOGIN
      ================================= -->
      <b-sidebar
         key="login"
         shadow
         v-model="openedLogin"
         no-header
         right
         backdrop
         width="min(100vw, 400px)"
      >
         <div class="p-4">
            <!-- Close -->
            <div class="justify-content-end flex md:hidden">
               <span></span>
               <div>
                  <KBtnHamburger kind="1" v-model="openedLogin" />
               </div>
            </div>
            <!-- Content  -->
            <div class="mb-14 mt-0 mt-md-6">
               <h3 class="text-center text-primary">{{ $t("btn.login") }}</h3>
               <p class="mt-4 text-center p-2">
                  {{ $t("Not a member") }}
                  <span class="hover text-primary" @click="showRegister">{{
                     $t("btn.registerNow")
                  }}</span>
               </p>
            </div>
            <div>
               <div class="mb-7">
                  <p class="text-center mb-2 font-16">{{ $t("Email") }}</p>
                  <b-form-input
                     v-model="formLogin.email"
                     :placeholder="$t('Email')"
                     class="font-16 py-6"
                  ></b-form-input>
               </div>
               <div class="mb-4">
                  <p class="text-center mb-2 font-16">{{ $t("Password") }}</p>
                  <b-form-input
                     v-model="formLogin.password"
                     :placeholder="$t('Password')"
                     class="font-16 py-6"
                     type="password"
                  ></b-form-input>
               </div>
               <div class="mb-7 text-right">
                  <b-button variant="text" class="text-secondary">{{
                     $t("I forgot my password")
                  }}</b-button>
               </div>
            </div>
            <!-- btns -->
            <b-button
               variant="primary"
               class="w-100 mb-9"
               @click="handleLogin"
               size="lg"
               :disabled="loading"
               >{{ $t("btn.login") }}</b-button
            >
            <!-- Social Login -->
            <SocialLogin />
         </div>
      </b-sidebar>

      <!--  =================================
      Register
      ================================= -->
      <b-sidebar
         key="register"
         shadow
         v-model="openedRegister"
         no-header
         right
         backdrop
         width="min(100vw, 400px)"
      >
         <div class="p-4">
            <!-- Close -->
            <div class="justify-content-end flex md:hidden">
               <span></span>
               <div>
                  <KBtnHamburger kind="1" v-model="openedRegister" />
               </div>
            </div>
            <!-- Content  -->
            <div class="mb-14 mt-0 mt-md-6">
               <h3 class="text-center text-primary">
                  {{ $t("btn.register") }}
               </h3>
               <p class="mt-4 text-center p-2">
                  {{ $t("Do you have an account") }}
                  <span class="hover text-primary" @click="showLogin">{{
                     $t("btn.login")
                  }}</span>
               </p>
            </div>
            <div>
               <div class="mb-7">
                  <p class="text-center mb-2 font-16">{{ $t("Email") }}</p>
                  <b-form-input
                     v-model="formRegister.email"
                     :placeholder="$t('Email')"
                     class="font-16 py-6"
                  ></b-form-input>
               </div>
               <div class="mb-4">
                  <p class="text-center mb-2 font-16">{{ $t("Password") }}</p>
                  <b-form-input
                     v-model="formRegister.password"
                     :placeholder="$t('Password')"
                     class="font-16 py-6"
                     type="password"
                  ></b-form-input>
               </div>
               <div class="mb-4">
                  <p class="text-center mb-2 font-16">
                     {{ $t("PasswordConfirm") }}
                  </p>
                  <b-form-input
                     v-model="formRegister.passwordConfirm"
                     :placeholder="$t('Password')"
                     class="font-16 py-6"
                     type="password"
                  ></b-form-input>
               </div>
               <div class="mb-10">
                  <b-form-checkbox v-model="registerAccept">
                     {{ $t("AuthAgree") }}
                  </b-form-checkbox>
               </div>
            </div>
            <!-- btns -->
            <b-button
               variant="primary"
               class="w-100 mb-9"
               :disabled="!registerAccept"
               @click="handleRegister"
               size="lg"
               >{{ $t("btn.register") }}</b-button
            >
            <!-- Social Login -->
            <SocialLogin />
         </div>
      </b-sidebar>
   </div>
</template>

<script>
import { auth } from "@/utils/firebase";
import { mapState } from "vuex";
export default {
   props: {
      positionClass: {
         type: String,
         default: "k--home",
      },
   },
   computed: {
      ...mapState("auth", ["user"]),
      dropdownList2: function () {
         return [
            {
               name: "StartCampain",
               link: "/campaigns/create",
               disabled:
                  this.$store.state.auth.user &&
                  !(this.$store.state.auth.user?.role || []).includes(2),
            },
            {
               name: "HelpCenter",
               link: "/help/public-enlightenment/campaign_agreement",
            },
            { name: "HowToAccess", link: "/" },
         ];
      },
   },
   data() {
      return {
         openedMenu: false,
         openedLogin: this.$route.query.tab == "login",
         openedRegister: this.$route.query.tab == "register",
         dropdownList1: [
            { name: "Invest", link: "/kampanyalar" },
            { name: "HelpCenter", link: "/help/coporate/investment_committee" },
            { name: "HowToB", link: "/" },
         ],
         formLogin: {
            email: "orion763357@gmail.com",
            password: "123123",
         },
         formRegister: {
            email: "orion763357@gmail.com",
            password: "123123",
            passwordConfirm: "123123",
         },
         registerAccept: false,
         loading: false,
      };
   },
   methods: {
      showLogin() {
         this.openedMenu = false;
         this.openedLogin = true;
         this.openedRegister = false;
      },
      showRegister() {
         this.openedMenu = false;
         this.openedLogin = false;
         this.openedRegister = true;
      },
      async handleLogin() {
         this.loading = true;
         const email = this.formLogin.email;
         const password = this.formLogin.password;
         const res = await auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
               console.log(error, "error");
               this.errorMsg(error.message);
               this.loading = false;
            });
         console.log(res, "res");
         if (res?.user?.emailVerified === false) {
            this.errorMsg("Email is not verified");
            this.loading = false;
            return;
         }
         if (res?.user) {
            const idToken = await auth.currentUser.getIdToken();
            console.log(idToken, "idToken");
            this.loading = true;
            const success = await this.$store
               .dispatch("auth/login", { token: idToken })
               .finally(() => {
                  this.loading = false;
               });
            if (success) {
               const redirect = this.$route.query.redirect || "/";
               if (redirect == "/" && this.$route.name == "index")
                  location.reload();
               else this.$router.replace(redirect);
            }
         }
      },
      handleRegister() {
         const email = this.formRegister.email;
         const password = this.formRegister.password;
         auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
               // Signed in
               var user = userCredential.user;
               this.successMsg(
                  "Registation is successful, Confirm your Email box and verify your account"
               );
               this.openedRegister = false;
               console.log(user);
               user.sendEmailVerification();
               // ...
            })
            .catch((error) => {
               console.log(error);
               switch (error.code) {
                  case "auth/email-already-in-use":
                     this.errorMsg(
                        "The email address is already in use by another account."
                     );
                     break;

                  default:
                     this.errorMsg(error.message);
                     break;
               }
               // ..
            });
      },
      async handleLogout() {
         await this.$store.dispatch("auth/logout");
         auth.signOut();
         location.reload();
      },
      handleResetSidbar(e) {
         if (this.loggedIn) {
            if (window.innerWidth > 580) this.openedMenu = false;
         } else {
            if (window.innerWidth > 1080) this.openedMenu = false;
         }
      },
   },
   mounted() {
      window.addEventListener("resize", this.handleResetSidbar);
      this.$root.$on("showLogin", this.showLogin);
   },
   beforeDestroy() {
      window.removeEventListener("resize", this.handleResetSidbar);
   },
};
</script>
