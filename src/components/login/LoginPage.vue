<template>

    <div id="login" class="light-gray-bg2">
        <notifications classes="ntf-reg-bad" position="top right" animation-type="velocity" group="bad"/>
        <notifications classes="ntf-reg-ok" position="top right" animation-type="velocity" group="ok"/>

        <div class="templatemo-content-widget templatemo-login-widget white-bg">
            <header class="text-center">
                <h1>Login</h1>
            </header>
            <form action="index.html" class="templatemo-login-form">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input type="text" v-model="username" class="form-control" placeholder="Username">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                        <input type="password" v-model="password" class="form-control" placeholder="******">
                    </div>
                </div>
                <div class="form-group">
                    <button @click.prevent="login" class="templatemo-blue-button width-100">Login</button>
                </div>
            </form>
        </div>
        <div class="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
            <p>Not a registered user yet? <strong><a class="blue-text">
                <router-link to="/register">Register now!</router-link>
            </a></strong></p>
        </div>
    </div>
</template>

<script>
    import axiosInstance from "../../axiosInstance";
    /*eslint no-console: "error"*/
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
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
            login() {
                if (this.username.length === 0 || this.password.length === 0) {
                    this.toggleNotify("Error!", "Fields cannot be empty!", 'bad');
                } else {
                    axiosInstance.post(
                        '/login', {
                            username: this.username,
                            password: this.password
                        }
                    ).then(res => {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        localStorage.setItem('token', res.data.token);
                        this.$store.dispatch('role', res.data.role).then();
                        this.$store.dispatch('auth').then(() => {
                            this.$router.push({name: 'main'})
                        });
                    }).catch(error => {
                        this.toggleNotify("Error!", "Login failed!", 'bad');
                        // eslint-disable-next-line no-console
                        console.log(error)
                    });
                }
            }
        }
    }
</script>