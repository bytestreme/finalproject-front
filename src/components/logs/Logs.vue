<template>
    <div class="templatemo-content-container">
        <div class="templatemo-content-widget  white-bg">
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
                                <td>{{log.time}}</td>
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
                logs: []
            }
        },
        methods:{
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
                        this.logs = res.data; //stations is array
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
            this.getLogs();
        }
    }
</script>