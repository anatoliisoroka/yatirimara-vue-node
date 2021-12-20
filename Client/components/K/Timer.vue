<template>
   <span>{{ timeLeft }}s</span>
</template>

<script>
export default {
   name: "KTimer",
   props: ["endTime"],
   data() {
      return {
         timeLeft: this.endTime,
         polling: null,
      };
   },
   created() {
      if (!this.timeLeft) return false;
      this.polling = setInterval(() => {
         this.timeLeft -= 1;
         if (this.timeLeft <= 0) {
            clearInterval(this.polling);
            this.timeLeft = 0;
            this.$emit("ended");
         }
      }, 1000);
   },
   beforeDestroy() {
      clearInterval(this.polling);
   },
};
</script>
