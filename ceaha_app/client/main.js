import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function() {

  sAlert.config({
      effect: '',
      position: 'bottom',
      timeout: 5000
  })  

})

    
Router.route('/', function () {
    this.render('novoParticipante');
});
Router.route('/test', function () {
    this.render('acesso');
});
  

Template.navbar.events({
  'click #botaoSair'(event, instance){
    event.preventDefault();
    Meteor.logout();
    window.location.href('/')
  },

  'click #botaoLogin'(event, instance){
    event.preventDefault();
    $('.navbar-brand').text('Por favor fazer login com seu usuário e senha');
    $('#paginaNovo').hide();  
    $('#paginaAcesso').show();
    window.location.href = ('/test')
  },

  'click #novoParticipante'(event, instance){
    $('.navbar-brand').text('Preencha seus dados abaixo');
    $('#paginaNovo').show();  
    $('#paginaAcesso').hide();
   
  },

  'click #pesquisar'(event, instance){
    console.log("to aqui")
  }

})



Template.navbar.helpers({
  fullName(){
    return Meteor.user().profile.name;
  }
  
})

Template.acesso.events({

  'click #botaoLogin'(event, instance) {
      event.preventDefault();

      var email = $('#login #campoEmail').val();
      var senha = $('#login #campoSenha').val();

      Meteor.loginWithPassword(email, senha, function (err) {
          if (err) {
              sAlert.error(err.reason)
          } else {
              console.log('to aqui');
              window.location.href = ('/')
              sAlert.success('Olá, você foi autenticado.')

          }
      })

  },

  'click #botaoCadastrar'(event, instance) {
      event.preventDefault();

      var nome = $('#cadastro #campoNome').val();
      var email = $('#cadastro #campoEmail').val();
      var senha = $('#cadastro #campoSenha').val();

      var user = {
          email: email,
          password: senha,
          profile: { name: nome }
      }

      Accounts.createUser(user, function (err) {
          if (err) {
              if (err.reason = 'Email already exists.') {
                  sAlert.error('Você já está cadastrado.');
              } else {
                  sAlert.error(err.reason);
              }
          } else {
              console.log('tudo certo');
          }
      })


  }

})



Template.novoParticipante.helpers({
    
    // aposentado(){
    //   var aposentado = $('select[name=aposentadoria]').val()
    //   console.log(aposentado)
    //   if(aposentado != 0){
    //     $('#enderecoTrabalho').hide();
    //   }
    // },

    // escola(){
    //     var escola = $('#escolaridade').val();
    //     if (escola == ''){
    //         // $('#cursoEscolaridade').hide();
    //         // $('#instituiçãoEscolaridade').hide();
    //         return console.log('aqui dentro')
    //     }
    
    // }
    
})


Template.novoParticipante.events({

    'click #botaoContador'(event, instance) {
        event.preventDefault();

        var contador = Template.instance().contador.get();

        instance.contador.set(contador + 1);

    },

      'click #adicionaAtividade'(event, instance) {
        event.preventDefault();

        var contador = Template.instance().contador.get();

        instance.contador.set(contador + 1);
        console.log(contador)

    },

    // 'click #adicionaAtividade'(event, instance){

    //     //var element = $('.lista-atividades table ').html();
    //     var element2 =  $('.lista-atividades tbody').html();
    //     if (element2 == null) {
    //         var element2 =  $('.lista-atividades tbody').html();
    //     }
    //     console.log(element2);
    //     //console.log(element);
    //     $(element2).appendTo('.lista-atividades tbody');
    // },
  
  'click #transferencia'(event, instance){
    var transferencia = $('#transferencia').val();  
    if (transferencia != 2) {
        $('.dados-transferencia').hide();
    } else {
        $('.dados-transferencia').show();
    }
  },

  'click #aposentadoria'(event, instance){
    var aposentado = $('#aposentadoria').val();
    console.log(aposentado)
    if(aposentado != 1){
        $('#enderecoTrabalho').hide();
    } else {
        $('#enderecoTrabalho').show();
    }
  },

  'click #escolaridade'(event, instance){
    var escolaridade = $('#escolaridade').val();
    if (escolaridade < 4){
        $('#cursoEscolaridade').hide();
        $('#instituiçãoEscolaridade').hide();
    } else {
        $('#cursoEscolaridade').show();
        $('#instituiçãoEscolaridade').show();
    }
  },

  'click #cadastrar'(event, instance){
    event.preventDefault();
    var participante = {
      nome: $('#full-name').val(),
      nascimento: $('#date-birth').val(),
      nacionalidade: $('#nacionality').val(),
      cidade: $('#city').val(),
      uf: $('#uf').val(),
      nome_pai: $('#father-name').val(),
      rg: $('#mother-name').val(),
      nome_mae: $('#rg').val(),
      orgao_emissor: $('#orgao-emissor').val(),
      cpf: $('#cpf').val(),
      estado_civil: $('#inputEstadoCivil').val(),
      cep: $('#cep').val(),
      logradouro: $('#rua').val(),
      numero: $('#numero').val(),
      bairro: $('#bairro').val(),
      complemento: $('#complemento').val(),
      uf_endereco: $('#uf-endereco').val(),
      profissão: $('#inputProfissao').val(),
      aposentado: $('#aposentadoria').val(),
      local_trabalho: $('#inputLocalTrabalho').val(),
      tel_comercial: $('#telComercial').val(),
      cep_comercial: $('#cepComercial').val(),
      logradouro_comercial: $('#logradouroComercial').val(),
      numero_comercial: $('#numeroComercial').val(),
      numero_comercial: $('#bairroComercial').val(),
      complemento_comercial: $('#complementoComercial').val(),
      cidade_comercial: $('#cidadeComercial').val(),
      uf_comercial: $('#ufComercial').val(),
      escolaridade: $('#escolaridade').val(),
      curso_escolaridade: $('#cursoEscolaridade').val(),
      instituicao_escolaridade: $('#instituicaoEscolaridade').val(),
      descricao_atividades: $('#descricaoAtividades').val(),
      transferencia: $('#transferencia').val(),
      nomeCentro_espirita: $('#nomeCentroEspirita').val(),
      cidade_centro_espirita: $('#cidadeCentroEspirita').val(),
      tempo_centro_espirita: $('#tempoCentroEspirita').val(),
      tomos_esede: $('#tomosESede').val(),
      tomos_eade: $('#tomosEade').val(),
      obras_basicas: $('#obrasBasicas').val(),
      outras_obras: $('#outrasObras').val(),
      atividade_voluntaria: $('#atividadeVoluntaria').val(),
      tempo_atividade_voluntaria: $('#tempoAtividadeVoluntaria').val(),
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

    Meteor.call('inserirParticipante', participante, function(err, res){
      if (err) {
          sAlert.error(err.reason)
          return false;
      } else {
          sAlert.success('Participante cadastrado com sucesso.')
      }
  })     
  }
})

Template.buscaParticipante.events({
    'click #buscaNome'(event, instance) {
        event.preventDefault();

        var nome = $('#buscaNome').val();

        var query = { dono: Meteor.user()._id };

        if (celular != '') {
            query.celular = celular;
        }

        var resultado = Contato.find(query);

        instance.contatos.set(resultado);
    },
})


