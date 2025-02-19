var _d = document;
_d.getElemetsByClassName = function(d, g) {
    var a = [];
    var c = null;
    var f = new RegExp(["(^|\\s)", d, "(\\s|$)"].join(""));
    if (g && g.getElementsByTagName) {
        c = g.getElementsByTagName("*")
    }
    if (!c) {
        c = _d.getElementsByTagName ? _d.getElementsByTagName("*") : _d.all
    }
    for (var e = 0, h = c.length; e < h; e++) {
        var b = c[e].getAttribute("class") || c[e].className;
        if (b.match(f)) {
            a.push(c[e])
        }
    }
    return a
}
;
function WindowSize() {
    this.w = 0;
    this.h = 0;
    return this
}
WindowSize.prototype.update = function() {
    var c = document;
    var a = (window.innerWidth) ? window.innerWidth : (c.documentElement && c.documentElement.clientWidth) ? c.documentElement.clientWidth : c.body.clientWidth;
    var b = (window.innerHeight) ? window.innerHeight : (c.documentElement && c.documentElement.clientHeight) ? c.documentElement.clientHeight : c.body.clientHeight;
    if (a != this.w || b != this.h) {
        this.w = a;
        this.h = b;
        return true
    }
    return false
}
;
function PageSize() {
    this.win = new WindowSize();
    this.w = 0;
    this.h = 0;
    return this
}
PageSize.prototype.update = function() {
    var e = document;
    var b = (window.innerWidth && window.scrollMaxX) ? window.innerWidth + window.scrollMaxX : (e.body.scrollWidth > e.body.offsetWidth) ? e.body.scrollWidth : e.body.offsetWidt;
    var c = (window.innerHeight && window.scrollMaxY) ? window.innerHeight + window.scrollMaxY : (e.body.scrollHeight > e.body.offsetHeight) ? e.body.scrollHeight : e.body.offsetHeight;
    var a = this.win.update();
    if (b < this.win.w) {
        b = this.win.w
    }
    if (c < this.win.h) {
        c = this.win.h
    }
    if (a || b != this.w || c != this.h) {
        this.w = b;
        this.h = c;
        return true
    }
    return false
}
;
function PagePos() {
    this.x = 0;
    this.y = 0;
    return this
}
PagePos.prototype.update = function() {
    var b = document;
    var a = (window.pageXOffset) ? window.pageXOffset : (b.documentElement && b.documentElement.scrollLeft) ? b.documentElement.scrollLeft : (b.body) ? b.body.scrollLeft : 0;
    var c = (window.pageYOffset) ? window.pageYOffset : (b.documentElement && b.documentElement.scrollTop) ? b.documentElement.scrollTop : (b.body) ? b.body.scrollTop : 0;
    if (a != this.x || c != this.y) {
        this.x = a;
        this.y = c;
        return true
    }
    return false
}
;
if (!window.Spica) {
    var Spica = {};
    Spica.B = new function() {
        this.name = navigator.userAgent;
        this.isWinIE = this.isMacIE = false;
        this.isGecko = this.name.match(/Gecko\//);
        this.isSafari = this.name.match(/AppleWebKit/);
        this.isSafari3 = (this.name.match(/AppleWebKit\/(\d\d\d)/) && parseInt(RegExp.$1) > 500);
        this.isKHTML = this.isSafari || navigator.appVersion.match(/Konqueror|KHTML/);
        this.isOpera = window.opera;
        if (_d.all && !this.isGecko && !this.isSafari && !this.isOpera) {
            this.isWinIE = this.name.match(/Win/);
            this.isMacIE = this.name.match(/Mac/);
            this.isNewIE = (this.name.match(/MSIE (\d\.\d)/) && RegExp.$1 > 6.5)
        }
    }
    ;
    Spica.E = {
        cache: false,
        getEvent: function(a) {
            return (a) ? a : ((window.event) ? window.event : null)
        },
        getKey: function(a) {
            if (!a) {
                return
            }
            return (a.keyCode) ? a.keyCode : a.charCode
        },
        stop: function(b) {
            if (!b) {
                return
            }
            try {
                b.stopPropagation()
            } catch (a) {}
            b.cancelBubble = true;
            try {
                b.preventDefault()
            } catch (a) {}
            return (b.returnValue = false)
        },
        register: function(a, c, b) {
            if (!a) {
                return
            }
            if (c == "keypress" && !a.addEventListener) {
                c = "keydown"
            }
            if (c == "mousewheel" && Spica.B.isGecko) {
                c = "DOMMouseScroll"
            }
            if (!this.cache) {
                this.cache = []
            }
            if (a.addEventListener) {
                this.cache.push([a, c, b]);
                a.addEventListener(c, b, false)
            } else {
                if (a.attachEvent) {
                    this.cache.push([a, c, b]);
                    a.attachEvent("on" + c, b)
                } else {
                    a["on" + c] = b
                }
            }
        },
        deregister: function(a, c, b) {
            if (!a) {
                return
            }
            if (c == "keypress" && !a.addEventListener) {
                c = "keydown"
            }
            if (c == "mousewheel" && Spica.B.isGecko) {
                c = "DOMMouseScroll"
            }
            if (a.removeEventListener) {
                a.removeEventListener(c, b, false)
            } else {
                if (a.detachEvent) {
                    a.detachEvent("on" + c, b)
                } else {
                    a["on" + c] = null
                }
            }
        },
        deregisterAll: function() {
            if (!Spica.E.cache) {
                return
            }
            for (var a = 0, b = Spica.E.cache.length; a < b; a++) {
                Spica.E.deregister(Spica.E.cache[a]);
                Spica.E.cache[a][0] = null
            }
            Spica.E.cache = false
        },
        run: function(a) {
            if (typeof a != "function") {
                return
            }
            (Spica.B.isGecko || Spica.B.isOpera) ? this.register(window, "DOMContentLoaded", a) : this.register(window, "load", a)
        }
    };
    Spica.E.register(window, "unload", Spica.E.deregisterAll)
}
function Lightbox(b) {
    var a = this;
    a._imgs = new Array();
    a._sets = new Array();
    a._wrap = null;
    a._box = null;
    a._img = null;
    a._open = -1;
    a._page = new PageSize();
    a._pos = new PagePos();
    a._zoomimg = null;
    a._expandable = false;
    a._expanded = false;
    a._funcs = {
        move: null,
        up: null,
        drag: null,
        wheel: null,
        dbl: null
    };
    a._level = 1;
    a._curpos = {
        x: 0,
        y: 0
    };
    a._imgpos = {
        x: 0,
        y: 0
    };
    a._minpos = {
        x: 0,
        y: 0
    };
    a._expand = b.expandimg;
    a._shrink = b.shrinkimg;
    a._blank = b.blankimg;
    a._resizable = b.resizable;
    a._timer = null;
    a._anim = {
        step: 0,
        w: 50,
        h: 50,
        a: 0,
        t: 0,
        f: b.animation
    };
    a._indicator = null;
    a._overall = null;
    a._openedset = null;
    a._prev = null;
    a._next = null;
    a._hiding = [];
    a._first = false;
    a._changed = false;
    a._actionEnabled = false;
    return a._init(b)
}
Lightbox.prototype = {
    refresh: function(a) {
        if (!a) {
            a = document
        }
        this._imgs.length = 0;
        this._genListFromLinks(a)
    },
    _init: function(c) {
        var b = this;
        var e = document;
        if (!e.getElementsByTagName) {
            return
        }
        if (Spica.B.isMacIE) {
            return b
        }
        var a = e.getElementsByTagName("body")[0];
        b._wrap = b._createWrapOn(a);
        b._box = b._createBoxOn(a, c);
        b._img = b._box.firstChild;
        b._zoomimg = e.getElementById("actionImage");
        if (!c.skipInit) {
            b._genListFromLinks(e)
        }
        return b
    },
    _genListFromLinks: function(h) {
        var c = this;
        var b = h.getElementsByTagName("a");
        for (var g = 0; g < b.length; g++) {
            var f = b[g];
            var e = c._imgs.length;
            var a = String(f.getAttribute("rel")).toLowerCase();
            if (!f.getAttribute("href") || !a.match("lightbox")) {
                continue
            }
            c._imgs[e] = {
                src: f.getAttribute("href"),
                w: -1,
                h: -1,
                title: "",
                cls: f.className,
                set: a
            };
            if (f.getAttribute("title")) {
                c._imgs[e].title = f.getAttribute("title")
            } else {
                if (f.firstChild && f.firstChild.getAttribute && f.firstChild.getAttribute("title")) {
                    c._imgs[e].title = f.firstChild.getAttribute("title")
                }
            }
            f.onclick = c._genOpener(e);
            if (a != "lightbox") {
                if (!c._sets[a]) {
                    c._sets[a] = new Array()
                }
                c._sets[a].push(e)
            }
        }
    },
    _genOpener: function(b) {
        var a = this;
        return function() {
            a._show(b);
            return false
        }
    },
    _createWrapOn: function(c) {
        var a = this;
        if (!c) {
            return null
        }
        var b = _d.createElement("div");
        c.appendChild(b);
        b.id = "overlay";
        b.style.display = "none";
        b.style.position = "fixed";
        b.style.top = "0px";
        b.style.left = "0px";
        b.style.zIndex = "50";
        b.style.width = "100%";
        b.style.height = "100%";
        if (Spica.B.isWinIE) {
            b.style.position = "absolute"
        }
        Spica.E.register(b, "click", function(d) {
            a._close(d)
        });
        return b
    },
    _createBoxOn: function(c, f) {
        var m = this;
        if (!c) {
            return null
        }
        var e = _d.createElement("div");
        c.appendChild(e);
        e.id = "lightbox";
        e.style.display = "none";
        e.style.position = "absolute";
        e.style.zIndex = "60";
        var d = _d.createElement("img");
        e.appendChild(d);
        d.id = "lightboxImage";
        d.width = 200;
        d.height = 200;
        m._set_cursor(d);
        Spica.E.register(d, "mouseover", function() {
            m._actionEnabled = true;
            m._show_action()
        });
        Spica.E.register(d, "mouseout", function() {
            m._actionEnabled = false;
            m._hide_action()
        });
        Spica.E.register(d, "click", function(o) {
            m._close(o)
        });
        var a = new Image;
        a.onload = function() {
            var o = _d.createElement("img");
            e.appendChild(o);
            o.id = "loadingImage";
            o.src = a.src;
            o.style.position = "absolute";
            o.style.zIndex = "70";
            m._set_cursor(o);
            Spica.E.register(o, "click", function(p) {
                m._close(p)
            });
            a.onload = function() {}
        }
        ;
        if (f.loadingimg != "") {
            a.src = f.loadingimg
        }
        if (f.previmg) {
            var g = _d.createElement("img");
            e.appendChild(g);
            g.id = "prevLink";
            g.style.display = "none";
            g.style.position = "absolute";
            g.style.left = "9px";
            g.style.zIndex = "70";
            g.src = f.previmg;
            m._prev = g;
            Spica.E.register(g, "mouseover", function() {
                m._actionEnabled = true;
                m._show_action()
            });
            Spica.E.register(g, "click", function() {
                m._show_next(-1)
            })
        }
        if (f.nextimg) {
            var j = _d.createElement("img");
            e.appendChild(j);
            j.id = "nextLink";
            j.style.display = "none";
            j.style.position = "absolute";
            j.style.right = "9px";
            j.style.zIndex = "70";
            j.src = f.nextimg;
            m._next = j;
            Spica.E.register(j, "mouseover", function() {
                m._actionEnabled = true;
                m._show_action()
            });
            Spica.E.register(j, "click", function() {
                m._show_next(+1)
            })
        }
        var l = _d.createElement("img");
        e.appendChild(l);
        l.id = "actionImage";
        l.style.display = "none";
        l.style.position = "absolute";
        l.style.top = "15px";
        l.style.left = "15px";
        l.style.zIndex = "70";
        m._set_cursor(l);
        l.src = m._expand;
        Spica.E.register(l, "mouseover", function() {
            m._actionEnabled = true;
            m._show_action()
        });
        Spica.E.register(l, "click", function() {
            m._zoom()
        });
        if (f.closeimg) {
            var b = _d.createElement("img");
            e.appendChild(b);
            b.id = "closeButton";
            b.style.display = "inline";
            b.style.position = "absolute";
            b.style.right = "9px";
            b.style.top = "10px";
            b.style.zIndex = "80";
            b.src = f.closeimg;
            m._set_cursor(b);
            Spica.E.register(b, "click", function(o) {
                m._close(o)
            })
        }
        var k = _d.createElement("span");
        e.appendChild(k);
        k.id = "lightboxCaption";
        k.style.display = "none";
        k.style.position = "absolute";
        k.style.zIndex = "80";
        if (!f.effectpos) {
            f.effectpos = {
                x: 0,
                y: 0
            }
        } else {
            if (f.effectpos.x == "") {
                f.effectpos.x = 0
            }
            if (f.effectpos.y == "") {
                f.effectpos.y = 0
            }
        }
        var n = new Image;
        n.onload = function() {
            var o = _d.createElement("img");
            e.appendChild(o);
            o.id = "effectImage";
            o.src = n.src;
            if (f.effectclass) {
                o.className = f.effectclass
            }
            o.style.position = "absolute";
            o.style.display = "none";
            o.style.left = [f.effectpos.x, "px"].join("");
            o.style.top = [f.effectpos.y, "px"].join("");
            o.style.zIndex = "90";
            m._set_cursor(o);
            Spica.E.register(o, "click", function() {
                o.style.display = "none"
            })
        }
        ;
        if (f.effectimg != "") {
            n.src = f.effectimg
        }
        if (m._resizable) {
            var h = _d.createElement("div");
            c.appendChild(h);
            h.id = "lightboxOverallView";
            h.style.display = "none";
            h.style.position = "absolute";
            h.style.zIndex = "70";
            m._overall = h;
            var i = _d.createElement("div");
            c.appendChild(i);
            i.id = "lightboxIndicator";
            i.style.display = "none";
            i.style.position = "absolute";
            i.style.zIndex = "80";
            m._indicator = i
        }
        return e
    },
    _set_photo_size: function() {
        var i = this;
        if (i._open == -1) {
            return
        }
        var k = 30;
        var j = _d.getElementById("lightboxCaption");
        if (j) {
            k += j.clientHeight || j.offsetHeight
        }
        var d = {
            w: i._page.win.w - 30,
            h: i._page.win.h - k
        };
        var h = {
            x: 15,
            y: 15
        };
        var e = {
            p: 9,
            n: 9,
            y: 0
        };
        if (!i._expanded) {
            var f = {
                w: i._imgs[i._open].w,
                h: i._imgs[i._open].h
            };
            if (f.w < 0) {
                f.w = i._img.width
            }
            if (f.h < 0) {
                f.h = i._img.height
            }
            var c = 1;
            if ((f.w >= d.w || f.h >= d.h) && f.h && f.w) {
                c = ((d.w / f.w) < (d.h / f.h)) ? d.w / f.w : d.h / f.h
            }
            i._expandable = (c < 1) ? true : false;
            i._anim.w = Math.floor(f.w * c);
            i._anim.h = Math.floor(f.h * c);
            if (i._resizable) {
                i._expandable = true
            }
            if (Spica.B.isWinIE) {
                i._box.style.display = "block"
            }
            i._imgpos.x = i._pos.x + (d.w - i._img.width) / 2;
            i._imgpos.y = i._pos.y + (d.h - i._img.height) / 2;
            e.y = Math.floor(i._img.height / 2) - 10;
            i._show_overall(false);
            var b = _d.getElementById("loadingImage");
            if (b) {
                b.style.left = [(i._img.width - 30) / 2, "px"].join("");
                b.style.top = [(i._img.height - 30) / 2, "px"].join("")
            }
            if (j) {
                j.style.top = [i._img.height + 10, "px"].join("");
                j.style.width = [i._img.width + 20, "px"].join("")
            }
        } else {
            var a = parseInt(i._imgs[i._open].w * i._level);
            var g = parseInt(i._imgs[i._open].h * i._level);
            i._minpos.x = i._pos.x + d.w - i._img.width;
            i._minpos.y = i._pos.y + d.h - i._img.height;
            if (i._img.width <= d.w) {
                i._imgpos.x = i._pos.x + (d.w - i._img.width) / 2
            } else {
                if (i._imgpos.x > i._pos.x) {
                    i._imgpos.x = i._pos.x
                } else {
                    if (i._imgpos.x < i._minpos.x) {
                        i._imgpos.x = i._minpos.x
                    }
                }
                h.x = 15 + i._pos.x - i._imgpos.x;
                e.p = i._pos.x - i._imgpos.x - 5;
                e.n = i._img.width - i._page.win.w + i._imgpos.x + 25;
                if (Spica.B.isWinIE) {
                    e.n -= 10
                }
            }
            if (i._img.height <= d.h) {
                i._imgpos.y = i._pos.y + (d.h - i._img.height) / 2;
                e.y = Math.floor(i._img.height / 2) - 10
            } else {
                if (i._imgpos.y > i._pos.y) {
                    i._imgpos.y = i._pos.y
                } else {
                    if (i._imgpos.y < i._minpos.y) {
                        i._imgpos.y = i._minpos.y
                    }
                }
                h.y = 15 + i._pos.y - i._imgpos.y;
                e.y = Math.floor(d.h / 2) - 10 + i._pos.y - i._imgpos.y
            }
            i._anim.w = a;
            i._anim.h = g;
            i._show_overall(true)
        }
        i._box.style.left = [i._imgpos.x, "px"].join("");
        i._box.style.top = [i._imgpos.y, "px"].join("");
        i._zoomimg.style.left = [h.x, "px"].join("");
        i._zoomimg.style.top = [h.y, "px"].join("");
        i._wrap.style.left = i._pos.x;
        if (i._prev && i._next) {
            i._prev.style.left = [e.p, "px"].join("");
            i._next.style.right = [e.n, "px"].join("");
            i._prev.style.top = i._next.style.top = [e.y, "px"].join("")
        }
        i._changed = true
    },
    _show_overall: function(g) {
        var c = this;
        if (c._overall == null) {
            return
        }
        if (g) {
            if (c._open == -1) {
                return
            }
            var f = 100;
            var e = {
                w: 0,
                h: 0,
                x: 0,
                y: 0
            };
            var b = {
                w: 0,
                h: 0,
                x: 0,
                y: 0
            };
            var h = {
                w: c._img.width,
                h: c._img.height
            };
            var d = {
                w: c._page.win.w - 30,
                h: c._page.win.h - 30
            };
            var a = h.w;
            if (a < h.h) {
                a = h.h
            }
            if (a < d.w) {
                a = d.w
            }
            if (a < d.h) {
                a = d.h
            }
            if (a < 1) {
                return
            }
            e.w = parseInt(h.w / a * f);
            e.h = parseInt(h.h / a * f);
            b.w = parseInt(d.w / a * f);
            b.h = parseInt(d.h / a * f);
            e.x = c._pos.x + d.w - f - 20;
            e.y = c._pos.y + d.h - f - 20;
            b.x = e.x - parseInt((c._imgpos.x - c._pos.x) / a * f);
            b.y = e.y - parseInt((c._imgpos.y - c._pos.y) / a * f);
            c._overall.style.left = [e.x, "px"].join("");
            c._overall.style.top = [e.y, "px"].join("");
            c._overall.style.width = [e.w, "px"].join("");
            c._overall.style.height = [e.h, "px"].join("");
            c._indicator.style.left = [b.x, "px"].join("");
            c._indicator.style.top = [b.y, "px"].join("");
            c._indicator.style.width = [b.w, "px"].join("");
            c._indicator.style.height = [b.h, "px"].join("");
            c._overall.style.display = "block";
            c._indicator.style.display = "block"
        } else {
            c._overall.style.display = "none";
            c._indicator.style.display = "none"
        }
    },
    _set_size: function(b) {
        var a = this;
        if (a._open == -1) {
            return
        }
        if (!a._page.update() && !a._pos.update() && !a._changed) {
            return
        }
        if (Spica.B.isWinIE) {
            a._wrap.style.width = [a._page.win.w, "px"].join("");
            a._wrap.style.height = [a._page.win.h, "px"].join("");
            a._wrap.style.top = [a._pos.y, "px"].join("")
        }
        if (b) {
            a._set_photo_size()
        }
    },
    _set_cursor: function(b) {
        var a = this;
        if (Spica.B.isWinIE && !Spica.B.isNewIE) {
            return
        }
        b.style.cursor = "pointer"
    },
    _current_setindex: function() {
        var a = this;
        if (!a._openedset) {
            return -1
        }
        var c = a._sets[a._openedset];
        for (var b = 0, d = c.length; b < d; b++) {
            if (c[b] == a._open) {
                return b
            }
        }
        return -1
    },
    _get_setlength: function() {
        var a = this;
        if (!a._openedset) {
            return -1
        }
        return a._sets[a._openedset].length
    },
    _show_action: function() {
        var b = this;
        if (b._open == -1) {
            return
        }
        var a = b._current_setindex();
        if (a > -1) {
            if (a > 0) {
                b._prev.style.display = "inline"
            }
            if (a < b._get_setlength() - 1) {
                b._next.style.display = "inline"
            }
        }
        if (!b._expandable || !b._zoomimg) {
            return
        }
        b._zoomimg.src = (b._expanded) ? b._shrink : b._expand;
        b._zoomimg.style.display = "inline"
    },
    _hide_action: function() {
        var a = this;
        if (a._zoomimg) {
            a._zoomimg.style.display = "none"
        }
        if (a._open > -1 && a._expanded) {
            a._dragstop(null)
        }
        if (a._prev) {
            a._prev.style.display = "none"
        }
        if (a._next) {
            a._next.style.display = "none"
        }
    },
    _zoom: function() {
        var a = this;
        var b = _d.getElementById("closeButton");
        if (a._expanded) {
            a._reset_func();
            a._expanded = false;
            if (b) {
                b.style.display = "inline"
            }
        } else {
            if (a._open > -1) {
                a._level = 1;
                a._imgpos.x = a._pos.x;
                a._imgpos.y = a._pos.y;
                a._expanded = true;
                a._funcs.drag = function(c) {
                    a._dragstart(c)
                }
                ;
                a._funcs.dbl = function(c) {
                    a._close(null)
                }
                ;
                if (a._resizable) {
                    a._funcs.wheel = function(c) {
                        a._onwheel(c)
                    }
                    ;
                    Spica.E.register(a._box, "mousewheel", a._funcs.wheel)
                }
                Spica.E.register(a._img, "mousedown", a._funcs.drag);
                Spica.E.register(a._img, "dblclick", a._funcs.dbl);
                a._show_caption(false);
                if (b) {
                    b.style.display = "none"
                }
            }
        }
        a._set_photo_size();
        a._show_action()
    },
    _reset_func: function() {
        var a = this;
        if (a._funcs.wheel != null) {
            Spica.E.deregister(a._box, "mousewheel", a._funcs.wheel)
        }
        if (a._funcs.move != null) {
            Spica.E.deregister(a._img, "mousemove", a._funcs.move)
        }
        if (a._funcs.up != null) {
            Spica.E.deregister(a._img, "mouseup", a._funcs.up)
        }
        if (a._funcs.drag != null) {
            Spica.E.deregister(a._img, "mousedown", a._funcs.drag)
        }
        if (a._funcs.dbl != null) {
            Spica.E.deregister(a._img, "dblclick", a._funcs.dbl)
        }
        a._funcs = {
            move: null,
            up: null,
            drag: null,
            wheel: null,
            dbl: null
        }
    },
    _onwheel: function(a) {
        var b = this;
        var d = 0;
        a = Spica.E.getEvent(a);
        if (a.wheelDelta) {
            d = event.wheelDelta / -120
        } else {
            if (a.detail) {
                d = a.detail / 3
            }
        }
        if (Spica.B.isOpera) {
            d = -d
        }
        var c = (b._level < 1) ? 0.1 : (b._level < 2) ? 0.25 : (b._level < 4) ? 0.5 : 1;
        b._level = (d > 0) ? b._level + c : b._level - c;
        if (b._level > 8) {
            b._level = 8
        } else {
            if (b._level < 0.5) {
                b._level = 0.5
            }
        }
        b._set_photo_size();
        return Spica.E.stop(a)
    },
    _dragstart: function(a) {
        var b = this;
        a = Spica.E.getEvent(a);
        b._curpos.x = a.screenX;
        b._curpos.y = a.screenY;
        b._funcs.move = function(c) {
            b._dragging(c)
        }
        ;
        b._funcs.up = function(c) {
            b._dragstop(c)
        }
        ;
        Spica.E.register(b._img, "mousemove", b._funcs.move);
        Spica.E.register(b._img, "mouseup", b._funcs.up);
        return Spica.E.stop(a)
    },
    _dragging: function(a) {
        var b = this;
        a = Spica.E.getEvent(a);
        b._imgpos.x += a.screenX - b._curpos.x;
        b._imgpos.y += a.screenY - b._curpos.y;
        b._curpos.x = a.screenX;
        b._curpos.y = a.screenY;
        b._set_photo_size();
        return Spica.E.stop(a)
    },
    _dragstop: function(a) {
        var b = this;
        a = Spica.E.getEvent(a);
        if (b._funcs.move != null) {
            Spica.E.deregister(b._img, "mousemove", b._funcs.move)
        }
        if (b._funcs.up != null) {
            Spica.E.deregister(b._img, "mouseup", b._funcs.up)
        }
        b._funcs.move = null;
        b._funcs.up = null;
        b._set_photo_size();
        return (a) ? Spica.E.stop(a) : false
    },
    _show_caption: function(d, c) {
        var b = this;
        var a = _d.getElementById("lightboxCaption");
        if (!a) {
            return
        }
        if (a.innerHTML.length == 0 || !d) {
            a.style.display = "none"
        } else {
            a.style.top = [b._img.height + 10, "px"].join("");
            a.style.left = "0px";
            a.style.width = [b._img.width + 20, "px"].join("");
            a.style.display = "block";
            b._setOpacity(a, c ? 0 : 9.9)
        }
    },
    _toggle_wrap: function(g) {
        var h = this;
        h._wrap.style.display = g ? "block" : "none";
        if (h._hiding.length == 0 && !h._first) {
            var k = ["select", "embed", "object"];
            for (var f = 0, b = k.length; f < b; f++) {
                var c = _d.getElementsByTagName(k[f]);
                for (var e = 0, d = c.length; e < d; e++) {
                    var a = c[e].style.visibility;
                    if (!a) {
                        if (c[e].currentStyle) {
                            a = c[e].currentStyle.visibility
                        } else {
                            if (_d.defaultView) {
                                a = _d.defaultView.getComputedStyle(c[e], "").getPropertyValue("visibility")
                            }
                        }
                    }
                    if (a == "hidden") {
                        continue
                    }
                    h._hiding.push(c[e])
                }
            }
            h._first = true
        }
        for (var f = 0, b = h._hiding.length; f < b; f++) {
            h._hiding[f].style.visibility = g ? "hidden" : "visible"
        }
        if (g) {
            h._setOpacity(h._wrap, 5)
        }
    },
    _prepare: function(b) {
        var a = this;
        if (a._open == -1) {
            return
        }
        a._set_size(false);
        a._toggle_wrap(true);
        a._box.style.display = "block";
        a._hide_action();
        a._img.src = a._blank;
        var f = _d.getElementById("loadingImage");
        if (f) {
            f.style.display = "inline"
        }
        var e = ["effectImage", "closeButton", "lightboxCaption"];
        for (var c in e) {
            var d = _d.getElementById(e[c]);
            if (d) {
                d.style.display = "none"
            }
        }
    },
    _show: function(b) {
        var a = this;
        var c = new Image;
        if (b < 0 || b >= a._imgs.length) {
            return
        }
        a._open = b;
        a._prepare();
        a._set_photo_size();
        c.onload = function() {
            a._expanded = false;
            if (a._imgs[a._open].w == -1) {
                a._imgs[a._open].w = c.width;
                a._imgs[a._open].h = c.height
            }
            var d = _d.getElementById("lightboxCaption");
            if (d) {
                try {
                    d.innerHTML = a._imgs[a._open].title
                } catch (f) {}
                a._show_caption(true, true)
            }
            a._anim.t = (new Date()).getTime();
            a._timer = window.setInterval(function() {
                a._run()
            }, 20);
            a._img.setAttribute("title", a._imgs[a._open].title);
            a._anim.step = (a._anim.f) ? 0 : 2;
            a._set_photo_size();
            if (!a._anim.f) {
                a._show_image()
            }
            if (a._imgs[a._open].set != "lightbox") {
                var g = a._imgs[a._open].set;
                if (a._sets[g].length > 1) {
                    a._openedset = g
                }
                if (!a._prev || !a._next) {
                    a._openedset = null
                }
            }
        }
        ;
        a._expandable = false;
        a._expanded = false;
        a._anim.step = -1;
        c.src = a._imgs[a._open].src
    },
    _run: function() {
        var a = this;
        var b = (new Date()).getTime();
        if (b - a._anim.t < 50) {
            return
        }
        a._anim.t = b;
        a._set_size(true);
        if (a._anim.step == 0 || a._anim.w != a._img.width || a._anim.h != a._img.height) {
            a._doResizing()
        } else {
            if (a._anim.step == 1) {
                a._doFadeIn()
            } else {
                if (a._anim.step == 3) {
                    a._doFadeOut()
                }
            }
        }
    },
    _show_image: function() {
        var a = this;
        if (a._open == -1) {
            return
        }
        a._img.src = a._imgs[a._open].src;
        var d = _d.getElementById("loadingImage");
        if (d) {
            d.style.display = "none"
        }
        var b = _d.getElementById("effectImage");
        if (b && (!b.className || a._imgs[a._open].cls == b.className)) {
            b.style.display = "block"
        }
        var c = _d.getElementById("closeButton");
        if (c) {
            c.style.display = "inline"
        }
        a._show_caption(true);
        if (a._actionEnabled) {
            a._show_action()
        }
    },
    _doResizing: function() {
        var a = this;
        var b = {
            x: (a._anim.f) ? Math.floor((a._anim.w - a._img.width) / 3) : 0,
            y: (a._anim.f) ? Math.floor((a._anim.h - a._img.height) / 3) : 0
        };
        a._img.width += b.x;
        a._img.height += b.y;
        if (Math.abs(b.x) < 1) {
            a._img.width = a._anim.w
        }
        if (Math.abs(b.y) < 1) {
            a._img.height = a._anim.h
        }
        if (a._anim.w == a._img.width && a._anim.h == a._img.height) {
            a._changed = false;
            a._set_photo_size();
            if (a._anim.step == 0) {
                a._anim.step = 1;
                a._anim.a = 0;
                a._show_image();
                a._setOpacity(a._img, a._anim.a)
            }
        } else {
            if (a._anim.step == 2 && !a._expanded) {
                a._show_caption(true)
            }
        }
    },
    _doFadeIn: function() {
        var a = this;
        a._anim.a += 2;
        if (a._anim.a > 10) {
            a._anim.step = 2;
            a._anim.a = 9.9
        }
        a._setOpacity(a._img, a._anim.a)
    },
    _doFadeOut: function() {
        var a = this;
        a._anim.a -= 1;
        if (a._anim.a < 1) {
            a._anim.step = 2;
            a._anim.a = 0;
            if (a._timer != null) {
                window.clearInterval(a._timer);
                a._timer = null
            }
            a._toggle_wrap(false)
        }
        a._setOpacity(a._wrap, a._anim.a)
    },
    _setOpacity: function(a, b) {
        if (Spica.B.isWinIE) {
            a.style.filter = "alpha(opacity=" + (b * 10) + ")"
        } else {
            a.style.opacity = b / 10
        }
    },
    _close_box: function() {
        var a = this;
        a._open = -1;
        a._openedset = null;
        a._hide_action();
        a._reset_func();
        a._show_overall(false);
        a._box.style.display = "none";
        if (!a._anim.f && a._timer != null) {
            window.clearInterval(a._timer);
            a._timer = null
        }
    },
    _show_next: function(d) {
        var a = this;
        if (!a._openedset) {
            return a._close(null)
        }
        var b = a._current_setindex() + d;
        var c = a._sets[a._openedset][b];
        a._close_box();
        a._show(c)
    },
    _close: function(a) {
        var b = this;
        if (a != null) {
            a = Spica.E.getEvent(a);
            var c = a.target || a.srcElement;
            if (c && c.getAttribute("id") == "lightboxImage" && b._expanded) {
                return
            }
        }
        b._close_box();
        if (b._anim.f && b._anim.step == 2) {
            b._anim.step = 3;
            b._anim.a = 5
        } else {
            b._toggle_wrap(false)
        }
    }
};
Spica.E.run(function() {
    var a = new Lightbox({
        loadingimg: "/LightBox/resource/loading.gif",
        expandimg: "/LightBox/resource/expand.gif",
        shrinkimg: "/LightBox/resource/shrink.gif",
        blankimg: "/LightBox/resource/blank.gif",
        closeimg: "/LightBox/resource/close.gif",
        effectimg: "/LightBox/resource/zzoop1.gif",
        effectpos: {
            x: -40,
            y: -20
        },
        effectclass: "effectable",
        resizable: true,
        animation: true
    })
});
