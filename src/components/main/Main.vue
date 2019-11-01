<template>
    <div class="templatemo-flex-row">
        <sidebar v-if="$store.getters.isAuth"></sidebar>
        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container"><!--CHOOSE TRAVEL-->
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

                    <!--                    <div class="row form-group">-->
                    <!--                        <div class="col-lg-12 form-group">-->
                    <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                    <!--                                <input type="checkbox" name="server" id="c3" value="" checked>-->
                    <!--                                <label for="c3" class="font-weight-400"><span></span>LUX</label>-->
                    <!--                            </div>-->
                    <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                    <!--                                <input type="checkbox" name="member" id="c4" value="">-->
                    <!--                                <label for="c4" class="font-weight-400"><span></span>PLATSCARD</label>-->
                    <!--                            </div>-->
                    <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                    <!--                                <input type="checkbox" name="expired" id="c5" value="">-->
                    <!--                                <label for="c5" class="font-weight-400"><span></span>COUPLE</label>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <div class="row form-group">
                        <!--                        <div class="col-lg-6 form-group">-->
                        <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                        <!--                                <input type="radio" name="radio" id="r4" value="">-->
                        <!--                                <label for="r4" class="font-weight-400"><span></span>Morning</label>-->
                        <!--                            </div>-->
                        <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                        <!--                                <input type="radio" name="radio" id="r5" value="" checked>-->
                        <!--                                <label for="r5" class="font-weight-400"><span></span>Noon</label>-->
                        <!--                            </div>-->
                        <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                        <!--                                <input type="radio" name="radio" id="r6" value="">-->
                        <!--                                <label for="r6" class="font-weight-400"><span></span>Evening</label>-->
                        <!--                            </div>-->
                        <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                        <!--                                <input type="radio" name="radio" id="r7" value="">-->
                        <!--                                <label for="r7" class="font-weight-400"><span></span>Night</label>-->
                        <!--                            </div>-->
                        <!--                            <div class="margin-right-15 templatemo-inline-block">-->
                        <!--                                <input type="radio" name="radio" id="r8" value="">-->
                        <!--                                <label for="r8" class="font-weight-400"><span></span>Any time</label>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <div class="col-lg-6 form-group" style="width: 100%;">

                        </div>
                    </div>
                </div><!--CHOOSE TRAVEL ENDS-->
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
                                <td>{{route.dep.date}}</td>
                                <td>{{route.arr.title}}</td>
                                <td>{{route.arr.date}}</td>
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
        </div>

    </div>
</template>

<script>
    import axiosInstance from "../../auth-service";
    import sidebar from '../common/Sidebar.vue'
    import headbar from '../common/Headbar.vue'

    export default {
        name: "main",
        components: {
            sidebar,
            headbar
        },
        data() {
            return {
                departureDate: "",
                selectedDep: "",
                selectedArr: "",
                stations: [
                    {title: "Astana", id: 1},
                    {title: "Almaty", id: 2}
                ],
                routes: [],
                loading: false
            }
        },
        methods: {
            chooseTrain(route){
              this.$router.push({ path:`/route/${route.route.id}`, query:{
                      arrStaion: route.arr.id,
                      depStation: route.dep.id,
                      arrDate: route.arr.date,
                      depDate: route.dep.date
                  } })
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
                this.loading = true;
                //2019-11-04
                axiosInstance.post('/api/public/findTicket',
                    {
                        depStationId: this.selectedDep,
                        arrStationId: this.selectedArr,
                        day: parseInt(this.departureDate.substr(9, 2)),
                        month: parseInt(this.departureDate.substr(5, 2)),
                        year: parseInt(this.departureDate.substr(0, 4)),
                        hour: 0,
                        minute: 0
                    },
                    {}).then(res => {
                    this.routes = res.data;
                    this.loading = false;
                    console.log(res.data);
                }).catch(error => {
                    console.log(error.data);
                    this.loading = false;

                })
            }
        },
        created() {
            this.getStations();
        }
    }
</script>