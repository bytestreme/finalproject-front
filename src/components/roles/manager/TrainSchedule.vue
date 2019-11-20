<template>
    <div class="templatemo-content-container">
        <div class="templatemo-content-widget white-bg">
            <h2 class="margin-bottom-10">Train ID</h2>

                <div class="row form-group">
                    <div class="col-lg-6 col-md-6 form-group">
                        <input type="text" class="form-control" id="inputFirstName" placeholder="1">
                    </div>

                </div>

                 <div class="form-group text-right">
                      <button type="search" class="templatemo-blue-button">Search</button>
                 </div>


        </div>

        <div class="templatemo-content-widget  white-bg">
            <h2 class="margin-bottom-5">Train Schedule</h2>
            <div class="templatemo-content-container mar">


                    <div style = "padding-left: 0px; padding-right: 0px" class="col-lg-6 panel panel-default pull-left">
                        <table class=" table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td>Station</td>
                                <td>Time</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Almaty</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>Astana</td>
                                <td>80</td>
                            </tr>
                            <tr>
                                <td>Karaganda</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <td>Taraz</td>
                                <td>0</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="row form-group">
                    <div class="col-lg-6 col-md-3 form-group pull-right">
                        <label>Train type</label>
                        <input disabled type="text" class="form-control" placeholder="Talgo">
                    </div>
                        <div class="col-lg-3 col-md-3 form-group pull-right">
                            <label>Departure time</label>
                            <input disabled type="text" class="form-control" placeholder="8:30">
                        </div>
                        <div class="col-lg-3 col-md-3 form-group pull-right">
                            <label>Total time</label>
                            <input disabled type="text" class="form-control" placeholder="100">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label >Choose Weekdays</label>
                            <ul class="list-inline mx-auto justify-content-center "  >
                                <div class=" no-padding " >

                                <li class="list-inline-item" v-for="day in dayList" >
                                    <div class="margin-right-15 templatemo-inline-block">
                                        <label :for="day.id"
                                               class="font-weight-400"><span></span>{{day.title}}</label>


                                    </div>
                                </li>
                                </div>
                            </ul>
                        </div>
                    </div>

                <div class="templatemo-flex-row flex-content-row">
                    <div class="templatemo-content-widget white-bg col-2">
                        <i class="fa fa-times"></i>
                        <div class="square"></div>
                        <h2 class="templatemo-inline-block">Map</h2><hr>
                        <p>There will be a map.</p>
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
                upcomingTrips:"",
                tickets:[],
                user: "",
                dayList: "",

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
        },
        created() {
            this.getWeekDays();
        }
    }
</script>