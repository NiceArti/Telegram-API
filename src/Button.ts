import TelegramBot from "node-telegram-bot-api";

interface IButtonRequests {
    request_contact?: boolean,
    request_location?: boolean,
}

interface IButton
{
    click(fn: (msg: any) => void);
}

abstract class Button implements IButton
{
    protected _telegram: TelegramBot;
    protected _name: string;

    constructor(telegram: TelegramBot, name: string = 'Button')
    {
        this._telegram = telegram;
        this._name = name;
    }

    public click(fn: (msg: any) => void){}
}

export class KeyboardButton extends Button
{
    private _buttonRequests?: IButtonRequests;
    constructor(telegram: TelegramBot, name: string = 'Button', buttonRequests?: IButtonRequests)
    {
        super(telegram, name);
        this._buttonRequests = buttonRequests;
    }

    public click(fn: (msg: any) => any)
    {
        this._telegram.on('text', async (msg: any) => 
        {
            const text = msg.text;
            if(text === this._name) 
            {
                return await fn(msg);
                
            }
        })
    }
}

export class InlineButton extends Button
{
    private _callback: string
    constructor(telegram: TelegramBot, name: string = 'Button', callback: string = name)
    {
        super(telegram, name);
        this._callback = callback;
    }

    public click(fn: (msg: any) => any)
    {
        this._telegram.on('callback_query', async (msg: any) => 
        { 
            const data = msg.data;
            if(data === this._callback) 
            {
                await fn(msg);
            }
        })
    }
}