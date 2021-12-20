<template>
   <div class="accordion" role="tablist">
      <div v-for="(item, ii) in content.board_of_directors" :key="ii">
         <div @click="toggleActive(item.id)" class="k-accordian-title">
            <p>{{ item.title }}</p>
            <div class="k-accorian-icon">
               <span v-if="activeId == item.id">-</span>
               <span v-else>+</span>
            </div>
         </div>
         <b-collapse :visible="activeId == item.id">
            <div class="text-secondary p-3 k-accordian-desc">
               <img :src="item.avatar" alt="" width="100" height="100" class="rounded-full" />
               <p>{{ item.desc }}</p>
            </div>
         </b-collapse>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   data() {
      return {
         text: "asdf a",
         activeId: "",
      };
   },
   computed: {
      ...mapState("footer", ["content"]),
   },
   methods: {
      toggleActive(id) {
         if (id == this.activeId) this.activeId = "";
         else this.activeId = id;
      },
   },
   mounted(){
      setTimeout(() => {
         if (this.content.board_of_directors.length) this.activeId = this.content.board_of_directors[0]['id']
      }, 500);
   }
};
</script>

<style>
.k-accordian-title {
   display: flex;
   align-items: center;
   justify-content: space-between;
   cursor: pointer;
   border-bottom: 1px solid #d9d7d7;
   padding-top: 10px;
   padding-bottom: 10px;
   font-size: 18px;
}
.k-accorian-icon {
   display: flex;
   justify-content: center;
   align-items: center;
   background: var(--primary);
   color: white;
   border-radius: 999px;
   padding: 8px;
   width: 35px;
   height: 35px;
   font-size: 20px;
   font-weight: 900;
}
.k-accordian-desc{
  line-height: 30px;
}
.k-accordian-desc img{
  float: left;
  margin-right: 10px;
}
</style>