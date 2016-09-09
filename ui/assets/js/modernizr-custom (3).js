/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-classlist-history-svgfilters-svgforeignobject-setclasses !*/
!function (e, n, s) {
    function t(e, n) {
        return typeof e === n
    }

    function o() {
        var e, n, s, o, i, l, f;
        for (var c in r)if (r.hasOwnProperty(c)) {
            if (e = [], n = r[c], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))for (s = 0; s < n.options.aliases.length; s++)e.push(n.options.aliases[s].toLowerCase());
            for (o = t(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++)l = e[i], f = l.split("."), 1 === f.length ? Modernizr[f[0]] = o : (!Modernizr[f[0]] || Modernizr[f[0]] instanceof Boolean || (Modernizr[f[0]] = new Boolean(Modernizr[f[0]])), Modernizr[f[0]][f[1]] = o), a.push((o ? "" : "no-") + f.join("-"))
        }
    }

    function i(e) {
        var n = f.className, s = Modernizr._config.classPrefix || "";
        if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var t = new RegExp("(^|\\s)" + s + "no-js(\\s|$)");
            n = n.replace(t, "$1" + s + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + s + e.join(" " + s), c ? f.className.baseVal = n : f.className = n)
    }

    var a = [], r = [], l = {
        _version: "3.3.1",
        _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
        _q: [],
        on: function (e, n) {
            var s = this;
            setTimeout(function () {
                n(s[e])
            }, 0)
        },
        addTest: function (e, n, s) {
            r.push({name: e, fn: n, options: s})
        },
        addAsyncTest: function (e) {
            r.push({name: null, fn: e})
        }
    }, Modernizr = function () {
    };
    Modernizr.prototype = l, Modernizr = new Modernizr, Modernizr.addTest("history", function () {
        var n = navigator.userAgent;
        return -1 === n.indexOf("Android 2.") && -1 === n.indexOf("Android 4.0") || -1 === n.indexOf("Mobile Safari") || -1 !== n.indexOf("Chrome") || -1 !== n.indexOf("Windows Phone") ? e.history && "pushState" in e.history : !1
    }), Modernizr.addTest("svgfilters", function () {
        var n = !1;
        try {
            n = "SVGFEColorMatrixElement" in e && 2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE
        } catch (s) {
        }
        return n
    });
    var f = n.documentElement, c = "svg" === f.nodeName.toLowerCase(), d = {}.toString;
    Modernizr.addTest("svgforeignobject", function () {
        return !!n.createElementNS && /SVGForeignObject/.test(d.call(n.createElementNS("http://www.w3.org/2000/svg", "foreignObject")))
    }), Modernizr.addTest("classlist", "classList" in f), o(), i(a), delete l.addTest, delete l.addAsyncTest;
    for (var u = 0; u < Modernizr._q.length; u++)Modernizr._q[u]();
    e.Modernizr = Modernizr
}(window, document);