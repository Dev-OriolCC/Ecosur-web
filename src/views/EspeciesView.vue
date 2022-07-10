<script setup>
import NavigationBar from '@/components/NavigationBar.vue'

</script>
<template >
    <div class="d-flex" style="height: 100vh;">

        <NavigationBar />

        <!-- Page content wrapper-->
        <div id="page-content-wrapper" class="container mx-auto ">
            <!-- explicit style -->
            <form class="form-search content-search navbar-form" action="#" method="GET">
                <div class="input-group">
                    <input placeholder="Buscar Especie" class="form-control form-text mt-3" type="text" name="search" id="search" />
                    <span class="input-group-btn mt-3">
                        <button type="submit" class="btn " style="background-color: #26798E; color: white;">
                            <span class="icon glyphicon glyphicon-search" aria-hidden="true"></span>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </button>
                        <a type="submit" href="/" class="btn btn-success ml-4"  style="background-color: #63CAA7;">
                            <span class="" aria-hidden="true">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </span>
                        </a>
                    </span>
                </div>
            </form>
            <div v-if="loading">
                <div class="text-center text-primary">
                    <div class="spinner-border mt-5" role="status" style="width: 6rem; height: 6rem;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <!-- Tabla con especies -->
            <div v-else class="table-responsive mx-auto"> 
                <table class="table mt-4">
                    <thead class="table-primary">
                        <tr>
                            <th>Nombre</th>
                            <th>Total de árboles</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                            <tr>
                                <td>Caoba</td>
                                <td>20</td>
                                <td>
                                    <button class="btn" style="background-color: #26798E; color: white;" >
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger" >
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                    </button>
                                </td>       
                            </tr>
                            <tr>
                                <td>Cedro Blanco</td>
                                <td>5</td>
                                <td>
                                    <button class="btn" style="background-color: #26798E; color: white;">
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger">
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                    </button>
                                </td>       
                            </tr>
                            <tr>
                                <td>Ecucalipto</td>
                                <td>32</td>
                                <td>
                                    <button class="btn" style="background-color: #26798E; color: white;">
                                        <font-awesome-icon icon="fa-solid fa-pen" />
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger">
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                    </button>
                                </td>       
                            </tr>
                    </tbody>
                </table>
            </div>
            <!-- / Tabla con especies -->

        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            loading: false,
        }
    },
}

</script>

<style>
</style>
