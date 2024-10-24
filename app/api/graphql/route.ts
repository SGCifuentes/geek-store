import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

let apolloServer: ApolloServer | null = null;

const getApolloServer = () => {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers
    });
  }
  return apolloServer;
};

const handler = startServerAndCreateNextHandler<NextRequest>(getApolloServer(), {
  context: async (req) => ({ req })
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
