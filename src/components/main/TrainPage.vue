<template>
    <div class="templatemo-flex-row">
        <sidebar v-if="$store.getters.isAuth"></sidebar>
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <div class="panel panel-default table-responsive">
                        <table class="table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td style="width: 5%"><a class="white-text templatemo-sort-by">Wagon number<span
                                        class="caret"></span></a></td>
                                <td style="width: 25%"><a class="white-text templatemo-sort-by">Available Seats<span
                                        class="caret"></span></a></td>
                                <td style="width: 25%"><a class="white-text templatemo-sort-by">Type<span class="caret">
                            </span></a></td>
                                <td style="width: 25%"><a class="white-text templatemo-sort-by">Actions<span class="caret">
                            </span></a></td>
                            </tr>
                            </thead>
                            <tbody>

                            <tr :key="wagon.number" v-for="wagon in wagons.wagonList">
                                <td>{{wagon.id}}</td>
                                <td>{{parseInt(wagon.wagonClass.maxSeats)}}</td>
                                <td>{{wagon.wagonClass.title}}</td>
                                <td><a href="" @click.prevent="chosenWagon = wagon.id; chosenSeat = ''"
                                       class="templatemo-edit-btn">Choose</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if="chosenWagon" class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Choose seat</h2>
                    <div class="panel panel-default table-responsive">

                        <table class="table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td><a href="" class="white-text templatemo-sort-by">Wagon number<span></span></a></td>
                                <td v-for="i in wagons.wagonList.find(x=>x.id === chosenWagon).wagonClass.maxSeats/4"
                                    :key="i"><a href=""
                                                class="white-text templatemo-sort-by">Coupe
                                    #{{i}}<span></span></a></td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td align="center">{{chosenWagon}}</td>
                                <td v-for="i in wagons.wagonList.find(x=>x.id === chosenWagon).wagonClass.maxSeats/4"
                                    :key="i">
                                    <table class="table table-striped table-bordered templatemo-user-table">
                                        <tr>
                                            <td>
                                                <input
                                                        v-model="chosenSeat"
                                                        type="radio"
                                                        name="radio"
                                                        :id="1+(i-1)*4"
                                                        :value="1+(i-1)*4">
                                                <label style="padding-top: 2px" :for="1+(i-1)*4"
                                                       class="font-weight-400"><span></span>{{1+(i-1)*4}}</label>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="2+(i-1)*4"
                                                       :value="2+(i-1)*4">
                                                <label :for="2+(i-1)*4" class="font-weight-400"><span></span>{{2+(i-1)*4}}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="3+(i-1)*4"
                                                       :value="3+(i-1)*4">
                                                <label style="padding-top: 2px" :for="3+(i-1)*4"
                                                       class="font-weight-400"><span></span>{{3+(i-1)*4}}</label>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="4+(i-1)*4"
                                                       :value="4+(i-1)*4">
                                                <label :for="4+(i-1)*4" class="font-weight-400"><span></span>{{4+(i-1)*4}}</label>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>


                            </tbody>
                        </table>
                    </div>
                    <div v-if="!next" class="row form-group">
                        <div class="form-group text-right">
                            <button :disabled="!chosenSeat" @click.prevent="next = true" class="templatemo-blue-button">
                                Next
                            </button>
                        </div>
                    </div>
                    <div v-if="next" class="templatemo-content-widget white-bg">
                        <h2 class="margin-bottom-10">Passenger information</h2>

                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputFName">First Name</label>
                                <input v-model="fname" type="name" class="form-control" id="inputFName"
                                       placeholder="John">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputLName">Last Name</label>
                                <input type="name" v-model="lname" class="form-control" id="inputLName"
                                       placeholder="Doe">
                            </div>
                        </div>


                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Email</label>
                                <input v-model="email" type="email" class="form-control" id="inputEmail"
                                       placeholder="admin@railways.kz">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputNatID">National ID</label>
                                <input v-model="natID" type="NatID" class="form-control" id="inputNatID"
                                       placeholder="00000001">
                            </div>
                        </div>

                    </div>
                    <div v-if="next" class="row form-group">
                        <div class="form-group text-right">
                            <button @click.prevent="buy" class="templatemo-blue-button">Buy Ticket</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import axiosInstance from "../../axiosInstance";
    import sidebar from '../common/Sidebar.vue'
    import headbar from '../common/Headbar.vue'

    export default {
        components: {
            sidebar,
            headbar
        },
        data() {
            return {
                fname: "",
                lname: "",
                email: "",
                natID: "",
                next: false,
                chosenSeat: "",
                chosenWagon: "",
                wagons: ""
            }
        },
        methods: {
            buy() {
                if (!this.chosenSeat || !this.fname || !this.lname || !this.email || !this.natID) {
                    alert("Please fill all the info");
                    return;
                }
                let arrD = {
                    year: parseInt(this.$route.query.arrDate.substr(0, 4)),
                    month: parseInt(this.$route.query.arrDate.substr(5, 2)),
                    day: parseInt(this.$route.query.arrDate.substr(8, 2)),
                    hour: parseInt(this.$route.query.arrDate.substr(11, 2)),
                    minute: parseInt(this.$route.query.arrDate.substr(14, 2))
                };
                let depD = {
                    year: parseInt(this.$route.query.depDate.substr(0, 4)),
                    month: parseInt(this.$route.query.depDate.substr(5, 2)),
                    day: parseInt(this.$route.query.depDate.substr(8, 2)),
                    hour: parseInt(this.$route.query.depDate.substr(11, 2)),
                    minute: parseInt(this.$route.query.depDate.substr(14, 2))
                };
                axiosInstance.post('/api/user/order',
                    {
                        routeId: parseInt(this.$route.params.id),
                        wagonId: this.chosenWagon,
                        seat: this.chosenSeat,
                        fName: this.fname,
                        lName: this.lname,
                        email: this.email,
                        natId: this.natID,
                        arrStation: parseInt(this.$route.query.arrStation),
                        depStation: parseInt(this.$route.query.depStation),
                        arrDate: arrD,
                        depDate: depD
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }).then(res => {
                    console.log(res.data);
                    this.$router.push({path: '/passenger-profile'});
                })
                    .catch(error => {
                        console.log(error.data);
                    })
            },
            getWagons() {
                axiosInstance.get('/api/public/train/' + this.$route.query.train)
                    .then(res => {
                        this.wagons = res.data;
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log(error.data)
                    })
            },
        },
        created() {
            this.getWagons();
        }
    }
</script>