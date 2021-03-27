/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require('botkit');

const backendFns = require('./../helpers/backend');
const INTENTS = require('./../helpers/intents');

module.exports = function(controller) {

  let convo = new BotkitConversation('PREFERENCES', controller);

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

    let genreCorrect, platformCorrect;
    let preference = {
      'genre': variables.genre,
      'price': parseFloat(variables.price),
      'platform': variables.platform,
      'rating': parseFloat(variables.rating)
    };


    try {

      genreCorrect = await backendFns.isGenreCorrect(preference.genre);
      platformCorrect = await backendFns.isPlatformCorrect(preference.platform);
      priceIsNumeric = backendFns.isNumeric(preference.price);
      ratingIsNumeric = backendFns.isNumeric(preference.rating);

      if(genreCorrect && platformCorrect && priceIsNumeric && ratingIsNumeric) {
        await backendFns.savePreference(preference);
        await bot.say('I\'ve updated your preferences.');
      }
      else {
        throw new Error();
      }

    }

    catch(err) {

      await bot.say('Something went wrong...sorry we have to try again.');
      await bot.beginDialog('PREFERENCES');

    }


  });

  controller.addDialog(convo);

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

}
