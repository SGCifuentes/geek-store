import Product from '@/components/Product';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
// import { getClient } from '@/lib/apollo/client';
interface product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      image
    }
  }
`;
const httpLink = new HttpLink({
  uri: `${process.env.URL}/api/graphql`,
  fetchOptions: {
    timeout: 60000 // 60 segundos de timeout
  }
});

export default async function StorePage() {
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
  // const client = getClient();
  const { data } = await client.query({ query: GET_PRODUCTS });

  const products: product[] = data.products;

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Customers also purchased
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
