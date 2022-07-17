<template>
    <div class="container col-8 col-sm-7 col-md-6 col-lg-3 mt-5 mx-autob border border-secondary rounded">
        <div>
            <h1 class="text-center mt-4">ECOSUR WEB</h1>
            <img class="mx-auto d-block" style="width: 30%; height: 60%" alt="Card image cap"
                src="https://upload.wikimedia.org/wikipedia/commons/5/50/ECOSUR.jpg" />
            <!-- FORM START -->
            <form @submit.prevent="submitLogin">
                <div v-if="msg.error" class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{ msg.error }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="errorMessage">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <CustomFormInput id="email" type="email" label="Correo electrónico" v-model="form.email" placeholder="ejemplo@dominio.com" />
                    <span v-if="msg.email" class="text-danger">{{ msg.email }}</span>
                </div>
                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <CustomFormInput id="password" type="password" label="Contraseña" v-model="form.password"  />
                    <span v-if="msg.password" class="text-danger">{{ msg.password }}</span>
                </div>
                <button outline class="btn btn-success me-sm-2 mt-4 d-flex justify-content-left" type="submit"
                    style="background-color: #63CAA7;">Iniciar Sesión</button>
            </form>
            <!-- FORM END -->
            <br><br>
        </div>
    </div>
</template>

<script>
import CustomFormInput from "../../components/CustomFormInput.vue"; // Componente Input
import { loginUser } from '../../utils/auth' // Metodo para login

export default ({
    components: {
        CustomFormInput
    },
    data: function () {
        return {
            form: {
                'email': '',
                'password': '',
            },
            msg: []
        }
    },
    // Validar en todo momento los campos email & password
    watch: {
        'form.password'(value) {
            this.validatePassword(value);
        },
        'form.email'(value) {
            this.validateEmail(value);
        }
    },
    methods: {
        // Mensaje de error en caso de no rellenarse correctamente
        validatePassword(value) {
            let difference = 8 - value.length;
            if (value.length < 8) {
                this.msg['password'] = '¡Contraseña debe tener 8 caracteres! ' + difference + ' faltan';
            } else {
                this.msg['password'] = '';
            }
        },
        // Mensaje de error en caso de no rellenarse correctamente
        validateEmail(value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.msg['email'] = '';
            } else {
                this.msg['email'] = '¡Correo electrónico invalido!';
            }
        },
        // Metodo asincrono para login
        submitLogin: async function () {
            if (this.msg['email'] == '' && this.msg['password'] == '') {
                var data = { "username": this.form.email, "password": this.form.password }
                try {
                    await loginUser(data.username, data.password);
                    this.$router.push('/admin/especies')
                }
                catch (err) {
                    this.msg['error'] = "Credenciales incorrectas! verificar correo electrónico y contraseña";
                }
            } else {
                this.msg['error'] = "Completa correctamente los campos correo electrónico y contraseña";
            }
        },
        // Limpar el error-alert mostrado en vuestra pantalla
        errorMessage() {
            this.msg['error'] = '';
        }
    }

})

</script>

