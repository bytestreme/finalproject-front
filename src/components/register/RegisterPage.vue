<template>
    <div id="register" class="light-gray-bg2">
        <notifications classes="ntf-reg-bad" position="bottom center" animation-type="velocity" group="bad"/>
        <notifications classes="ntf-reg-ok" position="bottom center" animation-type="velocity" group="ok"/>

        <div class="templatemo-content-widget templatemo-login-widget white-bg">
            <header class="text-center">
                <h1>Register</h1>
            </header>
            <form action="index.html" class="templatemo-login-form">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input v-model="username" type="text" class="form-control" placeholder="Username">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input v-model="firstname" type="text" class="form-control" placeholder="First name">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input v-model="lastname" type="text" class="form-control" placeholder="Last name">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input v-model="phone" type="number" class="form-control" placeholder="Phone">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                        <input v-model="password" type="password" class="form-control" placeholder="******">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                        <input v-model="password2" type="password" class="form-control" placeholder="******">
                    </div>
                </div>
                <div class="form-group">
                    <button @click.prevent="submit" class="templatemo-blue-button width-100">Register</button>
                </div>
            </form>
        </div>
        <div class="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
            <p>Already registered? <strong><a class="blue-text">
                <router-link to="/login">Log in now!</router-link>
            </a></strong></p>
        </div>
    </div>


</template>

<script>
    import axiosInstance from "../../axiosInstance";

    export default {
        name: 'register',
        data() {
            return {
                username: '',
                password: '',
                password2: '',
                firstname: "",
                lastname: "",
                phone: ""
            }
        },
        methods: {
            toggleNotify(title, text, gr) {
                this.$notify({
                    group: gr,
                    title: title,
                    text: text,
                });
            },
            delay(ms) {
                return new Promise(res => setTimeout(res, ms))
            },
            submit() {
                if (this.username.length === 0 ||
                    this.password.length === 0 ||
                    this.password2.length === 0 ||
                    this.firstname.length === 0 ||
                    this.lastname.length === 0 ||
                    this.phone.length === 0) {
                    this.toggleNotify("Error!", "Fields cannot be empty!", 'bad');
                } else {
                    if (this.password === this.password2 && this.password && this.password2)
                        this.register();
                    else this.toggleNotify("Error!", "Passwords do not match!", 'bad');
                }
            },
            register() {
                axiosInstance.post(
                    '/register', {
                        username: this.username,
                        password: this.password,
                        firstName: this.firstname,
                        lastName: this.lastname,
                        phone: this.phone
                    }
                ).then(res => {
                    this.toggleNotify("Success!", "Registration successful!", 'ok');
                    this.delay(2000).then(r => {
                        this.$router.push({name: 'login'});
                    });
                }).catch(error => {
                    this.toggleNotify("Error!", error.response.data.message, 'bad');
                });
            }

        },
    }
</script>