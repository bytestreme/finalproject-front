<template>
    <div id="register" class="light-gray-bg2">

        <div class="templatemo-content-widget templatemo-login-widget white-bg">
            <header class="text-center">
                <h1>POVIDLO INC.</h1>
            </header>
            <form action="index.html" class="templatemo-login-form">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input  v-model="username" type="text" class="form-control" placeholder="Username">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input  v-model="firstname" type="text" class="form-control" placeholder="First name">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input  v-model="lastname" type="text" class="form-control" placeholder="Last name">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>
                        <input  v-model="phone" type="number" class="form-control" placeholder="Phone">
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
            <p>Already registered? <strong><a class="blue-text"><router-link to="/login">Log in now!</router-link></a></strong></p>
        </div>
    </div>


</template>

<script>
    import axiosInstance from "../../auth-service";
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
        methods:{
            submit(){
              if(this.password === this.password2 && this.password && this.password2)
                  this.register();
              else alert("Passwords do not match");
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
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.$router.push({name: 'login'});
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                    }
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                });
            }

        }
    }
</script>