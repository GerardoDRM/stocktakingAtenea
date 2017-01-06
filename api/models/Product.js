/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    autoPK: false,
    id: {
      type: 'string',
      primaryKey: true,
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'float',
      required: true
    },
    category: {
      type: 'string',
      required: true
    },
    quantity: {
      type: 'integer',
      required: true
    },

    // Foreign keys
    location: {
      model: 'branch'
    },
    tickets: {
      collection: "ticket",
      via : "product",
      through: 'sales'
    }

  }
};
