<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Create train</h2>
                    <div class="row form-group">
                        <div class="col-lg-12 col-md-6 form-group">
                            <label for="selectedTrain">Train title</label>
                            <input v-model="trainTitle" id="selectedTrain" type="text" class="form-control" placeholder="Train title">
                        </div>
                        <div class="col-lg-12 col-md-6 form-group">
                            <!-- finish loop for choosing wagon-->
                            <label for="selectedWagon" class="form-group">Choose Wagon Type</label>
                            <select :disabled="trainTitle === ''" class="form-control" id="selectedWagon"
                                    v-model="selectedWagon">
                                <option value="">Select</option>
                                <option :key="cl.id"
                                        v-for="cl in wagonClasses"
                                        :value="cl.id">
                                    {{cl.title}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 form-group">
                            <div class="form-group text-right">
                                <button :disabled="!selectedWagon" @click="addWagon(selectedWagon)"
                                        class="templatemo-blue-button">Add Wagon
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedWagons.length!==0" class="row form-group">
                        <div class="templatemo-content-widget green-bg no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td style="width:5%"><a class="white-text templatemo-sort-by">No</a></td>
                                        <td style="width:50%"><a class="white-text templatemo-sort-by">Wagon class</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">No of seats</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Remove</a>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(wagon, wagon_index) in selectedWagons" :key="wagon_index">
                                        <td>{{wagon_index + 1}}</td>
                                        <td>{{wagonClasses.find(x=>x.id === wagon).title}}</td>
                                        <td>{{wagonClasses.find(x=>x.id === wagon).maxSeats}}</td>
                                        <td><a href="" @click.prevent="selectedWagons.splice(wagon_index, 1)"
                                               class="templatemo-del-btn">Remove</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedWagons.length >1" class="row form-group">
                        <div class="col-lg-6 form-group" style="width: 100%;">
                            <div class="form-group text-right">
                                <button @click.prevent="submit" :disabled="selectedWagons.length<2"
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

    export default {
        data() {
            return {
                trainTitle: "",
                selectedWagon: "",
                selectedWagons: [],
                wagonClasses: [],//"Berth","Compartment","Luxe"
            }
        },
        methods: {
            getWagons() {
                this.wagonClasses = [];
                axiosInstance.get(
                    '/api/public/wagonclass', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        for(var i=0; i<res.data.length; i++) {
                            this.wagonClasses = res.data;
                        }
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad')
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            addWagon(id) {
                this.selectedWagons.push(id);
            },
            submit() {
                let data = {
                    title: this.trainTitle,
                    wagonClassIds: this.selectedWagons
                };
                axiosInstance.post(
                    'api/manager/train', data, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    console.log(data);
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.selectedWagons = [];
                        this.toggleNotify('Success!', 'New train successfully added!', 'ok');
                    } else {
                        this.toggleNotify('Error!', res.data.message, 'bad');
                        console.log("BAD: " + res.status);
                    }
                    this.trainTitle = "";
                    this.selectedWagon = "";
                    // eslint-disable-next-line no-console
                }).catch(error => {
                    this.toggleNotify(error.name, error.message, 'bad');
                });
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