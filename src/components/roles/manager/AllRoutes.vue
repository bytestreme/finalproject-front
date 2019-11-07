<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <sidebar></sidebar>
        <notifications classes="ntf-success" animation-type="velocity" group="foo"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
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
                        this.toggleNotify('Success!', 'New route successfully added!');
                    } else {
                        this.toggleNotify('Error!', +res.data.message);
                        console.log("BAD: " + res.status);
                    }
                    this.selectedStation = "";
                    this.selectedStations = [];
                    this.selectedTrain = "";
                    this.routeTitle = "";
                    this.depTime = "";
                    this.checkedDays = [];
                    // eslint-disable-next-line no-console
                }).catch(error => {
                    console.log(error.response.data.message);
                    this.toggleNotify('Error!', error.response.data.message);
                });
            },
            toggleNotify(title, text) {
                this.$notify({
                    group: 'foo',
                    title: title,
                    text: text
                });
            }
        },
        created() {
            this.getStations();
            this.getTrains();
        }
    }
</script>