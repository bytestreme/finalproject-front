<template>
    <div class="templatemo-content-container">
                <div class="templatemo-content-widget white-bg">
                    <h2 class="margin-bottom-10">Preferences</h2>
                    <p>Here goes another form and form controls.</p>
                    <form action="index.html" class="templatemo-login-form" method="post" enctype="multipart/form-data">
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputFirstName">First Name</label>
                                <input type="text" class="form-control" id="inputFirstName" placeholder="John">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputLastName">Last Name</label>
                                <input type="text" class="form-control" id="inputLastName" placeholder="Smith">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputId">National ID/Passport</label>
                                <input type="text" class="form-control" id="inputId">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputEmail">Email</label>
                                <input type="city" class="form-control" id="inputEmail" placeholder="admin@company.com">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputDep">Departure City</label>
                                <input type="city" class="form-control" id="inputDep" placeholder="Astana">
                            </div>
                            <div class="col-lg-6 col-md-6 form-group">
                                <label for="inputAriv">Arival City</label>
                                <input type="city" class="form-control" id="inputAriv" placeholder="Almaty">
                            </div>
                        </div>
                        <div class="row form-group">



                        </div>
                        <!-- <div class="row form-group">
                          <div class="col-lg-12 has-success form-group">
                              <label class="control-label" for="inputWithSuccess">Input with success</label>
                              <input type="text" class="form-control" id="inputWithSuccess">
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-12 has-warning form-group">
                              <label class="control-label" for="inputWithWarning">Input with warning</label>
                              <input type="text" class="form-control" id="inputWithWarning">
                          </div>
                        </div>
                        <div class="row form-group">
                          <div class="col-lg-12 has-error form-group">
                              <label class="control-label" for="inputWithError">Input with error</label>
                              <input type="text" class="form-control" id="inputWithError">
                          </div>
                        </div> -->
                        <div class="row form-group">
                            <div class="col-lg-6 col-md-6 form-group">
                                <div>
                                    <label class="control-label templatemo-block">Email Option</label>
                                    <div class="templatemo-block margin-bottom-5">
                                        <input type="radio" name="emailOptions" id="r1" value="html" checked>
                                        <label for="r1" class="font-weight-400"><span></span>HTML Format</label>
                                    </div>
                                    <div class="templatemo-block margin-bottom-5">
                                        <input type="radio" name="emailOptions" id="r2" value="plain">
                                        <label for="r2" class="font-weight-400"><span></span>Plain Text</label>
                                    </div>
                                    <div class="templatemo-block margin-bottom-5">
                                        <input type="radio" name="emailOptions" id="r3" value="rich">
                                        <label for="r3" class="font-weight-400"><span></span>Rich Text</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-lg-12 form-group">
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="checkbox" name="server" id="c3" value="" checked>
                                    <label for="c3" class="font-weight-400"><span></span></label>
                                </div>
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="checkbox" name="member" id="c4" value="">
                                    <label for="c4" class="font-weight-400"><span></span>Member Status</label>
                                </div>
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="checkbox" name="expired" id="c5" value="">
                                    <label for="c5" class="font-weight-400"><span></span>Expired Members</label>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-lg-12 form-group">
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="radio" name="radio" id="r4" value="">
                                    <label for="r4" class="font-weight-400"><span></span>Talgo</label>
                                </div>
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="radio" name="radio" id="r5" value="" checked>
                                    <label for="r5" class="font-weight-400"><span></span>Couple</label>
                                </div>
                                <div class="margin-right-15 templatemo-inline-block">
                                    <input type="radio" name="radio" id="r6" value="">
                                    <label for="r6" class="font-weight-400"><span></span>XZ</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group text-right">
                            <button type="submit" class="templatemo-blue-button">Update</button>
                            <button type="reset" class="templatemo-white-button">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
</template>

<script>
    export default {

    }
</script>