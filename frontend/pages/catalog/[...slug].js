import Head from "next/head";
import { useQuery } from "@apollo/client";
import ProductsList from "../../components/ProductsList";
import { getCategoryQuery, getSubCategoryQuery } from "../../utils/api";
import { initializeApollo } from "../../utils/apolloClient";

const CategoryPage = ({ slug, query }) => {
  const { sort_by, sort_order } = query;

  const queryGQL = slug.length > 1 ? getSubCategoryQuery : getCategoryQuery;

  const variables = { slug: slug.length > 1 ? slug[1] : slug[0] };
  if (sort_by && sort_order) variables.sort = `${sort_by}:${sort_order}`;

  const { loading, data, error } = useQuery(queryGQL, {
    variables,
  });

  const category = slug.length > 1 ? data.subcategories[0] : data.categories[0];

  return (
    <div>
      <Head>
        <title>{category.name} products</title>
      </Head>
      <ProductsList products={category.products} />
    </div>
  );
};

export default CategoryPage;

export async function getServerSideProps({ params, query }) {
  const { slug } = params;
  const { sort_by, sort_order } = query;
  const queryGQL = slug.length > 1 ? getSubCategoryQuery : getCategoryQuery;

  const variables = {
    slug: slug.length > 1 ? slug[1] : slug[0],
  };
  if (sort_by && sort_order) variables.sort = `${sort_by}:${sort_order}`;

  const client = initializeApollo();
  const { loading, data, error } = await client.query({
    query: queryGQL,
    variables,
  });
  return {
    props: {
      initialApolloState: client.cache.extract(),
      slug,
      query,
    },
  };
}
