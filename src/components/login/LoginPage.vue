<template>
    <div id="login" class="light-gray-bg2">

        <div class="templatemo-content-widget templatemo-login-widget white-bg">
            <header class="text-center">
                <h1>POVIDLO INC.</h1>
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
    import axiosInstance from "../../auth-service";
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
            login() {
                axiosInstance.post(
                    '/login', {
                        username: this.username,
                        password: this.password
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        localStorage.setItem('token', res.data);
                        this.$store.dispatch('auth').then(() => {
                            this.$router.push({name: 'home'})
                        });
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                    }
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                });
            }
        },
        created() {
            // eslint-disable-next-line no-console
            console.log(this.$store.getters.isAuth);
        }
    }
</script>