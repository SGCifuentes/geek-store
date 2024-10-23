import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  inStock: boolean;
}

interface QueryArgs {
  id: string;
}

interface MutationArgs extends Partial<Product> {
  id?: string;
}

export const resolvers = {
  Query: {
    products: async (): Promise<Product[]> => {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const products = await db.collection('products').find({}).toArray();
      return products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        inStock: product.inStock
      }));
    },
    product: async (_: unknown, { id }: QueryArgs): Promise<Product | null> => {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const product = await db
        .collection('products')
        .findOne({ _id: new ObjectId(id) });
      if (!product) return null;
      return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        inStock: product.inStock
      };
    }
  },
  Mutation: {
    addProduct: async (
      _: unknown,
      { name = '', description, price = 0, inStock = false }: MutationArgs
    ): Promise<Product> => {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const result = await db
        .collection('products')
        .insertOne({ name, description, price, inStock });
      return {
        id: result.insertedId.toString(),
        name,
        description,
        price,
        inStock
      };
    },
    updateProduct: async (
      _: unknown,
      { id, name, description, price, inStock }: MutationArgs
    ): Promise<Product | null> => {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const result = await db
        .collection('products')
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { name, description, price, inStock } },
          { returnDocument: 'after' }
        );
      if (!result?.value) return null;
      return {
        id: result._id.toString(),
        name: result.value.name,
        description: result.value.description,
        price: result.value.price,
        inStock: result.value.inStock
      };
    },
    deleteProduct: async (_: unknown, { id }: QueryArgs): Promise<boolean> => {
      const client = await clientPromise;
      const db = client.db('ecommerce');
      const result = await db
        .collection('products')
        .deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    }
  }
};
