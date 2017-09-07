var ficha = require('./ficha');
var debounce = require('./debounce');

function initForm() {
  var name = ficha.getPageName();
  if (name) {
    ficha.restoreForm(name);
  }
}

var updatePersistence = debounce(function() {
  ficha.persistForm(ficha.getPageName());
}, 250);

function addListeners() {
  document.querySelectorAll('input,textarea').forEach(function(input) {
    input.addEventListener('change', function(e) {
      updatePersistence();
    });
  });
}

function init() {
  if (!ficha.getPageName()) {
    history.pushState({}, 'default', '?name=default');
  }

  initForm();
  addListeners();
}

init();