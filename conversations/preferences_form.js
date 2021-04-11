const { BotkitConversation } = require('botkit');

const backendFns = require('./../helpers/backend');
const INTENTS = require('./../helpers/intents');
const PROMPTS = require('./../helpers/preference_form_prompts');

const preferences_convo = (controller) => {
  let convo = new BotkitConversation('PREFERENCES', controller);
 
   convo.ask(
     PROMPTS.prompt1,
     async(res, convo, bot) => {},
     {key: 'genre'}
   );
 
   convo.ask(
     PROMPTS.prompt2,
     async(res, convo, bot) => {},
     {key: 'price'}
   );
 
   convo.ask(
     PROMPTS.prompt3,
     async(res, convo, bot) => {},
     {key: 'platform'}
   );
 
   convo.ask(
     PROMPTS.prompt4,
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
 
      console.log(preference);
       genreCorrect = await backendFns.isGenreCorrect(preference.genre);
       platformCorrect = await backendFns.isPlatformCorrect(preference.platform);
       priceIsNumeric = backendFns.isNumeric(preference.price);
       ratingIsNumeric = backendFns.isNumeric(preference.rating);
 
       if(genreCorrect && platformCorrect && priceIsNumeric && ratingIsNumeric) {
         await backendFns.savePreference(preference);
         await bot.say(PROMPTS.reply);
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
 
   return convo;
};
 
 module.exports = preferences_convo;
 