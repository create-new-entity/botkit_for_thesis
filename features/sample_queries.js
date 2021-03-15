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

  controller.hears(

    async (message) => {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.ADD_TO_CART) === 0;
    },

    ['message'],

    async (bot, message) => {
      await backendFns.addGamesToCart(message.intents[0].entities.game.map(obj => obj.value));
      await bot.reply(message, 'Added to cart...');
    }
  
  );
  
  controller.hears(

    async (message) => {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.SHOW_CART_ITEMS) === 0;
    },

    ['message'],

    async (bot, message) => {
      let cartGames = await backendFns.getCart();
      if(cartGames && cartGames.length) {
        cartGames.unshift('Games in your cart are:');
      }
      else cartGames = ['Your cart is empty'];
      await bot.reply(message, cartGames);
    }
  
  );


  controller.hears(

    async (message) => {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.REMOVE_FROM_CART) === 0;
    },

    ['message'],

    async (bot, message) => {
      let cartGames = await backendFns.removeGamesFromCart(message.intents[0].entities.game.map(obj => obj.value));
      if(cartGames && cartGames.length) {
        cartGames.unshift('Removed. Current games in your cart are:');
      }
      else cartGames = ['Items removed. Your cart is empty now.'];
      await bot.reply(message, cartGames);
    }
  
  );


  controller.hears(

    async (message) => {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.IS_CART_AFFORDABLE) === 0;
    },

    ['message'],

    async (bot, message) => {
      let isAffordable = await backendFns.isCartAffordable();
      await bot.reply(message, isAffordable);
    }
  
  );

}