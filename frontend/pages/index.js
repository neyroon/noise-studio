import { useQuery } from "@apollo/client";
import Head from "next/head";
import ProductsList from "../components/ProductsList";
import { getProductsQuery } from "../utils/api";
import { initializeApollo } from "../utils/apolloClient";

const HomePage = () => {
  const { loading, data, error } = useQuery(getProductsQuery, {
    variables: { sort: "created_at:asc", limit: 12 },
  });
  return (
    <div>
      <Head>
        <title>SoundToCar</title>
      </Head>
      <h1 className="font-bold text-center text-xl mb-6">Новинки</h1>
      <ProductsList products={data.products} needFilters={false} />
    </div>
  );
};

export async function getServerSideProps() {
  const client = initializeApollo();
  const { loading, data, error } = await client.query({
    query: getProductsQuery,
    variables: { sort: "created_at:asc", limit: 12 },
  });

  return { props: { initialApolloState: client.cache.extract() } };
}

export default HomePage;
