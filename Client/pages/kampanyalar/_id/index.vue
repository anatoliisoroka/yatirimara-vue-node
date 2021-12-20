<template>
   <div v-if="event">
      <b-row class="mb-10 flex-wrap k-custom">
         <!-- Targeted Funding -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Hedeflenen Fonlama</p>
               <h5 class="text-primary">
                  {{ gsv(event, ["fund", "amount"]) | formatN }}₺
               </h5>
            </div>
         </b-col>
         <!-- Addional Funding -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Addional Funding</p>
               <h5 class="text-primary">
                  {{ gsv(event, ["fund", "amount_additonal"], 0) | formatN }}₺
               </h5>
            </div>
         </b-col>
         <!-- Funding Limit -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Funding Limit</p>
               <h5 class="text-primary">
                  <span v-if="event.fund">{{
                     ((event.fund.amount || 0) *
                        (event.fund.want_20_percent_addtional_funding
                           ? 1.2
                           : 1))
                        | formatN
                  }}</span>
                  ₺
               </h5>
            </div>
         </b-col>
         <!--Number of Investors  -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Number of Investors</p>
               <h5 class="text-primary">
                  {{ event.result_total_investors | formatN }}
               </h5>
            </div>
         </b-col>
         <!-- Total Investment Received -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Total Investment Received</p>
               <h5 class="text-primary">
                  {{ event.result_total_amount | formatN }}₺
               </h5>
            </div>
         </b-col>
         <!-- Share Offering Ratio  -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Share Offering Ratio</p>
               <h5 class="text-primary">
                  %{{ gsv(event, ["result", "ratio_offer"], 0) | formatN }}
               </h5>
            </div>
         </b-col>
         <!-- Average Investment -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Average Investment</p>
               <h5 class="text-primary">
                  {{ gsv(event, ["result", "avg"], 0) }}₺
               </h5>
            </div>
         </b-col>
         <!-- Highest Investment -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Highest Investment</p>
               <h5 class="text-primary">
                  {{ gsv(event, ["result", "max"], 0) }}₺
               </h5>
            </div>
         </b-col>
         <!-- Qualified Investor -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Qualified Investor</p>
               <h5 class="text-primary">
                  {{ event.result_total_investors_q | formatN }}
               </h5>
            </div>
         </b-col>
         <!-- Qualified Investment Rate  -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Qualified Investment Rate</p>
               <h5 class="text-primary">% {{ ratio_qualified | formatN }}</h5>
            </div>
         </b-col>
         <!-- Funding Start  -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Funding Start</p>
               <h5 class="text-primary">
                  {{
                     $moment(gsv(event, ["event_start"], 0)).format(
                        "DD.MM.YYYY"
                     )
                  }}
               </h5>
            </div>
         </b-col>
         <!-- Funding End  -->
         <b-col class="mb-4">
            <div class="bg-light p-3 text-center rounded-xl">
               <p class="text-secondary">Funding End</p>
               <h5 class="text-primary">
                  {{
                     $moment(gsv(event, ["event_end"], 0)).format("DD.MM.YYYY")
                  }}
               </h5>
            </div>
         </b-col>
      </b-row>
      <!-- Invest Section -->
      <div class="mb-10">
         <div class="d-flex align-items-center flex-column flex-md-row">
            <div class="mb-4 w-md-100" style="width: 250px">
               <div
                  class="border rounded-lg p-4"
                  :class="`${
                     error_amount ? 'border-danger' : 'border-primary'
                  }`"
                  
               >
                  <!-- amount -->
                  <h5 class="mb-4 text-primary">Invest</h5>
                  <b-input-group append="₺">
                     <b-form-input
                        v-model.number="form.amount"
                        type="number"
                        placeholder="0"
                        @input="
                           form.amount
                              ? (error_amount = false)
                              : (error_amount = true)
                        "
                     ></b-form-input>
                  </b-input-group>
               </div>
            </div>
            <div class="mb-2 flex-1 px-4">
               <b-row>
                  <b-col
                     v-for="ii in [50, 100, 200, 5000, 10000, 20000]"
                     :key="ii"
                     class="mb-2 mb-sm-4"
                  >
                     <b-button
                        variant="light"
                        class="w-100 text-secondary"
                        style="height: 50px; min-width: 100px; font-weight: 500"
                        @click="
                           form.amount = ii;
                           error_amount = false;
                        "
                        >{{ ii }} ₺</b-button
                     >
                  </b-col>
               </b-row>
            </div>
            <div class="mb-4">
               <b-button
                  variant="primary btn-shadow"
                  size="lg"
                  style="width: 160px"
                  @click="hSubmitShow"
                  >Invest</b-button
               >
            </div>
         </div>
      </div>
      <!-- Description -->
      <div class="mb-14">
         <p class="text-primary mb-2">
            <k-line />
            The payments you will make will be kept in Istanbul Takas ve Saklama
            Bankasi AS until the end of the funding.
         </p>
         <p class="text-primary mb-2">
            <k-line />
            The credit card or bank account you will make the payment must be in
            your own name
         </p>
      </div>
      <!-- Temp modal -->
      <b-modal
         v-model="dlg"
         centered
         hide-footer
         title-class="text-center"
         title="Payment Confirm"
         no-close-on-backdrop
         size="lg"
      >
         <div class="text-center">
            <p>
               Do you want to invest in this
               <span class="text-primary"> {{ event.name }}?</span>
            </p>
            <div class="mt-6">
               <b-overlay
                  :show="busyAction"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="danger"
                  class="mr-3 my-2 w-100 mx-auto"
                  style="max-width: 300px"
               >
                  <b-button
                     class="w-100"
                     variant="primary"
                     size="lg"
                     @click="hSubmit"
                  >
                     <span class="menu-text">Confirm</span>
                  </b-button>
               </b-overlay>
            </div>
         </div>
      </b-modal>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { MAKE_PAYMENT } from "@/api/transaction";
export default {
   data() {
      return {
         form: {
            amount: "",
         },
         error_amount: false,
         dlg: false,
         busyAction: false,
      };
   },
   computed: {
      ...mapState("campaign", ["event", "loading"]),
      ratio_qualified: function () {
         let rr = 0;
         if (this.event) {
            rr =
               Math.round(
                  (this.event.result_total_investors_q * 10000) /
                     (this.event.result_total_investors || 1)
               ) / 100;
         }
         return rr;
      },
   },
   methods: {
      //
      hSubmit() {
         this.busyAction = true;
         setTimeout(async () => {
            const res = await this.$apollo
               .mutate({
                  mutation: MAKE_PAYMENT,
                  variables: {
                     campaign_id: this.$route.params.id,
                     amount: this.form.amount,
                  },
                  fetchPolicy: "no-cache",
               })
               .catch((error) => {
                  error;
               });
            if (res?.data?.make_payment) {
               this.successMsg("Successfully Paid!");
               this.$store.dispatch("campaign/getEvent", this.$route.params.id);
               this.dlg = false;
            }
            this.busyAction = false;
         }, 2500);
      },
      hSubmitShow() {
         // input check
         if (!this.form.amount) {
            this.error_amount = true;
            return;
         } else this.error_amount = false;
         // Not auth check
         if (!this.loggedIn) {
            this.$root.$emit("showLogin");
            return;
         }
         // completed profile check
         if (!(this.$store.state.auth.user.role || []).length) {
            this.$router.push(
               `/complete-profile?redirect=${this.$route.fullPath}`
            );
            return;
         }
         if (!this.$store.state.auth.user.role.includes(1)) {
            // Permission check
            return this.errorMsg("You don't have Invester role");
         }
         // Owner check
         if (this.event.user_id == this.$store.state.auth.user._id) {
            return this.errorMsg("You can not invest your campaign");
         }
         this.dlg = true;
      },
   },
};
</script>
<style lang="scss" scoped>
.k-custom {
   .bg-light {
      min-width: 290px;
   }
}
</style>
