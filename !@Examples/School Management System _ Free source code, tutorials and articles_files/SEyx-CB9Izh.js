/*!CK:1893922106!*//*1437363342,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["K5mfz"]); }

__d("UFIOrderingModeSelector.react",["InlineBlock.react","Link.react","React","Image.react","ReactXUIMenu","PopoverMenu.react","cx","ix"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){b.__markCompiled&&b.__markCompiled();var o=i,p=o.PropTypes,q=k.SelectableMenu,r=k.SelectableItem,s=i.createClass({displayName:"UFIOrderingModeSelector",propTypes:{onOrderChanged:p.func,orderingmodes:p.array.isRequired},getInitialState:function(){var t=null;this.props.orderingmodes.map(function(u){if(u.selected)t=u;});return {selectedMode:t};},onMenuItemClick:function(t,u){var v=u.item.getValue();this.props.orderingmodes.map(function(w){if(w.value===v)this.setState({selectedMode:w});}.bind(this));this.props.onOrderChanged(v);},render:function(){var t=i.createElement(q,{onItemClick:this.onMenuItemClick},this.props.orderingmodes.map(function(u){return i.createElement(r,{key:u.value,value:u.value,selected:u.value===this.state.selectedMode.value},u.name);}.bind(this)));return (i.createElement("div",{className:"UFIOrderingModeSelector"},i.createElement(g,null,i.createElement(l,{className:"UFIOrderingModeSelectorPopover",menu:t,alignh:"right"},i.createElement(h,null,this.state.selectedMode.name,i.createElement(j,{className:"UFIOrderingModeSelectorDownCaret",src:n('/images/ui/xhp/link/more/down_caret.gif')}))))));}});e.exports=s;},null);
__d("getScrollPosition",["getDocumentScrollElement","getUnboundedScrollPosition"],function(a,b,c,d,e,f,g,h){b.__markCompiled&&b.__markCompiled();'use strict';function i(j){var k=g();if(j===window)j=k;var l=h(j),m=j===k?document.documentElement:j,n=j.scrollWidth-m.clientWidth,o=j.scrollHeight-m.clientHeight;l.x=Math.max(0,Math.min(l.x,n));l.y=Math.max(0,Math.min(l.y,o));return l;}e.exports=i;},null);
__d("BookmarkFeedSorter",["Run"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();var h,i={init:function(j){h=j;g.onLeave(function(){h=null;});},setChecked:function(j){if(h)h.setValue(j);}};e.exports=i;},null);
__d("LitestandStream",["Arbiter","DOMQuery","LitestandMessages","LitestandStoryInsertionStatus","ViewportBounds","csx","ge","getElementPosition","getOrCreateDOMID"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){b.__markCompiled&&b.__markCompiled();var p,q,r,s={init:function(t,u,v){p=u;q=v;r=t;g.subscribe(i.STORIES_INSERTED,function(w,x){if(!x||!x.substream_id||!p)return;var y=h.scry(m(x.substream_id),s.getStoriesSelector());y.forEach(function(z){var aa=h.scry(z,"._5pbw"),ba=h.scry(z,"._5pcp")[0],ca=h.scry(z,"._5pbx")[0];if(aa[0]&&ba&&ca){var da='';for(var ea=0;ea<aa.length;ea++)da+=o(aa[ea])+' ';da.trim();z.setAttribute('aria-labelledby',da+' '+o(ba)+' '+o(ca));}});});},getStoriesSelector:function(){return "._5jmm";},getStreamRoot:function(){return r;},getSectionID:function(){return q;},canInsertNewerStories:function(){if(k.getTop()>n(s.getStreamRoot()).y)return false;return j.canInsert();},getFeedStreamID:function(){return parseInt(r.id.split('feed_stream_')[1],16)%1e+08;}};e.exports=s;},null);
__d("SelectorDeprecated",["Event","Arbiter","Button","ContextualLayer","CSS","DataStore","DOM","Focus","HTML","Keys","MenuDeprecated","Parent","Style","Toggler","TooltipData","URI","Vector","arrayContains","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){b.__markCompiled&&b.__markCompiled();var z,aa,ba=[],ca;function da(oa){return r.byClass(oa,'uiSelector');}function ea(oa){return r.byClass(oa,'uiSelectorButton');}function fa(){if(!aa){aa=new j({position:'below'},m.create('div'));k.addClass(aa.getRoot(),'uiSelectorContextualLayer');}return aa;}function ga(oa){return m.scry(oa,'select')[0];}function ha(oa){return m.find(oa,'div.uiSelectorMenuWrapper');}function ia(){ia=y;q.subscribe('select',function(oa,pa){if(!z||!pa||pa.menu!==na.getSelectorMenu(z))return;var qa=ja(z),ra=ka(pa.item);if(ra){var sa=z,ta=na.isOptionSelected(pa.item),ua=na.inform('select',{selector:sa,option:pa.item,clone:ca});if(ua===false)return;if(qa||!ta){na.setSelected(sa,na.getOptionValue(pa.item),!ta);na.inform('toggle',{selector:sa,option:pa.item});na.inform('change',{selector:sa});h.inform('Form/change',{node:sa});if(la(sa))l.set(sa,'dirty',true);}}if(!qa||!ra)z&&na.toggle(z);});}function ja(oa){return !!oa.getAttribute('data-multiple');}function ka(oa){return k.hasClass(oa,'uiSelectorOption');}function la(oa){return !!oa.getAttribute('data-autosubmit');}var ma=function(){ma=y;var oa={keydown:function(event){var pa=event.getTarget();if(m.isInputNode(pa))return;switch(g.getKeyCode(event)){case p.DOWN:case p.SPACE:case p.UP:if(ea(pa)){var qa=da(pa);na.toggle(qa);return false;}break;case p.ESC:if(z){var ra=na.getSelectorButton(z);na.toggle(z);ra&&n.set(ra);return false;}break;}},mouseover:function(event){var pa=r.byAttribute(event.getTarget(),'ajaxify');if(pa&&k.hasClass(pa,'uiSelectorButton'))na.loadMenu(da(pa));}};g.listen(document.body,oa);};t.subscribe(['show','hide'],function(oa,pa){var qa=da(pa.getActive());if(qa){ma();ia();var ra=na.getSelectorButton(qa),sa=na.getSelectorMenu(qa),ta=oa==='show';ra.setAttribute('aria-expanded',ta?'true':'false');if(ta){z=qa;if(k.hasClass(ra,'uiButtonDisabled')){na.setEnabled(qa,false);return false;}sa=sa||na.loadMenu(qa);var ua=s.getScrollParent(qa),va=ua!==window&&ua!==m.getDocumentScrollElement();if(va||k.hasClass(qa,'uiSelectorUseLayer')){if(va)ba.push(g.listen(ua,'scroll',function(){pa.hide();}));ca=m.create('div',{className:qa.className});k.addClass(ca,'invisible_elem');w.getElementDimensions(qa).setElementDimensions(ca);m.replace(qa,ca);var wa=k.hasClass(qa,'uiSelectorRight'),xa=k.hasClass(qa,'uiSelectorBottomUp');fa().setContext(ca).setContent(qa).setPosition(xa?'above':'below').setAlignment(wa?'right':'left').show();}q.register(sa);var ya=q.getCheckedItems(sa);if(!ya.length)ya=q.getEnabledItems(sa);if(ya.length)q.focusItem(ya[0]);}else{z=null;if(ca){while(ba.length)ba.pop().remove();m.replace(ca,qa);fa().hide();ca=null;}sa&&q.unregister(sa);if(la(qa)&&l.get(qa,'dirty')){var za=m.scry(qa,'input.submitButton')[0];za&&za.click();l.remove(qa,'dirty');}}k.conditionClass(na.getSelectorButton(qa),'selected',ta);na.inform(ta?'open':'close',{selector:qa,clone:ca});}});var na=Object.assign(new h(),{attachMenu:function(oa,pa,qa){oa=da(oa);if(oa){z&&q.unregister(na.getSelectorMenu(z));m.setContent(ha(oa),pa);z&&q.register(na.getSelectorMenu(oa));ca&&fa().updatePosition();if(qa){var ra=oa.getAttribute('data-name');ra&&qa.setAttribute('name',ra);if(!ja(oa))qa.setAttribute('multiple',false);var sa=ga(oa);if(sa){m.replace(sa,qa);}else m.insertAfter(oa.firstChild,qa);}return true;}},getOption:function(oa,pa){var qa=na.getOptions(oa),ra=qa.length;while(ra--)if(pa===na.getOptionValue(qa[ra]))return qa[ra];return null;},getOptions:function(oa){var pa=q.getItems(na.getSelectorMenu(oa));return pa.filter(ka);},getEnabledOptions:function(oa){var pa=q.getEnabledItems(na.getSelectorMenu(oa));return pa.filter(ka);},getSelectedOptions:function(oa){return q.getCheckedItems(na.getSelectorMenu(oa));},getOptionText:function(oa){return q.getItemLabel(oa);},getOptionValue:function(oa){var pa=da(oa),qa=ga(pa),ra=na.getOptions(pa).indexOf(oa);return ra>=0?qa.options[ra+1].value:'';},getSelectorButton:function(oa){return m.find(oa,'a.uiSelectorButton');},getSelectorMenu:function(oa){return m.scry(oa,'div.uiSelectorMenu')[0];},getValue:function(oa){var pa=ga(oa);if(!pa)return null;if(!ja(oa))return pa.value;var qa=[],ra=pa.options;for(var sa=1,ta=ra.length;sa<ta;sa++)if(ra[sa].selected)qa.push(ra[sa].value);return qa;},isOptionSelected:function(oa){return q.isItemChecked(oa);},listen:function(oa,pa,qa){return this.subscribe(pa,function(ra,sa){if(sa.selector===oa)return qa(sa,ra);});},loadMenu:function(oa,pa){var qa=na.getSelectorMenu(oa);if(!qa){var ra=na.getSelectorButton(oa),sa=ra.getAttribute('ajaxify');if(sa){d(['AsyncRequest'],function(ua){var va=new v(sa),wa=va.getQueryData();va.setQueryData({});var xa=new ua(va).setData(wa).setNectarModuleDataSafe(ra).setRelativeTo(ra);pa&&xa.setFinallyHandler(function(){setTimeout(pa,0);});xa.send();}.bind(this));var ta=o('<div class="uiSelectorMenuWrapper uiToggleFlyout">'+'<div class="uiMenu uiSelectorMenu loading">'+'<ul class="uiMenuInner">'+'<li><span></span></li>'+'</ul>'+'</div>'+'</div>');m.appendContent(ra.parentNode,ta);qa=na.getSelectorMenu(oa);ra.removeAttribute('onmouseover');}}else pa&&pa();return qa;},setButtonLabel:function(oa,pa){var qa=na.getSelectorButton(oa),ra=parseInt(qa.getAttribute('data-length'),10);pa=pa||qa.getAttribute('data-label')||'';i.setLabel(qa,pa);if(typeof pa==='string')if(ra&&pa.length>ra){qa.setAttribute('title',pa);}else qa.removeAttribute('title');},setButtonTooltip:function(oa,pa){var qa=na.getSelectorButton(oa),ra=r.byTag(qa,'a');ra&&u.set(ra,pa||qa.getAttribute('data-tooltip')||'');},setEnabled:function(oa,pa){if(!pa&&z&&da(oa)===z)na.toggle(oa);i.setEnabled(na.getSelectorButton(oa),pa);},setOptionEnabled:function(oa,pa){q.setItemEnabled(oa,pa);},setSelected:function(oa,pa,qa){qa=qa!==false;var ra=na.getOption(oa,pa);if(!ra)return;var sa=na.isOptionSelected(ra);if(qa!==sa){if(!ja(oa)&&!sa){var ta=na.getSelectedOptions(oa)[0];ta&&q.toggleItem(ta);}q.toggleItem(ra);}na.updateSelector(oa);},toggle:function(oa){t.toggle(m.scry(da(oa),'div.wrap')[0]);},updateSelector:function(oa){var pa=na.getOptions(oa),qa=na.getSelectedOptions(oa),ra=ga(oa).options,sa=[],ta=[];for(var ua=0,va=pa.length;ua<va;ua++){var wa=x(qa,pa[ua]);ra[ua+1].selected=wa;if(wa){var xa=na.getOptionText(pa[ua]);sa.push(xa);ta.push(pa[ua].getAttribute('data-tooltip')||xa);}}ra[0].selected=!qa.length;var ya=k.hasClass(oa,'uiSelectorDynamicLabel'),za=k.hasClass(oa,'uiSelectorDynamicTooltip');if(ya||za){var ab='';if(ja(oa)){var bb=na.getSelectorButton(oa);ab=bb.getAttribute('data-delimiter')||', ';}sa=sa.join(ab);ta=ta.join(ab);ya&&na.setButtonLabel(oa,sa);za&&na.setButtonTooltip(oa,ta);}}});e.exports=na;},null);
__d("createCancelableFunction",["emptyFunction"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();function h(i){var j=function(){for(var k=[],l=0,m=arguments.length;l<m;l++)k.push(arguments[l]);return i.apply(null,k);};j.cancel=function(){i=g;};return j;}e.exports=h;},null);
__d("XPhotosWaterfallBatchLoggingController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/photos\/logging\/waterfall\/batch\/",{});},null);
__d("PhotosUploadWaterfall",["AsyncRequest","AsyncSignal","Banzai","PhotosUploadWaterfallXConfig","XPhotosWaterfallBatchLoggingController","emptyFunction","randomInt","throttle"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){b.__markCompiled&&b.__markCompiled();var o=[],p={APP_FLASH:'flash_pro',APP_SIMPLE:'simple',APP_ARCHIVE:'archive',APP_COMPOSER:'composer',APP_MESSENGER:'messenger',APP_HTML5:'html5',APP_CHAT:'chat',INSTALL_CANCEL:1,INSTALL_INSTALL:2,INSTALL_UPDATE:3,INSTALL_REINSTALL:4,INSTALL_PERMA_CANCEL:5,INSTALL_SILENT_SKIP:6,INSTALL_DOWNLOAD:7,CERROR_RESIZING_FAILED:6,CERROR_MARKER_EXTRACTION_FAILED:9,BEGIN:1,UPLOAD_START:4,ALL_UPLOADS_DONE:6,CLIENT_ERROR:7,RECOVERABLE_CLIENT_ERROR:12,IMAGES_SELECTED:9,UPGRADE_REQUIRED:11,VERSION:15,SELECT_START:18,SELECT_CANCELED:19,CANCEL:22,CANCEL_DURING_UPLOAD:83,ONE_RESIZING_START:2,ONE_UPLOAD_START:10,ONE_UPLOAD_DONE:29,ONE_RESIZING_DONE:34,PROGRESS_BAR_STOPPED:44,MISSED_BEAT:45,HEART_ATTACK:46,PUBLISH_SENT:99,PUBLISH_START:100,PUBLISH_SUCCESS:101,PUBLISH_FAILURE:102,CLUSTERING_START:103,CLUSTERING_SUCCESS:104,CLUSTERING_FAILURE:105,POST_BUTTON_CLICKED:110,POST_BUTTON_ERROR:111,PHOTO_DELETED:114,PUBLISH_CLIENT_SUCCESS:115,PHOTO_ROTATED:117,SAVE_DRAFT_BUTTON_CLICKED:123,RECOVERY_START_ON_CLIENT:124,CHANGE_PHOTO_QUALITY_SETTING:126,TAG_ADDED:127,TAG_REMOVED:128,TAB_BUTTON_CLICKED:129,EDITABLE_PHOTO_FETCH_START:106,EDITABLE_PHOTO_FETCH_SUCCESS:107,EDITABLE_PHOTO_FETCH_FAILURE:108,EDITABLE_PHOTO_FETCH_DELAY:116,CANCEL_INDIVIDUAL_UPLOAD:109,MISSING_OVERLAY_NODE:118,PUBLISH_RETRY_FAILURE:119,MISSING_UPLOAD_STATE:120,SESSION_POSTED:72,POST_PUBLISHED:80,ONE_UPLOAD_CANCELED:81,ONE_UPLOAD_CANCELED_DURING_UPLOAD:82,RESIZER_AVAILABLE:20,OVERLAY_FIRST:61,ASYNC_AVAILABLE:63,FALLBACK_TO_FLASH:13,RETRY_UPLOAD:17,TAGGED_ALL_FACES:14,VAULT_IMAGES_SELECTED:62,VAULT_CREATE_POST_CANCEL:65,VAULT_SEND_IN_MESSAGE_CLICKED:66,VAULT_DELETE_CANCEL:68,VAULT_ADD_TO_ALBUM_CANCEL:74,VAULT_SHARE_IN_AN_ALBUM_CLICKED:76,VAULT_SHARE_OWN_TIMELINE_CLICKED:77,VAULT_SHARE_FRIENDS_TIMELINE_CLICKED:78,VAULT_SHARE_IN_A_GROUP_CLICKED:79,VAULT_SYNCED_PAGED_LINK_CLICKED:84,VAULTBOX:'vaultbox',GRID:'grid',SPOTLIGHT_VAULT_VIEWER:'spotlight_vault_viewer',REF_VAULT_NOTIFICATION:'vault_notification',_checkRequiredFields:function(r){},sendBanzai:function(r,s){this._checkRequiredFields(r);var t={};r.scuba_ints=r.scuba_ints||{};r.scuba_ints.client_time=Math.round(Date.now()/1000);if(j.retryBanzai){t.retry=true;r.scuba_ints.nonce=m(4294967296);}i.post(j.deprecatedBanzaiRoute,r,t);if(s)setTimeout(s,0);},sendSignal:function(r,s){this._checkRequiredFields(r);if(j.useBanzai){this.sendBanzai(r,s);}else if(j.reduceLoggingRequests){this.queueLog(r,s);}else{var t=new h('/ajax/photos/waterfall.php',{data:JSON.stringify(r)}).setHandler(s);if(j.timeout)t.setTimeout(10*1000);t.send();}},queueLog:function(r,s){o.push(r);if(!!s){this.flushQueue(s);}else q();},flushQueue:function(r){var s=JSON.stringify(o);o=[];var t=k.getURIBuilder().getURI();new g().setURI(t).setData({logs:s}).setFinallyHandler(r||l).setTimeoutHandler(10*1000,r||l).send();}},q=n(p.flushQueue,j.batchInterval*1000);e.exports=p;},null);
__d("PrivacySelectorNewDispatcher",["Dispatcher"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();var h='selector',i=Object.assign(new g(),{handleUpdateFromSelector:function(j){this.dispatch(Object.assign({payloadSource:h},j));}});e.exports=i;},null);
__d("XPrivacyCustomDialogController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/privacy\/custom_dialog\/",{id:{type:"String",required:true},option_id:{type:"String",required:true},autosave:{type:"Bool",defaultValue:false},explain_tags:{type:"Bool",defaultValue:false},limit_community:{type:"Bool",defaultValue:false},limit_facebook:{type:"Bool",defaultValue:false},limit_fof:{type:"Bool",defaultValue:false},limit_tagexpand:{type:"Bool",defaultValue:false},is_new_privacy_selector:{type:"Bool",defaultValue:false},render_location:{type:"Int"},content_type:{type:"String"},post_param:{type:"String"},privacy_data:{type:"String"},source:{type:"String"},tags:{type:"IntVector"},tag_expansion_button:{type:"String"},__asyncDialog:{type:"Int"}});},null);
__d("XPubcontentRelatedShareChainingController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/pubcontent\/related_share\/",{attachment_div_id:{type:"String",required:true},global_share_id:{type:"Int",required:true},video_div_id:{type:"String"},link_url:{type:"String"},qid:{type:"String"},mf_story_key:{type:"String"},share_id:{type:"String"},is_auto_expand:{type:"Bool",defaultValue:false}});},null);