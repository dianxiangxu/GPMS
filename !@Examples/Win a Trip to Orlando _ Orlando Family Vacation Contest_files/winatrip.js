var myapp=angular.module("voapp",["fuzzyEmail-ng","ui.bootstrap"]);myapp.controller("formcontrol",["$scope","$http","$window",function(i,h,d){i.state="";i.region="";i.caState="";i.languages=[];i.countries=possibleCountries;i.country="USA";i.language="";i.minDate=new Date();i.maxDate=new Date(9999,12,31);i.datepicker_options={showWeeks:false};var e="/includes/winatripform/submitForm.cfm";var j=navigator.userAgent;var c=(j.toLowerCase().indexOf("ipad")>-1);var b=(j.indexOf("Mozilla/5.0")>-1&&j.indexOf("Android ")>-1&&j.indexOf("AppleWebKit")>-1);(function(k){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(k)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(k.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);var g=$.browser.mobile;if(g||b||c){var f=true}else{var f=false}i.ismobile=f;i.usStates=[{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"District Of Columbia",abbreviation:"DC"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Puerto Rico",abbreviation:"PR"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}];i.caStates=[{n:"Alberta",v:"AB"},{n:"British Columbia",v:"BC"},{n:"Manitoba",v:"MB"},{n:"New Brunswick",v:"NB"},{n:"Newfoundland",v:"NL"},{n:"Northwest Territories",v:"NT"},{n:"Nova Scotia",v:"NS"},{n:"Nunavut",v:"NU"},{n:"Ontario",v:"ON"},{n:"Prince Edward Island",v:"PE"},{n:"Quebec",v:"QC"},{n:"Saskatchewan",v:"SK"},{n:"Yukon Territory",v:"YT"}];i.requireState=function(){switch(i.country){case"USA":return(i.state=="");break;case"CAN":return(i.castate=="");break;default:return(i.region=="")}return true};i.countryChange=function(){if(i.country!=""){i.language="";h({method:"GET",url:"/includes/winatripform/selectlanguage.cfm?responsive=1&country="+i.country}).success(function(m,k){var l;var n=[];for(l=0;l<m.length;l++){var o={iso3:m[l].ISO3,language:m[l].LANGUAGE};n.push(o)}i.languages=n;i.language=""}).error(function(l,k,m){console.debug({a:l,b:k,c:m})})}};i.countryChange();i.travelDateCheck=function(n){var k=i.winatripForm.TravelDate.$viewValue;if(!k){k=""}if(typeof k=="object"){var l=k;var m=""+(l.getMonth()+1)+"/"+l.getDate()+"/"+l.getFullYear();k=m}test=a(k);if(k==""||test){if(k==""||(test>i.minDate&&test<i.maxDate)){i.traveldate_inFuture=true;i.traveldate_passed=true}else{i.traveldate_inFuture=false;i.traveldate_passed=false}}else{i.traveldate_passed=false;i.traveldate_inFuture=true}};i.today=function(){i.traveldate=new Date()};i.clear=function(){i.traveldate=null};i.open=function(k){k.preventDefault();k.stopPropagation();i.opened=true};i.formSubmit=function(k){if(i.winatripForm.$valid&&i.checkEmail(i.email)){$("input[type='submit']").prop("disabled",true);$("#winatripForm").prop("action",e);$("#winatripForm").submit()}else{i.winatripForm.form_failed=true;$("input[type='submit']").prop("disabled",false)}};i.checkEmail=function(l){var k=/\S+@\S+\.\S+/;if(!k.test(i.email)){i.winatripForm.email.$error.email=true;return false}return true};var a=function(p){if(f){var o=p.split("-");var n=Number(o[1]);var k=Number(o[2]);var m=Number(o[0])}else{var o=p.split("/");var n=Number(o[0]);var k=Number(o[1]);var m=Number(o[2])}var l=0;if(o.length==3){for(l;l<o.length;l++){if(isNaN(o[l])){return null}}if(n>12||n<1){return null}if(k>31||k<1){return null}if(m<1000){return null}return new Date(m,n-1,k)}else{return null}return null}}]);$("input[type='submit']").prop("disabled",false);