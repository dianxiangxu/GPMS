/*!CK:3946469347!*//*1438217267,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["47d1u"]); }

__d("ChatSidebarSections",[],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports={MORE_ONLINE_FRIENDS:"more_online_friends",MORE_ONLINE_COWORKERS:"more_online_coworkers",OFFLINE_USERS:"offline_users",ORDERED_LIST:"ordered_list",ORDERED_COWORKERS:"ordered_coworkers",TYPEAHEAD:"typeahead",NOW_PINNED_LIST:"now_pinned_list"};},null);
__d("ItunesPluginLogging",["Run","Bootloader"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();var h={logPluginData:function(){g.onAfterLoad(function(){var i=b('Bootloader');i.loadModules(["ItunesDetector","AsyncRequest"],function(j,k){new k().setURI('/ajax/ads/media/log').setData({status:j.hasItunes()}).send();});});}};e.exports=h;},null);
__d("NotificationBeeperModuleLoader",["BootloadedComponent.react","JSResource","React"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();var j={load:function(k,l){i.render(i.createElement(g,i.__spread({bootloadPlaceholder:i.createElement("span",null),bootloadLoader:h('NotificationBeeper.react')},k)),l);}};e.exports=j;},null);
__d("SyncRequestTitle.react",["React","fbt","cx"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();var j=g,k=j.PropTypes,l=g.createClass({displayName:"SyncRequestTitle",propTypes:{appName:k.string.isRequired,isSender:k.bool.isRequired,receiverName:k.string.isRequired,senderName:k.string.isRequired},render:function(){if(this.props.isSender){return (g.createElement("div",null,h._("Waiting for {receiver} to accept your invite to play {app_name}.",[h.param("receiver",g.createElement("span",{className:"_dg4"},this.props.receiverName)),h.param("app_name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}else return (g.createElement("div",null,h._("{sender} wants to play {app_name} with you, right now.",[h.param("sender",g.createElement("span",{className:"_dg4"},this.props.senderName)),h.param("app_name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}});e.exports=l;},null);
__d("SyncRequestAcceptedMessage.react",["React","fbt","cx"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();'use strict';var j=g,k=j.PropTypes,l=g.createClass({displayName:"SyncRequestAcceptedMessage",propTypes:{appName:k.string.isRequired,isSender:k.bool.isRequired,receiverName:k.string.isRequired,senderName:k.string.isRequired},render:function(){if(this.props.isSender){return (g.createElement("div",null,h._("{receiver} accepted your invite to play {app name}.",[h.param("receiver",g.createElement("span",{className:"_dg4"},this.props.receiverName)),h.param("app name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}else return (g.createElement("div",null,h._("You accepted an invite from {sender} to play {app name}.",[h.param("sender",g.createElement("span",{className:"_dg4"},this.props.senderName)),h.param("app name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}});e.exports=l;},null);
__d("SyncRequestRejectedMessage.react",["AsyncRequest","Link.react","React","URI","cx","fbt"],function(a,b,c,d,e,f,g,h,i,j,k,l){b.__markCompiled&&b.__markCompiled();var m=i,n=m.PropTypes,o=i.createClass({displayName:"SyncRequestRejectedMessage",propTypes:{requestId:n.string.isRequired,app:n.object.isRequired,isSender:n.bool.isRequired,receiver:n.object.isRequired,sender:n.object.isRequired},render:function(){if(this.props.isSender){return (i.createElement("div",null,l._("{receiver} declined your invite to play {app_name}.",[l.param("receiver",i.createElement("span",{className:"_dg4"},this.props.receiver.name)),l.param("app_name",i.createElement("span",{className:"_dg5"},this.props.app.name))])));}else return (i.createElement("div",null,l._("You declined an invite from {sender} to play {app_name}.",[l.param("sender",i.createElement("span",{className:"_dg4"},this.props.sender.name)),l.param("app_name",i.createElement("span",{className:"_dg5"},this.props.app.name))]),i.createElement("div",{className:"_13n7"},i.createElement("div",null,i.createElement(h,{onClick:this._submitBlockApp},l._("Block {app}",[l.param("app",this.props.app.name)]))),i.createElement("div",null,i.createElement(h,{onClick:this._submitBlockUser},l._("Block requests from {sender}",[l.param("sender",this.props.sender.name)]))))));},_submitBlockApp:function(){var p=new j('/games/block_app/'),q=new g().setURI(p);q.setData({app_id:this.props.app.id,source:'sync_request'});q.send();},_submitBlockUser:function(){var p=new j('/games/block_user/'),q=new g().setURI(p);q.setData({app_id:this.props.app.id,blockee_uid:this.props.sender.id});q.send();}});e.exports=o;},null);
__d("SyncRequestExpiredMessage.react",["React","fbt","cx"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();var j=g,k=j.PropTypes,l=g.createClass({displayName:"SyncRequestExpiredMessage",propTypes:{appName:k.string.isRequired,isSender:k.bool.isRequired,receiverName:k.string.isRequired,senderName:k.string.isRequired},render:function(){if(this.props.isSender){return (g.createElement("div",null,h._("{receiver} missed your invite to play {app name}.",[h.param("receiver",g.createElement("span",{className:"_dg4"},this.props.receiverName)),h.param("app name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}else return (g.createElement("div",null,h._("You missed an invite from {sender} to play {app name}.",[h.param("sender",g.createElement("span",{className:"_dg4"},this.props.senderName)),h.param("app name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}});e.exports=l;},null);
__d("SyncRequestCanceledMessage.react",["React","cx","fbt"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();'use strict';var j=g,k=j.PropTypes,l=g.createClass({displayName:"SyncRequestCanceledMessage",propTypes:{appName:k.string.isRequired,isSender:k.bool.isRequired,receiverName:k.string.isRequired,senderName:k.string.isRequired},render:function(){if(this.props.isSender){return (g.createElement("div",null,i._("You canceled an invite to {receiver} to play {app name}.",[i.param("receiver",g.createElement("span",{className:"_dg4"},this.props.receiverName)),i.param("app name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}else return (g.createElement("div",null,i._("{sender} canceled an invitation to play {app name}.",[i.param("sender",g.createElement("span",{className:"_dg4"},this.props.senderName)),i.param("app name",g.createElement("span",{className:"_dg5"},this.props.appName))])));}});e.exports=l;},null);
__d("SyncRequestTimer.react",["React","fbt"],function(a,b,c,d,e,f,g,h){b.__markCompiled&&b.__markCompiled();var i=g,j=i.PropTypes;function k(m){if(m){m=Math.ceil(m);var n=m%60;if(n<10)n='0'+n;var o=Math.floor(m/60);return o+':'+n;}else return "0:00";}var l=g.createClass({displayName:"SyncRequestTimer",propTypes:{timeRemaining:j.number.isRequired,isSender:j.bool.isRequired,receiverName:j.string.isRequired},render:function(){if(this.props.isSender){return (g.createElement("div",null,h._("({time_remaining} remaining)",[h.param("time_remaining",k(this.props.timeRemaining))])));}else return (g.createElement("div",null,h._("You have {time_remaining} to accept.",[h.param("time_remaining",k(this.props.timeRemaining))])));}});e.exports=l;},null);
__d("XSyncRequestSubmitController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/platform\/games\/sync_requests\/submit\/",{request_id:{type:"Int",required:true},sender:{type:"Int",required:true},action:{type:"Int",required:true}});},null);
__d("SyncRequest.react",["Arbiter","AsyncRequest","ChannelConstants","React","SyncRequestStatusEnum","SyncRequestTitle.react","SyncRequestAcceptedMessage.react","SyncRequestRejectedMessage.react","SyncRequestExpiredMessage.react","SyncRequestCanceledMessage.react","SyncRequestTimer.react","XUIButton.react","XSyncRequestSubmitController","cx","fbt","getObjectValues"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){b.__markCompiled&&b.__markCompiled();var w=j,x=w.PropTypes,y=j.createClass({displayName:"SyncRequest",propTypes:{app:x.object.isRequired,creationTime:x.number.isRequired,requestId:x.string.isRequired,receiver:x.object.isRequired,sender:x.object.isRequired,status:x.oneOf(v(k)).isRequired,timeout:x.number.isRequired,timeRemaining:x.number.isRequired,viewerId:x.number.isRequired,onStatusUpdate:x.func},componentWillMount:function(){if(this.props.status===k.PENDING){var z=g.subscribe(i.getArbiterType('sync_request_updated'),function(ca,da){da=da.obj;if(da.id.toString()!==this.props.requestId)return;this.setState({status:da.status});}.bind(this));this.setState({statusEvent:z});}var aa=null;if(this.props.status===k.PENDING){var ba=function(){this.setState({time_remaining:(this.state.time_remaining-1)});if(this.state.time_remaining<=0){clearInterval(this.state.counter);var ca={counter:null,time_remaining:0};if(this.state.status===k.PENDING)ca.status=k.EXPIRED;this.setState(ca);}};aa=setInterval(ba.bind(this),1000);}this.setState({time_remaining:this.props.timeRemaining,counter:aa});},componentWillUnmount:function(){if(this.state.counter)clearInterval(this.state.counter);g.unsubscribe(this.state.statusEvent);},getInitialState:function(){return {buttonsDisabled:false,time:Date.now(),status:this.props.status,viewerIsSender:this.props.viewerId===this.props.sender.id};},componentDidUpdate:function(z,aa){if(this.props.status!=k.PENDING)this.state.status=this.props.status;if(this.props.onStatusUpdate)this.props.onStatusUpdate(this.state.status,aa.status);},render:function(){var z;switch(this.state.status){case k.PENDING:var aa;if(!this.state.viewerIsSender){aa=[j.createElement(r,{use:"confirm",onClick:this._handleAccept,disabled:this.state.buttonsDisabled,label:u._("Accept")}),j.createElement(r,{use:"default",onClick:this._handleReject,disabled:this.state.buttonsDisabled,label:u._("Decline")})];}else aa=j.createElement(r,{use:"default",onClick:this._handleCancel,disabled:this.state.buttonsDisabled,label:u._("Cancel")});z=(j.createElement("div",null,j.createElement("div",{className:"_372m"},j.createElement(l,{appName:this.props.app.name,isSender:this.state.viewerIsSender,receiverName:this.props.receiver.name,senderName:this.props.sender.name})),j.createElement("div",{className:"_372n"},j.createElement(q,{isSender:this.state.viewerIsSender,timeRemaining:this.state.time_remaining,receiverName:this.props.receiver.name})),j.createElement("div",{className:"_372o"},aa)));break;case k.ACCEPTED:z=j.createElement("div",{className:"_372p mvs"},j.createElement(m,{appName:this.props.app.name,isSender:this.state.viewerIsSender,receiverName:this.props.receiver.name,senderName:this.props.sender.name}));break;case k.REJECTED:z=j.createElement("div",{className:"_372p mvs"},j.createElement(n,{requestId:this.props.requestId,app:this.props.app,isSender:this.state.viewerIsSender,receiver:this.props.receiver,sender:this.props.sender}));break;case k.EXPIRED:z=j.createElement("div",{className:"_372p mvs"},j.createElement(o,{appName:this.props.app.name,isSender:this.state.viewerIsSender,receiverName:this.props.receiver.name,senderName:this.props.sender.name}));break;case k.CANCELED:z=j.createElement("div",{className:"_372p mvs"},j.createElement(p,{appName:this.props.app.name,isSender:this.state.viewerIsSender,receiverName:this.props.receiver.name,senderName:this.props.sender.name}));break;default:throw new Error('The request status `%s` is unknown.',this.state.status);}return (j.createElement("div",{className:"_372q"},z));},_handleAccept:function(){this._handleStatusUpdate(k.ACCEPTED);var z=window.open(this.props.app.uri);if(z)z.focus();},_handleReject:function(){this._handleStatusUpdate(k.REJECTED);},_handleCancel:function(){this._handleStatusUpdate(k.CANCELED);},_handleStatusUpdate:function(z){this.setState({status:z,buttonsDisabled:true});var aa=s.getURIBuilder().setInt('request_id',this.props.requestId).setInt('sender',this.props.sender.id).setInt('action',z).getURI();new h().setURI(aa).setHandler(function(ba){this.setState({status:z});}.bind(this)).setErrorHandler(function(ba){this.setState({buttonsDisabled:false});}.bind(this)).send();}});e.exports=y;},null);
__d("Tooltip.react",["React","TooltipMixin"],function(a,b,c,d,e,f,g,h){b.__markCompiled&&b.__markCompiled();var i=g,j=i.PropTypes,k=g.createClass({displayName:"Tooltip",propTypes:{display:j.oneOf(['inline','block'])},getDefaultProps:function(){return {display:'inline'};},mixins:[h],render:function(){if(this.props.display==='block')return (g.createElement("div",g.__spread({},this.props),this.props.children));return g.createElement("span",g.__spread({},this.props),this.props.children);}});e.exports=k;},null);
__d("LineClamp.react",["React","cx","getVendorPrefixedName","joinClasses"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();'use strict';var k=g,l=k.PropTypes,m=i('lineClamp'),n=g.createClass({displayName:"LineClamp",propTypes:{customEllipsis:l.node,disableNative:l.bool,lineHeight:l.number,lines:l.number.isRequired},_renderEllipsis:function(){var o;if(this.props.lineHeight)o={bottom:this.props.lineHeight+'px'};return (g.createElement("div",{style:o,className:"_4ik3",key:"ellipsis"},this.props.customEllipsis?this.props.customEllipsis:'\u2026'));},render:function(){var o=!!m&&!this.props.disableNative,p=j(this.props.className,(("_4ik4")+(o?' '+"_4ik5":''))),q=this.props.children,r={};if(this.props.lineHeight)r={height:this.props.lineHeight*this.props.lines,lineHeight:this.props.lineHeight+'px'};if(o){r[m]=this.props.lines;}else{p=j(p,'clearfix');q=[g.createElement("div",{className:"_4ik6",key:"inner"},q),this._renderEllipsis()];}return (g.createElement("div",{className:p,style:r},q));}});e.exports=n;},null);
__d("ChatArchiveWarning.react",["Image.react","ReactComponentWithPureRenderMixin","React","cx","ix"],function(a,b,c,d,e,f,g,h,i,j,k){b.__markCompiled&&b.__markCompiled();'use strict';var l=i,m=l.PropTypes,n=i.createClass({displayName:"ChatArchiveWarning",mixins:[h],propTypes:{isFBAtWork:m.bool,shown:m.bool},render:function(){var o=this.props.isFBAtWork?k('images/chat/tab/archive-grey.png'):k('images/chat/tab/archive.png');return (i.createElement(g,{src:o,className:(("titanArchiveWarning")+(' '+"button")+(!this.props.shown?' '+"hidden_elem":'')),"data-hover":"tooltip","data-tooltip-alignh":"center","aria-label":"All employee-to-employee conversations will be archived"}));}});e.exports=n;},null);
__d("ChatTabTypeaheadDataSource",["MercuryTypeaheadConstants","MercuryTypeaheadDataSource"],function(a,b,c,d,e,f,g,h){b.__markCompiled&&b.__markCompiled();for(var i in h)if(h.hasOwnProperty(i))k[i]=h[i];var j=h===null?null:h.prototype;k.prototype=Object.create(j);k.prototype.constructor=k;k.__superConstructor__=h;function k(l){"use strict";l=l||{};l.maxResults=g.COMPOSER_CHATTAB_MAX;h.call(this,l);this.$ChatTabTypeaheadDataSource0=true;}k.prototype.buildData=function(l){"use strict";var m=[],n=[],o=[],p=[],q=[];l.forEach(function(r){var s=j.getEntry.call(this,r);switch(s.render_type){case g.FRIEND_TYPE:m.push(r);break;case g.THREAD_TYPE:if(this.$ChatTabTypeaheadDataSource0)n.push(r);break;case g.NON_FRIEND_TYPE:o.push(r);break;case g.FB4C_TYPE:p.push(r);break;case g.PAGE_TYPE:if(this.$ChatTabTypeaheadDataSource0)q.push(r);break;default:this.logQuery({event:'chat_tab_render_type_error'});break;}},this);return j.buildData.call(this,m.concat(p,n,q,o));};k.prototype.query=function(l,m,n,o){"use strict";this.logQuery({event:'query_chat_tab',query:l});return j.query.call(this,l,m,n,o);};k.prototype.respond=function(l,m,n){"use strict";var o=j.respond.call(this,l,m,n);this.logResponse({event:'query_response_chat_tab',response_query:l,response_uids:m});return o;};k.prototype.setShowThreads=function(l){"use strict";this.$ChatTabTypeaheadDataSource0=l;};e.exports=k;},null);
__d("MessengerButton.react",["ReactComponentWithPureRenderMixin","React","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();'use strict';var k=h,l=k.PropTypes,m=h.createClass({displayName:"MessengerButton",mixins:[g],propTypes:{label:l.string.isRequired,type:l.oneOf(['primary','secondary']).isRequired,use:l.oneOf(['default','danger']).isRequired},getDefaultProps:function(){return {use:'default'};},handleLinkClick:function(n){if(this.props.disabled){n.preventDefault();}else if(this.props.onClick)this.props.onClick(n);},render:function(){var n=this.props,o=n.className,p=n.label,q=(function(r,s){var t={},u=Object.prototype.hasOwnProperty;if(r==null)throw new TypeError();for(var v in r)if(u.call(r,v)&&!u.call(s,v))t[v]=r[v];return t;})(n,{className:1,label:1});return (h.createElement("a",h.__spread({className:j((("_3quh")+(' '+"_30yy")+(this.props.type==='primary'?' '+"_2t_":'')+(this.props.type==='secondary'?' '+"_2u0":'')+(this.props.use==='danger'?' '+"_3ay_":'')+(this.props.disabled?' '+"_4zab":'')),o),href:"#"},q,{onClick:this.handleLinkClick}),p));}});e.exports=m;},null);
__d("MessengerStateProcessor",["MercuryAPIArgsSource","MercuryIDs","MercuryParticipantTypes","MercuryParticipants","MercuryThreadIDMap","MercuryThreads","MercuryVanityIDMap","MessengerURIConstants"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){b.__markCompiled&&b.__markCompiled();'use strict';var o={preprocess:function(q){var r=q.activeThreadID;if(r){var s=h.getUserIDFromThreadID(r),t=s&&j.getNow(h.getParticipantIDFromUserID(s));if(t&&t.type!==i.EVENT){q.threadKey=t.vanity||s;}else if(s&&!t){var u=h.getParticipantIDFromUserID(s);q.threadKey=m.hasID(u)?m.getVanity(u):s;}else{var v=k.get(),w=v.getFBIDFromClientIDNow(r);q.threadKey=w||r;}}delete q.activeThreadID;return q;},postprocess:function(q){var r=k.get(),s=l.get(),t=p(q.threadKey),u;u=h.isValid(t)?t:r.getClientIDFromFBIDNow(t);if(!u){var v=j.getIDFromVanityOrFBID(t),w=v&&s.getCanonicalThreadToParticipant(v,null,g.MESSENGER);if(w)u=w.thread_id;}if(u){q.activeThreadID=u;q.serverThreadID=r.getFBIDFromClientIDNow(u);}delete q.threadKey;return q;}};function p(q){if(!q)return null;return q.startsWith(n.GROUP_PREFIX)?q.substr(n.GROUP_PREFIX.length):q;}e.exports=o;},null);
__d("MercuryLogMessage.react",["DOM","Event","ImmutableObject","MercuryLogMessageRenderer","MercuryConfig","React","cx","emptyFunction","formatDate","joinClasses"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){b.__markCompiled&&b.__markCompiled();'use strict';var q=l,r=q.PropTypes,s=l.createClass({displayName:"MercuryLogMessage",propTypes:{maxWidth:r.number,message:r.instanceOf(i).isRequired,onImageLoad:r.func},getDefaultProps:function(){return {onImageLoad:n};},getInitialState:function(){return {messageText:null};},componentDidMount:function(){this.componentWillReceiveProps(this.props);},componentWillReceiveProps:function(t){j.renderText(t.message,function(u){this.setState({messageText:u});}.bind(this));},shouldComponentUpdate:function(t,u){return (this.state.messageText!=u.messageText||t.maxWidth!==this.props.maxWidth);},componentDidUpdate:function(){var t=l.findDOMNode(this.refs.attachment);j.renderAttachmentLegacy(t,this.props.message);g.scry(t,'img').forEach(function(u){var v=h.listen(u,'load',function(){this.props.onImageLoad(u);v.remove();}.bind(this));}.bind(this));},render:function(){return (l.createElement("div",l.__spread({},this.props,{className:p(this.props.className,"_5ye6"),style:Object.assign({},this.props.style,this._getStyle()),title:o(new Date(this.props.message.timestamp),'g:ia')}),k.ChatTabMessengerStyle?null:j.renderIcon(this.props.message),l.createElement("div",{className:"_5ye7"},k.ChatTabMessengerStyle?j.renderIcon(this.props.message):null,this.state.messageText),l.createElement("div",{className:"_5ye8",ref:"attachment"})));},_getStyle:function(){return this.props.maxWidth?{maxWidth:this.props.maxWidth}:null;}});e.exports=s;},null);
__d("XOfferSetNotificationsController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/offers\/v2\/notifications\/",{offer:{type:"Int",required:true},enable:{type:"Bool",defaultValue:false}});},null);
__d("XOfferSendPlatformNotificationController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/offers\/v2\/send_platform_notification\/",{});},null);
__d("OffersUtil",["DOM","DOMQuery","CSS","Event","AsyncRequest","XOfferSetNotificationsController","XOfferSendPlatformNotificationController"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){b.__markCompiled&&b.__markCompiled();var n={attachHideShowClickListener:function(o,p,q){j.listen(o,'click',function(){var r=h.scry(h.getRootElement(),p),s=h.scry(h.getRootElement(),q);for(var t=0;t<r.length;t++)i.hide(r[t]);for(var u=0;u<s.length;u++)i.show(s[u]);});},registerRedirectAfter:function(o,p){setTimeout(function(){window.location.href=o;},p);},attachDeletelLinkClickListener:function(o,p,q,r,s){j.listen(o,'click',function(){new k().setURI(q).setHandler(function(t){var u=t.getPayload();if(u){p.className=r;}else p.className=s;}).send();});},listen:function(o,p){j.listen(o,'click',p.show.bind(p));},showRegistered:function(o,p){j.listen(o,'click',function(){p.show();});},logGoToWebsiteClick:function(o,p){j.listen(o,'click',function(){new k().setURI(p).send();});},sendPlatformNotification:function(){var o=m.getURIBuilder().getURI();new k().setURI(o).send();}};e.exports=n;},null);
__d("P2PSendMoneyDialogStore",["P2PActionConstants","EventEmitter","P2PDispatcher"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();'use strict';var j,k;for(var l in h)if(h.hasOwnProperty(l))n[l]=h[l];var m=h===null?null:h.prototype;n.prototype=Object.create(m);n.prototype.constructor=n;n.__superConstructor__=h;function n(){h.call(this);k={};j=i.register(this.onEventDispatched.bind(this));}n.prototype.onEventDispatched=function(o){var p=o.data,q=o.type;switch(q){case g.CHAT_SEND_VIEW_OPENED:this.handleChatSendViewOpened(p);this.emit('change');break;case g.CHAT_SEND_VIEW_CLOSED:this.handleChatSendViewClosed(p);this.emit('change');break;}};n.prototype.getStateByThreadID=function(o){return k[o];};n.prototype.handleChatSendViewOpened=function(o){k[o.threadID]={amount:o.amount,groupSendReceiptDetails:o.groupSendReceiptDetails,groupThreadFBID:o.groupThreadFBID,platformItemID:o.platformItemID,sendMoneyDialogShown:true};};n.prototype.handleChatSendViewClosed=function(o){k[o.threadID]={amount:'',groupSendReceiptDetails:null,groupThreadFBID:'',platformItemID:null,sendMoneyDialogShown:false};};e.exports=new n();},null);
__d("SyncRequestNotificationBeeperItemContents.react",["Animation","CloseButton.react","ImageBlock.react","NotificationUserActions","React","SyncRequest.react","SyncRequestStatusEnum","cx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){b.__markCompiled&&b.__markCompiled();var o=k.createClass({displayName:"SyncRequestNotificationBeeperItemContents",_markAsRead:function(){j.markNotificationsAsRead([this.props.beep.notificationID]);this.props.onHide();},_onClose:function(){this._markAsRead();this.props.onHide();},_doFlash:function(){new g(k.findDOMNode(this.refs.inner)).from('opacity','0').to('opacity','1').duration(200).go();},componentDidMount:function(){if(this.props.beep.rendererData.status!=m.PENDING)this.props.onReadyToHide(this.props.beep.notificationID);},componentDidUpdate:function(p){if(this.props.beep.rendererData.status!=m.PENDING&&p.beep.rendererData.status==m.PENDING)this.props.onReadyToHide(this.props.beep.notificationID);},onRequestStatusUpdate:function(p,q){if(p!=m.PENDING&&q==m.PENDING)this.props.onReadyToHide(this.props.beep.notificationID);},render:function(){var p=this.props.beep,q=p.rendererData;return (k.createElement("div",{ref:"inner"},k.createElement(h,{className:"_3soc",onClick:this._onClose,size:"medium"}),k.createElement(i,{className:"_3soj"},k.createElement("img",{src:p.actors[0].profile_picture.uri,className:"_3sok"}),k.createElement("div",{className:"_3sol"},k.createElement(l,{app:q.app,creationTime:q.creation_time,requestId:q.id.toString(),receiver:q.receiver,sender:q.sender,status:q.status,timeout:q.timeout,timeRemaining:q.time_remaining,viewerId:q.receiver.id,onStatusUpdate:this.onRequestStatusUpdate})))));}});e.exports=o;},null);
__d("LiveMessageReceiver",["Arbiter","ChannelConstants","emptyFunction","shield"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();function k(l){this.eventName=l;this.subs=null;this.handler=i;this.shutdownHandler=null;this.registered=false;this.appId=1;}Object.assign(k,{getAppMessageType:function(l,m){return 'live_message/'+l+':'+m;},route:function(l){var m=function(n){var o=k.getAppMessageType(l.app_id,l.event_name);g.inform(o,n,g.BEHAVIOR_PERSISTENT);};m(l.response);}});Object.assign(k.prototype,{setAppId:function(l){this.appId=l;return this;},setHandler:function(l){this.handler=l;this._dirty();return this;},setRestartHandler:i,setShutdownHandler:function(l){this.shutdownHandler=j(l);this._dirty();return this;},_dirty:function(){if(this.registered){this.unregister();this.register();}},register:function(){var l=function(n,o){return this.handler(o);}.bind(this),m=k.getAppMessageType(this.appId,this.eventName);this.subs={};this.subs.main=g.subscribe(m,l);if(this.shutdownHandler)this.subs.shut=g.subscribe(h.ON_SHUTDOWN,this.shutdownHandler);this.registered=true;return this;},unregister:function(){if(!this.subs)return this;for(var l in this.subs)if(this.subs[l])this.subs[l].unsubscribe();this.subs=null;this.registered=false;return this;}});e.exports=k;},null);
__d("initLiveMessageReceiver",["Arbiter","ChannelConstants","LiveMessageReceiver"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();g.subscribe(h.getArbiterType('app_msg'),function(j,k){i.route(k.obj);});},null);
__d("ClearableTypeahead",["Event"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();var h={resetOnCloseButtonClick:function(i,j){g.listen(j,'click',function(){var k=i.getCore();k.getElement().focus();k.reset();});}};e.exports=h;},null);