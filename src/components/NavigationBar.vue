<template>
    <!-- Sidebar-->
    <div class="text-white px-4" style="background-color: #26798E;">
        <h2 class="mt-2 mb-4">Ecosur Web</h2>
        <hr style="border-top: 1px solid white;">
        <h5 class="mt-4 font-weight-normal navItem" style="color: #63CAA7;" >Especies</h5>
        <h5 class="mt-4 font-weight-normal navItem">Parcelas</h5>
        <h5 class="mt-4 font-weight-normal navItem">Árboles</h5>
        <h5 class="mt-4 font-weight-normal navItem">Gráficas</h5> <br>
        <h5 class="mt-4 font-weight-normal navItem" @click="logout" >Salir</h5>
    </div>
</template>
<script>
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
<style>
    
    .navItem {
        text-decoration: none; color: inherit;
    }
    .navItem:hover {
        text-decoration: none; color: inherit;
        color: #63CAA7;
    }
</style>