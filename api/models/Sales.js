/**
 * Sales.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    quantity: {
      type: 'integer',
      required: true
    },
    unitary_price: {
      type: 'float',
      required: true
    },
    total_price: {
      type: 'float',
      required: true
    },
    discount: {
      type: 'float'
    },
    // Foreing keys
    product: {
      model: 'product'
    },
    ticket: {
      model: 'ticket'
    }

  }
};
