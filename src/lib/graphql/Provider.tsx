import { ApolloProvider } from "@apollo/client";
import { client } from "./client";

export const GraphqlProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
