<template>
   <div>
      <b-table hover bordered :items="items" :fields="fields" stacked="sm" class="bg-white rounded">
         <template #cell(first_name)="data">
            {{ data.item.last_name }} {{ data.item.first_name }}          
        </template>
      </b-table>
   </div>
</template>

<script>
export default {
   data() {
      return {
         items: [
            { group: "A", first_name: "Dickerson", last_name: "Macdonald" , pay: "15000TL", ratio: 12},
            { group: "A", first_name: "Larsen", last_name: "Shaw" , pay: "45000TL", ratio: 34 },
            { group: "B", first_name: "Geneva", last_name: "Wilson" , pay: "15000TL", ratio: 54 },
            { group: "C", first_name: "Jami", last_name: "Carney" , pay: "35000TL", ratio: 1 },
         ],
         fields: [
          {
            key: "first_name",
            label: "PARTNER'S TRADE TITLE / NAME SURNAME",
          },
          {
            key: 'group',
            label: 'SHAREHOLDERS GROUP',
            sortable: false
          },
          {
            key: 'pay',
            label: 'PAY tutari',
            sortable: true,
          },
          {
            key: 'ratio',
            label: 'SHARE RATIO',
          }
        ],
      };
   },
};
</script>

<style>
</style>