<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <div v-if="train" class="col-lg-12 col-md-6 form-group">
                        <h2 class="margin-bottom-10">Train: {{train.title}}</h2>
                    </div>
                    <!--
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="selectedWagon" class="col-lg-6 col-md-6 form-group">Choose Wagon Type</label>
                            <select :disabled="selectedTrain === ''" class="form-control" id="train"
                                    v-model="selectedWagon">
                                <option value="">Select</option>
                                <option :key="cl"
                                        v-for="cl in wagonClasses"
                                        :value="wagonClasses.indexOf(cl)">
                                    {{cl}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train" class="col-lg-6 col-md-6 form-group">Choose SeatNum</label>
                            <select style="display: inline" :disabled="selectedWagon === ''"
                                    class="form-control"
                                    id="stations"
                                    v-model="selectedSeatnum">
                                <option value="">Select</option>
                                <option :key="seatnum"
                                        v-for="seatnum in seatNums[selectedWagon]"
                                        :value="seatnum">
                                    {{seatnum}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 form-group">
                            <div class="form-group text-right">
                                <button :disabled="selectedSeatnum === ''" @click="addWagon"
                                        class="templatemo-blue-button">Add Wagon
                                </button>
                            </div>
                        </div>
                    </div> -->
                    <div class="row form-group">
                        <div class="templatemo-content-widget green-bg no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">No</a></td>
                                        <td style="width:50%"><a class="white-text templatemo-sort-by">Wagon class</a>
                                        </td>
                                        <td style="width:30%"><a class="white-text templatemo-sort-by">No of seats</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Remove</a>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(wagon, wagon_index) in wagons" :key="wagon.id">
                                        <td>{{wagon_index + 1}}</td>
                                        <td>{{wagon.wagonClass.title}}</td>
                                        <td>{{wagon.numSeats}}</td>
                                        <td><a href="" @click.prevent="removeWagon(wagon.id)"
                                               class="templatemo-del-btn">Remove</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 form-group" style="width: 100%;">
                            <div class="form-group text-right">
                                <router-link to="/manager-all-trains"
                                            class="templatemo-blue-button">Back</router-link>
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

    export default {
        data() {
            return {
                train: "",
                wagons: ""
            }
        },
        methods: {
            getWagons() {
                axiosInstance.get('/api/public/train/' + this.$route.params.id)
                    .then(res => {
                        this.train = res.data;
                        this.wagons = this.train.wagonList;
                    })
                    .catch(error => {
                        console.log(error);
                        this.toggleNotify(error.name, error.message, 'bad');
                    })
            },
            toggleNotify(title, text, group) {
                this.$notify({
                    group: group,
                    title: title,
                    text: text
                });
            },
        },
        created() {
            this.getWagons();
        }
    }
</script>