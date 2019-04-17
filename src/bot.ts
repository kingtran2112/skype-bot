// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, TurnContext, } from 'botbuilder';

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
        reply.attachments = [this.getInternalAttachment()];
        reply.text = '(inlove)';
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === ActivityTypes.Message) {
            if(turnContext.activity.text == "girl") {
                await turnContext.sendActivity(reply);
            }
            // await turnContext.sendActivity(`You said '${ turnContext.activity.text }'`);
        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }

    private getInternalAttachment() {
        return {
            name: 'imageName.png',
            contentType: 'image/png',
            contentUrl: 'https://danongonline.com.vn/wp-content/uploads/2018/02/anh-girl-xinh-2.jpg'
        }
    }
}
