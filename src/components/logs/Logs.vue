<template>
    <div class="templatemo-content-container">
        <div class="templatemo-content-widget  white-bg">
            <h2 v-if="$store.getters.role === 'ADMIN'" class="margin-bottom-10">Logs management</h2>
            <div  class="row form-group">
                <div class="col-lg-6 col-md-6 form-group text-right">
                    <button style="width: 100%" @click="logSwitch" class="templatemo-blue-button">{{logStatusAction}}</button>
                </div>
                <div class="col-lg-6 col-md-6 form-group text-right">
                    <button style="width: 100%" @click="logType" class="templatemo-blue-button">{{logTypeAction}}</button>
                </div>
            </div>
            <h2 class="margin-bottom-10">Logs</h2>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget no-padding">
                    <div class="panel panel-default table-responsive">
                        <table class="table table-striped table-bordered templatemo-user-table">
                            <thead>
                            <tr>
                                <td>Description</td>
                                <td>Event</td>
                                <td>Date</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr :key="log.id" v-for="log in logs">
                                <td>{{log.description}}</td>
                                <td>{{log.event}}</td>
                                <td>{{log.time[2]}}/{{log.time[1]}}/{{log.time[0]}} {{log.time[3]}}:{{log.time[4]}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosInstance from "../../axiosInstance";
    export default {
        data(){
            return{
                logs: [],
                status: "",
                type: ""
            }
        },
        computed:{
            logTypeAction(){
                return this.type === "DETAILED" ? "Less Detailed List" : "More Detailed List"
            },
            logStatusAction(){
                return this.status ? "Turn off logs" : "Turn on logs"
            }
        },
        methods:{
            //Logs on or off
            logSwitch(){
                axiosInstance.post('/api/manager/logs/changeStatus', {
                        status: !this.status
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }).then(res => {
                    // eslint-disable-next-line no-console
                    console.log("OK: " + res.data);//true or false
                    this.getStatus();
                    this.getLogs();
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                });
            },
            //Logs detailed or not change
            logType(){
                axiosInstance.post('/api/manager/logs/changeType',
                    {
                        type: this.type === "BASIC" ? "DETAILED" : "BASIC"
                    },
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token"),
                        },
                    }).then(res => {
                    // eslint-disable-next-line no-console
                    console.log("OK: " + res.data);
                    // this.getType();
                    this.getLogs();
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                });
            },
            getLogs(){
                this.logs = [];
                axiosInstance.get(
                    'api/manager/logs/getLogs',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.logs = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            getStatus(){
                axiosInstance.get(
                    'api/manager/logs/getStatus',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.status = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            getType(){
                axiosInstance.get(
                    'api/manager/logs/getType',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.type = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            }
        },
        created() {
            this.getStatus();
            this.getLogs();
            this.getType();
        }
    }
</script>