<template>
   <div class="min-vh-100 d-flex">
      <div class="ku-aside">
         <Logo class="mx-auto py-4 px-6" />
         <div class="text-center mt-5 logo-sm">
            <svg-icon name="logo-sm" original width="50"></svg-icon>
         </div>
         <div class="menu-box">
            <div
               v-for="(item, ii) in menu"
               :key="ii"
               class="menu-item"
               :class="{ active: item.route_name == $route.name }"
            >
               <div class="menu-tip-top"></div>
               <nuxt-link nuxt-link :to="item.link">
                  <svg-icon
                     v-if="item.icon"
                     :name="item.icon"
                     width="25"
                  ></svg-icon>
                  <span>{{ item.name }}</span>
               </nuxt-link>
               <div class="menu-tip-bottom"></div>
            </div>
         </div>
      </div>
      <div class="k-layout-content w-100">
         <Header positionClass="k--my" />
         <nuxt class="" />
      </div>
   </div>
</template>

<script>
export default {
   name: "MyLayout",
   data() {
      return {
         menu: [
            {
               name: "My Profile",
               link: "/my/profile",
               route_name: "my-profile",
               icon: "user",
            },
            {
               name: "Entrepreneur Registration",
               link: "/my/register-entrepreneur",
               route_name: "my-register-entrepreneur",
               icon: "enterprise-user-fill",
            },
            {
               name: "Investor Registration",
               link: "/my/register-investor",
               route_name: "my-register-investor",
               icon: "money-eye",
            },
            {
               name: "Security And Login",
               link: "/my/security-login",
               route_name: "my-security-login",
               icon: "security",
            },
            {
               name: "Notifications",
               link: "/my/notifications",
               route_name: "my-notifications",
               icon: "notification",
            },
            {
               name: "My Campaigns",
               link: "/my/campaigns",
               route_name: "my-campaigns",
               icon: "events",
            },
            {
               name: "My Favorites",
               link: "/my/favorites",
               route_name: "my-favorites",
               icon: "heart-fill",
            },
            {
               name: "My Investment Account",
               link: "/my/investment",
               route_name: "my-investment",
               icon: "investment",
            },
         ],
      };
   },
};
</script>

<style></style>
