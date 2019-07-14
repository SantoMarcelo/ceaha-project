import { Meteor } from 'meteor/meteor';
import { onPageLoad } from "meteor/server-render";
import { Mongo } from 'meteor/mongo';


Meteor.startup(() => {
  
  const Participantes = new Mongo.Collection('participantes');
  const Atividades = new Mongo.Collection('atividades');
  const Socio = new Mongo.Collection('socio')
  

  Meteor.methods({
    'inserirParticipante'(participante) {
      Participantes.insert(participante);
    },
    'buscaParticipante'(nome){
      Participantes.findOne({nome: nome})
    },
    'updateParticipante'(id, participante){
      Participantes.update({_id:id},{$set:participante});
    },
    'adicionaAtividadeInterna'(atividade){
      Atividades.insert(atividade);
    },
    'buscaAtividade'(){
      Atividades.find()
    },
    'adicionaSocio'(socio){
      Socio.insert(socio)
    }
  });
});


onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});