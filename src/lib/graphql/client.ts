import { ApolloClient, split, InMemoryCache, HttpLink } from "@apollo/client/core"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { onError } from "@apollo/client/link/error"

const graphqlEndpoint = "https://renewing-mole-78.hasura.app/v1/graphql";
const wsEndpoint = graphqlEndpoint.replace("https://", "wss://");


// Create an http link:
const httpLink = new HttpLink({
  uri: graphqlEndpoint,
})

// Create a WebSocket link:
const wsLink = typeof window !== "undefined" ? new WebSocketLink({
  uri: wsEndpoint,
  options: {
    reconnect: true,
    lazy: true,
    timeout: 30000,
    inactivityTimeout: 30000,
  },
}) : null

const errorLink = onError((error) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("graphql error:", error)
  }
})

export const client = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
  link: errorLink.concat(
    wsLink ?
      split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          )
        },
        wsLink,
        httpLink
      ) : httpLink
  ),
});

