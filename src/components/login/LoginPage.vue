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
                <button type="submit" class="templatemo-blue-button width-100">Login</button>
            </div>
        </form>
    </div>
    <div class="templatemo-content-widget templatemo-login-widget templatemo-register-widget white-bg">
        <p>Not a registered user yet? <strong><a href="#" class="blue-text"><router-link to="/register">Register now!</router-link></a></strong></p>
    </div>
    </div>


</template>

<script>
    export default {
        name: 'login',
        props:[],
    }
</script>