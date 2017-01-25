/**
 * Sales.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idsales: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
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
    return_date: {
      type: 'date'
    },
    model: {
      type: 'string',
      required: true
    },
    // Foreing keys
    iddetail: {
      model: 'productdetails',
    },
    ticket: {
      model: 'ticket'
    }

  }
};
