<template>
    <div class="templatemo-content-container">
<!--        <div class="templatemo-content-widget white-bg">-->
<!--                <div class="row form-group">-->
<!--                    <h2 class="margin-bottom-10">Enter route ID</h2>-->
<!--                    <form class="templatemo-search-form" style="margin:0px;" role="search">-->
<!--                        <div class="input-group">-->
<!--                            <button @click.prevent="search" style="color: #cabcbc" class="fa fa-search"></button>-->
<!--                            <input @keyup.enter.prevent="search" v-model="searchId" style="background-color: white; color: black" type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term">-->
<!--                        </div>-->
<!--                    </form>-->
<!--                </div>-->
<!--        </div>-->

        <div class="templatemo-flex-row flex-content-row">
            <div class="col-1">
            <div class="panel panel-default templatemo-content-widget white-bg no-padding templatemo-overflow-hidden">
                <div class="panel-heading templatemo-position-relative">
                    <h2 class="text-uppercase">{{route.title}}</h2>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <td><b>Train</b></td>
                            <td><b>Total path time</b></td>
                            <td><b>Route start time</b></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{this.route.trainTitle}}</td>
                            <td>{{this.route.routeTotalTime}}</td>
                            <td>{{this.route.start}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>

        <div class="templatemo-flex-row flex-content-row">
            <div class="col-2">
                <div class="panel panel-default templatemo-content-widget white-bg no-padding">
                    <div class="panel-heading templatemo-position-relative"><h2 class="text-uppercase">Stations</h2></div>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <td><b>Station</b></td>
                                    <td><b>Arrival time</b></td>
                                    <td><b>Stop duration (minutes)</b></td>
                                    <td><b>Departure time</b></td>
                                </tr>
                            </thead>
                            <tbody style="overflow-y: auto; height: 100px;">
                            <tr v-for="station in route.stations" :key="station.stationId">
                                <td>{{station.title}}</td>
                                <td>{{station.at}}</td>
                                <td>{{station.stopDuration}}</td>
                                <td>{{station.dt}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-1">
                <div class="panel panel-default templatemo-content-widget white-bg no-padding">
                    <div class="panel-heading templatemo-position-relative"><h2 class="text-uppercase">Weekdays</h2></div>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <tbody>
                            <tr v-for="day in route.weekDays" :key="day.id">
                                <td><b>{{day.title}}</b></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosInstance from "../../../axiosInstance";
    export default {
        props: ['id'],
        data() {
            return {
                dayList: [],
                searchId: 12,
                route: ""
            }
        },
        computed:{
        },
        methods:{
            getWeekDays() {
                axiosInstance.get(
                    '/api/public/weekday', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        console.log(res.data);
                        this.dayList = res.data; //stations is array
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                    }
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                });
            },
            search(){
                this.route= "";
                axiosInstance.get(
                    '/api/public/getRoute', {params: {routeId: parseInt(this.id)}}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        console.log(res.data);
                        this.route = res.data;
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
            this.getWeekDays();
            if(this.id) this.search()
        }
    }
</script>