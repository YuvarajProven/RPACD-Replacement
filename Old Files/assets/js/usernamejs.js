//--- If username and password was valid then fallowing operations will perform----
// by calling Userpermissions store procedure we will get previlages
$(document).ready(function () {
    var flagType = 'GXP'
    //var flagType = 'Corporate'
    var audit_id;
    var gxp_options = [
        {
            name: "FTO - Bachupally",
            value: "FTO"
        },
        {
            name: "CTO - Bollaram",
            value: "CTO"
        },
        {
            name: "FTO7 & 9 - Cluster",
            value: "fto7_cluster"
        },
        {
            name: "FTO6 & 8 - Cluster",
            value: "baddi_cluster"
        },
        {
            name: "CTO6 & CTOSEZ - Cluster",
            value: "CTO"
        }
    ]

    if (flagType == 'GXP') {
        opt = ''
        for (let i = 0; i < gxp_options.length; i++) {
            const element = gxp_options[i];
            opt += '<option value="' + element.value + '" class="FTO">' + element.name + '</option>'
        }

        $(".extraFields").html('<label class="clusterlabel" for="Plant">Plant</label><select  class="gxp_names_listclass form-control" name="Plant">' + opt + '</select><div class="bar"></div>');

        // $(".extraFields").html('<label class="clusterlabel" for="Plant">Plant</label><select  class="gxp_names_listclass form-control" name="Plant"><option value="FTO" class="FTO">FTO - Bachupally</option><option value="CTO" class="CTO">CTO - Bollaram</option></select><div class="bar"></div>');
    }
    else {
        $(".extraFields").html('');
    }

    $(".usernameclass, .passwordclass").keyup(function (e) {
        if (e.which == 13) {
            $('.submitclass').trigger('click');
        }
    })

    $('.usernameclass, .passwordclass').keypress(function (event) {
        // currentdate = new Date().toLocaleString();
        // username = $('.useridclass').val();
        // password = $('.passwordclass').val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            userlogin();
        }
    });

    $("body").on("click", ".submitclass", function () {
        ["Dashboard.php", "SampleSetList.php", "SampleSetReport.php", "FailureMeasure.php", "ConfigurationSettings.php"];
        userlogin();
    })



    function userlogin() {
        username = $(".usernameclass").val()
        password = $(".passwordclass").val()
        obj = {};
        obj.username = username;
        obj.password = password;
        obj.flag = flagType;
        var url_ = ''
        console.log(flagType);
        if (flagType == 'Corporate') {
            url_ = 'includeRPA/loginldap.php'
            console.log("cluster=");
        }
        else {
            cluster = $(".gxp_names_listclass").val();
            console.log("cluster=");
            console.log(cluster);
            url_ = getUrl(cluster)
        }

        if (obj.username != "" && obj.password != "") {
            $.ajax({
                url: url_,
                data: obj,
                method: 'POST',
                success: function (msg) {
                    try {
                        valid_check = msg;
                        plant = ''
                        check_account(username, valid_check)
                    } catch (e) {
                        obj = {};
                        obj.WebUserID = $('.webuserid').html()
                        obj.Description = "Login error"
                        obj.PageName = "login"
                        console.log(obj);
                        catch_this(obj)
                    }
                }, fail: function (e) {
                    console.log("in failed");
                    obj = {};
                    obj.WebUserID = $('.webuserid').html()
                    obj.Description = "previlages login error"
                    obj.PageName = "login"
                    console.log(obj);
                    catch_this(obj)
                }

            })
        }
        else {
            alert("should not be empty")
        }
    }
    first_flow = false
    function check_account(username, valid_check) {
        resp = ''
        //debugger;
        if (valid_check.indexOf('Corporate') > -1) {
            plant = 'Corporate'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO2') > -1 || valid_check.indexOf('FTO-2') > -1) {
            plant = 'FTO2'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO3') > -1) {
            plant = 'FTO3'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO6') > -1) {
            plant = 'FTO6'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO7') > -1) {
            plant = 'FTO7'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO8') > -1) {
            plant = 'FTO8'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO9') > -1) {
            plant = 'FTO9'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO11') > -1) {
            plant = 'FTO11'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('CTO1') > -1 || valid_check.indexOf('CTO-1') > -1) {
            plant = 'CTO1'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('CTO2') > -1 || valid_check.indexOf('CTO-2') > -1) {
            plant = 'CTO2'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('CTO3') > -1 || valid_check.indexOf('CTO-3') > -1) {
            plant = 'CTO3'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('CTO6') > -1) {
            plant = 'CTO6'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('93SEZ') > -1) {
            plant = 'CTO6'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (flagType == 'GXP' && !first_flow) {
            first_flow = true;
            console.log("here");
            $.ajax({
                url: 'includeRPA/loginldap.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    check_account(username, msg)
                }
            })
        }
        else {
            swal("Invalid username/password");
        }
    }

    function createSession(username, plant, resp) {
        login_obj = {};
        login_obj.name = username;
        login_obj.role = "";

        login_obj.pages = "";
        login_obj.audit_id = "";
        login_obj.plant = plant;
        login_obj.flag = flagType;
        console.log(login_obj);
        $.ajax({
            url: 'includeRPA/session_create.php',
            data: login_obj,
            method: 'POST',
            success: function (redirect) {
                user_obj = {}
                user_obj.name = username;
                user_obj.isSuccess = resp == 'valid' ? 1 : 0
                console.log(user_obj);
                $.ajax({
                    url: 'includeRPA/login_audit.php',
                    data: user_obj,
                    method: 'POST',
                    success: function (check) {
                        try {
                            audit_id = check
                            if (resp == 'valid') {
                                $.ajax({
                                    url: 'includeRPA/Userpermissions.php',
                                    data: user_obj,
                                    method: 'POST',
                                    success: function (msg) {
                                        console.log(msg);
                                        try {
                                            msg = JSON.parse(msg)
                                            isActive = msg[0]['IsActive'];
                                            sessionStorage.setItem("Role", msg[0]['UserRole'])
                                            if (isActive == "1") {
                                                login_obj = {};
                                                login_obj.name = username;
                                                login_obj.role = msg[0]['UserRole'];
                                                arrs = [];
                                                for (var i = 0; i < msg.length; i++) {
                                                    arrs.push(msg[i]['WebPageName']);
                                                }
                                                login_obj.pages = arrs.join(', ');
                                                login_obj.audit_id = audit_id;
                                                login_obj.plant = plant;
                                                login_obj.flag = flagType;
                                                console.log(login_obj);
                                                $.ajax({
                                                    url: 'includeRPA/session_create.php',
                                                    data: login_obj,
                                                    method: 'POST',
                                                    success: function (redirect) {
                                                        window.location.href = 'Dashboard.php'
                                                    }
                                                });
                                            }

                                            else {
                                                alert("Account Deactivated");
                                            }
                                        } catch (e) {
                                            // debugger
                                            obj = {};
                                            obj.WebUserID = $('.webuserid').html()
                                            obj.Description = "Login error"
                                            obj.PageName = "login error"
                                            console.log(obj);
                                            catch_this(obj)
                                            // swal( "User doesn't have permissions to login!!!..");
                                            login_obj = {};
                                            login_obj.name = username;
                                            login_obj.role = 'guest';
                                            arrs =

                                                ["Dashboard.php", "SampleSetList.php", "SampleSetReport.php", "FailureMeasure.php", "ConfigurationSettings.php"];
                                            login_obj.pages = arrs.join(', ');
                                            login_obj.audit_id = audit_id;
                                            login_obj.plant = plant
                                            login_obj.flag = flagType

                                            console.log(login_obj);
                                            $.ajax({
                                                url: 'includeRPA/session_create.php',
                                                data: login_obj,
                                                method: 'POST',
                                                success: function (redirect) {
                                                    window.location.href = 'dashboard.php'
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else if (valid_check == 'locked') {
                                swal("Account has been Locked");
                            }
                            else if (valid_check == '' || valid_check == 'invalid') {
                                //  if (flagType == 'Corporate') {
                                //   swal("Your credentials doesn't exists in 'Corporate AD Account'.");
                                // }
                                // else if(flagType == 'GXP')
                                // {
                                //   swal("Your credentials doesn't exists in 'GXP AD Account'.");
                                // }
                                // else {
                                swal("Invalid username/password");
                                // }
                            }
                            else {
                                swal("Invalid username/password");
                            }

                        } catch (e) {
                            obj = {};
                            obj.WebUserID = $('.webuserid').html()
                            obj.Description = "Login Error"
                            obj.PageName = "Login Error"
                            console.log(obj);
                            catch_this(obj)
                        }
                    }
                })
            }
        });
    }

    function catch_this(obj) {
        $.ajax({
            url: 'includeRPA/exceptioncatchblock.php',
            data: obj,
            method: 'POST',
            success: function (msg) {
                console.log();
            }
        })
    }
});
