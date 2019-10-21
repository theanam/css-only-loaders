module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(32);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(18);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./awesome-spin.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./awesome-spin.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(19);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./blasting-circle.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./blasting-circle.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(20);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./blasting-ripple.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./blasting-ripple.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(21);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./block-spin.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./block-spin.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(22);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./box-rotation.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./box-rotation.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(23);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./clock.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./clock.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(24);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./color-pulse-ball.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./color-pulse-ball.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(25);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./double-circle.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./double-circle.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(26);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./hour-glass.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./hour-glass.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(27);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./quantum-spinner.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./quantum-spinner.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(28);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./recursive-circle.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./recursive-circle.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(29);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./rotating-plane.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./rotating-plane.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(30);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../react/node_modules/css-loader/index.js!./simple-circle.css", function() {
		var newContent = require("!!../../react/node_modules/css-loader/index.js!./simple-circle.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(31);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../react/node_modules/css-loader/index.js!./vars.css", function() {
		var newContent = require("!!../react/node_modules/css-loader/index.js!./vars.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FullLoader = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(15);

__webpack_require__(14);

__webpack_require__(13);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(2);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StyleSheet(props) {
    var _props$type = props.type,
        type = _props$type === undefined ? "simple-circle" : _props$type,
        _props$size = props.size,
        size = _props$size === undefined ? 70 : _props$size,
        _props$color = props.color,
        color = _props$color === undefined ? "#27ae60" : _props$color,
        _props$secondaryColor = props.secondaryColor,
        secondaryColor = _props$secondaryColor === undefined ? "#eeeeee" : _props$secondaryColor,
        _props$line = props.line,
        line = _props$line === undefined ? 3 : _props$line,
        _props$duration = props.duration,
        duration = _props$duration === undefined ? 2 : _props$duration;

    return _react2.default.createElement(
        "style",
        null,
        ".loader." + type,
        "\n            {\n            --loader-width: " + size + "px;\n            --loader-height: " + size + "px;\n            --loader-color-primary: " + color + ";\n            --loader-color-secondary: " + secondaryColor + ";\n            --line-width: " + line + "px;\n            --animation-duration: " + duration + "s;\n            --loader-initial-scale: 0.1;\n            }"
    );
}
function Loader(props) {
    var _props$type2 = props.type,
        type = _props$type2 === undefined ? "simple-circle" : _props$type2,
        _props$visible = props.visible,
        visible = _props$visible === undefined ? true : _props$visible;

    if (!visible) return null;
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(StyleSheet, props),
        _react2.default.createElement("div", { className: "loader " + type })
    );
}

function FullLoader(props) {
    var _props = { props: props },
        _props$backgroundColo = _props.backgroundColor,
        backgroundColor = _props$backgroundColo === undefined ? "rgba(0,0,0,0.4)" : _props$backgroundColo,
        _props$visible2 = _props.visible,
        visible = _props$visible2 === undefined ? true : _props$visible2;

    if (!visible) return null;
    return _react2.default.createElement(
        "div",
        { style: _extends({}, fullLoaderStyle, { backgroundColor: backgroundColor }) },
        _react2.default.createElement(Loader, props)
    );
}

var fullLoaderStyle = {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 40000
};

exports.default = Loader;
exports.FullLoader = FullLoader;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".loader.awesome-spin {\n    border-radius: 50%;\n    color: var(--loader-color-primary, #33f);\n    border-top: var(--line-width, 10px) solid;\n    border-bottom: var(--line-width, 10px) solid;\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n    animation: awesome-spin var(--animation-duration, 2s)  linear infinite;\n  }\n  \n  @keyframes awesome-spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*\n Blasting Circle Styles\n*/\n@keyframes blast {\n    0% {\n        opacity: var(--loader-initial-scale, 0.1);\n        transform: scale(var(--loader-initial-scale, 0.1));\n    }\n    100% {\n        transform: scale(1);\n        opacity: 1;\n    }\n}\n\n.loader.blasting-circle {\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n    border-radius: 50%;\n    background-color: var(--loader-color-primary, #00f);\n    animation: blast var(--animation-duration, 1s) infinite ease-out;\n}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*\n    Blasting Ripple Styles\n*/\n@keyframes blast-ripple {\n    0% {\n        top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));\n        left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));\n        width: 0;\n        height: 0;\n        opacity: 1;\n    }\n    100% {\n        top: -1px;\n        left: -1px;\n        width: calc(var(--loader-width, 100px) - var(--line-width, 4px));\n        height: calc(var(--loader-height, 100px) - var(--line-width, 4px));\n        opacity: 0;\n    }\n}\n\n.loader.blasting-ripple {\n    position: relative;\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n}\n\n.loader.blasting-ripple::after {\n    opacity: 0;\n    content: \"\";\n    position: absolute;\n    border: var(--line-width, 4px) solid var(--loader-color-primary, #00f);\n    opacity: 1;\n    border-radius: 50%;\n    animation: blast-ripple var(--animation-duration, 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n.loader.blasting-ripple::before {\n    opacity: 0;\n    top: calc(var(--loader-height, 100px) / 2 - var(--line-width, 4px));\n    left: calc(var(--loader-width, 100px) / 2 - var(--line-width, 4px));\n    content: \"\";\n    position: absolute;\n    border: var(--line-width, 4px) solid var(--loader-color-primary, #00f);\n    opacity: 1;\n    border-radius: 50%;\n    animation: blast-ripple var(--animation-duration, 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;\n    animation-delay: calc(var(--animation-duration,1s) / 2);\n}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "  @keyframes block-spin {\n    0% {\n      -webkit-transform: rotate(0deg);\n      transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n\n.loader.block-spin {\n    height: var(--loader-height, 100px);\n    width: var(--loader-width, 100px);\n    position: relative;\n    border-radius: 60px;\n    border: var(--line-width, 4px) solid;\n    color: var(--loader-color-primary, #33f);\n    border-left-color: transparent;\n    border-top-color: transparent;\n    animation: block-spin var(--animation-duration, .8s)  linear infinite;\n    \n  }\n  \n  .loader.loader.block-spin:after {\n    position: absolute;\n    content: \"\";\n    width: 30px;\n    height: 30px;\n    top: var(--loader-offset, 50%);\n    left: var(--loader-offset, 50%);\n    border-radius: 60px;\n    border: var(--line-width, 4px) solid;\n    color: var(--loader-color-primary, #33f);\n    margin-top: -15px;\n    margin-left: -15px;\n  }\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@keyframes rect-rotate {\n  0% {\n    transform: rotate(0); \n  }\n  50%, 100% {\n    transform: rotate(360deg); \n  } \n}\n\n@keyframes fill-rect {\n  0%, 50% {\n    height: 0px; \n  }\n  100% {\n    \n    height: inherit; \n  } \n}\n\n.loader.box-rotation {\n  transform-origin: center center;\n  color: var(--loader-color-primary, #33f);\n  width: var(--loader-width, 100px);\n  height: var(--loader-height, 100px);\n  position: relative;\n  border: var(--line-width, 4px) solid;\n  display: inline-block;\n  animation: rect-rotate var(--animation-duration, 1s)  linear infinite; \n}\n\n.loader.box-rotation::after {\n  content: \"\";\n  height: 0px;\n  width: 100%;\n  height:100%;\n  display: block;\n  background: var(--loader-color-primary, #33f);\n  opacity: 0.5;\n  animation: fill-rect var(--animation-duration, 1s) linear infinite; \n}\n", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".loader.clock {\n    position: relative;\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n    border-radius: 50%;\n    border: var(--line-width, 4px) solid var(--loader-color-primary, #33f);\n}\n\n.loader.clock::before{\n    content: '';\n    position: absolute;\n    top: 8px;    \n    left: calc(50% - 2px);\n    background: var(--loader-color-primary, #33f);\n    width: var(--line-width, 4px);\n    height: calc( 50% - 8px );\n    border-radius: calc(var(--line-width, 4px) + 1);\n    transform-origin: 50% 100%;\n    animation: circle-loader var(--animation-duration,1s) infinite linear ;\n}", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@keyframes colorpulse {\n  0% {\n    filter: hue-rotate(0deg);\n  }\n  100% {\n    filter: hue-rotate(359.9deg);\n  }\n}\n\n@keyframes pulse {\n  0%, 1% {\n    opacity: 1;\n    transform: scale(0.1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1);\n  }\n}\n\n.loader.color-pulse-ball {\n  width: var(--loader-width, 100px);\n  height: var(--loader-height, 100px);\n  border-radius: 50%;\n  background-color: var(--loader-color-primary, #00f);\n  animation: colorpulse calc(3 * var(--animation-duration,1s)) infinite ease-in-out,\n    pulse var(--animation-duration,1s) infinite ease;\n}\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".loader.double-circle {\n    position: relative;\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n}\n\n.double-circle::before,\n.double-circle::after{\n    content: '';\n    display: block;\n    position: absolute;\n    border-radius: 50%;\n    border: var(--line-width, 4px) solid transparent;\n    border-bottom-color: var(--loader-color-primary, #33f);\n    animation: circle-loader var(--animation-duration, 1s) infinite linear ;\n}\n\n.double-circle::before{\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n\n.double-circle::after{\n    width: calc(100% - 12px);\n    height: calc(100% - 12px);\n    top: 6px;\n    left: 6px;\n    animation-direction: reverse;\n}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@keyframes slide {\n\t0% {\n\t\ttransform: translateY(0%);\n\t}\n\n\t25% {\n\t\ttransform: translateY(100%);\n\t}\n\n\t50% {\n\t\ttransform: translateY(100%);\n\t}\n\n\t75% {\n\t\ttransform: translateY(0%);\t\t\n\t}\n\n\t100% {\n\t\ttransform: translateY(0%);\t\t\n\t}\n}\n\n@keyframes spin {\n\t0% {\n\t\ttransform: rotate(0deg);\n\t}\n\n\t25% {\n\t\ttransform: rotate(0deg);\n\t}\n\n\t50% {\n\t\ttransform: rotate(180deg);\n\t}\n\n\t75% {\n\t\ttransform: rotate(180deg);\n\t}\n\n\t100% {\n\t\ttransform: rotate(360deg);\n\t}\n}\n\n.loader.hour-glass {\n\tposition: relative;\n\twidth: var(--loader-width, 100px);\n\theight: var(--loader-height, 100px);\n\tbackground-color: var(--loader-color-primary, #00f);\n\t-webkit-clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%, 50% 50%);\n\tclip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%, 50% 50%);\n\toverflow: hidden;\n\tanimation: spin var(--animation-duration, 4s) infinite ease-in-out;\n}\n\n.hour-glass:before {\n\tcontent: \"\";\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n\twidth: var(--loader-width, 100px);\n\theight: 50%;\n\tbackground-color: var(--loader-color-secondary, #eee);\n\tanimation: slide var(--animation-duration, 4s) infinite ease-in-out;\n}\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n@keyframes momentum {\n    0%   { \n        transform: rotate(0deg);  \n    }\n    100% {\n        transform: rotate(-360deg);\n    }\n}\n\n.loader.quantum-spinner {\n    --primary-circle-offset: calc(((var(--loader-width,100px) * 0.2) / 2) - var(--line-width,4px));\n    --secondary-circle-offset: calc(((var(--loader-width,100px) * 0.4) / 2) - var(--line-width,4px)); /*- (var(--line-width,4px) * 2)*/\n    position: relative;\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n    transform-origin: center center;\n    border-radius: 50%;\n    border: var(--line-width, 4px) solid rgba(0,0,0,0);\n    border-top-color: var(--loader-color-primary, #33f);\n    animation: momentum var(--animation-duration, 1s) linear infinite; \n}\n\n.quantum-spinner:before {\n    content: \"\";\n    position: absolute;\n    transform-origin: center center;\n    top: var(--primary-circle-offset,10px);\n    left: var(--primary-circle-offset,10px);\n    width: calc(var(--loader-width,100px) * 0.8);\n    height: calc(var(--loader-height,100px) * 0.8);\n    border-radius: 50%;\n    border: var(--line-width,4px) solid rgba(0,0,0,0);\n    border-top-color: var(--loader-color-primary, #33f);\n    opacity: 0.7;\n    filter: hue-rotate(3eg);\n    animation: momentum calc(var(--animation-duration, 1s) * 2) linear infinite; \n}\n\n.quantum-spinner:after {\n    content: \"\";\n    position: absolute;\n    top: var(--secondary-circle-offset,20px);\n    left: var(--secondary-circle-offset,20px);\n    width: calc(var(--loader-width,100px) * 0.6);\n    height: calc(var(--loader-height,100px) * 0.6);\n    border-radius: 50%;\n    transform-origin: center center;\n    border: var(--line-width,4px) solid rgba(0,0,0,0);\n    border-top-color: var(--loader-color-primary, #33f);\n    opacity: 0.3;\n    filter: hue-rotate(6eg);\n    animation: momentum var(--animation-duration, 1s) linear infinite; \n}", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@keyframes recursive-circle {\n    0% {\n      transform: rotate(0); \n    }\n    100% {\n      transform: rotate(360deg); \n    } \n}\n\n.loader.recursive-circle {\n    --loader-offset: calc((var(--loader-width,100px) / 4) - (var(--line-width,4px) / 2));\n    height: var(--loader-height, 100px);\n    width: var(--loader-width, 100px);\n    color: var(--loader-color-primary, #33f);\n    display: inline-block;\n    position: relative;\n    border: var(--line-width, 4px) solid;\n    border-radius: 50%;\n    border-top-color: transparent;\n    transform-origin: center center;\n    animation: recursive-circle var(--animation-duration, 1s)  linear infinite;\n}\n.loader.recursive-circle::after {\n      content: \"\";\n      height: 50%;\n      width: 50%;\n      display: block;\n      box-sizing: border-box;\n      position: absolute;\n      top: var(--loader-offset,21px);\n      left: var(--loader-offset,21px);\n      border: var(--line-width, 4px) solid;\n      transform-origin: center center;\n      border-radius: 50%;\n      border-top-color: transparent;\n      animation: recursive-circle calc(var(--animation-duration, 1s) / 2)  linear infinite reverse; \n    }\n  ", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@keyframes rotateplane {\n    0% {\n        transform: perspective(var(--perspective-value)) rotateX(0deg) rotateY(0deg);\n    }\n    50% {\n        transform: perspective(var(--perspective-value)) rotateX(-180.1deg) rotateY(0deg);\n    }\n    100% {\n        transform: perspective(var(--perspective-value)) rotateX(-180deg) rotateY(-179.9deg);\n    }\n}\n\n.loader.rotating-plane {\n    --perspective-value: calc(3 * var(--loader-width, 100px));\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n    background: var(--loader-color-primary, #00f);\n    animation: rotateplane var(--animation-duration, 1s) infinite ease-in-out;\n}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@keyframes circle-loader {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.loader.simple-circle {\n    transform-origin: center center;\n    border: var(--line-width, 4px) solid var(--loader-color-secondary, #fff);\n    border-right-color: var(--loader-color-primary, #00f);\n    width: var(--loader-width, 100px);\n    height: var(--loader-height, 100px);\n    border-radius: 50%;\n    animation: circle-loader var(--animation-duration, 1s) infinite ease-out;\n}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*\nThe loaders use CSS custom properties (variables) to control the attributes of the loaders\n*/\n:root{\n    --loader-width: 70px;\n    --loader-height: 70px;\n    --loader-color-primary: #27ae60;\n    --loader-color-secondary: #eee;\n    --line-width: 3px;\n    --animation-duration: 2s;\n    --loader-initial-scale: 0.1;\n}\n.loader,.loader:before,.loader:after{\n    box-sizing: border-box;\n    flex-grow: 0;\n    flex-shrink: 0;\n}\n/*\nIn order to get optimal results, please only change the variables above and don't change anything in the actual loader code\n*/", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);