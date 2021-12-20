<template>
   <!-- profile -->
   <div>
      <!-- v-b-modal.modal-file -->
      <div
         @click="openModal"
         class="k-image-btn"
         :class="{ 'rounded-full': rouded }"
         :style="`min-width: ${size}px; width: ${size}px; height: ${size}px`"
      >
         <template v-if="value">
            <b-img :src="value || '/images/blank.png'" alt="user"></b-img>
            <div class="k-img-edit-btn">
               <svg-icon name="edit" width="50" color="white"></svg-icon>
            </div>
         </template>
         <div
            v-else
            class="
               d-flex
               flex-column
               align-items-center
               justify-content-center
               bg-white
               h-100
               cursor-pointer
            "
         >
            <div class="mb-4">
               <svg-icon
                  name="upload"
                  width="40"
                  color="var(--primary)"
               ></svg-icon>
            </div>
            <slot></slot>
         </div>
      </div>
      <b-modal
         :id="id"
         centered
         hide-footer
         no-close-on-backdrop
         size="lg"
         title="Select Image"
      >
         <vue-cropper
            v-if="cropImgSrc"
            ref="cropper"
            :src="cropImgSrc"
            class="text-center"
            preview=".preview"
            :aspectRatio="ratio"
            :minCropBoxWidth="100"
            :minCropBoxHeight="100"
            :imgStyle="{ minWidth: '100px', minHeight: '100px' }"
         />
         <div v-else class="text-center">
            <b-img
               src="/images/blank.png"
               width="90"
               height="90"
               rounded
               alt="user"
            ></b-img>
         </div>
         <div class="d-flex justify-content-center">
            <div class="mx-2 p-3 font-weight-bold hover-primary ku-upload">
               Change Picture
               <input
                  type="file"
                  name="profile_avatar"
                  accept=".png, .jpg, .jpeg"
                  @change="onFileChange($event)"
               />
            </div>
            <b-btn class="my-3 ml-2" @click="uploadPic" variant="success"
               >Confirm</b-btn
            >
         </div>
      </b-modal>
   </div>
</template>

<script>
import VueCropper from "vue-cropperjs/VueCropper";
import "cropperjs/dist/cropper.css";
export default {
   name: "KuImageUpload",
   props: {
      label: {
         type: String,
         default: "",
      },
      title: {
         type: String,
         default: "Edit Picture",
      },
      ratio: {
         type: [Number, String],
         default: 1,
      },
      size: {
         type: [String, Number],
         default: 100,
      },
      value: {},
      rouded: {
         type: Boolean,
         default: false,
      },
   },
   components: { VueCropper },
   data() {
      return {
         id: "modal-file-" + +new Date(),
         cropImgSrc: "",
         photoFile: "",
      };
   },
   methods: {
      openModal() {
         this.cropImgSrc = this.value;
         this.$bvModal.show(this.id);
      },
      onFileChange(e) {
         const file = e.target.files[0];

         if (typeof FileReader === "function") {
            const reader = new FileReader();

            reader.onload = (event) => {
               this.cropImgSrc = event.target.result;
               this.photoFile = "";
               this.$refs.cropper
                  ? this.$refs.cropper.replace(event.target.result)
                  : "";
            };

            reader.readAsDataURL(file);
         } else {
            alert("Sorry, FileReader API not supported");
         }
      },
      uploadPic() {
         if (this.$refs.cropper) {
            const url = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.$emit("input", url);
         }
         this.$bvModal.hide(this.id);
      },
   },
};
</script>
<style lang="scss">
.k-image-btn {
   position: relative;
   overflow: hidden;
   border-radius: 10px;
   border: 1px solid rgba(128, 128, 128, 0.377);
   img {
      width: 100%;
      height: 100%;
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
      overflow: hidden;
   }
   &:hover {
      .k-img-edit-btn {
         opacity: 1;
         transition: 0.3s;
      }
   }
}
.ku-upload {
   position: relative;
   overflow: hidden;
   input[type="file"] {
      position: absolute;
      left: 0;
      opacity: 0;
   }
}
</style>
