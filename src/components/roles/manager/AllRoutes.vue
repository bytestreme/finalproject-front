<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <notifications classes="ntf-success" animation-type="velocity" group="foo"/>

        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <div class="templatemo-content-widget green-bg no-padding">
                        <div class="panel panel-default table-responsive">
                            <table class="table table-striped table-bordered templatemo-user-table">
                                <thead>
                                <tr>
                                    <td style="width:5%"><a class="white-text templatemo-sort-by">No</a></td>
                                    <td style="width:15%"><a class="white-text templatemo-sort-by">Name</a>
                                    </td>
                                    <td style="width:15%"><a class="white-text templatemo-sort-by">Train</a>
                                    </td>
                                    <td style="width:25%"><a class="white-text templatemo-sort-by">Start Station</a>
                                    </td>
                                    <td style="width:25%"><a class="white-text templatemo-sort-by">End Station</a>
                                    </td>
                                    <td style="width:5%"><a class="white-text templatemo-sort-by">Info</a>
                                    </td>
                                    <td style="width:10%"><a class="white-text templatemo-sort-by">Action</a>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(route, route_index) in routes" :key="route.routeName">
                                    <td>{{route_index + 1}}</td>
                                    <td>{{route.routeName}}</td>
                                    <td>{{route.trainId}}</td>
                                    <td>{{route.stops[0].stationId}}</td>
                                    <td>{{route.stops[1].stationId}}</td>
                                    <td><a href="" @click.prevent="infoRoute(route.routeName)"
                                           class="templatemo-del-btn">Info</a></td>
                                    <td><a href="" @click.prevent="removeRoute(route.routeName)"
                                           class="templatemo-del-btn">Remove</a></td>
                                </tr>
                                </tbody>
                            </table>
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
                routes: ""
            }
        },
        methods: {
            getRoutes() {
                axiosInstance.get(
                    '/api/public/route', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.routes = res.data; //stations is array
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
            toggleNotify(title, text) {
                this.$notify({
                    group: 'foo',
                    title: title,
                    text: text
                });
            }
        },
        created() {
            this.getRoutes();
        }
    }
</script>