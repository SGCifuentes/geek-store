'use client';

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache
} from '@apollo/experimental-nextjs-app-support';

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: `/api/graphql`
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
