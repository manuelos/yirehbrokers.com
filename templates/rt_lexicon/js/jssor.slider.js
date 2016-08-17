/// <reference path="Jssor.js" />

/*
* Jssor.Slider 18.0
* http://www.jssor.com/
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
* 
* TERMS OF USE - Jssor.Slider
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

var jQueryJssorSliderjQuery;
var jQueryJssorSlideshowFormationsjQuery = window.jQueryJssorSlideshowFormationsjQuery = {};
var jQueryJssorSlideshowRunnerjQuery;

new function () {
    //Constants +++++++

    var COLUMN_INCREASE = 0;
    var COLUMN_DECREASE = 1;
    var ROW_INCREASE = 2;
    var ROW_DECREASE = 3;

    var DIRECTION_HORIZONTAL = 0x0003;
    var DIRECTION_VERTICAL = 0x000C;

    var TO_LEFT = 0x0001;
    var TO_RIGHT = 0x0002;
    var TO_TOP = 0x0004;
    var TO_BOTTOM = 0x0008;

    var FROM_LEFT = 0x0100;
    var FROM_TOP = 0x0200;
    var FROM_RIGHT = 0x0400;
    var FROM_BOTTOM = 0x0800;

    var ASSEMBLY_BOTTOM_LEFT = FROM_BOTTOM + TO_LEFT;
    var ASSEMBLY_BOTTOM_RIGHT = FROM_BOTTOM + TO_RIGHT;
    var ASSEMBLY_TOP_LEFT = FROM_TOP + TO_LEFT;
    var ASSEMBLY_TOP_RIGHT = FROM_TOP + TO_RIGHT;
    var ASSEMBLY_LEFT_TOP = FROM_LEFT + TO_TOP;
    var ASSEMBLY_LEFT_BOTTOM = FROM_LEFT + TO_BOTTOM;
    var ASSEMBLY_RIGHT_TOP = FROM_RIGHT + TO_TOP;
    var ASSEMBLY_RIGHT_BOTTOM = FROM_RIGHT + TO_BOTTOM;

    //Constants -------

    //Formation Definition +++++++
    function isToLeft(roadValue) {
        return (roadValue & TO_LEFT) == TO_LEFT;
    }

    function isToRight(roadValue) {
        return (roadValue & TO_RIGHT) == TO_RIGHT;
    }

    function isToTop(roadValue) {
        return (roadValue & TO_TOP) == TO_TOP;
    }

    function isToBottom(roadValue) {
        return (roadValue & TO_BOTTOM) == TO_BOTTOM;
    }

    function PushFormationOrder(arr, order, formationItem) {
        formationItem.push(order);
        arr[order] = arr[order] || [];
        arr[order].push(formationItem);
    }

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationStraight = function (transition) {
        var cols = transition.jQueryCols;
        var rows = transition.jQueryRows;
        var formationDirection = transition.jQueryAssembly;
        var count = transition.jQueryCount;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var order;
        for (r = 0; r < rows; r++) {
            for (col = 0; col < cols; col++) {
                cr = r + ',' + col;
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                        order = il - (col * rows + (rl - r));
                        break;
                    case ASSEMBLY_RIGHT_TOP:
                        order = il - (r * cols + (cl - col));
                        break;
                    case ASSEMBLY_TOP_LEFT:
                        order = il - (col * rows + r);
                    case ASSEMBLY_LEFT_TOP:
                        order = il - (r * cols + col);
                        break;
                    case ASSEMBLY_BOTTOM_RIGHT:
                        order = col * rows + r;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                        order = r * cols + (cl - col);
                        break;
                    case ASSEMBLY_TOP_RIGHT:
                        order = col * rows + (rl - r);
                        break;
                    default:
                        order = r * cols + col;
                        break; //ASSEMBLY_RIGHT_BOTTOM
                }
                PushFormationOrder(a, order, [r, col]);
            }
        }

        return a;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationSwirl = function (transition) {
        var cols = transition.jQueryCols;
        var rows = transition.jQueryRows;
        var formationDirection = transition.jQueryAssembly;
        var count = transition.jQueryCount;
        var a = [];
        var hit = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && !hit[cr]) {
                //a[cr] = i++;
                hit[cr] = true;
                PushFormationOrder(a, i++, [r, col]);
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
            }

            switch (courses[course % courses.length]) {
                case COLUMN_INCREASE:
                    col++;
                    break;
                case ROW_INCREASE:
                    r++;
                    break;
                case COLUMN_DECREASE:
                    col--;
                    break;
                case ROW_DECREASE:
                    r--;
                    break;
            }
        }
        return a;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationZigZag = function (transition) {
        var cols = transition.jQueryCols;
        var rows = transition.jQueryRows;
        var formationDirection = transition.jQueryAssembly;
        var count = transition.jQueryCount;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        var courses;
        var course = 0;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
                col = cl;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_DECREASE, ROW_DECREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_RIGHT_TOP:
                col = 0;
                r = rl;
                courses = [COLUMN_INCREASE, ROW_DECREASE, COLUMN_DECREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_TOP_LEFT:
                col = cl;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_DECREASE, ROW_INCREASE, COLUMN_DECREASE];
                break;
            case ASSEMBLY_LEFT_TOP:
                col = cl;
                r = rl;
                courses = [COLUMN_DECREASE, ROW_DECREASE, COLUMN_INCREASE, ROW_DECREASE];
                break;
            case ASSEMBLY_BOTTOM_RIGHT:
                col = 0;
                r = 0;
                courses = [ROW_INCREASE, COLUMN_INCREASE, ROW_DECREASE, COLUMN_INCREASE];
                break;
            case ASSEMBLY_LEFT_BOTTOM:
                col = cl;
                r = 0;
                courses = [COLUMN_DECREASE, ROW_INCREASE, COLUMN_INCREASE, ROW_INCREASE];
                break;
            case ASSEMBLY_TOP_RIGHT:
                col = 0;
                r = rl;
                courses = [ROW_DECREASE, COLUMN_INCREASE, ROW_INCREASE, COLUMN_INCREASE];
                break;
            default:
                col = 0;
                r = 0;
                courses = [COLUMN_INCREASE, ROW_INCREASE, COLUMN_DECREASE, ROW_INCREASE];
                break; //ASSEMBLY_RIGHT_BOTTOM
        }
        i = 0;
        while (i < count) {
            cr = r + ',' + col;
            if (col >= 0 && col < cols && r >= 0 && r < rows && typeof (a[cr]) == 'undefined') {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
                switch (courses[course % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
            else {
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col--;
                        break;
                    case ROW_INCREASE:
                        r--;
                        break;
                    case COLUMN_DECREASE:
                        col++;
                        break;
                    case ROW_DECREASE:
                        r++;
                        break;
                }
                switch (courses[course++ % courses.length]) {
                    case COLUMN_INCREASE:
                        col++;
                        break;
                    case ROW_INCREASE:
                        r++;
                        break;
                    case COLUMN_DECREASE:
                        col--;
                        break;
                    case ROW_DECREASE:
                        r--;
                        break;
                }
            }
        }
        return a;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationStraightStairs = function (transition) {
        var cols = transition.jQueryCols;
        var rows = transition.jQueryRows;
        var formationDirection = transition.jQueryAssembly;
        var count = transition.jQueryCount;
        var a = [];
        var i = 0;
        var col = 0;
        var r = 0;
        var cl = cols - 1;
        var rl = rows - 1;
        var il = count - 1;
        var cr;
        switch (formationDirection) {
            case ASSEMBLY_BOTTOM_LEFT:
            case ASSEMBLY_TOP_RIGHT:
            case ASSEMBLY_TOP_LEFT:
            case ASSEMBLY_BOTTOM_RIGHT:
                var C = 0;
                var R = 0;
                break;
            case ASSEMBLY_LEFT_BOTTOM:
            case ASSEMBLY_RIGHT_TOP:
            case ASSEMBLY_LEFT_TOP:
            case ASSEMBLY_RIGHT_BOTTOM:
                var C = cl;
                var R = 0;
                break;
            default:
                formationDirection = ASSEMBLY_RIGHT_BOTTOM;
                var C = cl;
                var R = 0;
                break;
        }
        col = C;
        r = R;
        while (i < count) {
            cr = r + ',' + col;
            if (isToTop(formationDirection) || isToRight(formationDirection)) {
                PushFormationOrder(a, il - i++, [r, col]);
                //a[cr] = il - i++;
            }
            else {
                PushFormationOrder(a, i++, [r, col]);
                //a[cr] = i++;
            }
            switch (formationDirection) {
                case ASSEMBLY_BOTTOM_LEFT:
                case ASSEMBLY_TOP_RIGHT:
                    col--;
                    r++;
                    break;
                case ASSEMBLY_TOP_LEFT:
                case ASSEMBLY_BOTTOM_RIGHT:
                    col++;
                    r--;
                    break;
                case ASSEMBLY_LEFT_BOTTOM:
                case ASSEMBLY_RIGHT_TOP:
                    col--;
                    r--;
                    break;
                case ASSEMBLY_RIGHT_BOTTOM:
                case ASSEMBLY_LEFT_TOP:
                default:
                    col++;
                    r++;
                    break;
            }
            if (col < 0 || r < 0 || col > cl || r > rl) {
                switch (formationDirection) {
                    case ASSEMBLY_BOTTOM_LEFT:
                    case ASSEMBLY_TOP_RIGHT:
                        C++;
                        break;
                    case ASSEMBLY_LEFT_BOTTOM:
                    case ASSEMBLY_RIGHT_TOP:
                    case ASSEMBLY_TOP_LEFT:
                    case ASSEMBLY_BOTTOM_RIGHT:
                        R++;
                        break;
                    case ASSEMBLY_RIGHT_BOTTOM:
                    case ASSEMBLY_LEFT_TOP:
                    default:
                        C--;
                        break;
                }
                if (C < 0 || R < 0 || C > cl || R > rl) {
                    switch (formationDirection) {
                        case ASSEMBLY_BOTTOM_LEFT:
                        case ASSEMBLY_TOP_RIGHT:
                            C = cl;
                            R++;
                            break;
                        case ASSEMBLY_TOP_LEFT:
                        case ASSEMBLY_BOTTOM_RIGHT:
                            R = rl;
                            C++;
                            break;
                        case ASSEMBLY_LEFT_BOTTOM:
                        case ASSEMBLY_RIGHT_TOP: R = rl; C--;
                            break;
                        case ASSEMBLY_RIGHT_BOTTOM:
                        case ASSEMBLY_LEFT_TOP:
                        default:
                            C = 0;
                            R++;
                            break;
                    }
                    if (R > rl)
                        R = rl;
                    else if (R < 0)
                        R = 0;
                    else if (C > cl)
                        C = cl;
                    else if (C < 0)
                        C = 0;
                }
                r = R;
                col = C;
            }
        }
        return a;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationSquare = function (transition) {
        var cols = transition.jQueryCols || 1;
        var rows = transition.jQueryRows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var dc;
        var dr;
        var cr;
        dc = cols < rows ? (rows - cols) / 2 : 0;
        dr = cols > rows ? (cols - rows) / 2 : 0;
        cr = Math.round(Math.max(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1 + dc, r + 1 + dr, cols - col + dc, rows - r + dr), [r, col]);
        }
        return arr;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationRectangle = function (transition) {
        var cols = transition.jQueryCols || 1;
        var rows = transition.jQueryRows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var cr;
        cr = Math.round(Math.min(cols / 2, rows / 2)) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, cr - Math.min(col + 1, r + 1, cols - col, rows - r), [r, col]);
        }
        return arr;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationRandom = function (transition) {
        var a = [];
        var r, col, i;
        for (r = 0; r < transition.jQueryRows; r++) {
            for (col = 0; col < transition.jQueryCols; col++)
                PushFormationOrder(a, Math.ceil(100000 * Math.random()) % 13, [r, col]);
        }

        return a;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationCircle = function (transition) {
        var cols = transition.jQueryCols || 1;
        var rows = transition.jQueryRows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.sqrt(Math.pow(col - hc, 2) + Math.pow(r - hr, 2))), [r, col]);
        }
        return arr;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationCross = function (transition) {
        var cols = transition.jQueryCols || 1;
        var rows = transition.jQueryRows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(Math.min(Math.abs(col - hc), Math.abs(r - hr))), [r, col]);
        }
        return arr;
    };

    jQueryJssorSlideshowFormationsjQuery.jQueryFormationRectangleCross = function (transition) {
        var cols = transition.jQueryCols || 1;
        var rows = transition.jQueryRows || 1;
        var arr = [];
        var i = 0;
        var col;
        var r;
        var hc = cols / 2 - 0.5;
        var hr = rows / 2 - 0.5;
        var cr = Math.max(hc, hr) + 1;
        for (col = 0; col < cols; col++) {
            for (r = 0; r < rows; r++)
                PushFormationOrder(arr, Math.round(cr - Math.max(hc - Math.abs(col - hc), hr - Math.abs(r - hr))) - 1, [r, col]);
        }
        return arr;
    };

    function GetFormation(transition) {

        var formationInstance = transition.jQueryFormation(transition);

        return transition.jQueryReverse ? formationInstance.reverse() : formationInstance;

    } //GetFormation

    //var _PrototypeTransitions = [];
    function EnsureTransitionInstance(options, slideshowInterval) {

        var _SlideshowTransition = {
            jQueryInterval: slideshowInterval,  //Delay to play next frame
            jQueryDuration: 1, //Duration to finish the entire transition
            jQueryDelay: 0,  //Delay to assembly blocks
            jQueryCols: 1,   //Number of columns
            jQueryRows: 1,   //Number of rows
            jQueryOpacity: 0,   //Fade block or not
            jQueryZoom: 0,   //Zoom block or not
            jQueryClip: 0,   //Clip block or not
            jQueryMove: false,   //Move block or not
            jQuerySlideOut: false,   //Slide the previous slide out to display next slide instead
            //jQueryFlyDirection: 0,   //Specify fly transform with direction
            jQueryReverse: false,    //Reverse the assembly or not
            jQueryFormation: jQueryJssorSlideshowFormationsjQuery.jQueryFormationRandom,    //Shape that assembly blocks as
            jQueryAssembly: ASSEMBLY_RIGHT_BOTTOM,   //The way to assembly blocks
            jQueryChessMode: { jQueryColumn: 0, jQueryRow: 0 },    //Chess move or fly direction
            jQueryEasing: jQueryJssorEasingjQuery.jQueryEaseSwing,  //Specify variation of speed during transition
            jQueryRound: {},
            jQueryBlocks: [],
            jQueryDuring: {}
        };

        jQueryJssorjQuery.jQueryExtend(_SlideshowTransition, options);

        _SlideshowTransition.jQueryCount = _SlideshowTransition.jQueryCols * _SlideshowTransition.jQueryRows;
        if (jQueryJssorjQuery.jQueryIsFunction(_SlideshowTransition.jQueryEasing))
            _SlideshowTransition.jQueryEasing = { jQueryDefault: _SlideshowTransition.jQueryEasing };

        _SlideshowTransition.jQueryFramesCount = Math.ceil(_SlideshowTransition.jQueryDuration / _SlideshowTransition.jQueryInterval);
        _SlideshowTransition.jQueryEasingInstance = GetEasing(_SlideshowTransition);

        _SlideshowTransition.jQueryGetBlocks = function (width, height) {
            width /= _SlideshowTransition.jQueryCols;
            height /= _SlideshowTransition.jQueryRows;
            var wh = width + 'x' + height;
            if (!_SlideshowTransition.jQueryBlocks[wh]) {
                _SlideshowTransition.jQueryBlocks[wh] = { jQueryWidth: width, jQueryHeight: height };
                for (var col = 0; col < _SlideshowTransition.jQueryCols; col++) {
                    for (var r = 0; r < _SlideshowTransition.jQueryRows; r++)
                        _SlideshowTransition.jQueryBlocks[wh][r + ',' + col] = { jQueryTop: r * height, jQueryRight: col * width + width, jQueryBottom: r * height + height, jQueryLeft: col * width };
                }
            }

            return _SlideshowTransition.jQueryBlocks[wh];
        };

        if (_SlideshowTransition.jQueryBrother) {
            _SlideshowTransition.jQueryBrother = EnsureTransitionInstance(_SlideshowTransition.jQueryBrother, slideshowInterval);
            _SlideshowTransition.jQuerySlideOut = true;
        }

        return _SlideshowTransition;
    }

    function GetEasing(transition) {
        var easing = transition.jQueryEasing;
        if (!easing.jQueryDefault)
            easing.jQueryDefault = jQueryJssorEasingjQuery.jQueryEaseSwing;

        var duration = transition.jQueryFramesCount;

        var cache = easing.jQueryCache;
        if (!cache) {
            var enumerator = jQueryJssorjQuery.jQueryExtend({}, transition.jQueryEasing, transition.jQueryRound);
            cache = easing.jQueryCache = {};

            jQueryJssorjQuery.jQueryEach(enumerator, function (v, easingName) {
                var easingFunction = easing[easingName] || easing.jQueryDefault;
                var round = transition.jQueryRound[easingName] || 1;

                if (!jQueryJssorjQuery.jQueryIsArray(easingFunction.jQueryCache))
                    easingFunction.jQueryCache = [];

                var easingFunctionCache = easingFunction.jQueryCache[duration] = easingFunction.jQueryCache[duration] || [];

                if (!easingFunctionCache[round]) {
                    easingFunctionCache[round] = [0];
                    for (var t = 1; t <= duration; t++) {
                        var tRound = t / duration * round;
                        var tRoundFloor = Math.floor(tRound);
                        if (tRound != tRoundFloor)
                            tRound -= tRoundFloor;
                        easingFunctionCache[round][t] = easingFunction(tRound);
                    }
                }

                cache[easingName] = easingFunctionCache;

            });
        }

        return cache;
    } //GetEasing

    //Formation Definition -------

    function JssorSlideshowPlayer(slideContainer, slideElement, slideTransition, beginTime, slideContainerWidth, slideContainerHeight) {
        var _Self = this;

        var _Block;
        var _StartStylesArr = {};
        var _AnimationStylesArrs = {};
        var _AnimationBlockItems = [];
        var _StyleStart;
        var _StyleEnd;
        var _StyleDif;
        var _ChessModeColumn = slideTransition.jQueryChessMode.jQueryColumn || 0;
        var _ChessModeRow = slideTransition.jQueryChessMode.jQueryRow || 0;

        var _Blocks = slideTransition.jQueryGetBlocks(slideContainerWidth, slideContainerHeight);
        var _FormationInstance = GetFormation(slideTransition);
        var _MaxOrder = _FormationInstance.length - 1;
        var _Period = slideTransition.jQueryDuration + slideTransition.jQueryDelay * _MaxOrder;
        var _EndTime = beginTime + _Period;

        var _SlideOut = slideTransition.jQuerySlideOut;
        var _IsIn;

        _EndTime += jQueryJssorjQuery.jQueryIsBrowserChrome() ? 260 : 50;

        _Self.jQueryEndTime = _EndTime;

        _Self.jQueryShowFrame = function (time) {
            time -= beginTime;

            var isIn = time < _Period;

            if (isIn || _IsIn) {
                _IsIn = isIn;

                if (!_SlideOut)
                    time = _Period - time;

                var frameIndex = Math.ceil(time / slideTransition.jQueryInterval);

                jQueryJssorjQuery.jQueryEach(_AnimationStylesArrs, function (value, index) {

                    var itemFrameIndex = Math.max(frameIndex, value.jQueryMin);
                    itemFrameIndex = Math.min(itemFrameIndex, value.length - 1);

                    if (value.jQueryLastFrameIndex != itemFrameIndex) {
                        if (!value.jQueryLastFrameIndex && !_SlideOut) {
                            jQueryJssorjQuery.jQueryShowElement(_AnimationBlockItems[index]);
                        }
                        else if (itemFrameIndex == value.jQueryMax && _SlideOut) {
                            jQueryJssorjQuery.jQueryHideElement(_AnimationBlockItems[index]);
                        }
                        value.jQueryLastFrameIndex = itemFrameIndex;
                        jQueryJssorjQuery.jQuerySetStylesEx(_AnimationBlockItems[index], value[itemFrameIndex]);
                    }
                });
            }
        };

        function DisableHWA(elmt) {
            jQueryJssorjQuery.jQueryDisableHWA(elmt);

            var children = jQueryJssorjQuery.jQueryChildren(elmt);

            jQueryJssorjQuery.jQueryEach(children, function (child) {
                DisableHWA(child);
            });
        }

        //constructor
        {
            slideElement = jQueryJssorjQuery.jQueryCloneNode(slideElement);
            DisableHWA(slideElement);
            if (jQueryJssorjQuery.jQueryIsBrowserIe9Earlier()) {
                var hasImage = !slideElement["no-image"];
                var slideChildElements = jQueryJssorjQuery.jQueryFindChildrenByTag(slideElement);
                jQueryJssorjQuery.jQueryEach(slideChildElements, function (slideChildElement) {
                    if (hasImage || slideChildElement["jssor-slider"])
                        jQueryJssorjQuery.jQueryCssOpacity(slideChildElement, jQueryJssorjQuery.jQueryCssOpacity(slideChildElement), true);
                });
            }

            jQueryJssorjQuery.jQueryEach(_FormationInstance, function (formationItems, order) {
                jQueryJssorjQuery.jQueryEach(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];
                    {
                        var columnRow = row + ',' + col;

                        var chessHorizontal = false;
                        var chessVertical = false;
                        var chessRotate = false;

                        if (_ChessModeColumn && col % 2) {
                            if (jQueryJssorDirectionjQuery.jQueryIsHorizontal(_ChessModeColumn)) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if (jQueryJssorDirectionjQuery.jQueryIsVertical(_ChessModeColumn)) {
                                chessVertical = !chessVertical;
                            }

                            if (_ChessModeColumn & 16)
                                chessRotate = !chessRotate;
                        }

                        if (_ChessModeRow && row % 2) {
                            if (jQueryJssorDirectionjQuery.jQueryIsHorizontal(_ChessModeRow)) {
                                chessHorizontal = !chessHorizontal;
                            }
                            if (jQueryJssorDirectionjQuery.jQueryIsVertical(_ChessModeRow)) {
                                chessVertical = !chessVertical;
                            }
                            if (_ChessModeRow & 16)
                                chessRotate = !chessRotate;
                        }

                        slideTransition.jQueryTop = slideTransition.jQueryTop || (slideTransition.jQueryClip & 4);
                        slideTransition.jQueryBottom = slideTransition.jQueryBottom || (slideTransition.jQueryClip & 8);
                        slideTransition.jQueryLeft = slideTransition.jQueryLeft || (slideTransition.jQueryClip & 1);
                        slideTransition.jQueryRight = slideTransition.jQueryRight || (slideTransition.jQueryClip & 2);

                        var topBenchmark = chessVertical ? slideTransition.jQueryBottom : slideTransition.jQueryTop;
                        var bottomBenchmark = chessVertical ? slideTransition.jQueryTop : slideTransition.jQueryBottom;
                        var leftBenchmark = chessHorizontal ? slideTransition.jQueryRight : slideTransition.jQueryLeft;
                        var rightBenchmark = chessHorizontal ? slideTransition.jQueryLeft : slideTransition.jQueryRight;

                        //jQueryJssorDebugjQuery.jQueryExecute(function () {
                        //    topBenchmark = bottomBenchmark = leftBenchmark = rightBenchmark = false;
                        //});

                        slideTransition.jQueryClip = topBenchmark || bottomBenchmark || leftBenchmark || rightBenchmark;

                        _StyleDif = {};
                        _StyleEnd = { jQueryTop: 0, jQueryLeft: 0, jQueryOpacity: 1, jQueryWidth: slideContainerWidth, jQueryHeight: slideContainerHeight };
                        _StyleStart = jQueryJssorjQuery.jQueryExtend({}, _StyleEnd);
                        _Block = jQueryJssorjQuery.jQueryExtend({}, _Blocks[columnRow]);

                        if (slideTransition.jQueryOpacity) {
                            _StyleEnd.jQueryOpacity = 2 - slideTransition.jQueryOpacity;
                        }

                        if (slideTransition.jQueryZIndex) {
                            _StyleEnd.jQueryZIndex = slideTransition.jQueryZIndex;
                            _StyleStart.jQueryZIndex = 0;
                        }

                        var allowClip = slideTransition.jQueryCols * slideTransition.jQueryRows > 1 || slideTransition.jQueryClip;

                        if (slideTransition.jQueryZoom || slideTransition.jQueryRotate) {
                            var allowRotate = true;
                            if (jQueryJssorjQuery.jQueryIsBrowserIE() && jQueryJssorjQuery.jQueryBrowserEngineVersion() < 9) {
                                if (slideTransition.jQueryCols * slideTransition.jQueryRows > 1)
                                    allowRotate = false;
                                else
                                    allowClip = false;
                            }

                            if (allowRotate) {
                                _StyleEnd.jQueryZoom = slideTransition.jQueryZoom ? slideTransition.jQueryZoom - 1 : 1;
                                _StyleStart.jQueryZoom = 1;

                                if (jQueryJssorjQuery.jQueryIsBrowserIe9Earlier() || jQueryJssorjQuery.jQueryIsBrowserOpera())
                                    _StyleEnd.jQueryZoom = Math.min(_StyleEnd.jQueryZoom, 2);

                                var rotate = slideTransition.jQueryRotate;

                                _StyleEnd.jQueryRotate = rotate * 360 * ((chessRotate) ? -1 : 1);
                                _StyleStart.jQueryRotate = 0;
                            }
                        }

                        if (allowClip) {
                            if (slideTransition.jQueryClip) {
                                var clipScale = slideTransition.jQueryScaleClip || 1;
                                var blockOffset = _Block.jQueryOffset = {};
                                if (topBenchmark && bottomBenchmark) {
                                    blockOffset.jQueryTop = _Blocks.jQueryHeight / 2 * clipScale;
                                    blockOffset.jQueryBottom = -blockOffset.jQueryTop;
                                }
                                else if (topBenchmark) {
                                    blockOffset.jQueryBottom = -_Blocks.jQueryHeight * clipScale;
                                }
                                else if (bottomBenchmark) {
                                    blockOffset.jQueryTop = _Blocks.jQueryHeight * clipScale;
                                }

                                if (leftBenchmark && rightBenchmark) {
                                    blockOffset.jQueryLeft = _Blocks.jQueryWidth / 2 * clipScale;
                                    blockOffset.jQueryRight = -blockOffset.jQueryLeft;
                                }
                                else if (leftBenchmark) {
                                    blockOffset.jQueryRight = -_Blocks.jQueryWidth * clipScale;
                                }
                                else if (rightBenchmark) {
                                    blockOffset.jQueryLeft = _Blocks.jQueryWidth * clipScale;
                                }
                            }

                            _StyleDif.jQueryClip = _Block;
                            _StyleStart.jQueryClip = _Blocks[columnRow];
                        }

                        //fly
                        {
                            var chessHor = chessHorizontal ? 1 : -1;
                            var chessVer = chessVertical ? 1 : -1;

                            if (slideTransition.x)
                                _StyleEnd.jQueryLeft += slideContainerWidth * slideTransition.x * chessHor;

                            if (slideTransition.y)
                                _StyleEnd.jQueryTop += slideContainerHeight * slideTransition.y * chessVer;
                        }

                        jQueryJssorjQuery.jQueryEach(_StyleEnd, function (propertyEnd, property) {
                            if (jQueryJssorjQuery.jQueryIsNumeric(propertyEnd)) {
                                if (propertyEnd != _StyleStart[property]) {
                                    _StyleDif[property] = propertyEnd - _StyleStart[property];
                                }
                            }
                        });

                        _StartStylesArr[columnRow] = _SlideOut ? _StyleStart : _StyleEnd;

                        var animationStylesArr = [];
                        var virtualFrameCount = Math.round(order * slideTransition.jQueryDelay / slideTransition.jQueryInterval);
                        _AnimationStylesArrs[columnRow] = new Array(virtualFrameCount);
                        _AnimationStylesArrs[columnRow].jQueryMin = virtualFrameCount;

                        var framesCount = slideTransition.jQueryFramesCount;
                        for (var frameN = 0; frameN <= framesCount; frameN++) {
                            var styleFrameN = {};

                            jQueryJssorjQuery.jQueryEach(_StyleDif, function (propertyDiff, property) {
                                var propertyEasings = slideTransition.jQueryEasingInstance[property] || slideTransition.jQueryEasingInstance.jQueryDefault;
                                var propertyEasingArray = propertyEasings[slideTransition.jQueryRound[property] || 1];

                                var propertyDuring = slideTransition.jQueryDuring[property] || [0, 1];
                                var propertyFrameN = (frameN / framesCount - propertyDuring[0]) / propertyDuring[1] * framesCount;
                                propertyFrameN = Math.round(Math.min(framesCount, Math.max(propertyFrameN, 0)));

                                var propertyEasingValue = propertyEasingArray[propertyFrameN];

                                if (jQueryJssorjQuery.jQueryIsNumeric(propertyDiff)) {
                                    styleFrameN[property] = _StyleStart[property] + propertyDiff * propertyEasingValue;
                                }
                                else {
                                    var value = styleFrameN[property] = jQueryJssorjQuery.jQueryExtend({}, _StyleStart[property]);
                                    value.jQueryOffset = [];
                                    jQueryJssorjQuery.jQueryEach(propertyDiff.jQueryOffset, function (rectX, n) {
                                        var offsetValue = rectX * propertyEasingValue;
                                        value.jQueryOffset[n] = offsetValue;
                                        value[n] += offsetValue;
                                    });
                                }
                            });

                            if (_StyleStart.jQueryZoom) {
                                styleFrameN.jQueryTransform = { jQueryRotate: styleFrameN.jQueryRotate || 0, jQueryScale: styleFrameN.jQueryZoom, jQueryOriginalWidth: slideContainerWidth, jQueryOriginalHeight: slideContainerHeight };
                            }
                            if (styleFrameN.jQueryClip && slideTransition.jQueryMove) {
                                var styleFrameNClipOffset = styleFrameN.jQueryClip.jQueryOffset;
                                var offsetY = (styleFrameNClipOffset.jQueryTop || 0) + (styleFrameNClipOffset.jQueryBottom || 0);
                                var offsetX = (styleFrameNClipOffset.jQueryLeft || 0) + (styleFrameNClipOffset.jQueryRight || 0);

                                styleFrameN.jQueryLeft = (styleFrameN.jQueryLeft || 0) + offsetX;
                                styleFrameN.jQueryTop = (styleFrameN.jQueryTop || 0) + offsetY;
                                styleFrameN.jQueryClip.jQueryLeft -= offsetX;
                                styleFrameN.jQueryClip.jQueryRight -= offsetX;
                                styleFrameN.jQueryClip.jQueryTop -= offsetY;
                                styleFrameN.jQueryClip.jQueryBottom -= offsetY;
                            }

                            styleFrameN.jQueryZIndex = styleFrameN.jQueryZIndex || 1;

                            _AnimationStylesArrs[columnRow].push(styleFrameN);
                        }

                    } //for
                });
            });

            _FormationInstance.reverse();
            jQueryJssorjQuery.jQueryEach(_FormationInstance, function (formationItems) {
                jQueryJssorjQuery.jQueryEach(formationItems, function (formationItem) {
                    var row = formationItem[0];
                    var col = formationItem[1];

                    var columnRow = row + ',' + col;

                    var image = slideElement;
                    if (col || row)
                        image = jQueryJssorjQuery.jQueryCloneNode(slideElement);

                    jQueryJssorjQuery.jQuerySetStyles(image, _StartStylesArr[columnRow]);
                    jQueryJssorjQuery.jQueryCssOverflow(image, "hidden");

                    jQueryJssorjQuery.jQueryCssPosition(image, "absolute");
                    slideContainer.jQueryAddClipElement(image);
                    _AnimationBlockItems[columnRow] = image;
                    jQueryJssorjQuery.jQueryShowElement(image, !_SlideOut);
                });
            });
        }
    }

    //JssorSlideshowRunner++++++++
    var _SlideshowRunnerCount = 1;
    jQueryJssorSlideshowRunnerjQuery = window.jQueryJssorSlideshowRunnerjQuery = function (slideContainer, slideContainerWidth, slideContainerHeight, slideshowOptions, handleTouchEventOnly) {

        var _SelfSlideshowRunner = this;

        //var _State = 0; //-1 fullfill, 0 clean, 1 initializing, 2 stay, 3 playing
        var _EndTime;

        var _SliderFrameCount;

        var _SlideshowPlayerBelow;
        var _SlideshowPlayerAbove;

        var _PrevItem;
        var _SlideItem;

        var _TransitionIndex = 0;
        var _TransitionsOrder = slideshowOptions.jQueryTransitionsOrder;

        var _SlideshowTransition;

        var _SlideshowPerformance = 8;

        function SlideshowProcessor() {
            var _SelfSlideshowProcessor = this;
            var _CurrentTime = 0;

            jQueryJssorAnimatorjQuery.call(_SelfSlideshowProcessor, 0, _EndTime);

            _SelfSlideshowProcessor.jQueryOnPositionChange = function (oldPosition, newPosition) {
                if ((newPosition - _CurrentTime) > _SlideshowPerformance) {
                    _CurrentTime = newPosition;

                    _SlideshowPlayerAbove && _SlideshowPlayerAbove.jQueryShowFrame(newPosition);
                    _SlideshowPlayerBelow && _SlideshowPlayerBelow.jQueryShowFrame(newPosition);
                }
            };

            _SelfSlideshowProcessor.jQueryTransition = _SlideshowTransition;
        }

        //member functions
        _SelfSlideshowRunner.jQueryGetTransition = function (slideCount) {
            var n = 0;

            var transitions = slideshowOptions.jQueryTransitions;

            var transitionCount = transitions.length;

            if (_TransitionsOrder) { /*Sequence*/
                //if (transitionCount > slideCount && (jQueryJssorjQuery.jQueryIsBrowserChrome() || jQueryJssorjQuery.jQueryIsBrowserSafari() || jQueryJssorjQuery.jQueryIsBrowserFireFox())) {
                //    transitionCount -= transitionCount % slideCount;
                //}
                n = _TransitionIndex++ % transitionCount;
            }
            else { /*Random*/
                n = Math.floor(Math.random() * transitionCount);
            }

            transitions[n] && (transitions[n].jQueryIndex = n);

            return transitions[n];
        };

        _SelfSlideshowRunner.jQueryInitialize = function (slideIndex, prevIndex, slideItem, prevItem, slideshowTransition) {
            jQueryJssorDebugjQuery.jQueryExecute(function () {
                if (_SlideshowPlayerBelow) {
                    jQueryJssorDebugjQuery.jQueryFail("slideshow runner has not been cleared.");
                }
            });

            _SlideshowTransition = slideshowTransition;

            slideshowTransition = EnsureTransitionInstance(slideshowTransition, _SlideshowPerformance);

            _SlideItem = slideItem;
            _PrevItem = prevItem;

            var prevSlideElement = prevItem.jQueryItem;
            var currentSlideElement = slideItem.jQueryItem;
            prevSlideElement["no-image"] = !prevItem.jQueryImage;
            currentSlideElement["no-image"] = !slideItem.jQueryImage;

            var slideElementAbove = prevSlideElement;
            var slideElementBelow = currentSlideElement;

            var slideTransitionAbove = slideshowTransition;
            var slideTransitionBelow = slideshowTransition.jQueryBrother || EnsureTransitionInstance({}, _SlideshowPerformance);

            if (!slideshowTransition.jQuerySlideOut) {
                slideElementAbove = currentSlideElement;
                slideElementBelow = prevSlideElement;
            }

            var shift = slideTransitionBelow.jQueryShift || 0;

            _SlideshowPlayerBelow = new JssorSlideshowPlayer(slideContainer, slideElementBelow, slideTransitionBelow, Math.max(shift - slideTransitionBelow.jQueryInterval, 0), slideContainerWidth, slideContainerHeight);
            _SlideshowPlayerAbove = new JssorSlideshowPlayer(slideContainer, slideElementAbove, slideTransitionAbove, Math.max(slideTransitionBelow.jQueryInterval - shift, 0), slideContainerWidth, slideContainerHeight);

            _SlideshowPlayerBelow.jQueryShowFrame(0);
            _SlideshowPlayerAbove.jQueryShowFrame(0);

            _EndTime = Math.max(_SlideshowPlayerBelow.jQueryEndTime, _SlideshowPlayerAbove.jQueryEndTime);

            _SelfSlideshowRunner.jQueryIndex = slideIndex;
        };

        _SelfSlideshowRunner.jQueryClear = function () {
            slideContainer.jQueryClear();
            _SlideshowPlayerBelow = null;
            _SlideshowPlayerAbove = null;
        };

        _SelfSlideshowRunner.jQueryGetProcessor = function () {
            var slideshowProcessor = null;

            if (_SlideshowPlayerAbove)
                slideshowProcessor = new SlideshowProcessor();

            return slideshowProcessor;
        };

        //Constructor
        {
            if (jQueryJssorjQuery.jQueryIsBrowserIe9Earlier() || jQueryJssorjQuery.jQueryIsBrowserOpera() || (handleTouchEventOnly && jQueryJssorjQuery.jQueryWebKitVersion() < 537)) {
                _SlideshowPerformance = 16;
            }

            jQueryJssorObjectjQuery.call(_SelfSlideshowRunner);
            jQueryJssorAnimatorjQuery.call(_SelfSlideshowRunner, -10000000, 10000000);

            jQueryJssorDebugjQuery.jQueryLiveStamp(_SelfSlideshowRunner, "slideshow_runner_" + _SlideshowRunnerCount++);
        }
    };
    //JssorSlideshowRunner--------

    //JssorSlider
    function JssorSlider(elmt, options) {
        var _SelfSlider = this;

        //private classes
        function Conveyor() {
            var _SelfConveyor = this;
            jQueryJssorAnimatorjQuery.call(_SelfConveyor, -100000000, 200000000);

            _SelfConveyor.jQueryGetCurrentSlideInfo = function () {
                var positionDisplay = _SelfConveyor.jQueryGetPosition_Display();
                var virtualIndex = Math.floor(positionDisplay);
                var slideIndex = GetRealIndex(virtualIndex);
                var slidePosition = positionDisplay - Math.floor(positionDisplay);

                return { jQueryIndex: slideIndex, jQueryVirtualIndex: virtualIndex, jQueryPosition: slidePosition };
            };

            _SelfConveyor.jQueryOnPositionChange = function (oldPosition, newPosition) {

                var index = Math.floor(newPosition);
                if (index != newPosition && newPosition > oldPosition)
                    index++;

                ResetNavigator(index, true);

                _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_POSITION_CHANGE, GetRealIndex(newPosition), GetRealIndex(oldPosition), newPosition, oldPosition);
            };
        }

        //Carousel
        function Carousel() {
            var _SelfCarousel = this;

            jQueryJssorAnimatorjQuery.call(_SelfCarousel, 0, 0, { jQueryLoopLength: _SlideCount });

            //Carousel Constructor
            {
                jQueryJssorjQuery.jQueryEach(_SlideItems, function (slideItem) {
                    (_Loop & 1) && slideItem.jQuerySetLoopLength(_SlideCount);
                    _SelfCarousel.jQueryChain(slideItem);
                    slideItem.jQueryShift(_ParkingPosition / _StepLength);
                });
            }
        }
        //Carousel

        //Slideshow
        function Slideshow() {
            var _SelfSlideshow = this;
            var _Wrapper = _SlideContainer.jQueryElmt;

            jQueryJssorAnimatorjQuery.call(_SelfSlideshow, -1, 2, { jQueryEasing: jQueryJssorEasingjQuery.jQueryEaseLinear, jQuerySetter: { jQueryPosition: SetPosition }, jQueryLoopLength: _SlideCount }, _Wrapper, { jQueryPosition: 1 }, { jQueryPosition: -1 });

            _SelfSlideshow.jQueryWrapper = _Wrapper;

            //Slideshow Constructor
            {
                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    jQueryJssorjQuery.jQueryAttribute(_SlideContainer.jQueryElmt, "debug-id", "slide_container");
                });
            }
        }
        //Slideshow

        //CarouselPlayer
        function CarouselPlayer(carousel, slideshow) {
            var _SelfCarouselPlayer = this;
            var _FromPosition;
            var _ToPosition;
            var _Duration;
            var _StandBy;
            var _StandByPosition;

            jQueryJssorAnimatorjQuery.call(_SelfCarouselPlayer, -100000000, 200000000, { jQueryIntervalMax: 100 });

            _SelfCarouselPlayer.jQueryOnStart = function () {
                _IsSliding = true;
                _LoadingTicket = null;

                //EVT_SWIPE_START
                _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_SWIPE_START, GetRealIndex(_Conveyor.jQueryGetPosition()), _Conveyor.jQueryGetPosition());
            };

            _SelfCarouselPlayer.jQueryOnStop = function () {

                _IsSliding = false;
                _StandBy = false;

                var currentSlideInfo = _Conveyor.jQueryGetCurrentSlideInfo();

                //EVT_SWIPE_END
                _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_SWIPE_END, GetRealIndex(_Conveyor.jQueryGetPosition()), _Conveyor.jQueryGetPosition());

                if (!currentSlideInfo.jQueryPosition) {
                    OnPark(currentSlideInfo.jQueryVirtualIndex, _CurrentSlideIndex);
                }
            };

            _SelfCarouselPlayer.jQueryOnPositionChange = function (oldPosition, newPosition) {

                var toPosition;

                if (_StandBy)
                    toPosition = _StandByPosition;
                else {
                    toPosition = _ToPosition;

                    if (_Duration) {
                        var interPosition = newPosition / _Duration;
                        //if (jQueryJssorjQuery.jQueryIsBrowserChrome() || jQueryJssorjQuery.jQueryIsBrowserFireFox()) {
                        //    Math.round(interPosition * 8 / _Duration) / 8 * _Duration;

                        //    if (jQueryJssorjQuery.jQueryBrowserVersion() < 38)
                        //        interPosition = parseFloat(interPosition.toFixed(4));
                        //}
                        toPosition = _Options.jQuerySlideEasing(interPosition) * (_ToPosition - _FromPosition) + _FromPosition;
                    }
                }

                _Conveyor.jQueryGoToPosition(toPosition);
            };

            _SelfCarouselPlayer.jQueryPlayCarousel = function (fromPosition, toPosition, duration, callback) {
                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    if (_SelfCarouselPlayer.jQueryIsPlaying())
                        jQueryJssorDebugjQuery.jQueryFail("The carousel is already playing.");
                });

                _FromPosition = fromPosition;
                _ToPosition = toPosition;
                _Duration = duration;

                _Conveyor.jQueryGoToPosition(fromPosition);
                _SelfCarouselPlayer.jQueryGoToPosition(0);

                _SelfCarouselPlayer.jQueryPlayToPosition(duration, callback);
            };

            _SelfCarouselPlayer.jQueryStandBy = function (standByPosition) {
                _StandBy = true;
                _StandByPosition = standByPosition;
                _SelfCarouselPlayer.jQueryPlay(standByPosition, null, true);
            };

            _SelfCarouselPlayer.jQuerySetStandByPosition = function (standByPosition) {
                _StandByPosition = standByPosition;
            };

            _SelfCarouselPlayer.jQueryMoveCarouselTo = function (position) {
                _Conveyor.jQueryGoToPosition(position);
            };

            //CarouselPlayer Constructor
            {
                _Conveyor = new Conveyor();

                _Conveyor.jQueryCombine(carousel);
                _Conveyor.jQueryCombine(slideshow);
            }
        }
        //CarouselPlayer

        //SlideContainer
        function SlideContainer() {
            var _Self = this;
            var elmt = CreatePanel();

            jQueryJssorjQuery.jQueryCssZIndex(elmt, 0);
            jQueryJssorjQuery.jQueryCss(elmt, "pointerEvents", "none");

            _Self.jQueryElmt = elmt;

            _Self.jQueryAddClipElement = function (clipElement) {
                jQueryJssorjQuery.jQueryAppendChild(elmt, clipElement);
                jQueryJssorjQuery.jQueryShowElement(elmt);
            };

            _Self.jQueryClear = function () {
                jQueryJssorjQuery.jQueryHideElement(elmt);
                jQueryJssorjQuery.jQueryClearInnerHtml(elmt);
            };
        }
        //SlideContainer

        //SlideItem
        function SlideItem(slideElmt, slideIndex) {

            var _SelfSlideItem = this;

            var _CaptionSliderIn;
            var _CaptionSliderOut;
            var _CaptionSliderCurrent;
            var _IsCaptionSliderPlayingWhenDragStart;

            var _Wrapper;
            var _BaseElement = slideElmt;

            var _LoadingScreen;

            var _ImageItem;
            var _ImageElmts = [];
            var _LinkItemOrigin;
            var _LinkItem;
            var _ImageLoading;
            var _ImageLoaded;
            var _ImageLazyLoading;
            var _ContentRefreshed;

            var _Processor;

            var _PlayerInstanceElement;
            var _PlayerInstance;

            var _SequenceNumber;    //for debug only

            jQueryJssorAnimatorjQuery.call(_SelfSlideItem, -_DisplayPieces, _DisplayPieces + 1, { jQuerySlideItemAnimator: true });

            function ResetCaptionSlider(fresh) {
                _CaptionSliderOut && _CaptionSliderOut.jQueryRevert();
                _CaptionSliderIn && _CaptionSliderIn.jQueryRevert();

                RefreshContent(slideElmt, fresh);
                _ContentRefreshed = true;

                _CaptionSliderIn = new _CaptionSliderOptions.jQueryClass(slideElmt, _CaptionSliderOptions, 1);
                jQueryJssorDebugjQuery.jQueryLiveStamp(_CaptionSliderIn, "caption_slider_" + _CaptionSliderCount + "_in");
                _CaptionSliderOut = new _CaptionSliderOptions.jQueryClass(slideElmt, _CaptionSliderOptions);
                jQueryJssorDebugjQuery.jQueryLiveStamp(_CaptionSliderOut, "caption_slider_" + _CaptionSliderCount + "_out");

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    _CaptionSliderCount++;
                });

                _CaptionSliderOut.jQueryGoToBegin();
                _CaptionSliderIn.jQueryGoToBegin();
            }

            function EnsureCaptionSliderVersion() {
                if (_CaptionSliderIn.jQueryVersion < _CaptionSliderOptions.jQueryVersion) {
                    ResetCaptionSlider();
                }
            }

            //event handling begin
            function LoadImageCompleteEventHandler(completeCallback, loadingScreen, image) {
                if (!_ImageLoaded) {
                    _ImageLoaded = true;

                    if (_ImageItem && image) {
                        var imageWidth = image.width;
                        var imageHeight = image.height;
                        var fillWidth = imageWidth;
                        var fillHeight = imageHeight;

                        if (imageWidth && imageHeight && _Options.jQueryFillMode) {

                            //0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
                            if (_Options.jQueryFillMode & 3 && (!(_Options.jQueryFillMode & 4) || imageWidth > _SlideWidth || imageHeight > _SlideHeight)) {
                                var fitHeight = false;
                                var ratio = _SlideWidth / _SlideHeight * imageHeight / imageWidth;

                                if (_Options.jQueryFillMode & 1) {
                                    fitHeight = (ratio > 1);
                                }
                                else if (_Options.jQueryFillMode & 2) {
                                    fitHeight = (ratio < 1);
                                }
                                fillWidth = fitHeight ? imageWidth * _SlideHeight / imageHeight : _SlideWidth;
                                fillHeight = fitHeight ? _SlideHeight : imageHeight * _SlideWidth / imageWidth;
                            }

                            jQueryJssorjQuery.jQueryCssWidth(_ImageItem, fillWidth);
                            jQueryJssorjQuery.jQueryCssHeight(_ImageItem, fillHeight);
                            jQueryJssorjQuery.jQueryCssTop(_ImageItem, (_SlideHeight - fillHeight) / 2);
                            jQueryJssorjQuery.jQueryCssLeft(_ImageItem, (_SlideWidth - fillWidth) / 2);
                        }

                        jQueryJssorjQuery.jQueryCssPosition(_ImageItem, "absolute");

                        _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_LOAD_END, slideItem);
                    }
                }

                jQueryJssorjQuery.jQueryHideElement(loadingScreen);
                completeCallback && completeCallback(_SelfSlideItem);
            }

            function LoadSlideshowImageCompleteEventHandler(nextIndex, nextItem, slideshowTransition, loadingTicket) {
                if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex && _AutoPlay) {
                    if (!_Frozen) {
                        var nextRealIndex = GetRealIndex(nextIndex);
                        _SlideshowRunner.jQueryInitialize(nextRealIndex, slideIndex, nextItem, _SelfSlideItem, slideshowTransition);
                        nextItem.jQueryHideContentForSlideshow();
                        _Slideshow.jQueryLocate(nextRealIndex, 1);
                        _Slideshow.jQueryGoToPosition(nextRealIndex);
                        _CarouselPlayer.jQueryPlayCarousel(nextIndex, nextIndex, 0);
                    }
                }
            }

            function SlideReadyEventHandler(loadingTicket) {
                if (loadingTicket == _LoadingTicket && _CurrentSlideIndex == slideIndex) {

                    if (!_Processor) {
                        var slideshowProcessor = null;
                        if (_SlideshowRunner) {
                            if (_SlideshowRunner.jQueryIndex == slideIndex)
                                slideshowProcessor = _SlideshowRunner.jQueryGetProcessor();
                            else
                                _SlideshowRunner.jQueryClear();
                        }

                        EnsureCaptionSliderVersion();

                        _Processor = new Processor(slideIndex, slideshowProcessor, _SelfSlideItem.jQueryGetCaptionSliderIn(), _SelfSlideItem.jQueryGetCaptionSliderOut());
                        _Processor.jQuerySetPlayer(_PlayerInstance);
                    }

                    !_Processor.jQueryIsPlaying() && _Processor.jQueryReplay();
                }
            }

            function ParkEventHandler(currentIndex, previousIndex, manualActivate) {
                if (currentIndex == slideIndex) {

                    if (currentIndex != previousIndex)
                        _SlideItems[previousIndex] && _SlideItems[previousIndex].jQueryParkOut();
                    else
                        !manualActivate && _Processor && _Processor.jQueryAdjustIdleOnPark();

                    _PlayerInstance && _PlayerInstance.jQueryEnable();

                    //park in
                    var loadingTicket = _LoadingTicket = jQueryJssorjQuery.jQueryGetNow();
                    _SelfSlideItem.jQueryLoadImage(jQueryJssorjQuery.jQueryCreateCallback(null, SlideReadyEventHandler, loadingTicket));
                }
                else {
                    var distance = Math.abs(slideIndex - currentIndex);
                    var loadRange = _DisplayPieces + _Options.jQueryLazyLoading;
                    if (!_ImageLazyLoading || distance <= loadRange || _SlideCount - distance <= loadRange) {
                        _SelfSlideItem.jQueryLoadImage();
                    }
                }
            }

            function SwipeStartEventHandler() {
                if (_CurrentSlideIndex == slideIndex && _Processor) {
                    _Processor.jQueryStop();
                    _PlayerInstance && _PlayerInstance.jQueryQuit();
                    _PlayerInstance && _PlayerInstance.jQueryDisable();
                    _Processor.jQueryOpenSlideshowPanel();
                }
            }

            function FreezeEventHandler() {
                if (_CurrentSlideIndex == slideIndex && _Processor) {
                    _Processor.jQueryStop();
                }
            }

            function LinkClickEventHandler(event) {
                if (_LastDragSucceded) {
                    jQueryJssorjQuery.jQueryCancelEvent(event);
                }
                else {
                    _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_CLICK, slideIndex, event);
                }
            }

            function PlayerAvailableEventHandler() {
                _PlayerInstance = _PlayerInstanceElement.pInstance;
                _Processor && _Processor.jQuerySetPlayer(_PlayerInstance);
            }

            _SelfSlideItem.jQueryLoadImage = function (completeCallback, loadingScreen) {
                loadingScreen = loadingScreen || _LoadingScreen;

                if (_ImageElmts.length && !_ImageLoaded) {

                    jQueryJssorjQuery.jQueryShowElement(loadingScreen);

                    if (!_ImageLoading) {
                        _ImageLoading = true;
                        _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_LOAD_START);

                        jQueryJssorjQuery.jQueryEach(_ImageElmts, function (imageElmt) {

                            if (!imageElmt.src) {
                                imageElmt.src = jQueryJssorjQuery.jQueryAttributeEx(imageElmt, "src2");
                                jQueryJssorjQuery.jQueryCssDisplay(imageElmt, imageElmt["display-origin"]);
                            }
                        });
                    }
                    jQueryJssorjQuery.jQueryLoadImages(_ImageElmts, _ImageItem, jQueryJssorjQuery.jQueryCreateCallback(null, LoadImageCompleteEventHandler, completeCallback, loadingScreen));
                }
                else {
                    LoadImageCompleteEventHandler(completeCallback, loadingScreen);
                }
            };

            _SelfSlideItem.jQueryGoForNextSlide = function () {
                if (_SlideshowRunner) {
                    var slideshowTransition = _SlideshowRunner.jQueryGetTransition(_SlideCount);

                    if (slideshowTransition) {
                        var loadingTicket = _LoadingTicket = jQueryJssorjQuery.jQueryGetNow();

                        var nextIndex = slideIndex + _PlayReverse;
                        var nextItem = _SlideItems[GetRealIndex(nextIndex)];
                        return nextItem.jQueryLoadImage(jQueryJssorjQuery.jQueryCreateCallback(null, LoadSlideshowImageCompleteEventHandler, nextIndex, nextItem, slideshowTransition, loadingTicket), _LoadingScreen);
                    }
                }

                PlayTo(_CurrentSlideIndex + _Options.jQueryAutoPlaySteps * _PlayReverse);
            };

            _SelfSlideItem.jQueryTryActivate = function () {
                ParkEventHandler(slideIndex, slideIndex, true);
            };

            _SelfSlideItem.jQueryParkOut = function () {
                //park out
                _PlayerInstance && _PlayerInstance.jQueryQuit();
                _PlayerInstance && _PlayerInstance.jQueryDisable();
                _SelfSlideItem.jQueryUnhideContentForSlideshow();
                _Processor && _Processor.jQueryAbort();
                _Processor = null;
                ResetCaptionSlider();
            };

            //for debug only
            _SelfSlideItem.jQueryStampSlideItemElements = function (stamp) {
                stamp = _SequenceNumber + "_" + stamp;

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    if (_ImageItem)
                        jQueryJssorjQuery.jQueryAttribute(_ImageItem, "debug-id", stamp + "_slide_item_image_id");

                    jQueryJssorjQuery.jQueryAttribute(slideElmt, "debug-id", stamp + "_slide_item_item_id");
                });

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    jQueryJssorjQuery.jQueryAttribute(_Wrapper, "debug-id", stamp + "_slide_item_wrapper_id");
                });

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    jQueryJssorjQuery.jQueryAttribute(_LoadingScreen, "debug-id", stamp + "_loading_container_id");
                });
            };

            _SelfSlideItem.jQueryHideContentForSlideshow = function () {
                jQueryJssorjQuery.jQueryHideElement(slideElmt);
            };

            _SelfSlideItem.jQueryUnhideContentForSlideshow = function () {
                jQueryJssorjQuery.jQueryShowElement(slideElmt);
            };

            _SelfSlideItem.jQueryEnablePlayer = function () {
                _PlayerInstance && _PlayerInstance.jQueryEnable();
            };

            function RefreshContent(elmt, fresh, level) {
                if (elmt["jssor-slider"])
                    return;

                level = level || 0;

                if (!_ContentRefreshed) {
                    if (elmt.tagName == "IMG") {
                        _ImageElmts.push(elmt);

                        if (!elmt.src) {
                            _ImageLazyLoading = true;
                            elmt["display-origin"] = jQueryJssorjQuery.jQueryCssDisplay(elmt);
                            jQueryJssorjQuery.jQueryHideElement(elmt);
                        }
                    }
                    if (jQueryJssorjQuery.jQueryIsBrowserIe9Earlier()) {
                        jQueryJssorjQuery.jQueryCssZIndex(elmt, (jQueryJssorjQuery.jQueryCssZIndex(elmt) || 0) + 1);
                    }
                    if (_Options.jQueryHWA && jQueryJssorjQuery.jQueryWebKitVersion()) {
                        if (!_IsTouchDevice || jQueryJssorjQuery.jQueryWebKitVersion() < 534 || (!_SlideshowEnabled && !jQueryJssorjQuery.jQueryIsBrowserChrome())) {
                            jQueryJssorjQuery.jQueryEnableHWA(elmt);
                        }
                    }
                }

                var childElements = jQueryJssorjQuery.jQueryChildren(elmt);

                jQueryJssorjQuery.jQueryEach(childElements, function (childElement, i) {

                    var uAttribute = jQueryJssorjQuery.jQueryAttributeEx(childElement, "u");
                    if (uAttribute == "player" && !_PlayerInstanceElement) {
                        _PlayerInstanceElement = childElement;
                        if (_PlayerInstanceElement.pInstance) {
                            PlayerAvailableEventHandler();
                        }
                        else {
                            jQueryJssorjQuery.jQueryAddEvent(_PlayerInstanceElement, "dataavailable", PlayerAvailableEventHandler);
                        }
                    }

                    if (uAttribute == "caption") {
                        if (!jQueryJssorjQuery.jQueryIsBrowserIE() && !fresh) {
                            var captionElement = jQueryJssorjQuery.jQueryCloneNode(childElement);
                            jQueryJssorjQuery.jQueryInsertBefore(elmt, captionElement, childElement);
                            jQueryJssorjQuery.jQueryRemoveChild(elmt, childElement);
                            childElement = captionElement;

                            fresh = true;
                        }
                    }
                    else if (!_ContentRefreshed && !level && !_ImageItem && jQueryJssorjQuery.jQueryAttributeEx(childElement, "u") == "image") {
                        _ImageItem = childElement;

                        if (_ImageItem) {
                            if (_ImageItem.tagName == "A") {
                                _LinkItemOrigin = _ImageItem;
                                jQueryJssorjQuery.jQuerySetStyles(_LinkItemOrigin, _StyleDef);

                                _LinkItem = jQueryJssorjQuery.jQueryCloneNode(_ImageItem, true);
                                //cancel click event on <A> element when a drag of slide succeeded
                                jQueryJssorjQuery.jQueryAddEvent(_LinkItem, "click", LinkClickEventHandler);

                                jQueryJssorjQuery.jQuerySetStyles(_LinkItem, _StyleDef);
                                jQueryJssorjQuery.jQueryCssDisplay(_LinkItem, "block");
                                jQueryJssorjQuery.jQueryCssOpacity(_LinkItem, 0);
                                jQueryJssorjQuery.jQueryCss(_LinkItem, "backgroundColor", "#000");

                                _ImageItem = jQueryJssorjQuery.jQueryFindChildByTag(_ImageItem, "IMG");

                                jQueryJssorDebugjQuery.jQueryExecute(function () {
                                    if (!_ImageItem) {
                                        jQueryJssorDebugjQuery.jQueryError("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n" + elmt.outerHTML);
                                    }
                                });
                            }
                            _ImageItem.border = 0;

                            jQueryJssorjQuery.jQuerySetStyles(_ImageItem, _StyleDef);
                        }
                    }

                    RefreshContent(childElement, fresh, level + 1);
                });
            }

            _SelfSlideItem.jQueryOnInnerOffsetChange = function (oldOffset, newOffset) {
                var slidePosition = _DisplayPieces - newOffset;

                SetPosition(_Wrapper, slidePosition);

                //following lines are for future usage, not ready yet
                //if (!_IsDragging || !_IsCaptionSliderPlayingWhenDragStart) {
                //    var _DealWithParallax;
                //    if (IsCurrentSlideIndex(slideIndex)) {
                //        if (_CaptionSliderOptions.jQueryPlayOutMode == 2)
                //            _DealWithParallax = true;
                //    }
                //    else {
                //        if (!_CaptionSliderOptions.jQueryPlayInMode) {
                //            //PlayInMode: 0 none
                //            _CaptionSliderIn.jQueryGoToEnd();
                //        }
                //        //else if (_CaptionSliderOptions.jQueryPlayInMode == 1) {
                //        //    //PlayInMode: 1 chain
                //        //    _CaptionSliderIn.jQueryGoToBegin();
                //        //}
                //        else if (_CaptionSliderOptions.jQueryPlayInMode == 2) {
                //            //PlayInMode: 2 parallel
                //            _DealWithParallax = true;
                //        }
                //    }

                //    if (_DealWithParallax) {
                //        _CaptionSliderIn.jQueryGoToPosition((_CaptionSliderIn.jQueryGetPosition_OuterEnd() - _CaptionSliderIn.jQueryGetPosition_OuterBegin()) * Math.abs(newOffset - 1) * .8 + _CaptionSliderIn.jQueryGetPosition_OuterBegin());
                //    }
                //}
            };

            _SelfSlideItem.jQueryGetCaptionSliderIn = function () {
                return _CaptionSliderIn;
            };

            _SelfSlideItem.jQueryGetCaptionSliderOut = function () {
                return _CaptionSliderOut;
            };

            _SelfSlideItem.jQueryIndex = slideIndex;

            jQueryJssorObjectjQuery.call(_SelfSlideItem);

            //SlideItem Constructor
            {

                var thumb = jQueryJssorjQuery.jQueryFindChild(slideElmt, "thumb", true);
                if (thumb) {
                    _SelfSlideItem.jQueryThumb = jQueryJssorjQuery.jQueryCloneNode(thumb);
                    jQueryJssorjQuery.jQueryRemoveAttribute(thumb, "id");
                    jQueryJssorjQuery.jQueryHideElement(thumb);
                }
                jQueryJssorjQuery.jQueryShowElement(slideElmt);

                _LoadingScreen = jQueryJssorjQuery.jQueryCloneNode(_LoadingContainer);
                jQueryJssorjQuery.jQueryCssZIndex(_LoadingScreen, 1000);

                //cancel click event on <A> element when a drag of slide succeeded
                jQueryJssorjQuery.jQueryAddEvent(slideElmt, "click", LinkClickEventHandler);

                ResetCaptionSlider(true);

                _SelfSlideItem.jQueryImage = _ImageItem;
                _SelfSlideItem.jQueryLink = _LinkItem;

                _SelfSlideItem.jQueryItem = slideElmt;

                _SelfSlideItem.jQueryWrapper = _Wrapper = slideElmt;
                jQueryJssorjQuery.jQueryAppendChild(_Wrapper, _LoadingScreen);

                _SelfSlider.jQueryOn(203, ParkEventHandler);
                _SelfSlider.jQueryOn(28, FreezeEventHandler);
                _SelfSlider.jQueryOn(24, SwipeStartEventHandler);

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    _SequenceNumber = _SlideItemCreatedCount++;
                });

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    jQueryJssorjQuery.jQueryAttribute(_Wrapper, "debug-id", "slide-" + slideIndex);
                });
            }
        }
        //SlideItem

        //Processor
        function Processor(slideIndex, slideshowProcessor, captionSliderIn, captionSliderOut) {

            var _SelfProcessor = this;

            var _ProgressBegin = 0;
            var _SlideshowBegin = 0;
            var _SlideshowEnd;
            var _CaptionInBegin;
            var _IdleBegin;
            var _IdleEnd;
            var _ProgressEnd;

            var _IsSlideshowRunning;
            var _IsRollingBack;

            var _PlayerInstance;
            var _IsPlayerOnService;

            var slideItem = _SlideItems[slideIndex];

            jQueryJssorAnimatorjQuery.call(_SelfProcessor, 0, 0);

            function UpdateLink() {

                jQueryJssorjQuery.jQueryClearChildren(_LinkContainer);

                if (_ShowLink && _IsSlideshowRunning && slideItem.jQueryLink) {
                    jQueryJssorjQuery.jQueryAppendChild(_LinkContainer, slideItem.jQueryLink);
                }

                jQueryJssorjQuery.jQueryShowElement(_LinkContainer, !_IsSlideshowRunning && slideItem.jQueryImage);
            }

            function ProcessCompleteEventHandler() {

                if (_IsRollingBack) {
                    _IsRollingBack = false;
                    _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_ROLLBACK_END, slideIndex, _IdleEnd, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                    _SelfProcessor.jQueryGoToPosition(_IdleBegin);
                }

                _SelfProcessor.jQueryReplay();
            }

            function PlayerSwitchEventHandler(isOnService) {
                _IsPlayerOnService = isOnService;

                _SelfProcessor.jQueryStop();
                _SelfProcessor.jQueryReplay();
            }

            _SelfProcessor.jQueryReplay = function () {

                var currentPosition = _SelfProcessor.jQueryGetPosition_Display();

                if (!_IsDragging && !_IsSliding && !_IsPlayerOnService && _CurrentSlideIndex == slideIndex) {

                    if (!currentPosition) {
                        if (_SlideshowEnd && !_IsSlideshowRunning) {
                            _IsSlideshowRunning = true;

                            _SelfProcessor.jQueryOpenSlideshowPanel(true);

                            _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_SLIDESHOW_START, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                        }

                        UpdateLink();
                    }

                    var toPosition;
                    var stateEvent = JssorSlider.jQueryEVT_STATE_CHANGE;

                    if (currentPosition != _ProgressEnd) {
                        if (currentPosition == _IdleEnd) {
                            toPosition = _ProgressEnd;
                        }
                        else if (currentPosition == _IdleBegin) {
                            toPosition = _IdleEnd;
                        }
                        else if (!currentPosition) {
                            toPosition = _IdleBegin;
                        }
                        else if (currentPosition > _IdleEnd) {
                            _IsRollingBack = true;
                            toPosition = _IdleEnd;
                            stateEvent = JssorSlider.jQueryEVT_ROLLBACK_START;
                        }
                        else {
                            //continue from break (by drag or lock)
                            toPosition = _SelfProcessor.jQueryGetPlayToPosition();
                        }
                    }

                    //jQueryJssorDebugjQuery.jQueryExecute(function () {
                    //    if (currentPosition == _ProgressEnd) {
                    //        debugger;
                    //    }
                    //});

                    _SelfSlider.jQueryTriggerEvent(stateEvent, slideIndex, currentPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);

                    var allowAutoPlay = _AutoPlay && (!_HoverToPause || _NotOnHover);

                    if (currentPosition == _ProgressEnd) {
                        (_IdleEnd != _ProgressEnd && !(_HoverToPause & 12) || allowAutoPlay) && slideItem.jQueryGoForNextSlide();
                    }
                    else if (allowAutoPlay || currentPosition != _IdleEnd) {
                        _SelfProcessor.jQueryPlayToPosition(toPosition, ProcessCompleteEventHandler);
                    }
                }
            };

            _SelfProcessor.jQueryAdjustIdleOnPark = function () {
                if (_IdleEnd == _ProgressEnd && _IdleEnd == _SelfProcessor.jQueryGetPosition_Display())
                    _SelfProcessor.jQueryGoToPosition(_IdleBegin);
            };

            _SelfProcessor.jQueryAbort = function () {
                _SlideshowRunner && _SlideshowRunner.jQueryIndex == slideIndex && _SlideshowRunner.jQueryClear();

                var currentPosition = _SelfProcessor.jQueryGetPosition_Display();
                if (currentPosition < _ProgressEnd) {
                    _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_STATE_CHANGE, slideIndex, -currentPosition -1, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
                }
            };

            _SelfProcessor.jQueryOpenSlideshowPanel = function (open) {
                if (slideshowProcessor) {
                    jQueryJssorjQuery.jQueryCssOverflow(_SlideshowPanel, open && slideshowProcessor.jQueryTransition.jQueryOutside ? "" : "hidden");
                }
            };

            _SelfProcessor.jQueryOnInnerOffsetChange = function (oldPosition, newPosition) {

                if (_IsSlideshowRunning && newPosition >= _SlideshowEnd) {
                    _IsSlideshowRunning = false;
                    UpdateLink();
                    slideItem.jQueryUnhideContentForSlideshow();
                    _SlideshowRunner.jQueryClear();

                    _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_SLIDESHOW_END, slideIndex, _ProgressBegin, _SlideshowBegin, _SlideshowEnd, _ProgressEnd);
                }

                _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_PROGRESS_CHANGE, slideIndex, newPosition, _ProgressBegin, _IdleBegin, _IdleEnd, _ProgressEnd);
            };

            _SelfProcessor.jQuerySetPlayer = function (playerInstance) {
                if (playerInstance && !_PlayerInstance) {
                    _PlayerInstance = playerInstance;

                    playerInstance.jQueryOn(jQueryJssorPlayerjQuery.jQueryEVT_SWITCH, PlayerSwitchEventHandler);
                }
            };

            //Processor Constructor
            {
                if (slideshowProcessor) {
                    _SelfProcessor.jQueryChain(slideshowProcessor);
                }

                _SlideshowEnd = _SelfProcessor.jQueryGetPosition_OuterEnd();
                _CaptionInBegin = _SelfProcessor.jQueryGetPosition_OuterEnd();
                _SelfProcessor.jQueryChain(captionSliderIn);
                _IdleBegin = captionSliderIn.jQueryGetPosition_OuterEnd();
                _IdleEnd = _IdleBegin + _Options.jQueryAutoPlayInterval;

                captionSliderOut.jQueryShift(_IdleEnd);
                _SelfProcessor.jQueryCombine(captionSliderOut);
                _ProgressEnd = _SelfProcessor.jQueryGetPosition_OuterEnd();
            }
        }
        //Processor
        //private classes

        function SetPosition(elmt, position) {
            var orientation = _DragOrientation > 0 ? _DragOrientation : _PlayOrientation;
            var x = _StepLengthX * position * (orientation & 1);
            var y = _StepLengthY * position * ((orientation >> 1) & 1);

            if (jQueryJssorjQuery.jQueryIsBrowserChrome() && jQueryJssorjQuery.jQueryBrowserVersion() < 38) {
                x = x.toFixed(3);
                y = y.toFixed(3);
            }
            else {
                x = Math.round(x);
                y = Math.round(y);
            }

            if (jQueryJssorjQuery.jQueryIsBrowserIE() && jQueryJssorjQuery.jQueryBrowserVersion() >= 10 && jQueryJssorjQuery.jQueryBrowserVersion() < 11) {
                elmt.style.msTransform = "translate(" + x + "px, " + y + "px)";
            }
            else if (jQueryJssorjQuery.jQueryIsBrowserChrome() && jQueryJssorjQuery.jQueryBrowserVersion() >= 30 && jQueryJssorjQuery.jQueryBrowserVersion() < 34) {
                elmt.style.WebkitTransition = "transform 0s";
                elmt.style.WebkitTransform = "translate3d(" + x + "px, " + y + "px, 0px) perspective(2000px)";
            }
            else {
                jQueryJssorjQuery.jQueryCssLeft(elmt, x);
                jQueryJssorjQuery.jQueryCssTop(elmt, y);
            }
        }

        //Event handling begin

        function OnMouseDown(event) {
            var tagName = jQueryJssorjQuery.jQueryEventSrc(event).tagName;
            if (!_DragOrientationRegistered && tagName != "INPUT" && tagName != "TEXTAREA" && tagName != "SELECT" && RegisterDrag()) {
                OnDragStart(event);
            }
        }

        function RecordFreezePoint() {

            _CarouselPlaying_OnFreeze = _IsSliding;
            _PlayToPosition_OnFreeze = _CarouselPlayer.jQueryGetPlayToPosition();
            _Position_OnFreeze = _Conveyor.jQueryGetPosition();

        }

        function Freeze() {

            RecordFreezePoint();

            if (_IsDragging || !_NotOnHover && (_HoverToPause & 12)) {
                _CarouselPlayer.jQueryStop();

                _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_FREEZE);
            }

        }

        function Unfreeze(byDrag) {

            byDrag && RecordFreezePoint();

            if (!_IsDragging && (_NotOnHover || !(_HoverToPause & 12)) && !_CarouselPlayer.jQueryIsPlaying()) {

                var currentPosition = _Conveyor.jQueryGetPosition();
                var toPosition = Math.ceil(_Position_OnFreeze);

                if (byDrag && Math.abs(_DragOffsetTotal) >= _Options.jQueryMinDragOffsetToSlide) {
                    toPosition = Math.ceil(currentPosition);
                    toPosition += _DragIndexAdjust;
                }

                if (!(_Loop & 1)) {
                    toPosition = Math.min(_SlideCount - _DisplayPieces, Math.max(toPosition, 0));
                }

                var t = Math.abs(toPosition - currentPosition);
                t = 1 - Math.pow(1 - t, 5);

                if (!_LastDragSucceded && _CarouselPlaying_OnFreeze) {
                    _CarouselPlayer.jQueryContinue(_PlayToPosition_OnFreeze);
                }
                else if (currentPosition == toPosition) {
                    _CurrentSlideItem.jQueryEnablePlayer();
                    _CurrentSlideItem.jQueryTryActivate();
                }
                else {

                    _CarouselPlayer.jQueryPlayCarousel(currentPosition, toPosition, t * _SlideDuration);
                }
            }
        }

        function OnDragStart(event) {

            _IsDragging = true;
            _DragInvalid = false;
            _LoadingTicket = null;

            jQueryJssorjQuery.jQueryAddEvent(document, _MoveEvent, OnDragMove);

            _LastTimeMoveByDrag = jQueryJssorjQuery.jQueryGetNow() - 50;

            _LastDragSucceded = 0;
            Freeze();

            if (!_CarouselPlaying_OnFreeze)
                _DragOrientation = 0;

            if (_HandleTouchEventOnly) {
                var touchPoint = event.touches[0];
                _DragStartMouseX = touchPoint.clientX;
                _DragStartMouseY = touchPoint.clientY;
            }
            else {
                var mousePoint = jQueryJssorjQuery.jQueryMousePosition(event);

                _DragStartMouseX = mousePoint.x;
                _DragStartMouseY = mousePoint.y;

                jQueryJssorjQuery.jQueryCancelEvent(event);
            }

            _DragOffsetTotal = 0;
            _DragOffsetLastTime = 0;
            _DragIndexAdjust = 0;

            //Trigger EVT_DRAGSTART
            _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_DRAG_START, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);
        }

        function OnDragMove(event) {
            if (_IsDragging && (!jQueryJssorjQuery.jQueryIsBrowserIe9Earlier() || event.button)) {
                var actionPoint;

                if (_HandleTouchEventOnly) {
                    var touches = event.touches;
                    if (touches && touches.length > 0) {
                        actionPoint = { x: touches[0].clientX, y: touches[0].clientY };
                    }
                }
                else {
                    actionPoint = jQueryJssorjQuery.jQueryMousePosition(event);
                }

                if (actionPoint) {
                    var distanceX = actionPoint.x - _DragStartMouseX;
                    var distanceY = actionPoint.y - _DragStartMouseY;


                    if (Math.floor(_Position_OnFreeze) != _Position_OnFreeze)
                        _DragOrientation = _DragOrientation || (_PlayOrientation & _DragOrientationRegistered);

                    if ((distanceX || distanceY) && !_DragOrientation) {
                        if (_DragOrientationRegistered == 3) {
                            if (Math.abs(distanceY) > Math.abs(distanceX)) {
                                _DragOrientation = 2;
                            }
                            else
                                _DragOrientation = 1;
                        }
                        else {
                            _DragOrientation = _DragOrientationRegistered;
                        }

                        if (_IsTouchDevice && _DragOrientation == 1 && Math.abs(distanceY) - Math.abs(distanceX) > 3) {
                            _DragInvalid = true;
                        }
                    }

                    if (_DragOrientation) {
                        var distance = distanceY;
                        var stepLength = _StepLengthY;

                        if (_DragOrientation == 1) {
                            distance = distanceX;
                            stepLength = _StepLengthX;
                        }

                        if (!(_Loop & 1)) {
                            if (distance > 0) {
                                var normalDistance = stepLength * _CurrentSlideIndex;
                                var sqrtDistance = distance - normalDistance;
                                if (sqrtDistance > 0) {
                                    distance = normalDistance + Math.sqrt(sqrtDistance) * 5;
                                }
                            }

                            if (distance < 0) {
                                var normalDistance = stepLength * (_SlideCount - _DisplayPieces - _CurrentSlideIndex);
                                var sqrtDistance = -distance - normalDistance;

                                if (sqrtDistance > 0) {
                                    distance = -normalDistance - Math.sqrt(sqrtDistance) * 5;
                                }
                            }
                        }

                        if (_DragOffsetTotal - _DragOffsetLastTime < -2) {
                            _DragIndexAdjust = 0;
                        }
                        else if (_DragOffsetTotal - _DragOffsetLastTime > 2) {
                            _DragIndexAdjust = -1;
                        }

                        _DragOffsetLastTime = _DragOffsetTotal;
                        _DragOffsetTotal = distance;
                        _PositionToGoByDrag = _Position_OnFreeze - _DragOffsetTotal / stepLength / (_ScaleRatio || 1);

                        if (_DragOffsetTotal && _DragOrientation && !_DragInvalid) {
                            jQueryJssorjQuery.jQueryCancelEvent(event);
                            if (!_IsSliding) {
                                _CarouselPlayer.jQueryStandBy(_PositionToGoByDrag);
                            }
                            else
                                _CarouselPlayer.jQuerySetStandByPosition(_PositionToGoByDrag);
                        }
                        else if (jQueryJssorjQuery.jQueryIsBrowserIe9Earlier()) {
                            jQueryJssorjQuery.jQueryCancelEvent(event);
                        }
                    }
                }
            }
            else {
                OnDragEnd(event);
            }
        }

        function OnDragEnd(event) {
            UnregisterDrag();

            if (_IsDragging) {

                _IsDragging = false;

                _LastTimeMoveByDrag = jQueryJssorjQuery.jQueryGetNow();

                jQueryJssorjQuery.jQueryRemoveEvent(document, _MoveEvent, OnDragMove);

                _LastDragSucceded = _DragOffsetTotal;

                _LastDragSucceded && jQueryJssorjQuery.jQueryCancelEvent(event);

                _CarouselPlayer.jQueryStop();

                var currentPosition = _Conveyor.jQueryGetPosition();

                //Trigger EVT_DRAG_END
                _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_DRAG_END, GetRealIndex(currentPosition), currentPosition, GetRealIndex(_Position_OnFreeze), _Position_OnFreeze, event);

                Unfreeze(true);
            }
        }
        //Event handling end

        function SetCurrentSlideIndex(index) {
            _PrevSlideItem = _SlideItems[_CurrentSlideIndex];
            _PreviousSlideIndex = _CurrentSlideIndex;
            _CurrentSlideIndex = GetRealIndex(index);
            _CurrentSlideItem = _SlideItems[_CurrentSlideIndex];
            ResetNavigator(index);
            return _CurrentSlideIndex;
        }

        function OnPark(slideIndex, prevIndex) {
            _DragOrientation = 0;

            SetCurrentSlideIndex(slideIndex);

            //Trigger EVT_PARK
            _SelfSlider.jQueryTriggerEvent(JssorSlider.jQueryEVT_PARK, GetRealIndex(slideIndex), prevIndex);
        }

        function ResetNavigator(index, temp) {
            _TempSlideIndex = index;
            jQueryJssorjQuery.jQueryEach(_Navigators, function (navigator) {
                navigator.jQuerySetCurrentIndex(GetRealIndex(index), index, temp);
            });
        }

        function RegisterDrag() {
            var dragRegistry = JssorSlider.jQueryDragRegistry || 0;
            var dragOrientation = _DragEnabled;
            if (_IsTouchDevice)
                (dragOrientation & 1) && (dragOrientation &= 1);
            JssorSlider.jQueryDragRegistry |= dragOrientation;

            return (_DragOrientationRegistered = dragOrientation & ~dragRegistry);
        }

        function UnregisterDrag() {
            if (_DragOrientationRegistered) {
                JssorSlider.jQueryDragRegistry &= ~_DragEnabled;
                _DragOrientationRegistered = 0;
            }
        }

        function CreatePanel() {
            var div = jQueryJssorjQuery.jQueryCreateDiv();

            jQueryJssorjQuery.jQuerySetStyles(div, _StyleDef);
            jQueryJssorjQuery.jQueryCssPosition(div, "absolute");

            return div;
        }

        function GetRealIndex(index) {
            return (index % _SlideCount + _SlideCount) % _SlideCount;
        }

        function IsCurrentSlideIndex(index) {
            return GetRealIndex(index) == _CurrentSlideIndex;
        }

        function IsPreviousSlideIndex(index) {
            return GetRealIndex(index) == _PreviousSlideIndex;
        }

        //Navigation Request Handler
        function NavigationClickHandler(index, relative) {
            if (relative) {
                if (!_Loop) {
                    //Stop at threshold
                    index = Math.min(Math.max(index + _TempSlideIndex, 0), _SlideCount - _DisplayPieces);
                    relative = false;
                }
                else if (_Loop & 2) {
                    //Rewind
                    index = GetRealIndex(index + _TempSlideIndex);
                    relative = false;
                }
            }
            PlayTo(index, _Options.jQuerySlideDuration, relative);
        }

        function ShowNavigators() {
            jQueryJssorjQuery.jQueryEach(_Navigators, function (navigator) {
                navigator.jQueryShow(navigator.jQueryOptions.jQueryChanceToShow <= _NotOnHover);
            });
        }

        function MainContainerMouseLeaveEventHandler() {
            if (!_NotOnHover) {

                //jQueryJssorDebugjQuery.jQueryLog("mouseleave");

                _NotOnHover = 1;

                ShowNavigators();

                if (!_IsDragging) {
                    (_HoverToPause & 12) && Unfreeze();
                    (_HoverToPause & 3) && _SlideItems[_CurrentSlideIndex].jQueryTryActivate();
                }
            }
        }

        function MainContainerMouseEnterEventHandler() {

            if (_NotOnHover) {

                //jQueryJssorDebugjQuery.jQueryLog("mouseenter");

                _NotOnHover = 0;

                ShowNavigators();

                _IsDragging || !(_HoverToPause & 12) || Freeze();
            }
        }

        function AdjustSlidesContainerSize() {
            _StyleDef = { jQueryWidth: _SlideWidth, jQueryHeight: _SlideHeight, jQueryTop: 0, jQueryLeft: 0 };

            jQueryJssorjQuery.jQueryEach(_SlideElmts, function (slideElmt, i) {

                jQueryJssorjQuery.jQuerySetStyles(slideElmt, _StyleDef);
                jQueryJssorjQuery.jQueryCssPosition(slideElmt, "absolute");
                jQueryJssorjQuery.jQueryCssOverflow(slideElmt, "hidden");

                jQueryJssorjQuery.jQueryHideElement(slideElmt);
            });

            jQueryJssorjQuery.jQuerySetStyles(_LoadingContainer, _StyleDef);
        }

        function PlayToOffset(offset, slideDuration) {
            PlayTo(offset, slideDuration, true);
        }

        function PlayTo(slideIndex, slideDuration, relative) {
            ///	<summary>
            ///		PlayTo( slideIndex [, slideDuration] ); //Play slider to position 'slideIndex' within a period calculated base on 'slideDuration'.
            ///	</summary>
            ///	<param name="slideIndex" type="Number">
            ///		slide slideIndex or position will be playing to
            ///	</param>
            ///	<param name="slideDuration" type="Number" optional="true">
            ///		base slide duration in milliseconds to calculate the whole duration to complete this play request.
            ///	    default value is 'jQuerySlideDuration' value which is specified when initialize the slider.
            ///	</param>
            /// http://msdn.microsoft.com/en-us/library/vstudio/bb385682.aspx
            /// http://msdn.microsoft.com/en-us/library/vstudio/hh542720.aspx
            if (_CarouselEnabled && (!_IsDragging || _Options.jQueryNaviQuitDrag)) {
                _IsSliding = true;
                _IsDragging = false;
                _CarouselPlayer.jQueryStop();

                {
                    //Slide Duration
                    if (slideDuration == undefined)
                        slideDuration = _SlideDuration;

                    var positionDisplay = _Carousel.jQueryGetPosition_Display();
                    var positionTo = slideIndex;
                    if (relative) {
                        positionTo = positionDisplay + slideIndex;
                        if (slideIndex > 0)
                            positionTo = Math.ceil(positionTo);
                        else
                            positionTo = Math.floor(positionTo);
                    }


                    if (!(_Loop & 1)) {
                        positionTo = GetRealIndex(positionTo);
                        positionTo = Math.max(0, Math.min(positionTo, _SlideCount - _DisplayPieces));
                    }

                    var positionOffset = (positionTo - positionDisplay) % _SlideCount;
                    positionTo = positionDisplay + positionOffset;

                    var duration = positionDisplay == positionTo ? 0 : slideDuration * Math.abs(positionOffset);
                    duration = Math.min(duration, slideDuration * _DisplayPieces * 1.5);

                    _CarouselPlayer.jQueryPlayCarousel(positionDisplay, positionTo, duration || 1);
                }
            }
        }

        //private functions

        //member functions

        _SelfSlider.jQueryPlayTo = PlayTo;

        _SelfSlider.jQueryGoTo = function (slideIndex) {
            ///	<summary>
            ///		instance.jQueryGoTo( slideIndex );   //Go to the specifed slide immediately with no play.
            ///	</summary>
            PlayTo(slideIndex, 1);
        };

        _SelfSlider.jQueryNext = function () {
            ///	<summary>
            ///		instance.jQueryNext();   //Play the slider to next slide.
            ///	</summary>
            PlayToOffset(1);
        };

        _SelfSlider.jQueryPrev = function () {
            ///	<summary>
            ///		instance.jQueryPrev();   //Play the slider to previous slide.
            ///	</summary>
            PlayToOffset(-1);
        };

        _SelfSlider.jQueryPause = function () {
            ///	<summary>
            ///		instance.jQueryPause();   //Pause the slider, prevent it from auto playing.
            ///	</summary>
            _AutoPlay = false;
        };

        _SelfSlider.jQueryPlay = function () {
            ///	<summary>
            ///		instance.jQueryPlay();   //Start auto play if the slider is currently paused.
            ///	</summary>
            if (!_AutoPlay) {
                _AutoPlay = true;
                _SlideItems[_CurrentSlideIndex] && _SlideItems[_CurrentSlideIndex].jQueryTryActivate();
            }
        };

        _SelfSlider.jQuerySetSlideshowTransitions = function (transitions) {
            ///	<summary>
            ///		instance.jQuerySetSlideshowTransitions( transitions );   //Reset slideshow transitions for the slider.
            ///	</summary>
            jQueryJssorDebugjQuery.jQueryExecute(function () {
                if (!transitions || !transitions.length) {
                    jQueryJssorDebugjQuery.jQueryError("Can not set slideshow transitions, no transitions specified.");
                }
            });

            jQueryJssorjQuery.jQueryTranslateTransitions(transitions);    //for old transition compatibility
            _Options.jQuerySlideshowOptions.jQueryTransitions = transitions;
        };

        _SelfSlider.jQuerySetCaptionTransitions = function (transitions) {
            ///	<summary>
            ///		instance.jQuerySetCaptionTransitions( transitions );   //Reset caption transitions for the slider.
            ///	</summary>
            jQueryJssorDebugjQuery.jQueryExecute(function () {
                if (!transitions || !transitions.length) {
                    jQueryJssorDebugjQuery.jQueryError("Can not set caption transitions, no transitions specified");
                }
            });

            jQueryJssorjQuery.jQueryTranslateTransitions(transitions);    //for old transition compatibility
            _CaptionSliderOptions.jQueryCaptionTransitions = transitions;
            _CaptionSliderOptions.jQueryVersion = jQueryJssorjQuery.jQueryGetNow();
        };

        _SelfSlider.jQuerySlidesCount = function () {
            ///	<summary>
            ///		instance.jQuerySlidesCount();   //Retrieve slides count of the slider.
            ///	</summary>
            return _SlideElmts.length;
        };

        _SelfSlider.jQueryCurrentIndex = function () {
            ///	<summary>
            ///		instance.jQueryCurrentIndex();   //Retrieve current slide index of the slider.
            ///	</summary>
            return _CurrentSlideIndex;
        };

        _SelfSlider.jQueryIsAutoPlaying = function () {
            ///	<summary>
            ///		instance.jQueryIsAutoPlaying();   //Retrieve auto play status of the slider.
            ///	</summary>
            return _AutoPlay;
        };

        _SelfSlider.jQueryIsDragging = function () {
            ///	<summary>
            ///		instance.jQueryIsDragging();   //Retrieve drag status of the slider.
            ///	</summary>
            return _IsDragging;
        };

        _SelfSlider.jQueryIsSliding = function () {
            ///	<summary>
            ///		instance.jQueryIsSliding();   //Retrieve right<-->left sliding status of the slider.
            ///	</summary>
            return _IsSliding;
        };

        _SelfSlider.jQueryIsMouseOver = function () {
            ///	<summary>
            ///		instance.jQueryIsMouseOver();   //Retrieve mouse over status of the slider.
            ///	</summary>
            return !_NotOnHover;
        };

        _SelfSlider.jQueryLastDragSucceded = function () {
            ///	<summary>
            ///		instance.jQueryIsLastDragSucceded();   //Retrieve last drag succeded status, returns 0 if failed, returns drag offset if succeded
            ///	</summary>
            return _LastDragSucceded;
        };

        function OriginalWidth() {
            ///	<summary>
            ///		instance.jQueryOriginalWidth();   //Retrieve original width of the slider.
            ///	</summary>
            return jQueryJssorjQuery.jQueryCssWidth(_ScaleWrapper || elmt);
        }

        function OriginalHeight() {
            ///	<summary>
            ///		instance.jQueryOriginalHeight();   //Retrieve original height of the slider.
            ///	</summary>
            return jQueryJssorjQuery.jQueryCssHeight(_ScaleWrapper || elmt);
        }

        _SelfSlider.jQueryOriginalWidth = _SelfSlider.jQueryGetOriginalWidth = OriginalWidth;

        _SelfSlider.jQueryOriginalHeight = _SelfSlider.jQueryGetOriginalHeight = OriginalHeight;

        function Scale(dimension, isHeight) {
            ///	<summary>
            ///		instance.jQueryScaleWidth();   //Retrieve scaled dimension the slider currently displays.
            ///		instance.jQueryScaleWidth( dimension );   //Scale the slider to new width and keep aspect ratio.
            ///	</summary>

            if (dimension == undefined)
                return jQueryJssorjQuery.jQueryCssWidth(elmt);

            jQueryJssorDebugjQuery.jQueryExecute(function () {
                if (!dimension || dimension < 0) {
                    jQueryJssorDebugjQuery.jQueryFail("'jQueryScaleWidth' error, 'dimension' should be positive value.");
                }
            });

            if (!_ScaleWrapper) {
                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    var originalWidthStr = jQueryJssorjQuery.jQueryCss(elmt, "width");
                    var originalHeightStr = jQueryJssorjQuery.jQueryCss(elmt, "height");
                    var originalWidth = jQueryJssorjQuery.jQueryCssP(elmt, "width");
                    var originalHeight = jQueryJssorjQuery.jQueryCssP(elmt, "height");

                    if (!originalWidthStr) {
                        jQueryJssorDebugjQuery.jQueryFail("Cannot scale jssor slider, 'dimension' of 'outer container' not specified. Please specify 'dimension' in pixel. e.g. 'dimension: 600px;'");
                    }

                    if (!originalHeightStr) {
                        jQueryJssorDebugjQuery.jQueryFail("Cannot scale jssor slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                    }

                    if (originalWidthStr.indexOf('%') != -1) {
                        jQueryJssorDebugjQuery.jQueryFail("Cannot scale jssor slider, 'dimension' of 'outer container' not valid. Please specify 'dimension' in pixel. e.g. 'dimension: 600px;'");
                    }

                    if (originalHeightStr.indexOf('%') != -1) {
                        jQueryJssorDebugjQuery.jQueryFail("Cannot scale jssor slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");
                    }

                    if (!originalWidth) {
                        jQueryJssorDebugjQuery.jQueryFail("Cannot scale jssor slider, 'dimension' of 'outer container' not valid. 'dimension' of 'outer container' should be positive number. e.g. 'dimension: 600px;'");
                    }

                    if (!originalHeight) {
                        jQueryJssorDebugjQuery.jQueryFail("Cannot scale jssor slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'");
                    }
                });

                var innerWrapper = jQueryJssorjQuery.jQueryCreateDiv(document);
                jQueryJssorjQuery.jQueryCssCssText(innerWrapper, jQueryJssorjQuery.jQueryCssCssText(elmt));
                jQueryJssorjQuery.jQueryClassName(innerWrapper, jQueryJssorjQuery.jQueryClassName(elmt));

                jQueryJssorjQuery.jQueryCssPosition(innerWrapper, "relative");
                jQueryJssorjQuery.jQueryCssTop(innerWrapper, 0);
                jQueryJssorjQuery.jQueryCssLeft(innerWrapper, 0);
                jQueryJssorjQuery.jQueryCssOverflow(innerWrapper, "visible");

                _ScaleWrapper = jQueryJssorjQuery.jQueryCreateDiv(document);

                jQueryJssorjQuery.jQueryCssPosition(_ScaleWrapper, "absolute");
                jQueryJssorjQuery.jQueryCssTop(_ScaleWrapper, 0);
                jQueryJssorjQuery.jQueryCssLeft(_ScaleWrapper, 0);
                jQueryJssorjQuery.jQueryCssWidth(_ScaleWrapper, jQueryJssorjQuery.jQueryCssWidth(elmt));
                jQueryJssorjQuery.jQueryCssHeight(_ScaleWrapper, jQueryJssorjQuery.jQueryCssHeight(elmt));
                jQueryJssorjQuery.jQuerySetStyleTransformOrigin(_ScaleWrapper, "0 0");

                jQueryJssorjQuery.jQueryAppendChild(_ScaleWrapper, innerWrapper);

                var children = jQueryJssorjQuery.jQueryChildren(elmt);
                jQueryJssorjQuery.jQueryAppendChild(elmt, _ScaleWrapper);

                jQueryJssorjQuery.jQueryCss(elmt, "backgroundImage", "");

                var noMoveElmts = {
                    "navigator": _BulletNavigatorOptions && _BulletNavigatorOptions.jQueryScale == false,
                    "arrowleft": _ArrowNavigatorOptions && _ArrowNavigatorOptions.jQueryScale == false,
                    "arrowright": _ArrowNavigatorOptions && _ArrowNavigatorOptions.jQueryScale == false,
                    "thumbnavigator": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.jQueryScale == false,
                    "thumbwrapper": _ThumbnailNavigatorOptions && _ThumbnailNavigatorOptions.jQueryScale == false
                };

                jQueryJssorjQuery.jQueryEach(children, function (child) {
                    jQueryJssorjQuery.jQueryAppendChild(noMoveElmts[jQueryJssorjQuery.jQueryAttributeEx(child, "u")] ? elmt : innerWrapper, child);
                });

                jQueryJssorjQuery.jQueryShowElement(innerWrapper);
                jQueryJssorjQuery.jQueryShowElement(_ScaleWrapper);
            }

            jQueryJssorDebugjQuery.jQueryExecute(function () {
                if (!_InitialScrollWidth) {
                    _InitialScrollWidth = _SelfSlider.jQueryElmt.scrollWidth;
                }
            });

            _ScaleRatio = dimension /  (isHeight? jQueryJssorjQuery.jQueryCssHeight : jQueryJssorjQuery.jQueryCssWidth)(_ScaleWrapper);
            jQueryJssorjQuery.jQueryCssScale(_ScaleWrapper, _ScaleRatio);

            jQueryJssorjQuery.jQueryCssWidth(elmt, isHeight ? (_ScaleRatio * OriginalWidth()) : dimension);
            jQueryJssorjQuery.jQueryCssHeight(elmt, isHeight ? dimension : (_ScaleRatio * OriginalHeight()));

            jQueryJssorjQuery.jQueryEach(_Navigators, function (navigator) {
                navigator.jQueryRelocate();
            });
        }

        _SelfSlider.jQueryScaleHeight = _SelfSlider.jQueryGetScaleHeight = function (height) {
            ///	<summary>
            ///		instance.jQueryScaleHeight();   //Retrieve scaled height the slider currently displays.
            ///		instance.jQueryScaleHeight( dimension );   //Scale the slider to new height and keep aspect ratio.
            ///	</summary>

            if (height == undefined)
                return jQueryJssorjQuery.jQueryCssHeight(elmt);

            Scale(height, true);
        };

        _SelfSlider.jQueryScaleWidth = _SelfSlider.jQuerySetScaleWidth = _SelfSlider.jQueryGetScaleWidth = Scale;

        _SelfSlider.jQueryGetVirtualIndex = function (index) {
            var parkingIndex = Math.ceil(GetRealIndex(_ParkingPosition / _StepLength));
            var displayIndex = GetRealIndex(index - _CurrentSlideIndex + parkingIndex);

            if (displayIndex > _DisplayPieces) {
                if (index - _CurrentSlideIndex > _SlideCount / 2)
                    index -= _SlideCount;
                else if (index - _CurrentSlideIndex <= -_SlideCount / 2)
                    index += _SlideCount;
            }
            else {
                index = _CurrentSlideIndex + displayIndex - parkingIndex;
            }

            return index;
        };

        //member functions

        jQueryJssorObjectjQuery.call(_SelfSlider);

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            var outerContainerElmt = jQueryJssorjQuery.jQueryGetElement(elmt);
            if (!outerContainerElmt)
                jQueryJssorDebugjQuery.jQueryFail("Outer container '" + elmt + "' not found.");
        });

        //initialize member variables
        _SelfSlider.jQueryElmt = elmt = jQueryJssorjQuery.jQueryGetElement(elmt);
        //initialize member variables

        var _InitialScrollWidth;    //for debug only
        var _CaptionSliderCount = 1;    //for debug only

        var _Options = jQueryJssorjQuery.jQueryExtend({
            jQueryFillMode: 0,                   //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
            jQueryLazyLoading: 1,                //[Optional] For image with  lazy loading format (<IMG src2="url" .../>), by default it will be loaded only when the slide comes.
            //But an integer value (maybe 0, 1, 2 or 3) indicates that how far of nearby slides should be loaded immediately as well, default value is 1.
            jQueryStartIndex: 0,                 //[Optional] Index of slide to display when initialize, default value is 0
            jQueryAutoPlay: false,               //[Optional] Whether to auto play, default value is false
            jQueryLoop: 1,                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
            jQueryHWA: true,                     //[Optional] Enable hardware acceleration or not, default value is true
            jQueryNaviQuitDrag: true,
            jQueryAutoPlaySteps: 1,              //[Optional] Steps to go of every play (this options applys only when slideshow disabled), default value is 1
            jQueryAutoPlayInterval: 3000,        //[Optional] Interval to play next slide since the previous stopped if a slideshow is auto playing, default value is 3000
            jQueryPauseOnHover: 1,               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            jQuerySlideDuration: 500,            //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 400
            jQuerySlideEasing: jQueryJssorEasingjQuery.jQueryEaseOutQuad,   //[Optional] Specifies easing for right to left animation, default value is jQueryJssorEasingjQuery.jQueryEaseOutQuad
            jQueryMinDragOffsetToSlide: 20,      //[Optional] Minimum drag offset that trigger slide, default value is 20
            jQuerySlideSpacing: 0, 				//[Optional] Space between each slide in pixels, default value is 0
            jQueryDisplayPieces: 1,              //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), default value is 1
            jQueryParkingPosition: 0,            //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            jQueryUISearchMode: 1,               //[Optional] The way (0 parellel, 1 recursive, default value is recursive) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc.
            jQueryPlayOrientation: 1,            //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            jQueryDragOrientation: 1             //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 both, default value is 1 (Note that the jQueryDragOrientation should be the same as jQueryPlayOrientation when jQueryDisplayPieces is greater than 1, or parking position is not 0)

        }, options);

        //Sodo statement for development time intellisence only
        jQueryJssorDebugjQuery.jQueryExecute(function () {
            _Options = jQueryJssorjQuery.jQueryExtend({
                jQueryArrowKeyNavigation: undefined,
                jQuerySlideWidth: undefined,
                jQuerySlideHeight: undefined,
                jQuerySlideshowOptions: undefined,
                jQueryCaptionSliderOptions: undefined,
                jQueryBulletNavigatorOptions: undefined,
                jQueryArrowNavigatorOptions: undefined,
                jQueryThumbnailNavigatorOptions: undefined
            },
            _Options);
        });

        var _PlayOrientation = _Options.jQueryPlayOrientation & 3;
        var _PlayReverse = (_Options.jQueryPlayOrientation & 4) / -4 || 1;

        var _SlideshowOptions = _Options.jQuerySlideshowOptions;
        var _CaptionSliderOptions = jQueryJssorjQuery.jQueryExtend({ jQueryClass: jQueryJssorCaptionSliderBasejQuery, jQueryPlayInMode: 1, jQueryPlayOutMode: 1 }, _Options.jQueryCaptionSliderOptions);
        jQueryJssorjQuery.jQueryTranslateTransitions(_CaptionSliderOptions.jQueryCaptionTransitions); //for old transition compatibility
        var _BulletNavigatorOptions = _Options.jQueryBulletNavigatorOptions;
        var _ArrowNavigatorOptions = _Options.jQueryArrowNavigatorOptions;
        var _ThumbnailNavigatorOptions = _Options.jQueryThumbnailNavigatorOptions;

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (_SlideshowOptions && !_SlideshowOptions.jQueryClass) {
                jQueryJssorDebugjQuery.jQueryFail("Option jQuerySlideshowOptions error, class not specified.");
            }
        });

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (_Options.jQueryCaptionSliderOptions && !_Options.jQueryCaptionSliderOptions.jQueryClass) {
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryCaptionSliderOptions error, class not specified.");
            }
        });

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (_BulletNavigatorOptions && !_BulletNavigatorOptions.jQueryClass) {
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryBulletNavigatorOptions error, class not specified.");
            }
        });

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (_ArrowNavigatorOptions && !_ArrowNavigatorOptions.jQueryClass) {
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryArrowNavigatorOptions error, class not specified.");
            }
        });

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorOptions.jQueryClass) {
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryThumbnailNavigatorOptions error, class not specified.");
            }
        });

        var _UISearchNoDeep = !_Options.jQueryUISearchMode;
        var _ScaleWrapper;
        var _SlidesContainer = jQueryJssorjQuery.jQueryFindChild(elmt, "slides", _UISearchNoDeep);
        var _LoadingContainer = jQueryJssorjQuery.jQueryFindChild(elmt, "loading", _UISearchNoDeep) || jQueryJssorjQuery.jQueryCreateDiv(document);

        var _BulletNavigatorContainer = jQueryJssorjQuery.jQueryFindChild(elmt, "navigator", _UISearchNoDeep);

        var _ArrowLeft = jQueryJssorjQuery.jQueryFindChild(elmt, "arrowleft", _UISearchNoDeep);
        var _ArrowRight = jQueryJssorjQuery.jQueryFindChild(elmt, "arrowright", _UISearchNoDeep);

        var _ThumbnailNavigatorContainer = jQueryJssorjQuery.jQueryFindChild(elmt, "thumbnavigator", _UISearchNoDeep);

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            //if (_BulletNavigatorOptions && !_BulletNavigatorContainer) {
            //    throw new Error("jQueryBulletNavigatorOptions specified but bullet navigator container (<div u=\"navigator\" ...) not defined.");
            //}
            if (_BulletNavigatorContainer && !_BulletNavigatorOptions) {
                throw new Error("Bullet navigator container defined but jQueryBulletNavigatorOptions not specified.");
            }

            //if (_ArrowNavigatorOptions) {
            //    if (!_ArrowLeft) {
            //        throw new Error("jQueryArrowNavigatorOptions specified, but arrowleft (<span u=\"arrowleft\" ...) not defined.");
            //    }

            //    if (!_ArrowRight) {
            //        throw new Error("jQueryArrowNavigatorOptions specified, but arrowright (<span u=\"arrowright\" ...) not defined.");
            //    }
            //}

            if ((_ArrowLeft || _ArrowRight) && !_ArrowNavigatorOptions) {
                throw new Error("arrowleft or arrowright defined, but jQueryArrowNavigatorOptions not specified.");
            }

            //if (_ThumbnailNavigatorOptions && !_ThumbnailNavigatorContainer) {
            //    throw new Error("jQueryThumbnailNavigatorOptions specified, but thumbnail navigator container (<div u=\"thumbnavigator\" ...) not defined.");
            //}

            if (_ThumbnailNavigatorContainer && !_ThumbnailNavigatorOptions) {
                throw new Error("Thumbnail navigator container defined, but jQueryThumbnailNavigatorOptions not specified.");
            }
        });

        var _SlidesContainerWidth = jQueryJssorjQuery.jQueryCssWidth(_SlidesContainer);
        var _SlidesContainerHeight = jQueryJssorjQuery.jQueryCssHeight(_SlidesContainer);

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (isNaN(_SlidesContainerWidth))
                jQueryJssorDebugjQuery.jQueryFail("Width of slides container wrong specification, it should be specified in pixel (like style='width: 600px;').");

            if (_SlidesContainerWidth == undefined)
                jQueryJssorDebugjQuery.jQueryFail("Width of slides container not specified, it should be specified in pixel (like style='width: 600px;').");

            if (isNaN(_SlidesContainerHeight))
                jQueryJssorDebugjQuery.jQueryFail("Height of slides container wrong specification, it should be specified in pixel (like style='height: 300px;').");

            if (_SlidesContainerHeight == undefined)
                jQueryJssorDebugjQuery.jQueryFail("Height of slides container not specified, it should be specified in pixel (like style='height: 300px;').");

            var slidesContainerOverflow = jQueryJssorjQuery.jQueryCssOverflow(_SlidesContainer);
            var slidesContainerOverflowX = jQueryJssorjQuery.jQueryCss(_SlidesContainer, "overflowX");
            var slidesContainerOverflowY = jQueryJssorjQuery.jQueryCss(_SlidesContainer, "overflowY");
            if (slidesContainerOverflow != "hidden" && (slidesContainerOverflowX != "hidden" || slidesContainerOverflowY != "hidden"))
                jQueryJssorDebugjQuery.jQueryFail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').");

            //var slidesContainerTop = jQueryJssorjQuery.jQueryCssTop(_SlidesContainer);
            //var slidesContainerLeft = jQueryJssorjQuery.jQueryCssLeft(_SlidesContainer);

            //if (isNaN(slidesContainerTop))
            //    jQueryJssorDebugjQuery.jQueryFail("Top of slides container wrong specification, it should be specified in pixel (like style='top: 0px;').");

            //if (slidesContainerTop == undefined)
            //    jQueryJssorDebugjQuery.jQueryFail("Top of slides container not specified, it should be specified in pixel (like style='top: 0px;').");

            //if (isNaN(slidesContainerLeft))
            //    jQueryJssorDebugjQuery.jQueryFail("Left of slides container wrong specification, it should be specified in pixel (like style='left: 0px;').");

            //if (slidesContainerLeft == undefined)
            //    jQueryJssorDebugjQuery.jQueryFail("Left of slides container not specified, it should be specified in pixel (like style='left: 0px;').");
        });

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!jQueryJssorjQuery.jQueryIsNumeric(_Options.jQueryDisplayPieces))
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryDisplayPieces error, it should be a numeric value and greater than or equal to 1.");

            if (_Options.jQueryDisplayPieces < 1)
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryDisplayPieces error, it should be greater than or equal to 1.");

            if (_Options.jQueryDisplayPieces > 1 && _Options.jQueryDragOrientation && _Options.jQueryDragOrientation != _PlayOrientation)
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryDragOrientation error, it should be 0 or the same of jQueryPlayOrientation when jQueryDisplayPieces is greater than 1.");

            if (!jQueryJssorjQuery.jQueryIsNumeric(_Options.jQueryParkingPosition))
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryParkingPosition error, it should be a numeric value.");

            if (_Options.jQueryParkingPosition && _Options.jQueryDragOrientation && _Options.jQueryDragOrientation != _PlayOrientation)
                jQueryJssorDebugjQuery.jQueryFail("Option jQueryDragOrientation error, it should be 0 or the same of jQueryPlayOrientation when jQueryParkingPosition is not equal to 0.");
        });

        var _StyleDef;

        var _SlideElmts = [];

        {
            var slideElmts = jQueryJssorjQuery.jQueryChildren(_SlidesContainer);
            jQueryJssorjQuery.jQueryEach(slideElmts, function (slideElmt) {
                if (slideElmt.tagName == "DIV" && !jQueryJssorjQuery.jQueryAttributeEx(slideElmt, "u")) {
                    _SlideElmts.push(slideElmt);
                }
            });
        }

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (_SlideElmts.length < 1) {
                jQueryJssorDebugjQuery.jQueryError("Slides html code definition error, there must be at least 1 slide to initialize a slider.");
            }
        });

        var _SlideItemCreatedCount = 0; //for debug only
        var _SlideItemReleasedCount = 0;    //for debug only

        var _PreviousSlideIndex;
        var _CurrentSlideIndex = -1;
        var _TempSlideIndex;
        var _PrevSlideItem;
        var _CurrentSlideItem;
        var _SlideCount = _SlideElmts.length;

        var _SlideWidth = _Options.jQuerySlideWidth || _SlidesContainerWidth;
        var _SlideHeight = _Options.jQuerySlideHeight || _SlidesContainerHeight;

        var _SlideSpacing = _Options.jQuerySlideSpacing;
        var _StepLengthX = _SlideWidth + _SlideSpacing;
        var _StepLengthY = _SlideHeight + _SlideSpacing;
        var _StepLength = (_PlayOrientation & 1) ? _StepLengthX : _StepLengthY;
        var _DisplayPieces = Math.min(_Options.jQueryDisplayPieces, _SlideCount);

        var _SlideshowPanel;
        var _CurrentBoardIndex = 0;
        var _DragOrientation;
        var _DragOrientationRegistered;
        var _DragInvalid;

        var _HandleTouchEventOnly;
        var _IsTouchDevice;

        var _Navigators = [];
        var _BulletNavigator;
        var _ArrowNavigator;
        var _ThumbnailNavigator;

        var _ShowLink;

        var _Frozen;
        var _AutoPlay;
        var _AutoPlaySteps = _Options.jQueryAutoPlaySteps;
        var _HoverToPause = _Options.jQueryPauseOnHover;
        var _AutoPlayInterval = _Options.jQueryAutoPlayInterval;
        var _SlideDuration = _Options.jQuerySlideDuration;

        var _SlideshowRunnerClass;
        var _TransitionsOrder;

        var _SlideshowEnabled;
        var _ParkingPosition;
        var _CarouselEnabled = _DisplayPieces < _SlideCount;
        var _Loop = _CarouselEnabled ? _Options.jQueryLoop : 0;

        var _DragEnabled;
        var _LastDragSucceded;

        var _NotOnHover = 1;   //0 Hovering, 1 Not hovering

        //Variable Definition
        var _IsSliding;
        var _IsDragging;
        var _LoadingTicket;

        //The X position of mouse/touch when a drag start
        var _DragStartMouseX = 0;
        //The Y position of mouse/touch when a drag start
        var _DragStartMouseY = 0;
        var _DragOffsetTotal;
        var _DragOffsetLastTime;
        var _DragIndexAdjust;

        var _Carousel;
        var _Conveyor;
        var _Slideshow;
        var _CarouselPlayer;
        var _SlideContainer = new SlideContainer();
        var _ScaleRatio;

        //jQueryJssorSliderjQuery Constructor
        {
            _AutoPlay = _Options.jQueryAutoPlay;
            _SelfSlider.jQueryOptions = options;

            AdjustSlidesContainerSize();

            elmt["jssor-slider"] = true;

            //_SlideshowPanel = CreatePanel();
            //jQueryJssorjQuery.jQueryCssZIndex(elmt, jQueryJssorjQuery.jQueryCssZIndex(elmt));
            //jQueryJssorjQuery.jQueryCssLeft(_SlideshowPanel, jQueryJssorjQuery.jQueryCssLeft(_SlidesContainer));
            //jQueryJssorjQuery.jQueryCssZIndex(_SlidesContainer, jQueryJssorjQuery.jQueryCssZIndex(_SlidesContainer));
            //jQueryJssorjQuery.jQueryCssTop(_SlideshowPanel, jQueryJssorjQuery.jQueryCssTop(_SlidesContainer));
            jQueryJssorjQuery.jQueryCssZIndex(_SlidesContainer, jQueryJssorjQuery.jQueryCssZIndex(_SlidesContainer) || 0);
            jQueryJssorjQuery.jQueryCssPosition(_SlidesContainer, "absolute");
            _SlideshowPanel = jQueryJssorjQuery.jQueryCloneNode(_SlidesContainer);
            jQueryJssorjQuery.jQueryInsertBefore(jQueryJssorjQuery.jQueryParentNode(_SlidesContainer), _SlideshowPanel, _SlidesContainer);

            if (_SlideshowOptions) {
                _ShowLink = _SlideshowOptions.jQueryShowLink;
                _SlideshowRunnerClass = _SlideshowOptions.jQueryClass;

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    if (!_SlideshowOptions.jQueryTransitions || !_SlideshowOptions.jQueryTransitions.length) {
                        jQueryJssorDebugjQuery.jQueryError("Invalid 'jQuerySlideshowOptions', no 'jQueryTransitions' specified.");
                    }
                });

                jQueryJssorjQuery.jQueryTranslateTransitions(_SlideshowOptions.jQueryTransitions); //for old transition compatibility

                _SlideshowEnabled = _DisplayPieces == 1 && _SlideCount > 1 && _SlideshowRunnerClass && (!jQueryJssorjQuery.jQueryIsBrowserIE() || jQueryJssorjQuery.jQueryBrowserVersion() >= 8);
            }

            _ParkingPosition = (_SlideshowEnabled || _DisplayPieces >= _SlideCount || !(_Loop & 1)) ? 0 : _Options.jQueryParkingPosition;

            _DragEnabled = ((_DisplayPieces > 1 || _ParkingPosition) ? _PlayOrientation : -1) & _Options.jQueryDragOrientation;

            //SlideBoard
            var _SlideboardElmt = _SlidesContainer;
            var _SlideItems = [];

            var _SlideshowRunner;
            var _LinkContainer;

            var _DownEvent = "mousedown";
            var _MoveEvent = "mousemove";
            var _UpEvent = "mouseup";
            var _CancelEvent;

            var _LastTimeMoveByDrag;
            var _Position_OnFreeze;
            var _CarouselPlaying_OnFreeze;
            var _PlayToPosition_OnFreeze;
            var _PositionToGoByDrag;

            //SlideBoard Constructor
            {
                var msPrefix;
                if (window.navigator.pointerEnabled || (msPrefix = window.navigator.msPointerEnabled)) {
                    _IsTouchDevice = true;

                    _DownEvent = msPrefix ? "MSPointerDown" : "pointerdown";
                    _MoveEvent = msPrefix ? "MSPointerMove" : "pointermove";
                    _UpEvent = msPrefix ? "MSPointerUp" : "pointerup";
                    _CancelEvent = msPrefix ? "MSPointerCancel" : "pointercancel";

                    if (_DragEnabled) {
                        var touchAction = "auto";
                        if (_DragEnabled == 2) {
                            touchAction = "pan-x";
                        }
                        else if (_DragEnabled) {
                            touchAction = "pan-y";
                        }

                        jQueryJssorjQuery.jQueryCss(_SlideboardElmt, msPrefix ? "msTouchAction" : "touchAction", touchAction);
                    }
                }
                else if ("ontouchstart" in window || "createTouch" in document) {
                    _HandleTouchEventOnly = true;
                    _IsTouchDevice = true;

                    _DownEvent = "touchstart";
                    _MoveEvent = "touchmove";
                    _UpEvent = "touchend";
                    _CancelEvent = "touchcancel";
                }

                _Slideshow = new Slideshow();

                if (_SlideshowEnabled)
                    _SlideshowRunner = new _SlideshowRunnerClass(_SlideContainer, _SlideWidth, _SlideHeight, _SlideshowOptions, _HandleTouchEventOnly);

                jQueryJssorjQuery.jQueryAppendChild(_SlideshowPanel, _Slideshow.jQueryWrapper);
                jQueryJssorjQuery.jQueryCssOverflow(_SlidesContainer, "hidden");

                //link container
                {
                    _LinkContainer = CreatePanel();
                    jQueryJssorjQuery.jQueryCss(_LinkContainer, "backgroundColor", "#000");
                    jQueryJssorjQuery.jQueryCssOpacity(_LinkContainer, 0);
                    jQueryJssorjQuery.jQueryInsertBefore(_SlideboardElmt, _LinkContainer, _SlideboardElmt.firstChild);
                }

                for (var i = 0; i < _SlideElmts.length; i++) {
                    var slideElmt = _SlideElmts[i];
                    var slideItem = new SlideItem(slideElmt, i);
                    _SlideItems.push(slideItem);
                }

                jQueryJssorjQuery.jQueryHideElement(_LoadingContainer);

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    jQueryJssorjQuery.jQueryAttribute(_LoadingContainer, "debug-id", "loading-container");
                });

                _Carousel = new Carousel()
                _CarouselPlayer = new CarouselPlayer(_Carousel, _Slideshow);

                jQueryJssorDebugjQuery.jQueryExecute(function () {
                    jQueryJssorjQuery.jQueryAttribute(_SlideboardElmt, "debug-id", "slide-board");
                });

                if (_DragEnabled) {
                    jQueryJssorjQuery.jQueryAddEvent(_SlidesContainer, _DownEvent, OnMouseDown);
                    jQueryJssorjQuery.jQueryAddEvent(document, _UpEvent, OnDragEnd);
                    _CancelEvent && jQueryJssorjQuery.jQueryAddEvent(document, _CancelEvent, OnDragEnd);
                }
            }
            //SlideBoard

            _HoverToPause &= (_IsTouchDevice ? 10 : 5);

            //Bullet Navigator
            if (_BulletNavigatorContainer && _BulletNavigatorOptions) {
                _BulletNavigator = new _BulletNavigatorOptions.jQueryClass(_BulletNavigatorContainer, _BulletNavigatorOptions, OriginalWidth(), OriginalHeight());
                _Navigators.push(_BulletNavigator);
            }

            //Arrow Navigator
            if (_ArrowNavigatorOptions && _ArrowLeft && _ArrowRight) {
                _ArrowNavigator = new _ArrowNavigatorOptions.jQueryClass(_ArrowLeft, _ArrowRight, _ArrowNavigatorOptions, OriginalWidth(), OriginalHeight());
                _Navigators.push(_ArrowNavigator);
            }

            //Thumbnail Navigator
            if (_ThumbnailNavigatorContainer && _ThumbnailNavigatorOptions) {
                _ThumbnailNavigatorOptions.jQueryStartIndex = _Options.jQueryStartIndex;
                _ThumbnailNavigator = new _ThumbnailNavigatorOptions.jQueryClass(_ThumbnailNavigatorContainer, _ThumbnailNavigatorOptions);
                _Navigators.push(_ThumbnailNavigator);
            }

            jQueryJssorjQuery.jQueryEach(_Navigators, function (navigator) {
                navigator.jQueryReset(_SlideCount, _SlideItems, _LoadingContainer);
                navigator.jQueryOn(jQueryJssorNavigatorEventsjQuery.jQueryNAVIGATIONREQUEST, NavigationClickHandler);
            });

            Scale(OriginalWidth());

            jQueryJssorjQuery.jQueryAddEvent(elmt, "mouseout", jQueryJssorjQuery.jQueryMouseOverOutFilter(MainContainerMouseLeaveEventHandler, elmt));
            jQueryJssorjQuery.jQueryAddEvent(elmt, "mouseover", jQueryJssorjQuery.jQueryMouseOverOutFilter(MainContainerMouseEnterEventHandler, elmt));

            ShowNavigators();

            //Keyboard Navigation
            if (_Options.jQueryArrowKeyNavigation) {
                jQueryJssorjQuery.jQueryAddEvent(document, "keydown", function (e) {
                    if (e.keyCode == jQueryJssorKeyCodejQuery.jQueryLEFT) {
                        //Arrow Left
                        PlayToOffset(-1);
                    }
                    else if (e.keyCode == jQueryJssorKeyCodejQuery.jQueryRIGHT) {
                        //Arrow Right
                        PlayToOffset(1);
                    }
                });
            }

            var startPosition = _Options.jQueryStartIndex;
            if (!(_Loop & 1)) {
                startPosition = Math.max(0, Math.min(startPosition, _SlideCount - _DisplayPieces));
            }
            _CarouselPlayer.jQueryPlayCarousel(startPosition, startPosition, 0);
        }
    }
    //Jssor Slider

    //JssorSlider.jQueryASSEMBLY_BOTTOM_LEFT = ASSEMBLY_BOTTOM_LEFT;
    //JssorSlider.jQueryASSEMBLY_BOTTOM_RIGHT = ASSEMBLY_BOTTOM_RIGHT;
    //JssorSlider.jQueryASSEMBLY_TOP_LEFT = ASSEMBLY_TOP_LEFT;
    //JssorSlider.jQueryASSEMBLY_TOP_RIGHT = ASSEMBLY_TOP_RIGHT;
    //JssorSlider.jQueryASSEMBLY_LEFT_TOP = ASSEMBLY_LEFT_TOP;
    //JssorSlider.jQueryASSEMBLY_LEFT_BOTTOM = ASSEMBLY_LEFT_BOTTOM;
    //JssorSlider.jQueryASSEMBLY_RIGHT_TOP = ASSEMBLY_RIGHT_TOP;
    //JssorSlider.jQueryASSEMBLY_RIGHT_BOTTOM = ASSEMBLY_RIGHT_BOTTOM;

    JssorSlider.jQueryEVT_CLICK = 21;
    JssorSlider.jQueryEVT_DRAG_START = 22;
    JssorSlider.jQueryEVT_DRAG_END = 23;
    JssorSlider.jQueryEVT_SWIPE_START = 24;
    JssorSlider.jQueryEVT_SWIPE_END = 25;

    JssorSlider.jQueryEVT_LOAD_START = 26;
    JssorSlider.jQueryEVT_LOAD_END = 27;
    JssorSlider.jQueryEVT_FREEZE = 28;

    JssorSlider.jQueryEVT_POSITION_CHANGE = 202;
    JssorSlider.jQueryEVT_PARK = 203;

    JssorSlider.jQueryEVT_SLIDESHOW_START = 206;
    JssorSlider.jQueryEVT_SLIDESHOW_END = 207;

    JssorSlider.jQueryEVT_PROGRESS_CHANGE = 208;
    JssorSlider.jQueryEVT_STATE_CHANGE = 209;
    JssorSlider.jQueryEVT_ROLLBACK_START = 210;
    JssorSlider.jQueryEVT_ROLLBACK_END = 211;

    window.jQueryJssorSliderjQuery = jQueryJssorSliderjQuery = JssorSlider;

    //(function (jQuery) {
    //    jQuery.fn.jssorSlider = function (options) {
    //        return this.each(function () {
    //            return jQuery(this).data('jssorSlider') || jQuery(this).data('jssorSlider', new JssorSlider(this, options));
    //        });
    //    };
    //})(jQuery);

    //window.jQuery && (jQuery.fn.jssorSlider = function (options) {
    //    return this.each(function () {
    //        return jQuery(this).data('jssorSlider') || jQuery(this).data('jssorSlider', new JssorSlider(this, options));
    //    });
    //});
};

//jQueryJssorBulletNavigatorjQuery
var jQueryJssorNavigatorEventsjQuery = {
    jQueryNAVIGATIONREQUEST: 1,
    jQueryINDEXCHANGE: 2,
    jQueryRESET: 3
};

var jQueryJssorBulletNavigatorjQuery = window.jQueryJssorBulletNavigatorjQuery = function (elmt, options, containerWidth, containerHeight) {
    var self = this;
    jQueryJssorObjectjQuery.call(self);

    elmt = jQueryJssorjQuery.jQueryGetElement(elmt);

    var _Count;
    var _Length;
    var _Width;
    var _Height;
    var _CurrentIndex;
    var _CurrentInnerIndex = 0;
    var _Options;
    var _Steps;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _Orientation;
    var _ItemPrototype;
    var _PrototypeWidth;
    var _PrototypeHeight;

    var _ButtonElements = [];
    var _Buttons = [];

    function Highlight(index) {
        if (index != -1)
            _Buttons[index].jQueryActivate(index == _CurrentInnerIndex);
    }

    function OnNavigationRequest(index) {
        self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryNAVIGATIONREQUEST, index * _Steps);
    }

    self.jQueryElmt = elmt;
    self.jQueryGetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.jQuerySetCurrentIndex = function (index) {
        if (index != _CurrentIndex) {
            var lastInnerIndex = _CurrentInnerIndex;
            var innerIndex = Math.floor(index / _Steps);
            _CurrentInnerIndex = innerIndex;
            _CurrentIndex = index;

            Highlight(lastInnerIndex);
            Highlight(innerIndex);

            //self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryINDEXCHANGE, index);
        }
    };

    self.jQueryShow = function (hide) {
        jQueryJssorjQuery.jQueryShowElement(elmt, hide);
    };

    var _Located;
    self.jQueryRelocate = function (force) {
        if (!_Located || _Options.jQueryScale == false) {
            if (_Options.jQueryAutoCenter & 1) {
                jQueryJssorjQuery.jQueryCssLeft(elmt, (containerWidth - _Width) / 2);
            }
            if (_Options.jQueryAutoCenter & 2) {
                jQueryJssorjQuery.jQueryCssTop(elmt, (containerHeight - _Height) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.jQueryReset = function (length) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(length / _Steps);
            _CurrentInnerIndex = 0;

            var itemOffsetX = _PrototypeWidth + _SpacingX;
            var itemOffsetY = _PrototypeHeight + _SpacingY;

            var maxIndex = Math.ceil(_Count / _Lanes) - 1;

            _Width = _PrototypeWidth + itemOffsetX * (!_Orientation ? maxIndex : _Lanes - 1);
            _Height = _PrototypeHeight + itemOffsetY * (_Orientation ? maxIndex : _Lanes - 1);

            jQueryJssorjQuery.jQueryCssWidth(elmt, _Width);
            jQueryJssorjQuery.jQueryCssHeight(elmt, _Height);

            //self.jQueryRelocate(true);

            for (var buttonIndex = 0; buttonIndex < _Count; buttonIndex++) {

                var numberDiv = jQueryJssorjQuery.jQueryCreateSpan();
                jQueryJssorjQuery.jQueryInnerText(numberDiv, buttonIndex + 1);

                var div = jQueryJssorjQuery.jQueryBuildElement(_ItemPrototype, "numbertemplate", numberDiv, true);
                jQueryJssorjQuery.jQueryCssPosition(div, "absolute");

                var columnIndex = buttonIndex % (maxIndex + 1);
                jQueryJssorjQuery.jQueryCssLeft(div, !_Orientation ? itemOffsetX * columnIndex : buttonIndex % _Lanes * itemOffsetX);
                jQueryJssorjQuery.jQueryCssTop(div, _Orientation ? itemOffsetY * columnIndex : Math.floor(buttonIndex / (maxIndex + 1)) * itemOffsetY);

                jQueryJssorjQuery.jQueryAppendChild(elmt, div);
                _ButtonElements[buttonIndex] = div;

                if (_Options.jQueryActionMode & 1)
                    jQueryJssorjQuery.jQueryAddEvent(div, "click", jQueryJssorjQuery.jQueryCreateCallback(null, OnNavigationRequest, buttonIndex));

                if (_Options.jQueryActionMode & 2)
                    jQueryJssorjQuery.jQueryAddEvent(div, "mouseover", jQueryJssorjQuery.jQueryMouseOverOutFilter(jQueryJssorjQuery.jQueryCreateCallback(null, OnNavigationRequest, buttonIndex), div));

                _Buttons[buttonIndex] = jQueryJssorjQuery.jQueryButtonize(div);
            }

            //self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryRESET);
            _Initialized = true;
        }
    };

    //JssorBulletNavigator Constructor
    {
        self.jQueryOptions = _Options = jQueryJssorjQuery.jQueryExtend({
            jQuerySpacingX: 0,
            jQuerySpacingY: 0,
            jQueryOrientation: 1,
            jQueryActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        jQueryJssorDebugjQuery.jQueryExecute(function () {
            _Options = jQueryJssorjQuery.jQueryExtend({
                jQuerySteps: undefined,
                jQueryLanes: undefined
            }, _Options);
        });

        _ItemPrototype = jQueryJssorjQuery.jQueryFindChild(elmt, "prototype");

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!_ItemPrototype)
                jQueryJssorDebugjQuery.jQueryFail("Navigator item prototype not defined.");

            if (isNaN(jQueryJssorjQuery.jQueryCssWidth(_ItemPrototype))) {
                jQueryJssorDebugjQuery.jQueryFail("Width of 'navigator item prototype' not specified.");
            }

            if (isNaN(jQueryJssorjQuery.jQueryCssHeight(_ItemPrototype))) {
                jQueryJssorDebugjQuery.jQueryFail("Height of 'navigator item prototype' not specified.");
            }
        });

        _PrototypeWidth = jQueryJssorjQuery.jQueryCssWidth(_ItemPrototype);
        _PrototypeHeight = jQueryJssorjQuery.jQueryCssHeight(_ItemPrototype);

        jQueryJssorjQuery.jQueryRemoveChild(elmt, _ItemPrototype);

        _Steps = _Options.jQuerySteps || 1;
        _Lanes = _Options.jQueryLanes || 1;
        _SpacingX = _Options.jQuerySpacingX;
        _SpacingY = _Options.jQuerySpacingY;
        _Orientation = _Options.jQueryOrientation - 1;
    }
};

var jQueryJssorArrowNavigatorjQuery = window.jQueryJssorArrowNavigatorjQuery = function (arrowLeft, arrowRight, options, containerWidth, containerHeight) {
    var self = this;
    jQueryJssorObjectjQuery.call(self);

    jQueryJssorDebugjQuery.jQueryExecute(function () {

        if (!arrowLeft)
            jQueryJssorDebugjQuery.jQueryFail("Option 'jQueryArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option 'jQueryArrowNavigatorOptions' to disable direct navigation.");

        if (!arrowRight)
            jQueryJssorDebugjQuery.jQueryFail("Option 'jQueryArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option 'jQueryArrowNavigatorOptions' to disable direct navigation.");

        if (isNaN(jQueryJssorjQuery.jQueryCssWidth(arrowLeft))) {
            jQueryJssorDebugjQuery.jQueryFail("Width of 'arrow left' not specified.");
        }

        if (isNaN(jQueryJssorjQuery.jQueryCssWidth(arrowRight))) {
            jQueryJssorDebugjQuery.jQueryFail("Width of 'arrow right' not specified.");
        }

        if (isNaN(jQueryJssorjQuery.jQueryCssHeight(arrowLeft))) {
            jQueryJssorDebugjQuery.jQueryFail("Height of 'arrow left' not specified.");
        }

        if (isNaN(jQueryJssorjQuery.jQueryCssHeight(arrowRight))) {
            jQueryJssorDebugjQuery.jQueryFail("Height of 'arrow right' not specified.");
        }
    });

    var _Length;
    var _CurrentIndex;
    var _Options;
    var _Steps;
    var _ArrowWidth = jQueryJssorjQuery.jQueryCssWidth(arrowLeft);
    var _ArrowHeight = jQueryJssorjQuery.jQueryCssHeight(arrowLeft);

    function OnNavigationRequest(steps) {
        self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryNAVIGATIONREQUEST, steps, true);
    }

    self.jQueryGetCurrentIndex = function () {
        return _CurrentIndex;
    };

    self.jQuerySetCurrentIndex = function (index, virtualIndex, temp) {
        if (temp) {
            _CurrentIndex = virtualIndex;
        }
        else {
            _CurrentIndex = index;
        }
        //self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryINDEXCHANGE, index);
    };

    self.jQueryShow = function (hide) {
        jQueryJssorjQuery.jQueryShowElement(arrowLeft, hide);
        jQueryJssorjQuery.jQueryShowElement(arrowRight, hide);
    };

    var _Located;
    self.jQueryRelocate = function (force) {
        if (!_Located || _Options.jQueryScale == false) {

            if (_Options.jQueryAutoCenter & 1) {
                jQueryJssorjQuery.jQueryCssLeft(arrowLeft, (containerWidth - _ArrowWidth) / 2);
                jQueryJssorjQuery.jQueryCssLeft(arrowRight, (containerWidth - _ArrowWidth) / 2);
            }

            if (_Options.jQueryAutoCenter & 2) {
                jQueryJssorjQuery.jQueryCssTop(arrowLeft, (containerHeight - _ArrowHeight) / 2);
                jQueryJssorjQuery.jQueryCssTop(arrowRight, (containerHeight - _ArrowHeight) / 2);
            }

            _Located = true;
        }
    };

    var _Initialized;
    self.jQueryReset = function (length) {
        _Length = length;
        _CurrentIndex = 0;

        if (!_Initialized) {

            //self.jQueryRelocate(true);

            jQueryJssorjQuery.jQueryAddEvent(arrowLeft, "click", jQueryJssorjQuery.jQueryCreateCallback(null, OnNavigationRequest, -_Steps));
            jQueryJssorjQuery.jQueryAddEvent(arrowRight, "click", jQueryJssorjQuery.jQueryCreateCallback(null, OnNavigationRequest, _Steps));

            jQueryJssorjQuery.jQueryButtonize(arrowLeft);
            jQueryJssorjQuery.jQueryButtonize(arrowRight);

            _Initialized = true;
        }

        //self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryRESET);
    };

    //JssorArrowNavigator Constructor
    {
        self.jQueryOptions = _Options = jQueryJssorjQuery.jQueryExtend({
            jQuerySteps: 1
        }, options);

        _Steps = _Options.jQuerySteps;
    }
};

//jQueryJssorThumbnailNavigatorjQuery
var jQueryJssorThumbnailNavigatorjQuery = window.jQueryJssorThumbnailNavigatorjQuery = function (elmt, options) {
    var _Self = this;
    var _Length;
    var _Count;
    var _CurrentIndex;
    var _Options;
    var _NavigationItems = [];

    var _Width;
    var _Height;
    var _Lanes;
    var _SpacingX;
    var _SpacingY;
    var _PrototypeWidth;
    var _PrototypeHeight;
    var _DisplayPieces;

    var _Slider;
    var _CurrentMouseOverIndex = -1;

    var _SlidesContainer;
    var _ThumbnailPrototype;

    jQueryJssorObjectjQuery.call(_Self);
    elmt = jQueryJssorjQuery.jQueryGetElement(elmt);

    function NavigationItem(item, index) {
        var self = this;
        var _Wrapper;
        var _Button;
        var _Thumbnail;

        function Highlight(mouseStatus) {
            _Button.jQueryActivate(_CurrentIndex == index);
        }

        function OnNavigationRequest(event) {
            if (!_Slider.jQueryLastDragSucceded()) {
                var tail = _Lanes - index % _Lanes;
                var slideVirtualIndex = _Slider.jQueryGetVirtualIndex((index + tail) / _Lanes - 1);
                var itemVirtualIndex = slideVirtualIndex * _Lanes + _Lanes - tail;
                _Self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryNAVIGATIONREQUEST, itemVirtualIndex);
            }

            //jQueryJssorDebugjQuery.jQueryLog("navigation request");
        }

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            self.jQueryWrapper = undefined;
        });

        self.jQueryIndex = index;

        self.jQueryHighlight = Highlight;

        //NavigationItem Constructor
        {
            _Thumbnail = item.jQueryThumb || item.jQueryImage || jQueryJssorjQuery.jQueryCreateDiv();
            self.jQueryWrapper = _Wrapper = jQueryJssorjQuery.jQueryBuildElement(_ThumbnailPrototype, "thumbnailtemplate", _Thumbnail, true);

            _Button = jQueryJssorjQuery.jQueryButtonize(_Wrapper);
            if (_Options.jQueryActionMode & 1)
                jQueryJssorjQuery.jQueryAddEvent(_Wrapper, "click", OnNavigationRequest);
            if (_Options.jQueryActionMode & 2)
                jQueryJssorjQuery.jQueryAddEvent(_Wrapper, "mouseover", jQueryJssorjQuery.jQueryMouseOverOutFilter(OnNavigationRequest, _Wrapper));
        }
    }

    _Self.jQueryGetCurrentIndex = function () {
        return _CurrentIndex;
    };

    _Self.jQuerySetCurrentIndex = function (index, virtualIndex, temp) {
        var oldIndex = _CurrentIndex;
        _CurrentIndex = index;
        if (oldIndex != -1)
            _NavigationItems[oldIndex].jQueryHighlight();
        _NavigationItems[index].jQueryHighlight();

        if (!temp) {
            _Slider.jQueryPlayTo(_Slider.jQueryGetVirtualIndex(Math.floor(virtualIndex / _Lanes)));
        }
    };

    _Self.jQueryShow = function (hide) {
        jQueryJssorjQuery.jQueryShowElement(elmt, hide);
    };

    _Self.jQueryRelocate = jQueryJssorjQuery.jQueryEmptyFunction;

    var _Initialized;
    _Self.jQueryReset = function (length, items, loadingContainer) {
        if (!_Initialized) {
            _Length = length;
            _Count = Math.ceil(_Length / _Lanes);
            _CurrentIndex = -1;
            _DisplayPieces = Math.min(_DisplayPieces, items.length);

            var horizontal = _Options.jQueryOrientation & 1;

            var slideWidth = _PrototypeWidth + (_PrototypeWidth + _SpacingX) * (_Lanes - 1) * (1 - horizontal);
            var slideHeight = _PrototypeHeight + (_PrototypeHeight + _SpacingY) * (_Lanes - 1) * horizontal;

            var slidesContainerWidth = slideWidth + (slideWidth + _SpacingX) * (_DisplayPieces - 1) * horizontal;
            var slidesContainerHeight = slideHeight + (slideHeight + _SpacingY) * (_DisplayPieces - 1) * (1 - horizontal);

            jQueryJssorjQuery.jQueryCssPosition(_SlidesContainer, "absolute");
            jQueryJssorjQuery.jQueryCssOverflow(_SlidesContainer, "hidden");
            if (_Options.jQueryAutoCenter & 1) {
                jQueryJssorjQuery.jQueryCssLeft(_SlidesContainer, (_Width - slidesContainerWidth) / 2);
            }
            if (_Options.jQueryAutoCenter & 2) {
                jQueryJssorjQuery.jQueryCssTop(_SlidesContainer, (_Height - slidesContainerHeight) / 2);
            }
            //jQueryJssorDebugjQuery.jQueryExecute(function () {
            //    if (!_Options.jQueryAutoCenter) {
            //        var slidesContainerTop = jQueryJssorjQuery.jQueryCssTop(_SlidesContainer);
            //        var slidesContainerLeft = jQueryJssorjQuery.jQueryCssLeft(_SlidesContainer);

            //        if (isNaN(slidesContainerTop)) {
            //            jQueryJssorDebugjQuery.jQueryFail("Position 'top' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option jQueryThumbnailNavigatorOptions.jQueryAutoCenter set to 0, it should be specified in pixel (like <div u=\"slides\" style=\"top: 0px;\">)");
            //        }

            //        if (isNaN(slidesContainerLeft)) {
            //            jQueryJssorDebugjQuery.jQueryFail("Position 'left' wrong specification of thumbnail navigator slides container (<div u=\"thumbnavigator\">...<div u=\"slides\">), \r\nwhen option jQueryThumbnailNavigatorOptions.jQueryAutoCenter set to 0, it should be specified in pixel (like <div u=\"slides\" style=\"left: 0px;\">)");
            //        }
            //    }
            //});
            jQueryJssorjQuery.jQueryCssWidth(_SlidesContainer, slidesContainerWidth);
            jQueryJssorjQuery.jQueryCssHeight(_SlidesContainer, slidesContainerHeight);

            var slideItemElmts = [];
            jQueryJssorjQuery.jQueryEach(items, function (item, index) {
                var navigationItem = new NavigationItem(item, index);
                var navigationItemWrapper = navigationItem.jQueryWrapper;

                var columnIndex = Math.floor(index / _Lanes);
                var laneIndex = index % _Lanes;

                jQueryJssorjQuery.jQueryCssLeft(navigationItemWrapper, (_PrototypeWidth + _SpacingX) * laneIndex * (1 - horizontal));
                jQueryJssorjQuery.jQueryCssTop(navigationItemWrapper, (_PrototypeHeight + _SpacingY) * laneIndex * horizontal);

                if (!slideItemElmts[columnIndex]) {
                    slideItemElmts[columnIndex] = jQueryJssorjQuery.jQueryCreateDiv();
                    jQueryJssorjQuery.jQueryAppendChild(_SlidesContainer, slideItemElmts[columnIndex]);
                }

                jQueryJssorjQuery.jQueryAppendChild(slideItemElmts[columnIndex], navigationItemWrapper);

                _NavigationItems.push(navigationItem);
            });

            var thumbnailSliderOptions = jQueryJssorjQuery.jQueryExtend({
                jQueryHWA: false,
                jQueryAutoPlay: false,
                jQueryNaviQuitDrag: false,
                jQuerySlideWidth: slideWidth,
                jQuerySlideHeight: slideHeight,
                jQuerySlideSpacing: _SpacingX * horizontal + _SpacingY * (1 - horizontal),
                jQueryMinDragOffsetToSlide: 12,
                jQuerySlideDuration: 200,
                jQueryPauseOnHover: 1,
                jQueryPlayOrientation: _Options.jQueryOrientation,
                jQueryDragOrientation: _Options.jQueryDisableDrag ? 0 : _Options.jQueryOrientation
            }, _Options);

            _Slider = new jQueryJssorSliderjQuery(elmt, thumbnailSliderOptions);

            _Initialized = true;
        }

        //_Self.jQueryTriggerEvent(jQueryJssorNavigatorEventsjQuery.jQueryRESET);
    };

    //JssorThumbnailNavigator Constructor
    {
        _Self.jQueryOptions = _Options = jQueryJssorjQuery.jQueryExtend({
            jQuerySpacingX: 3,
            jQuerySpacingY: 3,
            jQueryDisplayPieces: 1,
            jQueryOrientation: 1,
            jQueryAutoCenter: 3,
            jQueryActionMode: 1
        }, options);

        //Sodo statement for development time intellisence only
        jQueryJssorDebugjQuery.jQueryExecute(function () {
            _Options = jQueryJssorjQuery.jQueryExtend({
                jQueryLanes: undefined,
                jQueryWidth: undefined,
                jQueryHeight: undefined
            }, _Options);
        });

        _Width = jQueryJssorjQuery.jQueryCssWidth(elmt);
        _Height = jQueryJssorjQuery.jQueryCssHeight(elmt);

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!_Width)
                jQueryJssorDebugjQuery.jQueryFail("width of 'thumbnavigator' container not specified.");
            if (!_Height)
                jQueryJssorDebugjQuery.jQueryFail("height of 'thumbnavigator' container not specified.");
        });

        _SlidesContainer = jQueryJssorjQuery.jQueryFindChild(elmt, "slides", true);
        _ThumbnailPrototype = jQueryJssorjQuery.jQueryFindChild(_SlidesContainer, "prototype");

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            if (!_ThumbnailPrototype)
                jQueryJssorDebugjQuery.jQueryFail("prototype of 'thumbnavigator' not defined.");
        });

        _PrototypeWidth = jQueryJssorjQuery.jQueryCssWidth(_ThumbnailPrototype);
        _PrototypeHeight = jQueryJssorjQuery.jQueryCssHeight(_ThumbnailPrototype);

        jQueryJssorjQuery.jQueryRemoveChild(_SlidesContainer, _ThumbnailPrototype);

        _Lanes = _Options.jQueryLanes || 1;
        _SpacingX = _Options.jQuerySpacingX;
        _SpacingY = _Options.jQuerySpacingY;
        _DisplayPieces = _Options.jQueryDisplayPieces;
    }
};

//jQueryJssorCaptionSliderBasejQuery
function jQueryJssorCaptionSliderBasejQuery() {
    jQueryJssorAnimatorjQuery.call(this, 0, 0);
    this.jQueryRevert = jQueryJssorjQuery.jQueryEmptyFunction;
}

var jQueryJssorCaptionSliderjQuery = window.jQueryJssorCaptionSliderjQuery = function (container, captionSlideOptions, playIn) {
    jQueryJssorDebugjQuery.jQueryExecute(function () {
        if (!captionSlideOptions.jQueryCaptionTransitions) {
            jQueryJssorDebugjQuery.jQueryError("'jQueryCaptionSliderOptions' option error, 'jQueryCaptionSliderOptions.jQueryCaptionTransitions' not specified.");
        }
        //else if (!jQueryJssorjQuery.jQueryIsArray(captionSlideOptions.jQueryCaptionTransitions)) {
        //    jQueryJssorDebugjQuery.jQueryError("'jQueryCaptionSliderOptions' option error, 'jQueryCaptionSliderOptions.jQueryCaptionTransitions' is not an array.");
        //}
    });

    var _Self = this;
    var _ImmediateOutCaptionHanger;
    var _PlayMode = playIn ? captionSlideOptions.jQueryPlayInMode : captionSlideOptions.jQueryPlayOutMode;

    var _CaptionTransitions = captionSlideOptions.jQueryCaptionTransitions;
    var _CaptionTuningFetcher = { jQueryTransition: "t", jQueryDelay: "d", jQueryDuration: "du", x: "x", y: "y", jQueryRotate: "r", jQueryZoom: "z", jQueryOpacity: "f", jQueryBeginTime: "b" };
    var _CaptionTuningTransfer = {
        jQueryDefault: function (value, tuningValue) {
            if (!isNaN(tuningValue.jQueryValue))
                value = tuningValue.jQueryValue;
            else
                value *= tuningValue.jQueryPercent;

            return value;
        },
        jQueryOpacity: function (value, tuningValue) {
            return this.jQueryDefault(value - 1, tuningValue);
        }
    };
    _CaptionTuningTransfer.jQueryZoom = _CaptionTuningTransfer.jQueryOpacity;

    jQueryJssorAnimatorjQuery.call(_Self, 0, 0);

    function GetCaptionItems(element, level) {

        var itemsToPlay = [];
        var lastTransitionName;
        var namedTransitions = [];
        var namedTransitionOrders = [];

        //jQueryJssorDebugjQuery.jQueryExecute(function () {

        //    var debugInfoElement = jQueryJssorjQuery.jQueryGetElement("debugInfo");

        //    if (debugInfoElement && playIn) {

        //        var text = jQueryJssor.jQueryInnerHtml(debugInfoElement) + "<br>";

        //        jQueryJssorjQuery.jQueryInnerHtml(debugInfoElement, text);
        //    }
        //});

        function FetchRawTransition(captionElmt, index) {
            var rawTransition = {};

            jQueryJssorjQuery.jQueryEach(_CaptionTuningFetcher, function (fetchAttribute, fetchProperty) {
                var attributeValue = jQueryJssorjQuery.jQueryAttributeEx(captionElmt, fetchAttribute + (index || ""));
                if (attributeValue) {
                    var propertyValue = {};

                    if (fetchAttribute == "t") {
                        //if ((jQueryJssorjQuery.jQueryIsBrowserChrome() || jQueryJssorjQuery.jQueryIsBrowserSafari() || jQueryJssorjQuery.jQueryIsBrowserFireFox()) && attributeValue == "*") {
                        //    attributeValue = Math.floor(Math.random() * captionSlideOptions.jQueryCaptionTransitions.length);
                        //    jQueryJssorjQuery.jQueryAttribute(captionElmt, fetchAttribute + (index || ""), attributeValue);
                        //}

                        propertyValue.jQueryValue = attributeValue;
                    }
                    else if (attributeValue.indexOf("%") + 1)
                        propertyValue.jQueryPercent = jQueryJssorjQuery.jQueryParseFloat(attributeValue) / 100;
                    else
                        propertyValue.jQueryValue = jQueryJssorjQuery.jQueryParseFloat(attributeValue);

                    rawTransition[fetchProperty] = propertyValue;
                }
            });

            return rawTransition;
        }

        function GetRandomTransition() {
            return _CaptionTransitions[Math.floor(Math.random() * _CaptionTransitions.length)];
        }

        function EvaluateCaptionTransition(transitionName) {

            var transition;

            if (transitionName == "*") {
                transition = GetRandomTransition();
            }
            else if (transitionName) {

                //indexed transition allowed, just the same as named transition
                var tempTransition = _CaptionTransitions[jQueryJssorjQuery.jQueryParseInt(transitionName)] || _CaptionTransitions[transitionName];

                if (jQueryJssorjQuery.jQueryIsArray(tempTransition)) {
                    if (transitionName != lastTransitionName) {
                        lastTransitionName = transitionName;
                        namedTransitionOrders[transitionName] = 0;

                        namedTransitions[transitionName] = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                    }
                    else {
                        namedTransitionOrders[transitionName]++;
                    }

                    tempTransition = namedTransitions[transitionName];

                    if (jQueryJssorjQuery.jQueryIsArray(tempTransition)) {
                        tempTransition = tempTransition.length && tempTransition[namedTransitionOrders[transitionName] % tempTransition.length];

                        if (jQueryJssorjQuery.jQueryIsArray(tempTransition)) {
                            //got transition from array level 3, random for all captions
                            tempTransition = tempTransition[Math.floor(Math.random() * tempTransition.length)];
                        }
                        //else {
                        //    //got transition from array level 2, in sequence for all adjacent captions with same name specified
                        //    transition = tempTransition;
                        //}
                    }
                    //else {
                    //    //got transition from array level 1, random but same for all adjacent captions with same name specified
                    //    transition = tempTransition;
                    //}
                }
                //else {
                //    //got transition directly from a simple transition object
                //    transition = tempTransition;
                //}

                transition = tempTransition;

                if (jQueryJssorjQuery.jQueryIsString(transition))
                    transition = EvaluateCaptionTransition(transition);
            }

            return transition;
        }

        var captionElmts = jQueryJssorjQuery.jQueryChildren(element);
        jQueryJssorjQuery.jQueryEach(captionElmts, function (captionElmt, i) {

            var transitionsWithTuning = [];
            transitionsWithTuning.jQueryElmt = captionElmt;
            var isCaption = jQueryJssorjQuery.jQueryAttributeEx(captionElmt, "u") == "caption";

            jQueryJssorjQuery.jQueryEach(playIn ? [0, 3] : [2], function (j, k) {

                if (isCaption) {
                    var transition;
                    var rawTransition;

                    if (j != 2 || !jQueryJssorjQuery.jQueryAttributeEx(captionElmt, "t3")) {
                        rawTransition = FetchRawTransition(captionElmt, j);

                        if (j == 2 && !rawTransition.jQueryTransition) {
                            rawTransition.jQueryDelay = rawTransition.jQueryDelay || { jQueryValue: 0 };
                            rawTransition = jQueryJssorjQuery.jQueryExtend(FetchRawTransition(captionElmt, 0), rawTransition);
                        }
                    }

                    if (rawTransition && rawTransition.jQueryTransition) {

                        transition = EvaluateCaptionTransition(rawTransition.jQueryTransition.jQueryValue);

                        if (transition) {

                            //var transitionWithTuning = jQueryJssorjQuery.jQueryExtend({ jQueryDelay: 0, jQueryScaleHorizontal: 1, jQueryScaleVertical: 1 }, transition);
                            var transitionWithTuning = jQueryJssorjQuery.jQueryExtend({ jQueryDelay: 0 }, transition);

                            jQueryJssorjQuery.jQueryEach(rawTransition, function (rawPropertyValue, propertyName) {
                                var tuningPropertyValue = (_CaptionTuningTransfer[propertyName] || _CaptionTuningTransfer.jQueryDefault).apply(_CaptionTuningTransfer, [transitionWithTuning[propertyName], rawTransition[propertyName]]);
                                if (!isNaN(tuningPropertyValue))
                                    transitionWithTuning[propertyName] = tuningPropertyValue;
                            });

                            if (!k) {
                                if (rawTransition.jQueryBeginTime)
                                    transitionWithTuning.jQueryBeginTime = rawTransition.jQueryBeginTime.jQueryValue || 0;
                                else if ((_PlayMode) & 2)
                                    transitionWithTuning.jQueryBeginTime = 0;
                            }
                        }
                    }

                    transitionsWithTuning.push(transitionWithTuning);
                }

                if ((level % 2) && !k) {
                    //transitionsWithTuning.jQueryChildren = GetCaptionItems(captionElmt, lastTransitionName, [].concat(namedTransitions), [].concat(namedTransitionOrders), level + 1);
                    transitionsWithTuning.jQueryChildren = GetCaptionItems(captionElmt, level + 1);
                }
            });

            itemsToPlay.push(transitionsWithTuning);
        });

        return itemsToPlay;
    }

    function CreateAnimator(item, transition, immediateOut) {

        var animatorOptions = {
            jQueryEasing: transition.jQueryEasing,
            jQueryRound: transition.jQueryRound,
            jQueryDuring: transition.jQueryDuring,
            jQueryReverse: playIn && !immediateOut,
            jQueryOptimize: true
        };

        jQueryJssorDebugjQuery.jQueryExecute(function () {
            animatorOptions.jQueryCaptionAnimator = true;
        });

        var captionItem = item;
        var captionParent = jQueryJssorjQuery.jQueryParentNode(item);

        var captionItemWidth = jQueryJssorjQuery.jQueryCssWidth(captionItem);
        var captionItemHeight = jQueryJssorjQuery.jQueryCssHeight(captionItem);
        var captionParentWidth = jQueryJssorjQuery.jQueryCssWidth(captionParent);
        var captionParentHeight = jQueryJssorjQuery.jQueryCssHeight(captionParent);

        var toStyles = {};
        var fromStyles = {};
        var scaleClip = transition.jQueryScaleClip || 1;

        //Opacity
        if (transition.jQueryOpacity) {
            toStyles.jQueryOpacity = 2 - transition.jQueryOpacity;
        }

        animatorOptions.jQueryOriginalWidth = captionItemWidth;
        animatorOptions.jQueryOriginalHeight = captionItemHeight;

        //Transform
        if (transition.jQueryZoom || transition.jQueryRotate) {
            toStyles.jQueryZoom = transition.jQueryZoom ? transition.jQueryZoom - 1 : 1;

            if (jQueryJssorjQuery.jQueryIsBrowserIe9Earlier() || jQueryJssorjQuery.jQueryIsBrowserOpera())
                toStyles.jQueryZoom = Math.min(toStyles.jQueryZoom, 2);

            fromStyles.jQueryZoom = 1;

            var rotate = transition.jQueryRotate || 0;

            toStyles.jQueryRotate = rotate * 360;
            fromStyles.jQueryRotate = 0;
        }
            //Clip
        else if (transition.jQueryClip) {
            var fromStyleClip = { jQueryTop: 0, jQueryRight: captionItemWidth, jQueryBottom: captionItemHeight, jQueryLeft: 0 };
            var toStyleClip = jQueryJssorjQuery.jQueryExtend({}, fromStyleClip);

            var blockOffset = toStyleClip.jQueryOffset = {};

            var topBenchmark = transition.jQueryClip & 4;
            var bottomBenchmark = transition.jQueryClip & 8;
            var leftBenchmark = transition.jQueryClip & 1;
            var rightBenchmark = transition.jQueryClip & 2;

            if (topBenchmark && bottomBenchmark) {
                blockOffset.jQueryTop = captionItemHeight / 2 * scaleClip;
                blockOffset.jQueryBottom = -blockOffset.jQueryTop;
            }
            else if (topBenchmark)
                blockOffset.jQueryBottom = -captionItemHeight * scaleClip;
            else if (bottomBenchmark)
                blockOffset.jQueryTop = captionItemHeight * scaleClip;

            if (leftBenchmark && rightBenchmark) {
                blockOffset.jQueryLeft = captionItemWidth / 2 * scaleClip;
                blockOffset.jQueryRight = -blockOffset.jQueryLeft;
            }
            else if (leftBenchmark)
                blockOffset.jQueryRight = -captionItemWidth * scaleClip;
            else if (rightBenchmark)
                blockOffset.jQueryLeft = captionItemWidth * scaleClip;

            animatorOptions.jQueryMove = transition.jQueryMove;
            toStyles.jQueryClip = toStyleClip;
            fromStyles.jQueryClip = fromStyleClip;
        }

        //Fly
        {
            var toLeft = 0;
            var toTop = 0;

            if (transition.x)
                toLeft -= captionParentWidth * transition.x;

            if (transition.y)
                toTop -= captionParentHeight * transition.y;

            if (toLeft || toTop || animatorOptions.jQueryMove) {
                toStyles.jQueryLeft = toLeft + jQueryJssorjQuery.jQueryCssLeft(captionItem);
                toStyles.jQueryTop = toTop + jQueryJssorjQuery.jQueryCssTop(captionItem);
            }
        }

        //duration
        var duration = transition.jQueryDuration;

        fromStyles = jQueryJssorjQuery.jQueryExtend(fromStyles, jQueryJssorjQuery.jQueryGetStyles(captionItem, toStyles));

        animatorOptions.jQuerySetter = jQueryJssorjQuery.jQueryStyleSetterEx();

        return new jQueryJssorAnimatorjQuery(transition.jQueryDelay, duration, animatorOptions, captionItem, fromStyles, toStyles);
    }

    function CreateAnimators(streamLineLength, captionItems) {

        jQueryJssorjQuery.jQueryEach(captionItems, function (captionItem, i) {

            jQueryJssorDebugjQuery.jQueryExecute(function () {
                if (captionItem.length) {
                    var top = jQueryJssorjQuery.jQueryCssTop(captionItem.jQueryElmt);
                    var left = jQueryJssorjQuery.jQueryCssLeft(captionItem.jQueryElmt);
                    var width = jQueryJssorjQuery.jQueryCssWidth(captionItem.jQueryElmt);
                    var height = jQueryJssorjQuery.jQueryCssHeight(captionItem.jQueryElmt);

                    var error = null;

                    if (isNaN(top))
                        error = "Style 'top' for caption not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(left))
                        error = "Style 'left' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(width))
                        error = "Style 'width' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";
                    else if (isNaN(height))
                        error = "Style 'height' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";

                    if (error)
                        jQueryJssorDebugjQuery.jQueryError("Caption " + (i + 1) + " definition error, \r\n" + error + "\r\n" + captionItem.jQueryElmt.outerHTML);
                }
            });

            var animator;
            var captionElmt = captionItem.jQueryElmt;
            var transition = captionItem[0];
            var transition3 = captionItem[1];

            if (transition) {

                animator = CreateAnimator(captionElmt, transition);
                streamLineLength = animator.jQueryLocate(transition.jQueryBeginTime == undefined ? streamLineLength : transition.jQueryBeginTime, 1);
            }

            streamLineLength = CreateAnimators(streamLineLength, captionItem.jQueryChildren);

            if (transition3) {
                var animator3 = CreateAnimator(captionElmt, transition3, 1);
                animator3.jQueryLocate(streamLineLength, 1);
                _Self.jQueryCombine(animator3);
                _ImmediateOutCaptionHanger.jQueryCombine(animator3);
            }

            if (animator)
                _Self.jQueryCombine(animator);
        });

        return streamLineLength;
    }

    _Self.jQueryRevert = function () {
        _Self.jQueryGoToPosition(_Self.jQueryGetPosition_OuterEnd() * (playIn || 0));
        _ImmediateOutCaptionHanger.jQueryGoToBegin();
    };

    //Constructor
    {
        _ImmediateOutCaptionHanger = new jQueryJssorAnimatorjQuery(0, 0);

        //var streamLineLength = 0;
        //var captionItems = GetCaptionItems(container, null, [], [], 1);

        CreateAnimators(0, _PlayMode ? GetCaptionItems(container, 1) : []);
    }
};

//Event Table

//jQueryEVT_CLICK = 21;			    function(slideIndex[, event])
//jQueryEVT_DRAG_START = 22;		    function(position[, virtualPosition, event])
//jQueryEVT_DRAG_END = 23;		    function(position, startPosition[, virtualPosition, virtualStartPosition, event])
//jQueryEVT_SWIPE_START = 24;		function(position[, virtualPosition])
//jQueryEVT_SWIPE_END = 25;		    function(position[, virtualPosition])

//jQueryEVT_LOAD_START = 26;			function(slideIndex)
//jQueryEVT_LOAD_END = 27;			function(slideIndex)

//jQueryEVT_POSITION_CHANGE = 202;	function(position, fromPosition[, virtualPosition, virtualFromPosition])
//jQueryEVT_PARK = 203;			    function(slideIndex, fromIndex)

//jQueryEVT_PROGRESS_CHANGE = 208;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//jQueryEVT_STATE_CHANGE = 209;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//jQueryEVT_ROLLBACK_START = 210;	function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])
//jQueryEVT_ROLLBACK_END = 211;	    function(slideIndex, progress[, progressBegin, idleBegin, idleEnd, progressEnd])

//jQueryEVT_SLIDESHOW_START = 206;   function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])
//jQueryEVT_SLIDESHOW_END = 207;     function(slideIndex[, progressBegin, slideshowBegin, slideshowEnd, progressEnd])

//http://www.jssor.com/development/reference-api.html
