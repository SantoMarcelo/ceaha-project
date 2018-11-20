import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { getFormData, getMediumData, adicionaAtividade, removeAtividade } from './js/services.js'

import './main.html';
//import './services.js';


const Participantes = new Mongo.Collection('participantes');

Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'bottom',
        timeout: 5000
    })

})


Router.route('/', function () {
    this.render('novoParticipante');
});
Router.route('/novoParticipante', function () {
    this.render('novoParticipante');
});

Router.route('/login', function () {
    this.render('acesso');
});
Router.route('/home', function () {
    this.render('listaParticipante');
});
Router.route('/editarParticipante/:_id', {
    name: 'edit',
    template: 'editarParticipante',
    data: function () {
        console.log(Participantes.findOne({ _id: this.params._id }));
        var participante = Participantes.findOne({ _id: this.params._id });
        console.log(participante);
        return Participantes.findOne({ _id: this.params._id });
    },

});


Template.navbar.events({
    'click #botaoSair'(event, instance) {
        event.preventDefault();
        Meteor.logout();
        window.location.href = ('/');
    },

    'click #botaoLogin'(event, instance) {
        event.preventDefault();
        $('.navbar-brand').text('Por favor fazer login com seu usuário e senha');
        $('#paginaNovo').hide();
        $('#paginaAcesso').show();
        window.location.href = ('/login');
    },

    'click #novoParticipante'(event, instance) {
        window.location.href = ('/novoParticipante');
        $('.navbar-brand').text('Preencha seus dados abaixo');

    },
    'click #home'(event, instance) {
        window.location.href = ('/home');
    }

})

Template.navbar.helpers({
    fullName() {
        return Meteor.user().profile.name;
    }

})

Template.acesso.events({

    'click #botaoLogin'(event, instance) {
        event.preventDefault();

        var email = $('#login #loginEmail').val();
        var senha = $('#login #loginSenha').val();

        Meteor.loginWithPassword(email, senha, function (err) {
            if (err) {
                sAlert.error(err.reason)
            } else {
                console.log('to aqui');
                window.location.href = ('/home')
                sAlert.success('Olá, você foi autenticado.')

            }
        })

    },

    'click #botaoCadastrar'(event, instance) {
        event.preventDefault();

        var nome = $('#cadastro #cadastroNome').val();
        var email = $('#cadastro #cadastroEmail').val();
        var senha = $('#cadastro #cadastroSenha').val();

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


    },



})

Template.novoParticipante.helpers(function () {
   

    

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

Template.novoParticipante.onRendered(function () {

    



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
        adicionaAtividade();
    },
    'click #removeAtividadeVoluntaria'(event, instance) {
        event.preventDefault();

        var table = document.getElementById("atividadeTable");
        var current = event.currentTarget;

        table.deleteRow(current.parentNode.parentNode.rowIndex)

    },

    'click #transferencia'(event, instance) {
        var transferencia = $('#transferencia').val();
        if (transferencia == 'Sim') {
            $('#nomeCentroEspirita').prop("disabled", false);
            $('#cidadeCentroEspirita').prop("disabled", false);
            $('#tempoCentroEspirita').prop("disabled", false);
            $('#ufCentroEspirita').prop("disabled", false);
        } else {
            $('#nomeCentroEspirita').prop("disabled", true);
            $('#cidadeCentroEspirita').prop("disabled", true);
            $('#tempoCentroEspirita').prop("disabled", true);
            $('#ufCentroEspirita').prop("disabled", true);
        }
    },

    'click #aposentadoria'(event, instance) {
        var aposentado = $('#aposentadoria').val();
        if (aposentado == 'Não') {
            $('#inputLocalTrabalho').prop("disabled", false);
            $('#telComercial').prop("disabled", false);
            $('#cepComercial').prop("disabled", false);
            $('#logradouroComercial').prop("disabled", false);
            $('#numeroComercial').prop("disabled", false);
            $('#bairroComercial').prop("disabled", false);
            $('#complementoComercial').prop("disabled", false);
            $('#cidadeComercial').prop("disabled", false);
            $('#ufComercial').prop("disabled", false);
        }else{
            $('#inputLocalTrabalho').prop("disabled", true);
            $('#telComercial').prop("disabled", true);
            $('#cepComercial').prop("disabled", true);
            $('#logradouroComercial').prop("disabled", true);
            $('#numeroComercial').prop("disabled", true);
            $('#bairroComercial').prop("disabled", true);
            $('#complementoComercial').prop("disabled", true);
            $('#cidadeComercial').prop("disabled", true);
            $('#ufComercial').prop("disabled", true);
        }
    },

    'click #escolaridade'(event, instance) {
        var escolaridade = $('#escolaridade').val();
        if (escolaridade < 4) {
            $('#inputCursoEscolaridade').prop("disabled", true);
            $('#instituicaoEscolaridade').prop("disabled", true);
        } else {
            $('#inputCursoEscolaridade').prop("disabled", false);
            $('#instituicaoEscolaridade').prop("disabled", false);
        }
    },

    'click .checkbox-experienca-pratica'(event, instance) {
        console.log(event);
        console.log(instance.parentNode);
        $(".experiencia-pratica").each(function (i) {
            //console.log($(this).find('input.checkbox-experienca-pratica:checked'));
            if ($(this).find('input.checkbox-experienca-pratica:checked').length > 0) {
                 $(this).find('.input-time').prop("disabled", false);
            }
        });

    },

    'click #cadastrar'(event, instance) {
        event.preventDefault();
        var participante = getFormData();

        Meteor.call('inserirParticipante', participante, function (err, res) {
            if (err) {
                sAlert.error(err.reason)
                return false;
            } else {
                sAlert.success('Participante cadastrado com sucesso.')
                window.location.href = ('/')
            }
        })
    }
})

Template.listaParticipante.onCreated(function () {
    this.participante = new ReactiveVar(Participantes.find());

})

Template.listaParticipante.helpers({
    'listaParticipantes': function () {
        return Template.instance().participante.get();
    },

})

Template.listaParticipante.events({
    'click #botaoBuscar'(event, instance) {
        event.preventDefault();
        var nome = $('#buscaNome').val();
        var query = {
            'nome': nome
        }

        if (nome != '') {
            var query = {
                'nome': nome
            }
        }

        var resultado = Participantes.find(query);
        console.log("aqui no resultado")
        console.log(resultado)

        instance.participante.set(resultado);
    },
    'click #editarContato'(event, instance) {
        event.preventDefault();
        //console.log(this._id);
        window.location.href = ('/editarParticipante/' + this._id);

    }

})

Template.editarParticipante.onRendered(function () {
    
    console.log("aqui" + $('#transferencia').val()); 
    var transferencia = $('#transferencia').val();
    if (transferencia == 'Sim') {
        $('#nomeCentroEspirita').prop("disabled", false);
        $('#cidadeCentroEspirita').prop("disabled", false);
        $('#tempoCentroEspirita').prop("disabled", false);
        $('#ufCentroEspirita').prop("disabled", false);
    } else {
        $('#nomeCentroEspirita').prop("disabled", true);
        $('#cidadeCentroEspirita').prop("disabled", true);
        $('#tempoCentroEspirita').prop("disabled", true);
        $('#ufCentroEspirita').prop("disabled", true);
    }
   
    // this.participante = new ReactiveVar(Participantes.find({ _id: 'RAnsnTMyQWpXEiTqC' }));

})

Template.editarParticipante.helpers({function(){

    
   
    var transferencia = $('#transferencia').val();
    if (transferencia == 'Sim') {
        $('#nomeCentroEspirita').prop("disabled", false);
        $('#cidadeCentroEspirita').prop("disabled", false);
        $('#tempoCentroEspirita').prop("disabled", false);
        $('#ufCentroEspirita').prop("disabled", false);
    } else {
        $('#nomeCentroEspirita').prop("disabled", true);
        $('#cidadeCentroEspirita').prop("disabled", true);
        $('#tempoCentroEspirita').prop("disabled", true);
        $('#ufCentroEspirita').prop("disabled", true);
    }
   } 
})

Template.editarParticipante.events({

    
    'click #adicionaAtividade'(event, instance) {
        event.preventDefault();
        adicionaAtividade();
    },
    'click #removeAtividadeVoluntaria'(event, instance) {
        event.preventDefault();

        var table = document.getElementById("atividadeTable");
        var current = event.currentTarget;

        table.deleteRow(current.parentNode.parentNode.rowIndex)

    },

    'click #transferencia'(event, instance) {
        var transferencia = $('#transferencia').val();
        if (transferencia == 'Sim') {
            $('#nomeCentroEspirita').prop("disabled", false);
            $('#cidadeCentroEspirita').prop("disabled", false);
            $('#tempoCentroEspirita').prop("disabled", false);
            $('#ufCentroEspirita').prop("disabled", false);
        } else {
            $('#nomeCentroEspirita').prop("disabled", true);
            $('#cidadeCentroEspirita').prop("disabled", true);
            $('#tempoCentroEspirita').prop("disabled", true);
            $('#ufCentroEspirita').prop("disabled", true);
        }
    },

    'click #aposentadoria'(event, instance) {
        var aposentado = $('#aposentadoria').val();
        if (aposentado == 'Não') {
            $('#inputLocalTrabalho').prop("disabled", false);
            $('#telComercial').prop("disabled", false);
            $('#cepComercial').prop("disabled", false);
            $('#logradouroComercial').prop("disabled", false);
            $('#numeroComercial').prop("disabled", false);
            $('#bairroComercial').prop("disabled", false);
            $('#complementoComercial').prop("disabled", false);
            $('#cidadeComercial').prop("disabled", false);
            $('#ufComercial').prop("disabled", false);
        }else{
            $('#inputLocalTrabalho').prop("disabled", true);
            $('#telComercial').prop("disabled", true);
            $('#cepComercial').prop("disabled", true);
            $('#logradouroComercial').prop("disabled", true);
            $('#numeroComercial').prop("disabled", true);
            $('#bairroComercial').prop("disabled", true);
            $('#complementoComercial').prop("disabled", true);
            $('#cidadeComercial').prop("disabled", true);
            $('#ufComercial').prop("disabled", true);
        }
    },

    'click #escolaridade'(event, instance) {
        var escolaridade = $('#escolaridade').val();
        if (escolaridade < 4) {
            $('#inputCursoEscolaridade').prop("disabled", true);
            $('#instituicaoEscolaridade').prop("disabled", true);
        } else {
            $('#inputCursoEscolaridade').prop("disabled", false);
            $('#instituicaoEscolaridade').prop("disabled", false);
        }
    },

    'click .checkbox-experienca-pratica'(event, instance) {
        console.log(event);
        console.log(instance.parentNode);
        $(".experiencia-pratica").each(function (i) {
            //console.log($(this).find('input.checkbox-experienca-pratica:checked'));
            if ($(this).find('input.checkbox-experienca-pratica:checked').length > 0) {
                 $(this).find('.input-time').prop("disabled", false);
            }
        });

    },

    'click #salvar'(event, instance) {
        event.preventDefault();
        var participante = getFormData()

        if (this._id) {
            Meteor.call('updateParticipante', this._id, participante, function (err, res) {
                if (err) {
                    sAlert.error(err.reason)
                    return false;
                } else {
                    sAlert.success('Participante alterado com sucesso.')
                }
            })
        } else {
            Meteor.call('inserirParticipante', participante, function (err, res) {
                if (err) {
                    sAlert.error(err.reason)
                    return false;
                } else {
                    sAlert.success('Participante cadastrado com sucesso.')
                }
            })
        }
        window.location.href = ('/home');
        // Meteor.call('inserirParticipante', participante, function(err, res){
        //   if (err) {
        //       sAlert.error(err.reason)
        //       return false;
        //   } else {
        //       sAlert.success('Participante cadastrado com sucesso.')
        //   }
        // })     
    }
})

Template.editarParticipante.helpers({
    // 'listaParticipantes': function () {
    //    return Template.instance().participante.get();
    // },
})


