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
                            <select disabled="disabled" class="form-control" id="station"
                                    v-model="selectedStation">
                                <option :key="station.id"
                                        v-for="station in stations"
                                        v-if="employee.stationId === station.id"
                                        :value="station.id">
                                    {{station.title}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="role">Choose Role</label>
                            <select class="form-control" id="role"
                                    v-model="selectedRole">
                                <option :key="role.id"
                                        v-for="role in roles"
                                        v-if="employee.roleId === role.id"
                                        :value="role.id">
                                    {{role.title}}
                                </option>
                                <option :key="role.id"
                                        v-for="role in roles"
                                        v-if="employee.roleId !== role.id"
                                        :value="role.id">
                                    {{role.title}}
                                </option>
                            </select>
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
                employee: ""
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
                    '/api/public/employee/' + this.$route.params.id
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.employee = res.data;
                        this.FName = this.employee.fName;
                        this.LName = this.employee.lName;
                        this.selectedStation = this.employee.stationId;
                        this.selectedRole = this.employee.roleId;
                        this.salary = this.employee.salary;
                        this.startTime = ("0" + this.employee.startTime.hour).slice(-2) + ":" + ("0" + this.employee.startTime.minute).slice(-2);
                        this.endTime = ("0" + this.employee.endTime.hour).slice(-2) + ":" + ("0" + this.employee.endTime.minute).slice(-2);
                        this.checkedDays = this.employee.dayIds;
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
                    '/api/public/role', {}
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
                    console.log(error)
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            editEmployee() {
                let data = {};
                if (this.checkedDays !== this.employee.dayIds) {
                    data.dayIds = this.checkedDays;
                }
                if (this.FName !== this.employee.fName) {
                    data.fName = this.FName;
                }
                if (this.LName !== this.employee.lName) {
                    data.lName = this.LName;
                }
                if (this.salary !== this.employee.salary) {
                    data.salary = this.salary;
                }
                if (this.startTime !== ("0" + this.employee.startTime.hour).slice(-2) + ":" + ("0" + this.employee.startTime.minute).slice(-2)) {
                    let start = {hour: parseInt(this.startTime.substring(0,2)),
                                minute: parseInt(this.startTime.substring(3))};
                    data.startTime = start;
                }
                if (this.endTime !== ("0" + this.employee.endTime.hour).slice(-2) + ":" + ("0" + this.employee.endTime.minute).slice(-2)) {
                    let end = {hour: parseInt(this.endTime.substring(0,2)),
                                minute: parseInt(this.endTime.substring(3))};
                    data.endTime = end;
                }
                if(Object.entries(data).length === 0 && data.constructor === Object) {
                    this.toggleNotify('Error!', 'Nothing to change!', 'bad')
                    return;
                }
                axiosInstance.post(
                    'api/manager/employee', data, {
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