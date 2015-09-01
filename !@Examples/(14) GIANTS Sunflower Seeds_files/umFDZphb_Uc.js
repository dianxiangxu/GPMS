/*!CK:4023513507!*//*1436986510,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["EWDOr"]); }

__d("TickerReadStateTracking",["Style","clickRefAction"],function(a,b,c,d,e,f,g,h){b.__markCompiled&&b.__markCompiled();var i=73,j='ticker_hover',k=[];function l(n){if(!n)return null;var o=JSON.parse(n.getAttribute('data-ft'));if(!o)return null;if(o.mf_story_key)return o.mf_story_key;if(o.fbid)return o.fbid;return null;}function m(n){var o=l(n);if(!o||o in k)return;k[o]=true;var p={evt:i};h(j,n,null,'FORCE',{ft:p});}e.exports.log=m;},null);