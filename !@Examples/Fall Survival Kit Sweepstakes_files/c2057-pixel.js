/*
 NOTE: This file is an automatically generated file. Any changes made to this file will be lost.*/
window.ICX=window.ICX||{};ICX.client_id="2057";ICX.ks=true;ICX.ks_number="5076";ICX.ks_profile_token="9cca36be-3b23-498b-b939-c0506c9eb5a5";
(function(){var baseUrl,defaults,ICX,ICVars,I2A,flr,rnd,pow,ic_version;ic_version="20150626";defaults=function(){var defaults;defaults={pageAction:0,client_id:0,domain_id:0,campaign_id:8,sale:"",price:"",sku:"",order_code:"",currency_id:"",ic_ch:"",altid:"",ic_mid:"",ic_uq:"",event_label:"",event_type:"",event_opt_params:{}};for(var i=1;i<=20;i++)defaults["user_defined"+i]="";return defaults}();flr=Math.floor;rnd=Math.random;pow=Math.pow;ICX=window.ICX||{};ICVars=window.ICVars||{};I2A=window.I2A||
{};IC=window.IC||{};ICX.exchange_dependents=ICX.exchange_dependents||[];ICX.util={cookieEnabled:function(){return window.navigator.cookieEnabled},hostname:function(){return window.location.hostname},protocol:function(){return window.location.protocol},referrer:function(){return document.referrer},isObj:function(obj){return typeof obj==="object"&&typeof obj.length!=="number"},merge:function(target){var a,sourceProperty,property,source;target=typeof target!=="object"?{}:target;for(a=1;source=arguments[a];a++)for(property in source)if(source.hasOwnProperty(property)){sourceProperty=
source[property];if(ICX.util.isObj(sourceProperty)&&ICX.util.isObj(target[property])){target[property]=ICX.util.merge({},target[property],sourceProperty);continue}target[property]=sourceProperty}return target},cookie:{get:function(name){var regex,match;name=name.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1");regex=new RegExp("(?:^|;)\\s?"+name+"=(.*?)(?:;|$)","i");match=document.cookie.match(regex);return match&&decodeURIComponent(match[1])},set:function(name,value,days,hours){var i,date,params,domains;
date=new Date;date.setDate(date.getDate()+(days===-1?"":days||1));date.setHours(date.getHours()+(hours?hours:0));domains=ICX.util.hostname().split(".");for(i=1;i<domains.length+1;i++){params=[];params.push(encodeURIComponent(value));params.push("expires="+date.toUTCString());params.push("path=/");params.push("domain=."+domains.slice(-i).join("."));document.cookie=name+"="+params.join("; ")}},remove:function(name){ICX.util.cookie.set(name,"",-2)}},uuid:function(){return(new Date).getTime()+"-"+flr(rnd()*
pow(2,53))},buildData:function(){var data,key;data={};for(key in defaults)if(defaults.hasOwnProperty(key))if(typeof ICX[key]!=="undefined")data[key]=ICX[key];else if(typeof window[key]!=="undefined")data[key]=window[key];else data[key]=defaults[key];return data},icxid:function(){var icxid;icxid="nocookie";if(ICX.util.cookieEnabled()){icxid=ICX.util.cookie.get("icxid")||ICX.util.uuid();ICX.util.cookie.set("icxid",icxid,730)}return icxid},Params:function(data){this.start=function(){var params,timeStamp;
params=[["cID",data.client_id],["cdid",data.domain_id],["campID",data.campaign_id]];if(ICX.i2a){timeStamp=Math.round((new Date).getTime()/1E3).toString()+(Math.random()*100).toString();params.splice(2,0,["rand",timeStamp])}return params};this.action=function(){var params,i;params=[["convID",data.pageAction],["convP",data.price],["curID",data.currency_id],["ordID",data.order_code==="*"?"":data.order_code],["ud1",data.user_defined1],["ud2",data.user_defined2],["ud3",data.user_defined3],["ud4",data.user_defined4],
["sku",data.sku]];if(!ICX.i2a){for(i=5;i<=20;i++)params.push(["ud"+i,data["user_defined"+i]]);params.push(["sl",data.sale]);if(ICX.ks===true)params.push(["ic_ko_pb","N"])}return params};this.end=function(){var params,i2a,icPixel,i;i2a=[["altid",data.altid]];icPixel=[["icxid",ICX.icxid],["ic_uq",ICX.ic_uq],["ic_mid",data.ic_mid],["ic_js_ver",ic_version]];params=[["ic_ch",data.ic_ch],["refVar",ICX.util.referrer()]];if(!ICX.i2a)return params.concat(icPixel);else{i2a.unshift(params[0]);i2a.push(params[1]);
return i2a}};this.event=function(){var eventAttrs={event_label:data.event_label,event_type:data.event_type};if(ICX.util.isObj(data.event_opt_params))eventAttrs=ICX.util.merge(eventAttrs,data.event_opt_params);return[["ic_attrs",JSON.stringify(eventAttrs)]]}},addSharedAttrs:function(fullParams){var i,collided,collidedText,key,prefix,sharedAttrs;sharedAttrs=[];collided=[];collidedText="collided_";for(key in ICX.sharedAttrs)if(ICX.sharedAttrs.hasOwnProperty(key)){prefix="";for(i=0;i<fullParams.length;i++)if(fullParams[i][0]===
key){prefix=collidedText;collided.push([key,ICX.sharedAttrs[key]]);break}if(!ICX.i2a)sharedAttrs.push([prefix+key,ICX.sharedAttrs[key]])}for(i=0;i<collided.length;i++){delete ICX.sharedAttrs[collided[i][0]];ICX.sharedAttrs[collidedText+collided[i][0]]=collided[i][1]}return sharedAttrs},addAltQueryParams:function(){var params;if(!ICX.altQueryParams)return[];params=[];for(i=0;i<ICX.altQueryParams.length;i++)params.push([ICX.altQueryParams[i]]);return params},baseUrl:function(data,trackEvent){var baseUrl=
(ICX.i2a?"":"p")+data.client_id+".ic-live.com/";if(trackEvent)baseUrl=baseUrl+"generic";else if(ICX.exchange_dependents.length)baseUrl=baseUrl+"hit.js";else if(ICX.i2a)baseUrl=baseUrl+"goat.php";else baseUrl=baseUrl+"favicon.ico";return baseUrl},buildUrl:function(trackEvent){var i,params,data,fullParams,queryParams,url;data=ICX.util.buildData();params=new ICX.util.Params(data);fullParams=params.start().concat(params.action(),params.end());queryParams=data.pageAction>0&&!trackEvent?fullParams:params.start().concat(params.end());
fullParams=fullParams.concat(ICX.util.addAltQueryParams());queryParams=queryParams.concat(ICX.util.addSharedAttrs(fullParams));if(trackEvent)queryParams=queryParams.concat(params.event());for(i=0;i<queryParams.length;i++){queryParams[i][1]=encodeURIComponent(queryParams[i][1]);queryParams[i]=queryParams[i].join("=")}url=ICX.util.protocol()+"//"+ICX.util.baseUrl(data,trackEvent)+"?";return url+queryParams.join("&")},callDependents:function(id){ICX.exchange_dependents.forEach(function(d){if(typeof d===
"function")d.call(this,id,ICX)});ICX.exchange_dependents=[]},fireExchange:function(){var p,s;p=document.createElement("script");p.type="text/javascript";p.src=ICX.util.buildUrl();s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(p,s)}};ICX.pixel=function(){if(ICX.page_view===false)return false;if(ICX.exchange_dependents.length)ICX.util.fireExchange();else(new Image).src=ICX.util.buildUrl()};ICX.pixelEvent=function(pageAction){ICX.ic_uq=ICX.util.uuid();if(typeof pageAction!=="undefined")ICX.pageAction=
pageAction;(new Image).src=ICX.util.buildUrl();if(ICX.ks===true)ICX_KS.pixelEvent()};ICX.trackEvent=function(event_label,event_type,event_opt_params){if(!event_label||!event_type)return false;ICX.ic_uq=ICX.util.uuid();ICX.event_label=event_label;ICX.event_type=event_type;if(ICX.util.isObj(event_opt_params))ICX.event_opt_params=event_opt_params;(new Image).src=ICX.util.buildUrl(true)};window.pixel_conversion=I2A.pixelEvent=ICX.pixelEvent;ICX.icxid=ICX.i2a?"":ICX.util.icxid();ICX.ic_uq=ICX.util.uuid();
ICX=ICX.util.merge({},ICVars,IC,I2A,ICX);window.ICX=ICX;if(ICX.i2a)window.I2A=I2A;if(!ICX.ks&&!ICX.ks===true)ICX.pixel()})();
(function(){var ICX,ICX_KS,defaults;defaults={pageAction:0,number:"",profile_token:"",price:0,order_code:"",promoCode:"",currency_id:"USD"};ICX=window.ICX||{};ICX_KS=window.ICX_KS||{};ICX_KS.util={protocol:function(){return window.location.protocol},build_url:function(data){var url;url=ICX_KS.util.protocol()+"//";url+=data.number+".xg4ken.com/media/getpx.php?cid=";return url+data.profile_token},icxExtraParams:function(){var data,i,key,default_map,results=[],obj_results={promoCode:""};default_map=
function(){var default_map;default_map={campaign_id:"campID",sale:"sl",sku:"sku",ic_mid:"ic_mid",ic_uq:"ic_uq"};for(var i=1;i<=20;i++)default_map["user_defined"+i]="ud"+i;return default_map}();data=ICX.util.buildData();for(key in default_map)if(default_map.hasOwnProperty(key))if(data[key]!==""&&data[key]!==0)results.push(default_map[key]+"="+data[key]);if(!results.length)return obj_results;if(encodeURIComponent(results.join("|")).length<=1024){obj_results.promoCode=encodeURIComponent(results.join("|"));
return obj_results}else for(i=0;i<results.length;i++)if(encodeURIComponent(results.slice(0,i+1).join("|")).length>1024){obj_results.promoCode=encodeURIComponent(results.splice(0,i).join("|"));obj_results.misc=encodeURIComponent(results.join("|"));return obj_results}},buildData:function(){var data,key;data={};for(key in defaults)if(defaults.hasOwnProperty(key))if(typeof ICX["ks_"+key]!=="undefined")data[key]=ICX["ks_"+key];else if(typeof ICX[key]!=="undefined")data[key]=ICX[key];else if(typeof window[key]!==
"undefined")data[key]=window[key];else data[key]=defaults[key];return data},buildParams:function(data){var key,obj,params;data=data||{};params=["id="+data.profile_token,"type="+data.pageAction,"val="+data.price,"orderId="+(data.order_code==="*"?"":data.order_code),"valueCurrency="+data.currency_id];if(data.promoCode!=="")params.push("promoCode="+data.promoCode);else{obj=ICX_KS.util.icxExtraParams();for(key in obj)if(obj.hasOwnProperty(key))params.push(key+"="+obj[key])}return params},trackEvent:function(data){var params,
scriptReady,count;params=ICX_KS.util.buildParams(data);count=0;scriptReady=setInterval(function(){count++;if(count===3E3){clearInterval(scriptReady);ICX.pixel()}else if(typeof window.k_trackevent==="function"){clearInterval(scriptReady);ICX.pixel();window.k_trackevent(params,data.number)}},1)}};ICX_KS.pixel=function(){var p,s,params,data,scriptReady,count;data=ICX_KS.util.buildData();if(data.profile_token===""||data.number===""){ICX.pixel();return false}p=document.createElement("script");p.type="text/javascript";
p.src=ICX_KS.util.build_url(data);s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(p,s);if(data.pageAction>0)ICX_KS.util.trackEvent(data);else ICX.pixel()};ICX_KS.pixelEvent=function(){if(typeof window.kenshoo_nconv==="function"){var data;data=ICX_KS.util.buildData();if(data.pageAction>0)window.kenshoo_nconv(ICX_KS.util.buildParams(data),data.number)}};window.ICX_KS=ICX_KS;ICX_KS.pixel()})();