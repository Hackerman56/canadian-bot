const TelegramApi= require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token= '5674076043:AAGh1bbePjAQT5QFwlLvSx6-KTh5A2tJUQA'
const bot=new TelegramApi(token,{polling: true})
const chats = {}



bot.setMyCommands(  [
   {command: '/start', description: 'Начальное приветствие'},
   {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Угадай цифру'},
    ])


bot.on('message',
    async msg => {
       const text = msg.text;
       const chatId = msg.chat.id;
       if (text === '/start') {
         await bot.sendMessage(chatId, `Добро пожаловать на мой канал, сладкий енотик!`);
       }
       if (text === '/info') {
         await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
       }
})

const startGame = async (chatId) => {
    await bot.sendMessage(chatId,`Сейчас я загадаю цифру от 0 до 9,а ты должен ее отгадать` )
    const randomNumber = Math.floor(Math.random() * 10)
    chats [chatId] = randomNumber;
    await bot.sendMessage(chatId, `Отгадывай`, gameOptions);

}

const start = () => { bot.setMyCommands(  [
       {command: '/start', description: 'Начальное приветствие'},
       {command: '/info', description: 'Получить информацию о пользователе'},
       {command: '/game', description: 'Угадай цифру'},
    ])

   bot.on('message',
       async msg => {
          const text = msg.text;
          const chatId = msg.chat.id;
          if (text === '/start') {
             return  bot.sendMessage(chatId, `Добро пожаловать на мой канал, сладкий енотик!`);
          }
          if (text === '/info') {
             return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
          }
          if (text === '/game') {
             return startGame(chatId);
          }

          return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз`)
       })
   bot.on('callback_query',  async msg =>{
     const data = msg.data;
     const chatId = msg.message.chat.id;
     if (data === '/again') {
       return startGame(chatId)
     }

     if(data === chats [chatId]) {
         return bot.sendMessage(chatId, `Поздравляю, ты угадал цифру ${chats [chatId]}`,againOptions)
     } else {
         return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats [chatId]}`,againOptions)
     }

     bot.sendMessage(chatId,`You choose number ${data}`)
      console.log(msg)


       })

}

start()
