<template>
    <nuxt-child />
</template>

<script>
export default {
  layout: "my",
  name: "MyLayoutContent",
  middleware: ["isAuth", "hasRole"],
  
};
</script>
