<template>
   <div class="mt-4">
      <!-- Tabs -->
      <div class="k-switcher mx-auto k-scroll">
         <nuxt-link
            :class="{
               active: ![
                  'kampanyalar-id-idea',
                  'kampanyalar-id-team',
                  'kampanyalar-id-documents',
                  'kampanyalar-id-award',
                  'kampanyalar-id-discuss',
                  'kampanyalar-id-discuss-thread',
                  'kampanyalar-id-investors',
               ].includes($route.name),
            }"
            :to="`/kampanyalar/${$route.params.id}`"
            replace
         >
            Pay Satış Ekranı
         </nuxt-link>
         <nuxt-link
            :class="{ active: $route.name == 'kampanyalar-id-idea' }"
            :to="`/kampanyalar/${$route.params.id}/idea`"
            replace
         >
            Fikir
         </nuxt-link>
         <nuxt-link
            :class="{ active: $route.name == 'kampanyalar-id-team' }"
            :to="`/kampanyalar/${$route.params.id}/team`"
            replace
         >
            Takım
         </nuxt-link>
         <nuxt-link
            :class="{ active: $route.name == 'kampanyalar-id-documents' }"
            :to="`/kampanyalar/${$route.params.id}/documents`"
            replace
         >
            Dosyalar
         </nuxt-link>
         <nuxt-link
            :class="{ active: $route.name == 'kampanyalar-id-award' }"
            :to="`/kampanyalar/${$route.params.id}/award`"
            replace
         >
            Belge, Ödül ve Hukuki Durum
         </nuxt-link>
         <nuxt-link
            :class="{
               active: [
                  'kampanyalar-id-discuss',
                  'kampanyalar-id-discuss-thread',
               ].includes($route.name),
            }"
            :to="`/kampanyalar/${$route.params.id}/discuss`"
            replace
         >
            Tartışmalar
         </nuxt-link>
         <nuxt-link
            :class="{ active: $route.name == 'kampanyalar-id-investors' }"
            :to="`/kampanyalar/${$route.params.id}/investors`"
            replace
         >
            Yatırımcılar
         </nuxt-link>
      </div>
      <!-- Content -->
      <div class="p-2 p-sm-5">
         <div v-if="loading">
            <b-skeleton width="50%" height="50px"></b-skeleton>
            <b-skeleton width="75%" height="50px"></b-skeleton>
            <b-skeleton width="100%" height="50px"></b-skeleton>
         </div>
         <NoData v-else-if="!event" />
         <div
            class="
               k-campaign-fund
               d-flex
               flex-column flex-md-row
               align-items-center align-items-md-start
            "
         >
            <!-- Summary Card -->
            <div
               v-if="event"
               class="
                  k-card
                  bg-white
                  rounded-xl
                  p-2 p-sm-6
                  pb-4
                  mb-5 mb-md-0
                  w-sm-100
               "
               style="max-width: 555px; width: 555px"
            >
               <div class="d-flex">
                  <b-img
                     class="float-left mr-4"
                     :src="event.logo"
                     width="100"
                     height="100"
                     rounded
                     style="box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15)"
                  ></b-img>
                  <div class="flex-1">
                     <div class="d-flex align-items-center">
                        <h5 class="flex-1">{{ event.name_enterprise }}</h5>
                        <!-- Follow -->
                        <div
                           class="rounded-full border p-2 border-warning hover"
                           @click="handleFollow"
                        >
                           <svg-icon
                              name="heart-fill"
                              original
                              width="20"
                              v-if="follows.includes($route.params.id)"
                           ></svg-icon>
                           <svg-icon
                              name="heart"
                              original
                              width="20"
                              color="var(--warning)"
                              v-else
                           ></svg-icon>
                        </div>
                     </div>
                     <div class="text-secondary mt-2">
                        {{ event.description1 }}
                     </div>
                  </div>
               </div>
               <hr />
               <div class="text-center mb-4">
                  <h5 class="mb-2">{{ event.name }}</h5>
                  <p class="text-secondary">
                     {{ event.description }}
                  </p>
               </div>
               <div class="bg-light rounded-xl p-4">
                  <div class="d-flex">
                     <svg-icon name="timer" original width="20"></svg-icon>
                     <p class="text-secondary pl-2" v-if="event.event_end">
                        <KTimeLeft :value="event.event_end" />
                        kaldı
                     </p>
                     <p v-else class="text-secondary pl-2">Not started yet</p>
                  </div>
                  <!-- Pregress & Status-->
                  <div
                     class="d-flex justify-content-between align-items-center"
                  >
                     <!-- bar -->
                     <div
                        class="
                           bg-white
                           rounded-full
                           d-flex
                           align-items-center
                           justify-conent-center
                           p-2
                        "
                     >
                        <vue-ellipse-progress
                           :progress="
                              Math.round((event.progress || 0) * 1000) / 10
                           "
                           :size="160"
                           :legendFormatter="
                              ({ currentValue }) =>
                                 '%' +
                                 new Intl.NumberFormat('de-DE').format(
                                    currentValue
                                 )
                           "
                           :loading="false"
                           color="var(--primary)"
                           color-fill="white"
                           fontColor="var(--primary)"
                           :half="false"
                           reverse
                           fontSize="2rem"
                           :thickness="2"
                           :empty-thickness="0"
                           :dot="{
                              size: 10,
                              backgroundColor: 'var(--primary)',
                           }"
                        >
                        </vue-ellipse-progress>
                     </div>
                     <!-- values -->
                     <div class="flex-1 ml-6">
                        <!-- currency ₺-->
                        <p class="mb-2">
                           Targeted Funding =
                           <span class="text-primary font-weight-bold">{{
                              gsv(event.fund, ["amount"], 0) | formatN
                           }}</span>
                           <span class="text-primary">₺</span>
                        </p>
                        <p class="mb-2">
                           Investment Received =
                           <span class="text-primary font-weight-bold">{{
                              event.result_total_amount | formatN
                           }}</span>
                           <span class="text-primary">₺</span>
                        </p>
                        <p class="mb-2">
                           Invester =
                           <span class="text-primary font-weight-bold">{{
                              event.result_total_investors | formatN
                           }}</span>
                        </p>
                        <p class="mb-2">
                           Qualified Investor =
                           <span class="text-primary font-weight-bold">{{
                              event.result_total_investors_q | formatN
                           }}</span>
                        </p>
                     </div>
                  </div>
               </div>
               <!-- Social Sharing -->
               <div class="d-flex justify-content-center py-4">
                  <SocialShare
                     :url="share_link"
                     :title="event.name"
                     :description="event.description"
                     quote=""
                     hashtags="yatimara,invest"
                  />
               </div>
               <!-- contact button group -->
               <b-row class="mb-4">
                  <b-col>
                     <b-button variant="outline-primary" size="lg" class="w-100"
                        >Contact</b-button
                     >
                  </b-col>
                  <b-col>
                     <b-button
                        variant="primary btn-shadow"
                        size="lg"
                        class="w-100"
                        @click="goInvestButton"
                        >Invest</b-button
                     >
                  </b-col>
               </b-row>
            </div>
            <!-- Right Section-->
            <div
               class="
                  bg-white
                  rounded-xl
                  p-2 p-sm-6
                  flex-1
                  ml-0 ml-md-4
                  w-sm-100 w-100
               "
            >
               <nuxt-child />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
   data() {
      return {
         share_link: window.origin + this.$route.fullPath,
      };
   },
   computed: {
      ...mapState("campaign", ["event", "loading"]),
      ...mapGetters("auth", ["follows"]),
      ...mapState("auth", ["user"]),
   },
   methods: {
      async goInvestButton() {
         if (!this.loggedIn) {
            this.$root.$emit("showLogin");
            return;
         }
         if (this.$route.name != "kampanyalar-id") {
            this.$router.push({ name: "kampanyalar-id" });
            await this.$nextTick();
            setTimeout(() => {
               this.scrollIntoView();
            }, 500);
         } else {
            this.scrollIntoView();
         }
      },
      scrollIntoView() {
         const hh = document.body.scrollHeight - 50;
         try {
            window.scrollTo({
               top: hh,
               behavior: "smooth",
            });
         } catch (error) {
            document.body.scrollTop = hh;
            document.documentElement.scrollTop = hh;
         }
      },
      handleFollow() {
         if (!this.loggedIn) {
            this.$root.$emit("showLogin");
            return;
         }
         if (this.event.user_id == this.user._id) {
            return this.errorMsg("This campaign is yours");
         }
         this.$store.dispatch("auth/follow", this.$route.params.id).then(() => {
            this.successMsg();
         });
      },
   },
   created() {
      if (!this.event || this.event._id != this.$route.params.id) {
         this.$store.dispatch("campaign/getEvent", this.$route.params.id);
      }
      if (this.loggedIn) {
         if (this.user.follows == undefined) {
            this.$store.dispatch("auth/me");
         }
      }
   },
};
</script>
