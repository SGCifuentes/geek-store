import gql from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    inStock: Boolean!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!
      description: String
      price: Float!
      inStock: Boolean!
    ): Product!
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      inStock: Boolean
    ): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;
