import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { getFormData, getDataTable } from './services.js'

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

        var row = document.getElementById("atividadeItem");
        var table = document.getElementById("atividadeTable");
        var clone = row.cloneNode(true);
        clone.id = Math.random().toString(32).substring(2, 10);
        clone.class = 'test';
        table.appendChild(clone);

    },
    'click #removeAtividadeVoluntaria'(event, instance) {
        event.preventDefault();

        var table = document.getElementById("atividadeTable");
        var current = event.currentTarget;

        table.deleteRow(current.parentNode.parentNode.rowIndex)

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

    'click #transferencia'(event, instance) {
        var transferencia = $('#transferencia').val();
        if (transferencia != 2) {
            $('.dados-transferencia').hide();
        } else {
            $('.dados-transferencia').show();
        }
    },

    'click #aposentadoria'(event, instance) {
        var aposentado = $('#aposentadoria').val();
        console.log(aposentado)
        if (aposentado != 1) {
            $('#enderecoTrabalho').hide();
        } else {
            $('#enderecoTrabalho').show();
        }
    },

    'click #escolaridade'(event, instance) {
        var escolaridade = $('#escolaridade').val();
        if (escolaridade < 4) {
            $('#cursoEscolaridade').hide();
            $('#instituiçãoEscolaridade').hide();
        } else {
            $('#cursoEscolaridade').show();
            $('#instituiçãoEscolaridade').show();
        }
    },

    'click #cadastrar'(event, instance) {
        event.preventDefault();
        var table = getDataTable('#atividadeTable');
        console.log(table);
        var participante = getFormData();

        Meteor.call('inserirParticipante', participante, function (err, res) {
            if (err) {
                sAlert.error(err.reason)
                return false;
            } else {
                sAlert.success('Participante cadastrado com sucesso.')
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

        window.location.href = ('/editarParticipante/' + this._id);

    }

})

Template.editarParticipante.events({


    'click #salvar'(event, instance) {
        event.preventDefault();
        var participante = {
            nome: $('#full-name').val(),
            nascimento: $('#date-birth').val(),
            nacionalidade: $('#nacionality').val(),
            cidade: $('#cidadeNascimento').val(),
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
            atividade_voluntaria: $('#atividadeVoluntaria').val(),
            tempo_atividade_voluntaria: $('#tempoAtividadeVoluntaria').val(),
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


