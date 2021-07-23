import Head from "next/head";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { getProductQuery } from "../../utils/api";
import { initializeApollo } from "../../utils/apolloClient";
import { getStrapiMedia } from "../../utils/medias";
import { CartContext } from "../../context/CartContext";

const ProductPage = ({ slug }) => {
  const { loading, data, error } = useQuery(getProductQuery, {
    variables: { slug },
  });

  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

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
            onClick={() =>
              (isInCart(product) && increase(product)) || addProduct(product)
            }
            className="btn btn-outline-primary btn-sm"
          >
            Add more
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
