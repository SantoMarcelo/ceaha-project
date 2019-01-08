
export function getFormData() {
  var atividades = getDataTable();
  var atividadeMedium = getMediumData();
  var lista_atividades_internas = new Array();
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
      controlador: $('#aposentadoria option:selected').val(),
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
    experiencia: atividadeMedium,
    atividades_internas: lista_atividades_internas
    
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
    if ($(this).find('input.checkbox-experienca-pratica:checked').prop("checked") == true) {
      mediumData.push({ value: true, atividade: $(this).find('input.checkbox-experienca-pratica').val(), tempo: $(this).find('.input-time').val(), disable: false });
    }else{
      mediumData.push({ value: false, atividade: $(this).find('input.checkbox-experienca-pratica').val(), tempo: $(this).find('.input-time').val(), disable: true });
    }
   
  });
  return mediumData
  
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

export function getAposentadoValue(){
  
}

export function getAtividadesInternas(){
  console.log("Aqui");
  var atividades_internas = new Array();
  var atividade_interna = {
    ano: $('#atividadeInternaAno').val(),
    atividade: $('#atividadeInterna').val(),
    frequencia_total: $('#atividadeInternaFreqTotal').val(),
    frequencia_real: $('#atividadeInternaFreqReal').val(),
    departamento: $('#atividadeInternaDepartamento option:selected').text(),
  }
  atividades_internas.push(atividade_interna);
  return atividades_internas;
}

export function setAtividadeInterna(){
  var atividades_list = getAtividadesInternas()
  //console.log(atividades_list[0]);
  //var element = $( '<p/>' )
  var atividades = {
    ano: $('#atividadeInternaAno').val(),
    atividade: $('#atividadeInterna').val(),
    freq_total: $('#atividadeInternaFreqTotal').val(),
    freq_real: $('#atividadeInternaFreqReal').val(),
    departamento: $('#atividadeInternaDepartamento').val(),
  }
  console.log(atividades);

  $('#anoAtividadeLista').prop("value", atividades.ano);
  $('#AtividadeLista').prop("value", atividades.atividade);
  $('#freqRealAtividadeLista').prop("value", atividades.freq_real);
  $('#freqTotalAtividadeLista').prop("value", atividades.freq_total);
  $('#deptoAtividadeLista').prop("value", atividades.departamento);

  
  // element.text( atividades.ano ).addClass( 'text' ).appendTo( '#anoAtividadeLista' );
  // element.text( atividades.atividade ).addClass( 'text' ).appendTo( '#AtividadeLista' );
  // element.text( atividades.freq_total ).addClass( 'text' ).appendTo( '#freqtotalAtividadeLista' );
  // element.text( atividades.freq_real ).addClass( 'text' ).appendTo( '#freqRealAtividadeLista' );
  // element.text( atividades.departamento ).addClass( 'text' ).appendTo( '#departamentoAtividadeLista' );

 
}

export function adicionaAtividadeInterna(){
  var depto_row = document.getElementsByClassName("atividade-interna-list-departamento");
  var item_row = document.getElementsByClassName("atividade-interna-list-item");
  var table = document.getElementsByClassName("atividade-interna-list");
  var tbody = table.firstChild.parentElement.lastElementChild
  var clone_depto = depto_row.cloneNode(true);
  var clone_item = item_row.cloneNode(true);
  clone_depto.id = Math.random().toString(32).substring(2, 10);
  tbody.appendChild(clone_depto);
  tbody.appendChild(clone_item);
  // var element = clone.firstElementChild;
  // console.log('#'+clone.id);
  // console.log(clone.firstElementChild.id);

  // $('#'+clone.id).each(function(){
  //     $(this).find('td .descricao-atividade').val("");
  //     $(this).find('td .tempo-atividade').val("");
  // })
  
  // $('#atividadeTable button:disabled').each(function(i){
  //     if(i!= 0){
  //         $(this).prop("disabled", false);
  //     }
  // })
        
}

export function setMasks(){

  $('date-birth').Inputmask('99/99/9999');
}


export { getDormData };