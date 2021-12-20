<template>
   <div class="p-2 my-5 w-max-1000">
      <!-- Funding -->
      <div class="mb-5">
         <h5 class="mb-3"><k-line /> Funding</h5>
         <b-row>
            <b-col cols="12" sm="6" md="4">
               <!-- title -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="What is the Value of the Initiative?*"
                        :msg="getMessage('title')"
                        :state="validate('title')"
                     />
                  </slot>
                  <b-form-input
                     v-model="form.title"
                     trim
                     placeholder="What is the Value of the Initiative"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- file period -->
               <b-form-group class="mb-3">
                  <k-label label="Fund Usage Period (Month)*" />
                  <k-file1
                     v-model="form.file_period"
                     :file1.sync="form.period_url"
                     accept=".pdf"
                  ></k-file1>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- file report -->
               <b-form-group class="mb-3">
                  <k-label label="Valuation Report*" />
                  <k-file1
                     v-model="form.file_report"
                     :file1.sync="form.report_url"
                     accept=".pdf"
                  ></k-file1>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- amount -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Target Funding Amount*"
                        :msg="getMessage('amount')"
                        :state="validate('amount')"
                     />
                  </slot>
                  <b-form-input
                     v-model.number="form.amount"
                     type="number"
                     placeholder="1.000.000,00 ₺"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- amount_max -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label label="Target Funding Cap Amount*" />
                  </slot>
                  <b-form-input
                     :value="amount_max"
                     disabled
                     class="bg-white"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- amount_min -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Target Funding Lower Limit Amount**"
                        :msg="getMessage('amount_min')"
                        :state="validate('amount_min')"
                     />
                  </slot>
                  <b-form-input
                     v-model="form.amount_min"
                     placeholder="1.000.000,00 ₺"
                  ></b-form-input>
               </b-form-group>
            </b-col>
         </b-row>
         <b-row>
            <b-col cols="12" sm="6">
               <!-- amount_want -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="How Much Funding Do You Need for Your Initiative?*"
                        :msg="getMessage('amount_want')"
                        :state="validate('amount_want')"
                     />
                  </slot>
                  <b-form-input
                     v-model="form.amount_want"
                     placeholder="1.000.000,00 ₺"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
               <!-- shared percent -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="How many % of shares do you want to give for a fund*"
                        :msg="getMessage('shares_percent')"
                        :state="validate('shares_percent')"
                     />
                  </slot>
                  <b-form-input
                     v-model.number="form.shares_percent"
                     type="number"
                     placeholder="%"
                  ></b-form-input>
               </b-form-group>
            </b-col>
         </b-row>
      </div>
      <!-- Values ​​After the Campaign -->
      <div class="mb-5">
         <h5 class="mb-3"><k-line /> Values ​​After the Campaign</h5>
         <b-row>
            <b-col cols="12" sm="6" md="4">
               <!-- title -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label
                        label="Total Number of Shares Offered for Sale*"
                        :msg="getMessage('shares_count')"
                        :state="validate('shares_count')"
                     />
                  </slot>
                  <b-form-input
                     v-model="form.shares_count"
                     placeholder="Total Number of Shares Offered for Sale"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- post funding capital -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label label="Post-Funding Capital*" />
                  </slot>
                  <k-file1
                     v-model="form.file_post_funding_capital"
                     :file1.sync="form.post_funding_capital_url"
                     accept=".pdf"
                  ></k-file1>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <!-- post funding capital -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label label="Unit Sales Price of Shares*" />
                  </slot>
                  <k-file1
                     v-model="form.file_unit_sale_price_shares"
                     :file1.sync="form.unit_sale_price_shares_url"
                     accept=".pdf"
                  ></k-file1>
               </b-form-group>
            </b-col>
         </b-row>
         <b-row>
            <b-col cols="12" sm="6">
               <!-- Unit Nominal Value of Shares* -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label label="Unit Nominal Value of Shares*" />
                  </slot>
                  <b-form-input
                     v-model="form.unit_nominal_value_shares"
                     placeholder="Unit Nominal Value of Shares"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6">
               <!-- Do You Want To Make Up To 20% Additional Funding? -->
               <b-form-group class="mb-3">
                  <slot name="label">
                     <k-label label=" " />
                  </slot>
                  <b-form-checkbox
                     v-model="form.want_20_percent_addtional_funding"
                     name="check-button"
                     size="lg"
                     switch
                     class="mb-5"
                     button-variant="warning"
                  >
                     <p class="font-16 mt-1">
                        Do You Want To Make Up To 20% Additional Funding?
                     </p>
                  </b-form-checkbox>
               </b-form-group>
            </b-col>
         </b-row>
      </div>
      <!-- Where will you use the funds you have collected?* -->
      <div class="mb-5">
         <h5 class="mb-3">
            <k-line /> Where will you use the funds you have collected?*
         </h5>
         <!-- Description* -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="Descripton*"
                  :msg="getMessage('description_where_use_funds')"
                  :state="validate('description_where_use_funds')"
               />
            </slot>
            <b-form-input
               v-model="form.description_where_use_funds"
               placeholder="Description"
            ></b-form-input>
         </b-form-group>
         <!-- Labels -->
         <b-row>
            <b-col>
               <k-label
                  label="Usage Start Date*"
                  :msg="getMessage('events')"
                  :state="validate('events')"
               />
            </b-col>
            <b-col>
               <k-label label="Usage End Date*" />
            </b-col>
            <b-col> <k-label label="Amount*" /></b-col>
         </b-row>
         <!-- List -->
         <b-row v-for="(item, ii) in form.events" :key="ii">
            <b-col cols="12" sm="4">
               <VueCtkDateTimePicker
                  v-model="form.events[ii].date_start"
                  formatted="L"
                  format="YYYY-MM-DD"
                  only-date
                  locale="TR"
                  :minDate="$moment().format('YYYY-MM-DD')"
                  :id="'date_start' + ii"
               />
            </b-col>
            <b-col cols="12" sm="4">
               <VueCtkDateTimePicker
                  v-model="form.events[ii].date_end"
                  formatted="L"
                  format="YYYY-MM-DD"
                  only-date
                  locale="TR"
                  :minDate="$moment().format('YYYY-MM-DD')"
                  :id="'date_end' + ii"
               />
            </b-col>
            <b-col cols="12" sm="4">
               <div class="d-flex">
                  <b-form-input
                     v-model="form.events[ii].amount"
                     placeholder="Amount"
                  ></b-form-input>
                  <b-button
                     class="p-0"
                     variant="text"
                     @click="form.events.splice(ii, 1)"
                  >
                     <div class="k-checked-icon bg-danger rotate-45">
                        <svg-icon
                           name="plus"
                           color="white"
                           width="14"
                        ></svg-icon>
                     </div>
                  </b-button>
               </div>
            </b-col>
         </b-row>
         <!-- add new date_start, date_end-->
         <b-row>
            <b-col cols="12" sm="4">
               <VueCtkDateTimePicker
                  v-model="event.date_start"
                  formatted="L"
                  format="YYYY-MM-DD"
                  only-date
                  locale="TR"
                  :minDate="eventMinDate"
                  id="date_start"
               />
            </b-col>
            <b-col cols="12" sm="4">
               <VueCtkDateTimePicker
                  v-model="event.date_end"
                  formatted="L"
                  format="YYYY-MM-DD"
                  only-date
                  locale="TR"
                  :minDate="eventMinDateEnd"
                  id="date_end"
               />
            </b-col>
            <b-col cols="12" sm="4">
               <div class="d-flex">
                  <b-form-input
                     v-model="event.amount"
                     placeholder="Amount"
                  ></b-form-input>
                  <b-button
                     class="p-0"
                     variant="text"
                     @click="hAddEvent"
                     :disabled="
                        !event.date_start || !event.date_end || !event.amount
                     "
                  >
                     <div class="k-checked-icon bg-primary">
                        <svg-icon
                           name="plus"
                           color="white"
                           width="16"
                        ></svg-icon>
                     </div>
                  </b-button>
               </div>
            </b-col>
         </b-row>
      </div>

      <!-- Additional Funding Sources only 20% funding -->
      <div class="mb-5">
         <h5 class="mb-3"><k-line /> Additional Funding Sources</h5>
         <!-- Description* -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label label="Descripton*" />
            </slot>
            <b-form-input
               v-model="form.description_additional"
               placeholder="Description"
               :disabled="!form.want_20_percent_addtional_funding"
            ></b-form-input>
         </b-form-group>
         <!-- Labels -->
         <b-row>
            <b-col>
               <k-label
                  label="Fund Delivery Date*"
                  :msg="error.additional"
                  :state="!error.additional"
               />
            </b-col>
            <b-col>
               <k-label label="Amount*" />
            </b-col>
            <b-col> </b-col>
         </b-row>
         <!-- deliveris list -->
         <b-row
            v-for="(item, ii) in form.events_additonal"
            :key="ii"
            class="my-1"
         >
            <b-col>
               <!-- <p class="pl-4">
                  {{ item.date }}                  
               </p> -->
               <b-form-group class="mb-3">
                  <VueCtkDateTimePicker
                     v-model="form.events_additonal[ii].date"
                     formatted="L"
                     format="YYYY-MM-DD"
                     only-date
                     locale="TR"
                     :minDate="$moment().format('YYYY-MM-DD')"
                     :disabled-dates="disabledDates"
                     :id="'delivery_' + ii"
                  />
               </b-form-group>
            </b-col>

            <b-col>
               <!-- <p>{{ item.amount }}</p> -->
               <b-form-group class="mb-3">
                  <b-form-input
                     v-model="form.events_additonal[ii].amount"
                     placeholder="1.000.000,00 ₺"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col>
               <div class="text-left">
                  <b-button
                     class="p-0"
                     variant="text"
                     @click="form.events_additonal.splice(ii, 1)"
                  >
                     <div class="k-checked-icon bg-danger rotate-45">
                        <svg-icon
                           name="plus"
                           color="white"
                           width="14"
                        ></svg-icon>
                     </div>
                  </b-button>
               </div>
            </b-col>
         </b-row>
         <!-- Add new Delivery -->
         <b-row>
            <b-col cols="12" sm="6" md="4">
               <b-form-group class="mb-3">
                  <VueCtkDateTimePicker
                     v-model="events_additonal.date"
                     formatted="L"
                     format="YYYY-MM-DD"
                     only-date
                     locale="TR"
                     :minDate="$moment().format('YYYY-MM-DD')"
                     :disabled-dates="disabledDates"
                     :disabled="!form.want_20_percent_addtional_funding"
                  />
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <b-form-group class="mb-3">
                  <b-form-input
                     v-model="events_additonal.amount"
                     placeholder="1.000.000,00 ₺"
                     :disabled="!form.want_20_percent_addtional_funding"
                  ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="4">
               <div
                  class="d-flex align-items-center hover"
                  @click="hAddDelivery"
                  :class="{
                     'text-secondary':
                        !events_additonal.amount || !events_additonal.date,
                  }"
               >
                  <div class="k-checked-icon bg-primary">
                     <svg-icon name="plus" color="white" width="16"></svg-icon>
                  </div>
                  <p class="pl-4">Add New</p>
               </div>
            </b-col>
         </b-row>
      </div>

      <!-- Comparison of Current and Post-Funding Shareholding Structure -->
      <div class="mb-5">
         <h5 class="mb-3">
            <k-line /> Comparison of Current and Post-Funding Shareholding
            Structure
         </h5>
         <!-- Description* -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="Descripton*"
                  :msg="getMessage('description_comparison_cur_post')"
                  :state="validate('description_comparison_cur_post')"
               />
            </slot>
            <b-form-textarea
               v-model="form.description_comparison_cur_post"
               placeholder="Description"
               rows="3"
            ></b-form-textarea>
         </b-form-group>
      </div>
      <!-- General Rationale and Basic Information -->
      <div class="mb-5">
         <h5 class="mb-3">
            <k-line /> General Rationale and Basic Information
         </h5>
         <!-- Description* -->
         <b-form-group class="mb-3">
            <slot name="label">
               <k-label
                  label="Descripton*"
                  :msg="getMessage('description_basic_information')"
                  :state="validate('description_basic_information')"
               />
            </slot>
            <b-form-textarea
               v-model="form.description_basic_information"
               placeholder="Description"
               rows="3"
            ></b-form-textarea>
         </b-form-group>
      </div>
      <!-- Finish and submit for approval -->
      <b-overlay
         :show="loading"
         rounded
         opacity="0.6"
         spinner-small
         spinner-variant="danger"
         class="mx-auto"
         style="max-width: 450px"
      >
         <b-button
            variant="primary"
            class="shadow w-100"
            size="lg"
            @click="hSubmit"
            >Finish and submit for approval</b-button
         >
      </b-overlay>
   </div>
</template>

<script>
import { required, maxValue } from "vuelidate/lib/validators";
import { FUND_UPDATE, CAMPAIGN } from "@/api/campaign";
export default {
   name: "Funding",
   data() {
      return {
         form: {
            title: "tt",
            file_period: null,
            file_report: null,
            period_url: "",
            report_url: "",
            amount: "",
            amount_min: "1",
            amount_want: "1",
            shares_percent: "1",
            shares_count: "1",
            date_start: "",
            date_end: "",
            //
            file_post_funding_capital: null,
            post_funding_capital_url: "",
            file_unit_sale_price_shares: "",
            unit_sale_price_shares_url: "",
            unit_nominal_value_shares: "uu",
            want_20_percent_addtional_funding: false,
            description_additional: "",
            //
            description_where_use_funds: "dd",
            events: [],
            events_additonal: [],
            description_comparison_cur_post: "dd",
            description_basic_information: "dd",
         },
         event: {
            date_start: "",
            date_end: "",
            amount: "",
         },
         events_additonal: {
            date: "",
            amount: "",
         },
         loading: false,
         error: {
            additional: false,
         },
      };
   },
   validations: {
      form: {
         title: {
            required,
         },
         amount: {
            required,
         },
         amount_min: {
            required,
         },
         amount_want: {
            required,
         },
         shares_percent: {
            required,
            maxValue: maxValue(100),
         },
         shares_count: {
            required,
         },
         description_where_use_funds: {
            required,
         },
         description_comparison_cur_post: {
            required,
         },
         description_basic_information: {
            required,
         },
         events: {
            required,
         },
      },
   },
   computed: {
      disabledDates: function () {
         return this.form.events_additonal.map((ee) => ee.date);
      },
      amount_max: function () {
         let mm = this.form.amount || 0;
         if (this.form.want_20_percent_addtional_funding) mm = mm * 1.2;
         return mm;
      },
      eventMinDate: function () {
         let minDate = this.$moment().format("YYYY-MM-DD");
         const mmm = this.form.events.map((ee) => ee.date_end);
         console.log(mmm, "mmm");
         if (mmm.length) {
            const max_date = mmm.reduce(function (a, b) {
               return a > b ? a : b;
            });
            minDate = this.$moment(max_date).format("YYYY-MM-DD");
         }
         return minDate;
      },
      eventMinDateEnd: function () {
         let minDate = this.$moment().format("YYYY-MM-DD");
         if (this.event.date_start)
            minDate = this.$moment(this.event.date_start).format("YYYY-MM-DD");
         return minDate;
      },
   },
   methods: {
      hAddDelivery() {
         if (!this.events_additonal.date || !this.events_additonal.amount)
            return false;
         this.form.events_additonal.push({ ...this.events_additonal });
         this.events_additonal = {
            date: "",
            amount: "",
         };
      },
      hAddEvent() {
         this.form.events.push({ ...this.event });
         this.event = {
            date_start: this.event.date_end,
            date_end: "",
            amount: "",
         };
      },
      async hSubmit() {
         this.hAddDelivery();
         this.form.events_additonal = this.form.events_additonal.filter(
            (el) => el.date && el.amount
         );
         if (this.event.date_start && this.event.date_end && this.event.amount)
            this.hAddEvent();

         this.form.events = this.form.events.filter(
            (el) => el.date_start && el.date_end && el.amount
         );

         if (
            !this.form.events_additonal.length &&
            this.form.want_20_percent_addtional_funding
         ) {
            this.error.additional = this.$t("valid.required", [""]);
         } else {
            this.error.additional = false;
         }
         if (this.anyError() || this.error.additional) return false;

         const res = await this.$apollo
            .mutate({
               mutation: FUND_UPDATE,
               variables: {
                  _id: this.$route.params.id,
                  form: this.form,
               },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               error;
            });

         if (res?.data?.fund_update?.fund) {
            this.initalizeForm(res.data.fund_update.fund);
            this.successMsg("Successfully Updated!");
         }
      },
      initalizeForm(form) {
         if (!form.events_additonal) form.events_additonal = [];
         if (!form.events) form.events = [];
         form.file_period = null;
         form.file_report = null;
         form.file_post_funding_capital = null;
         form.file_unit_sale_price_shares = null;
         this.form = form;
      },
   },
   async mounted() {
      if (this.$route.params.id.toLowerCase() != "create") {
         this.loading = true;
         const res = await this.$apollo
            .query({
               query: CAMPAIGN,
               variables: { _id: this.$route.params.id },
               fetchPolicy: "no-cache",
            })
            .catch((error) => {
               return { error };
            });
         this.loading = false;
         if (!res.error) {
            this.initalizeForm(res.data.campaign.fund);
         } else {
            this.error = true;
         }
      }
   },
};
</script>