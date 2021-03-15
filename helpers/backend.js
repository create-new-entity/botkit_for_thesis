const axios = require('axios');
const { IS_CART_AFFORDABLE } = require('./intents');

BASE_URL = 'http://localhost:3009/thesis_bot_backend/common/';
CHECK_BALANCE = BASE_URL + 'check_balance';
SET_BALANCE = BASE_URL + 'set_balance';
CHECK_AFFORDABILITY = BASE_URL + 'check_affordability';
ADD_TO_LIBRARY = BASE_URL + 'add_to_library';
REMOVE_FROM_LIBRARY = BASE_URL + 'remove_from_library';
SHOW_AVAILABLE_GAMES = BASE_URL + 'show_available_games';
SHOW_LIBRARY_GAMES = BASE_URL + 'show_library_games';
PURCHASE = BASE_URL + 'purchase';
ADD_BALANCE = BASE_URL + 'add_balance';

BASE_URL_CART = 'http://localhost:3010/';
ADD_CART = BASE_URL_CART + 'add';
REMOVE_GAME_FROM_CART = BASE_URL_CART + 'remove';
REMOVE_ALL_GAMES_FROM_CART = BASE_URL_CART + 'remove_all';


const getAvailableGameNames = async () => {
  try {
    const resp = await axios.get(SHOW_AVAILABLE_GAMES);
    return resp.data.map(game => game.name);
  }
  catch (err){
    console.log('Error in getAvailableGameNames');
  }
};

const getBalance = async () => {
  try {
    const resp = await axios.get(CHECK_BALANCE);
    return resp.data.balance;
  }
  catch(err) {
    console.log('Error in getBalance');
  }
};

const addGamesToCart = async (games) => {
  try {
    await axios.post(ADD_CART, { "games": games });
  }
  catch(err) {
    console.log('Error in addGamesToCart');
  }
}

const getCart = async () => {
  try {
    let res = await axios.get(BASE_URL_CART);
    return res.data.cart;
  }
  catch(err) {
    console.log('Error in getCart');
  }
};

const removeGamesFromCart = async (games) => {
  try {
    let res = await axios.post(REMOVE_GAME_FROM_CART, { games });
    return res.data.cart;
  }
  catch(err) {
    console.log('Error in removeGamesFromCart');
  }
};

const getGameIdsFromGameNames = async (games) => {
  try {
    let res = await axios.get(SHOW_AVAILABLE_GAMES);
    let availableGames = res.data;

    let game_ids = availableGames
      .filter((game) => games.map(gameName => gameName.toLowerCase()).includes(game.name.toLowerCase()))
      .map(game => game.game_id);
    return game_ids;
  }
  catch(err) {
    console.log('Error in getGameIdsFromGameNames');
  }
};

const isCartAffordable = async () => {
  try {

    let cartGames = await getCart();

    if(!cartGames || !cartGames.length){
      return [
        `Your cart is empty..`
      ];
    }

    let game_ids = await getGameIdsFromGameNames(cartGames);
    let res = await axios.get(CHECK_AFFORDABILITY, { data: { game_ids } });
    isAffordableObj = res.data;

    if(!isAffordableObj) throw new Error();

    if(!isAffordableObj.can_afford) {
      return [
        `Sorry, but you can't afford it.`,
        `Your balance is ${isAffordableObj.balance} euro(s)`,
        `Total cost of the cart is ${isAffordableObj.cost}`,
        `You need to add ${isAffordableObj.shortage} euro(s)`
      ];
    }
    return [
      `Yes, you can checkout your cart.`,
      `Your balance is ${isAffordableObj.balance} euro(s)`,
      `Total cost of the cart is ${isAffordableObj.cost}`,
      `You'll have ${isAffordableObj.balance - isAffordableObj.cost} euro(s) in account afterwards.`
    ];
  }
  catch(err) {
    console.log('Error in isCartAffordable');
  }
};


const removeAllFromCart = async () => {
  try {
    let res = await axios.post(REMOVE_ALL_GAMES_FROM_CART);
    return [
      'Everything has been removed from cart.'
    ];
  }
  catch(err) {
    console.log('Error in removeAllFromCart');
  }
};

const purchaseCart = async () => {
  try {

    let gamesInCart = await getCart();
    if(!gamesInCart || !gamesInCart.length) {
      return [
        'Your cart is empty.'
      ];
    }

    let game_ids = await getGameIdsFromGameNames(gamesInCart);
    let res = await axios.get(CHECK_AFFORDABILITY, { data: { game_ids } });
    isAffordableObj = res.data;

    if(!isAffordableObj) throw new Error();

    if(!isAffordableObj.can_afford) {
      return [
        `Sorry, but you can't afford it.`,
        `Your balance is ${isAffordableObj.balance} euro(s)`,
        `Total cost of the cart is ${isAffordableObj.cost}`,
        `You need to add ${isAffordableObj.shortage} euro(s)`
      ];
    }
    
    res = await axios.post(PURCHASE, { game_ids });
    if(res.status === 200) {
      return [
        `Purchase successful. You can check your library now.`
      ];
    }
    else return [
      `Purchase failed. Something went wrong. Try again later.`
    ];
  }
  catch(err) {
    console.log('Error in purchaseCart');
  }
};


module.exports = {
  getAvailableGameNames,
  getBalance,
  addGamesToCart,
  getCart,
  removeGamesFromCart,
  getGameIdsFromGameNames,
  isCartAffordable,
  removeAllFromCart,
  purchaseCart
};