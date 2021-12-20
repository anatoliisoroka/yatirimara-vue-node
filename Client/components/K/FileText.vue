<template>
   <div @click="goDetail" class="hover">
      <template v-if="fileName">
         <svg-icon
            v-if="['ppt', 'pptx'].includes(extensionName)"
            original
            :width="iconWidth"
            name="ppt"
         ></svg-icon>
         <svg-icon
            v-else-if="['doc', 'docx'].includes(extensionName)"
            original
            :width="iconWidth"
            name="word"
         ></svg-icon>
         <svg-icon
            v-else-if="extensionName == 'pdf'"
            original
            :width="iconWidth"
            name="pdf"
         ></svg-icon>
         <svg-icon
            v-else-if="['png', 'jpg', 'jpeg'].includes(extensionName)"
            original
            :width="iconWidth"
            name="image"
         ></svg-icon>
         <svg-icon v-else original width="20" name="file"></svg-icon>
      </template>
      {{ fileName }}
   </div>
</template>

<script>
export default {
   props: {
      value: {
         type: String,
         required: true,
      },
      iconWidth: {
         type: [String],
         default: '20',
      },
   },
   computed: {
      fileName: function () {
         if (this.value) {
            return this.value.match(/[^/]*$/)[0];
         }
         return "";
      },
      extensionName: function(){
         return this.fileExt(this.value)
      }      
   },
   methods: {
      goDetail() {
         try {
            window.open(window.origin + this.value, "_blank");
         } catch (error) {
            {
               error;
            }
         }
      },
   },
};
</script>