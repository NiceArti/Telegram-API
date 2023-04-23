import Telegram from "./src/Telegram";

// Dudeka Test Bot API
const TELEGRAM_API: string = '';

// bot launcher
Telegram.launchBot(TELEGRAM_API);
const getNum1 = Telegram.button('keyboard', {pageId: "Main", name: "Phone Number Get", layer: 0});



getNum1.click(async (msg: any) =>
{
    const id = msg.from.id;
    const but = await Telegram.button('keyboard', {pageId: "Phone Number", name: "Phone Number", request_contact: true});
    await Telegram.user(id).messageWithData("hi", await Telegram.getKeyboardButtonPageById("Phone Number", true));
    
    but.click(async (msg: any) =>
    {
        await Telegram.user(id).message(`Phone number: ${msg.contact.phone_number}`);
    });
    

    // await Telegram.once('contact', async (msg: any) => 
    // {
        
    // });
});

async function main()
{
    const userId = 1000000000;
    await Telegram.user(userId).messageWithData("hi", await Telegram.getInlineButtonPageById("Main"));
} 

main();
