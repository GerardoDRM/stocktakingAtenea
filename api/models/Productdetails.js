/**
 * ProductDetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    iddetail: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    size: {
      type: 'string',
      required: true
    },
    quantity: {
      type: 'integer',
      required: true
    },
    color: {
      type: 'string',
      required: true
    },
    // Foreign keys
    idbranch: {
      model: 'branch'
    },
    idproduct: {
      model: 'product'
    }
  }
};
