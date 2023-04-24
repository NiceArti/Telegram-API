"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = require("node-telegram-bot-api");
var Button_1 = require("./Button");
var TelegramExecuteManager_1 = require("./TelegramExecuteManager");
var TelegramUser_1 = require("./TelegramUser");
var Telegram = /** @class */ (function () {
    function Telegram() {
    }
    Telegram.launchBot = function (token) {
        this._bot = new node_telegram_bot_api_1.default(token, { polling: true });
    };
    Telegram.user = function (id) {
        return new TelegramUser_1.TelegramUser(this._bot, id);
    };
    Telegram.command = function (name, description) {
        this._commands.push({ command: name, description: description });
        return new TelegramExecuteManager_1.Command(this._bot, name);
    };
    Telegram.once = function (event, fn) {
        var _this = this;
        this._bot.once(event, function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fn(msg)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Telegram.callback = function () {
        var datas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            datas[_i] = arguments[_i];
        }
        return new TelegramExecuteManager_1.Callback(this._bot, datas);
    };
    Telegram.processText = function (fn) {
        var _this = this;
        this._bot.on('text', function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fn(msg);
                return [2 /*return*/];
            });
        }); });
    };
    Telegram.initializeCommands = function () {
        this._bot.setMyCommands(this._commands);
    };
    Telegram.getInlineKeyboardButtons = function (page) {
        return {
            reply_markup: JSON.stringify({
                inline_keyboard: this._inlineKeyboardButtons[page]
            })
        };
    };
    Telegram.getKeyboardButtons = function (page, one_time_keyboard) {
        return {
            reply_markup: JSON.stringify({
                one_time_keyboard: one_time_keyboard,
                keyboard: this._keyboardButtons[page]
            })
        };
    };
    Telegram.textLine = function (char) {
        return __awaiter(this, void 0, void 0, function () {
            var line;
            return __generator(this, function (_a) {
                line = char.repeat(30);
                return [2 /*return*/, line];
            });
        });
    };
    // button properties
    Telegram.button = function (type, properties) {
        // const uniqueName = (arr: any) => 
        // {
        //     // find on everywhere
        //     let counter = 0;
        //     for(let i = 0; i < arr.length; i++)
        //     {
        //         for(let j = 0; j < arr[i].length; j++)
        //         {
        //             for(let k = 0; k < arr[i][j].length; k++)
        //             {
        //                 if(arr[i][j].includes(name))
        //                 {
        //                     ++counter;
        //                     const newName = name.split(' ', 2)
        //                     name = newName[0] + ` (${counter})`
        //                 }
        //             }
        //         }
        //     }
        // }
        if (type === void 0) { type = 'inline'; }
        if (properties === undefined)
            properties = {};
        if (properties.name === undefined)
            properties.name = 'Button';
        if (properties.callback === undefined)
            properties.callback = properties.name;
        if (properties.pageId === undefined)
            properties.pageId = 0;
        if (properties.layer === undefined)
            properties.layer = 0;
        if (type === 'keyboard') {
            var button = new Button_1.KeyboardButton(this._bot, properties.name);
            console.log(button);
            this._addKeyboardButtons(properties.pageId, properties.layer, properties.name, properties.request_contact, properties.request_location);
            return button;
        }
        else if (type === 'inline') {
            var button = new Button_1.InlineButton(this._bot, properties.name, properties.callback);
            this._addInlineKeyboardButtons(properties.pageId, properties.layer, properties.name, properties.callback);
            return button;
        }
        throw "Telegram: There is no such a button type '".concat(type, "'");
    };
    Telegram.isInlineButton = function (id) {
        var found = this._inlinePageId.find(function (element) { return element === id; });
        return found === undefined ? false : true;
    };
    Telegram.isKeyboardButton = function (id) {
        var found = this._keyboardPageId.find(function (element) { return element === id; });
        return found === undefined ? false : true;
    };
    Telegram.getKeyboardButtonPageById = function (pageId, one_time_keyboard) {
        var page = this._keyboardPageId.indexOf(pageId);
        return {
            reply_markup: JSON.stringify({
                one_time_keyboard: one_time_keyboard,
                keyboard: this._keyboardButtons[page]
            })
        };
    };
    Telegram.getInlineButtonPageById = function (pageId) {
        var page = this._inlinePageId.indexOf(pageId);
        return {
            reply_markup: JSON.stringify({
                inline_keyboard: this._inlineKeyboardButtons[page]
            })
        };
    };
    Telegram._addInlineKeyboardButtons = function (pageId, layer, name, callback_data, request_contact, request_location) {
        if (layer === void 0) { layer = 0; }
        if (name === void 0) { name = 'Button'; }
        if (callback_data === void 0) { callback_data = 'Call Button'; }
        if (this.isInlineButton(pageId) === false)
            this._inlinePageId.push(pageId);
        var pageNumber = this._inlinePageId.indexOf(pageId);
        // создаём новую страницу, если значение больше предыдущего
        if (this._inlineKeyboardButtons.length - 1 < pageNumber) {
            this._inlineKeyboardButtons[pageNumber] = new Array(new Array());
        }
        // Добавляем на новый слой если значение больше существующего
        var currentLayer = this._inlineKeyboardButtons[pageNumber].length - 1;
        if (layer > currentLayer) {
            layer = currentLayer + 1;
        }
        // добавляем новый слой, если значение больше предыдущего
        if (this._inlineKeyboardButtons[pageNumber].length - 1 < layer) {
            this._inlineKeyboardButtons[pageNumber][layer] = new Array();
        }
        this._inlineKeyboardButtons[pageNumber][layer].push({ text: name, callback_data: callback_data, request_contact: request_contact, request_location: request_location });
    };
    Telegram._addKeyboardButtons = function (pageId, layer, name, request_contact, request_location) {
        if (layer === void 0) { layer = 0; }
        if (name === void 0) { name = 'Button'; }
        if (this.isKeyboardButton(pageId) === false)
            this._keyboardPageId.push(pageId);
        var pageNumber = this._keyboardPageId.indexOf(pageId);
        // создаём новую страницу, если значение больше предыдущего
        if (this._keyboardButtons.length - 1 < pageNumber) {
            this._keyboardButtons[pageNumber] = new Array(new Array());
        }
        // Добавляем на новый слой, если значение больше существующего
        var currentLayer = this._keyboardButtons[pageNumber].length - 1;
        if (layer > currentLayer) {
            layer = currentLayer + 1;
        }
        // добавляем новый слой, если значение больше предыдущего
        if (this._keyboardButtons[pageNumber].length - 1 < layer) {
            this._keyboardButtons[pageNumber][layer] = new Array();
        }
        this._keyboardButtons[pageNumber][layer].push({ text: name, request_contact: request_contact, request_location: request_location });
    };
    Telegram._inlinePageId = new Array();
    Telegram._keyboardPageId = new Array();
    Telegram._commands = new Array();
    Telegram._inlineKeyboardButtons = new Array(new Array(new Array()));
    Telegram._keyboardButtons = new Array(new Array(new Array()));
    return Telegram;
}());
exports.default = Telegram;
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
