/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/contrib/picture/picturefill/matchmedia.js. */
window.matchMedia=window.matchMedia||(function(doc,window,Drupal){"use strict";var docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement("body"),div=doc.createElement("div");div.id="mq-test-1";div.style.cssText="position:absolute;top:-100em";fakeBody.style.background="none";fakeBody.appendChild(div)
function MediaQueryList(q){this.media=q;this.matches=false;this.check.call(this)};MediaQueryList.prototype={listeners:[],check:function(){var isApplied;div.innerHTML="&shy;<style media=\""+this.media+"\"> #mq-test-1 {width: 42px;}</style>";docElem.insertBefore(fakeBody,refNode);isApplied=div.offsetWidth===42;docElem.removeChild(fakeBody);this.matches=isApplied},addListener:function(callback){var handler=(function(mql,debounced){return function(){var oldstate=mql.matches;mql.check();if(oldstate!==mql.matches)debounced.call(mql,mql)}}(this,Drupal.debounce(callback,250)));this.listeners.push({callback:callback,handler:handler});if('addEventListener'in window){window.addEventListener('resize',handler);window.addEventListener('orientationchange',handler)}else if('attachEvent'in window){window.attachEvent('onresize',handler);window.attachEvent('onorientationchange',handler)}},removeListener:function(callback){for(var i=0,listeners=this.listeners;i<listeners.length;i++)if(listeners[i].callback===callback){if('removeEventListener'in window){window.removeEventListener('resize',listeners[i].handler);window.removeEventListener('orientationchange',listeners[i].handler)}else if('detachEvent'in window){window.detachEvent('onresize',listeners[i].handler);window.detachEvent('onorientationchange',listeners[i].handler)};listeners.splice(i,1)}}};return function(q){return new MediaQueryList(q)}}(document,window,Drupal));;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/contrib/picture/picturefill/matchmedia.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/contrib/picture/picturefill/picturefill.js. */
(function(w,parent){"use strict";w.picturefill=function(parent){function _copyAttributes(src,tar){if(src.getAttribute('data-width')&&src.getAttribute('data-height')){tar.width=src.getAttribute('data-width');tar.height=src.getAttribute('data-height')}else{tar.removeAttribute('width');tar.removeAttribute('height')}};if(!parent||!parent.getElementsByTagName)parent=w.document;var ps=parent.getElementsByTagName('span');for(var i=0,il=ps.length;i<il;i++)if(ps[i].getAttribute('data-picture')!==null){var sources=ps[i].getElementsByTagName('span'),picImg=null,matches=[];for(var j=0,jl=sources.length;j<jl;j++){var media=sources[j].getAttribute('data-media');if(!media||(w.matchMedia&&w.matchMedia(media).matches))matches.push(sources[j])};if(matches.length){var match=matches.pop();picImg=ps[i].getElementsByTagName('img')[0];if(!picImg){picImg=w.document.createElement('img');picImg.alt=ps[i].getAttribute('data-alt')||'';picImg.title=ps[i].getAttribute('data-title')||'';ps[i].appendChild(picImg)};if(picImg.getAttribute('src')!==match.getAttribute('data-src')){picImg.src=match.getAttribute('data-src');_copyAttributes(match,picImg)}}}};if(w.addEventListener){w.addEventListener('resize',w.picturefill,false);w.addEventListener('DOMContentLoaded',function(){w.picturefill();w.removeEventListener('load',w.picturefill,false)},false);w.addEventListener('load',w.picturefill,false)}else if(w.attachEvent)w.attachEvent('onload',w.picturefill)})(this);;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/contrib/picture/picturefill/picturefill.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/contrib/picture/picture.js. */
if(typeof Drupal!=='undefined'&&typeof jQuery!=='undefined')(function($){Drupal.behaviors.picture={attach:function(context){window.picturefill($(context));if(context==='#cboxLoadedContent'&&$(context).find('picture, [data-picture]').length){$.colorbox.resize();$('img',context).once('colorbox-lazy-load',function(){$(this).load(function(){this.style.maxHeight=$(window).height()+'px';this.style.maxWidth=$(window).width()+'px';$.colorbox.resize({innerHeight:this.height,innerWidth:this.width});this.style.maxHeight=null;this.style.maxWidth=null})})}}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/contrib/picture/picture.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/contrib/ckeditor/plugins/media/library.js. */
(function($){Drupal.media=Drupal.media||{};Drupal.settings.ckeditor.plugins['media']={initializeTagMap:function(){if(typeof Drupal.settings.tagmap=='undefined')Drupal.settings.tagmap={}},invoke:function(data,settings,instanceId){if(data.format=='html')Drupal.media.popups.mediaBrowser(function(mediaFiles){Drupal.settings.ckeditor.plugins['media'].mediaBrowserOnSelect(mediaFiles,instanceId)},settings.global)},mediaBrowserOnSelect:function(mediaFiles,instanceId){var mediaFile=mediaFiles[0],options={};Drupal.media.popups.mediaStyleSelector(mediaFile,function(formattedMedia){Drupal.settings.ckeditor.plugins['media'].insertMediaFile(mediaFile,formattedMedia.type,formattedMedia.html,formattedMedia.options,CKEDITOR.instances[instanceId])},options);return},insertMediaFile:function(mediaFile,viewMode,formattedMedia,options,ckeditorInstance){this.initializeTagMap();var imgElement=$(this.stripDivs(formattedMedia));this.addImageAttributes(imgElement,mediaFile.fid,viewMode,options);var toInsert=this.outerHTML(imgElement),inlineTag=Drupal.settings.ckeditor.plugins['media'].createTag(imgElement);Drupal.settings.tagmap[inlineTag]=toInsert;ckeditorInstance.insertHtml(toInsert)},outerHTML:function(element){return $('<div>').append(element.eq(0).clone()).html()},addImageAttributes:function(imgElement,fid,view_mode,additional){imgElement.addClass('media-image');this.forceAttributesIntoClass(imgElement,fid,view_mode,additional)},stripDivs:function(formattedMedia){var stripped=null;if($(formattedMedia).is('img')){stripped=this.outerHTML($(formattedMedia))}else stripped=this.outerHTML($('img',$(formattedMedia)));return stripped},attach:function(content,settings,instanceId){var matches=content.match(/\[\[.*?\]\]/g);this.initializeTagMap();var tagmap=Drupal.settings.tagmap;if(matches){var inlineTag="";for(i=0;i<matches.length;i++){inlineTag=matches[i];if(tagmap[inlineTag]){var tagContent=tagmap[inlineTag],mediaMarkup=this.stripDivs(tagContent),_tag=inlineTag;_tag=_tag.replace('[[','');_tag=_tag.replace(']]','');mediaObj=JSON.parse(_tag);var imgElement=$(mediaMarkup);this.addImageAttributes(imgElement,mediaObj.fid,mediaObj.view_mode);var toInsert=this.outerHTML(imgElement);content=content.replace(inlineTag,toInsert)}else debug.debug("Could not find content for "+inlineTag)}};return content},detach:function(content,settings,instanceId){var content=$('<div>'+content+'</div>');$('img.media-image',content).each(function(elem){var tag=Drupal.settings.ckeditor.plugins['media'].createTag($(this));$(this).replaceWith(tag);var newContent=content.html(),tagContent=$('<div></div>').append($(this)).html();Drupal.settings.tagmap[tag]=tagContent});return content.html()},createTag:function(imgNode){var mediaAttributes={},imgElement=imgNode[0],sorter=[];for(i=0;i<imgElement.attributes.length;i++){var attr=imgElement.attributes[i];if(attr.specified==true)if(attr.name!=='class'){sorter.push(attr)}else{var attributes=this.getAttributesFromClass(attr.value);for(var name in attributes)if(attributes.hasOwnProperty(name)){var value=attributes[name];if(value.type&&value.type==='attr')sorter.push(value)}}};sorter.sort(this.sortAttributes);for(var prop in sorter)mediaAttributes[sorter[prop].name]=sorter[prop].value;if(jQuery.browser.msie&&jQuery.browser.version=='7.0'){if(mediaAttributes.style==="null"){var imgHeight=imgNode.css('height'),imgWidth=imgNode.css('width');mediaAttributes.style={height:imgHeight,width:imgWidth};if(!mediaAttributes.width)mediaAttributes.width=imgWidth;if(!mediaAttributes.height)mediaAttributes.height=imgHeight};if(Number(mediaAttributes.width)===0)mediaAttributes.width=imgNode.css('width');if(mediaAttributes.width==='auto')delete mediaAttributes.width;if(Number(mediaAttributes.height)===0)mediaAttributes.height=imgNode.css('height');if(mediaAttributes.height==='auto')delete mediaAttributes.height};for(var blackList in Drupal.settings.media.blacklist)delete mediaAttributes[Drupal.settings.media.blacklist[blackList]];tagContent={type:'media',view_mode:attributes.view_mode.value,fid:attributes.fid.value,attributes:mediaAttributes};return'[['+JSON.stringify(tagContent)+']]'},forceAttributesIntoClass:function(imgElement,fid,view_mode,additional){var wysiwyg=imgElement.attr('wysiwyg');if(wysiwyg)imgElement.addClass('attr__wysiwyg__'+wysiwyg);var format=imgElement.attr('format');if(format)imgElement.addClass('attr__format__'+format);var typeOf=imgElement.attr('typeof');if(typeOf)imgElement.addClass('attr__typeof__'+typeOf);if(fid)imgElement.addClass('img__fid__'+fid);if(view_mode)imgElement.addClass('img__view_mode__'+view_mode);if(additional)for(var name in additional)if(additional.hasOwnProperty(name))if(name!=='alt')imgElement.addClass('attr__'+name+'__'+additional[name])},getAttributesFromClass:function(classString){var actualClasses=[],otherAttributes=[],classes=classString.split(' '),regexp=new RegExp('^(attr|img)__([^\S]*)__([^\S]*)$');for(var index=0;index<classes.length;index++){var matches=classes[index].match(regexp);if(matches&&matches.length===4){otherAttributes[matches[2]]={name:matches[2],value:matches[3],type:matches[1]}}else actualClasses.push(classes[index])};if(actualClasses.length>0)otherAttributes['class']={name:'class',value:actualClasses.join(' '),type:'attr'};return otherAttributes},sortAttributes:function(a,b){var nameA=a.name.toLowerCase(),nameB=b.name.toLowerCase();if(nameA<nameB)return-1;if(nameA>nameB)return 1;return 0}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/contrib/ckeditor/plugins/media/library.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/contrib/flexslider/assets/js/flexslider.load.js. */
(function($){Drupal.behaviors.flexslider={attach:function(context,settings){var sliders=[];if($.type(settings.flexslider)!=='undefined'&&$.type(settings.flexslider.instances)!=='undefined')for(id in settings.flexslider.instances)if(settings.flexslider.optionsets[settings.flexslider.instances[id]]!==undefined)if(settings.flexslider.optionsets[settings.flexslider.instances[id]].asNavFor!==''){_flexslider_init(id,settings.flexslider.optionsets[settings.flexslider.instances[id]],context)}else sliders[id]=settings.flexslider.optionsets[settings.flexslider.instances[id]];for(id in sliders)_flexslider_init(id,settings.flexslider.optionsets[settings.flexslider.instances[id]],context)}}
function _flexslider_init(id,optionset,context){$('#'+id,context).once('flexslider',function(){$(this).find('ul.slides > li > *').removeAttr('width').removeAttr('height');if(optionset){$(this).flexslider($.extend(optionset,{start:function(slider){slider.trigger('start')},before:function(slider){slider.trigger('before')},after:function(slider){slider.trigger('after')},end:function(slider){slider.trigger('end')},added:function(slider){slider.trigger('added')},removed:function(slider){slider.trigger('removed')}}))}else $(this).flexslider()})}}(jQuery));;
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/contrib/flexslider/assets/js/flexslider.load.js. */
/* Source and licensing information for the line(s) below can be found at http://www.programmableweb.com/sites/all/modules/contrib/ckeditor/includes/ckeditor.utils.js. */
if(typeof window.CKEDITOR_BASEPATH==='undefined')window.CKEDITOR_BASEPATH=Drupal.settings.ckeditor.editor_path;(function($){Drupal.ckeditor=(typeof CKEDITOR!='undefined');Drupal.ckeditor_ver=false;Drupal.ckeditorToggle=function(textarea_ids,TextTextarea,TextRTE){if(!CKEDITOR.env.isCompatible)return;for(i=0;i<textarea_ids.length;i++)if(typeof(CKEDITOR.instances)!='undefined'&&typeof(CKEDITOR.instances[textarea_ids[i]])!='undefined'){Drupal.ckeditorOff(textarea_ids[i]);$('#switch_'+textarea_ids[i]).text(TextRTE)}else{Drupal.ckeditorOn(textarea_ids[i]);$('#switch_'+textarea_ids[i]).text(TextTextarea)}};Drupal.ckeditorInit=function(textarea_id){var ckeditor_obj=Drupal.settings.ckeditor;$("#"+textarea_id).next(".grippie").css("display","none");$("#"+textarea_id).addClass("ckeditor-processed");var textarea_settings=false;ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].toolbar=eval(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].toolbar);textarea_settings=ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]];var drupalTopToolbar=$('#toolbar, #admin-menu',Drupal.overlayChild?window.parent.document:document);textarea_settings.on={configLoaded:function(ev){Drupal.ckeditor_ver=CKEDITOR.version.split('.')[0];if(Drupal.ckeditor_ver==3){ev.editor.addCss(ev.editor.config.extraCss)}else CKEDITOR.addCss(ev.editor.config.extraCss);ev.editor.on('change',function(ev){$(ev.editor.element.$).trigger('change')});ev.editor.on('blur',function(ev){$(ev.editor.element.$).trigger('blur')});ev.editor.on('focus',function(ev){$(ev.editor.element.$).trigger('click')})},instanceReady:function(ev){var body=$(ev.editor.document.$.body);if(typeof(ev.editor.dataProcessor.writer.setRules)!='undefined'){ev.editor.dataProcessor.writer.setRules('p',{breakAfterOpen:false});if(typeof(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].custom_formatting)!='undefined'){var dtd=CKEDITOR.dtd;for(var e in CKEDITOR.tools.extend({},dtd.$block,dtd.$listItem,dtd.$tableContent))ev.editor.dataProcessor.writer.setRules(e,ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].custom_formatting);ev.editor.dataProcessor.writer.setRules('pre',{indent:ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]].output_pre_indent})}};if(ev.editor.config.bodyClass)body.addClass(ev.editor.config.bodyClass);if(ev.editor.config.bodyId)body.attr('id',ev.editor.config.bodyId);if(typeof(Drupal.smileysAttach)!='undefined'&&typeof(ev.editor.dataProcessor.writer)!='undefined')ev.editor.dataProcessor.writer.indentationChars='    ';((ev.editor.editable&&ev.editor.editable())||ev.editor.document.getBody()).on('keyup',function(){$(ev.editor.element.$).trigger('keyup')});((ev.editor.editable&&ev.editor.editable())||ev.editor.document.getBody()).on('keydown',function(){$(ev.editor.element.$).trigger('keydown')})},focus:function(ev){Drupal.ckeditorInstance=ev.editor;Drupal.ckeditorActiveId=ev.editor.name},afterCommandExec:function(ev){if(ev.data.name!='maximize')return;if(ev.data.command.state==CKEDITOR.TRISTATE_ON){drupalTopToolbar.hide()}else drupalTopToolbar.show()}};if(typeof Drupal.settings.ckeditor.scayt_language!='undefined')textarea_settings.scayt_sLang=Drupal.settings.ckeditor.scayt_language;if(typeof textarea_settings.js_conf!='undefined')for(var add_conf in textarea_settings.js_conf)textarea_settings[add_conf]=eval(textarea_settings.js_conf[add_conf]);if(textarea_settings.width=='100%')textarea_settings.width='';if(CKEDITOR.loadFullCore){CKEDITOR.on('loaded',function(){textarea_settings=Drupal.ckeditorLoadPlugins(textarea_settings);Drupal.ckeditorInstance=CKEDITOR.replace(textarea_id,textarea_settings)});CKEDITOR.loadFullCore()}else{textarea_settings=Drupal.ckeditorLoadPlugins(textarea_settings);Drupal.ckeditorInstance=CKEDITOR.replace(textarea_id,textarea_settings)}};Drupal.ckeditorOn=function(textarea_id,run_filter){run_filter=typeof run_filter!='undefined'?run_filter:true;if(typeof textarea_id=='undefined'||textarea_id.length==0||$("#"+textarea_id).length==0)return;if((typeof(Drupal.settings.ckeditor.load_timeout)=='undefined')&&(typeof(CKEDITOR.instances[textarea_id])!='undefined'))return;if(typeof(Drupal.settings.ckeditor.elements[textarea_id])=='undefined')return;var ckeditor_obj=Drupal.settings.ckeditor;if(!CKEDITOR.env.isCompatible)return;if(run_filter&&($("#"+textarea_id).val().length>0)&&typeof(ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]])!='undefined'&&((ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]['ss']==1&&typeof(Drupal.settings.ckeditor.autostart)!='undefined'&&typeof(Drupal.settings.ckeditor.autostart[textarea_id])!='undefined')||ckeditor_obj.input_formats[ckeditor_obj.elements[textarea_id]]['ss']==2)){$.ajax({type:'POST',url:Drupal.settings.ckeditor.xss_url,async:false,data:{text:$('#'+textarea_id).val(),input_format:ckeditor_obj.textarea_default_format[textarea_id],token:Drupal.settings.ckeditor.ajaxToken},success:function(text){$("#"+textarea_id).val(text);Drupal.ckeditorInit(textarea_id)}})}else Drupal.ckeditorInit(textarea_id)};Drupal.ckeditorOff=function(textarea_id){if(!CKEDITOR.instances||typeof(CKEDITOR.instances[textarea_id])=='undefined')return;if(!CKEDITOR.env.isCompatible)return;if(Drupal.ckeditorInstance&&Drupal.ckeditorInstance.name==textarea_id)delete Drupal.ckeditorInstance;$("#"+textarea_id).val(CKEDITOR.instances[textarea_id].getData());CKEDITOR.instances[textarea_id].destroy(true);$("#"+textarea_id).next(".grippie").css("display","block")};Drupal.ckeditorLoadPlugins=function(textarea_settings){if(typeof(textarea_settings.extraPlugins)=='undefined')textarea_settings.extraPlugins='';if(typeof CKEDITOR.plugins!='undefined')for(var plugin in textarea_settings.loadPlugins)if(typeof(textarea_settings.loadPlugins[plugin]['active'])=='undefined'||textarea_settings.loadPlugins[plugin]['active']==1){textarea_settings.extraPlugins+=(textarea_settings.extraPlugins)?','+textarea_settings.loadPlugins[plugin]['name']:textarea_settings.loadPlugins[plugin]['name'];CKEDITOR.plugins.addExternal(textarea_settings.loadPlugins[plugin]['name'],textarea_settings.loadPlugins[plugin]['path'])};return textarea_settings};Drupal.ckeditorCompareVersion=function(version){var ckver=CKEDITOR.version;ckver=ckver.match(/(([\d]\.)+[\d]+)/i);version=version.match(/((\d+\.)+[\d]+)/i);ckver=ckver[0].split('.');version=version[0].split('.');for(var x in ckver)if(ckver[x]<version[x]){return false}else if(ckver[x]>version[x])return true;return true};Drupal.ckeditorInsertHtml=function(html){if(!Drupal.ckeditorInstance)return false;if(Drupal.ckeditorInstance.mode=='wysiwyg'){Drupal.ckeditorInstance.insertHtml(html);return true}else{alert(Drupal.t('Content can only be inserted into CKEditor in the WYSIWYG mode.'));return false}};if(typeof(Drupal.Ajax)!='undefined'&&typeof(Drupal.Ajax.plugins)!='undefined')Drupal.Ajax.plugins.CKEditor=function(hook,args){if(hook==='submit'&&typeof(CKEDITOR.instances)!='undefined')for(var i in CKEDITOR.instances)CKEDITOR.instances[i].updateElement();return true};Drupal.ckeditorSubmitAjaxForm=function(){if(typeof(CKEDITOR.instances)!='undefined'&&typeof(CKEDITOR.instances['edit-body'])!='undefined')Drupal.ckeditorOff('edit-body')}
function attachCKEditor(context){if(Drupal.behaviors.textarea&&Drupal.behaviors.textarea.attach)Drupal.behaviors.textarea.attach(context);$(context).find("textarea.ckeditor-mod:not(.ckeditor-processed)").each(function(){var ta_id=$(this).attr("id");if(CKEDITOR.instances&&typeof(CKEDITOR.instances[ta_id])!='undefined')Drupal.ckeditorOff(ta_id);if((typeof(Drupal.settings.ckeditor.autostart)!='undefined')&&(typeof(Drupal.settings.ckeditor.autostart[ta_id])!='undefined'))Drupal.ckeditorOn(ta_id);if(typeof(Drupal.settings.ckeditor.input_formats[Drupal.settings.ckeditor.elements[ta_id]])!='undefined')$('.ckeditor_links').show();var sel_format=$("#"+ta_id.substr(0,ta_id.lastIndexOf("-"))+"-format--2");if(sel_format&&sel_format.not('.ckeditor-processed'))sel_format.addClass('ckeditor-processed').change(function(){Drupal.settings.ckeditor.elements[ta_id]=$(this).val();if(CKEDITOR.instances&&typeof(CKEDITOR.instances[ta_id])!='undefined')$('#'+ta_id).val(CKEDITOR.instances[ta_id].getData());Drupal.ckeditorOff(ta_id);if(typeof(Drupal.settings.ckeditor.input_formats[$(this).val()])!='undefined'){if($('#'+ta_id).hasClass('ckeditor-processed')){Drupal.ckeditorOn(ta_id,false)}else Drupal.ckeditorOn(ta_id);$('#switch_'+ta_id).show()}else $('#switch_'+ta_id).hide()})})};Drupal.behaviors.ckeditor={attach:function(context){if((typeof CKEDITOR=='undefined')&&Drupal.settings.ckeditor.editor_path.match(/^(http(s)?:)?\/\//i)){if(typeof(Drupal.settings.ckeditor.loadAttempts)=='undefined')Drupal.settings.ckeditor.loadAttempts=50;if(Drupal.settings.ckeditor.loadAttempts>0){Drupal.settings.ckeditor.loadAttempts--;window.setTimeout(function(){Drupal.behaviors.ckeditor.attach(context)},300)};return};if((typeof CKEDITOR=='undefined')||!CKEDITOR.env.isCompatible)return;attachCKEditor(context)},detach:function(context,settings,trigger){$(context).find("textarea.ckeditor-mod.ckeditor-processed").each(function(){var ta_id=$(this).attr("id");if(CKEDITOR.instances[ta_id])$('#'+ta_id).val(CKEDITOR.instances[ta_id].getData());if(trigger!='serialize'){Drupal.ckeditorOff(ta_id);$(this).removeClass('ckeditor-processed')}})}};$(document).bind('CToolsDetachBehaviors',function(event,context){Drupal.behaviors.ckeditor.detach(context,{},'unload')})})(jQuery);var ckeditor_imceSendTo=function(file,win){var cfunc=win.location.href.split('&');for(var x in cfunc)if(cfunc[x].match(/^CKEditorFuncNum=\d+$/)){cfunc=cfunc[x].split('=');break};CKEDITOR.tools.callFunction(cfunc[1],file.url);win.close()};
/* Source and licensing information for the above line(s) can be found at http://www.programmableweb.com/sites/all/modules/contrib/ckeditor/includes/ckeditor.utils.js. */
