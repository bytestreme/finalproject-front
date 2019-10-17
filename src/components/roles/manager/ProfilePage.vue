<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <sidebar></sidebar>
        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget green-bg no-padding">
                    <div class="panel panel-default table-responsive">
                        <table class="table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td><a href="" class="white-text templatemo-sort-by">Train Number<span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Departure City<span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Date <span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Time<span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Arrival City <span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Date<span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Time<span class="caret"></span></a></td>
                                <td><a href="" class="white-text templatemo-sort-by">Choose<span class="caret"></span></a></td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1.</td>
                                <td>John</td>
                                <td>Smith</td>
                                <td>@jS</td>
                                <td>js@company.com</td>
                                <td><a href="" class="templatemo-edit-btn">Edit</a></td>
                                <td><a href="" class="templatemo-link">Action</a></td>
                                <td><a href="" class="templatemo-edit-btn">Choose</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Create routes</h2>
                    <div class="row form-group">
                        <div class="col-lg-12 col-md-6 form-group">
                            <label for="train">Choose Train</label>
                            <select :disabled="selectedStations.length>0" class="form-control" id="train" v-model="selectedTrain">
                                <option value="">Select</option>
                                <option :key="train.id"
                                        v-for="train in trains"
                                        :value="train.id">
                                    {{train.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 col-md-6 form-group">
                            <label for="train">Choose Station</label>
                            <select :disabled="selectedTrain === ''"
                                    class="form-control"
                                    id="stations"
                                    v-model="selectedStation">
                                <option value="">Select</option>
                                <option :key="station.id"
                                        v-for="station in stations"
                                        :value="station.id"
                                        v-if="!selectedStations.includes(station.id)">
                                    {{station.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 form-group" style="width: 100%;">
                            <div class="form-group text-right">
                                <button :disabled="selectedStation === ''" @click="addStation" class="templatemo-blue-button">Add Station</button>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="templatemo-content-widget green-bg no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td><a class="white-text templatemo-sort-by">Stations</a></td>
                                        <td><a class="white-text templatemo-sort-by">Action</a></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="station in selectedStations" :key="station.id">
                                        <td>{{station.name}}</td>
                                        <td><a href="" @click.prevent="removeStation(station.id)" class="templatemo-edit-btn">Remove</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 form-group" style="width: 100%;">
                            <div class="form-group text-right">
                                <button @click.prevent="submit" :disabled="selectedStations.length<2" class="templatemo-blue-button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosInstance from "../../../auth-service";
    import headbar from '../../common/Headbar.vue'
    import sidebar from '../../common/Sidebar.vue'
    export default {
        components:{
            headbar,
            sidebar
        },
        data(){
            return {
                stations: "",
                selectedStation: "",
                selectedStations: [],
                selectedTrain: "",
                trains: ""
            }
        },
        methods:{
            removeStation(id){
                this.selectedStations.splice(this.selectedStations.findIndex(x=>x.id === id),1);
            },
            addStation(){
                this.selectedStations.push(this.stations.find(x=>x.id === this.selectedStation));
                this.selectedStation = "";
            },
            getStations() {
                axiosInstance.get(
                    '/api/getStationList', {}
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
                    '/api/getTrainList', {}
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
            submit(){
                let s = [];
                this.selectedStations.forEach(x=>s.push(x.id));
                axiosInstance.post(
                    'api/management/addRoute', {
                        trainId: this.selectedTrain,
                        stations: s
                    },{
                        headers: {
                            'Authorization': "Bearer "+localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.selectedStations = [];
                        this.selectedTrain = "";
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
            this.getStations();
            this.getTrains();
        }
    }
</script>