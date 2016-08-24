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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

		__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Html DOM-element
	 * @constant
	 * @type {Element}
	 */
	var page = document.querySelector('html');

	/**
	 * DOM-elements for login modal window
	 * @constant
	 * @type {Object}
	 */
	var modalLogin = {
	  window: document.querySelector('#login'),
	  btnShow: document.querySelector('.btn--login'),
	  btnClose: document.querySelector('#login .btn--close')
	};

	/**
	 * DOM-elements for map modal window
	 * @constant
	 * @type {Object}
	 */
	var modalMap = {
	  window: document.querySelector('#map'),
	  btnShow: document.querySelector('#show-map'),
	  btnClose: document.querySelector('#map .btn--close')
	};

	/**
	 * Show modal function
	 * @param  {Element} modal
	 */
	var _showModal = function _showModal(modal) {
	  modal.classList.add('modal--active');
	  var width = window.getComputedStyle(window.document.body).width;
	  window.document.body.style.width = width;
	  page.classList.add('lock');
	};

	/**
	 * Hide modal function
	 * @param  {Element} modal
	 */
	var _hideModal = function _hideModal(modal) {
	  modal.classList.remove('modal--active');
	  page.classList.remove('lock');
	};

	/**
	 * Handler for clicking on button 'Show modal window'
	 * @param  {Element} modal
	 * @param  {Object} event
	 */
	var _onShowClick = function _onShowClick(modal) {
	  return function (event) {
	    event.preventDefault();
	    _showModal(modal);
	  };
	};

	/**
	 * Handler for clicking on button 'Hide modal window'
	 * @param  {Element} modal
	 */
	var _onCloseClick = function _onCloseClick(modal) {
	  return function () {
	    _hideModal(modal);
	  };
	};

	/**
	 * Handler for clicking on modal window overlay
	 * @param  {Element} modal
	 * @param  {Object} event
	 */
	var _onOverlayClick = function _onOverlayClick(modal) {
	  return function (event) {
	    if (event.target === event.currentTarget) {
	      window.document.body.style.width = '';
	      _hideModal(modal);
	    }
	  };
	};

	// Set event handlers for login window
	modalLogin.btnShow.addEventListener('click', _onShowClick(modalLogin.window));
	modalLogin.btnClose.addEventListener('click', _onCloseClick(modalLogin.window));
	modalLogin.window.addEventListener('click', _onOverlayClick(modalLogin.window));

	// Set event handlers for map window
	modalMap.btnShow.addEventListener('click', _onShowClick(modalMap.window));
	modalMap.btnClose.addEventListener('click', _onCloseClick(modalMap.window));
	modalMap.window.addEventListener('click', _onOverlayClick(modalMap.window));

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGE2NzJmOGFlZGUwNjIwMGIzZWFmIiwid2VicGFjazovLy9zcmMvc2NyaXB0LmpzIiwid2VicGFjazovLy9zcmMvY29tbW9uL2pzL2NvbW1vbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE2NzJmOGFlZGUwNjIwMGIzZWFmXG4gKiovIiwiaW1wb3J0ICcuL2NvbW1vbi9qcy9jb21tb24uanMnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3NjcmlwdC5qc1xuICoqLyIsIi8qKlxuICogSHRtbCBET00tZWxlbWVudFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7RWxlbWVudH1cbiAqL1xuY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcblxuLyoqXG4gKiBET00tZWxlbWVudHMgZm9yIGxvZ2luIG1vZGFsIHdpbmRvd1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBtb2RhbExvZ2luID0ge1xuICB3aW5kb3c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpLFxuICBidG5TaG93OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1sb2dpbicpLFxuICBidG5DbG9zZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luIC5idG4tLWNsb3NlJylcbn07XG5cbi8qKlxuICogRE9NLWVsZW1lbnRzIGZvciBtYXAgbW9kYWwgd2luZG93XG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IG1vZGFsTWFwID0ge1xuICB3aW5kb3c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXAnKSxcbiAgYnRuU2hvdzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3ctbWFwJyksXG4gIGJ0bkNsb3NlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwIC5idG4tLWNsb3NlJylcbn07XG5cbi8qKlxuICogU2hvdyBtb2RhbCBmdW5jdGlvblxuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqL1xubGV0IF9zaG93TW9kYWwgPSAobW9kYWwpID0+IHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWFjdGl2ZScpO1xuICBsZXQgd2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh3aW5kb3cuZG9jdW1lbnQuYm9keSkud2lkdGg7XG4gIHdpbmRvdy5kb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gd2lkdGg7XG4gIHBhZ2UuY2xhc3NMaXN0LmFkZCgnbG9jaycpO1xufTtcblxuLyoqXG4gKiBIaWRlIG1vZGFsIGZ1bmN0aW9uXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBtb2RhbFxuICovXG5sZXQgX2hpZGVNb2RhbCA9IChtb2RhbCkgPT4ge1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC0tYWN0aXZlJyk7XG4gIHBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnbG9jaycpO1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBvbiBidXR0b24gJ1Nob3cgbW9kYWwgd2luZG93J1xuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAqL1xubGV0IF9vblNob3dDbGljayA9IChtb2RhbCkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIF9zaG93TW9kYWwobW9kYWwpO1xuICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBvbiBidXR0b24gJ0hpZGUgbW9kYWwgd2luZG93J1xuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqL1xubGV0IF9vbkNsb3NlQ2xpY2sgPSAobW9kYWwpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIF9oaWRlTW9kYWwobW9kYWwpO1xuICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBvbiBtb2RhbCB3aW5kb3cgb3ZlcmxheVxuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAqL1xubGV0IF9vbk92ZXJsYXlDbGljayA9IChtb2RhbCkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgX2hpZGVNb2RhbChtb2RhbCk7XG4gICAgfVxuICB9O1xufTtcblxuLy8gU2V0IGV2ZW50IGhhbmRsZXJzIGZvciBsb2dpbiB3aW5kb3dcbm1vZGFsTG9naW4uYnRuU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblNob3dDbGljayhtb2RhbExvZ2luLndpbmRvdykpO1xubW9kYWxMb2dpbi5idG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vbkNsb3NlQ2xpY2sobW9kYWxMb2dpbi53aW5kb3cpKTtcbm1vZGFsTG9naW4ud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29uT3ZlcmxheUNsaWNrKG1vZGFsTG9naW4ud2luZG93KSk7XG5cbi8vIFNldCBldmVudCBoYW5kbGVycyBmb3IgbWFwIHdpbmRvd1xubW9kYWxNYXAuYnRuU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblNob3dDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcbm1vZGFsTWFwLmJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29uQ2xvc2VDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcbm1vZGFsTWFwLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vbk92ZXJsYXlDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21tb24vanMvY29tbW9uLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7OztBQ0FBOzs7OztBQUtBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9