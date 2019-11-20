<template>
    <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <div v-if="advisory.data" class="templatemo-content-widget orange-bg">
                        <i class="fa fa-times" @click="hideAd()"></i>
                        <div class="media">
                            <div class="media-body">
                                <h2 class="media-heading text-uppercase">Advisory for the route {{advisory.data.route.title}}</h2>
                                <p>{{advisory.data.text}}</p>
                                <p>From {{advisory.data.start[2]}}/{{advisory.data.start[1]}}/{{advisory.data.start[0]}} </p>
                                <p>To {{advisory.data.endDate[2]}}/{{advisory.data.endDate[1]}}/{{advisory.data.endDate[0]}} </p>
                            </div>
                        </div>
                    </div>
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
                                <td><a href="" @click.prevent="chooseWagon(wagon.id)"
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
                                                        :disabled="reservedSeats.findIndex(x=>x == 1+(i-1)*4)>-1"
                                                        type="radio"
                                                        name="radio"
                                                        :id="1+(i-1)*4"
                                                        :value="1+(i-1)*4">
                                                <label style="padding-top: 2px" :for="1+(i-1)*4"
                                                       class="font-weight-400"><span></span>{{1+(i-1)*4}}</label>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="2+(i-1)*4"
                                                       :disabled="reservedSeats.findIndex(x=>x == 2+(i-1)*4)>-1"
                                                       :value="2+(i-1)*4">
                                                <label :for="2+(i-1)*4" class="font-weight-400"><span></span>{{2+(i-1)*4}}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="3+(i-1)*4"
                                                       :disabled="reservedSeats.findIndex(x=>x == 3+(i-1)*4)>-1"
                                                       :value="3+(i-1)*4">
                                                <label style="padding-top: 2px" :for="3+(i-1)*4"
                                                       class="font-weight-400"><span></span>{{3+(i-1)*4}}</label>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="4+(i-1)*4"
                                                       :disabled="reservedSeats.findIndex(x=>x == 4+(i-1)*4)>-1"
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
                                       placeholder="example@example.com">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputNatID">National ID</label>
                                <input v-model="natID" type="NatID" class="form-control" id="inputNatID"
                                       placeholder="00000001">
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Phone</label>
                                <input v-model="phone" v-mask="'#(###)-###-##-##'" type="text" class="form-control"
                                       placeholder="8(777)-777-77-77">
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
</template>

<script>
    import axiosInstance from "../../axiosInstance";

    export default {
        props: ["arrStation", "depStation", "arrDate", "depDate", "train", "id"],
        data() {
            return {
                fname: "",
                lname: "",
                email: "",
                natID: "",
                next: false,
                chosenSeat: "",
                chosenWagon: "",
                wagons: "",
                reservedSeats: [],
                phone:"",
                advisory:""
            }
        },
        methods: {
            buy() {
                if (!this.chosenSeat || !this.fname || !this.lname || !this.email || !this.natID || !this.phone) {
                    alert("Please fill all the info");
                    return;
                }
                let arrD = {
                    day: parseInt(this.arrDate.substr(8, 2)),
                    month: parseInt(this.arrDate.substr(5, 2)),
                    year: parseInt(this.arrDate.substr(0, 4)),
                    hour: 0,
                    minute: 0
                };
                let depD = {
                    day: parseInt(this.arrDate.substr(8, 2)),
                    month: parseInt(this.arrDate.substr(5, 2)),
                    year: parseInt(this.arrDate.substr(0, 4)),
                    hour: 0,
                    minute: 0
                };
                axiosInstance.post('/api/user/order',
                    {
                        routeId: parseInt(this.id),
                        wagonId: this.chosenWagon,
                        seat: this.chosenSeat,
                        fName: this.fname,
                        lName: this.lname,
                        email: this.email,
                        natId: this.natID,
                        arrStation: parseInt(this.arrStation),
                        depStation: parseInt(this.depStation),
                        arrDate: arrD,
                        depDate: depD,
                        phone: this.phone
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
                axiosInstance.get('/api/public/train/' + this.train)
                    .then(res => {
                        this.wagons = res.data;
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log(error.data)
                    })
            },
            getReservedSeats(){
                this.reservedSeats = [];
                let arrD = {
                    year: parseInt(this.arrDate.substring(0,4)),
                    month: parseInt(this.arrDate.substring(5,7)),
                    day: parseInt(this.arrDate.substring(8,10)),
                    hour: 0,
                    minute: 0
                };
                let depD = {
                    year: parseInt(this.depDate.substring(0,4)),
                    month: parseInt(this.depDate.substring(5,7)),
                    day: parseInt(this.depDate.substring(8,10)),
                    hour: 0,
                    minute: 0
                };
                axiosInstance.post('/api/user/getReservedSeats',
                    {
                        routeId: parseInt(this.id),
                        wagonId: this.chosenWagon,
                        arrId: parseInt(this.arrStation),
                        depId: parseInt(this.depStation),
                        arrDate: arrD,
                        depDate: depD
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }).then(res => {
                    console.log(res.data);
                    this.reservedSeats = res.data;
                })
                    .catch(error => {
                        console.log(error.data);
                    })
            },
            getAdvisory(id){
                let depD = {
                    day: parseInt(this.depDate.substr(8, 2)),
                    month: parseInt(this.depDate.substr(5, 2)),
                    year: parseInt(this.depDate.substr(0, 4)),
                    hour: 0,
                    minute: 0
                };
                this.advisory = "";
                axiosInstance.post('api/public/advisory/getAdvisory',
                    {
                        date: depD,
                        routeId: id
                    }).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.advisory = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            chooseWagon(id){
                this.chosenWagon = id;
                this.chosenSeat = '';
                this.getReservedSeats();
            },
            hideAd() {
                this.advisory.data = undefined;
            }
        },
        created() {
            this.getWagons();
            this.getAdvisory(this.id);
        }
    }
</script>