<template>
    <div class="templatemo-flex-row">
        <sidebar v-if="$store.getters.isAuth"></sidebar>
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <table class="table table-striped table-bordered templatemo-user-table">
                        <thead>
                        <tr>
                            <td><a class="white-text templatemo-sort-by">Wagon number<span
                                    class="caret"></span></a></td>
                            <td><a class="white-text templatemo-sort-by">Available Seats<span
                                    class="caret"></span></a></td>
                            <td><a href="" class="white-text templatemo-sort-by"><span>
                            </span></a></td>
                        </tr>
                        </thead>
                        <tbody>

                        <tr :key="wagon.number" v-for="wagon in wagons">
                            <td>{{wagon.number}}</td>
                            <td>{{parseInt(wagon.seats) - parseInt(wagon.filledSeats)}}</td>
                            <td><a href="" @click.prevent="chosenWagon = wagon.number; chosenSeat = ''" class="templatemo-edit-btn">Choose</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="chosenWagon" class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Choose seat</h2>
                    <div class="panel panel-default table-responsive">

                        <table class="table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td><a href="" class="white-text templatemo-sort-by">Wagon number<span></span></a></td>
                                <td v-for="i in wagons.find(x=>x.number === chosenWagon).seats/4" :key="i"><a href="" class="white-text templatemo-sort-by">Coupe #{{i}}<span></span></a></td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td align="center">{{chosenWagon}}</td>
                                <td v-for="i in wagons.find(x=>x.number === chosenWagon).seats/4" :key="i">
                                    <table class="table table-striped table-bordered templatemo-user-table">
                                        <tr>
                                            <td>
                                                <input
                                                        :disabled="wagons.find(x=>x.number === chosenWagon).filledSeats
                                                        .findIndex(x=>x === 1+(i-1)*4)>-1"
                                                        v-model="chosenSeat"
                                                        type="radio"
                                                        name="radio"
                                                        :id="1+(i-1)*4"
                                                        :value="1+(i-1)*4">
                                                <label style="padding-top: 2px" :for="1+(i-1)*4" class="font-weight-400"><span></span>{{1+(i-1)*4}}</label>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="2+(i-1)*4" :value="2+(i-1)*4"
                                                       :disabled="wagons.find(x=>x.number === chosenWagon).filledSeats
                                                        .findIndex(x=>x === 2+(i-1)*4)>-1">
                                                <label :for="2+(i-1)*4" class="font-weight-400"><span></span>{{2+(i-1)*4}}</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="3+(i-1)*4" :value="3+(i-1)*4"
                                                       :disabled="wagons.find(x=>x.number === chosenWagon).filledSeats
                                                        .findIndex(x=>x === 3+(i-1)*4)>-1">
                                                <label style="padding-top: 2px" :for="3+(i-1)*4" class="font-weight-400"><span></span>{{3+(i-1)*4}}</label>
                                                <input v-model="chosenSeat" type="radio" name="radio" :id="4+(i-1)*4" :value="4+(i-1)*4"
                                                       :disabled="wagons.find(x=>x.number === chosenWagon).filledSeats
                                                        .findIndex(x=>x === 4+(i-1)*4)>-1">
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
                            <button :disabled="!chosenSeat" @click.prevent="next = true" class="templatemo-blue-button">Next</button>
                        </div>
                    </div>
                    <div v-if="next" class="templatemo-content-widget white-bg">
                        <h2 class="margin-bottom-10">Passenger information</h2>

                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputFName">First Name</label>
                                <input v-model="fname" type="name" class="form-control" id="inputFName" placeholder="Mark">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputLName">Last Name</label>
                                <input type="name" v-model="lname" class="form-control" id="inputLName" placeholder="Sterling">
                            </div>
                        </div>


                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Email</label>
                                <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="admin@railways.kz">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputNatID">National ID</label>
                                <input v-model="natID" type="NatID" class="form-control" id="inputNatID" placeholder="00000001">
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
    import axiosInstance from "../../auth-service";
    import sidebar from '../common/Sidebar.vue'
    import headbar from '../common/Headbar.vue'
    export default {
        components: {
            sidebar,
            headbar
        },
        data() {
            return {
                fname:"",
                lname:"",
                email:"",
                natID:"",
                next: false,
                chosenSeat:"",
                chosenWagon:"",
                wagons:[
                    {
                    number:1,
                    seats: 24,
                    filledSeats:[12, 14, 2, 5, 3]
                    },
                    {
                    number:2,
                    seats: 20,
                    filledSeats:[12, 14, 2, 5]
                    },
                    {
                    number:3,
                    seats: 20,
                    filledSeats:[12, 14, 2, 5, 3, 7, 8]
                    }
                    ]
            }
        },
        methods:{
            buy(){
                if(!this.chosenSeat || !this.fname || !this.lname || !this.email || !this.natID){
                    alert("Please fill all the info");
                    return;
                }
                axiosInstance.post('/api/buy',
                    {
                        route: this.$route.params.id,
                        wagon: this.chosenWagon,
                        seat: this.chosenSeat,
                        firstName: this.fname,
                        lastName: this.lname,
                        email: this.email,
                        natID: this.natID,
                        arrStation: this.$route.arrStation,
                        depStation: this.$route.depStation,
                        arrDate: this.$route.arrDate,
                        depDate: this.$route.depDate
                    },
                    {}).then()
                    .catch(error => {
                    console.log(error.data);
                })
            },
            getWagons(){

            }
        }
    }
</script>