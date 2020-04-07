//	VALIDATIONS
jQuery(document).ready(function($){
    "use strict";
    // VALIDATE PHONE NUMBER
    $("input[type='tel']").intlTelInput({
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });

        },
        utilsScript: "assets/js/utils.js" // just for formatting/placeholders etc
    });

    var intlNumber = $("input[type='tel']").intlTelInput("getNumber");
    utilsScript: "<?php echo base_url('assets/intelInput');?>util.js";
    var input = $("input[type='tel']"),
        output = $("#p_result");

    input.intlTelInput({
        nationalMode: true,
        utilsScript: "<?php echo base_url('assets/intelInput');?>util.js" // just for formatting/placeholders etc

    });

    // listen to "keyup", but also "change" to update when the user selects a country
    output.text("");
    input.on("keyup change", function() {
        var intlNumber = input.intlTelInput("getNumber");
        if ($.isNumeric(intlNumber)) {
            output.text("International: " + intlNumber);
        } else {
            output.text("Please enter a valid number");
            //input.removeClass("valid").addClass("invalid");
        }
    });

    // contact use fields validations
    var regex = /^(([a-zA-Z]+))$/;
    $("input[type='text']").on("change keyup",function(){
        var input=$(this);
        var is_name=input.val();
        if((is_name !== "") && (regex.test(is_name)))
        {input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $("input[type='email']").on("change keyup", function() {
        var input=$(this);
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var is_email=re.test(input.val());
        if(is_email){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $("input[type='tel']").on("change keyup",function(){
        var input=$(this);
        var is_name= input.val();
        if($.isNumeric(is_name))
        {input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $("input[type='submit']").on("click",function(event) {

        var form_data=$(".form").serializeArray();
        var error_free=true;
        for (var input in form_data){
            var element=$(".form #"+form_data[input]['name']);
            var valid=element.hasClass("valid");
            if (!valid){
                error_free=false;
            }
        }
        if (!error_free){
            event.preventDefault();
            alert('Please fill in the required (*) fields / Check for accepted input length');
        }
    });

//    Number fields minimum
    $("input[type='number']").prop('min','0');
});