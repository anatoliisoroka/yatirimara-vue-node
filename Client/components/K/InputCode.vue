<template>
   <div class="number-code">
      <input name="code" class="code-input" required />
      <input name="code" class="code-input" required />
      <input name="code" class="code-input" required />
      <input name="code" class="code-input" required />
      <input name="code" class="code-input" required />
      <input name="code" class="code-input" required />
   </div>
</template>

<script>
export default {
   props: ["value"],
   methods: {
      onSubmit() {
         const code = [...document.getElementsByTagName("input")]
            .filter(({ name }) => name)
            .map(({ value }) => value)
            .join("");
         this.$emit('input', code)
      },
      onClear(){
        const inputElements = [...document.querySelectorAll("input.code-input")];
        inputElements.forEach((ele, index) => {
          ele.value = ''  
          // this.$emit('input', '')        
        });
      }
   },
   mounted() {
      const inputElements = [...document.querySelectorAll("input.code-input")];
      const that = this
      inputElements.forEach((ele, index) => {
         ele.addEventListener("keydown", (e) => {
            if (e.keyCode === 8 && e.target.value === "")
               inputElements[Math.max(0, index - 1)].focus();
         });
         ele.addEventListener("input", (e) => {
            const [first, ...rest] = e.target.value;
            e.target.value = first ?? "";
            if (index !== inputElements.length - 1 && first !== undefined) {
               inputElements[index + 1].focus();
               inputElements[index + 1].value = rest.join("");
               inputElements[index + 1].dispatchEvent(new Event("input"));
            }
            that.onSubmit()
         });
      });
   },
};
</script>

<style lang="scss" scoped>
.number-code {
   display: flex;
   input.code-input {
      font-size: 1.5em;
      width: 1em;
      text-align: center;
      flex: 1 0 1em;
      margin-right: 5px;
      margin-left: 5px;
   }
}
</style>