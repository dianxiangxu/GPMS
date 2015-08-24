/*!CK:993599839!*//*1438920096,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["LlbV6"]); }

__d("NotificationCounter",["Arbiter","ChatConfig","DocumentTitle","FavIcon","JSLogger","UserActivity"],function(a,b,c,d,e,f,g,h,i,j,k,l){b.__markCompiled&&b.__markCompiled();var m={messages:0,notifications:0,requests:0},n;if(h.get('unreadFavicon'))j.setToggleResources(h.get('unreadFaviconURL'));var o={init:function(p){g.subscribe('update_title',this._handleUpdate.bind(this));g.subscribe('jewel/count-updated',this._handleCountUpdate.bind(this));},getCount:function(){var p=0;for(var q in m){var r=Number(m[q]);if(typeof m[q]=='string'&&isNaN(r))return m[q];if(isNaN(r)||r<0){k.create('jewels').error('bad_count',{jewel:q,count:m[q]});continue;}p+=r;}return p;},updateTitle:function(){var p=this.getCount(),q=i.get();q=p?'('+p+') '+q:q;i.set(q,true);if(h.get('unreadFavicon')){if(!l.isOnTab()&&((n>0&&p===0)||(n===0&&p>0)||(n>0&&!j.isToggledResource())))j.toggle();n=p;}},_handleCountUpdate:function(p,q){m[q.jewel]=q.count;this.updateTitle();},_handleUpdate:function(p,q){this.updateTitle();}};e.exports=o;},null);
__d("XNotificationsSyncController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/notifications\/sync\/",{lastSync:{type:"Int",required:true}});},null);
__d("NotificationSync",["Arbiter","AsyncRequest","ChannelConstants","JSLogger","NotificationConstants","NotificationUpdates","XNotificationsSyncController"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){b.__markCompiled&&b.__markCompiled();var n=j.create('notifications'),o='channel_reload',p=0;function q(v){var w=l.getserverTime()?l.getserverTime():p,x=m.getURIBuilder().setInt('lastSync',w).getURI();v.setHandler(r).setOption('suppressErrorAlerts',true).setErrorHandler(s).setMethod('GET').setReadOnly(true).setURI(x).setAllowCrossPageTransition(true);}function r(v){var w=v.getPayload();if(w.syncPayload)l.handleUpdate(k.PayloadSourceType.SYNC,w.syncPayload);}function s(v){}function t(){var v=new h();v.setIsBackgroundRequest(true);q(v);v.send();n.bump(o);}var u={setup:function(v){p=v;g.subscribe(i.ON_INVALID_HISTORY,t);}};e.exports=u;},null);
__d("NotificationJewelController",["Arbiter","Event","NotificationConstants","NotificationCounter","NotificationSeenState","NotificationSync","NotificationUpdates","createObjectFrom","curry"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){b.__markCompiled&&b.__markCompiled();var p=0;function q(s){g.inform('jewel/count-updated',{jewel:s,count:k.getUnseenIDs().length},g.BEHAVIOR_STATE);}function r(s,t,u,v){"use strict";var w=null;if(t.list&&t.unseenNotifs&&t.startTime){w=t.list;u=t.unseenNotifs;v=t.startTime;}else w=t;j.init();var x=h.listen(s.getRoot(),'mouseover',function(){x.remove();x=null;w.open();});if(s.isOpen()){w.open();}else var y=s.subscribe('opened',function(){y.unsubscribe();y=null;w.open();});var z=w.pause.bind(w);s.subscribe('opened',function(){setTimeout(z,0);q(s.name);});s.subscribe('closed',function(){w.unpause();q(s.name);});m.subscribe('seen-state-updated',o(q,s.name));m.handleUpdate(i.PayloadSourceType.INITIAL_LOAD,{seenState:n(u,p)});l.setup(v);q(s.name);}e.exports=r;},null);