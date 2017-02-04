/**
 * Returns.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idreturns: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: 'integer',
      required: true
    },
    return_date: {
      type: 'date',
      required: true
    },
    // Foreing keys
    idsales: {
      model: 'sales'
    }

  }
};
