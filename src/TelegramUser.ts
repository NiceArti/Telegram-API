import TelegramBot from "node-telegram-bot-api";

export interface ITelegramUser
{
    message(msg: string): Promise<void>;
    messageParseHtml(msg: string): Promise<void>;
    messageMarkdown(msg: string): Promise<void>;
    messageWithData(msg: string, data: any): Promise<void>;
}

export class TelegramUser implements ITelegramUser
{
    private _telegram: TelegramBot;
    private _id: number | string;
    
    constructor(telegram: any, id: string | number)
    {
        this._telegram = telegram;
        this._id = id;
    }

    public async message(msg: string) { this._message(msg); }

    public async messageParseHtml(msg: string) { this._message(msg, {parse_mode: 'HTML'});}

    public async messageMarkdown(msg: string) { this._message(msg, {parse_mode: 'Markdown'});}

    public async messageWithData(msg: string, data: any, isMarkdown?: boolean) 
    {
        let executorParam: ITelegramMessage | any;
        if(isMarkdown === true)
        {
            executorParam = {
                reply_markup: data.reply_markup,
                parse_mode: 'HTML',
            };
        }
        else
        {
            executorParam = data;
        }
        
        this._message(msg, executorParam);
    }

    private async _message(msg: string, executorParam?: any)
    {
        try{ await this._telegram.sendMessage(this._id, msg, executorParam); }
        catch(err) { return `${err}\nUser: ${this._id} does not exist`; }
    }
}

interface ITelegramMessage
{
    reply_markup: any,
    parse_mode?: string,
    chat_id?: number,
    text?: string
}