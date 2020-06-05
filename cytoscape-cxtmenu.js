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

    var startHandler = function startHandler(e) {
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
    };

    var closeMenuEvents = options.openMenuEvents === 'cxttap' ? 'click' : 'cxttapend tapend';

    var dragHandler = function dragHandler(e) {
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

      if (d < rs + options.spotlightPadding || options.openMenuEvents === 'cxttap' && d > containerSize / 2) {
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
    };

    var endHandler = function endHandler() {
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
    };

    window.addEventListener('resize', updatePixelRatio);

    bindings.on('resize', updatePixelRatio()).on(options.openMenuEvents, options.selector, startHandler).on('cxtdrag tapdrag', options.selector, dragHandler).on('tapdrag', dragHandler).on(closeMenuEvents, endHandler);
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
  openMenuEvents: 'cxttapstart taphold', // supported space-separated cytoscape events that will open the menu: `cxttapstart`, `taphold`, `cxttap`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZDZiMGE2OWMyMzkyZWRjZjNkMCIsIndlYnBhY2s6Ly8vLi9zcmMvY3h0bWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZG9tLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwicmVxdWlyZSIsImFzc2lnbiIsInJlbW92ZUVsZXMiLCJzZXRTdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UGl4ZWxSYXRpbyIsImdldE9mZnNldCIsImN4dG1lbnUiLCJwYXJhbXMiLCJvcHRpb25zIiwiY3kiLCJjb250YWluZXIiLCJ0YXJnZXQiLCJkYXRhIiwiaGFuZGxlcnMiLCJjbGFzcyIsIndyYXBwZXIiLCJwYXJlbnQiLCJjYW52YXMiLCJ0YWciLCJjb21tYW5kcyIsImMyZCIsImdldENvbnRleHQiLCJyIiwibWVudVJhZGl1cyIsImNvbnRhaW5lclNpemUiLCJhY3RpdmVQYWRkaW5nIiwiYWN0aXZlQ29tbWFuZEkiLCJvZmZzZXQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJwb3NpdGlvbiIsInpJbmRleCIsInVzZXJTZWxlY3QiLCJwb2ludGVyRXZlbnRzIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJkaXNwbGF5Iiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiY3JlYXRlTWVudUl0ZW1zIiwiZHRoZXRhIiwiTWF0aCIsIlBJIiwibGVuZ3RoIiwidGhldGExIiwidGhldGEyIiwiaSIsImNvbW1hbmQiLCJtaWR0aGV0YSIsInJ4MSIsImNvcyIsInJ5MSIsInNpbiIsIml0ZW0iLCJjb2xvciIsIml0ZW1Db2xvciIsImN1cnNvciIsIml0ZW1UZXh0U2hhZG93Q29sb3IiLCJsZWZ0IiwidG9wIiwiY29udGVudCIsIkhUTUxFbGVtZW50IiwiaW5uZXJIVE1MIiwiY29udGVudFN0eWxlIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwic2V0QXR0cmlidXRlIiwicXVldWVEcmF3QmciLCJyc3BvdGxpZ2h0IiwicmVkcmF3UXVldWUiLCJkcmF3QmciLCJ1bmRlZmluZWQiLCJycyIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImNsZWFyUmVjdCIsImZpbGxTdHlsZSIsImZpbGxDb2xvciIsImluZGV4IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwiYXJjIiwiY2xvc2VQYXRoIiwiZmlsbCIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic2VwYXJhdG9yV2lkdGgiLCJsaW5lVG8iLCJzdHJva2UiLCJzcG90bGlnaHRQYWRkaW5nIiwicXVldWVEcmF3Q29tbWFuZHMiLCJyeCIsInJ5IiwidGhldGEiLCJkcmF3Q29tbWFuZHMiLCJhY3RpdmVGaWxsQ29sb3IiLCJ0eCIsImluZGljYXRvclNpemUiLCJ0eSIsInJvdCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsImZpbGxSZWN0IiwidXBkYXRlUGl4ZWxSYXRpbyIsInB4ciIsInciLCJoIiwic3R5bGUiLCJzZXRUcmFuc2Zvcm0iLCJzY2FsZSIsInJlZHJhd2luZyIsInJhZiIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsImZuIiwicmVkcmF3IiwiYXBwbHkiLCJjdHJ4IiwiY3RyeSIsImJpbmRpbmdzIiwib24iLCJldmVudHMiLCJzZWxlY3RvciIsIl9mbiIsImN5VGFyZ2V0IiwicHVzaCIsImFkZEV2ZW50TGlzdGVuZXJzIiwiZ3JhYmJhYmxlIiwiaW5HZXN0dXJlIiwiem9vbUVuYWJsZWQiLCJwYW5FbmFibGVkIiwiYm94RW5hYmxlZCIsImdlc3R1cmVTdGFydEV2ZW50IiwicmVzdG9yZVpvb20iLCJ1c2VyWm9vbWluZ0VuYWJsZWQiLCJyZXN0b3JlR3JhYiIsImdyYWJpZnkiLCJyZXN0b3JlUGFuIiwidXNlclBhbm5pbmdFbmFibGVkIiwicmVzdG9yZUJveFNlbG4iLCJib3hTZWxlY3Rpb25FbmFibGVkIiwicmVzdG9yZUdlc3R1cmVzIiwic3RhcnRIYW5kbGVyIiwiZWxlIiwiaXNDeSIsInJlcyIsInRoZW4iLCJfY29tbWFuZHMiLCJvcGVuTWVudSIsInVuZ3JhYmlmeSIsInJwIiwicnciLCJyaCIsImlzTm9kZSIsImlzUGFyZW50IiwiYXRNb3VzZSIsInJlbmRlcmVkUG9zaXRpb24iLCJyZW5kZXJlZFdpZHRoIiwicmVuZGVyZWRIZWlnaHQiLCJjeVJlbmRlcmVkUG9zaXRpb24iLCJ4IiwieSIsIm1heCIsIm1pblNwb3RsaWdodFJhZGl1cyIsIm1pbiIsIm1heFNwb3RsaWdodFJhZGl1cyIsImNsb3NlTWVudUV2ZW50cyIsIm9wZW5NZW51RXZlbnRzIiwiZHJhZ0hhbmRsZXIiLCJvcmlnRSIsIm9yaWdpbmFsRXZlbnQiLCJpc1RvdWNoIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVhPZmZzZXQiLCJwYWdlWSIsInBhZ2VZT2Zmc2V0IiwiZHgiLCJkeSIsImQiLCJzcXJ0IiwiY29zVGhldGEiLCJhY29zIiwiYWJzIiwiaW5UaGlzQ29tbWFuZCIsImVuZEhhbmRsZXIiLCJzZWxlY3QiLCJyZW1vdmVFdmVudExpc3RlbmVycyIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXN0cm95SW5zdGFuY2UiLCJyZW1vdmUiLCJkZXN0cm95IiwibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZmlsdGVyIiwic3JjIiwia2V5cyIsImsiLCJxdWVyeSIsImFuY2VzdG9yIiwiZG9jdW1lbnQiLCJlbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJwcm9wcyIsImwiLCJjbGFzc05hbWUiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keSIsInNjcm9sbExlZnQiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInNjcm9sbFRvcCIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSwyQ0FBMkMsY0FBYzs7UUFFekQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDaEVBLElBQU1BLFdBQVdDLG1CQUFPQSxDQUFDLENBQVIsQ0FBakI7QUFDQSxJQUFNQyxTQUFTRCxtQkFBT0EsQ0FBQyxDQUFSLENBQWY7O2VBQzJFQSxtQkFBT0EsQ0FBQyxDQUFSLEM7SUFBbkVFLFUsWUFBQUEsVTtJQUFZQyxTLFlBQUFBLFM7SUFBV0MsYSxZQUFBQSxhO0lBQWVDLGEsWUFBQUEsYTtJQUFlQyxTLFlBQUFBLFM7O0FBRTdELElBQUlDLFVBQVUsU0FBVkEsT0FBVSxDQUFTQyxNQUFULEVBQWdCO0FBQzVCLE1BQUlDLFVBQVVSLE9BQU8sRUFBUCxFQUFXRixR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Y2FwZS1jeHRtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlQ3h0bWVudVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeXRvc2NhcGVDeHRtZW51XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2Q2YjBhNjljMjM5MmVkY2YzZDAiLCJjb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG5jb25zdCB7IHJlbW92ZUVsZXMsIHNldFN0eWxlcywgY3JlYXRlRWxlbWVudCwgZ2V0UGl4ZWxSYXRpbywgZ2V0T2Zmc2V0IH0gPSByZXF1aXJlKCcuL2RvbS11dGlsJyk7XG5cbmxldCBjeHRtZW51ID0gZnVuY3Rpb24ocGFyYW1zKXtcbiAgbGV0IG9wdGlvbnMgPSBhc3NpZ24oe30sIGRlZmF1bHRzLCBwYXJhbXMpO1xuICBsZXQgY3kgPSB0aGlzO1xuICBsZXQgY29udGFpbmVyID0gY3kuY29udGFpbmVyKCk7XG4gIGxldCB0YXJnZXQ7XG5cbiAgbGV0IGRhdGEgPSB7XG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICBoYW5kbGVyczogW10sXG4gICAgY29udGFpbmVyOiBjcmVhdGVFbGVtZW50KHtjbGFzczogJ2N4dG1lbnUnfSlcbiAgfTtcblxuICBsZXQgd3JhcHBlciA9IGRhdGEuY29udGFpbmVyO1xuICBsZXQgcGFyZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICBsZXQgY2FudmFzID0gY3JlYXRlRWxlbWVudCh7dGFnOiAnY2FudmFzJ30pO1xuICBsZXQgY29tbWFuZHMgPSBbXTtcbiAgbGV0IGMyZCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBsZXQgciA9IG9wdGlvbnMubWVudVJhZGl1cztcbiAgbGV0IGNvbnRhaW5lclNpemUgPSAociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZykqMjtcbiAgbGV0IGFjdGl2ZUNvbW1hbmRJO1xuICBsZXQgb2Zmc2V0O1xuXG4gIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUod3JhcHBlciwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICB3cmFwcGVyLmFwcGVuZENoaWxkKHBhcmVudCk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gIHNldFN0eWxlcyh3cmFwcGVyLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiBvcHRpb25zLnpJbmRleCxcbiAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgcG9pbnRlckV2ZW50czogJ25vbmUnIC8vIHByZXZlbnQgZXZlbnRzIG9uIG1lbnUgaW4gbW9kZXJuIGJyb3dzZXJzXG4gIH0pO1xuXG4gIC8vIHByZXZlbnQgZXZlbnRzIG9uIG1lbnUgaW4gbGVnYWN5IGJyb3dzZXJzXG4gIFsnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJywgJ2NvbnRleHRtZW51J10uZm9yRWFjaChldnQgPT4ge1xuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHNldFN0eWxlcyhwYXJlbnQsIHtcbiAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgd2lkdGg6IGNvbnRhaW5lclNpemUgKyAncHgnLFxuICAgIGhlaWdodDogY29udGFpbmVyU2l6ZSArICdweCcsXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAxLFxuICAgIG1hcmdpbkxlZnQ6IC0gb3B0aW9ucy5hY3RpdmVQYWRkaW5nICsgJ3B4JyxcbiAgICBtYXJnaW5Ub3A6IC0gb3B0aW9ucy5hY3RpdmVQYWRkaW5nICsgJ3B4JyxcbiAgICB1c2VyU2VsZWN0OiAnbm9uZSdcbiAgfSk7XG5cbiAgY2FudmFzLndpZHRoID0gY29udGFpbmVyU2l6ZTtcbiAgY2FudmFzLmhlaWdodCA9IGNvbnRhaW5lclNpemU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlTWVudUl0ZW1zKCkge1xuICAgIHJlbW92ZUVsZXMoJy5jeHRtZW51LWl0ZW0nLCBwYXJlbnQpO1xuICAgIGxldCBkdGhldGEgPSAyICogTWF0aC5QSSAvIChjb21tYW5kcy5sZW5ndGgpO1xuICAgIGxldCB0aGV0YTEgPSBNYXRoLlBJIC8gMjtcbiAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNvbW1hbmQgPSBjb21tYW5kc1tpXTtcblxuICAgICAgbGV0IG1pZHRoZXRhID0gKHRoZXRhMSArIHRoZXRhMikgLyAyO1xuICAgICAgbGV0IHJ4MSA9IDAuNjYgKiByICogTWF0aC5jb3MobWlkdGhldGEpO1xuICAgICAgbGV0IHJ5MSA9IDAuNjYgKiByICogTWF0aC5zaW4obWlkdGhldGEpO1xuXG4gICAgICBsZXQgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoe2NsYXNzOiAnY3h0bWVudS1pdGVtJ30pO1xuICAgICAgc2V0U3R5bGVzKGl0ZW0sIHtcbiAgICAgICAgY29sb3I6IG9wdGlvbnMuaXRlbUNvbG9yLFxuICAgICAgICBjdXJzb3I6ICdkZWZhdWx0JyxcbiAgICAgICAgZGlzcGxheTogJ3RhYmxlJyxcbiAgICAgICAgJ3RleHQtYWxpZ24nOiAnY2VudGVyJyxcbiAgICAgICAgLy9iYWNrZ3JvdW5kOiAncmVkJyxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICd0ZXh0LXNoYWRvdyc6ICctMXB4IC0xcHggMnB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IgKyAnLCAxcHggLTFweCAycHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvciArICcsIC0xcHggMXB4IDJweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yICsgJywgMXB4IDFweCAxcHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvcixcbiAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgICdtaW4taGVpZ2h0JzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgIHdpZHRoOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgbWFyZ2luTGVmdDogKHJ4MSAtIHIgKiAwLjMzKSArICdweCcsXG4gICAgICAgIG1hcmdpblRvcDogKC1yeTEgLSByICogMC4zMykgKyAncHgnXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnQgPSBjcmVhdGVFbGVtZW50KHtjbGFzczogJ2N4dG1lbnUtY29udGVudCd9KTtcblxuICAgICAgaWYoIGNvbW1hbmQuY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICl7XG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoIGNvbW1hbmQuY29udGVudCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBjb21tYW5kLmNvbnRlbnQ7XG4gICAgICB9XG5cbiAgICAgIHNldFN0eWxlcyhjb250ZW50LCB7XG4gICAgICAgICd3aWR0aCc6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICAnaGVpZ2h0JzogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnLFxuICAgICAgICAnZGlzcGxheSc6ICd0YWJsZS1jZWxsJ1xuICAgICAgfSk7XG5cbiAgICAgIHNldFN0eWxlcyhjb250ZW50LCBjb21tYW5kLmNvbnRlbnRTdHlsZSB8fCB7fSk7XG5cbiAgICAgIGlmIChjb21tYW5kLmRpc2FibGVkID09PSB0cnVlIHx8IGNvbW1hbmQuZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2N4dG1lbnUtY29udGVudCBjeHRtZW51LWRpc2FibGVkJyk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICAgIHRoZXRhMSArPSBkdGhldGE7XG4gICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXVlRHJhd0JnKCByc3BvdGxpZ2h0ICl7XG4gICAgcmVkcmF3UXVldWUuZHJhd0JnID0gWyByc3BvdGxpZ2h0IF07XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3QmcoIHJzcG90bGlnaHQgKXtcbiAgICByc3BvdGxpZ2h0ID0gcnNwb3RsaWdodCAhPT0gdW5kZWZpbmVkID8gcnNwb3RsaWdodCA6IHJzO1xuXG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cbiAgICBjMmQuY2xlYXJSZWN0KDAsIDAsIGNvbnRhaW5lclNpemUsIGNvbnRhaW5lclNpemUpO1xuXG4gICAgLy8gZHJhdyBiYWNrZ3JvdW5kIGl0ZW1zXG4gICAgYzJkLmZpbGxTdHlsZSA9IG9wdGlvbnMuZmlsbENvbG9yO1xuICAgIGxldCBkdGhldGEgPSAyKk1hdGguUEkvKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgbGV0IHRoZXRhMSA9IE1hdGguUEkvMjtcbiAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgZm9yKCBsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbW1hbmRzLmxlbmd0aDsgaW5kZXgrKyApe1xuICAgICAgbGV0IGNvbW1hbmQgPSBjb21tYW5kc1tpbmRleF07XG5cbiAgICAgIGlmKCBjb21tYW5kLmZpbGxDb2xvciApe1xuICAgICAgICBjMmQuZmlsbFN0eWxlID0gY29tbWFuZC5maWxsQ29sb3I7XG4gICAgICB9XG4gICAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgICBjMmQubW92ZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgICAgYzJkLmFyYyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByLCAyKk1hdGguUEkgLSB0aGV0YTEsIDIqTWF0aC5QSSAtIHRoZXRhMiwgdHJ1ZSk7XG4gICAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgICBjMmQuZmlsbCgpO1xuXG4gICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgdGhldGEyICs9IGR0aGV0YTtcblxuICAgICAgYzJkLmZpbGxTdHlsZSA9IG9wdGlvbnMuZmlsbENvbG9yO1xuICAgIH1cbiAgICAvLyBkcmF3IHNlcGFyYXRvcnMgYmV0d2VlbiBpdGVtc1xuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBjMmQuc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICAgIGMyZC5saW5lV2lkdGggPSBvcHRpb25zLnNlcGFyYXRvcldpZHRoO1xuICAgIHRoZXRhMSA9IE1hdGguUEkvMjtcbiAgICB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICBsZXQgcngxID0gciAqIE1hdGguY29zKHRoZXRhMSk7XG4gICAgICBsZXQgcnkxID0gciAqIE1hdGguc2luKHRoZXRhMSk7XG4gICAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgICBjMmQubW92ZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgICAgYzJkLmxpbmVUbyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nICsgcngxLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nIC0gcnkxKTtcbiAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgIGMyZC5zdHJva2UoKTtcblxuICAgICAgdGhldGExICs9IGR0aGV0YTtcbiAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgfVxuXG5cbiAgICBjMmQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgIGMyZC5hcmMociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgcnNwb3RsaWdodCArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICB9XG5cbiAgZnVuY3Rpb24gcXVldWVEcmF3Q29tbWFuZHMoIHJ4LCByeSwgdGhldGEgKXtcbiAgICByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgPSBbIHJ4LCByeSwgdGhldGEgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApe1xuICAgIGxldCBkdGhldGEgPSAyKk1hdGguUEkvKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgbGV0IHRoZXRhMSA9IE1hdGguUEkvMjtcbiAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgdGhldGExICs9IGR0aGV0YSAqIGFjdGl2ZUNvbW1hbmRJO1xuICAgIHRoZXRhMiArPSBkdGhldGEgKiBhY3RpdmVDb21tYW5kSTtcblxuICAgIGMyZC5maWxsU3R5bGUgPSBvcHRpb25zLmFjdGl2ZUZpbGxDb2xvcjtcbiAgICBjMmQuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgIGMyZC5saW5lV2lkdGggPSAxO1xuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQubW92ZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgIGMyZC5hcmMociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgMipNYXRoLlBJIC0gdGhldGExLCAyKk1hdGguUEkgLSB0aGV0YTIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuXG4gICAgbGV0IHR4ID0gciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ4L3IqKHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIC0gb3B0aW9ucy5pbmRpY2F0b3JTaXplLzQpO1xuICAgIGxldCB0eSA9IHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyByeS9yKihycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZyAtIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZS80KTtcbiAgICBsZXQgcm90ID0gTWF0aC5QSS80IC0gdGhldGE7XG5cbiAgICBjMmQudHJhbnNsYXRlKCB0eCwgdHkgKTtcbiAgICBjMmQucm90YXRlKCByb3QgKTtcblxuICAgIC8vIGNsZWFyIHRoZSBpbmRpY2F0b3JcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmZpbGxSZWN0KC1vcHRpb25zLmluZGljYXRvclNpemUvMiwgLW9wdGlvbnMuaW5kaWNhdG9yU2l6ZS8yLCBvcHRpb25zLmluZGljYXRvclNpemUsIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSk7XG4gICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgIGMyZC5maWxsKCk7XG5cbiAgICBjMmQucm90YXRlKCAtcm90ICk7XG4gICAgYzJkLnRyYW5zbGF0ZSggLXR4LCAtdHkgKTtcblxuICAgIC8vIGMyZC5zZXRUcmFuc2Zvcm0oIDEsIDAsIDAsIDEsIDAsIDAgKTtcblxuICAgIC8vIGNsZWFyIHRoZSBzcG90bGlnaHRcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmFyYyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCBycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGl4ZWxSYXRpbygpe1xuICAgIGxldCBweHIgPSBnZXRQaXhlbFJhdGlvKCk7XG4gICAgbGV0IHcgPSBjb250YWluZXJTaXplO1xuICAgIGxldCBoID0gY29udGFpbmVyU2l6ZTtcblxuICAgIGNhbnZhcy53aWR0aCA9IHcgKiBweHI7XG4gICAgY2FudmFzLmhlaWdodCA9IGggKiBweHI7XG5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG5cbiAgICBjMmQuc2V0VHJhbnNmb3JtKCAxLCAwLCAwLCAxLCAwLCAwICk7XG4gICAgYzJkLnNjYWxlKCBweHIsIHB4ciApO1xuICB9XG5cbiAgbGV0IHJlZHJhd2luZyA9IHRydWU7XG4gIGxldCByZWRyYXdRdWV1ZSA9IHt9O1xuXG4gIGxldCByYWYgPSAoXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgKGZuID0+IHNldFRpbWVvdXQoZm4sIDE2KSlcbiAgKTtcblxuICBsZXQgcmVkcmF3ID0gZnVuY3Rpb24oKXtcbiAgICBpZiggcmVkcmF3UXVldWUuZHJhd0JnICl7XG4gICAgICBkcmF3QmcuYXBwbHkoIG51bGwsIHJlZHJhd1F1ZXVlLmRyYXdCZyApO1xuICAgIH1cblxuICAgIGlmKCByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgKXtcbiAgICAgIGRyYXdDb21tYW5kcy5hcHBseSggbnVsbCwgcmVkcmF3UXVldWUuZHJhd0NvbW1hbmRzICk7XG4gICAgfVxuXG4gICAgcmVkcmF3UXVldWUgPSB7fTtcblxuICAgIGlmKCByZWRyYXdpbmcgKXtcbiAgICAgIHJhZiggcmVkcmF3ICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtpY2sgb2ZmXG4gIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgcmVkcmF3KCk7XG5cbiAgbGV0IGN0cngsIGN0cnksIHJzO1xuXG4gIGxldCBiaW5kaW5ncyA9IHtcbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBzZWxlY3RvciwgZm4pe1xuXG4gICAgICBsZXQgX2ZuID0gZm47XG4gICAgICBpZiggc2VsZWN0b3IgPT09ICdjb3JlJyl7XG4gICAgICAgIF9mbiA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgaWYoIGUuY3lUYXJnZXQgPT09IGN5IHx8IGUudGFyZ2V0ID09PSBjeSApeyAvLyBvbmx5IGlmIGV2ZW50IHRhcmdldCBpcyBkaXJlY3RseSBjb3JlXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoIHRoaXMsIFsgZSBdICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBkYXRhLmhhbmRsZXJzLnB1c2goe1xuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBmbjogX2ZuXG4gICAgICB9KTtcblxuICAgICAgaWYoIHNlbGVjdG9yID09PSAnY29yZScgKXtcbiAgICAgICAgY3kub24oZXZlbnRzLCBfZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub24oZXZlbnRzLCBzZWxlY3RvciwgX2ZuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgbGV0IGdyYWJiYWJsZTtcbiAgICBsZXQgaW5HZXN0dXJlID0gZmFsc2U7XG4gICAgbGV0IHpvb21FbmFibGVkO1xuICAgIGxldCBwYW5FbmFibGVkO1xuICAgIGxldCBib3hFbmFibGVkO1xuICAgIGxldCBnZXN0dXJlU3RhcnRFdmVudDtcblxuICAgIGxldCByZXN0b3JlWm9vbSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggem9vbUVuYWJsZWQgKXtcbiAgICAgICAgY3kudXNlclpvb21pbmdFbmFibGVkKCB0cnVlICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCByZXN0b3JlR3JhYiA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgIHRhcmdldC5ncmFiaWZ5KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCByZXN0b3JlUGFuID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBwYW5FbmFibGVkICl7XG4gICAgICAgIGN5LnVzZXJQYW5uaW5nRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUJveFNlbG4gPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIGJveEVuYWJsZWQgKXtcbiAgICAgICAgY3kuYm94U2VsZWN0aW9uRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUdlc3R1cmVzID0gZnVuY3Rpb24oKXtcbiAgICAgIHJlc3RvcmVHcmFiKCk7XG4gICAgICByZXN0b3JlWm9vbSgpO1xuICAgICAgcmVzdG9yZVBhbigpO1xuICAgICAgcmVzdG9yZUJveFNlbG4oKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnRIYW5kbGVyID0gZnVuY3Rpb24oZSl7XG4gICAgICB0YXJnZXQgPSB0aGlzOyAvLyBSZW1lbWJlciB3aGljaCBub2RlIHRoZSBjb250ZXh0IG1lbnUgaXMgZm9yXG4gICAgICBsZXQgZWxlID0gdGhpcztcbiAgICAgIGxldCBpc0N5ID0gdGhpcyA9PT0gY3k7XG5cbiAgICAgIGlmIChpbkdlc3R1cmUpIHtcbiAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgaW5HZXN0dXJlID0gZmFsc2U7XG5cbiAgICAgICAgcmVzdG9yZUdlc3R1cmVzKCk7XG4gICAgICB9XG5cbiAgICAgIGlmKCB0eXBlb2Ygb3B0aW9ucy5jb21tYW5kcyA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICBjb25zdCByZXMgPSBvcHRpb25zLmNvbW1hbmRzKHRhcmdldCk7XG4gICAgICAgIGlmKCByZXMudGhlbiApe1xuICAgICAgICAgIHJlcy50aGVuKF9jb21tYW5kcyA9PiB7XG4gICAgICAgICAgICBjb21tYW5kcyA9IF9jb21tYW5kcztcbiAgICAgICAgICAgIG9wZW5NZW51KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbWFuZHMgPSByZXM7XG4gICAgICAgICAgb3Blbk1lbnUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tbWFuZHMgPSBvcHRpb25zLmNvbW1hbmRzO1xuICAgICAgICBvcGVuTWVudSgpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvcGVuTWVudSgpe1xuICAgICAgICBpZiggIWNvbW1hbmRzIHx8IGNvbW1hbmRzLmxlbmd0aCA9PT0gMCApeyByZXR1cm47IH1cblxuICAgICAgICB6b29tRW5hYmxlZCA9IGN5LnVzZXJab29taW5nRW5hYmxlZCgpO1xuICAgICAgICBjeS51c2VyWm9vbWluZ0VuYWJsZWQoIGZhbHNlICk7XG5cbiAgICAgICAgcGFuRW5hYmxlZCA9IGN5LnVzZXJQYW5uaW5nRW5hYmxlZCgpO1xuICAgICAgICBjeS51c2VyUGFubmluZ0VuYWJsZWQoIGZhbHNlICk7XG5cbiAgICAgICAgYm94RW5hYmxlZCA9IGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoKTtcbiAgICAgICAgY3kuYm94U2VsZWN0aW9uRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICBncmFiYmFibGUgPSB0YXJnZXQuZ3JhYmJhYmxlICYmICB0YXJnZXQuZ3JhYmJhYmxlKCk7XG4gICAgICAgIGlmKCBncmFiYmFibGUgKXtcbiAgICAgICAgICB0YXJnZXQudW5ncmFiaWZ5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcnAsIHJ3LCByaDtcbiAgICAgICAgaWYoICFpc0N5ICYmIGVsZS5pc05vZGUoKSAmJiAhZWxlLmlzUGFyZW50KCkgJiYgIW9wdGlvbnMuYXRNb3VzZSApe1xuICAgICAgICAgIHJwID0gZWxlLnJlbmRlcmVkUG9zaXRpb24oKTtcbiAgICAgICAgICBydyA9IGVsZS5yZW5kZXJlZFdpZHRoKCk7XG4gICAgICAgICAgcmggPSBlbGUucmVuZGVyZWRIZWlnaHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBycCA9IGUucmVuZGVyZWRQb3NpdGlvbiB8fCBlLmN5UmVuZGVyZWRQb3NpdGlvbjtcbiAgICAgICAgICBydyA9IDE7XG4gICAgICAgICAgcmggPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgb2Zmc2V0ID0gZ2V0T2Zmc2V0KGNvbnRhaW5lcik7XG5cbiAgICAgICAgY3RyeCA9IHJwLng7XG4gICAgICAgIGN0cnkgPSBycC55O1xuXG4gICAgICAgIGNyZWF0ZU1lbnVJdGVtcygpO1xuXG4gICAgICAgIHNldFN0eWxlcyhwYXJlbnQsIHtcbiAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgIGxlZnQ6IChycC54IC0gcikgKyAncHgnLFxuICAgICAgICAgIHRvcDogKHJwLnkgLSByKSArICdweCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcnMgPSBNYXRoLm1heChydywgcmgpLzI7XG4gICAgICAgIHJzID0gTWF0aC5tYXgocnMsIG9wdGlvbnMubWluU3BvdGxpZ2h0UmFkaXVzKTtcbiAgICAgICAgcnMgPSBNYXRoLm1pbihycywgb3B0aW9ucy5tYXhTcG90bGlnaHRSYWRpdXMpO1xuXG4gICAgICAgIHF1ZXVlRHJhd0JnKCk7XG5cbiAgICAgICAgYWN0aXZlQ29tbWFuZEkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaW5HZXN0dXJlID0gdHJ1ZTtcbiAgICAgICAgZ2VzdHVyZVN0YXJ0RXZlbnQgPSBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlTWVudUV2ZW50cyA9IG9wdGlvbnMub3Blbk1lbnVFdmVudHMgPT09ICdjeHR0YXAnID8gJ2NsaWNrJyA6J2N4dHRhcGVuZCB0YXBlbmQnO1xuXG4gICAgY29uc3QgZHJhZ0hhbmRsZXIgPSBmdW5jdGlvbihlKXtcbiAgICAgIGlmKCAhaW5HZXN0dXJlICl7IHJldHVybjsgfVxuXG4gICAgICBsZXQgb3JpZ0UgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICBsZXQgaXNUb3VjaCA9IG9yaWdFLnRvdWNoZXMgJiYgb3JpZ0UudG91Y2hlcy5sZW5ndGggPiAwO1xuXG4gICAgICBsZXQgcGFnZVggPSAoaXNUb3VjaCA/IG9yaWdFLnRvdWNoZXNbMF0ucGFnZVggOiBvcmlnRS5wYWdlWCkgLSB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICBsZXQgcGFnZVkgPSAoaXNUb3VjaCA/IG9yaWdFLnRvdWNoZXNbMF0ucGFnZVkgOiBvcmlnRS5wYWdlWSkgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgIGFjdGl2ZUNvbW1hbmRJID0gdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgZHggPSBwYWdlWCAtIG9mZnNldC5sZWZ0IC0gY3RyeDtcbiAgICAgIGxldCBkeSA9IHBhZ2VZIC0gb2Zmc2V0LnRvcCAtIGN0cnk7XG4gICAgICBpZiggZHggPT09IDAgKXsgZHggPSAwLjAxOyB9XG5cbiAgICAgIGxldCBkID0gTWF0aC5zcXJ0KCBkeCpkeCArIGR5KmR5ICk7XG4gICAgICBsZXQgY29zVGhldGEgPSAoZHkqZHkgLSBkKmQgLSBkeCpkeCkvKC0yICogZCAqIGR4KTtcbiAgICAgIGxldCB0aGV0YSA9IE1hdGguYWNvcyggY29zVGhldGEgKTtcblxuICAgICAgaWYoZCA8IHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIHx8IChvcHRpb25zLm9wZW5NZW51RXZlbnRzID09PSAnY3h0dGFwJyAmJiBkID4gY29udGFpbmVyU2l6ZS8yKSl7XG4gICAgICAgIHF1ZXVlRHJhd0JnKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcXVldWVEcmF3QmcoKTtcbiAgICAgIGxldCByeCA9IGR4KnIgLyBkO1xuICAgICAgbGV0IHJ5ID0gZHkqciAvIGQ7XG5cbiAgICAgIGlmKCBkeSA+IDAgKXtcbiAgICAgICAgdGhldGEgPSBNYXRoLlBJICsgTWF0aC5hYnModGhldGEgLSBNYXRoLlBJKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGR0aGV0YSA9IDIqTWF0aC5QSS8oY29tbWFuZHMubGVuZ3RoKTtcbiAgICAgIGxldCB0aGV0YTEgPSBNYXRoLlBJLzI7XG4gICAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgICBmb3IoIGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIGxldCBjb21tYW5kID0gY29tbWFuZHNbaV07XG5cbiAgICAgICAgbGV0IGluVGhpc0NvbW1hbmQgPSB0aGV0YTEgPD0gdGhldGEgJiYgdGhldGEgPD0gdGhldGEyXG4gICAgICAgICAgfHwgdGhldGExIDw9IHRoZXRhICsgMipNYXRoLlBJICYmIHRoZXRhICsgMipNYXRoLlBJIDw9IHRoZXRhMjtcblxuICAgICAgICBpZiggY29tbWFuZC5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCBjb21tYW5kLmVuYWJsZWQgPT09IGZhbHNlICl7XG4gICAgICAgICAgaW5UaGlzQ29tbWFuZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGluVGhpc0NvbW1hbmQgKXtcbiAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgICB0aGV0YTIgKz0gZHRoZXRhO1xuICAgICAgfVxuXG4gICAgICBxdWV1ZURyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZEhhbmRsZXIgPSBmdW5jdGlvbigpe1xuICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIGlmKCBhY3RpdmVDb21tYW5kSSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgIGxldCBzZWxlY3QgPSBjb21tYW5kc1sgYWN0aXZlQ29tbWFuZEkgXS5zZWxlY3Q7XG5cbiAgICAgICAgaWYoIHNlbGVjdCApe1xuICAgICAgICAgIHNlbGVjdC5hcHBseSggdGFyZ2V0LCBbdGFyZ2V0LCBnZXN0dXJlU3RhcnRFdmVudF0gKTtcbiAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbkdlc3R1cmUgPSBmYWxzZTtcblxuICAgICAgcmVzdG9yZUdlc3R1cmVzKCk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVBpeGVsUmF0aW8pO1xuXG4gICAgYmluZGluZ3NcbiAgICAgIC5vbigncmVzaXplJywgdXBkYXRlUGl4ZWxSYXRpbygpKVxuICAgICAgLm9uKG9wdGlvbnMub3Blbk1lbnVFdmVudHMsIG9wdGlvbnMuc2VsZWN0b3IsIHN0YXJ0SGFuZGxlcilcbiAgICAgIC5vbignY3h0ZHJhZyB0YXBkcmFnJywgb3B0aW9ucy5zZWxlY3RvciwgZHJhZ0hhbmRsZXIpXG4gICAgICAub24oJ3RhcGRyYWcnLCBkcmFnSGFuZGxlcilcbiAgICAgIC5vbihjbG9zZU1lbnVFdmVudHMsIGVuZEhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBsZXQgaGFuZGxlcnMgPSBkYXRhLmhhbmRsZXJzO1xuXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKyApe1xuICAgICAgbGV0IGggPSBoYW5kbGVyc1tpXTtcblxuICAgICAgaWYoIGguc2VsZWN0b3IgPT09ICdjb3JlJyApe1xuICAgICAgICBjeS5vZmYoaC5ldmVudHMsIGguZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub2ZmKGguZXZlbnRzLCBoLnNlbGVjdG9yLCBoLmZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUGl4ZWxSYXRpbyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95SW5zdGFuY2UoKXtcbiAgICByZWRyYXdpbmcgPSBmYWxzZTtcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB3cmFwcGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICBkZXN0cm95SW5zdGFuY2UoKTtcbiAgICB9XG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3h0bWVudTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeHRtZW51LmpzIiwiLy8gU2ltcGxlLCBpbnRlcm5hbCBPYmplY3QuYXNzaWduKCkgcG9seWZpbGwgZm9yIG9wdGlvbnMgb2JqZWN0cyBldGMuXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKCBPYmplY3QgKSA6IGZ1bmN0aW9uKCB0Z3QsIC4uLnNyY3MgKXtcbiAgc3Jjcy5maWx0ZXIoc3JjID0+IHNyYyAhPSBudWxsKS5mb3JFYWNoKCBzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKCBzcmMgKS5mb3JFYWNoKCBrID0+IHRndFtrXSA9IHNyY1trXSApO1xuICB9ICk7XG5cbiAgcmV0dXJuIHRndDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwibGV0IGRlZmF1bHRzID0ge1xuICBtZW51UmFkaXVzOiAxMDAsIC8vIHRoZSByYWRpdXMgb2YgdGhlIGNpcmN1bGFyIG1lbnUgaW4gcGl4ZWxzXG4gIHNlbGVjdG9yOiAnbm9kZScsIC8vIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgQ3l0b3NjYXBlLmpzIHNlbGVjdG9yIHdpbGwgdHJpZ2dlciBjeHRtZW51c1xuICBjb21tYW5kczogWyAvLyBhbiBhcnJheSBvZiBjb21tYW5kcyB0byBsaXN0IGluIHRoZSBtZW51IG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhcnJheVxuICAgIC8qXG4gICAgeyAvLyBleGFtcGxlIGNvbW1hbmRcbiAgICAgIGZpbGxDb2xvcjogJ3JnYmEoMjAwLCAyMDAsIDIwMCwgMC43NSknLCAvLyBvcHRpb25hbDogY3VzdG9tIGJhY2tncm91bmQgY29sb3IgZm9yIGl0ZW1cbiAgICAgIGNvbnRlbnQ6ICdhIGNvbW1hbmQgbmFtZScgLy8gaHRtbC90ZXh0IGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBtZW51XG4gICAgICBjb250ZW50U3R5bGU6IHt9LCAvLyBjc3Mga2V5OnZhbHVlIHBhaXJzIHRvIHNldCB0aGUgY29tbWFuZCdzIGNzcyBpbiBqcyBpZiB5b3Ugd2FudFxuICAgICAgc2VsZWN0OiBmdW5jdGlvbihlbGUpeyAvLyBhIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29tbWFuZCBpcyBzZWxlY3RlZFxuICAgICAgICBjb25zb2xlLmxvZyggZWxlLmlkKCkgKSAvLyBgZWxlYCBob2xkcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhY3RpdmUgZWxlbWVudFxuICAgICAgfSxcbiAgICAgIGVuYWJsZWQ6IHRydWUgLy8gd2hldGhlciB0aGUgY29tbWFuZCBpcyBzZWxlY3RhYmxlXG4gICAgfVxuICAgICovXG4gIF0sIC8vIGZ1bmN0aW9uKCBlbGUgKXsgcmV0dXJuIFsgLyouLi4qLyBdIH0sIC8vIGV4YW1wbGUgZnVuY3Rpb24gZm9yIGNvbW1hbmRzXG4gIGZpbGxDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43NSknLCAvLyB0aGUgYmFja2dyb3VuZCBjb2xvdXIgb2YgdGhlIG1lbnVcbiAgYWN0aXZlRmlsbENvbG9yOiAncmdiYSgxLCAxMDUsIDIxNywgMC43NSknLCAvLyB0aGUgY29sb3VyIHVzZWQgdG8gaW5kaWNhdGUgdGhlIHNlbGVjdGVkIGNvbW1hbmRcbiAgYWN0aXZlUGFkZGluZzogMjAsIC8vIGFkZGl0aW9uYWwgc2l6ZSBpbiBwaXhlbHMgZm9yIHRoZSBhY3RpdmUgY29tbWFuZFxuICBpbmRpY2F0b3JTaXplOiAyNCwgLy8gdGhlIHNpemUgaW4gcGl4ZWxzIG9mIHRoZSBwb2ludGVyIHRvIHRoZSBhY3RpdmUgY29tbWFuZFxuICBzZXBhcmF0b3JXaWR0aDogMywgLy8gdGhlIGVtcHR5IHNwYWNpbmcgaW4gcGl4ZWxzIGJldHdlZW4gc3VjY2Vzc2l2ZSBjb21tYW5kc1xuICBzcG90bGlnaHRQYWRkaW5nOiA0LCAvLyBleHRyYSBzcGFjaW5nIGluIHBpeGVscyBiZXR3ZWVuIHRoZSBlbGVtZW50IGFuZCB0aGUgc3BvdGxpZ2h0XG4gIG1pblNwb3RsaWdodFJhZGl1czogMjQsIC8vIHRoZSBtaW5pbXVtIHJhZGl1cyBpbiBwaXhlbHMgb2YgdGhlIHNwb3RsaWdodFxuICBtYXhTcG90bGlnaHRSYWRpdXM6IDM4LCAvLyB0aGUgbWF4aW11bSByYWRpdXMgaW4gcGl4ZWxzIG9mIHRoZSBzcG90bGlnaHRcbiAgb3Blbk1lbnVFdmVudHM6ICdjeHR0YXBzdGFydCB0YXBob2xkJywgLy8gc3VwcG9ydGVkIHNwYWNlLXNlcGFyYXRlZCBjeXRvc2NhcGUgZXZlbnRzIHRoYXQgd2lsbCBvcGVuIHRoZSBtZW51OiBgY3h0dGFwc3RhcnRgLCBgdGFwaG9sZGAsIGBjeHR0YXBgLFxuICBpdGVtQ29sb3I6ICd3aGl0ZScsIC8vIHRoZSBjb2xvdXIgb2YgdGV4dCBpbiB0aGUgY29tbWFuZCdzIGNvbnRlbnRcbiAgaXRlbVRleHRTaGFkb3dDb2xvcjogJ3RyYW5zcGFyZW50JywgLy8gdGhlIHRleHQgc2hhZG93IGNvbG91ciBvZiB0aGUgY29tbWFuZCdzIGNvbnRlbnRcbiAgekluZGV4OiA5OTk5LCAvLyB0aGUgei1pbmRleCBvZiB0aGUgdWkgZGl2XG4gIGF0TW91c2U6IGZhbHNlIC8vIGRyYXcgbWVudSBhdCBtb3VzZSBwb3NpdGlvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy5qcyIsImNvbnN0IHJlbW92ZUVsZXMgPSBmdW5jdGlvbihxdWVyeSwgYW5jZXN0b3IgPSBkb2N1bWVudCkge1xuICBsZXQgZWxzID0gYW5jZXN0b3IucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyBpKysgKXtcbiAgICBsZXQgZWwgPSBlbHNbaV07XG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfVxufTtcblxuY29uc3Qgc2V0U3R5bGVzID0gZnVuY3Rpb24oZWwsIHN0eWxlKSB7XG4gIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKHN0eWxlKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHByb3BzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGVsLnN0eWxlW3Byb3BzW2ldXSA9IHN0eWxlW3Byb3BzW2ldXTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG9wdGlvbnMudGFnIHx8ICdkaXYnKTtcblxuICBlbC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzIHx8ICcnO1xuXG4gIGlmIChvcHRpb25zLnN0eWxlKSB7XG4gICAgc2V0U3R5bGVzKGVsLCBvcHRpb25zLnN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBlbDtcbn07XG5cbmNvbnN0IGdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbigpe1xuICByZXR1cm4gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbn07XG5cbmNvbnN0IGdldE9mZnNldCA9IGZ1bmN0aW9uKGVsKXtcbiAgbGV0IG9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdDogb2Zmc2V0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgK1xuICAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsncGFkZGluZy1sZWZ0J10pICtcbiAgICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pLFxuICAgIHRvcDogb2Zmc2V0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICtcbiAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsncGFkZGluZy10b3AnXSkgK1xuICAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWydib3JkZXItdG9wLXdpZHRoJ10pXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVtb3ZlRWxlcywgc2V0U3R5bGVzLCBjcmVhdGVFbGVtZW50LCBnZXRQaXhlbFJhdGlvLCBnZXRPZmZzZXQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kb20tdXRpbC5qcyIsImNvbnN0IGN4dG1lbnUgPSByZXF1aXJlKCcuL2N4dG1lbnUnKTtcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxubGV0IHJlZ2lzdGVyID0gZnVuY3Rpb24oIGN5dG9zY2FwZSApe1xuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXG5cbiAgY3l0b3NjYXBlKCAnY29yZScsICdjeHRtZW51JywgY3h0bWVudSApOyAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufTtcblxuaWYoIHR5cGVvZiBjeXRvc2NhcGUgIT09ICd1bmRlZmluZWQnICl7IC8vIGV4cG9zZSB0byBnbG9iYWwgY3l0b3NjYXBlIChpLmUuIHdpbmRvdy5jeXRvc2NhcGUpXG4gIHJlZ2lzdGVyKCBjeXRvc2NhcGUgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=