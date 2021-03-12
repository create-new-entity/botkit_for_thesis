const axios = require('axios');

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

module.exports = {
  getAvailableGameNames,
  getBalance
};