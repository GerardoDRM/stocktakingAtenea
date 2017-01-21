/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idproduct: {
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
    description: {
      type: 'string',
      required: true
    },
    model: {
      type: 'string',
    }
  }
};
