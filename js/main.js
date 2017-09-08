(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
},{}],2:[function(require,module,exports){
function read(field) {
  try {
    return document.forms.ficha.elements[field].value;
  }
  catch(err) {
    console.log('error reading field ' + field, err);
    return '';
  }
}

function readForm() {
  return {
    nome: read('nome'),
    pontos: read('pontos'),
    forca: read('forca'),
    habilidade: read('habilidade'),
    resistencia: read('resistencia'),
    armadura: read('armadura'),
    poderdefogo: read('poderdefogo'),
    pvs: read('pvs'),
    maxpvs: read('maxpvs'),
    pms: read('pms'),
    maxpms: read('maxpms'),
    xp: read('xp'),
    vantagens: read('vantagens'),
    desvantagens: read('desvantagens'),
    tiposdedano: read('tiposdedano'),
    magias: read('magias'),
    itens: read('itens'),
    historia: read('historia')
  };
}

function persistForm(name) {
  window.localStorage[name] = JSON.stringify(readForm());
}

function restoreForm(name) {
  if (!window.localStorage[name]) {
    return;
  }

  try{
    var data = JSON.parse(window.localStorage[name]);
    var elements = document.forms.ficha.elements;

    elements.nome.value = data.nome;
    elements.pontos.value = data.pontos;
    elements.forca.value = data.forca;
    elements.habilidade.value = data.habilidade;
    elements.resistencia.value = data.resistencia;
    elements.armadura.value = data.armadura;
    elements.poderdefogo.value = data.poderdefogo;
    elements.pvs.value = data.pvs;
    elements.maxpvs.value = data.maxpvs;
    elements.pms.value = data.pms;
    elements.maxpms.value = data.maxpms;
    elements.xp.value = data.xp;
    elements.vantagens.value = data.vantagens;
    elements.desvantagens.value = data.desvantagens;
    elements.tiposdedano.value = data.tiposdedano;
    elements.magias.value = data.magias;
    elements.itens.value = data.itens;
    elements.historia.value = data.historia;
  }
  catch(err) {
    console.log('Error reading form from localstorage', err);
  }
}

function getPageName() {
  var search = document.location.search;
  if (search === '') {
    return null;
  }

  var nameRegex = /[\?&]name=([^&]*)/;
  var match = search.match(nameRegex);

  if (!match) {
    return null;
  }
  return match[1];
}

module.exports = {
  getPageName: getPageName,
  persistForm: persistForm,
  restoreForm: restoreForm
}
},{}],3:[function(require,module,exports){
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
},{"./debounce":1,"./ficha":2}]},{},[3]);
