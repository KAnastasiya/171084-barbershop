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
	 * Code for Escape
	 * @constant
	 * @type {Number}
	 */
	var escapeCode = 27;

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
	  if (event.keyCode === escapeCode) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDU0ODhhYzY2OTFmN2U3MjVkM2YzIiwid2VicGFjazovLy9zcmMvc2NyaXB0LmpzIiwid2VicGFjazovLy9zcmMvY29tbW9uL2pzL2NvbW1vbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDU0ODhhYzY2OTFmN2U3MjVkM2YzXG4gKiovIiwiaW1wb3J0ICcuL2NvbW1vbi9qcy9jb21tb24uanMnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3NjcmlwdC5qc1xuICoqLyIsIi8qKlxuICogSHRtbCBET00tZWxlbWVudFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7RWxlbWVudH1cbiAqL1xuY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcblxuLyoqXG4gKiBDb2RlIGZvciBFc2NhcGVcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuY29uc3QgZXNjYXBlQ29kZSA9IDI3O1xuXG4vKipcbiAqIERPTS1lbGVtZW50cyBmb3IgbG9naW4gbW9kYWwgd2luZG93XG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IG1vZGFsTG9naW4gPSB7XG4gIHdpbmRvdzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luJyksXG4gIGJ0blNob3c6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWxvZ2luLXNob3cnKSxcbiAgYnRuQ2xvc2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbiAuYnRuLS1jbG9zZScpLFxuICBmaWVsZHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNsb2dpbiBpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSknKSxcbiAgbG9naW46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbiAjdXNlci1sb2dpbicpLFxuICBzdWJtaXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWxvZ2luJylcbn07XG5cbi8qKlxuICogRE9NLWVsZW1lbnRzIGZvciBhcHBvaW50bWVudCBmb3JtXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGFwcG9pbnRtZW50ID0ge1xuICBmaWVsZHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcHBvaW50bWVudC1mb3JtIGlucHV0JyksXG4gIHN1Ym1pdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tYXBwb2ludG1lbnQnKVxufTtcblxuLyoqXG4gKiBET00tZWxlbWVudHMgZm9yIG1hcCBtb2RhbCB3aW5kb3dcbiAqIEBjb25zdGFudFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgbW9kYWxNYXAgPSB7XG4gIHdpbmRvdzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcCcpLFxuICBidG5TaG93OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvdy1tYXAnKSxcbiAgYnRuU2hvd0Zyb21Db250YWN0czogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3RzLXNob3ctbWFwJyksXG4gIGJ0bkNsb3NlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwIC5idG4tLWNsb3NlJylcbn07XG5cbi8qKlxuICogU2V0IGluIGZvcm1zIHVzZXJzIGRhdGEsIHNhdmVkIGluIGxvY2FsU3RvcmFnZVxuICovXG5sZXQgX3NldFNhdmVkVXNlckluZm8gPSAoKSA9PiB7XG4gIGxldCBsYXN0TG9naW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW4nKTtcblxuICBpZihsYXN0TG9naW4pIHtcbiAgICBtb2RhbExvZ2luLmxvZ2luLnZhbHVlID0gbGFzdExvZ2luO1xuICB9XG59O1xuXG4vKipcbiAqIFNldCBmb2N1cyBpbiBmaXJzdCBlbXB0eSBmb3JtcyBmaWVsZFxuICovXG5sZXQgX3NldEZvY3VzSW5GaXJzdEVtcHR5RmllbGQgPSAoKSA9PiB7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBtb2RhbExvZ2luLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgIGlmKCFtb2RhbExvZ2luLmZpZWxkc1tpXS52YWx1ZSkge1xuICAgICAgbW9kYWxMb2dpbi5maWVsZHNbaV0uZm9jdXMoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogU2hvdyBtb2RhbCBmdW5jdGlvblxuICogQHBhcmFtICB7RWxlbWVudH0gbW9kYWxcbiAqL1xubGV0IF9zaG93TW9kYWwgPSAobW9kYWwpID0+IHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwtLWFjdGl2ZScpO1xuICBsZXQgd2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh3aW5kb3cuZG9jdW1lbnQuYm9keSkud2lkdGg7XG4gIHdpbmRvdy5kb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gd2lkdGg7XG4gIHBhZ2UuY2xhc3NMaXN0LmFkZCgnbG9jaycpO1xuXG4gIGlmKG1vZGFsID09PSBtb2RhbExvZ2luLndpbmRvdykge1xuICAgIF9zZXRTYXZlZFVzZXJJbmZvKCk7XG4gICAgX3NldEZvY3VzSW5GaXJzdEVtcHR5RmllbGQoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIaWRlIG1vZGFsIGZ1bmN0aW9uXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBtb2RhbFxuICovXG5sZXQgX2hpZGVNb2RhbCA9IChtb2RhbCkgPT4ge1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC0tYWN0aXZlJyk7XG4gIHBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnbG9jaycpO1xuXG4gIGlmKG1vZGFsID09PSBtb2RhbExvZ2luLndpbmRvdykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtb2RhbExvZ2luLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgbW9kYWxMb2dpbi5maWVsZHNbaV0udmFsdWUgPSAnJztcbiAgICAgIG1vZGFsTG9naW4uZmllbGRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIGNsaWNraW5nIG9uIGJ1dHRvbiAnU2hvdyBtb2RhbCB3aW5kb3cnXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBtb2RhbFxuICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICovXG5sZXQgX29uU2hvd0NsaWNrID0gKG1vZGFsKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgX3Nob3dNb2RhbChtb2RhbCk7XG4gIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIGNsaWNraW5nIG9uIGJ1dHRvbiAnSGlkZSBtb2RhbCB3aW5kb3cnXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBtb2RhbFxuICovXG5sZXQgX29uQ2xvc2VDbGljayA9IChtb2RhbCkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgX2hpZGVNb2RhbChtb2RhbCk7XG4gIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIGNsaWNraW5nIG9uIG1vZGFsIHdpbmRvdyBvdmVybGF5XG4gKiBAcGFyYW0gIHtFbGVtZW50fSBtb2RhbFxuICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICovXG5sZXQgX29uT3ZlcmxheUNsaWNrID0gKG1vZGFsKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gJyc7XG4gICAgICBfaGlkZU1vZGFsKG1vZGFsKTtcbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIGNsaWNraW5nIEVzY2FwZVxuICovXG5sZXQgX29uRXNjYXBlRG93biA9ICgpID0+IHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IGVzY2FwZUNvZGUpIHtcbiAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9ICcnO1xuICAgIF9oaWRlTW9kYWwobW9kYWxMb2dpbi53aW5kb3cpO1xuICAgIF9oaWRlTW9kYWwobW9kYWxNYXAud2luZG93KTtcbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBzdWJtaXQgbG9naW4gYnV0dG9uIGNsaWNrXG4gKi9cbmxldCBfb25TdWJtaXRDbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBtb2RhbExvZ2luLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgIGlmKCFtb2RhbExvZ2luLmZpZWxkc1tpXS52YWx1ZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vZGFsTG9naW4uZmllbGRzW2ldLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKCBtb2RhbExvZ2luLmZpZWxkc1tpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKSA9PT0gJ2xvZ2luJyApIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2luJywgbW9kYWxMb2dpbi5maWVsZHNbaV0udmFsdWUpO1xuICAgICAgfVxuICAgICAgbW9kYWxMb2dpbi5maWVsZHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlciBmb3Igc3VibWl0IGFwcG9pbnRtZW50IGJ1dHRvbiBjbGlja1xuICovXG5sZXQgX29uU3VibWl0QXBwb2ludG1lbnRDbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBhcHBvaW50bWVudC5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZighYXBwb2ludG1lbnQuZmllbGRzW2ldLnZhbHVlKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgYXBwb2ludG1lbnQuZmllbGRzW2ldLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcG9pbnRtZW50LmZpZWxkc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gU2V0IGV2ZW50IGhhbmRsZXJzXG5tb2RhbExvZ2luLmJ0blNob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb25TaG93Q2xpY2sobW9kYWxMb2dpbi53aW5kb3cpKTtcbm1vZGFsTG9naW4uYnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb25DbG9zZUNsaWNrKG1vZGFsTG9naW4ud2luZG93KSk7XG5tb2RhbExvZ2luLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vbk92ZXJsYXlDbGljayhtb2RhbExvZ2luLndpbmRvdykpO1xubW9kYWxMb2dpbi5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb25TdWJtaXRDbGljayk7XG5cbm1vZGFsTWFwLmJ0blNob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb25TaG93Q2xpY2sobW9kYWxNYXAud2luZG93KSk7XG5tb2RhbE1hcC5idG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vbkNsb3NlQ2xpY2sobW9kYWxNYXAud2luZG93KSk7XG5tb2RhbE1hcC53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb25PdmVybGF5Q2xpY2sobW9kYWxNYXAud2luZG93KSk7XG5cbmlmKG1vZGFsTWFwLmJ0blNob3dGcm9tQ29udGFjdHMpIHtcbiAgbW9kYWxNYXAuYnRuU2hvd0Zyb21Db250YWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9vblNob3dDbGljayhtb2RhbE1hcC53aW5kb3cpKTtcbn1cblxuaWYobW9kYWxNYXAuYnRuU2hvd0Zyb21Db250YWN0cykge1xuICBhcHBvaW50bWVudC5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfb25TdWJtaXRBcHBvaW50bWVudENsaWNrKTtcbn1cblxud2luZG93Lm9ua2V5ZG93biA9IF9vbkVzY2FwZURvd247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tbW9uL2pzL2NvbW1vbi5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7Ozs7Ozs7QUNBQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==