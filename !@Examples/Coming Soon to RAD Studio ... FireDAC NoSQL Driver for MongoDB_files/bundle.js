!function () {
	var a,
	b,
	c;
	!function (d) {
		function e(a, b) {
			return u.call(a, b)
		}
		function f(a, b) {
			var c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
			m,
			n = b && b.split("/"),
			o = s.map,
			p = o && o["*"] || {};
			if (a && "." === a.charAt(0))
				if (b) {
					for (n = n.slice(0, n.length - 1), a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.concat(a), k = 0; k < a.length; k += 1)
						if (m = a[k], "." === m)
							a.splice(k, 1), k -= 1;
						else if (".." === m) {
							if (1 === k && (".." === a[2] || ".." === a[0]))
								break;
							k > 0 && (a.splice(k - 1, 2), k -= 2)
						}
					a = a.join("/")
				} else
					0 === a.indexOf("./") && (a = a.substring(2));
			if ((n || p) && o) {
				for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
					if (d = c.slice(0, k).join("/"), n)
						for (l = n.length; l > 0; l -= 1)
							if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) {
								f = e,
								h = k;
								break
							}
					if (f)
						break;
					!i && p && p[d] && (i = p[d], j = k)
				}
				!f && i && (f = i, h = j),
				f && (c.splice(0, h, f), a = c.join("/"))
			}
			return a
		}
		function g(a, b) {
			return function () {
				return n.apply(d, v.call(arguments, 0).concat([a, b]))
			}
		}
		function h(a) {
			return function (b) {
				return f(b, a)
			}
		}
		function i(a) {
			return function (b) {
				q[a] = b
			}
		}
		function j(a) {
			if (e(r, a)) {
				var b = r[a];
				delete r[a],
				t[a] = !0,
				m.apply(d, b)
			}
			if (!e(q, a) && !e(t, a))
				throw new Error("No " + a);
			return q[a]
		}
		function k(a) {
			var b,
			c = a ? a.indexOf("!") : -1;
			return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)),
			[b, a]
		}
		function l(a) {
			return function () {
				return s && s.config && s.config[a] || {}

			}
		}
		var m,
		n,
		o,
		p,
		q = {},
		r = {},
		s = {},
		t = {},
		u = Object.prototype.hasOwnProperty,
		v = [].slice,
		w = /\.js$/;
		o = function (a, b) {
			var c,
			d = k(a),
			e = d[0];
			return a = d[1],
			e && (e = f(e, b), c = j(e)),
			e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
				f : e ? e + "!" + a : a,
				n : a,
				pr : e,
				p : c
			}
		},
		p = {
			require : function (a) {
				return g(a)
			},
			exports : function (a) {
				var b = q[a];
				return "undefined" != typeof b ? b : q[a] = {}

			},
			module : function (a) {
				return {
					id : a,
					uri : "",
					exports : q[a],
					config : l(a)
				}
			}
		},
		m = function (a, b, c, f) {
			var h,
			k,
			l,
			m,
			n,
			s,
			u = [],
			v = typeof c;
			if (f = f || a, "undefined" === v || "function" === v) {
				for (b = !b.length && c.length ? ["require", "exports", "module"] : b, n = 0; n < b.length; n += 1)
					if (m = o(b[n], f), k = m.f, "require" === k)
						u[n] = p.require(a);
					else if ("exports" === k)
						u[n] = p.exports(a), s = !0;
					else if ("module" === k)
						h = u[n] = p.module(a);
					else if (e(q, k) || e(r, k) || e(t, k))
						u[n] = j(k);
					else {
						if (!m.p)
							throw new Error(a + " missing " + k);
						m.p.load(m.n, g(f, !0), i(k), {}),
						u[n] = q[k]
					}
				l = c ? c.apply(q[a], u) : void 0,
				a && (h && h.exports !== d && h.exports !== q[a] ? q[a] = h.exports : l === d && s || (q[a] = l))
			} else
				a && (q[a] = c)
		},
		a = b = n = function (a, b, c, e, f) {
			if ("string" == typeof a)
				return p[a] ? p[a](b) : j(o(a, b).f);
			if (!a.splice) {
				if (s = a, s.deps && n(s.deps, s.callback), !b)
					return;
				b.splice ? (a = b, b = c, c = null) : a = d
			}
			return b = b || function () {},
			"function" == typeof c && (c = e, e = f),
			e ? m(d, a, b, c) : setTimeout(function () {
				m(d, a, b, c)
			}, 4),
			n
		},
		n.config = function (a) {
			return n(a)
		},
		a._defined = q,
		c = function (a, b, c) {
			b.splice || (c = b, b = []),
			e(q, a) || e(r, a) || (r[a] = [a, b, c])
		},
		c.amd = {
			jQuery : !0
		}
	}
	(),
	c("../../vendors/almond", function () {}),
	function (a) {
		joms.BASE_URL = a.joms_base_url,
		delete a.joms_base_url,
		joms.ASSETS_URL = a.joms_assets_url,
		delete a.joms_assets_url,
		joms.mobile = function () {
			var a = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
			return a.test(navigator.userAgent)
		}
		(),
		joms.ios = function () {
			var a = /iphone|ipad|ipod/i;
			return a.test(navigator.userAgent)
		}
		(),
		joms.screenSize = function () {
			var a = window.innerWidth;
			return 480 >= a ? "small" : 991 >= a ? "medium" : "large"
		},
		joms.ajax = function (b) {
			var c = a.jax_live_site || "",
			d = a.jax_token_var || "_no_token_found_",
			e = {};
			if (b || (b = {}), e[d] = 1, e.task = "azrul_ajax", e.option = b.option || "community", e.func = b.func, e.no_html = 1, delete b.option, delete b.func, b.data && b.data.length)
				for (var f, g = 0; g < b.data.length; g++)
					f = b.data[g], "string" == typeof f && (f = f.replace(/"/g, "&quot;")), joms._.isArray(f) || (f = ["_d_", encodeURIComponent(f)]), e["arg" + (g + 2)] = JSON.stringify(f);
			var h;
			return b.url = c,
			b.type = "post",
			b.dataType = "json",
			b.data = e,
			b.success = function (a) {
				a && (h = a)
			},
			b.complete = function () {
				if (h || (h = {
							error : "Undefined error."
						}), h.noLogin)
					return joms.api && joms.api.login(h), void joms.view.misc.fixSVG();
				var a;
				if (joms._onAjaxReponseQueue && joms._onAjaxReponseQueue[e.func] && joms._onAjaxReponseQueue[e.func].length)
					for (var c = 0; c < joms._onAjaxReponseQueue[e.func].length; c++)
						"function" == typeof joms._onAjaxReponseQueue[e.func][c] && joms._onAjaxReponseQueue[e.func][c](h) === !1 && (a = !0);
				"function" != typeof b.callback || a || b.callback(h),
				joms.view.misc.fixSVG()
			},
			joms.jQuery.ajax(b)
		},
		joms.____ = function () {
			for (var a = joms.jQuery("#community-wrap"); a.length && "body" !== a[0].tagName.toLowerCase(); )
				a.siblings().hide(), a = a.parent(), a.css({
					border : "0 none",
					padding : 0,
					marginTop : 0,
					marginBottom : 0,
					width : "auto"
				})
		},
		joms._printSVGIcons = function () {
			for (var a = ["home", "newspaper", "pencil", "image", "images", "camera", "play", "film", "camera2", "bullhorn", "library", "profile", "support", "envelope", "location", "clock", "bell", "calendar", "box-add", "box-remove", "bubble", "bubbles", "user", "users", "spinner", "search", "key", "lock", "wrench", "cog", "gift", "remove", "briefcase", "switch", "signup", "list", "menu", "earth", "link", "eye", "star", "star2", "star3", "thumbs-up", "happy", "smiley", "tongue", "sad", "wink", "grin", "cool", "angry", "evil", "shocked", "confused", "neutral", "wondering", "warning", "info", "blocked", "spam", "close", "checkmark", "plus", "arrow-right", "arrow-left", "tab", "filter", "console", "share", "facebook", "libreoffice", "file-zip", "arrow-down", "redo", "tag", "search-user"], b = joms.jQuery("<div>"), c = 0; c < a.length; c++)
				b.append('<svg viewBox="0 0 30 30" class="joms-icon" style="width:30px;height:30px"><use xlink:href="#joms-icon-' + a[c] + '"></use></svg>');
			b.appendTo(document.body)
		},
		"function" == typeof c && c("core", [], function () {
			return a.joms
		})
	}
	(this),
	function (a, b, c, d) {
		joms.util || (joms.util = {}),
		joms.util.crop = d(a, b, c)
	}
	(window, joms.jQuery, !joms.mobile, function (a, b, c) {
		function d(a) {
			return d.attach(a)
		}
		function e() {
			p.css({
				top : "",
				left : "",
				right : "",
				bottom : "",
				width : "",
				height : "",
				webkitTransform : "",
				mozTransform : "",
				transform : ""
			})
		}
		function f() {
			var a = q[0],
			b = q.children("img"),
			c = p.position();
			s = {
				imageWidth : b.width(),
				imageHeight : b.height(),
				wrapperTop : a.scrollTop,
				wrapperLeft : a.scrollLeft,
				wrapperWidth : q.width(),
				wrapperHeight : q.height(),
				cropperTop : c.top + a.scrollTop,
				cropperLeft : c.left + a.scrollLeft,
				cropperWidth : p.outerWidth(),
				cropperHeight : p.outerHeight()
			}
		}
		function g(a) {
			f(),
			t = l(a)
		}
		function h(a) {
			var b,
			c = s,
			d = a.deltaY,
			e = a.deltaX;
			e = Math.min(e, c.imageWidth - c.cropperWidth - c.cropperLeft),
			e = Math.max(e, 0 - c.cropperLeft),
			d = Math.min(d, c.imageHeight - c.cropperHeight - c.cropperTop),
			d = Math.max(d, 0 - c.cropperTop),
			b = "translate3d(" + e + "px, " + d + "px, 0)",
			p.css({
				webkitTransform : b,
				mozTransform : b,
				transform : b
			})
		}
		function i(a) {
			var b = t,
			c = s,
			d = {};
			b.match(/n/) ? (d.top = "auto", d.bottom = c.wrapperHeight - c.cropperTop - c.cropperHeight, d.height = c.cropperHeight - a.deltaY) : b.match(/s/) && (d.bottom = "auto", d.top = c.cropperTop, d.height = c.cropperHeight + a.deltaY),
			b.match(/e/) ? (d.right = "auto", d.left = c.cropperLeft, d.width = c.cropperWidth + a.deltaX) : b.match(/w/) && (d.left = "auto", d.right = c.wrapperWidth - c.cropperLeft - c.cropperWidth, d.width = c.cropperWidth - a.deltaX),
			d.width = d.height = Math.max(d.width || 0, d.height || 0, 64),
			d.height = b.match(/n/) ? Math.min(d.height, c.wrapperHeight - d.bottom) : b.match(/s/) ? Math.min(d.height, c.imageHeight - d.top) : "auto" !== p[0].style.top ? Math.min(d.height, c.imageHeight - parseInt(p.css("top"))) : Math.min(d.height, c.wrapperHeight - parseInt(p.css("bottom"))),
			d.width = b.match(/e/) ? Math.min(d.width, c.imageWidth - d.left) : b.match(/w/) ? Math.min(d.width, c.wrapperWidth - d.right) : "auto" !== p[0].style.left ? Math.min(d.width, c.imageWidth - parseInt(p.css("left"))) : Math.min(d.width, c.wrapperWidth - parseInt(p.css("right"))),
			d.width = d.height = Math.min(d.width, d.height),
			p.css(d)
		}
		function j() {
			var a = p.position(),
			b = s;
			p.css({
				top : Math.max(a.top + b.wrapperTop, 0),
				left : Math.max(a.left + b.wrapperLeft, 0),
				right : "",
				bottom : "",
				webkitTransform : "",
				mozTransform : "",
				transform : ""
			}),
			f()
		}
		function k(a, b) {
			var c = p.offset();
			return {
				top : b - c.top,
				left : a - c.left
			}
		}
		function l(a) {
			var b = c ? 15 : 20,
			d = k(a.center.pageX, a.center.pageY),
			e = s,
			f = "";
			return d.top < b ? f += "n" : d.top > e.cropperHeight - b && (f += "s"),
			d.left < b ? f += "w" : d.left > e.cropperWidth - b && (f += "e"),
			f
		}
		function m() {
			c && p.on("mousemove.joms-cropper", o)
		}
		function n() {
			c && p.off("mousemove.joms-cropper")
		}
		function o(a) {
			var c,
			d = b(a.target).parent().offset(),
			e = a.pageX - d.left,
			g = a.pageY - d.top,
			h = 15,
			i = "";
			f(),
			c = s,
			g < c.cropperTop - c.wrapperTop + h ? i += "n" : g > c.cropperTop - c.wrapperTop + c.cropperHeight - h && (i += "s"),
			e < c.cropperLeft - c.wrapperLeft + h ? i += "w" : e > c.cropperLeft - c.wrapperLeft + c.cropperWidth - h && (i += "e"),
			p.css({
				cursor : i ? i + "-resize" : ""
			})
		}
		var p,
		q,
		r,
		s,
		t;
		d.init = function () {
			q || (q = b('<div class="joms-cropper__wrapper" />')),
			p || (p = b('<div class="joms-cropper__box" />'))
		},
		d.attach = function (a) {
			return d.init(),
			d.detach(),
			e(),
			b(a).wrap(q),
			q = b(a).parent(),
			p.insertAfter(a),
			r || (r = new joms.Hammer(p[0]), r.on("touch drag release", function (a) {
					a.stopPropagation(),
					a.preventDefault(),
					a.gesture.stopPropagation(),
					a.gesture.preventDefault(),
					"touch" === a.type ? (n(), g(a.gesture)) : "release" !== a.type ? u(a.gesture) : (j(a.gesture), m())
				})),
			m(),
			a
		},
		d.detach = function () {
			d.init(),
			p.detach(),
			q.children().unwrap(),
			q.detach()
		},
		d.getSelection = function () {
			var a = s;
			return {
				x : a.cropperLeft,
				y : a.cropperTop,
				width : a.cropperWidth,
				height : a.cropperHeight
			}
		};
		var u = joms._.throttle(function (a) {
				t ? i(a) : h(a)
			}, c ? 10 : 100);
		return d
	}),
	c("utils/crop", function () {}),
	c("utils/map", ["core"], function () {
		joms.util || (joms.util = {}),
		joms.util.map = function (a) {
			if ("function" == typeof a) {
				if (window.google && window.google.map && window.google.map.places)
					return void a();
				if (joms.util.map.loading)
					return void joms.util.map.queue.push(a);
				joms.util.map.loading = !0,
				joms.util.map.queue = [a],
				joms.util.map.execQueue = function (a) {
					for (; joms.util.map.queue.length; )
						joms.util.map.queue.shift()(a);
					joms.util.map.loading = !1
				},
				joms.util.map.gmapcallback = function () {
					joms.util.map.execQueue()
				};
				var b = document.createElement("script");
				b.type = "text/javascript",
				b.src = "//maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=joms.util.map.gmapcallback",
				document.body.appendChild(b)
			}
		},
		joms.util.map.nearbySearch = function (a, b, c) {
			var d = new window.google.maps.places.PlacesService(a),
			e = {
				location : b,
				radius : 2e3
			};
			d.nearbySearch(e, function (a, b) {
				var d,
				e,
				f;
				if (b !== window.google.maps.places.PlacesServiceStatus.OK)
					return void c({
						error : "Unable to find your nearest location."
					});
				if (!a || !a.length)
					return void c({
						error : "Unable to find your nearest location."
					});
				for (d = [], e = 0, f; e < a.length; e++)
					f = a[e], d.push({
						lat : f.geometry.location.lat(),
						lng : f.geometry.location.lng(),
						name : f.name,
						vicinity : f.vicinity
					});
				c(d)
			})
		}
	}),
	c("utils/popup", ["core", "utils/map"], function () {
		function a() {}

		a.prototype.prepare = function (a) {
			var b,
			c;
			return joms.jQuery.magnificPopup ? (b = this.showPopup(), void a(b)) : (c = this, void this.loadlib(function () {
					joms.jQuery.magnificPopup && (b = c.showPopup(), a(b))
				}))
		},
		a.prototype.showPopup = function () {
			joms.jQuery.magnificPopup.open({
				type : "inline",
				items : {
					src : []
				},
				tClose : window.joms_lang.COM_COMMUNITY_CLOSE_BUTTON,
				tLoading : window.joms_lang.COM_COMMUNITY_POPUP_LOADING
			});
			var a = joms.jQuery.magnificPopup.instance,
			b = "joms-popup__wrapper";
			return joms.mobile && (b += " joms-popup__mobile"),
			a.container.addClass(b),
			a.updateStatus("loading"),
			a
		},
		a.prototype.loadlib = function (a) {
			a()
		},
		joms.util || (joms.util = {}),
		joms.util.popup = new a
	}),
	function (a, b, d) {
		joms.util || (joms.util = {}),
		joms.util.dropdown = d(a, b),
		c("utils/dropdown", ["utils/popup"], function () {
			return joms.util.dropdown
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			l && l.hide(),
			k && f(k)
		}
		function d(a) {
			var d,
			i;
			return a.stopPropagation(),
			a.preventDefault(),
			d = b(a.currentTarget),
			i = d.siblings(s),
			i.length ? i.is(":visible") ? (i.hide(), void f(d)) : "large" === joms.screenSize() ? (c(), i.show(), e(d), k = d, l = i, void h(i.attr("class") || "")) : void joms.util.popup.prepare(function (a) {
				m = a,
				m.items[0] = {
					type : "inline",
					src : g(i)
				},
				m.updateItemHTML(),
				h(i.attr("class") || ""),
				n = m.contentContainer,
				n.on("click", "li > a", function () {
					m.close()
				})
			}) : void 0
		}
		function e(a) {
			var b = a.parent();
			b.hasClass(".joms-focus__button--options--desktop") ? b.addClass("active") : a.addClass("active")
		}
		function f(a) {
			var b = a.parent();
			b.hasClass(".joms-focus__button--options--desktop") ? b.removeClass("active") : a.removeClass("active")
		}
		function g(a) {
			return '<div class="joms-popup joms-popup--dropdown">' + a[0].outerHTML + "</div>"
		}
		function h(a) {
			return a.match("joms-popover--toolbar-general") ? void joms.api.notificationGeneral() : a.match("joms-popover--toolbar-friendrequest") ? void joms.api.notificationFriend() : a.match("joms-popover--toolbar-pm") ? void joms.api.notificationPm() : void 0
		}
		function i() {
			j(),
			o || (o = b(document.body)),
			o.on(p, c),
			o.on(p, r, d),
			o.on(q, r, c),
			o.on(p, s, function (a) {
				b(a.target).data("propagate") || a.stopPropagation(),
				t(a)
			})
		}
		function j() {
			o && (o.off(p), o.off(p, r), o.off(q, r), o.off(p, s))
		}
		var k,
		l,
		m,
		n,
		o,
		p = "click.dropdown",
		q = "collapse.dropdown",
		r = "[data-ui-object=joms-dropdown-button]",
		s = ".joms-dropdown,.joms-popover",
		t = joms._.debounce(function (d) {
				var e,
				f,
				g,
				h,
				i,
				j,
				k = d.currentTarget.className || "";
				k.indexOf("joms-dropdown--privacy") < 0 || (e = b(d.currentTarget), f = b(d.target).closest("li"), f.length && (g = b(".joms-button--privacy").filter('[data-name="' + e.data("name") + '"]'), h = g.children("[data-ui-object=joms-dropdown-value]"), i = g.children("span"), j = g.find("use"), h.val(f.data("value")), i.html(f.children("span").html()), j.attr("xlink:href", a.location + "#" + f.data("classname"))), c(), m && m.close())
			}, 100);
		return {
			start : i,
			stop : j
		}
	}),
	function (a, b) {
		joms.util || (joms.util = {}),
		joms.util.loadLib = b(a)
	}
	(window, function (a) {
		function b(a) {
			return a()
		}
		function c(b) {
			return a.MediaElement ? b() : void joms.$LAB.script(joms.ASSETS_URL + "vendors/mediaelement/mediaelement-and-player.min.js").wait(function () {
				b()
			})
		}
		function d(b) {
			return a.flowplayer ? b() : void joms.$LAB.script(joms.ASSETS_URL + "flowplayer/flowplayer-3.2.6.min.js").wait(function () {
				b()
			})
		}
		function e(b) {
			return a.plupload ? b() : void joms.$LAB.script(joms.ASSETS_URL + "vendors/plupload.min.js").wait(function () {
				b()
			})
		}
		function f(a) {
			return joms.jQuery ? joms.jQuery.trumbowyg ? a() : (joms.loadCSS(joms.ASSETS_URL + "vendors/trumbowyg/design/css/trumbowyg.css"), void joms.$LAB.script(joms.ASSETS_URL + "vendors/trumbowyg/trumbowyg.min.js").wait(function () {
					a()
				})) : !1
		}
		function g(b) {
			return a.Sortable ? b() : void joms.$LAB.script(joms.ASSETS_URL + "dragsort/jquery.dragsort-0.5.1.min.js").wait(function () {
				b()
			})
		}
		function h(a, h) {
			return "gmap" === a ? b(h) : "mediaelement" === a ? c(h) : "flowplayer" === a ? d(h) : "plupload" === a ? e(h) : "trumbowyg" === a ? f(h) : "dragsort" === a ? g(h) : void h()
		}
		return h
	}),
	c("utils/loadlib", function () {}),
	function (a, b) {
		joms.util || (joms.util = {}),
		joms.util.tab = b(a)
	}
	(window, function () {
		function a() {
			b(),
			c()
		}
		function b() {
			function a(a) {
				var b,
				c,
				d = joms.jQuery(a.target),
				g = d.parent(e),
				h = d.attr("href");
				if (0 === h.indexOf("#"))
					return b = d.closest(e).siblings(h), b.show().siblings(f).hide(), d.addClass("active").siblings("a").removeClass("active"), c = g.data("id"), c && (c = "#tab:" + c + "/" + d.data("id"), window.location = c), !1
			}
			function b() {
				c(),
				d || (d = joms.jQuery(document.body)),
				d.on("click.joms-tab", e + " a", a)
			}
			function c() {
				d && d.off("click.joms-tab")
			}
			var d,
			e = ".joms-tab__bar",
			f = ".joms-tab__content";
			b()
		}
		function c() {
			joms.jQuery(".cTabsBar").on("click", "li", function (a) {
				var b,
				c,
				d = joms.jQuery(a.currentTarget),
				e = d.closest(".cTabsBar").siblings(".cTabsContentWrap");
				e.length && (b = d.prevAll().length, c = e.children(".cTabsContent").eq(b), c.length && (d.addClass("cTabCurrent").siblings(".cTabCurrent").removeClass("cTabCurrent"), c.siblings(".cTabsContent").hide(), c.show()))
			})
		}
		return {
			start : a
		}
	}),
	c("utils/tab", function () {}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.tagging = c(a, b),
		b.fn.jomsTagging = function (a) {
			return this.each(function () {
				joms.util.tagging(this, a)
			})
		}
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c) {
			return this.textarea = a,
			this.fetcher = c || !1,
			this.$textarea = b(a),
			this.$textarea.data("initialValue", a.value),
			this.$textarea.data(h, this),
			this.$textarea.on("focus." + h, b.proxy(this.initialize, this)),
			this
		}
		var d = 13,
		e = 27,
		f = 38,
		g = 40,
		h = "joms-tagging",
		i = ".joms-textarea",
		j = i + "__wrapper",
		k = i + "__beautifier",
		l = i + "__hidden",
		m = i + "__tag-ct",
		n = i + "__tag-item",
		o = n + "--active",
		p = /@\[\[(\d+):contact:([^\]]+)\]\]/g,
		q = /@\[\[(\d+):contact:([^\]]+)\]\]/,
		r = /(^|#|\s)(#[^#\s]+)/g,
		s = "$1<b>$2</b>",
		t = /\n/g,
		u = "<br>";
		return c.prototype.initialize = function () {
			var a,
			c,
			d,
			e,
			f;
			if (this.dropdownIsOpened = !1, this.dropdownIsClicked = !1, this.dropdownSelectedItem = !1, this.domPrepare(), this.$textarea.data("initialValue")) {
				if (a = this.textarea.value, c = a.match(p), this.textarea.value = a.replace(p, "$2"), this.tagsAdded = [], c && c.length)
					for (f = 0; f < c.length; f++)
						d = c[f].match(q), e = a.indexOf(c[f]), a = a.replace(c[f], d[2]), this.tagsAdded.push({
							id : d[1],
							name : d[2],
							start : e,
							length : d[2].length
						});
				this.beautifierUpdate(a, this.tagsAdded),
				this.hiddenUpdate(a, this.tagsAdded),
				this.inputAutogrow()
			}
			this.$textarea.off("focus." + h).on("focus." + h, b.proxy(this.inputOnKeydown, this)).on("click." + h, b.proxy(this.inputOnKeydown, this)).on("keydown." + h, b.proxy(this.inputOnKeydown, this)).on("keyup." + h, b.proxy(this.inputOnKeyup, this)).on("input." + h, b.proxy(this.inputOnInput, this)).on("blur." + h, b.proxy(this.inputOnBlur, this)),
			this.$dropdown.on("mouseenter." + h, n, b.proxy(this.dropdownOnMouseEnter, this)).on("mousedown." + h, n, b.proxy(this.dropdownOnMouseDown, this)).on("mouseup." + h, n, b.proxy(this.dropdownOnMouseUp, this)),
			this.textarea.joms_beautifier = this.$beautifier,
			this.textarea.joms_hidden = this.$hidden;
			var g = this;
			this.textarea.joms_reset = function () {
				g.inputReset()
			}
		},
		c.prototype.domPrepare = function () {
			this.$wrapper = this.$textarea.parent(j),
			this.$wrapper.length || (this.$textarea.wrap('<div class="' + j.substr(1) + '"></div>'), this.$wrapper = this.$textarea.parent()),
			this.$beautifier = this.$wrapper.children(k),
			this.$beautifier.length || (this.$beautifier = b('<div class="' + i.substr(1) + " " + k.substr(1) + '"></div>'), this.$beautifier.prependTo(this.$wrapper)),
			this.$hidden = this.$wrapper.children(l),
			this.$hidden.length || (this.$hidden = b('<input type="hidden" class="' + l.substr(1) + '">'), this.$hidden.appendTo(this.$wrapper)),
			this.$dropdown = this.$wrapper.children(m),
			this.$dropdown.length || (this.$dropdown = b('<div class="' + m.substr(1) + '"></div>'), this.$dropdown.appendTo(this.$wrapper))
		},
		c.prototype.inputPrepare = function () {},
		c.prototype.inputReset = function () {
			this.tagsAdded && (this.tagsAdded = [])
		},
		c.prototype.inputAutogrow = function () {
			var a,
			b = +this.$textarea.data(h + "-prevHeight");
			this.$wrapper.css({
				height : b
			}),
			this.$textarea.css({
				height : ""
			}),
			a = this.textarea.scrollHeight + 2,
			this.$textarea.css({
				height : a
			}),
			a !== +b && this.$textarea.data(h + "-prevHeight", a),
			this.$wrapper.css({
				height : ""
			})
		},
		c.prototype.inputOnKeydown = function (a) {
			return this.dropdownIsOpened && [d, e, f, g].indexOf(a.keyCode) >= 0 ? !1 : a.keyCode === e ? (this.inputReset(), !1) : (this.prevSelStart = this.textarea.selectionStart, void(this.prevSelEnd = this.textarea.selectionEnd))
		},
		c.prototype.inputOnKeyup = function (a) {
			if (this.dropdownIsOpened) {
				if (a.keyCode === f || a.keyCode === g)
					return this.dropdownChangeItem(a.keyCode), !1;
				if (a.keyCode === d)
					return this.dropdownSelectItem(), !1;
				if (a.keyCode === e)
					return this.dropdownHide(), !1
			}
		},
		c.prototype.inputOnInput = function () {
			var a,
			b,
			c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l = this.textarea.value;
			if (this.tagsAdded) {
				if (this.prevSelStart !== this.prevSelEnd)
					for (j = 0; j < this.tagsAdded.length; j++)
						b = this.tagsAdded[j], c = b.start + b.length, (this.prevSelStart > b.start && this.prevSelStart < c || this.prevSelEnd > b.start && this.prevSelEnd < c || b.start >= this.prevSelStart && c <= this.prevSelEnd) && this.tagsAdded.splice(j--, 1);
				for (a = this.textarea.selectionStart - this.prevSelStart - (this.prevSelEnd - this.prevSelStart), j = 0; j < this.tagsAdded.length; j++)
					if (b = this.tagsAdded[j], b.start >= this.prevSelStart)
						b.start += a;
					else if (c = b.start + b.length, c < this.prevSelStart);
					else if (c > this.prevSelStart) {
						if (a > 0)
							this.tagsAdded.splice(j--, 1);
						else if (0 > a) {
							for (d = l.substring(b.start, this.prevSelStart + a), f = d.split(" ").length - 1, d = b.name.split(" "), d.splice(f, 1), d = d.join(" "), e = b.name.split(" "), e = e.slice(0, f), e = e.join(" "), g = new RegExp("^(.{" + b.start + "})(.{" + (b.length + a) + "})"), h = "$1" + d, this.textarea.value = this.textarea.value.replace(g, h), this.textarea.setSelectionRange(b.start + e.length, b.start + e.length), l = this.textarea.value, i = b.length - d.length, b.name = d, b.length = d.length, k = j + 1; k < this.tagsAdded.length; k++)
								this.tagsAdded[k].start -= i;
							d.length || this.tagsAdded.splice(j--, 1),
							j = this.tagsAdded.length
						}
					} else if (0 > a) {
						for (d = b.name.split(" "), d.pop(), d = d.join(" "), g = new RegExp("^(.{" + b.start + "})(.{" + (b.length + a) + "})"), h = "$1" + d, this.textarea.value = this.textarea.value.replace(g, h), this.textarea.setSelectionRange(b.start + d.length, b.start + d.length), l = this.textarea.value, i = b.length - d.length, b.name = d, b.length = d.length, k = j + 1; k < this.tagsAdded.length; k++)
							this.tagsAdded[k].start -= i;
						d.length || this.tagsAdded.splice(j--, 1),
						j = this.tagsAdded.length
					}
			}
			this.inputAutogrow(),
			this.beautifierUpdate(l, this.tagsAdded || []),
			this.hiddenUpdate(l, this.tagsAdded || []),
			this.dropdownToggle()
		},
		c.prototype.inputOnBlur = function () {
			this.dropdownIsClicked || this.dropdownHide()
		},
		c.prototype.beautifierUpdate = joms._.debounce(function (a, b) {
				var c,
				d,
				e,
				f,
				g;
				if (b.length) {
					for (c = "^", d = "", e = 0, g = 0; g < b.length; g++)
						f = b[g], c += "(.{" + (f.start - e) + "})(.{" + f.length + "})", d += "$" + (2 * g + 1) + "<b>" + f.name + "</b>", e = f.start + f.length;
					c = new RegExp(c),
					a = a.replace(c, d)
				}
				a = a.replace(r, s),
				a = a.replace(t, u),
				this.$beautifier.html(a)
			}, joms.mobile ? 100 : 1),
		c.prototype.hiddenUpdate = joms._.debounce(function (a, b) {
				var c,
				d,
				e,
				f,
				g;
				if (b.length) {
					for (c = "^", d = "", e = 0, g = 0; g < b.length; g++)
						f = b[g], c += "(.{" + (f.start - e) + "})(.{" + f.length + "})", d += "$" + (2 * g + 1) + "@[[" + f.id + ":contact:" + f.name + "]]", e = f.start + f.length;
					c = new RegExp(c),
					a = a.replace(c, d)
				}
				this.$hidden.val(a)
			}, joms.mobile ? 500 : 50),
		c.prototype.dropdownToggle = joms._.debounce(function () {
				var a = this.textarea.selectionStart,
				b = this.textarea.value.substr(0, a),
				c = b.lastIndexOf("@");
				return 0 > c || ++c >= a ? void this.dropdownHide() : (b = b.substring(c, a), void this.dropdownFetch(b, joms._.bind(this.dropdownUpdate, this)))
			}, joms.mobile ? 1e3 : 200),
		c.prototype.dropdownFetch = function (b, c, d) {
			var e,
			f,
			g,
			h,
			i,
			j,
			k = (a.joms_friends || []).concat(d || []),
			l = this.tagsAdded || [],
			m = [],
			n = [];
			if (k && k.length)
				for (b = b.toLowerCase(), i = 0; i < k.length && m.length < 20; i++)
					if (e = k[i], f = (e.name || "").toLowerCase(), f.indexOf(b) >= 0) {
						for (g = !1, j = 0; j < l.length; j++)
							if (+e.id === +l[j].id) {
								g = !0;
								break
							}
						!g && n.indexOf(+e.id) < 0 && (n.push(+e.id), m.push({
								id : e.id,
								name : e.name,
								img : e.avatar
							}))
					}
			m.sort(function (a, b) {
				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
			}),
			c(m),
			"function" != typeof this.fetcher || d || (h = this, this.fetcher(function (a) {
					a || (a = []),
					h.dropdownFetch(b, joms._.bind(h.dropdownUpdate, h), a)
				}))
		},
		c.prototype.dropdownUpdate = function (a) {
			var b,
			c,
			d,
			e,
			f;
			if (!a || !a.length)
				return void this.dropdownHide();
			for (b = "", d = n.substr(1), f = Math.min(10, a.length), e = 0; f > e; e++)
				c = a[e], b += '<a href="javascript:" class=' + d + ' data-id="' + c.id + '" data-name="' + c.name + '">', b += '<img src="' + c.img + '">' + c.name + "</a>";
			this.dropdownShow(b)
		},
		c.prototype.dropdownShow = function (a) {
			this.$dropdown.html(a).show(),
			this.dropdownIsOpened = !0,
			this.dropdownSelectedItem = !1
		},
		c.prototype.dropdownHide = function () {
			this.$dropdown.hide(),
			this.dropdownIsOpened = !1
		},
		c.prototype.dropdownOnMouseEnter = function (a) {
			this.dropdownChangeItem(a)
		},
		c.prototype.dropdownOnMouseDown = function () {
			this.dropdownIsClicked = !0
		},
		c.prototype.dropdownOnMouseUp = function (a) {
			this.dropdownSelectItem(a),
			this.dropdownIsClicked = !1,
			this.dropdownHide()
		},
		c.prototype.dropdownChangeItem = function (a) {
			var c,
			d,
			e,
			g = o.substr(1);
			return "number" != typeof a ? (c = this.dropdownSelectedItem = b(a.target), d = c.siblings(o), c.addClass(g), void d.removeClass(g)) : (c = this.$dropdown.children(o), c.length ? (e = c[a === f ? "prev" : "next"](), c.removeClass(g), void(e.length ? (this.dropdownSelectedItem = e, e.addClass(g)) : this.dropdownSelectedItem = !1)) : (c = this.dropdownSelectedItem = this.$dropdown.children()[a === f ? "last" : "first"](), void c.addClass(g)))
		},
		c.prototype.dropdownSelectItem = function (a) {
			var c,
			d,
			e = a ? b(a.target) : this.dropdownSelectedItem,
			f = e.data("id"),
			g = e.data("name"),
			h = this.textarea.selectionStart,
			i = this.textarea.value.substr(0, h),
			j = i.lastIndexOf("@");
			this.tagsAdded || (this.tagsAdded = []),
			this.tagsAdded.push({
				id : f,
				name : g,
				start : j,
				length : g.length
			}),
			c = new RegExp("^(.{" + j + "}).{" + (h - j) + "}"),
			d = this.textarea.value.replace(c, "$1" + g),
			this.textarea.value = d,
			this.inputAutogrow(),
			this.beautifierUpdate(d, this.tagsAdded),
			this.hiddenUpdate(d, this.tagsAdded),
			this.dropdownHide()
		},
		c.prototype.clear = function () {
			this.tagsAdded = [],
			this.$textarea && this.$textarea.val(""),
			this.$hidden && this.$hidden.val(""),
			this.$beautifier && this.$beautifier.empty()
		},
		function (a, d) {
			var e = b(a).data(h);
			return e ? e : new c(a, d)
		}
	}),
	c("utils/tagging", function () {}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.validation = c(a, b)
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			b(".joms-form__group").find("[required]").add(b(".joms-form__group").find("[data-required]")).each(function () {
				var a = b(this),
				c = a.closest(".joms-form__group"),
				d = c.children().first();
				d.find(".joms-required").length || d.append(' <span class="joms-required">*</span>')
			})
		}
		function d() {
			var a = b(".joms-form__group").find("textarea[data-maxchars]");
			a.wrap('<div style="position:relative"></div>'),
			a.parent().append('<div class="joms-js--textarea-counter" style="position:absolute;bottom:2px;right:5px"></div>'),
			a.each(function () {
				var a = b(this);
				a.siblings(".joms-js--textarea-counter").html(a.data("maxchars"))
			}),
			a.off("input").on("input", function () {
				var a,
				c = b(this),
				d = c.siblings(".joms-js--textarea-counter"),
				e = c.data("maxchars") || 0;
				e && (a = c.val(), a.length > e && (a = a.substr(0, e), c.val(a)), d.html(e - a.length))
			})
		}
		function e() {
			b(".joms-form__group").find("[required]").add(b(".joms-form__group").find("[data-required]")).off("blur").on("blur", function (a, c) {
				var d,
				e = b(this),
				j = e.next("p.joms-help"),
				l = e.attr("name"),
				m = (e.attr("type") || "").toLowerCase(),
				p = e[0].tagName.toLowerCase(),
				q = b.trim(e.closest(".joms-form__group").children().first().text().replace(/\*/g, "")),
				r = b.trim(e.val());
				j.length || (j = b('<p class="joms-help" style="color:red">'), j.hide().insertAfter(e)),
				("text" === m || "password" === m || "select" === p || "textarea" === p) && ("function" != typeof c && (c = function () {}), r ? (d = e.data("validation") || "", "username" === d ? f(e, r, c) : "email" === d ? g(e, r, c) : "password" === d ? h(e, r, c) : d.match(/^password:/) ? i(e, r, c) : (j.hide(), c(n))) : (k(e, [l, q, "COM_COMMUNITY_REGISTER_INVALID_VALUE"]), c(o)))
			})
		}
		function f(a, b, c) {
			joms.ajax({
				func : "register,ajaxCheckUserName",
				data : [b],
				callback : function (b) {
					var d = a.next("p.joms-help");
					b.error ? (d.html(b.error), d.show(), c(o)) : (d.hide(), c(n))
				}
			})
		}
		function g(a, b, c) {
			var d = /^([*+!.&#$¦\'\\%\/0-9a-z^_`{}=?~:-]+)@(([0-9a-z-]+\.)+[0-9a-z]{2,8})$/i;
			return d.test(b) ? void joms.ajax({
				func : "register,ajaxCheckEmail",
				data : [b],
				callback : function (b) {
					var d = a.next("p.joms-help");
					b.error ? (d.html(b.error), d.show(), c(o)) : (d.hide(), c(n))
				}
			}) : (k(a, ["", "", "COM_COMMUNITY_INVALID_EMAIL"]), void c(o))
		}
		function h(a, b, c) {
			joms.ajax({
				func : "register,ajaxCheckPass",
				data : [b],
				callback : function (b) {
					var d = a.next("p.joms-help");
					b.error ? (d.html(b.error.replace(/\n/g, "<br/>")), d.show(), c(o)) : (d.hide(), c(n))
				}
			})
		}
		function i(a, c, d) {
			var e,
			f,
			g;
			return e = a.data("validation").split(":"),
			f = b(e[1]),
			g = a.next("p.joms-help"),
			f.length && c !== f.val() ? (k(a, ["", "", "COM_COMMUNITY_REGISTER_PASSWORD_NOT_SAME"]), void d(o)) : (g.hide(), void d(n))
		}
		function j(a, c) {
			var d,
			e,
			f = 0,
			g = 0;
			return a = b(a),
			d = a.find("[required]").add(a.find("[data-required]")),
			e = d.length,
			d.length || c(f),
			d.each(function () {
				var a = b(this);
				a.triggerHandler("blur", function (a) {
					a === o && f++,
					++g >= e && c(f)
				})
			}),
			!1
		}
		function k(a, b) {
			joms.ajax({
				func : "register,ajaxSetMessage",
				data : b,
				callback : function (b) {
					var c = a.next("p.joms-help");
					c.html(b.message),
					c.show()
				}
			})
		}
		function l() {
			c(),
			d(),
			e()
		}
		function m() {}

		var n = "valid",
		o = "invalid";
		return {
			start : l,
			stop : m,
			validate : j
		}
	}),
	c("utils/validation", function () {}),
	function (a, b, d) {
		joms.util || (joms.util = {}),
		joms.util.video = d(a, b),
		c("utils/video", ["utils/loadlib"], function () {
			return joms.util.video
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			"file" === b.type ? d(a, b) : "youtube" === b.type ? e(a, b) : "vimeo" === b.type ? f(a, b) : "myspace" === b.type ? g(a, b) : "blip" === b.type ? h(a, b) : "dailymotion" === b.type ? i(a, b) : "liveleak" === b.type ? j(a, b) : "flickr" === b.type ? k(a, b) : "yahoo" === b.type ? l(a, b) : "metacafe" === b.type ? m(a, b) : n(a, b)
		}
		function d(a, c) {
			var d,
			e,
			f,
			g = a.find(".joms-media__thumbnail");
			e = joms._.uniqueId("joms-js--video-"),
			f = c.path.match(/\.flv$/) ? "flv" : "mp4",
			d = b("flv" === f ? '<div class="flowplayer" id="' + e + '" style="width:100%;height:281px;"></div>' : '<video id="' + e + '" width="480" height="360" preload="none"><source src="' + c.path + '" type="video/mp4" /></video>'),
			a.addClass("being-played"),
			g.html(d),
			o(e, c.type, {
				fileType : f,
				filePath : c.path
			})
		}
		function e(a, c) {
			var d,
			e,
			f;
			d = joms._.uniqueId("joms-js--video-"),
			e = b('<video id="' + d + '" controls="control" preload="none"><source src="' + c.path + '" type="video/youtube" /></video>'),
			f = a.find(".joms-media__thumbnail"),
			f.length || (f = a),
			a.addClass("being-played"),
			f.html(e),
			o(d)
		}
		function f(a, b) {
			var c = a.find(".joms-media__thumbnail");
			a.addClass("being-played"),
			c.html('<iframe src="//player.vimeo.com/video/' + b.id + '?autoplay=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
		}
		function g(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = b.path;
			d = d.replace(/^https?:/, ""),
			d = d.replace(/myspace.com\/myspace\//, "myspace.com/play/"),
			d = d.replace(/\/(\d+)$/, "-$1"),
			a.addClass("being-played"),
			c.html('<iframe src="' + d + '" width="500" height="281" frameborder="0" allowtransparency="true" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
		}
		function h(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = "//blip.tv/play/" + b.id;
			a.addClass("being-played"),
			c.html('<iframe src="' + d + '" width="500" height="281" frameborder="0" allowfullscreen></iframe>')
		}
		function i(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = b.path;
			d = d.replace(/^https?:/, ""),
			d = d.replace(/\/video\/([^_]+)_.+$/, "/embed/video/$1"),
			a.addClass("being-played"),
			c.html('<iframe src="' + d + '" width="500" height="281" frameborder="0" allowfullscreen></iframe>')
		}
		function j(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = "//www.liveleak.com/ll_embed?i=" + b.id;
			a.addClass("being-played"),
			c.html('<iframe src="' + d + '" width="500" height="281" frameborder="0" allowfullscreen></iframe>')
		}
		function k(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = b.id.replace(/^.*\/(\d+)$/, "$1"),
			e = "https://www.flickr.com/apps/video/stewart.swf?photo_id=" + d;
			a.addClass("being-played"),
			c.html('<embed src="' + e + '" width="500" height="281"  wmode="transparent" allowFullScreen="true" type="application/x-shockwave-flash" />')
		}
		function l(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = b.path;
			d = d.replace("www.yahoo.com/movies/v", "movies.yahoo.com/video"),
			d += "?format=embed&player_autoplay=true",
			a.addClass("being-played"),
			c.html('<iframe src="' + d + '" width="500" height="281" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>')
		}
		function m(a, b) {
			var c = a.find(".joms-media__thumbnail"),
			d = "http://www.metacafe.com/embed/" + b.id;
			a.addClass("being-played"),
			c.html('<iframe src="' + d + '" width="500" height="281" frameborder="0" allowfullscreen></iframe>')
		}
		function n(b, c) {
			a.open(c.path)
		}
		function o(c, d, e) {
			"file" === d && "flv" === e.fileType ? joms.util.loadLib("flowplayer", function () {
				a.flowplayer(c, {
					src : joms.ASSETS_URL + "flowplayer/flowplayer-3.2.7.swf",
					wmode : "opaque"
				}, {
					streamingServer : "lighttpd",
					playlist : [{
							url : e.filePath,
							autoPlay : !1,
							autoBuffering : !0,
							provider : "lighttpd",
							scaling : "scale"
						}
					],
					plugins : {
						lighttpd : {
							url : joms.ASSETS_URL + "flowplayer/flowplayer.pseudostreaming-3.2.7.swf",
							queryString : a.escape("?target=${start}")
						},
						controls : {
							url : joms.ASSETS_URL + "flowplayer/flowplayer.controls-3.2.5.swf"
						}
					}
				})
			}) : joms.util.loadLib("mediaelement", function () {
				b("#" + c).mediaelementplayer({
					iPadUseNativeControls : "file" === d ? !0 : !1,
					iPhoneUseNativeControls : "file" === d ? !0 : !1,
					success : function (a, b, c) {
						setTimeout(function () {
							c.disableControls(),
							c.enableControls()
						}, 1),
						"flash" === a.pluginType ? a.addEventListener("canplay", function () {
							a.play()
						}, !1) : ["youtube", "vimeo"].indexOf(a.pluginType) < 0 && a.play()
					}
				})
			})
		}
		return {
			play : c
		}
	}),
	function (a, b, d) {
		joms.util || (joms.util = {}),
		joms.util.wysiwyg = d(a, b),
		c("utils/wysiwyg", ["utils/loadlib"], function () {
			return joms.util.wysiwyg
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			var a = b("textarea").filter("[data-wysiwyg=trumbowyg]");
			a.length && joms.util.loadLib("trumbowyg", function () {
				a.each(function () {
					var a,
					c;
					a = b(this).data("btns"),
					a = a || "viewHTML,|,bold,italic,underline,|,unorderedList,orderedList,|,link,insertImage",
					a = a.split(","),
					c = b(this).trumbowyg({
							btns : a,
							fullscreenable : !1,
							mobile : !1,
							tablet : !1
						}).data("trumbowyg"),
					c.buildModalBtn = d,
					c._openModalInsert = c.openModalInsert,
					c.openModalInsert = function (a, d, e) {
						var f = c._openModalInsert(a, d, e);
						return f.find("label").each(function () {
							var a,
							c = b(this),
							d = c.find("input"),
							e = d.attr("name");
							["url", "title", "text", "alt"].indexOf(e) >= 0 && (a = '<div class="joms-form__group">', a += '<span style="width:90px">' + c.find(".trumbowyg-input-infos").text() + "</span>", a += '<input type="text" value="' + (d.val() || "") + '" name="' + e + '" class="joms-input">', a += "</div>", c.replaceWith(b(a)))
						}),
						f
					}
				})
			})
		}
		function d(a, c) {
			return b("<button/>", {
				"class" : "joms-button--full-small joms-button--" + ("submit" === a ? "primary" : "neutral"),
				type : a,
				text : this.lang[a] || a
			}).appendTo(c.find("form"))
		}
		return {
			start : c
		}
	}),
	function (a, b, d) {
		joms.fn || (joms.fn = {}),
		joms.fn.tagging = d(a, b),
		c("functions/tagging", ["utils/tagging"], function () {
			return joms.fn.tagging
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			var a = b(document.body).find(".joms-js--newcomment").find("textarea.joms-textarea");
			a.each(function () {
				var a = b(this);
				a[0].joms_beautifier || (a[0].joms_data = a.data(), a.jomsTagging(d))
			})
		}
		function d(c) {
			var d,
			e = this,
			g = this.textarea.joms_data,
			h = g.tagId || g.id,
			i = (g.tagFunc || g.func || "").toLowerCase(),
			j = [];
			return this.textarea.joms_friends ? void c(this.textarea.joms_friends) : (i ? (d = "index.php?option=com_community&view=friends&task=ajaxAutocomplete", i.indexOf("album") > -1 ? d += "&albumid=" + h : i.indexOf("photo") > -1 ? d += "&photoid=" + h + "&rule=photo-comment" : i.indexOf("video") > -1 ? d += "&videoid=" + h : i.indexOf("discussion") > -1 ? d += "&discussionid=" + h : i.indexOf("inbox") > -1 && (d += "&msgid=" + h)) : (d = "index.php?option=com_community&view=friends&task=ajaxAutocomplete&type=comment&streamid=" + h, a.joms_group_id ? d += "&groupid=" + a.joms_group_id : a.joms_event_id && (d += "&eventid=" + a.joms_event_id)), this.fetchXHR && this.fetchXHR.abort(), void(this.fetchXHR = b.ajax({
							url : joms.BASE_URL + d,
							dataType : "json",
							success : function (a) {
								e.textarea.joms_friends = j = f(a)
							},
							complete : function () {
								var b,
								d,
								f,
								g;
								if (j.length && a.joms_friends.length)
									for (b = 0, f = Math.min(j.length, 30); f > b; b++)
										for (d = 0, g = Math.min(a.joms_friends.length, 30); g > d; d++)
											 + j[b].id === +a.joms_friends[d].id && (a.joms_friends[d].avatar = j[b].avatar, a.joms_friends[d].name = j[b].name);
								e.fetchXHR = !1,
								c(j)
							}
						})))
		}
		function e() {
			var b = "index.php?option=com_community&view=friends&task=ajaxAutocomplete",
			c = [];
			b += a.joms_group_id ? "&groupid=" + a.joms_group_id : a.joms_event_id ? "&eventid=" + a.joms_event_id : "&allfriends=1",
			joms.jQuery.ajax({
				url : joms.BASE_URL + b,
				dataType : "json",
				success : function (a) {
					c = f(a)
				},
				complete : function () {
					a.joms_friends = c
				}
			})
		}
		function f(a) {
			var b,
			c,
			d = [],
			e = [];
			if (a && a.suggestions && a.suggestions.length)
				for (c = 0; c < a.suggestions.length; c++)
					b = "" + a.data[c], d.indexOf(b) >= 0 || (d.push(b), e.push({
							id : b,
							name : a.suggestions[c],
							avatar : a.img[c].replace(/^.+src="([^"]+)".+$/, "$1"),
							type : "contact"
						}));
			return e
		}
		return {
			initInputbox : c,
			fetchInputbox : d,
			fetchFriendsInContext : e
		}
	}),
	function (a, b, d) {
		joms.view || (joms.view = {}),
		joms.view.comment = d(a, b),
		c("views/comment", ["utils/video", "functions/tagging"], function () {
			return joms.view.comment
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			d(),
			G = b(document.body),
			G.on("keydown.joms-comment", ".joms-comment__reply textarea", g),
			G.on("focus.joms-comment", ".joms-comment__reply textarea", h),
			G.on("focus.joms-comment", ".joms-js--pm-message textarea", h),
			G.on("click.joms-comment", ".joms-comment__reply .joms-js--btn-send", i),
			G.on("click.joms-comment", ".joms-js--inbox-reply .joms-js--btn-send", i),
			G.on("click.joms-comment", ".joms-comment__more", q),
			w(),
			e(),
			f()
		}
		function d() {
			G && (G.off("keydown.joms-comment", ".joms-comment__reply textarea"), G.off("focus.joms-comment", ".joms-comment__reply textarea"), G.off("focus.joms-comment", ".joms-js--pm-message textarea"), G.off("click.joms-comment", ".joms-comment__reply .joms-js--btn-send"), G.off("click.joms-comment", ".joms-js--inbox-reply .joms-js--btn-send"), G.off("click.joms-comment", ".joms-comment__more"))
		}
		function e() {
			joms.fn.tagging.initInputbox()
		}
		function f() {
			var a = ".joms-js--initialized",
			c = ".joms-js--video",
			d = b(".joms-comment__body,.joms-js--inbox").find(c).not(a).addClass(a.substr(1));
			d.length && (joms.loadCSS(joms.ASSETS_URL + "vendors/mediaelement/mediaelementplayer.min.css"), d.on("click.joms-video", c + "-play", function () {
					var a = b(this).closest(c);
					joms.util.video.play(a, a.data())
				}), joms.ios && setTimeout(function () {
					d.find(c + "-play").click()
				}, 2e3))
		}
		function g(a) {
			var c,
			d = a.keyCode || a.charCode;
			if (13 === d && !a.shiftKey && (c = b(a.target), !c.data("noentersend")))
				return setTimeout(function () {
					j(a)
				}, 100), !1
		}
		function h(a) {
			var c = b(a.target),
			d = c.closest(".joms-textarea__wrapper"),
			e = d.find(".joms-textarea__attachment");
			e.length && (J = e)
		}
		function i(a) {
			var c = b(a.currentTarget),
			d = c.closest(".joms-comment__reply,.joms-js--inbox-reply").find("textarea");
			j({
				currentTarget : d[0]
			})
		}
		function j(a) {
			var c,
			d,
			e,
			g = b(a.currentTarget),
			h = g.val() || "",
			i = +g.data("edit");
			g[0].joms_hidden && (h = g[0].joms_hidden.val() || h),
			("" !== h.replace(/^\s+|\s+$/g, "") || (e = g.siblings(".joms-textarea__attachment"), e.length && e.is(":visible"))) && (c = +g.data("id"), d = g.data("func") || "", i ? n(g, c, d, h, function () {
					f(),
					k(g)
				}) : l(g, c, d, h, function () {
					g.val(""),
					f(),
					k(g)
				}))
		}
		function k(a) {
			a.css("height", ""),
			a.closest(".joms-comment__reply").find(".joms-textarea__attachment").hide(),
			a = a[0],
			a.joms_reset && a.joms_reset(),
			a.joms_beautifier && "none" !== a.joms_beautifier && a.joms_beautifier.html(""),
			a.joms_hidden && a.joms_hidden.val(a.value)
		}
		function l(a, c, d, e, f) {
			var g,
			h,
			i,
			j,
			k = d,
			l = !1,
			m = !1,
			n = !1,
			o = !1,
			p = !1,
			q = !1;
			a.data("saving") || (a.data("saving", 1), k && (i = d.toLowerCase(), i.indexOf("album") > -1 ? l = !0 : i.indexOf("photo") > -1 ? m = !0 : i.indexOf("video") > -1 ? n = !0 : i.indexOf("discussion") > -1 ? o = !0 : i.indexOf("inbox") > -1 && (p = !0)), h = J, h && h.is(":visible") && (q = h.find(".joms-textarea__attachment--thumbnail").find("img"), q = q.data("photo_id")), q = q || "", k ? g = n || o ? [e, c, q] : p ? [c, e, q] : [e, c, "", q] : (d = "system,ajaxStreamAddComment", g = [c, e, q]), j = b(a).siblings(".joms-textarea__loading"), j.show(), joms.ajax({
					func : d,
					data : g,
					callback : function (d) {
						var e,
						g;
						if (j.hide(), d.success) {
							if (p)
								return D(d.html), void a.removeData("saving");
							e = b(".joms-js--comments-" + c),
							e.append(d.html || ""),
							g = b(".joms-comment__counter--" + c),
							g.length && g.html(+g.eq(0).text() + 1)
						}
						"function" == typeof f && f(d),
						a.removeData("saving")
					}
				}))
		}
		function m(a, c, d) {
			var e,
			f,
			g,
			h = "wall" === d;
			c = b(c),
			e = c.closest(".joms-comment__item"),
			g = e.children(".joms-comment__reply").find("textarea"),
			f = h ? e.closest(".joms-comment").siblings(".joms-comment__reply") : e.closest(".joms-stream").children(".joms-comment__reply"),
			f.hide(),
			e.children(".joms-comment__body,.joms-comment__actions").hide(),
			e.children(".joms-comment__reply").show(),
			g.jomsTagging(),
			g.off("reset.joms-tagging"),
			g.on("reset.joms-tagging", function () {
				e.children(".joms-comment__reply").hide(),
				e.children(".joms-comment__body,.joms-comment__actions").show(),
				f.show()
			}),
			g[0].focus()
		}
		function n(a, c, d, e, f) {
			var g,
			h,
			i,
			j,
			k = d;
			a.data("saving") || (a.data("saving", 1), g = a.siblings(".joms-textarea__attachment"), g.is(":visible") ? (h = g.find(".joms-textarea__attachment--thumbnail").find("img"), h = h.data("photo_id") || "0") : h = g.data("no_thumb") ? "0" : "-1", k ? (i = [c, e, d, h], d = "system,ajaxUpdateWall") : (d = "system,ajaxeditComment", i = [c, e, h]), j = b(a).siblings(".joms-textarea__loading"), j.show(), joms.ajax({
					func : d,
					data : i,
					callback : function (d) {
						var e,
						g;
						j.hide(),
						d.success && (e = b(".joms-js--comment-" + c), g = b(".joms-js--newcomment-" + e.data("parent")), e.find(".joms-js--comment-editor").hide().find("textarea").val(d.originalComment || ""), e.find(".joms-js--comment-content").html(d.comment || ""), e.find(".joms-js--comment-body").show(), e.find(".joms-js--comment-actions").show(), g.show()),
						"function" == typeof f && f(d);
						try {
							a.blur()
						} catch (h) {}

						a.removeData("saving")
					}
				}))
		}
		function o(c) {
			joms.ajax({
				func : "system,ajaxStreamAddLike",
				data : [c, "comment"],
				callback : function (d) {
					var e,
					f,
					g;
					d.success && (e = b(".joms-js--comment-" + c), e.length && (f = e.find(".joms-comment__actions").find(".joms-button--liked"), f.attr("onclick", "joms.api.commentUnlike('" + c + "');"), f.addClass("liked"), f.find("span").html(f.data("lang-unlike")), f.find("use").attr("xlink:href", a.location + "#joms-icon-thumbs-down"), g = e.find(".joms-comment__actions [data-action=showlike]"), d.html ? g.length ? g.replaceWith(d.html) : f.after(d.html) : g.remove()))
				}
			})
		}
		function p(c) {
			joms.ajax({
				func : "system,ajaxStreamUnlike",
				data : [c, "comment"],
				callback : function (d) {
					var e,
					f,
					g;
					d.success && (e = b(".joms-js--comment-" + c), e.length && (f = e.find(".joms-comment__actions").find(".joms-button--liked"), f.attr("onclick", "joms.api.commentLike('" + c + "');"), f.removeClass("liked"), f.find("span").html(f.data("lang-like")), f.find("use").attr("xlink:href", a.location + "#joms-icon-thumbs-up"), g = e.find(".joms-comment__actions [data-action=showlike]"), d.html ? g.length ? g.replaceWith(d.html) : f.after(d.html) : g.remove()))
				}
			})
		}
		function q(a) {
			var c = b(a.currentTarget),
			d = c.closest(".joms-js--comments"),
			e = d.data("type") || "",
			f = +d.data("id");
			f && joms.ajax({
				func : "system,ajaxStreamShowComments",
				data : [f, e],
				callback : function (a) {
					var c;
					a.success && (c = b(b.trim(a.html)), e && (c = c.filter(".joms-js--comments").children()), b(".joms-js--comments-" + f).html(c))
				}
			})
		}
		function r(c, d) {
			var e,
			f,
			g = "inbox" === d,
			h = "wall" === d;
			g ? (e = "inbox,ajaxRemoveMessage", f = [c]) : h ? (e = a.joms_wall_remove_func, f = [c]) : (e = "system,ajaxStreamRemoveComment", f = [c]),
			joms.ajax({
				func : e,
				data : f,
				callback : function (d) {
					var e;
					return d.success ? g ? void F(c) : (e = b(".joms-js--comment-" + c), void(e.length && e.fadeOut(500, function () {
								e.remove();
								var a = b(".joms-comment__counter--" + d.parent_id);
								a.length && a.html(+a.eq(0).text() - 1)
							}))) : void a.alert(d.error || "Undefined error.")
				}
			})
		}
		function s(a, c) {
			joms.ajax({
				func : "activities,ajaxRemoveUserTag",
				data : [a, c || "comment"],
				callback : function (d) {
					var e,
					f,
					g,
					h,
					i;
					d.success && ("inbox" === c ? (e = b(".joms-js--inbox-item-" + a), f = e.find(".joms-button--remove-tag"), g = e.find(".joms-js--inbox-content"), g.html(d.data), f.remove()) : (e = b(".joms-js--comment-" + a), f = e.find(".joms-button--remove-tag"), g = e.find(".joms-js--comment-content"), h = e.find(".joms-js--comment-editor"), i = h.find("textarea"), g.html(d.data), i.val(d.unparsed), f.remove()))
				}
			})
		}
		function t(c, d) {
			var e,
			f,
			g = "inbox" === d,
			h = "wall" === d;
			g ? (e = "inbox,ajaxRemovePreview", f = [c]) : h ? (e = "system,ajaxRemoveWallPreview", f = [c]) : (e = "system,ajaxRemoveCommentPreview", f = [c]),
			joms.ajax({
				func : e,
				data : f,
				callback : function (d) {
					return d.success ? g ? void E(c, d.html) : void b(".joms-js--comment-" + c).find(".joms-js--comment-preview").remove() : void a.alert(d.error || "Undefined error.")
				}
			})
		}
		function u(b, c) {
			var d,
			e,
			f = "inbox" === c;
			f && (d = "inbox,ajaxRemoveThumbnail", e = [b]),
			joms.ajax({
				func : d,
				data : e,
				callback : function (c) {
					return c.success ? f ? void E(b, c.html) : void 0 : void a.alert(c.error || "Undefined error.")
				}
			})
		}
		function v(a) {
			a = b(a),
			a = a.siblings(".joms-textarea__wrapper"),
			a.length && w(a, function () {
				I.click()
			})
		}
		function w(c, d) {
			return "function" != typeof d && (d = function () {}),
			H ? (J = c && c.find(".joms-textarea__attachment"), void d()) : void joms.util.loadLib("plupload", function () {
				setTimeout(function () {
					var e,
					f;
					e = b('<div id="joms-js--attachment-uploader" style="width:1px; height:1px; overflow:hidden">').appendTo(document.body),
					f = b('<button id="joms-js--attachment-uploader-button">').appendTo(e),
					H = new a.plupload.Uploader({
							url : "index.php?option=com_community&view=photos&task=ajaxPreviewComment",
							filters : [{
									title : "Image files",
									extensions : "jpg,jpeg,png,gif"
								}
							],
							container : "joms-js--attachment-uploader",
							browse_button : "joms-js--attachment-uploader-button",
							runtimes : "html5,html4"
						}),
					H.bind("FilesAdded", x),
					H.bind("Error", y),
					H.bind("FileUploaded", z),
					H.init(),
					J = c && c.find(".joms-textarea__attachment"),
					I = e.find("input[type=file]"),
					d()
				})
			})
		}
		function x(b) {
			a.setTimeout(function () {
				var a = J,
				c = a.find(".joms-textarea__attachment--loading"),
				d = a.find(".joms-textarea__attachment--thumbnail"),
				e = a.find("button");
				b.start(),
				b.refresh(),
				d.find("img").replaceWith("<img>"),
				d.hide(),
				e.hide(),
				c.show(),
				a.show()
			}, 0)
		}
		function y() {
			var a = J;
			a.hide()
		}
		function z(b, c, d) {
			var e,
			f,
			g,
			h,
			i,
			j;
			try {
				e = JSON.parse(d.response)
			} catch (k) {}

			return e || (e = {}),
			e.error && a.alert(e.error),
			f = J,
			e.thumb_url && e.photo_id ? (g = f.find(".joms-textarea__attachment--loading"), h = f.find(".joms-textarea__attachment--thumbnail"), j = h.find("img"), i = f.find("button"), j.attr("src", e.thumb_url), j.data("photo_id", e.photo_id), g.hide(), h.show(), i.show(), void f.show()) : void f.hide()
		}
		function A(a) {
			a = b(a),
			a = a.closest(".joms-textarea__attachment"),
			a && (a.find(".joms-textarea__attachment--thumbnail img").replaceWith('<img src="#" alt="attachment">'), a.hide())
		}
		function B(a) {
			var c,
			d,
			e;
			c = a && a.nodeType ? b(a).closest(".joms-js--comment") : b(".joms-js--comment-" + a),
			c.length && (e = c.data(), d = b(".joms-js--newcomment-" + e.parent), c.find(".joms-js--comment-editor").hide(), c.find(".joms-js--comment-body").show(), c.find(".joms-js--comment-actions").show(), d.show())
		}
		function C(a) {
			var c = b(".joms-js--comment-text-" + a),
			d = b(".joms-js--comment-textfull-" + a),
			e = b(".joms-js--comment-texttoggle-" + a);
			d.is(":visible") ? (d.hide(), c.show(), e.html(e.data("lang-more"))) : (c.hide(), d.show(), e.html(e.data("lang-less")))
		}
		function D(c) {
			var d,
			e,
			g,
			h,
			i,
			j,
			k,
			l;
			d = b(".joms-js--inbox"),
			e = b(".joms-js--inbox-reply"),
			g = e.find("textarea"),
			i = e.find(".joms-textarea__attachment"),
			c = b(b.trim(c)),
			j = a.location.href.split("#")[0],
			k = c.find("use"),
			l = k.attr("xlink:href").split("#")[1],
			l = j + "#" + l,
			k.attr("xlink:href", l),
			d.append(c),
			g.length && (h = g.data("joms-tagging"), h ? h.clear() : g.val("")),
			i.length && i.hide(),
			f()
		}
		function E(c, d) {
			var e,
			g,
			h,
			i;
			return d ? (e = b(".joms-js--inbox-item-" + c), d = b(b.trim(d)), g = a.location.href.split("#")[0], h = d.find("use"), i = h.attr("xlink:href").split("#")[1], i = g + "#" + i, h.attr("xlink:href", i), e.replaceWith(d), void f()) : void F(c)
		}
		function F(a) {
			var c;
			c = b(".joms-js--inbox-item-" + a),
			c.fadeOut(500, function () {
				c.remove()
			})
		}
		var G,
		H,
		I,
		J;
		return {
			start : c,
			stop : d,
			like : o,
			unlike : p,
			edit : m,
			cancel : B,
			remove : r,
			removeTag : s,
			removePreview : t,
			removeThumbnail : u,
			addAttachment : v,
			removeAttachment : A,
			toggleText : C,
			initInputbox : e
		}
	}),
	function (a, b, d) {
		joms.view || (joms.view = {}),
		joms.view.misc = d(a, b),
		c("views/misc", [], function () {
			return joms.view.misc
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			d = b(".joms-main"),
			e = b(".joms-sidebar"),
			f(),
			b(a).on("resize", f)
		}
		var d,
		e,
		f = joms._.debounce(function () {
				"large" !== joms.screenSize() ? e.nextAll(".joms-main").length && e.insertAfter(d) : e.prevAll(".joms-main").length && e.insertBefore(d)
			}, 500),
		g = joms._.debounce(function () {
				var c,
				d;
				c = a.location.href,
				c = c.replace(/[#].*$/, ""),
				d = b(".joms-icon use").not(".joms-icon--svg-fixed"),
				d.each(function () {
					var a;
					a = this.getAttribute("xlink:href") || "",
					a = a.replace(/^[^#]*#/, c + "#"),
					this.setAttribute("xlink:href", a),
					this.setAttribute("class", "joms-icon--svg-fixed")
				})
			}, 200);
		return {
			start : c,
			fixSVG : g
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.remove = b(a),
		c("popups/stream.remove", ["utils/popup"], function () {
			return joms.popup.stream.remove
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "activities,ajaxConfirmDeleteActivity",
				data : ["", g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			joms.ajax({
				func : "activities,ajaxDeleteActivity",
				data : ["", g],
				callback : function (a) {
					var b;
					f.off(),
					e.close(),
					a.success && (b = joms.jQuery(".joms-stream").filter("[data-stream-id=" + g + "]"), b.fadeOut(500, function () {
							b.remove()
						}))
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", "<div>", '<div class="joms-popup__content">', a.error || a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnCancel, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.editLocation = d(a, b),
		c("popups/stream.editlocation", ["utils/popup"], function () {
			return joms.popup.stream.editLocation
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			i && i.off(),
			h = a,
			j = b,
			joms.ajax({
				func : "activities,ajaxeditLocation",
				data : [j],
				callback : function (a) {
					h.items[0] = {
						type : "inline",
						src : g(a)
					},
					h.updateItemHTML(),
					f(a),
					i = h.contentContainer,
					i.on("click", "[data-ui-object=popup-button-cancel]", d),
					i.on("click", "[data-ui-object=popup-button-save]", e)
				}
			})
		}
		function d() {
			i.off(),
			h.close()
		}
		function e() {
			var a = i.find(".joms-js--location-label"),
			c = a.val(),
			d = a.data("lat"),
			e = a.data("lng");
			joms.ajax({
				func : "activities,ajaxSaveLocation",
				data : [j, c, d, e],
				callback : function (a) {
					var d;
					i.off(),
					h.close(),
					a.success && (d = b(".joms-stream").filter("[data-stream-id=" + j + "]"), d.find(".joms-status-location a").html(c))
				}
			})
		}
		function f(c) {
			joms.util.map(function () {
				var d,
				e,
				f,
				g,
				h,
				j,
				k;
				d = i.find(".joms-js--location-map"),
				e = i.find(".joms-js--location-label"),
				f = i.find(".joms-js--location-selector"),
				e.val(c.location),
				g = new a.google.maps.LatLng(c.latitude, c.longitude),
				h = {
					center : g,
					zoom : 14,
					mapTypeId : a.google.maps.MapTypeId.ROADMAD,
					mapTypeControl : !1,
					disableDefaultUI : !0,
					draggable : !1,
					scaleControl : !1,
					scrollwheel : !1,
					navigationControl : !1,
					streetViewControl : !1,
					disableDoubleClickZoom : !0
				},
				j = new a.google.maps.Map(d[0], h),
				k = new a.google.maps.Marker({
						draggable : !1,
						map : j
					}),
				k.setPosition(g),
				j.panTo(g),
				joms.util.map.nearbySearch(j, g, function (a) {
					var b,
					c;
					for (a && a.length || (b = a.error || "Undefined error.", b = '<span class="joms-map--location-item--notice">' + b + "</span>", f.html(b)), b = [], c = 0; c < a.length; c++)
						b.push(['<a class="joms-map--location-item" data-lat="', a[c].lat, '" data-lng="', a[c].lng, '"><strong>', a[c].name, "</strong><br><span>", a[c].vicinity || "&nbsp;", "</span></a>"].join(""));
					f.html(b.join(""))
				}),
				f.on("click", "a", function () {
					var c,
					d = b(this),
					f = d.data(),
					g = d.find("strong").text();
					f.lat && f.lng && (e.val(g), e.data("lat", f.lat), e.data("lng", f.lng), c = new a.google.maps.LatLng(f.lat, f.lng), k.setPosition(c), j.panTo(c))
				})
			})
		}
		function g(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", "<div>", '<div class="joms-popup__content">', a.html || a.error, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnCancel, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnEdit, "</button>", "</div>", "</div>", "</div>"].join("")
		}
		var h,
		i,
		j;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.removeLocation = b(a),
		c("popups/stream.removelocation", ["utils/popup"], function () {
			return joms.popup.stream.removeLocation
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "activities,ajaxRemoveLocation",
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			joms.ajax({
				func : "activities,deleteLocation",
				data : [g],
				callback : function (a) {
					var b;
					f.off(),
					e.close(),
					a.success && (b = joms.jQuery(".joms-stream").filter("[data-stream-id=" + g + "]"), b.find(".joms-status-location").remove())
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", "<div>", '<div class="joms-popup__content">', a.error || a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.removeMood = b(a),
		c("popups/stream.removemood", ["utils/popup"], function () {
			return joms.popup.stream.removeMood
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "activities,ajaxConfirmRemoveMood",
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			joms.ajax({
				func : "activities,ajaxRemoveMood",
				data : [g],
				callback : function (a) {
					var b;
					f.off(),
					e.close(),
					a.success && (b = joms.jQuery(".joms-stream").filter("[data-stream-id=" + g + "]"), b.find("[data-type=stream-content]").find("span").eq(0).html(a.html))
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", "<div>", '<div class="joms-popup__content">', a.error || a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.report = b(a),
		c("popups/stream.report", ["utils/popup"], function () {
			return joms.popup.stream.report
		})
	}
	(window, function () {
		function a(a, i) {
			g && g.off(),
			f = a,
			h = i,
			joms.ajax({
				func : "system,ajaxReport",
				data : [],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("change", "select", b),
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function b(a) {
			g.find("textarea").val(a.target.value)
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			var a,
			b = /^\s+|\s+$/g;
			return a = g.find("textarea").val(),
			(a = a.replace(b, "")) ? (g.find(".joms-js--error").hide(), void joms.ajax({
					func : "system,ajaxSendReport",
					data : ["activities,reportActivities", window.location.href, a, h],
					callback : function (a) {
						g.find(".joms-js--step1").hide(),
						g.find(".joms-js--step2").show().children().html(a.error || a.message)
					}
				})) : void g.find(".joms-js--error").show()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', a.html, '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.selectPrivacy = d(a, b),
		c("popups/stream.selectprivacy", ["utils/popup"], function () {
			return joms.popup.stream.selectPrivacy
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			g && g.off(),
			f = a,
			h = b,
			f.items[0] = {
				type : "inline",
				src : e()
			},
			f.updateItemHTML(),
			g = f.contentContainer,
			g.on("click", "a", d)
		}
		function d(c) {
			var d = b(c.currentTarget),
			e = d.data("value"),
			i = d.data("classname");
			joms.ajax({
				func : "activities,ajaxUpdatePrivacyActivity",
				data : [h, e],
				callback : function (c) {
					var d;
					g.off(),
					f.close(),
					c.success && (d = b(".joms-stream").filter("[data-stream-id=" + h + "]"), d.find(".joms-stream__meta use").attr("xlink:href", a.location + "#" + i))
				}
			})
		}
		function e() {
			var b,
			c,
			d,
			e,
			f;
			if (b = [["public", 10, a.joms_lang.COM_COMMUNITY_PRIVACY_PUBLIC, "earth"], ["site_members", 20, a.joms_lang.COM_COMMUNITY_PRIVACY_SITE_MEMBERS, "users"], ["friends", 30, a.joms_lang.COM_COMMUNITY_PRIVACY_FRIENDS, "user"], ["me", 40, a.joms_lang.COM_COMMUNITY_PRIVACY_ME, "lock"]], c = a.joms_privacylist, c && c.length)
				for (f = b.length - 1; f >= 0; f--)
					c.indexOf(b[f][0]) < 0 && b.splice(f, 1);
			for (d = a.location.href, d = d.replace(/#.*$/, ""), e = "", f = 0; f < b.length; f++)
				e += '<a href="javascript:" data-value="' + b[f][1] + '" data-classname="joms-icon-' + b[f][3] + '">', e += '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="' + d + "#joms-icon-" + b[f][3] + '"></use></svg> ', e += "<span>" + b[f][2] + "</span></a>";
			return ['<div class="joms-popup joms-popup--whiteblock joms-popup--privacy">', '<div><div class="joms-popup__content joms-popup__content--single">', e, "</div></div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.share = d(a, b),
		c("popups/stream.share", ["utils/loadlib", "utils/popup"], function () {
			return joms.popup.stream.share
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			j && j.off(),
			i = a,
			k = b,
			joms.ajax({
				func : "activities,ajaxSharePopup",
				data : [k],
				callback : function (a) {
					i.items[0] = {
						type : "inline",
						src : h(a)
					},
					i.updateItemHTML(),
					f(),
					g(),
					j = i.contentContainer,
					j.on("click", ".joms-js--button-cancel", d),
					j.on("click", ".joms-js--button-save", e)
				}
			})
		}
		function d() {
			j.off(),
			i.close()
		}
		function e() {
			var a = {
				msg : j.find("textarea.joms-textarea").val(),
				privacy : j.find("[data-ui-object=joms-dropdown-value]").val()
			};
			joms.ajax({
				func : "activities,ajaxAddShare",
				data : [k, JSON.stringify(a)],
				callback : function (a) {
					j.off(),
					i.close(),
					a.success && (b(".joms-stream__container").prepend(a.html), f(), g())
				}
			})
		}
		function f() {
			var a = ".joms-js--initialized",
			c = b(".joms-media--images").not(a);
			c.each(function () {
				var c = b(this),
				d = c.find("img"),
				e = 0;
				d.each(function () {
					var f = b(this);
					b("<img>").load(function () {
						e++,
						e === d.length && (c.siblings(".joms-media--loading").remove(), c.addClass(a.substr(1)), d.show(), joms.util.photos.arrange(c))
					}).attr("src", f.attr("src"))
				})
			})
		}
		function g() {
			var a = ".joms-js--initialized",
			c = ".joms-js--video",
			d = b(c).not(a).addClass(a.substr(1));
			d.length && (joms.loadCSS(joms.ASSETS_URL + "vendors/mediaelement/mediaelementplayer.min.css"), d.on("click.joms-video", c + "-play", function () {
					var a = b(this).closest(c);
					joms.util.video.play(a, a.data())
				}), joms.ios && setTimeout(function () {
					d.find(c + "-play").click()
				}, 2e3))
		}
		function h(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", "<div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnShare, "</button> &nbsp;", '<div style="display:inline-block; position:relative;">', '<div class="joms-button--privacy" data-ui-object="joms-dropdown-button" data-name="share-privacy">', '<svg class="joms-icon" viewBox="0 0 16 16"><use xlink:href="#joms-icon-earth"/></svg>', '<input type="hidden" data-ui-object="joms-dropdown-value" value="10">', "</div>", '<ul class="joms-dropdown joms-dropdown--privacy" data-name="share-privacy">', '<li data-classname="joms-icon-earth" data-value="10" style="white-space:nowrap">', '<svg class="joms-icon" viewBox="0 0 16 16"><use xlink:href="#joms-icon-earth"/></svg>', " <span>Public</span>", "</li>", '<li data-classname="joms-icon-users" data-value="20" style="white-space:nowrap">', '<svg class="joms-icon" viewBox="0 0 16 16"><use xlink:href="#joms-icon-users"/></svg>', " <span>Site Members</span>", "</li>", '<li data-classname="joms-icon-user" data-value="30" style="white-space:nowrap">', '<svg class="joms-icon" viewBox="0 0 16 16"><use xlink:href="#joms-icon-user"/></svg>', " <span>Friends</span>", "</li>", '<li data-classname="joms-icon-lock" data-value="40" style="white-space:nowrap">', '<svg class="joms-icon" viewBox="0 0 16 16"><use xlink:href="#joms-icon-lock"/></svg>', " <span>Only Me</span>", "</li>", "</ul>", "</div>", "</div>", "</div>", "</div>"].join("")
		}
		var i,
		j,
		k;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.showComments = d(a, b),
		c("popups/stream.showcomments", ["utils/popup"], function () {
			return joms.popup.stream.showComments
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			var i;
			f && f.off(),
			e = a,
			g = b,
			h = c,
			i = [g],
			h && i.push(h),
			joms.ajax({
				func : "system,ajaxStreamShowComments",
				data : i,
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML()
				}
			})
		}
		function d(c) {
			var d,
			e = !0;
			return c || (c = {}),
			d = b(b.trim(c.html || "")),
			d.children().length && (e = !1),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--rounded joms-popup--80pc">', '<button class="mfp-close joms-hide"></button>', '<div class="joms-comment">', e ? a.joms_lang.COM_COMMUNITY_NO_COMMENTS_YET : c.html, "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.showLikes = d(a, b),
		c("popups/stream.showlikes", ["utils/popup"], function () {
			return joms.popup.stream.showLikes
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			f && f.off(),
			e = a,
			g = b,
			h = c,
			joms.ajax({
				func : "system,ajaxStreamShowLikes",
				data : [g, h],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML()
				}
			})
		}
		function d(c) {
			var d,
			e = !0;
			return c || (c = {}),
			d = b(b.trim(c.html || "")),
			d.children().length && (e = !1),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--rounded joms-popup--80pc">', '<button class="mfp-close joms-hide"></button>', '<div class="joms-comment">', e ? a.joms_lang.COM_COMMUNITY_NO_LIKES_YET : c.html, "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream || (joms.popup.stream = {}),
		joms.popup.stream.showOthers = d(a, b),
		c("popups/stream.showothers", ["utils/popup"], function () {
			return joms.popup.stream.showOthers
		})
	}
	(window, joms.jQuery, function () {
		function a(a, f) {
			d && d.off(),
			c = a,
			e = f,
			joms.ajax({
				func : "activities,ajaxShowOthers",
				data : [e],
				callback : function (a) {
					c.items[0] = {
						type : "inline",
						src : b(a)
					},
					c.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--rounded joms-popup--80pc">', '<button class="mfp-close joms-hide"></button>', '<div class="joms-comment">', a.html || "", "</div>", "</div>"].join("")
		}
		var c,
		d,
		e;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.stream = b(a, joms.popup.stream || {}),
		c("popups/stream", ["popups/stream.remove", "popups/stream.editlocation", "popups/stream.removelocation", "popups/stream.removemood", "popups/stream.report", "popups/stream.selectprivacy", "popups/stream.share", "popups/stream.showcomments", "popups/stream.showlikes", "popups/stream.showothers"], function () {
			return joms.popup.stream
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.view || (joms.view = {}),
		joms.view.stream = d(a, b),
		c("views/stream", ["popups/stream"], function () {
			return joms.view.stream
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			d(),
			y = b(".joms-stream__wrapper")
		}
		function d() {
			y && y.off()
		}
		function e(c) {
			joms.ajax({
				func : "system,ajaxStreamAddLike",
				data : [c],
				callback : function (d) {
					var e,
					f,
					g,
					h;
					d.success && (e = y.find(".joms-js--stream-" + c), e.length && (f = e.find(".joms-stream__actions").find(".joms-button--liked"), f.attr("onclick", "joms.api.streamUnlike('" + c + "');"), f.addClass("liked"), f.find("span").html(f.data("lang-unlike")),
							f.find("use").attr("xlink:href", a.location + "#joms-icon-thumbs-down"), g = e.find(".joms-stream__status"), d.html ? g.length ? g.html(d.html) : (g = e.find(".joms-stream__actions"), g = b("<div class=joms-stream__status />").insertAfter(g), g.html(d.html)) : g.remove(), h = e.find(".joms-stream__status--mobile"), h.length && (h = h.find(".joms-like__counter--" + c), h.html(+h.eq(0).text() + 1))))
				}
			})
		}
		function f(c) {
			joms.ajax({
				func : "system,ajaxStreamUnlike",
				data : [c],
				callback : function (d) {
					var e,
					f,
					g,
					h;
					d.success && (e = y.find(".joms-js--stream-" + c), e.length && (f = e.find(".joms-stream__actions").find(".joms-button--liked"), f.attr("onclick", "joms.api.streamLike('" + c + "');"), f.removeClass("liked"), f.find("span").html(f.data("lang-like")), f.find("use").attr("xlink:href", a.location + "#joms-icon-thumbs-up"), g = e.find(".joms-stream__status"), d.html ? g.length ? g.html(d.html) : (g = e.find(".joms-stream__actions"), g = b("<div class=joms-stream__status />").insertAfter(g), g.html(d.html)) : g.remove(), h = e.find(".joms-stream__status--mobile"), h.length && (h = h.find(".joms-like__counter--" + c), h.html(+h.eq(0).text() - 1))))
				}
			})
		}
		function g(a) {
			var c = b(".joms-js--stream-" + a).eq(0),
			d = c.find(".joms-stream__body"),
			e = d.find("[data-type=stream-content]"),
			f = d.find("[data-type=stream-editor]"),
			g = f.find("textarea"),
			h = g.val();
			e.hide(),
			f.show(),
			g.removeData("joms-tagging"),
			g.jomsTagging(),
			g.off("reset.joms-tagging"),
			g.on("reset.joms-tagging", function () {
				f.hide(),
				e.show(),
				g.val(h)
			}),
			g.focus()
		}
		function h(a, c, d) {
			"" !== c.replace(/^\s+|\s+$/g, "") && joms.ajax({
				func : "activities,ajaxSaveStatus",
				data : [a, c],
				callback : function (c) {
					var e = b(".joms-stream").filter("[data-stream-id=" + a + "]"),
					f = e.find(".joms-stream__body"),
					g = f.find("[data-type=stream-content]"),
					h = f.find("[data-type=stream-editor]"),
					i = h.find("textarea");
					c.success ? (g.html("<span>" + c.data + "</span>"), i.val(c.unparsed)) : i.val(d),
					h.hide(),
					g.show()
				}
			})
		}
		function i(a, c) {
			var d = b(c).closest(".joms-js--stream"),
			e = d.find(".joms-stream__body"),
			f = e.find("[data-type=stream-editor]"),
			g = f.find("textarea"),
			i = g.val();
			g[0].joms_hidden && (i = g[0].joms_hidden.val()),
			h(a, i, i)
		}
		function j(a) {
			var c = b(".joms-js--stream-" + a),
			d = c.find(".joms-stream__body"),
			e = d.find("[data-type=stream-content]"),
			f = d.find("[data-type=stream-editor]");
			f.hide(),
			e.show()
		}
		function k(a) {
			joms.popup.stream.editLocation(a)
		}
		function l(a) {
			joms.popup.stream.remove(a)
		}
		function m(a) {
			joms.popup.stream.removeLocation(a)
		}
		function n(a) {
			joms.popup.stream.removeMood(a)
		}
		function o(a) {
			joms.ajax({
				func : "activities,ajaxRemoveUserTag",
				data : [a, "post"],
				callback : function (c) {
					var d,
					e,
					f,
					g,
					h,
					i;
					c.success && (d = b(".joms-js--stream-" + a), e = d.find(".joms-stream__body"), f = d.find(".joms-list__options").find(".joms-dropdown").find(".joms-js--contextmenu-removetag"), g = e.find("[data-type=stream-content]"), h = e.find("[data-type=stream-editor]"), i = h.find("textarea"), g.html("<span>" + c.data + "</span>"), i.val(c.unparsed), f.remove())
				}
			})
		}
		function p(a) {
			joms.popup.stream.selectPrivacy(a)
		}
		function q(a) {
			joms.popup.stream.share(a)
		}
		function r(a, b) {
			joms.ajax({
				func : "activities,ajaxHideStatus",
				data : [a, b],
				callback : function (b) {
					var c;
					b.success && (c = y.find(".joms-stream[data-stream-id=" + a + "]"), c.fadeOut(500, function () {
							c.remove()
						}))
				}
			})
		}
		function s(a) {
			joms.popup.stream.ignoreUser(a)
		}
		function t(a, b) {
			return "popup" === b ? void joms.popup.stream.showLikes(a, b) : void joms.ajax({
				func : "system,ajaxStreamShowLikes",
				data : [a],
				callback : function (b) {
					var c;
					b.success && (c = y.find(".joms-stream[data-stream-id=" + a + "]"), c.find(".joms-stream__status").html(b.html || ""))
				}
			})
		}
		function u(a, b) {
			joms.popup.stream.showComments(a, b)
		}
		function v(a) {
			joms.popup.stream.showOthers(a)
		}
		function w(a) {
			joms.popup.stream.report(a)
		}
		function x(a) {
			var c = b(".joms-js--stream-text-" + a),
			d = b(".joms-js--stream-textfull-" + a),
			e = b(".joms-js--stream-texttoggle-" + a);
			d.is(":visible") ? (d.hide(), c.show(), e.html(e.data("lang-more"))) : (c.hide(), d.show(), e.html(e.data("lang-less")))
		}
		var y;
		return {
			start : c,
			stop : d,
			like : e,
			unlike : f,
			edit : g,
			save : i,
			cancel : j,
			editLocation : k,
			remove : l,
			removeLocation : m,
			removeMood : n,
			removeTag : o,
			selectPrivacy : p,
			share : q,
			hide : r,
			ignoreUser : s,
			showLikes : t,
			showComments : u,
			showOthers : v,
			report : w,
			toggleText : x
		}
	}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.hovercard = c(a, b)
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			var a;
			joms.mobile || (a = b("img[data-author]").not("[data-initialized]"), a.each(function () {
					var a = b(this);
					a.off("mouseover.joms-hcard").on("mouseover.joms-hcard", d),
					a.off("mouseout.joms-hcard").on("mouseout.joms-hcard", e),
					a.attr("data-initialized", 1)
				}))
		}
		function d(a) {
			var c = b(a.target),
			d = c.data("author");
			return h || f(),
			clearTimeout(i),
			j[d] ? void g(j[d], c) : void joms.ajax({
				func : "profile,ajaxFetchCard",
				data : [d],
				callback : function (a) {
					a.html && (j[d] = a.html, g(a.html, c))
				}
			})
		}
		function e() {
			i = setTimeout(function () {
					h && h.hide()
				}, 400)
		}
		function f() {
			h = b("<div>Loading...</div>"),
			h.css({
				position : "absolute"
			}),
			h.appendTo(document.body),
			h.on("mouseover.joms-hcard", function () {
				clearTimeout(i)
			}),
			h.on("mouseout.joms-hcard", e)
		}
		function g(a, b) {
			var c = b.offset(),
			d = b.height();
			h.html(a),
			h.css({
				top : c.top + d + 10,
				left : c.left
			}),
			h.show()
		}
		var h,
		i,
		j = {};
		return {
			initialize : c
		}
	}),
	c("utils/hovercard", function () {}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.photos = c(a, b)
	}
	(window, joms.jQuery, function (a, b) {
		function c(a) {
			var c = a.children(),
			e = a.width();
			c.css({
				display : "block",
				"float" : "left",
				margin : "1px 0",
				overflow : "hidden",
				padding : 0,
				position : "relative"
			}).each(function () {
				var a = b(this);
				a.data({
					width : a.width(),
					height : a.height()
				})
			}),
			d(e, c),
			f.push(a)
		}
		function d(a, b) {
			var c = 0,
			d = b.length;
			b.each(function (e) {
				var f,
				h,
				i,
				j;
				for (f = 0, j = c; e >= j; j++)
					h = b.eq(j).data(), f += h.width / h.height;
				if (i = a / f, g >= i) {
					for (j = c; e >= j; j++)
						b.eq(j).find("img").css({
							height : i
						});
					c = e + 1
				} else if (j === d)
					for (j = c; d >= j; j++)
						b.eq(j).nextAll().andSelf().css({
							height : g
						}).find("img").css({
							height : i
						})
			})
		}
		function e() {
			var a,
			b;
			for (a = 0; a < f.length; a++)
				b = f[a], d(b.width(), b.children())
		}
		var f = [],
		g = 180;
		return b(a).resize(joms._.debounce(function () {
				e()
			}, 500)), {
			arrange : c
		}
	}),
	c("utils/photos", function () {}),
	function (a, b, d) {
		joms.view || (joms.view = {}),
		joms.view.streams = d(a, b),
		c("views/streams", ["utils/hovercard", "utils/photos", "utils/video", "functions/tagging"], function () {
			return joms.view.streams
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			if (d(), q = b(".joms-stream__wrapper"), q.length) {
				g(),
				e(),
				f(),
				a.joms_singleactivity || a.joms_filter_hashtag || (+a.joms_adagency && m(), +a.joms_infinitescroll && t(), j());
				var c = document.getElementsByClassName("joms-activity-filter-action");
				c && c.length && a.FastClick.attach(c[0])
			}
		}
		function d() {
			q && q.off()
		}
		function e() {
			var a = ".joms-js--initialized",
			c = b(".joms-media--images").not(a);
			c.each(function () {
				var c = b(this),
				d = c.find("img"),
				e = 0;
				d.each(function () {
					var f = b(this);
					b("<img>").load(function () {
						e++,
						e === d.length && (c.siblings(".joms-media--loading").remove(), c.addClass(a.substr(1)), d.show(), joms.util.photos.arrange(c))
					}).attr("src", f.attr("src"))
				})
			})
		}
		function f() {
			var a = ".joms-js--initialized",
			c = ".joms-js--video",
			d = b(".joms-stream__body").find(c).not(a).addClass(a.substr(1));
			d.length && (joms.loadCSS(joms.ASSETS_URL + "vendors/mediaelement/mediaelementplayer.min.css"), d.on("click.joms-video", c + "-play", function () {
					var a = b(this).closest(c);
					joms.util.video.play(a, a.data())
				}), joms.ios && setTimeout(function () {
					d.find(c + "-play").click()
				}, 1e3))
		}
		function g() {
			joms.fn.tagging.initInputbox()
		}
		function h(a) {
			var b,
			c;
			return "last" !== a && (a = "first"),
			b = q.find(".joms-stream")[a](),
			b.length ? c = +b.data("stream-id") : 0
		}
		function i() {
			var a = q.children(".joms-stream__container");
			return {
				filter : a.data("filter"),
				filterId : a.data("filterid"),
				filterValue : a.data("filter-value")
			}
		}
		function j() {
			var a,
			c,
			d = j;
			d.loading || (a = h()) && (c = i(), d.loading = !0, d.xhr && d.xhr.abort(), d.xhr = joms.ajax({
						func : "activities,ajaxGetRecentActivitiesCount",
						data : [a, c.filter, c.filterId, c.filterValue],
						callback : function (a) {
							var c,
							e = +a.count,
							f = +a.nextPingDelay,
							g = b(".joms-js--stream-latest");
							d.loading = !1,
							d.xhr = null,
							e > 0 ? (c = b('<a href="javascript:">' + a.html + "</a>"), c.on("click", k), g.html(c).show()) : g.hide().empty(),
							f > 0 && joms._.delay(j, f)
						}
					}))
		}
		function k() {
			var a,
			c,
			d = k;
			d.loading || (a = h()) && (c = i(), d.loading = !0, d.xhr && d.xhr.abort(), d.xhr = joms.ajax({
						func : "activities,ajaxGetRecentActivities",
						data : [a, c.filter, c.filterId, c.filterValue],
						callback : function (a) {
							var c,
							h = b(b.trim(a.html)).filter(".joms-stream__wrapper").find(".joms-stream"),
							i = b(".joms-js--stream-latest");
							if (d.loading = !1, h.length)
								for (c = h.length - 1; c >= 0; c--)
									b(".joms-js--stream-" + h.eq(c).data("stream-id")).length || q.find(".joms-stream__container").prepend(h.eq(c));
							i.hide(),
							g(),
							e(),
							f()
						}
					}))
		}
		function l() {
			var a,
			c,
			d,
			j,
			k = l;
			k.loading || (a = h("last")) && (c = i(), k.loading = !0, d = q.find("#activity-more"), j = d.find(".loading"), d = d.find(".joms-button--primary"), d.hide(), j.show(), joms.ajax({
					func : "activities,ajaxGetOlderActivities",
					data : [a, c.filter, c.filterId, c.filterValue],
					callback : function (a) {
						var c,
						h = !1;
						k.loading = !1,
						j.hide(),
						a.html && (c = b(b.trim(a.html)).filter(".joms-stream__wrapper").find(".joms-stream"), c.length ? q.find(".joms-stream__container").append(c) : h = !0),
						g(),
						e(),
						f(),
						o(),
						h || d.show()
					}
				}))
		}
		function m() {
			joms.ajax({
				func : "system,ajaxGetAdagency",
				callback : function (a) {
					r = a || {},
					r.ads && r.ads.length && (r.ads = joms._.shuffle(r.ads)),
					o()
				}
			})
		}
		function n(a, b) {
			var c;
			return c = '<div data-stream-type="adagency" class="joms-stream joms-stream--adagency">',
			c += '<div class="joms-stream__header">',
			c += '<div class="joms-avatar--stream">',
			c += '<a href="' + b.on_click_url + '" target="_blank" onclick="window.open(\'' + b.on_click_url + "'); return false;\">",
			c += '<img src="' + b.banner_avatar + '">',
			c += "</a>",
			c += "</div>",
			c += '<div class="joms-stream__meta">',
			c += '<a class="joms-stream__user" href="' + b.on_click_url + '" target="_blank" onclick="window.open(\'' + b.on_click_url + "'); return false;\">" + b.banner_headline + "</a>",
			c += '<a href="' + b.on_click_url + '" target="_blank" onclick="window.open(\'' + b.on_click_url + '\'); return false;"><span class="joms-stream__time"><small>' + (b.short_url_to_promote || b.url_to_promote) + "</small></span></a>",
			c += "</div>",
			c += "</div>",
			c += '<div class="joms-stream__body">',
			c += "<p>" + b.banner_text + "</p>",
			c += '<div class="joms-media--image">',
			c += '<a href="' + b.on_click_url + '" target="_blank" onclick="window.open(\'' + b.on_click_url + "'); return false;\">",
			c += '<img src="' + b.banner_image_content + '">',
			c += "</a>",
			c += "</div>",
			c += "</div>",
			(+a.show_sponsored_stream_info || +a.show_create_ad_link) && (c += '<div class="joms-stream__actions">', +a.show_sponsored_stream_info && (c += '<span style="float:left">' + a.sponsored_stream_info_text + "</span>"), +a.show_create_ad_link && (c += '<a href="' + a.create_ad_link + '" style="float:right">' + a.create_ad_link_text + "</a>"), c += '<div style="clear:both"></div>', c += "</div>"),
			c += "</div>"
		}
		function o() {
			var c,
			d,
			e,
			f,
			g,
			h,
			i;
			r && r.config && r.ads && r.ads.length && (c = r.ads, d = r.config, e = +d.display_stream_ads_after_value, f = +d.display_stream_ads_every_value, h = +d.display_stream_ads, g = 0, i = {
					frontpage : "front_page_stream",
					profile : "profile_stream",
					groups : "group_stream",
					events : "event_stream"
				}, (d.js_stream_ads_on || []).indexOf(i[a.joms_page]) < 0 || q.find(".joms-stream").not(".joms-stream--adagency").each(function (a) {
					var i,
					j;
					if (h) {
						if (!e)
							return !1;
						if (a === e - 1)
							return i = b(this), j = i.next(), j.length && j.hasClass("joms-stream--adagency") || (i.after(n(d, c[g])), p(c[g])), !1
					} else {
						if (!f)
							return !1;
						if (g >= c.length)
							return !1;
						(a + 1) % f === 0 && (i = b(this), j = i.next(), j.length && j.hasClass("joms-stream--adagency") || (i.after(n(d, c[g])), p(c[g])), g++)
					}
				}))
		}
		function p(a) {
			var b = [a.advertiser_id, a.campaign_id, a.banner_id, a.campaign_type].join("-");
			s || (s = {}),
			s[b] || (s[b] = !0, joms.ajax({
					func : "system,ajaxAdagencyGetImpression",
					data : [a.advertiser_id, a.campaign_id, a.banner_id, a.campaign_type],
					callback : function () {}

				}))
		}
		var q,
		r,
		s,
		t = function () {
			var c,
			d,
			j,
			k,
			l,
			m,
			n;
			return joms.mobile ? !1 : (d = b(".joms-stream__loadmore"), j = b(a), k = b(document), l = d.find(".loading"), m = Math.max(+a.joms_autoloadtrigger || 0, 20), n = 0, d.find("a").hide(), c = t = joms._.debounce(function () {
						var a,
						d,
						p,
						r = j.scrollTop(),
						s = j.height();
						a = n > r ? "up" : "down",
						n = r,
						"down" === a && (r + s < k.height() - m || c.loading || (c.loading = !0, l.show(), (d = h("last")) && (p = i(), joms.ajax({
										func : "activities,ajaxGetOlderActivities",
										data : [d, p.filter, p.filterId, p.filterValue],
										callback : function (a) {
											var d,
											h = !1;
											l.hide(),
											a.html && (d = b(b.trim(a.html)).filter(".joms-stream__wrapper").find(".joms-stream"), d.length ? q.find(".joms-stream__container").append(d) : h = !0),
											g(),
											e(),
											f(),
											o(),
											h || setTimeout(function () {
												c.loading = !1
											}, 800)
										}
									}))))
					}, 50), void j.on("scroll", t))
		};
		return {
			start : c,
			stop : d,
			loadMore : l
		}
	}),
	function (a, b, c) {
		joms.view || (joms.view = {}),
		joms.view.toolbar = c(a, b)
	}
	(window, joms.jQuery, function (a, b) {
		function c(a) {
			var c = b(a.target).closest(".joms-trigger__menu--main, .joms-trigger__menu--user, .joms-menu, .joms-menu--user");
			c.length || (q.hasClass("show-menu") || q.hasClass("show-menu--user")) && (a.preventDefault(), a.stopPropagation(), q.removeClass("show-menu"), q.removeClass("show-menu--user"))
		}
		function d(a) {
			a.stopPropagation(),
			q.toggleClass("show-menu")
		}
		function e(a) {
			a.stopPropagation(),
			q.toggleClass("show-menu--user")
		}
		function f(a) {
			var c = b(a.currentTarget).closest("li");
			c.hasClass("show-submenu") ? c.removeClass("show-submenu") : c.addClass("show-submenu").siblings().removeClass("show-submenu")
		}
		function g() {
			q || (q = b(".jomsocial-wrapper")),
			r || (r = b(".joms-trigger__menu--main")),
			s || (s = b(".joms-trigger__menu--user")),
			t || (t = b(".joms-menu__toggle")),
			h(),
			q.on("click.menu", c),
			q.on("click.menu", ".joms-js--has-dropdown", function (c) {
				c.preventDefault(),
				c.stopPropagation(),
				a.location = b(c.currentTarget).attr("href")
			}),
			q.on("mouseenter.menu", ".joms-toolbar--desktop > ul > li > a.joms-js--has-dropdown", function (a) {
				var c = b(a.currentTarget);
				c.siblings("ul.joms-dropdown").is(":visible") || (v = c.trigger("click.dropdown"))
			}),
			q.on("mouseleave.menu", ".joms-toolbar--desktop", function () {
				v && (v.trigger("collapse.dropdown"), v = void 0)
			}),
			r.on("click.menu", d),
			s.on("click.menu", e),
			t.on("click.submenu", f),
			
			p()
		}
		function h() {
			q && (q.off("click.menu"), q.off("click.menu", ".joms-js--has-dropdown"), q.off("mouseenter.menu", ".joms-toolbar--desktop > ul > li > a.joms-js--has-dropdown"), q.off("mouseleave.menu", ".joms-toolbar--desktop")),
			r && r.off("click.menu"),
			s && s.off("click.menu"),
			t && t.off("click.submenu")
		}
		function i() {
			joms.ajax({
				func : "notification,ajaxGetNotification",
				data : [""],
				callback : function (a) {
					var c;
					a.html && (c = b(".joms-popover--toolbar-general"), c.html(a.html))
				}
			})
		}
		function j() {
			joms.ajax({
				func : "notification,ajaxGetRequest",
				data : [""],
				callback : function (a) {
					var c;
					a.html && (c = b(".joms-popover--toolbar-friendrequest"), c.html(a.html), c.off("click", ".joms-button__approve").on("click", ".joms-button__approve", k), c.off("click", ".joms-button__reject").on("click", ".joms-button__reject", l))
				}
			})
		}
		function k(a) {
			var c = b(a.currentTarget),
			d = c.data("connection");
			joms.ajax({
				func : "friends,ajaxRejectRequest",
				data : [d],
				callback : function (a) {
					c = b(".joms-js__friend-request-" + d),
					c.find(".joms-popover__actions").remove(),
					c.find(".joms-popover__content").html(a.error || a.message),
					n("friendrequest", -1)
				}
			})
		}
		function l(a) {
			var c = b(a.currentTarget),
			d = c.data("connection");
			joms.ajax({
				func : "friends,ajaxApproveRequest",
				data : [d],
				callback : function (a) {
					c = b(".joms-js__friend-request-" + d),
					c.find(".joms-popover__actions").remove(),
					c.find(".joms-popover__content").html(a.error || a.message),
					n("friendrequest", -1)
				}
			})
		}
		function m() {
			joms.ajax({
				func : "notification,ajaxGetInbox",
				data : [""],
				callback : function (a) {
					var c;
					a.html && (c = b(".joms-popover--toolbar-pm"), c.html(a.html))
				}
			})
		}
		function n(a, c) {
			var d;
			["general", "friendrequest", "pm"].indexOf(a) < 0 || (d = b(".joms-notifications__label--" + a), c = +d.eq(0).text() + c, d.html(c > 0 ? c : ""))
		}
		function o(a) {
			var c,
			d,
			e,
			f = a,
			g = /^\s+|\s+$/g;
			"string" != typeof a && (f = b(a).val()),
			f = f || "",
			f.replace(g, "") && (u && u.abort(), a = b(".joms-popover--toolbar-search"), c = a.find(".joms-js--field"), d = a.find(".joms-js--loading"), e = a.find(".joms-js--viewall"), a.find("li:not(.joms-js--noremove)").remove(), e.hide(), d.show(), u = joms.ajax({
						func : "search,ajaxSearch",
						data : [f],
						callback : function (b) {
							var g,
							h,
							i,
							j,
							k;
							if (d.hide(), b.error)
								return g = '<li class="joms-js--error">' + b.error + "</li>", void c.after(g);
							if (b.length) {
								for (g = "", j = Math.min(3, b.length), h = 0; j > h; h++)
									g += '<li><div class="joms-popover__avatar"><div class="joms-avatar">', g += '<img src="' + b[h].thumb + '"></div></div>', g += '<div class="joms-popover__content">', g += '<h5><a href="' + b[h].url + '">' + b[h].name + "</a></h5>", g += "</div></li>";
								i = e.find("form"),
								i.find("input").val(f),
								e.off("click", "a").on("click", "a", function () {
									i[0].submit()
								}),
								k = e.find("a"),
								k.html(k.data("lang").replace("%1$s", b.length)),
								c.after(g),
								e.show(),
								a.show()
							}
						}
					}))
		}
		function updateToolbar(notification,friend,inbox)
		{
			b('#jsGlobal a span').removeClass();
			b('#jsFriend a span').removeClass();
			b('#jsInbox a span').removeClass();
			
			if(notification == 0) {
				b('#jsGlobal a span').addClass('notifcountempty');
				b('#jsGlobal a span').html(0);
			}
			else
			{
				b('#jsGlobal a span').addClass('notifcount');
				b('#jsGlobal a span').html(notification);
			}
			
			if(friend == 0) {
				b('#jsFriend a span').addClass('notifcountempty');
				b('#jsFriend a span').html(0);
			}
			else
			{
				b('#jsFriend a span').addClass('notifcount');
				b('#jsFriend a span').html(friend);
			}
			
			if(inbox == 0) {
				b('#jsInbox a span').addClass('notifcountempty');
				b('#jsInbox a span').html(0);
			}
			else
			{
				b('#jsInbox a span').addClass('notifcount');
				b('#jsInbox a span').html(inbox);
			}
		}
		function p() {
			var c = +a.joms_my_id;
			c && joms.ajax({
				func : "activities,ajaxGetTotalNotifications",
				callback : function (a) {
					var c,
					d,
					e,
					f,
					g;
					a || (a = {}),
					c = a.newNotificationCount,
					d = a.newFriendInviteCount,
					e = a.newMessageCount,
					f = +a.nextPingDelay,
					"undefined" != typeof c && (c = +c || "", b(".joms-js--notiflabel-general").html(c), g = document.title, g = g.replace(/^\(\d+\)\s/, ""), g = (c ? "(" + c + ") " : "") + g, document.title = g),
					"undefined" != typeof d && b(".joms-js--notiflabel-frequest").html(+d || ""),
					"undefined" != typeof e && b(".joms-js--notiflabel-inbox").html(+e || ""),
					updateToolbar(c,d,e);
					f > 0 && joms._.delay(p, f)
				}
			})
		}
		var q,
		r,
		s,
		t,
		u,
		v;
		return {
			start : g,
			stop : h,
			notificationGeneral : i,
			notificationFriend : j,
			notificationPm : m,
			notificationCounter : n,
			search : o
		}
	}),
	c("views/toolbar", function () {}),
	function (a, b, d) {
		joms.fn || (joms.fn = {}),
		joms.fn.announcement = d(a, b),
		c("functions/announcement", [], function () {
			return joms.fn.announcement
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c) {
			b(".joms-js--announcement-view-" + a + "-" + c).hide(),
			b(".joms-js--announcement-edit-" + a + "-" + c).show(),
			b(".joms-subnav,.joms-subnav--desktop").hide(),
			b(".joms-sidebar").hide(),
			b(".joms-main").css({
				padding : 0,
				width : "100%"
			})
		}
		function d(a, c) {
			b(".joms-js--announcement-edit-" + a + "-" + c).hide(),
			b(".joms-js--announcement-view-" + a + "-" + c).show(),
			b(".joms-subnav,.joms-subnav--desktop").css("display", ""),
			b(".joms-main").css({
				padding : "",
				width : ""
			}),
			b(".joms-sidebar").show()
		}
		return {
			edit : c,
			editCancel : d
		}
	}),
	function (a, b, d) {
		joms.fn || (joms.fn = {}),
		joms.fn.facebook = d(a, b),
		c("functions/facebook", [], function () {
			return joms.fn.facebook
		})
	}
	(window, joms.jQuery, function () {
		function a() {
			joms.ajax({
				func : "connect,ajaxUpdate",
				data : [""],
				callback : function (a) {
					console.log(a)
				}
			})
		}
		return {
			update : a
		}
	}),
	function (a, b, d) {
		joms.fn || (joms.fn = {}),
		joms.fn.notification = d(a, b),
		c("functions/notification", [], function () {
			return joms.fn.notification
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c, e) {
			var f;
			c = a + "-" + c,
			d.indexOf(c) >= 0 || (f = b(".joms-js--notiflabel-" + a), d.indexOf(c) < 0 && (d.push(c), e = +f.eq(0).text() + e, f.html(e > 0 ? e : "")))
		}
		var d = [];
		return {
			updateCounter : c
		}
	}),
	function (a, b, d) {
		joms.fn || (joms.fn = {}),
		joms.fn.invitation = d(a, b),
		c("functions/invitation", ["functions/notification"], function () {
			return joms.fn.invitation
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			var c = "group" === a ? "notification,ajaxGroupJoinInvitation" : "events,ajaxJoinInvitation",
			d = [b];
			joms.ajax({
				func : c,
				data : d,
				callback : function (c) {
					e(a, b, c)
				}
			})
		}
		function d(a, b) {
			var c = "group" === a ? "notification,ajaxGroupRejectInvitation" : "events,ajaxRejectInvitation",
			d = [b];
			joms.ajax({
				func : c,
				data : d,
				callback : function (c) {
					e(a, b, c)
				}
			})
		}
		function e(a, c, d) {
			b(".joms-js--invitation-buttons-" + a + "-" + c).remove(),
			b(".joms-js--invitation-notice-" + a + "-" + c).html(d && d.message || ""),
			joms.fn.notification.updateCounter("general", c, -1)
		}
		return {
			accept : c,
			reject : d
		}
	}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.field = c(a, b)
	}
	(window, joms.jQuery, function (a, b) {
		function c() {
			return ['<div data-wrap="file" style="width:350px;max-width:100%;position:relative;overflow:hidden">', '<input type="text" class="joms-input" readonly="readonly" placeholder="Select file.."', 'style="margin-bottom:2px">', "</div>"].join("")
		}
		function d(a) {
			var b = a.match(/[^\\\/]+$/);
			return b && b[0] ? b[0] : ""
		}
		return {
			file : function (a) {
				a = b(a),
				a.each(function (a, e) {
					var f;
					e = b(e),
					f = e.parent(),
					f.data("wrap") || (f = b(c()), e.before(f), e.hide(), e.appendTo(f), e.css({
							cursor : "pointer",
							position : "absolute",
							right : 0,
							top : 0,
							width : "100%",
							height : "100%",
							opacity : 0
						}), e.show()),
					e.off("change.joms-file"),
					e.on("change.joms-file", function () {
						f.find(".joms-input").val(d(b(this).val()))
					})
				})
			}
		}
	}),
	c("utils/field", function () {}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.login = d(a, b),
		c("popups/login", ["utils/popup"], function () {
			return joms.popup.login
		})
	}
	(window, joms.jQuery, function () {
		function a(a, e) {
			d && d.off(),
			c = a,
			c.items[0] = {
				type : "inline",
				src : b(e)
			},
			c.updateItemHTML()
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", "</div>"].join("")
		}
		var c,
		d;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.album || (joms.popup.album = {}),
		joms.popup.album.addFeatured = d(a, b),
		c("popups/album.addfeatured", ["utils/popup"], function () {
			return joms.popup.album.addFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "photos,ajaxAddFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.album || (joms.popup.album = {}),
		joms.popup.album.removeFeatured = d(a, b),
		c("popups/album.removefeatured", ["utils/popup"], function () {
			return joms.popup.album.removeFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "photos,ajaxRemoveFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.album || (joms.popup.album = {}),
		joms.popup.album.remove = b(a),
		c("popups/album.remove", ["utils/popup"], function () {
			return joms.popup.album.remove
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "photos,ajaxRemoveAlbum",
				data : [g, "myphotos"],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form").submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", '<div class="joms-popup__content">', a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnCancel, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.album = b(a, joms.popup.album || {}),
		c("popups/album", ["popups/album.addfeatured", "popups/album.removefeatured", "popups/album.remove"], function () {
			return joms.popup.album
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.announcement || (joms.popup.announcement = {}),
		joms.popup.announcement.remove = b(a),
		c("popups/announcement.remove", ["utils/popup"], function () {
			return joms.popup.announcement.remove
		})
	}
	(window, function () {
		function a(a, i, j) {
			f && f.off(),
			e = a,
			g = i,
			h = j,
			joms.ajax({
				func : "groups,ajaxShowRemoveBulletin",
				data : [g, h],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.announcement = b(a, joms.popup.announcement || {}),
		c("popups/announcement", ["popups/announcement.remove"], function () {
			return joms.popup.announcement
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.app || (joms.popup.app = {}),
		joms.popup.app.about = d(a, b),
		c("popups/app.about", ["utils/popup"], function () {
			return joms.popup.app.about
		})
	}
	(window, joms.jQuery, function () {
		function a(a, f) {
			d && d.off(),
			c = a,
			e = f,
			joms.ajax({
				func : "apps,ajaxShowAbout",
				data : [e],
				callback : function (a) {
					c.items[0] = {
						type : "inline",
						src : b(a)
					},
					c.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", "</div>"].join("")
		}
		var c,
		d,
		e;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.app || (joms.popup.app = {}),
		joms.popup.app.browse = d(a, b),
		c("popups/app.browse", ["utils/popup"], function () {
			return joms.popup.app.browse
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			j && j.off(),
			i = a,
			k = b,
			joms.ajax({
				func : "apps,ajaxBrowse",
				data : [k],
				callback : function (a) {
					i.items[0] = {
						type : "inline",
						src : h(a)
					},
					i.updateItemHTML(),
					j = i.contentContainer,
					j.on("click", "a[data-appname]", d),
					j.on("click", ".joms-js--btn-view-all", g)
				}
			})
		}
		function d(a) {
			var c = b(a.target),
			d = c.data("appname"),
			f = c.data("position");
			joms.ajax({
				func : "apps,ajaxAddApp",
				data : [d, f],
				callback : function (a) {
					var c;
					a.success && (c = b("#pos-profile-" + k), c.append(a.item), e(a.id, d))
				}
			})
		}
		function e(a, b) {
			joms.ajax({
				func : "apps,ajaxShowSettings",
				data : [a, b],
				callback : function (a) {
					j.off("click", "a[data-appname]"),
					j.html(h(a, "setting")),
					j.on("click", ".joms-popup__content,.joms-popup__action", function (a) {
						return a.stopPropagation(),
						!1
					}),
					j.on("click", "[data-ui-object=popup-button-save]", function () {
						f()
					})
				}
			})
		}
		function f() {
			var a,
			b = j.find("form"),
			c = b.serializeArray(),
			d = [];
			for (a = 0; a < c.length; a++)
				d.push([c[a].name, c[a].value]);
			joms.ajax({
				func : "apps,ajaxSaveSettings",
				data : [d],
				callback : function (a) {
					return a.error ? (j.find(".joms-popup__content").html(a.error), void j.find(".joms-popup__action").remove()) : void i.close()
				}
			})
		}
		function g() {
			var a = j.find(".joms-popup__content").eq(0),
			b = a.innerHeight();
			a.css({
				height : b,
				overflow : "auto"
			}),
			j.find(".joms-js--btn-view-all").parent().remove(),
			j.find(".joms-js--app").show(),
			a.animate({
				scrollTop : a[0].scrollHeight
			})
		}
		function h(a, b) {
			var c = "";
			return a || (a = {}),
			"setting" === b && a.btnSave && (c = ['<div class="joms-popup__action">', '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnSave, "</button>", "</div>"].join("")),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", c, "</div>"].join("")
		}
		var i,
		j,
		k;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.app || (joms.popup.app = {}),
		joms.popup.app.privacy = d(a, b),
		c("popups/app.privacy", ["utils/popup"], function () {
			return joms.popup.app.privacy
		})
	}
	(window, joms.jQuery, function () {
		function a(a, g) {
			e && e.off(),
			d = a,
			f = g,
			joms.ajax({
				func : "apps,ajaxShowPrivacy",
				data : [f],
				callback : function (a) {
					d.items[0] = {
						type : "inline",
						src : c(a)
					},
					d.updateItemHTML(),
					e = d.contentContainer,
					e.on("click", "[data-ui-object=popup-button-save]", b)
				}
			})
		}
		function b() {
			var a = e.find("input[type=radio]:checked"),
			b = a.val();
			joms.ajax({
				func : "apps,ajaxSavePrivacy",
				data : [f, b],
				callback : function (a) {
					return a.error ? (e.find(".joms-popup__content").html(a.error), void e.find(".joms-popup__action").remove()) : void d.close()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnSave, "</button>", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.app || (joms.popup.app = {}),
		joms.popup.app.remove = d(a, b),
		c("popups/app.remove", ["utils/popup"], function () {
			return joms.popup.app.remove
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c) {
			f && f.off(),
			e = a,
			g = c,
			joms.ajax({
				func : "apps,ajaxRemove",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					b("#app-" + g).remove()
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.app || (joms.popup.app = {}),
		joms.popup.app.setting = d(a, b),
		c("popups/app.setting", ["utils/popup"], function () {
			return joms.popup.app.setting
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h, i) {
			e && e.off(),
			d = a,
			f = h,
			g = i,
			joms.ajax({
				func : "apps,ajaxShowSettings",
				data : [f, g],
				callback : function (a) {
					d.items[0] = {
						type : "inline",
						src : c(a)
					},
					d.updateItemHTML(),
					e = d.contentContainer,
					e.on("click", "[data-ui-object=popup-button-save]", b)
				}
			})
		}
		function b() {
			var a,
			b = e.find("form"),
			c = b.serializeArray(),
			f = [];
			for (a = 0; a < c.length; a++)
				f.push([c[a].name, c[a].value]);
			joms.ajax({
				func : "apps,ajaxSaveSettings",
				data : [f],
				callback : function (a) {
					return a.error ? (e.find(".joms-popup__content").html(a.error), void e.find(".joms-popup__action").remove()) : void d.close()
				}
			})
		}
		function c(a) {
			var b = "";
			return a || (a = {}),
			a.btnSave && (b = ['<div class="joms-popup__action">', '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnSave, "</button>", "</div>"].join("")),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single" style="max-height:315px; overflow:auto">', a.html || "", "</div>", b, "</div>"].join("");

		}
		var d,
		e,
		f,
		g;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.app = b(a, joms.popup.app || {}),
		c("popups/app", ["popups/app.about", "popups/app.browse", "popups/app.privacy", "popups/app.remove", "popups/app.setting"], function () {
			return joms.popup.app
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.avatar || (joms.popup.avatar = {}),
		joms.popup.avatar.change = d(a, b),
		c("popups/avatar.change", ["utils/crop", "utils/loadlib", "utils/popup"], function () {
			return joms.popup.avatar.change
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			q && q.off(),
			p = a,
			r = b,
			s = c,
			joms.ajax({
				func : "photos,ajaxUploadAvatar",
				data : [r, s],
				callback : function (a) {
					p.items[0] = {
						type : "inline",
						src : o(a)
					},
					p.updateItemHTML(),
					q = p.contentContainer,
					q.on("click", ".joms-js--button-upload", h),
					q.on("click", ".joms-js--button-save", d),
					q.on("click", ".joms-js--button-rotate-left", e),
					q.on("click", ".joms-js--button-rotate-right", f),
					i()
				}
			})
		}
		function d() {
			var b = joms.util.crop.getSelection();
			joms.ajax({
				func : "photos,ajaxUpdateThumbnail",
				data : [r, s, b.x, b.y, b.width, b.height],
				callback : function (b) {
					b.success && a.location.reload(!0)
				}
			})
		}
		function e() {
			joms.api.avatarRotate(r, s, "left", function () {
				g()
			})
		}
		function f() {
			joms.api.avatarRotate(r, s, "right", function () {
				g()
			})
		}
		function g() {
			var a = b(".joms-avatar__cropper"),
			c = a.find("img"),
			d = c.attr("src");
			d = d.replace(/\?.*$/, "?_=" + (new Date).getTime()),
			joms.util.crop.detach(),
			c.removeAttr("src"),
			c.attr("src", d),
			setTimeout(function () {
				joms.util.crop(c)
			}, 100)
		}
		function h() {
			i(function () {
				v.click()
			})
		}
		function i(c) {
			return "function" != typeof c && (c = function () {}),
			t ? void c() : void joms.util.loadLib("plupload", function () {
				var d;
				d = q.find("form").attr("action"),
				u = b('<div id="joms-js--avatar-uploader" style="width:1px; height:1px; position:absolute; overflow:hidden;">').appendTo(document.body),
				v = b('<div id="joms-js--avatar-uploader-button">').appendTo(u),
				t = new a.plupload.Uploader({
						url : d,
						filters : [{
								title : "Image files",
								extensions : "jpg,jpeg,png,gif"
							}
						],
						container : "joms-js--avatar-uploader",
						browse_button : "joms-js--avatar-uploader-button",
						runtimes : "html5,html4",
						multi_selection : !1,
						file_data_name : "filedata"
					}),
				t.bind("FilesAdded", j),
				t.bind("Error", k),
				t.bind("UploadProgress", l),
				t.bind("FileUploaded", m),
				t.bind("UploadComplete", n),
				t.init(),
				v = u.find("input[type=file]"),
				c()
			})
		}
		function j(b) {
			a.setTimeout(function () {
				q.find(".joms-progressbar__progress").css({
					width : 0
				}),
				b.refresh(),
				b.start()
			}, 0)
		}
		function k() {}

		function l(a, b) {
			var c,
			d;
			c = Math.min(100, Math.floor(b.loaded / b.size * 100)),
			d = q.find(".joms-progressbar__progress"),
			d.stop().animate({
				width : c + "%"
			})
		}
		function m(a, c, d) {
			var e,
			f = {};
			try {
				f = JSON.parse(d.response)
			} catch (g) {}

			w = f,
			f.msg && !f.error && (e = b(".joms-avatar__cropper"), e.find("img").attr("src", f.msg), e.show(), setTimeout(function () {
					var a = e.find("img");
					joms.util.crop.detach(),
					joms.util.crop(a)
				}, 100))
		}
		function n() {
			w.error ? (q.find(".joms-js--avatar-uploader-error").html(w.msg).show(), q.find(".joms-progressbar__progress").stop().animate({
					width : "0%"
				})) : q.find(".joms-js--avatar-uploader-error").hide()
		}
		function o(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", a.html || "", "</div>"].join("")
		}
		var p,
		q,
		r,
		s,
		t,
		u,
		v,
		w;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.avatar || (joms.popup.avatar = {}),
		joms.popup.avatar.remove = d(a, b),
		c("popups/avatar.remove", ["utils/popup"], function () {
			return joms.popup.avatar.remove
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h, i) {
			f && f.off(),
			e = a,
			g = i,
			joms.ajax({
				func : "profile,ajaxRemovePicture",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form").submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", '<div class="joms-popup__hide">', '<form method="POST" action="', a.redirUrl, '"><input type="hidden" name="userid" value="', g, '"></form>', "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.avatar || (joms.popup.avatar = {}),
		joms.popup.avatar.rotate = d(a, b),
		c("popups/avatar.rotate", [], function () {
			return joms.popup.avatar.rotate
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(c, d, e, f) {
			joms.ajax({
				func : "profile,ajaxRotateAvatar",
				data : [c, d, e],
				callback : function (c) {
					return c.error ? void a.alert(c.error) : void(c.success && (b(".joms-js--avatar-" + d).attr("src", c.avatar + "?_=" + (new Date).getTime()), "function" == typeof f && f(c)))
				}
			})
		}
		return function (a, b, d, e) {
			c(a, b, d, e)
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.avatar = b(a, joms.popup.avatar || {}),
		c("popups/avatar", ["popups/avatar.change", "popups/avatar.remove", "popups/avatar.rotate"], function () {
			return joms.popup.avatar
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.comment || (joms.popup.comment = {}),
		joms.popup.comment.showLikes = d(a, b),
		c("popups/comment.showlikes", ["utils/popup"], function () {
			return joms.popup.comment.showLikes
		})
	}
	(window, joms.jQuery, function () {
		function a(a, f) {
			d && d.off(),
			c = a,
			e = f,
			joms.ajax({
				func : "activities,ajaxshowLikedUser",
				data : [e],
				callback : function (a) {
					c.items[0] = {
						type : "inline",
						src : b(a)
					},
					c.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--rounded joms-popup--80pc">', '<button class="mfp-close joms-hide"></button>', '<div class="joms-comment">', a.html || "", "</div>", "</div>"].join("")
		}
		var c,
		d,
		e;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.comment = b(a, joms.popup.comment || {}),
		c("popups/comment", ["popups/comment.showlikes"], function () {
			return joms.popup.comment
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.cover || (joms.popup.cover = {}),
		joms.popup.cover.change = d(a, b),
		c("popups/cover.change", ["utils/loadlib", "utils/popup"], function () {
			return joms.popup.cover.change
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			o && o.off(),
			n = a,
			p = b,
			q = c,
			joms.ajax({
				func : "photos,ajaxChangeCover",
				data : [p, q],
				callback : function (a) {
					n.items[0] = {
						type : "inline",
						src : m(a)
					},
					n.updateItemHTML(),
					o = n.contentContainer,
					o.on("click", ".joms-js--album", d),
					o.on("click", ".joms-js--back-to-album", e),
					o.on("click", ".joms-js--select-photo", f),
					o.on("click", "[data-ui-object=popup-button-upload]", g),
					h()
				}
			})
		}
		function d() {
			var a = b(this),
			c = a.data("album"),
			d = a.data("total");
			joms.ajax({
				func : "photos,ajaxGetPhotoList",
				data : [c, d],
				callback : function (a) {
					a && a.html && (b(".joms-js--album-list").hide(), b(".joms-js--photo-list").html(a.html).show())
				}
			})
		}
		function e() {
			b(".joms-js--photo-list").hide(),
			b(".joms-js--album-list").show()
		}
		function f() {
			var a = b(this),
			c = a.data("photo");
			joms.ajax({
				func : "photos,ajaxSetPhotoCover",
				data : [p, c, q],
				callback : function (a) {
					a && a.path && (b(".joms-js--cover-image > img").attr("src", a.path).css({
							top : 0
						}), n.close(), b(".joms-js--menu-reposition").show())
				}
			})
		}
		function g() {
			h(function () {
				t.click()
			})
		}
		function h(c) {
			return "function" != typeof c && (c = function () {}),
			r ? void c() : void joms.util.loadLib("plupload", function () {
				var d;
				d = o.find("form").attr("action"),
				s = b('<div id="joms-js--cover-uploader" style="width:1px; height:1px; position:absolute; overflow:hidden;">').appendTo(document.body),
				t = b('<div id="joms-js--cover-uploader-button">').appendTo(s),
				r = new a.plupload.Uploader({
						url : d,
						filters : [{
								title : "Image files",
								extensions : "jpg,jpeg,png,gif"
							}
						],
						container : "joms-js--cover-uploader",
						browse_button : "joms-js--cover-uploader-button",
						runtimes : "html5,html4",
						multi_selection : !1,
						file_data_name : "uploadCover"
					}),
				r.bind("FilesAdded", i),
				r.bind("UploadProgress", j),
				r.bind("Error", function () {}),
				r.bind("FileUploaded", k),
				r.bind("UploadComplete", l),
				r.init(),
				t = s.find("input[type=file]"),
				c()
			})
		}
		function i(b) {
			a.setTimeout(function () {
				b.refresh(),
				b.start()
			}, 0)
		}
		function j(a, b) {
			var c,
			d;
			c = Math.min(100, Math.floor(b.loaded / b.size * 100)),
			d = o.find(".joms-progressbar__progress"),
			d.stop().animate({
				width : c + "%"
			})
		}
		function k(a, c, d) {
			var e = {};
			try {
				e = JSON.parse(d.response)
			} catch (f) {}

			u = e,
			e.path && (b(".joms-js--cover-image > img").attr("src", e.path).css({
					top : 0
				}), n.close(), b(".joms-js--menu-reposition").show())
		}
		function l() {
			u.error ? (o.find(".joms-js--cover-uploader-error").html(u.error).show(), o.find(".joms-progressbar__progress").stop().animate({
					width : "0%"
				})) : o.find(".joms-js--cover-uploader-error").hide()
		}
		function m(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", a.html || "", "</div>"].join("")
		}
		var n,
		o,
		p,
		q,
		r,
		s,
		t,
		u;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.cover || (joms.popup.cover = {}),
		joms.popup.cover.remove = d(a, b),
		c("popups/cover.remove", ["utils/popup"], function () {
			return joms.popup.cover.remove
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h, i) {
			f && f.off(),
			e = a,
			g = i,
			joms.ajax({
				func : "profile,ajaxRemoveCover",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			var a = f.find("form");
			a.data("saving") || (a.data("saving", 1), a.submit())
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", '<div class="joms-popup__hide">', '<form method="POST" action="', a.redirUrl, '"><input type="hidden" name="userid" value="', g, '"></form>', "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.cover = b(a, joms.popup.cover || {}),
		c("popups/cover", ["popups/cover.change", "popups/cover.remove"], function () {
			return joms.popup.cover
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.discussion || (joms.popup.discussion = {}),
		joms.popup.discussion.lock = b(a),
		c("popups/discussion.lock", ["utils/popup"], function () {
			return joms.popup.discussion.lock
		})
	}
	(window, function () {
		function a(a, i, j) {
			f && f.off(),
			e = a,
			g = i,
			h = j,
			joms.ajax({
				func : "groups,ajaxShowLockDiscussion",
				data : [g, h],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.discussion || (joms.popup.discussion = {}),
		joms.popup.discussion.remove = b(a),
		c("popups/discussion.remove", ["utils/popup"], function () {
			return joms.popup.discussion.remove
		})
	}
	(window, function () {
		function a(a, i, j) {
			f && f.off(),
			e = a,
			g = i,
			h = j,
			joms.ajax({
				func : "groups,ajaxShowRemoveDiscussion",
				data : [g, h],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.discussion = b(a, joms.popup.discussion || {}),
		c("popups/discussion", ["popups/discussion.lock", "popups/discussion.remove"], function () {
			return joms.popup.discussion
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event["delete"] = b(a),
		c("popups/event.delete", ["utils/popup"], function () {
			return joms.popup.event["delete"]
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "events,ajaxWarnEventDeletion",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c(a, b, d) {
			var e,
			h;
			b ? e = [g, b, d] : (e = [g, 1], h = f.find("[name=recurring]:checked"), e.push(h && h.length ? h.val() : "")),
			joms.ajax({
				func : "events,ajaxDeleteEvent",
				data : e,
				callback : function (a) {
					var b;
					f.find(".joms-js--step1").hide(),
					f.find(".joms-js--step2").show().children().first().append("<div>" + (a.error || a.message) + "</div>"),
					a.next ? c(null, a.next, e[2]) : a.redirect && (b = f.find(".joms-js--step2"), b.find(".joms-js--button-done").html(a.btnDone).on("click", function () {
							window.location = a.redirect
						}), b.find(".joms-popup__action").show(), b.find(".joms-popup__content").removeClass("joms-popup__content--single"))
				}
			})
		}
		function d(a) {
			var b,
			c,
			d;
			if (a || (a = {}), b = "", a.radios && a.radios.length) {
				for (b = '<div><form style="margin:5px;padding:0">', d = 0; d < a.radios.length; d++)
					c = a.radios[d], b += '<div><label> <input type="radio" name="recurring" value="' + c[0] + '"' + (c[2] ? " checked" : "") + "> ", b += c[1] + "</label></div>";
				b += "</form></div>"
			}
			return ['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html, b, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnDelete, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", '<div class="joms-popup__action joms-popup__hide">', '<button class="joms-button--primary joms-js--button-done"></button>', "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.invite = d(a, b),
		c("popups/event.invite", ["utils/popup"], function () {
			return joms.popup.event.invite
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			m && m.off(),
			l = a,
			r = b,
			s = c,
			v = 200,
			joms.ajax({
				func : "system,ajaxShowInvitationForm",
				data : [null, "", r, 1, "group" === s ? 0 : 1, s],
				callback : function (a) {
					l.items[0] = {
						type : "inline",
						src : k(a)
					},
					l.updateItemHTML(),
					a.limit && (v = +a.limit),
					m = l.contentContainer,
					n = m.find(".joms-tab__content").eq(0),
					o = m.find(".joms-tab__content").eq(1),
					p = m.find("[data-btn-select]"),
					q = m.find("[data-btn-load]"),
					m.on("keyup", "[data-search]", d),
					m.on("click", ".joms-tab__bar a", f),
					m.on("click", "[data-btn-select]", g),
					m.on("click", "[data-btn-load]", h),
					m.on("click", "[data-btn-save]", e),
					m.on("click", "input[type=checkbox]", i),
					j("")
				}
			})
		}
		function d(a) {
			var c = b(a.currentTarget);
			j(c.val())
		}
		function e() {
			var a,
			b = "",
			c = o.find("input[type=checkbox]"),
			d = [],
			e = m.find("input[name=emails]").val() || "",
			f = m.find("[name=message]").val() || "",
			g = /^\s+|\s+$/g;
			c.each(function () {
				d.push(this.value)
			}),
			e = e.replace(g, ""),
			f = f.replace(g, ""),
			a = [["friendsearch", b], ["emails", e], ["message", f], ["friends", d.join(",")]],
			joms.ajax({
				func : "system,ajaxSubmitInvitation",
				data : ["events,inviteUsers", r, a],
				callback : function () {
					m.off(),
					l.close()
				}
			})
		}
		function f(c) {
			var d = b(c.target),
			e = "#joms-popup-tab-selected" === d.attr("href"),
			f = a.joms_lang[e ? "COM_COMMUNITY_UNSELECT_ALL" : "COM_COMMUNITY_SELECT_ALL"];
			p.html(f)
		}
		function g() {
			var a,
			c = b(".joms-tab__content:visible");
			return "joms-popup-tab-selected" === c.attr("id") ? (c.find(".joms-js--friend").remove(), void m.find("input[type=checkbox]").each(function () {
					this.checked = !1
				})) : (a = c.find(".joms-js--friend").clone(), a.find("input[type=checkbox]").add(c.find("input[type=checkbox]")).prop("checked", "checked"), c = m.find("#joms-popup-tab-selected"), void c.html(a))
		}
		function h() {
			j()
		}
		function i(a) {
			var c,
			d,
			e = b(a.target),
			f = e.closest(".joms-tab__content");
			return "joms-popup-tab-selected" === f.attr("id") ? (c = e[0].value, e.closest(".joms-js--friend").remove(), void(m.find(".joms-js--friend-" + c + " input[type=checkbox]")[0].checked = !1)) : e[0].checked ? (f = m.find("#joms-popup-tab-selected"), d = e.closest(".joms-js--friend").clone(), e = d.find("input[type=checkbox]"), e[0].checked = !0, void f.append(d)) : (c = e[0].value, void m.find("#joms-popup-tab-selected .joms-js--friend-" + c).remove())
		}
		function j(c) {
			var d,
			e,
			f = "string" == typeof c;
			f ? (n.empty(), u = 0, t = c) : u += v,
			d = "group" === s ? "system,ajaxLoadGroupEventMembers" : "system,ajaxLoadFriendsList",
			e = [t, "events,inviteUsers", r, u, v],
			"group" === s && e.splice(1, 1),
			w && w.abort(),
			w = joms.ajax({
					func : d,
					data : e,
					callback : function (c) {
						var d;
						c.html && (d = b(b.trim(c.html)), d.each(function () {
								var a = b(this).find(":checkbox"),
								c = a.val();
								o.find(":checkbox[value=" + c + "]").length && (a[0].checked = !0)
							}), n.append(d)),
						f || (n[0].scrollTop = n[0].scrollHeight),
						c.loadMore ? (p.css({
								width : "49%",
								marginRight : "2%"
							}), q.css({
								width : "49%"
							}).html(a.joms_lang.COM_COMMUNITY_INVITE_LOAD_MORE + " (" + c.moreCount + ")").show()) : (q.hide(), p.css({
								width : "100%",
								marginRight : "0"
							}))
					}
				})
		}
		function k(a) {
			return ['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--primary" data-btn-save="1">', a.btnInvite, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var l,
		m,
		n,
		o,
		p,
		q,
		r,
		s,
		t,
		u,
		v,
		w;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.join = d(a, b),
		c("popups/event.join", ["utils/popup"], function () {
			return joms.popup.event.join
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "events,ajaxRequestInvite",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1 ', a.isMember ? "joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2 ', a.isMember ? "" : "joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.html, "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.leave = d(a, b),
		c("popups/event.leave", ["utils/popup"], function () {
			return joms.popup.event.leave
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "events,ajaxIgnoreEvent",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.response = d(a, b),
		c("popups/event.response", ["utils/popup"], function () {
			return joms.popup.event.response
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			g && g.off(),
			f = a,
			h = b,
			f.items[0] = {
				type : "inline",
				src : e(c)
			},
			f.updateItemHTML(),
			g = f.contentContainer,
			g.on("click", "a[data-value]", d)
		}
		function d(c) {
			var d = b(c.currentTarget).data("value");
			joms.ajax({
				func : "events,ajaxUpdateStatus",
				data : [h, d],
				callback : function () {
					a.location.reload()
				}
			})
		}
		function e(a) {
			var b,
			c = "";
			for (b = 0; b < a.length; b++)
				c += '<li><a data-value="' + a[b][0] + '" href="javascript:">' + a[b][1] + "</a></li>";
			return ['<div class="joms-popup joms-popup--dropdown">', '<ul class="joms-dropdown">', c, "</ul>", '<button class="mfp-close" type="button" title="Close (Esc)">×</button>', "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			var b = [].slice.call(arguments);
			b.shift(),
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.addFeatured = d(a, b),
		c("popups/event.addfeatured", ["utils/popup"], function () {
			return joms.popup.event.addFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "events,ajaxAddFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.rejectGuest = d(a, b),
		c("popups/event.rejectguest", ["utils/popup"], function () {
			return joms.popup.event.rejectGuest
		})
	}
	(window, joms.jQuery, function () {
		function a(a, i, j) {
			f && f.off(),
			e = a,
			g = i,
			h = j,
			joms.ajax({
				func : "events,ajaxConfirmRemoveGuest",
				data : [h, g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			var a = f.find("input:checkbox")[0].checked || !1;
			joms.ajax({
				func : a ? "events,ajaxBlockGuest" : "events,ajaxRemoveGuest",
				data : [h, g],
				callback : function (a) {
					var b = f.find(".joms-js--step1"),
					c = f.find(".joms-js--step2");
					a.error || (e.st.callbacks || (e.st.callbacks = {}), e.st.callbacks.close = function () {
						window.location.reload()
					}),
					c.find(".joms-popup__content").html(a.error || a.message),
					b.hide(),
					c.show()
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.removeFeatured = d(a, b),
		c("popups/event.removefeatured", ["utils/popup"], function () {
			return joms.popup.event.removeFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "events,ajaxRemoveFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.event || (joms.popup.event = {}),
		joms.popup.event.report = b(a),
		c("popups/event.report", ["utils/popup"], function () {
			return joms.popup.event.report
		})
	}
	(window, function () {
		function a(a, i) {
			g && g.off(),
			f = a,
			h = i,
			joms.ajax({
				func : "system,ajaxReport",
				data : [],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("change", "select", b),
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function b(a) {
			g.find("textarea").val(a.target.value)
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			var a,
			b = /^\s+|\s+$/g;
			return a = g.find("textarea").val(),
			(a = a.replace(b, "")) ? (g.find(".joms-js--error").hide(), void joms.ajax({
					func : "system,ajaxSendReport",
					data : ["events,reportEvent", window.location.href, a, h],
					callback : function (a) {
						g.find(".joms-js--step1").hide(),
						g.find(".joms-js--step2").show().children().html(a.error || a.message)
					}
				})) : void g.find(".joms-js--error").show()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', a.html, '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.event = b(a, joms.popup.event || {}),
		c("popups/event", ["popups/event.delete", "popups/event.invite", "popups/event.join", "popups/event.leave", "popups/event.response", "popups/event.addfeatured", "popups/event.rejectguest", "popups/event.removefeatured", "popups/event.report"], function () {
			return joms.popup.event
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.fbc || (joms.popup.fbc = {}),
		joms.popup.fbc.update = d(a, b),
		c("popups/fbc.update", ["utils/popup"], function () {
			return joms.popup.fbc.update
		})
	}
	(window, joms.jQuery, function () {
		function a(a) {
			n && n.off(),
			m = a,
			joms.ajax({
				func : "connect,ajaxUpdate",
				data : [""],
				callback : function (a) {
					var e = a.jax_token_var;
					e && (a.btnNext = a.btnContinue, window.jax_token_var = a.jax_token_var),
					m.items[0] = {
						type : "inline",
						src : l(a)
					},
					m.updateItemHTML(),
					n = m.contentContainer,
					n.on("click", ".joms-js--button-next", e ? i : b),
					n.on("click", ".joms-js--button-back2", c),
					n.on("click", ".joms-js--button-next2", d),
					n.on("click", ".joms-js--button-back3", j)
				}
			})
		}
		function b() {
			var a,
			b;
			o = 2 === +n.find("[name=membertype]:checked").val(),
			o ? f() : (a = n.find("#joms-js--fbc-tnc-checkbox"), a.length ? (a = a[0], b = n.find(".joms-js--fbc-tnc-error"), a.checked ? (b.hide(), e()) : b.show()) : e())
		}
		function c() {
			n.find(".joms-js--step2").hide(),
			n.find(".joms-js--step3").hide(),
			n.find(".joms-js--step1").show()
		}
		function d() {
			o ? h() : g()
		}
		function e() {
			joms.ajax({
				func : "connect,ajaxShowNewUserForm",
				data : [""],
				callback : function (a) {
					var b;
					n.find(".joms-js--step1").hide(),
					b = n.find(".joms-js--step2"),
					b.find(".joms-popup__content").html(a.html),
					b.find(".joms-js--button-back2").html(a.btnBack),
					b.find(".joms-js--button-next2").html(a.btnCreate),
					b.show()
				}
			})
		}
		function f() {
			joms.ajax({
				func : "connect,ajaxShowExistingUserForm",
				data : [""],
				callback : function (a) {
					var b;
					n.find(".joms-js--step1").hide(),
					b = n.find(".joms-js--step2"),
					b.find(".joms-popup__content").html(a.html),
					b.find(".joms-js--button-back2").html(a.btnBack),
					b.find(".joms-js--button-next2").html(a.btnLogin),
					b.show()
				}
			})
		}
		function g() {
			var a = n.find(".joms-js--step2"),
			b = a.find("[name=name]").val(),
			c = a.find("[name=username]").val(),
			d = a.find("[name=email]").val(),
			e = a.find("[name=profiletype]"),
			f = "";
			e.length && (f = e.filter(":checked").val()),
			joms.ajax({
				func : "connect,ajaxCreateNewAccount",
				data : [b, c, d, f],
				callback : function (a) {
					var b;
					return a.error ? (n.find(".joms-js--step2").hide(), b = n.find(".joms-js--step3"), b.find(".joms-popup__content").html(a.error), b.find(".joms-js--button-back3").html(a.btnBack), void b.show()) : (n.off(), m.close(), void joms.popup.fbc.update());

				}
			})
		}
		function h() {
			var a = n.find(".joms-js--step2"),
			b = a.find("[name=username]").val(),
			c = a.find("[name=password]").val();
			joms.ajax({
				func : "connect,ajaxValidateLogin",
				data : [b, c],
				callback : function (a) {
					var b;
					return a.error ? (n.find(".joms-js--step2").hide(), b = n.find(".joms-js--step3"), b.find(".joms-popup__content").html(a.error), b.find(".joms-js--button-back3").html(a.btnBack), void b.show()) : (n.off(), m.close(), void joms.popup.fbc.update())
				}
			})
		}
		function i() {
			var a = n.find("[name=importstatus]"),
			b = n.find("[name=importavatar]");
			a = a.length && a[0].checked ? 1 : 0,
			b = b.length && b[0].checked ? 1 : 0,
			joms.ajax({
				func : "connect,ajaxImportData",
				data : [a, b],
				callback : function (a) {
					var b;
					return n.find(".joms-js--step1").hide(),
					a.error ? (n.off("click").on("click", ".joms-js--button-next2", k), b = n.find(".joms-js--step2"), b.find(".joms-popup__content").html(a.error), b.find(".joms-js--button-back2").hide(), b.find(".joms-js--button-next2").html(a.btnNext), void b.show()) : a.btnUpdate ? (n.off("click").on("click", ".joms-js--button-back2", k), n.off("click").on("click", ".joms-js--button-next2", function () {
							window.location = a.redirect
						}), b = n.find(".joms-js--step2"), b.find(".joms-popup__content").html(a.html), b.find(".joms-js--button-back2").html(a.btnSkip), b.find(".joms-js--button-next2").html(a.btnUpdate), void b.show()) : (k(), void(window.location = a.redirect))
				}
			})
		}
		function j() {
			n.find(".joms-js--step3").hide(),
			n.find(".joms-js--step2").hide(),
			n.find(".joms-js--step1").show()
		}
		function k() {
			n.off(),
			m.close()
		}
		function l(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content ', a.btnNext ? "" : "joms-popup__content--single", '">', a.error || a.html || "", "</div>", a.btnNext ? '<div class="joms-popup__action">' : "", a.btnNext ? '<button class="joms-button--primary joms-button--small joms-js--button-next">' + a.btnNext + "</button>" : "", a.btnNext ? "</div>" : "", "</div>", '<div class="joms-js--step2 joms-popup__hide">', '<div class="joms-popup__content"></div>', '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-back2"></button>', '<button class="joms-button--primary joms-button--small joms-js--button-next2"></button>', "</div>", "</div>", '<div class="joms-js--step3 joms-popup__hide">', '<div class="joms-popup__content joms-popup__content--single"></div>', '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-back3"></button>', "</div>", "</div>", "</div>"].join("")
		}
		var m,
		n,
		o;
		return function () {
			joms.util.popup.prepare(function (b) {
				a(b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.fbc = b(a, joms.popup.fbc || {}),
		c("popups/fbc", ["popups/fbc.update"], function () {
			return joms.popup.fbc
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.file || (joms.popup.file = {}),
		joms.popup.file.download = d(a, b),
		c("popups/file.download", ["utils/popup"], function () {
			return joms.popup.file.download
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, i, j, k) {
			e && e.off(),
			d = b,
			f = i,
			g = j,
			h = k,
			joms.ajax({
				func : "files,ajaxFileDownload",
				data : [f, g],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.updateItemHTML(),
					b.url && (d.close(), a.open(h))
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.message || a.error, "</div>", "</div>"].join("")
		}
		var d,
		e,
		f,
		g,
		h;
		return function (a, c, d) {
			joms.util.popup.prepare(function (e) {
				b(e, a, c, d)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.file || (joms.popup.file = {}),
		joms.popup.file.list = d(a, b),
		c("popups/file.list", ["utils/loadlib", "utils/popup"], function () {
			return joms.popup.file.list
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			i && i.off(),
			h = a,
			j = b,
			k = c,
			joms.ajax({
				func : "files,ajaxviewMore",
				data : [j, k],
				callback : function (a) {
					h.items[0] = {
						type : "inline",
						src : g(a)
					},
					h.updateItemHTML(),
					i = h.contentContainer,
					o = i.find(".joms-js--btn-loadmore"),
					i.on("click", ".joms-js--tab-bar a", e),
					i.on("click", ".joms-js--btn-loadmore", f),
					l = !1,
					i.find(".joms-js--tab-bar a.active").trigger("click")
				}
			})
		}
		function d(a, b) {
			joms.ajax({
				func : "files,ajaxgetFileList",
				data : [a, k, m, 4, j],
				callback : function (a) {
					b(a)
				}
			})
		}
		function e() {
			var c = b(this),
			e = c.data("id");
			l !== e && (l = e, n = i.find(".joms-js--tab-" + e), c.addClass("active").siblings().removeClass("active"), o.css({
					visibility : "hidden"
				}), n.empty().show().siblings(".joms-js--tab").hide(), m = 0, d(l, function (b) {
					n.html(b.html),
					b.next && b.count ? (m = b.next, o.css({
							visibility : "visible"
						}), o.html(a.joms_lang.COM_COMMUNITY_FILES_LOAD_MORE + " (" + b.count + ")")) : o.css({
						visibility : "hidden"
					})
				}))
		}
		function f() {
			d(l, function (b) {
				n.append(b.html),
				n[0].scrollTop = n[0].scrollHeight,
				b.next && b.count ? (m = b.next, o.css({
						visibility : "visible"
					}), o.html(a.joms_lang.COM_COMMUNITY_FILES_LOAD_MORE + " (" + b.count + ")")) : o.css({
					visibility : "hidden"
				})
			})
		}
		function g(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--600">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", a.html, "</div>"].join("")
		}
		var h,
		i,
		j,
		k,
		l,
		m,
		n,
		o;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.file || (joms.popup.file = {}),
		joms.popup.file.remove = d(a, b),
		c("popups/file.remove", ["utils/popup"], function () {
			return joms.popup.file.remove
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			a.items[0] = {
				type : "inline",
				src : e(b)
			},
			a.updateItemHTML()
		}
		function d(a, d) {
			f = a,
			g = d,
			joms.ajax({
				func : "files,ajaxDeleteFile",
				data : [f, g],
				callback : function (a) {
					return a.success ? void b(".joms-js--file-" + g).remove() : void joms.util.popup.prepare(function (b) {
						c(b, a)
					})
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button> &nbsp; </div>', '<div class="joms-popup__content joms-popup__content--single">', a.message || a.error, "</div>", "</div>"].join("")
		}
		var f,
		g;
		return function (a, b) {
			d(a, b)
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.file || (joms.popup.file = {}),
		joms.popup.file.upload = d(a, b),
		c("popups/file.upload", ["utils/loadlib", "utils/popup"], function () {
			return joms.popup.file.upload
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(b, c, f) {
			n && n.off(),
			m = b,
			o = c,
			p = f,
			joms.ajax({
				func : "files,ajaxFileUploadForm",
				data : [o, p],
				callback : function (b) {
					m.items[0] = {
						type : "inline",
						src : l(b)
					},
					m.updateItemHTML(),
					m.st.callbacks || (m.st.callbacks = {}),
					m.st.callbacks.close = function () {
						u && a.location.reload()
					},
					n = m.contentContainer,
					u = !1,
					t = n.find(".joms-js--upload-preview"),
					n.on("click", ".joms-js--btn-add", d),
					n.on("click", ".joms-js--btn-upload", h),
					n.on("click", ".joms-js--btn-done", function () {
						u && a.location.reload()
					}),
					e()
				}
			})
		}
		function d() {
			e(function () {
				s.click()
			})
		}
		function e(c) {
			return "function" != typeof c && (c = function () {}),
			q ? void c() : (r = n.find("input[name=url]").val(), void joms.util.loadLib("plupload", function () {
					var d,
					e;
					d = b('<div id="joms-js--file-uploader" style="width:1px; height:1px; overflow:hidden">').appendTo(document.body),
					e = b('<button id="joms-js--file-uploader-button">').appendTo(d),
					q = new a.plupload.Uploader({
							url : r,
							container : "joms-js--file-uploader",
							browse_button : "joms-js--file-uploader-button",
							runtimes : "html5,html4",
							filters : [{
									title : "Document files",
									extensions : n.find("input[name=filetype]").val()
								}
							],
							max_file_size : n.find("input[name=maxfilesize]").val() + "mb"
						}),
					q.bind("FilesAdded", f),
					q.bind("Error", g),
					q.bind("UploadProgress", i),
					q.bind("FileUploaded", j),
					q.bind("uploadComplete", k),
					q.init(),
					s = d.find("input[type=file]"),
					c()
				}))
		}
		function f(a, b) {
			var c,
			d = "";
			for (c = 0; c < b.length; c++)
				d += '<div class="joms-file--' + b[c].id + '" style="margin-bottom:5px">', d += "<div><strong>" + b[c].name + "</strong> <span>(" + Math.round(b[c].size / 1024) + " KB)</span></div>", d += '<div class="joms-progressbar"><div class="joms-progressbar__progress" style="width:0%"></div></div>', d += "</div>";
			t.find(".joms-js--upload-placeholder").remove(),
			t.append(d),
			n.find(".joms-js--btn-add").html(n.find(".joms-js--btn-add").data("lang-more")).css({
				visibility : "visible"
			}),
			n.find(".joms-js--btn-upload").show(),
			n.find(".joms-js--btn-done").hide()
		}
		function g(b, c) {
			t.find(".joms-file--" + c.file.id).remove(),
			a.alert(c.message + " (" + c.code + ")")
		}
		function h() {
			n.find(".joms-js--btn-add").css({
				visibility : "hidden"
			}),
			n.find(".joms-js--btn-upload").hide(),
			n.find(".joms-js--btn-done").hide(),
			q.settings.url = r + "?type=" + o + "&id=" + p,
			q.refresh(),
			q.start()
		}
		function i(a, b) {
			var c,
			d;
			c = Math.min(100, Math.floor(b.loaded / b.size * 100)),
			d = n.find(".joms-file--" + b.id),
			d = d.find(".joms-progressbar__progress"),
			d.stop().animate({
				width : c + "%"
			})
		}
		function j(b, c, d) {
			var e,
			f = {};
			try {
				f = JSON.parse(d.response)
			} catch (g) {}

			return f.error ? (q.stop(), n.find(".joms-js--btn-add").css({
					visibility : "hidden"
				}), n.find(".joms-js--btn-upload").hide(), n.find(".joms-js--btn-done").show(), n.find(".joms-file--" + c.id).nextAll().andSelf().remove(), void a.alert(f.msg)) : void(f.msg ? (e = n.find(".joms-file--" + c.id), e.css({
						color : "#F00"
					})) : f.id && (u = !0))
		}
		function k() {
			n.find(".joms-js--btn-add").css({
				visibility : "visible"
			}),
			n.find(".joms-js--btn-upload").hide(),
			n.find(".joms-js--btn-done").show()
		}
		function l(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", a.html, "</div>"].join("")
		}
		var m,
		n,
		o,
		p,
		q,
		r,
		s,
		t,
		u;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.file = b(a, joms.popup.file || {}),
		c("popups/file", ["popups/file.download", "popups/file.list", "popups/file.remove", "popups/file.upload"], function () {
			return joms.popup.file
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend || (joms.popup.friend = {}),
		joms.popup.friend.add = b(a),
		c("popups/friend.add", ["utils/popup"], function () {
			return joms.popup.friend.add
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "friends,ajaxConnect",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			var a = f.find("textarea").val().replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/&quot;/g, '"');
			joms.ajax({
				func : "friends,ajaxSaveFriend",
				data : [[["msg", a], ["userid", g]]],
				callback : function (a) {
					var b = f.find("[data-ui-object=popup-step-1]"),
					c = f.find("[data-ui-object=popup-step-2]");
					a.error || (e.st.callbacks || (e.st.callbacks = {}), e.st.callbacks.close = function () {
						window.location.reload()
					}),
					c.find("[data-ui-object=popup-message]").html(a.error || a.message),
					b.hide(),
					c.show()
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", '<div class="joms-popup__content">', '<div class="joms-stream__header" style="padding:0">', '<div class="joms-avatar--stream"><img src="', a.avatar, '"></div>', '<div class="joms-stream__meta"><span>', a.desc, "</span></div>", "</div>", "</div>", '<div class="joms-popup__content">', '<textarea class="joms-textarea" style="margin:0">', a.message, "</textarea>", "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnCancel, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnAdd, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend || (joms.popup.friend = {}),
		joms.popup.friend.addCancel = b(a),
		c("popups/friend.addcancel", ["utils/popup"], function () {
			return joms.popup.friend.addCancel
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "friends,ajaxCancelRequest",
				data : [g, window.location.href],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend || (joms.popup.friend = {}),
		joms.popup.friend.approve = d(a, b),
		c("popups/friend.approve", ["utils/popup", "functions/notification"], function () {
			return joms.popup.friend.approve
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a) {
			f = a,
			joms.ajax({
				func : "friends,ajaxApproveRequest",
				data : [f],
				callback : function (a) {
					return a.success ? void d(a) : void joms.util.popup.prepare(function (b) {
						b.items[0] = {
							type : "inline",
							src : e(a)
						},
						b.updateItemHTML()
					})
				}
			})
		}
		function d(a) {
			b(".joms-js--frequest-msg-" + f).html(a.message),
			b(".joms-js--frequest-btn-" + f).remove(),
			joms.fn.notification.updateCounter("frequest", f, -1)
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.error || a.message, "</div>", "</div>"].join("")
		}
		var f;
		return function (a) {
			c(a)
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend || (joms.popup.friend = {}),
		joms.popup.friend.reject = d(a, b),
		c("popups/friend.reject", ["utils/popup", "functions/notification"], function () {
			return joms.popup.friend.reject
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a) {
			f = a,
			joms.ajax({
				func : "friends,ajaxRejectRequest",
				data : [f],
				callback : function (a) {
					return a.success ? void d(a) : void joms.util.popup.prepare(function (b) {
						b.items[0] = {
							type : "inline",
							src : e(a)
						},
						b.updateItemHTML()
					})
				}
			})
		}
		function d(a) {
			b(".joms-js--frequest-msg-" + f).html(a.message),
			b(".joms-js--frequest-btn-" + f).remove(),
			joms.fn.notification.updateCounter("frequest", f, -1)
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.error || a.message, "</div>", "</div>"].join("")
		}
		var f;
		return function (a) {
			c(a)
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend || (joms.popup.friend = {}),
		joms.popup.friend.remove = d(a, b),
		c("popups/friend.remove", ["utils/popup"], function () {
			return joms.popup.friend.remove
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(b, c) {
			h && h.off(),
			g = b,
			i = c,
			joms.ajax({
				func : "friends,ajaxConfirmFriendRemoval",
				data : [i],
				callback : function (b) {
					g.items[0] = {
						type : "inline",
						src : f(b)
					},
					g.st.callbacks || (g.st.callbacks = {}),
					g.st.callbacks.close = function () {
						a.location.reload()
					},
					g.updateItemHTML(),
					h = g.contentContainer,
					h.on("click", "[data-ui-object=popup-button-cancel]", d),
					h.on("click", "[data-ui-object=popup-button-save]", e)
				}
			})
		}
		function d() {
			h.off(),
			g.close()
		}
		function e() {
			var a,
			c = h.find("input[type=checkbox]");
			a = c[0].checked ? "friends,ajaxBlockFriend" : "friends,ajaxRemoveFriend",
			joms.ajax({
				func : a,
				data : [i],
				callback : function (a) {
					var c = h.find("[data-ui-object=popup-step-1]"),
					d = h.find("[data-ui-object=popup-step-2]");
					d.find("[data-ui-object=popup-message]").html(a.error || a.message),
					c.hide(),
					d.show(),
					a && a.success && b("#friend-" + i).remove()
				}
			})
		}
		function f(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", '<div class="joms-popup__content">', a.html || "", "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var g,
		h,
		i;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend || (joms.popup.friend = {}),
		joms.popup.friend.response = b(a),
		c("popups/friend.response", ["utils/popup", "functions/notification"], function () {
			return joms.popup.friend.response
		})
	}
	(window, function () {
		function a(a, d) {
			g && g.off(),
			f = a,
			h = d,
			joms.ajax({
				func : "friends,ajaxConnect",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					i = a.connection_id,
					g = f.contentContainer,
					g.on("click", ".joms-js--button-cancel", b),
					g.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			joms.ajax({
				func : "friends,ajaxRejectRequest",
				data : [i],
				callback : function (a) {
					d(a)
				}
			})
		}
		function c() {
			joms.ajax({
				func : "friends,ajaxApproveRequest",
				data : [i],
				callback : function (a) {
					d(a)
				}
			})
		}
		function d(a) {
			var b = g.find(".joms-js--step1"),
			c = g.find(".joms-js--step2");
			a.error || (f.st.callbacks || (f.st.callbacks = {}), f.st.callbacks.close = function () {
				window.location.reload()
			}),
			c.find(".joms-popup__content").html(a.error || a.message),
			b.hide(),
			c.show()
		}
		function e(a) {
			var b = !1;
			return a || (a = {}),
			a.error && !a.desc && (b = a.error),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', b ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content">', '<div class="joms-stream__header" style="padding:0">', '<div class="joms-avatar--stream"><img src="', a.avatar, '"></div>', '<div class="joms-stream__meta"><span>', a.desc, "</span></div>", "</div>", "</div>", '<div class="joms-popup__content">', '<div class="cStream-Quote">', a.message, "</div>", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnReject, "</button>", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnAccept, "</button>", "</div>", "</div>", '<div class="joms-js--step2', b ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', b || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h,
		i;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.friend = b(a, joms.popup.friend || {}),
		c("popups/friend", ["popups/friend.add", "popups/friend.addcancel", "popups/friend.approve", "popups/friend.reject", "popups/friend.remove", "popups/friend.response"], function () {
			return joms.popup.friend
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group["delete"] = b(a),
		c("popups/group.delete", ["utils/popup"], function () {
			return joms.popup.group["delete"]
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "groups,ajaxWarnGroupDeletion",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c(a, b) {
			joms.ajax({
				func : "groups,ajaxDeleteGroup",
				data : [g, b || 1],
				callback : function (a) {
					var b;
					f.find(".joms-js--step1").hide(),
					f.find(".joms-js--step2").show().children().first().append("<div>" + (a.error || a.message) + "</div>"),
					a.next ? c(null, a.next) : a.redirect && (b = f.find(".joms-js--step2"), b.find(".joms-js--button-done").html(a.btnDone).on("click", function () {
							window.location = a.redirect
						}), b.find(".joms-popup__action").show(), b.find(".joms-popup__content").removeClass("joms-popup__content--single"))
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnDelete, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", '<div class="joms-popup__action joms-popup__hide">', '<button class="joms-button--primary joms-js--button-done"></button>', "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.invite = d(a, b),
		c("popups/group.invite", ["utils/popup"], function () {
			return joms.popup.group.invite
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			m && m.off(),
			l = a,
			r = b,
			u = 200,
			joms.ajax({
				func : "system,ajaxShowInvitationForm",
				data : [null, "", r, 1, 1],
				callback : function (a) {
					l.items[0] = {
						type : "inline",
						src : k(a)
					},
					l.updateItemHTML(),
					a.limit && (u = +a.limit),
					m = l.contentContainer,
					n = m.find(".joms-tab__content").eq(0),
					o = m.find(".joms-tab__content").eq(1),
					p = m.find("[data-btn-select]"),
					q = m.find("[data-btn-load]"),
					m.on("keyup", "[data-search]", d),
					m.on("click", ".joms-tab__bar a", f),
					m.on("click", "[data-btn-select]", g),
					m.on("click", "[data-btn-load]", h),
					m.on("click", "[data-btn-save]", e),
					m.on("click", "input[type=checkbox]", i),
					j("")
				}
			})
		}
		function d(a) {
			var c = b(a.currentTarget);
			j(c.val())
		}
		function e() {
			var a,
			b = "",
			c = o.find("input[type=checkbox]"),
			d = [],
			e = m.find("input[name=emails]").val() || "",
			f = m.find("[name=message]").val() || "",
			g = /^\s+|\s+$/g;
			c.each(function () {
				d.push(this.value)
			}),
			e = e.replace(g, ""),
			f = f.replace(g, ""),
			a = [["friendsearch", b], ["emails", e], ["message", f], ["friends", d.join(",")]],
			joms.ajax({
				func : "system,ajaxSubmitInvitation",
				data : ["groups,inviteUsers", r, a],
				callback : function () {
					m.off(),
					l.close()
				}
			})
		}
		function f(c) {
			var d = b(c.target),
			e = "#joms-popup-tab-selected" === d.attr("href"),
			f = a.joms_lang[e ? "COM_COMMUNITY_UNSELECT_ALL" : "COM_COMMUNITY_SELECT_ALL"];
			p.html(f)
		}
		function g() {
			var a,
			c = b(".joms-tab__content:visible");
			return "joms-popup-tab-selected" === c.attr("id") ? (c.find(".joms-js--friend").remove(), void m.find("input[type=checkbox]").each(function () {
					this.checked = !1
				})) : (a = c.find(".joms-js--friend").clone(), a.find("input[type=checkbox]").add(c.find("input[type=checkbox]")).prop("checked", "checked"), c = m.find("#joms-popup-tab-selected"), void c.html(a))
		}
		function h() {
			j()
		}
		function i(a) {
			var c,
			d,
			e = b(a.target),
			f = e.closest(".joms-tab__content");
			return "joms-popup-tab-selected" === f.attr("id") ? (c = e[0].value, e.closest(".joms-js--friend").remove(), void(m.find(".joms-js--friend-" + c + " input[type=checkbox]")[0].checked = !1)) : e[0].checked ? (f = m.find("#joms-popup-tab-selected"), d = e.closest(".joms-js--friend").clone(), e = d.find("input[type=checkbox]"), e[0].checked = !0, void f.append(d)) : (c = e[0].value, void m.find("#joms-popup-tab-selected .joms-js--friend-" + c).remove())
		}
		function j(c) {
			var d = "string" == typeof c;
			d ? (n.empty(), t = 0, s = c) : t += u,
			v && v.abort(),
			v = joms.ajax({
					func : "system,ajaxLoadFriendsList",
					data : [s, "groups,inviteUsers", r, t, u],
					callback : function (c) {
						var e;
						c.html && (e = b(b.trim(c.html)), e.each(function () {
								var a = b(this).find(":checkbox"),
								c = a.val();
								o.find(":checkbox[value=" + c + "]").length && (a[0].checked = !0)
							}), n.append(e)),
						d || (n[0].scrollTop = n[0].scrollHeight),
						c.loadMore ? (p.css({
								width : "49%",
								marginRight : "2%"
							}), q.css({
								width : "49%"
							}).html(a.joms_lang.COM_COMMUNITY_INVITE_LOAD_MORE + " (" + c.moreCount + ")").show()) : (q.hide(), p.css({
								width : "100%",
								marginRight : "0"
							}))
					}
				})
		}
		function k(a) {
			return ['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--primary" data-btn-save="1">', a.btnInvite, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var l,
		m,
		n,
		o,
		p,
		q,
		r,
		s,
		t,
		u,
		v;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.join = d(a, b),
		c("popups/group.join", ["utils/popup"], function () {
			return joms.popup.group.join
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, f) {
			d && d.off(),
			c = b,
			e = f,
			joms.ajax({
				func : "groups,ajaxJoinGroup",
				data : [e],
				callback : function () {
					a.location.reload()
				}
			})
		}
		var c,
		d,
		e;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.leave = d(a, b),
		c("popups/group.leave", ["utils/popup"], function () {
			return joms.popup.group.leave
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "groups,ajaxShowLeaveGroup",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.addFeatured = d(a, b),
		c("popups/group.addfeatured", ["utils/popup"], function () {
			return joms.popup.group.addFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "groups,ajaxAddFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.removeFeatured = d(a, b),
		c("popups/group.removefeatured", ["utils/popup"], function () {
			return joms.popup.group.removeFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "groups,ajaxRemoveFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.report = b(a),
		c("popups/group.report", ["utils/popup"], function () {
			return joms.popup.group.report
		})
	}
	(window, function () {
		function a(a, i) {
			g && g.off(),
			f = a,
			h = i,
			joms.ajax({
				func : "system,ajaxReport",
				data : [],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("change", "select", b),
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function b(a) {
			g.find("textarea").val(a.target.value)
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			var a,
			b = /^\s+|\s+$/g;
			return a = g.find("textarea").val(),
			(a = a.replace(b, "")) ? (g.find(".joms-js--error").hide(), void joms.ajax({
					func : "system,ajaxSendReport",
					data : ["groups,reportGroup", window.location.href, a, h],
					callback : function (a) {
						g.find(".joms-js--step1").hide(),
						g.find(".joms-js--step2").show().children().html(a.error || a.message)
					}
				})) : void g.find(".joms-js--error").show()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', a.html, '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.unpublish = b(a),
		c("popups/group.unpublish", ["utils/popup"], function () {
			return joms.popup.group.unpublish
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "groups,ajaxShowUnpublishGroup",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form")[0].submit()
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>"].join("");

		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.approve = d(a, b),
		c("popups/group.approve", ["functions/notification"], function () {
			return joms.popup.group.approve
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c) {
			d = a,
			e = c,
			joms.ajax({
				func : "groups,ajaxApproveMember",
				data : [e, d],
				callback : function (a) {
					a && (b(".joms-js--request-buttons-group-" + d + "-" + e).remove(), b(".joms-js--request-notice-group-" + d + "-" + e).html(a.message || a.error), a.success && joms.fn.notification.updateCounter("general", d, -1))
				}
			})
		}
		var d,
		e;
		return function (a, b) {
			c(a, b)
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.removeMember = d(a, b),
		c("popups/group.removemember", ["utils/popup", "functions/notification"], function () {
			return joms.popup.group.removeMember
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			h && h.off(),
			g = a,
			i = b,
			j = c,
			joms.ajax({
				func : "groups,ajaxConfirmMemberRemoval",
				data : [j, i],
				callback : function (a) {
					g.items[0] = {
						type : "inline",
						src : f(a)
					},
					g.updateItemHTML(),
					h = g.contentContainer,
					h.on("click", ".joms-js--button-cancel", d),
					h.on("click", ".joms-js--button-save", e)
				}
			})
		}
		function d() {
			h.off(),
			g.close()
		}
		function e() {
			var a = h.find("input:checkbox"),
			c = a[0].checked ? "groups,ajaxBanMember" : "groups,ajaxRemoveMember",
			d = [j, i];
			joms.ajax({
				func : c,
				data : d,
				callback : function (a) {
					h.find(".joms-js--step1").hide(),
					h.find(".joms-js--step2").show().children().append(a.error || a.message),
					a.success && (b(".joms-js--member-group-" + i + "-" + j).remove(), b(".joms-js--request-buttons-group-" + i + "-" + j).remove(), b(".joms-js--request-notice-group-" + i + "-" + j).html(a && a.message || ""), joms.fn.notification.updateCounter("general", i, -1))
				}
			})
		}
		function f(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var g,
		h,
		i,
		j;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.banMember = d(a, b),
		c("popups/group.banmember", ["utils/popup"], function () {
			return joms.popup.group.banMember
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, h, i) {
			e && e.off(),
			d = b,
			f = h,
			g = i,
			joms.ajax({
				func : "groups,ajaxBanMember",
				data : [g, f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.updateItemHTML(),
					b.success && (d.st.callbacks || (d.st.callbacks = {}), d.st.callbacks.close = function () {
						a.location.reload()
					})
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title || "", "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.message || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f,
		g;
		return function (a, c) {
			joms.util.popup.prepare(function (d) {
				b(d, a, c)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.group || (joms.popup.group = {}),
		joms.popup.group.unbanMember = d(a, b),
		c("popups/group.unbanmember", ["utils/popup"], function () {
			return joms.popup.group.unbanMember
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, h, i) {
			e && e.off(),
			d = b,
			f = h,
			g = i,
			joms.ajax({
				func : "groups,ajaxUnbanMember",
				data : [g, f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.updateItemHTML(),
					b.success && (d.st.callbacks || (d.st.callbacks = {}), d.st.callbacks.close = function () {
						a.location.reload()
					})
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title || "", "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.message || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f,
		g;
		return function (a, c) {
			joms.util.popup.prepare(function (d) {
				b(d, a, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.group = b(a, joms.popup.group || {}),
		c("popups/group", ["popups/group.delete", "popups/group.invite", "popups/group.join", "popups/group.leave", "popups/group.addfeatured", "popups/group.removefeatured", "popups/group.report", "popups/group.unpublish", "popups/group.approve", "popups/group.removemember", "popups/group.banmember", "popups/group.unbanmember"], function () {
			return joms.popup.group
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.inbox || (joms.popup.inbox = {}),
		joms.popup.inbox.addRecipient = d(a, b),
		c("popups/inbox.addrecipient", ["utils/popup"], function () {
			return joms.popup.inbox.addRecipient
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			m && m.off(),
			l = a,
			r = b,
			u = 200,
			joms.ajax({
				func : "system,ajaxShowFriendsForm",
				data : [null, "", r, 1, 1],
				callback : function (a) {
					l.items[0] = {
						type : "inline",
						src : k(a)
					},
					l.updateItemHTML(),
					a.limit && (u = +a.limit),
					m = l.contentContainer,
					n = m.find(".joms-tab__content").eq(0),
					o = m.find(".joms-tab__content").eq(1),
					p = m.find("[data-btn-select]"),
					q = m.find("[data-btn-load]"),
					m.on("keyup", "[data-search]", d),
					m.on("click", ".joms-tab__bar a", f),
					m.on("click", "[data-btn-select]", g),
					m.on("click", "[data-btn-load]", h),
					m.on("click", "[data-btn-save]", e),
					m.on("click", "input[type=checkbox]", i),
					j("")
				}
			})
		}
		function d(a) {
			var c = b(a.currentTarget);
			j(c.val())
		}
		function e() {
			var a = b("#joms-js--compose-to");
			o.find(".joms-js--friend").each(function () {
				var c = b(this),
				d = c.find(":checkbox"),
				e = d.val();
				a.find(".joms-js--friend-" + e).length || a.append(c.clone())
			}),
			m.off(),
			l.close(),
			a.show()
		}
		function f(c) {
			var d = b(c.target),
			e = "#joms-popup-tab-selected" === d.attr("href"),
			f = a.joms_lang[e ? "COM_COMMUNITY_UNSELECT_ALL" : "COM_COMMUNITY_SELECT_ALL"];
			p.html(f)
		}
		function g() {
			var a,
			c = b(".joms-tab__content:visible");
			return "joms-popup-tab-selected" === c.attr("id") ? (c.find(".joms-js--friend").remove(), void m.find("input[type=checkbox]").each(function () {
					this.checked = !1
				})) : (a = c.find(".joms-js--friend").clone(), a.find("input[type=checkbox]").add(c.find("input[type=checkbox]")).prop("checked", "checked"), c = m.find("#joms-popup-tab-selected"), void c.html(a))
		}
		function h() {
			j()
		}
		function i(a) {
			var c,
			d,
			e = b(a.target),
			f = e.closest(".joms-tab__content");
			return "joms-popup-tab-selected" === f.attr("id") ? (c = e[0].value, e.closest(".joms-js--friend").remove(), void(m.find(".joms-js--friend-" + c + " input[type=checkbox]")[0].checked = !1)) : e[0].checked ? (f = m.find("#joms-popup-tab-selected"), d = e.closest(".joms-js--friend").clone(), e = d.find("input[type=checkbox]"), e[0].checked = !0, void f.append(d)) : (c = e[0].value, void m.find("#joms-popup-tab-selected .joms-js--friend-" + c).remove())
		}
		function j(c) {
			var d = "string" == typeof c;
			d ? (n.empty(), t = 0, s = c) : t += u,
			v && v.abort(),
			v = joms.ajax({
					func : "system,ajaxLoadFriendsList",
					data : [s, "friends,inviteUsers", r, t, u],
					callback : function (c) {
						var e;
						c.html && (e = b(b.trim(c.html)), e.each(function () {
								var a = b(this).find(":checkbox"),
								c = a.val();
								o.find(":checkbox[value=" + c + "]").length && (a[0].checked = !0)
							}), n.append(e)),
						d || (n[0].scrollTop = n[0].scrollHeight),
						c.loadMore ? (p.css({
								width : "49%",
								marginRight : "2%"
							}), q.css({
								width : "49%"
							}).html(a.joms_lang.COM_COMMUNITY_INVITE_LOAD_MORE + " (" + c.moreCount + ")").show()) : (q.hide(), p.css({
								width : "100%",
								marginRight : "0"
							}))
					}
				})
		}
		function k(a) {
			return ['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--primary" data-btn-save="1">', a.btnSelect, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var l,
		m,
		n,
		o,
		p,
		q,
		r,
		s,
		t,
		u,
		v;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.inbox || (joms.popup.inbox = {}),
		joms.popup.inbox.remove = d(a, b),
		c("popups/inbox.remove", ["utils/popup"], function () {
			return joms.popup.inbox.remove
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			var k;
			h && h.off(),
			g = a,
			i = b,
			j = c,
			k = [i],
			j.length || k.push("empty"),
			joms.ajax({
				func : "inbox,ajaxDeleteMessages",
				data : k,
				callback : function (a) {
					g.items[0] = {
						type : "inline",
						src : f(a)
					},
					g.updateItemHTML(),
					h = g.contentContainer,
					h.on("click", ".joms-js--button-cancel", d),
					h.on("click", ".joms-js--button-save", e)
				}
			})
		}
		function d() {
			h.off(),
			g.close()
		}
		function e() {
			joms.ajax({
				func : "inbox" === i ? "inbox,ajaxRemoveFullMessages" : "inbox,ajaxRemoveSentMessages",
				data : [j.join(",")],
				callback : function (a) {
					var c;
					if (h.find(".joms-js--step1").hide(), h.find(".joms-js--step2").show().children().html(a.error || a.message), a.success) {
						for (b(".joms-js--message-checkall")[0].checked = !1, c = 0; c < j.length; c++)
							b(".joms-js--message-item-" + j[c]).remove();
						b(".joms-js--message-item").length || b(".joms-js--message-ct").remove()
					}
				}
			})
		}
		function f(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1 ', a.error ? "joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html || "", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2 ', a.error ? "" : "joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var g,
		h,
		i,
		j;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.inbox || (joms.popup.inbox = {}),
		joms.popup.inbox.setRead = d(a, b),
		c("popups/inbox.setread", ["utils/popup"], function () {
			return joms.popup.inbox.setRead
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, d) {
			var e;
			if (!b.length)
				return void joms.util.popup.prepare(function (a) {
					a.items[0] = {
						type : "inline",
						src : c({
							error : d
						})
					},
					a.updateItemHTML()
				});
			for (e = 0; e < b.length; e++)
				a.jax.call("community", "inbox,ajaxMarkMessageAsRead", b[e])
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title || "", "</div>", '<div class="joms-js--step1 ', a.error ? "joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html || "", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2 ', a.error ? "" : "joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		return function (a, c) {
			b(a, c)
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.inbox || (joms.popup.inbox = {}),
		joms.popup.inbox.setUnread = d(a, b),
		c("popups/inbox.setunread", ["utils/popup"], function () {
			return joms.popup.inbox.setUnread
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, d) {
			var e;
			if (!b.length)
				return void joms.util.popup.prepare(function (a) {
					a.items[0] = {
						type : "inline",
						src : c({
							error : d
						})
					},
					a.updateItemHTML()
				});
			for (e = 0; e < b.length; e++)
				a.jax.call("community", "inbox,ajaxMarkMessageAsUnread", b[e])
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title || "", "</div>", '<div class="joms-js--step1 ', a.error ? "joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html || "", "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2 ', a.error ? "" : "joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		return function (a, c) {
			b(a, c)
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.inbox = b(a, joms.popup.inbox || {}),
		c("popups/inbox", ["popups/inbox.addrecipient", "popups/inbox.remove", "popups/inbox.setread", "popups/inbox.setunread"], function () {
			return joms.popup.inbox
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.location || (joms.popup.location = {}),
		joms.popup.location.view = b(a),
		c("popups/location.view", ["utils/popup"], function () {
			return joms.popup.location.view
		})
	}
	(window, function () {
		function a(a, f) {
			d && d.off(),
			c = a,
			e = f,
			joms.ajax({
				func : "activities,ajaxShowMap",
				data : [e],
				callback : function (a) {
					c.items[0] = {
						type : "inline",
						src : b(a)
					},
					c.updateItemHTML(),
					d = c.contentContainer
				}
			})
		}
		function b(a) {
			var b,
			c,
			d;
			return a || (a = {}),
			b = a.latitude + "," + a.longitude,
			c = a.location,
			d = "//maps.googleapis.com/maps/api/staticmap?center=" + b + "&markers=color:red%7Clabel:S%7C" + b + "&zoom=14&size=600x350&maptype=roadmap",
			['<div class="joms-popup joms-popup--location-view">', "<div", a.error ? ' class="joms-popup__hide"' : "", ">", '<a href="//www.google.com/maps/@', b, ',19z" target="_blank">', '<img src="', d, '">', "</a>", "</div>", "<div", a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single">', a.error, "</div>", "</div>", "</div>"].join("")
		}
		var c,
		d,
		e;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.location = b(a, joms.popup.location || {}),
		c("popups/location", ["popups/location.view"], function () {
			return joms.popup.location
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.notification || (joms.popup.notification = {}),
		joms.popup.notification.global = b(a),
		c("popups/notification.global", ["utils/popup"], function () {
			return joms.popup.notification.global
		})
	}
	(window, function () {
		function a(a) {
			joms.ajax({
				func : "notification,ajaxGetNotification",
				data : [""],
				callback : function (c) {
					a.items[0] = {
						type : "inline",
						src : b(c)
					},
					a.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title">', a.title || "", "</div>", '<div class="joms-popup__content joms-popup__content--single">', '<ul style="margin: 0; list-style: none;">', a.html || "", "</ul>", "</div>", "</div>"].join("")
		}
		return function () {
			joms.util.popup.prepare(function (b) {
				a(b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.notification || (joms.popup.notification = {}),
		joms.popup.notification.friend = b(a),
		c("popups/notification.friend", ["utils/popup"], function () {
			return joms.popup.notification.friend
		})
	}
	(window, function () {
		function a(a) {
			joms.ajax({
				func : "notification,ajaxGetRequest",
				data : [""],
				callback : function (c) {
					a.items[0] = {
						type : "inline",
						src : b(c)
					},
					a.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title">', a.title || "", "</div>", '<div class="joms-popup__content joms-popup__content--single">', '<ul style="margin: 0; list-style: none;">', a.html || "", "</ul>", "</div>", "</div>"].join("")
		}
		return function () {
			joms.util.popup.prepare(function (b) {
				a(b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.notification || (joms.popup.notification = {}),
		joms.popup.notification.pm = b(a),
		c("popups/notification.pm", ["utils/popup"], function () {
			return joms.popup.notification.pm
		})
	}
	(window, function () {
		function a(a) {
			joms.ajax({
				func : "notification,ajaxGetInbox",
				data : [""],
				callback : function (c) {
					a.items[0] = {
						type : "inline",
						src : b(c)
					},
					a.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title">', a.title || "", "</div>", '<div class="joms-popup__content joms-popup__content--single">', '<ul style="margin: 0; list-style: none;">', a.html || "", "</ul>", "</div>", "</div>"].join("")
		}
		return function () {
			joms.util.popup.prepare(function (b) {
				a(b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.notification = b(a, joms.popup.notification || {}),
		c("popups/notification", ["popups/notification.global", "popups/notification.friend", "popups/notification.pm"], function () {
			return joms.popup.notification
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.phototag = c(a, b)
	}
	(window, joms.jQuery, function (a, b, c) {
		function d(a, c) {
			var d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
			m,
			n,
			o,
			p,
			r = ".joms-phototag__tags",
			s = ".joms-phototag__tag";
			if (b(r).remove(), c && c.length)
				for (q = b(a), g = q.position(), h = g.top, i = g.left, j = q.width(), o = q.height(), d = b("<div class=" + r.substr(1) + "></div>"), d.css({
						top : h,
						left : i,
						width : j,
						height : o
					}), d.insertAfter(q), p = 0; p < c.length; p++)
					f = c[p], k = Math.round(o * f.top), l = Math.round(j * f.left), m = Math.round(j * f.width), n = Math.round(o * f.height), n = m = Math.max(10, Math.min(m, n)), e = b("<div class=" + s.substr(1) + "><span>" + f.displayName + "</span></div>"), e.css({
						top : k + "px",
						left : l + "px",
						width : m + "px",
						height : n + "px"
					}), e.appendTo(d)
		}
		function e(d, e, i) {
			var j,
			l,
			v,
			w,
			x,
			y,
			z;
			h(),
			b(".joms-phototag__tags").hide(),
			o = b(n()),
			p = o.find(".joms-phototag"),
			q = b(d.target),
			r = c,
			s = {},
			y = q.width(),
			z = q.height(),
			j = q.offset(),
			l = q.parent().offset(),
			w = j.top - l.top,
			x = j.left - l.left,
			t = e || [],
			u = "page" !== i ? !0 : !1,
			p.css({
				top : 0,
				left : 0
			}),
			o.css({
				top : w,
				left : x,
				width : y,
				height : z
			}),
			o.insertAfter(q),
			v = k(d),
			p.css({
				top : v.top,
				left : v.left
			}),
			p.on("keyup", "input", f),
			p.on("click", "a[data-id]", g),
			p.on("click", "button", h),
			p.on("click", function (a) {
				a.stopPropagation()
			}),
			o.on("click", m),
			f(),
			joms.mobile || b(a).on("resize.phototag", h)
		}
		function f(c) {
			var d,
			e,
			f,
			g;
			r || (r = a.joms_friends || []),
			d = b(c ? c.currentTarget : p.find("input")),
			e = d.val().replace(/^\s+|\s+$/g, "").toLowerCase(),
			f = r,
			f = joms._.filter(r, function (a) {
					return a && a.name ? t && t.indexOf(a.id + "") >= 0 ? !1 : e && a.name.toLowerCase().indexOf(e) < 0 ? !1 : !0 : !1
				}),
			f = f.slice(0, 8),
			f = joms._.map(f, function (a) {
					return '<a href="javascript:" data-id="' + a.id + '">' + a.name + "</a>"
				}),
			f.length ? v = !1 : (f = ["<span><em>No result found.</em></span>"], v = !0),
			g = p.find(".joms-phototag__autocomplete"),
			g.html(f.join("")),
			g.append('<div><button class="joms-button--neutral joms-button--small joms-button--full">' + a.joms_lang.COM_COMMUNITY_PHOTO_DONE_TAGGING + "</button></div>"),
			g.show()
		}
		function g(a) {
			var c,
			d = p.find(".joms-phototag__autocomplete"),
			e = b(a.currentTarget),
			g = e.data("id") || "";
			a.stopPropagation(),
			d.hide(),
			s && s.tagAdded && (t || (t = []), t.push(g + ""), c = l(), s.tagAdded(g, c.left, c.top, c.width, c.height), f())
		}
		function h() {
			b(".joms-phototag__tags").show(),
			p && (p.remove(), o.remove(), b(a).off("resize.phototag"), p = c, q = c, s && s.destroy && s.destroy(), s = c)
		}
		function i(a, b) {
			s[a] = b
		}
		function j(a) {
			a ? s[a] && (s[a] = c) : s = {}

		}
		function k(a) {
			var b,
			c,
			d,
			e = q.height(),
			f = q.width();
			return u ? (d = a.clientY - 45 - a.target.offsetTop - 43, c = a.clientX - 45 - a.target.offsetLeft - 43) : (b = q.offset(), d = a.pageY - b.top - 43, c = a.pageX - b.left - 43),
			d = Math.max(0, Math.min(d, e - 86)),
			c = Math.max(0, Math.min(c, f - 86)), {
				top : d,
				left : c
			}
		}
		function l() {
			var a,
			b,
			c,
			d,
			e,
			f,
			g;
			return b = o.width(),
			c = o.height(),
			a = p.position(),
			d = p.width(),
			e = p.height(),
			f = a.left,
			g = a.top,
			d /= b,
			e /= c,
			f /= b,
			g /= c, {
				top : g,
				left : f,
				width : d,
				height : e
			}
		}
		function m(a) {
			var b;
			return v ? void h() : (b = k(a), void p.css({
					top : b.top,
					left : b.left
				}))
		}
		function n() {
			return ["<div class=joms-phototag__wrapper>", "<div class=joms-phototag>", "<div class=joms-phototag__input>", '<input type=text placeholder="', a.joms_lang.COM_COMMUNITY_SEARCH, '">', '<div class="joms-phototag__autocomplete"></div>', "</div>", "</div>", "</div>"].join("")
		}
		var o,
		p,
		q,
		r,
		s,
		t,
		u,
		v;
		return {
			populate : d,
			create : e,
			destroy : h,
			on : i,
			off : j
		}
	}),
	c("utils/phototag", function () {}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.open = d(a, b),
		c("popups/photo.open", ["utils/popup", "utils/phototag"], function () {
			return joms.popup.photo.open
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c, d) {
			T && T.off(),
			S = a,
			_ = c,
			aa = d,
			joms.ajax({
				func : "photos,ajaxGetPhotosByAlbum",
				data : [_, aa],
				callback : function (a) {
					a || (a = {}),
					da = a.lang || {},
					ea = a.can_edit || !1,
					fa = a.can_tag || !1,
					ga = a.album_name || "Untitled",
					ha = a.album_url,
					ia = a.photo_url,
					ka = ja = +a.my_id,
					la = ka && +a.my_id === +a.owner_id,
					ma = +a.is_admin,
					na = +a.deleteoriginalphotos ? !1 : !0,
					oa = +a.enablereporting,
					ha && (ga = '<a href="' + ha + '">' + ga + "</a>"),
					S.items[0] = {
						type : "inline",
						src : a.error ? J(a) : I(a)
					},
					S.updateItemHTML(),
					S.close = p,
					T = S.contentContainer,
					a.error || (U = T.find("img"), V = T.find(".joms-spinner"), W = T.find(".joms-popup__optcaption"), X = T.find(".joms-popup__btn-tag-photo"), T.on("click", ".mfp-arrow-left", e), T.on("click", ".mfp-arrow-right", f), T.on("click", ".joms-popup__btn-tag-photo", i), T.on("click", ".joms-popup__btn-comments", o), T.on("click", ".joms-popup__btn-comments .joms-icon", o), T.on("click", ".joms-popup__btn-option", q), T.on("click", ".joms-popup__btn-share", t), T.on("click", ".joms-popup__btn-download", u), T.on("click", ".joms-popup__btn-report", v), T.on("click", ".joms-popup__btn-upload", w), T.on("click", ".joms-popup__btn-cover", x), T.on("click", ".joms-popup__btn-profile", z), T.on("click", ".joms-popup__btn-delete", A), T.on("click", ".joms-popup__btn-like", C), T.on("click", ".joms-popup__btn-dislike", D), T.on("click", ".joms-popup__btn-rotate-left", E), T.on("click", ".joms-popup__btn-rotate-right", F), T.on("mouseleave", ".joms-popup__dropdown--wrapper", r), T.on("click", ".joms-js--more-comments", K), T.on("click", ".joms-js--remove-tag", m), T.on("click", ".joms-js--btn-desc-edit", P), T.on("click", ".joms-js--btn-desc-cancel", Q), T.on("click", ".joms-js--btn-desc-save", R), b(document).off("keyup.photomodal").on("keyup.photomodal", function (a) {
							var b = a.keyCode;
							(37 === b || 39 === b) && (37 === b && ca > 0 ? e() : 39 === b && ca < ba.length - 1 && f())
						}), S.st.callbacks || (S.st.callbacks = {}), S.st.callbacks.close = function () {
						b(document).off("keyup.photomodal")
					}, aa || (aa = a.list[a.index].id), L(aa), g(), h())
				}
			})
		}
		function d(a, c) {
			clearTimeout(pa),
			clearTimeout(qa),
			a.hide(),
			a.removeAttr("src"),
			qa = setTimeout(function () {
					V.show()
				}, 100),
			pa = setTimeout(function () {
					b("<img>").load(function () {
						clearTimeout(qa),
						V.hide(),
						a.attr("src", c),
						a.show()
					}).attr("src", c)
				}, 1)
		}
		function e() {
			ca--,
			0 > ca && (ca = ba.length - 1),
			aa = ba[ca].id,
			d(U, ba[ca].url),
			W.html(ga + ' <span class="joms-popup__optcapindex">' + (ca + 1) + " of " + ba.length + "</span>"),
			l(),
			L(aa),
			g(),
			h()
		}
		function f() {
			ca++,
			ca >= ba.length && (ca = 0),
			aa = ba[ca].id,
			d(U, ba[ca].url),
			W.html(ga + ' <span class="joms-popup__optcapindex">' + (ca + 1) + " of " + ba.length + "</span>"),
			l(),
			L(aa),
			g(),
			h()
		}
		function g() {
			var a = 0 >= ca,
			b = ca >= ba.length - 1;
			T.find(".mfp-arrow-left")[a ? "hide" : "show"](),
			T.find(".mfp-arrow-right")[b ? "hide" : "show"]()
		}
		function h() {
			var a,
			b = 0 >= ca,
			c = ca >= ba.length - 1;
			b || (a = new Image, a.src = ba[ca - 1].url),
			c || (a = new Image, a.src = ba[ca + 1].url)
		}
		function i() {
			return X.data("tagging") ? void l() : (X.data("tagging", 1), T.find(".joms-phototag__tags").hide(), T.children(".joms-popup--photo").addClass("joms-popup--phototag"), U.off("click.phototag").on("click.phototag", j), U.addClass("joms-phototag__image"), void T.find(".joms-popup__btn-tag-photo").html(ua + " " + da.done_tagging))
		}
		function j(a) {
			var b = joms._.map(Y, function (a) {
					return a.userId + ""
				});
			joms.util.phototag.create(a, b),
			joms.util.phototag.on("tagAdded", k),
			joms.util.phototag.on("destroy", function () {
				X.removeData("tagging"),
				T.children(".joms-popup--photo").removeClass("joms-popup--phototag"),
				U.off("click.phototag"),
				U.removeClass("joms-phototag__image"),
				T.find(".joms-popup__btn-tag-photo").html(ua + ' <span class="joms-popup__btn-overlay">' + da.tag_photo + "</span>")
			}),
			T.children(".joms-popup--photo").removeClass("joms-popup--phototag"),
			U.off("click.phototag")
		}
		function k(b, c, d, e, f) {
			joms.ajax({
				func : "photos,ajaxAddPhotoTag",
				data : [aa, b, d, c, e, f],
				callback : function (b) {
					var c,
					d;
					return b.error ? void a.alert(H(b.error)) : void(b.success && (Y.push(b.data), c = T.find(".joms-popup__comment"), d = c.find(".joms-js--tag-info"), d.html(n())))
				}
			})
		}
		function l() {
			joms.util.phototag.destroy()
		}
		function m(c) {
			var d = b(c.currentTarget),
			e = d.data("id");
			joms.ajax({
				func : "photos,ajaxRemovePhotoTag",
				data : [aa, e],
				callback : function (b) {
					var c,
					d,
					f;
					if (b.error)
						return void a.alert(H(b.error));
					if (b.success) {
						for (f = 0; f < Y.length; f++)
							 + e === +Y[f].userId && Y.splice(f--, 1);
						c = T.find(".joms-popup__comment"),
						d = c.find(".joms-js--tag-info"),
						d.html(n())
					}
				}
			})
		}
		function n() {
			var a,
			b,
			c,
			d;
			if (Y && Y.length || (Y = []), joms.util.phototag.populate(U, Y, "page"), !Y.length)
				return "";
			for (a = [], d = 0; d < Y.length; d++)
				b = Y[d], c = '<a href="' + b.profileUrl + '">' + b.displayName + "</a>", b.canRemove && (c += ' (<a href="javascript:" class="joms-js--remove-tag" data-id="' + b.userId + '">' + $ + "</a>)"), a.push(c);
			return a = a.join(", "),
			a = Z + "<br>" + a
		}
		function o(a) {
			a.stopPropagation(),
			T.children(".joms-popup").toggleClass("joms-popup--togglecomment")
		}
		function p() {
			var a = T.children(".joms-popup"),
			c = "joms-popup--togglecomment";
			return a.hasClass(c) ? void a.removeClass(c) : void b.magnificPopup.proto.close.call(this)
		}
		function q(a) {
			var c = b(a.target).closest(".joms-popup__dropdown--wrapper"),
			d = c.children(".joms-popup__dropdown");
			d.toggleClass("joms-popup__dropdown--open")
		}
		function r(a) {
			var c = b(a.target).closest(".joms-popup__dropdown--wrapper"),
			d = c.children(".joms-popup__dropdown");
			d.removeClass("joms-popup__dropdown--open")
		}
		function s(a) {
			var b,
			c = "",
			d = "";
			a || (a = {}),
			c += '<a href="javascript:" class="joms-popup__btn-share">' + da.share + "</a>",
			na && (c += '<a href="javascript:" class="joms-popup__btn-download">' + da.download + "</a>"),
			la || ma ? (c += '<div class="sep"></div>', c += la ? '<a href="javascript:" class="joms-popup__btn-upload">' + da.upload_photos + "</a>" : "", c += la ? '<div class="sep"></div>' : "", c += la ? '<a href="javascript:" class="joms-popup__btn-profile">' + da.set_as_profile_picture + "</a>" : "", c += '<a href="javascript:" class="joms-popup__btn-cover">' + da.set_as_album_cover + "</a>", c += '<a href="javascript:" class="joms-popup__btn-delete">' + da.delete_photo + "</a>", c += '<div class="sep"></div>', c += '<a href="javascript:" class="joms-popup__btn-rotate-left">' + da.rotate_left + "</a>", c += '<a href="javascript:" class="joms-popup__btn-rotate-right">' + da.rotate_right + "</a>") : oa && (c += '<a href="javascript:" class="joms-popup__btn-report">' + da.report + "</a>"),
			c = '<div class="joms-popup__dropdown"><div class="joms-popup__ddcontent">' + c + "</div></div>",
			a && a.like && (d += '<button class="joms-popup__btn-like joms-js--like-photo-' + aa + (a.like.is_liked ? " liked" : "") + '"', d += ' onclick="joms.api.page' + (a.like.is_liked ? "Unlike" : "Like") + "('photo', '" + aa + "');\"", d += ' data-lang="' + (a.like.lang || "Like") + '"', d += ' data-lang-like="' + (a.like.lang_like || "Like") + '"', d += ' data-lang-liked="' + (a.like.lang_liked || "Liked") + '">', d += ta + " ", d += "<span>", d += a.like.is_liked ? a.like.lang_liked : a.like.lang_like, b = +a.like.count, b > 0 && (d += " (" + b + ")"), d += "</span></button>"),
			T.find(".joms-popup__dropdown").replaceWith(c),
			T.find(".joms-popup__btn-like").replaceWith(d)
		}
		function t() {
			joms.api.pageShare(ia.replace("___photo_id___", aa))
		}
		function u() {
			a.open(ba[ca].original)
		}
		function v() {
			joms.api.photoReport(ja, ia.replace("___photo_id___", aa))
		}
		function w() {
			joms.api.photoUpload(_)
		}
		function x() {
			joms.ajax({
				func : "photos,ajaxConfirmDefaultPhoto",
				data : [_, aa],
				callback : function (b) {
					return b.error ? void a.alert(H(b.error)) : void(a.confirm(H(b.message)) && y())
				}
			})
		}
		function y() {
			joms.ajax({
				func : "photos,ajaxSetDefaultPhoto",
				data : [_, aa],
				callback : function (b) {
					a.alert(H(b.error || b.message))
				}
			})
		}
		function z() {
			joms.ajax({
				func : "photos,ajaxLinkToProfile",
				data : [aa],
				callback : function (c) {
					var d,
					e;
					if (c.error)
						return void a.alert(H(c.error));
					if (a.confirm(H(c.message))) {
						c.formParams || (c.formParams = {}),
						d = b('<form method=post action="' + c.formUrl + '" style="width:1px; height:1px; position:absolute"/>');
						for (e in c.formParams)
							d.append('<input type=hidden name="' + e + '" value="' + c.formParams[e] + '"/>');
						d.appendTo(document.body),
						d[0].submit()
					}
				}
			})
		}
		function A() {
			joms.ajax({
				func : "photos,ajaxConfirmRemovePhoto",
				data : [aa],
				callback : function (b) {
					return b.error ? void a.alert(H(b.error)) : void(a.confirm(H(b.message)) && B())
				}
			})
		}
		function B() {
			joms.ajax({
				func : "photos,ajaxRemovePhoto",
				data : [aa],
				callback : function (b) {
					return b.error ? void a.alert(H(b.error)) : (T.off(), S.close(), void a.location.reload())
				}
			})
		}
		function C() {}

		function D() {}

		function E() {
			G("left")
		}
		function F() {
			G("right")
		}
		function G(a) {
			var b = ba[ca] && ba[ca].id;
			b && joms.ajax({
				func : "photos,ajaxRotatePhoto",
				data : [b, a],
				callback : function (a) {
					joms._.extend(ba[ca], a || {}),
					U.attr("src", ba[ca].url)
				}
			})
		}
		function H(a) {
			return a = a.replace(/<\/?[^>]+>/g, "")
		}
		function I(a) {
			var b,
			c,
			d = "";
			return a || (a = {}),
			b = a.error || "",
			c = a.error ? "" : a.commentHtml || "",
			a.error || (ba = a.list || [], ca = a.index || 0, ca = Math.min(ba.length, ca), b = '<img src="' + ba[ca].url + '" data-index="' + ca + '"><div class="joms-spinner" style="display:none"></div>', d = ga + ' <span class="joms-popup__optcapindex">' + (ca + 1) + " of " + ba.length + "</span>"),
			['<div class="joms-popup joms-popup--photo">', '<div class="joms-popup__commentwrapper">', '<div class="joms-popup__content">', ba && ba.length > 1 ? '<button class="mfp-arrow mfp-arrow-left" type="button" title="' + da.prev + '"></button>' : "", ba && ba.length > 1 ? '<button class="mfp-arrow mfp-arrow-right" type="button" title="' + da.next + '"></button>' : "", b, '<div class="joms-popup__option clearfix">', '<div class="joms-popup__optcaption">', d || "Untitled", "</div>", '<div class="joms-popup__optoption">', '<button class="joms-popup__btn-viewalbum" onclick="window.location=\'', ha, "'\">", va, ' <span class="joms-popup__btn-overlay">', da.view_album, "</span></button>", '<button class="joms-popup__btn-comments">', sa, ' <span class="joms-popup__btn-overlay">', da.comments, "</span></button>", '<button class="joms-popup__btn-like"></button>', fa ? '<button class="joms-popup__btn-tag-photo">' + ua + ' <span class="joms-popup__btn-overlay">' + da.tag_photo + "</span></button>" : "", '<div class="joms-popup__dropdown--wrapper"><div class="joms-popup__dropdown"></div><button class="joms-popup__btn-option">', ra, ' <span class="joms-popup__btn-overlay">', da.options, "</span></button></div>", "</div>", "</div>", "</div>", '<div class="joms-popup__comment">', c, "</div>", '<button class="mfp-close" type="button" title="Close (Esc)">×</button>', "</div>", "</div>"].join("")
		}
		function J(a) {
			return a || (a = {}),
			a.title || (a.title = "&nbsp;"),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.error, "</div>", "</div>"].join("")
		}
		function K() {
			L(aa, !0)
		}
		function L(a, c) {
			var d = T.find(".joms-popup__comment");
			c || d.empty(),
			joms.ajax({
				func : "photos,ajaxSwitchPhotoTrigger",
				data : [a, c ? 1 : 0],
				callback : function (a) {
					var e;
					c || a.comments && a.showall && (a.showall = '<div class="joms-comment__more joms-js--more-comments"><a href="javascript:">' + a.showall + "</a></div>", a.comments = b(b.trim(a.comments)), a.comments.prepend(a.showall)),
					c ? d.find(".joms-comment").replaceWith(a.comments) : (d.html(a.head || ""), d.append(a.comments), d.append(a.form || ""), Y = a.tagged || [], Z = a.tagLabel || "", $ = a.tagRemoveLabel || "", d.find(".joms-js--description").html(N(a.description || {})), e = d.find(".joms-js--tag-info"), e.html(n()), d.find(".joms-js--comments,.joms-js--newcomment").find("textarea.joms-textarea"), joms.fn.tagging.initInputbox()),
					s(a),
					M()
				}
			})
		}
		function M() {
			var a = ".joms-js--initialized",
			c = ".joms-js--video",
			d = b(".joms-comment__body,.joms-js--inbox").find(c).not(a);
			d.length && (joms.loadCSS(joms.ASSETS_URL + "vendors/mediaelement/mediaelementplayer.min.css"), d.on("click.joms-video", c + "-play", function () {
					var a = b(this).closest(c);
					joms.util.video.play(a, a.data())
				}), joms.ios && setTimeout(function () {
					d.find(c + "-play").click()
				}, 2e3))
		}
		function N(a) {
			return "object" != typeof a && (a = {}),
			['<div class="joms-js--btn-desc-content">', a.content || "", "</div>", '<div class="joms-js--btn-desc-editor joms-popup__hide">', '<textarea class="joms-textarea" style="margin:0" placeholder="', a.lang_placeholder || "", '">', O(a.content || ""), "</textarea>", '<div style="margin-top:5px;text-align:right">', '<button class="joms-button--neutral joms-button--small joms-js--btn-desc-cancel">', a.lang_cancel || "Cancel", "</button> ", '<button class="joms-button--primary joms-button--small joms-js--btn-desc-save">', a.lang_save || "Save", "</button>", "</div>", "</div>", '<div class="joms-js--btn-desc-edit"', ea ? "" : ' style="display:none"', '><a href="javascript:"', ' data-lang-add="', a.lang_add || "Add description", '"', ' data-lang-edit="', a.lang_edit || "Edit description", '">', a.content ? a.lang_edit : a.lang_add, "</a>", "</div>"].join("")
		}
		function O(a) {
			return a = a || "",
			a = a.replace(/<br\s*\/?>/g, "\n")
		}
		function P() {
			T.find(".joms-js--btn-desc-content").hide(),
			T.find(".joms-js--btn-desc-edit").hide(),
			T.find(".joms-js--btn-desc-editor").show()
		}
		function Q() {
			T.find(".joms-js--btn-desc-editor").hide(),
			T.find(".joms-js--btn-desc-content").show(),
			T.find(".joms-js--btn-desc-edit").show()
		}
		function R() {
			var c = T.find(".joms-js--btn-desc-content"),
			d = T.find(".joms-js--btn-desc-editor"),
			e = T.find(".joms-js--btn-desc-edit"),
			f = d.find("textarea"),
			g = b.trim(f.val());
			joms.ajax({
				func : "photos,ajaxSaveCaption",
				data : [aa, g],
				callback : function (b) {
					var f = e.find("a");
					return b.error ? void a.alert(b.error) : void(b.success && (d.hide(), c.html(b.caption).show(), f.html(f.data("lang-" + (g ? "edit" : "add"))), e.show()))
				}
			})
		}
		var S,
		T,
		U,
		V,
		W,
		X,
		Y,
		Z,
		$,
		_,
		aa,
		ba,
		ca,
		da,
		ea,
		fa,
		ga,
		ha,
		ia,
		ja,
		ka,
		la,
		ma,
		na,
		oa,
		pa,
		qa,
		ra = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-cog"></use></svg>',
		sa = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-bubble"></use></svg>',
		ta = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-thumbs-up"></use></svg>',
		ua = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-tag"></use></svg>',
		va = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-newspaper"></use></svg>';
		return joms._.debounce(function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}, 200)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.remove = d(a, b),
		c("popups/photo.remove", ["utils/popup"], function () {
			return joms.popup.photo.remove
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			h && h.off(),
			g = a,
			i = b,
			joms.ajax({
				func : "photos,ajaxConfirmRemovePhoto",
				data : [i],
				callback : function (a) {
					g.items[0] = {
						type : "inline",
						src : f(a)
					},
					g.updateItemHTML(),
					h = g.contentContainer,
					h.on("click", ".joms-js--button-cancel", d),
					h.on("click", ".joms-js--button-save", e)
				}
			})
		}
		function d() {
			h.off(),
			g.close()
		}
		function e() {
			joms.ajax({
				func : "photos,ajaxRemovePhoto",
				data : [i],
				callback : function (c) {
					var e;
					c.error ? (h.find(".joms-js--step1").hide(), h.find(".joms-js--step2").show().children().html(c.error || c.message)) : (e = b(".joms-js--photo-" + i), e.length && e.siblings().length ? (e.remove(), d()) : a.location.reload())
				}
			})
		}
		function f(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content joms-popup__content--single">', a.message, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var g,
		h,
		i;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.report = b(a),
		c("popups/photo.report", ["utils/popup"], function () {
			return joms.popup.photo.report
		})
	}
	(window, function () {
		function a(a, j, k) {
			g && g.off(),
			f = a,
			h = j,
			i = k,
			joms.ajax({
				func : "system,ajaxReport",
				data : [],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("change", "select", b),
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function b(a) {
			g.find("textarea").val(a.target.value)
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			var a,
			b = /^\s+|\s+$/g;
			return a = g.find("textarea").val(),
			(a = a.replace(b, "")) ? (g.find(".joms-js--error").hide(), void joms.ajax({
					func : "system,ajaxSendReport",
					data : ["photos,reportPhoto", i || window.location.href, a, h],
					callback : function (a) {
						g.find(".joms-js--step1").hide(),
						g.find(".joms-js--step2").show().children().html(a.error || a.message)
					}
				})) : void g.find(".joms-js--error").show()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', a.html, '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h,
		i;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.setAvatar = d(a, b),
		c("popups/photo.setavatar", ["utils/popup"], function () {
			return joms.popup.photo.setAvatar
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			h && h.off(),
			g = a,
			i = b,
			joms.ajax({
				func : "photos,ajaxLinkToProfile",
				data : [i],
				callback : function (a) {
					g.items[0] = {
						type : "inline",
						src : f(a)
					},
					g.updateItemHTML(),
					j = a.formUrl || "",
					k = a.formParams || {},
					h = g.contentContainer,
					h.on("click", ".joms-js--button-cancel", d),
					h.on("click", ".joms-js--button-save", e)
				}
			})
		}
		function d() {
			h.off(),
			g.close()
		}
		function e() {
			var a,
			c = b('<form method=post action="' + j + '" style="width:1px; height:1px; position:absolute"/>');
			for (a in k)
				c.append('<input type=hidden name="' + a + '" value="' + k[a] + '"/>');
			c.appendTo(document.body),
			c[0].submit()
		}
		function f(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.message, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var g,
		h,
		i,
		j,
		k;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.setCover = d(a, b),
		c("popups/photo.setcover", ["utils/popup"], function () {
			return joms.popup.photo.setCover
		})
	}
	(window, joms.jQuery, function () {
		function a(a, i, j) {
			f && f.off(),
			e = a,
			g = i,
			h = j,
			joms.ajax({
				func : "photos,ajaxConfirmDefaultPhoto",
				data : [g, h],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", ".joms-js--button-cancel", b),
					f.on("click", ".joms-js--button-save", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			joms.ajax({
				func : "photos,ajaxSetDefaultPhoto",
				data : [g, h],
				callback : function (a) {
					f.find(".joms-js--step1").hide(),
					f.find(".joms-js--step2").show().children().html(a.error || a.message)
				}
			})
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.message, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g,
		h;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.upload = d(a, b),
		c("popups/photo.upload", ["utils/loadlib", "utils/popup"], function () {
			return joms.popup.photo.upload
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b, c) {
			var f;
			p && p.off(),
			o = a,
			t = b || !1,
			u = c || !1,
			f = [],
			f.push(t || ""),
			f.push(u || ""),
			joms.ajax({
				func : "photos,ajaxUploadPhoto",
				data : f,
				callback : function (a) {
					o.items[0] = {
						type : "inline",
						src : n(a)
					},
					o.updateItemHTML(),
					p = o.contentContainer,
					s = p.find(".joms-gallery"),
					v = [],
					p.on("click", ".joms-js--btn-add", d),
					p.on("click", ".joms-js--btn-view", m),
					e()
				}
			})
		}
		function d() {
			e(function () {
				r.click()
			})
		}
		function e(c) {
			return "function" != typeof c && (c = function () {}),
			q ? void c() : void joms.util.loadLib("plupload", function () {
				var d,
				e;
				d = b('<div id="joms-js--photoupload-uploader" style="width:1px; height:1px; overflow:hidden">').appendTo(document.body),
				e = b('<button id="joms-js--photoupload-uploader-button">').appendTo(d),
				q = new a.plupload.Uploader({
						url : "index.php?option=com_community&view=photos&task=multiUpload",
						filters : [{
								title : "Image files",
								extensions : "jpg,jpeg,png,gif"
							}
						],
						container : "joms-js--photoupload-uploader",
						browse_button : "joms-js--photoupload-uploader-button",
						runtimes : "html5,html4"
					}),
				q.bind("FilesAdded", f),
				q.bind("Error", i),
				q.bind("UploadProgress", j),
				q.bind("FileUploaded", k),
				q.bind("uploadComplete", l),
				q.init(),
				r = d.find("input[type=file]"),
				c()
			})
		}
		function f(a, b) {
			var c,
			d = "";
			for (c = 0; c < b.length; c++)
				d += '<li class="joms-gallery__item joms-file--' + b[c].id + '">', d += '<div class="joms-gallery__thumbnail"><img src="' + joms.ASSETS_URL + 'photo_thumb.png"></div>', d += '<div class="joms-gallery__body">', d += '<a class="joms-gallery__title">' + b[c].name + "</a> <span>(" + Math.round(b[c].size / 1024) + " KB)</span>", d += '<div class="joms-progressbar"><div class="joms-progressbar__progress" style="width:0%"></div></div>', d += "</div>", d += "</li>";
			s.append(d),
			p.find(".joms-js--btn-add").css({
				visibility : "visible"
			}),
			p.find(".joms-js--btn-view").hide(),
			setTimeout(function () {
				g()
			}, 1e3)
		}
		function g() {
			var a = p.find("[name=album-name]");
			return a.is(":visible") ? w ? (t = w, void h()) : void joms.ajax({
				func : "photos,ajaxCreateAlbum",
				data : [a.val(), u || ""],
				callback : function (a) {
					a.albumid && (t = w = a.albumid, h())
				}
			}) : (t = p.find("[name=album-id]").val(), void h())
		}
		function h() {
			p.find(".joms-js--btn-add").css({
				visibility : "hidden"
			}),
			p.find(".joms-js--btn-view").hide(),
			q.settings.url = "index.php?option=com_community&view=photos&task=multiUpload&albumid=" + t,
			q.refresh(),
			q.start()
		}
		function i() {}

		function j(a, b) {
			var c,
			d;
			c = Math.min(100, Math.floor(b.loaded / b.size * 100)),
			d = p.find(".joms-file--" + b.id),
			d = d.find(".joms-progressbar__progress"),
			d.stop().animate({
				width : c + "%"
			})
		}
		function k(b, c, d) {
			var e,
			f = {};
			try {
				f = JSON.parse(d.response)
			} catch (g) {}

			return f.error ? (q.stop(), p.find(".joms-js--btn-add").css(f.canContinue ? {
					visibility : "visible"
				}
					 : {
					visibility : "hidden"
				}), e = p.find(".joms-file--" + c.id), e.prevAll().length && p.find(".joms-js--btn-view").show(), e.nextAll().andSelf().remove(), void a.alert(f.msg)) : void(f.info && (v.push({
						photoId : f.photoId
					}), e = p.find(".joms-file--" + c.id), e = e.find("img"), e.attr("src", f.info), p.find(".joms-js--btn-add").html(p.find(".joms-js--btn-add").data("lang-more")), p.find(".joms-js--btn-view").show()))
		}
		function l() {
			p.find(".joms-js--btn-add").css({
				visibility : "visible"
			}),
			p.find(".joms-js--btn-view").show(),
			joms.ajax({
				func : "photos,ajaxUpdateCounter",
				data : [t, JSON.stringify({
						files : v
					})],
				callback : function () {}

			})
		}
		function m() {
			joms.ajax({
				func : "photos,ajaxGetAlbumURL",
				data : [t, u],
				callback : function (b) {
					b.url && (a.location = b.url)
				}
			})
		}
		function n(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--photoupload">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", a.html, "</div>"].join("")
		}
		var o,
		p,
		q,
		r,
		s,
		t,
		u,
		v,
		w;
		return function (a, b) {
			joms.util.popup.prepare(function (d) {
				c(d, a, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo || (joms.popup.photo = {}),
		joms.popup.photo.zoom = b(a),
		c("popups/photo.zoom", ["utils/popup"], function () {
			return joms.popup.photo.zoom
		})
	}
	(window, function () {
		function a(a, c) {
			a.items[0] = {
				type : "inline",
				src : b(c)
			},
			a.updateItemHTML()
		}
		function b(a) {
			return a = a || "",
			a = a.replace("thumb_", ""),
			'<div class="joms-popup"><img src="' + a + '" style="min-width:100%;max-width:100%;"></div>'
		}
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.photo = b(a, joms.popup.photo || {}),
		c("popups/photo", ["popups/photo.open", "popups/photo.remove", "popups/photo.report", "popups/photo.setavatar", "popups/photo.setcover", "popups/photo.upload", "popups/photo.zoom"], function () {
			return joms.popup.photo
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.pm || (joms.popup.pm = {}),
		joms.popup.pm.send = b(a),
		c("popups/pm.send", ["utils/popup"], function () {
			return joms.popup.pm.send
		})
	}
	(window, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "inbox,ajaxCompose",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.find("textarea.joms-textarea").jomsTagging(),
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			var a,
			b,
			c = f.find("input[name=subject]").val(),
			d = f.find("[name=body]").val(),
			e = f.find(".joms-textarea__attachment");
			d = d.replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/&quot;/g, '"'),
			f.data("saving") || (f.data("saving", 1), a = [["subject", c], ["body", d], ["to", g]], e.is(":visible") && (b = e.find(".joms-textarea__attachment--thumbnail img"), b = b.data("photo_id"), a.push(["photo", b])), joms.ajax({
					func : "inbox,ajaxSend",
					data : [a],
					callback : function (a) {
						var b = f.find("[data-ui-object=popup-step-1]"),
						c = f.find("[data-ui-object=popup-step-2]");
						f.removeData("saving"),
						a.samestep ? b.find("[data-ui-object=popup-message]").html(a.error).show() : (c.find("[data-ui-object=popup-message]").html(a.error || a.message), b.hide(), c.show())
					}
				}))
		}
		function d(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div data-ui-object="popup-step-1"', a.error ? ' class="joms-popup__hide"' : "", ">", a.html || "", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnCancel, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single" data-ui-object="popup-message">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.pm = b(a, joms.popup.pm || {}),
		c("popups/pm", ["popups/pm.send"], function () {
			return joms.popup.pm
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.search || (joms.popup.search = {}),
		joms.popup.search.save = d(a, b),
		c("popups/search.save", [], function () {
			return joms.popup.search.save
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			var c,
			j,
			k,
			l,
			m,
			n;
			for (h && h.off(), g = a, i = b || {}, c = i.json || {}, j = (i.keys || "").split(","), l = [], n = 0; n < j.length; n++)
				k = j[n], m = "date" === c["fieldType" + k] || "birthdate" === c["fieldType" + k] || "between" === c["condition" + k] ? c["value" + k] + "," + c["value" + k + "_2"] : c["value" + k], l[n] = ["field=" + c["field" + k] + ",condition=" + c["condition" + k] + ",fieldType=" + c["fieldType" + k] + ",value=" + m];
			joms.ajax({
				func : "memberlist,ajaxShowSaveForm",
				data : [i.operator, i.avatar_only ? 1 : 0].concat(l),
				callback : function (a) {
					g.items[0] = {
						type : "inline",
						src : f(a)
					},
					g.updateItemHTML(),
					h = g.contentContainer,
					h.on("click", ".joms-js--button-cancel", d),
					h.on("click", ".joms-js--button-save", e)
				}
			})
		}
		function d() {
			h.off(),
			g.close()
		}
		function e() {
			var a = h.find("[name=title]"),
			c = h.find("[name=description]"),
			d = !1;
			b.trim(a.val()) ? a.siblings(".joms-help").hide() : (a.siblings(".joms-help").show(), d = !0),
			b.trim(c.val()) ? c.siblings(".joms-help").hide() : (c.siblings(".joms-help").show(), d = !0),
			d || h.find("form").submit()
		}
		function f(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSave, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var g,
		h,
		i;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.search = b(a, joms.popup.search || {}),
		c("popups/search", ["popups/search.save"], function () {
			return joms.popup.search
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.tnc = b(a)
	}
	(window, function () {
		function a(a) {
			c = a,
			joms.ajax({
				func : "register,ajaxShowTnc",
				data : [0],
				callback : function (a) {
					c.items[0] = {
						type : "inline",
						src : b(a)
					},
					c.updateItemHTML()
				}
			})
		}
		function b(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single" style="max-height:400px;overflow:auto;">', a.html || "&nbsp;", "</div>", "</div>"].join("")
		}
		var c;
		return function () {
			joms.util.popup.prepare(function (b) {
				a(b)
			})
		}
	}),
	c("popups/tnc", function () {}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.changeVanityURL = d(a, b),
		c("popups/user.changevanityurl", ["utils/popup"], function () {
			return joms.popup.user.changeVanityURL
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "profile,ajaxUpdateURL",
				data : [g],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form").submit()
		}
		function d(a) {
			var b = "";
			return a || (a = {}),
			a.btnUpdate && a.btnCancel && (b = ['<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnCancel, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnUpdate, "</button>", "</div>"].join("")),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content">', a.html || a.message, "</div>", b, "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.addFeatured = d(a, b),
		c("popups/user.addfeatured", ["utils/popup"], function () {
			return joms.popup.user.addFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "search,ajaxAddFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.removeFeatured = d(a, b),
		c("popups/user.removefeatured", ["utils/popup"], function () {
			return joms.popup.user.removeFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "search,ajaxRemoveFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					d.st.callbacks || (d.st.callbacks = {}),
					d.st.callbacks.close = function () {
						a.location.reload()
					},
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.ban = d(a, b),
		c("popups/user.ban", ["utils/popup"], function () {
			return joms.popup.user.ban
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "profile,ajaxBanUser",
				data : [g, 0],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form").submit()
		}
		function d(a) {
			var b = "";
			return a || (a = {}),
			a.error || (b = ['<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>"].join("")),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content', a.error ? " joms-popup__content--single" : "", '">', a.html || a.error, "</div>", b, "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.unban = d(a, b),
		c("popups/user.unban", ["utils/popup"], function () {
			return joms.popup.user.unban
		})
	}
	(window, joms.jQuery, function () {
		function a(a, h) {
			f && f.off(),
			e = a,
			g = h,
			joms.ajax({
				func : "profile,ajaxBanUser",
				data : [g, 1],
				callback : function (a) {
					e.items[0] = {
						type : "inline",
						src : d(a)
					},
					e.updateItemHTML(),
					f = e.contentContainer,
					f.on("click", "[data-ui-object=popup-button-cancel]", b),
					f.on("click", "[data-ui-object=popup-button-save]", c)
				}
			})
		}
		function b() {
			f.off(),
			e.close()
		}
		function c() {
			f.find("form").submit()
		}
		function d(a) {
			var b = "";
			return a || (a = {}),
			a.error || (b = ['<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>"].join("")),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content', a.error ? " joms-popup__content--single" : "", '">', a.html || a.error, "</div>", b, "</div>"].join("")
		}
		var e,
		f,
		g;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.block = d(a, b),
		c("popups/user.block", ["utils/popup"], function () {
			return joms.popup.user.block
		})
	}
	(window, joms.jQuery, function (a) {
		function b(a, b) {
			g && g.off(),
			f = a,
			h = b,
			joms.ajax({
				func : "profile,ajaxConfirmBlockUser",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "profile,ajaxBlockUser",
				data : [h],
				callback : function (b) {
					return b.success ? (f.close(), void a.location.reload()) : (g.find(".joms-popup__action").hide(), void g.find(".joms-popup__content").html(b.error))
				}
			})
		}
		function e(a) {
			var b;
			return a || (a = {}),
			b = a.error ? ['<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-js--button-cancel">', a.btnClose, "</button>", "</div>"].join("") : ['<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>"].join(""),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content">', a.error || a.html || a.message, "</div>", b, "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.unblock = d(a, b),
		c("popups/user.unblock", ["utils/popup"], function () {
			return joms.popup.user.unblock
		})
	}
	(window, joms.jQuery, function (a) {
		function b(a, b) {
			g && g.off(),
			f = a,
			h = b,
			joms.ajax({
				func : "profile,ajaxConfirmUnBlockUser",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", "[data-ui-object=popup-button-cancel]", c),
					g.on("click", "[data-ui-object=popup-button-save]", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "profile,ajaxUnblockUser",
				data : [h],
				callback : function (b) {
					return b.success ? (f.close(), void a.location.reload()) : (g.find(".joms-popup__action").hide(), void g.find(".joms-popup__content").html(b.error))
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content">', a.html || a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.ignore = d(a, b),
		c("popups/user.ignore", ["utils/popup"], function () {
			return joms.popup.user.ignore
		})
	}
	(window, joms.jQuery, function (a) {
		function b(a, b) {
			g && g.off(),
			f = a,
			h = b,
			joms.ajax({
				func : "profile,ajaxConfirmIgnoreUser",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", "[data-ui-object=popup-button-cancel]", c),
					g.on("click", "[data-ui-object=popup-button-save]", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "profile,ajaxIgnoreUser",
				data : [h],
				callback : function (b) {
					return b.success ? (f.close(), void a.location.reload()) : (g.find(".joms-popup__action").hide(), void g.find(".joms-popup__content").html(b.error))
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content">', a.html || a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.report = b(a),
		c("popups/user.report", ["utils/popup"], function () {
			return joms.popup.user.report
		})
	}
	(window, function () {
		function a(a, i) {
			g && g.off(),
			f = a,
			h = i,
			joms.ajax({
				func : "system,ajaxReport",
				data : [],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("change", "select", b),
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function b(a) {
			g.find("textarea").val(a.target.value)
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			var a,
			b = /^\s+|\s+$/g;
			return a = g.find("textarea").val(),
			(a = a.replace(b, "")) ? (g.find(".joms-js--error").hide(), void joms.ajax({
					func : "system,ajaxSendReport",
					data : ["profile,reportProfile", window.location.href, a, h],
					callback : function (a) {
						g.find(".joms-js--step1").hide(),
						g.find(".joms-js--step2").show().children().html(a.error || a.message)
					}
				})) : void g.find(".joms-js--error").show()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', a.html, '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (b) {
			joms.util.popup.prepare(function (c) {
				a(c, b)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.user || (joms.popup.user = {}),
		joms.popup.user.unignore = d(a, b),
		c("popups/user.unignore", ["utils/popup"], function () {
			return joms.popup.user.unignore
		})
	}
	(window, joms.jQuery, function (a) {
		function b(a, b) {
			g && g.off(),
			f = a,
			h = b,
			joms.ajax({
				func : "profile,ajaxConfirmUnIgnoreUser",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", "[data-ui-object=popup-button-cancel]", c),
					g.on("click", "[data-ui-object=popup-button-save]", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "profile,ajaxUnIgnoreUser",
				data : [h],
				callback : function (b) {
					return b.success ? (f.close(), void a.location.reload()) : (g.find(".joms-popup__action").hide(), void g.find(".joms-popup__content").html(b.error))
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content">', a.html || a.message, "</div>", '<div class="joms-popup__action">', '<a href="javascript:" class="joms-button--neutral joms-button--small joms-left" data-ui-object="popup-button-cancel">', a.btnNo, "</a> &nbsp;", '<button class="joms-button--primary joms-button--small" data-ui-object="popup-button-save">', a.btnYes, "</button>", "</div>", "</div>"].join("");

		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.user = b(a, joms.popup.user || {}),
		c("popups/user", ["popups/user.changevanityurl", "popups/user.addfeatured", "popups/user.removefeatured", "popups/user.ban", "popups/user.unban", "popups/user.block", "popups/user.unblock", "popups/user.ignore", "popups/user.report", "popups/user.unignore"], function () {
			return joms.popup.user
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, c) {
		joms.util || (joms.util = {}),
		joms.util.videotag = c(a, b)
	}
	(window, joms.jQuery, function (a, b, c) {
		function d(d, h) {
			var i,
			k,
			t,
			u,
			v;
			if (g(), n = b(m()), o = n.find(".joms-phototag"), p = d && d.target ? b(d.target).closest(".joms-popup--video").find("iframe,video,.joms-js--video").eq(0) : b(d), q = c, r = {}, u = p.width(), v = p.height(), i = p.position(), k = i.top, t = i.left, s = h || [], o.css({
					top : 0,
					left : 0
				}), n.css({
					top : k,
					left : t,
					width : u,
					height : v
				}), n.insertBefore(p), i = j(d), o.css({
					top : i.top,
					left : i.left
				}), o.on("keyup", "input", e), o.on("click", "a[data-id]", f), o.on("click", "button", g), o.on("click", function (a) {
					a.stopPropagation()
				}), n.on("click", l), e(), joms.ios)
				try {
					a.scrollTo(a.scrollLeft, o.find("input").offset().top - 100)
				} catch (d) {}

			joms.mobile || b(a).on("resize.phototag", g)
		}
		function e(c) {
			var d,
			e,
			f,
			g;
			q || (q = a.joms_friends || []),
			d = b(c ? c.currentTarget : o.find("input")),
			e = d.val().replace(/^\s+|\s+$/g, "").toLowerCase(),
			f = q,
			f = joms._.filter(q, function (a) {
					return a && a.name ? s && s.indexOf(a.id + "") >= 0 ? !1 : e && a.name.toLowerCase().indexOf(e) < 0 ? !1 : !0 : !1
				}),
			f = f.slice(0, 8),
			f = joms._.map(f, function (a) {
					return '<a href="javascript:" data-id="' + a.id + '">' + a.name + "</a>"
				}),
			f.length ? t = !1 : (f = ["<span><em>No result found.</em></span>"], t = !0),
			g = o.find(".joms-phototag__autocomplete"),
			g.html(f.join("")),
			g.append('<div><button class="joms-button--neutral joms-button--small joms-button--full">' + a.joms_lang.COM_COMMUNITY_PHOTO_DONE_TAGGING + "</button></div>"),
			g.show()
		}
		function f(a) {
			var c,
			d = o.find(".joms-phototag__autocomplete"),
			f = b(a.currentTarget),
			g = f.data("id") || "";
			a.stopPropagation(),
			d.hide(),
			r && r.tagAdded && (s || (s = []), s.push(g + ""), c = k(), r.tagAdded(g, c.left, c.top, c.width, c.height), e())
		}
		function g() {
			o && (o.remove(), n.remove(), b(a).off("resize.phototag"), o = c, p = c, r && r.destroy && r.destroy(), r = c)
		}
		function h(a, b) {
			r[a] = b
		}
		function i(a) {
			a ? r[a] && (r[a] = c) : r = {}

		}
		function j() {
			var a,
			b,
			c = p.height(),
			d = p.width();
			return b = Math.max(0, c - 86) / 4.5,
			a = Math.max(0, d - 86) / 2, {
				top : b,
				left : a
			}
		}
		function k() {
			var a,
			b,
			c,
			d,
			e,
			f,
			g;
			return b = n.width(),
			c = n.height(),
			a = o.position(),
			d = o.width(),
			e = o.height(),
			f = a.left + d / 2,
			g = a.top + e / 2,
			d /= c,
			e /= c,
			f /= b,
			g /= c, {
				top : g,
				left : f,
				width : d,
				height : e
			}
		}
		function l(a) {
			var b;
			return t ? void g() : (b = j(a), void o.css({
					top : b.top,
					left : b.left
				}))
		}
		function m() {
			return ["<div class=joms-phototag__wrapper>", "<div class=joms-phototag>", "<div class=joms-phototag__input>", '<input type=text placeholder="', a.joms_lang.COM_COMMUNITY_SEARCH, '">', '<div class="joms-phototag__autocomplete"></div>', "</div>", "</div>", "</div>"].join("")
		}
		var n,
		o,
		p,
		q,
		r,
		s,
		t;
		return {
			create : d,
			destroy : g,
			on : h,
			off : i
		}
	}),
	c("utils/videotag", function () {}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.open = d(a, b),
		c("popups/video.open", ["utils/popup", "utils/videotag"], function () {
			return joms.popup.video.open
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			K && K.off(),
			J = a,
			P = b,
			joms.ajax({
				func : "videos,ajaxShowVideoWindow",
				data : [P],
				callback : function (a) {
					a || (a = {}),
					Q = a.lang || {},
					R = a.can_edit || !1,
					S = a.video_url,
					U = T = +a.my_id,
					V = U && +a.my_id === +a.owner_id,
					W = +a.is_admin,
					X = +a.enableprofilevideo,
					Y = +a.enablereporting,
					J.items[0] = {
						type : "inline",
						src : e(a)
					},
					J.updateItemHTML(),
					J.close = n,
					B(),
					K = J.contentContainer,
					L = K.find(".joms-popup__btn-tag-video"),
					K.on("click", ".joms-popup__btn-tag-video", g),
					K.on("click", ".joms-popup__btn-comments", m),
					K.on("click", ".joms-popup__btn-option", o),
					K.on("click", ".joms-popup__btn-share", r),
					K.on("click", ".joms-popup__btn-report", s),
					K.on("click", ".joms-popup__btn-fetch", t),
					K.on("click", ".joms-popup__btn-profile", u),
					K.on("click", ".joms-popup__btn-edit", w),
					K.on("click", ".joms-popup__btn-delete", x),
					K.on("mouseleave", ".joms-popup__dropdown--wrapper", p),
					K.on("click", ".joms-js--more-comments", z),
					K.on("click", ".joms-js--remove-tag", k),
					K.on("click", ".joms-js--btn-desc-toggle", F),
					K.on("click", ".joms-js--btn-desc-edit", G),
					K.on("click", ".joms-js--btn-desc-cancel", H),
					K.on("click", ".joms-js--btn-desc-save", I),
					A(P)
				}
			})
		}
		function d(a) {
			return a = a.replace(/<\/?[^>]+>/g, "")
		}
		function e(a) {
			var b;
			return a || (a = {}),
			b = a.error || a.playerHtml || "",
			['<div class="joms-popup joms-popup--video">', '<div class="joms-popup__commentwrapper">', '<div class="joms-popup__content">', '<div class="joms-popup__video">', b, "</div>", '<div class="joms-popup__option clearfix">', '<div class="joms-popup__optcaption"></div>', '<div class="joms-popup__optoption">', '<button class="joms-popup__btn-comments">', $, ' <span class="joms-popup__btn-overlay">', Q.comments, "</span></button>", f(a.like), R ? '<button class="joms-popup__btn-tag-video">' + aa + ' <span class="joms-popup__btn-overlay">' + Q.tag_video + "</span></button>" : "", '<div class="joms-popup__dropdown--wrapper">', q(a), '<button class="joms-popup__btn-option">', Z, ' <span class="joms-popup__btn-overlay">', Q.options, "</span></button></div>", "</div>", "</div>", "</div>", '<div class="joms-popup__comment"></div>', '<button class="mfp-close" type="button" title="Close (Esc)">×</button>', "</div>", "</div>"].join("")
		}
		function f(a) {
			var b,
			c;
			return b = "",
			a && (b += '<button class="joms-popup__btn-like joms-js--like-videos-' + P + (a.is_liked ? " liked" : "") + '"', b += ' onclick="joms.api.page' + (a.is_liked ? "Unlike" : "Like") + "('videos', '" + P + "');\"", b += ' data-lang="' + (a.lang || "Like") + '"', b += ' data-lang-like="' + (a.lang_like || "Like") + '"', b += ' data-lang-liked="' + (a.lang_liked || "Liked") + '">', b += _ + " ", b += "<span>", b += a.is_liked ? a.lang_liked : a.lang_like, c = +a.count, c > 0 && (b += " (" + c + ")"), b += "</span></button>"),
			b
		}
		function g(a) {
			L.data("tagging") ? (L.removeData("tagging"), L.html(aa + ' <span class="joms-popup__btn-overlay">' + Q.tag_video + "</span>"), j()) : (L.data("tagging", 1), L.html(aa + " " + Q.done_tagging), h(a))
		}
		function h(a) {
			var b = joms._.map(M, function (a) {
					return a.userId + ""
				});
			joms.util.videotag.create(a, b),
			joms.util.videotag.on("tagAdded", i)
		}
		function i(b) {
			joms.ajax({
				func : "videos,ajaxAddVideoTag",
				data : [P, b],
				callback : function (b) {
					var c,
					e;
					return b.error ? void a.alert(d(b.error)) : void(b.success && (M.push(b.data), c = K.find(".joms-popup__comment"), e = c.find(".joms-js--tag-info"), e.html(l())))
				}
			})
		}
		function j() {
			joms.util.videotag.destroy()
		}
		function k(c) {
			var e = b(c.currentTarget),
			f = e.data("id");
			joms.ajax({
				func : "videos,ajaxRemoveVideoTag",
				data : [P, f],
				callback : function (b) {
					var c,
					e,
					g;
					if (b.error)
						return void a.alert(d(b.error));
					if (b.success) {
						for (g = 0; g < M.length; g++)
							 + f === +M[g].userId && M.splice(g--, 1);
						c = K.find(".joms-popup__comment"),
						e = c.find(".joms-js--tag-info"),
						e.html(l())
					}
				}
			})
		}
		function l() {
			var a,
			b,
			c,
			d;
			if (!M || !M.length)
				return "";
			for (a = [], d = 0; d < M.length; d++)
				b = M[d], c = '<a href="' + b.profileUrl + '">' + b.displayName + "</a>", b.canRemove && (c += ' (<a href="javascript:" class="joms-js--remove-tag" data-id="' + b.userId + '">' + O + "</a>)"), a.push(c);
			return a = a.join(", "),
			a = N + "<br>" + a
		}
		function m() {
			K.children(".joms-popup").toggleClass("joms-popup--togglecomment")
		}
		function n() {
			var a = K.children(".joms-popup"),
			c = "joms-popup--togglecomment";
			return a.hasClass(c) ? void a.removeClass(c) : void b.magnificPopup.proto.close.call(this)
		}
		function o(a) {
			var c = b(a.target).closest(".joms-popup__dropdown--wrapper"),
			d = c.children(".joms-popup__dropdown");
			d.toggleClass("joms-popup__dropdown--open")
		}
		function p(a) {
			var c = b(a.target).closest(".joms-popup__dropdown--wrapper"),
			d = c.children(".joms-popup__dropdown");
			d.removeClass("joms-popup__dropdown--open")
		}
		function q(a) {
			var b = "";
			return a || (a = {}),
			b += '<a href="javascript:" class="joms-popup__btn-share">' + Q.share + "</a>",
			V || W ? (b += '<div class="sep"></div>', b += '<a href="javascript:" class="joms-popup__btn-fetch">' + Q.fetch + "</a>", b += V && X ? '<a href="javascript:" class="joms-popup__btn-profile">' + Q.set_as_profile_video + "</a>" : "", b += '<div class="sep"></div>', b += '<a href="javascript:" class="joms-popup__btn-edit">' + Q.edit_video + "</a>", b += '<a href="javascript:" class="joms-popup__btn-delete">' + Q.delete_video + "</a>") : Y && (b += '<a href="javascript:" class="joms-popup__btn-report">' + Q.report + "</a>"),
			b = '<div class="joms-popup__dropdown"><div class="joms-popup__ddcontent">' + b + "</div></div>"
		}
		function r() {
			joms.api.pageShare(S)
		}
		function s() {
			joms.api.videoReport(T, S)
		}
		function t() {
			joms.api.videoFetchThumbnail(P)
		}
		function u() {
			joms.ajax({
				func : "profile,ajaxConfirmLinkProfileVideo",
				data : [P],
				callback : function (b) {
					return b.error ? void a.alert(d(b.error)) : void(a.confirm(d(b.html)) && v())
				}
			})
		}
		function v() {
			joms.ajax({
				func : "profile,ajaxLinkProfileVideo",
				data : [P],
				callback : function (b) {
					return b.error ? void a.alert(d(b.error)) : (a.alert(d(b.message)), void setTimeout(function () {
							a.location.reload()
						}, 500))
				}
			})
		}
		function w() {
			joms.api.videoEdit(P)
		}
		function x() {
			joms.ajax({
				func : "videos,ajaxConfirmRemoveVideo",
				data : [P],
				callback : function (b) {
					return b.error ? void a.alert(d(b.error)) : void(a.confirm(d(b.html)) && y())
				}
			})
		}
		function y() {
			joms.ajax({
				func : "videos,ajaxRemoveVideo",
				data : [P],
				callback : function (b) {
					return b.error ? void a.alert(d(b.error)) : (a.alert(d(b.message)), void setTimeout(function () {
							a.location.reload()
						}, 500))
				}
			})
		}
		function z() {
			A(P, !0)
		}
		function A(a, c) {
			var d = K.find(".joms-popup__comment");
			c || d.empty(),
			joms.ajax({
				func : "videos,ajaxGetInfo",
				data : [a, c ? 1 : 0],
				callback : function (a) {
					var e;
					c || a.comments && a.showall && (a.showall = '<div class="joms-comment__more joms-js--more-comments"><a href="javascript:">' + a.showall + "</a></div>", a.comments = b(a.comments), a.comments.prepend(a.showall)),
					c ? d.find(".joms-comment").replaceWith(a.comments) : (d.html(a.head || ""), d.append(a.comments), d.append(a.form || ""), d.find(".joms-js--description").html(D(a.description || {})), M = a.tagged || [], N = a.tagLabel || "", O = a.tagRemoveLabel || "", e = d.find(".joms-js--tag-info"), e.html(l()), d.find("textarea.joms-textarea"), joms.fn.tagging.initInputbox()),
					C()
				}
			})
		}
		function B() {
			var a = ".joms-js--video",
			c = b(".joms-popup__content").find(a);
			c.length && (joms.loadCSS(joms.ASSETS_URL + "vendors/mediaelement/mediaelementplayer.min.css"), c.on("click.joms-video", a + "-play", function () {
					var c = b(this).closest(a);
					joms.util.video.play(c, c.data())
				}))
		}
		function C() {
			var a = ".joms-js--initialized",
			c = ".joms-js--video",
			d = b(".joms-comment__body,.joms-js--inbox").find(c).not(a).addClass(a.substr(1));
			d.length && (joms.loadCSS(joms.ASSETS_URL + "vendors/mediaelement/mediaelementplayer.min.css"), d.on("click.joms-video", c + "-play", function () {
					var a = b(this).closest(c);
					joms.util.video.play(a, a.data())
				}), joms.ios && setTimeout(function () {
					d.find(c + "-play").click()
				}, 2e3))
		}
		function D(b) {
			var c;
			return "object" != typeof b && (b = {}),
			b.content && b.excerpt !== b.content && (c = !0),
			['<div class="joms-js--btn-desc-content">', '<span class="joms-js--btn-desc-excerpt"', c ? "" : ' style="display:none"', ">", b.excerpt || "", "</span>", '<span class="joms-js--btn-desc-fulltext"', c ? ' style="display:none"' : "", ">", b.content || "", "</span>", ' <a href="javascript:" class="joms-js--btn-desc-toggle"', c ? "" : ' style="display:none"', ">", a.joms_lang.COM_COMMUNITY_SHOW_MORE, "</a>", "</div>", '<div class="joms-js--btn-desc-editor joms-popup__hide">', '<textarea class="joms-textarea" style="margin:0" placeholder="', b.lang_placeholder || "", '">', E(b.content || ""), "</textarea>", '<div style="margin-top:5px;text-align:right">', '<button class="joms-button--neutral joms-button--small joms-js--btn-desc-cancel">', b.lang_cancel || "Cancel", "</button> ", '<button class="joms-button--primary joms-button--small joms-js--btn-desc-save">', b.lang_save || "Save", "</button>", "</div>", "</div>", '<div class="joms-js--btn-desc-edit"', R ? "" : ' style="display:none"', '><a href="javascript:"', ' data-lang-add="', b.lang_add || "Add description", '"', ' data-lang-edit="', b.lang_edit || "Edit description", '">', b.content ? b.lang_edit : b.lang_add, "</a>", "</div>"].join("")
		}
		function E(a) {
			return a = a || "",
			a = a.replace(/<br\s*\/?>/g, "\n")
		}
		function F() {
			var b = K.find(".joms-js--btn-desc-excerpt"),
			c = K.find(".joms-js--btn-desc-fulltext"),
			d = K.find(".joms-js--btn-desc-toggle");
			c.is(":visible") ? (c.hide(), b.show(), d.html(a.joms_lang.COM_COMMUNITY_SHOW_MORE)) : (b.hide(), c.show(), d.html(a.joms_lang.COM_COMMUNITY_SHOW_LESS))
		}
		function G() {
			K.find(".joms-js--btn-desc-content").hide(),
			K.find(".joms-js--btn-desc-edit").hide(),
			K.find(".joms-js--btn-desc-editor").show()
		}
		function H() {
			K.find(".joms-js--btn-desc-editor").hide(),
			K.find(".joms-js--btn-desc-content").show(),
			K.find(".joms-js--btn-desc-edit").show()
		}
		function I() {
			var c = K.find(".joms-js--btn-desc-content"),
			d = K.find(".joms-js--btn-desc-editor"),
			e = K.find(".joms-js--btn-desc-edit"),
			f = d.find("textarea"),
			g = b.trim(f.val());
			joms.ajax({
				func : "videos,ajaxSaveDescription",
				data : [P, g],
				callback : function (b) {
					var f,
					h,
					i,
					j = e.find("a");
					return b.error ? void a.alert(b.error) : void(b.success && (f = c.find(".joms-js--btn-desc-excerpt"), h = c.find(".joms-js--btn-desc-fulltext"), i = c.find(".joms-js--btn-desc-toggle"), b.caption && b.caption !== b.excerpt ? (f.html(b.excerpt).show(), i.html(a.joms_lang.COM_COMMUNITY_SHOW_MORE).show(), h.html(b.caption).hide()) : (f.hide(), i.hide(), h.html(b.caption).show()), d.hide(), c.show(), j.html(j.data("lang-" + (g ? "edit" : "add"))), e.show()))
				}
			})
		}
		var J,
		K,
		L,
		M,
		N,
		O,
		P,
		Q,
		R,
		S,
		T,
		U,
		V,
		W,
		X,
		Y,
		Z = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-cog"></use></svg>',
		$ = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-bubble"></use></svg>',
		_ = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-thumbs-up"></use></svg>',
		aa = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-tag"></use></svg>';
		return joms._.debounce(function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}, 200)
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.add = d(a, b),
		c("popups/video.add", ["utils/loadlib", "utils/popup"], function () {
			return joms.popup.video.add
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			var c;
			p && p.off(),
			o = a,
			s = b || !1,
			c = [],
			s && (c = ["group", s]),
			joms.ajax({
				func : "videos,ajaxAddVideo",
				data : c,
				callback : function (a) {
					o.items[0] = {
						type : "inline",
						src : n(a)
					},
					o.updateItemHTML(),
					p = o.contentContainer,
					p.on("submit", ".joms-js--form-link", d),
					p.on("click", ".joms-js--select-file", e),
					p.on("submit", ".joms-js--form-upload", h),
					f()
				}
			})
		}
		function d(a) {
			a.preventDefault();
			var c = b(a.currentTarget),
			d = /^\s+|\s+$/g,
			e = c.find("[name=videoLinkUrl]"),
			f = c.find("[name=category_id]"),
			g = e.val().trim(d, ""),
			h = +f.val(),
			i = c.find("[type=submit]");
			e.siblings("[data-elem=form-warning]")[g ? "hide" : "show"](),
			f.siblings("[data-elem=form-warning]")[h ? "hide" : "show"](),
			g && h && (c.removeAttr("onsubmit"), i.val("Linking..."), i.prop("disabled", !0), p.off("submit", ".joms-js--form-link"), setTimeout(function () {
					c.submit()
				}, 300))
		}
		function e() {
			f(function () {
				r.click()
			})
		}
		function f(c) {
			return "function" != typeof c && (c = function () {}),
			q ? void c() : void joms.util.loadLib("plupload", function () {
				var d,
				e;
				d = b('<div id="joms-js--videoupload-uploader" style="width:1px; height:1px; overflow:hidden">').appendTo(document.body),
				e = b('<button id="joms-js--videoupload-uploader-button">').appendTo(d),
				q = new a.plupload.Uploader({
						url : "index.php?option=com_community&view=videos&task=uploadvideo",
						filters : [{
								title : "Video files",
								extensions : "3g2,3gp,asf,asx,avi,flv,mov,mp4,mpg,rm,swf,vob,wmv,m4v"
							}
						],
						container : "joms-js--videoupload-uploader",
						browse_button : "joms-js--videoupload-uploader-button",
						runtimes : "html5,html4",
						multi_selection : !1
					}),
				q.bind("FilesAdded", g),
				q.bind("BeforeUpload", i),
				q.bind("Error", j),
				q.bind("UploadProgress", k),
				q.bind("FileUploaded", l),
				q.bind("uploadComplete", m),
				q.init(),
				r = d.find("input[type=file]"),
				c()
			})
		}
		function g(a, b) {
			if (b && b.length) {
				for (var c = p.find(".joms-js--select-file"), d = b[0], e = "<span>" + d.name + "</span>", f = d.size || 0, g = "Bytes", h = ["KB", "MB", "GB"]; f >= 1e3 && h.length; )
					g = h.shift(), f = Math.ceil(f / 1e3);
				f && (e += " <span>(" + f + " " + g + ")</span>"),
				c.html(e)
			}
		}
		function h(a) {
			a.preventDefault();
			var c,
			d = b(a.currentTarget),
			e = /^\s+|\s+$/g,
			f = d.find("[name=title]"),
			g = d.find("[name=category_id]"),
			h = f.val().trim(e, ""),
			i = +g.val();
			return f.siblings("[data-elem=form-warning]")[h ? "hide" : "show"](),
			g.siblings("[data-elem=form-warning]")[i ? "hide" : "show"](),
			h && i ? (c = d.find(".joms-progressbar__progress"), c.css({
					width : 0
				}), q.refresh(), void q.start()) : !1
		}
		function i() {
			var a,
			b = p.find(".joms-js--form-upload").serializeArray(),
			c = {};
			for (a = 0; a < b.length; a++)
				c[b[a].name] = b[a].value;
			q.settings.multipart_params = c
		}
		function j() {}

		function k(a, b) {
			var c,
			d,
			e;
			c = Math.min(100, Math.floor(b.loaded / b.size * 100)),
			d = p.find(".joms-js--form-upload"),
			e = d.find(".joms-progressbar__progress"),
			e.stop().animate({
				width : c + "%"
			})
		}
		function l(b, c, d) {
			var e = {};
			try {
				e = JSON.parse(d.response)
			} catch (f) {}

			return "success" !== e.status ? void a.alert(e.message || "Undefined error.") : void setTimeout(function () {
				a.alert(e.processing_str),
				o.close()
			}, 1e3)
		}
		function m() {}

		function n(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--videoupload">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", a.html ? a.html : '<div class="joms-popup__content joms-popup__content--single">' + a.error + "</div>", "</div>"].join("")
		}
		var o,
		p,
		q,
		r,
		s;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.edit = b(a),
		c("popups/video.edit", ["utils/popup"], function () {
			return joms.popup.video.edit
		})
	}
	(window, function (a) {
		function b(b, i) {
			g && g.off(),
			f = b,
			h = i,
			joms.ajax({
				func : "videos,ajaxEditVideo",
				data : [h, a.location.href],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			g.find("form").submit()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--600">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', '<div class="joms-popup__content joms-popup__content--single">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSave, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div data-ui-object="popup-step-2"', a.error ? "" : ' class="joms-popup__hide"', ">", '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.fetchThumbnail = d(a, b),
		c("popups/video.fetchthumbnail", ["utils/popup"], function () {
			return joms.popup.video.fetchThumbnail
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "videos,ajaxFetchThumbnail",
				data : [f, "myvideos"],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					b.success && (d.st.callbacks || (d.st.callbacks = {}), d.st.callbacks.close = function () {
						a.location.reload()
					}),
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.message || a.error || "", a.thumbnail ? '<div style="padding-top:10px;"><img src="' + a.thumbnail + '" style="max-width:100%;"></div>' : "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.linkToProfile = d(a, b),
		c("popups/video.linktoprofile", ["utils/popup"], function () {
			return joms.popup.video.linkToProfile
		})
	}
	(window, joms.jQuery, function (a) {
		function b(a, b) {
			g && g.off(),
			f = a,
			h = b,
			joms.ajax({
				func : "profile,ajaxConfirmLinkProfileVideo",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "profile,ajaxLinkProfileVideo",
				data : [h],
				callback : function (b) {
					g.find(".joms-js--step1").hide(),
					g.find(".joms-js--step2").show().children().html(b.error || b.message),
					b.success && setTimeout(function () {
						a.location.reload()
					}, 1e3)
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.remove = b(a),
		c("popups/video.remove", ["utils/popup"], function () {
			return joms.popup.video.remove
		})
	}
	(window, function (a) {
		function b(a, b) {
			g && g.off(),
			f = a,
			h = b,
			joms.ajax({
				func : "videos,ajaxConfirmRemoveVideo",
				data : [h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "videos,ajaxRemoveVideo",
				data : [h],
				callback : function (b) {
					g.find(".joms-js--step1").hide(),
					g.find(".joms-js--step2").show().children().html(b.error || b.message),
					b.success && setTimeout(function () {
						a.location.reload()
					}, 1e3)
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var f,
		g,
		h;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.report = b(a),
		c("popups/video.report", ["utils/popup"], function () {
			return joms.popup.video.report
		})
	}
	(window, function () {
		function a(a, j, k) {
			g && g.off(),
			f = a,
			h = j,
			i = k,
			joms.ajax({
				func : "system,ajaxReport",
				data : [],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("change", "select", b),
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function b(a) {
			g.find("textarea").val(a.target.value)
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			var a,
			b = /^\s+|\s+$/g;
			return a = g.find("textarea").val(),
			(a = a.replace(b, "")) ? (g.find(".joms-js--error").hide(), void joms.ajax({
					func : "system,ajaxSendReport",
					data : ["videos,reportVideo", i || window.location.href, a, h],
					callback : function (a) {
						g.find(".joms-js--step1").hide(),
						g.find(".joms-js--step2").show().children().html(a.error || a.message)
					}
				})) : void g.find(".joms-js--error").show()
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1', a.error ? " joms-popup__hide" : "", '">', a.html, '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnSend, "</button>", "</div>", "</div>", '<div class="joms-js--step2', a.error ? "" : " joms-popup__hide", '">', '<div class="joms-popup__content joms-popup__content--single">', a.error || "", "</div>", "</div>", "</div>"].join("")
		}
		var f,
		g,
		h,
		i;
		return function (b, c) {
			joms.util.popup.prepare(function (d) {
				a(d, b, c)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.addFeatured = d(a, b),
		c("popups/video.addfeatured", ["utils/popup"], function () {
			return joms.popup.video.addFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "videos,ajaxAddFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					b.success && (d.st.callbacks || (d.st.callbacks = {}), d.st.callbacks.close = function () {
						a.location.reload()
					}),
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.removeFeatured = d(a, b),
		c("popups/video.removefeatured", ["utils/popup"], function () {
			return joms.popup.video.removeFeatured
		})
	}
	(window, joms.jQuery, function (a) {
		function b(b, g) {
			e && e.off(),
			d = b,
			f = g,
			joms.ajax({
				func : "videos,ajaxRemoveFeatured",
				data : [f],
				callback : function (b) {
					d.items[0] = {
						type : "inline",
						src : c(b)
					},
					b.success && (d.st.callbacks || (d.st.callbacks = {}), d.st.callbacks.close = function () {
						a.location.reload()
					}),
					d.updateItemHTML()
				}
			})
		}
		function c(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-popup__content joms-popup__content--single">', a.html || a.error || "", "</div>", "</div>"].join("")
		}
		var d,
		e,
		f;
		return function (a) {
			joms.util.popup.prepare(function (c) {
				b(c, a)
			})
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.video || (joms.popup.video = {}),
		joms.popup.video.removeLinkFromProfile = d(a, b),
		c("popups/video.removelinkfromprofile", ["utils/popup"], function () {
			return joms.popup.video.removeLinkFromProfile
		})
	}
	(window, joms.jQuery, function (a) {
		function b(a, b, j) {
			g && g.off(),
			f = a,
			h = b,
			i = j,
			joms.ajax({
				func : "profile,ajaxRemoveConfirmLinkProfileVideo",
				data : [i, h],
				callback : function (a) {
					f.items[0] = {
						type : "inline",
						src : e(a)
					},
					f.updateItemHTML(),
					g = f.contentContainer,
					g.on("click", ".joms-js--button-cancel", c),
					g.on("click", ".joms-js--button-save", d)
				}
			})
		}
		function c() {
			g.off(),
			f.close()
		}
		function d() {
			joms.ajax({
				func : "profile,ajaxRemoveLinkProfileVideo",
				data : [i, h],
				callback : function (b) {
					g.find(".joms-js--step1").hide(),
					g.find(".joms-js--step2").show().children().html(b.error || b.message),
					b.success && setTimeout(function () {
						a.location.reload()
					}, 1e3)
				}
			})
		}
		function e(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnNo, "</button> &nbsp;", '<button class="joms-button--primary joms-button--small joms-js--button-save">', a.btnYes, "</button>", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var f,
		g,
		h,
		i;
		return function (a, c) {
			joms.util.popup.prepare(function (d) {
				b(d, a, c)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.video = b(a, joms.popup.video || {}),
		c("popups/video", ["popups/video.open", "popups/video.add", "popups/video.edit", "popups/video.fetchthumbnail", "popups/video.linktoprofile", "popups/video.remove", "popups/video.report", "popups/video.addfeatured", "popups/video.removefeatured", "popups/video.removelinkfromprofile"], function () {
			return joms.popup.video
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.view || (joms.view = {}),
		joms.view.cover = d(a, b),
		c("views/cover", [], function () {
			return joms.view.cover
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, c) {
			var e,
			f;
			i = a,
			j = c,
			k = b(".joms-focus__cover"),
			l = k.children(".joms-js--cover-image").children("img"),
			l && (k.css("cursor", "move"), k.children(".joms-focus__header").hide(), k.children(".joms-focus__actions--reposition").on("click", "input", d).show(), l.data("top", l.position().top), m = new joms.Hammer(l[0]), m.on("dragstart dragup dragdown dragend", function (a) {
					var b;
					"dragstart" === a.type ? (e = l.position().top, f = k.height() - l.height()) : "dragend" !== a.type && (b = Math.min(0, e + a.gesture.deltaY), b = Math.max(f, b), l.css({
							top : b
						}))
				}))
		}
		function d(a) {
			var c;
			c = b(a.target),
			k.children(".joms-focus__actions--reposition").off("click", "input"),
			"button-save" === c.data("ui-object") ? e() : f()
		}
		function e() {
			var a;
			a = h(l.position().top, k.height()),
			g(),
			joms.ajax({
				func : "photos,ajaxSetPhotoPhosition",
				data : [i, j, a]
			})
		}
		function f() {
			l.css({
				top : l.data("top")
			}),
			g()
		}
		function g() {
			k.css("cursor", ""),
			k.children(".joms-focus__actions--reposition").hide(),
			k.children(".joms-focus__header").show(),
			k = null,
			l = null,
			m = null
		}
		function h(a, b) {
			var c;
			return c = 100 * a / b,
			c = Math.round(1e4 * c) / 1e4,
			c + "%"
		}
		var i,
		j,
		k,
		l,
		m;
		return {
			reposition : c
		}
	}),
	function (a, b, d) {
		joms.popup || (joms.popup = {}),
		joms.popup.page || (joms.popup.page = {}),
		joms.popup.page.share = d(a, b),
		c("popups/page.share", ["utils/popup"], function () {
			return joms.popup.page.share
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c(a, b) {
			i && i.off(),
			h = a,
			j = b,
			joms.ajax({
				func : "bookmarks,ajaxShowBookmarks",
				data : [j],
				callback : function (a) {
					h.items[0] = {
						type : "inline",
						src : g(a)
					},
					h.updateItemHTML(),
					i = h.contentContainer,
					i.on("click", ".joms-bookmarks a", d),
					i.on("click", ".joms-js--button-cancel", e),
					i.on("click", ".joms-js--button-save", f)
				}
			})
		}
		function d(c) {
			var d,
			e,
			f;
			c.preventDefault(),
			c.stopPropagation(),
			d = b(this),
			e = d.attr("href"),
			f = d.text(),
			i.off(),
			h.close(),
			a.open(e, f, "top=150, left=150, width=650, height=330, scrollbars=yes")
		}
		function e() {
			i.off(),
			h.close()
		}
		function f() {
			var a = i.find("form"),
			b = a.find("[name=bookmarks-email]").val(),
			c = a.find("[name=bookmarks-message]").val();
			joms.ajax({
				func : "bookmarks,ajaxEmailPage",
				data : [j, b, c],
				callback : function (a) {
					i.find(".joms-js--step1").hide(),
					i.find(".joms-js--step2").show().children().html(a.error || a.message)
				}
			})
		}
		function g(a) {
			return a || (a = {}),
			['<div class="joms-popup joms-popup--whiteblock joms-popup--500">', '<div class="joms-popup__title"><button class="mfp-close" type="button" title="Close (Esc)">×</button>', a.title, "</div>", '<div class="joms-js--step1">', '<div class="joms-popup__content">', a.html, "</div>", '<div class="joms-popup__action">', '<button class="joms-button--neutral joms-button--small joms-left joms-js--button-cancel">', a.btnCancel, "</button>", a.viaEmail ? ' &nbsp;<button class="joms-button--primary joms-button--small joms-js--button-save">' + a.btnShare + "</button>" : "", "</div>", "</div>", '<div class="joms-popup__hide joms-js--step2">', '<div class="joms-popup__content joms-popup__content--single"></div>', "</div>", "</div>"].join("")
		}
		var h,
		i,
		j;
		return function (a) {
			joms.util.popup.prepare(function (b) {
				c(b, a)
			})
		}
	}),
	function (a, b) {
		joms.popup || (joms.popup = {}),
		joms.popup.page = b(a, joms.popup.page || {}),
		c("popups/page", ["popups/page.share"], function () {
			return joms.popup.page
		})
	}
	(window, function (a, b) {
		return joms._.extend({}, b)
	}),
	function (a, b, d) {
		joms.view || (joms.view = {}),
		joms.view.page = d(a, b),
		c("views/page", ["utils/hovercard", "popups/page"], function () {
			return joms.view.page
		})
	}
	(window, joms.jQuery, function (a, b) {
		function c() {}

		function d(a, b) {
			joms.ajax({
				func : "system,ajaxLike",
				data : [a, b],
				callback : function (c) {
					c.success && g("like", a, b, c.likeCount)
				}
			})
		}
		function e(a, b) {
			joms.ajax({
				func : "system,ajaxUnlike",
				data : [a, b],
				callback : function (c) {
					c.success && g("unlike", a, b, c.likeCount)
				}
			})
		}
		function f(a) {
			joms.popup.page.share(a)
		}
		function g(a, c, d, e) {
			var f;
			f = b(".joms-js--like-" + c + "-" + d),
			f.each(function () {
				var f = this.tagName.toLowerCase(),
				g = b(this);
				"a" === f ? g.hasClass("joms-popup__btn-like") ? h(g, a, c, d, e) : i(g, a, c, d, e) : "button" === f && (g.hasClass("joms-popup__btn-like") ? h(g, a, c, d, e) : j(g, a, c, d, e))
			})
		}
		function h(a, b, c, d, e) {
			var f,
			g = '<svg viewBox="0 0 16 16" class="joms-icon"><use xlink:href="#joms-icon-thumbs-up"></use></svg>';
			"like" === b ? (a.attr("onclick", 'joms.view.page.unlike("' + c + '", "' + d + '");'), a.addClass("liked"), f = a.data("lang-liked")) : "unlike" === b && (a.attr("onclick", 'joms.view.page.like("' + c + '", "' + d + '");'), a.removeClass("liked"), f = a.data("lang-like")),
			f = f || a.data("lang"),
			e = +e,
			e > 0 && (f += " (" + e + ")"),
			a.html(g + " <span>" + f + "</span>")
		}
		function i(a, b, c, d, e) {
			var f;
			a.find("span").html(e),
			"like" === b ? (a.attr("onclick", 'joms.view.page.unlike("' + c + '", "' + d + '");'), a.addClass("liked"), (f = a.data("lang-liked")) && a.find(".joms-js--lang").text(f)) : "unlike" === b && (a.attr("onclick", 'joms.view.page.like("' + c + '", "' + d + '");'), a.removeClass("liked"), (f = a.data("lang-like")) && a.find(".joms-js--lang").text(f))
		}
		function j(a, b, c, d, e) {
			var f;
			"like" === b ? (a.attr("onclick", 'joms.view.page.unlike("' + c + '", "' + d + '");'), a.removeClass("joms-button--neutral"), a.addClass("joms-button--primary"), f = a.data("lang-liked")) : "unlike" === b && (a.attr("onclick", 'joms.view.page.like("' + c + '", "' + d + '");'), a.addClass("joms-button--neutral"), a.removeClass("joms-button--primary"), f = a.data("lang-like")),
			f = f || a.data("lang") || "",
			e = +e,
			e > 0 && (f += " (" + e + ")"),
			a.html(f)
		}
		return {
			initialize : c,
			like : d,
			unlike : e,
			share : f
		}
	}),
	function (a, b) {
		joms.api = b(a),
		c("api", ["functions/announcement", "functions/facebook", "functions/invitation", "utils/field", "popups/login", "popups/album", "popups/announcement", "popups/app", "popups/avatar", "popups/comment", "popups/cover", "popups/discussion", "popups/event", "popups/fbc", "popups/file", "popups/friend", "popups/group", "popups/inbox", "popups/location", "popups/notification", "popups/photo", "popups/pm", "popups/search", "popups/tnc", "popups/user", "popups/video", "views/cover", "views/page", "views/stream"], function () {
			return joms.api
		})
	}
	(window, function () {
		return {
			login : function (a) {
				joms.popup.login(a)
			},
			userChangeVanityURL : function (a) {
				joms.popup.user.changeVanityURL(a)
			},
			userAddFeatured : function (a) {
				joms.popup.user.addFeatured(a)
			},
			userRemoveFeatured : function (a) {
				joms.popup.user.removeFeatured(a)
			},
			userBan : function (a) {
				joms.popup.user.ban(a)
			},
			userUnban : function (a) {
				joms.popup.user.unban(a)
			},
			userBlock : function (a) {
				joms.popup.user.block(a)
			},
			userUnblock : function (a) {
				joms.popup.user.unblock(a)
			},
			userIgnore : function (a) {
				joms.popup.user.ignore(a)
			},
			userUnignore : function (a) {
				joms.popup.user.unignore(a)
			},
			userReport : function (a) {
				joms.popup.user.report(a)
			},
			avatarChange : function (a, b, c) {
				joms.popup.avatar.change(a, b),
				c && (c.stopPropagation(), c.preventDefault())
			},
			avatarRemove : function (a, b) {
				joms.popup.avatar.remove(a, b)
			},
			avatarRotate : function (a, b, c, d) {
				joms.popup.avatar.rotate(a, b, c, d)
			},
			coverChange : function (a, b) {
				joms.popup.cover.change(a, b)
			},
			coverRemove : function (a, b) {
				joms.popup.cover.remove(a, b)
			},
			coverReposition : function (a, b) {
				joms.view.cover.reposition(a, b)
			},
			eventInvite : function (a, b) {
				joms.popup.event.invite(a, b)
			},
			eventJoin : function (a) {
				joms.popup.event.join(a)
			},
			eventLeave : function (a) {
				joms.popup.event.leave(a)
			},
			eventResponse : function () {
				joms.popup.event.response.apply(this, arguments)
			},
			eventAddFeatured : function (a) {
				joms.popup.event.addFeatured(a)
			},
			eventRemoveFeatured : function (a) {
				joms.popup.event.removeFeatured(a)
			},
			eventReport : function (a) {
				joms.popup.event.report(a)
			},
			eventDelete : function (a) {
				joms.popup.event["delete"](a)
			},
			eventRejectGuest : function (a, b) {
				joms.popup.event.rejectGuest(a, b)
			},
			friendAdd : function (a) {
				joms.popup.friend.add(a)
			},
			friendAddCancel : function (a) {
				joms.popup.friend.addCancel(a)
			},
			friendRemove : function (a) {
				joms.popup.friend.remove(a)
			},
			friendResponse : function (a) {
				joms.popup.friend.response(a)
			},
			friendApprove : function (a) {
				joms.popup.friend.approve(a)
			},
			friendReject : function (a) {
				joms.popup.friend.reject(a)
			},
			groupInvite : function (a) {
				joms.popup.group.invite(a, 1, 1)
			},
			groupJoin : function (a) {
				joms.popup.group.join(a)
			},
			groupLeave : function (a) {
				joms.popup.group.leave(a)
			},
			groupAddFeatured : function (a) {
				joms.popup.group.addFeatured(a)
			},
			groupRemoveFeatured : function (a) {
				joms.popup.group.removeFeatured(a)
			},
			groupReport : function (a) {
				joms.popup.group.report(a)
			},
			groupUnpublish : function (a) {
				joms.popup.group.unpublish(a)
			},
			groupDelete : function (a) {
				joms.popup.group["delete"](a)
			},
			groupApprove : function (a, b) {
				joms.popup.group.approve(a, b)
			},
			groupRemoveMember : function (a, b) {
				joms.popup.group.removeMember(a, b)
			},
			groupBanMember : function (a, b) {
				joms.popup.group.banMember(a, b)
			},
			groupUnbanMember : function (a, b) {
				joms.popup.group.unbanMember(a, b)
			},
			notificationGeneral : function () {
				joms.view.toolbar.notificationGeneral()
			},
			notificationFriend : function () {
				joms.view.toolbar.notificationFriend()
			},
			notificationPm : function () {
				joms.view.toolbar.notificationPm()
			},
			photoUpload : function (a, b) {
				joms.popup.photo.upload(a, b)
			},
			photoOpen : function (a, b) {
				joms.popup.photo.open(a, b)
			},
			photoRemove : function (a) {
				joms.popup.photo.remove(a)
			},
			photoZoom : function (a) {
				joms.popup.photo.zoom(a)
			},
			photoSetAvatar : function (a) {
				joms.popup.photo.setAvatar(a)
			},
			photoSetCover : function (a, b) {
				joms.popup.photo.setCover(a, b)
			},
			photoReport : function (a, b) {
				joms.popup.photo.report(a, b)
			},
			albumRemove : function (a) {
				joms.popup.album.remove(a)
			},
			albumAddFeatured : function (a) {
				joms.popup.album.addFeatured(a)
			},
			albumRemoveFeatured : function (a) {
				joms.popup.album.removeFeatured(a)
			},
			pmSend : function (a) {
				joms.popup.pm.send(a)
			},
			videoAdd : function (a) {
				joms.popup.video.add(a)
			},
			videoOpen : function (a) {
				joms.popup.video.open(a)
			},
			videoEdit : function (a) {
				joms.popup.video.edit(a)
			},
			videoRemove : function (a) {
				joms.popup.video.remove(a)
			},
			videoAddFeatured : function (a) {
				joms.popup.video.addFeatured(a)
			},
			videoRemoveFeatured : function (a) {
				joms.popup.video.removeFeatured(a)
			},
			videoLinkToProfile : function (a) {
				joms.popup.video.linkToProfile(a)
			},
			videoRemoveLinkFromProfile : function (a, b) {
				joms.popup.video.removeLinkFromProfile(a, b)
			},
			videoFetchThumbnail : function (a) {
				joms.popup.video.fetchThumbnail(a)
			},
			videoReport : function (a, b) {
				joms.popup.video.report(a, b)
			},
			locationView : function (a) {
				joms.popup.location.view(a)
			},
			streamLike : function (a) {
				joms.view.stream.like(a)
			},
			streamUnlike : function (a) {
				joms.view.stream.unlike(a)
			},
			streamEdit : function (a, b) {
				joms.view.stream.edit(a, b)
			},
			streamEditLocation : function (a) {
				joms.view.stream.editLocation(a)
			},
			streamRemove : function (a) {
				joms.view.stream.remove(a)
			},
			streamRemoveLocation : function (a) {
				joms.view.stream.removeLocation(a)
			},
			streamRemoveMood : function (a) {
				joms.view.stream.removeMood(a)
			},
			streamRemoveTag : function (a) {
				joms.view.stream.removeTag(a)
			},
			streamSelectPrivacy : function (a) {
				joms.view.stream.selectPrivacy(a)
			},
			streamShare : function (a) {
				joms.view.stream.share(a)
			},
			streamHide : function (a, b) {
				joms.view.stream.hide(a, b)
			},
			streamShowLikes : function (a, b) {
				joms.view.stream.showLikes(a, b)
			},
			streamShowComments : function (a, b) {
				joms.view.stream.showComments(a, b)
			},
			streamShowOthers : function (a) {
				joms.view.stream.showOthers(a)
			},
			streamReport : function (a) {
				joms.view.stream.report(a)
			},
			streamToggleText : function (a) {
				joms.view.stream.toggleText(a)
			},
			streamsLoadMore : function () {
				joms.view.streams.loadMore()
			},
			commentLike : function (a) {
				joms.view.comment.like(a)
			},
			commentUnlike : function (a) {
				joms.view.comment.unlike(a)
			},
			commentEdit : function (a, b, c) {
				joms.view.comment.edit(a, b, c)
			},
			commentCancel : function (a) {
				joms.view.comment.cancel(a)
			},
			commentRemove : function (a, b) {
				joms.view.comment.remove(a, b)
			},
			commentRemoveTag : function (a, b) {
				joms.view.comment.removeTag(a, b)
			},
			commentRemovePreview : function (a, b) {
				joms.view.comment.removePreview(a, b)
			},
			commentRemoveThumbnail : function (a, b) {
				joms.view.comment.removeThumbnail(a, b)
			},
			commentShowLikes : function (a) {
				joms.popup.comment.showLikes(a)
			},
			commentToggleText : function (a) {
				joms.view.comment.toggleText(a)
			},
			appAbout : function (a) {
				joms.popup.app.about(a)
			},
			appBrowse : function (a) {
				joms.popup.app.browse(a)
			},
			appPrivacy : function (a) {
				joms.popup.app.privacy(a)
			},
			appRemove : function (a) {
				joms.popup.app.remove(a)
			},
			appSetting : function (a, b) {
				joms.popup.app.setting(a, b)
			},
			searchSave : function (a) {
				joms.popup.search.save(a)
			},
			pageLike : function (a, b) {
				joms.view.page.like(a, b)
			},
			pageUnlike : function (a, b) {
				joms.view.page.unlike(a, b)
			},
			pageShare : function (a) {
				joms.view.page.share(a)
			},
			invitationAccept : function (a, b) {
				joms.fn.invitation.accept(a, b)
			},
			invitationReject : function (a, b) {
				joms.fn.invitation.reject(a, b)
			},
			fileUpload : function (a, b) {
				joms.popup.file.upload(a, b)
			},
			fileList : function (a, b) {
				joms.popup.file.list(a, b)
			},
			fileDownload : function (a, b, c) {
				joms.popup.file.download(a, b, c)
			},
			fileRemove : function (a, b) {
				joms.popup.file.remove(a, b)
			},
			discussionLock : function (a, b) {
				joms.popup.discussion.lock(a, b)
			},
			discussionRemove : function (a, b) {
				joms.popup.discussion.remove(a, b)
			},
			announcementEdit : function (a, b) {
				joms.fn.announcement.edit(a, b)
			},
			announcementEditCancel : function (a, b) {
				joms.fn.announcement.editCancel(a, b)
			},
			announcementRemove : function (a, b) {
				joms.popup.announcement.remove(a, b)
			},
			inboxRemove : function (a, b) {
				joms.popup.inbox.remove(a, b)
			},
			inboxSetRead : function (a, b) {
				joms.popup.inbox.setRead(a, b)
			},
			inboxSetUnread : function (a, b) {
				joms.popup.inbox.setUnread(a, b)
			},
			tnc : function () {
				joms.popup.tnc()
			},
			fbcUpdate : function () {
				joms.popup.fbc.update()
			}
		}
	}),
	b(["core", "utils/crop", "utils/dropdown", "utils/loadlib", "utils/popup", "utils/tab", "utils/tagging", "utils/validation", "utils/video", "utils/wysiwyg", "functions/tagging", "views/comment", "views/misc", "views/stream", "views/streams", "views/toolbar", "api"], function () {
		joms.onStart(function () {
			joms.view.comment.start(),
			joms.view.page.initialize(),
			joms.view.stream.start(),
			joms.view.streams.start(),
			joms.view.toolbar.start(),
			joms.view.misc.start(),
			joms.util.dropdown.start(),
			joms.util.tab.start(),
			joms.util.validation.start(),
			joms.util.wysiwyg.start(),
			+window.joms_my_id && joms.fn.tagging.fetchFriendsInContext()
		}),
		joms.start()
	}),
	c("init", function () {}),
	b.config({
		deps : ["init"]
	}),
	c("bundle", function () {})
}
();
