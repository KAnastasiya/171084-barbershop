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
	  btnShow: document.querySelector('.btn--login-show'),
	  btnClose: document.querySelector('#login .btn--close'),
	  fields: document.querySelectorAll('#login input:not([type="checkbox"])'),
	  login: document.querySelector('#login #user-login'),
	  submit: document.querySelector('.btn--login')
	};

	/**
	 * DOM-elements for appointment form
	 * @constant
	 * @type {Object}
	 */
	var appointment = {
	  fields: document.querySelectorAll('.appointment-form input'),
	  submit: document.querySelector('.btn--appointment')
	};

	/**
	 * DOM-elements for map modal window
	 * @constant
	 * @type {Object}
	 */
	var modalMap = {
	  window: document.querySelector('#map'),
	  btnShow: document.querySelector('#show-map'),
	  btnShowFromContacts: document.querySelector('#contacts-show-map'),
	  btnClose: document.querySelector('#map .btn--close')
	};

	/**
	 * Set in forms users data, saved in localStorage
	 */
	var _setSavedUserInfo = function _setSavedUserInfo() {
	  var lastLogin = localStorage.getItem('login');

	  if (lastLogin) {
	    modalLogin.login.value = lastLogin;
	  }
	};

	/**
	 * Set focus in first empty forms field
	 */
	var _setFocusInFirstEmptyField = function _setFocusInFirstEmptyField() {
	  for (var i = 0; i < modalLogin.fields.length; i++) {
	    if (!modalLogin.fields[i].value) {
	      modalLogin.fields[i].focus();
	      return false;
	    }
	  }
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

	  if (modal === modalLogin.window) {
	    _setSavedUserInfo();
	    _setFocusInFirstEmptyField();
	  }
	};

	/**
	 * Hide modal function
	 * @param  {Element} modal
	 */
	var _hideModal = function _hideModal(modal) {
	  modal.classList.remove('modal--active');
	  page.classList.remove('lock');

	  if (modal === modalLogin.window) {
	    for (var i = 0; i < modalLogin.fields.length; i++) {
	      modalLogin.fields[i].value = '';
	      modalLogin.fields[i].classList.remove('error');
	    }
	  }
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

	/**
	 * Handler for clicking Escape
	 */
	var _onEscapeDown = function _onEscapeDown() {
	  if (event.keyCode === 27) {
	    window.document.body.style.width = '';
	    _hideModal(modalLogin.window);
	    _hideModal(modalMap.window);
	  }
	};

	/**
	 * Handler for submit login button click
	 */
	var _onSubmitClick = function _onSubmitClick(event) {
	  for (var i = 0; i < modalLogin.fields.length; i++) {
	    if (!modalLogin.fields[i].value) {
	      event.preventDefault();
	      modalLogin.fields[i].classList.add('error');
	    } else {
	      if (modalLogin.fields[i].getAttribute('name') === 'login') {
	        localStorage.setItem('login', modalLogin.fields[i].value);
	      }
	      modalLogin.fields[i].classList.remove('error');
	    }
	  }
	};

	/**
	 * Handler for submit appointment button click
	 */
	var _onSubmitAppointmentClick = function _onSubmitAppointmentClick(event) {
	  for (var i = 0; i < appointment.fields.length; i++) {
	    if (!appointment.fields[i].value) {
	      event.preventDefault();
	      appointment.fields[i].classList.add('error');
	    } else {
	      appointment.fields[i].classList.remove('error');
	    }
	  }
	};

	// Set event handlers
	modalLogin.btnShow.addEventListener('click', _onShowClick(modalLogin.window));
	modalLogin.btnClose.addEventListener('click', _onCloseClick(modalLogin.window));
	modalLogin.window.addEventListener('click', _onOverlayClick(modalLogin.window));
	modalLogin.submit.addEventListener('click', _onSubmitClick);

	modalMap.btnShow.addEventListener('click', _onShowClick(modalMap.window));
	modalMap.btnClose.addEventListener('click', _onCloseClick(modalMap.window));
	modalMap.window.addEventListener('click', _onOverlayClick(modalMap.window));

	if (modalMap.btnShowFromContacts) {
	  modalMap.btnShowFromContacts.addEventListener('click', _onShowClick(modalMap.window));
	}

	if (modalMap.btnShowFromContacts) {
	  appointment.submit.addEventListener('click', _onSubmitAppointmentClick);
	}

	window.onkeydown = _onEscapeDown;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDRhNzE3NjI1ODY2MmMxZjI0NGEwIiwid2VicGFjazovLy9zcmMvc2NyaXB0LmpzIiwid2VicGFjazovLy9zcmMvY29tbW9uL2pzL2NvbW1vbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDRhNzE3NjI1ODY2MmMxZjI0NGEwXG4gKiovIiwiaW1wb3J0ICcuL2NvbW1vbi9qcy9jb21tb24uanMnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3NjcmlwdC5qc1xuICoqLyIsIi8qKlxuICogSHRtbCBET00tZWxlbWVudFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7RWxlbWVudH1cbiAqL1xuY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcblxuLyoqXG4gKiBET00tZWxlbWVudHMgZm9yIGxvZ2luIG1vZGFsIHdpbmRvd1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBtb2RhbExvZ2luID0ge1xuICB3aW5kb3c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpLFxuICBidG5TaG93OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1sb2dpbi1zaG93JyksXG4gIGJ0bkNsb3NlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW4gLmJ0bi0tY2xvc2UnKSxcbiAgZmllbGRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbG9naW4gaW5wdXQ6bm90KFt0eXBlPVwiY2hlY2tib3hcIl0pJyksXG4gIGxvZ2luOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW4gI3VzZXItbG9naW4nKSxcbiAgc3VibWl0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1sb2dpbicpXG59O1xuXG4vKipcbiAqIERPTS1lbGVtZW50cyBmb3IgYXBwb2ludG1lbnQgZm9ybVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBhcHBvaW50bWVudCA9IHtcbiAgZmllbGRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXBwb2ludG1lbnQtZm9ybSBpbnB1dCcpLFxuICBzdWJtaXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWFwcG9pbnRtZW50Jylcbn07XG5cbi8qKlxuICogRE9NLWVsZW1lbnRzIGZvciBtYXAgbW9kYWwgd2luZG93XG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IG1vZGFsTWFwID0ge1xuICB3aW5kb3c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXAnKSxcbiAgYnRuU2hvdzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3ctbWFwJyksXG4gIGJ0blNob3dGcm9tQ29udGFjdHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWN0cy1zaG93LW1hcCcpLFxuICBidG5DbG9zZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcCAuYnRuLS1jbG9zZScpXG59O1xuXG4vKipcbiAqIFNldCBpbiBmb3JtcyB1c2VycyBkYXRhLCBzYXZlZCBpbiBsb2NhbFN0b3JhZ2VcbiAqL1xubGV0IF9zZXRTYXZlZFVzZXJJbmZvID0gKCkgPT4ge1xuICBsZXQgbGFzdExvZ2luID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2luJyk7XG5cbiAgaWYobGFzdExvZ2luKSB7XG4gICAgbW9kYWxMb2dpbi5sb2dpbi52YWx1ZSA9IGxhc3RMb2dpbjtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXQgZm9jdXMgaW4gZmlyc3QgZW1wdHkgZm9ybXMgZmllbGRcbiAqL1xubGV0IF9zZXRGb2N1c0luRmlyc3RFbXB0eUZpZWxkID0gKCkgPT4ge1xuICBmb3IobGV0IGkgPSAwOyBpIDwgbW9kYWxMb2dpbi5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZighbW9kYWxMb2dpbi5maWVsZHNbaV0udmFsdWUpIHtcbiAgICAgIG1vZGFsTG9naW4uZmllbGRzW2ldLmZvY3VzKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFNob3cgbW9kYWwgZnVuY3Rpb25cbiAqIEBwYXJhbSAge0VsZW1lbnR9IG1vZGFsXG4gKi9cbmxldCBfc2hvd01vZGFsID0gKG1vZGFsKSA9PiB7XG4gIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1hY3RpdmUnKTtcbiAgbGV0IHdpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUod2luZG93LmRvY3VtZW50LmJvZHkpLndpZHRoO1xuICB3aW5kb3cuZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICBwYWdlLmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcblxuICBpZihtb2RhbCA9PT0gbW9kYWxMb2dpbi53aW5kb3cpIHtcbiAgICBfc2V0U2F2ZWRVc2VySW5mbygpO1xuICAgIF9zZXRGb2N1c0luRmlyc3RFbXB0eUZpZWxkKCk7XG4gIH1cbn07XG5cbi8qKlxuICogSGlkZSBtb2RhbCBmdW5jdGlvblxuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqL1xubGV0IF9oaWRlTW9kYWwgPSAobW9kYWwpID0+IHtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtLWFjdGl2ZScpO1xuICBwYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2snKTtcblxuICBpZihtb2RhbCA9PT0gbW9kYWxMb2dpbi53aW5kb3cpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgbW9kYWxMb2dpbi5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG1vZGFsTG9naW4uZmllbGRzW2ldLnZhbHVlID0gJyc7XG4gICAgICBtb2RhbExvZ2luLmZpZWxkc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBvbiBidXR0b24gJ1Nob3cgbW9kYWwgd2luZG93J1xuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAqL1xubGV0IF9vblNob3dDbGljayA9IChtb2RhbCkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIF9zaG93TW9kYWwobW9kYWwpO1xuICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBvbiBidXR0b24gJ0hpZGUgbW9kYWwgd2luZG93J1xuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqL1xubGV0IF9vbkNsb3NlQ2xpY2sgPSAobW9kYWwpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIF9oaWRlTW9kYWwobW9kYWwpO1xuICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBvbiBtb2RhbCB3aW5kb3cgb3ZlcmxheVxuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAqL1xubGV0IF9vbk92ZXJsYXlDbGljayA9IChtb2RhbCkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgX2hpZGVNb2RhbChtb2RhbCk7XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBjbGlja2luZyBFc2NhcGVcbiAqL1xubGV0IF9vbkVzY2FwZURvd24gPSAoKSA9PiB7XG4gIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gJyc7XG4gICAgX2hpZGVNb2RhbChtb2RhbExvZ2luLndpbmRvdyk7XG4gICAgX2hpZGVNb2RhbChtb2RhbE1hcC53aW5kb3cpO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHN1Ym1pdCBsb2dpbiBidXR0b24gY2xpY2tcbiAqL1xubGV0IF9vblN1Ym1pdENsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZm9yKGxldCBpID0gMDsgaSA8IG1vZGFsTG9naW4uZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYoIW1vZGFsTG9naW4uZmllbGRzW2ldLnZhbHVlKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW9kYWxMb2dpbi5maWVsZHNbaV0uY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoIG1vZGFsTG9naW4uZmllbGRzW2ldLmdldEF0dHJpYnV0ZSgnbmFtZScpID09PSAnbG9naW4nICkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9naW4nLCBtb2RhbExvZ2luLmZpZWxkc1tpXS52YWx1ZSk7XG4gICAgICB9XG4gICAgICBtb2RhbExvZ2luLmZpZWxkc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBzdWJtaXQgYXBwb2ludG1lbnQgYnV0dG9uIGNsaWNrXG4gKi9cbmxldCBfb25TdWJtaXRBcHBvaW50bWVudENsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGFwcG9pbnRtZW50LmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgIGlmKCFhcHBvaW50bWVudC5maWVsZHNbaV0udmFsdWUpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBhcHBvaW50bWVudC5maWVsZHNbaV0uY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwb2ludG1lbnQuZmllbGRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBTZXQgZXZlbnQgaGFuZGxlcnNcbm1vZGFsTG9naW4uYnRuU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblNob3dDbGljayhtb2RhbExvZ2luLndpbmRvdykpO1xubW9kYWxMb2dpbi5idG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vbkNsb3NlQ2xpY2sobW9kYWxMb2dpbi53aW5kb3cpKTtcbm1vZGFsTG9naW4ud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29uT3ZlcmxheUNsaWNrKG1vZGFsTG9naW4ud2luZG93KSk7XG5tb2RhbExvZ2luLnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblN1Ym1pdENsaWNrKTtcblxubW9kYWxNYXAuYnRuU2hvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblNob3dDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcbm1vZGFsTWFwLmJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29uQ2xvc2VDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcbm1vZGFsTWFwLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vbk92ZXJsYXlDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcblxuaWYobW9kYWxNYXAuYnRuU2hvd0Zyb21Db250YWN0cykge1xuICBtb2RhbE1hcC5idG5TaG93RnJvbUNvbnRhY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29uU2hvd0NsaWNrKG1vZGFsTWFwLndpbmRvdykpO1xufVxuXG5pZihtb2RhbE1hcC5idG5TaG93RnJvbUNvbnRhY3RzKSB7XG4gIGFwcG9pbnRtZW50LnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblN1Ym1pdEFwcG9pbnRtZW50Q2xpY2spO1xufVxuXG53aW5kb3cub25rZXlkb3duID0gX29uRXNjYXBlRG93bjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21tb24vanMvY29tbW9uLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7OztBQ0FBOzs7OztBQUtBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=