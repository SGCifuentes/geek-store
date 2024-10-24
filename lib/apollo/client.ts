import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient
} from '@apollo/experimental-nextjs-app-support';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${process.env.URL}/api/graphql`
  });
});
