/**
 * Html DOM-element
 * @constant
 * @type {Element}
 */
const page = document.querySelector('html');

/**
 * Code for Escape
 * @constant
 * @type {Number}
 */
const escapeCode = 27;

/**
 * DOM-elements for login modal window
 * @constant
 * @type {Object}
 */
const modalLogin = {
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
const appointment = {
  fields: document.querySelectorAll('.appointment-form input'),
  submit: document.querySelector('.btn--appointment')
};

/**
 * DOM-elements for map modal window
 * @constant
 * @type {Object}
 */
const modalMap = {
  window: document.querySelector('#map'),
  btnShow: document.querySelector('#show-map'),
  btnShowFromContacts: document.querySelector('#contacts-show-map'),
  btnClose: document.querySelector('#map .btn--close')
};

/**
 * Set in forms users data, saved in localStorage
 */
let _setSavedUserInfo = () =>ail) {
    modalFeedback.userEmail.val(lastUserEmail);
    _toggleFloatLabel(modalFeedback.userEmail);
  }
};

/**
 * Set focus in first empty forms field
 */
let _setFocusInFirstEmptyField = () => {
  $.each(modalFeedback.fields, (index, elem) => {
    let element = $(elem);
    if(!element.val()) {
      element.focus();
      return false;
    }
  });
};

/**
 * Show modal function
 * @param  {Element} modal
 */
let _showModal  {
  let lastLogin = localStorage.getItem('login');

  if(lastLogin) {
    modalLogin.login.value = lastLogin;
  }
};

/**
 * Set focus in first empty forms field
 */
let _setFocusInFirstEmptyField = () => {
  for(let i = 0; i < modalLogin.fields.length; i++) {
    if(!modalLogin.fields[i].value) {
      modalLogin.fields[i].focus();
      return false;
    }
  }
};

/**
 * Show modal function
 * @param  {Element} modal
 */
let _showModal = (modal) => {
  modal.classList.add('modal--active');
  let width = window.getComputedStyle(window.document.body).width;
  window.document.body.style.width = width;
  page.classList.add('lock');

  if(modal === modalLogin.window) {
    _setSavedUserInfo();
    _setFocusInFirstEmptyField();
  }
};

/**
 * Hide modal function
 * @param  {Element} modal
 */
let _hideModal = (modal) => {
  modal.classList.remove('modal--active');
  page.classList.remove('lock');

  if(modal === modalLogin.window) {
    for(let i = 0; i < modalLogin.fields.length; i++) {
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
let _onShowClick = (modal) => {
  return function(event) {
    event.preventDefault();
    _showModal(modal);
  };
};

/**
 * Handler for clicking on button 'Hide modal window'
 * @param  {Element} modal
 */
let _onCloseClick = (modal) => {
  return function() {
    _hideModal(modal);
  };
};

/**
 * Handler for clicking on modal window overlay
 * @param  {Element} modal
 * @param  {Object} event
 */
let _onOverlayClick = (modal) => {
  return function(event) {
    if (event.target === event.currentTarget) {
      window.document.body.style.width = '';
      _hideModal(modal);
    }
  };
};

/**
 * Handler for clicking Escape
 */
let _onEscapeDown = () => {
  if (event.keyCode === escapeCode) {
    window.document.body.style.width = '';
    _hideModal(modalLogin.window);
    _hideModal(modalMap.window);
  }
};

/**
 * Handler for submit login button click
 */
let _onSubmitClick = function(event) {
  for(let i = 0; i < modalLogin.fields.length; i++) {
    if(!modalLogin.fields[i].value) {
      event.preventDefault();
      modalLogin.fields[i].classList.add('error');
    } else {
      if( modalLogin.fields[i].getAttribute('name') === 'login' ) {
        localStorage.setItem('login', modalLogin.fields[i].value);
      }
      modalLogin.fields[i].classList.remove('error');
    }
  }
};

/**
 * Handler for submit appointment button click
 */
let _onSubmitAppointmentClick = function(event) {
  for(let i = 0; i < appointment.fields.length; i++) {
    if(!appointment.fields[i].value) {
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

if(modalMap.btnShowFromContacts) {
  modalMap.btnShowFromContacts.addEventListener('click', _onShowClick(modalMap.window));
}

if(modalMap.btnShowFromContacts) {
  appointment.submit.addEventListener('click', _onSubmitAppointmentClick);
}

window.onkeydown = _onEscapeDown;
