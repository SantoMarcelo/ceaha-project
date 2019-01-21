import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { getFormData, getMediumData, adicionaAtividade, addAtividadeInterna, getAtividadesInternas, setAtividadeInterna, removeAtividade } from './js/services.js'

import './main.html';
//import './services.js';


const Participantes = new Mongo.Collection('participantes');
const Atividades = new Mongo.Collection('atividades');

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
        
        //var participante = Participantes.findOne({ _id: this.params._id });
        return Participantes.findOne({ _id: this.params._id });
    },

});
Router.route('/adicionarAtividade/:_id', {
    name: 'add activity',
    template: 'preenchimentoInterno',
    data: function () {
        
        //var participante = Participantes.findOne({ _id: this.params._id });
        var ati = Atividades.find({user_id: 'PTuATQp2FKQ95HLZ2'})
        console.log("Atividades router")
        console.log(ati);
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
        
        if (aposentado == "false") {
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
    console.log(this.participante);
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

    },

    'click #addAtividade'(event, instance) {
        event.preventDefault();
        //console.log(this._id);
        window.location.href = ('/adicionarAtividade/' + this._id);

    }

})

Template.editarParticipante.onCreated(function () {
    
    this.atividades = new ReactiveVar(Atividades.find());
    var atividadeList = this.atividades.curValue.collection._docs._map
    console.log(atividadeList); 
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

Template.editarParticipante.helpers({
    'listaAtividades': function () {
         var lista = this.atividades_internas;
         
        // // var data = JSON.parse(lista);
        //  var groupedData = {};

        // for (var it = 0; it < lista.length; it++) {
        //     var item = lista[it];
        //     if (!groupedData[item.departamento])
        //         groupedData[item.departamento] = [];
        //     groupedData[item.departamento].push(item);
        // }
        
        for (var i = 0; i< lista.length; i++){
            console.log("***")
            console.log(lista[i].departamento)
        }
        
         return this.atividades_internas;
    },

    'orderedList': function(){
        
    }
    
})

Template.editarParticipante.events({

    'click #aposentadoria'(event, instance) {
        event.preventDefault();
        var aposentado = $('#aposentadoria').val();
        
        if (aposentado == "false") {
            $('#fieldDadosProfissionais').prop("disabled", false)
        }else{
            $('#fieldDadosProfissionais').prop("disabled", true)
        }
    },
    'click #editarProfissao'(event){
        event.preventDefault();
        $('#fieldDadosProfissionais').prop("disabled", false)
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
        event.preventDefault();
        var transferencia = $('#transferencia').val();
        if (transferencia == 'Sim') {
            $('#dadosTransferencia').prop("disabled", false)
        } else {
            $('#dadosTransferencia').prop("disabled", true)
        }
    },

    'click #editarDadosCentroEspirita'(event){
        event.preventDefault();
        console.log($('#dadosTransferencia'))
        $('#dadosTransferencia').prop("disabled", false)
    },
    

    'click #escolaridade'(event, instance) {
        event.preventDefault();
        var escolaridade = $('#escolaridade').val();
        if (escolaridade <= 4) {
            $('#dadosEscolares').prop("disabled", true)
        } else {
            $('#dadosEscolares').prop("disabled", false)
        }
    },

    'click #editarDadosEscolares'(event){
        event.preventDefault();
        $('#dadosEscolares').prop("disabled", false)
    },
    

    'click .checkbox-experienca-pratica'(event, instance) {
        event.preventDefault();
        $(".experiencia-pratica").each(function (i) {
            //console.log($(this).find('input.checkbox-experienca-pratica:checked'));
            if ($(this).find('input.checkbox-experienca-pratica:checked').length > 0) {
                 $(this).find('.input-time').prop("disabled", false);
            }
        });

    },

    'click #atividadeAno'(event){
        event.preventDefault();
        var myDate = new Date();
        var year = myDate.getFullYear();
        for(var i = 1950; i < year+1; i++){
            //document.find()write('<option value="'+i+'">'+i+'</option>');
            $('#atividadeAno').append('<option value="'+i+'">'+i+'</option>');
        }

        
    
        $('#atividadeAno').html(itensOrdenados);
    },

    'click #editar'(event, instance) {
        event.preventDefault();
        console.log(this.atividades_internas.length)
        if(this.atividades_internas.length >= 0){
            var participante = getFormData(this.atividades_internas)
        } else{
            var participante = getFormData()
        }
       

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
         
    },

    'click #cancelar'(event){
        event.preventDefault();
        window.location.href = ('/home');
    },

    'click .checkbox-tipo-socio'(event, instance) {
        event.preventDefault();
        console.log("tamo aqui")
        
        $("tr.tipo-socio-item").each(function (i) {
            console.log(i);
            $(this).find('input.checkbox-tipo-socio').prop("checked", true)
            //console.log($(this).find('input.checkbox-experienca-pratica:checked'));
            if ($(this).find('input.checkbox-tipo-socio:checked').length > 0) {
                
                $(this).find('.input-valor-mensal').prop("disabled", false);
            }
        });

    },

    'click #btnAddAtividadeInterna'(event, instance){
        event.preventDefault();

        

        
        addAtividadeInterna();
        

    },
    'click #btntest'(event){
        event.preventDefault();
        var atv = getAtividadesInternas();
        console.log(atv);
        var part = getFormData();
        console.log(part);
        part.atividades_internas = atv;
        console.log(part);
    }
})

Template.preenchimentoInterno.onCreated(function () {
   
    this.atividade = new ReactiveVar(Atividades.find());
    this.participante = new ReactiveVar(Participantes.find());
   
})

Template.preenchimentoInterno.helpers({
    
    'listaAtividadesInternas': function () {
        console.log("atividade filtradas");
        console.log(this._id);
        console.log(Template.instance().atividade.get({user_id: this._id}));
        return Template.instance().atividade.get();
    },
    'usuario': function () {
        console.log("usuario")
        console.log(this._id)
        console.log(Template.instance().participante.get({user_id: this._id}));
        return Template.instance().participante.get({user_id: this._id});
    },
    'lista': function(){
       var atividades = Template.instance().atividade.get();
       var participantes = Template.instance().participante.get();
       console.log("HELPERS");

       
   
    }

})

Template.preenchimentoInterno.events({
    'click #btnAddAtividadeInterna'(event, instance){
        event.preventDefault();
        var participante = Participantes.findOne({ _id: this.params._id });
        
        var atividades = {
            ano: $('#atividadeInternaAno').val(),
            atividade: $('#atividadeInterna').val(),
            freq_total: $('#atividadeInternaFreqTotal').val(),
            freq_real: $('#atividadeInternaFreqReal').val(),
            departamento: $('#atividadeInternaDepartamento option:selected').text(),
          }
          
          $('#anoAtividadeLista').text(atividades.ano);
          $('#AtividadeLista').text( atividades.atividade);
          $('#freqRealAtividadeLista').text(atividades.freq_real);
          $('#freqTotalAtividadeLista').text( atividades.freq_total);
          $('#deptoAtividadeLista').text( atividades.departamento);
      
        participante.push(atividades);
        console.log(participante)

        Meteor.call('adicionaAtividadeInterna', atividades,function (err, res) {
            if (err) {
                sAlert.error(err.reason)
                return false;
            } else {
                sAlert.success('Atividade cadastrado com sucesso.')
            }
        })

        // Meteor.call('updateParticipante',participante._id, participante, function (err, res) {
        //     if (err) {
        //         sAlert.error(err.reason)
        //         return false;
        //     } else {
        //         sAlert.success('Participante alterado com sucesso.')
        //     }
        // })
    }
})



