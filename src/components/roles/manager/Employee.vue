<template>
    <div class="templatemo-content-container">
                <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
                <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>
            
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Employee Info</h2>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">First Name</label>
                            <input v-model="FName" type="text" class="form-control">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">Last Name</label>
                            <input v-model="LName" type="text" class="form-control">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="station">Station</label>
                            <select class="form-control" id="station"
                                    v-model="selectedStation">
                                <option :key="station.id"
                                        v-for="station in stations"
                                        :value="station.id">
                                    {{station.title}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="role">Role</label>
                            <input v-model="role" id="role" class="form-control" type="text" disabled>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">Salary per hour</label>
                            <input v-model="salary" type="number" class="form-control">
                        </div>
                        <div class="col-lg-3 col-md-6 form-group">
                            <label>Working hours</label>
                            <input v-model="startTime" type="time" class="form-control">
                        </div>
                        <div class="col-lg-3 col-md-6 form-group">
                            <label><font color="white">End Time</font></label>
                            <input v-model="endTime" type="time" class="form-control">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 col-md-6 form-group">
                            <label for="train">Choose Weekdays</label>
                            <ul class="list-inline mx-auto justify-content-center">
                                <li class="list-inline-item" v-for="day in dayList">
                                    <div class="margin-right-15 templatemo-inline-block">
                                        <input type="checkbox" name="member" :id="day.id" :value="day.id"
                                               v-model="checkedDays">
                                        <label :for="day.id"
                                               class="font-weight-400"><span></span>{{day.title}}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row form-group">
                            <div class="form-group text-right">
                                <button :disabled="salary === ''" @click="editEmployee"
                                        class="templatemo-blue-button">Edit Employee
                                </button>
                                <div class="divider"/>
                                <router-link to="/manager-employees"
                                            class="templatemo-blue-button">Back</router-link>
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
                FName: "",
                LName: "",
                selectedStation: "",
                selectedRole: "",
                salary: "",
                checkedDays: [],
                stations: "",
                dayList: "",
                roles: "",
                startTime: "",
                endTime: "",
                employee: "",
                role: ""
            }
        },
        methods: {
            getStations() {
                axiosInstance.get(
                    '/api/public/station', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.stations = res.data; //stations is array
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            getEmployee() {
                axiosInstance.get(
                    '/api/manager/employee/getEmployee/?id='+this.$route.params.id,{
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.role = res.data.data.employee.role.title;
                        this.employee = res.data.data;
                        this.FName = res.data.data.employee.fName;
                        this.LName = res.data.data.employee.lName;
                        this.selectedStation = res.data.data.employee.stations.id;
                        this.selectedRole = res.data.data.employee.role.id;
                        this.salary = res.data.data.employee.salary;
                        this.startTime = res.data.data.startTime.substring(0,5);
                        this.endTime = res.data.data.endTime.substring(0,5);
                        this.checkedDays = res.data.data.weekDays.map(x=>x.id);
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            getRoles() {
                axiosInstance.get(
                    '/api/manager/employee/getRoles', {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.roles = res.data;
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            editEmployee() {
                // let data = {};
                // if (this.checkedDays !== this.employee.dayIds) {
                //     data.dayIds = this.checkedDays;
                // }
                // if (this.FName !== this.employee.fName) {
                //     data.fName = this.FName;
                // }
                // if (this.LName !== this.employee.lName) {
                //     data.lName = this.LName;
                // }
                // if (this.salary !== this.employee.salary) {
                //     data.salary = this.salary;
                // }
                // if (this.startTime !== ("0" + this.employee.startTime.hour).slice(-2) + ":" + ("0" + this.employee.startTime.minute).slice(-2)) {
                //     let start = {hour: parseInt(this.startTime.substring(0,2)),
                //                 minute: parseInt(this.startTime.substring(3))};
                //     data.startTime = start;
                // }
                // if (this.endTime !== ("0" + this.employee.endTime.hour).slice(-2) + ":" + ("0" + this.employee.endTime.minute).slice(-2)) {
                //     let end = {hour: parseInt(this.endTime.substring(0,2)),
                //                 minute: parseInt(this.endTime.substring(3))};
                //     data.endTime = end;
                // }
                // if(Object.entries(data).length === 0 && data.constructor === Object) {
                //     this.toggleNotify('Error!', 'Nothing to change!', 'bad')
                //     return;
                // }
                let start = {hour: parseInt(this.startTime.substring(0,2)),
                    minute: parseInt(this.startTime.slice(-2))}
                let end = {hour: parseInt(this.endTime.substring(0,2)),
                    minute: parseInt(this.endTime.slice(-2))}
                let data = {
                    fName: this.FName,
                    lName: this.LName,
                    weekDays: this.checkedDays,
                    salary: parseInt(this.salary),
                    startTime: start,
                    endTime: end,
                    employeeId: this.$route.params.id
                };
                axiosInstance.post(
                    '/api/manager/employee/changeEmployee', data, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    console.log(data);
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.toggleNotify('Success!', 'Employee info successfully edited!', 'ok');
                    } else {
                        this.toggleNotify('Error!', +res.data.message, 'bad');
                        console.log("BAD: " + res.status);
                    }
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            toggleNotify(title, text, gr) {
                this.$notify({
                    group: gr,
                    title: title,
                    text: text
                });
            },
            getWeekDays() {
                axiosInstance.get(
                    '/api/public/weekday', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        console.log(res.data);
                        this.dayList = res.data; //stations is array
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("BAD: " + res.status);
                        this.toggleNotify("Error!", res.status, 'bad');
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
        },
        created() {
            this.getWeekDays();
            this.getStations();
            this.getEmployee();
            this.getRoles();
        }
    }
</script>