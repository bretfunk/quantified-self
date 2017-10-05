/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// This is the base url
	// make requests with `herokuUrl + "api/v1/foods"` etc
	const herokuUrl = __webpack_require__(1);
	var newAlert = __webpack_require__(2);
	console.log(newAlert);
	let fullUrl = herokuUrl() + "test";
	console.log(fullUrl);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	//function herokuUrl() {
	//return "https://arcane-depths-57821.herokuapp.com/";
	//};

	module.exports = function () {
	  return "https://arcane-depths-57821.herokuapp.com/";
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// This is the base url, last character is a "/" so don't include as first character
	// of specific herokuUrl api request enpoint
	// make requests with `herokuUrl + "api/v1/foods"` etc
	const herokuUrl = __webpack_require__(1).herokuUrl;
	//debugger;

	module.exports = function () {
	  //alert('it works!');
	  return "it works";
	};

/***/ })
/******/ ]);