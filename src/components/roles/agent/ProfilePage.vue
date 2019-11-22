<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad" animation-type="velocity" group="bad"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Search Ticket</h2>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="selectedTrain">Ticket number</label>
                            <input id="selectedTrain" v-model="ticketNumber" type="text" class="form-control"
                                   placeholder="000001">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 form-group">
                            <div class="form-group text-right">
                                <button :disabled="ticketNumber === ''" @click="search"
                                        class="templatemo-blue-button">Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="ticketDetails">
                        <h2 class="margin-bottom-10">Ticket information</h2>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="fname">First Name</label>
                                <input v-model="ticketDetails.fname" id="fname" type="text" class="form-control"
                                       placeholder="John">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="lname">Last Name</label>
                                <input v-model="ticketDetails.lname" id="lname" type="text" class="form-control"
                                       placeholder="Doe">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="natID">National ID</label>
                                <input v-model="ticketDetails.natId" id="natID" type="text" class="form-control"
                                       placeholder="0000001">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="phone">Phone</label>
                                <input v-model="ticketDetails.phone" id="phone" v-mask="'#(###)-###-##-##'" type="text"
                                       class="form-control" placeholder="+7(777)777-77-77">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="email">E-mail</label>
                                <input id="email" v-model="ticketDetails.email" type="text" class="form-control"
                                       placeholder="aaaaa@nu.edu.kz">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="wclass">Wagon class</label>
                                <input id="wclass" disabled type="text" v-model="ticketDetails.wagon.wagonClass.title"
                                       class="form-control" placeholder="Almaty">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="date">Departure date</label>
                                <input id="date" disabled v-model="ticketDetails.depDate" type="text"
                                       class="form-control" placeholder="01/01/2020">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="arrdate">Arrival date</label>
                                <input id="arrdate" disabled v-model="ticketDetails.arrDate" type="text"
                                       class="form-control" placeholder="01/01/2020">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="dstation">Departure Station</label>
                                <input id="dstation" disabled type="text" v-model="ticketDetails.depStation.title"
                                       class="form-control" placeholder="Almaty">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="astation">Arrival Station</label>
                                <input id="astation" disabled type="text" v-model="ticketDetails.arrStation.title"
                                       class="form-control" placeholder="Astana">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="wNum">Wagon ID</label>
                                <input id="wNum" disabled type="text" v-model="ticketDetails.wagon.id"
                                       class="form-control" placeholder="4">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="sNum">Seat number</label>
                                <input id="sNum" disabled type="text" v-model="ticketDetails.seatNum"
                                       class="form-control" placeholder="20">
                            </div>

                            <div class="form-group text-right">
                                <button @click.prevent="edit" type="submit" class="templatemo-white-button">Edit
                                </button>
                                <button @click.prevent="deleteT" class="templatemo-blue-button">Delete</button>
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
                ticketNumber: '',
                ticketDetails: ''
            }
        },
        methods: {
            toggleNotify(title, text, gr) {
                this.$notify({
                    group: gr,
                    title: title,
                    text: text
                });
            },
            search() {
                this.ticketDetails = "";
                axiosInstance.get('/api/agent/ticket/findTicketById', {
                    params: {
                        id: this.ticketNumber
                    },
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                }).then(res => {
                    this.ticketDetails = res.data.data;
                })
                    .catch(error => {
                        console.log(error);
                        this.toggleNotify(error.name, error.response.data.data, 'bad');
                    })
            },
            deleteT() {
                axiosInstance.delete('/api/agent/ticket/deleteTicket/' + parseInt(this.ticketNumber),
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }).then(res => {
                    console.log(res.data);
                    this.ticketDetails = "";
                    this.toggleNotify('Success!', 'Ticket deleted', 'ok');
                }).catch(error => {
                    console.log(error.data);
                    this.toggleNotify(error.name, error.response.data.data, 'bad');
                })
            },
            edit() {
                axiosInstance.post('/api/agent/ticket/alterTicket',
                    {
                        id: parseInt(this.ticketDetails.id),
                        fName: this.ticketDetails.fname,
                        lName: this.ticketDetails.lname,
                        natId: this.ticketDetails.natId,
                        email: this.ticketDetails.email,
                        phone: this.ticketDetails.phone
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    this.ticketDetails = res.data;
                    this.toggleNotify('Success!', 'Edit was successful', 'ok');
                    console.log(res.data);
                }).catch(error => {
                    console.log(error.data);
                    this.toggleNotify(error.name, error.response.data.data, 'bad');
                })
            }
        }

    }
</script>