import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { getStrapiMedia } from "../utils/medias";

const ProductsList = ({ products, categoryName, needFilters = true }) => {
  const [orderTitle, setOrderTitle] = useState(false);
  const [orderPrice, setOrderPrice] = useState(false);
  const router = useRouter();
  const currentURL = useRef(router.asPath);

  if (!products) return "Продукты отсутствуют";
  const productsList = (
    <div className="mx-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {products.map((_product) => (
        <div
          key={_product.id}
          className="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md"
        >
          <Link href={`/products/${_product.slug}`}>
            <a>
              <div className="rounded-t-lg bg-white pt-2 pb-2">
                <img
                  className="crop mx-auto"
                  src={getStrapiMedia(_product.image.formats.thumbnail.url)}
                  alt={_product.title}
                />
              </div>
              <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {_product.title}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {_product.description}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
  if (!needFilters) return productsList;

  return (
    <>
      {categoryName && <h1>{categoryName}</h1>}
      <div className="w-full px-5 py-4 bg-white mt-6">
        <Link
          href={{
            pathname: `${currentURL.current}`,
            query: {
              sort_by: "title",
              sort_order: `${orderTitle ? "desc" : "asc"}`,
            },
          }}
        >
          <a className="mr-10" onClick={() => setOrderTitle(!orderTitle)}>
            По алфавиту
          </a>
        </Link>
        <Link
          href={{
            pathname: `${currentURL.current}`,
            query: {
              sort_by: "price",
              sort_order: `${orderPrice ? "desc" : "asc"}`,
            },
          }}
        >
          <a className="mr-10" onClick={() => setOrderPrice(!orderPrice)}>
            По цене
          </a>
        </Link>
      </div>
      <div className="flex mt-6">
        <div className="w-2/6 bg-white"></div>
        {productsList}
      </div>
    </>
  );
};

export default ProductsList;
