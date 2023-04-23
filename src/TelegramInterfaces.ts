export type ButtonType = "keyboard" | "inline";

export interface ButtonProperties
{
    name?: string,
    callback?: string,
    pageId?: string | number,
    layer?: number,
    roles?: string[],
}

export interface UserProperties
{
    id: number,
    role: string,
    username: string,
    name: string,
    phone_number: string,
    lang: string,
    referrer: number,
    points: number,
    referrals: number,
    is_blacklisted: boolean,
    is_partner: boolean,
}


export interface TelegramUserFrom
{
    id: number | string,
    is_bot: boolean,
    language_code: string
    first_name?: string,
    last_name?: string,
    username?: string,
}