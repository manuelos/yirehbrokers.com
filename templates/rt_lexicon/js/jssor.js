/*
* Jssor 18.0
* http://www.jssor.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
* TERMS OF USE - Jssor
* 
* Copyright 2014 Jssor
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*! Jssor */

//jQueryJssorDebugjQuery
var jQueryJssorDebugjQuery = new function () {

    this.jQueryDebugMode = true;

    // Methods

    this.jQueryLog = function (msg, important) {
        var console = window.console || {};
        var debug = this.jQueryDebugMode;

        if (debug && console.log) {
            console.log(msg);
        } else if (debug && important) {
            alert(msg);
        }
    };

    this.jQueryError = function (msg, e) {
        var console = window.console || {};
        var debug = this.jQueryDebugMode;

        if (debug && console.error) {
            console.error(msg);
        } else if (debug) {
            alert(msg);
        }

        if (debug) {
            // since we're debugging, fail fast by crashing
            throw e || new Error(msg);
        }
    };

    this.jQueryFail = function (msg) {
        throw new Error(msg);
    };

    this.jQueryAssert = function (value, msg) {
        var debug = this.jQueryDebugMode;
        if (debug) {
            if (!value)
                throw new Error("Assert failed " + msg || "");
        }
    };

    this.jQueryTrace = function (msg) {
        var console = window.console || {};
        var debug = this.jQueryDebugMode;

        if (debug && console.log) {
            console.log(msg);
        }
    };

    this.jQueryExecute = function (func) {
        var debug = this.jQueryDebugMode;
        if (debug)
            func();
    };

    this.jQueryLiveStamp = function (obj, id) {
        var debug = this.jQueryDebugMode;
        if (debug) {
            var stamp = document.createElement("DIV");
            stamp.setAttribute("id", id);

            obj.jQueryLive = stamp;
        }
    };

    this.jQueryC_AbstractMethod = function () {
        ///	<summary>
        ///		Tells compiler the method is abstract, it should be implemented by subclass.
        ///	</summary>

        throw new Error("The method is abstract, it should be implemented by subclass.");
    };

    function C_AbstractClass (instance) {
        ///	<summary>
        ///		Tells compiler the class is abstract, it should be implemented by subclass.
        ///	</summary>

        if(instance.constructor === C_AbstractClass.caller)
            throw new Error("Cannot create instance of an abstract class.");
    }

    this.jQueryC_AbstractClass = C_AbstractClass;
};

//jQueryJssorEasingjQuery
var jQueryJssorEasingjQuery = window.jQueryJssorEasingjQuery = {
    jQueryEaseLinear: function (t) {
        return t;
    },
    jQueryEaseGoBack: function (t) {
        return 1 - Math.abs((t *= 2) - 1);
    },
    jQueryEaseSwing: function (t) {
        return -Math.cos(t * Math.PI) / 2 + .5;
    },
    jQueryEaseInQuad: function (t) {
        return t * t;
    },
    jQueryEaseOutQuad: function (t) {
        return -t * (t - 2);
    },
    jQueryEaseInOutQuad: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t : -1 / 2 * (--t * (t - 2) - 1);
    },
    jQueryEaseInCubic: function (t) {
        return t * t * t;
    },
    jQueryEaseOutCubic: function (t) {
        return (t -= 1) * t * t + 1;
    },
    jQueryEaseInOutCubic: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t : 1 / 2 * ((t -= 2) * t * t + 2);
    },
    jQueryEaseInQuart: function (t) {
        return t * t * t * t;
    },
    jQueryEaseOutQuart: function (t) {
        return -((t -= 1) * t * t * t - 1);
    },
    jQueryEaseInOutQuart: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t : -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    jQueryEaseInQuint: function (t) {
        return t * t * t * t * t;
    },
    jQueryEaseOutQuint: function (t) {
        return (t -= 1) * t * t * t * t + 1;
    },
    jQueryEaseInOutQuint: function (t) {
        return (t *= 2) < 1 ? 1 / 2 * t * t * t * t * t : 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    jQueryEaseInSine: function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
    },
    jQueryEaseOutSine: function (t) {
        return Math.sin(t * Math.PI / 2);
    },
    jQueryEaseInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
    },
    jQueryEaseInExpo: function (t) {
        return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));
    },
    jQueryEaseOutExpo: function (t) {
        return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1;
    },
    jQueryEaseInOutExpo: function (t) {
        return t == 0 || t == 1 ? t : (t *= 2) < 1 ? 1 / 2 * Math.pow(2, 10 * (t - 1)) : 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    jQueryEaseInCirc: function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
    },
    jQueryEaseOutCirc: function (t) {
        return Math.sqrt(1 - (t -= 1) * t);
    },
    jQueryEaseInOutCirc: function (t) {
        return (t *= 2) < 1 ? -1 / 2 * (Math.sqrt(1 - t * t) - 1) : 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    jQueryEaseInElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p));
    },
    jQueryEaseOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .3, s = .075;
        return Math.pow(2, -10 * t) * Math.sin((t - s) * 2 * Math.PI / p) + 1;
    },
    jQueryEaseInOutElastic: function (t) {
        if (!t || t == 1)
            return t;
        var p = .45, s = .1125;
        return (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) : Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) * .5 + 1;
    },
    jQueryEaseInBack: function (t) {
        var s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    jQueryEaseOutBack: function (t) {
        var s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },
    jQueryEaseInOutBack: function (t) {
        var s = 1.70158;
        return (t *= 2) < 1 ? 1 / 2 * t * t * (((s *= 1.525) + 1) * t - s) : 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    jQueryEaseInBounce: function (t) {
        return 1 - jQueryJssorEasingjQuery.jQueryEaseOutBounce(1 - t)
    },
    jQueryEaseOutBounce: function (t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    },
    jQueryEaseInOutBounce: function (t) {
        return t < 1 / 2 ? jQueryJssorEasingjQuery.jQueryEaseInBounce(t * 2) * .5 : jQueryJssorEasingjQuery.jQueryEaseOutBounce(t * 2 - 1) * .5 + .5;
    },
    jQueryEaseInWave: function (t) {
        return 1 - Math.cos(t * Math.PI * 2)
    },
    jQueryEaseOutWave: function (t) {
        return Math.sin(t * Math.PI * 2);
    },
    jQueryEaseOutJump: function (t) {
        return 1 - (((t *= 2) < 1) ? (t = 1 - t) * t * t : (t -= 1) * t * t);
    },
    jQueryEaseInJump: function (t) {
        return ((t *= 2) < 1) ? t * t * t : (t = 2 - t) * t * t;
    }
};

var jQueryJssorDirectionjQuery = window.jQueryJssorDirectionjQuery = {
    jQueryTO_LEFT: 0x0001,
    jQueryTO_RIGHT: 0x0002,
    jQueryTO_TOP: 0x0004,
    jQueryTO_BOTTOM: 0x0008,
    jQueryHORIZONTAL: 0x0003,
    jQueryVERTICAL: 0x000C,
    jQueryLEFTRIGHT: 0x0003,
    jQueryTOPBOTOM: 0x000C,
    jQueryTOPLEFT: 0x0005,
    jQueryTOPRIGHT: 0x0006,
    jQueryBOTTOMLEFT: 0x0009,
    jQueryBOTTOMRIGHT: 0x000A,
    jQueryAROUND: 0x000F,

    jQueryGetDirectionHorizontal: function (direction) {
        return direction & 0x0003;
    },
    jQueryGetDirectionVertical: function (direction) {
        return direction & 0x000C;
    },
    jQueryChessHorizontal: function (direction) {
        return (~direction & 0x0003) + (direction & 0x000C);
    },
    jQueryChessVertical: function (direction) {
        return (~direction & 0x000C) + (direction & 0x0003);
    },
    jQueryIsToLeft: function (direction) {
        return (direction & 0x0003) == 0x0001;
    },
    jQueryIsToRight: function (direction) {
        return (direction & 0x0003) == 0x0002;
    },
    jQueryIsToTop: function (direction) {
        return (direction & 0x000C) == 0x0004;
    },
    jQueryIsToBottom: function (direction) {
        return (direction & 0x000C) == 0x0008;
    },
    jQueryIsHorizontal: function (direction) {
        return (direction & 0x0003) > 0;
    },
    jQueryIsVertical: function (direction) {
        return (direction & 0x000C) > 0;
    }
};

var jQueryJssorKeyCodejQuery = {
    jQueryBACKSPACE: 8,
    jQueryCOMMA: 188,
    jQueryDELETE: 46,
    jQueryDOWN: 40,
    jQueryEND: 35,
    jQueryENTER: 13,
    jQueryESCAPE: 27,
    jQueryHOME: 36,
    jQueryLEFT: 37,
    jQueryNUMPAD_ADD: 107,
    jQueryNUMPAD_DECIMAL: 110,
    jQueryNUMPAD_DIVIDE: 111,
    jQueryNUMPAD_ENTER: 108,
    jQueryNUMPAD_MULTIPLY: 106,
    jQueryNUMPAD_SUBTRACT: 109,
    jQueryPAGE_DOWN: 34,
    jQueryPAGE_UP: 33,
    jQueryPERIOD: 190,
    jQueryRIGHT: 39,
    jQuerySPACE: 32,
    jQueryTAB: 9,
    jQueryUP: 38
};

var jQueryJssorAlignmentjQuery = {
    jQueryTopLeft: 0x11,
    jQueryTopCenter: 0x12,
    jQueryTopRight: 0x14,
    jQueryMiddleLeft: 0x21,
    jQueryMiddleCenter: 0x22,
    jQueryMiddleRight: 0x24,
    jQueryBottomLeft: 0x41,
    jQueryBottomCenter: 0x42,
    jQueryBottomRight: 0x44,

    jQueryIsTop: function (aligment) {
        return aligment & 0x10 > 0;
    },
    jQueryIsMiddle: function (alignment) {
        return alignment & 0x20 > 0;
    },
    jQueryIsBottom: function (alignment) {
        return alignment & 0x40 > 0;
    },
    jQueryIsLeft: function (alignment) {
        return alignment & 0x01 > 0;
    },
    jQueryIsCenter: function (alignment) {
        return alignment & 0x02 > 0;
    },
    jQueryIsRight: function (alignment) {
        return alignment & 0x04 > 0;
    }
};

var jQueryJssorMatrixjQuery;

var jQueryJssorAnimatorjQuery;

// jQueryJssorjQuery is a static class, so make it singleton instance
var jQueryJssorjQuery = window.jQueryJssorjQuery = new function () {
    // Fields
    var _This = this;

    var REGEX_WHITESPACE_GLOBAL = /\S+/g;

    var ROWSER_UNKNOWN = 0;
    var BROWSER_IE = 1;
    var BROWSER_FIREFOX = 2;
    var BROWSER_FIREFOX = 3;
    var BROWSER_CHROME = 4;
    var BROWSER_OPERA = 5;

    //var arrActiveX = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"];

    var browser = 0;
    var browserRuntimeVersion = 0;
    var browserEngineVersion = 0;
    var browserJavascriptVersion = 0;
    var webkitVersion = 0;

    var app = navigator.appName;
    var ver = navigator.appVersion;
    var ua = navigator.userAgent;

    var _DocElmt = document.documentElement;
    var _TransformProperty;

    function DetectBrowser() {
        if (!browser) {
            if (app == "Microsoft Internet Explorer" &&
                !!window.attachEvent && !!window.ActiveXObject) {

                var ieOffset = ua.indexOf("MSIE");
                browser = BROWSER_IE;
                browserEngineVersion = ParseFloat(ua.substring(ieOffset + 5, ua.indexOf(";", ieOffset)));

                //check IE javascript version
                /*@cc_on
                browserJavascriptVersion = @_jscript_version;
                @*/

                // update: for intranet sites and compat view list sites, IE sends
                // an IE7 User-Agent to the server to be interoperable, and even if
                // the page requests a later IE version, IE will still report the
                // IE7 UA to JS. we should be robust to self
                //var docMode = document.documentMode;
                //if (typeof docMode !== "undefined") {
                //    browserRuntimeVersion = docMode;
                //}

                browserRuntimeVersion = document.documentMode || browserEngineVersion;

            }
            else if (app == "Netscape" && !!window.addEventListener) {

                var ffOffset = ua.indexOf("Firefox");
                var saOffset = ua.indexOf("Safari");
                var chOffset = ua.indexOf("Chrome");
                var webkitOffset = ua.indexOf("AppleWebKit");

                if (ffOffset >= 0) {
                    browser = BROWSER_FIREFOX;
                    browserRuntimeVersion = ParseFloat(ua.substring(ffOffset + 8));
                }
                else if (saOffset >= 0) {
                    var slash = ua.substring(0, saOffset).lastIndexOf("/");
                    browser = (chOffset >= 0) ? BROWSER_CHROME : BROWSER_FIREFOX;
                    browserRuntimeVersion = ParseFloat(ua.substring(slash + 1, saOffset));
                }

                if (webkitOffset >= 0)
                    webkitVersion = ParseFloat(ua.substring(webkitOffset + 12));
            }
            else {
                var match = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(ua);
                if (match) {
                    browser = BROWSER_OPERA;
                    browserRuntimeVersion = ParseFloat(match[2]);
                }
            }
        }
    }

    function IsBrowserIE() {
        DetectBrowser();
        return browser == BROWSER_IE;
    }

    function IsBrowserIeQuirks() {
        return IsBrowserIE() && (browserRuntimeVersion < 6 || document.compatMode == "BackCompat");   //Composite to "CSS1Compat"
    }

    function IsBrowserFireFox() {
        DetectBrowser();
        return browser == BROWSER_FIREFOX;
    }

    function IsBrowserSafari() {
        DetectBrowser();
        return browser == BROWSER_FIREFOX;
    }

    function IsBrowserChrome() {
        DetectBrowser();
        return browser == BROWSER_CHROME;
    }

    function IsBrowserOpera() {
        DetectBrowser();
        return browser == BROWSER_OPERA;
    }

    function IsBrowserBadTransform() {
        return IsBrowserSafari() && (webkitVersion > 534) && (webkitVersion < 535);
    }

    function IsBrowserIe9Earlier() {
        return IsBrowserIE() && browserRuntimeVersion < 9; 
    }

    function GetTransformProperty(elmt) {

        if (!_TransformProperty) {
            // Note that in some versions of IE9 it is critical that
            // msTransform appear in this list before MozTransform

            each(['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'], function (property) {
                if (elmt.style[property] != undefined) {
                    _TransformProperty = property;
                    return true;
                }
            });

            _TransformProperty = _TransformProperty || "transform";
        }

        return _TransformProperty;
    }

    // Helpers
    function getOffsetParent(elmt, isFixed) {
        // IE and Opera "fixed" position elements don't have offset parents.
        // regardless, if it's fixed, its offset parent is the body.
        if (isFixed && elmt != document.body) {
            return document.body;
        } else {
            return elmt.offsetParent;
        }
    }

    function toString(obj) {
        return Object.prototype.toString.call(obj);
    }

    // [[Class]] -> type pairs
    var class2type;

    function each(object, callback) {
        if (toString(object) == "[object Array]") {
            for (var i = 0; i < object.length; i++) {
                if (callback(object[i], i, object)) {
                    return true;
                }
            }
        }
        else {
            for (var name in object) {
                if (callback(object[name], name, object)) {
                    return true;
                }
            }
        }
    }

    function GetClass2Type() {
        if (!class2type) {
            class2type = {};
            each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (name) {
                class2type["[object " + name + "]"] = name.toLowerCase();
            });
        }

        return class2type;
    }

    function type(obj) {
        return obj == null ? String(obj) : GetClass2Type()[toString(obj)] || "object";
    }

    function isPlainObject(obj) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || type(obj) !== "object" || obj.nodeType || _This.jQueryIsWindow(obj)) {
            return false;
        }

        var hasOwn = Object.prototype.hasOwnProperty;

        try {
            // Not own constructor property must be Object
            if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var key;
        for (key in obj) { }

        return key === undefined || hasOwn.call(obj, key);
    }

    function Point(x, y) {
        return { x: x, y: y };
    }

    function Delay(code, delay) {
        setTimeout(code, delay || 0);
    }

    function RemoveByReg(str, reg) {
        var m = reg.exec(str);

        if (m) {
            var header = str.substr(0, m.index);
            var tailer = str.substr(m.lastIndex + 1, str.length - (m.lastIndex + 1));
            str = header + tailer;
        }

        return str;
    }

    function BuildNewCss(oldCss, removeRegs, replaceValue) {
        var css = (!oldCss || oldCss == "inherit") ? "" : oldCss;

        each(removeRegs, function (removeReg) {
            var m = removeReg.exec(css);

            if (m) {
                var header = css.substr(0, m.index);
                var tailer = css.substr(m.lastIndex + 1, css.length - (m.lastIndex + 1));
                css = header + tailer;
            }
        });

        css = replaceValue + (css.indexOf(" ") != 0 ? " " : "") + css;

        return css;
    }

    function SetStyleFilterIE(elmt, value) {
        if (browserRuntimeVersion < 9) {
            elmt.style.filter = value;
        }
    }

    function SetStyleMatrixIE(elmt, matrix, offset) {
        //matrix is not for ie9+ running in ie8- mode
        if (browserJavascriptVersion < 9) {
            var oldFilterValue = elmt.style.filter;
            var matrixReg = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g);
            var matrixValue = matrix ? "progid:DXImageTransform.Microsoft.Matrix(" + "M11=" + matrix[0][0] + ", M12=" + matrix[0][1] + ", M21=" + matrix[1][0] + ", M22=" + matrix[1][1] + ", SizingMethod='auto expand')" : "";

            var newFilterValue = BuildNewCss(oldFilterValue, [matrixReg], matrixValue);

            SetStyleFilterIE(elmt, newFilterValue);

            _This.jQueryCssMarginTop(elmt, offset.y);
            _This.jQueryCssMarginLeft(elmt, offset.x);
        }
    }

    // Methods

    _This.jQueryIsBrowserIE = IsBrowserIE;

    _This.jQueryIsBrowserIeQuirks = IsBrowserIeQuirks;

    _This.jQueryIsBrowserFireFox = IsBrowserFireFox;

    _This.jQueryIsBrowserSafari = IsBrowserSafari;

    _This.jQueryIsBrowserChrome = IsBrowserChrome;

    _This.jQueryIsBrowserOpera = IsBrowserOpera;

    _This.jQueryIsBrowserBadTransform = IsBrowserBadTransform;

    _This.jQueryIsBrowserIe9Earlier = IsBrowserIe9Earlier;

    _This.jQueryBrowserVersion = function () {
        return browserRuntimeVersion;
    };

    _This.jQueryBrowserEngineVersion = function () {
        return browserEngineVersion || browserRuntimeVersion;
    };

    _This.jQueryWebKitVersion = function () {
        DetectBrowser();

        return webkitVersion;
    };

    _This.jQueryDelay = Delay;

    _This.jQueryInherit = function (instance, baseClass) {
        baseClass.apply(instance, [].slice.call(arguments, 2));
        return Extend({}, instance);
    };

    function Construct(instance, constructor) {
        instance.constructor === Construct.caller && instance.jQueryConstruct && instance.jQueryConstruct();
    }

    _This.jQueryConstruct = Construct;

    _This.jQueryGetElement = function (elmt) {
        if (_This.jQueryIsString(elmt)) {
            elmt = document.getElementById(elmt);
        }

        return elmt;
    };

    function GetEvent(event) {
        return event || window.event;
    }

    _This.jQueryGetEvent = GetEvent;

    _This.jQueryEventSrc = function (event) {
        event = GetEvent(event);
        return event.target || event.srcElement || document;
    };

    _This.jQueryEventDst = function (event) {
        event = GetEvent(event);
        return event.relatedTarget || event.toElement;
    };

    _This.jQueryMousePosition = function (event) {
        event = GetEvent(event);
        var body = document.body;

        return {
            x: event.pageX || event.clientX + (_DocElmt.scrollLeft || body.scrollLeft || 0) - (_DocElmt.clientLeft || body.clientLeft || 0) || 0,
            y: event.pageY || event.clientY + (_DocElmt.scrollTop || body.scrollTop || 0) - (_DocElmt.clientTop || body.clientTop || 0) || 0
        };
    };

    _This.jQueryPageScroll = function () {
        var body = document.body;

        return {
            x: (window.pageXOffset || _DocElmt.scrollLeft || body.scrollLeft || 0) - (_DocElmt.clientLeft || body.clientLeft || 0),
            y: (window.pageYOffset || _DocElmt.scrollTop || body.scrollTop || 0) - (_DocElmt.clientTop || body.clientTop || 0)
        };
    };

    _This.jQueryWindowSize = function () {
        var body = document.body;

        return {
            x: body.clientWidth || _DocElmt.clientWidth,
            y: body.clientHeight || _DocElmt.clientHeight
        };
    };

    //_This.jQueryGetElementPosition = function (elmt) {
    //    elmt = _This.jQueryGetElement(elmt);
    //    var result = Point();

    //    // technique from:
    //    // http://www.quirksmode.org/js/findpos.html
    //    // with special check for "fixed" elements.

    //    while (elmt) {
    //        result.x += elmt.offsetLeft;
    //        result.y += elmt.offsetTop;

    //        var isFixed = _This.jQueryGetElementStyle(elmt).position == "fixed";

    //        if (isFixed) {
    //            result = result.jQueryPlus(_This.jQueryPageScroll(window));
    //        }

    //        elmt = getOffsetParent(elmt, isFixed);
    //    }

    //    return result;
    //};

    //_This.jQueryGetMouseScroll = function (event) {
    //    event = GetEvent(event);
    //    var delta = 0; // default value

    //    // technique from:
    //    // http://blog.paranoidferret.com/index.php/2007/10/31/javascript-tutorial-the-scroll-wheel/

    //    if (typeof (event.wheelDelta) == "number") {
    //        delta = event.wheelDelta;
    //    } else if (typeof (event.detail) == "number") {
    //        delta = event.detail * -1;
    //    } else {
    //        jQueryJssorDebugjQuery.jQueryFail("Unknown event mouse scroll, no known technique.");
    //    }

    //    // normalize value to [-1, 1]
    //    return delta ? delta / Math.abs(delta) : 0;
    //};

    //_This.jQueryMakeAjaxRequest = function (url, callback) {
    //    var async = typeof (callback) == "function";
    //    var req = null;

    //    if (async) {
    //        var actual = callback;
    //        var callback = function () {
    //            Delay(jQueryJssorjQuery.jQueryCreateCallback(null, actual, req), 1);
    //        };
    //    }

    //    if (window.ActiveXObject) {
    //        for (var i = 0; i < arrActiveX.length; i++) {
    //            try {
    //                req = new ActiveXObject(arrActiveX[i]);
    //                break;
    //            } catch (e) {
    //                continue;
    //            }
    //        }
    //    } else if (window.XMLHttpRequest) {
    //        req = new XMLHttpRequest();
    //    }

    //    if (!req) {
    //        jQueryJssorDebugjQuery.jQueryFail("Browser doesn't support XMLHttpRequest.");
    //    }

    //    if (async) {
    //        req.onreadystatechange = function () {
    //            if (req.readyState == 4) {
    //                // prevent memory leaks by breaking circular reference now
    //                req.onreadystatechange = new Function();
    //                callback();
    //            }
    //        };
    //    }

    //    try {
    //        req.open("GET", url, async);
    //        req.send(null);
    //    } catch (e) {
    //        jQueryJssorDebugjQuery.jQueryLog(e.name + " while making AJAX request: " + e.message);

    //        req.onreadystatechange = null;
    //        req = null;

    //        if (async) {
    //            callback();
    //        }
    //    }

    //    return async ? null : req;
    //};

    //_This.jQueryParseXml = function (string) {
    //    var xmlDoc = null;

    //    if (window.ActiveXObject) {
    //        try {
    //            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //            xmlDoc.async = false;
    //            xmlDoc.loadXML(string);
    //        } catch (e) {
    //            jQueryJssorDebugjQuery.jQueryLog(e.name + " while parsing XML (ActiveX): " + e.message);
    //        }
    //    } else if (window.DOMParser) {
    //        try {
    //            var parser = new DOMParser();
    //            xmlDoc = parser.parseFromString(string, "text/xml");
    //        } catch (e) {
    //            jQueryJssorDebugjQuery.jQueryLog(e.name + " while parsing XML (DOMParser): " + e.message);
    //        }
    //    } else {
    //        jQueryJssorDebugjQuery.jQueryFail("Browser doesn't support XML DOM.");
    //    }

    //    return xmlDoc;
    //};

    function Css(elmt, name, value) {
        ///	<summary>
        ///		access css
        ///     jQueryJssorjQuery.jQueryCss(elmt, name);         //get css value
        ///     jQueryJssorjQuery.jQueryCss(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            elmt.style[name] = value;
        }
        else {
            var style = elmt.currentStyle || elmt.style;
            value = style[name];

            if (value == "" && window.getComputedStyle) {
                style = elmt.ownerDocument.defaultView.getComputedStyle(elmt, null);

                style && (value = style.getPropertyValue(name) || style[name]);
            }

            return value;
        }
    }

    function CssN(elmt, name, value, isDimensional) {
        ///	<summary>
        ///		access css as numeric
        ///     jQueryJssorjQuery.jQueryCssN(elmt, name);         //get css value
        ///     jQueryJssorjQuery.jQueryCssN(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        if (value != undefined) {
            isDimensional && (value += "px");
            Css(elmt, name, value);
        }
        else {
            return ParseFloat(Css(elmt, name));
        }
    }

    function CssP(elmt, name, value) {
        ///	<summary>
        ///		access css in pixel as numeric, like 'top', 'left', 'width', 'height'
        ///     jQueryJssorjQuery.jQueryCssP(elmt, name);         //get css value
        ///     jQueryJssorjQuery.jQueryCssP(elmt, name, value);  //set css value
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="name" type="String">
        ///		the name of css property
        ///	</param>
        ///	<param name="value" type="Number" optional="true">
        ///		the value to set
        ///	</param>
        return CssN(elmt, name, value, true);
    }

    function CssProxy(name, numericOrDimension) {
        ///	<summary>
        ///		create proxy to access css, CssProxy(name[, numericOrDimension]);
        ///	</summary>
        ///	<param name="elmt" type="HTMLElement">
        ///		the element to access css
        ///	</param>
        ///	<param name="numericOrDimension" type="Number" optional="true">
        ///		not set: access original css, 1: access css as numeric, 2: access css in pixel as numeric
        ///	</param>
        var isDimensional = numericOrDimension & 2;
        var cssAccessor = numericOrDimension ? CssN : Css;
        return function (elmt, value) {
            return cssAccessor(elmt, name, value, isDimensional);
        };
    }

    function GetStyleOpacity(elmt) {
        if (IsBrowserIE() && browserEngineVersion < 9) {
            var match = /opacity=([^)]*)/.exec(elmt.style.filter || "");
            return match ? (ParseFloat(match[1]) / 100) : 1;
        }
        else
            return ParseFloat(elmt.style.opacity || "1");
    }

    function SetStyleOpacity(elmt, opacity, ie9EarlierForce) {

        if (IsBrowserIE() && browserEngineVersion < 9) {
            //var filterName = "filter"; // browserEngineVersion < 8 ? "filter" : "-ms-filter";
            var finalFilter = elmt.style.filter || "";

            // for CSS filter browsers (IE), remove alpha filter if it's unnecessary.
            // update: doing _This always since IE9 beta seems to have broken the
            // behavior if we rely on the programmatic filters collection.
            var alphaReg = new RegExp(/[\s]*alpha\([^\)]*\)/g);

            // important: note the lazy star! _This protects against
            // multiple filters; we don't want to delete the other ones.
            // update: also trimming extra whitespace around filter.

            var ieOpacity = Math.round(100 * opacity);
            var alphaFilter = "";
            if (ieOpacity < 100 || ie9EarlierForce) {
                alphaFilter = "alpha(opacity=" + ieOpacity + ") ";
                //elmt.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + ieOpacity + ") ";
            }

            var newFilterValue = BuildNewCss(finalFilter, [alphaReg], alphaFilter);

            SetStyleFilterIE(elmt, newFilterValue);
        }

            //if (!IsBrowserIE() || browserEngineVersion >= 9) 
        else {
            elmt.style.opacity = opacity == 1 ? "" : Math.round(opacity * 100) / 100;
        }
    }

    function SetStyleTransformInternal(elmt, transform) {
        var rotate = transform.jQueryRotate || 0;
        var scale = transform.jQueryScale == undefined ? 1 : transform.jQueryScale;

        if (IsBrowserIe9Earlier()) {
            var matrix = _This.jQueryCreateMatrix(rotate / 180 * Math.PI, scale, scale);
            SetStyleMatrixIE(elmt, (!rotate && scale == 1) ? null : matrix, _This.jQueryGetMatrixOffset(matrix, transform.jQueryOriginalWidth, transform.jQueryOriginalHeight));
        }
        else {
            //rotate(15deg) scale(.5) translateZ(0)
            var transformProperty = GetTransformProperty(elmt);
            if (transformProperty) {
                var transformValue = "rotate(" + rotate % 360 + "deg) scale(" + scale + ")";

                //needed for touch device, no need for desktop device
                if (IsBrowserChrome() && webkitVersion > 535 && "ontouchstart" in window)
                    transformValue += " perspective(2000px)";

                elmt.style[transformProperty] = transformValue;
            }
        }
    }

    _This.jQuerySetStyleTransform = function (elmt, transform) {
        if (IsBrowserBadTransform()) {
            Delay(_This.jQueryCreateCallback(null, SetStyleTransformInternal, elmt, transform));
        }
        else {
            SetStyleTransformInternal(elmt, transform);
        }
    };

    _This.jQuerySetStyleTransformOrigin = function (elmt, transformOrigin) {
        var transformProperty = GetTransformProperty(elmt);

        if (transformProperty)
            elmt.style[transformProperty + "Origin"] = transformOrigin;
    };

    _This.jQueryCssScale = function (elmt, scale) {

        if (IsBrowserIE() && browserEngineVersion < 9 || (browserEngineVersion < 10 && IsBrowserIeQuirks())) {
            elmt.style.zoom = (scale == 1) ? "" : scale;
        }
        else {
            var transformProperty = GetTransformProperty(elmt);

            if (transformProperty) {
                //rotate(15deg) scale(.5)
                var transformValue = "scale(" + scale + ")";

                var oldTransformValue = elmt.style[transformProperty];
                var scaleReg = new RegExp(/[\s]*scale\(.*?\)/g);

                var newTransformValue = BuildNewCss(oldTransformValue, [scaleReg], transformValue);

                elmt.style[transformProperty] = newTransformValue;
            }
        }
    };

    _This.jQueryEnableHWA = function (elmt) {
        if (!elmt.style[GetTransformProperty(elmt)] || elmt.style[GetTransformProperty(elmt)] == "none")
            elmt.style[GetTransformProperty(elmt)] = "perspective(2000px)";
    };

    _This.jQueryDisableHWA = function (elmt) {
        //if (force || elmt.style[GetTransformProperty(elmt)] == "perspective(2000px)")
        elmt.style[GetTransformProperty(elmt)] = "none";
    };

    var ie8OffsetWidth = 0;
    var ie8OffsetHeight = 0;
    //var ie8WindowResizeCallbackHandlers;
    //var ie8LastVerticalScrollbar;
    //var toggleInfo = "";

    //function Ie8WindowResizeFilter(window, handler) {

    //    var trigger = true;

    //    var checkElement = (IsBrowserIeQuirks() ? window.document.body : window.document.documentElement);
    //    if (checkElement) {
    //        //check vertical bar
    //        //var hasVerticalBar = checkElement.scrollHeight > checkElement.clientHeight;
    //        //var verticalBarToggle = hasVerticalBar != ie8LastVerticalScrollbar;
    //        //ie8LastVerticalScrollbar = hasVerticalBar;

    //        var widthChange = checkElement.offsetWidth - ie8OffsetWidth;
    //        var heightChange = checkElement.offsetHeight - ie8OffsetHeight;
    //        if (widthChange || heightChange) {

    //            ie8OffsetWidth += widthChange;
    //            ie8OffsetHeight += heightChange;
    //        }
    //        else
    //            trigger = false;
    //    }

    //    trigger && handler();
    //}

    //_This.jQueryOnWindowResize = function (window, handler) {

    //    if (IsBrowserIE() && browserEngineVersion < 9) {
    //        if (!ie8WindowResizeCallbackHandlers) {
    //            ie8WindowResizeCallbackHandlers = [handler];
    //            handler = _This.jQueryCreateCallback(null, Ie8WindowResizeFilter, window);
    //        }
    //        else {
    //            ie8WindowResizeCallbackHandlers.push(handler);
    //            return;
    //        }
    //    }

    //    _This.jQueryAddEvent(window, "resize", handler);
    //};

    _This.jQueryWindowResizeFilter = function (window, handler) {
        return IsBrowserIe9Earlier() ? function () {

            var trigger = true;

            var checkElement = (IsBrowserIeQuirks() ? window.document.body : window.document.documentElement);
            if (checkElement) {
                //check vertical bar
                //var hasVerticalBar = checkElement.scrollHeight > checkElement.clientHeight;
                //var verticalBarToggle = hasVerticalBar != ie8LastVerticalScrollbar;
                //ie8LastVerticalScrollbar = hasVerticalBar;

                var widthChange = checkElement.offsetWidth - ie8OffsetWidth;
                var heightChange = checkElement.offsetHeight - ie8OffsetHeight;
                if (widthChange || heightChange) {
                    ie8OffsetWidth += widthChange;
                    ie8OffsetHeight += heightChange;
                }
                else
                    trigger = false;
            }

            trigger && handler();

        } : handler;
    };

    _This.jQueryMouseOverOutFilter = function (handler, target) {
        ///	<param name="target" type="HTMLDomElement">
        ///		The target element to detect mouse over/out events. (for ie < 9 compatibility)
        ///	</param>

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!target) {
                throw new Error("Null reference, parameter \"target\".");
            }
        });

        return function (event) {
            event = GetEvent(event);

            var eventName = event.type;
            var related = event.relatedTarget || (eventName == "mouseout" ? event.toElement : event.fromElement);

            if (!related || (related !== target && !_This.jQueryIsChild(target, related))) {
                handler(event);
            }
        };
    };

    _This.jQueryAddEvent = function (elmt, eventName, handler, useCapture) {
        elmt = _This.jQueryGetElement(elmt);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.addEventListener) {
            if (eventName == "mousewheel") {
                elmt.addEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to add the mousewheel -- not a mistake!
            // _This is for opera, since it uses onmousewheel but needs addEventListener.
            elmt.addEventListener(eventName, handler, useCapture);
        }
        else if (elmt.attachEvent) {
            elmt.attachEvent("on" + eventName, handler);
            if (useCapture && elmt.setCapture) {
                elmt.setCapture();
            }
        }

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!elmt.addEventListener && !elmt.attachEvent) {
                jQueryJssorDebugjQuery.jQueryFail("Unable to attach event handler, no known technique.");
            }
        });

    };

    _This.jQueryRemoveEvent = function (elmt, eventName, handler, useCapture) {
        elmt = _This.jQueryGetElement(elmt);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (elmt.removeEventListener) {
            if (eventName == "mousewheel") {
                elmt.removeEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to remove the mousewheel -- not a mistake!
            // _This is for opera, since it uses onmousewheel but needs removeEventListener.
            elmt.removeEventListener(eventName, handler, useCapture);
        }
        else if (elmt.detachEvent) {
            elmt.detachEvent("on" + eventName, handler);
            if (useCapture && elmt.releaseCapture) {
                elmt.releaseCapture();
            }
        }
    };

    _This.jQueryFireEvent = function (elmt, eventName) {
        //var document = elmt.document;

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!document.createEvent && !document.createEventObject) {
                jQueryJssorDebugjQuery.jQueryFail("Unable to fire event, no known technique.");
            }

            if (!elmt.dispatchEvent && !elmt.fireEvent) {
                jQueryJssorDebugjQuery.jQueryFail("Unable to fire event, no known technique.");
            }
        });

        var evento;

        if (document.createEvent) {
            evento = document.createEvent("HTMLEvents");
            evento.initEvent(eventName, false, false);
            elmt.dispatchEvent(evento);
        }
        else {
            var ieEventName = "on" + eventName;
            evento = document.createEventObject();
            //event.eventType = ieEventName;
            //event.eventName = ieEventName;

            elmt.fireEvent(ieEventName, evento);
        }
    };

    _This.jQueryAddEventBrowserMouseUp = function (handler, userCapture) {
        _This.jQueryAddEvent((IsBrowserIe9Earlier()) ? document : window, "mouseup", handler, userCapture);
    };

    _This.jQueryRemoveEventBrowserMouseUp = function (handler, userCapture) {
        _This.jQueryRemoveEvent((IsBrowserIe9Earlier()) ? document : window, "mouseup", handler, userCapture);
    };

    //_This.jQueryAddEventBrowserMouseDown = function (handler, userCapture) {
    //    _This.jQueryAddEvent((IsBrowserIe9Earlier()) ? document : window, "mousedown", handler, userCapture);
    //};

    //_This.jQueryRemoveEventBrowserMouseDown = function (handler, userCapture) {
    //    _This.jQueryRemoveEvent((IsBrowserIe9Earlier()) ? document : window, "mousedown", handler, userCapture);
    //};

    _This.jQueryCancelEvent = function (event) {
        event = GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.preventDefault) {
            event.preventDefault();     // W3C for preventing default
        }

        event.cancel = true;            // legacy for preventing default
        event.returnValue = false;      // IE for preventing default
    };

    _This.jQueryStopEvent = function (event) {
        event = GetEvent(event);

        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/

        if (event.stopPropagation) {
            event.stopPropagation();    // W3C for stopping propagation
        }

        event.cancelBubble = true;      // IE for stopping propagation
    };

    _This.jQueryCreateCallback = function (object, method) {
        // create callback args
        var initialArgs = [].slice.call(arguments, 2);

        // create closure to apply method
        var callback = function () {
            // concatenate new args, but make a copy of initialArgs first
            var args = initialArgs.concat([].slice.call(arguments, 0));

            return method.apply(object, args);
        };

        //jQueryJssorDebugjQuery.jQueryLiveStamp(callback, "callback_" + (jQueryJssorjQuery.jQueryGetNow() & 0xFFFFFF));

        return callback;
    };

    var _Freeer;
    _This.jQueryFreeElement = function (elmt) {
        if (!_Freeer)
            _Freeer = _This.jQueryCreateDiv();

        if (elmt) {
            jQueryJssorjQuery.jQueryAppendChild(_Freeer, elmt);
            jQueryJssorjQuery.jQueryClearInnerHtml(_Freeer);
        }
    };

    _This.jQueryInnerText = function (elmt, text) {
        if (text == undefined)
            return elmt.textContent || elmt.innerText;

        var textNode = document.createTextNode(text);
        _This.jQueryClearInnerHtml(elmt);
        elmt.appendChild(textNode);
    };
    
    _This.jQueryInnerHtml = function (elmt, html) {
        if (html == undefined)
            return elmt.innerHTML;

        elmt.innerHTML = html;
    };

    _This.jQueryGetClientRect = function (elmt) {
        var rect = elmt.getBoundingClientRect();

        return { x: rect.left, y: rect.top, w: rect.right - rect.left, h: rect.bottom - rect.top };
    };

    _This.jQueryClearInnerHtml = function (elmt) {
        elmt.innerHTML = "";
    };

    _This.jQueryEncodeHtml = function (text) {
        var div = _This.jQueryCreateDiv();
        _This.jQueryInnerText(div, text);
        return _This.jQueryInnerHtml(div);
    };

    _This.jQueryDecodeHtml = function (html) {
        var div = _This.jQueryCreateDiv();
        _This.jQueryInnerHtml(div, html);
        return _This.jQueryInnerText(div);
    };

    _This.jQuerySelectElement = function (elmt) {
        var userSelection;
        if (window.getSelection) {
            //W3C default
            userSelection = window.getSelection();
        }
        var theRange = null;
        if (document.createRange) {
            theRange = document.createRange();
            theRange.selectNode(elmt);
        }
        else {
            theRange = document.body.createTextRange();
            theRange.moveToElementText(elmt);
            theRange.select();
        }
        //set user selection
        if (userSelection)
            userSelection.addRange(theRange);
    };

    _This.jQueryDeselectElements = function () {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    };

    _This.jQueryChildren = function (elmt) {
        var children = [];

        for (var tmpEl = elmt.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
            if (tmpEl.nodeType == 1) {
                children.push(tmpEl);
            }
        }

        return children;
    };

    function FindChild(elmt, attrValue, noDeep, attrName) {
        attrName = attrName || "u";

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (AttributeEx(elmt, attrName) == attrValue)
                    return elmt;

                if (!noDeep) {
                    var childRet = FindChild(elmt, attrValue, noDeep, attrName);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    _This.jQueryFindChild = FindChild;

    function FindChildren(elmt, attrValue, noDeep, attrName) {
        attrName = attrName || "u";

        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (AttributeEx(elmt, attrName) == attrValue)
                    ret.push(elmt);

                if (!noDeep) {
                    var childRet = FindChildren(elmt, attrValue, noDeep, attrName);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    _This.jQueryFindChildren = FindChildren;

    function FindChildByTag(elmt, tagName, noDeep) {

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (elmt.tagName == tagName)
                    return elmt;

                if (!noDeep) {
                    var childRet = FindChildByTag(elmt, tagName, noDeep);
                    if (childRet)
                        return childRet;
                }
            }
        }
    }

    _This.jQueryFindChildByTag = FindChildByTag;

    function FindChildrenByTag(elmt, tagName, noDeep) {
        var ret = [];

        for (elmt = elmt ? elmt.firstChild : null; elmt; elmt = elmt.nextSibling) {
            if (elmt.nodeType == 1) {
                if (!tagName || elmt.tagName == tagName)
                    ret.push(elmt);

                if (!noDeep) {
                    var childRet = FindChildrenByTag(elmt, tagName, noDeep);
                    if (childRet.length)
                        ret = ret.concat(childRet);
                }
            }
        }

        return ret;
    }

    _This.jQueryFindChildrenByTag = FindChildrenByTag;

    _This.jQueryGetElementsByTag = function (elmt, tagName) {
        return elmt.getElementsByTagName(tagName);
    };

    function Extend(target) {
        for (var i = 1; i < arguments.length; i++) {

            var options = arguments[i];

            // Only deal with non-null/undefined values
            if (options) {
                // Extend the base object
                for (var name in options) {
                    target[name] = options[name];
                }
            }
        }

        // Return the modified object
        return target;
    }

    _This.jQueryExtend = Extend;

    function Unextend(target, options) {
        jQueryJssorDebugjQuery.jQueryAssert(options);

        var unextended = {};

        // Extend the base object
        for (var name in target) {
            if (target[name] != options[name]) {
                unextended[name] = target[name];
            }
        }

        // Return the modified object
        return unextended;
    }

    _This.jQueryUnextend = Unextend;

    _This.jQueryIsUndefined = function (obj) {
        return type(obj) == "undefined";
    };

    _This.jQueryIsFunction = function (obj) {
        return type(obj) == "function";
    };

    _This.jQueryIsArray = function (obj) {
        return type(obj) == "array";
    };

    _This.jQueryIsString = function (obj) {
        return type(obj) == "string";
    };

    _This.jQueryIsNumeric = function (obj) {
        return !isNaN(ParseFloat(obj)) && isFinite(obj);
    };

    _This.jQueryIsWindow = function (obj) {
        return obj && obj == obj.window;
    };

    _This.jQueryType = type;

    // args is for internal usage only
    _This.jQueryEach = each;

    _This.jQueryIsPlainObject = isPlainObject;

    function CreateElement(tagName) {
        return document.createElement(tagName);
    }

    _This.jQueryCreateElement = CreateElement;

    _This.jQueryCreateDiv = function () {
        return CreateElement("DIV", document);
    };

    _This.jQueryCreateSpan = function () {
        return CreateElement("SPAN", document);
    };

    _This.jQueryEmptyFunction = function () { };

    function Attribute(elmt, name, value) {
        if (value == undefined)
            return elmt.getAttribute(name);

        elmt.setAttribute(name, value);
    }

    function AttributeEx(elmt, name) {
        return Attribute(elmt, name) || Attribute(elmt, "data-" + name);
    }

    _This.jQueryAttribute = Attribute;
    _This.jQueryAttributeEx = AttributeEx;

    function ClassName(elmt, className) {
        if (className == undefined)
            return elmt.className;

        elmt.className = className;
    }

    _This.jQueryClassName = ClassName;

    function ToHash(array) {
        var hash = {};

        each(array, function (item) {
            hash[item] = item;
        });

        return hash;
    }

    _This.jQueryToHash = ToHash;

    function Join(separator, strings) {
        ///	<param name="separator" type="String">
        ///		The element to show the dialog around
        ///	</param>
        ///	<param name="strings" type="Array" value="['1']">
        ///		The element to show the dialog around
        ///	</param>

        var joined = "";

        each(strings, function (str) {
            joined && (joined += separator);
            joined += str;
        });

        return joined;
    }

    _This.jQueryJoin = Join;

    _This.jQueryAddClass = function (elmt, className) {
        var newClassName = ClassName(elmt) + " " + className;
        ClassName(elmt, Join(" ", ToHash(newClassName.match(REGEX_WHITESPACE_GLOBAL))));
    };

    _This.jQueryRemoveClass = function (elmt, className) {
        ClassName(elmt, Join(" ", _This.jQueryUnextend(ToHash(ClassName(elmt).match(REGEX_WHITESPACE_GLOBAL)), ToHash(className.match(REGEX_WHITESPACE_GLOBAL)))));
    };

    _This.jQueryParentNode = function (elmt) {
        return elmt.parentNode;
    };

    _This.jQueryHideElement = function (elmt) {
        _This.jQueryCssDisplay(elmt, "none");
    };

    _This.jQueryEnableElement = function (elmt, notEnable) {
        if (notEnable) {
            _This.jQueryAttribute(elmt, "disabled", true);
        }
        else {
            _This.jQueryRemoveAttribute(elmt, "disabled");
        }
    };

    _This.jQueryHideElements = function (elmts) {
        for (var i = 0; i < elmts.length; i++) {
            _This.jQueryHideElement(elmts[i]);
        }
    };

    _This.jQueryShowElement = function (elmt, hide) {
        _This.jQueryCssDisplay(elmt, hide ? "none" : "");
    };

    _This.jQueryShowElements = function (elmts, hide) {
        for (var i = 0; i < elmts.length; i++) {
            _This.jQueryShowElement(elmts[i], hide);
        }
    };

    _This.jQueryRemoveAttribute = function (elmt, attrbuteName) {
        elmt.removeAttribute(attrbuteName);
    };

    _This.jQueryCanClearClip = function () {
        return IsBrowserIE() && browserRuntimeVersion < 10;
    };

    _This.jQuerySetStyleClip = function (elmt, clip) {
        if (clip) {
            elmt.style.clip = "rect(" + Math.round(clip.jQueryTop) + "px " + Math.round(clip.jQueryRight) + "px " + Math.round(clip.jQueryBottom) + "px " + Math.round(clip.jQueryLeft) + "px)";
        }
        else {
            var cssText = elmt.style.cssText;
            var clipRegs = [
                new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),
                new RegExp(/[\s]*cliptop: .*?[;]?/i),
                new RegExp(/[\s]*clipright: .*?[;]?/i),
                new RegExp(/[\s]*clipbottom: .*?[;]?/i),
                new RegExp(/[\s]*clipleft: .*?[;]?/i)
            ];

            var newCssText = BuildNewCss(cssText, clipRegs, "");

            jQueryJssorjQuery.jQueryCssCssText(elmt, newCssText);
        }
    };

    _This.jQueryGetNow = function () {
        return new Date().getTime();
    };

    _This.jQueryAppendChild = function (elmt, child) {
        elmt.appendChild(child);
    };

    _This.jQueryAppendChildren = function (elmt, children) {
        each(children, function (child) {
            _This.jQueryAppendChild(elmt, child);
        });
    };

    _This.jQueryInsertBefore = function (elmt, child, refObject) {
        elmt.insertBefore(child, refObject);
    };

    _This.jQueryInsertAdjacentHtml = function (elmt, where, text) {
        elmt.insertAdjacentHTML(where, text);
    };

    _This.jQueryRemoveChild = function (elmt, child) {
        elmt.removeChild(child);
    };

    _This.jQueryRemoveChildren = function (elmt, children) {
        each(children, function (child) {
            _This.jQueryRemoveChild(elmt, child);
        });
    };

    _This.jQueryClearChildren = function (elmt) {
        _This.jQueryRemoveChildren(elmt, _This.jQueryChildren(elmt));
    };

    _This.jQueryParseInt = function (str, radix) {
        return parseInt(str, radix || 10);
    };

    function ParseFloat(str) {
        return parseFloat(str);
    }

    _This.jQueryParseFloat = ParseFloat;

    _This.jQueryIsChild = function (elmtA, elmtB) {
        var body = document.body;
        while (elmtB && elmtA != elmtB && body != elmtB) {
            try {
                elmtB = elmtB.parentNode;
            } catch (e) {
                // Firefox sometimes fires events for XUL elements, which throws
                // a "permission denied" error. so this is not a child.
                return false;
            }
        }
        return elmtA == elmtB;
    };

    function CloneNode(elmt, noDeep) {
        return elmt.cloneNode(!noDeep);
    }

    _This.jQueryCloneNode = CloneNode;

    function TranslateTransition(transition) {
        if (transition) {
            var flyDirection = transition.jQueryFlyDirection;

            if (flyDirection & 1) {
                transition.x = transition.jQueryScaleHorizontal || 1;
            }
            if (flyDirection & 2) {
                transition.x = -transition.jQueryScaleHorizontal || -1;
            }
            if (flyDirection & 4) {
                transition.y = transition.jQueryScaleVertical || 1;
            }
            if (flyDirection & 8) {
                transition.y = -transition.jQueryScaleVertical || -1;
            }

            if (transition.jQueryRotate == true)
                transition.jQueryRotate = 1;

            TranslateTransition(transition.jQueryBrother);
        }
    }

    _This.jQueryTranslateTransitions = function (transitions) {
        ///	<summary>
        ///		For backward compatibility only.
        ///	</summary>
        if (transitions) {
            for (var i = 0; i < transitions.length; i++) {
                TranslateTransition(transitions[i]);
            }
            for (var name in transitions) {
                TranslateTransition(transitions[name]);
            }
        }
    };

    //function ImageLoader() {
    //    var _ThisImageLoader = this;
    //    var _BaseImageLoader = _This.jQueryInherit(_ThisImageLoader, jQueryJssorObjectjQuery);

    //    var _ImageLoading = 1;
    //    var _MainImageSrc;
    //    var _MainImage;
    //    var _CompleteCallback;
    //    var _MainImageAbort;

    //    function LoadCompleteCallback(image, abort) {
    //        _ImageLoading--;

    //        if (image) {
    //            _This.jQueryRemoveEvent(image, "load");
    //            _This.jQueryRemoveEvent(image, "abort");
    //            _This.jQueryRemoveEvent(image, "error");

    //            if (_MainImageSrc == image.src) {
    //                _MainImage = image;
    //                _MainImageAbort = abort;
    //            }
    //        }

    //        _CompleteCallback && _CompleteCallback(_MainImage, _MainImageAbort);
    //    }

    //    function LoadImage(src) {
    //        _ImageLoading++;

    //        if (IsBrowserOpera() && browserRuntimeVersion < 11.6 || !src) {
    //            LoadImageCallback(callback, null, !src);
    //        }
    //        else {
    //            var image = new Image();

    //            _This.jQueryAddEvent(image, "load", _This.jQueryCreateCallback(null, LoadImageCallback, image, false));

    //            var abortHandler = _This.jQueryCreateCallback(null, LoadImageCallback, image, true);
    //            _This.jQueryAddEvent(image, "abort", abortHandler);
    //            _This.jQueryAddEvent(image, "error", abortHandler);

    //            image.src = src;
    //        }
    //    }

    //    _ThisImageLoader.jQueryLoadImage = function (src, callback) {
    //        _MainImageSrc = src;
    //        _CompleteCallback = callback;

    //        LoadImage(src);
    //        LoadComplete();
    //    };

    //    _ThisImageLoader.jQueryLoadImages = function (imageElmts, mainImageElmt, callback) {
    //        mainImageElmt && (_MainImageSrc = mainImageElmt.src);
    //        _CompleteCallback = callback;

    //        each(imageElmts, function (imageElmt) {
    //            LoadImage(imageElmt.src);
    //        });
    //        LoadComplete();
    //    };
    //}

    _This.jQueryLoadImage = function (src, callback) {
        var image = new Image();

        function LoadImageCompleteHandler(abort) {
            _This.jQueryRemoveEvent(image, "load", LoadImageCompleteHandler);
            _This.jQueryRemoveEvent(image, "abort", ErrorOrAbortHandler);
            _This.jQueryRemoveEvent(image, "error", ErrorOrAbortHandler);

            if (callback)
                callback(image, abort);
        }

        function ErrorOrAbortHandler() {
            LoadImageCompleteHandler(true);
        }

        if (IsBrowserOpera() && browserRuntimeVersion < 11.6 || !src) {
            LoadImageCompleteHandler(!src);
        }
        else {

            _This.jQueryAddEvent(image, "load", LoadImageCompleteHandler);
            _This.jQueryAddEvent(image, "abort", ErrorOrAbortHandler);
            _This.jQueryAddEvent(image, "error", ErrorOrAbortHandler);
            
            image.src = src;
        }
    };

    _This.jQueryLoadImages = function (imageElmts, mainImageElmt, callback) {

        var _ImageLoading = imageElmts.length + 1;

        function LoadImageCompleteEventHandler(image, abort) {
            _ImageLoading--;
            if (mainImageElmt && image && image.src == mainImageElmt.src)
                mainImageElmt = image;
            !_ImageLoading && callback && callback(mainImageElmt);
        }

        each(imageElmts, function (imageElmt) {
            _This.jQueryLoadImage(imageElmt.src, LoadImageCompleteEventHandler);
        });

        LoadImageCompleteEventHandler();
    };

    _This.jQueryBuildElement = function (template, tagName, replacer, createCopy) {
        if (createCopy)
            template = CloneNode(template);

        var templateHolders = FindChildren(template, tagName);
        var templateHolders2 = jQueryJssorjQuery.jQueryGetElementsByTag(template, tagName);
        if (!templateHolders.length)
            templateHolders = templateHolders2;

        for (var j = templateHolders.length -1; j > -1; j--) {
            var templateHolder = templateHolders[j];
            var replaceItem = CloneNode(replacer);
            ClassName(replaceItem, ClassName(templateHolder));
            jQueryJssorjQuery.jQueryCssCssText(replaceItem, templateHolder.style.cssText);

            var thumbnailPlaceHolderParent = jQueryJssorjQuery.jQueryParentNode(templateHolder);
            jQueryJssorjQuery.jQueryInsertBefore(thumbnailPlaceHolderParent, replaceItem, templateHolder);
            jQueryJssorjQuery.jQueryRemoveChild(thumbnailPlaceHolderParent, templateHolder);
        }

        return template;
    };

    var _MouseDownButtons;
    function JssorButtonEx(elmt) {
        var _Self = this;

        var _OriginClassName;

        var _IsMouseDown;   //class name 'dn'
        var _IsActive;      //class name 'av'
        var _IsDisabled;    //class name 'ds'

        function Highlight() {
            var className = _OriginClassName;

            if (_IsDisabled) {
                className += 'ds';
            }
            else if (_IsMouseDown) {
                className += 'dn';
            }
            else if (_IsActive) {
                className += "av";
            }

            ClassName(elmt, className);
        }

        function OnMouseDown(event) {
            if (_IsDisabled) {
                _This.jQueryCancelEvent(event);
            }
            else {
                _MouseDownButtons.push(_Self);

                _IsMouseDown = true;

                Highlight();
            }
        }

        _Self.jQueryMouseUp = function () {
            ///	<summary>
            ///		Internal member function, do not use it.
            ///	</summary>
            ///	<private />

            _IsMouseDown = false;

            Highlight();
        };

        _Self.jQueryActivate = function (activate) {
            if (activate != undefined) {
                _IsActive = activate;

                Highlight();
            }
            else {
                return _IsActive;
            }
        };

        _Self.jQueryEnable = function (enable) {
            if (enable != undefined) {
                _IsDisabled = !enable;

                Highlight();
            }
            else {
                return !_IsDisabled;
            }
        };

        //JssorButtonEx Constructor
        {
            elmt = _This.jQueryGetElement(elmt);

            if (!_MouseDownButtons) {
                _This.jQueryAddEventBrowserMouseUp(function () {
                    var oldMouseDownButtons = _MouseDownButtons;
                    _MouseDownButtons = [];

                    each(oldMouseDownButtons, function (button) {
                        button.jQueryMouseUp();
                    });
                });

                _MouseDownButtons = [];
            }

            _OriginClassName = ClassName(elmt);

            jQueryJssorjQuery.jQueryAddEvent(elmt, "mousedown", OnMouseDown);
        }
    }

    _This.jQueryButtonize = function (elmt) {
        return new JssorButtonEx(elmt);
    };

    _This.jQueryCss = Css;
    _This.jQueryCssN = CssN;
    _This.jQueryCssP = CssP;

    _This.jQueryCssOverflow = CssProxy("overflow");

    _This.jQueryCssTop = CssProxy("top", 2);
    _This.jQueryCssLeft = CssProxy("left", 2);
    _This.jQueryCssWidth = CssProxy("width", 2);
    _This.jQueryCssHeight = CssProxy("height", 2);
    _This.jQueryCssMarginLeft = CssProxy("marginLeft", 2);
    _This.jQueryCssMarginTop = CssProxy("marginTop", 2);
    _This.jQueryCssPosition = CssProxy("position");
    _This.jQueryCssDisplay = CssProxy("display");
    _This.jQueryCssZIndex = CssProxy("zIndex", 1);
    _This.jQueryCssFloat = function (elmt, float) {
        return Css(elmt, IsBrowserIE() ? "styleFloat" : "cssFloat", float);
    };
    _This.jQueryCssOpacity = function (elmt, opacity, ie9EarlierForce) {
        if (opacity != undefined) {
            SetStyleOpacity(elmt, opacity, ie9EarlierForce);
        }
        else {
            return GetStyleOpacity(elmt);
        }
    };

    _This.jQueryCssCssText = function (elmt, text) {
        if (text != undefined) {
            elmt.style.cssText = text;
        }
        else {
            return elmt.style.cssText;
        }
    };

    var _StyleGetter = {
        jQueryOpacity: _This.jQueryCssOpacity,
        jQueryTop: _This.jQueryCssTop,
        jQueryLeft: _This.jQueryCssLeft,
        jQueryWidth: _This.jQueryCssWidth,
        jQueryHeight: _This.jQueryCssHeight,
        jQueryPosition: _This.jQueryCssPosition,
        jQueryDisplay: _This.jQueryCssDisplay,
        jQueryZIndex: _This.jQueryCssZIndex
    };

    var _StyleSetterReserved;

    function StyleSetter() {
        if (!_StyleSetterReserved) {
            _StyleSetterReserved = Extend({
                jQueryMarginTop: _This.jQueryCssMarginTop,
                jQueryMarginLeft: _This.jQueryCssMarginLeft,
                jQueryClip: _This.jQuerySetStyleClip,
                jQueryTransform: _This.jQuerySetStyleTransform
            }, _StyleGetter);
        }
        return _StyleSetterReserved;
    }

    function StyleSetterEx() {
        StyleSetter();

        //For Compression Only
        _StyleSetterReserved.jQueryTransform = _StyleSetterReserved.jQueryTransform;

        return _StyleSetterReserved;
    }

    _This.jQueryStyleSetter = StyleSetter;

    _This.jQueryStyleSetterEx = StyleSetterEx;

    _This.jQueryGetStyles = function (elmt, originStyles) {
        StyleSetter();

        var styles = {};

        each(originStyles, function (value, key) {
            if (_StyleGetter[key]) {
                styles[key] = _StyleGetter[key](elmt);
            }
        });

        return styles;
    };

    _This.jQuerySetStyles = function (elmt, styles) {
        var styleSetter = StyleSetter();

        each(styles, function (value, key) {
            styleSetter[key] && styleSetter[key](elmt, value);
        });
    };

    _This.jQuerySetStylesEx = function (elmt, styles) {
        StyleSetterEx();

        _This.jQuerySetStyles(elmt, styles);
    };

    jQueryJssorMatrixjQuery = new function () {
        var _ThisMatrix = this;

        function Multiply(ma, mb) {
            var acs = ma[0].length;
            var rows = ma.length;
            var cols = mb[0].length;

            var matrix = [];

            for (var r = 0; r < rows; r++) {
                var row = matrix[r] = [];
                for (var c = 0; c < cols; c++) {
                    var unitValue = 0;

                    for (var ac = 0; ac < acs; ac++) {
                        unitValue += ma[r][ac] * mb[ac][c];
                    }

                    row[c] = unitValue;
                }
            }

            return matrix;
        }

        _ThisMatrix.jQueryScaleX = function (matrix, sx) {
            return _ThisMatrix.jQueryScaleXY(matrix, sx, 0);
        };

        _ThisMatrix.jQueryScaleY = function (matrix, sy) {
            return _ThisMatrix.jQueryScaleXY(matrix, 0, sy);
        };

        _ThisMatrix.jQueryScaleXY = function (matrix, sx, sy) {
            return Multiply(matrix, [[sx, 0], [0, sy]]);
        };

        _ThisMatrix.jQueryTransformPoint = function (matrix, p) {
            var pMatrix = Multiply(matrix, [[p.x], [p.y]]);

            return Point(pMatrix[0][0], pMatrix[1][0]);
        };
    };

    _This.jQueryCreateMatrix = function (alpha, scaleX, scaleY) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        //var r11 = cos;
        //var r21 = sin;
        //var r12 = -sin;
        //var r22 = cos;

        //var m11 = cos * scaleX;
        //var m12 = -sin * scaleY;
        //var m21 = sin * scaleX;
        //var m22 = cos * scaleY;

        return [[cos * scaleX, -sin * scaleY], [sin * scaleX, cos * scaleY]];
    };

    _This.jQueryGetMatrixOffset = function (matrix, width, height) {
        var p1 = jQueryJssorMatrixjQuery.jQueryTransformPoint(matrix, Point(-width / 2, -height / 2));
        var p2 = jQueryJssorMatrixjQuery.jQueryTransformPoint(matrix, Point(width / 2, -height / 2));
        var p3 = jQueryJssorMatrixjQuery.jQueryTransformPoint(matrix, Point(width / 2, height / 2));
        var p4 = jQueryJssorMatrixjQuery.jQueryTransformPoint(matrix, Point(-width / 2, height / 2));

        return Point(Math.min(p1.x, p2.x, p3.x, p4.x) + width / 2, Math.min(p1.y, p2.y, p3.y, p4.y) + height / 2);
    };

    _This.jQueryTransform = function (fromStyles, toStyles, interPosition, easings, durings, rounds, options) {

        var currentStyles = toStyles;

        if (fromStyles) {
            currentStyles = {};

            for (var key in toStyles) {
                var round = rounds[key] || 1;
                var during = durings[key] || [0, 1];
                var propertyInterPosition = (interPosition - during[0]) / during[1];
                propertyInterPosition = Math.min(Math.max(propertyInterPosition, 0), 1);
                propertyInterPosition = propertyInterPosition * round;
                var floorPosition = Math.floor(propertyInterPosition);
                if (propertyInterPosition != floorPosition)
                    propertyInterPosition -= floorPosition;

                var easing = easings[key] || easings.jQueryDefault;
                var easingValue = easing(propertyInterPosition);
                var currentPropertyValue;
                var value = fromStyles[key];
                var toValue = toStyles[key];

                if (jQueryJssorjQuery.jQueryIsNumeric(toValue)) {
                    currentPropertyValue = value + (toValue - value) * easingValue;
                }
                else {
                    currentPropertyValue = jQueryJssorjQuery.jQueryExtend({ jQueryOffset: {} }, fromStyles[key]);

                    jQueryJssorjQuery.jQueryEach(toValue.jQueryOffset, function (rectX, n) {
                        var offsetValue = rectX * easingValue;
                        currentPropertyValue.jQueryOffset[n] = offsetValue;
                        currentPropertyValue[n] += offsetValue;
                    });
                }
                currentStyles[key] = currentPropertyValue;
            }

            if (fromStyles.jQueryZoom) {
                currentStyles.jQueryTransform = { jQueryRotate: currentStyles.jQueryRotate || 0, jQueryScale: currentStyles.jQueryZoom, jQueryOriginalWidth: options.jQueryOriginalWidth, jQueryOriginalHeight: options.jQueryOriginalHeight };
            }
        }

        if (toStyles.jQueryClip && options.jQueryMove) {
            var styleFrameNClipOffset = currentStyles.jQueryClip.jQueryOffset;

            var offsetY = (styleFrameNClipOffset.jQueryTop || 0) + (styleFrameNClipOffset.jQueryBottom || 0);
            var offsetX = (styleFrameNClipOffset.jQueryLeft || 0) + (styleFrameNClipOffset.jQueryRight || 0);

            currentStyles.jQueryLeft = (currentStyles.jQueryLeft || 0) + offsetX;
            currentStyles.jQueryTop = (currentStyles.jQueryTop || 0) + offsetY;
            currentStyles.jQueryClip.jQueryLeft -= offsetX;
            currentStyles.jQueryClip.jQueryRight -= offsetX;
            currentStyles.jQueryClip.jQueryTop -= offsetY;
            currentStyles.jQueryClip.jQueryBottom -= offsetY;
        }

        if (currentStyles.jQueryClip && jQueryJssorjQuery.jQueryCanClearClip() && !currentStyles.jQueryClip.jQueryTop && !currentStyles.jQueryClip.jQueryLeft && (currentStyles.jQueryClip.jQueryRight == options.jQueryOriginalWidth) && (currentStyles.jQueryClip.jQueryBottom == options.jQueryOriginalHeight))
            currentStyles.jQueryClip = null;

        return currentStyles;
    };
};

//jQueryJssorObjectjQuery
var jQueryJssorObjectjQuery = window.jQueryJssorObjectjQuery = function () {
    var _ThisObject = this;
    // Fields

    var _Listeners = []; // dictionary of eventName --> array of handlers
    var _Listenees = [];

    // Private Methods
    function AddListener(eventName, handler) {

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }

            jQueryJssorjQuery.jQueryEach(_Listeners, function (listener) {
                if (listener.jQueryEventName == eventName && listener.jQueryHandler === handler) {
                    throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");
                }
            });
        });

        _Listeners.push({ jQueryEventName: eventName, jQueryHandler: handler });
    }

    function RemoveListener(eventName, handler) {

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }
        });

        jQueryJssorjQuery.jQueryEach(_Listeners, function (listener, index) {
            if (listener.jQueryEventName == eventName && listener.jQueryHandler === handler) {
                _Listeners.splice(index, 1);
            }
        });
    }

    function ClearListeners() {
        _Listeners = [];
    }

    function ClearListenees() {

        jQueryJssorjQuery.jQueryEach(_Listenees, function (listenee) {
            jQueryJssorjQuery.jQueryRemoveEvent(listenee.jQueryObj, listenee.jQueryEventName, listenee.jQueryHandler);
        });

        _Listenees = [];
    }

    //Protected Methods
    _ThisObject.jQueryListen = function (obj, eventName, handler, useCapture) {

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!obj)
                throw new Error("param 'obj' is null or empty.");

            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }

            jQueryJssorjQuery.jQueryEach(_Listenees, function (listenee) {
                if (listenee.jQueryObj === obj && listenee.jQueryEventName == eventName && listenee.jQueryHandler === handler) {
                    throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");
                }
            });
        });

        jQueryJssorjQuery.jQueryAddEvent(obj, eventName, handler, useCapture);
        _Listenees.push({ jQueryObj: obj, jQueryEventName: eventName, jQueryHandler: handler });
    };

    _ThisObject.jQueryUnlisten = function (obj, eventName, handler) {

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!obj)
                throw new Error("param 'obj' is null or empty.");

            if (eventName == undefined || eventName == null)
                throw new Error("param 'eventName' is null or empty.");

            if (typeof (handler) != "function") {
                throw "param 'handler' must be a function.";
            }
        });

        jQueryJssorjQuery.jQueryEach(_Listenees, function (listenee, index) {
            if (listenee.jQueryObj === obj && listenee.jQueryEventName == eventName && listenee.jQueryHandler === handler) {
                jQueryJssorjQuery.jQueryRemoveEvent(obj, eventName, handler);
                _Listenees.splice(index, 1);
            }
        });
    };

    _ThisObject.jQueryUnlistenAll = ClearListenees;

    // Public Methods
    _ThisObject.jQueryOn = _ThisObject.addEventListener = AddListener;

    _ThisObject.jQueryOff = _ThisObject.removeEventListener = RemoveListener;

    _ThisObject.jQueryTriggerEvent = function (eventName) {

        var args = [].slice.call(arguments, 1);

        jQueryJssorjQuery.jQueryEach(_Listeners, function (listener) {
            try {
                listener.jQueryEventName == eventName && listener.jQueryHandler.apply(window, args);
            } catch (e) {
                // handler threw an error, ignore, go on to next one
                jQueryJssorDebugjQuery.jQueryError(e.name + " while executing " + eventName +
                        " handler: " + e.message, e);
            }
        });
    };

    _ThisObject.jQueryDestroy = function () {
        ClearListenees();
        ClearListeners();

        for (var name in _ThisObject)
            delete _ThisObject[name];
    };

    jQueryJssorDebugjQuery.jQueryC_AbstractClass(_ThisObject);
};

jQueryJssorAnimatorjQuery = function (delay, duration, options, elmt, fromStyles, toStyles) {
    delay = delay || 0;

    var _ThisAnimator = this;
    var _AutoPlay;
    var _Hiden;
    var _CombineMode;
    var _PlayToPosition;
    var _PlayDirection;
    var _NoStop;
    var _TimeStampLastFrame = 0;

    var _SubEasings;
    var _SubRounds;
    var _SubDurings;
    var _Callback;

    var _Position_Current = 0;
    var _Position_Display = 0;
    var _Hooked;

    var _Position_InnerBegin = delay;
    var _Position_InnerEnd = delay + duration;
    var _Position_OuterBegin;
    var _Position_OuterEnd;
    var _LoopLength;

    var _NestedAnimators = [];
    var _StyleSetter;

    function GetPositionRange(position, begin, end) {
        var range = 0;

        if (position < begin)
            range = -1;

        else if (position > end)
            range = 1;

        return range;
    }

    function GetInnerPositionRange(position) {
        return GetPositionRange(position, _Position_InnerBegin, _Position_InnerEnd);
    }

    function GetOuterPositionRange(position) {
        return GetPositionRange(position, _Position_OuterBegin, _Position_OuterEnd);
    }

    function Shift(offset) {
        _Position_OuterBegin += offset;
        _Position_OuterEnd += offset;
        _Position_InnerBegin += offset;
        _Position_InnerEnd += offset;

        _Position_Current += offset;
        _Position_Display += offset;

        jQueryJssorjQuery.jQueryEach(_NestedAnimators, function (animator) {
            animator, animator.jQueryShift(offset);
        });
    }

    function Locate(position, relative) {
        var offset = position - _Position_OuterBegin + delay * relative;

        Shift(offset);

        //jQueryJssorDebugjQuery.jQueryExecute(function () {
        //    _ThisAnimator.jQueryPosition_InnerBegin = _Position_InnerBegin;
        //    _ThisAnimator.jQueryPosition_InnerEnd = _Position_InnerEnd;
        //    _ThisAnimator.jQueryPosition_OuterBegin = _Position_OuterBegin;
        //    _ThisAnimator.jQueryPosition_OuterEnd = _Position_OuterEnd;
        //});

        return _Position_OuterEnd;
    }

    function GoToPosition(positionOuter, force) {
        var trimedPositionOuter = positionOuter;

        if (_LoopLength && (trimedPositionOuter >= _Position_OuterEnd || trimedPositionOuter <= _Position_OuterBegin)) {
            trimedPositionOuter = ((trimedPositionOuter - _Position_OuterBegin) % _LoopLength + _LoopLength) % _LoopLength + _Position_OuterBegin;
        }

        if (!_Hooked || _NoStop || force || _Position_Current != trimedPositionOuter) {

            var positionToDisplay = Math.min(trimedPositionOuter, _Position_OuterEnd);
            positionToDisplay = Math.max(positionToDisplay, _Position_OuterBegin);

            if (!_Hooked || _NoStop || force || positionToDisplay != _Position_Display) {
                if (toStyles) {

                    var interPosition = (positionToDisplay - _Position_InnerBegin) / (duration || 1);

                    //if (options.jQueryOptimize && jQueryJssorjQuery.jQueryIsBrowserChrome() && duration) {
                    //    interPosition = Math.round(interPosition / 8 * duration) * 8 / duration;
                    //}

                    if (options.jQueryReverse)
                        interPosition = 1 - interPosition;

                    var currentStyles = jQueryJssorjQuery.jQueryTransform(fromStyles, toStyles, interPosition, _SubEasings, _SubDurings, _SubRounds, options);

                    jQueryJssorjQuery.jQueryEach(currentStyles, function (value, key) {
                        _StyleSetter[key] && _StyleSetter[key](elmt, value);
                    });
                }

                _ThisAnimator.jQueryOnInnerOffsetChange(_Position_Display - _Position_InnerBegin, positionToDisplay - _Position_InnerBegin);
            }

            _Position_Display = positionToDisplay;

            jQueryJssorjQuery.jQueryEach(_NestedAnimators, function (animator, i) {
                var nestedAnimator = positionOuter < _Position_Current ? _NestedAnimators[_NestedAnimators.length - i - 1] : animator;
                nestedAnimator.jQueryGoToPosition(positionOuter, force);
            });

            var positionOld = _Position_Current;
            var positionNew = positionOuter;

            _Position_Current = trimedPositionOuter;
            _Hooked = true;

            _ThisAnimator.jQueryOnPositionChange(positionOld, positionNew);
        }
    }

    function Join(animator, combineMode) {
        ///	<summary>
        ///		Combine another animator as nested animator
        ///	</summary>
        ///	<param name="animator" type="jQueryJssorAnimatorjQuery">
        ///		An instance of jQueryJssorAnimatorjQuery
        ///	</param>
        ///	<param name="combineMode" type="int">
        ///		0: parallel - place the animator parallel to this animator.
        ///		1: chain - chain the animator at the _Position_InnerEnd of this animator.
        ///	</param>
        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (combineMode !== 0 && combineMode !== 1)
                jQueryJssorDebugjQuery.jQueryFail("Argument out of range, the value of 'combineMode' should be either 0 or 1.");
        });

        if (combineMode)
            animator.jQueryLocate(_Position_OuterEnd, 1);

        _Position_OuterEnd = Math.max(_Position_OuterEnd, animator.jQueryGetPosition_OuterEnd());
        _NestedAnimators.push(animator);
    }

    var RequestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame;

    if (jQueryJssorjQuery.jQueryIsBrowserSafari() && jQueryJssorjQuery.jQueryBrowserVersion() < 7) {
        RequestAnimationFrame = null;

        jQueryJssorDebugjQuery.jQueryLog("Custom animation frame for safari before 7.");
    }

    RequestAnimationFrame = RequestAnimationFrame || function (callback) {
        jQueryJssorjQuery.jQueryDelay(callback, options.jQueryInterval);
    };

    function ShowFrame() {
        if (_AutoPlay) {
            var now = jQueryJssorjQuery.jQueryGetNow();
            var timeOffset = Math.min(now - _TimeStampLastFrame, options.jQueryIntervalMax);
            var timePosition = _Position_Current + timeOffset * _PlayDirection;
            _TimeStampLastFrame = now;

            if (timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection)
                timePosition = _PlayToPosition;

            GoToPosition(timePosition);

            if (!_NoStop && timePosition * _PlayDirection >= _PlayToPosition * _PlayDirection) {
                Stop(_Callback);
            }
            else {
                RequestAnimationFrame(ShowFrame);
            }
        }
    }

    function PlayToPosition(toPosition, callback, noStop) {
        if (!_AutoPlay) {
            _AutoPlay = true;
            _NoStop = noStop
            _Callback = callback;
            toPosition = Math.max(toPosition, _Position_OuterBegin);
            toPosition = Math.min(toPosition, _Position_OuterEnd);
            _PlayToPosition = toPosition;
            _PlayDirection = _PlayToPosition < _Position_Current ? -1 : 1;
            _ThisAnimator.jQueryOnStart();
            _TimeStampLastFrame = jQueryJssorjQuery.jQueryGetNow();
            RequestAnimationFrame(ShowFrame);
        }
    }

    function Stop(callback) {
        if (_AutoPlay) {
            _NoStop = _AutoPlay = _Callback = false;
            _ThisAnimator.jQueryOnStop();

            if (callback)
                callback();
        }
    }

    _ThisAnimator.jQueryPlay = function (positionLength, callback, noStop) {
        PlayToPosition(positionLength ? _Position_Current + positionLength : _Position_OuterEnd, callback, noStop);
    };

    _ThisAnimator.jQueryPlayToPosition = PlayToPosition;

    _ThisAnimator.jQueryPlayToBegin = function (callback, noStop) {
        PlayToPosition(_Position_OuterBegin, callback, noStop);
    };

    _ThisAnimator.jQueryPlayToEnd = function (callback, noStop) {
        PlayToPosition(_Position_OuterEnd, callback, noStop);
    };

    _ThisAnimator.jQueryStop = Stop;

    _ThisAnimator.jQueryContinue = function (toPosition) {
        PlayToPosition(toPosition);
    };

    _ThisAnimator.jQueryGetPosition = function () {
        return _Position_Current;
    };

    _ThisAnimator.jQueryGetPlayToPosition = function () {
        return _PlayToPosition;
    };

    _ThisAnimator.jQueryGetPosition_Display = function () {
        return _Position_Display;
    };

    _ThisAnimator.jQueryGoToPosition = GoToPosition;

    _ThisAnimator.jQueryGoToBegin = function () {
        GoToPosition(_Position_OuterBegin, true);
    };

    _ThisAnimator.jQueryGoToEnd = function () {
        GoToPosition(_Position_OuterEnd, true);
    };

    _ThisAnimator.jQueryMove = function (offset) {
        GoToPosition(_Position_Current + offset);
    };

    _ThisAnimator.jQueryCombineMode = function () {
        return _CombineMode;
    };

    _ThisAnimator.jQueryGetDuration = function () {
        return duration;
    };

    _ThisAnimator.jQueryIsPlaying = function () {
        return _AutoPlay;
    };

    _ThisAnimator.jQueryIsOnTheWay = function () {
        return _Position_Current > _Position_InnerBegin && _Position_Current <= _Position_InnerEnd;
    };

    _ThisAnimator.jQuerySetLoopLength = function (length) {
        _LoopLength = length;
    };

    _ThisAnimator.jQueryLocate = Locate;

    _ThisAnimator.jQueryShift = Shift;

    _ThisAnimator.jQueryJoin = Join;

    _ThisAnimator.jQueryCombine = function (animator) {
        ///	<summary>
        ///		Combine another animator parallel to this animator
        ///	</summary>
        ///	<param name="animator" type="jQueryJssorAnimatorjQuery">
        ///		An instance of jQueryJssorAnimatorjQuery
        ///	</param>
        Join(animator, 0);
    };

    _ThisAnimator.jQueryChain = function (animator) {
        ///	<summary>
        ///		Chain another animator at the _Position_InnerEnd of this animator
        ///	</summary>
        ///	<param name="animator" type="jQueryJssorAnimatorjQuery">
        ///		An instance of jQueryJssorAnimatorjQuery
        ///	</param>
        Join(animator, 1);
    };

    _ThisAnimator.jQueryGetPosition_InnerBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerBegin;
    };

    _ThisAnimator.jQueryGetPosition_InnerEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_InnerEnd;
    };

    _ThisAnimator.jQueryGetPosition_OuterBegin = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterBegin;
    };

    _ThisAnimator.jQueryGetPosition_OuterEnd = function () {
        ///	<summary>
        ///		Internal member function, do not use it.
        ///	</summary>
        ///	<private />
        ///	<returns type="int" />
        return _Position_OuterEnd;
    };

    _ThisAnimator.jQueryOnPositionChange = _ThisAnimator.jQueryOnStart = _ThisAnimator.jQueryOnStop = _ThisAnimator.jQueryOnInnerOffsetChange = jQueryJssorjQuery.jQueryEmptyFunction;
    _ThisAnimator.jQueryVersion = jQueryJssorjQuery.jQueryGetNow();

    //Constructor  1
    {
        options = jQueryJssorjQuery.jQueryExtend({
            jQueryInterval: 16,
            jQueryIntervalMax: 50
        }, options);

        //Sodo statement, for development time intellisence only
        jQueryJssorDebugjQuery.jQueryExecute(function () {
            options = jQueryJssorjQuery.jQueryExtend({
                jQueryLoopLength: undefined,
                jQuerySetter: undefined,
                jQueryEasing: undefined
            }, options);
        });

        _LoopLength = options.jQueryLoopLength;

        _StyleSetter = jQueryJssorjQuery.jQueryExtend({}, jQueryJssorjQuery.jQueryStyleSetter(), options.jQuerySetter);

        _Position_OuterBegin = _Position_InnerBegin = delay;
        _Position_OuterEnd = _Position_InnerEnd = delay + duration;

        _SubRounds = options.jQueryRound || {};
        _SubDurings = options.jQueryDuring || {};
        _SubEasings = jQueryJssorjQuery.jQueryExtend({ jQueryDefault: jQueryJssorjQuery.jQueryIsFunction(options.jQueryEasing) && options.jQueryEasing || jQueryJssorEasingjQuery.jQueryEaseSwing }, options.jQueryEasing);
    }
};

function jQueryJssorPlayerClassjQuery() {

    var _ThisPlayer = this;
    var _PlayerControllers = [];

    function PlayerController(playerElement) {
        var _SelfPlayerController = this;
        var _PlayerInstance;
        var _PlayerInstantces = [];

        function OnPlayerInstanceDataAvailable(event) {
            var srcElement = jQueryJssorjQuery.jQueryEventSrc(event);
            _PlayerInstance = srcElement.pInstance;

            jQueryJssorjQuery.jQueryRemoveEvent(srcElement, "dataavailable", OnPlayerInstanceDataAvailable);
            jQueryJssorjQuery.jQueryEach(_PlayerInstantces, function (playerInstance) {
                if (playerInstance != _PlayerInstance) {
                    playerInstance.jQueryRemove();
                }
            });

            playerElement.pTagName = _PlayerInstance.tagName;
            _PlayerInstantces = null;
        }

        function HandlePlayerInstance(playerInstanceElement) {
            var playerHandler;

            if (!playerInstanceElement.pInstance) {
                var playerHandlerAttribute = jQueryJssorjQuery.jQueryAttributeEx(playerInstanceElement, "pHandler");

                if (jQueryJssorPlayerjQuery[playerHandlerAttribute]) {
                    jQueryJssorjQuery.jQueryAddEvent(playerInstanceElement, "dataavailable", OnPlayerInstanceDataAvailable);
                    playerHandler = new jQueryJssorPlayerjQuery[playerHandlerAttribute](playerElement, playerInstanceElement);
                    _PlayerInstantces.push(playerHandler);

                    jQueryJssorDebugjQuery.jQueryExecute(function () {
                        if (jQueryJssorjQuery.jQueryType(playerHandler.jQueryRemove) != "function") {
                            jQueryJssorDebugjQuery.jQueryFail("'pRemove' interface not implemented for player handler '" + playerHandlerAttribute + "'.");
                        }
                    });
                }
            }

            return playerHandler;
        }

        _SelfPlayerController.jQueryInitPlayerController = function () {
            if (!playerElement.pInstance && !HandlePlayerInstance(playerElement)) {

                var playerInstanceElements = jQueryJssorjQuery.jQueryChildren(playerElement);

                jQueryJssorjQuery.jQueryEach(playerInstanceElements, function (playerInstanceElement) {
                    HandlePlayerInstance(playerInstanceElement);
                });
            }
        };
    }

    _ThisPlayer.jQueryEVT_SWITCH = 21;

    _ThisPlayer.jQueryFetchPlayers = function (elmt) {
        elmt = elmt || document.body;

        var playerElements = jQueryJssorjQuery.jQueryFindChildren(elmt, "player");

        jQueryJssorjQuery.jQueryEach(playerElements, function (playerElement) {
            if (!_PlayerControllers[playerElement.pId]) {
                playerElement.pId = _PlayerControllers.length;
                _PlayerControllers.push(new PlayerController(playerElement));
            }
            var playerController = _PlayerControllers[playerElement.pId];
            playerController.jQueryInitPlayerController();
        });
    };
}