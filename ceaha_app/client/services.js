export function getFormData(){
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
    estado_civil:  $('#inputEstadoCivil').val(),
    endereco : {
      cep: $('#cep').val(),
      logradouro: $('#rua').val(),
      numero: $('#numero').val(),
      bairro: $('#bairro').val(),
      cidade: $('#cidade').val(),
      complemento: $('#complemento').val(),
      uf_endereco: $('#uf-endereco').val()
      },
    profissao : {
        atividade:$('#inputProfissao').val(),
        aposentado: $('#aposentadoria option:selected').text(),
        local_trabalho: $('#inputLocalTrabalho').val(),
        tel: $('#telComercial').val(),
    } ,
    endereco_comercial :{
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
    atividades_voluntarias: [
        {atividade: $('.descricao-atividade').val(), tempo_atividade_voluntaria: $('.tempo-atividade').val()}
    ],
    experiencia : {
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

export function getDataTable(table){
  console.log(table);
  var tableData = $(table);
  console.log(tableData);

  tableData.find('tr').each(function (i, el) {
    console.log("aqui no each");
    
});
}

export {getDormData};