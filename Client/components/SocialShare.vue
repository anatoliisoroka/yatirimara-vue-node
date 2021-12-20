<template>
   <div class="d-flex align-items-center">
      <ShareNetwork
         network="twitter"
         :url="url"
         :title="title"
         :description="quote"
         :quote="quote"
         :hashtags="hashtags"
      >
         <div class="p-2 hover">
            <svg-icon
               name="twitter"
               original
               :width="size == 'lg' ? '20' : '16'"
            ></svg-icon>
         </div>
      </ShareNetwork>
      <ShareNetwork
         network="LinkedIn"
         :url="url"
         :title="title"
         :description="quote"
         :quote="quote"
         :hashtags="hashtags"
      >
         <div class="p-2 hover">
            <svg-icon
               name="linkedin"
               :width="size == 'lg' ? '20' : '16'"
               color="#007AB5"
            ></svg-icon>
         </div>
      </ShareNetwork>
      <ShareNetwork
         network="facebook"
         :url="url"
         :title="title"
         :description="quote"
         :quote="quote"
         :hashtags="hashtags"
      >
         <div class="p-2 hover">
            <svg-icon
               name="facebook"
               :height="size == 'lg' ? '18' : '14'"
               color="#1E4FAD"
            ></svg-icon>
         </div>
      </ShareNetwork>
      <ShareNetwork
         network="Email"
         :url="url"
         :title="title"
         :description="quote"
         :quote="quote"
         :hashtags="hashtags"
      >
         <div class="p-2 hover">
            <svg-icon
               name="google"
               :height="size == 'lg' ? '18' : '14'"
               original
            ></svg-icon>
         </div>
      </ShareNetwork>
   </div>
</template>

<script>
export default {
   props: {
      size: {
         type: String,
         default: "lg",
      },
      url: {
         type: String,
         default: window.origin,
      },
      title: String,
      description: String,
      quote: String,
      hashtags: {
         type: String,
         default: "yatimara,invest",
      },
   },
};
</script>