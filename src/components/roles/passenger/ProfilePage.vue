<template>
    <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Profile Information</h2>

                    <form class="templatemo-login-form" method="post" enctype="multipart/form-data">
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputFirstName">First Name</label>
                                <input disabled v-model="user.firstName" type="text" class="form-control" id="inputFirstName" placeholder="John">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputLastName">Last Name</label>
                                <input disabled v-model="user.lastName" type="text" class="form-control" id="inputLastName" placeholder="Doe">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputUsername">Username</label>
                                <input disabled v-model="user.username" type="text" class="form-control" id="inputUsername" placeholder="admin">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Email</label>
                                <input disabled v-model="user.email" type="email" class="form-control" id="inputEmail" placeholder="admin@railways.kz">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputPhone">Phone</label>
                                <input disabled v-model="user.phone" id="inputPhone" v-mask="'#(###)-###-##-##'" type="text" class="form-control"
                                       placeholder="8(777)-777-77-77">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputNatId">National ID</label>
                                <input disabled v-model="user.natId" type="text" class="form-control" id="inputNatId" placeholder="010000">
                            </div>
                        </div>

<!--                        <div class="form-group text-left">-->
<!--                            <button @click="edit" class="templatemo-blue-button">Update</button>-->
<!--                        </div>-->
                    </form>
                </div>

                <div class="templatemo-content-widget  white-bg">
                    <h2 class="margin-bottom-10">Upcoming Trips</h2>
                    <div v-if="upcoming.length > 0" class="templatemo-content-container">
                        <div class="templatemo-content-widget no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td>Ticket number</td>
                                        <td>Route title</td>
                                        <td>Train title</td>
                                        <td>Wagon number</td>
                                        <td>Seat number</td>
                                        <td>Passenger Name</td>
                                        <td>Departure Date</td>
                                        <td>Departure Station</td>
                                        <td>Arrival Date</td>
                                        <td>Arrival Station</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr :key="ticket.id" v-for="ticket in upcoming">
                                        <td>{{ticket.id}}</td>
                                        <td>{{ticket.route.title}}</td>
                                        <td>{{ticket.route.train.title}}</td>
                                        <td>{{ticket.wagon.id}}</td>
                                        <td>{{ticket.seatNum}}</td>
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
                    <div v-else><br /><label class="control-label">No upcoming trips</label></div>
                </div>
                <div class="templatemo-content-widget  white-bg">
                    <h2 class="margin-bottom-10">History</h2>
                    <div v-if="history.length > 0" class="templatemo-content-container">
                        <div class="templatemo-content-widget no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td>Ticket number</td>
                                        <td>Route title</td>
                                        <td>Train title</td>
                                        <td>Wagon number</td>
                                        <td>Seat number</td>
                                        <td>Passenger Name</td>
                                        <td>Departure Date</td>
                                        <td>Departure Station</td>
                                        <td>Arrival Date</td>
                                        <td>Arrival Station</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr :key="ticket.id" v-for="ticket in history">
                                        <td>{{ticket.id}}</td>
                                        <td>{{ticket.route.title}}</td>
                                        <td>{{ticket.route.train.title}}</td>
                                        <td>{{ticket.wagon.id}}</td>
                                        <td>{{ticket.seatNum}}</td>
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
                    <div v-else><br /><label class="control-label">Your travel history is empty</label></div>
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
            edit(){
                axiosInstance.post(
                    '/api/user/editProfile',{
                        fName: this.user.firstName,
                        lName: this.user.lastName,
                        phone: this.user.phone,
                        natId: this.user.natId,
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    console.log(res.data);
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.toggleNotify('Success!', 'User info successfully edited!', 'ok');
                    } else {
                        this.toggleNotify('Error!', +res.data.message, 'bad');
                        console.log("BAD: " + res.status);
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
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