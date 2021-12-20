<template>
   <div>
      <h2 class="text-center mb-5">Şirketimiz Sermaye Piyasası Kurulu tarafından yetkilendirilmiştir.</h2>
      <!-- content -->
      <p class="text-secondary mb-8">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus platea leo cras id. Cras turpis dolor massa malesuada eget non nulla integer
         ridiculus. Pellentesque placerat montes, venenatis tincidunt neque egestas luctus maecenas id. Suspendisse ut rhoncus feugiat et, pharetra,
         turpis sed sodales. Enim, accumsan elementum vel blandit mi lobortis eleifend nibh. Pellentesque phasellus id cursus ipsum adipiscing arcu
         dui dictum. Ut nibh id scelerisque adipiscing eget turpis volutpat consectetur. Quisque nibh donec dignissim quam erat scelerisque. Hendrerit
         donec egestas et commodo, enim phasellus diam eget sit. Nunc, ac tincidunt massa, nibh tortor viverra purus dictumst viverra. Egestas
         elementum, neque tortor dolor. Nibh egestas consectetur lectus ut in scelerisque sed viverra turpis.
      </p>

      <h4 class="text-center mb-5">YENİ NESİL GİRİŞİM FİNANSMANI, YENİ NESİL YATIRIMCILIK</h4>
      <p class="text-secondary mb-8">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus platea leo cras id. Cras turpis dolor massa malesuada eget non nulla integer
         ridiculus. Pellentesque placerat montes, venenatis tincidunt neque egestas luctus maecenas id. Suspendisse ut rhoncus feugiat et, pharetra,
         turpis sed sodales. Enim, accumsan elementum vel blandit mi lobortis eleifend nibh. Pellentesque phasellus id cursus ipsum adipiscing arcu
         dui dictum. Ut nibh id scelerisque adipiscing eget turpis volutpat consectetur. Quisque nibh donec dignissim quam erat scelerisque. Hendrerit
         donec egestas et commodo, enim phasellus diam eget sit. Nunc, ac tincidunt massa, nibh tortor viverra purus dictumst viverra. Egestas
         elementum, neque tortor dolor. Nibh egestas consectetur lectus ut in scelerisque sed viverra turpis.
      </p>

      <h4 class="text-center mb-5">HER SEVİYEDE FONLAMA ve YATIRIM FIRSATLARI</h4>
      <p class="text-secondary mb-8">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus platea leo cras id. Cras turpis dolor massa malesuada eget non nulla integer
         ridiculus. Pellentesque placerat montes, venenatis tincidunt neque egestas luctus maecenas id. Suspendisse ut rhoncus feugiat et, pharetra,
         turpis sed sodales. Enim, accumsan elementum vel blandit mi lobortis eleifend nibh. Pellentesque phasellus id cursus ipsum adipiscing arcu
         dui dictum. Ut nibh id scelerisque adipiscing eget turpis volutpat consectetur. Quisque nibh donec dignissim quam erat scelerisque. Hendrerit
         donec egestas et commodo, enim phasellus diam eget sit. Nunc, ac tincidunt massa, nibh tortor viverra purus dictumst viverra. Egestas
         elementum, neque tortor dolor. Nibh egestas consectetur lectus ut in scelerisque sed viverra turpis.
      </p>

      <h4 class="text-center mb-5">İLKLERE İMZA ATTIK!</h4>
      <p class="text-secondary mb-8">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus platea leo cras id. Cras turpis dolor massa malesuada eget non nulla integer
         ridiculus. Pellentesque placerat montes, venenatis tincidunt neque egestas luctus maecenas id. Suspendisse ut rhoncus feugiat et, pharetra,
         turpis sed sodales. Enim, accumsan elementum vel blandit mi lobortis eleifend nibh. Pellentesque phasellus id cursus ipsum adipiscing arcu
         dui dictum. Ut nibh id scelerisque adipiscing eget turpis volutpat consectetur. Quisque nibh donec dignissim quam erat scelerisque. Hendrerit
         donec egestas et commodo, enim phasellus diam eget sit. Nunc, ac tincidunt massa, nibh tortor viverra purus dictumst viverra. Egestas
         elementum, neque tortor dolor. Nibh egestas consectetur lectus ut in scelerisque sed viverra turpis.
      </p>

      <h4 class="text-center mb-5">GLOBAL KİTLE FONLAMA PLATFORMU A.Ş. ‘Company İnformation’</h4>
      <div class="rounded bg-white mb-8">
         <div class="d-flex justify-content-between border-bottom p-3" v-for="(item, ii) in items" :key="ii">
            <p>{{item.id}}</p>
            <p class="text-secondary">{{item.id}}</p>
         </div>
      </div>

      <!-- QUALITY CERTIFICATES -->
      <h4 class="text-center mb-5">QUALITY CERTIFICATES</h4>
      <div class="text-secondary mb-8 grid grid-cols-3 gap-4">
         <div v-for="nn in 3" :key="nn" style="height:100px" class="rounded bg-white"></div>
      </div>

   </div>
</template>

<script>
export default {
   data(){
      return{
         items:[
            {id: "MERSIS NO", value: "MERSIS NO"},
            {id: "SİCİL MÜDÜRLÜĞÜ", value: "MERSIS NO"},
            {id: "SİCİL NUMARASI", value: ""},
            {id: "TİCARET ÜNVANI", value: ""},
            {id: "MARKALAR", value: ""},
            {id: "ADRES", value: ""},
            {id: "KAYITLI SERMAYE", value: ""},
            {id: "ÖDENMİŞ SERMAYE", value: ""},
         ]
      }
   }
};
</script>