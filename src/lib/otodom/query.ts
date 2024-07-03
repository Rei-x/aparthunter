import { getSdk } from "@/gql/sdk.generated";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://www.otodom.pl/api/query");

export const otodomClient = getSdk(
  (doc, vars) =>
    client.request(doc, vars as [never], {
      "User-agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
    }) as never,
);
