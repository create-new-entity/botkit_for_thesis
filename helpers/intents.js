const AFFIRM = 'affirm';
const DENY = 'deny';
const SHOW_LIBRARY = 'show_library';
const CHECK_BALANCE = 'check_balance';
const SHOW_AVAILABLE_GAMES = 'show_available_games';
const SHOW_CART_ITEMS = 'show_cart_items';
const ADD_TO_CART = 'add_to_cart';
const REMOVE_FROM_CART = 'remove_from_cart';
const REMOVE_GAME_FROM_LIBRARY = 'remove_game_from_library';
const REMOVE_ALL_FROM_CART = 'remove_all_from_cart';
const IS_CART_AFFORDABLE = 'is_cart_affordable';
const BUY_CART_ITEMS = 'buy_cart_items';
const ADD_MONEY = 'add_money';
const REMOVE_LIBRARY = 'remove_library';

const INTENTS = {
  AFFIRM,
  DENY,
  SHOW_LIBRARY,
  CHECK_BALANCE,
  SHOW_AVAILABLE_GAMES,
  SHOW_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_GAME_FROM_LIBRARY,
  REMOVE_LIBRARY,
  REMOVE_ALL_FROM_CART,
  IS_CART_AFFORDABLE,
  BUY_CART_ITEMS,
  ADD_MONEY
};



module.exports = INTENTS;
