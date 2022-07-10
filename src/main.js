import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// FontAwesomeIcon's
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass, faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass, faPlus, faTrash, faPen);



// require('./bootstrap'); // New import bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';



const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon) // Creates the App instance of app.vue component ./

app.use(router, BootstrapVue, BootstrapVueIcons); // All routes are going to be defined in router

app.mount('#app') // Mounts the App instance searching for the id=app
