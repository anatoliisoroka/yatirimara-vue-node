<template>
   <div>
      <h2 class="text-center mb-10">SOCIAL RESPONSIBILITY PROJECT LOGO</h2>

      <h4 class="mb-5">PROJECT TITLE</h4>
      <p class="text-secondary mb-8">{{text}}</p>
      <!-- video -->
      <div class="mb-10">
         <video
            autoplay=""
            class="H_j_5008e l_e_f7b69"
            data-automation="VideoPlayer_video_video"
            loop=""
            playsinline=""
            poster="https://ak.picdn.net/shutterstock/videos/1058366341/thumb/5.jpg"
            style="transform: rotate(0deg); width: 100%; height: 100%"
            controls
         >
            <source
               src="https://ak.picdn.net/shutterstock/videos/1058366341/preview/stock-footage-young-beautiful-blonde-woman-in-a-white-dress-spinning-in-the-center-of-a-city-attractive-fashion.webm"
               type="video/webm"
            />
            <source
               src="https://ak.picdn.net/shutterstock/videos/1058366341/preview/stock-footage-young-beautiful-blonde-woman-in-a-white-dress-spinning-in-the-center-of-a-city-attractive-fashion.mp4"
               type="video/mp4"
            />
         </video>
      </div>
      <div v-for="(item, ii) in items" :key="ii">
         <h4 class="mb-4">{{ item.title }}</h4>
         <p class="text-secondary mb-10">{{ text }}</p>
      </div>
      <h4 class="my-5">PROJECT’S MISSIONS</h4>
      <div class="d-flex flex-wrap mx-n2 mb-5">
         <div v-for="(item, ii) in missions" :key="ii" class="p-2">
            <img :src="item.pic" alt="" width="145" height="145">
            <p class="text-center text-secondary">{{item.title}}</p>
         </div>
      </div>
      <p class="text-secondary mb-10">{{ text }}{{ text }}</p>
   </div>
</template>

<script>
export default {
   data() {
      return {
         items: [
            {
               sku: "do",
               title: "WHAT WE DO?",
               desc: "",
            },
            {
               sku: "do",
               title: "INNOVATION",
               desc: "",
            },
            {
               sku: "do",
               title: "MOBILIZIE RESOURCES",
               desc: "",
            },
            {
               sku: "do",
               title: "PROMOTE",
               desc: "",
            },
            {
               sku: "do",
               title: "ASSIST",
               desc: "",
            },
            {
               sku: "do",
               title: "CONNECT",
               desc: "",
            },
            {
               sku: "do",
               title: "TRANSFORM",
               desc: "",
            },
         ],
         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus platea leo cras id. Cras turpis dolor massa malesuada eget non nulla integer ridiculus. Pellentesque placerat montes, venenatis tincidunt neque egestas luctus maecenas id. Suspendisse ut rhoncus feugiat et, pharetra, turpis sed sodales. Enim, accumsan elementum vel blandit mi lobortis eleifend nibh. Pellentesque phasellus id cursus ipsum adipiscing arcu dui dictum. Ut nibh id scelerisque adipiscing eget turpis volutpat consectetur. Quisque nibh donec dignissim quam erat scelerisque. Hendrerit donec egestas et commodo, enim phasellus diam eget sit. Nunc, ac tincidunt massa, nibh tortor viverra purus dictumst viverra. Egestas elementum, neque tortor dolor. Nibh egestas consectetur lectus ut in scelerisque sed viverra turpis.",
         missions: [
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1786.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1786.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1786.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1786.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1786.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1786.png"},
            {title: "Görev Adımı ismi", pic: "/upload/Rectangle 1797.png"},
         ]
      };
   },
};
</script>

<style>
</style>