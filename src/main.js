import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Libreria - FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass, faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faPlus, faTrash, faPen);
// Libreria - BootstrapVue
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Libreria - axiosVue
import axios from 'axios';
import VueAxios from 'vue-axios';
import { getAuthToken } from './utils/auth';
///var cors = require('cors') --> cors()
// Save TOKEN
var token = getAuthToken();
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
}


// crear App apartir de framework-vue
const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon) // Creates the App instance of app.vue component ./

app.use(router, BootstrapVue, BootstrapVueIcons, VueAxios, axios); // All routes are going to be defined in router
//app.use(VueAxios, axios)
app.mount('#app') // Mounts the App instance searching for the id=app
