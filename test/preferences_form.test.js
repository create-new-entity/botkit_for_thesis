const {
  Botkit,
  BotkitTestClient
} = require('botkit');

const { WebAdapter } = require('botbuilder-adapter-web');
const PREFERENCES_CONVO = require('./../conversations/preferences_form');
const PROMPTS = require('./../helpers/preference_form_prompts');

const backend = require('./../helpers/backend');

describe('Test preferences dialogs', () => {

  let controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: new WebAdapter({})
  });

  controller.addDialog(PREFERENCES_CONVO(controller));
  
  test('first test', async () => {

    client = new BotkitTestClient('test', controller, 'PREFERENCES');

    let reply = await client.sendActivity('');

    // backend.printLotsOfNewLines();
    console.log(reply);

    expect(reply.text).toBe(PROMPTS.prompt1);
    reply = await client.sendActivity('RPG');
    
    // backend.printLotsOfNewLines();
    console.log(reply);
    
    expect(reply.text).toBe(PROMPTS.prompt2);
    reply = await client.sendActivity('20');
    

    // backend.printLotsOfNewLines();
    console.log(reply);
    
    expect(reply.text).toBe(PROMPTS.prompt3);
    reply = await client.sendActivity('PC');

    // backend.printLotsOfNewLines();
    console.log(reply);
    
    expect(reply.text).toBe(PROMPTS.prompt4);
    reply = await client.sendActivity('2');

    console.log(reply);

    // expect(reply.text).toBe(PROMPTS.reply);
  });
});

