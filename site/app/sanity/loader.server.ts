import { queryStore } from "./loader";
import { client } from "./client";

export const { loadQuery } = queryStore;

queryStore.setServerClient(client);