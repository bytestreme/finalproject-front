<template>
    <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Profile Information</h2>

                    <form action="index.html" class="templatemo-login-form" method="post" enctype="multipart/form-data">
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputFirstName">First Name</label>
                                <input v-model="user.firstName" type="text" class="form-control" id="inputFirstName" placeholder="Mark">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputLastName">Last Name</label>
                                <input v-model="user.lastName" type="text" class="form-control" id="inputLastName" placeholder="Sterling">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputUsername">Username</label>
                                <input v-model="user.username" type="text" class="form-control" id="inputUsername" placeholder="admin">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Email</label>
                                <input v-model="user.email" type="email" class="form-control" id="inputEmail" placeholder="admin@railways.kz">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputPhone">Phone</label>
                                <input v-model="user.phone" id="inputPhone" v-mask="'#(###)-###-##-##'" type="text" class="form-control"
                                       placeholder="8(777)-777-77-77">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputNatId">National ID</label>
                                <input v-model="user.natId" type="text" class="form-control" id="inputNatId" placeholder="010000">
                            </div>
                        </div>

                        <div class="form-group text-left">
                            <button type="submit" class="templatemo-blue-button">Update</button>
                            <button type="reset" class="templatemo-white-button">Reset</button>
                        </div>

                    </form>
                </div>

                <div class="templatemo-content-widget  white-bg">
                    <h2 class="margin-bottom-10">Upcoming Trips</h2>
                    <div class="templatemo-content-container">
                        <div class="templatemo-content-widget no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td>Route title</td>
                                        <td>Train title</td>
                                        <td>Wagon number</td>
                                        <td>Passenger Name</td>
                                        <td>Departure Date</td>
                                        <td>Departure Station</td>
                                        <td>Arrival Date</td>
                                        <td>Arrival Station</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr :key="ticket.id" v-for="ticket in upcoming">
                                        <td>{{ticket.route.title}}</td>
                                        <td>{{ticket.route.train.title}}</td>
                                        <td>{{ticket.wagon.id}}</td>
                                        <td>{{ticket.lname + " " + ticket.fname}}</td>
                                        <td>{{ticket.depDate}}</td>
                                        <td>{{ticket.depStation.title}}</td>
                                        <td>{{ticket.arrDate}}</td>
                                        <td>{{ticket.arrStation.title}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="templatemo-content-widget  white-bg">
                    <h2 class="margin-bottom-10">History</h2>
                    <div class="templatemo-content-container">
                        <div class="templatemo-content-widget no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td>Route title</td>
                                        <td>Train title</td>
                                        <td>Wagon number</td>
                                        <td>Passenger Name</td>
                                        <td>Departure Date</td>
                                        <td>Departure Station</td>
                                        <td>Arrival Date</td>
                                        <td>Arrival Station</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr :key="ticket.id" v-for="ticket in history">
                                        <td>{{ticket.route.title}}</td>
                                        <td>{{ticket.route.train.title}}</td>
                                        <td>{{ticket.wagon.id}}</td>
                                        <td>{{ticket.lname + " " + ticket.fname}}</td>
                                        <td>{{ticket.depDate}}</td>
                                        <td>{{ticket.depStation.title}}</td>
                                        <td>{{ticket.arrDate}}</td>
                                        <td>{{ticket.arrStation.title}}</td>
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
        data() {
            return {
                upcomingTrips:"",
                tickets:[],
                user: ""
            }
        },
        computed:{
            upcoming(){
                let d = new Date().getTime();
                return this.tickets.filter(x=>new Date(x.depDate).getTime() >= d);
            },
            history(){
                let d = new Date().getTime();
                return this.tickets.filter(x=>new Date(x.depDate).getTime() < d);
            }
        },
        methods:{
            getTickets() {
                axiosInstance.get(
                    '/api/user/myTickets',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        console.log(res.data);
                        this.tickets = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                    }
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                });
            },
            getUser(){
                axiosInstance.get(
                    '/api/user/myProfile',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        console.log(res.data);
                        this.user = res.data;
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
            this.getTickets();
            this.getUser();
        }
    }
</script>