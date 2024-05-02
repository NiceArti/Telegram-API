import TelegramBot from 'node-telegram-bot-api';
import {KeyboardButton, InlineButton} from './Button';
import {Callback, Command} from './TelegramExecuteManager';
import {TelegramUser} from './TelegramUser';

interface ButtonProperties
{
    name?: string,
    callback?: string,
    pageId?: string | number,
    layer?: number,
    roles?: string[],
    one_time_keyboard?: boolean,
    request_contact?: boolean,
    request_location?: boolean,
    url?: string,
}

type KeyboardType = "keyboard" | "inline";


export default class Telegram 
{
    private static _inlinePageId = new Array<string | number>();
    private static _keyboardPageId = new Array<string | number>();

    private static _commands: any[] = new Array();
    private static _inlineKeyboardButtons: any[][][] = new Array(new Array(new Array()));
    private static _keyboardButtons: any[][][] = new Array(new Array(new Array()));
    private static _bot: TelegramBot;


    public static launchBot(token: string)
    {
        this._bot = new TelegramBot(token, { polling: true })
    }

    public static user(id: number | string)
    {
        return new TelegramUser(this._bot, id)
    }

    public static command(name: string, description?: string)
    {
        this._commands.push({command: name, description: description})
        return new Command(this._bot, name)
    }

    public static once(event: TelegramBot.MessageType, fn: (msg: any) => void)
    {
        this._bot.once(event, async (msg: any) => 
        {
            await fn(msg);
        });
    }

    public static callback(...datas: string[])
    {
        return new Callback(this._bot, datas)
    }

    public static processText(fn: (msg: any) => void)
    {
        this._bot.on('text', async (msg: any) => 
        {
            fn(msg);
        })
    }

    public static initializeCommands()
    {
        this._bot.setMyCommands(this._commands)
    }

    public static getInlineKeyboardButtons(page: number)
    {
        return {
            reply_markup: JSON.stringify({
                inline_keyboard: this._inlineKeyboardButtons[page]
            })
        };
    }

    public static getKeyboardButtons(page: number, one_time_keyboard?: boolean)
    {
        return {
            reply_markup: JSON.stringify({
                one_time_keyboard: one_time_keyboard,
                keyboard: this._keyboardButtons[page]
            })
        }
    }

    public static async textLine(char: string) 
    {
        let line = char.repeat(30)
        return line
    }




    // button properties
    public static button(type: KeyboardType = 'inline', properties?: ButtonProperties)
    {
        if(properties === undefined) properties = {};
        if(properties.name === undefined) properties.name = 'Button';
        if(properties.callback === undefined) properties.callback = properties.name;
        if(properties.pageId === undefined) properties.pageId = 0;
        if(properties.layer === undefined) properties.layer = 0;
        
        let web_app = undefined;
        if(properties.url) {
            web_app = {
                url: properties.url
            }
        }

        if(type === 'keyboard')
        {
            const button: KeyboardButton = new KeyboardButton(this._bot, properties.name);
            this._addKeyboardButtons(properties.pageId, properties.layer, properties.name, properties.request_contact, properties.request_location, web_app);
            return button;
        }
        else if(type === 'inline')
        {
            const button: InlineButton = new InlineButton(this._bot, properties.name, properties.callback);
            this._addInlineKeyboardButtons(properties.pageId, properties.layer, properties.name, properties.callback);
            return button;
        }

        throw `Telegram: There is no such a button type '${type}'`;
    }

    public static isInlineButton(id: string | number)
    {
        const found = this._inlinePageId.find(element => element === id);
        return found === undefined ? false : true;
    }

    public static isKeyboardButton(id: string | number)
    {
        const found = this._keyboardPageId.find(element => element === id);
        return found === undefined ? false : true;
    }

    public static getKeyboardButtonPageById(pageId: string | number, one_time_keyboard?: boolean)
    {
        const page = this._keyboardPageId.indexOf(pageId);
        return {
            reply_markup: JSON.stringify({
                one_time_keyboard: one_time_keyboard,
                keyboard: this._keyboardButtons[page],
            })
        };
    }

    public static getInlineButtonPageById(pageId: string | number)
    {
        const page = this._inlinePageId.indexOf(pageId);
        return {
            reply_markup: JSON.stringify(
            {
                inline_keyboard: this._inlineKeyboardButtons[page]
            })
        }
    }

    private static _addInlineKeyboardButtons(pageId: string | number, layer: number = 0, name: string = 'Button', callback_data: string = 'Call Button', request_contact?: boolean, request_location?: boolean)
    {
        if(this.isInlineButton(pageId) === false)
            this._inlinePageId.push(pageId);

        const pageNumber = this._inlinePageId.indexOf(pageId);


        // создаём новую страницу, если значение больше предыдущего
        if(this._inlineKeyboardButtons.length - 1 < pageNumber)
        {
            this._inlineKeyboardButtons[pageNumber] = new Array(new Array());
        }


        // Добавляем на новый слой если значение больше существующего
        const currentLayer = this._inlineKeyboardButtons[pageNumber].length - 1;
        if(layer > currentLayer)
        {
            layer = currentLayer + 1;
        }

        // добавляем новый слой, если значение больше предыдущего
        if(this._inlineKeyboardButtons[pageNumber].length - 1 < layer)
        {
            this._inlineKeyboardButtons[pageNumber][layer] = new Array();
        }

        this._inlineKeyboardButtons[pageNumber][layer].push({text: name, callback_data: callback_data, request_contact: request_contact, request_location: request_location});
    }

    private static _addKeyboardButtons(pageId: string | number, layer: number = 0, name: string = 'Button', request_contact?: boolean, request_location?: boolean, web_app?: any)
    {
        if(this.isKeyboardButton(pageId) === false)
            this._keyboardPageId.push(pageId);

        const pageNumber = this._keyboardPageId.indexOf(pageId);

        // создаём новую страницу, если значение больше предыдущего
        if(this._keyboardButtons.length - 1 < pageNumber)
        {
            this._keyboardButtons[pageNumber] = new Array(new Array());
        }

        // Добавляем на новый слой, если значение больше существующего
        const currentLayer = this._keyboardButtons[pageNumber].length - 1;
        if(layer > currentLayer)
        {
            layer = currentLayer + 1;
        }

        // добавляем новый слой, если значение больше предыдущего
        if(this._keyboardButtons[pageNumber].length - 1 < layer)
        {
            this._keyboardButtons[pageNumber][layer] = new Array();
        }

        this._keyboardButtons[pageNumber][layer].push({text: name, request_contact: request_contact, request_location: request_location, web_app});
    }
}


// bot.onText(/^\/place_order/, function (msg) {
//     var option = {
//         "parse_mode": "Markdown",
//         "reply_markup": {
//             "one_time_keyboard": true,
//             "keyboard": [[{
//                 text: "Phone Number",
//                 request_contact: true
//             }]]
//         }
//     };


    // bot.sendMessage(msg.chat.id, "How can we contact you?", option).then(() => {
    //     bot.once("contact", (msg) => 
    //     {
    //         var option = {
    //             "parse_mode": "Markdown",
    //             "reply_markup": {
    //                 "one_time_keyboard": true,
    //                 "keyboard": [[{
    //                     text: "My location",
    //                     request_location: true
    //                 }]]
    //             }
    //         };
    //         bot.sendMessage(msg.chat.id, `Thank you ${msg.contact.first_name} with phone ${msg.contact.phone_number}! And where are you`), option)
    //         .then(() => {
    //             bot.once("location",(msg)=>{
    //                 bot.sendMessage(msg.chat.id, "We will deliver your order to " + [msg.location.longitude,msg.location.latitude].join(";"));
    //             })
    //         })
    //     })
    // });

// });