// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, TurnContext, } from 'botbuilder';
import { url } from 'inspector';

export class MyBot {
    

    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    public onTurn = async (turnContext: TurnContext) => {
        const reply = { type: ActivityTypes.Message,
                        attachments: [], 
                        text: ''};
        reply.attachments = [this.getInternalAttachment(await this.fetchData())];
        reply.text = '(inlove)';
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === ActivityTypes.Message) {
            
            if(turnContext.activity.text == "girl") {
                await turnContext.sendActivity(reply);
            }

        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }

    private async fetchData() {
        let result
        let url = 'https://sleepy-plains-71146.herokuapp.com/images/?fbclid=IwAR1mVVSdY4c41OPOOO01wJuHqZSrsgRS1sW83QOZmN5tJr8YCUHgJz2EVBI'
        const response = await fetch(url)
        await response.text().then((resolve) => result = JSON.parse(resolve))
        return result
    }

    private getInternalAttachment(response) {
        return {
            name: response.response.Title,
            contentType: 'image/' + response.response.Filetype,
            contentUrl: response.response.URL
        }
    }
}
