import gql from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    inStock: Boolean!
    image: String!
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
      image: String!
    ): Product!
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      inStock: Boolean
      image: String
    ): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;
