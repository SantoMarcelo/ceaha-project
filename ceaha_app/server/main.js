import { Meteor } from 'meteor/meteor';
import { onPageLoad } from "meteor/server-render";
import { Mongo } from 'meteor/mongo';


Meteor.startup(() => {
  
  const Participantes = new Mongo.Collection('participantes');

  

  Meteor.methods({
    'inserirParticipante'(participante) {
      Participantes.insert(participante);
    },
    'buscaParticipante'(nome){
      Participantes.findOne({nome: nome})
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