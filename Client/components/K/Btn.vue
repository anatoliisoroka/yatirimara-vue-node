<template>
   <button :class="classC">
      <slot />
   </button>
</template>

<script>
export default {
   props: {
      variant: {
         // purple, yellow, white
         type: String,
         default: "purple",
      },
      rounded: {
         type: Boolean,
         default: false,
      },
      shadow: {
         type: Boolean,
         default: false,
      },
      disabled: {
         type: Boolean,
         default: false,
      },
      size: {
         // sm:, md:, lg:
         type: String,
         default: "",
      },
   },
   computed: {
      classC: function () {
         return [
            'btn',
            `btn-${this.variant}`,
            {
               [`btn-${this.size}`]: this.size,
               [`btn-shadow`]: this.shadow,
               disabled: this.disabled,
               active: this.active,
            },
         ];
      },
   },
};
</script>