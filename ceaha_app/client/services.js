export function getFormData() {
  var atividades = getDataTable()
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
    escolaridade: $('#escolaridade option:selected').text(),
    curso_escolaridade: $('#cursoEscolaridade').val(),
    instituicao_escolaridade: $('#instituicaoEscolaridade').val(),
    descricao_atividades: $('#descricaoAtividades').val(),
    transferencia: $('#transferencia option:selected').text(),
    nomeCentro_espirita: $('#nomeCentroEspirita').val(),
    cidade_centro_espirita: $('#cidadeCentroEspirita').val(),
    tempo_centro_espirita: $('#tempoCentroEspirita').val(),
    tomos_esede: $('#tomosESede').val(),
    tomos_eade: $('#tomosEade').val(),
    obras_basicas: $('#obrasBasicas').val(),
    outras_obras: $('#outrasObras').val(),
    atividades_voluntarias: atividades,
    experiencia: {
      medium_sensitivo: $('#mediumSensitivo').val(),
      medium_sensitivo_tempo: $('#mediumSensitivoTempo').val(),
      medium_psicofonico: $('#mediumPsicofonico').val(),
      medium_psicofonico_tempo: $('#mediumPsicofonicoTempo').val(),
      medium_psicografo: $('#mediumPsicografo').val(),
      medium_pictografo: $('#mediumPictografo').val(),
      medium_vidente: $('#mediumVidente').val(),
      medium_idente_tempo: $('#mediumVidenteTempo').val(),
      medium_audiente: $('#medium_audiente').val(),
      medium_audiente_tempo: $('#mediumAudienteTempo').val(),
      medium_desdobramento: $('#mediumDesdobramento').val(),
      medium_desdobramento_tempo: $('#mediumDesdobramentoTempo').val(),
      dirigente_grupo_mediunico: $('#dirigenteGrupoMediunico').val(),
      dirigente_grupo_mediunico_tempo: $('#dirigenteGrupoMediunicoTempo').val(),
      dialogador: $('#dialogador').val(),
      dialogador_tempo: $('#dialogadorTempo').val(),
      susutentacao: $('#susutentacao').val(),
      susutentacao_tempo: $('#susutentacaoTempo').val(),
      outros: $('#outros').val(),
      outros_tempo: $('#outrosTempo').val()
    }
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

export function getCheckValue(){
  var chkObj = []
  $("input.checkbox-experienca-pratica:checked").each(function (i) {
       chkObj.push({value: this.value, index: i})
  });
  return chkObj
}

export function getMediumData() {
  var tempoObj = getTempoValue();
  var valueObj = getCheckValue()

  console.log(tempoObj);
  console.log(valueObj);
  // $("input.checkbox-experienca-pratica:checked").each(function (i) {
  //   var chk = this
  //   tempoObj.forEach(function (element, index) {
  //       console.log(chk.value)
  //     if (index == i) {

  //       element = { tempo: element.tempo, value: chk.value };
  //     } else {

  //       element = { tempo: element.tempo, value: "off" };
  //     }
  //     console.log(element) ;
  //   }
  //   );
  // });
}

// var checkboxs = document.getElementsByClassName("checkbox-experienca-pratica");
// for (loop = 0; loop < checkboxs.length; loop++) {
//   var item = checkboxs[loop];
//   if (item.type == "checkbox" && item.checked) {
//     alert("ALGUMA COISA");
//     // AQUI TRAVOU....                        
//   }
// }



export { getDormData };