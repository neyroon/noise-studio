import Link from "next/link";
import React from "react";

const CategoryButtons = ({ categories = [] }) => {
  return (
    <nav className="flex flex-col mx-auto gap-2 mt-8 p-5">
      {categories.map((_category) => {
        return (
          <React.Fragment key={_category.slug}>
            <Link href={`/catalog/${_category.slug}`} key={_category.id}>
              <a className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                {_category.name}
              </a>
            </Link>
            <div className="ml-5">
              {_category.subcategories.map((subcategory = []) => (
                <Link
                  href={`/catalog/${_category.slug}/${subcategory.slug}`}
                  key={subcategory.slug}
                >
                  <a className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-2 block">
                    {subcategory.name}
                  </a>
                </Link>
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default CategoryButtons;
