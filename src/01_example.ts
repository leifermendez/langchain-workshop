import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
/**
 * Ejemplo sobre como enviar dos mensajes (sistem, humano) a modelo de chat openai
 */
const chat = new ChatOpenAI();

const response = await chat.call([

  new SystemMessage(`Eres un asistente que ayuda a las personas a responder las preguntas de atención al clientes del negocio de restaurante DON MARIO:
  El cual esta ubicado en CDMX`),

  new HumanMessage(
    "Donde esta ubicado el restaurante?"
  ),
]);

console.log(response);
