function getUrlParameter(t) {
    for (var e = window.location.search.substring(1), n = e.split("&"), i = 0; i < n.length; i++) {
        var r = n[i].split("=");
        if (r[0] == t) return r[1]
    }
}! function() {
    var t = window.analytics = window.analytics || [];
    if (!t.initialize) {
        if (t.invoked) return void(window.console && console.error && console.error("Segment snippet included twice."));
        t.invoked = !0, t.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "group", "track", "ready", "alias", "page", "once", "off", "on"], t.factory = function(e) {
            return function() {
                var n = Array.prototype.slice.call(arguments);
                return n.unshift(e), t.push(n), t
            }
        };
        for (var e = 0; e < t.methods.length; e++) {
            var n = t.methods[e];
            t[n] = t.factory(n)
        }
        t.load = function(t) {
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(e, n)
        }, t.SNIPPET_VERSION = "3.0.1", t.load("p29w88lvw4")
    }
}(),
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    function e(t) {
        return s.raw ? t : encodeURIComponent(t)
    }

    function n(t) {
        return s.raw ? t : decodeURIComponent(t)
    }

    function i(t) {
        return e(s.json ? JSON.stringify(t) : String(t))
    }

    function r(t) {
        0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return t = decodeURIComponent(t.replace(o, " ")), s.json ? JSON.parse(t) : t
        } catch (e) {}
    }

    function a(e, n) {
        var i = s.raw ? e : r(e);
        return t.isFunction(n) ? n(i) : i
    }
    var o = /\+/g,
        s = t.cookie = function(r, o, u) {
            if (arguments.length > 1 && !t.isFunction(o)) {
                if (u = t.extend({}, s.defaults, u), "number" == typeof u.expires) {
                    var c = u.expires,
                        l = u.expires = new Date;
                    l.setMilliseconds(l.getMilliseconds() + 864e5 * c)
                }
                return document.cookie = [e(r), "=", i(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
            }
            for (var d = r ? void 0 : {}, f = document.cookie ? document.cookie.split("; ") : [], h = 0, p = f.length; p > h; h++) {
                var m = f[h].split("="),
                    g = n(m.shift()),
                    v = m.join("=");
                if (r === g) {
                    d = a(v, o);
                    break
                }
                r || void 0 === (v = a(v)) || (d[g] = v)
            }
            return d
        };
    s.defaults = {}, t.removeCookie = function(e, n) {
        return t.cookie(e, "", t.extend({}, n, {
            expires: -1
        })), !t.cookie(e)
    }
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
    var e, n, i, r, a, o, s = "Close",
        u = "BeforeClose",
        c = "AfterClose",
        l = "BeforeAppend",
        d = "MarkupParse",
        f = "Open",
        h = "Change",
        p = "mfp",
        m = "." + p,
        g = "mfp-ready",
        v = "mfp-removing",
        y = "mfp-prevent-close",
        b = function() {}, w = !! window.jQuery,
        C = t(window),
        k = function(t, n) {
            e.ev.on(p + t + m, n)
        }, F = function(e, n, i, r) {
            var a = document.createElement("div");
            return a.className = "mfp-" + e, i && (a.innerHTML = i), r ? n && n.appendChild(a) : (a = t(a), n && a.appendTo(n)), a
        }, x = function(n, i) {
            e.ev.triggerHandler(p + n, i), e.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), e.st.callbacks[n] && e.st.callbacks[n].apply(e, t.isArray(i) ? i : [i]))
        }, E = function(n) {
            return n === o && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), o = n), e.currTemplate.closeBtn
        }, $ = function() {
            t.magnificPopup.instance || (e = new b, e.init(), t.magnificPopup.instance = e)
        }, I = function() {
            var t = document.createElement("p").style,
                e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition) return !0;
            for (; e.length;)
                if (e.pop() + "Transition" in t) return !0;
            return !1
        };
    b.prototype = {
        constructor: b,
        init: function() {
            var n = navigator.appVersion;
            e.isIE7 = -1 !== n.indexOf("MSIE 7."), e.isIE8 = -1 !== n.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(n), e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = I(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = t(document), e.popupsCache = {}
        },
        open: function(n) {
            var r;
            if (n.isObj === !1) {
                e.items = n.items.toArray(), e.index = 0;
                var o, s = n.items;
                for (r = 0; r < s.length; r++)
                    if (o = s[r], o.parsed && (o = o.el[0]), o === n.el[0]) {
                        e.index = r;
                        break
                    }
            } else e.items = t.isArray(n.items) ? n.items : [n.items], e.index = n.index || 0; if (e.isOpen) return void e.updateItemHTML();
            e.types = [], a = "", e.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : i, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), e.currTemplate = e.popupsCache[n.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = F("bg").on("click" + m, function() {
                e.close()
            }), e.wrap = F("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                e._checkIfClose(t.target) && e.close()
            }), e.container = F("container", e.wrap)), e.contentContainer = F("content"), e.st.preloader && (e.preloader = F("preloader", e.container, e.st.tLoading));
            var u = t.magnificPopup.modules;
            for (r = 0; r < u.length; r++) {
                var c = u[r];
                c = c.charAt(0).toUpperCase() + c.slice(1), e["init" + c].call(e)
            }
            x("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (k(d, function(t, e, n, i) {
                n.close_replaceWith = E(i.type)
            }), a += " mfp-close-btn-in") : e.wrap.append(E())), e.st.alignTop && (a += " mfp-align-top"), e.wrap.css(e.fixedContentPos ? {
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            } : {
                top: C.scrollTop(),
                position: "absolute"
            }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: i.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && i.on("keyup" + m, function(t) {
                27 === t.keyCode && e.close()
            }), C.on("resize" + m, function() {
                e.updateSize()
            }), e.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && e.wrap.addClass(a);
            var l = e.wH = C.height(),
                h = {};
            if (e.fixedContentPos && e._hasScrollBar(l)) {
                var p = e._getScrollbarSize();
                p && (h.marginRight = p)
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : h.overflow = "hidden");
            var v = e.st.mainClass;
            return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), x("BuildControls"), t("html").css(h), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                e.content ? (e._addClassToMFP(g), e._setFocus()) : e.bgOverlay.addClass(g), i.on("focusin" + m, e._onFocusIn)
            }, 16), e.isOpen = !0, e.updateSize(l), x(f), n
        },
        close: function() {
            e.isOpen && (x(u), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(v), setTimeout(function() {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function() {
            x(s);
            var n = v + " " + g + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), e._removeClassFromMFP(n), e.fixedContentPos) {
                var r = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : r.overflow = "", t("html").css(r)
            }
            i.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, x(c)
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                e.wrap.css("height", i), e.wH = i
            } else e.wH = t || C.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), x("Resize")
        },
        updateItemHTML: function() {
            var n = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
            var i = n.type;
            if (x("BeforeChange", [e.currItem ? e.currItem.type : "", i]), e.currItem = n, !e.currTemplate[i]) {
                var a = e.st[i] ? e.st[i].markup : !1;
                x("FirstMarkupParse", a), e.currTemplate[i] = a ? t(a) : !0
            }
            r && r !== n.type && e.container.removeClass("mfp-" + r + "-holder");
            var o = e["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, e.currTemplate[i]);
            e.appendContent(o, i), n.preloaded = !0, x(h, n), r = n.type, e.container.prepend(e.contentContainer), x("AfterChange")
        },
        appendContent: function(t, n) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[n] === !0 ? e.content.find(".mfp-close").length || e.content.append(E()) : e.content = t : e.content = "", x(l), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content)
        },
        parseEl: function(n) {
            var i, r = e.items[n];
            if (r.tagName ? r = {
                el: t(r)
            } : (i = r.type, r = {
                data: r,
                src: r.src
            }), r.el) {
                for (var a = e.types, o = 0; o < a.length; o++)
                    if (r.el.hasClass("mfp-" + a[o])) {
                        i = a[o];
                        break
                    }
                r.src = r.el.attr("data-mfp-src"), r.src || (r.src = r.el.attr("href"))
            }
            return r.type = i || e.st.type || "inline", r.index = n, r.parsed = !0, e.items[n] = r, x("ElementParse", r), e.items[n]
        },
        addGroup: function(t, n) {
            var i = function(i) {
                i.mfpEl = this, e._openClick(i, t, n)
            };
            n || (n = {});
            var r = "click.magnificPopup";
            n.mainEl = t, n.items ? (n.isObj = !0, t.off(r).on(r, i)) : (n.isObj = !1, n.delegate ? t.off(r).on(r, n.delegate, i) : (n.items = t, t.off(r).on(r, i)))
        },
        _openClick: function(n, i, r) {
            var a = void 0 !== r.midClick ? r.midClick : t.magnificPopup.defaults.midClick;
            if (a || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var o = void 0 !== r.disableOn ? r.disableOn : t.magnificPopup.defaults.disableOn;
                if (o)
                    if (t.isFunction(o)) {
                        if (!o.call(e)) return !0
                    } else if (C.width() < o) return !0;
                n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), r.el = t(n.mfpEl), r.delegate && (r.items = i.find(r.delegate)), e.open(r)
            }
        },
        updateStatus: function(t, i) {
            if (e.preloader) {
                n !== t && e.container.removeClass("mfp-s-" + n), i || "loading" !== t || (i = e.st.tLoading);
                var r = {
                    status: t,
                    text: i
                };
                x("UpdateStatus", r), t = r.status, i = r.text, e.preloader.html(i), e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), n = t
            }
        },
        _checkIfClose: function(n) {
            if (!t(n).hasClass(y)) {
                var i = e.st.closeOnContentClick,
                    r = e.st.closeOnBgClick;
                if (i && r) return !0;
                if (!e.content || t(n).hasClass("mfp-close") || e.preloader && n === e.preloader[0]) return !0;
                if (n === e.content[0] || t.contains(e.content[0], n)) {
                    if (i) return !0
                } else if (r && t.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? i.height() : document.body.scrollHeight) > (t || C.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function(n) {
            return n.target === e.wrap[0] || t.contains(e.wrap[0], n.target) ? void 0 : (e._setFocus(), !1)
        },
        _parseMarkup: function(e, n, i) {
            var r;
            i.data && (n = t.extend(i.data, n)), x(d, [e, n, i]), t.each(n, function(t, n) {
                if (void 0 === n || n === !1) return !0;
                if (r = t.split("_"), r.length > 1) {
                    var i = e.find(m + "-" + r[0]);
                    if (i.length > 0) {
                        var a = r[1];
                        "replaceWith" === a ? i[0] !== n[0] && i.replaceWith(n) : "img" === a ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(r[1], n)
                    }
                } else e.find(m + "-" + t).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(e, n) {
            return $(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = n || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, n) {
            n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, t.fn.magnificPopup = function(n) {
        $();
        var i = t(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var r, a = w ? i.data("magnificPopup") : i[0].magnificPopup,
                    o = parseInt(arguments[1], 10) || 0;
                a.items ? r = a.items[o] : (r = i, a.delegate && (r = r.find(a.delegate)), r = r.eq(o)), e._openClick({
                    mfpEl: r
                }, i, a)
            } else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1));
            else n = t.extend(!0, {}, n), w ? i.data("magnificPopup", n) : i[0].magnificPopup = n, e.addGroup(i, n);
        return i
    };
    var S, _, P, A = "inline",
        T = function() {
            P && (_.after(P.addClass(S)).detach(), P = null)
        };
    t.magnificPopup.registerModule(A, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(A), k(s + "." + A, function() {
                    T()
                })
            },
            getInline: function(n, i) {
                if (T(), n.src) {
                    var r = e.st.inline,
                        a = t(n.src);
                    if (a.length) {
                        var o = a[0].parentNode;
                        o && o.tagName && (_ || (S = r.hiddenClass, _ = F(S), S = "mfp-" + S), P = a.after(_).detach().removeClass(S)), e.updateStatus("ready")
                    } else e.updateStatus("error", r.tNotFound), a = t("<div>");
                    return n.inlineElement = a, a
                }
                return e.updateStatus("ready"), e._parseMarkup(i, {}, n), i
            }
        }
    });
    var O, D = function(n) {
            if (n.data && void 0 !== n.data.title) return n.data.title;
            var i = e.st.image.titleSrc;
            if (i) {
                if (t.isFunction(i)) return i.call(e, n);
                if (n.el) return n.el.attr(i) || ""
            }
            return ""
        };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var n = e.st.image,
                    i = ".image";
                e.types.push("image"), k(f + i, function() {
                    "image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor)
                }), k(s + i, function() {
                    n.cursor && t(document.body).removeClass(n.cursor), C.off("resize" + m)
                }), k("Resize" + i, e.resizeImage), e.isLowIE && k("AfterChange", e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var n = 0;
                    e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - n)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, O && clearInterval(O), t.isCheckingImgSize = !1, x("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var n = 0,
                    i = t.img[0],
                    r = function(a) {
                        O && clearInterval(O), O = setInterval(function() {
                            return i.naturalWidth > 0 ? void e._onImageHasSize(t) : (n > 200 && clearInterval(O), n++, void(3 === n ? r(10) : 40 === n ? r(50) : 100 === n && r(500)))
                        }, a)
                    };
                r(1)
            },
            getImage: function(n, i) {
                var r = 0,
                    a = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, x("ImageLoadComplete")) : (r++, 200 > r ? setTimeout(a, 100) : o()))
                    }, o = function() {
                        n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    }, s = e.st.image,
                    u = i.find(".mfp-img");
                if (u.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = t(c).on("load.mfploader", a).on("error.mfploader", o), c.src = n.src, u.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return e._parseMarkup(i, {
                    title: D(n),
                    img_replaceWith: n.img
                }, n), e.resizeImage(), n.hasSize ? (O && clearInterval(O), n.loadError ? (i.addClass("mfp-loading"), e.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), e.updateStatus("ready")), i) : (e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), e.findImageSize(n)), i)
            }
        }
    });
    var R, N = function() {
            return void 0 === R && (R = void 0 !== document.createElement("p").style.MozTransform), R
        };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, n = e.st.zoom,
                    i = ".zoom";
                if (n.enabled && e.supportsTransition) {
                    var r, a, o = n.duration,
                        c = function(t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                r = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                }, a = "transition";
                            return r["-webkit-" + a] = r["-moz-" + a] = r["-o-" + a] = r[a] = i, e.css(r), e
                        }, l = function() {
                            e.content.css("visibility", "visible")
                        };
                    k("BuildControls" + i, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void l();
                            a = c(t), a.css(e._getOffset()), e.wrap.append(a), r = setTimeout(function() {
                                a.css(e._getOffset(!0)), r = setTimeout(function() {
                                    l(), setTimeout(function() {
                                        a.remove(), t = a = null, x("ZoomAnimationEnded")
                                    }, 16)
                                }, o)
                            }, 16)
                        }
                    }), k(u + i, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.st.removalDelay = o, !t) {
                                if (t = e._getItemToZoom(), !t) return;
                                a = c(t)
                            }
                            a.css(e._getOffset(!0)), e.wrap.append(a), e.content.css("visibility", "hidden"), setTimeout(function() {
                                a.css(e._getOffset())
                            }, 16)
                        }
                    }), k(s + i, function() {
                        e._allowZoom() && (l(), a && a.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function() {
                return e.currItem.hasSize ? e.currItem.img : !1
            },
            _getOffset: function(n) {
                var i;
                i = n ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var r = i.offset(),
                    a = parseInt(i.css("padding-top"), 10),
                    o = parseInt(i.css("padding-bottom"), 10);
                r.top -= t(window).scrollTop() - a;
                var s = {
                    width: i.width(),
                    height: (w ? i.innerHeight() : i[0].offsetHeight) - o - a
                };
                return N() ? s["-moz-transform"] = s.transform = "translate(" + r.left + "px," + r.top + "px)" : (s.left = r.left, s.top = r.top), s
            }
        }
    });
    var q = "iframe",
        z = "//about:blank",
        M = function(t) {
            if (e.currTemplate[q]) {
                var n = e.currTemplate[q].find("iframe");
                n.length && (t || (n[0].src = z), e.isIE8 && n.css("display", t ? "block" : "none"))
            }
        };
    t.magnificPopup.registerModule(q, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(q), k("BeforeChange", function(t, e, n) {
                    e !== n && (e === q ? M() : n === q && M(!0))
                }), k(s + "." + q, function() {
                    M()
                })
            },
            getIframe: function(n, i) {
                var r = n.src,
                    a = e.st.iframe;
                t.each(a.patterns, function() {
                    return r.indexOf(this.index) > -1 ? (this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : this.id.call(this, r)), r = this.src.replace("%id%", r), !1) : void 0
                });
                var o = {};
                return a.srcAction && (o[a.srcAction] = r), e._parseMarkup(i, o, n), e.updateStatus("ready"), i
            }
        }
    });
    var j = function(t) {
        var n = e.items.length;
        return t > n - 1 ? t - n : 0 > t ? n + t : t
    }, L = function(t, e, n) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n)
        };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = e.st.gallery,
                    r = ".mfp-gallery",
                    o = Boolean(t.fn.mfpFastClick);
                return e.direction = !0, n && n.enabled ? (a += " mfp-gallery", k(f + r, function() {
                    n.navigateByImgClick && e.wrap.on("click" + r, ".mfp-img", function() {
                        return e.items.length > 1 ? (e.next(), !1) : void 0
                    }), i.on("keydown" + r, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), k("UpdateStatus" + r, function(t, n) {
                    n.text && (n.text = L(n.text, e.currItem.index, e.items.length))
                }), k(d + r, function(t, i, r, a) {
                    var o = e.items.length;
                    r.counter = o > 1 ? L(n.tCounter, a.index, o) : ""
                }), k("BuildControls" + r, function() {
                    if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                        var i = n.arrowMarkup,
                            r = e.arrowLeft = t(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            a = e.arrowRight = t(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = o ? "mfpFastClick" : "click";
                        r[s](function() {
                            e.prev()
                        }), a[s](function() {
                            e.next()
                        }), e.isIE7 && (F("b", r[0], !1, !0), F("a", r[0], !1, !0), F("b", a[0], !1, !0), F("a", a[0], !1, !0)), e.container.append(r.add(a))
                    }
                }), k(h + r, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void k(s + r, function() {
                    i.off(r), e.wrap.off("click" + r), e.arrowLeft && o && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
                })) : !1
            },
            next: function() {
                e.direction = !0, e.index = j(e.index + 1), e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1, e.index = j(e.index - 1), e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, n = e.st.gallery.preload,
                    i = Math.min(n[0], e.items.length),
                    r = Math.min(n[1], e.items.length);
                for (t = 1; t <= (e.direction ? r : i); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? i : r); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function(n) {
                if (n = j(n), !e.items[n].preloaded) {
                    var i = e.items[n];
                    i.parsed || (i = e.parseEl(n)), x("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, x("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    }), $()
}),
function(t, e, n) {
    "use strict";
    var i = {
        minHeight: 0,
        elements: [],
        percentage: !0,
        userTiming: !0,
        pixelDepth: !0,
        nonInteraction: !0
    }, r = t(e),
        a = [];
    t.scrollDepth = function(o) {
        function s(t, e) {
            analytics.track(t, {
                category: "Scrolling",
                label: e,
                nonInteraction: 1
            })
        }

        function u(t) {
            return {
                "25%": parseInt(.25 * t, 10),
                "50%": parseInt(.5 * t, 10),
                "75%": parseInt(.75 * t, 10),
                "100%": t - 5
            }
        }

        function c(e, n, i) {
            t.each(e, function(e, r) {
                -1 === t.inArray(e, a) && n >= r && (s("Percentage", e, n, i), a.push(e))
            })
        }

        function l(e, n, i) {
            t.each(e, function(e, r) {
                var o = t(r).data("element"); - 1 === t.inArray(r, a) && t(r).length && n >= t(r).offset().top && (s("Elements", o, n, i), a.push(r))
            })
        }

        function d(t, e) {
            var n, i, r, a = null,
                o = 0,
                s = function() {
                    o = new Date, a = null, r = t.apply(n, i)
                };
            return function() {
                var u = new Date;
                o || (o = u);
                var c = e - (u - o);
                return n = this, i = arguments, 0 >= c ? (clearTimeout(a), a = null, o = u, r = t.apply(n, i)) : a || (a = setTimeout(s, c)), r
            }
        }
        var f = +new Date;
        o = t.extend({}, i, o), t(n).height() < o.minHeight || r.on("scroll.scrollDepth", d(function() {
            var i = t(n).height(),
                s = e.innerHeight ? e.innerHeight : r.height(),
                d = r.scrollTop() + s,
                h = u(i),
                p = +new Date - f;
            return a.length >= 4 + o.elements.length ? void r.off("scroll.scrollDepth") : (o.elements && l(o.elements, d, p), void(o.percentage && c(h, d, p)))
        }, 500))
    }
}(jQuery, window, document), StatusPage = "undefined" == typeof StatusPage ? {} : StatusPage, StatusPage.page = function(t) {
    if (t = t || {}, !t.page) throw new Error("A pageId is required to initialize.");
    this.apiKey = t.apiKey || null, this.error = t.error || this.error, this.format = t.format || "json", this.pageId = t.page, this.version = t.version || "v2", this.secure = "secure" in t ? t.secure : !0, this.protocol = this.secure ? "https" : "http", this.host = t.host || "hosted.statuspage.io", this.host_with_port_and_protocol = t.test ? "" : this.protocol + "://" + this.host
}, StatusPage.page.prototype.serialize = function(t, e) {
    var n = [],
        i = {
            sms: "email_sms",
            webhook: "endpoint"
        };
    for (var r in t)
        if ("to_sentence" !== r) {
            var a = r;
            r = r in i ? i[r] : r;
            var o = e ? e + "[" + r + "]" : r,
                s = t[a];
            n.push("object" == typeof s ? this.serialize(s, o) : encodeURIComponent(o) + "=" + encodeURIComponent(s))
        }
    return n.join("&")
}, StatusPage.page.prototype.createStatusPageCORSRequest = function(t, e) {
    var n = new XMLHttpRequest;
    return "withCredentials" in n ? n.open(t, e, !0) : "undefined" != typeof XDomainRequest ? (n = new XDomainRequest, n.open(t, e)) : n = null, n
}, StatusPage.page.prototype.executeRequestAndCallbackWithResponse = function(t) {
    if (!t.path) throw new Error("A path is required to make a request");
    var e = t.path,
        n = t.method || "GET",
        i = t.success || null,
        r = t.error || this.error,
        a = this.host_with_port_and_protocol.replace("hosted", this.pageId) + "/api/" + this.version + "/" + e + "." + this.format,
        o = this.createStatusPageCORSRequest(n, a);
    if (o)
        if (this.apiKey && (console.log("!!! API KEY IN USE - REMOVE BEFORE DEPLOYING TO PRODUCTION !!!"), console.log("!!! API KEY IN USE - REMOVE BEFORE DEPLOYING TO PRODUCTION !!!"), console.log("!!! API KEY IN USE - REMOVE BEFORE DEPLOYING TO PRODUCTION !!!"), o.setRequestHeader("Authorization", "OAuth " + this.apiKey)), o.onload = function() {
            var t = JSON.parse(o.responseText);
            i && i(t)
        }, o.error = r, "POST" === n || "DELETE" === n) {
            var s = t.data || {};
            o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.send(this.serialize(s))
        } else o.send()
}, StatusPage.page.prototype.get = function(t, e) {
    if (e = e || {}, !t) throw new Error("Path is required.");
    if (!e.success) throw new Error("Success Callback is required.");
    var n = e.success || {}, i = e.error || {};
    this.executeRequestAndCallbackWithResponse({
        path: t,
        success: n,
        error: i,
        method: "GET"
    })
}, StatusPage.page.prototype.post = function(t, e) {
    if (e = e || {}, !t) throw new Error("Path is required.");
    var n = {};
    if ("subscribers" === t) {
        if (!e.subscriber) throw new Error("Subscriber is required to post.");
        n.subscriber = e.subscriber
    } else {
        if (!e.data) throw new Error("Data is required to post.");
        n = e.data
    }
    var i = e.success || {}, r = e.error || {};
    this.executeRequestAndCallbackWithResponse({
        data: n,
        path: t,
        success: i,
        error: r,
        method: "POST"
    })
}, StatusPage.page.prototype["delete"] = function(t, e) {
    if (e = e || {}, !t) throw new Error("Path is required.");
    if (!e.subscriber) throw new Error("Data is required to delete.");
    var n = {};
    "subscribers" === t ? n.subscriber = e.subscriber : n = e.data;
    var i = e.success || {}, r = e.error || {};
    this.executeRequestAndCallbackWithResponse({
        data: n,
        path: t,
        success: i,
        error: r,
        method: "DELETE"
    })
}, StatusPage.page.prototype.error = function() {
    console.log("There was an error with your request")
}, StatusPage.page.prototype.summary = function(t) {
    this.get("summary", t)
}, StatusPage.page.prototype.status = function(t) {
    this.get("status", t)
}, StatusPage.page.prototype.components = function(t) {
    this.get("components", t)
}, StatusPage.page.prototype.incidents = function(t) {
    switch (t.filter) {
        case "unresolved":
            this.get("incidents/unresolved", t);
            break;
        case "resolved":
            this.get("incidents/resolved", t);
            break;
        default:
            this.get("incidents", t)
    }
}, StatusPage.page.prototype.scheduled_maintenances = function(t) {
    switch (t.filter) {
        case "active":
            this.get("scheduled-maintenances/active", t);
            break;
        case "upcoming":
            this.get("scheduled-maintenances/upcoming", t);
            break;
        default:
            this.get("scheduled-maintenances", t)
    }
}, StatusPage.page.prototype.subscribe = function(t) {
    if (!t || !t.subscriber) throw new Error("A subscriber object is required.");
    this.post("subscribers", t)
}, StatusPage.page.prototype.unsubscribe = function(t) {
    if (!t || !t.subscriber) throw new Error("A subscriber object is required.");
    if (!t.subscriber.id) throw new Error("You must supply a subscriber.id in order to cancel a subscription.");
    this["delete"]("subscribers", t)
},
function() {
    var t = this,
        e = t._,
        n = {}, i = Array.prototype,
        r = Object.prototype,
        a = Function.prototype,
        o = i.push,
        s = i.slice,
        u = i.concat,
        c = r.toString,
        l = r.hasOwnProperty,
        d = i.forEach,
        f = i.map,
        h = i.reduce,
        p = i.reduceRight,
        m = i.filter,
        g = i.every,
        v = i.some,
        y = i.indexOf,
        b = i.lastIndexOf,
        w = Array.isArray,
        C = Object.keys,
        k = a.bind,
        F = function(t) {
            return t instanceof F ? t : this instanceof F ? void(this._wrapped = t) : new F(t)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = F), exports._ = F) : t._ = F, F.VERSION = "1.4.4";
    var x = F.each = F.forEach = function(t, e, i) {
        if (null != t)
            if (d && t.forEach === d) t.forEach(e, i);
            else if (t.length === +t.length) {
            for (var r = 0, a = t.length; a > r; r++)
                if (e.call(i, t[r], r, t) === n) return
        } else
            for (var o in t)
                if (F.has(t, o) && e.call(i, t[o], o, t) === n) return
    };
    F.map = F.collect = function(t, e, n) {
        var i = [];
        return null == t ? i : f && t.map === f ? t.map(e, n) : (x(t, function(t, r, a) {
            i[i.length] = e.call(n, t, r, a)
        }), i)
    };
    var E = "Reduce of empty array with no initial value";
    F.reduce = F.foldl = F.inject = function(t, e, n, i) {
        var r = arguments.length > 2;
        if (null == t && (t = []), h && t.reduce === h) return i && (e = F.bind(e, i)), r ? t.reduce(e, n) : t.reduce(e);
        if (x(t, function(t, a, o) {
            r ? n = e.call(i, n, t, a, o) : (n = t, r = !0)
        }), !r) throw new TypeError(E);
        return n
    }, F.reduceRight = F.foldr = function(t, e, n, i) {
        var r = arguments.length > 2;
        if (null == t && (t = []), p && t.reduceRight === p) return i && (e = F.bind(e, i)), r ? t.reduceRight(e, n) : t.reduceRight(e);
        var a = t.length;
        if (a !== +a) {
            var o = F.keys(t);
            a = o.length
        }
        if (x(t, function(s, u, c) {
            u = o ? o[--a] : --a, r ? n = e.call(i, n, t[u], u, c) : (n = t[u], r = !0)
        }), !r) throw new TypeError(E);
        return n
    }, F.find = F.detect = function(t, e, n) {
        var i;
        return $(t, function(t, r, a) {
            return e.call(n, t, r, a) ? (i = t, !0) : void 0
        }), i
    }, F.filter = F.select = function(t, e, n) {
        var i = [];
        return null == t ? i : m && t.filter === m ? t.filter(e, n) : (x(t, function(t, r, a) {
            e.call(n, t, r, a) && (i[i.length] = t)
        }), i)
    }, F.reject = function(t, e, n) {
        return F.filter(t, function(t, i, r) {
            return !e.call(n, t, i, r)
        }, n)
    }, F.every = F.all = function(t, e, i) {
        e || (e = F.identity);
        var r = !0;
        return null == t ? r : g && t.every === g ? t.every(e, i) : (x(t, function(t, a, o) {
            return (r = r && e.call(i, t, a, o)) ? void 0 : n
        }), !! r)
    };
    var $ = F.some = F.any = function(t, e, i) {
        e || (e = F.identity);
        var r = !1;
        return null == t ? r : v && t.some === v ? t.some(e, i) : (x(t, function(t, a, o) {
            return r || (r = e.call(i, t, a, o)) ? n : void 0
        }), !! r)
    };
    F.contains = F.include = function(t, e) {
        return null == t ? !1 : y && t.indexOf === y ? -1 != t.indexOf(e) : $(t, function(t) {
            return t === e
        })
    }, F.invoke = function(t, e) {
        var n = s.call(arguments, 2),
            i = F.isFunction(e);
        return F.map(t, function(t) {
            return (i ? e : t[e]).apply(t, n)
        })
    }, F.pluck = function(t, e) {
        return F.map(t, function(t) {
            return t[e]
        })
    }, F.where = function(t, e, n) {
        return F.isEmpty(e) ? n ? null : [] : F[n ? "find" : "filter"](t, function(t) {
            for (var n in e)
                if (e[n] !== t[n]) return !1;
            return !0
        })
    }, F.findWhere = function(t, e) {
        return F.where(t, e, !0)
    }, F.max = function(t, e, n) {
        if (!e && F.isArray(t) && t[0] === +t[0] && 65535 > t.length) return Math.max.apply(Math, t);
        if (!e && F.isEmpty(t)) return -1 / 0;
        var i = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return x(t, function(t, r, a) {
            var o = e ? e.call(n, t, r, a) : t;
            o >= i.computed && (i = {
                value: t,
                computed: o
            })
        }), i.value
    }, F.min = function(t, e, n) {
        if (!e && F.isArray(t) && t[0] === +t[0] && 65535 > t.length) return Math.min.apply(Math, t);
        if (!e && F.isEmpty(t)) return 1 / 0;
        var i = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return x(t, function(t, r, a) {
            var o = e ? e.call(n, t, r, a) : t;
            i.computed > o && (i = {
                value: t,
                computed: o
            })
        }), i.value
    }, F.shuffle = function(t) {
        var e, n = 0,
            i = [];
        return x(t, function(t) {
            e = F.random(n++), i[n - 1] = i[e], i[e] = t
        }), i
    };
    var I = function(t) {
        return F.isFunction(t) ? t : function(e) {
            return e[t]
        }
    };
    F.sortBy = function(t, e, n) {
        var i = I(e);
        return F.pluck(F.map(t, function(t, e, r) {
            return {
                value: t,
                index: e,
                criteria: i.call(n, t, e, r)
            }
        }).sort(function(t, e) {
            var n = t.criteria,
                i = e.criteria;
            if (n !== i) {
                if (n > i || void 0 === n) return 1;
                if (i > n || void 0 === i) return -1
            }
            return t.index < e.index ? -1 : 1
        }), "value")
    };
    var S = function(t, e, n, i) {
        var r = {}, a = I(e || F.identity);
        return x(t, function(e, o) {
            var s = a.call(n, e, o, t);
            i(r, s, e)
        }), r
    };
    F.groupBy = function(t, e, n) {
        return S(t, e, n, function(t, e, n) {
            (F.has(t, e) ? t[e] : t[e] = []).push(n)
        })
    }, F.countBy = function(t, e, n) {
        return S(t, e, n, function(t, e) {
            F.has(t, e) || (t[e] = 0), t[e]++
        })
    }, F.sortedIndex = function(t, e, n, i) {
        n = null == n ? F.identity : I(n);
        for (var r = n.call(i, e), a = 0, o = t.length; o > a;) {
            var s = a + o >>> 1;
            r > n.call(i, t[s]) ? a = s + 1 : o = s
        }
        return a
    }, F.toArray = function(t) {
        return t ? F.isArray(t) ? s.call(t) : t.length === +t.length ? F.map(t, F.identity) : F.values(t) : []
    }, F.size = function(t) {
        return null == t ? 0 : t.length === +t.length ? t.length : F.keys(t).length
    }, F.first = F.head = F.take = function(t, e, n) {
        return null == t ? void 0 : null == e || n ? t[0] : s.call(t, 0, e)
    }, F.initial = function(t, e, n) {
        return s.call(t, 0, t.length - (null == e || n ? 1 : e))
    }, F.last = function(t, e, n) {
        return null == t ? void 0 : null == e || n ? t[t.length - 1] : s.call(t, Math.max(t.length - e, 0))
    }, F.rest = F.tail = F.drop = function(t, e, n) {
        return s.call(t, null == e || n ? 1 : e)
    }, F.compact = function(t) {
        return F.filter(t, F.identity)
    };
    var _ = function(t, e, n) {
        return x(t, function(t) {
            F.isArray(t) ? e ? o.apply(n, t) : _(t, e, n) : n.push(t)
        }), n
    };
    F.flatten = function(t, e) {
        return _(t, e, [])
    }, F.without = function(t) {
        return F.difference(t, s.call(arguments, 1))
    }, F.uniq = F.unique = function(t, e, n, i) {
        F.isFunction(e) && (i = n, n = e, e = !1);
        var r = n ? F.map(t, n, i) : t,
            a = [],
            o = [];
        return x(r, function(n, i) {
            (e ? i && o[o.length - 1] === n : F.contains(o, n)) || (o.push(n), a.push(t[i]))
        }), a
    }, F.union = function() {
        return F.uniq(u.apply(i, arguments))
    }, F.intersection = function(t) {
        var e = s.call(arguments, 1);
        return F.filter(F.uniq(t), function(t) {
            return F.every(e, function(e) {
                return F.indexOf(e, t) >= 0
            })
        })
    }, F.difference = function(t) {
        var e = u.apply(i, s.call(arguments, 1));
        return F.filter(t, function(t) {
            return !F.contains(e, t)
        })
    }, F.zip = function() {
        for (var t = s.call(arguments), e = F.max(F.pluck(t, "length")), n = Array(e), i = 0; e > i; i++) n[i] = F.pluck(t, "" + i);
        return n
    }, F.object = function(t, e) {
        if (null == t) return {};
        for (var n = {}, i = 0, r = t.length; r > i; i++) e ? n[t[i]] = e[i] : n[t[i][0]] = t[i][1];
        return n
    }, F.indexOf = function(t, e, n) {
        if (null == t) return -1;
        var i = 0,
            r = t.length;
        if (n) {
            if ("number" != typeof n) return i = F.sortedIndex(t, e), t[i] === e ? i : -1;
            i = 0 > n ? Math.max(0, r + n) : n
        }
        if (y && t.indexOf === y) return t.indexOf(e, n);
        for (; r > i; i++)
            if (t[i] === e) return i;
        return -1
    }, F.lastIndexOf = function(t, e, n) {
        if (null == t) return -1;
        var i = null != n;
        if (b && t.lastIndexOf === b) return i ? t.lastIndexOf(e, n) : t.lastIndexOf(e);
        for (var r = i ? n : t.length; r--;)
            if (t[r] === e) return r;
        return -1
    }, F.range = function(t, e, n) {
        1 >= arguments.length && (e = t || 0, t = 0), n = arguments[2] || 1;
        for (var i = Math.max(Math.ceil((e - t) / n), 0), r = 0, a = Array(i); i > r;) a[r++] = t, t += n;
        return a
    }, F.bind = function(t, e) {
        if (t.bind === k && k) return k.apply(t, s.call(arguments, 1));
        var n = s.call(arguments, 2);
        return function() {
            return t.apply(e, n.concat(s.call(arguments)))
        }
    }, F.partial = function(t) {
        var e = s.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(s.call(arguments)))
        }
    }, F.bindAll = function(t) {
        var e = s.call(arguments, 1);
        return 0 === e.length && (e = F.functions(t)), x(e, function(e) {
            t[e] = F.bind(t[e], t)
        }), t
    }, F.memoize = function(t, e) {
        var n = {};
        return e || (e = F.identity),
        function() {
            var i = e.apply(this, arguments);
            return F.has(n, i) ? n[i] : n[i] = t.apply(this, arguments)
        }
    }, F.delay = function(t, e) {
        var n = s.call(arguments, 2);
        return setTimeout(function() {
            return t.apply(null, n)
        }, e)
    }, F.defer = function(t) {
        return F.delay.apply(F, [t, 1].concat(s.call(arguments, 1)))
    }, F.throttle = function(t, e) {
        var n, i, r, a, o = 0,
            s = function() {
                o = new Date, r = null, a = t.apply(n, i)
            };
        return function() {
            var u = new Date,
                c = e - (u - o);
            return n = this, i = arguments, 0 >= c ? (clearTimeout(r), r = null, o = u, a = t.apply(n, i)) : r || (r = setTimeout(s, c)), a
        }
    }, F.debounce = function(t, e, n) {
        var i, r;
        return function() {
            var a = this,
                o = arguments,
                s = function() {
                    i = null, n || (r = t.apply(a, o))
                }, u = n && !i;
            return clearTimeout(i), i = setTimeout(s, e), u && (r = t.apply(a, o)), r
        }
    }, F.once = function(t) {
        var e, n = !1;
        return function() {
            return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
        }
    }, F.wrap = function(t, e) {
        return function() {
            var n = [t];
            return o.apply(n, arguments), e.apply(this, n)
        }
    }, F.compose = function() {
        var t = arguments;
        return function() {
            for (var e = arguments, n = t.length - 1; n >= 0; n--) e = [t[n].apply(this, e)];
            return e[0]
        }
    }, F.after = function(t, e) {
        return 0 >= t ? e() : function() {
            return 1 > --t ? e.apply(this, arguments) : void 0
        }
    }, F.keys = C || function(t) {
        if (t !== Object(t)) throw new TypeError("Invalid object");
        var e = [];
        for (var n in t) F.has(t, n) && (e[e.length] = n);
        return e
    }, F.values = function(t) {
        var e = [];
        for (var n in t) F.has(t, n) && e.push(t[n]);
        return e
    }, F.pairs = function(t) {
        var e = [];
        for (var n in t) F.has(t, n) && e.push([n, t[n]]);
        return e
    }, F.invert = function(t) {
        var e = {};
        for (var n in t) F.has(t, n) && (e[t[n]] = n);
        return e
    }, F.functions = F.methods = function(t) {
        var e = [];
        for (var n in t) F.isFunction(t[n]) && e.push(n);
        return e.sort()
    }, F.extend = function(t) {
        return x(s.call(arguments, 1), function(e) {
            if (e)
                for (var n in e) t[n] = e[n]
        }), t
    }, F.pick = function(t) {
        var e = {}, n = u.apply(i, s.call(arguments, 1));
        return x(n, function(n) {
            n in t && (e[n] = t[n])
        }), e
    }, F.omit = function(t) {
        var e = {}, n = u.apply(i, s.call(arguments, 1));
        for (var r in t) F.contains(n, r) || (e[r] = t[r]);
        return e
    }, F.defaults = function(t) {
        return x(s.call(arguments, 1), function(e) {
            if (e)
                for (var n in e) null == t[n] && (t[n] = e[n])
        }), t
    }, F.clone = function(t) {
        return F.isObject(t) ? F.isArray(t) ? t.slice() : F.extend({}, t) : t
    }, F.tap = function(t, e) {
        return e(t), t
    };
    var P = function(t, e, n, i) {
        if (t === e) return 0 !== t || 1 / t == 1 / e;
        if (null == t || null == e) return t === e;
        t instanceof F && (t = t._wrapped), e instanceof F && (e = e._wrapped);
        var r = c.call(t);
        if (r != c.call(e)) return !1;
        switch (r) {
            case "[object String]":
                return t == e + "";
            case "[object Number]":
                return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
            case "[object Date]":
            case "[object Boolean]":
                return +t == +e;
            case "[object RegExp]":
                return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
        }
        if ("object" != typeof t || "object" != typeof e) return !1;
        for (var a = n.length; a--;)
            if (n[a] == t) return i[a] == e;
        n.push(t), i.push(e);
        var o = 0,
            s = !0;
        if ("[object Array]" == r) {
            if (o = t.length, s = o == e.length)
                for (; o-- && (s = P(t[o], e[o], n, i)););
        } else {
            var u = t.constructor,
                l = e.constructor;
            if (u !== l && !(F.isFunction(u) && u instanceof u && F.isFunction(l) && l instanceof l)) return !1;
            for (var d in t)
                if (F.has(t, d) && (o++, !(s = F.has(e, d) && P(t[d], e[d], n, i)))) break;
            if (s) {
                for (d in e)
                    if (F.has(e, d) && !o--) break;
                s = !o
            }
        }
        return n.pop(), i.pop(), s
    };
    F.isEqual = function(t, e) {
        return P(t, e, [], [])
    }, F.isEmpty = function(t) {
        if (null == t) return !0;
        if (F.isArray(t) || F.isString(t)) return 0 === t.length;
        for (var e in t)
            if (F.has(t, e)) return !1;
        return !0
    }, F.isElement = function(t) {
        return !(!t || 1 !== t.nodeType)
    }, F.isArray = w || function(t) {
        return "[object Array]" == c.call(t)
    }, F.isObject = function(t) {
        return t === Object(t)
    }, x(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) {
        F["is" + t] = function(e) {
            return c.call(e) == "[object " + t + "]"
        }
    }), F.isArguments(arguments) || (F.isArguments = function(t) {
        return !(!t || !F.has(t, "callee"))
    }), "function" != typeof / . / && (F.isFunction = function(t) {
        return "function" == typeof t
    }), F.isFinite = function(t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, F.isNaN = function(t) {
        return F.isNumber(t) && t != +t
    }, F.isBoolean = function(t) {
        return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
    }, F.isNull = function(t) {
        return null === t
    }, F.isUndefined = function(t) {
        return void 0 === t
    }, F.has = function(t, e) {
        return l.call(t, e)
    }, F.noConflict = function() {
        return t._ = e, this
    }, F.identity = function(t) {
        return t
    }, F.times = function(t, e, n) {
        for (var i = Array(t), r = 0; t > r; r++) i[r] = e.call(n, r);
        return i
    }, F.random = function(t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    };
    var A = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    A.unescape = F.invert(A.escape);
    var T = {
        escape: RegExp("[" + F.keys(A.escape).join("") + "]", "g"),
        unescape: RegExp("(" + F.keys(A.unescape).join("|") + ")", "g")
    };
    F.each(["escape", "unescape"], function(t) {
        F[t] = function(e) {
            return null == e ? "" : ("" + e).replace(T[t], function(e) {
                return A[t][e]
            })
        }
    }), F.result = function(t, e) {
        if (null == t) return null;
        var n = t[e];
        return F.isFunction(n) ? n.call(t) : n
    }, F.mixin = function(t) {
        x(F.functions(t), function(e) {
            var n = F[e] = t[e];
            F.prototype[e] = function() {
                var t = [this._wrapped];
                return o.apply(t, arguments), q.call(this, n.apply(F, t))
            }
        })
    };
    var O = 0;
    F.uniqueId = function(t) {
        var e = ++O + "";
        return t ? t + e : e
    }, F.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var D = /(.)^/,
        R = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, N = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    F.template = function(t, e, n) {
        var i;
        n = F.defaults({}, n, F.templateSettings);
        var r = RegExp([(n.escape || D).source, (n.interpolate || D).source, (n.evaluate || D).source].join("|") + "|$", "g"),
            a = 0,
            o = "__p+='";
        t.replace(r, function(e, n, i, r, s) {
            return o += t.slice(a, s).replace(N, function(t) {
                return "\\" + R[t]
            }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), r && (o += "';\n" + r + "\n__p+='"), a = s + e.length, e
        }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            i = Function(n.variable || "obj", "_", o)
        } catch (s) {
            throw s.source = o, s
        }
        if (e) return i(e, F);
        var u = function(t) {
            return i.call(this, t, F)
        };
        return u.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", u
    }, F.chain = function(t) {
        return F(t).chain()
    };
    var q = function(t) {
        return this._chain ? F(t).chain() : t
    };
    F.mixin(F), x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var e = i[t];
        F.prototype[t] = function() {
            var n = this._wrapped;
            return e.apply(n, arguments), "shift" != t && "splice" != t || 0 !== n.length || delete n[0], q.call(this, n)
        }
    }), x(["concat", "join", "slice"], function(t) {
        var e = i[t];
        F.prototype[t] = function() {
            return q.call(this, e.apply(this._wrapped, arguments))
        }
    }), F.extend(F.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
}.call(this),
function(t) {
    var e = t._ || require("underscore"),
        n = Array.prototype.slice,
        i = Array.prototype.concat,
        r = function(t) {
            return null != t
        };
    e.mixin({
        cat: function() {
            return e.reduce(arguments, function(t, r) {
                return e.isArguments(r) ? i.call(t, n.call(r)) : i.call(t, r)
            }, [])
        },
        cons: function(t, n) {
            return e.cat([t], n)
        },
        partition: function(t, n, i) {
            var r = function(t) {
                if (null == t) return [];
                var a = e.take(t, n);
                return n === e.size(a) ? e.cons(a, r(e.drop(t, n))) : i ? [e.take(e.cat(a, i), n)] : []
            };
            return r(t)
        },
        partitionAll: function(t, n, i) {
            i = null != i ? i : n;
            var r = function(t, n, i) {
                return e.isEmpty(t) ? [] : e.cons(e.take(t, n), r(e.drop(t, i), n, i))
            };
            return r(t, n, i)
        },
        mapcat: function(t, n) {
            return e.cat.apply(null, e.map(t, n))
        },
        interpose: function(t, i) {
            if (!e.isArray(t)) throw new TypeError;
            var r = e.size(t);
            return 0 === r ? t : 1 === r ? t : n.call(e.mapcat(t, function(t) {
                return e.cons(t, [i])
            }), 0, -1)
        },
        weave: function() {
            return e.some(arguments) ? e.filter(e.flatten(e.zip.apply(null, arguments), !0), function(t) {
                return null != t
            }) : []
        },
        interleave: e.weave,
        repeat: function(t, n) {
            return e.times(t, function() {
                return n
            })
        },
        cycle: function(t, n) {
            return e.flatten(e.times(t, function() {
                return n
            }), !0)
        },
        splitAt: function(t, n) {
            return [e.take(t, n), e.drop(t, n)]
        },
        iterateUntil: function(t, e, n) {
            for (var i = [], r = t(n); e(r);) i.push(r), r = t(r);
            return i
        },
        takeSkipping: function(t, n) {
            var i = [],
                r = e.size(t);
            if (0 >= n) return [];
            if (1 === n) return t;
            for (var a = 0; r > a; a += n) i.push(t[a]);
            return i
        },
        reductions: function(t, n, i) {
            var r = [],
                a = i;
            return e.each(t, function(e, i) {
                a = n(a, t[i]), r.push(a)
            }), r
        },
        keepIndexed: function(t, n) {
            return e.filter(e.map(e.range(e.size(t)), function(e) {
                return n(e, t[e])
            }), r)
        }
    })
}(this),
function(t) {
    var e = t._ || require("underscore"),
        n = Array.prototype.slice,
        i = Array.prototype.concat,
        r = function(t) {
            return null != t
        }, a = function(t) {
            return t !== !1 && r(t)
        }, o = function(t) {
            return e.isArray(t) || e.isArguments(t)
        };
    e.mixin({
        second: function(t, e, i) {
            return null == t ? void 0 : null == e || i ? t[1] : n.call(t, 1, e)
        },
        nth: function(t, e) {
            if (0 > e || e > t.length - 1) throw Error("Attempting to index outside the bounds of the array.");
            return t[e]
        },
        takeWhile: function(t, n) {
            if (!o(t)) throw new TypeError;
            for (var i = e.size(t), r = 0; i > r && a(n(t[r])); r++);
            return e.take(t, r)
        },
        dropWhile: function(t, n) {
            if (!o(t)) throw new TypeError;
            for (var i = e.size(t), r = 0; i > r && a(n(t[r])); r++);
            return e.drop(t, r)
        },
        splitWith: function(t, n) {
            return [e.takeWhile(n, t), e.dropWhile(n, t)]
        },
        partitionBy: function(t, n) {
            if (e.isEmpty(t) || !r(t)) return [];
            var a = e.first(t),
                o = n(a),
                s = i.call([a], e.takeWhile(e.rest(t), function(t) {
                    return e.isEqual(o, n(t))
                }));
            return i.call([s], e.partitionBy(e.drop(t, e.size(s)), n))
        },
        best: function(t, n) {
            return e.reduce(t, function(t, e) {
                return n(t, e) ? t : e
            })
        },
        keep: function(t, n) {
            if (!o(t)) throw new TypeError("expected an array as the first argument");
            return e.filter(e.map(t, function(t) {
                return n(t)
            }), r)
        }
    })
}(this),
function(t) {
    function e(t, e, n, o) {
        var s = [];
        ! function u(t, c, l) {
            if (!e || e.call(o, t, c, l) !== r) {
                if (i.isObject(t) || i.isArray(t)) {
                    if (s.indexOf(t) >= 0) throw new TypeError(a);
                    s.push(t), i.each(i.isElement(t) ? t.children : t, u, o)
                }
                n && n.call(o, t, c, l)
            }
        }(t)
    }

    function n(t, e, n) {
        var a = [];
        return i.walk.preorder(t, function(t, i) {
            return i !== e || (a[a.length] = t, n) ? void 0 : r
        }), a
    }
    var i = t._ || require("underscore"),
        r = {}, a = "Not a tree: same object found in two different branches";
    i.walk = e, i.extend(e, {
        postorder: function(t, n, i) {
            e(t, null, n, i)
        },
        preorder: function(t, n, i) {
            e(t, n, null, i)
        },
        map: function(t, e, n, i) {
            var r = [];
            return e.call(null, t, function(t, e, a) {
                r[r.length] = n.call(i, t, e, a)
            }), r
        },
        pluck: function(t, e) {
            return n(t, e, !1)
        },
        pluckRec: function(t, e) {
            return n(t, e, !0)
        }
    }), i.walk.collect = i.walk.map
}(this),
function(t) {
    function e(t) {
        return function() {
            if (1 === arguments.length) return t.apply(this, arguments);
            throw new RangeError("Only a single argument may be accepted.")
        }
    }
    var n = t._ || require("underscore"),
        i = function() {
            function t(n, i, r, a, o, s) {
                return 1 == s ? a.unshift(o) : a.push(o), a.length == r ? n.apply(i, a) : e(function() {
                    return t(n, i, r, a.slice(0), arguments[0], s)
                })
            }
            return function(n, i) {
                var r = this;
                return e(function() {
                    return t(n, r, n.length, [], arguments[0], i)
                })
            }
        }(),
        r = function() {
            var t = [];
            return function(e) {
                if ("function" != typeof e) throw Error("Argument 1 must be a function.");
                var n = e.length;
                return void 0 === t[n] && (t[n] = function(t) {
                    return function() {
                        if (arguments.length !== n) throw new RangeError(n + " arguments must be applied.");
                        return t.apply(this, arguments)
                    }
                }), t[n](e)
            }
        }();
    n.mixin({
        fix: function(t) {
            var e = n.rest(arguments),
                i = function() {
                    for (var i = 0, r = 0; e.length > r && arguments.length > i; r++) e[r] === n && (e[r] = arguments[i++]);
                    return t.apply(null, e)
                };
            return i._original = t, i
        },
        unary: function(t) {
            return function(e) {
                return t.call(this, e)
            }
        },
        binary: function(t) {
            return function(e, n) {
                return t.call(this, e, n)
            }
        },
        ternary: function(t) {
            return function(e, n, i) {
                return t.call(this, e, n, i)
            }
        },
        quaternary: function(t) {
            return function(e, n, i, r) {
                return t.call(this, e, n, i, r)
            }
        },
        curry: i,
        rCurry: function(t) {
            return i.call(this, t, !0)
        },
        curry2: function(t) {
            return e(function(n) {
                return e(function(e) {
                    return t.call(this, n, e)
                })
            })
        },
        curry3: function(t) {
            return e(function(n) {
                return e(function(i) {
                    return e(function(e) {
                        return t.call(this, n, i, e)
                    })
                })
            })
        },
        rcurry2: function(t) {
            return e(function(n) {
                return e(function(e) {
                    return t.call(this, e, n)
                })
            })
        },
        rcurry3: function(t) {
            return e(function(n) {
                return e(function(i) {
                    return e(function(e) {
                        return t.call(this, e, i, n)
                    })
                })
            })
        },
        enforce: r
    }), n.arity = function() {
        var t = {};
        return function e(n, i) {
            if (null == t[n]) {
                for (var r = Array(n), a = 0; n > a; ++a) r[a] = "__" + a;
                var o = r.join(),
                    s = "return function (" + o + ") { return fun.apply(this, arguments); };";
                t[n] = Function(["fun"], s)
            }
            return null == i ? function(t) {
                return e(n, t)
            } : t[n](i)
        }
    }()
}(this),
function(t) {
    function e(t, e) {
        return n.arity(t.length, function() {
            return t.apply(this, s.call(arguments, e))
        })
    }
    var n = t._ || require("underscore"),
        i = function(t) {
            return null != t
        }, r = function(t) {
            return t !== !1 && i(t)
        }, a = [].reverse,
        o = [].slice,
        s = [].map,
        u = function(t) {
            return function(e, n) {
                return 1 === arguments.length ? function(n) {
                    return t(e, n)
                } : t(e, n)
            }
        };
    n.mixin({
        always: function(t) {
            return function() {
                return t
            }
        },
        pipeline: function() {
            var t = n.isArray(arguments[0]) ? arguments[0] : arguments;
            return function(e) {
                return n.reduce(t, function(t, e) {
                    return e(t)
                }, e)
            }
        },
        conjoin: function() {
            var t = arguments;
            return function(e) {
                return n.every(e, function(e) {
                    return n.every(t, function(t) {
                        return t(e)
                    })
                })
            }
        },
        disjoin: function() {
            var t = arguments;
            return function(e) {
                return n.some(e, function(e) {
                    return n.some(t, function(t) {
                        return t(e)
                    })
                })
            }
        },
        comparator: function(t) {
            return function(e, n) {
                return r(t(e, n)) ? -1 : r(t(n, e)) ? 1 : 0
            }
        },
        complement: function(t) {
            return function() {
                return !t.apply(null, arguments)
            }
        },
        splat: function(t) {
            return function(e) {
                return t.apply(null, e)
            }
        },
        unsplat: function(t) {
            var e = t.length;
            return 1 > e ? t : 1 === e ? function() {
                return t.call(this, o.call(arguments, 0))
            } : function() {
                var n = arguments.length,
                    i = o.call(arguments, 0, e - 1),
                    r = Math.max(e - n - 1, 0),
                    a = Array(r),
                    s = o.call(arguments, t.length - 1);
                return t.apply(this, i.concat(a).concat([s]))
            }
        },
        unsplatl: function(t) {
            var e = t.length;
            return 1 > e ? t : 1 === e ? function() {
                return t.call(this, o.call(arguments, 0))
            } : function() {
                var n = arguments.length,
                    i = o.call(arguments, Math.max(n - e + 1, 0)),
                    r = o.call(arguments, 0, Math.max(n - e + 1, 0));
                return t.apply(this, [r].concat(i))
            }
        },
        mapArgs: u(e),
        juxt: function() {
            var t = arguments;
            return function() {
                var e = arguments;
                return n.map(t, function(t) {
                    return t.apply(null, e)
                })
            }
        },
        fnull: function(t) {
            var e = n.rest(arguments);
            return function() {
                for (var r = n.toArray(arguments), a = n.size(e), o = 0; a > o; o++) i(r[o]) || (r[o] = e[o]);
                return t.apply(null, r)
            }
        },
        flip2: function(t) {
            return function() {
                var e = arguments[0];
                return arguments[0] = arguments[1], arguments[1] = e, t.apply(null, arguments)
            }
        },
        flip: function(t) {
            return function() {
                var e = a.call(arguments);
                return t.apply(null, e)
            }
        },
        k: n.always,
        t: n.pipeline
    }), n.unsplatr = n.unsplat, n.mapArgsWith = u(n.flip(e)), n.bound = function(t, e) {
        var i = t[e];
        if (!n.isFunction(i)) throw new TypeError("Expected property to be a function");
        return n.bind(i, t)
    }
}(this),
function(t) {
    function e(t) {
        return function(e) {
            return t.call(this, e)
        }
    }

    function n(t, e, n) {
        var i, r;
        for (i = void 0 !== n ? n : t(), r = t(); null != r;) i = e.call(r, i, r), r = t();
        return i
    }

    function i(t, e) {
        var n = C;
        return function() {
            return n === C ? n = t : null != n ? n = e.call(n, n) : n
        }
    }

    function r(t, e) {
        var n, i, r = t;
        return function() {
            return null != r ? (n = e.call(r, r), i = n[1], r = null != i ? n[0] : void 0, i) : void 0
        }
    }

    function a(t, e, n) {
        var i = n;
        return function() {
            return element = t(), null == element ? element : i = void 0 === i ? element : e.call(element, i, element)
        }
    }

    function o(t, e, n) {
        var i, r = n;
        return function() {
            return element = t(), null == element ? element : void 0 === r ? r = element : (i = e.call(element, r, element), r = i[0], i[1])
        }
    }

    function s(t, e) {
        return function() {
            var n;
            return n = t(), null != n ? e.call(n, n) : void 0
        }
    }

    function u(t, e) {
        return function() {
            var n;
            for (n = t(); null != n;) {
                if (e.call(n, n)) return n;
                n = t()
            }
            return void 0
        }
    }

    function c(t, e) {
        return u(t, function(t) {
            return !e(t)
        })
    }

    function l(t, e) {
        return u(t, e)()
    }

    function d(t, e, n) {
        for (var i = 0; e-- > 0;) t();
        return null != n ? function() {
            return n >= ++i ? t() : void 0
        } : t
    }

    function f(t, e) {
        return d(t, null == e ? 1 : e)
    }

    function h(t, e) {
        return d(t, 0, null == e ? 1 : e)
    }

    function p(t) {
        var e = 0;
        return function() {
            return t[e++]
        }
    }

    function m(t) {
        var e, n, i;
        return e = 0, i = [], n = function() {
            var r, a;
            return r = t[e++], r instanceof Array ? (i.push({
                array: t,
                index: e
            }), t = r, e = 0, n()) : void 0 === r ? i.length > 0 ? (a = i.pop(), t = a.array, e = a.index, n()) : void 0 : r
        }
    }

    function g(t) {
        return function() {
            return t
        }
    }

    function v(t, e, n) {
        return function() {
            var i;
            return t > e ? void 0 : (i = t, t += n, i)
        }
    }

    function y(t, e, n) {
        return function() {
            var i;
            return e > t ? void 0 : (i = t, t -= n, i)
        }
    }

    function b(t, e, n) {
        return null == t ? v(1, 1 / 0, 1) : null == e ? v(t, 1 / 0, 1) : null == n ? e >= t ? v(t, e, 1) : y(t, e, 1) : n > 0 ? v(t, e, n) : 0 > n ? y(t, e, Math.abs(n)) : k(t)
    }
    var w = t._ || require("underscore"),
        C = {}, F = e(b);
    w.iterators = {
        accumulate: a,
        accumulateWithReturn: o,
        foldl: n,
        reduce: n,
        unfold: i,
        unfoldWithReturn: r,
        map: s,
        select: u,
        reject: c,
        filter: u,
        find: l,
        slice: d,
        drop: f,
        take: h,
        List: p,
        Tree: m,
        constant: g,
        K: g,
        numbers: F,
        range: b
    }
}(this),
function(t) {
    var e = t._ || require("underscore");
    e.mixin({
        isInstanceOf: function(t, e) {
            return t instanceof e
        },
        isAssociative: function(t) {
            return e.isArray(t) || e.isObject(t) || e.isArguments(t)
        },
        isIndexed: function(t) {
            return e.isArray(t) || e.isString(t) || e.isArguments(t)
        },
        isSequential: function(t) {
            return e.isArray(t) || e.isArguments(t)
        },
        isZero: function(t) {
            return 0 === t
        },
        isEven: function(t) {
            return e.isFinite(t) && 0 === (1 & t)
        },
        isOdd: function(t) {
            return e.isFinite(t) && !e.isEven(t)
        },
        isPositive: function(t) {
            return t > 0
        },
        isNegative: function(t) {
            return 0 > t
        },
        isValidDate: function(t) {
            return e.isDate(t) && !e.isNaN(t.getTime())
        },
        isNumeric: function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        },
        isInteger: function(t) {
            return e.isNumeric(t) && 0 === t % 1
        },
        isFloat: function(t) {
            return e.isNumeric(t) && !e.isInteger(t)
        },
        isIncreasing: function() {
            var t = e.size(arguments);
            if (1 === t) return !0;
            if (2 === t) return arguments[0] < arguments[1];
            for (var n = 1; t > n; n++)
                if (arguments[n - 1] >= arguments[n]) return !1;
            return !0
        },
        isDecreasing: function() {
            var t = e.size(arguments);
            if (1 === t) return !0;
            if (2 === t) return arguments[0] > arguments[1];
            for (var n = 1; t > n; n++)
                if (arguments[n - 1] <= arguments[n]) return !1;
            return !0
        }
    })
}(this),
function(t) {
    var e = t._ || require("underscore"),
        n = (Array.prototype.slice, Array.prototype.concat),
        i = function(t) {
            return null != t
        }, r = function(t) {
            return t !== !1 && i(t)
        }, a = function(t) {
            return e.isArray(t) || e.isObject(t)
        }, o = function(t) {
            return function(e) {
                return function(n) {
                    return t(n, e)
                }
            }
        };
    e.mixin({
        merge: function() {
            var t = e.some(arguments) ? {} : null;
            return r(t) && e.extend.apply(null, n.call([t], e.toArray(arguments))), t
        },
        renameKeys: function(t, r) {
            return e.reduce(r, function(e, n, r) {
                return i(t[r]) ? (e[n] = t[r], e) : e
            }, e.omit.apply(null, n.call([t], e.keys(r))))
        },
        snapshot: function(t) {
            if (null == t || "object" != typeof t) return t;
            var n = new t.constructor;
            for (var i in t) n[i] = e.snapshot(t[i]);
            return n
        },
        updatePath: function(t, n, r) {
            if (!a(t)) throw new TypeError("Attempted to update a non-associative object.");
            if (!i(r)) return n(t);
            var o = e.isArray(r),
                s = o ? r : [r],
                u = o ? e.snapshot(t) : e.clone(t),
                c = e.last(s),
                l = u;
            return e.each(e.initial(s), function(t) {
                l = l[t]
            }), l[c] = n(l[c]), u
        },
        setPath: function(t, n, r) {
            if (!i(r)) throw new TypeError("Attempted to set a property at a null path.");
            return e.updatePath(t, function() {
                return n
            }, r)
        },
        frequencies: o(e.countBy)(e.identity)
    })
}(this),
function(t) {
    var e = t._ || require("underscore"),
        n = Array.prototype.concat;
    e.mixin({
        accessor: function(t) {
            return function(e) {
                return e && e[t]
            }
        },
        dictionary: function(t) {
            return function(e) {
                return t && e && t[e]
            }
        },
        selectKeys: function(t, i) {
            return e.pick.apply(null, n.call([t], i))
        },
        kv: function(t, n) {
            return e.has(t, n) ? [n, t[n]] : void 0
        },
        getPath: function i(t, n) {
            return void 0 === t ? void 0 : 0 === n.length ? t : null === t ? void 0 : i(t[e.first(n)], e.rest(n))
        },
        hasPath: function r(t, n) {
            var i = n.length;
            return null == t && i > 0 ? !1 : n[0] in t ? 1 === i ? !0 : r(t[e.first(n)], e.rest(n)) : !1
        }
    })
}(this),
function(t) {
    var e = t._ || require("underscore");
    e.mixin({
        exists: function(t) {
            return null != t
        },
        truthy: function(t) {
            return t !== !1 && e.exists(t)
        },
        falsey: function(t) {
            return !e.truthy(t)
        },
        not: function(t) {
            return !t
        }
    })
}(this),
function(t) {
    var e = t._ || require("underscore");
    e.mixin({
        add: function(t, e) {
            return t + e
        },
        sub: function(t, e) {
            return t - e
        },
        mul: function(t, e) {
            return t * e
        },
        div: function(t, e) {
            return t / e
        },
        mod: function(t, e) {
            return t % e
        },
        inc: function(t) {
            return ++t
        },
        dec: function(t) {
            return --t
        },
        neg: function(t) {
            return -t
        },
        eq: function(t, e) {
            return t == e
        },
        seq: function(t, e) {
            return t === e
        },
        neq: function(t, e) {
            return t != e
        },
        sneq: function(t, e) {
            return t !== e
        },
        not: function(t) {
            return !t
        },
        gt: function(t, e) {
            return t > e
        },
        lt: function(t, e) {
            return e > t
        },
        gte: function(t, e) {
            return t >= e
        },
        lte: function(t, e) {
            return e >= t
        },
        bitwiseAnd: function(t, e) {
            return t & e
        },
        bitwiseOr: function(t, e) {
            return t | e
        },
        bitwiseXor: function(t, e) {
            return t ^ e
        },
        bitwiseNot: function(t) {
            return~ t
        },
        bitwiseLeft: function(t, e) {
            return t << e
        },
        bitwiseRight: function(t, e) {
            return t >> e
        },
        bitwiseZ: function(t, e) {
            return t >>> e
        }
    })
}(this),
function(t) {
    var e = t._ || require("underscore");
    e.mixin({
        explode: function(t) {
            return t.split("")
        },
        implode: function(t) {
            return t.join("")
        }
    })
}(this),
function(t) {
    var e = t._ || require("underscore");
    e.mixin({
        done: function(t) {
            var n = e(t);
            return n.stopTrampoline = !0, n
        },
        trampoline: function(t) {
            for (var n = t.apply(t, e.rest(arguments)); e.isFunction(n) && (n = n(), !(n instanceof e && n.stopTrampoline)););
            return n.value()
        }
    })
}(this),
/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var n = t.data(this[0], "validator");
            return n ? n : (this.attr("novalidate", "novalidate"), n = new t.validator(e, this[0]), t.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                n.settings.submitHandler && (n.submitButton = e.target), t(e.target).hasClass("cancel") && (n.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (n.cancelSubmit = !0)
            }), this.submit(function(e) {
                function i() {
                    var i, r;
                    return n.settings.submitHandler ? (n.submitButton && (i = t("<input type='hidden'/>").attr("name", n.submitButton.name).val(t(n.submitButton).val()).appendTo(n.currentForm)), r = n.settings.submitHandler.call(n, n.currentForm, e), n.submitButton && i.remove(), void 0 !== r ? r : !1) : !0
                }
                return n.settings.debug && e.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, i()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : i() : (n.focusInvalid(), !1)
            })), n)
        },
        valid: function() {
            var e, n;
            return t(this[0]).is("form") ? e = this.validate().form() : (e = !0, n = t(this[0].form).validate(), this.each(function() {
                e = n.element(this) && e
            })), e
        },
        removeAttrs: function(e) {
            var n = {}, i = this;
            return t.each(e.split(/\s/), function(t, e) {
                n[e] = i.attr(e), i.removeAttr(e)
            }), n
        },
        rules: function(e, n) {
            var i, r, a, o, s, u, c = this[0];
            if (e) switch (i = t.data(c.form, "validator").settings, r = i.rules, a = t.validator.staticRules(c), e) {
                case "add":
                    t.extend(a, t.validator.normalizeRule(n)), delete a.messages, r[c.name] = a, n.messages && (i.messages[c.name] = t.extend(i.messages[c.name], n.messages));
                    break;
                case "remove":
                    return n ? (u = {}, t.each(n.split(/\s/), function(e, n) {
                        u[n] = a[n], delete a[n], "required" === n && t(c).removeAttr("aria-required")
                    }), u) : (delete r[c.name], a)
            }
            return o = t.validator.normalizeRules(t.extend({}, t.validator.classRules(c), t.validator.attributeRules(c), t.validator.dataRules(c), t.validator.staticRules(c)), c), o.required && (s = o.required, delete o.required, o = t.extend({
                required: s
            }, o), t(c).attr("aria-required", "true")), o.remote && (s = o.remote, delete o.remote, o = t.extend(o, {
                remote: s
            })), o
        }
    }), t.extend(t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function(e, n) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = n, this.init()
    }, t.validator.format = function(e, n) {
        return 1 === arguments.length ? function() {
            var n = t.makeArray(arguments);
            return n.unshift(e), t.validator.format.apply(this, n)
        } : (arguments.length > 2 && n.constructor !== Array && (n = t.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), t.each(n, function(t, n) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                return n
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(t) {
                this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
            },
            onfocusout: function(t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function(t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function(e, n, i) {
                "radio" === e.type ? this.findByName(e.name).addClass(n).removeClass(i) : t(e).addClass(n).removeClass(i)
            },
            unhighlight: function(e, n, i) {
                "radio" === e.type ? this.findByName(e.name).removeClass(n).addClass(i) : t(e).removeClass(n).addClass(i)
            }
        },
        setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "Please fill this field",
            remote: "Please fix this field.",
            email: "Please enter a valid email address",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("At least {0} characters, please"),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    var n = t.data(this[0].form, "validator"),
                        i = "on" + e.type.replace(/^validate/, ""),
                        r = n.settings;
                    r[i] && !this.is(r.ignore) && r[i].call(n, this[0], e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var n, i = this.groups = {};
                t.each(this.settings.groups, function(e, n) {
                    "string" == typeof n && (n = n.split(/\s/)), t.each(n, function(t, n) {
                        i[n] = e
                    })
                }), n = this.settings.rules, t.each(n, function(e, i) {
                    n[e] = t.validator.normalizeRule(i)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", e).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function(e) {
                var n = this.clean(e),
                    i = this.validationTargetFor(n),
                    r = !0;
                return this.lastElement = i, void 0 === i ? delete this.invalid[n.name] : (this.prepareElement(i), this.currentElements = t(i), r = this.check(i) !== !1, r ? delete this.invalid[i.name] : this.invalid[i.name] = !0), t(e).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            },
            showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var n in e) this.errorList.push({
                        message: e[n],
                        element: this.findByName(n)[0]
                    });
                    this.successList = t.grep(this.successList, function(t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(t) {
                var e, n = 0;
                for (e in t) n++;
                return n
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(t) {
                t.not(this.containers).text(""), this.addWrapper(t).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                    return t.element.name === e.name
                }).length && e
            },
            elements: function() {
                var e = this,
                    n = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in n || !e.objectLength(t(this).rules()) ? !1 : (n[this.name] = !0, !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.split(" ").join(".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(t) {
                this.reset(), this.toHide = this.errorsFor(t)
            },
            elementValue: function(e) {
                var n, i = t(e),
                    r = e.type;
                return "radio" === r || "checkbox" === r ? t("input[name='" + e.name + "']:checked").val() : "number" === r && "undefined" != typeof e.validity ? e.validity.badInput ? !1 : i.val() : (n = i.val(), "string" == typeof n ? n.replace(/\r/g, "") : n)
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var n, i, r, a = t(e).rules(),
                    o = t.map(a, function(t, e) {
                        return e
                    }).length,
                    s = !1,
                    u = this.elementValue(e);
                for (i in a) {
                    r = {
                        method: i,
                        parameters: a[i]
                    };
                    try {
                        if (n = t.validator.methods[i].call(this, u, e, r.parameters), "dependency-mismatch" === n && 1 === o) {
                            s = !0;
                            continue
                        }
                        if (s = !1, "pending" === n) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!n) return this.formatAndAdd(e, r), !1
                    } catch (c) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", c), c
                    }
                }
                if (!s) return this.objectLength(a) && this.successList.push(e), !0
            },
            customDataMessage: function(e, n) {
                return t(e).data("msg" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()) || t(e).data("msg")
            },
            customMessage: function(t, e) {
                var n = this.settings.messages[t];
                return n && (n.constructor === String ? n : n[e])
            },
            findDefined: function() {
                for (var t = 0; t < arguments.length; t++)
                    if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            },
            defaultMessage: function(e, n) {
                return this.findDefined(this.customMessage(e.name, n), this.customDataMessage(e, n), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[n], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, n) {
                var i = this.defaultMessage(e, n.method),
                    r = /\$?\{(\d+)\}/g;
                "function" == typeof i ? i = i.call(this, n.parameters, e) : r.test(i) && (i = t.validator.format(i.replace(r, "{$1}"), n.parameters)), this.errorList.push({
                    message: i,
                    element: e,
                    method: n.method
                }), this.errorMap[e.name] = i, this.submitted[e.name] = i
            },
            addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function() {
                var t, e, n;
                for (t = 0; this.errorList[t]; t++) n = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, n) {
                var i, r, a, o = this.errorsFor(e),
                    s = this.idOrName(e),
                    u = t(e).attr("aria-describedby");
                o.length ? (o.removeClass(this.settings.validClass).addClass(this.settings.errorClass), o.html(n)) : (o = t("<" + this.settings.errorElement + ">").attr("id", s + "-error").addClass(this.settings.errorClass).html(n || ""), i = o, this.settings.wrapper && (i = o.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement(i, t(e)) : i.insertAfter(e), o.is("label") ? o.attr("for", s) : 0 === o.parents("label[for='" + s + "']").length && (a = o.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), u ? u.match(new RegExp("\\b" + a + "\\b")) || (u += " " + a) : u = a, t(e).attr("aria-describedby", u), r = this.groups[e.name], r && t.each(this.groups, function(e, n) {
                    n === r && t("[name='" + e + "']", this.currentForm).attr("aria-describedby", o.attr("id"))
                }))), !n && this.settings.success && (o.text(""), "string" == typeof this.settings.success ? o.addClass(this.settings.success) : this.settings.success(o, e)), this.toShow = this.toShow.add(o)
            },
            errorsFor: function(e) {
                var n = this.idOrName(e),
                    i = t(e).attr("aria-describedby"),
                    r = "label[for='" + n + "'], label[for='" + n + "'] *";
                return i && (r = r + ", #" + i.replace(/\s+/g, ", #")), this.errors().filter(r)
            },
            idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function(e) {
                return this.checkable(e) && (e = this.findByName(e.name)), t(e).not(this.settings.ignore)[0]
            },
            checkable: function(t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, n) {
                switch (n.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", n).length;
                    case "input":
                        if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            },
            dependTypes: {
                "boolean": function(t) {
                    return t
                },
                string: function(e, n) {
                    return !!t(e, n.form).length
                },
                "function": function(t, e) {
                    return t(e)
                }
            },
            optional: function(e) {
                var n = this.elementValue(e);
                return !t.validator.methods.required.call(this, n, e) && "dependency-mismatch"
            },
            startRequest: function(t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            },
            stopRequest: function(e, n) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !n && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, n) {
            e.constructor === String ? this.classRuleSettings[e] = n : t.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var n = {}, i = t(e).attr("class");
            return i && t.each(i.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(n, t.validator.classRuleSettings[this])
            }), n
        },
        attributeRules: function(e) {
            var n, i, r = {}, a = t(e),
                o = e.getAttribute("type");
            for (n in t.validator.methods) "required" === n ? (i = e.getAttribute(n), "" === i && (i = !0), i = !! i) : i = a.attr(n), /min|max/.test(n) && (null === o || /number|range|text/.test(o)) && (i = Number(i)), i || 0 === i ? r[n] = i : o === n && "range" !== o && (r[n] = !0);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function(e) {
            var n, i, r = {}, a = t(e);
            for (n in t.validator.methods) i = a.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()), void 0 !== i && (r[n] = i);
            return r
        },
        staticRules: function(e) {
            var n = {}, i = t.data(e.form, "validator");
            return i.settings.rules && (n = t.validator.normalizeRule(i.settings.rules[e.name]) || {}), n
        },
        normalizeRules: function(e, n) {
            return t.each(e, function(i, r) {
                if (r === !1) return void delete e[i];
                if (r.param || r.depends) {
                    var a = !0;
                    switch (typeof r.depends) {
                        case "string":
                            a = !! t(r.depends, n.form).length;
                            break;
                        case "function":
                            a = r.depends.call(n, n)
                    }
                    a ? e[i] = void 0 !== r.param ? r.param : !0 : delete e[i]
                }
            }), t.each(e, function(i, r) {
                e[i] = t.isFunction(r) ? r(n) : r
            }), t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function() {
                var n;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (n = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/), e[this] = [Number(n[0]), Number(n[1])]))
            }), t.validator.autoCreateRanges && (null != e.min && null != e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), null != e.minlength && null != e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var n = {};
                t.each(e.split(/\s/), function() {
                    n[this] = !0
                }), e = n
            }
            return e
        },
        addMethod: function(e, n, i) {
            t.validator.methods[e] = n, t.validator.messages[e] = void 0 !== i ? i : t.validator.messages[e], n.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, n, i) {
                if (!this.depend(i, n)) return "dependency-mismatch";
                if ("select" === n.nodeName.toLowerCase()) {
                    var r = t(n).val();
                    return r && r.length > 0
                }
                return this.checkable(n) ? this.getLength(e, n) > 0 : t.trim(e).length > 0
            },
            email: function(t, e) {
                return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
            },
            url: function(t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            },
            date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            },
            dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
            },
            number: function(t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            creditcard: function(t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var n, i, r = 0,
                    a = 0,
                    o = !1;
                if (t = t.replace(/\D/g, ""), t.length < 13 || t.length > 19) return !1;
                for (n = t.length - 1; n >= 0; n--) i = t.charAt(n), a = parseInt(i, 10), o && (a *= 2) > 9 && (a -= 9), r += a, o = !o;
                return r % 10 === 0
            },
            minlength: function(e, n, i) {
                var r = t.isArray(e) ? e.length : this.getLength(e, n);
                return this.optional(n) || r >= i
            },
            maxlength: function(e, n, i) {
                var r = t.isArray(e) ? e.length : this.getLength(e, n);
                return this.optional(n) || i >= r
            },
            rangelength: function(e, n, i) {
                var r = t.isArray(e) ? e.length : this.getLength(e, n);
                return this.optional(n) || r >= i[0] && r <= i[1]
            },
            min: function(t, e, n) {
                return this.optional(e) || t >= n
            },
            max: function(t, e, n) {
                return this.optional(e) || n >= t
            },
            range: function(t, e, n) {
                return this.optional(e) || t >= n[0] && t <= n[1]
            },
            equalTo: function(e, n, i) {
                var r = t(i);
                return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    t(n).valid()
                }), e === r.val()
            },
            remote: function(e, n, i) {
                if (this.optional(n)) return "dependency-mismatch";
                var r, a, o = this.previousValue(n);
                return this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), o.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = o.message, i = "string" == typeof i && {
                    url: i
                } || i, o.old === e ? o.valid : (o.old = e, r = this, this.startRequest(n), a = {}, a[n.name] = e, t.ajax(t.extend(!0, {
                    url: i,
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: a,
                    context: r.currentForm,
                    success: function(i) {
                        var a, s, u, c = i === !0 || "true" === i;
                        r.settings.messages[n.name].remote = o.originalMessage, c ? (u = r.formSubmitted, r.prepareElement(n), r.formSubmitted = u, r.successList.push(n), delete r.invalid[n.name], r.showErrors()) : (a = {}, s = i || r.defaultMessage(n, "remote"), a[n.name] = o.message = t.isFunction(s) ? s(e) : s, r.invalid[n.name] = !0, r.showErrors(a)), o.valid = c, r.stopRequest(n, c)
                    }
                }, i)), "pending")
            }
        }
    }), t.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead."
    };
    var e, n = {};
    t.ajaxPrefilter ? t.ajaxPrefilter(function(t, e, i) {
        var r = t.port;
        "abort" === t.mode && (n[r] && n[r].abort(), n[r] = i)
    }) : (e = t.ajax, t.ajax = function(i) {
        var r = ("mode" in i ? i : t.ajaxSettings).mode,
            a = ("port" in i ? i : t.ajaxSettings).port;
        return "abort" === r ? (n[a] && n[a].abort(), n[a] = e.apply(this, arguments), n[a]) : e.apply(this, arguments)
    }), t.extend(t.fn, {
        validateDelegate: function(e, n, i) {
            return this.bind(n, function(n) {
                var r = t(n.target);
                return r.is(e) ? i.apply(r, arguments) : void 0
            })
        }
    })
}),
function(t, e) {
    var n = {
        catchMethods: {
            methodreturn: [],
            count: 0
        },
        init: function(e) {
            var n, i, r;
            e.originalEvent.origin.match(/vimeo/g) && "data" in e.originalEvent && (r = "string" === t.type(e.originalEvent.data) ? t.parseJSON(e.originalEvent.data) : e.originalEvent.data, r && (n = this.setPlayerID(r), n.length && (i = this.setVimeoAPIurl(n), r.hasOwnProperty("event") && this.handleEvent(r, n, i), r.hasOwnProperty("method") && this.handleMethod(r, n, i))))
        },
        setPlayerID: function(e) {
            return t("iframe[src*=" + e.player_id + "]")
        },
        setVimeoAPIurl: function(t) {
            return "http" !== t.attr("src").substr(0, 4) ? "https:" + t.attr("src").split("?")[0] : t.attr("src").split("?")[0]
        },
        handleMethod: function(t) {
            this.catchMethods.methodreturn.push(t.value)
        },
        handleEvent: function(e, n, i) {
            switch (e.event.toLowerCase()) {
                case "ready":
                    for (var r in t._data(n[0], "events")) r.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && n[0].contentWindow.postMessage(JSON.stringify({
                        method: "addEventListener",
                        value: r
                    }), i);
                    if (n.data("vimeoAPICall")) {
                        for (var a = n.data("vimeoAPICall"), o = 0; o < a.length; o++) n[0].contentWindow.postMessage(JSON.stringify(a[o].message), a[o].api);
                        n.removeData("vimeoAPICall")
                    }
                    n.data("vimeoReady", !0), n.triggerHandler("ready");
                    break;
                case "seek":
                    n.triggerHandler("seek", [e.data]);
                    break;
                case "loadprogress":
                    n.triggerHandler("loadProgress", [e.data]);
                    break;
                case "playprogress":
                    n.triggerHandler("playProgress", [e.data]);
                    break;
                case "pause":
                    n.triggerHandler("pause");
                    break;
                case "finish":
                    n.triggerHandler("finish");
                    break;
                case "play":
                    n.triggerHandler("play");
                    break;
                case "cuechange":
                    n.triggerHandler("cuechange")
            }
        }
    };
    jQuery(document).ready(function() {
        t("iframe[src*='vimeo.com']").each(function(e) {
            var n = t(this).attr("src");
            if (null === n.match(/player_id/g)) {
                var i = -1 === n.indexOf("?") ? "?" : "&",
                    r = t.param({
                        api: 1,
                        player_id: "vvvvimeoVideo-" + e
                    });
                t(this).attr("src", n + i + r)
            }
        })
    }), t(e).on("message", function(t) {
        n.init(t)
    }), t.vimeo = function(t, i, r) {
        var a = {}, o = n.catchMethods.methodreturn.length;
        if ("string" == typeof i && (a.method = i), void 0 !== typeof r && "function" != typeof r && (a.value = r), "iframe" === t.prop("tagName").toLowerCase() && a.hasOwnProperty("method"))
            if (t.data("vimeoReady")) t[0].contentWindow.postMessage(JSON.stringify(a), n.setVimeoAPIurl(t));
            else {
                var s = t.data("vimeoAPICall") ? t.data("vimeoAPICall") : [];
                s.push({
                    message: a,
                    api: n.setVimeoAPIurl(t)
                }), t.data("vimeoAPICall", s)
            }
        return "get" !== i.toString().substr(0, 3) && "paused" !== i.toString() || "function" != typeof r || (! function(t, i, r) {
            var a = e.setInterval(function() {
                n.catchMethods.methodreturn.length != t && (e.clearInterval(a), i(n.catchMethods.methodreturn[r]))
            }, 10)
        }(o, r, n.catchMethods.count), n.catchMethods.count++), t
    }, t.fn.vimeo = function(e, n) {
        return t.vimeo(this, e, n)
    }
}(jQuery, window), window.CF = {
    settings: {
        env: "production",
        baseUrl: "https://www.contentful.com",
        segmentio: {
            key: "p29w88lvw4"
        },
        salesforce: {
            oid: "00Dw0000000nYeS"
        },
        analytics: {
            delay: 500
        }
    },
    init: function() {
        $(document).ready(function() {
            switch (CF.RetinaImages.init(), CF.ResponsiveNav.init(), CF.ScrollLink.init(), CF.Tracking.init(), this.pageName = $("[data-page]").data("page"), -1 != this.pageName.indexOf("faq") && (this.pageName = "faq"), this.pageName) {
                case "careers":
                    CF.Pages.Careers.init();
                    break;
                case "changelog":
                    CF.Pages.Documentation.init(), CF.ResponsiveSubNav.init();
                    break;
                case "contact":
                    CF.Pages.Contact.init();
                    break;
                case "developercenter":
                    CF.Pages.Documentation.init(), CF.ResponsiveSubNav.init();
                    break;
                case "ecosystem":
                    CF.Pages.Ecosystem.init();
                    break;
                case "faq":
                    CF.ResponsiveSubNav.init();
                    break;
                case "home":
                    CF.Pages.Home.init();
                    break;
                case "pricing":
                    CF.Pages.Pricing.init();
                    break;
                case "signup":
                    CF.Pages.Signup.init()
            }
        })
    },
    Pages: {}
}, CF.Tracking = {
    init: function() {
        that = this, this.identifyValues = {}, window.optimizely && "" != window.optimizely.data.state.activeExperiments && (this.experimentID = window.optimizely.data.state.activeExperiments[0], this.variationIndex = window.optimizely.data.state.variationMap[this.experimentID], this.identifyValues.variation = this.variationIndex), this.cookie = $.cookie("cf_visitortraits"), this.cookie ? this.visitorid = JSON.parse($.cookie("cf_visitortraits")).id : (this.visitorid = this.generateID(), this.initTraitsCookie(this.visitorid)), this.identifyValues.visitorid = this.visitorid, this.identifyValues.customer = $.cookie("ajs_user_id") && "null" != $.cookie("ajs_user_id") ? "Yes" : "No", analytics.identify(this.identifyValues), analytics.page(), analytics.track("Baseline", {
            label: "Baseline",
            nonInteraction: 1
        }), this.trackEvents(), this.initFirstVisitCookie(), this.initLastVisitCookie()
    },
    trackEvents: function() {
        $("[data-track]").on("click", function(t) {
            t.preventDefault(), $this = $(this), eventName = $this.data("track"), eventLabel = $this.data("track-label"), eventInteraction = 0, "1" == $this.data("track-nointeraction") && (eventInteraction = 1), analytics.track(eventName, {
                label: eventLabel,
                nonInteraction: eventInteraction
            }), $this.is("a") && setTimeout(function() {
                window.location.href = $this.attr("href")
            }, CF.settings.analytics.delay)
        })
    },
    initTraitsCookie: function(t) {
        this.id = t, this.medium = getUrlParameter("utm_medium"), this.source = getUrlParameter("utm_source"), this.campaign = getUrlParameter("utm_campaign"), this.content = getUrlParameter("utm_content"), this.term = getUrlParameter("utm_term");
        var e = {
            id: this.id,
            medium: this.medium,
            source: this.source,
            campaign: this.campaign,
            content: this.content,
            term: this.term
        };
        $.cookie("cf_visitortraits", JSON.stringify(e), {
            expires: 730,
            domain: CF.Tracking.cookieDomain()
        })
    },
    initFirstVisitCookie: function() {
        var t = $.cookie("cf_first_visit");
        if (!t) {
            var e = {
                referer: this.getReferer(),
                url: document.URL,
                time: new Date
            };
            $.cookie("cf_first_visit", JSON.stringify(e), {
                expires: 3650,
                domain: this.cookieDomain()
            })
        }
    },
    initLastVisitCookie: function() {
        var t = $.cookie("cf_last_visit");
        if (!t) {
            var e = {
                referer: this.getReferer(),
                url: document.URL,
                time: new Date
            };
            $.cookie("cf_last_visit", JSON.stringify(e), {
                domain: this.cookieDomain(),
                expires: null
            })
        }
    },
    urlIsOnDomain: function(t, e) {
        var n = this.cleanUrl(t),
            i = this.cleanUrl(e);
        return 0 == n.indexOf(i)
    },
    cleanUrl: function(t) {
        return t.replace("http://", "").replace("https://", "").split(":")[0]
    },
    cookieDomain: function() {
        var t = this.cleanUrl(CF.settings.baseUrl),
            e = t.split(".");
        return [e[1], e[2]].join(".")
    },
    getReferer: function() {
        var t = null;
        return !this.urlIsOnDomain(document.referrer, CF.settings.baseUrl) && document.referrer.length > 5 && (t = document.referrer), t
    },
    generateID: function() {
        return Math.round((new Date).getTime() + 100 * Math.random())
    }
}, CF.ResponsiveNav = {
    init: function() {
        var t = this;
        this.$openNav = $('[data-action="nav-open"]'), this.$closeNav = $('[data-action="nav-close"]'), this.$nav = $('[data-action="nav"]'), this.$overlay = $('[data-action="overlay"]'), this.$openNav.on("click", function() {
            t.openNav()
        }), this.$closeNav.on("click", function() {
            t.closeNav()
        })
    },
    openNav: function() {
        var t = this;
        this.$nav.addClass("is-visible"), this.$overlay.addClass("is-visible"), this.$overlay.on("click", function() {
            t.closeNav()
        }), $(document).on("scroll", window, function() {
            t.closeNav()
        })
    },
    closeNav: function() {
        this.$nav.removeClass("is-visible"), this.$overlay.removeClass("is-visible"), this.$overlay.off("click"), $(document).off("scroll")
    }
}, CF.ResponsiveSubNav = {
    init: function() {
        var t = this;
        this.$nav = $('[data-action="responsive-nav"]'), $('[data-action="nav-category"]').each(function() {
            var e = $(this),
                n = e.find(".sidebar__headline").text();
            group = $('<optgroup label="' + n + '"></optgroup>'), t.$nav.append(group), e.find("a").each(function() {
                var t = $(this),
                    e = t.attr("href"),
                    n = t.text(),
                    i = t.data("key"),
                    r = $("<option></option>");
                r.val(e).text(n).attr("data-key", i), group.append(r)
            })
        }), this.$nav.change(function() {
            var e = t.$nav.find("option:selected").val();
            window.location.href = e
        }), this.$activeItem = $("[data-sidebar-item].is-active"), this.$activeItem[0] && (this.activeKey = this.$activeItem.data("key"), this.$activeOption = this.$nav.find('[data-key="' + this.activeKey + '"]'), this.$activeOption.attr("selected", !0))
    }
}, CF.RetinaImages = {
    init: function() {
        window.devicePixelRatio > 1 && $("[data-retina]").each(function() {
            var t = $(this),
                e = t.data("retina");
            t.attr("src", e)
        })
    }
}, CF.ScrollLink = {
    init: function() {
        var t = this;
        $('[data-action="scroll"]').on("click", function(e) {
            e.preventDefault(), t.targetID = $(this).attr("href").replace("#", ""), t.$target = $("#" + t.targetID), $("html, body").animate({
                scrollTop: t.$target.offset().top
            }, 600)
        })
    }
}, CF.Pages.Careers = {
    init: function() {
        this.employeesSlider(), this.loadJobs()
    },
    employeesSlider: function() {
        this.$nav = $("[data-slider]"), this.$nav.on("click", function() {
            var t = $(this).data("slider"),
                e = $("[data-slider].is-active"),
                n = $("[data-background].is-active"),
                i = $("[data-quote].is-active"),
                r = $('[data-slider="' + t + '"]'),
                a = $('[data-background="' + t + '"]'),
                o = $('[data-quote="' + t + '"]');
            e.removeClass("is-active"), n.removeClass("is-active"), i.removeClass("is-active"), r.addClass("is-active"), a.addClass("is-active"), i.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                o.addClass("is-active")
            })
        })
    },
    loadJobs: function() {
        $.getScript("https://www.workable.com/assets/embed.js", function() {
            whr(document).ready(function() {
                whr_embed(2345, {
                    detail: "titles",
                    base: "jobs",
                    zoom: "city",
                    grouping: "departments"
                })
            })
        })
    }
}, CF.Pages.Contact = {
    init: function() {
        this.$form = $("[data-form]"), this.salesForceId(), this.visitorTraits(), this.validateAndTrack()
    },
    salesForceId: function() {
        this.$oid = this.$form.find("[data-oid]"), this.$oid.val(CF.settings.salesforce.oid)
    },
    visitorTraits: function() {
        that = this, analytics.ready(function() {
            that.cookie = $.cookie("cf_visitortraits"), that.traits = JSON.parse(that.cookie), that.$visitorId = that.$form.find("[data-visitorid]"), that.$medium = that.$form.find("[data-medium]"), that.$source = that.$form.find("[data-source]"), that.$campaignName = that.$form.find("[data-campaign-name]"), that.$campaignContent = that.$form.find("[data-campaign-content]"), that.$campaignTerm = that.$form.find("[data-campaign-term]"), that.$visitorId.val(that.traits.id), that.$medium.val(that.traits.medium), that.$source.val(that.traits.source), that.$campaignName.val(that.traits.campaign), that.$campaignContent.val(that.traits.content), that.$campaignTerm.val(that.traits.term)
        })
    },
    validateAndTrack: function() {
        that = this, this.$gtfo = this.$form.find("[data-gtfo]"), this.$submit = this.$form.find("[data-form-submit]"), this.label = this.$form.data("form"), this.$form.validate(), this.$submit.on("click", function(t) {
            if (t.preventDefault(), that.$form.valid()) {
                if ("" == that.$gtfo.val()) return analytics.track("Sent Valid Contact", {
                    category: "Contact",
                    label: that.label,
                    nonInteraction: 1
                }), setTimeout(function() {
                    that.$form.submit()
                }, CF.settings.analytics.delay), !1;
                window.location.href = "http://www.string-emil.de/"
            }
        })
    }
}, CF.Pages.Documentation = {
    init: function() {
        this.getStatus(), this.infoBox()
    },
    getStatus: function() {
        var t = this;
        this.container = $('[data-action="status"]'), this.text = $('[data-action="status-text"]'), this.sp = new StatusPage.page({
            page: "4bv17htq00cz"
        }), this.sp.summary({
            success: function(e) {
                t.container.addClass("is-" + e.status.indicator), t.text.html(e.status.description)
            }
        })
    },
    infoBox: function() {
        var t = this;
        this.$box = $('[data-action="info-box"]'), this.$closeBox = $('[data-action="close-info-box"]'), this.cookie = $.cookie("cf_docs"), this.cookie || this.$box.removeClass("is-hidden"), this.$closeBox.on("click", function() {
            t.$box.addClass("is-hidden"), $.cookie("cf_docs", 1, {
                expires: 730,
                domain: CF.Tracking.cookieDomain(),
                path: "/"
            })
        })
    }
}, CF.Pages.Ecosystem = {
    init: function() {
        $("[data-lightbox]").magnificPopup({
            type: "iframe",
            gallery: {
                enabled: !0
            }
        })
    }
}, CF.Pages.Home = {
    init: function() {
        jQuery.scrollDepth({
            elements: ['[data-element="Intro"]', '[data-element="Testimonials"]', '[data-element="CTA"]'],
            percentage: !1,
            userTiming: !1,
            pixelDepth: !1
        }), this.watchVideo()
    },
    watchVideo: function() {
        var t = this;
        this.$body = $("body"), this.$button = $('[data-action="watch"]'), this.$modal = $('[data-action="modal"]'), this.$overlay = $('[data-action="overlay"]'), this.$video = $('[data-action="explanatory-video"]'), this.$video.vimeo("getDuration", function(e) {
            t.duration = e
        }), this.$button.on("click", function() {
            t.showVideo()
        })
    },
    showVideo: function() {
        var t = this;
        this.$modal.addClass("is-visible"), this.$overlay.addClass("is-visible"), this.$body.addClass("is-locked"), this.$video.vimeo("play"), this.$modal.on("click", function() {
            t.hideVideo()
        }), $(document).on("keyup", function() {
            27 == event.keyCode && t.hideVideo()
        })
    },
    hideVideo: function() {
        var t = this;
        this.$modal.removeClass("is-visible"), this.$overlay.removeClass("is-visible"), this.$body.removeClass("is-locked"), this.$video.vimeo("pause"), this.$overlay.off("click"), this.$modal.off("click"), $(document).off("keyup"), this.$video.vimeo("getCurrentTime", function(e) {
            t.currentTime = e / t.duration * 100, t.niceCurrentTime = "0%", t.currentTime > 95 ? t.niceCurrentTime = "100%" : t.currentTime > 75 ? t.niceCurrentTime = "75%" : t.currentTime > 50 ? t.niceCurrentTime = "50%" : t.currentTime > 25 && (t.niceCurrentTime = "25%"), analytics.track("Watch Video", {
                label: t.niceCurrentTime,
                nonInteraction: 1
            })
        })
    }
}, CF.Pages.Pricing = {
    init: function() {
        this.initPricingSwitch()
    },
    initPricingSwitch: function() {
        function t(t) {
            var n = $(".is-active[data-switch]"),
                i = n.data("switch"),
                r = $('[data-switch="' + t + '"]');
            n.removeClass("is-active"), r.addClass("is-active"), e.$switchBtn.removeClass("switch__control--" + i).addClass("switch__control--" + t), $("[data-plan]").each(function() {
                var e = $(this),
                    n = e.data("plan"),
                    i = e.find("[data-amount]").data(t),
                    r = CF.settings.baseUrl + "/sign-up/#" + n + "_" + t;
                e.find("[data-amount]").html(i), e.find("[data-plan-cta]").attr("href", r)
            })
        }
        var e = this;
        this.$switchBtn = $('[data-action="switch"]'), this.$switchLabel = $("[data-switch]"), this.$switchLabel.on("click", function() {
            var e = $(this).data("switch");
            t(e)
        }), this.$switchBtn.on("click", function() {
            var e = $("[data-switch]:not(.is-active)"),
                n = e.data("switch");
            t(n)
        })
    }
}, CF.Pages.Signup = {
    init: function() {
        this.$form = $("[data-form]"), this.$submit = this.$form.find("[data-form-submit]"), this.$planField = this.$form.find("[data-form-plan]"), this.getPlan(), this.validateAndTrack(), this.displayDescriptions()
    },
    getPlan: function() {
        this.plan = window.location.hash.substr(1), "" != this.plan && this.$planField.val(this.plan)
    },
    validateAndTrack: function() {
        var t = this;
        this.$form = $("[data-form]"), this.$submit = this.$form.find("[data-form-submit]"), this.$form.validate(), this.$submit.on("click", function(e) {
            return e.preventDefault(), t.$form.valid() ? (analytics.track("Sent Valid Signup", {
                category: "Sign Up",
                label: t.plan
            }), setTimeout(function() {
                t.$form.submit()
            }, CF.settings.analytics.delay), !1) : void 0
        })
    },
    displayDescriptions: function() {
        this.$form.find("[data-form-input]").on("focus", function() {
            $this = $(this), fieldName = $this.attr("id"), $('[for="' + fieldName + '"]').find("[data-form-label-description]").addClass("is-visible")
        }), this.$form.find("[data-form-input]").on("blur", function() {
            $("[data-form-label-description].is-visible").removeClass("is-visible")
        })
    }
}, CF.init();