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
import axios from 'axios';
import VueAxios from 'vue-axios';
///var cors = require('cors') --> cors()



const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon) // Creates the App instance of app.vue component ./

app.use(router, BootstrapVue, BootstrapVueIcons, VueAxios, axios); // All routes are going to be defined in router
//app.use(VueAxios, axios)


app.mount('#app') // Mounts the App instance searching for the id=app
