import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    uri: `${process.env.URL}/api/graphql`,
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
