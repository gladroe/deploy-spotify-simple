import { MongoClient } from "mongodb";

const URI =
	"mongodb+srv://herbertfags:pMYHGJcZO4PWqRqi@cluster0.zse1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotify");
