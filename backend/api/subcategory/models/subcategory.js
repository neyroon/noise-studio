"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const updateParentCategoryProducts = async (subcategory) => {
  const category = await strapi
    .query("category")
    .findOne({ id: subcategory.category.id });

  for (const product of subcategory.products) {
    if (!category.products.find((_product) => _product.id === product.id)) {
      category.products.push(product);
    }
  }
  await strapi.query("category").update({ id: category.id }, category);
};

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      updateParentCategoryProducts(result);
    },
    async afterUpdate(result) {
      updateParentCategoryProducts(result);
    },
    async afterDelete(result, params) {
      console.log("result: ", result, "params: ", params);
    },
  },
};
