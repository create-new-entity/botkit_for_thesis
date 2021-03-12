const INTENTS = require('../helpers/intents');
const backendFns = require('../helpers/backend');

module.exports = function(controller) {


  controller.hears(

    async (message) => {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.SHOW_AVAILABLE_GAMES) === 0;
    },

    ['message'],

    async (bot, message) => {
      const availableGameNames = await backendFns.getAvailableGameNames();
      await bot.reply(message, availableGameNames);
    }
  
  );


  
  controller.hears(

    async (message) => {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.CHECK_BALANCE) === 0;
    },

    ['message'],

    async (bot, message) => {
      const balance = await backendFns.getBalance();
      await bot.reply(message, 'Your available balance is ' + balance);
    }
  
  );


}