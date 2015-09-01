_satellite.pushAsyncScript(function(event, target, $variables){
  //Clear old values and update the previous page name cookie (only works when rule is loaded ASYNC after analytics beacon)
_satellite.removeCookie('s_pppv');
_satellite.removeCookie('s_ppiv');
_satellite.removeCookie('s_pph');
handlePPVevents();
_satellite.setCookie('s_ppv',_satellite.getVar('pageName')||location.href);

function handlePPVevents() {
if(_satellite.readCookie('s_ppv')) {
var dh = Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight)),
vph = window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight),
st = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop),
vh = st + vph,
pv = Math.min(Math.round(vh / dh * 100), 100),
c1 = _satellite.readCookie('s_pppv'),
c2 = _satellite.readCookie('s_ppiv'),
c3 = _satellite.readCookie('s_pph'),
cv = (c1) ? c1 : (0),
p0 = (c2) ? c2 : (pv),
cy = (c3) ? c3 : (0);
if(pv) {
_satellite.setCookie('s_pppv',((pv > cv) ? pv : cv));
_satellite.setCookie('s_ppiv',p0);
_satellite.setCookie('s_pph', ((vh > cy) ? vh : cy));
}
}
}

if (window.addEventListener) {
window.addEventListener('load', handlePPVevents, false);
window.addEventListener('scroll', handlePPVevents, false);
window.addEventListener('resize', handlePPVevents, false);
} else if (window.attachEvent) {
window.attachEvent('onload', handlePPVevents);
window.attachEvent('onscroll', handlePPVevents);
window.attachEvent('onresize', handlePPVevents);
} else {
_satellite.removeCookie('s_pppv');
_satellite.removeCookie('s_ppiv');
_satellite.removeCookie('s_pph');
}
});
