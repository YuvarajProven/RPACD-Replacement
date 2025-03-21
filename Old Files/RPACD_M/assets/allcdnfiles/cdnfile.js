/**
 * Minified by jsDelivr using UglifyJS v3.4.3.
 * Original file: /npm/jquery-match-height@0.7.2/dist/jquery.matchHeight.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(l) {
    var n = -1,
        a = -1,
        h = function(t) {
            return parseFloat(t) || 0
        },
        c = function(t) {
            var e = l(t),
                n = null,
                a = [];
            return e.each(function() {
                var t = l(this),
                    e = t.offset().top - h(t.css("margin-top")),
                    o = 0 < a.length ? a[a.length - 1] : null;
                null === o ? a.push(t) : Math.floor(Math.abs(n - e)) <= 1 ? a[a.length - 1] = o.add(t) : a.push(t), n = e
            }), a
        },
        p = function(t) {
            var e = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return "object" == typeof t ? l.extend(e, t) : ("boolean" == typeof t ? e.byRow = t : "remove" === t && (e.remove = !0), e)
        },
        u = l.fn.matchHeight = function(t) {
            var e = p(t);
            if (e.remove) {
                var o = this;
                return this.css(e.property, ""), l.each(u._groups, function(t, e) {
                    e.elements = e.elements.not(o)
                }), this
            }
            return this.length <= 1 && !e.target || (u._groups.push({
                elements: this,
                options: e
            }), u._apply(this, e)), this
        };
    u.version = "0.7.2", u._groups = [], u._throttle = 80, u._maintainScroll = !1, u._beforeUpdate = null, u._afterUpdate = null, u._rows = c, u._parse = h, u._parseOptions = p, u._apply = function(t, e) {
        var i = p(e),
            o = l(t),
            n = [o],
            a = l(window).scrollTop(),
            r = l("html").outerHeight(!0),
            s = o.parents().filter(":hidden");
        return s.each(function() {
            var t = l(this);
            t.data("style-cache", t.attr("style"))
        }), s.css("display", "block"), i.byRow && !i.target && (o.each(function() {
            var t = l(this),
                e = t.css("display");
            "inline-block" !== e && "flex" !== e && "inline-flex" !== e && (e = "block"), t.data("style-cache", t.attr("style")), t.css({
                display: e,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), n = c(o), o.each(function() {
            var t = l(this);
            t.attr("style", t.data("style-cache") || "")
        })), l.each(n, function(t, e) {
            var o = l(e),
                a = 0;
            if (i.target) a = i.target.outerHeight(!1);
            else {
                if (i.byRow && o.length <= 1) return void o.css(i.property, "");
                o.each(function() {
                    var t = l(this),
                        e = t.attr("style"),
                        o = t.css("display");
                    "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block");
                    var n = {
                        display: o
                    };
                    n[i.property] = "", t.css(n), t.outerHeight(!1) > a && (a = t.outerHeight(!1)), e ? t.attr("style", e) : t.css("display", "")
                })
            }
            o.each(function() {
                var t = l(this),
                    e = 0;
                i.target && t.is(i.target) || ("border-box" !== t.css("box-sizing") && (e += h(t.css("border-top-width")) + h(t.css("border-bottom-width")), e += h(t.css("padding-top")) + h(t.css("padding-bottom"))), t.css(i.property, a - e + "px"))
            })
        }), s.each(function() {
            var t = l(this);
            t.attr("style", t.data("style-cache") || null)
        }), u._maintainScroll && l(window).scrollTop(a / r * l("html").outerHeight(!0)), this
    }, u._applyDataApi = function() {
        var o = {};
        l("[data-match-height], [data-mh]").each(function() {
            var t = l(this),
                e = t.attr("data-mh") || t.attr("data-match-height");
            o[e] = e in o ? o[e].add(t) : t
        }), l.each(o, function() {
            this.matchHeight(!0)
        })
    };
    var i = function(t) {
        u._beforeUpdate && u._beforeUpdate(t, u._groups), l.each(u._groups, function() {
            u._apply(this.elements, this.options)
        }), u._afterUpdate && u._afterUpdate(t, u._groups)
    };
    u._update = function(t, e) {
        if (e && "resize" === e.type) {
            var o = l(window).width();
            if (o === n) return;
            n = o
        }
        t ? -1 === a && (a = setTimeout(function() {
            i(e), a = -1
        }, u._throttle)) : i(e)
    }, l(u._applyDataApi);
    var t = l.fn.on ? "on" : "bind";
    l(window)[t]("load", function(t) {
        u._update(!1, t)
    }), l(window)[t]("resize orientationchange", function(t) {
        u._update(!0, t)
    })
});
//# sourceMappingURL=/sm/b4cfb12116f687afdd35ab790d38b199ddbb3bc498bfed1cecd28dc238e65261.map
