<template>
    <!-- Modal Agregar nueva especie -->
    <form @submit.prevent="submitEspecie" class="mx-auto col-10 bg-light border pb-4 px-4 py-2 mt-4 mt-4"
        style="box-shadow: 0 2px 8px rgba(0, 0, 0, .33);">
        <!-- @submit.prevent="submitEspecie" -->
        <button type="button" class="close text-black" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" class="" style="font-size: 28px;">&times;</span>
        </button>
        <h4 class="text-center mt-4">{{ title }}</h4>
        <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
            <CustomFormInput id="nombre" type="text" label="Nombre" v-model="form.nombre" />
        </div>
        <br><br><br>
        <button outline class="btn text-white me-sm-2 mt-4 d-flex justify-content-left" type="submit"
            style="background-color: #63CAA7;">Agregar</button>
    </form>
    <!-- Final modal agregar nueva especie -->

</template>

<script>

import CustomFormInput from './CustomFormInput.vue'

export default {
    components: {
        CustomFormInput
    },
    data: function () {
        return {
            form: {
                'nombre': '',
            },
        }
    },
    props: {
        title: {
            type: String,
            required: true,
        },

        input1: [{
            id: {
                type: String,
                required: false,
            },
        }]
    },
    methods: {
        // Agregar API
        submitEspecie: function () {
            var data = JSON.stringify({
                nombre: this.form.nombre,
            })
            console.log(data);
            // Enviar a API

            //
            // this.showModalAdd();
            this.form.nombre = '';
            this.loading = true;
            setTimeout(() => (this.loading = false), 500);
        },
    }


}


</script>