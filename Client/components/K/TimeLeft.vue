<template>
   <span>{{ timeLeft }}</span>
</template>

<script>
export default {
   name: "TimerLeft",
   props: {
      value: {},
      hms: {
         type: Boolean,
         default: false,
      },
   },

   data() {
      return {
         timeLeft: "",
         polling: null,
      };
   },
   mounted() {
      let endStampL = this.value;
      if (/^\d{4}-\d{2}-\d{2}$/.test(this.value))
         endStampL = this.value + " 23:59:59";
      const endStamp = +new Date(endStampL);
      this.polling = setInterval(() => {
         const now = new Date().getTime();
         const distance = (endStamp - now) / 1000;
         let days = 0,
            hours = 0,
            mins = 0,
            secs = 0;

         days = Math.floor(distance / 86400);
         hours = Math.floor((distance % 86400) / 3600);
         const temp_left_sec = distance - days * 86400 - hours * 3600;
         mins = Math.floor(temp_left_sec / 60);
         secs = temp_left_sec % 60;

         let txt = "";
         if (this.hms) {
            if (days != 0) txt = days + " gün";
            if (hours != 0) txt = (txt ? txt + " " : "") + hours + " hours";
            if (mins != 0) txt = (txt ? txt + " " : "") + mins + " minutes";
            if (days == 0 && hours == 0)
               txt = (txt ? txt + " " : "") + secs + " sec";
         } else {
            if (days != 0) txt = days + " gün";
            else if (hours != 0) txt = hours + " hours";
            else if (mins != 0) txt = mins + " minutes" + secs + " sec";
            else txt = secs + " sec";
         }
         this.timeLeft = txt;

         if (distance < 0) {
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
