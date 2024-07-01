import { getSdk } from "@/gql/sdk";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://www.otodom.pl/api/query");

export const otodomClient = getSdk(
  (doc, vars) => client.request(doc, vars as [never]) as never,
);
