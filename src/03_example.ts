import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {join} from 'path'

const model = new OpenAI({temperature:0, modelName:'gpt-4-0613'});

const VECTOR_STORE_PATH = join(process.cwd(),'vectorstore')
const loadedVectorStore = await HNSWLib.load(VECTOR_STORE_PATH, new OpenAIEmbeddings())

const vectorStoreRetriever = loadedVectorStore.asRetriever()

const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

const res = await chain.call({
  query: "Que lugares visito Antonio",
});
console.log({ res });
