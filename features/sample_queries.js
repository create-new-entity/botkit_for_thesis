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
}