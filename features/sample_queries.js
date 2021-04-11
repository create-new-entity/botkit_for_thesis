const INTENTS = require('../helpers/intents');
const backendFns = require('../helpers/backend');
const PREFERENCES_CONVO = require('./../conversations/preferences_form');

module.exports = function(controller) {

  controller.addDialog(PREFERENCES_CONVO(controller));

  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.SHOW_AVAILABLE_GAMES) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      console.log(message);
      const availableGameNames = await backendFns.getAvailableGameNames();
      await bot.reply(message, availableGameNames);
    }
  
  );


  
  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.CHECK_BALANCE) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      const balance = await backendFns.getBalance();
      await bot.reply(message, 'Your available balance is ' + balance);
    }
  
  );

  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.ADD_TO_CART) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      await backendFns.addGamesToCart(message.intents[0].entities.game.map(obj => obj.value));
      await bot.reply(message, 'Added to cart...');
    }
  
  );
  
  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.SHOW_CART_ITEMS) === 0;
      }
      catch (err) {
        return false;
      }
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
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.REMOVE_FROM_CART) === 0;
      }
      catch (err) {
        return false;
      }
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
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.IS_CART_AFFORDABLE) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let isAffordableMsg = await backendFns.isCartAffordable();
      await bot.reply(message, isAffordableMsg);
    }
  
  );


  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.REMOVE_ALL_FROM_CART) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let removeAllFrmCartMsg = await backendFns.removeAllFromCart();
      await bot.reply(message, removeAllFrmCartMsg);
    }
  
  );


  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.BUY_CART_ITEMS) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let purchaseMsg = await backendFns.purchaseCart();
      await bot.reply(message, purchaseMsg);
    }
  
  );

  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.SHOW_LIBRARY) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let showLibraryMsg = await backendFns.getShowLibraryGamesMsg();
      await bot.reply(message, showLibraryMsg);
    }
  
  );

  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.REMOVE_GAME_FROM_LIBRARY) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let nameOfGamesToRemove = message.intents[0].entities.game.map(game => game.value);
      let removeFromLibraryMsg = await backendFns.getRemoveGameFromLibraryMsg(nameOfGamesToRemove);
      await bot.reply(message, removeFromLibraryMsg);
    }
  
  );
  
  
  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.ADD_MONEY) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let addMoneyMsg = await backendFns.getAddMoneyMsg(message.intents[0].entities.amount_of_money[0].value);
      await bot.reply(message, addMoneyMsg);
    }
  
  );

  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.REMOVE_LIBRARY) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let removeLibMsg = await backendFns.getRemoveLibraryMsg();
      await bot.reply(message, removeLibMsg);
    }
  
  );
  
  controller.hears(

    async (message) => {
      try {
        return message.intents[0].entities.intent[0].value.localeCompare(INTENTS.APPLY_PREFERENCES) === 0;
      }
      catch (err) {
        return false;
      }
    },

    ['message'],

    async (bot, message) => {
      let preferredGamesMsg = await backendFns.getPreferedAvailableGamesMsg();
      await bot.reply(message, preferredGamesMsg);
    }
  
  );


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