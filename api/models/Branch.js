/**
 * Branch.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true
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
