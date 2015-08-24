/**
* FLXone data collection generated at 2015-07-29 09:59:56
*/
var flx1=(function(cnf){var dataQueue=[];var flushDataTimeout=null;function placePixel(e){var t=document,n=t.createElement("script");n.async=!0,n.defer=!0,n.src=e,t.getElementsByTagName("head")[0].appendChild(n)}function pxl(e){var url="//"+flx1.cnf.d+e+getAdditionalParams()+"&r="+encodeURIComponent(document.referrer)+"&eurl="+encodeURIComponent(document.location.href)+"&rndm="+Math.random()*1e16;placePixel(url)}function sendData(k,v,customData,onFlush){dataQueue.push({k:k,v:v,custom:(typeof customData==='undefined'||customData===null?false:customData)});if(flushDataTimeout===null){flushDataTimeout=setTimeout(function(){flushData();if(typeof onFlush==='function'){onFlush()}},100)}}function flushData(){flushDataTimeout=null;if(dataQueue!==null&&dataQueue.length>0){var maxUrlLen=2048;var baseUrl="/px?id="+flx1.cnf.id+"&m="+flx1.cnf.m;var url=baseUrl;var customData={};var customDataStr='';if(window.Prototype){var toJSON=Array.prototype.toJSON;delete Array.prototype.toJSON}for(var k in dataQueue){if(dataQueue.hasOwnProperty(k)){try{var elm=dataQueue[k];if(elm.custom===true){customData[elm.k]=elm.v;customDataStr='&data='+encodeURIComponent(JSON.stringify(customData))}else{url+='&'+elm.k+'='+encodeURIComponent(elm.v)}if(url.length+customDataStr.length>=maxUrlLen){flx1.pxl(url+customDataStr);url=baseUrl}}catch(e){flx1.log(e)}}}if(window.Prototype){Array.prototype.toJSON=toJSON}if(url!==baseUrl||customDataStr!==''){flx1.pxl(url+customDataStr)}dataQueue=[]}}function log(e){window.console&&console.log&&console.log(e)}function findCurrentScriptUrl(){var ret='';var scripts=document.getElementsByTagName('script');var searchString='/'+cnf.m+'-'+cnf.id+'.js';for(var i=0,j=scripts.length;i<j;i++){if(scripts[i].src&&scripts[i].src.indexOf(searchString)!==-1){return scripts[i].src}}return ret}function getUrlParams(url){var urlParams={};if(!url){url=findCurrentScriptUrl()}if(url&&url.indexOf('?')!==-1){var match,pl=new RegExp('[+]','g'),search=new RegExp('([^&=]+)=?([^&]*)','g'),decode=function(s){return decodeURIComponent(s.replace(pl," "))},query=url.split('?')[1];while(match=search.exec(query)){urlParams[decode(match[1])]=decode(match[2])}}return urlParams}function getAdditionalParams(){var additionalParams='';var urlParams=getUrlParams();var paramsToSkip={'m':1,'id':1,'d':1};for(var p in urlParams){if(urlParams.hasOwnProperty(p)){if(!paramsToSkip[p]){additionalParams+='&'+p+'='+encodeURIComponent(urlParams[p])}}}return additionalParams}return{pxl:pxl,_pxl:placePixel,cnf:cnf,log:log,data:sendData,getUrlParams:getUrlParams}})({id:'3613',m:'4',d:'go.flx1.com'});flx1.pxl("/px?id="+flx1.cnf.id+"&m="+flx1.cnf.m);/**
* Fire interaction events after a couple of seconds on this page
*/
(function() {
    try {
        var ivs = [5,10,20,30,60,90,120,180,240,300];
        for (var k in ivs) {
            if (ivs.hasOwnProperty(k)) {
                (function(iv) {
                    setTimeout(function() {
                        flx1.pxl("/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&it=4&iv="+iv);
                    },iv*1000);
                })(ivs[k]);
            }
        }
    } catch (e) {flx1.log(e);}
})();/**
 * Scan for scroll depth and fire interaction events
 */
(function() {
	try {
		/** Do not execute in iframe */
		if (window !== window.top) {
			return;
		}

		var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], screenHeight = w.innerHeight || e.clientHeight || g.clientHeight;

		var body = d.body, html = d.documentElement;
		var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		function getScrollTop() {
			if (typeof pageYOffset !== 'undefined') {
				return pageYOffset;
			} else {
				var B = d.body;
				var D = d.documentElement;
				D = (D.clientHeight) ? D : B;
				return D.scrollTop;
			}
		}
		var max = 0;
		var ofs = [1, .75, .5, .25, .1];
		setInterval(function() {
			if (height > screenHeight && getScrollTop() >= 0) {
				var x = (getScrollTop() / (height - screenHeight));
				if (x > max) {
					for (var k in ofs) {
						if (ofs.hasOwnProperty(k) && x >= ofs[k] && ofs[k] >= max) {
							var val = ofs[k];
							max = x;
							flx1.pxl("/ia?id=" + flx1.cnf.id + "&m=" + flx1.cnf.m + "&it=8&iv=" + val * 100);
							break;
						}
					}
				}
			}
		}, 500);
	} catch (e) {
		flx1.log(e);
	}
})();/**
 * Detect form field interaction
 * @author Robin Verlangen
 */
(function() {
    try {
        function addListeners(elms) {
            for (var k in elms) {
                if (!elms.hasOwnProperty(k)) {
                    continue;
                }
                var elm = elms[k];
                /** Skip hidden, submit and buttons as we do not want to interfere with responsiveness */
                if (typeof elm.type === 'undefined' || elm.type === null || elm.type === 'hidden' || elm.type === 'submit' || elm.type === 'button') {
                    continue;
                }
                elm.addEventListener('focus', function() {
                    formpx(this, 12, 1);
                });
                elm.addEventListener('click', function() {
                    formpx(this, 13, 1);
                });
                elm.addEventListener('keyup', function() {
                    formpx(this, 14, 1);
                });
            }
        }
        function formpx(elm, t, v) {
            try {
                var k = '_flx1_' + t + '_' + v;
                if (elm.hasAttribute(k)) {
                    return;
                }
                elm.setAttribute(k, '1');
                flx1.pxl("/ia?id="+flx1.cnf.id+"&m="+flx1.cnf.m+"&it="+t+"&iv="+v);
            } catch (e) {
                flx1.log(e);
            }
        }
        addListeners(document.getElementsByTagName('input'));
        addListeners(document.getElementsByTagName('select'));
    } catch (e) {
        flx1.log(e);
    }
})();
(function(){
function getTextContentExceptScript(element) {
	var text = [];
	var self = arguments.callee;
	var el, els = element.childNodes;

	var nodeType = {
		element: 1,
		text: 3
	};
	for (var i = 0, iLen = els.length; i < iLen; i++) {
		el = els[i];
		if (el.nodeType === nodeType.element && el.tagName && el.tagName.toLowerCase() !== 'script' && el.tagName.toLowerCase() !== 'noscript' && el.tagName.toLowerCase() !== 'style') {
			text.push(self(el));
		} else if (el.nodeType === nodeType.text) {
			text.push(el.data);
		}
	}
	return text.join(' ').replace(/\s{2,}/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function getCookie(key, def) {
	var name = key + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ')
			c = c.substring(1);
		if (c.indexOf(name) === 0)
			return c.substring(name.length, c.length);
	}
	return def;
}

function setCookie(key, value, expires) {
	var cookie = key + '=' + value + ';path=/';
	if (expires !== undefined) {
		cookie += ';expires=' + expires;
	}
	
	document.cookie = cookie;
}

function loadScript(a, b) {
	var c = document.createElement('script');
	c.async = true, c.readyState ? c.onreadystatechange = function() {
		if (c.readyState === 'loaded' || c.readyState === 'complete')
			c.onreadystatechange = null, b && b();
	} : c.onload = function() {
		b && b();
	}, c.src = a, document.getElementsByTagName('head')[0].appendChild(c);
}

function loadImage(source) {
	!function(n){n.onload=function(){},n.src=source;}(new Image);
}

function loadIframe(source) {
	var iframe = document.createElement('iframe');
	iframe.src = source;
	iframe.width = 1;
	iframe.height = 1;
	iframe.frameBorder = 0;
	iframe.style.display = 'none';
	document.getElementsByTagName('body')[0].appendChild(iframe);
}

function loadjQuery(callback) {
	if (typeof window.flx1_jQuery === 'undefined') {
		var tmp;
		if (typeof jQuery !== 'undefined') {
			tmp = jQuery;
		}

		loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', function() {
			window.flx1_jQuery = jQuery.noConflict(true);

			if (typeof tmp !== 'undefined') {
				window.jQuery = tmp;
			}

			callback(window.flx1_jQuery);
		});
	} else {
		callback(window.flx1_jQuery);
	}
}

function executeAfter(times, callback) {
	return {
		count: 0,
		next: function() {
			this.count++;
			if (this.count === times) {
				callback();
			}
		}
	};
}
loadjQuery(function($){

(function() {
	var executor = executeAfter(1, function() {
		var options = {"rule_name":"Segment","populate_external_pixels":true,"platform":"custom","segment_pixel_advertiser":"","external_pixel_url":"","external_pixel_script":"console.log('t');","external_pixel_url_type":"image","expiration_value":""};
		var type = 'segment';

		try {
			var path = null;
			switch (type) {
				case 'conversion':
					var interactionValue = 0;
					if (options.hasOwnProperty('assign_value')) {
						interactionValue = options.assign_value;
					}

					var expiration = false;
					if (options.hasOwnProperty('expiration')) {
						expiration = options.expiration;
					}
					
					var expirationValue = 0;
					if (expiration) {
						if (options.hasOwnProperty('expiration_value') && options.hasOwnProperty('expiration_unit')) {
							expirationValue = parseInt(options.expiration_value, 10);

							var expirationUnit = options.expiration_unit;
							switch (expirationUnit) {
								case 'minutes':
									expirationValue = expirationValue * 60;
									break;
								case 'hours':
									expirationValue = expirationValue * 60 * 60;
									break;
								case 'days':
									expirationValue = expirationValue * 60 * 60 * 24;
								default:
									break;
							}
						}
					}

					var firePixel = true;
					if (options.hasOwnProperty('conversion_count_type')) {
						var conversionCountKey = 'flx1_conversion_count_123';
						var conversionCountExpiresKey = conversionCountKey + '_expires';
						var conversionCount = parseInt(getCookie(conversionCountKey, 0), 10);
						
						var conversionCountType = options.conversion_count_type;
						switch (conversionCountType) {
							case 'one_per_user':
								if (conversionCount > 0) {
									firePixel = false;
								} else if (conversionCount === 0) {
									var date = new Date();
									date.setFullYear(date.getFullYear() + 1);
									setCookie(conversionCountKey, 1, date.toUTCString());
								}
								break;
							case 'all_per_user':
								break;
							case 'custom_per_user':
								if (options.hasOwnProperty('custom_conversion_count_per') && options.hasOwnProperty('custom_conversion_count_number') && options.hasOwnProperty('custom_conversion_count_unit')) {
									var conversionCountPer = parseInt(options.custom_conversion_count_per, 10);
									var conversionCountNumber = parseInt(options.custom_conversion_count_number, 10);
									var conversionCountUnit = options.custom_conversion_count_unit;
									switch (conversionCountUnit) {
										case 'minutes':
											conversionCountNumber = conversionCountNumber * 60;
											break;
										case 'hours':
											conversionCountNumber = conversionCountNumber * 60 * 60;
											break;
										case 'days':
											conversionCountNumber = conversionCountNumber * 60 * 60 * 24;
										default:
											break;
									}
									
									if (conversionCount > conversionCountPer) {
										firePixel = false;
									} else {
										var date = new Date();
										date.setTime(date.getTime() + (conversionCountNumber * 1000));
											
										if (conversionCount === 0) {
											setCookie(conversionCountExpiresKey, date.getTime(), date.toUTCString());
										} else {
											date.setTime(getCookie(conversionCountExpiresKey, date.getTime()));
										}
										
										setCookie(conversionCountKey, conversionCount + 1, date.toUTCString());
									}
								}
								break;
						}
					}
					
					if (firePixel) {
						path = '/ia?id=' + flx1.cnf.id + '&m=' + flx1.cnf.m + '&itst=123&it=10&iv=' + interactionValue;
						if (expirationValue > 0){
							path = path + '&exp=' + expirationValue;
						}
					}
					break;
				case 'segment':
					path = '/ia?id=' + flx1.cnf.id + '&m=' + flx1.cnf.m + '&itst=123&it=15';
					break;
			}

			if (path !== null) {
				flx1.pxl(path);
			}
		} catch (e) {
			flx1.log(e);
		}

		if (options.hasOwnProperty('populate_external_pixels')) {
			if (options.populate_external_pixels) {
				// Override document.write to support async AppNexus pixel loading
				document.write = document.writeln = function(html) {
					var hiddenElement = $('body').find('#flx1');
					if (hiddenElement.length === 0) {
						hiddenElement = $('<div id="flx1" style="display: none;"></div>');
						$('body').append(hiddenElement);
					}
					hiddenElement.append(html);
				};
				try {
					if (options.hasOwnProperty('external_pixel_url')) {
						var externalPixelUrl = options.external_pixel_url;
						if (externalPixelUrl.length > 0) {
							var externalPixelUrlType = options.external_pixel_url_type;
							if (externalPixelUrlType === 'script') {
								loadScript(externalPixelUrl);
							} else if (externalPixelUrlType === 'image') {
								loadImage(externalPixelUrl);
							}
						}
					}
					if (options.hasOwnProperty('external_pixel_script')) {
						var externalPixelScript = options.external_pixel_script;
						if (externalPixelScript.length > 0) {
							try {
								if (!externalPixelScript.trim().startsWith('<script')) {
									externalPixelScript = '<script>' + externalPixelScript + '</script>';
								}

								$('head').append(externalPixelScript);
							} catch (e) {
								flx1.log(e);
							}
						}
					}
				} catch (e) {
					flx1.log(e);
				}

				if (options.hasOwnProperty('externalPixels')) {
					var pixels = options.externalPixels;
					for (var i in pixels) {
						if (pixels.hasOwnProperty(i)) {
							var pixel = pixels[i];
							if (options.hasOwnProperty('platform')) {
								var platform = options.platform;
								switch (platform) {
									case 'appnexus':
										if (type === 'segment') {
											loadScript('https://secure.adnxs.com/seg?add=' + pixel + '&t=1');
										} else if (type === 'conversion') {
											loadScript('https://secure.adnxs.com/px?id=' + pixel + '&t=1');
										}
										break;
									case 'google':
										var axel = Math.random() + "";
										var a = axel * 10000000000000;
										var source = 'https://' + pixel + '.fls.doubleclick.net/activityi;src=' + pixel + ';type=invmedia;cat=wnvjf0w9;ord=' + a + '?';
										loadIframe(source);
										break;
									default:
										flx1.log('Unsupported platform: ' + platform);
										break;
								}
							}
						}
					}
				}
			}
		}
	});

	var checks = [];
	checks[0] = {
	exec: executeAfter(1, function() {
		executor.next();
	}),
	options: [{"check":function(){if (true){checks[0].exec.next();}}}]
};


	try {
		for (var x in checks) {
			if (checks.hasOwnProperty(x)) {
				var check = checks[x];
				if (check.hasOwnProperty('options')) {
					for (var y in check.options) {
						if (check.options.hasOwnProperty(y)) {
							try {
								check.options[y].check();
							} catch (e) {
								flx1.log(e);
							}
						}
					}
				}
			}
		}
	} catch (e) {
		flx1.log(e);
	}
})();

});})();