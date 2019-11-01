<template>
    <div class="templatemo-flex-row">
        <sidebar></sidebar>
        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Profile Information</h2>

                    <form action="index.html" class="templatemo-login-form" method="post" enctype="multipart/form-data">
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputFirstName">First Name</label>
                                <input type="text" class="form-control" id="inputFirstName" placeholder="Mark">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputLastName">Last Name</label>
                                <input type="text" class="form-control" id="inputLastName" placeholder="Sterling">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputUsername">Username</label>
                                <input type="text" class="form-control" id="inputUsername" placeholder="admin">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Email</label>
                                <input type="email" class="form-control" id="inputEmail" placeholder="admin@railways.kz">
                            </div>
                        </div>

                        <div class="form-group text-left">
                            <button type="submit" class="templatemo-blue-button">Update</button>
                            <button type="reset" class="templatemo-white-button">Reset</button>
                        </div>

                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputCurrentPassword">Current Password</label>
                                <input type="password" class="form-control highlight" id="inputCurrentPassword" placeholder="******************">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputNewPassword">New Password</label>
                                <input type="password" class="form-control" id="inputNewPassword">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputConfirmNewPassword">Confirm New Password</label>
                                <input type="password" class="form-control" id="inputConfirmNewPassword">
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
                                        <td>#</td>
                                        <td>Ticket Number</td>
                                        <td>Passenger Name</td>
                                        <td>Departure Date</td>
                                        <td>Departure Station</td>
                                        <td>Arrival Date</td>
                                        <td>Arrival Station</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1.</td>
                                        <td>00000000</td>
                                        <td>Smith</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>2.</td>
                                        <td>00000000</td>
                                        <td>Jones</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>3.</td>
                                        <td>00000000</td>
                                        <td>James</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>4.</td>
                                        <td>00000000</td>
                                        <td>Bride</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>5.</td>
                                        <td>00000000</td>
                                        <td>Richard</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>6.</td>
                                        <td>00000000</td>
                                        <td>Brad</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>7.</td>
                                        <td>00000000</td>
                                        <td>Eric</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    <tr>
                                        <td>8.</td>
                                        <td>00000000</td>
                                        <td>Susan</td>
                                        <td>--/--/--</td>
                                        <td>Astana</td>
                                        <td>--/--/--</td>
                                        <td>Almaty</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headbar from '../../common/Headbar.vue'
    import sidebar from '../../common/Sidebar.vue'
    // import axiosInstance from "../../auth-service";
    export default {
        components:{
            headbar,
            sidebar
        },
        data() {
            return {
                upcomingTrips:"",
                history:""
            }
        },
        methods:{
            // getHistory() {
            //     axiosInstance.get(
            //         '/api/history', {}
            //     ).then(res => {
            //         if (res.status === 200) {
            //             // eslint-disable-next-line no-console
            //             console.log("OK: " + res.data);
            //             console.log(res.data);
            //         } else {
            //             // eslint-disable-next-line no-console
            //             console.log("BAD: " + res.status);
            //         }
            //     }).catch(e => {
            //         // eslint-disable-next-line no-console
            //         console.log(e)
            //     });
            // },
        }
    }
</script>