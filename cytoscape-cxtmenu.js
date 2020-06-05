(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeCxtmenu"] = factory();
	else
		root["cytoscapeCxtmenu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var assign = __webpack_require__(1);

var _require = __webpack_require__(3),
    removeEles = _require.removeEles,
    setStyles = _require.setStyles,
    createElement = _require.createElement,
    getPixelRatio = _require.getPixelRatio,
    getOffset = _require.getOffset;

var cxtmenu = function cxtmenu(params) {
  var options = assign({}, defaults, params);
  var cy = this;
  var container = cy.container();
  var target = void 0;

  var data = {
    options: options,
    handlers: [],
    container: createElement({ class: 'cxtmenu' })
  };

  var wrapper = data.container;
  var parent = createElement();
  var canvas = createElement({ tag: 'canvas' });
  var commands = [];
  var c2d = canvas.getContext('2d');
  var r = options.menuRadius;
  var containerSize = (r + options.activePadding) * 2;
  var activeCommandI = void 0;
  var offset = void 0;

  container.insertBefore(wrapper, container.firstChild);
  wrapper.appendChild(parent);
  parent.appendChild(canvas);

  setStyles(wrapper, {
    position: 'absolute',
    zIndex: options.zIndex,
    userSelect: 'none',
    pointerEvents: 'none' // prevent events on menu in modern browsers
  });

  // prevent events on menu in legacy browsers
  ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(function (evt) {
    wrapper.addEventListener(evt, function (e) {
      e.preventDefault();

      return false;
    });
  });

  setStyles(parent, {
    display: 'none',
    width: containerSize + 'px',
    height: containerSize + 'px',
    position: 'absolute',
    zIndex: 1,
    marginLeft: -options.activePadding + 'px',
    marginTop: -options.activePadding + 'px',
    userSelect: 'none'
  });

  canvas.width = containerSize;
  canvas.height = containerSize;

  function createMenuItems() {
    removeEles('.cxtmenu-item', parent);
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];

      var midtheta = (theta1 + theta2) / 2;
      var rx1 = 0.66 * r * Math.cos(midtheta);
      var ry1 = 0.66 * r * Math.sin(midtheta);

      var item = createElement({ class: 'cxtmenu-item' });
      setStyles(item, {
        color: options.itemColor,
        cursor: 'default',
        display: 'table',
        'text-align': 'center',
        //background: 'red',
        position: 'absolute',
        'text-shadow': '-1px -1px 2px ' + options.itemTextShadowColor + ', 1px -1px 2px ' + options.itemTextShadowColor + ', -1px 1px 2px ' + options.itemTextShadowColor + ', 1px 1px 1px ' + options.itemTextShadowColor,
        left: '50%',
        top: '50%',
        'min-height': r * 0.66 + 'px',
        width: r * 0.66 + 'px',
        height: r * 0.66 + 'px',
        marginLeft: rx1 - r * 0.33 + 'px',
        marginTop: -ry1 - r * 0.33 + 'px'
      });

      var content = createElement({ class: 'cxtmenu-content' });

      if (command.content instanceof HTMLElement) {
        content.appendChild(command.content);
      } else {
        content.innerHTML = command.content;
      }

      setStyles(content, {
        'width': r * 0.66 + 'px',
        'height': r * 0.66 + 'px',
        'vertical-align': 'middle',
        'display': 'table-cell'
      });

      setStyles(content, command.contentStyle || {});

      if (command.disabled === true || command.enabled === false) {
        content.setAttribute('class', 'cxtmenu-content cxtmenu-disabled');
      }

      parent.appendChild(item);
      item.appendChild(content);

      theta1 += dtheta;
      theta2 += dtheta;
    }
  }

  function queueDrawBg(rspotlight) {
    redrawQueue.drawBg = [rspotlight];
  }

  function drawBg(rspotlight) {
    rspotlight = rspotlight !== undefined ? rspotlight : rs;

    c2d.globalCompositeOperation = 'source-over';

    c2d.clearRect(0, 0, containerSize, containerSize);

    // draw background items
    c2d.fillStyle = options.fillColor;
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    for (var index = 0; index < commands.length; index++) {
      var command = commands[index];

      if (command.fillColor) {
        c2d.fillStyle = command.fillColor;
      }
      c2d.beginPath();
      c2d.moveTo(r + options.activePadding, r + options.activePadding);
      c2d.arc(r + options.activePadding, r + options.activePadding, r, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
      c2d.closePath();
      c2d.fill();

      theta1 += dtheta;
      theta2 += dtheta;

      c2d.fillStyle = options.fillColor;
    }
    // draw separators between items
    c2d.globalCompositeOperation = 'destination-out';
    c2d.strokeStyle = 'white';
    c2d.lineWidth = options.separatorWidth;
    theta1 = Math.PI / 2;
    theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var rx1 = r * Math.cos(theta1);
      var ry1 = r * Math.sin(theta1);
      c2d.beginPath();
      c2d.moveTo(r + options.activePadding, r + options.activePadding);
      c2d.lineTo(r + options.activePadding + rx1, r + options.activePadding - ry1);
      c2d.closePath();
      c2d.stroke();

      theta1 += dtheta;
      theta2 += dtheta;
    }

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';
    c2d.beginPath();
    c2d.arc(r + options.activePadding, r + options.activePadding, rspotlight + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function queueDrawCommands(rx, ry, theta) {
    redrawQueue.drawCommands = [rx, ry, theta];
  }

  function drawCommands(rx, ry, theta) {
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    theta1 += dtheta * activeCommandI;
    theta2 += dtheta * activeCommandI;

    c2d.fillStyle = options.activeFillColor;
    c2d.strokeStyle = 'black';
    c2d.lineWidth = 1;
    c2d.beginPath();
    c2d.moveTo(r + options.activePadding, r + options.activePadding);
    c2d.arc(r + options.activePadding, r + options.activePadding, r + options.activePadding, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
    c2d.closePath();
    c2d.fill();

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';

    var tx = r + options.activePadding + rx / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var ty = r + options.activePadding + ry / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var rot = Math.PI / 4 - theta;

    c2d.translate(tx, ty);
    c2d.rotate(rot);

    // clear the indicator
    c2d.beginPath();
    c2d.fillRect(-options.indicatorSize / 2, -options.indicatorSize / 2, options.indicatorSize, options.indicatorSize);
    c2d.closePath();
    c2d.fill();

    c2d.rotate(-rot);
    c2d.translate(-tx, -ty);

    // c2d.setTransform( 1, 0, 0, 1, 0, 0 );

    // clear the spotlight
    c2d.beginPath();
    c2d.arc(r + options.activePadding, r + options.activePadding, rs + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function updatePixelRatio() {
    var pxr = getPixelRatio();
    var w = containerSize;
    var h = containerSize;

    canvas.width = w * pxr;
    canvas.height = h * pxr;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    c2d.setTransform(1, 0, 0, 1, 0, 0);
    c2d.scale(pxr, pxr);
  }

  var redrawing = true;
  var redrawQueue = {};

  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
    return setTimeout(fn, 16);
  };

  var redraw = function redraw() {
    if (redrawQueue.drawBg) {
      drawBg.apply(null, redrawQueue.drawBg);
    }

    if (redrawQueue.drawCommands) {
      drawCommands.apply(null, redrawQueue.drawCommands);
    }

    redrawQueue = {};

    if (redrawing) {
      raf(redraw);
    }
  };

  // kick off
  updatePixelRatio();
  redraw();

  var ctrx = void 0,
      ctry = void 0,
      rs = void 0;

  var bindings = {
    on: function on(events, selector, fn) {

      var _fn = fn;
      if (selector === 'core') {
        _fn = function _fn(e) {
          if (e.cyTarget === cy || e.target === cy) {
            // only if event target is directly core
            return fn.apply(this, [e]);
          }
        };
      }

      data.handlers.push({
        events: events,
        selector: selector,
        fn: _fn
      });

      if (selector === 'core') {
        cy.on(events, _fn);
      } else {
        cy.on(events, selector, _fn);
      }

      return this;
    }
  };

  function addEventListeners() {
    var grabbable = void 0;
    var inGesture = false;
    var dragHandler = void 0;
    var zoomEnabled = void 0;
    var panEnabled = void 0;
    var boxEnabled = void 0;
    var gestureStartEvent = void 0;

    var restoreZoom = function restoreZoom() {
      if (zoomEnabled) {
        cy.userZoomingEnabled(true);
      }
    };

    var restoreGrab = function restoreGrab() {
      if (grabbable) {
        target.grabify();
      }
    };

    var restorePan = function restorePan() {
      if (panEnabled) {
        cy.userPanningEnabled(true);
      }
    };

    var restoreBoxSeln = function restoreBoxSeln() {
      if (boxEnabled) {
        cy.boxSelectionEnabled(true);
      }
    };

    var restoreGestures = function restoreGestures() {
      restoreGrab();
      restoreZoom();
      restorePan();
      restoreBoxSeln();
    };

    window.addEventListener('resize', updatePixelRatio);

    bindings.on('resize', function () {
      updatePixelRatio();
    }).on(options.openMenuEvents, options.selector, function (e) {
      target = this; // Remember which node the context menu is for
      var ele = this;
      var isCy = this === cy;

      if (inGesture) {
        parent.style.display = 'none';

        inGesture = false;

        restoreGestures();
      }

      if (typeof options.commands === 'function') {
        var res = options.commands(target);
        if (res.then) {
          res.then(function (_commands) {
            commands = _commands;
            openMenu();
          });
        } else {
          commands = res;
          openMenu();
        }
      } else {
        commands = options.commands;
        openMenu();
      }

      function openMenu() {
        if (!commands || commands.length === 0) {
          return;
        }

        zoomEnabled = cy.userZoomingEnabled();
        cy.userZoomingEnabled(false);

        panEnabled = cy.userPanningEnabled();
        cy.userPanningEnabled(false);

        boxEnabled = cy.boxSelectionEnabled();
        cy.boxSelectionEnabled(false);

        grabbable = target.grabbable && target.grabbable();
        if (grabbable) {
          target.ungrabify();
        }

        var rp = void 0,
            rw = void 0,
            rh = void 0;
        if (!isCy && ele.isNode() && !ele.isParent() && !options.atMouse) {
          rp = ele.renderedPosition();
          rw = ele.renderedWidth();
          rh = ele.renderedHeight();
        } else {
          rp = e.renderedPosition || e.cyRenderedPosition;
          rw = 1;
          rh = 1;
        }

        offset = getOffset(container);

        ctrx = rp.x;
        ctry = rp.y;

        createMenuItems();

        setStyles(parent, {
          display: 'block',
          left: rp.x - r + 'px',
          top: rp.y - r + 'px'
        });

        rs = Math.max(rw, rh) / 2;
        rs = Math.max(rs, options.minSpotlightRadius);
        rs = Math.min(rs, options.maxSpotlightRadius);

        queueDrawBg();

        activeCommandI = undefined;

        inGesture = true;
        gestureStartEvent = e;
      }
    }).on('cxtdrag', options.selector, dragHandler = function dragHandler(e) {

      if (!inGesture) {
        return;
      }

      var origE = e.originalEvent;
      var isTouch = origE.touches && origE.touches.length > 0;

      var pageX = (isTouch ? origE.touches[0].pageX : origE.pageX) - window.pageXOffset;
      var pageY = (isTouch ? origE.touches[0].pageY : origE.pageY) - window.pageYOffset;

      activeCommandI = undefined;

      var dx = pageX - offset.left - ctrx;
      var dy = pageY - offset.top - ctry;
      if (dx === 0) {
        dx = 0.01;
      }

      var d = Math.sqrt(dx * dx + dy * dy);
      var cosTheta = (dy * dy - d * d - dx * dx) / (-2 * d * dx);
      var theta = Math.acos(cosTheta);

      if (d < rs + options.spotlightPadding || d > 100) {
        queueDrawBg();
        return;
      }

      queueDrawBg();
      var rx = dx * r / d;
      var ry = dy * r / d;

      if (dy > 0) {
        theta = Math.PI + Math.abs(theta - Math.PI);
      }

      var dtheta = 2 * Math.PI / commands.length;
      var theta1 = Math.PI / 2;
      var theta2 = theta1 + dtheta;

      for (var i = 0; i < commands.length; i++) {
        var command = commands[i];

        var inThisCommand = theta1 <= theta && theta <= theta2 || theta1 <= theta + 2 * Math.PI && theta + 2 * Math.PI <= theta2;

        if (command.disabled === true || command.enabled === false) {
          inThisCommand = false;
        }

        if (inThisCommand) {
          activeCommandI = i;
          break;
        }

        theta1 += dtheta;
        theta2 += dtheta;
      }

      queueDrawCommands(rx, ry, theta);
    }).on('tapdrag', dragHandler).on('click', function () {
      parent.style.display = 'none';

      if (activeCommandI !== undefined) {
        var select = commands[activeCommandI].select;

        if (select) {
          select.apply(target, [target, gestureStartEvent]);
          activeCommandI = undefined;
        }
      }

      inGesture = false;

      restoreGestures();
    });
  }

  function removeEventListeners() {
    var handlers = data.handlers;

    for (var i = 0; i < handlers.length; i++) {
      var h = handlers[i];

      if (h.selector === 'core') {
        cy.off(h.events, h.fn);
      } else {
        cy.off(h.events, h.selector, h.fn);
      }
    }

    window.removeEventListener('resize', updatePixelRatio);
  }

  function destroyInstance() {
    redrawing = false;

    removeEventListeners();

    wrapper.remove();
  }

  addEventListeners();

  return {
    destroy: function destroy() {
      destroyInstance();
    }
  };
};

module.exports = cxtmenu;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.filter(function (src) {
    return src != null;
  }).forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = {
  menuRadius: 100, // the radius of the circular menu in pixels
  selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: [// an array of commands to list in the menu or a function that returns the array
    /*
    { // example command
      fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
      content: 'a command name' // html/text content to be displayed in the menu
      contentStyle: {}, // css key:value pairs to set the command's css in js if you want
      select: function(ele){ // a function to execute when the command is selected
        console.log( ele.id() ) // `ele` holds the reference to the active element
      },
      enabled: true // whether the command is selectable
    }
    */
  ], // function( ele ){ return [ /*...*/ ] }, // example function for commands
  fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
  activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  openMenuEvents: 'cxttap', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: 'white', // the colour of text in the command's content
  itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false // draw menu at mouse position
};

module.exports = defaults;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var removeEles = function removeEles(query) {
  var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  var els = ancestor.querySelectorAll(query);

  for (var i = 0; i < els.length; i++) {
    var el = els[i];

    el.parentNode.removeChild(el);
  }
};

var setStyles = function setStyles(el, style) {
  var props = Object.keys(style);

  for (var i = 0, l = props.length; i < l; i++) {
    el.style[props[i]] = style[props[i]];
  }
};

var createElement = function createElement(options) {
  options = options || {};

  var el = document.createElement(options.tag || 'div');

  el.className = options.class || '';

  if (options.style) {
    setStyles(el, options.style);
  }

  return el;
};

var getPixelRatio = function getPixelRatio() {
  return window.devicePixelRatio || 1;
};

var getOffset = function getOffset(el) {
  var offset = el.getBoundingClientRect();

  return {
    left: offset.left + document.body.scrollLeft + parseFloat(getComputedStyle(document.body)['padding-left']) + parseFloat(getComputedStyle(document.body)['border-left-width']),
    top: offset.top + document.body.scrollTop + parseFloat(getComputedStyle(document.body)['padding-top']) + parseFloat(getComputedStyle(document.body)['border-top-width'])
  };
};

module.exports = { removeEles: removeEles, setStyles: setStyles, createElement: createElement, getPixelRatio: getPixelRatio, getOffset: getOffset };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxtmenu = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'cxtmenu', cxtmenu); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0YWM3YmM1MDJkOTA2MzJhYzgyOSIsIndlYnBhY2s6Ly8vLi9zcmMvY3h0bWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZG9tLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwicmVxdWlyZSIsImFzc2lnbiIsInJlbW92ZUVsZXMiLCJzZXRTdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UGl4ZWxSYXRpbyIsImdldE9mZnNldCIsImN4dG1lbnUiLCJwYXJhbXMiLCJvcHRpb25zIiwiY3kiLCJjb250YWluZXIiLCJ0YXJnZXQiLCJkYXRhIiwiaGFuZGxlcnMiLCJjbGFzcyIsIndyYXBwZXIiLCJwYXJlbnQiLCJjYW52YXMiLCJ0YWciLCJjb21tYW5kcyIsImMyZCIsImdldENvbnRleHQiLCJyIiwibWVudVJhZGl1cyIsImNvbnRhaW5lclNpemUiLCJhY3RpdmVQYWRkaW5nIiwiYWN0aXZlQ29tbWFuZEkiLCJvZmZzZXQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJwb3NpdGlvbiIsInpJbmRleCIsInVzZXJTZWxlY3QiLCJwb2ludGVyRXZlbnRzIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJkaXNwbGF5Iiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiY3JlYXRlTWVudUl0ZW1zIiwiZHRoZXRhIiwiTWF0aCIsIlBJIiwibGVuZ3RoIiwidGhldGExIiwidGhldGEyIiwiaSIsImNvbW1hbmQiLCJtaWR0aGV0YSIsInJ4MSIsImNvcyIsInJ5MSIsInNpbiIsIml0ZW0iLCJjb2xvciIsIml0ZW1Db2xvciIsImN1cnNvciIsIml0ZW1UZXh0U2hhZG93Q29sb3IiLCJsZWZ0IiwidG9wIiwiY29udGVudCIsIkhUTUxFbGVtZW50IiwiaW5uZXJIVE1MIiwiY29udGVudFN0eWxlIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwic2V0QXR0cmlidXRlIiwicXVldWVEcmF3QmciLCJyc3BvdGxpZ2h0IiwicmVkcmF3UXVldWUiLCJkcmF3QmciLCJ1bmRlZmluZWQiLCJycyIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImNsZWFyUmVjdCIsImZpbGxTdHlsZSIsImZpbGxDb2xvciIsImluZGV4IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwiYXJjIiwiY2xvc2VQYXRoIiwiZmlsbCIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic2VwYXJhdG9yV2lkdGgiLCJsaW5lVG8iLCJzdHJva2UiLCJzcG90bGlnaHRQYWRkaW5nIiwicXVldWVEcmF3Q29tbWFuZHMiLCJyeCIsInJ5IiwidGhldGEiLCJkcmF3Q29tbWFuZHMiLCJhY3RpdmVGaWxsQ29sb3IiLCJ0eCIsImluZGljYXRvclNpemUiLCJ0eSIsInJvdCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsImZpbGxSZWN0IiwidXBkYXRlUGl4ZWxSYXRpbyIsInB4ciIsInciLCJoIiwic3R5bGUiLCJzZXRUcmFuc2Zvcm0iLCJzY2FsZSIsInJlZHJhd2luZyIsInJhZiIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsImZuIiwicmVkcmF3IiwiYXBwbHkiLCJjdHJ4IiwiY3RyeSIsImJpbmRpbmdzIiwib24iLCJldmVudHMiLCJzZWxlY3RvciIsIl9mbiIsImN5VGFyZ2V0IiwicHVzaCIsImFkZEV2ZW50TGlzdGVuZXJzIiwiZ3JhYmJhYmxlIiwiaW5HZXN0dXJlIiwiZHJhZ0hhbmRsZXIiLCJ6b29tRW5hYmxlZCIsInBhbkVuYWJsZWQiLCJib3hFbmFibGVkIiwiZ2VzdHVyZVN0YXJ0RXZlbnQiLCJyZXN0b3JlWm9vbSIsInVzZXJab29taW5nRW5hYmxlZCIsInJlc3RvcmVHcmFiIiwiZ3JhYmlmeSIsInJlc3RvcmVQYW4iLCJ1c2VyUGFubmluZ0VuYWJsZWQiLCJyZXN0b3JlQm94U2VsbiIsImJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZXN0b3JlR2VzdHVyZXMiLCJvcGVuTWVudUV2ZW50cyIsImVsZSIsImlzQ3kiLCJyZXMiLCJ0aGVuIiwiX2NvbW1hbmRzIiwib3Blbk1lbnUiLCJ1bmdyYWJpZnkiLCJycCIsInJ3IiwicmgiLCJpc05vZGUiLCJpc1BhcmVudCIsImF0TW91c2UiLCJyZW5kZXJlZFBvc2l0aW9uIiwicmVuZGVyZWRXaWR0aCIsInJlbmRlcmVkSGVpZ2h0IiwiY3lSZW5kZXJlZFBvc2l0aW9uIiwieCIsInkiLCJtYXgiLCJtaW5TcG90bGlnaHRSYWRpdXMiLCJtaW4iLCJtYXhTcG90bGlnaHRSYWRpdXMiLCJvcmlnRSIsIm9yaWdpbmFsRXZlbnQiLCJpc1RvdWNoIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVhPZmZzZXQiLCJwYWdlWSIsInBhZ2VZT2Zmc2V0IiwiZHgiLCJkeSIsImQiLCJzcXJ0IiwiY29zVGhldGEiLCJhY29zIiwiYWJzIiwiaW5UaGlzQ29tbWFuZCIsInNlbGVjdCIsInJlbW92ZUV2ZW50TGlzdGVuZXJzIiwib2ZmIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3lJbnN0YW5jZSIsInJlbW92ZSIsImRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYmluZCIsInRndCIsInNyY3MiLCJmaWx0ZXIiLCJzcmMiLCJrZXlzIiwiayIsInF1ZXJ5IiwiYW5jZXN0b3IiLCJkb2N1bWVudCIsImVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInByb3BzIiwibCIsImNsYXNzTmFtZSIsImRldmljZVBpeGVsUmF0aW8iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib2R5Iiwic2Nyb2xsTGVmdCIsInBhcnNlRmxvYXQiLCJnZXRDb21wdXRlZFN0eWxlIiwic2Nyb2xsVG9wIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBLDJDQUEyQyxjQUFjOztRQUV6RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsV0FBV0MsbUJBQU9BLENBQUMsQ0FBUixDQUFqQjtBQUNBLElBQU1DLFNBQVNELG1CQUFPQSxDQUFDLENBQVIsQ0FBZjs7ZUFDMkVBLG1CQUFPQSxDQUFDLENBQVIsQztJQUFuRUUsVSxZQUFBQSxVO0lBQVlDLFMsWUFBQUEsUztJQUFXQyxhLFlBQUFBLGE7SUFBZUMsYSxZQUFBQSxhO0lBQWVDLFMsWUFBQUEsUzs7QUFFN0QsSUFBSUMsVUFBVSxTQUFWQSxPQUFVLENBQVNDLE1BQVQsRUFBZ0I7QUFDNUIsTUFBSUMsVUFBVVIsT0FBTyxFQUFQLEVBQVdGLFFBQVgsRUFBcUJTLE1BQXJCLENBQWQ7QUFDQSxNQUFJRSxLQUFLLElBQVQ7QUFD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Z0MsY0FBaEMsQ0FBWCxDQURBLEdBRUFFLFdBQVdDLGlCQUFpQmQsU0FBU1csSUFBMUIsRUFBZ0MsbUJBQWhDLENBQVgsQ0FIRDtBQUlMN0osU0FBS3RDLE9BQU9zQyxHQUFQLEdBQWFrSixTQUFTVyxJQUFULENBQWNJLFNBQTNCLEdBQ0FGLFdBQVdDLGlCQUFpQmQsU0FBU1csSUFBMUIsRUFBZ0MsYUFBaEMsQ0FBWCxDQURBLEdBRUFFLFdBQVdDLGlCQUFpQmQsU0FBU1csSUFBMUIsRUFBZ0Msa0JBQWhDLENBQVg7QUFOQSxHQUFQO0FBUUQsQ0FYRDs7QUFhQXZCLE9BQU9DLE9BQVAsR0FBaUIsRUFBRXZNLHNCQUFGLEVBQWNDLG9CQUFkLEVBQXlCQyw0QkFBekIsRUFBd0NDLDRCQUF4QyxFQUF1REMsb0JBQXZELEVBQWpCLEM7Ozs7Ozs7OztBQ2pEQSxJQUFNQyxVQUFVUCxtQkFBT0EsQ0FBQyxDQUFSLENBQWhCOztBQUVBO0FBQ0EsSUFBSW9PLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxTQUFWLEVBQXFCO0FBQ2xDLE1BQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUFFO0FBQVMsR0FETyxDQUNOOztBQUU1QkEsWUFBVyxNQUFYLEVBQW1CLFNBQW5CLEVBQThCOU4sT0FBOUIsRUFIa0MsQ0FHTztBQUMxQyxDQUpEOztBQU1BLElBQUksT0FBTzhOLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFBRTtBQUN0Q0QsV0FBVUMsU0FBVjtBQUNEOztBQUVEN0IsT0FBT0MsT0FBUCxHQUFpQjJCLFFBQWpCLEMiLCJmaWxlIjoiY3l0b3NjYXBlLWN4dG1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeXRvc2NhcGVDeHRtZW51XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUN4dG1lbnVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YWM3YmM1MDJkOTA2MzJhYzgyOSIsImNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbmNvbnN0IHsgcmVtb3ZlRWxlcywgc2V0U3R5bGVzLCBjcmVhdGVFbGVtZW50LCBnZXRQaXhlbFJhdGlvLCBnZXRPZmZzZXQgfSA9IHJlcXVpcmUoJy4vZG9tLXV0aWwnKTtcblxubGV0IGN4dG1lbnUgPSBmdW5jdGlvbihwYXJhbXMpe1xuICBsZXQgb3B0aW9ucyA9IGFzc2lnbih7fSwgZGVmYXVsdHMsIHBhcmFtcyk7XG4gIGxldCBjeSA9IHRoaXM7XG4gIGxldCBjb250YWluZXIgPSBjeS5jb250YWluZXIoKTtcbiAgbGV0IHRhcmdldDtcblxuICBsZXQgZGF0YSA9IHtcbiAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgIGhhbmRsZXJzOiBbXSxcbiAgICBjb250YWluZXI6IGNyZWF0ZUVsZW1lbnQoe2NsYXNzOiAnY3h0bWVudSd9KVxuICB9O1xuXG4gIGxldCB3cmFwcGVyID0gZGF0YS5jb250YWluZXI7XG4gIGxldCBwYXJlbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gIGxldCBjYW52YXMgPSBjcmVhdGVFbGVtZW50KHt0YWc6ICdjYW52YXMnfSk7XG4gIGxldCBjb21tYW5kcyA9IFtdO1xuICBsZXQgYzJkID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGxldCByID0gb3B0aW9ucy5tZW51UmFkaXVzO1xuICBsZXQgY29udGFpbmVyU2l6ZSA9IChyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nKSoyO1xuICBsZXQgYWN0aXZlQ29tbWFuZEk7XG4gIGxldCBvZmZzZXQ7XG5cbiAgY29udGFpbmVyLmluc2VydEJlZm9yZSh3cmFwcGVyLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQocGFyZW50KTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgc2V0U3R5bGVzKHdyYXBwZXIsIHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6IG9wdGlvbnMuekluZGV4LFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScgLy8gcHJldmVudCBldmVudHMgb24gbWVudSBpbiBtb2Rlcm4gYnJvd3NlcnNcbiAgfSk7XG5cbiAgLy8gcHJldmVudCBldmVudHMgb24gbWVudSBpbiBsZWdhY3kgYnJvd3NlcnNcbiAgWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnY29udGV4dG1lbnUnXS5mb3JFYWNoKGV2dCA9PiB7XG4gICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKGV2dCwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgc2V0U3R5bGVzKHBhcmVudCwge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICB3aWR0aDogY29udGFpbmVyU2l6ZSArICdweCcsXG4gICAgaGVpZ2h0OiBjb250YWluZXJTaXplICsgJ3B4JyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6IDEsXG4gICAgbWFyZ2luTGVmdDogLSBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyAncHgnLFxuICAgIG1hcmdpblRvcDogLSBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyAncHgnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJ1xuICB9KTtcblxuICBjYW52YXMud2lkdGggPSBjb250YWluZXJTaXplO1xuICBjYW52YXMuaGVpZ2h0ID0gY29udGFpbmVyU2l6ZTtcblxuICBmdW5jdGlvbiBjcmVhdGVNZW51SXRlbXMoKSB7XG4gICAgcmVtb3ZlRWxlcygnLmN4dG1lbnUtaXRlbScsIHBhcmVudCk7XG4gICAgbGV0IGR0aGV0YSA9IDIgKiBNYXRoLlBJIC8gKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgbGV0IHRoZXRhMSA9IE1hdGguUEkgLyAyO1xuICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2ldO1xuXG4gICAgICBsZXQgbWlkdGhldGEgPSAodGhldGExICsgdGhldGEyKSAvIDI7XG4gICAgICBsZXQgcngxID0gMC42NiAqIHIgKiBNYXRoLmNvcyhtaWR0aGV0YSk7XG4gICAgICBsZXQgcnkxID0gMC42NiAqIHIgKiBNYXRoLnNpbihtaWR0aGV0YSk7XG5cbiAgICAgIGxldCBpdGVtID0gY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51LWl0ZW0nfSk7XG4gICAgICBzZXRTdHlsZXMoaXRlbSwge1xuICAgICAgICBjb2xvcjogb3B0aW9ucy5pdGVtQ29sb3IsXG4gICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICBkaXNwbGF5OiAndGFibGUnLFxuICAgICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInLFxuICAgICAgICAvL2JhY2tncm91bmQ6ICdyZWQnLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgJ3RleHQtc2hhZG93JzogJy0xcHggLTFweCAycHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvciArICcsIDFweCAtMXB4IDJweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yICsgJywgLTFweCAxcHggMnB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IgKyAnLCAxcHggMXB4IDFweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yLFxuICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgJ21pbi1oZWlnaHQnOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICBtYXJnaW5MZWZ0OiAocngxIC0gciAqIDAuMzMpICsgJ3B4JyxcbiAgICAgICAgbWFyZ2luVG9wOiAoLXJ5MSAtIHIgKiAwLjMzKSArICdweCdcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgY29udGVudCA9IGNyZWF0ZUVsZW1lbnQoe2NsYXNzOiAnY3h0bWVudS1jb250ZW50J30pO1xuXG4gICAgICBpZiggY29tbWFuZC5jb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKXtcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZCggY29tbWFuZC5jb250ZW50ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGNvbW1hbmQuY29udGVudDtcbiAgICAgIH1cblxuICAgICAgc2V0U3R5bGVzKGNvbnRlbnQsIHtcbiAgICAgICAgJ3dpZHRoJzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgICdoZWlnaHQnOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogJ21pZGRsZScsXG4gICAgICAgICdkaXNwbGF5JzogJ3RhYmxlLWNlbGwnXG4gICAgICB9KTtcblxuICAgICAgc2V0U3R5bGVzKGNvbnRlbnQsIGNvbW1hbmQuY29udGVudFN0eWxlIHx8IHt9KTtcblxuICAgICAgaWYgKGNvbW1hbmQuZGlzYWJsZWQgPT09IHRydWUgfHwgY29tbWFuZC5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICBjb250ZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY3h0bWVudS1jb250ZW50IGN4dG1lbnUtZGlzYWJsZWQnKTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgICAgdGhldGExICs9IGR0aGV0YTtcbiAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcXVldWVEcmF3QmcoIHJzcG90bGlnaHQgKXtcbiAgICByZWRyYXdRdWV1ZS5kcmF3QmcgPSBbIHJzcG90bGlnaHQgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdCZyggcnNwb3RsaWdodCApe1xuICAgIHJzcG90bGlnaHQgPSByc3BvdGxpZ2h0ICE9PSB1bmRlZmluZWQgPyByc3BvdGxpZ2h0IDogcnM7XG5cbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcblxuICAgIGMyZC5jbGVhclJlY3QoMCwgMCwgY29udGFpbmVyU2l6ZSwgY29udGFpbmVyU2l6ZSk7XG5cbiAgICAvLyBkcmF3IGJhY2tncm91bmQgaXRlbXNcbiAgICBjMmQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3I7XG4gICAgbGV0IGR0aGV0YSA9IDIqTWF0aC5QSS8oY29tbWFuZHMubGVuZ3RoKTtcbiAgICBsZXQgdGhldGExID0gTWF0aC5QSS8yO1xuICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IoIGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tbWFuZHMubGVuZ3RoOyBpbmRleCsrICl7XG4gICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2luZGV4XTtcblxuICAgICAgaWYoIGNvbW1hbmQuZmlsbENvbG9yICl7XG4gICAgICAgIGMyZC5maWxsU3R5bGUgPSBjb21tYW5kLmZpbGxDb2xvcjtcbiAgICAgIH1cbiAgICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICAgIGMyZC5tb3ZlVG8ociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyk7XG4gICAgICBjMmQuYXJjKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIsIDIqTWF0aC5QSSAtIHRoZXRhMSwgMipNYXRoLlBJIC0gdGhldGEyLCB0cnVlKTtcbiAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgIGMyZC5maWxsKCk7XG5cbiAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuXG4gICAgICBjMmQuZmlsbFN0eWxlID0gb3B0aW9ucy5maWxsQ29sb3I7XG4gICAgfVxuICAgIC8vIGRyYXcgc2VwYXJhdG9ycyBiZXR3ZWVuIGl0ZW1zXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuICAgIGMyZC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gICAgYzJkLmxpbmVXaWR0aCA9IG9wdGlvbnMuc2VwYXJhdG9yV2lkdGg7XG4gICAgdGhldGExID0gTWF0aC5QSS8yO1xuICAgIHRoZXRhMiA9IHRoZXRhMSArIGR0aGV0YTtcblxuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgIGxldCByeDEgPSByICogTWF0aC5jb3ModGhldGExKTtcbiAgICAgIGxldCByeTEgPSByICogTWF0aC5zaW4odGhldGExKTtcbiAgICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICAgIGMyZC5tb3ZlVG8ociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyk7XG4gICAgICBjMmQubGluZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyByeDEsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgLSByeTEpO1xuICAgICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgICAgYzJkLnN0cm9rZSgpO1xuXG4gICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgdGhldGEyICs9IGR0aGV0YTtcbiAgICB9XG5cblxuICAgIGMyZC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmFyYyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByc3BvdGxpZ2h0ICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gIH1cblxuICBmdW5jdGlvbiBxdWV1ZURyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApe1xuICAgIHJlZHJhd1F1ZXVlLmRyYXdDb21tYW5kcyA9IFsgcngsIHJ5LCB0aGV0YSBdO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0NvbW1hbmRzKCByeCwgcnksIHRoZXRhICl7XG4gICAgbGV0IGR0aGV0YSA9IDIqTWF0aC5QSS8oY29tbWFuZHMubGVuZ3RoKTtcbiAgICBsZXQgdGhldGExID0gTWF0aC5QSS8yO1xuICAgIGxldCB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICB0aGV0YTEgKz0gZHRoZXRhICogYWN0aXZlQ29tbWFuZEk7XG4gICAgdGhldGEyICs9IGR0aGV0YSAqIGFjdGl2ZUNvbW1hbmRJO1xuXG4gICAgYzJkLmZpbGxTdHlsZSA9IG9wdGlvbnMuYWN0aXZlRmlsbENvbG9yO1xuICAgIGMyZC5zdHJva2VTdHlsZSA9ICdibGFjayc7XG4gICAgYzJkLmxpbmVXaWR0aCA9IDE7XG4gICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgIGMyZC5tb3ZlVG8ociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyk7XG4gICAgYzJkLmFyYyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCAyKk1hdGguUEkgLSB0aGV0YTEsIDIqTWF0aC5QSSAtIHRoZXRhMiwgdHJ1ZSk7XG4gICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgIGMyZC5maWxsKCk7XG5cbiAgICBjMmQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG5cbiAgICBsZXQgdHggPSByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nICsgcngvcioocnMgKyBvcHRpb25zLnNwb3RsaWdodFBhZGRpbmcgLSBvcHRpb25zLmluZGljYXRvclNpemUvNCk7XG4gICAgbGV0IHR5ID0gciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ5L3IqKHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIC0gb3B0aW9ucy5pbmRpY2F0b3JTaXplLzQpO1xuICAgIGxldCByb3QgPSBNYXRoLlBJLzQgLSB0aGV0YTtcblxuICAgIGMyZC50cmFuc2xhdGUoIHR4LCB0eSApO1xuICAgIGMyZC5yb3RhdGUoIHJvdCApO1xuXG4gICAgLy8gY2xlYXIgdGhlIGluZGljYXRvclxuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQuZmlsbFJlY3QoLW9wdGlvbnMuaW5kaWNhdG9yU2l6ZS8yLCAtb3B0aW9ucy5pbmRpY2F0b3JTaXplLzIsIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSwgb3B0aW9ucy5pbmRpY2F0b3JTaXplKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5yb3RhdGUoIC1yb3QgKTtcbiAgICBjMmQudHJhbnNsYXRlKCAtdHgsIC10eSApO1xuXG4gICAgLy8gYzJkLnNldFRyYW5zZm9ybSggMSwgMCwgMCwgMSwgMCwgMCApO1xuXG4gICAgLy8gY2xlYXIgdGhlIHNwb3RsaWdodFxuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQuYXJjKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQaXhlbFJhdGlvKCl7XG4gICAgbGV0IHB4ciA9IGdldFBpeGVsUmF0aW8oKTtcbiAgICBsZXQgdyA9IGNvbnRhaW5lclNpemU7XG4gICAgbGV0IGggPSBjb250YWluZXJTaXplO1xuXG4gICAgY2FudmFzLndpZHRoID0gdyAqIHB4cjtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaCAqIHB4cjtcblxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcblxuICAgIGMyZC5zZXRUcmFuc2Zvcm0oIDEsIDAsIDAsIDEsIDAsIDAgKTtcbiAgICBjMmQuc2NhbGUoIHB4ciwgcHhyICk7XG4gIH1cblxuICBsZXQgcmVkcmF3aW5nID0gdHJ1ZTtcbiAgbGV0IHJlZHJhd1F1ZXVlID0ge307XG5cbiAgbGV0IHJhZiA9IChcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCAoZm4gPT4gc2V0VGltZW91dChmbiwgMTYpKVxuICApO1xuXG4gIGxldCByZWRyYXcgPSBmdW5jdGlvbigpe1xuICAgIGlmKCByZWRyYXdRdWV1ZS5kcmF3QmcgKXtcbiAgICAgIGRyYXdCZy5hcHBseSggbnVsbCwgcmVkcmF3UXVldWUuZHJhd0JnICk7XG4gICAgfVxuXG4gICAgaWYoIHJlZHJhd1F1ZXVlLmRyYXdDb21tYW5kcyApe1xuICAgICAgZHJhd0NvbW1hbmRzLmFwcGx5KCBudWxsLCByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgKTtcbiAgICB9XG5cbiAgICByZWRyYXdRdWV1ZSA9IHt9O1xuXG4gICAgaWYoIHJlZHJhd2luZyApe1xuICAgICAgcmFmKCByZWRyYXcgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8ga2ljayBvZmZcbiAgdXBkYXRlUGl4ZWxSYXRpbygpO1xuICByZWRyYXcoKTtcblxuICBsZXQgY3RyeCwgY3RyeSwgcnM7XG5cbiAgbGV0IGJpbmRpbmdzID0ge1xuICAgIG9uOiBmdW5jdGlvbihldmVudHMsIHNlbGVjdG9yLCBmbil7XG5cbiAgICAgIGxldCBfZm4gPSBmbjtcbiAgICAgIGlmKCBzZWxlY3RvciA9PT0gJ2NvcmUnKXtcbiAgICAgICAgX2ZuID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICBpZiggZS5jeVRhcmdldCA9PT0gY3kgfHwgZS50YXJnZXQgPT09IGN5ICl7IC8vIG9ubHkgaWYgZXZlbnQgdGFyZ2V0IGlzIGRpcmVjdGx5IGNvcmVcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSggdGhpcywgWyBlIF0gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGRhdGEuaGFuZGxlcnMucHVzaCh7XG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICAgIGZuOiBfZm5cbiAgICAgIH0pO1xuXG4gICAgICBpZiggc2VsZWN0b3IgPT09ICdjb3JlJyApe1xuICAgICAgICBjeS5vbihldmVudHMsIF9mbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjeS5vbihldmVudHMsIHNlbGVjdG9yLCBfZm4pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBsZXQgZ3JhYmJhYmxlO1xuICAgIGxldCBpbkdlc3R1cmUgPSBmYWxzZTtcbiAgICBsZXQgZHJhZ0hhbmRsZXI7XG4gICAgbGV0IHpvb21FbmFibGVkO1xuICAgIGxldCBwYW5FbmFibGVkO1xuICAgIGxldCBib3hFbmFibGVkO1xuICAgIGxldCBnZXN0dXJlU3RhcnRFdmVudDtcblxuICAgIGxldCByZXN0b3JlWm9vbSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggem9vbUVuYWJsZWQgKXtcbiAgICAgICAgY3kudXNlclpvb21pbmdFbmFibGVkKCB0cnVlICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCByZXN0b3JlR3JhYiA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgIHRhcmdldC5ncmFiaWZ5KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCByZXN0b3JlUGFuID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBwYW5FbmFibGVkICl7XG4gICAgICAgIGN5LnVzZXJQYW5uaW5nRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUJveFNlbG4gPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIGJveEVuYWJsZWQgKXtcbiAgICAgICAgY3kuYm94U2VsZWN0aW9uRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUdlc3R1cmVzID0gZnVuY3Rpb24oKXtcbiAgICAgIHJlc3RvcmVHcmFiKCk7XG4gICAgICByZXN0b3JlWm9vbSgpO1xuICAgICAgcmVzdG9yZVBhbigpO1xuICAgICAgcmVzdG9yZUJveFNlbG4oKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVBpeGVsUmF0aW8pO1xuXG4gICAgYmluZGluZ3NcbiAgICAgIC5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdXBkYXRlUGl4ZWxSYXRpbygpO1xuICAgICAgfSlcblxuICAgICAgLm9uKG9wdGlvbnMub3Blbk1lbnVFdmVudHMsIG9wdGlvbnMuc2VsZWN0b3IsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB0YXJnZXQgPSB0aGlzOyAvLyBSZW1lbWJlciB3aGljaCBub2RlIHRoZSBjb250ZXh0IG1lbnUgaXMgZm9yXG4gICAgICAgIGxldCBlbGUgPSB0aGlzO1xuICAgICAgICBsZXQgaXNDeSA9IHRoaXMgPT09IGN5O1xuXG4gICAgICAgIGlmIChpbkdlc3R1cmUpIHtcbiAgICAgICAgICBwYXJlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgIGluR2VzdHVyZSA9IGZhbHNlO1xuXG4gICAgICAgICAgcmVzdG9yZUdlc3R1cmVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggdHlwZW9mIG9wdGlvbnMuY29tbWFuZHMgPT09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICBjb25zdCByZXMgPSBvcHRpb25zLmNvbW1hbmRzKHRhcmdldCk7XG4gICAgICAgICAgaWYoIHJlcy50aGVuICl7XG4gICAgICAgICAgICByZXMudGhlbihfY29tbWFuZHMgPT4ge1xuICAgICAgICAgICAgICBjb21tYW5kcyA9IF9jb21tYW5kcztcbiAgICAgICAgICAgICAgb3Blbk1lbnUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21tYW5kcyA9IHJlcztcbiAgICAgICAgICAgIG9wZW5NZW51KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmRzID0gb3B0aW9ucy5jb21tYW5kcztcbiAgICAgICAgICBvcGVuTWVudSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb3Blbk1lbnUoKXtcbiAgICAgICAgICBpZiggIWNvbW1hbmRzIHx8IGNvbW1hbmRzLmxlbmd0aCA9PT0gMCApeyByZXR1cm47IH1cblxuICAgICAgICAgIHpvb21FbmFibGVkID0gY3kudXNlclpvb21pbmdFbmFibGVkKCk7XG4gICAgICAgICAgY3kudXNlclpvb21pbmdFbmFibGVkKCBmYWxzZSApO1xuXG4gICAgICAgICAgcGFuRW5hYmxlZCA9IGN5LnVzZXJQYW5uaW5nRW5hYmxlZCgpO1xuICAgICAgICAgIGN5LnVzZXJQYW5uaW5nRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICAgIGJveEVuYWJsZWQgPSBjeS5ib3hTZWxlY3Rpb25FbmFibGVkKCk7XG4gICAgICAgICAgY3kuYm94U2VsZWN0aW9uRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICAgIGdyYWJiYWJsZSA9IHRhcmdldC5ncmFiYmFibGUgJiYgIHRhcmdldC5ncmFiYmFibGUoKTtcbiAgICAgICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgICAgICB0YXJnZXQudW5ncmFiaWZ5KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJwLCBydywgcmg7XG4gICAgICAgICAgaWYoICFpc0N5ICYmIGVsZS5pc05vZGUoKSAmJiAhZWxlLmlzUGFyZW50KCkgJiYgIW9wdGlvbnMuYXRNb3VzZSApe1xuICAgICAgICAgICAgcnAgPSBlbGUucmVuZGVyZWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgcncgPSBlbGUucmVuZGVyZWRXaWR0aCgpO1xuICAgICAgICAgICAgcmggPSBlbGUucmVuZGVyZWRIZWlnaHQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcnAgPSBlLnJlbmRlcmVkUG9zaXRpb24gfHwgZS5jeVJlbmRlcmVkUG9zaXRpb247XG4gICAgICAgICAgICBydyA9IDE7XG4gICAgICAgICAgICByaCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb2Zmc2V0ID0gZ2V0T2Zmc2V0KGNvbnRhaW5lcik7XG5cbiAgICAgICAgICBjdHJ4ID0gcnAueDtcbiAgICAgICAgICBjdHJ5ID0gcnAueTtcblxuICAgICAgICAgIGNyZWF0ZU1lbnVJdGVtcygpO1xuXG4gICAgICAgICAgc2V0U3R5bGVzKHBhcmVudCwge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIGxlZnQ6IChycC54IC0gcikgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocnAueSAtIHIpICsgJ3B4J1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcnMgPSBNYXRoLm1heChydywgcmgpLzI7XG4gICAgICAgICAgcnMgPSBNYXRoLm1heChycywgb3B0aW9ucy5taW5TcG90bGlnaHRSYWRpdXMpO1xuICAgICAgICAgIHJzID0gTWF0aC5taW4ocnMsIG9wdGlvbnMubWF4U3BvdGxpZ2h0UmFkaXVzKTtcblxuICAgICAgICAgIHF1ZXVlRHJhd0JnKCk7XG5cbiAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGluR2VzdHVyZSA9IHRydWU7XG4gICAgICAgICAgZ2VzdHVyZVN0YXJ0RXZlbnQgPSBlO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAub24oJ2N4dGRyYWcnLCBvcHRpb25zLnNlbGVjdG9yLCBkcmFnSGFuZGxlciA9IGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIGlmKCAhaW5HZXN0dXJlICl7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBvcmlnRSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgbGV0IGlzVG91Y2ggPSBvcmlnRS50b3VjaGVzICYmIG9yaWdFLnRvdWNoZXMubGVuZ3RoID4gMDtcblxuICAgICAgICBsZXQgcGFnZVggPSAoaXNUb3VjaCA/IG9yaWdFLnRvdWNoZXNbMF0ucGFnZVggOiBvcmlnRS5wYWdlWCkgLSB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIGxldCBwYWdlWSA9IChpc1RvdWNoID8gb3JpZ0UudG91Y2hlc1swXS5wYWdlWSA6IG9yaWdFLnBhZ2VZKSAtIHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsZXQgZHggPSBwYWdlWCAtIG9mZnNldC5sZWZ0IC0gY3RyeDtcbiAgICAgICAgbGV0IGR5ID0gcGFnZVkgLSBvZmZzZXQudG9wIC0gY3RyeTtcbiAgICAgICAgaWYoIGR4ID09PSAwICl7IGR4ID0gMC4wMTsgfVxuXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG4gICAgICAgIGxldCBjb3NUaGV0YSA9IChkeSpkeSAtIGQqZCAtIGR4KmR4KS8oLTIgKiBkICogZHgpO1xuICAgICAgICBsZXQgdGhldGEgPSBNYXRoLmFjb3MoIGNvc1RoZXRhICk7XG5cbiAgICAgICAgaWYoIGQgPCBycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZyB8fCBkID4gMTAwICl7XG4gICAgICAgICAgcXVldWVEcmF3QmcoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZURyYXdCZygpO1xuICAgICAgICBsZXQgcnggPSBkeCpyIC8gZDtcbiAgICAgICAgbGV0IHJ5ID0gZHkqciAvIGQ7XG5cbiAgICAgICAgaWYoIGR5ID4gMCApe1xuICAgICAgICAgIHRoZXRhID0gTWF0aC5QSSArIE1hdGguYWJzKHRoZXRhIC0gTWF0aC5QSSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHRoZXRhID0gMipNYXRoLlBJLyhjb21tYW5kcy5sZW5ndGgpO1xuICAgICAgICBsZXQgdGhldGExID0gTWF0aC5QSS8yO1xuICAgICAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2ldO1xuXG4gICAgICAgICAgbGV0IGluVGhpc0NvbW1hbmQgPSB0aGV0YTEgPD0gdGhldGEgJiYgdGhldGEgPD0gdGhldGEyXG4gICAgICAgICAgICB8fCB0aGV0YTEgPD0gdGhldGEgKyAyKk1hdGguUEkgJiYgdGhldGEgKyAyKk1hdGguUEkgPD0gdGhldGEyO1xuXG4gICAgICAgICAgaWYoIGNvbW1hbmQuZGlzYWJsZWQgPT09IHRydWUgfHwgY29tbWFuZC5lbmFibGVkID09PSBmYWxzZSApe1xuICAgICAgICAgICAgaW5UaGlzQ29tbWFuZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpblRoaXNDb21tYW5kICl7XG4gICAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZURyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApO1xuICAgICAgfSlcblxuICAgICAgLm9uKCd0YXBkcmFnJywgZHJhZ0hhbmRsZXIpXG5cbiAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBwYXJlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICBpZiggYWN0aXZlQ29tbWFuZEkgIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgIGxldCBzZWxlY3QgPSBjb21tYW5kc1sgYWN0aXZlQ29tbWFuZEkgXS5zZWxlY3Q7XG5cbiAgICAgICAgICBpZiggc2VsZWN0ICl7XG4gICAgICAgICAgICBzZWxlY3QuYXBwbHkoIHRhcmdldCwgW3RhcmdldCwgZ2VzdHVyZVN0YXJ0RXZlbnRdICk7XG4gICAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbkdlc3R1cmUgPSBmYWxzZTtcblxuICAgICAgICByZXN0b3JlR2VzdHVyZXMoKTtcbiAgICAgIH0pXG4gICAgO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBsZXQgaGFuZGxlcnMgPSBkYXRhLmhhbmRsZXJzO1xuXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKyApe1xuICAgICAgbGV0IGggPSBoYW5kbGVyc1tpXTtcblxuICAgICAgaWYoIGguc2VsZWN0b3IgPT09ICdjb3JlJyApe1xuICAgICAgICBjeS5vZmYoaC5ldmVudHMsIGguZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub2ZmKGguZXZlbnRzLCBoLnNlbGVjdG9yLCBoLmZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUGl4ZWxSYXRpbyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95SW5zdGFuY2UoKXtcbiAgICByZWRyYXdpbmcgPSBmYWxzZTtcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB3cmFwcGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICBkZXN0cm95SW5zdGFuY2UoKTtcbiAgICB9XG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3h0bWVudTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeHRtZW51LmpzIiwiLy8gU2ltcGxlLCBpbnRlcm5hbCBPYmplY3QuYXNzaWduKCkgcG9seWZpbGwgZm9yIG9wdGlvbnMgb2JqZWN0cyBldGMuXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKCBPYmplY3QgKSA6IGZ1bmN0aW9uKCB0Z3QsIC4uLnNyY3MgKXtcbiAgc3Jjcy5maWx0ZXIoc3JjID0+IHNyYyAhPSBudWxsKS5mb3JFYWNoKCBzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKCBzcmMgKS5mb3JFYWNoKCBrID0+IHRndFtrXSA9IHNyY1trXSApO1xuICB9ICk7XG5cbiAgcmV0dXJuIHRndDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwibGV0IGRlZmF1bHRzID0ge1xuICBtZW51UmFkaXVzOiAxMDAsIC8vIHRoZSByYWRpdXMgb2YgdGhlIGNpcmN1bGFyIG1lbnUgaW4gcGl4ZWxzXG4gIHNlbGVjdG9yOiAnbm9kZScsIC8vIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgQ3l0b3NjYXBlLmpzIHNlbGVjdG9yIHdpbGwgdHJpZ2dlciBjeHRtZW51c1xuICBjb21tYW5kczogWyAvLyBhbiBhcnJheSBvZiBjb21tYW5kcyB0byBsaXN0IGluIHRoZSBtZW51IG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhcnJheVxuICAgIC8qXG4gICAgeyAvLyBleGFtcGxlIGNvbW1hbmRcbiAgICAgIGZpbGxDb2xvcjogJ3JnYmEoMjAwLCAyMDAsIDIwMCwgMC43NSknLCAvLyBvcHRpb25hbDogY3VzdG9tIGJhY2tncm91bmQgY29sb3IgZm9yIGl0ZW1cbiAgICAgIGNvbnRlbnQ6ICdhIGNvbW1hbmQgbmFtZScgLy8gaHRtbC90ZXh0IGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBtZW51XG4gICAgICBjb250ZW50U3R5bGU6IHt9LCAvLyBjc3Mga2V5OnZhbHVlIHBhaXJzIHRvIHNldCB0aGUgY29tbWFuZCdzIGNzcyBpbiBqcyBpZiB5b3Ugd2FudFxuICAgICAgc2VsZWN0OiBmdW5jdGlvbihlbGUpeyAvLyBhIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29tbWFuZCBpcyBzZWxlY3RlZFxuICAgICAgICBjb25zb2xlLmxvZyggZWxlLmlkKCkgKSAvLyBgZWxlYCBob2xkcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhY3RpdmUgZWxlbWVudFxuICAgICAgfSxcbiAgICAgIGVuYWJsZWQ6IHRydWUgLy8gd2hldGhlciB0aGUgY29tbWFuZCBpcyBzZWxlY3RhYmxlXG4gICAgfVxuICAgICovXG4gIF0sIC8vIGZ1bmN0aW9uKCBlbGUgKXsgcmV0dXJuIFsgLyouLi4qLyBdIH0sIC8vIGV4YW1wbGUgZnVuY3Rpb24gZm9yIGNvbW1hbmRzXG4gIGZpbGxDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43NSknLCAvLyB0aGUgYmFja2dyb3VuZCBjb2xvdXIgb2YgdGhlIG1lbnVcbiAgYWN0aXZlRmlsbENvbG9yOiAncmdiYSgxLCAxMDUsIDIxNywgMC43NSknLCAvLyB0aGUgY29sb3VyIHVzZWQgdG8gaW5kaWNhdGUgdGhlIHNlbGVjdGVkIGNvbW1hbmRcbiAgYWN0aXZlUGFkZGluZzogMjAsIC8vIGFkZGl0aW9uYWwgc2l6ZSBpbiBwaXhlbHMgZm9yIHRoZSBhY3RpdmUgY29tbWFuZFxuICBpbmRpY2F0b3JTaXplOiAyNCwgLy8gdGhlIHNpemUgaW4gcGl4ZWxzIG9mIHRoZSBwb2ludGVyIHRvIHRoZSBhY3RpdmUgY29tbWFuZFxuICBzZXBhcmF0b3JXaWR0aDogMywgLy8gdGhlIGVtcHR5IHNwYWNpbmcgaW4gcGl4ZWxzIGJldHdlZW4gc3VjY2Vzc2l2ZSBjb21tYW5kc1xuICBzcG90bGlnaHRQYWRkaW5nOiA0LCAvLyBleHRyYSBzcGFjaW5nIGluIHBpeGVscyBiZXR3ZWVuIHRoZSBlbGVtZW50IGFuZCB0aGUgc3BvdGxpZ2h0XG4gIG1pblNwb3RsaWdodFJhZGl1czogMjQsIC8vIHRoZSBtaW5pbXVtIHJhZGl1cyBpbiBwaXhlbHMgb2YgdGhlIHNwb3RsaWdodFxuICBtYXhTcG90bGlnaHRSYWRpdXM6IDM4LCAvLyB0aGUgbWF4aW11bSByYWRpdXMgaW4gcGl4ZWxzIG9mIHRoZSBzcG90bGlnaHRcbiAgb3Blbk1lbnVFdmVudHM6ICdjeHR0YXAnLCAvLyBzcGFjZS1zZXBhcmF0ZWQgY3l0b3NjYXBlIGV2ZW50cyB0aGF0IHdpbGwgb3BlbiB0aGUgbWVudTsgb25seSBgY3h0dGFwc3RhcnRgIGFuZC9vciBgdGFwaG9sZGAgd29yayBoZXJlXG4gIGl0ZW1Db2xvcjogJ3doaXRlJywgLy8gdGhlIGNvbG91ciBvZiB0ZXh0IGluIHRoZSBjb21tYW5kJ3MgY29udGVudFxuICBpdGVtVGV4dFNoYWRvd0NvbG9yOiAndHJhbnNwYXJlbnQnLCAvLyB0aGUgdGV4dCBzaGFkb3cgY29sb3VyIG9mIHRoZSBjb21tYW5kJ3MgY29udGVudFxuICB6SW5kZXg6IDk5OTksIC8vIHRoZSB6LWluZGV4IG9mIHRoZSB1aSBkaXZcbiAgYXRNb3VzZTogZmFsc2UgLy8gZHJhdyBtZW51IGF0IG1vdXNlIHBvc2l0aW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlZmF1bHRzLmpzIiwiY29uc3QgcmVtb3ZlRWxlcyA9IGZ1bmN0aW9uKHF1ZXJ5LCBhbmNlc3RvciA9IGRvY3VtZW50KSB7XG4gIGxldCBlbHMgPSBhbmNlc3Rvci5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KTtcblxuICBmb3IoIGxldCBpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKyApe1xuICAgIGxldCBlbCA9IGVsc1tpXTtcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICB9XG59O1xuXG5jb25zdCBzZXRTdHlsZXMgPSBmdW5jdGlvbihlbCwgc3R5bGUpIHtcbiAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoc3R5bGUpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcHJvcHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZWwuc3R5bGVbcHJvcHNbaV1dID0gc3R5bGVbcHJvcHNbaV1dO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQob3B0aW9ucy50YWcgfHwgJ2RpdicpO1xuXG4gIGVsLmNsYXNzTmFtZSA9IG9wdGlvbnMuY2xhc3MgfHwgJyc7XG5cbiAgaWYgKG9wdGlvbnMuc3R5bGUpIHtcbiAgICBzZXRTdHlsZXMoZWwsIG9wdGlvbnMuc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIGVsO1xufTtcblxuY29uc3QgZ2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xufTtcblxuY29uc3QgZ2V0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpe1xuICBsZXQgb2Zmc2V0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBvZmZzZXQubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArXG4gICAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWydwYWRkaW5nLWxlZnQnXSkgK1xuICAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsnYm9yZGVyLWxlZnQtd2lkdGgnXSksXG4gICAgdG9wOiBvZmZzZXQudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgK1xuICAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWydwYWRkaW5nLXRvcCddKSArXG4gICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbJ2JvcmRlci10b3Atd2lkdGgnXSlcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyByZW1vdmVFbGVzLCBzZXRTdHlsZXMsIGNyZWF0ZUVsZW1lbnQsIGdldFBpeGVsUmF0aW8sIGdldE9mZnNldCB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RvbS11dGlsLmpzIiwiY29uc3QgY3h0bWVudSA9IHJlcXVpcmUoJy4vY3h0bWVudScpO1xuXG4vLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXG5sZXQgcmVnaXN0ZXIgPSBmdW5jdGlvbiggY3l0b3NjYXBlICl7XG4gIGlmKCAhY3l0b3NjYXBlICl7IHJldHVybjsgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICBjeXRvc2NhcGUoICdjb3JlJywgJ2N4dG1lbnUnLCBjeHRtZW51ICk7IC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG59O1xuXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoIGN5dG9zY2FwZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==