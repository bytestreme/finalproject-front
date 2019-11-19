<template>
    <div v-if="!isChosenRoute" class="templatemo-content-container"><!--CHOOSE TRAVEL-->
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Preferences</h2>
                    <p>Choose your destination:</p>


                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="inputDep">Departure City</label>
                            <select class="form-control" id="inputDep" v-model="selectedDep">
                                <option value="">Select from</option>
                                <option v-if="selectedArr !== station.id" :key="station.id"
                                        v-for="station in stations" :value="station.id">{{station.title}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="inputArriv">Arrival City</label>
                            <select class="form-control" id="inputArriv" v-model="selectedArr">
                                <option value="">Select to</option>
                                <option v-if="selectedDep !== station.id" :key="station.id"
                                        v-for="station in stations" :value="station.id">{{station.title}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <input v-model="departureDate" type="date" name="Departure" class="form-control">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group text-right">
                            <button style="width: 100%" @click="findRoute" class="templatemo-blue-button">Search</button>
                        </div>
                    </div>


                    <div class="row form-group">

                        <div class="col-lg-6 form-group" style="width: 100%;">

                        </div>
                    </div>
                </div><!--CHOOSE TRAVEL ENDS-->
                <div v-if="no_route" class="col-lg-12 has-error form-group">
                    <label class="control-label">No routes found</label>
                </div>
                <div v-if="routes.length!=0" class="templatemo-content-widget green-bg no-padding">
                    <div class="panel panel-default table-responsive">
                        <table class="table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td><a class="white-text templatemo-sort-by">Route title<span
                                        class="caret"></span></a></td>
                                <td><a class="white-text templatemo-sort-by">Train Title<span
                                        class="caret"></span></a></td>
                                <td><a class="white-text templatemo-sort-by">Departure<span
                                        class="caret"></span></a></td>
                                <td><a class="white-text templatemo-sort-by">Date<span class="caret"></span></a>
                                </td>
                                <td><a class="white-text templatemo-sort-by">Arrival<span
                                        class="caret"></span></a></td>
                                <td><a class="white-text templatemo-sort-by">Date<span
                                        class="caret"></span></a></td>
                                <!--                                <td><a href="" class="white-text templatemo-sort-by">Date<span class="caret"></span></a></td>-->
                                <!--                                <td><a href="" class="white-text templatemo-sort-by">Time<span class="caret"></span></a></td>-->
                                <td><a href="" class="white-text templatemo-sort-by">Choose<span
                                        class="caret"></span></a></td>
                            </tr>
                            </thead>
                            <tbody>

                            <tr :key="route.id" v-for="route in routes">
                                <td>{{route.route.title}}</td>
                                <td>{{route.route.train.title}}</td>
                                <td>{{route.dep.title}}</td>
                                <td>{{route.dep.date[2]}}/{{route.dep.date[1]}}/{{route.dep.date[0]}} {{route.dep.date[3]}}:{{route.dep.date[4]}}</td>
                                <td>{{route.arr.title}}</td>
                                <td>{{route.arr.date[2]}}/{{route.arr.date[1]}}/{{route.arr.date[0]}} {{route.arr.date[3]}}:{{route.arr.date[4]}}</td>
                                <td><a @click.prevent="chooseTrain(route)" href="" class="templatemo-edit-btn">Choose</a></td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
                <div v-if="loading" style="height: 250px" class="col-lg-12">
                    <div style="justify-content: center" class="loader">Loading...</div>
                </div>
            </div>
    <TrainPage v-else-if="isChosenRoute"
               :arrStation="chosenRoute.arrStation"
               :depStation="chosenRoute.depStation"
               :arrDate="chosenRoute.arrDate"
               :depDate="chosenRoute.depDate"
               :train="chosenRoute.train"
               :id="chosenRoute.id"
    ></TrainPage>
</template>

<script>
    import TrainPage from "./TrainPage.vue"
    import axiosInstance from "../../axiosInstance";
    export default {
        components: {
            TrainPage
        },
        name: "main",
        data() {
            return {
                isChosenRoute: false,
                no_route: false,
                departureDate: "",
                selectedDep: "",
                selectedArr: "",
                stations: [
                    {title: "Astana", id: 1},
                    {title: "Almaty", id: 2}
                ],
                routes: [],
                loading: false,
                chosenRoute:{
                }
            }
        },
        methods: {
            chooseTrain(route){
                this.chosenRoute.id = route.route.id;
                this.chosenRoute.arrStation = route.arr.id;
                this.chosenRoute.depStation = route.dep.id;
                this.chosenRoute.arrDate = route.arr.date;
                this.chosenRoute.depDate = route.dep.date;
                this.chosenRoute.train = route.route.train.id;
                this.isChosenRoute = true;
            },
            getStations() {
                axiosInstance.get(
                    '/api/public/station', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        console.log(res.data);
                        this.stations = res.data; //stations is array
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                    }
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                });
            },
            findRoute() {
                this.no_route = false;
                this.loading = true;
                this.routes = [];
                axiosInstance.post('/api/public/findTicket',
                    {
                        depStationId: this.selectedDep,
                        arrStationId: this.selectedArr,
                        day: parseInt(this.departureDate.substr(8, 2)),
                        month: parseInt(this.departureDate.substr(5, 2)),
                        year: parseInt(this.departureDate.substr(0, 4)),
                        hour: 0,
                        minute: 0
                    }).then(res => {
                    this.routes = res.data;
                    this.no_route = res.data.length === 0;
                    this.loading = false;
                    console.log(res.data);
                }).catch(error => {
                    console.log(error.data);
                    this.loading = false;
                    this.no_route = true;
                })
            }
        },
        created() {
            this.getStations();
        }
    }
</script>