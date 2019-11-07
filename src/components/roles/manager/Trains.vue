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
                                    <td style="width:10%"><a class="white-text templatemo-sort-by">No</a></td>
                                    <td style="width:35%"><a class="white-text templatemo-sort-by">Train</a></td>
                                    <td style="width:35%"><a class="white-text templatemo-sort-by">Remove</a></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(train, train_index) in trains" :key="train.id">
                                    <td>{{train_index + 1}}</td>
                                    <td>{{train.title}}</td>
                                    <td><a href="" @click.prevent="removeTrain(train.id)"
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
                trains: ""
            }
        },
        methods: {
            getTrains() {
                axiosInstance.get(
                    'api/public/train', {}
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
            removeTrain(id) {
                axiosInstance.post(
                    'api/manager/train', {
                        trainId: id
                    }
                ).then(
                    this.getTrains()
                );
            },
            toggleNotify(title, text) {
                this.$notify({
                    group: 'foo',
                    title: title,
                    text: text
                });
            },
        },
        created() {
            this.getTrains();
        }
    }
</script>