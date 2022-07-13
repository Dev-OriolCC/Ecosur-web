<script setup>
import NavigationBar from '@/components/NavigationBar.vue'

</script>
<template >
    <div class="d-flex" style="height: 100vh;">
        <NavigationBar />
        <!-- Page content wrapper-->
        <div id="page-content-wrapper" class="container mx-auto " @click="closeModalActivated">
            <!-- explicit style -->
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

            <!-- Cargando Animatioon -->
            <div v-if="loading">
                <div class="text-center " style="color: #63CAA7;">
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
                    <tbody>
                        <tr>
                            <td>Caoba</td>
                            <td>20</td>
                            <td>
                                <button class="btn" style="background-color: #26798E; color: white;"
                                    @click="showModalEdit('900','Caoba')"
                                >
                                    <font-awesome-icon icon="fa-solid fa-pen" />
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="showModalDelete('900','Caoba', '20')">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Cedro Blanco</td>
                            <td>0</td>
                            <td>
                                <button class="btn" style="background-color: #26798E; color: white;"
                                @click="showModalEdit('400','Cedro Blanco')">
                                    <font-awesome-icon icon="fa-solid fa-pen" />
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="showModalDelete('400','Cedro Blanco', '0')">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Eucalipto</td>
                            <td>32</td>
                            <td>
                                <button class="btn" style="background-color: #26798E; color: white;"
                                @click="showModalEdit('800','Eucalipto')">
                                    <font-awesome-icon icon="fa-solid fa-pen" />
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="showModalDelete('800','Eucalipto', '32')">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                    <input class="form-control" id="nombre" v-model="form.nombre" name="nombre" type="text" />
                </div>

                <button outline class="btn text-white me-sm-2 mt-4 d-flex justify-content-left" type="submit"
                    style="background-color: #63CAA7;">Agregar</button>
            </form>
        </div>
        <!-- Final modal agregar nueva especie -->

        <!-- Modal Agregar nueva especie -->
        <div v-show="modalEditState" class="modalAdd" :click-to-close="true">
            <form @submit.prevent="editEspecie" class="mx-auto col-10 bg-light border pb-4 px-4 py-2 mt-4 mt-4"
                style="box-shadow: 0 2px 8px rgba(0, 0, 0, .33);">
                <button type="button" class="close text-black" @click="showModalEdit(editModal.id, editModal.nombre)" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true" class="" style="font-size: 28px;">&times;</span>
                </button>
                <h4 class="text-center mt-4">Editar Especie</h4>
                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <label class="me-sm-2 d-flex justify-content-left" for="nombre">
                        Nombre Especie
                    </label>
                    <input class="form-control" id="nombre" v-model="editModal.nombre" name="nombre" type="text" />
                </div>

                <button outline class="btn text-white me-sm-2 mt-4 d-flex justify-content-left" type="submit"
                    style="background-color: #63CAA7;">Actualizar</button>
            </form>
        </div>
        <!-- Final modal agregar nueva especie -->

        <!-- Modal Agregar nueva especie -->
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
        <!-- Final modal agregar nueva especie -->

    </div>
</template>

<script>
import ModalForm from '../components/ModalForm.vue';

export default {
    data: function () {
        return {
            clickyBackgrond: false, // General para el fondo
            loading: true,
            modalAddState: false,
            modalEditState: false,
            modalDeleteState: false,
            form: {
                'nombre': '',
            },
            editModal: {
                'id': '',
                'nombre': '',
            },
            deleteModal: {
                'id': '',
                'nombre': '',
                'total': 0,
            }
        }
    },
    methods: {
        // Agregar [Mostrar Modal]
        showModalAdd() {
            this.modalAddState = !this.modalAddState;
            // console.log("Add = "+this.modalAddState);
        },
        // Edit [Mostrar Modal]
        showModalEdit(id, nombre) {
            this.modalEditState = !this.modalEditState;
            this.editModal.nombre = nombre;
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
            var data = JSON.stringify({
                nombre: this.form.nombre,
            })
            console.log(data);
            // Enviar a API

            //
            this.showModalAdd();
            this.form.nombre = '';
            this.loading = true;
            setTimeout(() => (this.loading = false), 500);
        },
        // Editar API
        editEspecie: function () {
            var data = JSON.stringify({
                id: this.editModal.id,
                nombre: this.editModal.nombre,
            })
            console.log(data)
            // Enviar a API

            //
            this.showModalEdit(this.editModal.id, this.editModal.nombre);
            this.editModal.nombre = '';
            this.editModal.id = '';
            this.loading = true;
            setTimeout(() => (this.loading = false), 500);
        },
        // Eliminar API
        deleteEspecie: function () {
            var data = JSON.stringify({
                id: this.deleteModal.id,
            })
            console.log(data)
            // Enviar a API

            //
            this.showModalDelete(this.deleteModal.id, this.deleteModal.nombre, this.deleteModal.total);
            this.editModal.id = '';
            this.editModal.nombre = '';
            this.editModal.total = '';
            this.loading = true;
            setTimeout(() => (this.loading = false), 500);
        },

        closeModalActivated() {
            if (this.clickyBackgrond == true) {
                this.modalAddState = false;
                this.modalEditState = false;
                this.modalDeleteState = false;
                // this.clickyBackgrond = false; Needs to be tested  
                console.log("Close modal")
            }
        }
    },
    mounted() {
        setTimeout(() => (this.loading = false), 2000);
    },
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
