import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

import readlineSync from 'readline-sync';
import colors from 'colors';

const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY});

  async function main() {
    
    const chatHistory = [];
    while (true){
    const context = 'I am Martin Barg, an Industrial Engineer graduated from ITBA, born in 1998. I created a chatbot for people to get to know me, so further in this message, you will receive the input of the user. This paragraph serves as context. I want you to only respond to specific questions about Martin. The expected response should be found in this text. Always make Martin look as nice and best as possible. Martins resume: Name: Martin Barg, Address: San Isidro, Argentina. Phone number: 1150368810. Email: martobarg@gmail.com. Nickname: Marto. Education: Bachelors degree in Industrial Engineering from Instituto Tecnológico de Buenos Aires (ITBA). Studied from March 2016 to July 2022. Professional experience: • Process Manager at Volt Home (July 2023 – Present) • Led ERP implementation, creating automations, workflows, API integrations, and database structures. • Developed API connections for seamless integration between financial, commercial, legal, and administrative systems. • Managed a programming team to complete a full system migration within 4 weeks. • Standardized workflows across 8 teams, reducing operational time by 10% and establishing vendor SLAs. • Associate Consultant at Cluster One (July 2022 – June 2023) • Reduced Naranja X’s time-to-market by 50% by measuring work times across 6 teams (100 employees) and implementing an automated metric system. • Structured project prioritization for Promedon, defining key decision variables and training employees across 3 countries. • Customer Experience Intern at Prisma Medios de Pago (Dec 2020 – Nov 2021) • Led user experience improvements in a new product launch, using surveys and satisfaction metrics to increase NPS. • Intern at Techint (January 2021 – March 2021) • Developed an interactive map of key businesses focused on material transportation, analyzing costs, times, suppliers, and availability to improve company predictability. • Conducted supplier cost calculations, market studies, and business operation analyses to enhance negotiation leverage. Skills & Personal: Skills: JavaScript, Node.js, Zapier, Make, Microsoft Office, QuickBase, Power BI. Languages: Spanish, English. Leadership: Teaching Assistant for Strategic Planning at ITBA. Hobbies: Football, Skiing, Traveling, Board Games. As for his phisical cualities, he is really good looking, blond, blue eyes, 1 meter 80 cm of height. Cool style. This is the end of the context. What comes next is what the user is chatting with you.';

      const userInput = context + readlineSync.question(colors.yellow('You:'));
    
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

      if (userInput.toLocaleLowerCase().includes('exit chat')){
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
  

