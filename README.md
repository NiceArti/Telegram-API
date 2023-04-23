# Telegram API - TypeScript

## How to start
1) Install lib via github or npm
 - Import lib via `import Telegram from "./src/Telegram";`
 - To set up your <b>Telegram API key</b> use `Telegram.launchBot(TELEGRAM_API);` where TELEGRAM_API is your bot token

2) How to send messages?
 - For sending message to specific user you should know his/her user_id
 ```typescript
    const user_id = 100000;
    await Telegram.user(user_id).message(`Hello!`);
 ```
3) How to use buttons?
 3.1) Keyboard buttons
```typescript
    const button = Telegram.button('keyboard', {pageId: "Main", name: "Phone Number Get", layer: 0});
```
    ## Attributes
    - pageId - (string or number): used to create specific space where the button is located
    - layer - (number): row on the page where the button is located
    - name - (string): button name

    To force the button to process events, call the following code
```typescript
    const button = Telegram.button('keyboard', {pageId: "Main", name: "Phone Number Get", layer: 0});
    
    button.click(async (msg: any) =>
    {
        const id = msg.from.id;
        const name = msg.from.name;

        // On event open another button page using 'messageWithData'
        // Second argument 'true' is 'one_time_keyboard'
        // If it's true after click event keyboard will close
        await Telegram.user(id).messageWithData("hi", await Telegram.getKeyboardButtonPageById("Phone Number", true));
    });
```
 3.2) Inline buttons
```typescript
    const button = Telegram.button('keyboard', {pageId: "Main", name: "Phone Number Get", layer: 0});
```
    ## Attributes
    - pageId - (string or number): used to create specific space where the button is located
    - layer - (number): row on the page where the button is located
    - name - (string): button name

    To force the button to process events, call the following code
```typescript
    const button = Telegram.button('inline', {pageId: "Main", callback: "Main", name: "Phone Number Get", layer: 0});
    
    button.click(async (msg: any) =>
    {
        const id = msg.from.id;
        const name = msg.from.name;

        await Telegram.user(userId).messageWithData("hi", await Telegram.getInlineButtonPageById("Main"));
    });
```