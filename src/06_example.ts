import {
  SupabaseFilterRPCCall,
  SupabaseVectorStore,
} from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { JSONLoader } from "langchain/document_loaders";
import {join} from 'path'

// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export const run = async () => {
  const client = createClient(url, privateKey);

  const embeddings = new OpenAIEmbeddings();

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  // const loader = new JSONLoader(join(process.cwd(),'data','tour.json'));

  // const docs = await loader.load();

  // // Also supports an additional {ids: []} parameter for upsertion
  // await store.addDocuments(docs);

  const resultB = await store.similaritySearch("QUe tour tienes por asia", 2);
  console.log(resultB)
};
run()