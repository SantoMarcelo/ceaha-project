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

Template.novoParticipante.events({
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
      uf_endereco: $('#uf-endereco').val()
      

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




