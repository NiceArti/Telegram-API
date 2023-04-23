export interface IMessage
{
    id?: number | string,
    text?: string,
    struct?: any,
    input?: string,
}

export const MSG_SENDER = new Map<number|string, IMessage>();