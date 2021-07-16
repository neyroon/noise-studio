"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate(result, data) {
      console.log("result: ", result, "data: ", data);
    },
    afterUpdate(result, params, data) {
      console.log("result: ", result, "params: ", params, "data: ", data);
    },
    afterDelete(result, params) {
      console.log("result: ", result, "params: ", params);
    },
  },
};
