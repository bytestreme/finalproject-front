<template>
    <div class="templatemo-sidebar">
        <header class="templatemo-site-header">
            <div class="square"></div>
            <h1>User Page</h1>
        </header>
<!--        <div class="profile-photo-container">-->
<!--            <img src="images/profile-photo.jpg" alt="Profile Photo" class="img-responsive">-->
<!--            <div class="profile-photo-overlay"></div>-->
<!--        </div>-->
        <div class="mobile-menu-icon">
            <i class="fa fa-bars"></i>
        </div>
        <nav class="templatemo-left-nav">
            <ul>
                <li><router-link to="/dashboard" :class="{'active': $route.path.includes('dashboard')}">
                    <i class="fa fa-home fa-fw"></i>Dashboard</router-link></li>
<!--                <li><router-link to="/"><i class="fa fa-bar-chart fa-fw"></i>Charts</router-link></li>-->
<!--                <li><a href="data-visualization.html"><i class="fa fa-database fa-fw"></i>Data Visualization</a></li>-->
                <li><router-link to="/" :class="{'active': $route.path === '/'}">
                    <i class="fa fa-map-marker fa-fw"></i>Search tickets</router-link></li>
                <li><router-link to="/manager-profile" :class="{'active': $route.path.includes('manager-profile')}">
                    <i class="fa fa-user fa-fw"></i>Create Route</router-link></li>
                <li><router-link to="/manager-all-routes" :class="{'active': $route.path.includes('manager-all-routes')}">
                    <i class="fa fa-user fa-fw"></i>Manage Routes</router-link></li>
                <li><router-link to="/manager-all-trains" :class="{'active': $route.path.includes('manager-all-trains')}">
                    <i class="fa fa-user fa-fw"></i>Manage Trains</router-link></li>
                <li><router-link to="/manager-news" :class="{'active': $route.path.includes('manager-news')}">
                    <i class="fa fa-envelope fa-fw"></i>Send news</router-link></li>
                <li><router-link to="/agent-profile" :class="{'active': $route.path.includes('agent-profile')}">
                    <i class="fa fa-user fa-fw"></i>Agent Page</router-link></li>
                <li><router-link to="/passenger-profile" :class="{'active': $route.path.includes('passenger-profile')}">
                    <i class="fa fa-user fa-fw"></i>Passenger Page</router-link></li>
<!--                <li><a href="preferences.html"><i class="fa fa-sliders fa-fw"></i>Preferences</a></li>-->
<!--                <li><a href="login.html"><i class="fa fa-eject fa-fw"></i>Sign Out</a></li>-->
            </ul>
        </nav>
    </div>
</template>
