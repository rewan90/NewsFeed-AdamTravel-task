// plugins/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VIntersect from "~/components/VIntersect.vue"; // Import your custom component

export default defineNuxtPlugin((nuxtApp) => {

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
 
  });
  nuxtApp.vueApp.component("v-intersect", VIntersect);

  nuxtApp.vueApp.use(vuetify);
});

