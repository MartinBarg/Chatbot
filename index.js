import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

import readlineSync from 'readline-sync';
import colors from 'colors';

const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY});

  async function main() {
    
    const chatHistory = [];
    while (true){
    const userInput = readlineSync.question(colors.yellow('You:'));
    
    try{
      const messages = chatHistory.map(([role, content]) => ({role, content}));

      messages.push({role: 'user', content: userInput});

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: 
          messages,
      });
      
      const botVoice = completion.choices[0].message.content;

      if (userInput.toLocaleLowerCase() === 'exit'){
        console.log(colors.green('Bot: ') + botVoice);
        return;
      };

      console.log(colors.green('Bot: ') + botVoice);

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', botVoice]);
    } catch (error){
      console.error(colors.red(error))
    }
  }
    
  };

  main();
  

