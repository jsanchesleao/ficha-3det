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