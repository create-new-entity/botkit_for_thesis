/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require('botkit');

const backendFns = require('./../helpers/backend');
const INTENTS = require('./../helpers/intents');

module.exports = function(controller) {

  let convo = new BotkitConversation('PREFERENCES', controller);
  let successConvo = new BotkitConversation('SUCCESS', controller);
  let failureConvo = new BotkitConversation('FAILURE', controller);

  convo.ask(
    'What kind of games do you like (e.g. Action, Adventure)? Give me one genre name.',
    async(res, convo, bot) => {},
    {key: 'genre'}
  );

  convo.ask(
    'What should be the maximum price of the game you would buy 💸?',
    async(res, convo, bot) => {},
    {key: 'price'}
  );

  convo.ask(
    'Which platform you prefer (e.g. PC, Playstation 4) 🎮?',
    async(res, convo, bot) => {},
    {key: 'platform'}
  );

  convo.ask(
    'What should be the minimum rating of the video game (e.g. 4)?',
    async(res, convo, bot) => {},
    {key: 'rating'}
  );

  convo.after(async(variables, bot) => {
    let preference = {
      'genre': variables.genre,
      'price': parseFloat(variables.price),
      'platform': variables.platform,
      'rating': parseFloat(variables.rating)
    };
    
    try {
      await backendFns.savePreference(preference);
    }
    catch(err) {
      throw new Error();
    }
  });
  controller.addDialog(convo);


  successConvo.say('I\'ve updated your preferences.');
  controller.addDialog(successConvo);

  failureConvo.say('Something went wrong. I couldn\'t update your preferences.');
  controller.addDialog(failureConvo);

  controller.hears(

      async (message) => {
        try {
          return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.UPDATE_PREFERENCES) === 0;
        }
        catch (err) {
          return false;
        }
      },
  
      ['message'],
  
      async (bot, message) => {
        await bot.beginDialog('PREFERENCES');
      }
    
  );

  controller.afterDialog('PREFERENCES', async(bot, results) => {
    if(results._status !== 'completed') {
      await bot.beginDialog('SUCCESS');
    }
    else {
      await bot.beginDialog('FAILURE');
    }
  });

}
