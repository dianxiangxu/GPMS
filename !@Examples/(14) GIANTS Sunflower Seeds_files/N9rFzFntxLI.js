/*!CK:2421385178!*//*1437525917,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["Vv3m0"]); }

__d("PubcontentSuggestionsCarousel",["Animation","Arbiter","AsyncRequest","CSS","DOM","Event","PageLikeConstants","Parent","PubcontentSuggestionsUtil","TidyArbiterMixin","URI","XPubcontentImpressionLoggingController","csx","cx","mixin","tidyEvent"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){b.__markCompiled&&b.__markCompiled();var w=u(p);for(var x in w)if(w.hasOwnProperty(x))z[x]=w[x];var y=w===null?null:w.prototype;z.prototype=Object.create(y);z.prototype.constructor=z;z.__superConstructor__=w;function z(aa,ba,ca){"use strict";w.call(this);this.$PubcontentSuggestionsCarousel0=aa;this.$PubcontentSuggestionsCarousel1=this.$PubcontentSuggestionsCarousel0.getVisibleNodesMax()-2;this.$PubcontentSuggestionsCarousel2=ba;this.$PubcontentSuggestionsCarousel3=0;this.$PubcontentSuggestionsCarousel4=ca.circularCarousel;if(this.$PubcontentSuggestionsCarousel4&&this.$PubcontentSuggestionsCarousel2.length>this.$PubcontentSuggestionsCarousel1){this.$PubcontentSuggestionsCarousel5();}else this.$PubcontentSuggestionsCarousel6(0,this.$PubcontentSuggestionsCarousel2.length);o.truncateAllText(this.$PubcontentSuggestionsCarousel0.getNode(),true);if(ca.suggestionsViewed){this.$PubcontentSuggestionsCarousel7=ca.suggestionsViewed;}else this.$PubcontentSuggestionsCarousel7=[];if(ca.moreItems)this.$PubcontentSuggestionsCarousel8=ca.moreItems;v(l.listen(this.$PubcontentSuggestionsCarousel0.getNode(),'click',this.$PubcontentSuggestionsCarousel9.bind(this)),this.$PubcontentSuggestionsCarousel0.subscribe('onSlideDone',this.$PubcontentSuggestionsCarousela.bind(this)),h.subscribe('netego_replacedUnit',this.$PubcontentSuggestionsCarouselb.bind(this)));if(ca.serializedData){this.$PubcontentSuggestionsCarouselc=ca.serializedData;h.subscribe(m.LIKED,this.$PubcontentSuggestionsCarouseld.bind(this));}this.$PubcontentSuggestionsCarousele();}z.prototype.$PubcontentSuggestionsCarousel5=function(){"use strict";this.$PubcontentSuggestionsCarousel6(this.$PubcontentSuggestionsCarousel3-this.$PubcontentSuggestionsCarousel1,this.$PubcontentSuggestionsCarousel1,null);this.$PubcontentSuggestionsCarousel6(this.$PubcontentSuggestionsCarousel3,this.$PubcontentSuggestionsCarousel1,null);this.$PubcontentSuggestionsCarousel6(this.$PubcontentSuggestionsCarousel3+this.$PubcontentSuggestionsCarousel1,this.$PubcontentSuggestionsCarousel1,null);this.$PubcontentSuggestionsCarousel0.silentSlide(this.$PubcontentSuggestionsCarousel1);};z.prototype.$PubcontentSuggestionsCarouself=function(aa){"use strict";if(aa<0){return aa+this.$PubcontentSuggestionsCarousel2.length;}else if(aa>=this.$PubcontentSuggestionsCarousel2.length)return aa%this.$PubcontentSuggestionsCarousel2.length;return aa;};z.prototype.$PubcontentSuggestionsCarousel6=function(aa,ba,ca){"use strict";for(var da=aa;da<aa+ba;da++){var ea=this.$PubcontentSuggestionsCarouself(da);this.$PubcontentSuggestionsCarousel0.insertBefore(this.$PubcontentSuggestionsCarousel2[ea].cloneNode(true),ca);}};z.prototype.$PubcontentSuggestionsCarousele=function(){"use strict";var aa=this.$PubcontentSuggestionsCarousel0.getVisibleNodes(),ba=[];for(var ca=1;ca<aa.length-1;ca++){var da=this.$PubcontentSuggestionsCarouselg(aa[ca]);if(!da)continue;var ea=da.getAttribute('data-ego-fbid'),fa=this.$PubcontentSuggestionsCarousel7.indexOf(ea)>-1;if(!fa&&this.$PubcontentSuggestionsCarouselc[ea]){ba.push(this.$PubcontentSuggestionsCarouselc[ea]);this.$PubcontentSuggestionsCarousel7.push(ea);}}if(ba.length){var ga=r.getURIBuilder(),ha={q:ba.join(',')};new i().setMethod('POST').setURI(ga.getURI()).setData(ha).send();}};z.prototype.$PubcontentSuggestionsCarouselb=function(aa,ba){"use strict";if(!ba.numUnitsRemained){var ca=n.byClass(this.$PubcontentSuggestionsCarousel0.getNode(),'ego_feed_column');if(ca){var da=n.byClass(ca,"_4-u2");if(da)j.hide(da);}}};z.prototype.$PubcontentSuggestionsCarouseld=function(aa,ba){"use strict";if(ba.origin==='hovercard'&&this.$PubcontentSuggestionsCarouseli(ba.profile_id)){var ca=k.scry(this.$PubcontentSuggestionsCarousel0.getNode(),'.ego_unit');for(var da=0;da<ca.length;da++)if(ca[da].getAttribute('data-ego-fbid')===ba.profile_id){this.$PubcontentSuggestionsCarouselj(ca[da]);break;}}};z.prototype.$PubcontentSuggestionsCarouselk=function(aa,ba){"use strict";var ca=this.$PubcontentSuggestionsCarousel0.getGrid().childNodes;for(var da=0;da<ba;da++)k.remove(ca[aa]);};z.prototype.$PubcontentSuggestionsCarousela=function(){"use strict";if((this.$PubcontentSuggestionsCarousel2.length<this.$PubcontentSuggestionsCarousel1)||(!this.$PubcontentSuggestionsCarousel4)){this.$PubcontentSuggestionsCarousele();return;}var aa=this.$PubcontentSuggestionsCarousel0.getLastVisibleIndex();if(aa<=this.$PubcontentSuggestionsCarousel1){this.$PubcontentSuggestionsCarousel3=this.$PubcontentSuggestionsCarouself(this.$PubcontentSuggestionsCarousel3-this.$PubcontentSuggestionsCarousel1);this.$PubcontentSuggestionsCarouselk(this.$PubcontentSuggestionsCarousel1*2+1,this.$PubcontentSuggestionsCarousel1);var ba=this.$PubcontentSuggestionsCarousel0.getGrid().childNodes[1];this.$PubcontentSuggestionsCarousel6(this.$PubcontentSuggestionsCarousel3-this.$PubcontentSuggestionsCarousel1,this.$PubcontentSuggestionsCarousel1,ba);this.$PubcontentSuggestionsCarousel0.silentSlide(this.$PubcontentSuggestionsCarousel1);}else{this.$PubcontentSuggestionsCarousel3=this.$PubcontentSuggestionsCarouself(this.$PubcontentSuggestionsCarousel3+this.$PubcontentSuggestionsCarousel1);this.$PubcontentSuggestionsCarouselk(1,this.$PubcontentSuggestionsCarousel1);this.$PubcontentSuggestionsCarousel0.silentSlide(this.$PubcontentSuggestionsCarousel1*-1);this.$PubcontentSuggestionsCarousel6(this.$PubcontentSuggestionsCarousel3+this.$PubcontentSuggestionsCarousel1,this.$PubcontentSuggestionsCarousel1,null);}o.truncateAllText(this.$PubcontentSuggestionsCarousel0.getNode(),true);this.$PubcontentSuggestionsCarousele();};z.prototype.$PubcontentSuggestionsCarouselg=function(aa){"use strict";var ba=k.scry(aa,'.ego_unit');if(ba.length)return ba[0];return null;};z.prototype.$PubcontentSuggestionsCarouseli=function(aa){"use strict";for(var ba in this.$PubcontentSuggestionsCarouselc)if(ba==aa)return true;return false;};z.prototype.$PubcontentSuggestionsCarousel9=function(aa){"use strict";var ba=aa.getTarget(),ca=this.$PubcontentSuggestionsCarousell(ba,'ego_x');if(!ca){ca=this.$PubcontentSuggestionsCarousell(ba,'ego_like');if(!ca)return;}var da=k.scry(ca,'^.ego_unit');if(!da.length)return;if(this.$PubcontentSuggestionsCarousel8&&this.$PubcontentSuggestionsCarousel8.length)this.$PubcontentSuggestionsCarouselm();this.$PubcontentSuggestionsCarouselj(ca);};z.prototype.$PubcontentSuggestionsCarousell=function(aa,ba){"use strict";if(j.hasClass(aa,ba))return aa;var ca=k.scry(aa,'^.'+ba);if(ca.length)return ca[0];return null;};z.prototype.$PubcontentSuggestionsCarouselj=function(aa){"use strict";var ba=k.scry(aa,"^._58rc"),ca=ba.length?ba[0]:null;if(!ca)return;new g(ca).from('opacity',1).to('opacity',0).duration(500).checkpoint(1,this.$PubcontentSuggestionsCarouseln.bind(this,ca)).go();this.$PubcontentSuggestionsCarouselo(ca);};z.prototype.$PubcontentSuggestionsCarouselo=function(aa){"use strict";var ba=k.scry(aa,'.ego_unit');if(!aa.children.length||!ba.length)return;var ca=k.scry(this.$PubcontentSuggestionsCarousel0.getNode(),"^.carouselParent");if(!ca.length)return;var da=k.scry(ca[0],'.feedback');if(!da.length||!da[0].children.length)return;var ea=da[0].children[0],fa=ba[0].getAttribute('data-ego-fbid'),ga=new q(ea.href),ha=ga.getQueryData(),ia=ha.suggestion_ids.indexOf(fa);if(ia!=-1){ha.suggestion_ids.splice(ia,1);ga.setQueryData(ha);ea.setAttribute("href",ga.toString());}};z.prototype.$PubcontentSuggestionsCarouselm=function(){"use strict";if(this.$PubcontentSuggestionsCarousel8.length){var aa=this.$PubcontentSuggestionsCarousel8;this.$PubcontentSuggestionsCarousel8=[];var ba=0;if(this.$PubcontentSuggestionsCarousel4){for(ba=0;ba<aa.length;ba++)this.$PubcontentSuggestionsCarousel2.push(aa[ba]);}else for(ba=0;ba<aa.length;ba++)this.$PubcontentSuggestionsCarousel0.insertBefore(aa[ba]);}};z.prototype.$PubcontentSuggestionsCarouseln=function(aa){"use strict";var ba=k.scry(aa,'.ego_unit');if(!ba.length)return;var ca=ba[0].getAttribute('data-ego-fbid');for(var da=0;da<this.$PubcontentSuggestionsCarousel2.length;da++){var ea=k.scry(this.$PubcontentSuggestionsCarousel2[da],'.ego_unit');if(ea.length&&ea[0].getAttribute('data-ego-fbid')===ca){this.$PubcontentSuggestionsCarousel2.splice(da,1);if(this.$PubcontentSuggestionsCarousel4)this.$PubcontentSuggestionsCarousel3=this.$PubcontentSuggestionsCarouself((da<this.$PubcontentSuggestionsCarousel3)?this.$PubcontentSuggestionsCarousel3-1:this.$PubcontentSuggestionsCarousel3);break;}}if(this.$PubcontentSuggestionsCarousel4){var fa=this.$PubcontentSuggestionsCarousel0.getGrid().childNodes.length-2;this.$PubcontentSuggestionsCarouselk(1,fa);if(fa>this.$PubcontentSuggestionsCarousel1)this.$PubcontentSuggestionsCarousel0.silentSlide(this.$PubcontentSuggestionsCarousel1*-1);if(this.$PubcontentSuggestionsCarousel2.length>this.$PubcontentSuggestionsCarousel1){this.$PubcontentSuggestionsCarousel5();}else this.$PubcontentSuggestionsCarousel6(0,this.$PubcontentSuggestionsCarousel2.length);}else this.$PubcontentSuggestionsCarousel0.removeItem(aa);o.truncateAllText(this.$PubcontentSuggestionsCarousel0.getNode(),true);this.$PubcontentSuggestionsCarousele();var ga=k.scry(this.$PubcontentSuggestionsCarousel0.getNode(),'.'+"_58rc");if(ga.length===2){var ha="_5bfv";if(j.hasClass(ga[0],ha)&&j.hasClass(ga[1],ha))this.$PubcontentSuggestionsCarouselp(this.$PubcontentSuggestionsCarousel0.getNode());}};z.prototype.$PubcontentSuggestionsCarouselp=function(aa){"use strict";var ba=k.scry(aa,"^._5t-6");if(!ba.length){ba=k.scry(aa,"^._5alz");if(!ba.length){ba=k.scry(aa,"^._54bx");if(!ba.length)return;}}var ca=ba[0];new g(ca).from('opacity',1).to('opacity',0).duration(500).checkpoint(1,k.remove.bind(k,ca)).go();};e.exports=z;},null);
__d("legacy:AsyncDialog",["AsyncDialog"],function(a,b,c,d){b.__markCompiled&&b.__markCompiled();a.AsyncDialog=b('AsyncDialog');},3);