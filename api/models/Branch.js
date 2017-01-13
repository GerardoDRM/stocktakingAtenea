/**
 * Branch.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    idbranch: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      required: true
    },
    street: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    lat: {
      type: 'float'
    },
    lon: {
      type: 'float'
    },
    // Foreign key
    products: {
      collection: "product",
      via: 'location'
    },
    employees: {
      collection: "employee",
      via: "workingAt"
    }
  }
};
