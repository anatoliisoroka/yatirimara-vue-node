<template>
   <div class="w-max-1000">
      <ProfileHeader />
      <!-- Chart -->
      <div>
         <apexchart
            v-if="chartData.series.length"
            height="250"
            type="donut"
            :options="chartData.options"
            :series="chartData.series"
         ></apexchart>
      </div>
      <!-- List -->
      <div class="mt-5">
         <b-table
            class="rounded bg-white"
            hover
            :items="transaction.items"
            :fields="fields"
            stacked="sm"
            rounded
            responsive
            show-empty
            theadClass="bg-primary text-white"
            :busy="loading"
         >
            <!-- status -->
            <template #cell(status)="{ item }">
               <div
                  v-if="item.status == 1"
                  class="d-flex align-items-center mb-5"
               >
                  <div class="k-checked-icon-20 bg-danger">
                     <svg-icon
                        name="checked"
                        color="white"
                        width="12"
                     ></svg-icon>
                  </div>
                  <p class="pl-2">Disapproved</p>
               </div>
               <div
                  v-else-if="item.status == 2"
                  class="d-flex align-items-center mb-5"
               >
                  <div class="k-checked-icon-20 bg-success">
                     <svg-icon
                        name="checked"
                        color="white"
                        width="12"
                     ></svg-icon>
                  </div>
                  <p class="pl-2">Pending</p>
               </div>
               <div v-else class="d-flex align-items-center mb-5">
                  <div class="k-checked-icon-20 bg-success">
                     <svg-icon
                        name="checked"
                        color="white"
                        width="12"
                     ></svg-icon>
                  </div>
                  <p class="pl-2">Successful</p>
               </div>
            </template>
         </b-table>
         <KPaginate
            :total="transaction.total"
            :page.sync="qq.page"
            :limit="qq.limit"
            @pagination="getList"
         />
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         qq: {
            page: 1,
            limit: 10,
         },
         fields: [
            {
               key: "campaign.name",
               label: "Campaign Name",
            },
            {
               key: "createdAt",
               label: "Created Date",
               tdClass: "text-nowrap",
               formatter: (v) => {
                  return this.$moment(v).format("DD.MM.YYYY HH:mm");
               },
            },
            {
               key: "amount",
               label: "Amount",
               thClass: "text-nowrap",
            },
            {
               key: "payment_method",
               label: "Payment Form",
            },
            {
               key: "status",
               label: "Status",
            },
         ],
      };
   },
   computed: {
      ...mapState(["transaction", "transaction_chart", "loading"]),
      chartData: function () {
         let options = {
            labels: [],
            dataLabels: {
               enabled: false,
            },
            legend: {
               position: "right",
            },
            responsive: [
               {
                  breakpoint: 700,
                  options: {
                     legend: {
                        position: "bottom",
                     },
                  },
               },
            ],
            plotOptions: {
               pie: {
                  donut: {
                     labels: {
                        show: true,
                        name: {
                           color: "#6B7386"
                        },
                        value: {
                           color: "#583FB5",
                           fontWeight: 900,
                           formatter: function (val) {
                              return (
                                 new Intl.NumberFormat("de-DE").format(val) +
                                 "₺"
                              );
                           },
                        },
                        total: {
                           show: true,
                           label: "Total balance",
                           formatter: function (w) {
                              const total = w.globals.seriesTotals.reduce(
                                 (a, b) => {
                                    return a + b;
                                 },
                                 0
                              );
                              return (
                                 new Intl.NumberFormat("de-DE").format(total) +
                                 "₺"
                              );
                           },
                        },
                     },
                  },
               },
            },
         };
         let series = [];
         this.transaction_chart.forEach((el) => {
            options.labels.push(el.campaign?.name);
            series.push(el.paid);
         });
         return {
            options,
            series,
         };
      },
   },
   methods: {
      getList() {
         this.$store.dispatch("getTransaction", this.qq);
      },
   },
   mounted() {
      this.getList();
      this.$store.dispatch("getTransactionChart");
   },
};
</script>

<style>
</style>