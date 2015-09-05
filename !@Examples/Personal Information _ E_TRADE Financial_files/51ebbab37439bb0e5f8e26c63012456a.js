Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var ie="";ie=window.dl_obj&&dl_obj["Investment Experience"]?dl_obj["Investment Experience"]:"";if(!ie)ie=Bootstrapper.Cookies.get("ens_ie");Bootstrapper.Cookies.set("ens_ie",ie);return ie},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Investment Experience",
collection:"OLA",source:"Manage",priv:"false"},{id:"7626"})},7626)},-1,-1);Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){return""},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Manage Uninvested Cash",collection:"OLA",source:"Manage",priv:"false"},{id:"7628"})},7628)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;var ddConditions={"not":[null],"caseInsensitive":["ignore case"],"compareTo":[""],"requiredData":["7624"],"comparators":["exists"]};Bootstrapper.data.resolve(ddConditions.requiredData,function(){ddConditions.values=Array.prototype.slice.call(arguments,0);var Bootstrapper=window["Bootstrapper"];if(Bootstrapper.data.checkConditions(ddConditions))Bootstrapper.ensEvent.poll("Manage.OLA.Total Net Worth",
["Event - Total Net Worth"],true,false)})},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var mt="";mt=window.dl_obj&&dl_obj["Margin Trading?"]?dl_obj["Margin Trading?"]:"";if(!mt)mt=window.dl_obj&&dl_obj["Margin  Trading?"]?dl_obj["Margin  Trading?"]:"";if(!mt)mt=Bootstrapper.Cookies.get("ens_mt");Bootstrapper.Cookies.set("ens_mt",mt);return mt},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,
dataDefName:"Margin Trading",collection:"OLA",source:"Manage",priv:"false"},{id:"7629"})},7629)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var lnw="";lnw=window.dl_obj&&dl_obj["Liquid Net Worth"]?dl_obj["Liquid Net Worth"]:"";if(!lnw)lnw=Bootstrapper.Cookies.get("ens_lnw");Bootstrapper.Cookies.set("ens_lnw",lnw);return lnw},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Liquid Net Worth",collection:"OLA",
source:"Manage",priv:"false"},{id:"7623"})},7623)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var pl="";pl=window.dl_obj&&dl_obj["Plan To Use Account"]?dl_obj["Plan To Use Account"]:"";if(!pl)pl=Bootstrapper.Cookies.get("ens_pl");Bootstrapper.Cookies.set("ens_pl",pl);return pl},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Plan To Use Account",collection:"OLA",
source:"Manage",priv:"false"},{id:"7625"})},7625)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var ot="";ot=window.dl_obj&&dl_obj["Options Trading?"]?dl_obj["Options Trading?"]:"";if(!ot)ot=Bootstrapper.Cookies.get("ens_ot");Bootstrapper.Cookies.set("ens_ot",ot);return ot},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Options Trading",collection:"OLA",
source:"Manage",priv:"false"},{id:"10407"})},10407)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var ai="";ai=window.dl_obj&&dl_obj["Annual Income"]?dl_obj["Annual Income"]:"";if(!ai)ai=Bootstrapper.Cookies.get("ens_ai");Bootstrapper.Cookies.set("ens_ai",ai);return ai},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Annual Income",collection:"OLA",source:"Manage",
priv:"false"},{id:"7622"})},7622)},-1,-1);Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){return window.s&&window.s.prop9?window.s.prop9:""},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"App ID",collection:"OLA",source:"Manage",priv:"false"},{id:"6099"})},6099)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var tnw="";tnw=window.dl_obj&&dl_obj["Total Net Worth"]?dl_obj["Total Net Worth"]:"";if(!tnw)tnw=Bootstrapper.Cookies.get("ens_tnw");Bootstrapper.Cookies.set("ens_tnw",tnw);return tnw},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Total Net Worth",collection:"OLA",
source:"Manage",priv:"false"},{id:"7624"})},7624)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var fot="";fot=window.dl_obj&&dl_obj["Frequency of Trades"]?dl_obj["Frequency of Trades"]:"";if(!fot)fot=Bootstrapper.Cookies.get("ens_fot");Bootstrapper.Cookies.set("ens_fot",fot);return fot},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,dataDefName:"Frequency of Trades",
collection:"OLA",source:"Manage",priv:"false"},{id:"7627"})},7627)},-1,-1);