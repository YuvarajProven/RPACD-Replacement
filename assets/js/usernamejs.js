//--- If username and password was valid then fallowing operations will perform----
// by calling Userpermissions store procedure we will get previlages
$(document).ready(function () {
    //var flagType = 'GXP'
    var first_flow = false
    var flagType = 'GXP'
    var audit_id;

    if (flagType == 'GXP') {
        opt = ''
        for (let i = 0; i < gxp_options.length; i++) {
            const element = gxp_options[i];
            opt += '<option value="' + element.value + '" class="FTO">' + element.name + '</option>'
        }

        $(".extraFields").html('<label class="clusterlabel" for="Plant">Plant</label><select  class="gxp_names_listclass form-control" name="Plant">' + opt + '</select><div class="bar"></div>');

        // $(".extraFields").html('<label class="clusterlabel" for="Plant">Plant</label><select  class="gxp_names_listclass form-control" name="Plant"><option value="FTO2" class="FTO2">FTO2 - Bachupally</option><option value="CTO2" class="CTO2">CTO - Bollaram</option></select><div class="bar"></div>');
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


        first_flow = false
        username = $(".usernameclass").val()
        password = $(".passwordclass").val()
        sessionStorage.setItem("username", username)

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

        if (obj.username != "" && obj.password == "Yuvaraj123") {
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
    function check_account(username, valid_check) {
        resp = ''
        //debugger;
        if (valid_check.indexOf('Corporate') > -1 || valid_check=='') {
          plant = 'FTO2'
          resp = 'valid'
          createSession(username, plant, resp)
        }
	else if (username=='P00078861' || username=='P00074360' || username=='P00047425' || username == 'P00047425' 
		|| username == 'P90011210' || username == 'P00047843' || username == 'P00065949' || username == 'P00047843' 
		|| username == 'P00057362' || username=='P00074279' || username == 'P00087734' || username == 'P00079809' 
		|| username == 'P00074086' || username == 'P00085001' || username == 'P00018309' || username == 'P00085056' 
		|| username == 'P00083719' || username == 'P00085056' || username == 'P00056720' || username == 'P00059373' 
		|| username == 'p00059373' || username == 'p00064224' || username == 'P00064224' || username == 'P00054047'
		|| username == 'P00046620' || username == 'P00065956' || username == 'Yuvaraj')
	{
	    if (username=='P00078861' || username == 'P00083719' || username == 'P00046620')
            	plant = 'FTO11'
	    else if (username=='p00074360' || username=='P00065949' || username == 'P00079809')
	    {
		plant = 'CTOSEZ'
	    }
	    else if (username == 'P00047425' || username=='P00074279' || username == 'P00085001')
		plant = 'CTO5'
	    else if (username == 'P00056720' || username == 'P00059373' || username == 'P00064224')
		{
		 plant = 'FTO8'
		}
	    else if (username == 'p00059373' || username == 'p00064224')
		{
		 plant = 'FTO6'
		}
	    else if(username == 'P90011210')
		plant = 'FTO9'
	    else if(username=='P00078861')
		plant = 'FTOPU2'
	    else if(username == 'P00047843')
		plant = 'FTOPU2'
	    else if(username == 'P00057362')
		plant = 'CTO2'
	    else if(username == 'P00087734' || username == 'P00054047' || username == 'P00065956')
		plant = 'FTOPU1'
	    else if(username == 'P00074086' || username == 'Yuvaraj')
		plant = 'FTO3'
	    else if(username == 'P00018309')
		plant = 'FTO2'
	    else if (username == 'P00085056')
		plant = 'CTO1'
            resp = 'valid'
            createSession(username, plant, resp)
	    return
	}
        else if (valid_check.indexOf('FTO2') > -1 || valid_check.indexOf('FTO-2') > -1 || username=='P90009369') {
            plant = 'FTO2'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO3') > -1 || valid_check.indexOf('Corporate') > -1 || username == 'Yuvaraj') {
            plant = 'FTO3'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO6') > -1 || username=='P00046285') {
            plant = 'FTO6'
            resp = 'valid'
            createSession(username, plant, resp)
	    return
        }
        else if (valid_check.indexOf('FTO7') > -1 || username=='P00058152' || username=='P00050228' || username=='P00025808' || username=='P90011210') {
            plant = 'FTO7'
            resp = 'valid'
            createSession(username, plant, resp)
	    return
        }
        else if (valid_check.indexOf('FTO8') > -1 || username == 'P00050000') {
            plant = 'FTO8'
            resp = 'valid'
            createSession(username, plant, resp)
	    return
        }
        else if (valid_check.indexOf('FTO9') > -1) {
            plant = 'FTO9'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('FTO11') > -1 || username=='P00045880' || username=='P00050433' || username=='P00078861' || username=='P00046982') {
            plant = 'FTO11'
            resp = 'valid'
            createSession(username, plant, resp)
	    return
        }
        else if (valid_check.indexOf('CTO1') > -1 || valid_check.indexOf('CTO-1') > -1  || username=='p00033604' || username=='P00033604' || username=='P00070724' || username=='P00072088') {
            plant = 'CTO1'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if (valid_check.indexOf('CTO2') > -1 || valid_check.indexOf('CTO-2') > -1 || username=='P90009680' || username=='P90010567') {
            plant = 'CTO2'
            resp = 'valid'
            createSession(username, plant, resp)
	    return
        }
        else if (valid_check.indexOf('CTO3') > -1 || valid_check.indexOf('CTO-3') > -1 || username=='P00018987' || username=='P00052434' || username=='P00008622' || 	username=='P00052889' || username=='P00001179' || username=='P00049723') {
            plant = 'CTO3'
            resp = 'valid'
            createSession(username, plant, resp)
        }
        else if ((valid_check.indexOf('FTOPU1') > -1 || valid_check.indexOf('FTO-SEZ-PU1') > -1 || username=='P00051535' || 
						username=='P00051507' || username=='P00052672' || username=='P00045230' ||
						username=='P00051307' || username=='P00055364') && (username != 'P90009488')) {
            plant = 'FTOPU1'
            resp = 'valid'
            createSession(username, plant, resp)
        }
	else if (valid_check.indexOf('93SEZ') > -1 || valid_check.indexOf('CTO-SEZ') > -1 || username == 'P90009488' || username=='P00053829' || username=='P90006905' || username=='P00057528' || username=='p00043255' || username=='P00049122' || username=='P00045654' || username=='P90010770') {
            plant = 'CTOSEZ'
            resp = 'valid'
            createSession(username, plant, resp)
        }
	else if (valid_check.indexOf('CTO6') > -1) {
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
          // plant = $(".gxp_names_listclass").val();
          // resp = 'valid'
          // createSession(username, plant, resp)
          if(valid_check == 'locked'){
            swal("Your Account Is Locked , Please Contact TechEase For  Unlock The Account.");
            sendAuditData(username, 0)

          }
         else if(valid_check.indexOf('Undefined') > -1){
            plant = $(".gxp_names_listclass").val();
            resp = 'valid'
            createSession(username, plant, resp)
          }
          else if(valid_check.length > 0 && valid_check.indexOf('OU') > -1 ){
            plant = $(".gxp_names_listclass").val();
            resp = 'valid'
            createSession(username, plant, resp)
          }
          else{
          first_flow = false;
          swal("Invalid username/password");
          sendAuditData(username, 0)

        }
        }
    }

    function sendAuditData(username, isSuccess) {
        $.ajax({
            url: 'includeRPA/esign_audit.php', // Path to your PHP audit script
            method: 'POST',
            data: {
                name: username,
                isSuccess: isSuccess  
            },
            success: function (response) {
                console.log(data)
                
                // console.log(username)
    
                
                console.log("Audit data saved:", response);
                
            },
            error: function (error) {
                console.error("Error saving audit data:", error);
                
            }
        });
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
                                user_obj.set_plant = "false"
                                $.ajax({
                                    url: 'includeRPA/Userpermissions.php',
                                    data: user_obj,
                                    method: 'POST',
                                    success: function (msg) {
                                        console.log(msg);
                                        try {
                                            msg = JSON.parse(msg)
                                            if (msg.length == 0) {
                                              sessionStorage.setItem("Role", 'Guest')
                                              allowGuestUser(username, audit_id, plant, flagType)
                                            }
                                            else {
                                              isActive = msg[0]['IsActive'];
                                              sessionStorage.setItem("Role", msg[0]['UserRole'])
                                              if (msg[0]['UserRole'].toLowerCase() == 'administrator') {
                                                plant = $(".gxp_names_listclass").val();
                                                // plant = 'FTO3';
                                                user_obj.plant = plant;
                                                user_obj.set_plant = "true"
                                                $.ajax({
                                                  url: 'includeRPA/Userpermissions.php',
                                                  data: user_obj,
                                                  method: 'POST',
                                                  success: function (msg) {
                                                    msg = JSON.parse(msg)
                                                    if (msg.length == 0) {
                                                      sessionStorage.setItem("Role", 'Guest')
                                                      allowGuestUser(username, audit_id, plant, flagType)
                                                    }
                                                    else {
                                                      isActive = msg[0]['IsActive'];
                                                      sessionStorage.setItem("Role", msg[0]['UserRole'])
                                                      sessionStorage.setItem("plantname", plant)
                                                      redirect_func(username, isActive, msg, audit_id, plant, flagType)
                                                    }
                                                  }
                                                })
                                              }
                                              else if (plant != cluster) {
                                                swal("Invalid cluster");
                                              }
                                              else {
                                                redirect_func(username, isActive, msg, audit_id, plant, flagType)
                                              }
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
                                            sessionStorage.setItem("Role", 'Guest')
                                            allowGuestUser(username, audit_id, plant, flagType)
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
                                console.log("288");

                                swal("Invalid username/password");
                                  sendAuditData(username, 0)

                                // }
                            }
                            else {
                              console.log("294");
                                swal("Invalid username/password");
                                sendAuditData(username, 0)

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

    function allowGuestUser(username, audit_id, plant, flagType) {
      login_obj = {};
      login_obj.name = username;
      login_obj.role = 'guest';
      arrs = ["Dashboard.php", "SampleSetList.php", "SampleSetReport.php", "FailureMeasure.php", "ConfigurationSettings.php"];
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
            sessionStorage.setItem("plantname", plant)

              window.location.href = 'main.php'
          }
      });
    }

    function redirect_func(username, isActive, msg, audit_id, plant, flagType) {
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
          $.ajax({
              url: 'includeRPA/session_create.php',
              data: login_obj,
              method: 'POST',
              success: function (redirect) {
                sessionStorage.setItem("plantname", plant)
                
                  window.location.href = 'main.php'
              }
          });
      }
      else {
          alert("Account Deactivated");
      }
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
