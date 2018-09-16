import { Meteor } from 'meteor/meteor';
import { onPageLoad } from "meteor/server-render";
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  
  
  const participantes = new Mongo.Collection('participantes');

  Meteor.methods({
    'inserirParticipante'(participante) {
      participantes.insert(participante);
      }
  });

  onPageLoad(sink => {
    // Code to run on every request.
    sink.renderIntoElementById(
      "server-render-target",
      `Server time: ${new Date}`
    );
  });
});