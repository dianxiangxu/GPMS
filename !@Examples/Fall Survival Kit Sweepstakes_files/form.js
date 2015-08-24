/**
 * Offerpop Custom Form Client-side Code
 *
 * Some of the Custom Form code is in this one JavaScript file, separated into
 * modules.  Whichever module is required on a page should be started by calling
 * its init() function. More code should be refactored out of FacebookSignUpForm.tpl
 */

if (typeof(OP) === "undefined") {
    var OP = {};
}
OP.Form = {};

// -----------------------------------------------------------------------------

/**
 * Form Module
 *
 * Requirements:
 * - jQuery
 * - FB (if the form defines facebook-connect-link or facebook-connect-button)
 * - OP.Insights (if the form defines facebook-connect-link or facebook-connect-button)
 */
OP.Form = (function() {
    var $ = jQuery;

    function init(formData, mobile) {
        /* initialize form elements
            formData.page_id: contest page id
            formData.app_id: contest app id
            mobile: if using mobile version or not
        */

        if ($("#facebook_image").val() && $("#facebook_name").val()) {
            $('#facebook-image').attr('src', $("#facebook_image").val()).fadeIn();
            $('#facebook-name').text($("#facebook_name").val());
            $('#facebook-connect-link, #facebook-connect-button').hide();
            $('#facebook-profile-connect-why').hide();
        }

        if (!mobile) {
            $(".datePickerSignUp").datepicker({
            minDate: "-100Y",
            maxDate: new Date(new Date().getFullYear(), 11, 31),
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:-0"
            });
        }

        $(".datePickerSignUp").each(
            function() {
                if (mobile) {
                    if ($("input[name='" + this.name + "_year']").val() != ""
                    && $("input[name='" + this.name + "_month']").val() != ""
                    && $("input[name='" + this.name + "_day']").val() != "") {
                    var date = $("input[name='" + this.name + "_year']").val() + '-' +
                           $("input[name='" + this.name + "_month']").val() + '-' +
                           $("input[name='" + this.name + "_day']").val()
                    $(this).val(date);
                    }
                } else {
                    $(this).datepicker("option", $.datepicker.regional[$(this).data("locale")]);

                    // load the date from it's components
                    if ($("input[name='" + this.name + "_year']").val() != ""
                    && $("input[name='" + this.name + "_month']").val() != ""
                    && $("input[name='" + this.name + "_day']").val() != "") {
                        $(this).datepicker("setDate",
                            new Date(
                            $("input[name='" + this.name + "_year']").val(),
                            $("input[name='" + this.name + "_month']").val() - 1,
                            $("input[name='" + this.name + "_day']").val()
                            )
                        );
                    }
                }
            }
        );

        $(window).bind("unload", function() {
            var submitButton = $("#form_submit_button");
            if(submitButton && submitButton.attr("disabled")) {
                submitButton.removeAttr("disabled");
            }
        })

        $("#frmSignUp").submit(
            function(e) {
                $("#form_submit_button").attr("disabled", "disabled");
                $(".datePickerSignUp").each(
                    function() {
                        $picker = $(this);
                        var name = $picker.name;
                        if (mobile) {
                            var d = $picker.val().split('-');
                            $picker.remove();  // don't submit the main value. we use the submitted components created above
                            $("input[name='" + this.name + "_year']").val(d[0] ? d[0] : "");
                            $("input[name='" + this.name + "_month']").val(d[1] ? d[1] : "");
                            $("input[name='" + this.name + "_day']").val(d[2] ? d[2] : "");
                        } else {
                            var d = $picker.datepicker("getDate");
                            $picker.remove();  // don't submit the main value. we use the submitted components created above
                            $("input[name='" + this.name + "_year']").val(d ? d.getFullYear() : "");
                            $("input[name='" + this.name + "_month']").val(d ? d.getMonth() + 1 : "");
                            $("input[name='" + this.name + "_day']").val(d ? d.getDate() : "");
                        }
                    }
                );
            }
        );

        $('#facebook_unauthorized a').click(function(e) {
            e.preventDefault();
            $('#facebook_unauthorized').fadeOut();
        });
        $('#facebook-connect-link, #facebook-connect-button').click(function(e) {
            e.preventDefault();
            requestAuthorization();
        });
        $('#category').change(function(){
            $('#hidden_category').val($(this).val());
        });

        // fix for links in jQuery mobile style checkboxes
        if (mobile) {
            $('.ui-checkbox a').bind("tap click", function( event, data ){
                event.stopPropagation();
                $.mobile.changePage($(this).attr('href'), {showLoadMsg: false});
            });
        }
    }

    // this method requires OP.Insights
    function requestAuthorization() {
        
        if (typeof OP.Insights !== "undefined") {
            FB.login(function(response) {
                //firefox wrecks the focus after FB.login, this line
                //refocuses the window and prevent RM7669
                window.parent.focus();
                if (response.authResponse) {
                    OP.Insights.hasEnoughPermission(function(me_response){
                        // we have required permissions
                        updateUserInfo(me_response);
                        OP.Insights.saveUserProfile(true);
                    }, function(me_response) {
                        // we don't have the required permissions
                        updateUserInfo(me_response);
                        $('#form_submit_button').removeAttr('disabled');
                    });
                }
                else { // we don't have a facebook connect
                    $('#facebook_unauthorized').fadeIn();
                    jQuery("#facebook_unauthorized").each(function(index) 
                    {
                        if(jQuery(this).css("top")=='auto')
                        {
                            jQuery(this).css("bottom",'auto');
                            jQuery(this).css("top",'300px');
                        }
                    });
                    $('#form_submit_button').removeAttr('disabled');
                }
            }, {scope: OP.Insights.requiredFacebookPermissions.join()});
        } else {
            throw "OP.Insights is undefined";
        }
    }
    function updateUserInfo(response) {

        if (!response) {
            return;
        }

        $('#facebook_id').val(response.id);
        $('#facebook_image').val(response.picture.data.url);
        $('#facebook_link').val(response.link);
        $('#facebook_name').val(response.name);

        $('#name').val(response.name);
        $('#firstname').val(response.first_name);
        $('#lastname').val(response.last_name);

        if (response.email)
        {
            $('#email').val(response.email);
        }

        if (response.birthday && $.trim($($('#birthday').siblings('label')[0]).text()).toUpperCase() === "BIRTHDAY")
        {
            $('#birthday').val(response.birthday);
        }

        if (response.location && response.location.name && $.trim($($('#city').siblings('label')[0]).text()).toUpperCase() === "LOCATION")
        {
            $('#city').val(response.location.name);
        }

        $('#facebook-image').attr('src', response.picture.data.url).fadeIn();
        $('#facebook-name').text(response.name);

        $('#facebook-connect-link, #facebook-connect-button').hide();
        $('#facebook-profile-connect-why').hide();
        $('#facebook-profile-connect').find("Invalid").removeClass("Invalid");
    }

    return {
        'init': init
    };

}());
