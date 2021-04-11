/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require('botkit');

module.exports = function(controller) {
    
    let convo = new BotkitConversation('hmm', controller);
    
    convo.ask('What is your name?', async(response, convo, bot, full_message) => {
        await bot.say('Oh your name is ' + response);
       }, {key: 'name'});
       
    // ask a question, evaluate answer, take conditional action based on response
    convo.ask('Do you want to eat a taco?', [
    {
        pattern: 'yes',
        type: 'string',
        handler: async(response_text, convo, bot, full_message) => {
            return await convo.gotoThread('yes_taco');
        }
    },
    {
        pattern: 'no',
        type: 'string',
        handler: async(response_text, convo, bot, full_message) => {
            return await convo.gotoThread('no_taco');
        }
        },
        {
            default: true,
            handler: async(response_text, convo, bot, full_message) => {
                await bot.say('I do not understand your response!');
                // start over!
                return await convo.repeat();
            }
        }
    ], {key: 'tacos'});

    controller.addDialog(convo);

    controller.hears(

        'fsi',
    
        ['message'],
    
        async (bot, message) => {
          await bot.beginDialog('hmm');
        }
      
    );

}