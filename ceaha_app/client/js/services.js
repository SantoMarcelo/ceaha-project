
export function getFormData() {
  var atividades = getDataTable();
  var atividadeMedium = getMediumData();
  var participante = {
    nome: $('#full-name').val(),
    nascimento: $('#date-birth').val(),
    nacionalidade: $('#nacionality').val(),
    cidade: $('#city').val(),
    uf: $('#uf').val(),
    nome_pai: $('#father-name').val(),
    rg: $('#rg').val(),
    nome_mae: $('#mother-name').val(),
    orgao_emissor: $('#orgao-emissor').val(),
    cpf: $('#cpf').val(),
    estado_civil: $('#inputEstadoCivil').val(),
    endereco: {
      cep: $('#cep').val(),
      logradouro: $('#rua').val(),
      numero: $('#numero').val(),
      bairro: $('#bairro').val(),
      cidade: $('#cidade').val(),
      complemento: $('#complemento').val(),
      uf_endereco: $('#uf-endereco').val()
    },
    profissao: {
      atividade: $('#inputProfissao').val(),
      aposentado: $('#aposentadoria option:selected').text(),
      local_trabalho: $('#inputLocalTrabalho').val(),
      tel: $('#telComercial').val(),
    },
    endereco_comercial: {
      cep: $('#cepComercial').val(),
      logradourol: $('#logradouroComercial').val(),
      numero: $('#numeroComercial').val(),
      bairro: $('#bairroComercial').val(),
      complemento: $('#complementoComercial').val(),
      cidade: $('#cidadeComercial').val(),
      uf: $('#ufComercial').val()
    },
    escolaridade: {
      grau: $('#escolaridade option:selected').text(),
      curso: $('#cursoEscolaridade').val(),
      instituicao: $('#instituicaoEscolaridade').val(),
      descricao_atividades: $('#descricaoAtividades').val(),
    },
    transferencia: {
      transferido: $('#transferencia option:selected').text(),
      nome_centro_espirita: $('#nomeCentroEspirita').val(),
      cidade_centro_espirita: $('#cidadeCentroEspirita').val(),
      uf_centro_espirita: $('#ufCentroEspirita').val(),
      tempo_centro_espirita: $('#tempoCentroEspirita').val(),
      tomos_esede: $('#tomosESede').val(),
      tomos_eade: $('#tomosEade').val(),
      obras_basicas: $('#obrasBasicas').val(),
      outras_obras: $('#outrasObras').val(),
    }, 
    atividades_voluntarias: atividades,
    experiencia: atividadeMedium
  }
  return participante
};

export function getDataTable() {

  var atividades = []
  $('.atividade-item').each(function (i, e) {

    atividades.push({ nome: $(this).find('.descricao-atividade').val(), tempo: $(this).find('.tempo-atividade').val() })

  });
  console.log(atividades);
  return atividades;
}

export function getTempoValue() {
  var tempoAtividadeObj = []
  $("input.input-time").each(function (ind) {
    tempoAtividadeObj.push({ tempo: this.value });
  });
  return tempoAtividadeObj;
}

export function getMediumData() {
  var mediumData = []

  $(".experiencia-pratica").each(function (i) {
    //console.log($(this).find('input.checkbox-experienca-pratica:checked'));
    // if ($(this).find('input.checkbox-experienca-pratica:checked').length > 0) {
    //   mediumData.push({ value: "on", atividade: $(this).find('input.checkbox-experienca-pratica').val(), tempo: $(this).find('.input-time').val() });
    // }
    // mediumData.push({ value: "off", atividade: $(this).find('input.checkbox-experienca-pratica').val(), tempo: $(this).find('.input-time').val() });

    if ($(this).find('input.checkbox-experienca-pratica:checked').prop("checked") == true) {
      mediumData.push({ value: true, atividade: $(this).find('input.checkbox-experienca-pratica').val(), tempo: $(this).find('.input-time').val() });
    }else{
      mediumData.push({ value: false, atividade: $(this).find('input.checkbox-experienca-pratica').val(), tempo: $(this).find('.input-time').val() });
    }
   
  });
  return mediumData
  
}


export function setMasks(){

  $('date-birth').Inputmask('99/99/9999');
}

export function adicionaAtividade(){
  var row = document.getElementById("atividadeItem");
  var table = document.getElementById("atividadeTable");
  var tbody = table.firstChild.parentElement.lastElementChild
  var clone = row.cloneNode(true);
  clone.id = Math.random().toString(32).substring(2, 10);
  tbody.appendChild(clone);
  var element = clone.firstElementChild;
  console.log('#'+clone.id);
  console.log(clone.firstElementChild.id);

  $('#'+clone.id).each(function(){
      $(this).find('td .descricao-atividade').val("");
      $(this).find('td .tempo-atividade').val("");
  })
  
  $('#atividadeTable button:disabled').each(function(i){
      if(i!= 0){
          $(this).prop("disabled", false);
      }
  })
        
}

export function removeAtividade(){
  var table = document.getElementById("atividadeTable");
  var current = event.currentTarget;

  table.deleteRow(current.parentNode.parentNode.rowIndex)
}
export { getDormData };