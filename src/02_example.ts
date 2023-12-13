import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
  } from "langchain/prompts";
  import { LLMChain } from "langchain/chains";
  import { ChatOpenAI } from "langchain/chat_models/openai";
  

  /** 
   * Primera fase
  */
  const chat = new ChatOpenAI({ temperature: 0 });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "Tu eres un asistente que ayuda a traducir texto de {input_language} a {output_language}."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);

  /**
   * Segunda Fase
   */
  
  const chainB = new LLMChain({
    prompt: chatPrompt,
    llm: chat,
  });
  
  /**
   * Ejecuccion
   */
  const resB = await chainB.call({
    input_language: "Spanish",
    output_language: "French",
    text: "Muchas gracias",
  });
  console.log({ resB });
  // { resB: { text: "J'adore la programmation." } }