/*!CK:1386100080!*//*1438922647,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["suIQO"]); }

__d("XUIOverlayButton.react",["AbstractButton.react","React","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k=h.createClass({displayName:"XUIOverlayButton",render:function(){var l="_51tl selected";return (h.createElement(g,h.__spread({},this.props,{className:j(this.props.className,l)})));}});e.exports=k;},null);
__d("MessengerDialogFooter.react",["LeftRight.react","React","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();'use strict';var k=h,l=k.PropTypes,m=h.createClass({displayName:"MessengerDialogFooter",propTypes:{leftContent:l.object},render:function(){return (h.createElement("div",{className:j("_4eb_",this.props.className)},h.createElement(g,null,h.createElement("div",{className:"_2_d1"},this.props.leftContent),h.createElement("div",null,this.props.children))));}});e.exports=m;},null);
__d("FBRTCDialogFooter.react",["MessengerDialogFooter.react","XUIDialogFooter.react","FBRTCConfig"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();e.exports=i.isMessengerDotCom()?g:h;},null);
__d("MessengerDialog.react",["LayerFadeOnHide","LayerHideOnEscape","React","XUIDialog.react","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j,k,l){b.__markCompiled&&b.__markCompiled();'use strict';var m=i,n=m.PropTypes,o=i.createClass({displayName:"MessengerDialog",propTypes:{onToggle:n.func.isRequired,repositionOnUpdate:n.bool,shown:n.bool,type:n.oneOf(['alert','default']),width:n.number},getDefaultProps:function(){return {repositionOnUpdate:false,shown:true,type:'alert',width:400};},componentDidUpdate:function(){if(this.props.repositionOnUpdate)setTimeout(function(){if(this.isMounted()&&this.refs.dialog&&this.refs.dialog.layer)this.refs.dialog.layer.updatePosition();}.bind(this),0);},render:function(){return (i.createElement(j,i.__spread({behaviors:{LayerFadeOnHide:g,LayerHideOnEscape:h}},this.props,{className:l("_4ebx",this.props.className),ref:"dialog"}),i.createElement("div",{className:(("_4eby")+(this.props.type==='alert'?' '+"_2c9g":'')+(this.props.type==='default'?' '+"_2c9i":''))},this.props.children)));}});e.exports=o;},null);
__d("MessengerDialogBody.react",["React","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();'use strict';var j=g.createClass({displayName:"MessengerDialogBody",render:function(){return (g.createElement("div",{className:i("_4eb-",this.props.className)},this.props.children));}});e.exports=j;},null);
__d("MessengerDialogHeader.react",["React","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i){b.__markCompiled&&b.__markCompiled();'use strict';var j=g.createClass({displayName:"MessengerDialogHeader",render:function(){return (g.createElement("h4",{className:i("_4ebz",this.props.className)},this.props.children));}});e.exports=j;},null);