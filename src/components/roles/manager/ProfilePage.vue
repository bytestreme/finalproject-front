<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <sidebar></sidebar>
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <!--                <div class="templatemo-content-widget green-bg no-padding">-->
                <!--                    <div class="panel panel-default table-responsive">-->
                <!--                        <table class="table table-striped table-bordered templatemo-user-table">-->
                <!--                            <thead>-->
                <!--                            <tr>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Train Number<span-->
                <!--                                        class="caret"></span></a></td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Departure City<span-->
                <!--                                        class="caret"></span></a></td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Date <span-->
                <!--                                        class="caret"></span></a></td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Time<span class="caret"></span></a>-->
                <!--                                </td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Arrival City <span-->
                <!--                                        class="caret"></span></a></td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Date<span class="caret"></span></a>-->
                <!--                                </td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Time<span class="caret"></span></a>-->
                <!--                                </td>-->
                <!--                                <td><a href="" class="white-text templatemo-sort-by">Choose<span-->
                <!--                                        class="caret"></span></a></td>-->
                <!--                            </tr>-->
                <!--                            </thead>-->
                <!--                            <tbody>-->
                <!--                            <tr>-->
                <!--                                <td>1.</td>-->
                <!--                                <td>John</td>-->
                <!--                                <td>Smith</td>-->
                <!--                                <td>@jS</td>-->
                <!--                                <td>js@company.com</td>-->
                <!--                                <td><a href="" class="templatemo-edit-btn">Edit</a></td>-->
                <!--                                <td><a href="" class="templatemo-link">Action</a></td>-->
                <!--                                <td><a href="" class="templatemo-edit-btn">Choose</a></td>-->
                <!--                            </tr>-->
                <!--                            </tbody>-->
                <!--                        </table>-->
                <!--                    </div>-->
                <!--                </div>-->
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Create routes</h2>
                    <div class="row form-group">
                        <div class="col-lg-12 col-md-6 form-group">
                            <label for="train">Route title</label>
                            <input v-model="routeTitle" type="text" class="form-control" placeholder="Route Title">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">

                            <label for="train">Choose Train</label>
                            <select :disabled="routeTitle === ''" class="form-control" id="train"
                                    v-model="selectedTrain">
                                <option value="">Select</option>
                                <option :key="train.id"
                                        v-for="train in trains"
                                        :value="train.id">
                                    {{train.title}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">Departure time</label>
                            <input :disabled="routeTitle === ''" v-model="depTime" type="text" class="form-control"
                                   placeholder="Departure time [HH:mm] (e.g. 8:40, 22:50)">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">Choose Station</label>
                            <select style="display: inline" :disabled="selectedTrain === ''"
                                    class="form-control"
                                    id="stations"
                                    v-model="selectedStation">
                                <option value="">Select</option>
                                <option :key="station.id"
                                        v-for="station in stations"
                                        :value="station.id"
                                        v-if="selectedStations.findIndex(x=> x.id === station.id)===-1">
                                    {{station.title}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">Choose Weekdays</label>
                            <ul class="list-inline mx-auto justify-content-center">
                                <li class="list-inline-item" v-for="day in dayList">
                                    <div class="margin-right-15 templatemo-inline-block">
                                        <input type="checkbox" name="member" :id="day.id" :value="day.id"
                                               v-model="checkedDays">
                                        <label :for="day.id"
                                               class="font-weight-400"><span></span>{{day.title}}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 form-group">
                            <div class="form-group text-right">
                                <button :disabled="selectedStation === ''" @click="addStation"
                                        class="templatemo-blue-button">Add Station
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedStations.length!==0" class="row form-group">
                        <div class="templatemo-content-widget green-bg no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td style="width:5%"><a class="white-text templatemo-sort-by">No</a></td>
                                        <td style="width:50%"><a class="white-text templatemo-sort-by">Station</a>
                                        </td>
                                        <td style="width:50%"><a class="white-text templatemo-sort-by">Path duration
                                            (minutes)</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Action</a>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(station, station_index) in selectedStations" :key="station.id">
                                        <td>{{station_index + 1}}</td>
                                        <td>{{station.title}}</td>
                                        <td><input v-model="station.duration" type="number" class="form-control">
                                        </td>
                                        <td><a href="" @click.prevent="removeStation(station.id)"
                                               class="templatemo-del-btn">Remove</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div v-if="this.selectedStations.length >1" class="row form-group">
                        <div class="col-lg-6 form-group" style="width: 100%;">
                            <div class="form-group text-right">
                                <button @click.prevent="submit" :disabled="selectedStations.length<2"
                                        class="templatemo-blue-button">Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import axiosInstance from "../../../axiosInstance";
    import headbar from '../../common/Headbar.vue'
    import sidebar from '../../common/Sidebar.vue'

    export default {
        components: {
            headbar,
            sidebar
        },
        data() {
            return {
                stations: "",
                selectedStation: "",
                selectedStations: [],
                selectedTrain: "",
                trains: "",
                routeTitle: "",
                depTime: "",
                checkedDays: [],
                dayList: "",
            }
        },
        methods: {
            removeStation(id) {
                this.selectedStations.splice(this.selectedStations.findIndex(x => x.id === id), 1);
            },
            addStation() {
                this.selectedStations.push({
                    id: this.selectedStation,
                    title: this.stations.find(x => x.id === this.selectedStation).title,
                    duration: 0
                });
                this.selectedStation = "";
            },
            getStations() {
                axiosInstance.get(
                    '/api/public/station', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
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
            getTrains() {
                axiosInstance.get(
                    '/api/public/train', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.trains = res.data; //stations is array
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                    }
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                });
            },
            submit() {
                if (this.checkedDays.length === 0) {
                    this.toggleNotify('Error!', 'Weekdays not selected!', 'bad');
                    return;
                }
                if (this.routeTitle.length === 0) {
                    this.toggleNotify('Error!', 'Route title cannot be empty!', 'bad');
                    return;
                }
                if (this.selectedStations.length === 0) {
                    this.toggleNotify('Error!', 'Stations not selected!', 'bad');
                    return;
                }
                if (this.depTime.length === 0) {
                    this.toggleNotify('Error!', 'Route start time cannot be empty!', 'bad');
                    return;
                }
                let s = [];
                this.selectedStations.forEach(x => {
                    s.push({
                        stationId: x.id,
                        stopOrder: this.selectedStations.indexOf(x) + 1,
                        stopDuration: x.duration
                    });
                });
                let data = {
                    trainId: this.selectedTrain,
                    routeName: this.routeTitle,
                    weekDayIds: this.checkedDays,
                    stops: s,
                    departureTime: this.depTime
                };
                axiosInstance.post(
                    'api/manager/route', data, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    console.log(data);
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.selectedStations = [];
                        this.selectedTrain = "";
                        this.toggleNotify('Success!', 'New route successfully added!', 'ok');
                    } else {
                        this.toggleNotify('Error!', +res.data.message, 'bad');
                        console.log("BAD: " + res.status);
                    }
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                    this.selectedStation = "";
                    this.selectedStations = [];
                    this.selectedTrain = "";
                    this.routeTitle = "";
                    this.depTime = "";
                    this.checkedDays = [];
                    // eslint-disable-next-line no-console
                }).catch(error => {
                    console.log(error.response.data.message);
                    this.toggleNotify('Error!', error.response.data.message, 'bad');
                });
            },
            toggleNotify(title, text, gr) {
                this.$notify({
                    group: gr,
                    title: title,
                    text: text
                });
            },
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
            this.getStations();
            this.getTrains();
        }
    }
</script>