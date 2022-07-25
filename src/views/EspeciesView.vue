<script setup>
import NavigationBar from '@/components/NavigationBar.vue' // Barra de navegacio'n

</script>
<template >
    <div class="d-flex" style="height: 100vh;">
        <NavigationBar />
        <!-- Page content wrapper-->
        <div id="page-content-wrapper" class="container mx-auto " @click="closeModalActivated">
            <!-- Buscador y boton de agregar [Especie] -->
            <form class="form-search content-search navbar-form" action="#" method="GET">
                <div class="input-group">
                    <input placeholder="Buscar Especie" class="form-control form-text mt-3" type="text" name="search"
                        id="search" />
                    <span class="input-group-btn mt-3">
                        <button type="submit" class="btn " style="background-color: #26798E; color: white;">
                            <span class="icon glyphicon glyphicon-search" aria-hidden="true"></span>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </button>
                        <button type="button" href="/" class="btn text-white ml-4" style="background-color: #63CAA7;"
                            @click="showModalAdd">
                            <span class="" aria-hidden="true">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </span>
                        </button>
                    </span>
                </div>
            </form>

            <!-- Cargando Animation -->
            <div v-if="loading">
                <div class="text-center " style="color: #63CAA7;">
                    <div class="spinner-border mt-5" role="status" style="width: 6rem; height: 6rem;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <!-- Tabla con especies -->
            <div v-else class="table-responsive mx-auto">
                <table class="table mt-4" v-if="species.length > 0">
                    <thead class="table-primary">
                        <tr>
                            <th>Nombre</th>
                            <th>Total de árboles</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="specie in species">
                            <td>{{specie.name}}</td>
                            <td>{{specie.total}}</td>
                            <td>
                                <button class="btn" style="background-color: #26798E; color: white;"
                                    @click="showModalEdit(specie.id, specie.name, specie.total)"
                                >
                                    <font-awesome-icon icon="fa-solid fa-pen" />
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="showModalDelete(specie.id, specie.name, specie.total)">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <p v-else class="text-danger mt-4" >No hay especies :( </p>
            </div>
            <!-- / Tabla con especies -->

        </div>
        <!-- MODALS -->
        <!--! TEST -->
        <!-- <div v-show="modalAddState" class="modalAdd" :click-to-close="true">
            <ModalForm title="TEST"  />
        </div> -->
        <!--! TEST -->

        <!-- Modal Agregar nueva especie -->
        <div v-show="modalAddState" class="modalAdd" :click-to-close="true">
            <form @submit.prevent="submitEspecie" class="mx-auto col-10 bg-light border pb-4 px-4 py-2 mt-4 mt-4"
                style="box-shadow: 0 2px 8px rgba(0, 0, 0, .33);">
                <button type="button" class="close text-black" @click="showModalAdd" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true" class="" style="font-size: 28px;">&times;</span>
                </button>
                <h4 class="text-center mt-4">Agregar Nueva Especie</h4>
                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <label class="me-sm-2 d-flex justify-content-left" for="nombre">
                        Nombre Especie
                    </label>
                    <input class="form-control" id="name" v-model="form.name" name="nombre" type="text" required/>
                    <label class="me-sm-2 d-flex justify-content-left" for="total">
                        Total Árboles
                    </label>
                    <input class="form-control" id="total" v-model="form.total" name="total" type="number" min="0" required/>
                </div>

                <button outline class="btn text-white me-sm-2 mt-4 d-flex justify-content-left" type="submit"
                    style="background-color: #63CAA7;">Agregar</button>
            </form>
        </div>
        <!-- Final modal agregar nueva especie -->

        <!-- Modal editar nueva especie -->
        <div v-show="modalEditState" class="modalAdd" :click-to-close="true">
            <form @submit.prevent="editEspecie" class="mx-auto col-10 bg-light border pb-4 px-4 py-2 mt-4 mt-4"
                style="box-shadow: 0 2px 8px rgba(0, 0, 0, .33);">
                <button type="button" class="close text-black" @click="showModalEdit(editModal.id, editModal.name, editModal.total)" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true" class="" style="font-size: 28px;">&times;</span>
                </button>
                <h4 class="text-center mt-4">Editar Especie</h4>
                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <label class="me-sm-2 d-flex justify-content-left" for="nombre">
                        Nombre Especie
                    </label>
                    <input class="form-control" id="nombre" v-model="editModal.name" name="nombre" type="text" />
                    <label class="me-sm-2 d-flex justify-content-left" for="total">
                        Total Árboles
                    </label>
                    <input class="form-control" id="total" v-model="editModal.total" name="total" type="number" min="0" required/>
                </div>

                <button outline class="btn text-white me-sm-2 mt-4 d-flex justify-content-left" type="submit"
                    style="background-color: #63CAA7;">Actualizar</button>
            </form>
        </div>
        <!-- Final modal editar nueva especie -->

        <!-- Modal eleminar nueva especie -->
        <div v-show="modalDeleteState" class="modalAdd" :click-to-close="true">
            <form @submit.prevent="deleteEspecie" class="mx-auto col-10 bg-light border pb-4 px-4 py-2 mt-4 mt-4"
                style="box-shadow: 0 2px 8px rgba(0, 0, 0, .33);">
                <button type="button" class="close text-black" @click="showModalDelete(deleteModal.id, deleteModal.nombre, deleteModal.total)" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true" class="" style="font-size: 28px;">&times;</span>
                </button>
                <h4 class="text-center mt-4">¿Estás seguro que deseas eliminar esta especie: <b>{{deleteModal.nombre}}</b>?</h4>
                <h5 v-if="deleteModal.total > 0" class="text-center mt-2 text-danger font-weight-bold">Esta especie tiene {{deleteModal.total}} árboles</h5>

                <div class="d-flex flex-row-reverse">
                    <button class="btn btn-danger text-white me-sm-2 mt-4" @click="showModalDelete(deleteModal.id, deleteModal.nombre, deleteModal.total)"
                    type="button">No</button>
                    <button class="btn text-white me-sm-2 mt-4 mr-4" type="submit"
                        style="background-color: #63CAA7;">Si, Eliminar</button>
                </div>
            </form>
        </div>
        <!-- Final modal eleminar nueva especie -->

    </div>
</template>

<script>
import ModalForm from '../components/ModalForm.vue';
// const REST_ENDPOINT = 'http://localhost:8080/'; 
const REST_ENDPOINT = 'https://ecosur-apirest.herokuapp.com/'; 

import axios from 'axios';
import { getAuthToken } from "../utils/auth";

export default {
    data: function () {
        return {
            clickyBackgrond: false, // Estado General para el fondo
            loading: true,
            // Estados para cada modal Agregar-Editar-Eliminar
            modalAddState: false,
            modalEditState: false,
            modalDeleteState: false,
            species: [],
            // Formularios Agregar-Editar-Eliminar
            form: {
                'name': '',
                'total': '',
            },
            editModal: {
                'id': '',
                'name': '',
                'total': 0,
            },
            deleteModal: {
                'id': '',
                'nombre': '',
                'total': 0,
            }
        }
    },
    methods: {
        // Cargar Especies
        loadSpecies: async function () {
            let response = await axios({
                url: `${REST_ENDPOINT}api/specie/getSpecies`,
                method: 'GET',
                Headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status == 200) {
                this.species = response.data;
            }
            this.loading = false;
        },
        // Agregar Especie
        addSpecieAPI: async function (data) {
            this.loading = true;
            let response = await axios({
                url: `${REST_ENDPOINT}api/specie/addSpecie`,
                method: 'POST',
                Headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
            // this.loading = true;
            // setTimeout(() => (this.loading = false), 500);
            this.loadSpecies();
        },
        // Eliminar Especie
        deleteSpecieAPI: async function (id) {
            this.loading = true;
            let response = await axios({
                url: `${REST_ENDPOINT}api/specie/deleteSpecie/${id}`,
                method: 'DELETE',
                Headers: {
                    'Content-Type': 'application/json'
                }
            })
            //this.loadSpecies()
            // Fix reload issue while fetching species from REST API
            this.loadSpecies();
            //window.location.reload();
        },
        // Actualizar Especie
        updateSpecieAPI: async function (data) {
            this.loading = true;
            let response = await axios({
                url: `${REST_ENDPOINT}api/specie/updateSpecie/${data.id}`,
                method: 'PUT',
                Headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
            // setTimeout(() => (this.loading = false), 500);
            this.loadSpecies();
        },

        // ---- MODALES [ESTADOS] ---- 
        // Agregar [Mostrar Modal]
        showModalAdd() {
            this.modalAddState = !this.modalAddState;
            this.form.name = '';
            this.form.total = 0;
            // console.log("Add = "+his.modalAddState);
        },
        // Edit [Mostrar Modal]
        showModalEdit(id, nombre, total) {
            this.modalEditState = !this.modalEditState;
            this.editModal.name = nombre;
            this.editModal.total = total;
            this.editModal.id = id;
            // console.log("modalEditState: "+this.modalEditState);
        },
        // Eliminar [Mostrar Modal]
        showModalDelete(id, nombre, total) {
            this.modalDeleteState = !this.modalDeleteState;
            this.deleteModal.id = id;
            this.deleteModal.nombre = nombre;
            this.deleteModal.total = total;
        },
        // -- SECCION DE ENVIO A APIS -- 
        // Agregar API
        submitEspecie: function () {
            var data = { name: this.form.name, total: this.form.total, }
            // Enviar a API
                this.addSpecieAPI(data);
            //
            this.showModalAdd();
            this.form.nombre = '';
            this.form.total = 0;
        },
        // Editar API
        editEspecie: function () {
            var data = {
                id: this.editModal.id,
                name: this.editModal.name,
                total: this.editModal.total,
            }
            // Enviar a API
                this.updateSpecieAPI(data);
            //
            this.showModalEdit(this.editModal.id, this.editModal.name);
            this.editModal.name = '';
            this.editModal.id = '';
            this.editModal.total = 0;
            //this.loading = true;
            //setTimeout(() => (this.loading = false), 500);
        },
        // Eliminar API
        deleteEspecie: function () {
            // Enviar a API
                this.deleteSpecieAPI(this.deleteModal.id);
            //
            this.showModalDelete(this.deleteModal.id, this.deleteModal.nombre, this.deleteModal.total);
            this.deleteModal.id = '';
            this.deleteModal.nombre = '';
            this.deleteModal.total = 0;
            // this.loading = true;
            // setTimeout(() => (this.loading = false), 500);
            // this.loadSpecies()
        },
        // Cerrar modal independiente de que tipo es....
        closeModalActivated() {
            if (this.clickyBackgrond == true) {
                this.modalAddState = false;
                this.modalEditState = false;
                this.modalDeleteState = false;
                // this.clickyBackgrond = false; Needs to be tested  
            }
        }
    },
    // Animation de loading en cuanto se cargue esta vista [Especies]
    mounted() {
        this.loading = true;
        //setTimeout(() => (this.loading = false), 300)
        this.loadSpecies()
    },
    // Watch para observar en todo momento, en cuanto se active un modal hacer el fondo 
    // elegible a cerrar el modal con un click!
    watch: {
        'modalAddState'(value) {
            if (value == true) {
                setTimeout(() => this.clickyBackgrond = true, 500);
                //this.clickyBackgrond = true;
            } else {
                this.clickyBackgrond = false;
            }
            //this.form.password = value;
            this.closeModalActivated();
        },
        'modalEditState'(value) {   
            if (value == true) {
                setTimeout(() => this.clickyBackgrond = true, 500);
                //this.clickyBackgrond = true;
            } else {
                this.clickyBackgrond = false;
            }
            //this.form.password = value;
            this.closeModalActivated();
        },
        'modalDeleteState'(value) {   
            if (value == true) {
                setTimeout(() => this.clickyBackgrond = true, 500);
                //this.clickyBackgrond = true;
            } else {
                this.clickyBackgrond = false;
            }
            //this.form.password = value;
            this.closeModalActivated();
        },
    }
}

</script>

<style scoped>
.modalAdd {
    position: fixed;
    z-index: 999;
    left: 45%;
    width: 25%;

    /** */
    transition: all .9s ease;
}
</style>
