<template>
    <!-- Left column -->
    <div class="templatemo-flex-row">
        <sidebar></sidebar>
        <!-- Main content -->
        <div class="templatemo-content col-1 light-gray-bg">
            <headbar></headbar>
            <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Advisories</h2>
                    <p>Enter text to publish news.</p>
                    <form action="index.html" class="templatemo-login-form" method="post" enctype="multipart/form-data">
                        <div class="col-lg-12 col-md-6 form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" v-model="title" placeholder="Title">
                        </div>  
                        <div class="col-lg-12 col-md-6 form-group">
                            <b-form-textarea
                                id="textarea-auto-height"
                                v-model="text"
                                :state="text.length >= 50"
                                placeholder="Enter something..."
                                rows="5"
                            ></b-form-textarea>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-12 form-group">
                                <label class="control-label templatemo-block">Send Option</label>
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="radio" name="radio" id="r4" value="">
                                    <label for="r4" class="font-weight-400"><span></span>To all</label>
                                </div>
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="radio" name="radio" id="r5" value="" checked>
                                    <label for="r5" class="font-weight-400"><span></span>To employees</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group text-right">
                            <button @click.prevent="submit" type="submit" class="templatemo-blue-button">Send</button>
                            <button @click.prevent="reset" type="reset" class="templatemo-white-button">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headbar from '../../common/Headbar.vue'
    import sidebar from '../../common/Sidebar.vue'
    export default {
        components:{
            headbar,
            sidebar
        },
        data() {
            return {
                text: '',
                title: ''
            }
        },
        methods: {
            submit() {
                let data = {
                    title: this.title,
                    text: this.text,
                };
                axiosInstance.post(
                    '/api/public/news', data, {
                        headers: {
                            'Publisher': "Bearer " + localStorage.getItem("token")
                        }
                    }
                ).then(res => {
                    console.log(data);
                    if (res.status === 200) {
                        // eslint-disable-next-line no-console
                        console.log("OK: " + res.data);
                        this.toggleNotify('Success!', 'New route successfully added!');
                    } else {
                        this.toggleNotify('Error!', +res.data.message);
                        console.log("BAD: " + res.status);
                    }
                    this.title = '';
                    this.text = '';
                    // eslint-disable-next-line no-console
                }).catch(error => {
                    console.log(error.response.data.message);
                    this.toggleNotify('Error!', error.response.data.message);
                });
            },
            toggleNotify(title, text) {
                this.$notify({
                    group: 'foo',
                    title: title,
                    text: text
                });
            },
            reset() {
                this.text = '';
            }
        }
    }
</script>