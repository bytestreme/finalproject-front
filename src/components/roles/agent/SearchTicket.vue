<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Search Ticket</h2>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Ticket number</label>
                            <input v-model="selectedTrain" type="text" class="form-control" placeholder="000001">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 form-group">
                            <div class="form-group text-right">
                                <button :disabled="selectedSeatnum === ''" @click="addWagon"
                                        class="templatemo-blue-button">Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 class="margin-bottom-10">Ticket information</h2>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>First Name</label>
                            <input type="text" class="form-control" placeholder="Mark">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Last Name</label>
                            <input type="text" class="form-control" placeholder="Sterling">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>National ID</label>
                            <input type="text" class="form-control" placeholder="0000001">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Phone</label>
                            <input type="text" class="form-control" placeholder="+7(776)224-07-29">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>E-mail</label>
                            <input type="text" class="form-control" placeholder="mark.sterling@nu.edu.kz">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Date</label>
                            <input disabled type="text" class="form-control" placeholder="01/01/2020">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Departure Station</label>
                            <input disabled type="text" class="form-control" placeholder="Almaty">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Arrival Station</label>
                            <input disabled type="text" class="form-control" placeholder="Astana">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Wagon number</label>
                            <input disabled type="text" class="form-control" placeholder="4">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Seat number</label>
                            <input disabled type="text" class="form-control" placeholder="20">
                        </div>

                        <div class="form-group text-right">
                            <button @click.prevent="Edit" type="submit" class="templatemo-white-button">Edit</button>
                            <button @click.prevent="deleteT" type="delete" class="templatemo-blue-button">Delete</button>
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
                selectedTrain: "",
                selectedWagon: "",
                selectedWagons: [],
                wagonClasses: [],//"Berth","Compartment","Luxe"
                seatnum: 0,
                selectedSeatnum: "",
                seatNums: []//[16, 18, 20], [10, 12, 14], [6, 8]
            }
        },
        methods: {

        },
        created() {
        }
    }
</script>