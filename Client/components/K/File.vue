<template>
   <div>
      <div
         class="k-image-btn ku-upload"
         :style="`width: ${width}px; height: ${height}px`"
      >
         <template v-if="file1 || file">
            <video
               v-if="['mp4', 'webm'].includes(fileExt(file1))"
               :src="file1"
            ></video>
            <b-img v-else :src="file1"></b-img>
            <div class="k-img-edit-btn">
               <svg-icon
                  color="yellow"
                  class="ml-2"
                  name="eye"
                  width="30"
                  @click="goDetail"
               ></svg-icon>
               <svg-icon
                  name="delete"
                  width="26"
                  color="yellow"
                  class="ml-2"
                  @click="hClose"
               ></svg-icon>
            </div>
         </template>
         <b-form-file
            v-else
            v-model="file"
            drop-placeholder="Drop file here..."
            class="k-upload"
            :accept="accept"
            @input="onFileChange"
            :style="`height: ${height}; width: ${width}`"
         >
            <template slot="placeholder">
               <div
                  class="k-file"
                  :style="`height: ${height}; width: ${width}`"
               >
                  <svg-icon
                     name="upload"
                     width="40"
                     color="var(--primary)"
                  ></svg-icon>
                  <p>
                     <slot></slot>
                  </p>
               </div>
            </template>

            <template slot="drop-placeholder">
               <div
                  class="k-file k-drop-placeholder"
                  :style="`height: ${height}; width: ${width}`"
               >
                  <div class="k-icon">
                     <p>Drop Here!</p>
                  </div>
               </div>
            </template>
         </b-form-file>
      </div>
   </div>
</template>

<script>
// Video or Image File
import VueCropper from "vue-cropperjs/VueCropper";
import "cropperjs/dist/cropper.css";
export default {
   name: "KFile",
   props: {
      accept: {
         type: String,
         default: ".png, .jpg, .jpeg, .mp4",
      },
      height: {
         type: [String, Number],
         default: 200,
      },
      width: {
         type: [String, Number],
         default: 200,
      },
      file1: {
         type: String,
         default: "",
      },
      value: {},
   },
   components: { VueCropper },  
   data() {
      return {
         file: null,
      };
   },
   methods: {
      onFileChange(file) {
         this.$emit("input", file);
         this.$emit("update:file1", URL.createObjectURL(file));
      },
      hClose() {
         this.file = null;
         this.$emit("input", null);
         this.$emit("update:file1", "");
      },
      goDetail() {
         try {
            if (this.file1.indexOf("blob:") != -1)
               window.open(this.file1, "_blank");
            else {
               window.open(window.origin + this.file1, "_blank");
            }
         } catch (error) {
            {
               error;
            }
         }
      },
   },
};
</script>
<style lang="scss">
.k-image-btn {
   position: relative;
   overflow: hidden;
   border-radius: 10px;
   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }
   .k-img-edit-btn {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      background: #583fb5aa;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0;
   }
   &:hover {
      .k-img-edit-btn {
         opacity: 1;
         transition: 0.3s;
      }
   }
}

.k-file {
   cursor: pointer;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: var(--light);
   height: 100%;
   &.k-drop-placeholder {
      border: 2px dashed var(--dark);
   }
}
</style>
