import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProductQuery } from "../../utils/api";
import { initializeApollo } from "../../utils/apolloClient";
import { getStrapiMedia } from "../../utils/medias";

const ProductPage = ({ slug }) => {
  const router = useRouter();

  const { loading, data, error } = useQuery(getProductQuery, {
    variables: { slug },
  });

  const product = data.products[0];

  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
      <Head>
        <title>{product.title} product</title>
      </Head>
      <div className="rounded-t-lg pt-2 pb-2">
        <img
          src={getStrapiMedia(product.image.formats.thumbnail.url)}
          className="m-auto"
          alt={product.title}
        />
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">
            {product.title} - ${product.price}
          </h4>
          <div className="mt-1 text-gray-600">{product.description}</div>
        </div>

        {product.status === "published" ? (
          <button
            className="snipcart-add-item mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url={router.asPath}
            data-item-description={product.description}
            data-item-image={getStrapiMedia(
              product.image.formats.thumbnail.url
            )}
            data-item-name={product.title}
            v-bind="customFields"
          >
            Add to cart
          </button>
        ) : (
          <div className="text-center mr-10 mb-1" v-else>
            <div
              className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Coming soon...
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                This article is not available yet.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ params }) {
  const client = initializeApollo();
  const { loading, data, error } = await client.query({
    query: getProductQuery,
    variables: { slug: params.slug },
  });
  return {
    props: {
      initialApolloState: client.cache.extract(),
      slug: params.slug,
    },
  };
}
