<template>
    <div class="templatemo-content-container">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad" animation-type="velocity" group="bad"/>

        <div class="templatemo-content-widget white-bg">
            <h2 class="margin-bottom-10">Payments</h2>
            <br>
            <div class="col-lg-12 col-md-6 form-group text-right">
                <button @click.prevent="payNow" style="width: 100%" class="templatemo-blue-button">Pay now</button>
            </div>
            <br>
            <div class="templatemo-content-widget no-padding">
                <div class="panel panel-default table-responsive">

                    <table class="table table-striped table-bordered templatemo-user-table">
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Amount</td>
                            <td>Currency</td>
                            <td>Role</td>
                            <td>Date</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="pay.id" v-for="pay in payments">
                            <td>{{pay.id}}</td>
                            <td>{{pay.fName}}</td>
                            <td>{{pay.lName}}</td>
                            <td>{{pay.amount}}</td>
                            <td>{{pay.currency}}</td>
                            <td>{{pay.roleTitle}}</td>
                            <td>{{pay.date}}</td>
                        </tr>
                        </tbody>
                    </table>
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
                payments: []
            }
        },
        methods: {
            getPayments() {
                axiosInstance.get(
                    'api/manager/payment',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.payments = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.response, 'bad');
                });
            },
            payNow() {
                axiosInstance.get(
                    'api/manager/payment/do',
                    {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.toggleNotify("Success!", res.data.data, 'ok');
                        this.getPayments();
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    this.toggleNotify(error.name, error.response, 'bad');
                });
            },
            toggleNotify(title, text, gr) {
                this.$notify({
                    group: gr,
                    title: title,
                    text: text
                });
            },

        },
        created() {
            this.getPayments();
        }
    }
</script>