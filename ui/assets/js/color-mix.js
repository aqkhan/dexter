window.ColorMix = function() {
    "use strict";
    var e, r, o;
    return o = [{
        reference: 0,
        color: {
            red: 0,
            green: 0,
            blue: 0
        }
    }, {
        reference: 100,
        color: {
            red: 255,
            green: 255,
            blue: 255
        }
    }],
        e = function(e, r, o) {
            return this.red = 0,
                this.green = 0,
                this.blue = 0,
            void 0 !== e && (void 0 !== r && void 0 !== o ? (this.setRed(parseInt(e)),
                this.setGreen(parseInt(r)),
                this.setBlue(parseInt(o))) : "string" == typeof e && this.fromHex(e)),
                this
        }
        ,
        r = function() {
            return {
                RGB: function(e, r, o) {
                    if (void 0 === e || void 0 === r || void 0 === o)
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGB()"';
                    return {
                        red: isNaN(parseInt(e)) ? 0 : parseInt(e),
                        green: isNaN(parseInt(r)) ? 0 : parseInt(r),
                        blue: isNaN(parseInt(o)) ? 0 : parseInt(o)
                    }
                },
                XYZ: function(e, r, o) {
                    if (void 0 === e || void 0 === r || void 0 === o)
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZ()"';
                    return {
                        x: isNaN(parseFloat(e)) ? 0 : parseFloat(e),
                        y: isNaN(parseFloat(r)) ? 0 : parseFloat(r),
                        z: isNaN(parseFloat(o)) ? 0 : parseFloat(o)
                    }
                },
                HSL: function(e, r, o) {
                    if (void 0 === e || void 0 === r || void 0 === o)
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.HSL()"';
                    return {
                        hue: isNaN(parseInt(e)) ? 0 : parseInt(e),
                        sat: isNaN(parseInt(r)) ? 0 : parseInt(r),
                        lig: isNaN(parseInt(o)) ? 0 : parseInt(o)
                    }
                },
                Lab: function(e, r, o) {
                    if (void 0 === e || void 0 === r || void 0 === o)
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.Lab()"';
                    return {
                        L: isNaN(parseFloat(e)) ? 0 : parseFloat(e),
                        a: isNaN(parseFloat(r)) ? 0 : parseFloat(r),
                        b: isNaN(parseFloat(o)) ? 0 : parseFloat(o)
                    }
                },
                RGBtoXYZ: function(e, r, o) {
                    var t, i, n, a;
                    if (void 0 !== e && void 0 !== r && void 0 !== o)
                        t = new this.RGB(e,r,o);
                    else {
                        if (void 0 === e || "object" != typeof e || void 0 === e.red || void 0 === e.green || void 0 === e.blue)
                            throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoXYZ()".';
                        t = new this.RGB(e.red,e.green,e.blue)
                    }
                    return a = parseFloat(t.red / 255),
                        n = parseFloat(t.green / 255),
                        i = parseFloat(t.blue / 255),
                        a = 100 * (a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a /= 12.92),
                        n = 100 * (n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n /= 12.92),
                        i = 100 * (i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i /= 12.92),
                        new this.XYZ(.4124 * a + .3576 * n + .1805 * i,.2126 * a + .7152 * n + .0722 * i,.0193 * a + .1192 * n + .9505 * i)
                },
                XYZtoRGB: function(e, r, o) {
                    var t, i, n, a, s, l, d;
                    if (void 0 !== e && void 0 !== r && void 0 !== o)
                        t = new this.XYZ(e,r,o);
                    else {
                        if (void 0 === e || "object" != typeof e || void 0 === e.x || void 0 === e.y || void 0 === e.z)
                            throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZtoRGB()".';
                        t = new this.XYZ(e.x,e.y,e.z)
                    }
                    return s = t.x / 100,
                        l = t.y / 100,
                        d = t.z / 100,
                        a = 3.2406 * s + -1.5372 * l + d * -.4986,
                        n = s * -.9689 + 1.8758 * l + .0415 * d,
                        i = .0557 * s + l * -.204 + 1.057 * d,
                        a = 255 * (a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : a *= 12.92),
                        n = 255 * (n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92),
                        i = 255 * (i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92),
                        new this.RGB(Math.round(a),Math.round(n),Math.round(i))
                },
                RGBtoHSL: function(e, r, o) {
                    var t, i, n, a, s, l, d, h, c, u, p;
                    if (void 0 !== e && void 0 !== r && void 0 !== o)
                        n = new this.RGB(e,r,o);
                    else {
                        if (void 0 === e || "object" != typeof e || void 0 === e.red || void 0 === e.green || void 0 === e.blue)
                            throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoXYZ()".';
                        n = new this.RGB(e.red,e.green,e.blue)
                    }
                    if (u = n.red / 255,
                            d = n.green / 255,
                            s = n.blue / 255,
                            h = Math.max(u, d, s),
                            c = Math.min(u, d, s),
                            i = (h + c) / 2,
                        h === c)
                        t = a = 0;
                    else {
                        switch (l = h - c,
                            a = i > .5 ? l / (2 - h - c) : l / (h + c),
                            h) {
                            case "red":
                                t = (d - s) / l + (null != (p = s > d) ? p : {
                                        6: 0
                                    });
                                break;
                            case "green":
                                t = (s - u) / l + 2;
                                break;
                            case "blue":
                                t = (u - d) / l + 4
                        }
                        t /= 6
                    }
                    return new this.HSL(Math.floor(360 * t),Math.floor(100 * a),Math.floor(100 * i))
                },
                XYZtoLab: function(e, r, o) {
                    var t, i, n, a;
                    if (void 0 !== e && void 0 !== r && void 0 !== o)
                        t = new this.XYZ(e,r,o);
                    else {
                        if (void 0 === e || "object" != typeof e || void 0 === e.x || void 0 === e.y || void 0 === e.z)
                            throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.XYZtoLab()".';
                        t = new this.XYZ(e.x,e.y,e.z)
                    }
                    return i = t.x / 95.047,
                        n = t.y / 100,
                        a = t.z / 108.883,
                        i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116,
                        n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116,
                        a = a > .008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116,
                        new this.Lab(116 * n - 16,500 * (i - n),200 * (n - a))
                },
                LabtoXYZ: function(e, r, o) {
                    var t, i, n, a;
                    if (void 0 !== e && void 0 !== r && void 0 !== o)
                        t = new this.Lab(e,r,o);
                    else {
                        if (void 0 === e || "object" != typeof e || void 0 === e.L || void 0 === e.a || void 0 === e.b)
                            throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.LabtoXYZ()".';
                        t = new this.Lab(e.L,e.a,e.b)
                    }
                    return n = (t.L + 16) / 116,
                        i = t.a / 500 + n,
                        a = n - t.b / 200,
                        n = Math.pow(n, 3) > .008856 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787,
                        i = Math.pow(i, 3) > .008856 ? Math.pow(i, 3) : (i - 16 / 116) / 7.787,
                        a = Math.pow(a, 3) > .008856 ? Math.pow(a, 3) : (a - 16 / 116) / 7.787,
                        new this.XYZ(95.047 * i,100 * n,108.883 * a)
                },
                RGBtoLab: function(e, r, o) {
                    if (void 0 === e || void 0 === r || void 0 === o)
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.RGBtoLab()"';
                    return this.XYZtoLab(this.RGBtoXYZ(e, r, o))
                },
                LabtoRGB: function(e, r, o) {
                    if (void 0 === e || void 0 === r || void 0 === o)
                        throw 'Invalid parameter(s) provided for "ColorMix.ColorSpace.LabtoRGB()"';
                    return this.XYZtoRGB(this.LabtoXYZ(e, r, o))
                }
            }
        }(),
        e.prototype = {
            fromHex: function(e) {
                var r, o, t;
                return e = String(e) || "",
                    e.length > 0 ? ("#" === e[0] && (e = e.slice(1)),
                    3 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
                        t = parseInt(e.slice(0, 2), 16),
                        o = parseInt(e.slice(2, 4), 16),
                        r = parseInt(e.slice(4, 6), 16),
                        this.setRed(isNaN(t) ? 0 : t),
                        this.setGreen(isNaN(o) ? 0 : o),
                        this.setBlue(isNaN(r) ? 0 : r)) : (this.setRed(0),
                        this.setGreen(0),
                        this.setBlue(0)),
                    this
            },
            setRed: function(e) {
                return void 0 !== e && (this.red = Math.min(255, Math.max(0, parseInt(e)))),
                    this
            },
            getRed: function() {
                return this.red
            },
            setGreen: function(e) {
                return void 0 !== e && (this.green = Math.min(255, Math.max(0, parseInt(e)))),
                    this
            },
            getGreen: function() {
                return this.green
            },
            setBlue: function(e) {
                return void 0 !== e && (this.blue = Math.min(255, Math.max(0, parseInt(e)))),
                    this
            },
            getBlue: function() {
                return this.blue
            },
            toString: function(e) {
                var r;
                switch (e) {
                    case "rgb":
                        return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
                    case "rgba":
                        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", 1)";
                    case "hsl":
                        return r = ColorMix.ColorSpace.RGBtoHSL(this.red, this.green, this.blue),
                        "hsl(" + r.hue + ", " + r.sat + "%, " + r.lig + "%)";
                    case "hsla":
                        return r = ColorMix.ColorSpace.RGBtoHSL(this.red, this.green, this.blue),
                        "hsla(" + r.hue + ", " + r.sat + "%, " + r.lig + "%, 1)";
                    default:
                        return "#" + ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue).toString(16).slice(1)
                }
            },
            useAsBackground: function(e) {
                var r, o, t;
                if ("object" == typeof e && null !== e)
                    e.css && e.css("background-color", "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")");
                else if (e = String(e),
                    e.length > 0)
                    if (void 0 !== window.jQuery)
                        window.jQuery(e).css("background-color", "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")");
                    else {
                        if ("string" == typeof e)
                            switch (e[0]) {
                                case "#":
                                    o = document.getElementById(e);
                                    break;
                                case ".":
                                    if (document.getElementsByClassName)
                                        o = document.getElementsByClassName(e);
                                    else
                                        for (o = [],
                                                 r = document.getElementsByTagName("*"),
                                                 t = r.length; t--; )
                                            r[t].className === e.slice(1) && o.push(r[t])();
                                    break;
                                default:
                                    o = document.getElementsByTagName(e)
                            }
                        for (t = o.length; t--; )
                            (o[t].style["background-color"] = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")")()
                    }
                return this
            },
            useAsColor: function(e) {
                var r, o, t;
                if ("object" == typeof e && null !== e)
                    e.css && e.css("color", "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")");
                else if (e = String(e),
                    e.length > 0)
                    if (void 0 !== window.jQuery)
                        window.jQuery(e).css("color", "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")");
                    else {
                        if ("string" == typeof e)
                            switch (e[0]) {
                                case "#":
                                    o = document.getElementById(e);
                                    break;
                                case ".":
                                    if (document.getElementsByClassName)
                                        o = document.getElementsByClassName(e);
                                    else
                                        for (o = [],
                                                 r = document.getElementsByTagName("*"),
                                                 t = r.length; t--; )
                                            r[t].className === e.slice(1) && o.push(r[t])();
                                    break;
                                default:
                                    o = document.getElementsByTagName(e)
                            }
                        for (t = o.length; t--; )
                            (o[t].style.color = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")")()
                    }
                return this
            }
        },
    {
        Color: e,
        ColorSpace: r,
        mix: function(e, r) {
            var o, t, i, n, a, s, l;
            if (void 0 === e || "[object Array]" !== Object.prototype.toString.call(e))
                throw '"ColorMix.mix()" first parameter should be an array of ColorMix.Color objects';
            if (void 0 === r)
                for (r = [],
                         l = e.length; l--; )
                    r[l] = 100 / e.length;
            else if ("[object Array]" !== Object.prototype.toString.call(r))
                throw '"ColorMix.mix()" second parameter should be an array of percents. (nnumber values)';
            if (e.length !== r.length)
                throw '"ColorMix.mix()" parameters should be arrays of the same size !';
            for (l = e.length,
                     o = 0,
                     a = 0,
                     s = 0,
                     i = 0; l--; ) {
                if (!(e[l]instanceof ColorMix.Color))
                    throw '"ColorMix.mix()" color at index: ' + l + " should be an instance of ColorMix.Color() object !";
                if (i += r[l],
                    i > 100)
                    throw 'Invalid "ColorMix.mix()" second parameter: the sum of all the percents array items should be 100.';
                t = ColorMix.ColorSpace.RGBtoLab(e[l].getRed(), e[l].getGreen(), e[l].getBlue()),
                    o += t.L * r[l] / 100,
                    a += t.a * r[l] / 100,
                    s += t.b * r[l] / 100
            }
            if (100 !== i)
                throw 'Invalid "ColorMix.mix()" second parameter: the sum of all the percents array items should be 100.';
            return n = ColorMix.ColorSpace.LabtoRGB(o, a, s),
                new ColorMix.Color(n.red,n.green,n.blue)
        },
        setGradient: function(e) {
            return void 0 !== e && "[object Array]" === Object.prototype.toString.call(e) && (o = e),
                this
        },
        getGradient: function() {
            return o
        },
        blend: function(e) {
            var r, t, i, n, a, s;
            if (void 0 === e)
                throw 'Missing "ColorMix.blend()" first parameter.';
            if (e = parseInt(e),
                    isNaN(e))
                throw 'Invalid "ColorMix.blend()" first parameter: you should provide a number.';
            if (i = o.length,
                    a = o[0],
                    n = o[i - 1],
                e <= a.reference)
                return new ColorMix.Color(a.color.red,a.color.green,a.color.blue);
            if (e >= n.reference)
                return new ColorMix.Color(n.color.red,n.color.green,n.color.blue);
            for (; i--; )
                s = o[i],
                    s.reference <= e && s.reference > a.reference ? a = s : s.reference >= e && s.reference < n.reference && (n = s);
            return r = new ColorMix.Color(a.color.red,a.color.green,a.color.blue),
                t = new ColorMix.Color(n.color.red,n.color.green,n.color.blue),
                a.percent = Math.abs(100 / ((a.reference - n.reference) / (e - n.reference))),
                n.percent = 100 - a.percent,
                new ColorMix.mix([r, t],[a.percent, n.percent])
        }
    }
}();