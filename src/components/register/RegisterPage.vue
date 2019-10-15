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
                        <input type="text" class="form-control" placeholder="username">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                        <input type="password" class="form-control" placeholder="******">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>
                        <input type="password" class="form-control" placeholder="******">
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="templatemo-blue-button width-100">Register</button>
                </div>
            </form>
        </div>
        <div class="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
            <p>Already registered? <strong><a href="#" class="blue-text"><router-link to="/login">Log in now!</router-link></a></strong></p>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'register',
        props:[],
    }
</script>