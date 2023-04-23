import TelegramBot from "node-telegram-bot-api"

abstract class TelegramExecuteManager<T>
{
    protected _telegram: TelegramBot
    protected _command: T

    constructor(telegram: any, command: T)
    {
        this._telegram = telegram
        this._command = command
    }

    public execute(fn: (msg: any) => void){}
}

export class Command extends TelegramExecuteManager<RegExp>
{
    constructor(telegram: any, command: string)
    {
        super(telegram, new RegExp(command))
    }

    public execute(fn: (msg: any) => any)
    {
        this._telegram.onText(this._command, async (msg: any) => fn(msg))
    }
}

export class Callback extends TelegramExecuteManager<string[]>
{
    constructor(telegram: any, commands: string[])
    {
        super(telegram, commands)
    }

    public execute(fn: (msg: any) => void)
    {
        this._telegram.on('callback_query', async (msg: any) => 
        {
            const data = msg.data
            if(this._command.length === 1)
            {
                fn(msg)
                return
            }
            for (let i = 0; i < this._command.length; i++)
            {
                if(this._command[i] === data) 
                {
                    fn(msg)
                    break
                }
            }
        })
    }
}