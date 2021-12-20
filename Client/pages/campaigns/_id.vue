<template>
   <div>
      <!-- Tabs -->
      <div class="k-switcher mx-auto k-scroll">
         <p
            :class="{
               active: $route.query.tab == 'profile' || !$route.query.tab,
            }"
            @click="changeTab('profile')"
         >
            Campaign Profile
         </p>
         <p
            :class="{ active: $route.query.tab == 'idea' }"
            @click="changeTab('idea')"
         >
            Idea
         </p>
         <p
            :class="{ active: $route.query.tab == 'team' }"
            @click="changeTab('team')"
         >
            Team
         </p>
         <p
            :class="{ active: $route.query.tab == 'documents' }"
            @click="changeTab('documents')"
         >
            Documents
         </p>
         <p
            :class="{ active: $route.query.tab == 'award-legal' }"
            @click="changeTab('award-legal')"
         >
            Document, Award and Legal Status
         </p>
         <p
            :class="{ active: $route.query.tab == 'funding' }"
            @click="changeTab('funding')"
         >
            Funding
         </p>
      </div>
      <!-- Tab content -->
      <div>
         <CampaignIdea v-if="$route.query.tab == 'idea'" />
         <CampaignTeam v-else-if="$route.query.tab == 'team'" />
         <CampaignDocument v-else-if="$route.query.tab == 'documents'" />
         <CampaignAward v-else-if="$route.query.tab == 'award-legal'" />
         <CampaignFunding v-else-if="$route.query.tab == 'funding'" />
         <CampaignProfile v-else />
      </div>
   </div>
</template>

<script>
export default {
   middleware: ["isAuth", "hasRole", "isEntrepreneur"],
   methods: {
      changeTab(tab) {
         tab = tab || "profile";
         if (this.$route.query.tab != tab) {
            if (
               this.$route.params.id.toLowerCase() == "create" &&
               tab != "profile"
            )
               this.errorMsg("Firstly you need to complete profile");
            else {
               {
                  this.$router.replace({
                     name: this.$route.name,
                     params: this.$route.params,
                     query: { tab },
                  });
               }
            }
         }
      },
   },
   created() {
      if (
         this.$route.params.id.toLowerCase() == "create" &&
         this.$route.query.tab != "profile"
      ) {
         this.$router.replace({
            name: this.$route.name,
            params: this.$route.params,
            query: { tab: "profile" },
         });
      }
   },
};
</script>