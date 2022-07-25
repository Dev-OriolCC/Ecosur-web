<template>
    <!-- Sidebar-->
    <div class="text-white px-4" style="background-color: #26798E;">
        <h2 class="mt-2 mb-4">Ecosur Web</h2>
        <hr style="border-top: 1px solid white;">
        <h5 class="mt-4 font-weight-normal navItem"><RouterLink to="especies" class="menuItem-active-link">Especies</RouterLink></h5>
        <h5 class="mt-4 font-weight-normal navItem">Parcelas</h5>
        <h5 class="mt-4 font-weight-normal navItem">Árboles</h5>
        <h5 class="mt-4 font-weight-normal navItem"><RouterLink to="graficas" class="menuItem-active-link"> Gráficas</RouterLink></h5> <br>
        <h5 class="mt-4 font-weight-normal navItem" @click="logout" >Salir</h5>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { logoutUser } from '../utils/auth'
    export default ({
        methods: {
            logout() {
                logoutUser();
                window.location.reload();
            }
        }
    })
</script>
<style scoped>
    .router-link-exact-active.menuItem-active-link {
        border-bottom-color: #63CAA7;
        color:#63CAA7
    }
    .menuItem-active-link {
        text-decoration: none; color: inherit;
    }    
    .navItem {
        text-decoration: none; color: inherit;
    }
    .navItem:hover {
        text-decoration: none; color: inherit;
        color: #63CAA7;
    }
</style>