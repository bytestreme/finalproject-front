<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>
        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Advisories</h2>
                    <p>Enter text to publish news.</p>
                    <form class="templatemo-login-form" method="post" enctype="multipart/form-data">
                        <div class="row col-lg-12 col-md-6 form-group">
                            <label for="textarea-auto-height">Text</label>
                            <textarea
                                    class="form-control"
                                    id="textarea-auto-height"
                                    v-model="text"
                                    :state="text.length >= 50"
                                    placeholder="Enter something..."
                                    rows="5"
                            ></textarea>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="startDate">Start Date</label>
                                <input id="startDate" v-model="startDate" type="date" name="Departure" class="form-control">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="endDate">End Date</label>
                                <input id="endDate" v-model="endDate" type="date" name="Departure" class="form-control">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-12 col-md-6 form-group">
                                <label for="routes">Choose route</label>
                                <select class="form-control" id="routes" v-model="routeId">
                                    <option :key="route.routeId"
                                            v-for="route in routes" :value="route.routeId">{{route.title}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group text-right">
                            <button :disabled="disabled" @click.prevent="submit" type="submit" class="templatemo-blue-button">Send</button>
                            <button @click.prevent="reset" type="reset" class="templatemo-white-button">Reset</button>
                        </div>
                    </form>
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
                text: '',
                title: '',
                trains: "",
                startDate:'',
                endDate:"",
                routeId: "",
                routes: [],
            }
        },
        computed: {
            disabled(){
                return !this.startDate || !this.endDate || !this.routeId || !this.text
            }
        },
        methods: {
            submit() {
                let sD = {
                    year: parseInt(this.startDate.substr(0, 4)),
                    month: parseInt(this.startDate.substr(5, 2)),
                    day: parseInt(this.startDate.substr(8, 2)),
                    hour: 0,
                    minute: 0
                };
                let eD = {
                    year: parseInt(this.endDate.substr(0, 4)),
                    month: parseInt(this.endDate.substr(5, 2)),
                    day: parseInt(this.endDate.substr(8, 2)),
                    hour: 0,
                    minute: 0
                };
                axiosInstance.post(
                    'api/manager/advisory/addAdvisory', {
                        start: sD,
                        end: eD,
                        text: this.text,
                        routeId: parseInt(this.routeId)
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.reset();
                        this.toggleNotify("Success!", "Advisory created successfully", 'ok');
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            getRoutes(){
                this.routes = [];
                axiosInstance.get(
                    'api/public/getRoutes'
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.routes = res.data; //stations is array
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
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
            reset() {
                this.text = '';
                this.routeId = '';
                this.startDate = '';
                this.endDate = '';
            }
        },
        created() {
            this.getRoutes();
        }
    }
</script>