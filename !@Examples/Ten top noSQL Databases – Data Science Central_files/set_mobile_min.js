if(!dojo.hostenv.findModule("xg.shared.util",false)){
dojo.provide("xg.shared.util");
xg.append=function(_1){
return (document.getElementById("xj_baz17246")||document.body).appendChild(_1);
};
xg.listen=function(_2,_3,_4,_5){
dojo.event.connect("string"==_2?dojo.byId(_2):_2,_3,"function"==typeof _4?_4:function(){
_5.apply(_4,arguments);
});
};
xg.stop=function(_6){
dojo.event.browser.stopEvent(_6);
};
xg.qh=function(_7){
if(typeof (_7)==="undefined"){
xg.shared.util.consoleLog("undefined was passed to xg.qh() (BAZ-32577)");
if(window.console&&window.console.trace){
window.console.trace();
}
return "";
}
return _7.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
};
xg.toggle=function(_8,_9){
_8=dojo.byId(_8);
if(arguments.length==1){
_9=(_8.style.display=="none");
}
_8.style.display=_9?"":"none";
};
xg.$=function(_a,_b){
if(_a.substr(0,1)=="#"){
return dojo.byId(_a.substr(1));
}
return xg.$$(_a,_b)[0];
};
xg.$$=function(_c,_d){
if(_c.substr(0,1)=="#"){
return [dojo.byId(_c.substr(1))];
}
_c=_c.split(".",2);
if("string"==typeof _d){
_d=document.getElementById(_d);
}
if(!_c[1]){
return (_d||document.body).getElementsByTagName(_c[0]);
}
return dojo.html.getElementsByClass(_c[1],_d,_c[0]);
};
xg.parent=function(el,_f){
_f=(_f||"").split(".");
var tag=_f[0].toUpperCase();
var cls=_f[1]?new RegExp("(^|\\s+)"+_f[1]+"(\\s+|$)"):"";
while(el=el.parentNode){
if((!tag||el.tagName==tag)&&(!cls||el.className.match(cls))){
return el;
}
}
return null;
};
xg._xhr=function(_12,url,_14,cb1,cb2,_17){
cb1=cb1||function(){
};
var req={url:url,method:_12,encoding:"utf-8",mimetype:"text/plain",load:function(_19,ret,_1b){
"function"==typeof cb1?cb1(_1b,ret):cb2.call(cb1,_1b,ret);
},error:_17};
if(_14){
if(_14.constructor!=Object){
req.formNode=_14;
}else{
if("undefined"!=typeof _14["preventCache"]){
req.preventCache=_14["preventCache"];
delete _14["preventCache"];
}
if("undefined"!=typeof _14["formNode"]){
req.formNode=_14["formNode"];
delete _14["formNode"];
}
req.content=_14;
}
}
return dojo.io.bind(req);
};
xg.get=function(url,_1d,cb1,cb2,_20){
return xg._xhr("get",url,_1d,cb1,cb2,_20);
};
xg.post=function(url,_22,cb1,cb2,_25){
return xg._xhr("post",url,_22,cb1,cb2,_25);
};
xg.linkify=function(_26,_27){
if(!_26.match(/http|ftp|www|HTTP|FTP|WWW/)){
return _26;
}
var _28=(null==_27)?"":" target=\""+_27+"\"";
var _29="(http|ftp|https):\\/\\/";
var _2a="[\\w\\-]+(\\.[\\w\\-]+)+";
var _2b="([\\w\\-\\.;,@?^=%&:\\/~\\+#]*[\\w\\-\\@?^=%&\\/~\\+#])?";
var _2c="(^|\\W)("+_29+_2a+_2b+")";
var _2d=_26.replace(new RegExp(_2c,"gi"),"$1<a href=\"$2\""+_28+">$2</a>");
_2a="www(\\.[\\w]+)+";
_2c="(^|[^/\\w])("+_2a+_2b+")";
_2d=_2d.replace(new RegExp(_2c,"gi"),"$1<a href=\"http://$2\""+_28+">$2</a>");
return _2d;
};
xg.preventDefault=function(_2e,_2f){
return function(_30){
_30.preventDefault();
if(_2f){
_30.stopPropagation();
}
_2e();
};
};
xg.renderHtml=function(_31,_32){
for(var i in _32){
if(_32.hasOwnProperty(i)){
_31=_31.replace(new RegExp("{"+i+"}","g"),_32[i]);
}
}
return _31;
};
xg.shared.util={ignoreOverlayHide:false,chatAppletContainerVisible:undefined,createElement:function(_34){
var el=document.createElement("div");
el.innerHTML=_34.replace(/^\s+/,"").replace(/\s+$/,"");
return el.firstChild||undefined;
},getOffset:function(el,_37){
var x=0,y=0;
var _3a=[];
for(;_37;_37=_37.parentNode){
_3a.push(_37);
}
for(var cur=el;cur;cur=cur.offsetParent){
var p=dojo.style.getStyle(cur,"position");
if(p=="relative"||p=="absolute"){
var _3d=0;
for(var i=0;i<_3a.length;i++){
if(cur==_3a[i]){
_3d=1;
break;
}
}
if(_3d){
break;
}
}
x+=cur.offsetLeft||0;
y+=cur.offsetTop||0;
if(cur.tagName=="BODY"){
break;
}
}
return {x:x,y:y};
},getOffsetX:function(el,_40){
var e=x$(el).offset(),n=x$(_40).offset();
return {x:e.left-n.left,y:e.top-n.top};
},_widgetParsingStrategy:0,safeBindUrl:function(url){
return url.replace(/\[/g,"%5B").replace(/\]/g,"%5D");
},isValidUrl:function(str){
var _45=/^(ftp|https?):\/\/(\w+(:\w*)?@?)?([a-zA-Z0-9_.-]+)(:\d+)?(\/([\w#!:.?+=&%@!\/-]*)?)?$/;
return _45.test(str);
},parseUrlParameters:function(url){
url=url+"";
var _47=url.split("?");
var _48=new Object;
if(_47.length>1){
var _49=_47[1].split("&");
for(var idx=0;idx<_49.length;idx++){
var kv=_49[idx].split("=");
_48[kv[0]]=kv[1];
}
}
return _48;
},parseWidgets:function(_4c){
var _4c=_4c||document.getElementsByTagName("body")[0]||document.body;
var _4d=new dojo.xml.Parse();
var _4e=_4d.parseElement(_4c,null,true);
dojo.widget.getParser().createComponents(_4e);
},fixImagesInIE:function(_4f,_50,_51,_52){
if(!(dojo.render.html.ie50||dojo.render.html.ie55||dojo.render.html.ie60)){
return;
}
dojo.lang.forEach(_4f,function(img){
if(dojo.lang.inArray(xg.shared.util.fixedImageURLs,img.src)){
return;
}
var _54=function(){
var _55=new Image();
_55.onload=_55.onerror=_55.onabort=function(){
img.src=img.src;
xg.shared.util.fixTransparencyInIEProper(img,_51,_52);
xg.shared.util.fixedImageURLs.push(img.src);
};
_55.src=img.src;
};
if(_50){
_54();
}else{
window.setTimeout(_54,0);
}
});
},fixedImageURLs:[],fixTransparencyInIEProper:function(img,_57,_58){
if(img&&(dojo.render.html.ie50||dojo.render.html.ie55||dojo.render.html.ie60)&&img.src.match(/png/)&&dojo.style.isShowing(img)){
_57=_57?_57:img.width;
_58=_58?_58:img.height;
img.style.width=_57+"px";
img.style.height=_58+"px";
img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+img.src+"', sizingMethod='scale')";
img.src=xg.shared.util.cdn("/xn_resources/widgets/index/gfx/x.gif");
}
if(img){
img.style.visibility="visible";
}
},fixTransparencyInIE:function(_59){
if(dojo.render.html.ie50||dojo.render.html.ie55||dojo.render.html.ie60){
dojo.lang.forEach(_59.getElementsByTagName("img"),function(img){
xg.shared.util.fixTransparencyInIEProper(img);
});
}
},fixDialogPosition:function(dlg){
var _5c=xg.$("div.xg_floating_container",dlg);
var vh=parseInt(dojo.html.getViewportHeight(),10);
_5c.style.height="auto";
_5c.style.overflow="visible";
var h=parseInt(_5c.offsetHeight,10);
if(h>vh*0.9){
_5c.style.height=parseInt(vh*0.9,10)+"px";
_5c.style.overflow="auto";
}
var drh=dojo.render.html;
_5c.style.marginTop=(drh.ie&&(drh.ie60||drh.ie55||drh.ie50)?0:-parseInt(_5c.offsetHeight/2,10))+"px";
},nl2br:function(s,_61){
s=s.replace(/\r\n/g,"\n");
result="";
dojo.lang.forEach(s.split("\n"),function(_62){
if(!_62.match(/<.?OBJECT\b|<.?EMBED\b|<.?PARAM\b|<.?APPLET\b|<.?IFRAME\b|<.?SCRIPT\b|<.?BR\b|<.?ADDRESS\b|<.?BLOCKQUOTE\b|<.?CENTER\b|<.?DIR\b|<.?DIV\b|<.?DL\b|<.?FIELDSET\b|<.?FORM\b|<.?H1\b|<.?H2\b|<.?H3\b|<.?H4\b|<.?H5\b|<.?H6\b|<.?HR\b|<.?ISINDEX\b|<.?MENU\b|<.?NOFRAMES\b|<.?NOSCRIPT\b|<.?OL\b|<.?P\b|<.?PRE\b|<.?TABLE\b|<.?UL\b|<.?DD\b|<.?DT\b|<.?FRAMESET\b|<.?LI\b|<.?TBODY\b|<.?TD\b|<.?TFOOT\b|<.?TH\b|<.?THEAD\b|<.?TR\b/i)){
if(_61){
result+="<p>"+_62+"</p>";
}else{
result+=_62+"<br />";
}
}else{
result+=_62;
}
result+="\n";
});
return dojo.string.trim(result).replace(/(<br \/>)+$/,"");
},showOverlay:function(){
var o=dojo.byId("xg_overlay");
if(o.style.display=="none"){
o.style.height=this.getPageHeight()+"px";
o.style.display="block";
}
xg.shared.util.chatAppletContainerVisible=x$("#appletContainer").css("visibility");
x$("#appletContainer").css("visibility","hidden");
},hideOverlay:function(){
if(xg.shared.util.ignoreOverlayHide==true){
return;
}
var o=dojo.byId("xg_overlay");
if(o.style.display!="none"){
o.style.display="none";
}
if(typeof xg.shared.util.chatAppletContainerVisible!="undefined"){
x$("#appletContainer").css("visibility",xg.shared.util.chatAppletContainerVisible);
}
},getPageHeight:function(){
var _65;
if(window.innerHeight&&window.scrollMaxY){
_65=window.innerHeight+window.scrollMaxY;
}else{
if(document.body.scrollHeight>document.body.offsetHeight){
_65=document.body.scrollHeight;
}else{
_65=document.body.offsetHeight;
}
}
var _66;
if(self.innerHeight){
_66=self.innerHeight;
}else{
if(document.documentElement&&document.documentElement.clientHeight){
_66=document.documentElement.clientHeight;
}else{
if(document.body){
_66=document.body.clientHeight;
}
}
}
if(_65<_66){
pageHeight=_66;
}else{
pageHeight=_65;
}
return pageHeight;
},setMaxLength:function(_67,_68){
x$(_67).bind("keypress",function(e){
var key=e.which||e.keyCode;
if(key!=8&&key!=46&&key!=37&&key!=39&&key!=38&&key!=40&&_67.value.length>=_68){
e.preventDefault();
}
});
},setAdvisableMaxLength:function(_6b,_6c,_6d,_6e,_6f,_70){
if(!_6e){
_6e=function(){
return _6b.value;
};
}
var _71=0,_72=_6b.parentNode,_73=function(){
if(_6e().length>_6c){
_6f.innerHTML=xg.shared.nls.text("messageIsTooLong",_6e().length,_6c);
dojo.html.addClass(_6f,"hint_textarea");
if(!_71){
dojo.html.addClass(_6b.parentNode,"error");
dojo.html.addClass(_6f,"error");
}
_71=1;
}else{
dojo.html.removeClass(_6f,"hint_textarea");
if(_71){
_6f.innerHTML=_6d||"";
dojo.html.removeClass(_6b.parentNode,"error");
dojo.html.removeClass(_6f,"error");
}
_71=0;
}
if(xg.shared.util.maxAdvisableLengthTimer!=null){
clearTimeout(xg.shared.util.maxAdvisableLengthTimer);
xg.shared.util.maxAdvisableLengthTimer=null;
}
};
if(!_6f){
_6f=document.createElement("small");
_6b.nextSibling?_72.insertBefore(_6f,_6b.nextSibling):_72.appendChild(_6f,_6b);
}
dojo.html.addClass(_6f,"maxlength_advisement");
_6f.innerHTML=_6d||"";
var _74=this.addOnChange(_6b,_73,_70);
return _74.trigger;
},maxAdvisableLengthTimer:null,setAdvisableMaxLengthWithCountdown:function(_75,_76,_77,_78){
var _79=0;
if("undefined"==typeof _77){
_77=dojo.dom.nextElement(_75,"span");
}
var _7a=_75.id+"_chars_left";
var _7b=dojo.byId(_7a);
var _7c=function(){
var n=_76-_75.value.replace(/\r\n/g,"\n").length;
if(!_78||n<0){
if(!_7b){
_7b=document.createElement("small");
x$(_7b).addClass("right");
_7b.id=_7a;
_77.appendChild(_7b);
}
}
if(_7b){
if(n>=0){
_7b.innerHTML="&nbsp;"+n;
}else{
_7b.innerHTML="&nbsp;-"+Math.abs(n);
}
}
if(_75.value.length>_76){
if(!_79){
dojo.html.addClass(_7b.parentNode,"simpleerrordesc");
}
_79=1;
}else{
if(_79){
dojo.html.removeClass(_7b.parentNode,"simpleerrordesc");
}
_79=0;
}
};
this.addOnChange(_75,_7c);
_7c();
return _7c;
},addOnChange:function(_7e,_7f,_80){
var _81=this.createQuiescenceTimer(_80||50,_7f);
dojo.event.connect(_7e,"onkeyup",_81.trigger);
dojo.event.connect(_7e,"onkeypress",_81.trigger);
dojo.event.connect(_7e,"onblur",_81.trigger);
dojo.event.connect(_7e,"oncut",_81.trigger);
dojo.event.connect(_7e,"onpaste",_81.trigger);
dojo.event.connect(_7e,"onchange",_81.trigger);
return _81;
},modalDialog:function(_82){
x$(".xg_floating_module").remove();
x$(".dy-modal").remove();
if((typeof _82)=="string"){
args={bodyHtml:_82};
}else{
args=_82;
}
var _83=args.wideDisplay?" dy-modal-wide":"";
var _84=args.title?"<h3>"+xg.qh(args.title)+"</h3>":"";
var _85=args.titleHtml?args.titleHtml:_84;
var _86=args.bodyHtml;
var _87=" <div> <div class=\"xg_floating_container dy-modal"+_83+"\">     <div class=\"dy-modal-close\">         <a class=\"xg_close xj_close\" href=\"#\">"+xg.shared.nls.text("close")+"</a>     </div>     <div class=\"module\"> "+_85+"         <div class=\"form\"> "+_86+"         </div>     </div> </div> </div>";
var _88=x$(_87)[0];
this.showOverlay();
xg.append(_88);
this.fixDialogPosition(_88);
if(args.noClose){
x$(".dy-modal-close",_88).hide();
}else{
x$(".xj_close",_88).click(function(_89){
_89.preventDefault();
if(x$(this).hasClass("disabled")){
return;
}
xg.shared.util.hideOverlay();
x$(_88).remove();
});
}
return _88;
},alert:function(_8a){
if(dojo.byId("xg_lightbox_alert")){
dojo.dom.removeNode(dojo.byId("xg_lightbox_alert"));
}
if((typeof _8a)=="string"){
args={bodyHtml:_8a};
}else{
args=_8a;
}
args.onOk=args.onOk?args.onOk:function(){
};
args.autoCloseTime=args.autoCloseTime?args.autoCloseTime:0;
if(!args.okButtonText){
args.okButtonText=xg.shared.nls.text("ok");
}
var _8b=args.wideDisplay?" xg_floating_container_wide":"";
var _8c=args.customDisplayClass?" "+args.customDisplayClass:"";
var _8d=args.title?"<h2>"+dojo.string.escape("html",args.title)+"</h2>":null;
var _8e=args.titleHtml?args.titleHtml:_8d;
var _8f=args.noHeader?args.noHeader:false;
var _90=dojo.string.trim("                 <div class=\"xg_floating_module\" id=\"xg_lightbox_alert\">                     <div class=\"xg_floating_container xg_lightborder xg_module"+_8b+_8c+"\">                         "+(_8f?"":"<div class=\"xg_module_head "+(_8e?"":"notitle")+"\">                             "+(_8e?_8e:"")+"                         </div>")+"                         <div class=\"xg_module_body\"> "+((args.bodyHtmlRaw)?(args.bodyHtmlRaw):("<p>"+args.bodyHtml+"</p>")));
if(args.autoCloseTime<1&&!args.noButtons){
_90+=dojo.string.trim("                             <p class=\"buttongroup\">                                 <input type=\"button\" class=\"button\" value=\""+dojo.string.escape("html",args.okButtonText)+"\" />                             </p>");
}
_90+=dojo.string.trim("                         </div>                     </div>                 </div>");
var _91=dojo.html.createNodesFromText(_90)[0];
this.showOverlay();
xg.append(_91);
this.fixDialogPosition(_91);
if(args.noClose||args.autoCloseTime<1){
if(!args.noButtons){
dojo.event.connect(dojo.html.getElementsByClass("button",_91)[0],"onclick",dojo.lang.hitch(this,function(_92){
dojo.event.browser.stopEvent(_92);
if(!args.noClose){
dojo.dom.removeNode(_91);
this.hideOverlay();
}
args.onOk(_91);
}));
}
}else{
setTimeout(dojo.lang.hitch(this,function(){
dojo.dom.removeNode(_91);
this.hideOverlay();
args.onOk(_91);
}),args.autoCloseTime);
}
return _91;
},progressDialog:function(_93){
if(dojo.byId("xg_lightbox_alert")){
dojo.dom.removeNode(dojo.byId("xg_lightbox_alert"));
}
var _94=dojo.string.trim("                 <div class=\"xg_floating_module\" id=\"xg_lightbox_alert\">                     <div class=\"xg_floating_container xg_lightborder\">                         <div class=\"xg_module_head "+(_93.title?"":"notitle")+"\">                             "+(_93.title?"<h2>"+dojo.string.escape("html",_93.title)+"</h2>":"")+"                         </div>                         <div class=\"xg_module_body\">                             <p class=\"spinner\">"+_93.bodyHtml+"</p>                         </div>                     </div>                 </div>");
var _95=dojo.html.createNodesFromText(_94)[0];
this.showOverlay();
xg.append(_95);
this.fixDialogPosition(_95);
return {hide:dojo.lang.hitch(this,function(){
dojo.dom.removeNode(_95);
this.hideOverlay();
})};
},showDialogAndRedirect:function(_96){
if(dojo.byId("xg_lightbox_alert")){
dojo.dom.removeNode(dojo.byId("xg_lightbox_alert"));
}
var _97=dojo.string.trim("                 <div class=\"xg_floating_module\" id=\"xg_lightbox_alert\">                     <div class=\"xg_floating_container xg_lightborder\">                         <div class=\"xg_module_head "+(_96.title?"":"notitle")+"\">                             "+(_96.title?"<h2>"+dojo.string.escape("html",_96.title)+"</h2>":"")+"                         </div>                         <div class=\"xg_module_body\">                             <p>"+_96.bodyHtml+"</p>                         </div>                     </div>                 </div>");
var _98=dojo.html.createNodesFromText(_97)[0];
this.showOverlay();
xg.append(_98);
window.location=_96.target;
},confirm:function(_99){
_99.title=_99.title?_99.title:xg.shared.nls.text("confirmation");
_99.okButtonText=_99.okButtonText?_99.okButtonText:xg.shared.nls.text("ok");
if(!_99.cancelButtonText){
_99.cancelButtonText=xg.shared.nls.html("cancel");
}
_99.onOk=_99.onOk?_99.onOk:function(){
};
_99.onCancel=_99.onCancel?_99.onCancel:function(){
};
if(_99.bodyText){
_99.bodyHtml="<p>"+dojo.string.escape("html",_99.bodyText)+"</p>";
}
var _9a=_99.wideDisplay?" xg_floating_container_wide":"";
var _9b=dojo.html.createNodesFromText(dojo.string.trim("                <div class=\"xg_floating_module\">                     <div class=\"xg_floating_container xg_lightborder"+_9a+"\">                         <div class=\"xg_module_head\">                             <h2>"+((_99.titleHtml)?(_99.titleHtml):(dojo.string.escape("html",_99.title)))+"</h2>                         </div>                         <div class=\"xg_module_body\">                             <form>                                 <input type=\"hidden\" name=\"xg_token\" value=\""+xg.token+"\" />                                  "+_99.bodyHtml+"                                  <p class=\"buttongroup\">                                      <input type=\"submit\" class=\"button action-primary\" value=\""+dojo.string.escape("html",_99.okButtonText)+"\"/> "+(_99.extraButton&&_99.extraButton.title?"<a class=\"xj_custom action-secondary\" href=\"#\">"+_99.extraButton.title+"</a> ":"")+("<a class=\"xj_cancel action-secondary\" href=\"#\">"+_99.cancelButtonText+"</a>")+"</p>                             </form>                         </div>                     </div>                 </div>"))[0];
if(!_99.noOverlay){
this.showOverlay();
}
xg.append(_9b);
this.fixDialogPosition(_9b);
var _9c="<iframe id=\"confirm_iframe\" src=\"about:blank\" scrolling=\"no\" frameborder=\"0\" />";
var _9d=this.getPositionedAndSizedIframe(_9c,_9b).appendTo("body");
var _9e=function(){
dojo.dom.removeNode(_9d[0]);
};
this.applyStyleArgsToDialog(_99,_9b);
this.applyStyleArgsToDialog(_99,_9d,_9b);
xg.listen(xg.$(".xj_cancel",_9b),"onclick",this,function(_9f){
xg.stop(_9f);
xg.shared.util.hideOverlay();
_9e();
dojo.dom.removeNode(_9b);
if(_99.onCancel){
_99.onCancel(_9b);
}
});
if(_99.extraButton&&_99.extraButton.title){
xg.listen(xg.$(".xj_custom",_9b),"onclick",this,function(){
xg.shared.util.hideOverlay();
_9e();
dojo.dom.removeNode(_9b);
if(_99.extraButton.onClick){
_99.extraButton.onClick(_9b);
}
});
}
xg.listen(xg.$("form",_9b),"onsubmit",this,function(_a0){
xg.stop(_a0);
if(_99.closeOnlyIfOnOk){
if(_99.onOk(_9b)){
xg.shared.util.hideOverlay();
_9e();
dojo.style.hide(_9b);
}
}else{
xg.shared.util.hideOverlay();
_9e();
dojo.style.hide(_9b);
_99.onOk(_9b);
}
});
return _9b;
},getPositionedAndSizedIframe:function(_a1,_a2){
var _a3=x$(".xg_floating_container",_a2);
var _a4=x$(_a1).css({"position":"fixed","top":"50%","left":"50%","filter":"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)","width":_a3.outerWidth(),"height":_a3.outerHeight()-2,"margin-left":-(_a3.outerWidth()/2)+7,"margin-top":-(_a3.outerHeight()/2),"z-index":_a3.parent().css("z-index")-1});
return _a4;
},dropdownMenu:function(_a5){
var _a6=_a5.hideDelay?_a5.hideDelay:1000;
var _a7=x$(_a5.srcNode);
var _a8=x$(_a5.menuNode);
var _a9=_a5.srcActiveClass?_a5.srcActiveClass:"";
var _aa=_a5.offsetX?parseInt(_a5.offsetX,10):0;
var _ab=_a5.offsetY?parseInt(_a5.offsetY,10):0;
var _ac=_a5.zIndex?_a5.zIndex:"100";
if(_a5.removeExisting){
x$(".dropdown_menu").remove();
}
_a7.addClass("dropdown_link");
_a8.addClass("xg_floating_container dropdown_menu");
if(!_a7.find(".downarrow")[0]){
_a7.append("<span class=\"downarrow xg_sprite xg_sprite-caret-down xg_lightborder\">&#9660;</span>");
}
if(x$("#xg_themebody").length>0){
if(!_a8.parent().is("#xg_themebody")){
_a8.appendTo("#xg_themebody");
}
}else{
if(!_a8.parent().is("body")){
_a8.appendTo("body");
}
}
_a8.hide();
var _ad=function(){
_a8.hide();
_a7.removeClass(_a9);
};
var _ae=function(_af){
if(_a8[0].timer){
clearTimeout(_a8[0].timer);
_a8[0].timer=null;
}
if(_a8.is(":visible")){
return;
}
x$(".dropdown_menu").hide();
var o=_a7.offset();
_a7.addClass(_a9);
_a8.css({"z-index":_ac,"position":"absolute","top":(o.top+_a7.outerHeight())+"px"});
if(_a5.align=="right"){
_a8.css({"right":(o.left+_a7.width()-_aa)+"px"});
}else{
_a8.css({"left":(o.left+_aa)+"px"});
}
_a8.show();
if(_af=="hover"){
_a8.mouseout(function(_b1){
if(_b1.relatedTarget==_a7[0]){
return;
}
this.timer=setTimeout(function(){
_ad();
},_a5.hideDelay);
});
_a8.mouseover(function(_b2){
if(this.timer){
clearTimeout(this.timer);
this.timer=null;
}
});
}
if(_af=="click"){
var _b3=true;
var _b4=function(_b5){
if(_b3){
_b3=false;
return;
}
var _b6=x$(_b5.target);
if(_b6.hasClass("dropdown_menu")||_b6.parents(".dropdown_menu")[0]){
return;
}
x$("body").unbind("click",_b4);
_ad();
};
x$("body").click(_b4);
}
};
if(_a5.showOnClick){
_a7.click(function(_b7){
_b7.preventDefault();
_ae("click");
});
}
if(_a5.showOnHover){
_a7.mouseover(function(_b8){
_ae("hover");
});
}
},closeDropdownMenu:function(){
x$("body").click();
},applyStyleArgsToDialog:function(_b9,_ba,_bb){
var css=[];
var _bd=["position","top","left","bottom","right","margin-top","margin-left","margin-bottom","margin-right"];
if(_bb==null){
_bb=_ba;
}
var _be=x$(".xg_floating_container",_ba);
for(var i=0;i<_bd.length;i++){
var _c0=_bd[i];
if(_b9[_c0]){
css[_c0]=typeof (_b9[_c0])=="function"?_b9[_c0](_be):_b9[_c0];
}
}
x$(_ba).css(css);
},promptToJoin:function(_c1,_c2,_c3,_c4,_c5,_c6,_c7){
if(typeof _c2=="function"){
_c3=_c2;
_c2=false;
}
if(_c2){
this.promptIsPending();
return;
}
if(this.joined||!_c1){
_c3();
return;
}
var _c8="joinNow";
_c6=_c6||"signUp";
if(_c7===false&&_c6==="signUp"){
_c5=true;
_c3=_c4;
_c8="signIn";
_c6="signIn";
}else{
_c5=_c5||{title:xg.shared.nls.text("signIn"),onClick:dojo.lang.hitch(this,function(){
this.joined=true;
_c4();
})};
}
if(xg.shared.util.showPaywallIfPresent()){
return;
}
xg.shared.util.confirm({title:xg.shared.nls.text(_c8),bodyHtml:"<p>"+dojo.string.escape("html",_c1)+"</p>",okButtonText:xg.shared.nls.text(_c6),onOk:dojo.lang.hitch(this,function(){
this.joined=true;
_c3();
}),extraButton:_c5});
},showPaywallIfPresent:function(_c9){
var _ca=((_c9)&&(_c9.noClose));
var xep=x$("#xj_extra_paywall");
var xjp=x$("#xj_paywall");
var _cd=function(){
var _ce=xjp.html();
if(!_ce){
return;
}
var _cf="<h2>"+xjp.attr("data-title")+"</h2>";
if(!_ca){
_cf="<a class=\"xg_icon xg_icon-close xj_close\" href=\"#\">"+xg.shared.nls.html("close")+"</a>"+_cf;
}
var _d0={"bodyHtmlRaw":_ce,"titleHtml":_cf,"customDisplayClass":"xg_floating_paywall","noClose":_ca,"noButtons":true};
xjp.remove();
var dlg=xg.shared.util.alert(_d0);
if(!_ca){
x$(dlg).find(".xj_close").click(function(_d2){
_d2.preventDefault();
x$(dlg).remove();
xg.shared.util.hideOverlay();
x$("body").append(xjp);
});
}
return dlg;
};
var _d3=function(){
var _d4=xep.html();
if(!_d4){
return;
}
var _d5="<h2>"+xep.attr("data-title")+"</h2>";
var _d6=xep.attr("data-sign-in-url");
if(_d6){
_d5="<div class=\"dy-right sign-in\"><h2>"+xg.shared.nls.html("alreadyMemberSignIn"," href=\""+_d6+"\"")+"</h2></div>"+_d5;
}
var _d7={"bodyHtmlRaw":_d4,"titleHtml":_d5,"wideDisplay":true,"customDisplayClass":"xg_prepaywall","noClose":_ca,"noButtons":true};
xep.remove();
var dlg=xg.shared.util.alert(_d7);
x$(dlg).find(".xj_continue").click(function(_d9){
x$(dlg).remove();
x$("body").append(xep);
_cd();
});
if(_ca){
x$(dlg).find(".xj_close").remove();
}else{
x$(dlg).find(".xj_close").click(function(_da){
_da.preventDefault();
x$(dlg).remove();
xg.shared.util.hideOverlay();
x$("body").append(xep);
});
}
return dlg;
};
var _db=_d3();
if(_db){
return _db;
}
return _cd();
},promptIsPending:function(){
xg.shared.util.alert({title:xg.shared.nls.text("pendingPromptTitle"),bodyHtml:"<p>"+xg.shared.nls.html("youCanDoThis")+"</p>"});
},selectOnClick:function(_dc){
dojo.event.connect(_dc,"onfocus",function(_dd){
dojo.html.selectInputText(_dc);
});
dojo.event.connect(_dc,"onclick",function(_de){
dojo.html.selectInputText(_dc);
});
var _df=_dc.value;
dojo.event.connect(_dc,"onkeyup",function(_e0){
dojo.html.selectInputText(_dc);
_dc.value=_df;
});
},preventEnterFromSubmittingForm:function(_e1,_e2){
if(!_e2){
_e2=function(){
};
}
dojo.event.connect(_e1,"onkeydown",function(_e3){
if(_e3.keyCode==13){
dojo.event.browser.stopEvent(_e3);
_e2();
}
});
},setPlaceholder:function(_e4,_e5){
if(_e4.value!=""){
return;
}
_e4.value=_e5;
dojo.event.connect(_e4,"onfocus",function(_e6){
if(_e4.value==_e5){
_e4.value="";
}
});
dojo.event.connect(_e4,"onblur",function(_e7){
if(_e4.value==""){
_e4.value=_e5;
}
});
dojo.event.connect(_e4.form,"onsubmit",function(_e8){
if(_e4.value==_e5){
_e4.value="";
}
});
},createCsrfTokenHiddenInput:function(){
var _e9=document.createElement("input");
_e9.type="hidden";
_e9.name="xg_token";
_e9.value=xg.token;
return _e9;
},crc32:function(_ea){
var _eb="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var n,x,crc=0;
crc=crc^(-1);
for(var i=0;i<_ea.length;i++){
n=(crc^_ea.charCodeAt(i))&255;
x="0x"+_eb.substr(n*9,8);
crc=(crc>>>8)^x;
}
crc=crc^(-1);
if(crc<0){
crc+=Math.pow(2,32);
}
return crc;
},cdn:function(url,_f1){
var _f2;
if(xg.useMultiCdn){
var _f3;
var _f4=url.match(/^https?:\/\/([^\/]+)([^?]+)?/);
if(_f4&&(_f4.length>1)){
fullHost=_f4[1];
var _f5=fullHost.split(".");
_f3=_f5[0];
}else{
_f3=xg.cdnDefaultPolicyHost;
}
var ext=false;
var _f7=_f4&&(_f4.length>2)?_f4[2]:url;
var _f8=_f7.match(/\.([^\/.]+)$/);
if(_f8&&(_f8.length>1)){
ext=_f8[1];
}
var _f9=[];
if(_f3 in xg.cdnPolicy){
for(var _fa in xg.cdnPolicy[_f3]){
var _fb=xg.cdnPolicy[_f3][_fa];
if(ext&&(_fa=="ext")&&dojo.lang.inArray(_fb[0],ext)){
_f9=_fb[1];
break;
}else{
if(_fa=="type"){
}else{
if(_fa=="default"){
_f9=_fb;
break;
}
}
}
}
}else{
_f9.push(xg.cdnHost);
}
var _fc=_f9.length;
var _fd;
if(_fc>1){
_fd=_f9[this.crc32(_f7)%_fc];
}else{
_fd=_f9[0];
}
_f2=url.match(/^https?:\/\//)?url.replace(/^https?:\/\/[^\/]+/,"http://"+_fd):"http://"+_fd+url;
_f2=_f2.replace(/\/xn_resources\/widgets/,"/"+xg.staticRoot+"/widgets");
_f2=_f2.replace(/\/xn_resources\//,"/"+ning.CurrentApp.id+"/");
}else{
_f2=url.replace(/.*\/xn_resources\/widgets(.*)/,(xg.cdnHost?("http://"+xg.cdnHost):xg.cdn)+"/"+xg.staticRoot+"/widgets"+"$1");
_f2=_f2.replace(/.*\/xn_resources(.*)/,(xg.cdnHost?("http://"+xg.cdnHost):xg.cdn)+"/"+ning.CurrentApp.id+"$1");
}
if(url!==_f2&&_f1!==false){
_f2=this.addParameter(_f2,"xn_version",xg.version);
}
return _f2;
},getParameter:function(url,_ff){
url=url+"";
var _100=url.split("?",2);
if(_100[1]){
var _101=_100[1].split("&");
for(var i=0;i<_101.length;i++){
var data=_101[i].split("=",2);
if(data[0]==_ff){
return data[1];
}
}
}
return null;
},removeParameter:function(url,name){
url=url+"";
var _106=url.split("?",2);
if(_106[1]){
var _107=_106[1].split("&");
var _108=[];
for(var i=0;i<_107.length;i++){
var data=_107[i].split("=",2);
if(data[0]!=name){
_108.push(_107[i]);
}
}
if(_108.length>0){
_106[1]=_108.join("&");
return _106.join("?");
}else{
return _106[0];
}
}else{
return url;
}
},addParameter:function(url,name,_10d){
url=xg.shared.util.removeParameter(url,name);
var _10e=url.indexOf("?")>-1?"&":"?";
return url+_10e+encodeURIComponent(name)+"="+encodeURIComponent(_10d);
},addParameterString:function(url,_110){
url=url+"";
var _111=url.indexOf("?")>-1?"&":"?";
return url+_111+_110;
},parseFormattedNumber:function(_112){
if(_112){
var _113=_112.replace(/\D+/g,"");
return parseInt(_113,10);
}
return NaN;
},parseFormattedFloat:function(_114,_115){
if(_114!==""){
if(!_115){
_115=xg.num_decimal_sep;
}
var re=new RegExp("[^0-9\\-\\"+_115+"]+","g");
var _117=_114.replace(re,"").replace(_115,".");
return parseFloat(_117);
}
return NaN;
},roundFloat:function(_118,_119){
if(parseFloat(_118)===NaN){
return NaN;
}
if(parseInt(_119,10)===NaN){
_119=0;
}
return Math.round(_118*Math.pow(10,_119))/Math.pow(10,_119);
},formatNumber:function(_11a,_11b){
var sep=_11b||xg.num_thousand_sep||",";
if((_11a<1000)&&(_11a>-1000)){
return _11a+"";
}
var _11d=_11a<0;
_11a=Math.abs(_11a)+"";
var _11e=_11a.length;
var _11f=(3-(_11e%3))%3;
var _120="";
for(i=0;i<_11e;i++){
_120+=_11a.charAt(i);
_11f=(_11f+1)%3;
if((_11f==0)&&(i<_11e-1)){
_120+=sep;
}
}
return _11d?"-"+_120:_120;
},formatFloat:function(_121,_122,_123,_124){
_122=_122||xg.num_decimal_sep||".";
_123=_123||xg.num_thousand_sep||",";
var _125=(""+_121).split(".",2);
var _126=parseInt(_125[0]);
var _127=_125.length>1?_125[1]:"0";
var num=xg.shared.util.formatNumber(_126,_123);
var dec;
if(_124===undefined){
dec=_122+_127;
}else{
if(_124===0){
dec="";
}else{
var rem=_124-_127.length;
if(rem>0){
_127=_127+(Array(rem+1).join("0"));
}
dec=_122+""+_127.substr(0,_124);
}
}
return num+""+dec;
},createQuiescenceTimer:function(_12b,_12c){
var _12d=0;
return {trigger:function(){
_12d++;
var _12e=_12d;
window.setTimeout(function(){
if(_12e==_12d){
_12c();
}
},_12b);
}};
},setCookie:function(name,_130,_131,_132){
var _133=null;
if(_131){
var now=new Date();
_133=new Date();
var _135=24*60*60*1000;
_133.setTime(now.getTime()+(_135*_131));
}
document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(_130)+"; path=/"+(_133?"; expires="+_133.toGMTString():"")+(_132?"; domain="+_132:"");
},getCookie:function(name){
var _137=document.cookie.indexOf(name+"=");
var len=_137+name.length+1;
if((!_137)&&(name!=document.cookie.substring(0,name.length))){
return null;
}
if(_137==-1){
return null;
}
var end=document.cookie.indexOf(";",len);
if(end==-1){
end=document.cookie.length;
}
return decodeURIComponent(document.cookie.substring(len,end));
},addHint:function(_13a,hint){
var _13c=x$(_13a);
if(_13c.attr("value")==""){
_13c.attr("value",hint).addClass("hint");
}
_13c.focus(function(){
if(this.value==hint){
x$(this).attr("value","").removeClass("hint");
}
}).blur(function(){
if(this.value==""){
x$(this).attr("value",hint).addClass("hint");
}
});
},addHints:function(_13d,_13e,hint){
_13e=_13e||false;
hint=hint||"";
x$(_13d).each(function(){
xg.shared.util.addHint(this,_13e?x$(this).attr("_hint"):hint);
});
},setMaxLengthWithCount:function(_140,_141,_142,args){
if(_140&&_141){
if(!args){
args={};
}
var _144="enforceMaxLength" in args?args.enforceMaxLength:false;
var _145="negativeCountClass" in args?args.negativeCountClass:"length-exceeded";
var _146=("onNegative" in args)&&(typeof args.onNegative=="function")?args.onNegative:false;
var _147=("onNonNegative" in args)&&(typeof args.onNonNegative=="function")?args.onNonNegative:false;
var _148=("neverHideCount" in args)&&args.neverHideCount;
var _149=function(_14a,_14b,_14c,_14d,_14e){
var _14f=x$(_14a).val().length;
if(_14d&&(_14f>_14c)){
x$(_14a).val(x$(_14a).val().substr(0,_14c));
_14f=_14c;
}
if(_14e.length>0){
if(_14f>_14c){
x$(_14b).addClass(_14e);
}else{
x$(_14b).removeClass(_14e);
}
}
var _150=parseInt(x$(_14b).html(),10);
var _151=_14c-_14f;
if((_150>=0)&&(_151<0)&&_146){
_146.call();
}else{
if((_150<0)&&(_151>=0)&&_147){
_147.call();
}
}
x$(_14b).text(args.showCharsLabel?xg.shared.nls.text("nChars",_151):_151);
};
x$(_140).bind("keyup keypress blur cut paste change",function(_152){
var key=_152.which||_152.keyCode;
if(_144&&(x$(_140).val().length>=_142)&&(key!=8)){
_152.preventDefault();
}
if(!x$(_141).attr("_noUpdate")){
_149(_140,_141,_142,_144,_145);
}
});
x$(_140).bind("focus",function(_154){
x$(_141).css("visibility","visible");
});
x$(_140).bind("blur",function(_155){
if((x$(_140).val().length<_142)&&!_148){
x$(_141).css("visibility","hidden");
}
});
}
},postSynchronously:function(url,_157,_158){
_157=_157||{};
_157.xg_token=xg.token;
var form=x$("<form method=\"post\"></form>").attr("action",url);
if(_158){
form.attr("target",_158);
}
for(name in _157){
form.append(x$("<input type=\"hidden\"/>").attr("name",name).attr("value",_157[name]));
}
xg.append(form[0]);
form[0].submit();
},track:function(_15a,page,_15c,_15d,_15e,_15f){
xn.track.pageView(10,_15a+"-"+page+"-"+_15c+(_15d?"-"+_15d:""),_15e,{},_15f);
},clickTrack:function(){
},redirectToUrl:function(url){
if(url!="#"){
window.location=url;
}
},closest:function(_161,_162){
while(_161.length>=1){
if(_161.is(_162)){
return _161;
}
_161=_161.parent();
}
return _161;
},consoleLog:function(msg){
if(window.console&&console.log){
console.log(msg);
}
},getModule:function(el){
return x$(el).parents(".xg_module")[0];
},extractModuleName:function(_165){
if(!_165||!x$(_165).attr("data-module_name")){
return "other";
}else{
return x$(_165).attr("data-module_name");
}
}};
}
if(!dojo.hostenv.findModule("xg.mobile.PageInit",false)){
dojo.provide("xg.mobile.PageInit");
xg.mobile.PageInit=(function(){
var _1={};
_1.addListener=function(_2,_3){
if(xg.firstPageInitialized&&xg.firstPageInitialized.is(_2)){
_3(xg.firstPageInitialized);
}
x$(document).on("pageinit",_2,function(){
_3(x$(this));
});
};
return _1;
})();
}
if(!dojo.hostenv.findModule("xg.mobile.PageShow",false)){
dojo.provide("xg.mobile.PageShow");
xg.mobile.PageShow=(function(){
var _1={};
_1.addListenerToPage=function(_2,_3){
if(xg.firstPageShown&&xg.firstPageShown[0]===_2[0]){
_3(_2);
}
_2.on("pageshow",function(){
_3(_2);
});
};
return _1;
})();
}
if(!dojo.hostenv.findModule("xg.mobile.scaletext",false)){
dojo.provide("xg.mobile.scaletext");
(function($){
$.fn.scaletext=function(_2){
var _3={maxFontSize:100,minFontSize:6,allowScalingUp:true,allowScalingDown:false,fudgeFactor:0.98,overflow:"hidden",wrapClass:"wrapped"};
_2=$.extend(_3,_2||{});
return this.each(function(){
var _4=$(this);
var _5=_4.children(".scaled-text-scaled");
if(!_5.length){
_4.wrapInner("<div class=\"scaled-text-scaled\" />");
_5=$(_4.children()[0]);
}
function scaleTheText(){
_5.attr("style","").removeClass(_2.wrapClass);
_5.css({display:"inline-block",whiteSpace:"nowrap",verticalAlign:"top"});
var _6=_4.width();
var _7=_5.width();
var _8=parseFloat(_5.css("font-size"));
var _9=Math.floor(_2.fudgeFactor*_8*_6/_7);
if(_2.allowScalingUp){
_9=Math.min(_9,_2.maxFontSize);
}else{
_9=Math.min(_9,_8);
}
var _a=_2.allowScalingDown?_2.minFontSize:_8;
_9=Math.max(_9,_a);
var _b=false;
if(_9!=_8){
_5.css("font-size",_9+"px");
_b=true;
}
while(_9>_a&&_5.width()>_6){
_9-=1;
_5.css("font-size",_9==_8?"":_9+"px");
_b=true;
}
if(_5.width()>_6){
switch(_2.overflow){
case "wrap":
_5.css({display:"block",whiteSpace:"normal"}).addClass(_2.wrapClass);
break;
case "ellipsis":
_5.css({maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis"});
break;
case "hidden":
default:
_5.css({maxWidth:"100%",overflow:"hidden"});
break;
}
}
if(_b){
_4.triggerHandler("scaletext.sizeChanged");
}
}
scaleTheText();
$(window).resize(scaleTheText);
});
};
})(x$);
}
if(!dojo.hostenv.findModule("xg.mobile.mobileHeader",false)){
dojo.provide("xg.mobile.mobileHeader");
xg.mobile.mobileHeader=function(_1){
var _={};
_.DELAY_BEFORE_HIDING_MENU=1500;
_.menuOpen=false;
_.initialize=function(){
_.initializeMenu();
_.initializeTitleScaling();
_.pinActionBar();
_.fixChromeAvatarIssue();
};
_.initializeMenu=function(){
var _3=_1.find(".menu .panel");
_1.find(".menu > button").bind("click",function(_4){
_4.stopPropagation();
_.preloadSignInPage();
_.toggleMenu(!_.menuOpen);
});
_1.bind("click",function(){
_.toggleMenu(false);
});
_1.find(".masthead").on("vclick",function(){
xg.changePage("/m");
});
};
_.preloadSignInPage=function(){
var _5=_1.find(".menu a.sign-in");
if(_5.length>0){
xg.loadPage(_5.attr("href"));
}
};
_.toggleMenu=function(_6){
var _7=_1.find(".menu .panel");
if(_6&&!_.menuOpen){
_7.data("transparent",false);
_7.show();
_7.height("auto");
_7.height(_7.height());
_7.css("opacity",1);
_.menuOpen=true;
}else{
if(!_6&&_.menuOpen){
_7.data("transparent",true);
_7.height(0);
_7.css("opacity",0);
setTimeout(function(){
if(_7.data("transparent")){
_7.hide();
}
},_.DELAY_BEFORE_HIDING_MENU);
_.menuOpen=false;
}
}
};
_.initializeTitleScaling=function(){
xg.mobile.PageShow.addListenerToPage(_1,function(){
if(_1.data("titleScalingInitialized")){
return;
}
_1.data("titleScalingInitialized",true);
var _8=_1.find(".masthead h1");
_8.on("scaletext.sizeChanged",function(){
xg.shared.util.setCookie("mobile-h1-size",_8.find(".scaled-text-scaled").css("font-size"),999);
});
_8.scaletext({maxFontSize:24});
_8.find(".scaled-text-scaled").css("visibility","visible");
});
};
_.fixChromeAvatarIssue=function(){
_1.removeAttr("tabindex");
};
_.pinActionBar=function(){
xg.actionBarPinned=_.isActionBarPinningSupported();
_1.find(".actionBarContainer").toggleClass("fixed-bottom",xg.actionBarPinned).css("visibility","visible");
_1.find(".page-body").toggleClass("with-pinned-action-bar",xg.actionBarPinned);
};
_.isActionBarPinningSupported=function(){
var ua=navigator.userAgent;
var _a=navigator.platform;
var _b=ua.match(/AppleWebKit\/([0-9]+(\.[0-9]+)?)/);
var _c=_b?parseFloat(_b[1]):0;
if((_a.indexOf("iPhone")>-1||_a.indexOf("iPad")>-1||_a.indexOf("iPod")>-1)){
return _c&&_c>=534;
}else{
if(ua.indexOf("Android")>-1){
return _c&&_c>=534.13;
}
}
return false;
};
_.initialize();
};
xg.mobile.PageInit.addListener(".page",function(_d){
xg.mobile.mobileHeader(_d);
});
}
if(!dojo.hostenv.findModule("xg.mobile.Tracker",false)){
dojo.provide("xg.mobile.Tracker");
xg.mobile.Tracker=function(_1){
var _={};
_.initialize=function(){
xg.mobile.PageShow.addListenerToPage(_1,function(){
if(!xg.mobile.Tracker.firstPageShown){
xg.mobile.Tracker.firstPageShown=true;
return;
}
if(xg.tg){
xg.tg();
}
});
};
_.initialize();
};
xg.mobile.PageInit.addListener(".page",function(_3){
xg.mobile.Tracker(_3);
});
}
if(!dojo.hostenv.findModule("xg.mobile.DetectScrollToBottom",false)){
dojo.provide("xg.mobile.DetectScrollToBottom");
xg.mobile.DetectScrollToBottom=(function(){
var _1={};
var _={};
_.THRESHOLD=10;
_.initialize=function(){
$win=x$(window);
$win.bind("scroll",function(e){
_.detectScrollToBottom(e,$win);
});
};
_1.addListener=function(_4,_5){
var _6=function(){
if(x$.mobile.activePage[0]===_4[0]){
_5();
}
};
x$(window).bind("scrolledToBottom",_6);
_4.bind("pageremove",function(){
x$(window).unbind("scrolledToBottom",_6);
});
};
_.detectScrollToBottom=function(e,_8){
if(_.isAtBottom(e,_8)){
_8.trigger("scrolledToBottom");
}
};
_.isAtBottom=function(e,_a){
var _b=_a.scrollTop();
var _c=x$.mobile.activePage.height();
var _d;
_d=_a.get(0).innerHeight;
if(!_d){
_d=_a.height();
}
if(_b>=_c-_d-_.THRESHOLD){
return true;
}
return false;
};
xg.addOnRequire(function(){
_.initialize();
});
return _1;
})();
}
if(!dojo.hostenv.findModule("xg.mobile.Form",false)){
dojo.provide("xg.mobile.Form");
xg.mobile.Form=(function(){
var _1={};
var _={};
_1.showLabelsIfPlaceholdersNotSupported=function(_3){
if(!("placeholder" in document.createElement("input"))){
_3.find("label").removeClass("ui-hidden-accessible");
}
};
_1.scrollToBottom=function(){
setTimeout(function(){
window.scrollTo(0,document.body.scrollHeight);
},1);
};
_1.isFileUploadingSupported=function(){
if(!!(window.File&&window.FileList&&window.FileReader)){
return true;
}
var ua=window.navigator.userAgent;
if(_.isAndroidWithFileUpload(ua)){
return true;
}
if(_.isSafari(ua)){
return true;
}
if(_.isInternetExplorer(ua)){
return true;
}
return false;
};
_.isAndroidWithFileUpload=function(ua){
var _6=/Android ([\d\.]+);/;
var _7=_6.exec(ua);
return (_7&&2<=parseFloat(_7[1]));
};
_.isInternetExplorer=function(ua){
var ie=/MSIE [\d\.]+;/;
var _a=/ZuneWP\d/;
if(!ie.exec(ua)){
return false;
}
if(-1!==ua.indexOf("Windows Phone")){
return false;
}
if(_a.exec(ua)){
return false;
}
return true;
};
_.isSafari=function(ua){
if(-1===ua.indexOf("Safari")){
return false;
}
if(-1!==ua.indexOf("iPhone")||-1!==ua.indexOf("Android")){
return false;
}
return true;
};
return _1;
})();
}
if(!dojo.hostenv.findModule("xg.shared.googleAnalytics",false)){
dojo.provide("xg.shared.googleAnalytics");
xg.shared.googleAnalytics=(function(){
var _={};
var _2={};
_2.trackPageview=function(_3){
if(typeof ning_gaq!="undefined"&&ning_gaq){
ning_gaq.push(["_ning_ga._trackPageview",_3]);
}
};
return _2;
})();
}
if(!dojo.hostenv.findModule("xg.shared.CookieStore",false)){
dojo.provide("xg.shared.CookieStore");
xg.shared.CookieStore=(function(){
var _1={};
var _={};
var _3="xg_sc";
var _4="xg_pc";
var _5=366;
var _6={};
var _7={};
_.initialize=function(){
_1.reloadSessionCookie();
_1.reloadPersistentCookie();
};
_1.reloadSessionCookie=function(){
var _8=xg.shared.util.getCookie(_3);
if(_8){
try{
_6=x$.evalJSON(_8);
}
catch(e){
try{
_6=x$.evalJSON(decodeURIComponent(_8.replace(/\+/g," ")));
}
catch(e){
}
}
}
if(_6 instanceof Array){
_6={};
}
};
_1.reloadPersistentCookie=function(){
var _9=xg.shared.util.getCookie(_4);
if(_9){
try{
_7=x$.evalJSON(_9);
}
catch(e){
try{
_7=x$.evalJSON(decodeURIComponent(_9.replace(/\+/g," ")));
}
catch(e){
}
}
}
if(_7 instanceof Array){
_7={};
}
};
_1.setSessionCookieValue=function(_a,_b){
if(_b===null||_b.length===0){
delete _6[_a];
}else{
_6[_a]=_b;
}
_.setCookieProper(_3,x$.toJSON(_6),0);
};
_1.getSessionCookieValue=function(_c){
return _6[_c];
};
_1.setPersistentCookieValue=function(_d,_e){
if(_e===null||_e.length===0){
delete _7[_d];
}else{
_7[_d]=_e;
}
_.setCookieProper(_4,x$.toJSON(_7),_5);
};
_1.getPersistentCookieValue=function(_f){
return _7[_f];
};
_.setCookieProper=function(_10,_11,_12){
xg.shared.util.setCookie(_10,_11,_12,"."+window.location.hostname);
};
xg.addOnRequire(function(){
_.initialize();
});
return _1;
})();
}
if(!dojo.hostenv.findModule("xg.shared.EngagementUtil",false)){
dojo.provide("xg.shared.EngagementUtil");
xg.shared.EngagementUtil={addEngagementContextToParams:function(_1,_2){
var _3=x$(_2).attr("data-page-type");
if(_3){
_1["pageType"]=_3;
if(_3=="main"||_3=="profile"||_3=="group"){
var _4=xg.shared.util.getModule(_2);
var _5=_4?xg.shared.util.extractModuleName(_4):"";
if(_5){
_1["moduleName"]=_5;
}
}
}
return _1;
}};
}
if(!dojo.hostenv.findModule("xg.index.like.likeLink",false)){
dojo.provide("xg.index.like.likeLink");
xg.index.like.likeLink=function(_1){
var _2={};
var _={};
var _4="like";
var _5=false;
_.initialize=function(){
_1.on("click",".like-link",_.clickLink);
_.processPendingLike();
};
_.processPendingLike=function(){
var _6=xg.shared.CookieStore.getSessionCookieValue(_4);
xg.shared.CookieStore.setSessionCookieValue(_4,null);
if(!ning.CurrentProfile||!_6){
return;
}
x$(".like-link").each(function(){
$likeLink=x$(this);
if($likeLink.data("contentId")===_6){
_.postLike($likeLink,true);
}
});
};
_.clickLink=function(_7){
_7.preventDefault();
$likeLink=x$(this);
if(!ning.CurrentProfile){
xg.shared.CookieStore.setSessionCookieValue(_4,$likeLink.data("contentId"));
window.location.href=$likeLink.data("signUpUrl");
return;
}
_.postLike($likeLink,!$likeLink.hasClass("liked"));
};
_.postLike=function(_8,_9){
if(_5){
return;
}
_5=true;
var _a=xg.shared.EngagementUtil.addEngagementContextToParams({contentId:_8.data("contentId")},_8);
_a["logLike"]=_8.data("logLike");
var _b=_8.data("likeUrl");
var _c=_8.data("unlikeUrl");
xg.post(_9?_b:_c,_a,function(_d,_e){
_5=false;
_.ajaxCallback(_e,_8);
});
var _f=_9?"/like/ning/create/":"/like/ning/delete/";
xg.shared.googleAnalytics.trackPageview(_f+_8.data("contentType")+"/"+_8.data("contentId"));
};
_.ajaxCallback=function(_10,_11){
if(_10.success){
_11.find(".value").html(""+_10.likeCount);
_11.find(".details").html(""+_10.likeDescriptor);
_11.toggleClass("liked");
_11.find(".change").html(_11.hasClass("liked")?"-1":"+1");
_11.removeClass("hover");
}
};
_.initialize();
return _2;
};
}
if(!dojo.hostenv.findModule("xg.activity.mobile.ActivityPage",false)){
dojo.provide("xg.activity.mobile.ActivityPage");
xg.activity.mobile.ActivityPage=function(_1){
var _2={};
var _={};
_.loadingContent=false;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.scrollForMore);
x$(".refresh",_1).bind("vclick",_.checkForUpdates);
_.initializeAjaxPageLoading();
_1.find(".like-link").attr("href","#");
xg.index.like.likeLink(_1);
};
_.checkForUpdates=function(){
if(_.loadingContent){
return;
}
_.loadingContent=true;
x$(".refresh",_1).hide();
x$(".refreshSpinner",_1).css("display","inline-block");
var _4={"view":x$(".module-feed",_1).data("view"),"xn_out":"json","afterTime":x$(".event-info-timestamp:first",_1).data("time"),"noCache":x$.now(),"sf":x$(".module-feed",_1).data("addSocialFeeds")?"1":""};
x$.get("/activity/mobile/getActivityItems",_4,function(_5){
_.loadingContent=false;
x$(".refreshSpinner",_1).hide();
x$(".refresh",_1).show();
if(_5.html){
var _6=x$(_5.html);
_6.hide();
x$(".module-feed",_1).prepend(_6);
_6.fadeIn("slow");
}
},"json");
};
_.scrollForMore=function(){
if(_.loadingContent){
return;
}
_.loadingContent=true;
var _7={"view":x$(".module-feed",_1).data("view"),"xn_out":"json","beforeTime":x$(".event-info-timestamp:last",_1).data("time"),"sf":x$(".module-feed",_1).data("addSocialFeeds")?"1":""};
x$(".footerSpinner",_1).css("visibility","visible");
x$.get("/activity/mobile/getActivityItems",_7,function(_8){
_.loadingContent=false;
x$(".footerSpinner",_1).css("visibility","hidden");
if(_8.html){
var _9=x$(_8.html);
_9.hide();
x$(".module-feed").append(_9);
_9.fadeIn("slow");
}
},"json");
};
_2.insertLastStatus=function(){
var _a=x$.jStorage.get("lastStatus");
if(!_a){
return;
}
if(!ning.CurrentProfile||ning.CurrentProfile.id!==_a.screenName){
return;
}
if(_1.find(".feed-story[data-status-id=\""+_a.statusId+"\"]").length>0){
return;
}
_1.find(".module-feed").prepend(_a.html);
};
_.initializeAjaxPageLoading=function(){
_1.find(".module-feed").on("vclick","a[href^=\"/m/\"]:not(.like-link)",function(_b){
_b.preventDefault();
xg.changePage(x$(this).attr("href"));
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".activity.page",function(_c){
var _d=xg.activity.mobile.ActivityPage(_c);
xg.mobile.PageShow.addListenerToPage(_c,_d.insertLastStatus);
_c.on("newactivity",_d.insertLastStatus);
});
}
if(!dojo.hostenv.findModule("xg.index.mobilecaptcha.CaptchaDialog",false)){
dojo.provide("xg.index.mobilecaptcha.CaptchaDialog");
xg.index.mobilecaptcha.CaptchaDialog=function(_1,_2){
var _3={};
var _={};
_.submitting=false;
_.$dialog;
_3.show=function(){
_1.find(".captcha-dialog").simpledialog2();
_.$dialog=x$.mobile.sdCurrentDialog.sdIntContent;
_.$dialog.find(".captcha-area").find("[data-id]").each(function(){
x$(this).attr("id",x$(this).data("id"));
});
_.$dialog.find(".captcha-area div[data-id=\"recaptcha_widget\"]").show();
Recaptcha.create(_1.find(".captcha-dialog").data("key"),_.$dialog.find(".captcha-area")[0],RecaptchaOptions);
_.$dialog.find(".cancel-button").click(function(_5){
_5.preventDefault();
x$.mobile.sdCurrentDialog.close();
});
_.$dialog.find("form").submit(_.onSubmit);
_.$dialog.find(".ok-button").click(_.onSubmit);
};
_.onSubmit=function(_6){
_6.preventDefault();
if(_.submitting){
return;
}
_.submitting=true;
_.$dialog.find(".invalid-captcha-message").hide();
_.checkCaptcha(_.$dialog.find("input[name=recaptcha_challenge_field]").val(),_.$dialog.find("input[name=recaptcha_response_field]").val(),function(){
x$.mobile.sdCurrentDialog.close();
_2();
_.submitting=false;
},function(){
_.$dialog.find(".invalid-captcha-message").show();
Recaptcha.reload();
_.submitting=false;
});
};
_.checkCaptcha=function(_7,_8,_9,_a){
var _b={xg_token:xg.token,challenge:_7,response:_8};
x$.post("/main/mobilecaptcha/verify",_b,function(_c){
if(_c.success){
_9();
}else{
_a();
}
});
};
return _3;
};
}
if(!dojo.hostenv.findModule("xg.index.mobilecomment.CommentPage",false)){
dojo.provide("xg.index.mobilecomment.CommentPage");
xg.index.mobilecomment.CommentPage=function(_1){
var _2={};
var _={};
_.$commentLink=_1.find(".actionBar a.comment");
_.commentCount=_.$commentLink.data("count");
_.initialize=function(){
_.initializeLoadPreviousCommentsLink();
_.initializeCommentForms();
_.initializeCommentActionButton();
_.initializeDeleteAction();
};
_.initializeDeleteAction=function(){
_1.find("ul.comments").on("swipeleft swiperight","li",function(_4){
var _5=x$(this);
var _6=_5.data("swipeEvent");
if(!_6){
_5.data("swipeEvent",_4.type);
_.showDeleteButton(_5);
}else{
if(_6!=_4.type){
_5.data("swipeEvent",null);
_5.find(".delete-section").hide();
}
}
});
};
_.showDeleteButton=function(_7){
_7.find(".delete-section").show();
var _8=_7.find(".delete-button");
var _9=false;
_8.off("click");
_8.on("click",function(_a){
if(_9){
return;
}
_9=true;
var _b=_8.data("url");
x$.post(_b,{xg_token:xg.token},function(_c){
if(_c.success){
_.commentCount-=1;
_.$commentLink.text(_.commentCount);
_7.remove();
if(_.commentCount<=0){
_1.find(".comment-header").hide();
_1.find(".comment-section").hide();
}
}
});
});
};
_.initializeLoadPreviousCommentsLink=function(){
var _d=false;
$link=_1.find(".load-previous-comments-link");
$link.attr("href","#");
$link.click(function(_e){
_e.preventDefault();
if(_d){
return;
}
_d=true;
$link.find("img.spinner").show();
var _f="/main/mobilecomment/list?id="+$link.data("id")+"&maxDate="+$link.data("firstCommentDate")+"&numberOfComments="+$link.data("commentsPerPage");
x$.get(_f,function(_10){
if(_10.success){
_1.find(".comment-header").show();
_1.find(".comment-section").show();
$link.toggle(_10.hasMoreComments);
x$(_10.html).hide().prependTo(_1.find("ul.comments")).trigger("create").slideDown();
$link.data("firstCommentDate",_10.firstCommentDate);
if(!xg.actionBarPinned){
_1.find(".footer-comment-form").show();
_1.find(".footer-comment-form").find("[name=comment]").hide();
}
}
_d=false;
$link.find("img.spinner").hide();
});
});
};
_.updateSubmitButton=function(_11){
var _12=_11.find("[name=comment]:visible").length==0||_.formIsValid(_11);
_11.find("input[type=submit]").button(_12?"enable":"disable");
};
_.formIsValid=function(_13){
return x$.trim(_13.find("[name=comment]").val());
};
_.initializeCommentForms=function(){
var _14=_1.find(".comment-form");
_14.each(function(_15){
_.updateSubmitButton(x$(this));
});
_14.on("change keyup",function(){
_.updateSubmitButton(x$(this));
});
_14.submit(function(_16){
_16.preventDefault();
var _17=x$(this);
if(_17.find("[name=comment]:visible").length==0){
_17.find("[name=comment]").show();
_.updateSubmitButton(_17);
return;
}
if(!_.formIsValid(_17)){
return;
}
if(xg.captchaValidated||!_17.data("showCaptchaDialog")){
_.onSubmit(_17);
}else{
var _18=new xg.index.mobilecaptcha.CaptchaDialog(_1,function(){
xg.captchaValidated=true;
_.onSubmit(_17);
});
_18.show();
}
});
};
_.onSubmit=function(_19){
if(_19.data("submitting")){
return;
}
var _1a={xg_token:xg.token,pageType:_19.find("[name=pageType]").val(),comment:x$.trim(_19.find("[name=comment]").val())};
if(!_1a.comment){
return;
}
_19.data("submitting",true);
var _1b=_19.find("[name=comment]").val();
_19.find("[name=comment]").val("");
if(_19.hasClass("action-bar-comment-form")){
_19.slideUp("fast");
}
_1.find("p.spam.error").hide();
x$.post(_19.prop("action")+"&format=json",_1a,function(_1c){
if(_1c.moderated){
window.scrollTo(0,0);
_1.find("p.comment-moderation.notification").slideDown();
}else{
if(_1c.hasSpam){
window.scrollTo(0,0);
_1.find("p.spam.notification").slideDown();
if(_19.find("[name=comment]").val()===""){
_19.find("[name=comment]").val(_1b);
}
}else{
if(_1c.success){
_1.find(".comment-header").show();
_1.find(".comment-section").show();
_1.find(".no-comments-message").hide();
$comment=x$(_1c.html).css("opacity",0).appendTo(_1.find("ul.comments")).trigger("create");
$comment.animate({opacity:1},400);
_.commentCount+=1;
_.$commentLink.text(_.commentCount);
xg.mobile.Form.scrollToBottom();
}
}
}
_19.data("submitting",false);
});
};
_.initializeCommentActionButton=function(){
var _1d=_1.find(".actionBar a.comment");
_1d.attr("href","#");
_1d.bind("vclick",function(_1e){
_1e.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-comment-form)").slideUp("fast");
_1.find(".action-bar-comment-form").slideToggle("fast");
_.updateSubmitButton(_1.find(".action-bar-comment-form"));
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".page.with-commenting:not(.with-special-commenting)",function(_1f){
xg.index.mobilecomment.CommentPage(_1f);
});
}
if(!dojo.hostenv.findModule("xg.index.mobilelayout.DeleteAction",false)){
dojo.provide("xg.index.mobilelayout.DeleteAction");
xg.index.mobilelayout.DeleteAction=function(_1){
var _2={};
var _={};
_.initialize=function(){
_.initializeActionButton();
_.initializeForm();
};
_.initializeForm=function(){
var _4=_1.find(".delete-content-form a.cancel-button");
_4.attr("href","#");
_4.bind("vclick",function(_5){
_5.preventDefault();
_1.find(".delete-content-form").slideUp("fast");
});
};
_.initializeActionButton=function(){
var _6=_1.find(".actionBar a.trash");
_6.attr("href","#");
_6.bind("vclick",function(_7){
_7.preventDefault();
_1.find(".action-bar-dropdown:not(.delete-content-form)").slideUp("fast");
_1.find(".delete-content-form").slideToggle("fast");
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".page",function(_8){
if(_8.find(".actionBar a.trash").length){
xg.index.mobilelayout.DeleteAction(_8);
}
});
}
if(!dojo.hostenv.findModule("xg.index.like.mobileLike",false)){
dojo.provide("xg.index.like.mobileLike");
xg.index.like.mobileLike=function(_1){
var _2={};
var _={};
_.initialize=function(){
$button=_1.find(".actionBar a.like");
$button.attr("href","#");
$button.on("vclick",_.onClickLikeButton);
$(".likers-link").on("vclick",function(_4){
_4.preventDefault();
_1.find(".likers").show();
xg.mobile.Form.scrollToBottom();
});
};
_.posting=false;
_.onClickLikeButton=function(_5){
_5.preventDefault();
var _6=$(this);
if(!ning.CurrentProfile){
window.location.href=_6.data("signUpUrl");
return;
}
_.postLike(_6,!_6.hasClass("liked"));
};
_.postLike=function(_7,_8){
if(_.posting){
return;
}
_.posting=true;
var _9={"contentId":_7.data("contentId"),"logLike":"1","pageType":"detail"};
var _a=_8?_7.data("likeUrl"):_7.data("unlikeUrl");
xg.post(_a,_9,function(_b,_c){
if(_c.success){
x$(".actionBar").find(".likeCount").html(_c.likeCount);
_7.toggleClass("liked");
x$(".likers-link").html(_c.likeCountText);
x$(".mobile-like").find(".currentUser").toggle(_8);
}
_.posting=false;
});
if(_8){
xg.shared.googleAnalytics.trackPageview("/like/ning/create/"+_7.data("contentType")+"/"+_7.data("contentId"));
}else{
xg.shared.googleAnalytics.trackPageview("/like/ning/delete/"+_7.data("contentType")+"/"+_7.data("contentId"));
}
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".page.with-liking",function(_d){
xg.index.like.mobileLike(_d);
});
}
if(!dojo.hostenv.findModule("xg.index.mobileauthorization.SignInPage",false)){
dojo.provide("xg.index.mobileauthorization.SignInPage");
xg.index.mobileauthorization.SignInPage=function(_1){
var _2={};
var _={};
_.initialize=function(){
xg.mobile.Form.showLabelsIfPlaceholdersNotSupported(_1);
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".signin.page",function(_4){
xg.index.mobileauthorization.SignInPage(_4);
});
}
if(!dojo.hostenv.findModule("xg.index.mobileauthorization.SignUpPage",false)){
dojo.provide("xg.index.mobileauthorization.SignUpPage");
xg.index.mobileauthorization.SignUpPage=function(_1){
var _2={};
var _={};
_.initialize=function(){
xg.mobile.Form.showLabelsIfPlaceholdersNotSupported(_1);
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".signup.page",function(_4){
xg.index.mobileauthorization.SignUpPage(_4);
});
}
if(!dojo.hostenv.findModule("xg.index.mobileauthorization.CreateProfilePage",false)){
dojo.provide("xg.index.mobileauthorization.CreateProfilePage");
xg.index.mobileauthorization.CreateProfilePage=function(_1){
var _2={};
var _={};
_.initialize=function(){
if(!(xg.mobile.Form.isFileUploadingSupported())){
_1.find(".photo-upload-unavailable-message").show();
}
_.initializeYearField();
_.initializeLocationFields();
};
_.initializeYearField=function(){
_1.find("input.year").focus(function(){
if(x$(this).val()==="yyyy"){
x$(this).val("");
}
}).blur(function(){
if(x$(this).val()===""){
x$(this).val("yyyy");
}
});
};
_.initializeLocationFields=function(){
_.updateLocationFields();
_1.find("select[name=country]").change(_.updateLocationFields);
};
_.updateLocationFields=function(){
$countrySelect=_1.find("select[name=country]");
_1.find("input[name=zip], label[for=zip]").toggle($countrySelect.val()==="US");
_1.find("input[name=location], label[for=location]").toggle($countrySelect.val()&&$countrySelect.val()!=="US"&&$countrySelect.val()!=="_2");
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".new-profile.page",function(_4){
xg.index.mobileauthorization.CreateProfilePage(_4);
});
}
if(!dojo.hostenv.findModule("xg.mobile.Facebook",false)){
dojo.provide("xg.mobile.Facebook");
xg.mobile.Facebook=(function(){
var _1={};
var _={};
_1._=_;
_.callIfDefined=function(_3){
if(_3){
_3();
}
};
_1.requirePublishStreamPermission=function(_4,_5,_6,_7){
xg.addOnFacebookLoad(function(){
_1.requireSession(function(){
if(_6){
_.isUserPageAdmin(_6,function(){
_.requirePublishStreamPermissionProper(_4,_5,_6);
},function(){
_.disconnectUserFromPage();
_.callIfDefined(_7);
_.requirePublishStreamPermissionProper(_4,_5);
},function(){
_.callIfDefined(_5);
});
}else{
_.requirePublishStreamPermissionProper(_4,_5);
}
},function(){
_.callIfDefined(_5);
});
});
};
_1.requireManagePagesPermission=function(_8,_9){
xg.addOnFacebookLoad(function(){
_1.requireSession(function(){
_.requireManagePagesPermissionProper(_8,_9);
},function(){
_.callIfDefined(_9);
});
});
};
_.requireManagePagesPermissionProper=function(_a,_b){
_.userHasManagePagesPermission(function(_c){
if(_c){
_.callIfDefined(_a);
return;
}
_.showPermissionDialog("publish_actions,manage_pages,publish_pages",function(_d){
if(_d.authResponse){
_.callIfDefined(_a);
}else{
_.callIfDefined(_b);
}
});
});
};
_1.getLoginStatus=function(_e){
FB.getLoginStatus(_e);
};
_1.requireSession=function(_f,_10){
_10=_10||function(){
};
FB.getLoginStatus(function(_11){
if(_11.authResponse){
_f();
}else{
FB.login(function(_12){
if(_12.authResponse){
_f();
}else{
_10();
}
});
}
});
};
_1.logout=function(_13){
FB.logout(_13);
};
_1.getCurrentUid=function(){
return FB.getAuthResponse().userID;
};
_1.publishPost=function(_14,_15,_16){
_16=_16||function(){
};
_1.requireSession(function(){
if(_15==null){
FB.api("/me/feed","post",_14,_16);
return;
}
FB.api("/me/accounts","get",{},function(_17){
for(var i=0;i<_17.data.length;i++){
if(_15==_17.data[i].id){
_14["access_token"]=_17.data[i].access_token;
break;
}
}
FB.api("/me/feed","post",_14,_16);
});
});
};
_.showPermissionDialog=function(_19,_1a){
x$(".facebook-authentication-dialog:first").simpledialog2();
var _1b=x$.mobile.sdCurrentDialog.sdIntContent;
_1b.find(".cancel-button").click(function(_1c){
_1c.preventDefault();
x$.mobile.sdCurrentDialog.close();
});
_1b.find(".ok-button").click(function(_1d){
_1d.preventDefault();
x$.mobile.sdCurrentDialog.close();
FB.login(_1a,{scope:_19});
});
};
_.isUserPageAdmin=function(_1e,_1f,_20,_21){
_1.requireManagePagesPermission(function(){
FB.api("/me/accounts","get",{},function(_22){
if(_22.error){
_21();
return;
}
for(var i=0;i<_22.data.length;i++){
if(_1e==_22.data[i].id){
if(x$.inArray("ADMINISTER",_22.data[i].perms)>-1){
_1f();
}else{
_20();
}
return;
}
}
_20();
});
},_21);
};
_.disconnectUserFromPage=function(){
x$.post("/profiles/connections/update?xn_out=json",{pageId:"",pageName:"",userId:_1.getCurrentUid(),xg_token:xg.token});
};
_.requirePublishStreamPermissionProper=function(_24,_25,_26){
_.userHasPublishStreamPermission(function(_27){
if(_27){
_.callIfDefined(_24);
return;
}else{
_.showPermissionDialog(_26?"publish_actions,manage_pages,publish_pages":"publish_actions",function(_28){
if(_28.authResponse){
_.callIfDefined(_24);
}else{
_.callIfDefined(_25);
}
});
}
},_26);
};
_.userHasPublishStreamPermission=function(_29,_2a){
var _2b=["publish_actions"];
if(_2a){
_2b.push("manage_pages");
_2b.push("publish_pages");
}
_.userHasPermissions(_2b,_29);
};
_.userHasManagePagesPermission=function(_2c){
_.userHasPermissions(["manage_pages","publish_pages"],_2c);
};
_.userHasPermissions=function(_2d,_2e){
FB.api("/me/permissions",function(_2f){
for(var i=0;i<_2d.length;i++){
var _31=false;
for(var j=0;j<_2f.data.length;j++){
if(_2d[i]==_2f.data[j].permission&&_2f.data[j].status=="granted"){
_31=true;
break;
}
}
if(!_31){
_2e(false);
return;
}
}
_2e(true);
});
};
return _1;
})();
}
if(!dojo.hostenv.findModule("xg.profiles.mobilestatus.StatusPage",false)){
dojo.provide("xg.profiles.mobilestatus.StatusPage");
xg.profiles.mobilestatus.StatusPage=function(_1){
var _2={};
var _={};
_.submitting=false;
_.$form=_1.find(".status-form");
_.form=_.$form[0];
_.facebookPageId=_.$form.data("facebookPageId");
_.$facebookCheckButton=x$();
_.$twitterCheckButton=x$();
_.LAST_STATUS_TTL=30000;
_.initialize=function(){
_.initializeStatusActionButton();
_.initializeContinuingPost();
_.initializeAjaxFormPosting();
_.initializeFacebookCheckbox();
_.initializeTwitterCheckbox();
};
_.initializeStatusActionButton=function(){
$button=_1.find(".actionBar a.updateStatus");
$button.attr("href","#");
$button.bind("vclick",function(_4){
_4.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-status-form)").slideUp("fast");
_1.find(".action-bar-status-form").slideToggle("fast");
});
};
_.initializeContinuingPost=function(){
if(x$(_.form.status).data("continuingPost")){
_.form.status.value=x$.jStorage.get("pendingStatus");
setTimeout(function(){
_1.find(".action-bar-status-form").slideToggle("fast");
},1);
}
};
_.updateSubmitButton=function(_5){
_5.find("input[type=submit]").button(_.formIsValid(_5)?"enable":"disable");
};
_.formIsValid=function(_6){
return x$.trim(_6.find("[name=status]").val());
};
_.initializeAjaxFormPosting=function(){
_.updateSubmitButton(_.$form);
_.$form.on("change keyup",function(){
_.updateSubmitButton(_.$form);
});
_.$form.submit(function(_7){
_7.preventDefault();
if(!_.formIsValid(_.$form)){
return;
}
if(_.submitting){
return;
}
_.submitting=true;
_.$form.find("p.error").hide();
x$.mobile.showPageLoadingMsg();
var _8={xg_token:xg.token,status:_.form.status.value,postToFacebookShown:_.form.postToFacebookShown&&_.form.postToFacebookShown.value,postToFacebook:_.form.postToFacebook&&_.$facebookCheckButton.hasClass("checked")?"1":"",postToTwitterShown:_.form.postToTwitterShown&&_.form.postToTwitterShown.value,postToTwitter:_.form.postToTwitter&&_.$twitterCheckButton.hasClass("checked")?"1":""};
x$.post(_.$form.prop("action"),_8,_.afterSubmit);
});
_.$form.find(".cancel-button").bind("click",function(_9){
_9.preventDefault();
_1.find(".action-bar-status-form").slideUp("fast");
});
};
_.initializeFacebookCheckbox=function(){
if(!_.form.postToFacebook){
return;
}
_.$facebookCheckButton=_.replaceCheckboxWithButton("facebook",_.$form.find("input[id=post-to-facebook-checkbox]"),_.$form.find("label[for=post-to-facebook-checkbox]"));
_.$facebookCheckButton.click(function(_a){
_a.preventDefault();
_.$facebookCheckButton.toggleClass("checked");
if(_.$facebookCheckButton.hasClass("checked")){
xg.mobile.Facebook.requirePublishStreamPermission(function(){
},function(){
_.$facebookCheckButton.removeClass("checked");
},_.facebookPageId);
}
});
};
_.initializeTwitterCheckbox=function(){
if(!_.form.postToTwitter){
return;
}
_.$twitterCheckButton=_.replaceCheckboxWithButton("twitter",_.$form.find("input[id=post-to-twitter-checkbox]"),_.$form.find("label[for=post-to-twitter-checkbox]"));
var _b=x$(_.form.postToTwitter);
_.$twitterCheckButton.click(function(_c){
_c.preventDefault();
_.$twitterCheckButton.toggleClass("checked");
if(_b.data("authenticationNeeded")&&_.$twitterCheckButton.hasClass("checked")){
_1.find(".twitter-authentication-dialog").simpledialog2();
var _d=x$.mobile.sdCurrentDialog.sdIntContent;
_d.find(".cancel-button").click(function(_e){
_e.preventDefault();
_.$twitterCheckButton.removeClass("checked");
x$.mobile.sdCurrentDialog.close();
});
_d.find(".ok-button").click(function(_f){
_f.preventDefault();
x$.jStorage.set("pendingStatus",_.form.status.value);
window.location.href=_1.find(".twitter-authentication-dialog").data("twitterAuthenticationUrl");
});
}
});
};
_.replaceCheckboxWithButton=function(_10,_11,_12){
_11.hide();
_12.hide();
$checkButton=x$("<button class=\"check-button\"></button>").insertBefore(_11);
$checkButton.toggleClass("checked",_11.prop("checked"));
$checkButton.addClass(_10);
$checkButton.text(_12.text());
$checkButton.append("<span></span>");
return $checkButton;
};
_.afterSubmit=function(_13){
if(_13.success){
x$.jStorage.set("lastStatus",_13);
x$.jStorage.setTTL("lastStatus",_.LAST_STATUS_TTL);
if(_.$facebookCheckButton.hasClass("checked")){
_.postToFacebook(_.form.status.value,function(){
_.update();
});
}else{
_.update();
}
}else{
x$.mobile.hidePageLoadingMsg();
_.submitting=false;
_.$form.find("p.error").html(_13.htmlErrorMessage).show();
}
};
_.update=function(){
x$.mobile.hidePageLoadingMsg();
_.submitting=false;
_1.trigger("newactivity");
_1.find(".action-bar-status-form").slideUp("fast");
_.form.status.value="";
};
_.postToFacebook=function(_14,_15){
xg.mobile.Facebook.requirePublishStreamPermission(function(){
xg.mobile.Facebook.publishPost({message:_14},_.facebookPageId,_15);
},function(){
_.$facebookCheckButton.removeClass("checked");
_15();
},_.facebookPageId);
};
_2.focusOnTextarea=function(){
_1.find("textarea").focus();
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".page.with-status-updating",function(_16){
var _17=xg.profiles.mobilestatus.StatusPage(_16);
xg.mobile.PageShow.addListenerToPage(_16,_17.focusOnTextarea);
});
}
if(!dojo.hostenv.findModule("xg.profiles.mobileblogpost.BlogPostsPage",false)){
dojo.provide("xg.profiles.mobileblogpost.BlogPostsPage");
xg.profiles.mobileblogpost.BlogPostsPage=function(_1){
var _2={};
var _={};
_.SEARCH_KEYPRESS_DELAY=300;
_.page=1;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.loadMoreBlogPosts);
_.initializeAddActionButton();
_.initializeAddBlogPostForm();
_.initializeFilterMenu();
_.initializeSearchBar();
};
_.initializeSearchBar=function(){
var _4=0;
_1.find(".search").on("keyup change",function(){
clearTimeout(_4);
_4=setTimeout(_.reloadBlogPosts,_.SEARCH_KEYPRESS_DELAY);
});
};
_.initializeFilterMenu=function(){
var _5=_1.find(".filterMenu .panel");
_1.find(".filterMenu > button").on("click",function(_6){
_6.stopPropagation();
_5.toggle();
});
var _7=_1.find("ul.blog-posts");
_1.find(".filterMenu a").on("click",function(_8){
_5.hide();
_7.data("view",x$(this).data("view"));
_1.find(".search").val("");
_.reloadBlogPosts();
});
_1.on("click",function(){
_5.hide();
});
};
_.reloadBlogPosts=function(){
var _9=_1.find("ul.blog-posts");
_9.empty();
_.page=0;
_9.data("lastBlogPostDate","");
_9.data("hasMoreBlogPosts",true);
_.loadMoreBlogPosts();
};
_.loadMoreBlogPosts=function(){
var _a=_1.find("ul.blog-posts");
if(_a.length==0){
return;
}
if(!_a.data("hasMoreBlogPosts")){
return;
}
_1.find(".no-results-message").hide();
x$(".footerSpinner",_1).css("visibility","visible");
var q=_1.find(".search").val()||"";
var _c="/profiles/mobileblogpost/listMore"+"?view="+_a.data("view")+"&q="+encodeURIComponent(q)+"&showExcerpts="+_a.data("showExcerpts")+"&maxDate="+_a.data("lastBlogPostDate")+"&page="+(_.page+1);
x$.get(_c,function(_d){
x$(".footerSpinner",_1).css("visibility","hidden");
if(q!=(_1.find(".search").val()||"")){
return;
}
if(_d.success){
x$(_d.html).hide().appendTo(_a).trigger("create").fadeIn("slow");
_a.data("lastBlogPostDate",_d.lastBlogPostDate);
_a.data("hasMoreBlogPosts",_d.hasMoreBlogPosts);
_.page+=1;
}
if(_a.children().length==0){
_1.find(".no-results-message").text(_d.noResultsMessage).show();
}
},"json");
};
_.updateSubmitButton=function(_e){
_e.find("input[type=submit]").button(_.formIsValid(_e)?"enable":"disable");
};
_.formIsValid=function(_f){
return x$.trim(_f.find("[name=description]").val());
};
_.initializeAddBlogPostForm=function(){
var _10=_1.find(".add-blogpost-form");
_.updateSubmitButton(_10);
xg.mobile.Form.showLabelsIfPlaceholdersNotSupported(_1);
_10.on("change keyup",function(){
_.updateSubmitButton(_10);
});
_10.submit(function(_11){
_11.preventDefault();
if(!_.formIsValid(_10)){
return;
}
if(xg.captchaValidated||!_10.data("showCaptchaDialog")){
_.onSubmit(_10);
}else{
var _12=new xg.index.mobilecaptcha.CaptchaDialog(_1,function(){
xg.captchaValidated=true;
_.onSubmit(_10);
});
_12.show();
}
});
};
_.showErrors=function(_13,_14){
var _15=x$("<ul></ul>");
for(var i=0;i<_14.length;i++){
_15.append(x$("<li>"+_14[i]+"</li>"));
}
_13.find(".error").html(_15).show();
};
_.onSubmit=function(_17){
if(_17.data("submitting")){
return;
}
var _18={xg_token:xg.token,title:x$.trim(_17.find("[name=title]").val()),description:x$.trim(_17.find("[name=description]").val())};
_17.find(".error").hide();
_17.data("submitting",true);
_17.slideUp("fast");
x$.post(_17.prop("action"),_18,function(_19){
if(_19.success){
xg.changePage(_19.url);
}else{
var _1a=[];
if(_19.error){
_1a.push(_19.error);
}
if(_19.errors){
x$.each(_19.errors,function(_1b,_1c){
_1a.push(_1c);
});
}
window.scrollTo(0,0);
_17.slideDown("fast");
_.showErrors(_17,_1a);
}
_17.data("submitting",false);
});
};
_.initializeAddActionButton=function(){
var _1d=_1.find(".actionBar a.add");
_1d.bind("vclick",function(_1e){
_1e.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-add-blogpost-form)").slideUp("fast");
_1.find(".action-bar-add-blogpost-form").slideToggle("fast");
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".blog-posts.page",function(_1f){
xg.profiles.mobileblogpost.BlogPostsPage(_1f);
});
}
if(!dojo.hostenv.findModule("xg.profiles.mobileblogpost.BlogPostPage",false)){
dojo.provide("xg.profiles.mobileblogpost.BlogPostPage");
xg.profiles.mobileblogpost.BlogPostPage=function(_1){
var _2={};
_2.incrementViewCount=function(){
var _3=_1.find(".content");
if(_3.data("awaitingApproval")){
return;
}
x$.post(_3.data("incrementViewCountUrl"),{xg_token:xg.token});
if(_3.data("updateViewCountUrl")){
x$.post(_3.data("updateViewCountUrl"),{xg_token:xg.token,key:_3.data("contentId"),x:_3.data("updateViewCountHash")});
}
};
return _2;
};
xg.mobile.PageInit.addListener(".blog-post.page",function(_4){
var _5=xg.profiles.mobileblogpost.BlogPostPage(_4);
xg.mobile.PageShow.addListenerToPage(_4,_5.incrementViewCount);
});
}
if(!dojo.hostenv.findModule("xg.profiles.mobileprofile.MembersPage",false)){
dojo.provide("xg.profiles.mobileprofile.MembersPage");
xg.profiles.mobileprofile.MembersPage=function(_1){
var _2={};
var _={};
_.searchTerm="";
_.categoryFilter;
_.featuredOnly;
_.sort;
_.numMembers;
_.numMembersLoaded=0;
_.loadMoreOnUpdateId=-1;
_.nextPage={};
_.membersById={};
_.$membersUl;
_.initialize=function(){
_.$membersUl=_1.find("ul.members");
_.numMembers=_.$membersUl.data("numMembers");
_1.find("ul.members > li").each(function(i,li){
var _6=x$(li);
var id=_6.data("id");
_.membersById[id]=_6;
_.numMembersLoaded++;
});
_.sort=_.$membersUl.data("sort");
_.featuredOnly=_.$membersUl.data("featured");
_.categoryFilter=_.$membersUl.data("category");
_.nextPage[_.getSearchKey()]=2;
xg.mobile.DetectScrollToBottom.addListener(_1,_.loadMoreMembers);
x$(".search",_1).on("keyup change",_.onUpdateSearchTerm);
_.initializeFilterMenu();
};
_.initializeFilterMenu=function(){
var _8=_1.find(".filterMenu .panel");
_1.find(".filterMenu > button").on("click",function(_9){
_9.stopPropagation();
_8.toggle();
});
_1.find(".filterMenu a").on("click",function(_a){
_8.hide();
var id=x$(this).data("id");
var _c=_.sort;
_.sort="recent";
_.featuredOnly=false;
_.categoryFilter="";
if(id=="recent"){
}else{
if(id=="alphabetical"){
_.sort="alphabetical";
}else{
if(id=="featured"){
_.featuredOnly=true;
}else{
_.categoryFilter=id;
}
}
}
if(_.sort!==_c){
_.nextPage={};
_.membersById={};
_.$membersUl.empty();
}
_.loadMoreMembersIfNecessary();
_.updateView();
});
_1.on("click",function(){
_8.hide();
});
};
_.onUpdateSearchTerm=function(){
_.searchTerm=x$(".search",_1).val().toLowerCase();
_.updateView();
_.loadMoreMembersIfNecessary();
};
_.loadMoreMembersIfNecessary=function(){
clearTimeout(_.loadMoreOnUpdateId);
if(!_.nextPage[_.getSearchKey()]){
_.loadMoreOnUpdateId=setTimeout(_.loadMoreMembers,300);
}
};
_.loadMoreMembers=function(){
var _d=_.getSearchKey();
if(!_.nextPage[_d]){
_.nextPage[_d]=1;
}
if(_.numMembersLoaded>=_.numMembers||_.nextPage[_d]<0){
return;
}
var _e=_.nextPage[_d];
_.nextPage[_d]=-1;
x$(".footerSpinner",_1).css("visibility","visible");
var _f=_.$membersUl.data("listMoreUrl");
_f=xg.shared.util.addParameter(_f,"sort",_.sort);
_f=xg.shared.util.addParameter(_f,"page",_e);
if(_.searchTerm){
_f=xg.shared.util.addParameter(_f,"searchTerm",_.searchTerm);
}
if(_.categoryFilter){
_f=xg.shared.util.addParameter(_f,"category",_.categoryFilter);
}
if(_.featuredOnly){
_f=xg.shared.util.addParameter(_f,"featured",1);
}
var _10=_.sort=="alphabetical"?"asc":"desc";
var _11=_.sort=="alphabetical"?"alphabeticalSortKey":"recencySortKey";
x$.get(_f,function(_12){
x$(".footerSpinner",_1).css("visibility","hidden");
if(_12.success){
$newItems=x$(_12.html).filter("li");
$newItems.each(function(i,li){
var $li=x$(li);
var id=$li.data("id");
if(_.membersById[id]){
return;
}
_.membersById[id]=$li;
_.numMembersLoaded++;
var _17=$li.data(_11).toString();
$nextElement=_1.find("ul.members > li").first();
while($nextElement.length>0&&((_10=="desc"&&$nextElement.data(_11).toString()>_17)||(_10=="asc"&&$nextElement.data(_11).toString()<_17))){
$nextElement=$nextElement.next();
}
if($nextElement.length){
$nextElement.before($li);
}else{
$li.appendTo(_.$membersUl);
}
$li.hide().trigger("create");
});
_.updateView();
}
if(_12.hasMoreMembers){
_.nextPage[_d]=_e+1;
}else{
_.nextPage[_d]=-1;
}
if(_.searchTerm.length>0&&_.$membersUl.children().length==0){
}
},"json");
};
_.getSearchKey=function(){
return _.sort+":"+_.searchTerm+":"+_.categoryFilter+":"+_.featuredOnly;
};
_.updateView=function(){
_1.find(".no-search-results-message").hide();
if(_.searchTerm==""&&_.categoryFilter==""&&!_.featuredOnly){
_1.find("ul.members > li").show();
return;
}
var _18=true;
_1.find("ul.members > li").each(function(i,li){
var $li=x$(li);
var _1c=x$(".name",$li).text();
var _1d=(!_.featuredOnly||$li.data("featured"))&&(_.searchTerm==""||_1c.toLowerCase().indexOf(_.searchTerm)>=0)&&(_.categoryFilter==""||$li.data("category")==_.categoryFilter);
if(_1d){
_18=false;
}
$li.toggle(!!_1d);
});
if(_18&&_.searchTerm.length>0){
var _1e=_1.find(".no-search-results-message").data("messageTemplate").replace("[searchterm]",_.searchTerm);
_1.find(".no-search-results-message").text(_1e).show();
}
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".members.page:not(.group, .event)",function(_1f){
xg.profiles.mobileprofile.MembersPage(_1f);
});
}
if(!dojo.hostenv.findModule("xg.profiles.mobileprofile.ProfilePage",false)){
dojo.provide("xg.profiles.mobileprofile.ProfilePage");
xg.profiles.mobileprofile.ProfilePage=function(_1){
var _2={};
var _={};
_.initialize=function(){
_.initializeAddFriendButton();
_.initializeFriendRequestSentButton();
_.initializeRemoveFriendButton();
_.initializeApprovalLinks();
};
_.initializeApprovalLinks=function(){
var _4=_1.find("form.approval");
var _5=false;
_1.find(".approve-button").not(".ui-disabled").on("click",function(_6){
if(_5){
return;
}
_4.find("[name=action]").val("approve");
_5=true;
_4.submit();
});
_1.find(".decline-button").on("click",function(_7){
if(_5){
return;
}
_4.find("[name=action]").val("decline");
_5=true;
_4.submit();
});
};
_.initializeAddFriendButton=function(){
var _8=false;
var _9=_1.find(".add-friend-form");
var _a=_1.find(".add-friend-error-form");
var _b=false;
_1.find(".actionBar a.add-friend").on("vclick",function(_c){
_c.preventDefault();
if(_8){
_9.slideToggle("fast");
_8=!_8;
return;
}
if(_b){
return;
}
_b=true;
x$.get(_9.data("friendLimitCheckUrl"),function(_d){
_b=false;
_d=x$.parseJSON(_d.replace(/^\((.*)\)$/,"$1"));
if(_d.friendLimitExceeded){
_1.find(".action-bar-dropdown:not(.add-friend-error-form)").slideUp("fast");
_a.find("p").text(_9.data("friendLimitExceededMessage"));
_a.slideToggle("fast");
}else{
if(_d.sentFriendRequestLimitExceeded){
_1.find(".action-bar-dropdown:not(.add-friend-error-form)").slideUp("fast");
_a.find("p").text(_9.data("friendRequestLimitExceededMessage"));
_a.slideToggle("fast");
}else{
if(_d.friendStatus=="pending"||_d.friendStatus=="friend"){
}else{
_1.find(".action-bar-dropdown:not(.add-friend-form)").slideUp("fast");
_9.slideToggle("fast");
_8=!_8;
}
}
}
});
});
_9.on("submit",function(_e){
_e.preventDefault();
_9.slideUp("fast");
_1.find(".actionBar a.add-friend").hide();
_1.find(".actionBar a.friend-request-sent").css("display","inline-block");
x$.post(_9.data("addFriendUrl"),{message:_9.find("[name=\"message\"]").val(),xg_token:xg.token});
});
_9.find(".cancel-button").on("click",function(_f){
_9.slideUp("fast");
});
_a.on("submit",function(_10){
_10.preventDefault();
_a.slideUp("fast");
});
};
_.initializeRemoveFriendButton=function(){
var _11=_1.find(".remove-friend-form");
_1.find(".actionBar a.delete-friend").on("vclick",function(_12){
_12.preventDefault();
_11.slideToggle("fast");
});
_11.on("submit",function(_13){
_13.preventDefault();
_11.slideUp("fast");
_1.find(".actionBar a.delete-friend").hide();
x$.post(_11.data("removeFriendUrl"),{xg_token:xg.token});
});
_11.find(".cancel-button").on("click",function(_14){
_11.slideUp("fast");
});
};
_.initializeFriendRequestSentButton=function(){
_1.find(".actionBar a.friend-request-sent").on("vclick",function(_15){
_15.preventDefault();
_1.find(".action-bar-dropdown:not(.friend-request-sent-form)").slideUp("fast");
_1.find(".friend-request-sent-form").slideToggle("fast");
});
_1.find(".friend-request-sent-form").on("submit",function(_16){
_16.preventDefault();
_1.find(".friend-request-sent-form").slideUp("fast");
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".profile.page",function(_17){
xg.profiles.mobileprofile.ProfilePage(_17);
});
}
if(!dojo.hostenv.findModule("xg.groups.mobileprofile.GroupMembersPage",false)){
dojo.provide("xg.groups.mobileprofile.GroupMembersPage");
xg.groups.mobileprofile.GroupMembersPage=function(_1){
var _2={};
var _={};
_.loadingContent=false;
_.page=1;
_.hasMoreMembers=true;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.scrollForMore);
};
_.scrollForMore=function(){
if(_.loadingContent){
return;
}
if(!_.hasMoreMembers){
return;
}
var _4=_1.find("ul.members");
_.loadingContent=true;
x$(".footerSpinner",_1).css("visibility","visible");
var _5=_4.data("listMoreUrl")+"?groupId="+(_4.data("groupId")||"")+"&page="+(_.page+1);
x$.get(_5,function(_6){
_.loadingContent=false;
x$(".footerSpinner",_1).css("visibility","hidden");
if(_6.success){
x$(_6.html).hide().appendTo(_4).trigger("create").fadeIn("slow");
_.hasMoreMembers=_6.hasMoreMembers;
_.page+=1;
}
},"json");
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".group.members.page",function(_7){
xg.groups.mobileprofile.GroupMembersPage(_7);
});
}
if(!dojo.hostenv.findModule("xg.groups.mobilegroup.GroupsPage",false)){
dojo.provide("xg.groups.mobilegroup.GroupsPage");
xg.groups.mobilegroup.GroupsPage=function(_1){
var _2={};
var _={};
_.SEARCH_KEYPRESS_DELAY=300;
_.hasMoreGroups=true;
_.pageNumber=1;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.loadMoreGroups);
_.initializeFilterMenu();
_.initializeSearchBar();
};
_.loadMoreGroups=function(){
var _4=_1.find("ul.groups");
if(_4.length==0){
return;
}
if(!_.hasMoreGroups){
return;
}
_1.find(".no-results-message").hide();
x$(".footerSpinner",_1).css("visibility","visible");
var q=_1.find(".search").val()||"";
var _6="/groups/mobilegroup/listMore"+"?id="+_4.data("id")+"&view="+_4.data("view")+"&q="+encodeURIComponent(q)+"&page="+(_.pageNumber+1);
x$.get(_6,function(_7){
x$(".footerSpinner",_1).css("visibility","hidden");
if(q!=(_1.find(".search").val()||"")){
return;
}
if(_7.success){
x$(_7.html).hide().appendTo(_4).trigger("create").fadeIn("slow");
_.hasMoreGroups=_7.hasMoreGroups;
_.pageNumber+=1;
}
if(_4.children().length==0){
_1.find(".no-results-message").text(_7.noResultsMessage).show();
}
},"json");
};
_.initializeFilterMenu=function(){
var _8=_1.find(".filterMenu .panel");
_1.find(".filterMenu > button").on("click",function(_9){
_9.stopPropagation();
_8.toggle();
});
var _a=_1.find("ul.groups");
_1.find(".filterMenu a").on("click",function(_b){
_8.hide();
_a.data("view",x$(this).data("view"));
_1.find(".search").val("");
_.reloadGroups();
});
_1.on("click",function(){
_8.hide();
});
};
_.initializeSearchBar=function(){
var _c=0;
_1.find(".search").on("keyup change",function(){
clearTimeout(_c);
_c=setTimeout(_.reloadGroups,_.SEARCH_KEYPRESS_DELAY);
});
};
_.reloadGroups=function(){
var _d=_1.find("ul.groups");
_d.empty();
_.pageNumber=0;
_.hasMoreGroups=true;
_.loadMoreGroups();
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".groups.page",function(_e){
xg.groups.mobilegroup.GroupsPage(_e);
});
}
if(!dojo.hostenv.findModule("xg.groups.mobilegroup.GroupHeader",false)){
dojo.provide("xg.groups.mobilegroup.GroupHeader");
xg.groups.mobilegroup.GroupHeader=function(_1){
var _={};
_.initialize=function(){
_.initializeDescriptionLink();
_.initializeForm();
_.initializeJoinGroupButton();
};
_.initializeJoinGroupButton=function(){
_1.find(".actionBar a.join-group").bind("vclick",function(_3){
_3.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-join-group-form)").slideUp("fast");
_1.find(".action-bar-join-group-form").slideToggle("fast");
});
};
_.initializeDescriptionLink=function(){
_1.find(".group-header a.description-link").on("vclick",function(e){
e.preventDefault();
_1.find(".group-header .group-description").slideToggle("fast");
});
};
_.initializeForm=function(){
var _5=_1.find("form.join, form.join-with-paid-access, form.request-access");
_5.find(".confirm-button a, .cancel-button").on("vclick",function(e){
e.preventDefault();
var _7=x$(this);
if(_7.data("url")){
_5.prop("action",_7.data("url"));
_5.submit();
}else{
_1.find(".action-bar-join-group-form").slideToggle("fast");
}
});
};
_.initialize();
};
xg.mobile.PageInit.addListener(".group.page",function(_8){
xg.groups.mobilegroup.GroupHeader(_8);
});
}
if(!dojo.hostenv.findModule("xg.events.mobileevent.EventsPage",false)){
dojo.provide("xg.events.mobileevent.EventsPage");
xg.events.mobileevent.EventsPage=function(_1){
var _2={};
var _={};
_.SEARCH_KEYPRESS_DELAY=300;
_.hasMoreEvents=true;
_.pageNumber=1;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.loadMoreEvents);
_.initializeFilterMenu();
_.initializeSearchBar();
};
_.loadMoreEvents=function(){
var _4=_1.find("ul.events");
if(_4.length==0||!_.hasMoreEvents){
return;
}
_1.find(".no-results-message").hide();
x$(".footerSpinner",_1).css("visibility","visible");
var q=_1.find(".search").val()||"";
var _6="/events/mobileevent/listMore"+"?id="+_4.data("id")+"&view="+_4.data("view")+"&q="+encodeURIComponent(q)+"&page="+(_.pageNumber+1);
x$.get(_6,function(_7){
x$(".footerSpinner",_1).css("visibility","hidden");
if(q!=(_1.find(".search").val()||"")){
return;
}
if(_7.success){
var _8=_4.find(".divider:last");
x$(_7.html).hide().appendTo(_4).trigger("create").fadeIn("slow");
var _9=_8.nextAll(".divider:first");
if(_8.text()==_9.text()){
_9.hide();
}
_.hasMoreEvents=_7.hasMoreEvents;
_.pageNumber+=1;
}
if(_4.children().length==0){
_1.find(".no-results-message").text(_7.noResultsMessage).show();
}
},"json");
};
_.initializeFilterMenu=function(){
var _a=_1.find(".filterMenu .panel");
_1.find(".filterMenu > button").on("click",function(_b){
_b.stopPropagation();
_a.toggle();
});
var _c=_1.find("ul.events");
_1.find(".filterMenu a").on("click",function(_d){
_a.hide();
_c.data("view",x$(this).data("view"));
_1.find(".search").val("");
_.reloadEvents();
});
_1.on("click",function(){
_a.hide();
});
};
_.initializeSearchBar=function(){
var _e=0;
_1.find(".search").on("keyup change",function(){
clearTimeout(_e);
_e=setTimeout(_.reloadEvents,_.SEARCH_KEYPRESS_DELAY);
});
};
_.reloadEvents=function(){
var _f=_1.find("ul.events");
_f.empty();
_.pageNumber=0;
_.hasMoreEvents=true;
_.loadMoreEvents();
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".events.page",function(_10){
xg.events.mobileevent.EventsPage(_10);
});
}
if(!dojo.hostenv.findModule("xg.events.mobileevent.EventHeader",false)){
dojo.provide("xg.events.mobileevent.EventHeader");
xg.events.mobileevent.EventHeader=function(_1){
var _={};
_.initialize=function(){
_.initializeForm();
_.initializeRsvpButton();
};
_.initializeRsvpButton=function(){
_1.find(".actionBar a.rsvp").bind("vclick",function(_3){
_3.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-rsvp-form)").slideUp("fast");
_1.find(".action-bar-rsvp-form").slideToggle("fast");
});
};
_.initializeForm=function(){
var _4=_1.find("form.rsvp");
_4.find(".confirm-button a, .cancel-button").on("vclick",function(e){
e.preventDefault();
var _6=x$(this);
if(_6.data("url")){
_4.prop("action",_6.data("url"));
_4.submit();
}else{
_1.find(".action-bar-rsvp-form").slideToggle("fast");
}
});
};
_.initialize();
};
xg.mobile.PageInit.addListener(".event.page",function(_7){
xg.events.mobileevent.EventHeader(_7);
});
}
if(!dojo.hostenv.findModule("xg.events.mobileprofile.EventMembersPage",false)){
dojo.provide("xg.events.mobileprofile.EventMembersPage");
xg.events.mobileprofile.EventMembersPage=function(_1){
var _2={};
var _={};
_.loadingContent=false;
_.page=1;
_.hasMoreMembers=true;
_.initialize=function(){
_.hasMoreMembers=_1.find("ul.members").data("hasMoreMembers");
xg.mobile.DetectScrollToBottom.addListener(_1,_.scrollForMore);
};
_.scrollForMore=function(){
if(_.loadingContent){
return;
}
if(!_.hasMoreMembers){
return;
}
var _4=_1.find("ul.members");
_.loadingContent=true;
x$(".footerSpinner",_1).css("visibility","visible");
var _5=_4.data("listMoreUrl")+"?id="+(_4.data("eventId")||"")+"&page="+(_.page+1);
x$.get(_5,function(_6){
_.loadingContent=false;
x$(".footerSpinner",_1).css("visibility","hidden");
if(_6.success){
x$(_6.html).hide().appendTo(_4).trigger("create").fadeIn("slow");
_.hasMoreMembers=_6.hasMoreMembers;
_.page+=1;
}
},"json");
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".event.members.page",function(_7){
xg.events.mobileprofile.EventMembersPage(_7);
});
}
if(!dojo.hostenv.findModule("xg.forum.mobilediscussion.DiscussionsPage",false)){
dojo.provide("xg.forum.mobilediscussion.DiscussionsPage");
xg.forum.mobilediscussion.DiscussionsPage=function(_1){
var _2={};
var _={};
_.SEARCH_KEYPRESS_DELAY=300;
_.page=1;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.loadMoreDiscussions);
_.initializeAddActionButton();
_.initializeAddDiscussionForm();
_.initializeFilterMenu();
_.initializeSearchBar();
};
_.initializeSearchBar=function(){
var _4=0;
_1.find(".search").on("keyup change",function(){
clearTimeout(_4);
_4=setTimeout(_.reloadDiscussions,_.SEARCH_KEYPRESS_DELAY);
});
};
_.initializeFilterMenu=function(){
var _5=_1.find(".filterMenu .panel");
_1.find(".filterMenu > button").on("click",function(_6){
_6.stopPropagation();
_5.toggle();
});
var _7=_1.find("ul.discussions");
_1.find(".filterMenu a").on("click",function(_8){
_5.hide();
_1.find(".search").val("");
_7.data("view",x$(this).data("view"));
_.reloadDiscussions();
});
_1.on("click",function(){
_5.hide();
});
};
_.loadMoreDiscussions=function(){
var _9=_1.find("ul.discussions");
if(_9.length==0){
return;
}
if(!_9.data("hasMoreDiscussions")){
return;
}
_1.find(".no-results-message").hide();
x$(".footerSpinner",_1).css("visibility","visible");
var q=_1.find(".search").val()||"";
var _b=_9.data("listMoreUrl")+"?view="+_9.data("view")+"&q="+encodeURIComponent(q)+"&groupId="+(_9.data("groupId")||"")+"&showExcerpts="+_9.data("showExcerpts")+"&page="+(_.page+1);
x$.get(_b,function(_c){
x$(".footerSpinner",_1).css("visibility","hidden");
if(q!=(_1.find(".search").val()||"")){
return;
}
if(_c.success){
x$(_c.html).hide().appendTo(_9).trigger("create").fadeIn("slow");
_9.data("hasMoreDiscussions",_c.hasMoreDiscussions);
_.page+=1;
}
if(_9.children().length==0){
_1.find(".no-results-message").text(_c.noResultsMessage).show();
}
},"json");
};
_.reloadDiscussions=function(){
var _d=_1.find("ul.discussions");
_d.empty();
_.page=0;
_d.data("hasMoreDiscussions",true);
_.loadMoreDiscussions();
};
_.updateSubmitButton=function(_e){
_e.find("input[type=submit]").button(_.formIsValid(_e)?"enable":"disable");
};
_.formIsValid=function(_f){
return x$.trim(_f.find("[name=title]").val())&&x$.trim(_f.find("[name=description]").val());
};
_.initializeAddDiscussionForm=function(){
var _10=_1.find(".add-discussion-form");
_.updateSubmitButton(_10);
xg.mobile.Form.showLabelsIfPlaceholdersNotSupported(_1);
_10.on("change keyup",function(){
_.updateSubmitButton(_10);
});
_10.submit(function(_11){
_11.preventDefault();
if(!_.formIsValid(_10)){
return;
}
if(xg.captchaValidated||!_10.data("showCaptchaDialog")){
_.onSubmit(_10);
}else{
var _12=new xg.index.mobilecaptcha.CaptchaDialog(_1,function(){
xg.captchaValidated=true;
_.onSubmit(_10);
});
_12.show();
}
});
};
_.showErrors=function(_13,_14){
var _15=x$("<ul></ul>");
for(var i=0;i<_14.length;i++){
_15.append(x$("<li>"+_14[i]+"</li>"));
}
_13.find(".error").html(_15).show();
};
_.onSubmit=function(_17){
if(_17.data("submitting")){
return;
}
var _18={xg_token:xg.token,title:x$.trim(_17.find("[name=title]").val()),description:x$.trim(_17.find("[name=description]").val()),categoryId:x$.trim(_17.find("[name=categoryId]").val())};
_17.find(".error").hide();
_17.data("submitting",true);
_17.slideUp("fast");
x$.post(_17.prop("action"),_18,function(_19){
if(_19.success){
xg.changePage(_19.url);
}else{
var _1a=[];
if(_19.error){
_1a.push(_19.error);
}
if(_19.errors){
x$.each(_19.errors,function(_1b,_1c){
_1a.push(_1c);
});
}
window.scrollTo(0,0);
_17.slideDown("fast");
_.showErrors(_17,_1a);
}
_17.data("submitting",false);
});
};
_.initializeAddActionButton=function(){
var _1d=_1.find(".actionBar a.add");
_1d.bind("vclick",function(_1e){
_1e.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-add-discussion-form)").slideUp("fast");
_1.find(".action-bar-add-discussion-form").slideToggle("fast");
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".discussions.page",function(_1f){
xg.forum.mobilediscussion.DiscussionsPage(_1f);
});
}
if(!dojo.hostenv.findModule("xg.index.util.ScrollIntoView",false)){
dojo.provide("xg.index.util.ScrollIntoView");
xg.index.util.ScrollIntoView={scrollIntoView:function(_1){
var _2=x$(_1);
var _3=_2.css("padding-top");
var _4=_2.css("padding-bottom");
var _5=_3&&_3.indexOf("px")>-1?parseInt(_3,10):0;
var _6=_4&&_4.indexOf("px")>-1?parseInt(_4,10):0;
var _7={top:_2.offset().top+_5,bottom:_2.offset().top+_2.height()+_6};
var _8={top:x$(window).scrollTop(),bottom:x$(window).scrollTop()+x$(window).height()};
var _9;
if(_7.top<_8.top){
_9=_7.top;
}else{
if(_7.bottom>_8.bottom){
_9=Math.min(_7.top,_8.top+(_7.bottom-_8.bottom));
}
}
if(_9){
x$("html,body").animate({scrollTop:_9},100);
}
}};
}
if(!dojo.hostenv.findModule("xg.forum.mobilediscussion.DiscussionPage",false)){
dojo.provide("xg.forum.mobilediscussion.DiscussionPage");
xg.forum.mobilediscussion.DiscussionPage=function(_1){
var _2={};
var _={};
_.$commentLink=_1.find(".actionBar a.comment");
_.commentCount=_.$commentLink.data("count");
_.initialize=function(){
_.initializeLoadPreviousCommentsLinks();
_.initializeCommentForms();
_.initializeCommentActionButton();
_.initializeCommentLinks();
_.initializeDeleteAction();
};
_.initializeDeleteAction=function(){
_1.find("div.comment-section").on("swipeleft swiperight","li",function(_4){
_4.stopPropagation();
var _5=x$(this);
var _6=_5.data("swipeEvent");
if(!_6){
_5.data("swipeEvent",_4.type);
_.showDeleteButton(_5);
}else{
if(_6!=_4.type){
_5.data("swipeEvent",null);
_5.find("> .lead-comment .delete-section").hide();
}
}
});
};
_.showDeleteButton=function(_7){
_7.find("> .lead-comment .delete-section").show();
var _8=_7.find("> .lead-comment .delete-button");
var _9=false;
_8.off("click");
_8.on("click",function(_a){
if(_9){
return;
}
_9=true;
var _b=_8.data("url");
x$.post(_b,{xg_token:xg.token},function(_c){
if(_c.success){
_.removeCommentFromPage(_7);
}
});
});
};
_.removeCommentFromPage=function(_d){
if(_d.filter(".level-0").length>0){
var _e=_d.find("> .lead-comment a.show-comments");
if(_e.data("count")>0){
var _f=_d.find("> .lead-comment .delete-button").data("deletedText");
_d.find(".lead-comment:first").children().not(".show-comments, .xg_user_generated").remove();
_d.find(".xg_user_generated:first").html("<p>"+_f+"</p>");
_d.find("form").remove();
_d.find("a.reply").remove();
_d.addClass("deleted");
}else{
_d.remove();
_.setCurrentCommentThread(_1.find("div.comment-section"),false,null);
}
}else{
var _10=_d.closest(".level-0");
var _e=_10.find("> .lead-comment a.show-comments");
var _11=_e.data("count")-1;
_e.data("count",_11);
_e.text(_11>0?_11:"");
_d.remove();
if(_11<=0){
_.setCurrentCommentThread(_1.find("div.comment-section"),false,null);
if(_10.hasClass("deleted")){
_10.remove();
}
}
}
_.commentCount-=1;
_.$commentLink.text(_.commentCount);
if(_.commentCount<=0){
_1.find(".comment-section").hide();
}
};
_.initializeLoadPreviousCommentsLinks=function(){
var _12=false;
_1.on("click",".load-previous-comments-link",function(_13){
_13.preventDefault();
if(_12){
return;
}
_12=true;
var _14=x$(this);
_14.find("img.spinner").show();
var url=_14.data("url")+"&maxDate="+_14.data("firstCommentDate");
x$.get(url,function(_16){
if(_16.success){
_14.toggle(_16.hasMoreComments);
x$(_16.html).hide().prependTo(_14.next("ul.comments")).trigger("create").slideDown();
_14.data("firstCommentDate",_16.firstCommentDate);
if(!_16.hasMoreComments){
_14.remove();
}
}
_12=false;
_14.find("img.spinner").hide();
});
});
};
_.updateSubmitButton=function(_17){
_17.find("input[type=submit]").button(_.formIsValid(_17)?"enable":"disable");
};
_.fixSubmitButton=function(_18){
var _19=_18.find("input[type=submit]");
var _1a=_19.parent();
_1a.after(_19).remove();
_19.attr("class","");
_18.trigger("create");
};
_.formIsValid=function(_1b){
return !!x$.trim(_1b.find("[name=comment]").val());
};
_.initializeCommentForms=function(){
_1.find(".comment-form").each(function(_1c){
_.updateSubmitButton(x$(this));
});
_1.on("change keyup",".comment-form",function(){
_.updateSubmitButton(x$(this));
});
_1.on("submit",".comment-form",function(_1d){
_1d.preventDefault();
var _1e=x$(this);
if(!_.formIsValid(_1e)){
return;
}
if(xg.captchaValidated||!_1e.data("showCaptchaDialog")){
_.onSubmit(_1e);
}else{
var _1f=new xg.index.mobilecaptcha.CaptchaDialog(_1,function(){
xg.captchaValidated=true;
_.onSubmit(_1e);
});
_1f.show();
}
});
};
_.onSubmit=function(_20){
if(_20.data("submitting")){
return;
}
var _21={xg_token:xg.token,pageType:_20.find("[name=pageType]").val(),comment:x$.trim(_20.find("[name=comment]").val())};
if(!_21.comment){
return;
}
_20.data("submitting",true);
_20.find("[name=comment]").val("");
if(_20.hasClass("action-bar-comment-form")){
_20.slideUp("fast");
}
var _22=_20.data("parentCommentId")||null;
var url=_20.prop("action")+"&format=json&parentCommentId="+_22;
x$.post(url,_21,function(_24){
if(_24.success){
_1.find("div.comment-section").show();
if(_22){
var $ul=_1.find("li[data-comment-id=\""+_22+"\"] ul.comments");
}else{
var $ul=_1.find("ul.comments").filter(":first");
}
$comment=x$(_24.html).css("opacity",0).appendTo($ul).trigger("create");
$comment.animate({opacity:1},400);
if(!_22){
_.setCurrentCommentThread(_1.find("div.comment-section"),false,null);
}
if(_20.hasClass("inline-comment-form")){
_20.fadeOut();
_20.closest("li").children("a.reply").show();
}
_.commentCount+=1;
_.$commentLink.text(_.commentCount);
if(_20.data("countLink")){
var _26=_20.data("countLink").data("count")+1;
_20.data("countLink").data("count",_26);
_20.data("countLink").text(_26);
}
setTimeout(function(){
xg.index.util.ScrollIntoView.scrollIntoView($comment[0]);
},1);
}else{
if(_24.htmlErrorMessage){
_.showError(_24.htmlErrorMessage);
}
}
_20.data("submitting",false);
});
};
_.showError=function(_27){
x$("<div>").simpledialog2({headerText:_1.find(".comment-form").data("errorDialogHeading"),headerClose:true,blankContent:"<p>"+_27+"</p>"});
};
_.initializeCommentActionButton=function(){
var _28=_1.find(".actionBar a.comment");
_28.attr("href","#");
_28.bind("vclick",function(_29){
_29.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-comment-form)").slideUp("fast");
_1.find(".action-bar-comment-form").slideToggle("fast");
});
};
_2.incrementViewCount=function(){
var _2a=_1.find(".content");
if(_2a.data("updateViewCountUrl")){
x$.post(_2a.data("updateViewCountUrl"),{xg_token:xg.token,key:_2a.data("contentId"),x:_2a.data("updateViewCountHash")});
}
};
_.setCurrentCommentThread=function(_2b,_2c,_2d){
_2d=_2d||function(){
};
if(_2b.data("childCommentsLoaded")){
_.setCurrentCommentThreadProper(_2b,_2c);
_2d();
}else{
if(_2b.data("loadingChildComments")){
return;
}
_2b.data("loadingChildComments",true);
x$.get(_2b.data("loadChildCommentsUrl"),function(_2e){
if(_2e.success){
var $ul=_2b.find("ul.threaded");
x$(_2e.html).appendTo($ul).trigger("create");
_.setCurrentCommentThreadProper(_2b,_2c);
_2b.data("childCommentsLoaded",true);
_2d();
_2b.find(".load-previous-comments-link").data("firstCommentDate",_2e.firstCommentDate);
}
_2b.data("loadingChildComments",false);
});
}
};
_.setCurrentCommentThreadProper=function(_30,_31){
var _32=_1.find("div.comment-section").find("li.current, ul.current");
_32.find(".inline-comment-form, > a.reply").hide();
_1.find(".footer-comment-form").hide();
_32.removeClass("current");
if(_30.is("div.comment-section")){
_1.find("div.comment-section").find("> .load-previous-comments-link").show();
_30.children("ul.threaded").addClass("current");
_1.find("div.page-body > a.reply").show();
_1.find(".footer-comment-form").toggle(_31).find("textarea").val("");
}else{
_1.find("div.comment-section").find("> .load-previous-comments-link").hide();
_30.addClass("current");
_30.children(".nested-comments").children("ul.threaded").addClass("current");
var _33=_.addInlineCommentForm(_30);
_33.toggle(_31).find("textarea").val("");
_30.find("> a.reply").toggle(!_31);
_1.find("div.page-body > a.reply").hide();
_.updateSubmitButton(_33);
}
};
_.addInlineCommentForm=function($li){
var _35=$li.find(".inline-comment-form");
if(_35.length>0){
return _35;
}
_35=_1.find(".cloneable.inline-comment-form").clone();
_35.removeClass("cloneable");
_35.data("parentCommentId",$li.data("commentId"));
_35.data("countLink",$li.find("> .lead-comment a.show-comments"));
_35.prop("action",_35.prop("action")+"&parentCommentId="+$li.data("commentId"));
$li.children(".nested-comments").append(_35);
_.fixSubmitButton(_35);
return _35;
};
_.initializeCommentLinks=function(){
_1.find("div.comment-section").on("click","a.reply",function(_36){
_36.preventDefault();
var $li=x$(this).closest("li");
_.setCurrentCommentThread($li,true,function(){
xg.index.util.ScrollIntoView.scrollIntoView($li.find(".inline-comment-form")[0]);
});
}).on("click","a.show-comments",function(_38){
_38.preventDefault();
var $li=x$(this).closest("li");
_.setCurrentCommentThread($li,false,function(){
xg.index.util.ScrollIntoView.scrollIntoView($li[0]);
});
}).on("click","a.close-comments",function(_3a){
_3a.preventDefault();
var $li=x$(this).closest("li");
_.setCurrentCommentThread(_1.find("div.comment-section"),false,function(){
xg.index.util.ScrollIntoView.scrollIntoView($li[0]);
});
});
_1.find("div.page-body > a.reply").on("click",function(_3c){
_3c.preventDefault();
_1.find("div.comment-section").show();
_.setCurrentCommentThread(_1.find("div.comment-section"),true,function(){
_1.find("div.page-body > a.reply").hide();
xg.index.util.ScrollIntoView.scrollIntoView(_1.find(".footer-comment-form")[0]);
});
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".discussion.page",function(_3d){
var _3e=xg.forum.mobilediscussion.DiscussionPage(_3d);
xg.mobile.PageShow.addListenerToPage(_3d,_3e.incrementViewCount);
});
}
if(!dojo.hostenv.findModule("xg.photo.mobilephoto.PhotoPage",false)){
dojo.provide("xg.photo.mobilephoto.PhotoPage");
xg.photo.mobilephoto.PhotoPage=function(_1){
var _2={};
var _={};
_.SWIPE_EVENT_BUFFER_TIME=3000;
_2.incrementViewCount=function(){
var _4=_1.find(".content");
x$.post(_4.data("incrementViewCountUrl"),{xg_token:xg.token,id:_4.data("contentId")});
if(_4.data("updateViewCountUrl")){
x$.post(_4.data("updateViewCountUrl"),{xg_token:xg.token,key:_4.data("contentId"),x:_4.data("updateViewCountHash")});
}
};
_2.bindSwipeEvents=function(){
var _5=_1.find(".content .swipearea");
var _6=0;
_5.on("swipeleft swiperight vclick",function(_7){
if(new Date().getTime()-_6<_.SWIPE_EVENT_BUFFER_TIME){
return;
}
_6=new Date().getTime();
var _8=$(this);
var _9=_8.closest(".content");
switch(_7.type){
case "swiperight":
if(!_9.data("prevUrl")){
return;
}
_8.addClass("loading");
$.mobile.pageContainer.on("pagechange",function(){
_8.removeClass("loading");
});
xg.changePage(_9.data("prevUrl"),{transition:"slide",reverse:true});
break;
case "swipeleft":
if(!_9.data("nextUrl")){
return;
}
_8.addClass("loading");
$.mobile.pageContainer.on("pagechange",function(){
_8.removeClass("loading");
});
xg.changePage(_9.data("nextUrl"),{transition:"slide"});
break;
case "vclick":
default:
window.location.href=_9.data("largePhotoUrl");
break;
}
});
};
return _2;
};
xg.mobile.PageInit.addListener(".photo.page",function(_a){
var _b=xg.photo.mobilephoto.PhotoPage(_a);
xg.mobile.PageShow.addListenerToPage(_a,_b.incrementViewCount);
_b.bindSwipeEvents();
});
}
if(!dojo.hostenv.findModule("xg.photo.mobilephoto.PhotosPage",false)){
dojo.provide("xg.photo.mobilephoto.PhotosPage");
xg.photo.mobilephoto.PhotosPage=function(_1){
var _2={};
var _={};
_.SEARCH_KEYPRESS_DELAY=300;
_.hasMorePhotos=true;
_.totalPhotos=0;
_.currentPage=1;
_.initialize=function(){
xg.mobile.DetectScrollToBottom.addListener(_1,_.loadMorePhotos);
_.totalPhotos=_1.find(".photos").data("total");
if(_.totalPhotos<=_1.find(".photos").find("li").length){
_.hasMorePhotos=false;
}
_.initializeAddActionButton();
_.initializeAddPhotoForm();
_.initializeFilterMenu();
_.initializeSearchBar();
};
_.loadMorePhotos=function(){
if(!_.hasMorePhotos){
return;
}
x$(".footerSpinner",_1).css("visibility","visible");
var q=_1.find(".search").val()||"";
var _5="/photo/mobilephoto/listMore"+"?view="+_1.find(".photos").data("view")+"&page="+(_.currentPage+1)+"&q="+encodeURIComponent(q);
x$.get(_5,function(_6){
x$(".footerSpinner",_1).css("visibility","hidden");
if(q!=(_1.find(".search").val()||"")){
return;
}
if(_6.success){
x$(_6.html).hide().appendTo(_1.find(".photos")).trigger("create").fadeIn("slow");
_.totalPhotos=_6.total;
_.hasMorePhotos=_6.hasMorePhotos;
_.currentPage++;
}
},"json");
};
_.updateSubmitButton=function(_7){
_7.find("input[type=submit]").button(_.formIsValid(_7)?"enable":"disable");
};
_.formIsValid=function(_8){
return x$.trim(_8.find("[name=title]").val())&&_8.find("[name=content]").val();
};
_.initializeAddPhotoForm=function(){
var _9=_1.find(".add-photo-form");
var _a=_9.find(".fileinputs .fakefile .filename");
var _b=_9.find(".fileinputs input[type=\"file\"]");
var _c=new RegExp("^.*[/\\\\]");
_.updateSubmitButton(_9);
xg.mobile.Form.showLabelsIfPlaceholdersNotSupported(_1);
_9.on("change keyup",function(){
_.updateSubmitButton(_9);
});
_b.on("change mouseout",function(){
var _d=$(this).val().replace(_c,"");
_a.text(_d);
});
};
_.initializeAddActionButton=function(){
if(!xg.mobile.Form.isFileUploadingSupported()){
_1.find(".actionBar a.add").hide();
if(_1.find(".actionBar a").length===1){
_1.find(".actionBarContainer").hide();
}
return;
}
_1.find(".actionBar a.add").bind("vclick",function(_e){
_e.preventDefault();
_1.find(".action-bar-dropdown:not(.action-bar-add-photo-form)").slideUp("fast");
_1.find(".action-bar-add-photo-form").slideToggle("fast");
});
};
_.initializeSearchBar=function(){
var _f=0;
_1.find(".search").on("keyup change",function(){
clearTimeout(_f);
_f=setTimeout(_.reloadPhotos,_.SEARCH_KEYPRESS_DELAY);
});
};
_.initializeFilterMenu=function(){
var _10=_1.find(".filterMenu .panel");
_1.find(".filterMenu > button").on("click",function(_11){
_11.stopPropagation();
_10.toggle();
});
var $ul=_1.find("ul.photos");
_1.find(".filterMenu a").on("click",function(_13){
_10.hide();
$ul.data("view",x$(this).data("view"));
_1.find(".search").val("");
_.reloadPhotos();
});
_1.on("click",function(){
_10.hide();
});
};
_.reloadPhotos=function(){
var $ul=_1.find("ul.photos");
$ul.empty();
_.currentPage=0;
_.hasMorePhotos=true;
_.loadMorePhotos();
};
_2.showErrorDialogOnce=function(){
if(_1.data("errorDialogChecked")){
return;
}
_1.data("errorDialogChecked",true);
if(_1.find(".error-dialog").length==0){
return;
}
_1.find(".error-dialog").simpledialog2();
var _15=x$.mobile.sdCurrentDialog.sdIntContent;
_15.find(".ok-button").click(function(_16){
_16.preventDefault();
x$.mobile.sdCurrentDialog.close();
});
};
_.initialize();
return _2;
};
xg.mobile.PageInit.addListener(".photoList.page",function(_17){
var _18=xg.photo.mobilephoto.PhotosPage(_17);
xg.mobile.PageShow.addListenerToPage(_17,_18.showErrorDialogOnce);
});
}
