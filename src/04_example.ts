import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import {join} from 'path'

const PATH_DATA = join(process.cwd(),'data','demo_antonio_islandia.txt')
const VECTOR_STORE_PATH = join(process.cwd(),'vectorstore')

const text = fs.readFileSync(PATH_DATA, "utf8");

const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

await vectorStore.save(VECTOR_STORE_PATH);

