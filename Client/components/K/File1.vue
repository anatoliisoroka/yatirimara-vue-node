<template>
   <div>
      <div>
         <div
            v-if="file1 || file"
            class="d-flex justify-content-between align-items-center"
         >
            <k-file-text :value="file ? file.name : file1" />
            <button class="close" @click="hClose">×</button>
         </div>
      </div>
      <div v-if="!file1 && !file">
         <b-form-file
            v-model="file"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            @input="onFileChange"
            :accept="accept"
         ></b-form-file>
      </div>
   </div>
</template>

<script>
export default {
   name: "KFile1",
   props: {
      accept: {
         type: String,
         default: ".png, .jpg, .jpeg",
      },
      size: {
         type: [String, Number],
         default: 100,
      },
      file1: {
         type: String,
         default: "",
      },
      value: {},
   },
   data() {
      return {
         file: null,
      };
   },
   methods: {
      onFileChange() {
         this.$emit("input", this.file);
         this.$emit("update:file1", "");
      },
      hClose() {
         this.file = null;
         this.$emit("input", null);
         this.$emit("update:file1", "");
      },
   },
   watch: {
      value(nn){
         this.file = nn
      }
   }
};
</script>