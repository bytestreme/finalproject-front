<template>
    <div class="templatemo-content-container">
        <notifications classes="ntf-success" animation-type="velocity" group="ok"/>
        <notifications classes="ntf-reg-bad"  animation-type="velocity" group="bad"/>

                <div class="templatemo-content-widget white-bg">
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group text-right">
                            <button @click="createNew = true" style="width: 100%"
                                    :class="createNew ? 'templatemo-white-button' : 'templatemo-blue-button'">Create new employee</button>
                        </div>
                        <div class="col-lg-6 col-md-6 form-group text-right">
                            <button @click="createNew = false; getUsers();" style="width: 100%"
                                    :class="!createNew ? 'templatemo-white-button' : 'templatemo-blue-button'">Create employee from users</button>
                        </div>
                    </div>

                    <div v-if="!createNew && users.length>0" class="panel panel-default templatemo-content-widget white-bg no-padding templatemo-overflow-hidden">
                        <div class="panel-heading templatemo-position-relative">
                            <h2 class="text-uppercase">Choose user</h2>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <td><b>First name</b></td>
                                    <td><b>Last Name</b></td>
                                    <td><b>Username</b></td>
                                    <td><b>Phone</b></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="route-link" :key="user.id" v-for="user in users" @click="chooseUser(user)">
                                    <td>{{user.firstName}}</td>
                                    <td>{{user.lastName}}</td>
                                    <td>{{user.username}}</td>
                                    <td>{{user.phone}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h2 class="margin-bottom-10">Manage Employees</h2>
                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="fn">First Name</label>
                            <input id="fn" v-model="FName" type="text" class="form-control" placeholder="Bill">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="ln">Last Name</label>
                            <input id="ln" v-model="LName" type="text" class="form-control" placeholder="Gates">
                        </div>
                        <div class="col-lg-6 col-md-6 form-group">
                            <label for="station">Choose Station</label>
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
                                <option v-if="createNew" :key="role.id"
                                        v-for="role in roles"
                                        :value="role.id">
                                    {{role.title}}
                                </option>
                                <option v-if="!createNew"
                                        :value="4">
                                    {{roles.find(x=>x.id === 4).title}}
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
                            <label>Choose Weekdays</label>
                            <ul class="list-inline mx-auto justify-content-center">
                                <li class="list-inline-item" v-for="day in dayList">
                                    <div class="margin-right-15 templatemo-inline-block">
                                        <input type="checkbox" name="member" :id="day.id" :value="day.id"
                                               v-model="checkedDays">
                                        <label :for="day.id"
                                               class="font-weight-400"><span></span>
                                            {{day.title}}
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-lg-6 col-md-6 form-group">
                            <label>Starting day</label>
                            <input v-model="startDate" type="date" name="Departure" class="form-control">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-lg-12 form-group">
                            <div class="form-group text-right">
                                <button @click="addEmployee"
                                        class="templatemo-blue-button">Add Employee
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="employees.length!==0" class="row form-group">
                        <div class="templatemo-content-widget green-bg no-padding">
                            <div class="panel panel-default table-responsive">
                                <table class="table table-striped table-bordered templatemo-user-table">
                                    <thead>
                                    <tr>
                                        <td style="width:5%"><a class="white-text templatemo-sort-by">No</a></td>
                                        <td style="width:25%"><a class="white-text templatemo-sort-by">Name</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Station</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Role</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Salary</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Weekdays</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Work hours</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Edit</a>
                                        </td>
                                        <td style="width:10%"><a class="white-text templatemo-sort-by">Remove</a>
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(employee, emp_index) in employees" :key="employee.id">
                                        <td>{{emp_index + 1}}</td>
                                        <td>{{employee.employee.fName + " " + employee.employee.lName}}</td>
                                        <td>{{employee.employee.stations.title}}</td>
                                        <td>{{employee.employee.role.title}}</td>
                                        <td>{{employee.employee.salary}}</td>
                                        <td>{{getDays(employee.weekDays.map(x=>x.title))}}</td>
                                        <td>{{employee.startTime}} - {{employee.endTime}}</td>
                                        <td><a href=""
                                               @click.prevent="$router.push({name: 'manager-employee', params: {id: employee.employee.id}})"
                                               class="templatemo-del-btn">Edit</a></td>
                                        <td><a href="" @click.prevent="removeEmployee(employee.employee.id)"
                                               class="templatemo-del-btn">Remove</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<style scoped>
    .route-link:hover{
        cursor: pointer;
    }
</style>

<script>
    import axiosInstance from "../../../axiosInstance";
    export default {
        data() {
            return {
                chosenUser:"",
                FName: "",
                LName:"",
                selectedStation: "",
                selectedRole: "",
                salary: "",
                checkedDays: [],
                stations: "",
                employees: "",
                dayList: "",
                roles: "",
                startTime: "",
                endTime: "",
                startDate:"",
                users: [],
                userRoles: [],
                createNew: true
            }
        },
        methods: {
            chooseUser(user){
                this.FName = user.firstName;
                this.LName = user.lastName;
                this.chosenUser = user.id;
            },
            getDays(arr) {
                let s = "";
                arr.forEach(x=>s=s+x+", ");
                return s.slice(0,s.length-2);
            },
            removeEmployee(id) {
                axiosInstance.delete('/api/manager/employee/delete/'+id,{
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.getEmployees();
                        this.getUsers();
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
                    console.log(error);
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
            getEmployees() {
                axiosInstance.get(
                    '/api/manager/employee/getEmployees', {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.employees = res.data;
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
            getUsers() {
                axiosInstance.get(
                    '/api/manager/employee/getNotEmployees', {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.users = res.data;
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
            getUserRoles() {
                axiosInstance.get(
                    '/api/manager/employee/getRoles', {
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("token")
                        }}
                ).then(res => {
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.userRoles = res.data;
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
            addEmployee() {
                if (this.FName.length === 0) {
                    this.toggleNotify('Error!', 'First Name cannot be empty!', 'bad');
                    return;
                }
                if (this.LName.length === 0) {
                    this.toggleNotify('Error!', 'Last Name cannot be empty!', 'bad');
                    return;
                }
                if (this.selectedStation.length === 0) {
                    this.toggleNotify('Error!', 'Station not selected!', 'bad');
                    return;
                }
                if (this.selectedRole.length === 0) {
                    this.toggleNotify('Error!', 'Role not specified!', 'bad');
                    return;
                }
                if (this.salary.length === 0) {
                    this.toggleNotify('Error!', 'Salary not specified!', 'bad');
                    return;
                }
                if (this.startTime.length === 0 || this.endTime.length === 0) {
                    this.toggleNotify('Error!', 'Working hours not specified!', 'bad');
                    return;
                }
                if (this.startTime === this.endTime) {
                    this.toggleNotify('Error!', 'Same start time and end time!', 'bad');
                    return;
                }
                if (this.checkedDays.length === 0) {
                    this.toggleNotify('Error!', 'Weekdays not selected!', 'bad');
                    return;
                }
                let started = {
                    year: parseInt(this.startDate.substring(0,4)),
                    month: parseInt(this.startDate.substring(5,7)),
                    day: parseInt(this.startDate.substring(8,10)),
                    hour: 0,
                    minute: 0
                };
                let start = {hour: parseInt(this.startTime.substring(0,2)),
                            minute: parseInt(this.startTime.slice(-2))}
                let end = {hour: parseInt(this.endTime.substring(0,2)),
                            minute: parseInt(this.endTime.slice(-2))}
                let data = {
                    fName: this.FName,
                    lName: this.LName,
                    dayIds: this.checkedDays,
                    stationId: parseInt(this.selectedStation),
                    salary: parseInt(this.salary),
                    roleId: parseInt(this.selectedRole),
                    startTime: start,
                    endTime: end,
                    userId: this.createNew ? -1 : parseInt(this.chosenUser),
                    started: started
                };
                axiosInstance.post(
                    'api/manager/employee/createEmployee', data, {
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
                    this.startTime = "";
                    this.endTime = "";
                    this.getEmployees();
                    this.getUsers();
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
                    console.log(error);
                    this.toggleNotify(error.name, error.message, 'bad');
                });
            },
        },
        created() {
            this.getWeekDays();
            this.getStations();
            this.getEmployees();
            this.getRoles();
            this.getUserRoles();
        }
    }
</script>