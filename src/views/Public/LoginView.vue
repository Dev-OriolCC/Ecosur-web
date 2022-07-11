<template>
    <div class="container col-8 col-sm-7 col-md-6 col-lg-3 mt-5 mx-autob border border-secondary rounded">
        <div>

            <h1 class="text-center mt-4">ECOSUR WEB</h1>
            <img class="mx-auto d-block" style="width: 30%; height: 60%" alt="Card image cap"
                src="https://upload.wikimedia.org/wikipedia/commons/5/50/ECOSUR.jpg" />
            <!-- FORM START -->
            <form @submit.prevent="submitLogin">

                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <label class="me-sm-2 d-flex justify-content-left" for="email">
                        Correo electrónico
                    </label>
                    <input class="form-control" id="email" v-model="form.email" name="email"
                        placeholder="ejemplo@dominio.mx" type="email" required />
                    <span v-if="msg.email" class="text-danger">{{ msg.email }}</span>
                </div>

                <div class="mb-2 mt-2 me-sm-2 mb-sm-0">
                    <label class="me-sm-2 d-flex justify-content-left" for="password">
                        Contraseña
                    </label>
                    <input class="form-control" id="password" v-model="form.password" name="password" placeholder=""
                        type="password" required />
                    <span v-if="msg.password" class="text-danger">{{ msg.password }}</span>
                    <!--* TEST -->
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

export default ({
    components: {

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
    watch: {
        'form.password'(value) {
            //this.form.password = value;
            this.validatePassword(value);
        },
        'form.email'(value) {
            //this.form.password = value;
            this.validateEmail(value);
        }
    },
    methods: {
        validatePassword(value) {
            let difference = 8 - value.length;
            if (value.length < 8) {
                this.msg['password'] = '¡Contraseña debe tener 8 caracteres! ' + difference + ' faltan';
                //console.log(this.msg['password']);
                // this.disabled = [this.disabled[1], true]
            } else {
                this.msg['password'] = '';
                // this.disabled = [this.disabled[1], false]
            }
        },
        validateEmail(value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.msg['email'] = '';
            } else {
                this.msg['email'] = '¡Correo electrónico invalido!';
            }
        },

        submitLogin: function () {
            var data = JSON.stringify({
                email: this.form.email,
                password: this.form.password
            })
            console.log(data);
            // console.log(this.form.password)
            // console.log(this.form.email)
        }
    }

})

</script>

