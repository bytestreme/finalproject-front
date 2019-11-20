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
                            <select :disabled="FName === '' || LName === ''" class="form-control" id="station"
                                    v-model="selectedStation">
                                <option value="">Select</option>
                                <option :key="station.id"
                                        v-for="station in stations"
                                        :value="station.id">
                                    {{station.title}}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="role">Choose Role</label>
                            <select :disabled="FName === '' || LName === ''" class="form-control" id="role"
                                    v-model="selectedRole">
                                <option value="">Select</option>
                                <option :key="role.id"
                                        v-for="role in roles"
                                        :value="role.id">
                                    {{role.title}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="train">Salary per hour</label>
                            <input :disabled="FName === '' || LName === ''" 
                                    v-model="salary" type="number" class="form-control"
                                    placeholder="0000">
                        </div>
                        <div class="col-lg-3 col-md-6 form-group">
                            <label>Working hours</label>
                            <input :disabled="FName === '' || LName === ''" 
                                    v-model="startTime" type="time" class="form-control"
                                    placeholder="000000">
                        </div>
                        <div class="col-lg-3 col-md-6 form-group">
                            <label><font color="white">End Time</font></label>
                            <input :disabled="FName === '' || LName === ''" 
                                    v-model="endTime" type="time" class="form-control"
                                    placeholder="000000">
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
                                <button :disabled="salary === ''" @click="addEmployee"
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
                LName:"",
                selectedStation: "",
                selectedRole: "",
                salary: "",
                checkedDays: [],
                stations: "",
                employees: [{id:0, FName: "A", LName: "B", salary: 50000, weekDayIds: [20], stationId: 5, roleId: 1}],
                dayList: "",
                roles: "",
                weekDayIds: [],
                employee: {id:0, FName: "A", LName: "B", salary: 50000, weekDayIds: [20], stationId: 5, roleId: 1}
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
                        this.stations = res.data;
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
            getEmployees() {
                axiosInstance.get(
                    '/api/public/train', {}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.employees = res.data;
                        this.FName = this.employee.fName;
                        this.LName = this.employee.lName;
                        
                        console.log(res.data);
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
            addEmployee() {
                if (this.checkedDays.length === 0) {
                    this.toggleNotify('Error!', 'Weekdays not selected!', 'bad');
                    return;
                }
                if (this.FName.length === 0) {
                    this.toggleNotify('Error!', 'First Name cannot be empty!', 'bad');
                    return;
                }
                if (this.LName.length === 0) {
                    this.toggleNotify('Error!', 'Last Name cannot be empty!', 'bad');
                    return;
                }
                if (this.salary.length === 0) {
                    this.toggleNotify('Error!', 'Salary not specified!', 'bad');
                    return;
                }
                let data = {
                    FName: this.FName,
                    LName: this.LName,
                    weekDayIds: this.checkedDays,
                    stationId: this.selectedStation,
                    salary: this.s,
                    roleId: this.selectedRole
                };
                axiosInstance.post(
                    'api/manager/employees', data, {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    console.log(data);
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.toggleNotify('Success!', 'New employee successfully added!', 'ok');
                    } else {
                        this.toggleNotify('Error!', +res.data.message, 'bad');
                        console.log("BAD: " + res.status);
                    }
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                    this.selectedStation = "";
                    this.checkedDays = [];
                    this.FName = "";
                    this.LName = "";
                    this.salary = "";
                    this.selectedRole = "";
                    this.getEmployees();
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
            this.getEmployees();
        }
    }
</script>